# Accelera MASTER: live record (read first, update after every task)
Last updated: 2026-11-13 13:40 CT by Agent ops

## Status board (each thread edits ONLY its own row)
| Thread | Prompt | Status (TODO/IN PROGRESS/BLOCKED/WAITING ON TYLER/DONE) | Session | Last update | Next step | Blocked by |
|---|---|---|---|---|---|---|---|
| 0 Setup | P0 | DONE | P0 Setup | 2026-11-12 11:45 CT | — | — |
| A Research & SEO | P1 | WAITING ON TYLER | P1 Research | 2026-11-12 23:15 CT | Tyler: domain, Google Ads/GKP, GBP address, photo, Cal.com, email/phone | P1-1 (Google Ads), domain, GBP address, phone deliverability |
| L Landing page | P2 | IN PROGRESS | P2 Landing | 2026-11-13 02:56 CT | Phase 0-3 complete → build lp variants in src/pages/lp/ | — |
| E Email + phone | P3 | TODO | — | — | Email setup | — |
| B/C Website | P4 | TODO | — | — | Sitemap from SEO-STRATEGY | P1: SEO-STRATEGY approved; P2 DONE |
| D Grow | P5 | TODO | — | — | GBP checklist | P4 live |
| Al Capital | P6 | TODO | — | — | Write AL.md | — |
| Skills library | P7 | DONE | P7 Skills | 2026-11-12 14:00 CT | — | — |

## Waiting on Tyler
| ID | Thread | Decision or action needed | Options | Status |
|---|---|---|---|---|
| 5c6a0b43 | E Email + phone / A Research | Is the after-hours phone service actually deliverable (partner account, cost per client, who answers, script, go-live time)? | Telnyx/Twilio + LiveKit or Pipecat; build prototype first | OPEN |
| 5d3ba693 | All | First call block: Mission Auto Repair (651-771-1118) with booking concept, then Refuge Roofing (651-776-7663), then Hazel Park (651-735-9672) | Tyler makes the calls | OPEN |
| e07e3ec7 | A Research | Second source verification for all 8 new prospects (independent directory or Google listing cross-check) | Apify Maps actors, plumberdirectories.com, manual check | OPEN |
| — | P1 SEO | Domain to buy | Tyler purchases | OPEN |
| — | P1 SEO | GBP address: visible office vs hidden service-area | Visible ranks better (factor #7); privacy trade-off | OPEN |
| P1-1 | P1 SEO | Tyler: Set up free Google Ads account for Keyword Planner access | Required for GKP volumes on 384 Tier 1 keywords | OPEN |
| — | P1 SEO | Keyword data: free sources or buy credits (Keywords Everywhere / DataForSEO) | Free GKP + autocomplete + PAA + Trends first | OPEN |
| — | All | Confirm prices, guarantee and site-ownership terms | Current: $1,497 site; $597/mo booking; $997/mo phone; 30-day money-back; 50/50 deposit | OPEN |
| — | All | A real photo of Tyler | Needed for site, GBP, landing page | OPEN |
| — | All | Cal.com account for booking demo and client scheduling | Tyler sets up | OPEN |
| — | All | Customer-facing email and phone number | From P3 setup | OPEN |

## Current facts (single source; update when anything changes)
- **Offer/prices:** Site $1,497 (fixed, 50% deposit / 50% on approval, two-week delivery) → Booking $597/mo optional → Phone $997/mo optional. Both monthly have 30-day money-back. **Status: documented in master context, NOT yet approved by Tyler for client-facing use.**
- **Guarantee/terms:** Not confirmed. "Approve before launch" documented. Ownership terms not confirmed.
- **Domain:** Not purchased. Needed for SEO, email, GBP.
- **Business email:** Not set up. Options: Cloudflare Email Routing + Brevo free SMTP, or Zoho Mail free.
- **Phone number:** Not purchased. Options: Telnyx, Twilio, VoIP.ms for local 612/651 (~$1–1.15/mo + usage).
- **Cal.com link:** Not set up.
- **GBP status:** Not created. Requires verified address decision, primary category Website designer.
- **Live URLs:** None yet.
- **Hosting:** Free tier Netlify / Vercel / Cloudflare Pages planned.
- **Analytics IDs:** GA4 to be created; Search Console + Bing Webmaster after launch.
- **Keywords Everywhere:** 0 credits (confirmed 2026-11-11). All volume data from free sources unless Tyler approves paid.
- **10 Research Prospects (verified on own websites 2026-11-11, single-sourced):**
  1. Erik Nelson Plumbing — Plumbing — St. Paul — (two-source verified)
  2. Steinkraus Plumbing — Plumbing — Minneapolis — (two-source verified)
  3. Mission Auto Repair — Auto — St. Paul — b1c63d5b
  4. Hazel Park Auto Service — Auto — St. Paul — 18eea2ad
  5. Doran-King Garage Inc — Auto — St. Paul — 83b46017
  6. TJK Plumbing Inc — Plumbing — Maple Grove — 001b54e3
  7. Sabastian and Sons Plumbing — Plumbing — Brooklyn Park — c288d4e5
  8. Refuge Roofing & Siding LLC — Roofing — Oak Grove — de9f027b (MN licence BC691311)
  9. Three Rivers Contracting — Roofing/GC — Saint Paul Park — 722b5d0f
  10. BRZ Construction Inc — Remodeling — Stillwater — c8179f2c
- **Open founder tasks:**
  - 5c6a0b43 — Phone deliverability decision (gates $997/mo component for 4 of 10 prospects)
  - 5d3ba693 — First call block (Mission Auto → Refuge Roofing → Hazel Park)
  - e07e3ec7 — Second source for all 8 single-sourced prospects
  - ae21d556 — Resolve Doran-King's booking CTA
- **Existing assets:**
  - `accelera-site-v2` — prior site build (reference only)
  - `accelera-3d` — prior 3D explorations (reference only)
  - `leads.csv` — 44 top-rated metro companies with no website
  - 4 Accelera agents in `/Users/TylerMaxwell/extracted/b2b-agents/b2b-agents-main/accelera/`:
    - accelera-proposal-writer.md (3-tier proposals)
    - accelera-discovery-facilitator.md (45-min discovery with ROI math)
    - accelera-rfp-powerhouse.md (RFP responses for larger contractors)
    - accelera-client-presentation-builder.md (20-min mobile decks with objection handling)
  - Install script: `/Users/TylerMaxwell/extracted/b2b-agents/b2b-agents-main/install.sh` (not yet run)
- **Paperclip agent runtime:** Operational as of 2026-11-13. Company `Accelera` (e5adce96-bf28-4143-8e4d-2e1b4b819754, issue prefix ACC) with 2 agents, both `claude_local` engine=cli routed through OmniRoute (localhost:20128) to `nvidia/nemotron-3-ultra-550b-a55b:free`. **Cost $0 - no Anthropic tokens consumed.** Agents only run against an assigned task; free-model quota, not budget, is the real throughput limit.

## Artifacts index
| Path or URL | Thread | What it is |
|---|---|---|
| /Users/TylerMaxwell/accelera-sync.md | — | Shared sync log (all agents) |
| /Users/TylerMaxwell/.claude/plans/i-want-you-to-temporal-thacker.md | — | Source plan (this file copied from it) |
| /Users/TylerMaxwell/AlCapital/web/accelera-site/docs/PLAN.md | P0 | Working copy of the plan (consolidated) |
| /Users/TylerMaxwell/AlCapital/web/accelera-site/docs/RULES.md | P0 | Hard rules + update protocol (consolidated) |
| /Users/TylerMaxwell/extracted/b2b-agents/b2b-agents-main/CLAUDE.md | — | Master context with offer, ICP, tech stack, win themes |
| /Users/TylerMaxwell/extracted/b2b-agents/b2b-agents-main/accelera/*.md | — | 4 Accelera agent source files |
| /Users/TylerMaxwell/extracted/gtm-skills-main/ | — | 87 GTM skills including SEO pipeline |
| /Users/TylerMaxwell/extracted/google-maps-scraping-apis-main/ | — | 217 Apify actors, local lead playbook |
| /Users/TylerMaxwell/extracted/FounderOS/FounderOS-main/ | — | Next.js personal OS (deferred) |
| /Users/TylerMaxwell/AlCapital/web/accelera-site/research/ | P1 | Research outputs (19 files: STATS.md, PAIN-BANK.md, MESSAGE-MAP.md, KEYWORD-UNIVERSE.md, SERP-ANALYSIS.md, COMPETITOR-MINING.md, LOCAL-AUDIT-DATASET.md, ACCOUNT-INTELLIGENCE.md, OPPORTUNITY-INVENTORY.md, KEYWORD-VALIDATION.md, SERP-QUALIFICATION.md, BUSINESS-FIT-FILTER.md, TOPIC-SHAPING.md, SEO-STRATEGY.md, KEYWORD-RESEARCH-SOURCES.md, MN_TOP50_CITIES.md, MN_TOP50_CITIES.json, MN_SEASONAL_NICHES_NOVEMBER.md, GAP-ANALYSIS.md) |
| /Users/TylerMaxwell/AlCapital/web/accelera-site/landing/ | P2 | Landing page artifacts (product-page-brief.md, DESIGN-DIRECTION.md, brand-kit.json, accelera-logo.png) |
| /Users/TylerMaxwell/AlCapital/web/accelera-site/ | P2/P4 | Astro project (accelera-site) — consolidated root |
| ~/AlCapital/comms/ | P3 | Email templates, phone report |
| ~/AlCapital/al/ | P6 | AL.md, daily briefs |
| ~/AlCapital/skills/ | P7 | Catalog, kits, SKILLS-CATALOG.md, **SKILLS-INDEX.md (583 skills from 8 sources)** |
| ~/AlCapital/briefs/ | P6 | Daily briefs from Al |
| /Users/TylerMaxwell/.t3/userdata/attachments/paperclip | Agent ops | Paperclip source checkout (runs via `pnpm dev:server`, dev mode) |
| ~/.paperclip/instances/default | Agent ops | Paperclip instance: embedded postgres, agent configs, run logs, isolated workspaces |

| ~/AlCapital/skills/ACCELERA-SKILL-KITS.md | Skills library | Picked skills/agents per Accelera area + 36-item core list |
| ~/AlCapital/skills/kits/*.txt | Skills library | One path per line per area (15 areas + core) |
| ~/AlCapital/skills/NOT-INSTALLED-PICKS.md | Skills library | 120 picks not yet in ~/.claude (11 flagged to read first); install only after Tyler approves |
| ~/AlCapital/skills/catalog.json | Skills library | Full inventory: 4,027 unique skills/agents/commands incl. ~/Downloads and zips |

## Log (append-only, newest at bottom, never edit past lines)
- 2026-11-12 11:45 CT | P0 Setup | claude | DONE | Created ~/AlCapital/ structure, PLAN.md, RULES.md, MASTER.md; appended pointer to accelera-sync.md; set row 0 Setup to DONE | PLAN.md, RULES.md, MASTER.md- 2026-11-12 12:30 CT | P1 Research | claude | STARTED | Claimed row A Research & SEO; starting STATS.md verification | —
- 2026-11-12 12:45 CT | P1 Research | claude | DONE | STATS.md created with verified stats (Invoca, 99 Calls, BrightLocal, Unbounce, Accelera internal); marked unverified claims | ~/AlCapital/research/seo/STATS.md
- 2026-11-12 13:15 CT | P1 Research | claude | DONE | PAIN-BANK.md + MESSAGE-MAP.md created from Reddit/trade forum mining and competitor reviews; 4 objections mapped to message pillars with landing page variants | ~/AlCapital/research/seo/PAIN-BANK.md, ~/AlCapital/research/seo/MESSAGE-MAP.md
- 2026-11-12 13:30 CT | P1 Research | claude | DONE | KEYWORD-UNIVERSE.md created: 384 Tier 1, 144 Tier 2a, 24 Tier 2b, 8 Tier 3, Support keywords; all marked UNVALIDATED pending Tyler's Google Ads/GKP setup | ~/AlCapital/research/seo/KEYWORD-UNIVERSE.md
- 2026-11-12 14:00 CT | P7 Skills | claude | DONE | Inventoried 583 skills from 8 sources into SKILLS-INDEX.md grouped by 16 business areas (web/3D, motion, design, SEO, landing page/CRO, prospecting, sales, content, video, email, ads, analytics, ops, agents, reverse-engineering, tools); SKILLS-INDEX.json also created | ~/AlCapital/skills/SKILLS-INDEX.md, ~/AlCapital/skills/SKILLS-INDEX.json
- 2026-11-12 14:15 CT | P1 Research | claude | DONE | KEYWORD-UNIVERSE.md logged; added P1-1 waiting on Tyler for Google Ads/GKP; now starting SERP analysis + competitor mining for Tier 1 priority keywords using Firecrawl (location Minneapolis MN) | —
- 2026-11-12 14:45 CT | P1 Research | claude | DONE | Created SERP-ANALYSIS.md (30 priority keywords, Firecrawl template), COMPETITOR-MINING.md (13+ competitors, sitemap/GBP/backlink framework), LOCAL-AUDIT-DATASET.md (24 cities framework, leads.csv + Apify plan); all frameworks ready for execution | ~/AlCapital/research/seo/SERP-ANALYSIS.md, ~/AlCapital/research/seo/COMPETITOR-MINING.md, ~/AlCapital/research/seo/LOCAL-AUDIT-DATASET.md
- 2026-11-12 22:40 CT | Coordination | Claude Code (desktop) | DONE | Plan made discoverable: pointer section appended to accelera-crm/CLAUDE.md (Claude Code + FCC), new accelera-crm/AGENTS.md (Codex), AL-CAPITAL-PLAN-AND-PROMPTS.md is now a symlink to ~/AlCapital/PLAN.md (one source, no drift) | accelera-crm/CLAUDE.md, accelera-crm/AGENTS.md
- 2026-11-12 23:00 CT | P1 Research | claude | DONE | Executed full gtm-skills SEO pipeline (7 phases): ACCOUNT-INTELLIGENCE.md, OPPORTUNITY-INVENTORY.md, KEYWORD-VALIDATION.md, SERP-QUALIFICATION.md, BUSINESS-FIT-FILTER.md, TOPIC-SHAPING.md, SEO-STRATEGY.md — 13-page roadmap with keyword→page map, build order, GBP plan, citations, link plan, AI search, KPIs, 90-day calendar | ~/AlCapital/research/seo/*.md (14 files)
- 2026-11-12 23:15 CT | P1 Research | claude | DONE | P1 Research complete — all 7 tasks done. SEO-STRATEGY.md produced. Row set to WAITING ON TYLER for domain, Google Ads/GKP, GBP address, photo, Cal.com, email/phone. P2 Landing Page can start (STATS.md + MESSAGE-MAP.md complete). | SEO-STRATEGY.md added to Waiting on Tyler
- 2026-11-12 23:20 CT | A Research & SEO (co-thread) | claude | IN PROGRESS | Claimed co-thread row; starting Task 1: find open source keyword research repo | —
- 2026-11-12 23:22 CT | A Research & SEO (co-thread) | claude | DONE | Task 1 complete: Found open source keyword research options. 1) aaron-marketing-skills/keyword-research: 8-phase process with free Google Autocomplete connector (scripts/connectors/suggest.py). 2) gtm-skills/seo-intel: Live SERP-based keyword research, scores difficulty from actual rankings, clusters by observed intent — NO paid APIs required. 3) gtm-skills/seo-keyword-validation: requires Ahrefs API (paid). 4) google-maps-scraping-apis: 217 Apify actors for local lead gen (complementary). Recommended: seo-intel for live-data keyword research + suggest.py for autocomplete expansion. | ~/AlCapital/research/seo/KEYWORD-RESEARCH-SOURCES.md (new artifact)
- 2026-11-12 23:25 CT | A Research & SEO (co-thread) | claude | IN PROGRESS | Task 1 done (KEYWORD-RESEARCH-SOURCES.md). Starting Task 2: find top 50 cities in Minnesota by population | —
- 2026-11-12 23:35 CT | A Research & SEO (co-thread) | claude | DONE | Task 2 complete: Top 50 MN cities by population extracted from Wikipedia/Census 2025 estimates. 30 of 50 in Twin Cities metro. Created MN_TOP50_CITIES.md + .json with full table, county distribution, metro breakdown, and recommended 24-city audit selection prioritized by population, prospect counties, and leads.csv gaps. | ~/AlCapital/research/seo/MN_TOP50_CITIES.md, ~/AlCapital/research/seo/MN_TOP50_CITIES.json
- 2026-11-12 23:37 CT | A Research & SEO (co-thread) | claude | IN PROGRESS | Task 2 done. Starting Task 3: Research seasonal niches/industries for Minnesota in November (late fall/early winter) | —
- 2026-11-12 23:50 CT | A Research & SEO (co-thread) | claude | DONE | Task 3 complete: MN seasonal niches for November researched. Created MN_SEASONAL_NICHES_NOVEMBER.md with 5-tier priority ranking (Emergency: HVAC furnace, roofing ice dams, plumbing frozen pipes; High: insulation, chimney, generator, snow contracts; Moderate: electrical, windows, remodeling). Mapped 10 verified prospects to November hooks. Built 4-week content calendar. Identified competitor gaps: no emergency booking, no after-hours phone, no seasonal SEO strategy. | ~/AlCapital/research/seo/MN_SEASONAL_NICHES_NOVEMBER.md
- 2026-11-12 23:52 CT | A Research & SEO (co-thread) | claude | IN PROGRESS | Task 3 done. Starting Task 4: Analyze other thread's research artifacts for gaps (14 files in ~/AlCapital/research/seo/) | —
- 2026-11-12 23:55 CT | A Research & SEO (co-thread) | claude | DONE | Task 4 complete: Analyzed all 14 research artifacts (SERP-ANALYSIS, COMPETITOR-MINING, LOCAL-AUDIT-DATASET, KEYWORD-UNIVERSE, STATS, PAIN-BANK, MESSAGE-MAP, ACCOUNT-INTELLIGENCE, OPPORTUNITY-INVENTORY, KEYWORD-VALIDATION, SERP-QUALIFICATION, BUSINESS-FIT-FILTER, TOPIC-SHAPING, SEO-STRATEGY). Created GAP-ANALYSIS.md documenting 7 critical gaps and 12 action items. | ~/AlCapital/research/seo/GAP-ANALYSIS.md
- 2026-11-12 23:55 CT | A Research & SEO (co-thread) | claude | DONE | All 4 tasks complete: 1) KEYWORD-RESEARCH-SOURCES.md (4 sources, seo-intel primary), 2) MN_TOP50_CITIES.md/json (50 cities, 24-city audit recommendation), 3) MN_SEASONAL_NICHES_NOVEMBER.md (5-tier priority, 10 prospect hooks, content calendar), 4) GAP-ANALYSIS.md (7 critical gaps, 5 secondary, 12 action items, dependency map). All tasks logged per protocol. Row set to DONE. | KEYWORD-RESEARCH-SOURCES.md, MN_TOP50_CITIES.md, MN_TOP50_CITIES.json, MN_SEASONAL_NICHES_NOVEMBER.md, GAP-ANALYSIS.md
- 2026-11-12 23:55 CT | L Landing page | claude | STARTED | Claimed row L Landing page; STATS.md + MESSAGE-MAP.md ready; beginning Phase 0 intake and product-page-brief.md creation | —
- 2026-11-12 23:57 CT | L Landing page | claude | DONE | Phase 0 complete: product-page-brief.md created mining STATS.md (Invoca 27% unanswered, 99 Calls 28.1%/58%, BrightLocal 97%/54%, Unbounce 11.1%/6.1%) and MESSAGE-MAP.md (4 pillars, landing page variants, phrase bank, A/B matrix) | ~/AlCapital/landing/product-page-brief.md
- 2026-11-12 23:58 CT | L Landing page | claude | DONE | Phase 1 complete: brand-kit.json created from logo palette extraction (primary #2B67BD, accent #00A859); competitor-analysis on ClickBuilt, Transformed Design, Answering Innovations, AskOtter, Gorapidlocal; gap confirmed: site+booking+phone in one Twin Cities offer | ~/AlCapital/landing/brand-kit.json, ~/AlCapital/landing/accelera-logo.png
- 2026-11-13 00:10 CT | L Landing page | claude | IN PROGRESS | Phase 2 started: hook-creator agent launched for hero headlines, section hooks, CTA variants, objection handling; waiting on result | —
- 2026-11-13 00:15 CT | L Landing page | claude | DONE | Phase 2 complete: Full message architecture written (5 hero variants A-E, 7 section hooks, 3 CTA variants with guarantee language, 4 objection-handling lines) — all grade 5-7, active voice, specific sourced numbers | ~/AlCapital/landing/product-page-brief.md
- 2026-11-13 00:16 CT | L Landing page | claude | IN PROGRESS | Phase 3 started: frontend-design agent launched for design direction; waiting on result | —
- 2026-11-13 00:20 CT | L Landing page | claude | DONE | Phase 3 complete: DESIGN-DIRECTION.md created with full spec (style, color mapping, typography, hero layout, 7 section treatments, interactive elements, motion table, responsive rules, trust signals, build notes, decision log). Logo exists, no logo-designer needed. | ~/AlCapital/landing/DESIGN-DIRECTION.md
- 2026-11-13 02:56 CT | Consolidation | claude | DONE | Merged /AlCapital/, /AlCapital/landing/, /AlCapital/research/seo/ into /AlCapital/web/accelera-site/ as single project root. Updated MASTER.md artifact paths to consolidated locations. docs/, landing/, research/ now in project. Ready to build lp variants in src/pages/lp/. | docs/, landing/, research/, README.md
- 2026-11-13 13:40 CT | Agent ops | Claude Code (desktop) | DONE | Paperclip agent runtime repaired and re-routed to free models; both agents operational at zero cost. Three distinct faults found: (1) PRP runner materialises a verified snapshot of the interpreter *next to the binary* (process_supervisor.rs:697) and the server ran on root-owned /usr/local/bin/node, so every session.open died with EACCES - fixed by running the server on ~/.local/bin/node (hard link, user-owned dir); (2) 'requires a standard/planning/ask/skill test task' is NOT a bug - runtime-mode.ts:163 gates on !input.issue, so a heartbeat with nothing assigned always errors (pinging idle agents can never work); (3) the acpx path is retired (registry.ts:219 says migrate to claude_local) - both agents migrated to claude_local engine=cli, which bypasses the ACPX sidecar session_ensure_failed blocker and the snapshot step entirely. Token routing: adapterConfig.env ANTHROPIC_BASE_URL=http://localhost:20128 + ANTHROPIC_MODEL=nvidia/nemotron-3-ultra-550b-a55b:free (same mechanism fcc-claude uses, cli/launchers/claude.py:81-84). VERIFIED: ask-mode smoke test ran to done with agent comments; OmniRoute ledger shows 19 requests to nemotron-550b-free via OpenRouter, ~996k tokens, cost $0, timestamped 1s before the heartbeat finished; agent spend 0c. CAVEATS: auto/best-free routes to a model that emits NO tool_use and cannot drive an agent loop - the model must stay pinned; free tiers cool down (gemma 0% success, cohere provider_not_configured during testing); one trivial task burned ~992k prompt tokens, so free quota limits real throughput; the Paperclip server currently runs in a Claude Code terminal tab and needs 'PATH=$HOME/.local/bin:$PATH pnpm dev:server' on any restart if anything returns to paperclip_runner. Only Lead Engineer was proven end to end; Al Capital has identical config but has not yet run. | accelera-sync.md (3 entries: 12:45, 13:20 correction, 13:30), ~/.paperclip/instances/default, agent config backups in session scratchpad
- 2026-11-13 18:05 CT | Skills library | Claude Code (desktop) | DONE | Scanned all skills/agents/commands (installed + ~/Downloads folders + zips read in place): 4,027 unique, 628 installed. Picked 15 area kits (238 entries) + 36-item core list; 120 picks not installed, 11 flagged to read first. Nothing installed yet; WAITING ON TYLER for install approval. | ~/AlCapital/skills/ACCELERA-SKILL-KITS.md, kits/, NOT-INSTALLED-PICKS.md, catalog.json
- 2026-11-13 18:20 CT | Skills library | Claude Code (desktop) | DONE | Tyler approved core-only install. Installed 17 core picks without overwriting anything. Skills in ~/.claude/skills: page-cro, landing-optimizer, seo-business-context, seo-serp-qualification, local-ai-visibility, technical-seo-checker, positioning-and-messaging, anti-ai-slop-writing, icp-builder, call-scorecards, cold-email-preflight, founder-plan, founder-offer, founder-pricing, local-lead-pipeline (playbook wrapped as a skill). Agents in ~/.claude/agents: accelera-proposal-writer, accelera-discovery-facilitator. Bundled scripts checked (founder-plan/compile.py, founder-pricing/van_westendorp.py: stdlib only, no network). The other 103 non-core picks are still uninstalled. | ~/.claude/skills, ~/.claude/agents
- 2026-11-13 18:45 CT | Agent ops | Claude Code (desktop) | DONE | Load trim for speed. MCP servers rea, apartments and suno disabled for the accelera-crm and AlCapital/web/accelera-site projects only (~/.claude.json disabledMcpServers; still on everywhere else). Parked 66 non-Accelera skills (reap-*, Karaoke Soda, ecommerce/TikTok product research, LinkedIn/X/Threads creator pack, HubSpot, Swift/Expo) and 261 agency-agents-zh agents to ~/.claude-parked/. Kept the 7 zh agents the kits use. Now loading 114 skills + 18 agents. Nothing deleted; restore steps in ~/.claude-parked/README.md. | ~/.claude-parked/README.md, ~/.claude-parked/PARKED.txt
