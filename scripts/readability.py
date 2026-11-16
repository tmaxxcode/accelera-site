"""Reading-grade check for built landing pages.

Usage: python3 scripts/readability.py dist/lp/trades/index.html [more.html ...]
Needs `textstat` (pip install textstat). Target: Flesch-Kincaid grade <= 7, no sentence over 25 words.

Each block element (heading, paragraph, list item, label, button, summary) counts as its own
sentence, since headings and bullets carry no closing period. Source citations, placeholder
tags, hidden inputs, scripts and styles are left out: they are not copy the owner reads.
"""
import re
import sys
from html.parser import HTMLParser

import textstat

BLOCKS = {"h1", "h2", "h3", "p", "li", "summary", "label", "button", "a", "legend", "blockquote", "figcaption"}
SKIP_CLASSES = ("term__tag", "proof__src", "foot__src", "story__ph", "visually-hidden", "skip-link", "call__label", "demo__badge")
SKIP_TAGS = {"script", "style", "noscript", "template", "head"}


class Extract(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []  # (tag, skip)
        self.chunks = []
        self.buf = []

    def _skipping(self):
        return any(s for _, s in self.stack)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get("class") or ""
        skip = tag in SKIP_TAGS or any(c in cls for c in SKIP_CLASSES)
        if tag in {"br", "img", "input", "meta", "link", "hr", "source"}:
            return
        if tag in BLOCKS:
            self._flush()
        self.stack.append((tag, skip))

    def handle_endtag(self, tag):
        if tag in BLOCKS:
            self._flush()
        while self.stack:
            t, _ = self.stack.pop()
            if t == tag:
                break

    def handle_data(self, data):
        if not self._skipping():
            self.buf.append(data)

    def _flush(self):
        text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        self.buf = []
        if len(text.split()) >= 2:
            if not re.search(r"[.!?]\"?$", text):
                text += "."
            self.chunks.append(text)


def grade(path):
    p = Extract()
    p.feed(open(path, encoding="utf-8").read())
    p._flush()
    seen, chunks = set(), []
    for c in p.chunks:
        if c not in seen:
            seen.add(c)
            chunks.append(c)
    text = " ".join(chunks)
    sentences = re.split(r"(?<=[.!?])\s+", text)
    longest = max(sentences, key=lambda s: len(s.split()))
    return {
        "file": path,
        "words": textstat.lexicon_count(text),
        "fk_grade": round(textstat.flesch_kincaid_grade(text), 1),
        "flesch_ease": round(textstat.flesch_reading_ease(text), 1),
        "longest_sentence_words": len(longest.split()),
        "longest_sentence": longest,
        "hardest": sorted(chunks, key=lambda c: -textstat.flesch_kincaid_grade(c) if len(c.split()) > 6 else 0)[:5],
    }


if __name__ == "__main__":
    ok = True
    for f in sys.argv[1:]:
        r = grade(f)
        passed = r["fk_grade"] <= 7 and r["longest_sentence_words"] <= 25
        ok &= passed
        print(f"{'PASS' if passed else 'FAIL'} {r['file']}: grade {r['fk_grade']}, ease {r['flesch_ease']}, {r['words']} words, longest sentence {r['longest_sentence_words']} words")
        for h in r["hardest"]:
            print(f"   hardest: {h} [{textstat.flesch_kincaid_grade(h):.1f}]")
    sys.exit(0 if ok else 1)
