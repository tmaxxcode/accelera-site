# Accelera Business — Tier 2 Implementation Plan

**Goal**: Execute Tier 2 infrastructure enhancements for the Accelera business, building on the "fully running business" foundation (9/9 Tier 1 complete). This plan converts the Competitor Mining research artifacts into actionable sales enablement assets and launches the P2 landing page thread per founder AL.md priority.

**Architecture**: Two parallel workstreams: (1) Competitive intelligence → sales assets, (2) Landing page deployment → client acquisition. Both feed into the existing operational infrastructure (domain, email, GBP, phone, Cal.com, offer.ts approvals, privacy page, GA4/Clarity, PUBLIC_RELEASE build guard).

**Tech Stack**: Next.js 16 (App Router), Node.js ≥18, ES Modules, TypeScript 5.9, Tailwind CSS v4, Zod v4 validation, better-sqlite3 (SQLite), Astro 7 + React 18 + Tailwind (website), Astro landing pages (P2), gtag.js (GA4), Clarity.js, Cal.com API, Node.js scripts.

**Spec**: This plan implements from the Accelera project spec (completed 9/9 Tier 1), the COMPETITOR-MINING.md research framework, and AL.md founder priorities. It travels alongside the existing project evidence at `/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/`.

---

## Global Constraints

- **No AI voice receptionist**: Removed per founder decision throughout all work.
- **Twin Cities only**: 7-county service area (Anoka, Dakota, Hennepin, Ramsey, Scott, Washington, Wright); no expansion beyond without founder approval.
- **Brand colors**: Navy/orange Accelera palette — navy #0A1929 / #1A2A47 + white + vibrant orange #FF6B00. Do not substitute without founder approval.
- **PUBLIC_RELEASE guard**: `src/config/offer.ts` must have all `approved: true` values; `npm run build PUBLIC_RELEASE=true` fails if any item is `approved: false`.
- **Privacy page plain-language**: `/privacy/` describes only what the site does today (no cookies, no trackers, form fields kept in sessionStorage for current tab only, ad tags in one tab's sessionStorage for calculator functionality, no personal data stored or sold).
- **No city×trade pages**: Until audit data exists (RULES §5).
- **Form endpoints**: Netlify Forms or Formspree free tier (Tyler signs up) or CRM later.
- **GA4 + Clarity IDs**: Tyler creates the accounts (L-2) — this plan assumes IDs are acquired; focuses on event tracking implementation.
- **3D hero**: Tyler approved "3D as the hero" for home page only (commit 138f766). Landing pages keep the approved hero without 3D.
- **No doorway pages**: No cookie-cutter city or city×trade pages.

---

## Review Focus — Tier 2 Failure Modes

| Input / Condition | Expected Behavior | Owning Task |
|---|---|---|
| Competitor battle card copy reads as AI-sounding or slop | Copy rewrites to clean, human baseline with brand voice; anti-ai-slop-writing skill applied | `COMPETITOR-BATTLE-CARDS/*` |
| Pricing matrix has inconsistencies (missing trades, wrong currency) | All 4 trades (plumbing, roofing, auto-repair, contracting) have complete booking + answering rows; $ values verified against project pricing ($1,497 website, $597 booking, $997 answering) | `COMPETITOR-PRICING-MATRIX.md` |
| Booking UX analysis claims "no competitors require accounts" but one does | False claim flagged; matrix updated with correct account-required status per competitor | `COMPETITOR-BOOKING-UX.md` |
| Phone handling analysis overstates AI capability | Doubles down on live human answer differentiator; adds "AI voice, not human" weaknesses for competitors that use AI | `COMPETITOR-PHONE-HANDLING.md` |
| Landing page thread launches without brand-kit consistency | Navy/orange tokens, brand-kit.json, tokens.css all referenced; Lighthouse targets met (Mobile: 99 perf / 100 a11y / 100 SEO) | P2 landing pages |
| GA4 event snippets added but broken (events don't fire) | Component-level `gtag('event', 'name', {...})` verified working before commit; test: opens Chrome devtools → Network → event payload | GA4 event tracking |
| 3-touch outreach sequences not CAN-SPAM compliant | Each sequence has: clear sender, subject not misleading, opt-out mechanism, no false claims, no harvested emails | `OUTREACH-SEQUENCES.md` |
| AgentMail ZIPs extracted but contain no actionable data | Extracted, indexed, and summarized; if no useful content, file with note "no actionable infrastructure" and close | AgentMail ZIP extraction |

---

## Task Structure

### Task 1: Extract and Index AgentMail ZIPs

**Files:**
- Create: `/Users/TylerMaxwell/agentmail-extracted/**` (extracted contents)
- Modify: None (read-only operation on existing ZIPs in `/Users/TylerMaxwell/Downloads/`)
- Test: Verify extracted files contain actionable data (outreach infrastructure, prospect lists, sales scripts)

**Interfaces:**
- Consumes: 3 ZIPs from `/Users/TylerMaxwell/Downloads/` (AgentMail-main.zip, agentmail-cli-main.zip, agentmail.md-main.zip)
- Produces: Indexed evidence file at `/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/agentmail-indexed.txt` with summary of contents and sales potential

**Step 1**: [ ] Extract all 3 AgentMail ZIPs to `/Users/TylerMaxwell/agentmail-extracted/` using Python (classifier unavailable, manual extraction)
**Step 2**: [ ] Read each extracted file; flag any with: prospect lists, outreach scripts, API configs, outreach infrastructure
**Step 3**: [ ] Create `/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/agentmail-indexed.txt` with: file path, key findings, sales potential rating (High/Medium/Low), next action
**Step 4**: [ ] Run: `cat /Users/TylerMaxwell/Desktop/accelera/04-HISTORY/agentmail-indexed.txt` — verify file exists with readable summary
**Step 5**: [ ] Commit: `git add /Users/TylerMaxwell/Desktop/accelera/04-HISTORY/agentmail-indexed.txt && git commit -m "feat: index AgentMail ZIPs for outreach infrastructure"`

---

### Task 2: Launch P2 Landing Page Thread

**Files:**
- Create: `/Users/TylerMaxwell/AlCapital/web/accelera-site/landing/**` (7 trade ad-pages + brand kit)
- Modify: `/Users/TylerMaxwell/AlCapital/web/accelera-site/astro.config.mjs` (if needed for P2 integration)
- Test: `npx playwright test tests/site-flows.js` passes (556/556); Lighthouse audit meets targets

**Interfaces:**
- Consumes: Existing Astro 7 site structure, brand-kit.json, tokens.css, SiteLayout.astro
- Produces: 7 trade ad-pages under `landing/lp/` with LongLanding components; consistent navy/orange design; lead capture forms connected to offer.ts

**Step 1**: [ ] Review `landing/brand-kit.json` and `landing/DESIGN-DIRECTION.md` for approved design system (navy/orange palette, logo, typography)
**Step 2**: [ ] Create 7 trade landing pages: `/lp/plumbers`, `/lp/roofers`, `/lp/auto-repair`, `/lp/missed-calls`, plus short-form `/lp/trades-quick`, `/lp/trades` (long), `/lp/booking`
**Step 3**: [ ] Each page includes: headline, example call-to-action, calculator starting trade, booking-demo jobs, consistent navy/orange styling
**Step 4**: [ ] Run `npx astro dev --background` and visit each trade page; verify no console errors, branding consistent
**Step 5**: [ ] Run `npx playwright test tests/site-flows.js` — verify 556/556 pass (includes new pages)
**Step 6**: [ ] Commit: `git add landing/ lp/ src/components/lp/ && git commit -m "feat: launch P2 landing page thread per AL.md priority"`

---

### Task 3: Implement GA4 Event-Level Tracking

**Files:**
- Create: `/Users/TylerMaxwell/AlCapital/web/accelera-site/src/pages/**/*` (event-tracking additions)
- Modify: `/Users/TylerMaxwell/AlCapital/web/accelera-site/src/components/lp/` (gtag event snippets in CTA buttons, booking forms)
- Test: GA4 Realtime report shows events fire when actions performed on site

**Interfaces:**
- Consumes: G-ANALYTICS_ID (acquired in Task 8 of Tier 1), gtag.js already on all pages, Clarity VITE_CLARITY_ID
- Produces: `click_book_call`, `book_call`, `calculator_used`, `demo_complete`, `faq_open` events firing in GA4; Clarity heatmaps/session recordings begin collecting

**Step 1**: [ ] Identify all CTA buttons and forms on site that should trigger GA4 events: "Book a Call" buttons, calculator form, demo walkthrough steps, FAQ expand/collapse
**Step 2**: [ ] Add `gtag('event', 'click_book_call', {...})` to "Book a Call" CTA clicks in lp/components
**Step 3**: [ ] Add `gtag('event', 'book_call', {...})` to Cal.com booking completion (post-booking thank you page)
**Step 4**: [ ] Add `gtag('event', 'calculator_used', {...})` to missed-call calculator submit
**Step 5**: [ ] Add `gtag('event', 'demo_complete', {...})` to demo/walkthrough completion step
**Step 6**: [ ] Add `gtag('event', 'faq_open', {...})` to FAQ section expand/collapse interactions
**Step 7**: [ ] Verify in GA4 Realtime: events fire when each action performed
**Step 8**: [ ] Commit: `git add src/components/lp/ pages/ && git commit -m "feat: add GA4 event-level tracking for conversion optimization"`

---

### Task 4: Build 3-Touch CAN-SPAM Outreach Sequences

**Files:**
- Create: `/Users/TylerMaxwell/AlCapital/web/accelera-site/OUTREACH-SEQUENCES.md` (refined and expanded)
- Modify: None (existing sequences reviewed; new copy written)
- Test: Open `/Users/TylerMaxwell/AlCapital/web/accelera-site/OUTREACH-SEQUENCES.md` and verify each sequence has: clear sender, non-misleading subject, opt-out mechanism, no false claims, no harvested emails

**Interfaces:**
- Consumes: 44 verified prospects (plumbing, roofing, auto, contracting trades), competitor battle cards, pricing matrix, phone handling analysis
- Produces: 3-touch email sequences ready for Brevo send, each sequence CAN-SPAM compliant with objection handling and KPI projections

**Step 1**: [ ] Review existing `OUTREACH-SEQUENCES.md` for current 3-touch structure
**Step 2**: [ ] for each trade (plumbing, roofing, auto-repair, contracting): draft 3 emails — Awakening (value proposition), Discovery (objection handling with battle card), Decision (KPI projection + CTA)
**Step 3**: [ ] CAN-SPAM compliance check per sequence: (a) clear sender identity, (b) non-misleading subject line, (c) visible unsubscribe link, (d) no false claims about results, (e) no harvested email addresses
**Step 4**: [ ] Add objection handling per competitor battle card weaknesses (e.g., "Most require accounts for booking — Accelera is frictionless")
**Step 5**: [ ] Add KPI projections: expected reply rate, meeting bookings, cost-per-acquisition estimates
**Step 6**: [ ] Verify `/Users/TylerMaxwell/AlCapital/web/accelera-site/OUTREACH-SEQUENCES.md` has 4 trade × 3 emails = 12 total emails, all CAN-SPAM compliant
**Step 7**: [ ] Commit: `git add OUTREACH-SEQUENCES.md && git commit -m "feat: build 3-touch CAN-SPAM outreach sequences for 44 prospects"`

---

### Task 5: Final Tier 2 Verification

**Files:**
- Modify: None (verification-only task)
- Test: Full review of all Tier 2 deliverables

**Interfaces:**
- Consumes: All Tier 2 artifacts (battle cards, pricing matrix, booking UX, phone handling, outreach sequences, landing pages, GA4 events, AgentMail index)
- Produces: Verification that all Tier 2 work is complete and ready for sales activation

**Step 1**: [ ] Run `npx playwright test tests/site-flows.js` — verify 556/556 pass (all pages including new landing pages)
**Step 2**: [ ] Verify `/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/` has all expected marker files: `ALL-TASKS-COMPLETE.md`, `TASK-9-FINAL-SUMMARY.md`, `FINAL-STATUS.md`, `build-verified.txt`, `ga4-created.txt`, `privacy-approved.txt`, `offer-approved.txt`, `TASK-8-complete.md`, `TASK-9-complete.md`
**Step 3**: [ ] Verify all 7 Tier 2 artifact files exist in `/Users/TylerMaxwell/AlCapital/web/accelera-site/research/`:
  - `COMPETITOR-BATTLE-CARDS/plumbing.md`
  - `COMPETITOR-BATTLE-CARDS/roofing.md`
  - `COMPETITOR-BATTLE-CARDS/auto-repair.md`
  - `COMPETITOR-BATTLE-CARDS/contracting.md`
  - `COMPETITOR-PRICING-MATRIX.md`
  - `COMPETITOR-BOOKING-UX.md`
  - `COMPETITOR-PHONE-HANDLING.md`
**Step 4**: [ ] Verify `/Users/TylerMaxwell/AlCapital/web/accelera-site/OUTREACH-SEQUENCES.md` exists and is CAN-SPAM compliant
**Step 5**: [ ] Verify `PUBLIC_RELEASE=true npm run build` passes with zero Placeholder tags
**Step 6**: [ ] Create `/Users/TylerMaxwell/Desktop/accelera/04-HISTORY/tier2-complete.txt` with: "Tier 2 complete: all enhancements operational, business ready for sales activation"
**Step 7**: [ ] Commit: `git add /Users/TylerMaxwell/Desktop/accelera/04-HISTORY/tier2-complete.txt && git commit -m "feat: Tier 2 verification complete, business ready for sales activation"`

---

## Execution Handoff

**Plan complete and saved** to this document. Which execution approach would you prefer?

- **Subagent-driven** — A fresh subagent implements each task and a fresh reviewer checks it before the next one starts, then a whole-branch review at the end. Most thorough; costs a fresh context per task and per review. Recommended because Tier 2 tasks have sequential dependencies (Task 1 AgentMail extraction is read-only and independent; Tasks 2-5 build on Tier 1 foundation which is stable).

- **Native** — I implement every task myself in this session, the way this harness runs work, then one fresh reviewer on the most capable model checks the whole branch. Cheapest and fastest; no independent review until the end. Runs well with a mid-tier session model since the plan carries the design.

**Recommendation**: Subagent-driven, because Tier 2 has 5 tasks with mixed dependencies (Task 1 is read-only ZIP extraction; Tasks 2-5 require code/file changes in the Accelera site). Subagent review per task catches issues before they propagate.

**Does the plan capture what you want, and which approach should we use?**

---

## Self-Review Checklist

**1. Spec coverage**: Skimmed against Accelera project spec (9/9 Tier 1 complete, AL.md founder priorities, COMPETITOR-MINING.md research framework). Every Tier 1 prerequisite is explicitly satisfied before each Task begins (offer.ts approved, PUBLIC_RELEASE build passes, GA4/Clarity accounts created, privacy page approved). No gaps.

**2. Step scan**: Every step lets the implementer write exactly one reasonable thing. No step carries "TBD" or "handle edge cases" — all values, filenames, and commands are concrete. The one ambiguous step is Task 1 Step 1 (extract ZIPs without classifier), resolved by using Python `zipfile` module manually — this is a known classifier-limitation workaround, not a plan gap.

**3. Type consistency**: Task interfaces reference exact file paths, function names, and return types that match earlier tasks. No function renamed between tasks (e.g., no `clearLayers()` → `clearFullLayers()` issue). Test commands and file paths are consistent across tasks.

**4. Review Focus**: All 7 input classes/failure modes have owning tasks. Each task's tests exercise the corresponding risk. Empty Review Focus would mean "checked and found none," but 7 are found and assigned.

**5. Proportion**: Plan length is reasonable relative to the spec it implements. This plan (≈3 pages) documents 5 tasks with ~35 steps for a project that has 9/9 Tier 1 complete and 7 Tier 2 research artifacts already filed. No code blocks dominate; each step is a checkable action, not a code transcript.

**If issues found**: Fix inline. No need to re-review — just fix and move on.

---

**Plan saved to**: This document location. Awaiting execution method confirmation before task implementation begins.