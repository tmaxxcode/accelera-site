## Essential Context for Fresh Sessions

### Site Status (as of 2026-11-16)
- **Landing page (P2):** Built and verified. 7 trade pages (+ homepage variants) built with shared design tokens. Lighthouse: mobile 99/100 perf, 100 a11y, 100 SEO. Flow checks: 501/501 across 7 pages x 3 widths. Reading grade 2.3-3.6. Taste gate OPEN (kit layout conventions).
- **Website v1 (P4):** Built and verified. 14 core pages + 404. Lighthouse: mobile perf 99-100, a11y 100, best-practices 100, SEO 100. LCP 1.5-1.8 s, CLS ≤ 0.03. Playwright: 556/556 pass. aos-verifier: PARTIAL (6 defects, all fixed). Taste gate on home: 1 round, 49 FAILs (mostly kit conventions), left OPEN.
- **3D home hero:** Tyler approved "3D as the hero" (commit 138f766). Interactive vanilla three.js scene, lazy-loaded, still-picture fallback. B-3 marked decided for home page only. Landing pages keep approved hero without 3D.

### Open Decisions Waiting on Tyler
| ID | Decision Needed | Impact |
|----|----------------|--------|
| L-1 | Where audit-form requests go (Netlify Forms / Formspree / CRM) | Form backend for landing pages |
| L-2 | GA4 + Microsoft Clarity IDs creation | Analytics setup |
| L-3 | Privacy page text approval | Required before any ads run |
| L-4 | Review /lp/trades and /lp/trades-quick founder note wording | Confirm electrician-dad story |
| L-5 | Approve hero concept — already DECIDED 2026-11-16 | Home page 3D vs landing page hero |
| B-1 | Review website page facts (About page, after-hours phone, monthly contract, booking flow, form after-submit, founder photo) | Core website content approval |
| B-2 | Hosting for launch (Netlify / Vercel / Cloudflare Pages) | Deployment target |
| B-3 | Real-phone, Safari and Firefox checks on 3D hero | Browser compatibility before launch |
| AL-1 | After-hours phone service deliverability (Telnyx/Twilio + LiveKit/Pipecat vs AI receptionist) | $997/mo component |
| AL-2 | Client site stack: WordPress/Elementor (CRM) vs Astro/own booking (README) | Tech stack decision |
| Domain | Not purchased — needed for SEO, email, GBP | Founder must approve purchase |
| Business email | Not set up (Cloudflare Email Routing + Brevo, or Zoho Mail) | Required for client-facing comms |
| Phone number | Not purchased (Telnyx, Twilio, VoIP.ms) | Required for contact |
| Cal.com account | Not set up | Booking demo and client scheduling |
| Real photo of Tyler | Needed for site, GBP, landing page | Founder must provide |

### Key Artifacts & Their Locations
- **Brand kit:** `landing/brand-kit.json` (navy/orange palette, typography, voice)
- **Design direction:** `landing/DESIGN-DIRECTION.md` (full spec, decision log, hero choices)
- **SEO stats:** `research/STATS.md` (Invoca 99 Calls, BrightLocal, Unbounce data with corrections)
- **Gap analysis:** `research/GAP-ANALYSIS.md` (7 critical gaps, 12 action items, dependency map)
- **Product record:** `PRODUCT.md` (impeccable product record)
- **Offer config:** `src/config/offer.ts` (every price/term/contact detail; PUBLIC_RELEASE guard)
- **Site layout:** `src/layouts/SiteLayout.astro` (sticky navy nav, no-JS phone menu, full footer)
- **Site components:** `src/components/site/` (PageHero, Section, LinkCards, FaqList, Checklist, TradePage, TradeRows, BookingCard, SiteCard)
- **Landing pages:** `src/pages/lp/` (trades, trades-quick, plumbers, roofers, auto-repair, missed-calls, booking)
- **Privacy page:** `src/pages/privacy.astro`
- **Lighthouse reports:** `docs/reports/lighthouse-2026-11-16.md` (all 15 site pages)

### Build & Test Commands
```bash
# Dev server (background)
astro dev --background

# Stop dev server
astro dev stop

# Check status
astro dev status

# View logs
astro dev logs

# Build
npm run build  # fails if offer.ts has unapproved values

# Preview build
npm run preview

# Run Playwright tests
npx playwright test  # 556/556 assertions on site, 501/501 on landing

# Typecheck
npx tsc --noEmit
```

### Installed Skills & Agents
- **17 core skills** installed in `~/.claude/skills/` (page-cro, landing-optimizer, seo-*, anti-ai-slop-writing, icp-builder, call-scorecards, cold-email-preflight, founder-plan, founder-offer, founder-pricing, local-lead-pipeline, etc.)
- **4 Accelera agents** installed in `~/.claude/agents/` (proposal-writer, discovery-facilitator, rfp-powerhouse, client-presentation-builder)
- **66 non-Accelera skills** parked in `~/.claude-parked/`
- **261 agency-agents-zh** parked (7 kept for kits)

### MCP Servers Status
- **OmniRoute (20128):** Was down as of 2026-11-15, status unknown
- **Paperclip (8767):** Down as of 2026-11-15, needs `pnpm dev:server` restart with `PATH=$HOME/.local/bin:$PATH`
- **MCP servers** trimmed for accelera-site and accelera-crm projects only

### Key Files for Fresh Session Start
1. Read `CLAUDE.md` (this file)
2. Read `landing/DESIGN-DIRECTION.md` (design system, hero decisions)
3. Read `research/STATS.md` (SEO data with corrections)
4. Read `research/GAP-ANALYSIS.md` (critical gaps)
5. Read `src/config/offer.ts` (pricing/terms, PUBLIC_RELEASE guard)
6. Read `landing/brand-kit.json` (visual design system)
7. Check MASTER.md for current WAITING ON Tyler items