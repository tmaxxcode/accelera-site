# Lighthouse gates, cinematic 3D upgrade (2026-11-18/19)

Run: Lighthouse 12.8.2 (npx), headless Chrome, against `npx astro preview` of branch `worktree-accelera-cinematic-3d` on 127.0.0.1:4322 (local build, not the live URL). Mobile = default preset (Moto G Power emulation, 4x CPU slowdown, simulated slow 4G); desktop = `--preset=desktop`. One run per page and mode, nothing else running. Final build: commit a10010c.

Budget (spec `docs/superpowers/specs/2026-11-18-cinematic-3d-design.md`): accessibility 100 and SEO 100 on the main site; mobile performance home ≥ 80, every other main-site page ≥ 90; mobile LCP < 2.5 s everywhere. **Result: every main-site page passes.**

| Page | Mode | Perf | A11y | Best pr. | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 98 | 100 | 100 | 100 | 2.2 s | 40 ms | 0 |
| / | desktop | 98 | 100 | 100 | 100 | 0.5 s | 0 ms | 0.091 |
| /website-design-minnesota/ | mobile | 99 | 100 | 100 | 100 | 1.9 s | 0 ms | 0 |
| /website-design-minnesota/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /online-booking-minnesota/ | mobile | 99 | 100 | 100 | 100 | 1.9 s | 10 ms | 0 |
| /online-booking-minnesota/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /after-hours-answering-service-minnesota/ | mobile | 99 | 100 | 100 | 100 | 1.9 s | 0 ms | 0 |
| /after-hours-answering-service-minnesota/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /plumbers/ | mobile | 99 | 100 | 100 | 100 | 2.1 s | 0 ms | 0 |
| /plumbers/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /roofers/ | mobile | 99 | 100 | 100 | 100 | 2.0 s | 10 ms | 0 |
| /roofers/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /auto-repair/ | mobile | 99 | 100 | 100 | 100 | 1.9 s | 0 ms | 0 |
| /auto-repair/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /contractors/ | mobile | 99 | 100 | 100 | 100 | 2.0 s | 0 ms | 0 |
| /contractors/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /pricing/ | mobile | 99 | 100 | 100 | 100 | 1.9 s | 0 ms | 0 |
| /pricing/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /how-it-works/ | mobile | 99 | 100 | 100 | 100 | 1.9 s | 40 ms | 0 |
| /how-it-works/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /about/ | mobile | 99 | 100 | 100 | 100 | 2.0 s | 20 ms | 0 |
| /about/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /faq/ | mobile | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |
| /faq/ | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 ms | 0 |
| /contact/ | mobile | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |
| /contact/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /privacy/ | mobile | 100 | 100 | 100 | 100 | 1.7 s | 30 ms | 0 |
| /privacy/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /tools/missed-call-calculator/ | mobile | 99 | 100 | 100 | 100 | 1.8 s | 0 ms | 0 |
| /tools/missed-call-calculator/ | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 ms | 0 |
| /lp/trades/ | mobile | 100 | 100 | 100 | 66 | 1.5 s | 0 ms | 0 |
| /lp/trades/ | desktop | 100 | 100 | 100 | 66 | 0.4 s | 0 ms | 0 |

Notes:
- `/lp/trades/` SEO 66 is expected: landing pages are `noindex` by design and Lighthouse scores a blocked page down. Performance 100 and accessibility 100. The 2026-11-16 report did not measure `/lp/`, so there is no earlier number to compare; the landing pages load none of the upgrade (no 3D, no premium CSS, no React) and lp-flows passes 381/381.
- Home desktop CLS 0.091 is under the 0.1 "good" line but was 0 before the upgrade; the likely source is the mouse-only React islands (Magnetic, Lift) hydrating. Logged as a minor.
- Earlier single runs during the build read 68-76 on a cold start (first run after the npx download, or a run overlapping another Lighthouse job); reruns of the same build read 98-99. The table above is one clean pass.
- Not measured: real devices (iPhone, Android), Safari, Firefox, and the 3D scene's own frame rate on a phone (mobile scores exclude it: phones start the 3D on the first touch or scroll).
