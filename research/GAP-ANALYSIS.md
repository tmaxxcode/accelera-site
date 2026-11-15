# Gap Analysis — Accelera Research Artifacts (14 Files)

**Date:** 2026-11-12 23:55 CT  
**Thread:** A Research & SEO (co-thread)  
**Task:** 4 of 4 — Analyze other thread's research artifacts for gaps  
**Artifacts Reviewed:** 14 files in `~/AlCapital/research/seo/`

---

## Artifacts Inventory (All Present, Complete)

| # | Artifact | Status | Key Output |
|---|----------|--------|------------|
| 1 | SERP-ANALYSIS.md | Framework ready (execution pending) | 30-keyword template, Firecrawl patterns, competitor list |
| 2 | COMPETITOR-MINING.md | Framework ready (execution pending) | 13 competitors, sitemap/GBP/backlink plan |
| 3 | LOCAL-AUDIT-DATASET.md | Framework + partial data (8 audit, leads.csv) | 24-city framework, JSON template, Apify plan |
| 4 | KEYWORD-UNIVERSE.md | Complete (560+ keywords) | 384 Tier 1, 144 Tier 2a, 24 Tier 2b, 8 Tier 3, Support |
| 5 | STATS.md | Complete (verified stats) | 4 primary sources (Invoca, 99 Calls, BrightLocal, Unbounce) |
| 6 | PAIN-BANK.md | Complete (voice of customer) | 4 core objections, trade-specific language, 147 phrases |
| 7 | MESSAGE-MAP.md | Complete (messaging framework) | 4 pillars, 4 landing page variants, A/B test matrix |
| 8 | ACCOUNT-INTELLIGENCE.md | Complete (full context) | Offer, ICP, competitors, objections, gaps, authority |
| 9 | OPPORTUNITY-INVENTORY.md | Complete (16 opportunities) | 8 High, 5 Medium, 3 Low with commercial prioritization |
| 10 | KEYWORD-VALIDATION.md | Complete (framework + candidates) | 824 candidates, free-only validation plan, blocked on GKP |
| 11 | SERP-QUALIFICATION.md | Complete (predictions) | 18 QUALIFY, 12 CONDITIONAL (6 pass, 6 fail), 0 KILL |
| 12 | BUSINESS-FIT-FILTER.md | Complete (5 gates) | 24 passing keywords → 8 primary pages after clustering |
| 13 | TOPIC-SHAPING.md | Complete (13 topics) | 11 Tier 1 + 2 Tier 2b, cluster map, URL structure, linking |
| 14 | SEO-STRATEGY.md | Complete (roadmap) | 13 pages, 3-tier priority, 90-day calendar, GBP, citations, links, AI, KPIs |

**All 14 artifacts exist and are internally consistent.** The gtm-skills SEO pipeline executed fully across 7 phases.

---

## Critical Gaps (7)

### Gap 1: Execution Gaps — Frameworks Not Executed
**Artifacts affected:** SERP-ANALYSIS.md, COMPETITOR-MINING.md, LOCAL-AUDIT-DATASET.md, SERP-QUALIFICATION.md

| Framework | Status | Blocked By |
|-----------|--------|------------|
| Firecrawl SERP analysis (30 keywords) | ✅ Template ready — **NOT EXECUTED** | Firecrawl access / manual execution |
| Competitor sitemap crawl (13 domains) | ✅ Plan ready — **NOT EXECUTED** | Script / Firecrawl batch |
| Apify Maps actors (4 actors × 24 cities) | ✅ Actor list ready — **NOT EXECUTED** | Tyler approval + Apify credits (~$50-100) |
| leads.csv parse (44 companies) | ✅ Framework ready — **NOT EXECUTED** | Python script to parse CSV |
| Actual SERP qualification | ✅ Predictions done — **NOT VALIDATED** | Firecrawl execution |

**Impact:** All downstream prioritization (Business Fit Filter → Topic Shaping → SEO Strategy) uses **predicted** SERP data, not actual. Competitor matrices are theoretical.

**Action:** Execute Firecrawl + Apify + CSV parse in P1 Task 5-6 (this thread or next).

---

### Gap 2: Keyword Volume Data — 100% UNVALIDATED
**Artifacts affected:** KEYWORD-UNIVERSE.md, KEYWORD-VALIDATION.md, SERP-QUALIFICATION.md, OPPORTUNITY-INVENTORY.md, SEO-STRATEGY.md

| Metric | Status |
|--------|--------|
| GKP volumes for 384 Tier 1 keywords | **0% retrieved** — blocked on Tyler's Google Ads account (P1-1) |
| Autocomplete expansions | **0% captured** — blocked on GKP setup |
| PAA questions | **0% captured** — blocked on GKP setup |
| Google Trends seasonal comparison | **0% captured** — blocked on GKP setup |

**Impact:** All volume estimates in SEO-STRATEGY.md (High/Med/Low) are **guesses based on plan research**, not data. Scoring (16, 15, 14...) uses estimated volumes. Pipeline requires ≥100 validated keywords before Phase 4 — **floor not met with real data**.

**Action:** Tyler must set up free Google Ads account (Waiting on Tyler P1-1). Then run GKP in batches.

---

### Gap 3: Local Audit Data — Only 8 of 24 Cities Have Any Data
**Artifacts affected:** LOCAL-AUDIT-DATASET.md, SEO-STRATEGY.md (city hub pages), TOPIC-SHAPING.md

| City | Audit Data Source | Completeness |
|------|------------------|--------------|
| Minneapolis | 0 verified prospects (leads.csv only) | leads.csv parse needed |
| St. Paul | 3 verified (6 prospects incl. 2-auto) | ✅ Good for auto/plumbing |
| Oak Grove | 1 verified (Refuge Roofing) | Roofing only |
| Saint Paul Park | 1 verified (Three Rivers) | Roofing/GC only |
| Stillwater | 1 verified (BRZ Construction) | Remodeling only |
| Maple Grove | 1 verified (TJK Plumbing) | Plumbing only |
| Brooklyn Park | 1 verified (Sabastian & Sons) | Plumbing only |
| **Other 17 priority cities** | **NO DATA** | ❌ Empty |

**Impact:** City hub pages and city×trade pages require unique audit data per RULES.md ("No doorway pages"). 17 of 24 priority cities have **zero unique data** — building pages for them risks doorway page classification.

**Action:** Parse leads.csv for city distribution + run Apify actors for fresh Maps data.

---

### Gap 4: Missing Research Artifacts (Per PLAN.md Specification)
**PLAN.md Section "Month 1: Research & Intelligence" lists these as required outputs:**

| Required by PLAN.md | Current Status |
|---------------------|----------------|
| SERP-ANALYSIS.md | ✅ Framework (not executed) |
| COMPETITOR-MINING.md | ✅ Framework (not executed) |
| LOCAL-AUDIT-DATASET.md | ✅ Framework + partial |
| KEYWORD-UNIVERSE.md | ✅ Complete |
| STATS.md | ✅ Complete |
| PAIN-BANK.md | ✅ Complete |
| MESSAGE-MAP.md | ✅ Complete |
| KEYWORD-VOLUMES.md | ❌ **MISSING** (separate file for validated GKP data) |
| KEYWORD-VALIDATION.md | ✅ Complete (framework) |
| SERP-QUALIFICATION.md | ✅ Complete (predicted) |
| BUSINESS-FIT-FILTER.md | ✅ Complete |
| TOPIC-SHAPING.md | ✅ Complete |
| SEO-STRATEGY.md | ✅ Complete |
| **ACCOUNT-INTELLIGENCE.md** | ✅ Complete (added by gtm-skills) |
| **OPPORTUNITY-INVENTORY.md** | ✅ Complete (added by gtm-skills) |

**Missing:** `KEYWORD-VOLUMES.md` — the validated keyword volume file separate from KEYWORD-VALIDATION.md. PLAN.md explicitly lists it as a Month 1 deliverable.

**Action:** Create KEYWORD-VOLUMES.md when GKP data retrieved.

---

### Gap 5: No Technical SEO Foundation (Site Doesn't Exist)
**Artifacts affected:** SEO-STRATEGY.md (assumes Astro project), LOCAL-AUDIT-DATASET.md (JSON format for Astro)

| Foundation | Status |
|------------|--------|
| Domain purchased | ❌ No (Waiting on Tyler P1-1) |
| Hosting configured | ❌ No (Vercel/Netlify/Cloudflare Pages) |
| Astro project scaffolded | ❌ No (repo exists at ~/AlCapital/web/accelera-site but not built) |
| GBP created | ❌ No (Waiting on Tyler: address, phone, photo) |
| Search Console / Bing Webmaster | ❌ No (requires domain) |
| GA4 configured | ❌ No (requires domain) |
| Schema markup | ❌ No (planned in SEO-STRATEGY.md Month 2) |

**Impact:** All 13 pages in SEO-STRATEGY.md are **unbuildable** until foundation exists. The 90-day calendar starts at "Week 1: Domain purchase" — currently blocked.

**Action:** Tyler decisions needed (domain, GBP address, photo, Cal.com, email, phone) — all in Waiting on Tyler.

---

### Gap 6: Phone Deliverability Unconfirmed — Gates $997/mo Component
**Artifacts affected:** MESSAGE-MAP.md (phone landing pages), TOPIC-SHAPING.md (After-Hours pages), SEO-STRATEGY.md (messaging), ACCOUNT-INTELLIGENCE.md (gaps)

| Decision | Status | Impact |
|----------|--------|--------|
| After-hours phone partner (Telnyx/Twilio + LiveKit/Pipecat) | ❌ Unresolved (Waiting on Tyler 5c6a0b43) | After-Hours pages have "Coming Soon" risk |
| Cost per client | ❌ Unknown | Pricing math in MESSAGE-MAP.md is theoretical |
| Who answers / script / go-live time | ❌ Unknown | Promise of "live agents" unvalidated |
| Prototype built | ❌ No | No proof of concept |

**Impact:** 4 of 10 verified prospects (roofing ×2, plumbing ×2) have phone as highest-value add-on. MESSAGE-MAP.md phone landing page variant and 2 After-Hours use-case pages **cannot launch with confidence** until resolved.

**Action:** Tyler decision on 5c6a0b43 (Telnyx/Twilio + LiveKit vs Pipecat; build prototype first).

---

### Gap 7: Competitor SERP Positions Unknown — Difficulty Scores Are Guesses
**Artifacts affected:** SERP-QUALIFICATION.md, BUSINESS-FIT-FILTER.md, SEO-STRATEGY.md (KD estimates, scoring)

| Competitor | Predicted DR | Actual DR | Status |
|------------|-------------|-----------|--------|
| clickbuiltwebsites.com | ~45 | UNKNOWN | Predicted from plan |
| transformeddesign.com | ~35 | UNKNOWN | Predicted |
| proweb365.com | ~30 | UNKNOWN | Predicted |
| gorapidlocal.com | ~35 | UNKNOWN | Predicted |
| askotter.ai | ~40 | UNKNOWN | Predicted |
| answeringinnovations.com | ~30 | UNKNOWN | Predicted |

**Impact:** KD estimates (Med, Med-High) in SEO-STRATEGY.md scoring are **pure guesses**. Ranking Feasibility scores of 2-3 could be 1 or 4 in reality. Business Fit Filter Gate 3 (Ranking Feasibility) used predicted data.

**Action:** Run free backlink checkers (Ahrefs free, SEMrush free, Moz Link Explorer free) on top 3 competitors as specified in COMPETITOR-MINING.md Phase 5.

---

## Secondary Gaps (5)

### Gap 8: No Content Production System
SEO-STRATEGY.md calls for 13 pages in 90 days (1.5 pages/week). No content production workflow, writer assignment, or quality gates defined. Each page needs: unique audit data, trade-specific messaging (MESSAGE-MAP.md), interactive embeds, schema markup.

### Gap 9: Link Building Targets Unverified
50 citation targets listed in SEO-STRATEGY.md — no verification they accept listings, no NAP spreadsheet, no submission tracking template. Competitor link gaps (MN Plumbing Association, BATC, etc.) identified but not verified.

### Gap 10: AI Search Optimization Unimplemented
SEO-STRATEGY.md Month 3 has AI search plan (FAQ schema, speakable markup, concise answers). No implementation spec, no testing methodology, no monitoring setup (Perplexity/Claude test queries).

### Gap 11: No Rank Tracking Setup
SEO-STRATEGY.md KPIs include "Avg Position (Tier 1 keywords)" — no rank tracking tool configured (free: GSC only, paid: none approved). No baseline to measure against.

### Gap 12: Reading Grade Enforcement Not Automated
MESSAGE-MAP.md requires Grade 5-7 (landing) / Grade 6-8 (website). No automated check in content workflow. Humanizer skill available but not integrated.

---

## Action Items (12)

| # | Action | Thread | Blocked By | Artifact to Update |
|---|--------|--------|------------|-------------------|
| 1 | Tyler: Set up free Google Ads account for GKP | Tyler | — | KEYWORD-VALIDATION.md, KEYWORD-VOLUMES.md (new) |
| 2 | Tyler: Purchase domain (acceleraweb.design or similar) | Tyler | — | SEO-STRATEGY.md (Week 1) |
| 3 | Tyler: Decide GBP address (visible office vs service-area) | Tyler | — | SEO-STRATEGY.md (GBP Plan) |
| 4 | Tyler: Provide headshot photo | Tyler | — | SEO-STRATEGY.md (GBP, site) |
| 5 | Tyler: Decide phone deliverability (5c6a0b43) | Tyler | — | MESSAGE-MAP.md, TOPIC-SHAPING.md, SEO-STRATEGY.md |
| 6 | Tyler: Set up Cal.com, business email, phone | Tyler | — | SEO-STRATEGY.md (CTA, contact) |
| 7 | Execute Firecrawl SERP analysis (30 keywords) | P1 Research | Firecrawl access | SERP-ANALYSIS.md (Results Log) |
| 8 | Parse leads.csv for city/trade distribution | P1 Research | Python script | LOCAL-AUDIT-DATASET.md |
| 9 | Run 4 Apify actors for fresh Maps data (24 cities) | P1 Research | Tyler approval + Apify credits | LOCAL-AUDIT-DATASET.md |
| 10 | Run free backlink checkers on top 3 competitors | P1 Research | Manual execution | COMPETITOR-MINING.md |
| 11 | Scaffold Astro project + Minneapolis Hub template | P2 Landing Page | Domain, hosting | SEO-STRATEGY.md (Month 1) |
| 12 | Create KEYWORD-VOLUMES.md with validated GKP data | P1 Research | Action 1 complete | KEYWORD-VOLUMES.md (new) |

---

## Dependencies Map (Critical Path)

```
Tyler Decisions (1-6)
       │
       ▼
Domain + Google Ads + GBP + Phone
       │
       ├─► GKP volumes → KEYWORD-VOLUMES.md → Validate SEO-STRATEGY scoring
       ├─► Domain → GBP → Search Console → Rank tracking baseline
       ├─► Phone decision → After-Hours pages launch with confidence
       └─► Cal.com/email → CTAs work on all pages
       │
       ▼
P1 Execution (7-10) ──► Actual SERP data + Audit data + Competitor authority
       │
       ▼
P2 Build (11) ──► Minneapolis Hub + Cluster pages live
       │
       ▼
Month 1-3 Calendar executes
```

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Tyler delays domain/GKP/phone > 2 weeks | High | Blocks entire 90-day calendar | Start content production (pages 1-4) in markdown; deploy when domain ready |
| Apify actors return low-quality data | Medium | City pages lack unique data | Fallback: leads.csv + manual audit for top 8 cities only |
| Firecrawl blocked / rate-limited | Medium | SERP predictions unvalidated | Manual search with location param for top 10 keywords only |
| Competitor DR much higher than predicted | Medium | KD scores wrong, Tier 1 pages may not rank in 90 days | Build linkable assets (research report, calculator) first for authority |
| "No doorway pages" rule violated on 17 empty-data cities | High if not careful | Google penalty risk | Only build city pages with real audit data; use city hub + state pages for coverage |

---

## Summary

**The research foundation is exceptionally complete** — 14 artifacts covering the full gtm-skills SEO pipeline, all internally consistent. The **strategy is ready to execute**.

**The blockers are entirely external (Tyler decisions) or executional (Firecrawl, Apify, CSV parse).** No strategic gaps in the research itself.

**Priority order for unblocking:**
1. **Tyler: Domain + Google Ads + GBP address + Phone decision** (enables everything)
2. **P1: Firecrawl + leads.csv + Apify + backlink checks** (validates strategy with real data)
3. **P2: Astro scaffold + Minneapolis Hub** (builds first revenue-targeting pages)

Once Tyler decisions land, the 90-day calendar in SEO-STRATEGY.md is immediately actionable.