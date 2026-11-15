# Open Source Keyword Research Sources for Accelera

**Date:** 2026-11-12 23:22 CT  
**Thread:** A Research & SEO (co-thread)  
**Task:** 1 of 4 — Find open source keyword research repo

---

## Summary

Found **4 relevant sources** across the installed skills repos. Two are completely free/local, one requires paid Ahrefs API, one is complementary (local lead generation).

| Source | Cost | Method | Verdict |
|--------|------|--------|---------|
| `aaron-marketing-skills/keyword-research` | Free | Google Autocomplete scraping via `suggest.py` | ✅ Use for autocomplete expansion |
| `gtm-skills/seo-intel` | Free | Live SERP sweeping, ranks actual results, scores difficulty from observed rankings | ✅ **Primary recommendation** |
| `gtm-skills/seo-keyword-validation` | Paid (Ahrefs) | Ahrefs API for volume/KD/gaps | ⚠️ Only if Tyler approves paid credits |
| `google-maps-scraping-apis` | Pay-per-result (Apify) | 217 actors for local business data | ✅ Complementary for LOCAL-AUDIT-DATASET |

---

## 1. aaron-marketing-skills/keyword-research

**Path:** `/Users/TylerMaxwell/aaron-marketing-skills/research/keyword-research/`  
**Skill file:** `SKILL.md` (8-phase process)  
**Connector:** `scripts/connectors/suggest.py`

### Key Features
- **8-phase process:** Discovery → Expansion (Autocomplete) → PAA Harvesting → Related Searches → Competitor Gap → Clustering → Intent Classification → Validation
- **Free Google Autocomplete** via unofficial endpoint: `suggestqueries.google.com/complete/search`
- **Connector (`suggest.py`):** Simple function `get_autocomplete_suggestions(seed, lang="en", country="us")` returning list of suggestions
- No API key, no rate limits (unofficial endpoint)
- Outputs JSON/CSV ready for clustering

### Code Snippet (suggest.py)
```python
import requests
import json

AUTOCOMPLETE_ENDPOINT = "https://suggestqueries.google.com/complete/search"

def get_autocomplete_suggestions(seed: str, lang="en", country="us") -> list:
    params = {
        "client": "chrome",
        "q": seed,
        "hl": lang,
        "gl": country,
    }
    response = requests.get(AUTOCOMPLETE_ENDPOINT, params=params, timeout=10)
    response.raise_for_status()
    # Response format: [query, [suggestions], ...]
    data = response.json()
    return data[1] if len(data) > 1 else []

# Example usage:
# suggestions = get_autocomplete_suggestions("emergency plumber minneapolis")
# Returns: ["emergency plumber minneapolis mn", "emergency plumber minneapolis 24 hour", ...]
```

### Integration for Accelera
- Run for each Tier 1 seed keyword from KEYWORD-UNIVERSE.md (384 seeds)
- Expands each seed into 5-15 long-tail variations
- Zero cost, runs locally
- Feeds into seo-intel for SERP validation

---

## 2. gtm-skills/seo-intel (PRIMARY RECOMMENDATION)

**Path:** `/Users/TylerMaxwell/extracted/gtm-skills-main/skills/alon-goldenberg/seo-intel/`  
**Skill file:** `SKILL.md`  
**References:** `references/serp-and-keywords.md`, `references/content-gaps.md`, `references/site-audit-checks.md`, `references/ai-visibility.md`

### Key Features
- **Keyword Research play:** Expands topic into 15-25 seed variations, sweeps live SERPs, scores difficulty from WHO ACTUALLY RANKS and content depth
- **No paid APIs required** — uses live search results only
- **Difficulty scoring rubric:** Based on observed ranking domains, content depth, SERP features (AI Overview, Local Pack, etc.)
- **Intent classification from SERP composition** — not intuition
- **Clustering formula:** `(relevance × intent value) / difficulty` → Quick Wins, Growth Targets, Moonshots
- **Evidence chain:** Every keyword, gap, finding tied to source URL
- **Delta mode:** Compares against prior snapshot (14-day window)

### How It Works (from skill + references)
1. **Seed expansion:** 15-25 variations (modifiers, long-tail questions, commercial variants, adjacent concepts)
2. **Live SERP sweep:** Search each seed, extract top 20 results
3. **Score from observation:**
   - Who ranks (domain authority observed via ranking position)
   - Content depth (word count, topic coverage, schema)
   - SERP features present (Local Pack, AI Overview, PAA, Videos, etc.)
4. **Cluster into pillars** by observed intent
5. **Rank by formula:** `(relevance × intent_value) / difficulty`
6. **Output buckets:** Quick Wins (low difficulty, commercial intent), Growth Targets, Moonshots

### Reference Files Available
- `references/serp-and-keywords.md` — Rubrics, formulas, query normalization, domain matching, feature taxonomy
- `references/content-gaps.md` — Coverage matrix logic, gap validation against live search
- `references/site-audit-checks.md` — 7 check categories, severity tiers, A-F grading
- `references/ai-visibility.md` — 20-40 query templates, GEO playbook, bot detection

### Integration for Accelera
- Feed Tier 1 seeds (384 keywords from KEYWORD-UNIVERSE.md) as starting topics
- Run Keyword Research play for each major service/trade cluster
- Output: validated keyword candidates with observed difficulty, intent, SERP features
- Use delta mode for monthly re-runs

---

## 3. gtm-skills/seo-keyword-validation (REQUIRES PAID AHREFS)

**Path:** `/Users/TylerMaxwell/extracted/gtm-skills-main/skills/sam-dunning/seo-keyword-validation/`  
**Skill file:** `SKILL.md`

### Key Features
- **Phase 3 of gtm-skills SEO pipeline** (after opportunity-extraction, topic-research)
- **Requires Ahrefs API** — Keywords Explorer (matching terms, related terms, overview), Site Explorer (organic keywords, competitor gaps)
- **Seed patterns by opportunity type** (Competitor-led, Objection-led, Feature-led, Use-case-led, Industry-led, Pain-led, Winner expansion)
- **Filters:** Global volume ≥ 50/mo (competitor alternatives ≥ 20/mo), commercial/transactional intent
- **Output:** Keyword candidate pool grouped by opportunity with volume, KD, top-ranking domain

### When to Use
- Only if Tyler approves paid Ahrefs credits (Keywords Everywhere at 0 credits currently)
- Best for validating specific competitor gaps and high-value commercial keywords
- Complements seo-intel (seo-intel = live SERP difficulty, seo-keyword-validation = volume data)

---

## 4. google-maps-scraping-apis (COMPLEMENTARY)

**Path:** `/Users/TylerMaxwell/extracted/google-maps-scraping-apis-main/`  
**README:** 217 verified Apify actors for Google Maps scraping

### Key Features
- **Place scrapers:** Names, phones, websites, ratings, 20-30 fields per place
- **Review scrapers:** Complete review histories with images
- **Email/contact extractors:** 61 actors
- **Vertical lead finders:** 19 actors (dentists, plumbers, roofers, etc.)
- **Pay-per-result** on Apify (free tier available)
- **Playbooks:** Local lead pipeline, review monitoring

### Integration for Accelera
- **LOCAL-AUDIT-DATASET.md** already plans Apify usage for 24 MN cities
- Actors for "plumbers in Minneapolis", "roofers in St. Paul", "auto repair in Brooklyn Park"
- Enriches competitor mining with real GBP data (ratings, review velocity, photos)
- Cost: ~$0.002-0.004 per result (Thirdwatch, Bovi actors)

---

## Recommended Workflow for Accelera

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. START: KEYWORD-UNIVERSE.md (384 Tier 1 seeds)               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. EXPAND: aaron-marketing-skills suggest.py                   │
│    → Autocomplete expansion for each seed (5-15 variants)      │
│    → ~2,000-5,000 expanded keywords                            │
│    → Cost: $0, runs locally                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. VALIDATE: gtm-skills seo-intel (Keyword Research play)      │
│    → Cluster expanded keywords by topic                        │
│    → Sweep live SERPs for each cluster                         │
│    → Score difficulty from observed rankings                   │
│    → Classify intent from SERP composition                     │
│    → Output: Quick Wins / Growth Targets / Moonshots           │
│    → Cost: $0, uses live search                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. ENRICH (optional): gtm-skills seo-keyword-validation        │
│    → If Tyler approves Ahrefs credits                          │
│    → Add exact volume/KD for priority Quick Wins               │
│    → Competitor keyword gaps for top 3 competitors             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. LOCAL INTEL: google-maps-scraping-apis                      │
│    → Run Apify actors for 24 MN cities × trades                │
│    → Enrich COMPETITOR-MINING.md and LOCAL-AUDIT-DATASET.md    │
│    → Cost: pay-per-result (budget ~$50-100)                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Next Steps

1. **Task 2:** Find top 50 cities in Minnesota by population (for LOCAL-AUDIT-DATASET.md)
2. **Task 3:** Research seasonal niches/industries for MN in November
3. **Task 4:** Analyze other thread's research artifacts for gaps

The open source keyword research infrastructure is ready. Primary engine: **seo-intel** (live SERP, no paid tools). Expansion engine: **suggest.py** (free autocomplete). Validation enhancer: **seo-keyword-validation** (when/if Ahrefs approved). Local enrichment: **Apify actors**.