# Accelera Website — Twin Cities Home-Service Websites + Booking + After-Hours Phone

**Status:** P2 Landing Page — IN PROGRESS (Phase 0-3 complete, building components)
**Project Lead:** Tyler Maxwell
**Last Updated:** 2026-11-13

---

## Project Structure

```
accelera-site/
├── src/
│   └── pages/
│       └── index.astro          # Current (starter) - will be replaced
├── docs/                        # Project governance
│   ├── PLAN.md                  # Approved plan with prompts P0-P7
│   ├── RULES.md                 # Hard rules + update protocol
│   └── MASTER.md                # Live status board (read first, update after every task)
├── landing/                     # Landing page artifacts (P2)
│   ├── product-page-brief.md    # Full brief: offer, buyer, brand, competitors, message architecture, design direction, build notes
│   ├── DESIGN-DIRECTION.md      # Visual spec: style, color mapping, typography, hero layout, sections, motion, responsive, trust signals
│   ├── brand-kit.json           # Colors, typography, tokens for code consumption
│   └── accelera-logo.png        # 900x200 PNG, blue gradient on transparent
├── research/                    # SEO research (P1 — 19 files, complete)
│   ├── STATS.md                 # Verified stats (Invoca, 99 Calls, BrightLocal, Unbounce, Accelera internal)
│   ├── PAIN-BANK.md             # Voice-of-customer mining (Reddit, trade groups, competitor reviews)
│   ├── MESSAGE-MAP.md           # 4 objections → message pillars + landing variants
│   ├── KEYWORD-UNIVERSE.md      # 384 Tier 1, 144 Tier 2a, 24 Tier 2b, 8 Tier 3, Support keywords
│   ├── SERP-ANALYSIS.md         # 30 priority keywords, Firecrawl template
│   ├── COMPETITOR-MINING.md     # 13+ competitors, sitemap/GBP/backlink framework
│   ├── LOCAL-AUDIT-DATASET.md   # 24 cities framework, Apify plan
│   ├── ACCOUNT-INTELLIGENCE.md  # ICP firmographics, tech stack, buying signals
│   ├── OPPORTUNITY-INVENTORY.md # Content gaps mapped to keyword clusters
│   ├── KEYWORD-VALIDATION.md    # Free-source validation plan (GKP pending)
│   ├── SERP-QUALIFICATION.md    # Difficulty + intent scoring
│   ├── BUSINESS-FIT-FILTER.md   # Traffic vs. conversion potential
│   ├── TOPIC-SHAPING.md         # Page-by-page content briefs
│   ├── SEO-STRATEGY.md          # 13-page roadmap: keyword→page map, build order, GBP, citations, links, AI search, KPIs, 90-day calendar
│   ├── KEYWORD-RESEARCH-SOURCES.md # 4 free sources found (seo-intel primary)
│   ├── MN_TOP50_CITIES.md + .json # Top 50 MN cities, 24-city audit selection
│   ├── MN_SEASONAL_NICHES_NOVEMBER.md # 5-tier priority, 10 prospect hooks, 4-week calendar
│   └── GAP-ANALYSIS.md          # 7 critical gaps, 12 action items
├── components/                  # Astro/React components (to be built)
├── scripts/                     # Build/utility scripts (to be added)
└── public/                      # Static assets
```

---

## Next Work: Build Landing Page Variants

Per `product-page-brief.md` and `DESIGN-DIRECTION.md`:

**Variants to build** in `src/pages/lp/`:
- `/lp/missed-calls` (phone angle)
- `/lp/booking` (booking-gap angle)
- `/lp/plumbers` (trade-specific)
- `/lp/roofers` (trade-specific)
- `/lp/auto-repair` (trade-specific)

**Components needed** (see `DESIGN-DIRECTION.md` for full spec):
- Hero (5 message-matched variants A-E)
- ProofBar (3 sourced stats)
- Calculator (missed-call, labeled defaults per trade)
- OfferStack (3 tiers, guarantee badges in #00A859)
- BookingDemo (4-step interactive, labeled DEMO)
- Steps (4-step visual timeline)
- FAQ (4 objection pillars)
- StickyCTA (mobile bar with guarantee row)
- FounderNote

**Stack:** Astro (static) + Three.js island (light hero) + GSAP/ScrollTrigger + Lenis

**CWV targets:** LCP <1.5s mobile, INP <200ms, CLS <0.1

---

## Key Dependencies (Waiting on Tyler)

| Item | Needed For | Status |
|------|------------|--------|
| Domain | SEO, email, GBP, landing page URLs | OPEN |
| Google Ads account (GKP) | Keyword volume validation (384 Tier 1) | OPEN |
| GBP address decision | Local SEO + map pack | OPEN |
| Tyler photo | Site, GBP, landing page | OPEN |
| Cal.com account | Booking demo, client scheduling | OPEN |
| Business email + phone | Contact, outreach, P3 | OPEN |

---

## Commands

```bash
# Dev server (background)
cd /Users/TylerMaxwell/AlCapital/web/accelera-site
astro dev --background

# Build
astro build

# Preview build
astro preview
```

---

## Rules Reference

**All agents must follow:**
1. Read `docs/MASTER.md` first, update after every task
2. Drafts only — Tyler sends every real message
3. CRM writes only through accelera MCP
4. Ask before spending money
5. Every stat needs primary source URL, date, sample size
6. No doorway pages without unique local content
7. Work in `~/AlCapital/` only — never overwrite originals in `/extracted/` or `.claude/plans/`
