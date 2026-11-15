# COMPETITOR-MINING.md — Competitor analysis framework

**Target:** 15–25 competitors ranking for Accelera's Tier 1 keywords
**Method:** SERP-derived competitor list + sitemap crawling + Firecrawl extraction
**Date:** 2026-11-12 (framework created)

---

## Competitor List (from plan + SERP expectations)

### Primary Competitors (confirmed from plan research)

| # | Domain | Type | Notes |
|---|---|---|---|
| 1 | clickbuiltwebsites.com | Web agency | Full city×trade matrix, published pricing $700/$1,100/$2,100/mo SEO |
| 2 | transformeddesign.com | Web agency | Trade×city pages (e.g., /plumber-website-design-minneapolis) |
| 3 | proweb365.com | Web agency | MN-focused, trade pages |
| 4 | minnesotadesign.com | Web agency | MN agency |
| 5 | wyfimarketing.com | Web agency | HVAC/plumbing/electrical focus |
| 6 | optimumdesigntech.com | Web agency | Unknown depth |
| 7 | portkeyseominneapolis.com | SEO agency | Minneapolis SEO |
| 8 | askotter.ai | AI answering service | /minneapolis/roofers pattern |
| 9 | plaudit.com | Web agency | Unknown |
| 10 | gorapidlocal.com | Answering service | City×trade for answering (/grow/answering-service/plumbing/saint-paul) |
| 11 | answeringinnovations.com | Answering service | State pages (/states/minnesota/minneapolis) |
| 12 | absentanswer.com | Answering service | Unknown |
| 13 | voksha.com | Web agency | Unknown |

### Additional Competitors (to discover via SERP analysis)

| Domain | Found Via | Type |
|---|---|---|
| [TBD from SERP] | plumber website design Minneapolis | |
| [TBD from SERP] | roofing website design Minneapolis | |
| [TBD from SERP] | auto repair website Minneapolis | |
| [TBD from SERP] | contractor website St Paul | |
| [TBD from SERP] | after hours answering service Minneapolis | |

---

## Mining Template (per competitor)

### 1. Sitemap Recovery → City × Trade Matrix

**Action:** Fetch `https://domain.com/sitemap.xml` → parse all URLs → filter for city+trade patterns

**Pattern detection:**
- `/city/trade-service` (e.g., `/minneapolis/plumber-website-design`)
- `/city/trade` (e.g., `/st-paul/roofing`)
- `/trade/city` (e.g., `/plumber/minneapolis`)
- `/trade-city` (e.g., `/plumber-website-design-minneapolis`)
- `/city-trade-service` (e.g., `/minneapolis-plumber-website-design`)

**Output:** Matrix of [City] × [Trade] × [Service] with URL, title, H1, word count

### 2. Page-Level Extraction (top 20 pages per competitor)

| Field | Extraction Method |
|---|---|
| URL | From sitemap |
| Title tag | Firecrawl extract `<title>` |
| H1 | Firecrawl extract `<h1>` |
| Meta description | Firecrawl extract |
| Word count | Firecrawl extract main content |
| Schema types | Firecrawl extract JSON-LD |
| GBP link | Check footer/header for GBP link |
| Pricing displayed | Search for `$` + `/mo` or `/month` |
| Services listed | Extract service list/nav |
| Testimonials/case studies | Count and note format |
| CTA text | Primary button text |
| Contact info | Phone, email, address in footer |

### 3. GBP Analysis (per competitor location)

| Field | Source |
|---|---|
| Business name | GBP listing |
| Primary category | GBP (Website designer, Marketing agency, etc.) |
| Secondary categories | GBP |
| Review count | GBP |
| Average rating | GBP |
| Address shown | Yes/No (service-area vs storefront) |
| Photos count | GBP |
| Posts frequency | GBP |
| Q&A count | GBP |
| Service area listed | 7-county / specific cities |

### 4. Backlink Profile (free checkers)

**Tools:** Ahrefs free backlink checker, SEMrush free, Ubersuggest free, Moz Link Explorer free
**Metrics:** Domain Authority / Domain Rating, referring domains, top anchor texts, top linked pages

---

## Data Collection Plan

### Phase 1: Sitemap Crawl (all 13+ competitors)
- Automated via script or Firecrawl batch
- Output: `competitor-sitemaps/<domain>.json`

### Phase 2: City×Trade Matrix Reconstruction
- Parse all sitemap URLs for location+service patterns
- Build master matrix: rows=cities, cols=trades, cells=URLs
- Identify gaps (cities/trades competitor doesn't cover)

### Phase 3: Page Deep-Dive (top 5 pages per competitor)
- Homepage
- Top trade page (e.g., plumbing)
- Top city page (e.g., Minneapolis)
- Top city×trade page
- Pricing/services page

### Phase 4: GBP Audit
- Search each competitor brand + "Google Business Profile"
- Record metrics in template

### Phase 5: Backlink Spot-Check
- Run top 3 competitors through free checkers
- Note DA/DR, referring domains

---

## Gap Analysis Outputs

### Keyword Gap
| Keyword | Accelera Rank | Competitor 1 | Competitor 2 | ... | Opportunity |
|---|---|---|---|---|---|
| plumber website design Minneapolis | — | #3 | #1 | | Create page |
| ... | | | | | |

### Content Gap
| Content Type | Competitor Has | Accelera Has | Action |
|---|---|---|---|
| City×trade pages (24 cities × 4 trades) | ClickBuilt: 96 | 0 | Build priority subset |
| Pricing transparency | ClickBuilt: yes | Planned | Match |
| After-hours phone pages | Gorapidlocal: yes | Planned | Build |
| Booking demo interactive | None | Planned | Differentiate |
| Missed-call calculator | None | Planned | Build linkable asset |
| Original research report | None | Planned | Build linkable asset |

### Link Gap
| Referring Domain | Links to Competitor | Links to Accelera | Action |
|---|---|---|---|
| MN Plumbing Association | ClickBuilt | No | Outreach |
| Twin Cities Chamber | ProWeb365 | No | Join + listing |
| ... | | | |

---

## Competitor Strength Scoring

| Domain | City×Trade Coverage | Content Depth | GBP Strength | Backlink Authority | Pricing Transparency | Overall Threat |
|---|---|---|---|---|---|---|
| clickbuiltwebsites.com | High (96 pages) | High | Medium | Medium | High | HIGH |
| transformeddesign.com | High | High | Low | Low | Low | MEDIUM |
| gorapidlocal.com | High (answering) | Medium | High | Low | Medium | MEDIUM |
| askotter.ai | Medium (AI answering) | High | Medium | Low | Low | MEDIUM |
| answeringinnovations.com | Medium (state pages) | Low | High | Low | Low | LOW |
| ... | | | | | | |

---

## Accelera's Competitive Advantages (to emphasize)

1. **Unified offer:** Site + booking + after-hours phone in ONE Twin Cities-only package
2. **Fixed price:** $1,497 site (no monthly SEO retainer)
3. **Local:** Tyler is in Twin Cities; face + direct number on site
4. **Approve before launch:** Risk reversal competitors don't offer
5. **Original data:** 44 contractors no website, 7/8 audit booking gap — competitors don't have this
6. **No dashboard/setup burden:** Done-for-you vs. SaaS tools

---

## Next Steps

1. Run SERP analysis (SERP-ANALYSIS.md) to confirm competitor list
2. Crawl sitemaps for all confirmed competitors
3. Build city×trade matrices
4. Extract page-level data for top pages
5. Run gtm-skills SEO pipeline
6. Produce SEO-STRATEGY.md