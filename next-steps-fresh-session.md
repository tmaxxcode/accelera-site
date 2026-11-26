## Fresh Session Onboarding Checklist

When starting a new Claude Code session for this project, follow these steps in order:

### Step 1: Quick Environment Check
```bash
# Verify OmniRoute is running
curl -fs -m 2 -o /dev/null http://localhost:20128/api/health && echo "OmniRoute: OK" || echo "OmniRoute: down"

# Check dev server
npx astro dev --background  # starts in background
```

### Step 2: Read the Essentials (in order)
1. `CLAUDE.md` — this file (commands, architecture, hard rules)
2. `landing/DESIGN-DIRECTION.md` — design system, hero decisions, color palette
3. `research/STATS.md` — SEO data (Invoca 99 Calls, BrightLocal, Unbounce) + corrections appendix
4. `research/GAP-ANALYSIS.md` — 7 critical gaps + 12 action items
5. `src/config/offer.ts` — pricing/terms, PUBLIC_RELEASE guard (must all be approved for build)
6. `landing/brand-kit.json` — visual design system (navy/orange Accelera palette)

### Step 3: Check Current Context
```bash
# Check MASTER.md for Waiting on Tyler items
curl -s -m 3 http://localhost:127.0.0.1:8767/api/state 2>/dev/null || echo "Paperclip: check manually"

# Or read the file
cat ~/AlCapital/MASTER.md | head -80
```

### Step 4: Choose Your Thread
Based on MASTER.md, the active threads are:

| Thread | Prompt | Status | Next Step |
|--------|--------|--------|-----------|
| L | Landing page (P2) | WAITING ON TYLER | L-1..L-5 decisions needed |
| B/C | Website v1 (P4) | WAITING ON TYLER | B-1..B-3 reviews needed |
| P1 | Research & SEO | WAITING ON TYLER | Domain, Google Ads, GBP, photo, Cal.com, email/phone |
| P4 | Website | WAITING ON TYLER | Tyler reviews B-1, B-3, L-3 then deploy |

### Step 5: Common Open Items (from MASTER.md)
**Domain:** Not purchased — needed for SEO, email, GBP. Founder must approve purchase.
**Business email:** Not set up. Options: Cloudflare Email Routing + Brevo free SMTP, or Zoho Mail free.
**Phone number:** Not purchased. Options: Telnyx, Twilio, VoIP.ms for local 612/651 (~$1–1.15/mo + usage).
**Cal.com account:** Not set up. Tyler sets up for booking demo and client scheduling.
**Real photo of Tyler:** Needed for site, GBP, landing page. Founder must provide.
**GA4 + Clarity IDs:** Tyler creates the accounts.
**Privacy page text:** Draft at /privacy/ — plain-language, no cookies, no trackers, form fields, ad tags in one tab sessionStorage. Must be approved before ads run.

### Step 6: Start Working
Based on your assigned thread:

#### If working on Landing Page (L):
```bash
# Build is already done; preview it
npm run preview

# Run flow checks
npx playwright test  # 501/501 across 7 pages x 3 widths

# Key files to modify
src/pages/lp/trades.astro        # long landing page
src/pages/lp/trades-quick.astro  # short landing page
src/pages/lp/plumbers.astro      # trade page
src/pages/lp/roofers.astro
src/pages/lp/auto-repair.astro
src/pages/lp/missed-calls.astro
src/pages/lp/booking.astro       # booking page (newest)
src/components/lp/LongLanding.astro  # shared component
src/styles/tokens.css            # navy/orange palette
landing/brand-kit.json           # design system
landing/DESIGN-DIRECTION.md      # decision log
```

#### If working on Website v1 (B/C):
```bash
# Build is already done; preview it
npm run preview

# Run flow checks
npx playwright test  # 556/556 across 14 pages x 4 widths

# Key files to modify
src/pages/home.astro              # home page (with 3D hero)
src/pages/minnesota-[123].astro   # 3 Minnesota service pages
src/pages/trades-[1234].astro     # 4 trade pages
src/pages/pricing.astro           # pricing page
src/pages/how-it-works.astro
src/pages/about.astro
src/pages/faq.astro
src/pages/contact.astro
src/pages/calculator.astro       # missed-call calculator
src/layouts/SiteLayout.astro     # sticky navy nav, no-JS phone menu
src/components/site/              # all site components
src/config/site.ts                # page list, schema builders
src/config/schema.ts              # JSON-LD schema
src/pages/privacy.astro          # privacy page draft
```

### Step 7: Build & Verify
```bash
# Build — will fail if offer.ts has unapproved values
npm run build

# If build passes, preview
npm run preview

# Run tests
npx playwright test  # verify all assertions pass

# Lighthouse check (optional)
npx astro db:execute "SELECT * FROM lighthouse"  # or just run manual preview check
```

### Step 8: Report Status
After completing work, append to MASTER.md log line and update the Waiting on Tyler table. Write a brief session summary following the format in `~/AlCapital/briefs/YYYY-MM-DD.md`.

### Efficiency Tips for This Session
1. **OmniRoute is auto-configured** — web research, file sifting, summarizing all route to free model
2. **Keep effortLevel low** for routine tasks (already set in `~/.claude/settings.json`)
3. **Use graph tools** (`search_graph`, `trace_path`) instead of grep for codebase queries — 160x more token-efficient
4. **Start fresh session** after 3-5 exchanges; export context to `brief-context.md` before switching
5. **PUBLIC_RELEASE guard:** `npm run build` fails if `src/config/offer.ts` has any `approved: false`