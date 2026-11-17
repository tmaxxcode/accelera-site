# Lighthouse mobile gates, website v1 (2026-11-16)

Run: Lighthouse 12.8.2, default mobile preset (Moto G Power emulation, 4x CPU slowdown, simulated slow 4G), headless Chrome, against `npx astro preview` on localhost (local build, not the live URL). One run per page; home rerun twice (see below). aos-verifier reran / and /pricing/: 100/100/100/100.

PLAN P4 gate: performance ≥ 90, accessibility 100, SEO 100 (mobile). **Result: every page passes.**

| Page | Perf | A11y | Best pr. | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| / (rerun; first cold run 69, TBT 3,120 ms) | 100 | 100 | 100 | 100 | 1.6 s | 0 ms | 0 |
| /about/ | 100 | 100 | 100 | 100 | 1.6 s | 0 ms | 0 |
| /after-hours-answering-service-minnesota/ | 100 | 100 | 100 | 100 | 1.8 s | 30 ms | 0 |
| /auto-repair/ | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |
| /contact/ | 100 | 100 | 100 | 100 | 1.6 s | 0 ms | 0 |
| /contractors/ | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |
| /faq/ | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |
| /how-it-works/ | 100 | 100 | 100 | 100 | 1.6 s | 0 ms | 0 |
| /online-booking-minnesota/ | 99 | 100 | 100 | 100 | 1.6 s | 80 ms | 0 |
| /plumbers/ | 100 | 100 | 100 | 100 | 1.6 s | 0 ms | 0 |
| /pricing/ | 100 | 100 | 100 | 100 | 1.6 s | 0 ms | 0 |
| /privacy/ | 100 | 100 | 100 | 100 | 1.6 s | 0 ms | 0 |
| /roofers/ | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |
| /tools/missed-call-calculator/ | 100 | 100 | 100 | 100 | 1.7 s | 0 ms | 0 |
| /website-design-minnesota/ | 100 | 100 | 100 | 100 | 1.5 s | 0 ms | 0 |

Failing weighted audits on the first pass (score < 0.9): speed-index and total-blocking-time on / only, cold run. None on reruns.

**Home rerun.** The home page ran first, on a cold Chrome start, and scored 69 (TBT 3,120 ms). Two reruns right after: performance 100, TBT 0 ms, Speed Index 1.0-1.1 s. The longest task on reruns is the missed-call calculator script (111-129 ms). The 69 is a cold-start artifact, not a page problem.

**INP.** Lighthouse navigation runs cannot measure INP. TBT is the lab proxy: 0-80 ms on every page (home 0 ms on rerun). Real INP needs field data (Search Console Core Web Vitals or CrUX) after launch.

**Still to do after launch:** rerun on the live URL (PLAN P4 VERIFY step), since a CDN and real network change LCP.
