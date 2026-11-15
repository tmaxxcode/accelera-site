# Accelera: website built from scratch to rank and convert + Local SEO strategy + Al Capital

## Context
Accelera sells websites, online booking and after-hours phone answering to Twin Cities home-service businesses (plumbing, roofing, auto repair, contracting).

Tyler wants Accelera's own website **built from scratch**:
- high-converting and trust-building, using data-backed claims;
- copy at a true professional level, written for what owner-operators want to see;
- built to rank for **"[MN city] + [Accelera service]"** and **"Minnesota + [service]"** searches.

That needs real local SEO research, competitor mining and a full ranking strategy. Al Capital (chief of staff) and the skills library run alongside. The old builds (`accelera-site-v2`, `accelera-3d`) are **reference only**: lessons, facts and concepts carry over, the code does not.

## What the research found (2026-11-12; all URLs researched that day)

**How local rankings work in 2026**
- **Map pack / Maps weighting:** Google Business Profile signals 32%, reviews 20%, on-page 15%, then behavioral, links and citations (Whitespark 2026 Local Search Ranking Factors via advicelocal.com/blog/2026-local-search-ranking-factors-maps-organic-ai; whitespark.ca/local-search-ranking-factors).
- A **visible address is the #7 map-pack factor** in 2026 (whitespark.ca/blog/7-local-search-ranking-factors…).
- Reviews keep rising in weight while links fall. Experts now treat AI-search visibility as its own surface: brand mentions, best-of lists, multiple review sites.
- **This means Accelera needs a verified Google Business Profile** with the right primary category, reviews and an address strategy. A website alone won't win the map pack.

**Competitor pattern: who ranks for our searches**
- **Trade × city pages win.** Examples:
  - `transformeddesign.com/plumber-website-design-minneapolis`
  - `clickbuiltwebsites.com/st-paul/plumber-marketing` (a full city × trade matrix, published pricing of $700/$1,100/$2,100 a month for SEO)
  - `gorapidlocal.com/grow/answering-service/plumbing/saint-paul`
  - `askotter.ai/minneapolis/roofers`
  - `proweb365.com/plumber-marketing`
  - `wyfimarketing.com/hvac-plumbing-electrical-web-design-mn`
  - `answeringinnovations.com/states/minnesota/minneapolis`
- Accelera's advantage: **site + booking + after-hours phone in one Twin Cities-only offer**. Competitors split these across separate companies.

**Data-backed trust and conversion facts usable on the site** (primary sources only; vendor studies labeled or skipped)
- Invoca, 60M+ calls: 27% of calls to home-service businesses go unanswered; fewer than 3% of callers sent to voicemail leave a message; phone leads convert at 46% on the call (invoca.com/blog/how-much-missed-sales-calls-cost-home-services-businesses).
- 99 Calls, 36,498 contractor calls: 48.3% average live-answer rate; **roofers 28.1%**, plumbers 58% (99calls.com/blog/contractor-call-answer-rate-benchmarks).
- BrightLocal 2026: 97% read reviews; **54% visit the business's website after reading positive reviews**; only about 40% of local businesses have a dedicated website; 35% have a Google Business Profile; 72% look at 3 or fewer businesses; 75% decide in under 30 minutes (brightlocal.com/research/local-consumer-review-survey; brightlocal.com/resources/local-seo-statistics).
- Accelera's own data: 44 top-rated metro companies with no website (leads.csv); 7 of 8 audited prospects advertise booking but have no scheduler (sync file).
- **Do not use:** "62% of calls go unanswered" or "$126K lost per year". They are widely repeated vendor numbers with weak sourcing.

**Tooling reality**
- Keywords Everywhere has **0 credits**, so volume data comes from free sources (Google Keyword Planner via a free Google Ads account, autocomplete, People Also Ask, Google Trends, then Search Console once live), or from paid credits if Tyler approves.
- `~/seomachine` includes SERP, competitor, gap and topic-cluster scripts that expect DataForSEO (paid); they can be adapted to Firecrawl.
- gtm-skills has a complete SEO pipeline: `seo-business-context` → `seo-opportunity-extraction` → `seo-keyword-validation` → `seo-serp-qualification` → `seo-business-fit-filter` → `seo-topic-prioritization` → `seo-topic-shaping`.

## Local SEO strategy (hypothesis; Phase A validates it with data)

**Keyword families**
| Tier | Family | Examples | Why |
|---|---|---|---|
| 1, win first | Trade × service × geo | "plumber website design Minneapolis", "roofing website design Minnesota", "contractor website design MN", "auto repair shop website St Paul", "after hours answering service for plumbers Minneapolis", "online booking for contractors Minnesota" | High buyer intent, few strong pages, matches the offer exactly |
| 2 | Service × suburb | "web design Maple Grove MN", "website design Woodbury MN", "web designer Lakeville", plus Blaine, Coon Rapids, Eagan, Burnsville, Plymouth, Edina, Bloomington, Brooklyn Park | Thinner agency competition than the core cities; map pack depends on proximity |
| 2 | Service × state | "web design Minnesota", "Minnesota answering service", "small business website design MN" | Tyler's "Minnesota + service" ask; reached through organic results, not the map pack |
| 3, long game | Head terms | "web design Minneapolis", "website design St Paul", "Minneapolis SEO" | Crowded by established agencies; needs authority built over time |
| Support | Problem / cost / AI answers | "how much does a plumber website cost in Minnesota", "do contractors need a website", "cost of missed calls for contractors" | Earns links, AI citations and top-of-funnel traffic, and feeds internal links |

**Site architecture (from scratch)**
- `/`: Twin Cities home-service websites + booking + phone.
- `/website-design-minnesota`, `/online-booking-minnesota`, `/after-hours-answering-service-minnesota`: state-level service pages.
- `/plumbers`, `/roofers`, `/auto-repair`, `/contractors`: trade pages (trade × Minnesota).
- `/minneapolis`, `/st-paul`, then priority suburbs: city hubs (service × city).
- City × trade pages, e.g. `/minneapolis/plumber-website-design`, **only where the data justifies them** and each has unique local content. Doorway-style city pages violate Google's spam policy.
- Unique local content per city comes from **Accelera's own audit data**: number of ICP businesses, share without a website or booking, review counts (Apify/Maps data). That is original data competitors don't have.
- `/pricing` (transparent), `/how-it-works` (two weeks, approve before launch), `/work` (concepts now, client cases with permission), `/about` (Tyler, local, real photo), `/faq`, `/contact`.
- **Linkable assets:**
  - `/tools/missed-call-calculator`;
  - `/research/twin-cities-home-service-website-report`: an audit of N metro contractors' websites, booking and Google profiles. Observation only, no contact with businesses. Built for press, links and AI citations.

**Off-site and Google Business Profile**
1. Google Business Profile, verified by Tyler:
   - real business name (no keyword stuffing; suspension risk);
   - primary category Website designer, plus the most relevant secondary categories;
   - services listed, 7-county service area, photos, weekly posts, Q&A, a review-request routine.
   - **Address decision:** visible office vs. hidden service-area business. Visible ranks better (factor #7), but showing a home address is a privacy choice.
2. Consistent name, address and phone (NAP) everywhere. Citations:
   - Apple Business Connect, Bing Places, Yelp, BBB, Facebook, Nextdoor;
   - agency directories Clutch, UpCity, DesignRush;
   - Twin Cities chambers;
   - MN trade associations (verify which exist).
3. Links: trade associations and sponsorships, outreach on the original research to local business press (each outlet verified first), partner pages (phone and booking vendors).
4. AI search:
   - Organization + LocalBusiness schema, consistent entity data, llms.txt, don't block AI crawlers;
   - reviews on several platforms; get onto best-of lists.
5. Reviews: ask every client, reply to every review.
6. Measure:
   - Search Console, Bing Webmaster, GA4;
   - GBP insights;
   - a monthly SERP and map check per target keyword (free, via Firecrawl with location);
   - calls and bookings from the site.

## Website: conversion and copy standards
- **Copy process:**
  1. Voice-of-customer mining: owner pain language from Reddit (r/Plumbing, r/Roofing, r/Contractor), Facebook trade groups, and competitors' reviews and complaints.
  2. Message map built on the known objections: burned by SEO agencies, $997/mo is steep, "my wife takes the calls", too busy.
  3. Headline and offer variants.
  4. Write at a grade 6–8 reading level, mobile-first. Owners read on a phone in the truck.
- **Copy skills:** seomachine marketing skills (copywriting, CRO), gtm-skills `positioning-messaging-designer` and `pain-is-the-pitch`, `hook-creator`, `humanizer`, `landing-page-review`, `landing-optimizer`, Persona walkthrough agent (owner-operator), `sales-objections`.
- **Trust stack:**
  - sourced stats with links, transparent prices, fixed scope, two-week timeline, approve-before-launch;
  - guarantee and ownership terms, **only once Tyler confirms them**;
  - Twin Cities only; Tyler's face and direct number;
  - live booking demo, missed-call calculator;
  - concept work clearly labeled. **Nothing fabricated:** no fake reviews, logos or clients.
- **Conversion mechanics:**
  - sticky click-to-call and "Book a call" on mobile;
  - Cal.com booking (Tyler's account), forms with 3 fields or fewer;
  - one primary action per page; the guarantee next to the CTA;
  - GA4 events `call_click`, `book_call`, `calculator_used`, `demo_complete`.
- **Impressive but fast:**
  - interactive 3D hero and scroll animation **loaded only after content and CTA render**;
  - static poster fallback for reduced motion or no WebGL;
  - Core Web Vitals pass: LCP under 2.5 s mobile, INP under 200 ms, CLS under 0.1;
  - Lighthouse mobile ≥ 90 performance, 100 accessibility, 100 SEO.
- **Stack:** Astro (static output, zero JS by default, content collections for city/trade pages, islands for the 3D hero and calculator) + Three.js. Free hosting on Netlify, Vercel or Cloudflare Pages. A real domain is needed for SEO; Tyler buys it.
- **Build skills:**
  - Design: `design-taste-frontend`, `impeccable`, `ui-ux-pro-max`, `frontend-design`, `apple-design`, `brand-kit`, `logo-designer`.
  - 3D and motion: `3d-web-experience`, `web3d-integration-patterns`, `animate`, `choreograph`, `emil-design-eng`, then `review-animations`, `animation-performance`.
  - SEO: `seo-audit`, `technical-seo-checker`, `on-page-seo-auditor`, `structured-data`, `schema-markup-generator`, `cwv-audit`.
  - QA: `break-ui`, accessibility audit, `impeccable-finish-reviewer`, `design-is`, then **aos-verifier** for an independent PASS/FAIL.

## Best tool combination for a high-end site (reviewed 2026-11-12)
All four of these are already installed or connected. Each gets one job so they don't fight over direction:

| Tool | What it is | Its role here |
|---|---|---|
| **impeccable** v4.8.2 (`~/.claude/skills/impeccable`, Apache 2.0) | Design director with commands: `shape`, `init` (PRODUCT.md), `document` (DESIGN.md), `critique`, `audit`, `polish`, `bolder`, `typeset`, `layout`, `animate`, `overdrive`, `live`/`generate` (pick variants in the browser), `optimize`, `harden`. Modes: **Persuade** (landing pages, marketing) vs Read. | **Leads direction and iteration.** `init` → PRODUCT.md, `shape` the page, `live`/`generate` for hero and section variants, `critique` and `polish` before ship. The website uses Persuade + Read; the landing page is pure Persuade. |
| **taste skill** (`design-taste-frontend` 2.5.1; a `taste-skill-main` zip in Downloads may be newer) | Anti-slop company-site system with a real-browser **checker + finish gate**: perf, copy-lint, contrast, moments, a library of scenes, effects and UI. | **The hard quality gate**, plus its effects and moments library. Compare the zip's version with the installed one and keep the newer. |
| **emilkowalski/skills** (MIT, about 55k★; 12 skills, all installed: emil-design-eng, animate, choreograph, review-animations, improve-animations, find-animation-opportunities, animation-vocabulary, apple-design, pick-ui-library, prototype, ask-sonner, write-swift) | Design-engineering and motion craft | **Owns all motion and micro-interactions:** `animate`/`choreograph` to build, `review-animations` + `animation-performance` to vet, `prototype` for 3 genuinely different heroes, `pick-ui-library` for components. |
| **Playwright MCP** (connected) | Real browser automation: navigate, screenshot, resize, click, type, evaluate, network | **The eyes and the test harness:** screenshots at 390/768/1024/1440, CTA and form flows, the calculator, the reduced-motion path, console errors, and performance traces with Core Web Vitals checked in `evaluate`. Every gate result comes with a screenshot. |

**Open-source 3D/motion stack (verify licenses in Phase A):**
- three.js (MIT)
- React Three Fiber + drei + pmndrs/postprocessing (MIT), as an Astro React island
- GSAP + ScrollTrigger (free, including plugins)
- Lenis smooth scroll (MIT)
- Theatre.js (core Apache 2.0) for an authored cinematic camera path
- gltf-transform / meshoptimizer for small assets
- Blender for any custom models

Reference builds for techniques: Codrops/Tympanus demos (e.g. the Theatre.js + R3F scroll fly-through), Awwwards three.js collection, utsubo.com "Best Three.js Websites 2026".

**Rule:** the 3D never blocks content. Text and CTA render first and the scene loads after. The landing page gets a light hero only, because paid traffic needs speed.

## Landing page for ads and social (separate from the website)
The website ranks and educates. **The landing page converts paid and social traffic.** One page, one offer, one action.

**Data it's built on** (Unbounce 2024 Conversion Benchmark Report: 41,000 pages, 464M visits, 57M conversions; unbounce.com/conversion-benchmark-report; unbounce.com/landing-pages/whats-a-good-conversion-rate):
- Median landing page conversion is **6.6%**; commercial and professional services 6.1%; repair/maintenance pages convert about 3× home/renovation pages.
- **5th–7th grade copy converts at 11.1% vs 5.3%** for professional-level copy.
- Business-services pages with **fewer than 100 words convert 50% better** than pages with 500+ (via zoominfo citing Unbounce). So build a short variant and a long variant and test them.
- Traffic source matters: paid social 12%, paid search 10.9%, email 19.3% median.
- Speed: a 1 s load converts about 3× a 5 s load (cited in barhammarketing.com; trace the original Portent study before using it).
- Treat secondary claims like "single CTA = +266%" and per-field form rates as **unverified until traced to Unbounce or HubSpot primary data**. Phase A also checks whether a newer 2026 Unbounce report exists.

**Page anatomy:**
1. **Message-matched hero.** Headline repeats the ad's promise. One-line subhead. One CTA (e.g. "Get your free missed-call & booking audit" or "Book a 15-minute call"). Click-to-call. No site navigation (1:1 attention ratio).
2. **Proof bar:** sourced stats (Invoca 27% of calls unanswered, fewer than 3% leave voicemail; 99 Calls roofers answer 28.1%), Twin Cities only, Tyler's face.
3. **Problem → cost:** the missed-call calculator with labeled example defaults.
4. **Offer stack:** site + booking + after-hours phone, live in two weeks, approve before launch, transparent price anchor.
5. **Interactive booking demo:** the product in 10 seconds.
6. **3-step how it works.**
7. **Risk reversal:** guarantee and ownership terms, **only once Tyler confirms them**.
8. **Objection FAQ:** burned by SEO agencies; $997/mo; "my wife takes the calls"; too busy.
9. **Founder note + final CTA.** Sticky mobile CTA bar. Form of 3 fields or fewer, or a 2-step form.

**Variants:**
- `/lp/missed-calls` (phone angle), `/lp/booking` (booking-gap angle);
- trade versions `/lp/plumbers`, `/lp/roofers`, `/lp/auto-repair`, each matched to its ad set.
- All `noindex`, with UTM capture.

**Lead magnet (low commitment):** a free **missed-call & booking audit** of the owner's business: website, booking, GBP and review check, prepared by agents and reviewed and sent by Tyler.

**Measurement:**
- GA4 + UTM;
- Meta pixel + Conversions API (`meta-capi` skill) when ads start;
- Microsoft Clarity heatmaps (free);
- A/B split via the host's split testing or GrowthBook (open source).
- Target: beat 6.1% (the services median) first, then aim for top quartile.

**Skills:**
- impeccable (Persuade mode), `hook-creator`, `ad-copy-writer` (message match);
- gtm-skills `ads-offers-strategy`, `lead-form-optimization`, `pain-is-the-pitch`;
- Offer & Lead Gen Strategist agent;
- seomachine CRO/landing skills, `landing-page-review`, `landing-optimizer`;
- Persona walkthrough agent (LIFT/Cialdini/Fogg) as an owner-operator;
- `humanizer`; reading-grade check (target grade 5–7).

## Email + phone: open-source and free options for Tyler
**Business email address** (needed for the site, GBP and outreach):
- Cloudflare Email Routing (free forwarding to Gmail), plus a free SMTP relay for "send as": Brevo free tier, or Resend/Amazon SES for low volume.
- Or Zoho Mail's free plan; verify current limits.
- Don't self-host a mail server (Mailcow/Stalwart): deliverability is hard.
- Set SPF, DKIM and DMARC (`deliverability-check` skill).

**Email creation and sending (open source):**
| Tool | License | Use |
|---|---|---|
| React Email / MJML / Maizzle | MIT | Build responsive email templates (newsletter, nurture, proposals) in code |
| listmonk (v6.2, about 23k★) | AGPL-3.0 | Self-hosted newsletter and list manager on SES/SMTP. Light; no journeys. |
| Mautic (7.2) | GPL-3.0 | Full marketing automation: journeys, triggers, scoring |
| Keila | AGPL | Open-source Mailchimp-style editor + forms |

Source: octeth.com/self-hosted-email-marketing-software (2026-11-12). Recommendation: React Email templates + listmonk on the Oracle VM later. Cold outreach stays manual and CAN-SPAM compliant, and Tyler sends it.

**Phone numbers:**
- Numbers themselves are never open source; they come from a carrier.
- **Cheapest real local (612/651) number:** Telnyx or Twilio (about $1–1.15/mo + usage), or VoIP.ms. Google Voice is free but personal-tier.
- **Open-source stack on top of the number:**
  - **LiveKit Agents** (Apache 2.0; native SIP, phone numbers, turn-taking) or **Pipecat** (BSD-2) for an AI after-hours receptionist that answers, reads back the address and books to the calendar;
  - starter repos: `lobbystack/lobbystack`, `kirklandsig/AIReceptionist`;
  - Asterisk/FreeSWITCH (open-source PBX) only if a full phone system is needed.
- Model costs for speech-to-text, LLM and text-to-speech apply unless run locally. Local options like Whisper/Kokoro add latency.
- **This feeds founder task `5c6a0b43`** (is the $997/mo phone service deliverable?). Phase A builds a cost-per-client and latency test before any client promise.
- Legal check before launch: Minnesota call-recording consent and AI-disclosure rules.

## Phases
**A. Research sprint** (Al owns it; FCC runs it). Outputs go to `~/AlCapital/research/seo/`:
1. Keyword universe: services × trades × geos (Minnesota, MN, Twin Cities, Minneapolis, St Paul, and the 7-county cities by population) × modifiers (near me, cost, best, company). Volumes from a free source unless Tyler approves paid credits.
2. SERP check for each target: map pack vs organic, who ranks, page type, depth, schema, and difficulty.
3. Competitor mining of 15–25 competitors (the ones above plus whatever else ranks):
   - crawl sitemaps to recover their city × trade page matrices;
   - titles, H1s, schema, word counts, pricing;
   - GBP category and review counts;
   - backlinks from free checkers.
   - Output: keyword gap, content gap and link gap.
4. Run the gtm-skills SEO pipeline to prioritize, then produce **`SEO-STRATEGY.md`**: target keyword → page map, build order, GBP plan, citation list, link plan, AI-search plan, KPIs and a 90-day calendar.
5. Voice-of-customer pain bank + `MESSAGE-MAP.md`; a sourced stats sheet (`STATS.md`, each stat with URL, date and sample size).
- **Check:** every keyword has a source for its volume or is marked "unvalidated"; every stat has a primary URL; Tyler approves the strategy.

**B. Copy + design:** sitemap and wireframes, page copy for v1 pages, 3 hero directions behind a picker. Tyler approves the copy and picks a hero.

**C. Build v1 (launch fast, expand weekly):**
- Pages: home, the 3 state service pages, the 4 trade pages, Minneapolis and St Paul hubs, pricing, how-it-works, about, FAQ, contact, the calculator.
- Schema, sitemap, robots, Search Console + Bing.
- Every gate passes, then launch on the real domain.
- **Check:** live Lighthouse/Core Web Vitals, schema validation, Search Console sitemap accepted, CTA flows work, aos-verifier PASS.

**L. Landing page:** ships **before** the full website, since it is one page and paid/social traffic needs it first.
- Copy from the message map at grade 5–7; short and long variants.
- impeccable `shape` → `live`/`generate` hero variants; Emil motion; light hero only.
- Playwright tests every flow at 390/1024/1440.
- **Check:** LCP under 1.5 s mobile on the live URL, form and click-to-call work, UTMs captured, GA4 events fire, readability grade ≤ 7, taste gate + impeccable `critique` pass, aos-verifier PASS.

**E. Email + phone (alongside L):**
- Domain email with SPF, DKIM and DMARC passing.
- React Email templates (audit report, follow-up, proposal).
- A Telnyx/Twilio local number for Accelera.
- A LiveKit Agents (or Pipecat) after-hours receptionist **prototype** answering a test number, with a cost-per-client and latency report for task `5c6a0b43`. Nothing goes live to real callers until Tyler approves.

**D. Grow:**
- GBP live; citations.
- City and city × trade pages added weekly in strategy order, each with unique audit data.
- The research report, then local press outreach. **Tyler sends all outreach.**
- Monthly ranking + conversion report from Al.

**Al Capital and the skills librarian run in parallel with A–C:**
- `~/AlCapital/AL.md`; supersedes aos-manager; installs the 4 Accelera agents; owns the website and SEO workstream.
- Librarian: inventory of about 3,000 skills → `catalog.json`, dedupe, classify, rate risk → `SKILLS-CATALOG.md` + kits. Build `kits/web-delivery.txt` and `kits/seo.txt` **first**, then `al-core`. Install only after Tyler approves.

**Later:** Oracle VM + Paperclip + department agents; content loop; productize for clients.

## Decisions for Tyler
- Phone carrier: Telnyx or Twilio (about $1/mo per number + usage). Email: Cloudflare routing + Brevo, or Zoho free.
- Lead magnet: free missed-call & booking audit, or straight to "book a call".
- Domain to buy.
- GBP address: visible or hidden.
- Keyword data: free sources or buy credits (Keywords Everywhere / DataForSEO).
- Confirm prices, the guarantee and site-ownership terms.
- A real photo of you.
- Cal.com account.
- The customer-facing email and phone number.

## Master file + coordination (every thread and agent)
**One live record:** `~/AlCapital/MASTER.md`. Prompt 0 creates it, and every thread reads it before starting and updates it after **every** finished task. It sits next to:
- `~/AlCapital/RULES.md`: hard rules + update protocol, shared by all prompts.
- `~/AlCapital/PLAN.md`: a copy of this plan.

`~/accelera-sync.md` gets a pointer to MASTER, so older agents (Codex, CRM worker) find it.

**MASTER.md template**
```
# Accelera MASTER: live record (read first, update after every task)
Last updated: <YYYY-MM-DD HH:MM CT> by <thread>

## Status board (each thread edits ONLY its own row)
| Thread | Prompt | Status (TODO/IN PROGRESS/BLOCKED/WAITING ON TYLER/DONE) | Session | Last update | Next step | Blocked by |
|---|---|---|---|---|---|---|---|
| 0 Setup | P0 | | | | | |
| A Research & SEO | P1 | | | | | |
| L Landing page | P2 | | | | | P1: STATS.md + MESSAGE-MAP.md |
| E Email + phone | P3 | | | | | |
| B/C Website | P4 | | | | | P1: SEO-STRATEGY approved; P2 DONE |
| D Grow | P5 | | | | | P4 live |
| Al Capital | P6 | | | | | |
| Skills library | P7 | | | | | |

## Waiting on Tyler
| ID | Thread | Decision or action needed | Options | Status |

## Current facts (single source; update when anything changes)
Offer/prices (approved?) · guarantee/terms · domain · business email · phone number · Cal.com link · GBP status · live URLs · hosting · analytics IDs

## Artifacts index
| Path or URL | Thread | What it is |

## Log (append-only, newest at bottom, never edit past lines)
- <YYYY-MM-DD HH:MM CT> | <thread> | <agent/session> | DONE / BLOCKED / DECISION-NEEDED / STARTED | <what> | <files/URLs>
```

**Update protocol** (goes into RULES.md):
1. **Start:** read MASTER.md fully. Set your row to IN PROGRESS with your session name. Check "Blocked by". If a dependency isn't DONE, do only the parts that don't depend on it, then mark your row BLOCKED.
2. **After every finished task:** append one log line with a shell append (`cat >> ~/AlCapital/MASTER.md <<'EOF' … EOF`) so concurrent writers never overwrite each other. Update your own row's Last update / Next step with an exact-match edit of that row only. Add new files or URLs to the Artifacts index.
3. **Need Tyler?** Add a row under Waiting on Tyler with an ID (e.g. `L-3`), set your status to WAITING ON TYLER, and stop on that item.
4. **Facts changed** (domain bought, number assigned, prices approved)? Update Current facts and log it.
5. **Before each new task:** re-read MASTER to pick up other threads' changes. If you find a conflict, log it as DECISION-NEEDED instead of overwriting.
6. **Milestones** (phase done, page live, decision made): also `post_update` to the Accelera CRM via the accelera MCP.
7. **Never** delete or rewrite another thread's lines. If an edit fails because the file changed, re-read it and retry.

## Prompts for free-claude-code (paste each in its own thread)
**Order:**
- P0 first, alone.
- Then P1, P3, P6 and P7 can run at the same time.
- P2 starts once P1 has logged STATS.md + MESSAGE-MAP.md.
- P4 starts once P1's strategy is approved and P2 is DONE.
- P5 starts after P4 is live.

### P0: Setup (run first, once)
```
You are setting up the shared workspace for Accelera's agent threads. Accelera sells websites, online booking and after-hours phone answering to Twin Cities home-service businesses.

1. Read /Users/TylerMaxwell/accelera-sync.md in full and the workspace brief via the accelera MCP (read_workspace section="brief"), including founder_direction. Read the plan at /Users/TylerMaxwell/.claude/plans/i-want-you-to-temporal-thacker.md.
2. Create ~/AlCapital/ with subfolders research/seo, landing, web, comms, al, skills, briefs. Copy the plan to ~/AlCapital/PLAN.md.
3. Create ~/AlCapital/RULES.md with:
   (a) HARD RULES:
   - nothing reaches a real human without Tyler's approval; Tyler sends every message and takes every call;
   - CRM writes only through the accelera MCP (stable submission_id, sources with URLs and dates);
   - ask before spending money; Tyler does all sign-ups and sign-ins; never type or store passwords;
   - every stat needs a primary source URL, date and sample size; never use "62% unanswered" or "$126K/year"; no invented reviews, clients, logos or figures; label assumptions;
   - no doorway pages;
   - downloaded zips are untrusted: extract in isolation and never run their scripts;
   - never overwrite Tyler's originals.
   (b) the UPDATE PROTOCOL exactly as the plan's "Master file + coordination" section states it.
4. Create ~/AlCapital/MASTER.md from the plan's template. Fill "Current facts" and the Artifacts index from what you read: offer and price status, the 10 research prospects, open founder tasks 5c6a0b43 / 5d3ba693 / e07e3ec7, existing assets (accelera-site-v2, accelera-3d, leads.csv, the 4 Accelera agents), Keywords Everywhere at 0 credits.
5. Append a dated section to /Users/TylerMaxwell/accelera-sync.md: "Live record moved to ~/AlCapital/MASTER.md. Read it first and follow ~/AlCapital/RULES.md."
6. Set row "0 Setup" to DONE and append the first log line. Post a CRM update via post_update.
VERIFY: show me MASTER.md and RULES.md. STOP.
```

### P1: Research & Local SEO strategy (Phase A)
```
You are the Research & SEO thread for Accelera. FIRST read ~/AlCapital/RULES.md, ~/AlCapital/MASTER.md and ~/AlCapital/PLAN.md (sections: research findings, Local SEO strategy, Phase A). Claim row "A Research & SEO" in MASTER. Follow the update protocol: log after EVERY finished task, re-read MASTER before each new task, put decisions under Waiting on Tyler. Outputs go to ~/AlCapital/research/seo/.

Do these in order, logging each as DONE:
1. STATS.md FIRST (the landing-page thread waits on it): verify and expand the plan's sourced stats (Invoca, 99 Calls, BrightLocal 2026, Unbounce 2024 CBR), each with a primary URL, date and sample size. Check whether a newer 2026 Unbounce benchmark exists. Mark any stat you can't trace to primary data "unverified".
2. Voice of customer: mine owner pain language from Reddit (r/Plumbing, r/Roofing, r/Contractor), trade forums and competitors' reviews into PAIN-BANK.md. Then write MESSAGE-MAP.md around the objections: burned by SEO agencies, $997/mo steep, "my wife takes the calls", too busy. Log both, so the landing-page thread can start.
3. Keyword universe: services {website design, web design, web designer, contractor/plumber/roofer/auto repair website, small business website, online booking/scheduling, answering service, after-hours answering service, virtual/AI receptionist, SEO for contractors} × geos {Minnesota, MN, Twin Cities, Minneapolis, St Paul, every 7-county metro city with population over 20k} × modifiers {near me, cost, best, company, agency}. Volumes from Google Keyword Planner (I'll create the free Google Ads account and sign in), autocomplete, People Also Ask and Google Trends. Keywords Everywhere has 0 credits; ask before buying. Mark keywords with no data "unvalidated".
4. SERP analysis per priority keyword (Firecrawl, location Minneapolis MN): map pack vs organic, top 10 URLs, page type, word count, schema, title/H1, difficulty.
5. Competitor mining (15–25): clickbuiltwebsites.com, transformeddesign.com, proweb365.com, minnesotadesign.com, wyfimarketing.com, optimumdesigntech.com, portkeyseominneapolis.com, askotter.ai, plaudit.com, gorapidlocal.com, answeringinnovations.com, absentanswer.com, voksha.com, plus whoever ranks. Map their sitemaps to recover city × trade page matrices. Record titles, H1s, schema, pricing, GBP category and review count, and free-checker backlinks. Adapt ~/seomachine research scripts to Firecrawl if useful. Output keyword, content and link gaps.
6. Local audit dataset for unique city content: from leads data and public Maps data, per city: number of ICP businesses, share without a website or online booking, review counts. Observation only; contact no one.
7. Prioritize with the gtm-skills SEO pipeline (~/extracted/gtm-skills-main/skills: seo-business-context, seo-opportunity-extraction, seo-keyword-validation, seo-serp-qualification, seo-business-fit-filter, seo-topic-prioritization, seo-topic-shaping). Write SEO-STRATEGY.md: keyword → page map, build order, GBP plan, citation list (verify each directory and association exists), link plan, AI-search plan, KPIs, 90-day calendar.
VERIFY: add the top 30 targets and SEO-STRATEGY.md to Waiting on Tyler for approval, update your row, post a CRM update. STOP.
```

### P2: Landing page for ads and social (Phase L)
```
You are the Landing Page thread for Accelera. FIRST read ~/AlCapital/RULES.md, ~/AlCapital/MASTER.md and ~/AlCapital/PLAN.md (sections: Best tool combination, Landing page for ads and social). Claim row "L Landing page". Follow the update protocol: log after EVERY finished task, re-read MASTER before each new task.

DEPENDS ON: research/seo/STATS.md and MESSAGE-MAP.md (P1). If they aren't logged DONE yet, do steps 1–2 only, mark your row BLOCKED, and stop.
1. Setup:
   - New Astro project at ~/AlCapital/web/accelera-site. Landing pages live at /lp/*, noindex; the website thread will extend the same project later.
   - Run impeccable init → PRODUCT.md (Persuade mode).
   - Compare ~/Downloads/taste-skill-main.zip (extract in isolation) with the installed design-taste-frontend 2.5.1; recommend the newer one with a diff summary, and install only after I approve.
   - Set up a Playwright MCP check script for widths 390/768/1024/1440.
2. Reusable pieces: a missed-call calculator with labeled example defaults; an interactive no-account booking demo, labeled demo, that submits nothing. Build motion with the Emil skills (animate, choreograph, then review-animations and animation-performance).
3. Copy (needs STATS.md + MESSAGE-MAP.md):
   - Pages: /lp/missed-calls, /lp/booking, /lp/plumbers, /lp/roofers, /lp/auto-repair, each message-matched to its ad angle.
   - Grade 5–7 reading level. A short variant (under 100 words above the fold) and a long variant.
   - Skills: hook-creator, ad-copy-writer, gtm-skills ads-offers-strategy / lead-form-optimization / pain-is-the-pitch, the Offer & Lead Gen strategist agent, seomachine CRO skills, humanizer.
   - Put prices, guarantee and ownership terms under Waiting on Tyler; use only what I confirm.
4. Page anatomy:
   - message-matched hero with ONE CTA + click-to-call, no nav;
   - sourced proof bar; calculator; offer stack (site + booking + phone, two weeks, approve before launch, price anchor); booking demo; 3 steps;
   - risk reversal; objection FAQ; founder note; sticky mobile CTA;
   - form of 3 fields or fewer (or 2-step). Lead magnet option: free missed-call & booking audit.
   - Light hero only; content first.
5. Design: impeccable shape → live/generate for 3 hero variants (also Emil's prototype skill). Put the pick under Waiting on Tyler. Then impeccable critique + polish.
6. Tracking: UTM capture, GA4 events (call_click, book_call, calculator_used, demo_complete), Microsoft Clarity. Prepare Meta pixel + CAPI (meta-capi skill) but leave it off until I start ads. A/B split via the host or GrowthBook.
7. Deploy free (Netlify, Vercel or Cloudflare Pages); I do sign-in. Use the domain from MASTER Current facts if it's set; ask before buying one.
VERIFY with Playwright screenshots: LCP under 1.5 s mobile live, readability ≤ grade 7, all flows pass, taste gate pass, impeccable critique, then an independent aos-verifier PASS. Log results and URLs, update Current facts with the live URLs, post a CRM update. STOP.
```

### P3: Business email + phone (Phase E)
```
You are the Email & Phone thread for Accelera. FIRST read ~/AlCapital/RULES.md, ~/AlCapital/MASTER.md and ~/AlCapital/PLAN.md (section: Email + phone). Claim row "E Email + phone". Follow the update protocol: log after EVERY finished task, re-read MASTER before each new task. Outputs go to ~/AlCapital/comms/. I do all sign-ups and purchases.

1. Business email on our domain: recommend Cloudflare Email Routing + Brevo free SMTP "send as" vs Zoho Mail free (verify current limits). Give me exact setup steps. Verify SPF, DKIM and DMARC pass (deliverability-check skill). Record the address in MASTER Current facts.
2. Email templates in React Email or MJML (MIT): missed-call & booking audit report, follow-up, proposal. Drafts only; I send. Document listmonk (newsletter) and Mautic (automation) setup for the future VM.
3. Phone: compare Telnyx vs Twilio vs VoIP.ms for a local 612/651 number (monthly cost, per-minute, SMS, SIP, porting). Recommend one; I buy it. Record it in Current facts.
4. After-hours AI receptionist PROTOTYPE on a test number: LiveKit Agents (Apache 2.0) or Pipecat (BSD-2); review lobbystack/lobbystack and kirklandsig/AIReceptionist first. It should answer, read the address back and book a calendar slot (Cal.com). Measure latency and cost per client per month (number + speech-to-text + LLM + text-to-speech). List failure cases. Research Minnesota call-recording consent and AI-disclosure requirements with primary sources.
5. Write PHONE-REPORT.md answering founder task 5c6a0b43 (is the $997/mo phone component deliverable, at what cost, with what risks). Post it to the CRM via add_research. No real callers until I approve.
VERIFY: email passes the DNS checks, the test call is recorded working, the report is logged. Update your row and post a CRM update. STOP.
```

### P4: Website, built from scratch (Phases B + C)
```
You are the Website thread for Accelera. FIRST read ~/AlCapital/RULES.md, ~/AlCapital/MASTER.md and ~/AlCapital/PLAN.md (sections: Local SEO strategy, Website standards, Best tool combination, Phases B–C). Claim row "B/C Website". Follow the update protocol: log after EVERY finished task, re-read MASTER before each new task.

DEPENDS ON: SEO-STRATEGY.md approved by Tyler (P1) and the landing page DONE (P2). Reuse P2's Astro project (~/AlCapital/web/accelera-site), PRODUCT.md/DESIGN.md and components. If a dependency isn't met, mark BLOCKED and stop.
1. Sitemap from SEO-STRATEGY.md. v1 pages: home; /website-design-minnesota, /online-booking-minnesota, /after-hours-answering-service-minnesota; /plumbers, /roofers, /auto-repair, /contractors; /minneapolis, /st-paul; /pricing, /how-it-works, /about, /faq, /contact; /tools/missed-call-calculator. A city or city×trade page ships only with unique audit data from P1 and real demand.
2. Copy: grade 6–8, mobile-first, from MESSAGE-MAP.md and STATS.md. Review with landing-page-review and the Persona walkthrough agent. Use only prices and terms confirmed in MASTER Current facts.
3. Design and 3D: impeccable (Persuade + Read modes) leads. 3 interactive 3D hero directions via the prototype skill and impeccable live; put the pick under Waiting on Tyler. Stack: three.js + React Three Fiber/drei/postprocessing island + GSAP ScrollTrigger + Lenis (Theatre.js for the camera path if needed); verify licenses. Lazy-load after content and CTA, with a static poster fallback for reduced motion or no WebGL. Motion via the Emil skills.
4. SEO build: schema (Organization, LocalBusiness/ProfessionalService, Service, FAQPage, BreadcrumbList), sitemap, robots, llms.txt, OG images; don't block AI crawlers. Use seo-audit, technical-seo-checker, on-page-seo-auditor, structured-data, schema-markup-generator, cwv-audit. GA4 events as on the landing page.
5. Gates via Playwright: LCP under 2.5 s mobile, INP under 200 ms, CLS under 0.1; Lighthouse mobile ≥ 90 performance, 100 accessibility, 100 SEO; break-ui; accessibility audit; impeccable critique + polish; taste gate; design-is; widths 390/768/1024/1440; then an independent aos-verifier PASS.
6. Deploy on the domain in Current facts. Set up Search Console + Bing Webmaster (I sign in) and submit the sitemap.
VERIFY: live URL, scores, schema validation and screenshots logged. Update Current facts, post a CRM update. STOP.
```

### P5: Grow (Phase D, after the website is live)
```
You are the Growth thread for Accelera. FIRST read ~/AlCapital/RULES.md, ~/AlCapital/MASTER.md and ~/AlCapital/PLAN.md (Local SEO strategy, Phase D). Claim row "D Grow". DEPENDS ON: website live (P4 DONE). Follow the update protocol: log after EVERY finished task, re-read MASTER before each new task. You PREPARE; I do anything outward-facing.
1. Google Business Profile checklist with the exact fields for me to enter: name (no keyword stuffing), primary category, services, 7-county service area, hours, photos, first posts, Q&A. Put the visible-vs-hidden address choice under Waiting on Tyler.
2. Citation sheet (name, address and phone exactly as in Current facts): Apple Business Connect, Bing Places, Yelp, BBB, Facebook, Nextdoor, Clutch, UpCity, DesignRush, chambers, verified MN trade associations. I submit them.
3. Weekly: add the next city or city×trade pages in SEO-STRATEGY order, each with unique audit data, through the same gates as P4.
4. Original research: "Twin Cities home-service website report" from the P1 audit data, plus a linkable page. Draft press outreach for me to send.
5. Review engine: request and reply templates (I send).
6. Monthly report: rankings (Firecrawl SERP checks with location), GBP insights, Search Console, landing page and site conversions. Log it and post it to the CRM.
STOP after each weekly batch for my review.
```

### P6: Al Capital, chief of staff
```
You are building Al Capital, Accelera's chief of staff. FIRST read ~/AlCapital/RULES.md, ~/AlCapital/MASTER.md and ~/AlCapital/PLAN.md. Claim row "Al Capital". Follow the update protocol: log after EVERY finished task, re-read MASTER before each new task. Outputs go to ~/AlCapital/al/.
1. Write ~/AlCapital/AL.md. Al is an elite cofounder, operator and marketer for a local home-service web and automation agency. Duties:
   - keep a living 30/60/90-day plan aimed at first revenue;
   - own MASTER.md hygiene: each morning, flag stale rows, unresolved Waiting on Tyler items and conflicts between threads;
   - write a daily brief to ~/AlCapital/briefs/;
   - run the approval desk; route work to threads;
   - assign skill kits (from the skills library thread) to future agents.
   Al follows RULES.md.
2. Read ~/.claude/agents/aos-manager.md and keep what's useful; Al supersedes it and delegates to the aos-* agents.
3. Review install.sh in ~/extracted/b2b-agents/b2b-agents-main/ and show me what it installs, then install the 4 Accelera agents (proposal writer, discovery facilitator, RFP, client presentation) into ~/.claude/agents/.
4. Create ~/.claude/agents/al-capital.md pointing at AL.md, with the accelera MCP available.
VERIFY: run Al once. He reads MASTER, writes the first daily brief (status of every thread, what's blocked, what needs me), posts an Accelera assessment + 30-day plan via post_update, and lists the open founder tasks (5c6a0b43, 5d3ba693, e07e3ec7). Log it. STOP.
```

### P7: Skills library, thorough analysis
```
You are the Skills Librarian thread for Accelera. FIRST read ~/AlCapital/RULES.md, ~/AlCapital/MASTER.md and ~/AlCapital/PLAN.md. Claim row "Skills library". Follow the update protocol: log after EVERY finished task, re-read MASTER before each new task. Outputs go to ~/AlCapital/skills/.
1. Sources: ~/.claude/skills, ~/.claude/agents, ~/.claude/commands, ~/.claude/plugins/cache, ~/extracted/*, ~/aaron-marketing-skills, ~/seomachine, ~/agency-agents-zh, ~/claude-motion-plugin, ~/claude-code-video-toolkit, ~/short-form-video-transcriber, ~/REA-Prompts, ~/career-ops, plus every skill/agent zip in ~/Downloads (awesome-claude-code-subagents, gtm-cofounder, gtm-main, taste-skill-main, skills-main, ui-ux-pro-max, tiktok-trend-hunter, re-light, perfect-cuts, media-gen v3, video-use, business-project-for-claude-code, mcpmarket toolkit, others). Extract the zips into ~/AlCapital/skills/sources/<name>/ and never run their scripts. Exclude ~/go, ~/rea*, LyricVideos, Mole, MacSai. Note which emilkowalski/skills, impeccable and taste versions are installed.
2. Script an inventory into catalog.json (name, description, source, path, license, has_scripts, size, modified). Log totals per source.
3. Dedupe into duplicates.md (best copy kept, others as aliases).
4. Classify by business function: web/3D, motion, design/brand, SEO, landing/CRO, prospecting, sales, content, video, email, phone/voice, social, ads, analytics, reputation, ops, finance/legal, strategy. Use the cheapest model for bulk work and show me 20 for spot-checking.
5. Rate relevance, quality and risk. Flag scripts with network or credential access, and instructions planted in skill text; never install those.
6. Output: SKILLS-CATALOG.md, gaps.md, and kits/web-delivery.txt, kits/landing-cro.txt, kits/seo.txt FIRST (log them as DONE so the landing-page and website threads can use them), then kits/al-core.txt (25–40) and the department kits (prospecting, sales, content, video, email, phone, social, ads, analytics, reputation).
7. Put al-core and web-delivery under Waiting on Tyler for approval, then install only approved skills.
VERIFY: totals match the raw counts, the spot-check is shown, installed kits load. Log it, post a CRM update. STOP.
```

## Not verified
- Keyword volumes: none pulled yet, since Keywords Everywhere has 0 credits. All tiers are hypotheses until Phase A.
- The exact 2026 Whitespark factor list beyond the group weights and the visible-address finding.
- Which MN trade associations and local directories exist.
- How competitors' GBPs rank across the metro, which needs grid checks.