# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Task | Command |
|------|---------|
| Start dev server (background) | `astro dev --background` |
| Stop dev server | `astro dev stop` |
| Check dev server status | `astro dev status` |
| View dev server logs | `astro dev logs` |
| Build site | `npm run build` |
| Preview build | `npm run preview` |
| Run Astro CLI | `npx astro` |
| Run Playwright tests | `npx playwright test` |
| Run typecheck | `npx tsc --noEmit` |

## Architecture Overview

This is an **Astro 7** site with React 18 and Tailwind CSS 3. The codebase is split into two main sections:

### Landing Pages (P2) — `src/pages/lp/` and `landing/`
- **7 trade ad-pages:** `/lp/trades` (long), `/lp/trades-quick` (short), `/lp/plumbers`, `/lp/roofers`, `/lp/auto-repair`, `/lp/missed-calls`, `/lp/booking`
- **Shared design tokens:** `src/styles/tokens.css`, `landing/brand-kit.json`
- **Shared component:** `src/components/lp/LongLanding.astro`
- **Trade pages:** Each has its own headline, example call, calculator starting trade, and booking-demo jobs
- **Design system:** Navy/orange Accelera colors — navy #0A1929 / #1A2A47 + white + vibrant orange #FF6B00
- **Form handling:** Built but sends nothing; config at `src/config/offer.ts` (PUBLIC_RELEASE guard)
- **Lighthouse targets:** Mobile 99 perf / 100 a11y / 100 SEO

### Website v1 (P4) — `src/pages/`, `src/layouts/`, `src/components/site/`, `src/config/`
- **14 core pages:** home, 3 Minnesota service pages, 4 trade pages, pricing, how-it-works, about, FAQ, contact, missed-call calculator + 404
- **Layout:** `SiteLayout.astro` — sticky navy nav, no-JS phone menu, full footer, canonical, JSON-LD
- **Schema:** ProfessionalService (no address/phone/price until approved), Service, FAQPage, BreadcrumbList
- **Site components:** PageHero, Section, LinkCards, FaqList, Checklist, TradePage, TradeRows, BookingCard, SiteCard
- **14 Playwright test assertions** (536/556 pass across all pages at 390/768/1024/1440)
- **Lighthouse targets:** Mobile perf 99-100, a11y 100, best-practices 100, SEO 100, LCP 1.5-1.8 s, CLS ≤ 0.03

### Key Directories
- `src/pages/` — Astro pages (both LP and website)
- `src/layouts/SiteLayout.astro` — main site layout
- `src/components/site/` — reusable site components
- `src/components/lp/` — landing page components
- `src/config/` — offer.ts (prices/terms), site.ts (page list, schema), schema.ts
- `landing/` — brand-kit.json, accelera-logo.png, DESIGN-DIRECTION.md
- `research/` — SEO research outputs (STATS.md, GAP-ANALYSIS.md, etc.)
- `tests/` — site-flows.js, lp-flows.js

## Hard Rules (from AL.md / RULES.md)

1. **PUBLIC_RELEASE guard:** `src/config/offer.ts` must have all `approved: true` values, or `npm run build` fails with a Placeholder tag
2. **Brand colors:** Navy/orange Accelera palette — do not substitute without founder approval
3. **No city×trade pages** until audit data exists (RULES §5)
4. **Form endpoints:** Netlify Forms or Formspree free tier (Tyler signs up) or CRM later
5. **GA4 + Clarity IDs:** Tyler creates the accounts (L-2)
6. **Privacy page:** Plain-language, describes only what the site does today (no cookies, no trackers, form fields, ad tags in one tab sessionStorage) — draft at `/privacy/`
7. **3D hero:** Tyler approved "3D as the hero" for home page only (commit 138f766). Landing pages keep the approved hero without 3D.
8. **No doorway pages** — no cookie-cutter city or city×trade pages

## Current Founder Priorities (from AL.md)

- **Main priority:** Getting the Accelera website built
- **Order:** Finish landing page first (thread L, P2), then the full website (B/C, P4)
- **All calls removed** from to-do lists (founder task 5d3ba693 withdrawn)
- **Sales prep** parked until Tyler says otherwise

## Important Externally Referenced Files

- `~/Desktop/accelera/01-COMPANY/5-chief-of-staff-al-capital/AL.md` — Al's operating manual (duties, run procedure, routing, kits)
- `~/Desktop/accelera/site/docs/MASTER.md` — Status board, current facts, Waiting on Tyler table
- `~/Desktop/accelera/site/docs/PLAN.md` — Approved 30/60/90-day plan to first revenue
- `~/Desktop/accelera/01-COMPANY/5-chief-of-staff-al-capital/briefs/YYYY-MM-DD.md` — Daily briefs
- `~/Desktop/accelera/00-START-HERE/OVERVIEW.md` — Consolidated start-here overview
- `~/Desktop/accelera/03-TOOLS/skills-library/SKILLS-INDEX.md` — 583 skills from 8 sources
- `~/Desktop/accelera/site/docs/PLAN.md` — Consolidated plan
- `~/Desktop/accelera/site/docs/RULES.md` — Hard rules + update protocol

## Quick References

- **Brand kit:** `landing/brand-kit.json` (navy/orange palette)
- **Design direction:** `landing/DESIGN-DIRECTION.md` (full spec, decision log)
- **SEO stats:** `research/STATS.md` (Invoca 99 Calls, BrightLocal, Unbounce data)
- **Gap analysis:** `research/GAP-ANALYSIS.md` (7 critical gaps, 12 action items)
- **Product record:** `PRODUCT.md` (impeccable product record)
- **Offer config:** `src/config/offer.ts` (every price/term/contact detail)