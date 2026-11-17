# Design Direction: Accelera Landing Page

Extends and supersedes Section 6 of `product-page-brief.md`. This is the single source of truth for visual and interaction design on the landing page variants.

---

## 1. Style & Mood

| Attribute | Direction |
|-----------|-----------|
| **Core aesthetic** | High-trust, professional, conversion-first. Not "agency cool" — owner-operator credible |
| **Mood** | Competent, local, transparent. Twin Cities authority |
| **Reference benchmarks** | Unbounce services LP median 6.1% (target >6.1%); grade 5–7 copy converts 11.1% vs 5.3% |
| **Visual language** | Plain, concrete, no hype. No em-dashes, no emoji. Owner language ("book a job" not "schedule appointment") |
| **Photography** | Real trade work environments (truck, job site, roof, shop floor). No stock people. Tyler founder photo in final section |
| **Trust markers** | Sourced stats with inline citations, transparent pricing, guarantee badges, MN license verification badge for roofers, "Twin Cities Only" badge |

---

## 2. Color Application

Brand palette from `brand-kit.json` + logo extraction:

| Token | Hex | Usage |
|-------|-----|-------|
| **Background** | `#FFFFFF` | Page background, hero, all light sections |
| **Foreground** | `#1A1A2E` | All body copy, headlines, UI text |
| **Primary (Brand Blue)** | `#2B67BD` | Primary CTA buttons, primary links, focus rings, calculator accent, step numbers, proof bar stat numbers |
| **Accent (Trust Green)** | `#00A859` | Success states, guarantee badges, "30-day money-back" text, calculator result number, booking demo confirmation checkmarks |
| **Muted** | `#6B7280` | Secondary labels, helper text, disabled states, FAQ closed state icons |
| **Card** | `#F8FAFC` | Calculator card, offer stack cards, FAQ cards, step cards, booking demo container |
| **Success** | `#059669` | Positive calculator results, confirmation messages |
| **Amber** | `#D97706` | Warning states (calculator empty), "demo" labels |
| **Error** | `#DC2626` | Form validation errors only |

### Section-by-section color mapping

| Section | Background | Primary Text | Accents | Notes |
|---------|------------|--------------|---------|-------|
| **Hero** | `#FFFFFF` | `#1A1A2E` | Primary CTA `#2B67BD`, click-to-call `#2B67BD` outline | Light hero — Three.js glow subtle, content renders first |
| **Proof Bar** | `#FFFFFF` | `#1A1A2E` | Stat numbers `#2B67BD` (700 weight), source citations `#6B7280` | Subtle top/border `#E5E7EB` divider |
| **Calculator** | `#F8FAFC` card on `#FFFFFF` | `#1A1A2E` | Input focus `#2B67BD`, result `#00A859`, trade selector `#2B67BD` | Card elevation: `0 1px 3px rgba(26,26,46,0.08)` |
| **Offer Stack** | `#FFFFFF` | `#1A1A2E` | Tier cards `#F8FAFC`, selected/hover `#2B67BD` border, guarantee badges `#00A859` bg with white text | Three equal-width cards, middle tier not highlighted |
| **Booking Demo** | `#F8FAFC` container on `#FFFFFF` | `#1A1A2E` | Step indicators `#2B67BD`, "DEMO" badge `#D97706`, confirmation `#00A859` | No submission — labeled demo throughout |
| **Steps** | `#FFFFFF` | `#1A1A2E` | Step numbers `#2B67BD` (700, 48px), connectors `#E5E7EB` | Timeline vertical on mobile, horizontal ≥1024 |
| **FAQ** | `#FFFFFF` | `#1A1A2E` | Questions `#1A1A2E` (600), answers `#374151`, open state `#2B67BD` accent line | Accordion, one open at a time |
| **Founder Note + CTA** | `#F8FAFC` full-width band | `#1A1A2E` | Photo border `#2B67BD`, final CTA `#2B67BD`, guarantee text `#00A859` | Sticky mobile bar nests here |

---

## 3. Typography System

| Role | Font | Weight | Size (clamp) | Line Height | Letter Spacing | Usage |
|------|------|--------|--------------|-------------|----------------|-------|
| **Display / Hero Headline** | Inter | 700 | `clamp(2.25rem, 5vw, 3.5rem)` | 1.1 | `-0.02em` | Hero headline, proof bar stat numbers |
| **Subheadline** | Inter | 400 | `clamp(1.125rem, 2.5vw, 1.375rem)` | 1.5 | `0` | Hero subhead, section hooks |
| **Section Title (H2)** | Inter | 700 | `clamp(1.75rem, 3.5vw, 2.5rem)` | 1.2 | `-0.01em` | All section headings |
| **Section Subtitle** | Inter | 500 | `clamp(1rem, 1.8vw, 1.125rem)` | 1.5 | `0` | Section descriptive text |
| **Body / Paragraph** | Inter | 500 | `1rem` (16px) | 1.6 | `0` | All body copy, FAQ answers, offer details |
| **Small / Caption** | Inter | 400 | `0.875rem` (14px) | 1.5 | `0` | Source citations, guarantee fine print, demo labels |
| **Button / CTA** | Inter | 600 | `1rem` (16px) | 1 | `0` | All buttons, click-to-call |
| **Calculator Input Label** | Inter | 500 | `0.875rem` (14px) | 1.4 | `0` | Trade selector, ticket input |
| **Calculator Result** | Inter | 700 | `clamp(2rem, 4vw, 3rem)` | 1.1 | `-0.02em` | Monthly revenue loss number |

**Responsive scale anchors:**
- 1440px: 3.5rem / 1.375rem / 2.5rem / 1.125rem
- 1024px: 3rem / 1.25rem / 2.25rem / 1.125rem
- 768px: 2.5rem / 1.125rem / 2rem / 1rem
- 390px: 2.25rem / 1.125rem / 1.75rem / 1rem

**System fallback stack:** `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

---

## 4. Hero Layout Intent

| Constraint | Implementation |
|------------|----------------|
| **Light hero only** | Three.js atmosphere/glow island — loads AFTER content and CTA are interactive. No heavy 3D. |
| **Message-matched** | 5 variants (A–E) from Section 5.1 swapped via UTM parameter or URL path |
| **1:1 attention ratio** | NO navigation, NO footer links, NO social icons. Single focus. |
| **ONE primary CTA** | "Get your free missed-call & booking audit" — Primary blue `#2B67BD`, 48px min height |
| **Click-to-call** | Secondary, outline style, same height, left of primary on desktop / stacked on mobile. `tel:+1-XXX-XXX-XXXX` (placeholder) |
| **Guarantee adjacency** | "30-day money-back on booking and phone. No monthly SEO retainer ever." directly below CTA, `#6B7280`, 14px |
| **Above-fold guarantee** | CTA + guarantee + click-to-call all visible at 390px viewport height |

**Hero content order (top → bottom):**
1. Eyebrow: "Twin Cities • [Trade] • Websites + Booking + After-hours Phone" (muted, 14px)
2. Headline (display, message-matched)
3. Subhead (message-matched)
4. CTA row: [Click-to-call] [Primary CTA]
5. Guarantee line
6. Trust badges row: "30-day money-back" • "No SEO retainers" • "You own the site" • "Twin Cities only"

---

## 5. Section-by-Section Visual Treatment

### 5.1 Proof Bar (Section 2)
- **Layout**: 3 equal columns, horizontal on ≥768px, stacked on mobile
- **Stat card**: Large number (Display, `#2B67BD`, 700), label below (Body, `#1A1A2E`), source citation (Small, `#6B7280`, "Source: 99 Calls, Invoca 2024")
- **Stats**: 28.1% (roofing unanswered) | 27% (trade calls unanswered) | 46% (phone callers book)
- **Divider**: Subtle `#E5E7EB` vertical rules between cards on desktop
- **Background**: `#FFFFFF`, no card elevation

### 5.2 Missed-Call Calculator (Section 3)
- **Container**: Single `#F8FAFC` card, max-width 560px, centered
- **Trade selector**: Segmented control (Roofing | Plumbing | Auto Repair | Contracting), default from URL variant or Roofing. Active `#2B67BD` bg, white text.
- **Labeled defaults per trade** (pre-filled, user editable):
  - Roofing: $8,000 avg ticket, 120 calls/mo, 28.1% missed
  - Plumbing: $450 avg ticket, 200 calls/mo, 27% missed
  - Auto Repair: $650 avg ticket, 180 calls/mo, 54% missed
  - Contracting: $3,500 avg ticket, 80 calls/mo, 30% missed
- **Inputs**: Average ticket (currency), Monthly calls (number), Missed % (slider 0–100, shows label)
- **Result**: "You're losing ~$[X]/month to missed calls" — Result number `#00A859`, 700 weight, large
- **Micro-copy**: "Based on 46% of callers booking a job (Invoca 2024). Your close rate may vary." (Small, `#6B7280`)
- **CTA below result**: "Get your free audit" (primary) — captures calculated value as hidden field

### 5.3 Offer Stack (Section 4)
- **Layout**: 3-column grid ≥768px, stacked mobile. Equal width, equal height cards
- **Card**: `#F8FAFC` bg, `1px solid #E5E7EB` border, `border-radius: 12px`, padding 24px
- **Tier 1 — Site**: "$1,497 one time" (Display, `#2B67BD`), "5-page WordPress site built to rank for [trade] + [city]" (Body), "50% deposit / 50% on approval" (Small), "Two-week delivery" (Small), "Approve live staging before balance" (Small, `#00A859`)
- **Tier 2 — Booking**: "$597 / mo" (Display, `#2B67BD`), "Custom no-account booking calendar" (Body), "Live on your site in 14 days" (Small), "30-day money-back guarantee" (Badge: `#00A859` bg, white text, 12px)
- **Tier 3 — Phone**: "$997 / mo" (Display, `#2B67BD`), "Live after-hours phone with job capture" (Body), "6 PM – 8 AM, weekends, holidays" (Small), "Call tracking + recording" (Small), "30-day money-back guarantee" (Badge)
- **Selection**: Hover/focus adds `2px solid #2B67BD` border. No pre-selected tier.
- **Guarantee row** (below cards): "30-day money-back on monthly components. Approve staging site before paying balance. WordPress on YOUR hosting — portable anytime." (Body, `#374151`, center)

### 5.4 Booking Demo (Section 5 — labeled "Booking Demo" in brief Section 7 but Section 4 in order)
- **Container**: `#F8FAFC` full-width band, padding 48px 24px
- **"DEMO" badge**: Top-right of container, `#D97706` bg, white text, 11px, uppercase, `border-radius: 4px`
- **Flow steps** (horizontal ≥768px, vertical mobile):
  1. **Pick Service** — Radio cards: "Roof Repair" | "Emergency Leak" | "Inspection" (trade-adaptive)
  2. **Pick Time** — Calendar heatmap (next 14 days), clickable slots
  3. **Enter Address** — Single-line input with autocomplete
  4. **Confirm** — Summary card, "Text confirmation sent" (green check `#00A859`)
- **No submission**: Final step shows "This is a demo. No data submitted." (Small, `#6B7280`)
- **Interactive**: All steps functional, local state only. Reset button at end.

### 5.5 How It Works — 4 Steps (Section 6 in brief Section 7)
- **Layout**: Vertical timeline (mobile) / horizontal with connectors (≥1024px)
- **Step card**: Number circle (48px, `#2B67BD` bg, white 700), Title (H3, 700), Description (Body)
- **Steps**:
  1. **15-minute call** — "We learn your trade, city, and average ticket. No discovery questionnaire."
  2. **We build in two weeks** — "5-page WordPress site + booking calendar + phone line configured."
  3. **You approve the live staging site** — "Review on your phone. Request changes. Pay balance only when satisfied."
  4. **We launch. Zero dashboards.** — "Jobs book while you sleep. You get texts. No logins to learn."
- **Connectors**: `#E5E7EB` lines, `#2B67BD` circles
- **Icons**: Optional minimal line icons (phone, code, check, rocket) — 24px, `#6B7280`

### 5.6 Objection FAQ (Section 7 in brief Section 7)
- **Layout**: Accordion, one open at a time. Full-width cards, `#FFFFFF` bg, `1px solid #E5E7EB` border
- **Question**: 600 weight, `#1A1A2E`, padding 20px 24px, `cursor: pointer`
- **Open state**: Left border `3px solid #2B67BD`, answer slides down (CSS transition 200ms ease-out)
- **Answer**: Body weight 500, `#374151`, padding 0 24px 20px
- **4 Objections** (from Section 5.4):
  1. "Burned by SEO agencies" → Answer: No monthly SEO retainer ever...
  2. "$997/mo is steep" → Answer: One recovered job at your average ticket pays for the line all year...
  3. "My wife takes the calls" → Answer: We handle 6 PM – 8 AM, weekends, holidays. 72% of emergency calls come after hours...
  4. "Too busy" → Answer: 15-minute call. We build in two weeks. You approve. Zero dashboards...

### 5.7 Founder Note + Final CTA (Section 8 in brief Section 7)
- **Background**: Full-width `#F8FAFC` band
- **Layout**: Two-column ≥768px (photo left, note right), stacked mobile (photo above)
- **Photo**: Tyler, 240px circle, `border: 3px solid #2B67BD`, real job-site photo (placeholder)
- **Note**: "I built this because I watched my father miss calls on the roof. He lost jobs. His wife took messages on paper. There is a better way." (Body, 500, `#1A1A2E`, max-width 560px)
- **Signature**: "— Tyler, Accelera" (500, `#2B67BD`)
- **Final CTA**: Primary button "Get your free missed-call & booking audit" + guarantee row (same as hero)
- **Sticky Mobile CTA Bar** (nested here, renders fixed on mobile):
  - Shows only ≤768px, `position: fixed`, bottom 0, full width
  - Left: "Missed calls cost you money." (500, `#1A1A2E`, 14px)
  - Right: Primary CTA button (44px min height)
  - Below button: "30-day money-back guarantee • No SEO retainers • You own the site" (Small, `#6B7280`, center)
  - Background: `#FFFFFF`, `border-top: 1px solid #E5E7EB`, `box-shadow: 0 -4px 20px rgba(26,26,46,0.08)`
  - `z-index: 100`, safe-area-inset-bottom respected

---

## 6. Interactive Elements

| Element | Behavior | Details |
|---------|----------|---------|
| **Missed-Call Calculator** | Client-side only, no server call | Trade selector changes labeled defaults instantly. Slider updates result live. Result copies to hidden field on CTA click. |
| **Trade Selector** | Segmented control, keyboard accessible | Arrow keys navigate, Enter/Space selects. ARIA role `radiogroup`. |
| **Booking Demo** | Local state machine (4 steps) | No form submission. "DEMO" badge always visible. Reset returns to step 1. All inputs validating but not submitting. |
| **Calendar Heatmap** | Click to select, keyboard navigable | Next 14 days only. Unavailable dates dimmed. |
| **FAQ Accordion** | Single-open, CSS-only transition | `details`/`summary` preferred. Height animation via `grid-template-rows: 0fr → 1fr`. |
| **Offer Stack Cards** | Hover/focus border highlight | Click does nothing (no radio selection). Selection happens on booking call CTA. |
| **Sticky Mobile CTA Bar** | Fixed bottom, hide on scroll up (optional) | Shows after hero scrolls past. Collapses if user taps. `IntersectionObserver` on hero. |
| **Click-to-Call** | `tel:` link, tracks `call_click` event | `data-utm` attributes captured. Works on desktop (FaceTime/Phone app) and mobile. |
| **Primary CTAs** | All identical label, track `book_call` | Hidden field `calculator_value` included when from calculator. |
| **Smooth Scroll** | Lenis on anchor links | Only for "Steps" and "FAQ" anchor navigation. |

---

## 7. Motion & Animation

| Trigger | Animation | Duration | Easing | Notes |
|---------|-----------|----------|--------|-------|
| **Page load** | Content + CTA render immediately. Hero Three.js island loads async, fades in. | 0ms (content) / 400ms (hero) | `ease-out` | **Critical**: LCP content never blocked by 3D. |
| **Hero headline** | None (static). Optional: `text-wrap: balance` only. | — | — | No typewriter, no slide-in. |
| **CTA buttons** | Hover: `transform: translateY(-1px)`, `box-shadow: 0 4px 12px rgba(43,103,189,0.3)`. Tap/active: `transform: translateY(0)`. | 150ms | `ease-out` | Primary only. Click-to-call: border color shift. |
| **Proof bar stats** | Count-up on scroll into view (IntersectionObserver). | 1200ms | `ease-out-cubic` | Runs once. `prefers-reduced-motion`: instant. |
| **Calculator result** | Number counts up on input change. | 600ms | `ease-out` | Debounced 150ms. |
| **Offer stack cards** | Hover: border 2px `#2B67BD`, `box-shadow: 0 8px 24px rgba(26,26,46,0.08)`. | 200ms | `ease-out` | No transform. |
| **Booking demo steps** | Step transition: slide horizontal (desktop) / fade (mobile). | 250ms | `ease-in-out` | `prefers-reduced-motion`: instant. |
| **FAQ accordion** | Height expand via grid `0fr → 1fr`. | 200ms | `ease-out` | CSS-only, no JS height calc. |
| **Steps timeline** | Fade + slide up on scroll (ScrollTrigger). | 400ms stagger 100ms | `ease-out` | `prefers-reduced-motion`: all visible. |
| **Founder photo** | Fade in on scroll. | 500ms | `ease-out` | |
| **Sticky mobile bar** | Slide up from bottom on hero exit. Slide down on hero re-enter. | 300ms | `ease-in-out` | `IntersectionObserver` on hero. |

**Global motion principles:**
- Content and CTA **always render first** — no animation blocks interaction
- `prefers-reduced-motion` respected everywhere (instant state changes)
- No parallax, no scroll-jacking, no background video
- Three.js hero: subtle atmospheric glow only, ≤20fps budget, pauses when tab hidden
- GSAP/ScrollTrigger only for entrance reveals — no scrub animations

---

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Target Devices |
|------|-------|----------------|
| **XL** | ≥1440px | Desktop large |
| **LG** | 1024–1439px | Desktop / laptop |
| **MD** | 768–1023px | Tablet landscape |
| **SM** | 390–767px | Mobile / tablet portrait |
| **XS** | <390px | Small phones (SE, Fold) |

### Section responsive rules

| Section | XL / LG | MD | SM / XS |
|---------|---------|-----|---------|
| **Hero** | Side-by-side: text left (55%), click-to-call + CTA right (45%) | Stacked, CTA full-width, click-to-call above | Stacked, both full-width, click-to-call first |
| **Proof Bar** | 3-col grid | 3-col grid | Stacked, centered, max-width 320px |
| **Calculator** | Centered card, max-width 560px | Full-width card, padding 16px | Full-width, padding 12px, inputs stack |
| **Offer Stack** | 3-col grid, equal height | 2-col (Site+Booking) / 1-col (Phone) | Stacked, all full-width |
| **Booking Demo** | 4-step horizontal | 2×2 grid | Vertical stack, step indicator pills |
| **Steps** | Horizontal timeline, connectors | Horizontal (condensed) | Vertical timeline, centered numbers |
| **FAQ** | Full-width, max-width 720px centered | Full-width | Full-width, padding 16px |
| **Founder Note** | 2-col (photo 35% / text 65%) | 2-col (photo 40% / text 60%) | Stacked, photo 180px circle above text |
| **Sticky CTA** | Hidden | Hidden | Fixed bottom, full-width |

### Mobile-first implementation
- Base styles target SM (390px)
- Progressive enhancement via `min-width` media queries
- Container: `max-width: 1280px` centered, `padding: 0 24px` (SM: 16px)
- Touch targets: **44×44px minimum** on all interactive elements
- Font sizes never below 16px (prevents iOS zoom on focus)

---

## 9. Trust Signals — Implementation Spec

| Signal | Location | Format | Source / Citation |
|--------|----------|--------|-------------------|
| **Stat: 28.1% roofing calls unanswered** | Proof Bar #1, Hero Variant A/D | Large number + "Source: 99 Calls 2024" | 99 Calls benchmarks |
| **Stat: 27% trade calls unanswered** | Proof Bar #2, Hero Variant B | Large number + "Source: Invoca 2024" | Invoca Buyer Experience Report |
| **Stat: 46% phone callers book** | Proof Bar #3, Calculator micro-copy | Large number + "Source: Invoca 2024" | Invoca |
| **30-day money-back guarantee** | Hero, Offer Stack (2×), Sticky Bar, Founder CTA | Badge `#00A859` + text | Self-policy |
| **No monthly SEO retainer** | Hero guarantee, Objection 1 answer, Sticky Bar | Plain text | Self-policy |
| **Approve staging before balance** | Hero guarantee, Offer Stack Site tier, Objection 1 | Plain text | Self-policy |
| **WordPress on YOUR hosting** | Hero guarantee, Offer Stack Site tier, Objection 1 | Plain text | Self-policy |
| **Twin Cities Only badge** | Hero trust row, Founder section | Badge `#2B67BD` outline + text | Geographic constraint |
| **MN License Verification (Roofers)** | Offer Stack (roofer variant), Calculator (roofing default) | Badge `#00A859` "MN License Verified" | MN DLI public records |
| **Tyler photo + direct number** | Founder Note section | 240px circle photo, `tel:` link placeholder | Operator provides |
| **Call tracking + recording** | Offer Stack Phone tier | Feature bullet | Self-feature |
| **97% voicemail hangup** | Hero Variant A subhead | Inline stat | Invoca / industry |
| **72% emergency calls after hours** | Hero Variant C/D subhead, Objection 3 | Inline stat | Industry data |

**Citation format:** "Source: [Entity] [Year]" — Small (14px), `#6B7280`, no link (landing page noindex). Full references in `SOURCES.md` repo file.

---

## 10. Build Integration Notes

| Item | Spec |
|------|------|
| **Stack** | Astro (static) + Three.js island (`client:visible`) + GSAP/ScrollTrigger + Lenis |
| **Variants** | `/lp/missed-calls`, `/lp/booking`, `/lp/plumbers`, `/lp/roofers`, `/lp/auto-repair` |
| **Component registry** | 21st-registry / ui-ux-pro-max: Hero, ProofBar, Calculator, OfferStack, BookingDemo, Steps, FAQ, StickyCTA, FounderNote |
| **Tracking events** | `call_click`, `book_call`, `calculator_used`, `demo_complete`, `faq_open` |
| **UTM capture** | All CTAs include `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` as hidden fields |
| **Schema** | `FAQPage` on FAQ section, `Organization` on page (pending) |
| **CWV targets** | LCP <1.5s mobile, INP <200ms, CLS <0.1 |
| **Readability** | Grade ≤7 Flesch-Kincaid, max 25 words/sentence, no passive voice |
| **A/B test hooks** | Short vs long hero, CTA variants, calculator position (before/after offer), guarantee placement |

---

## 11. Decision Log (Append to `decisions.md` on commit)

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-11-12 | Light hero only, Three.js loads after content | CWV target LCP <1.5s mobile; paid traffic needs speed |
| 2026-11-12 | No navigation, 1:1 attention ratio | Unbounce services LP best practice; conversion focus |
| 2026-11-12 | Labeled defaults per trade in calculator | Reduces friction; owner-operators know their trade |
| 2026-11-12 | Booking demo labeled "DEMO", no submission | Trust signal; shows product without commitment |
| 2026-11-12 | Sticky mobile CTA bar with guarantee row | Mobile conversion capture; always-visible trust |
| 2026-11-12 | `prefers-reduced-motion` respected globally | Accessibility; owner-operators may have motion sensitivity |
| 2026-11-12 | Sourced stats with inline citations only | No unverified claims; free models invent demand data |

---

*This document extends Section 6 of `product-page-brief.md` and is the authoritative design spec for all landing page variants. Changes require a `decisions.md` entry and git commit.*
## Decision log additions (L build, 2026-11-15)

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-11-15 | Palette is navy #0A1929 / #1A2A47 + white + orange #FF6B00 (Tyler: "use the blue orange Accelera colors"). Supersedes the blue/green mapping in section 2. Orange buttons carry navy text. Placeholders/demo/example labels use a separate violet family | Tyler's call; white on #FF6B00 is 2.9:1 and fails WCAG |
| 2026-11-15 | Hero visual is an example after-hours call card (ring, address read back, job booked, text to owner) instead of a Three.js glow. No Three.js on the landing pages | Shows the product doing its job; zero 3D weight keeps mobile LCP under 1 s |
| 2026-11-15 | No impeccable concept roll was run (seed: none). The first surface was not pinned by Tyler; it follows this document plus the call-card change above | Recorded so a later redesign knows the hero concept was the builder's choice, not Tyler's |
| 2026-11-15 | Sections are one screen each on a 12-column grid; the eyebrow line and the colored FAQ left border were dropped | Taste gate layout rules and the impeccable craft floor (eyebrows banned, colored side borders refused) |
| 2026-11-16 | Tyler approved the hero concept as built: "The phone rings at 2 a.m. The job still gets booked." + the example after-hours call card. The first surface is now pinned by the owner | MASTER L-5 decided |
| 2026-11-16 | Website (P4) direction: seed: none (pinned). Tyler approved the 2 a.m. call-card hero (MASTER L-5) and asked for the website to be built in this project reusing the landing page's tokens and components ("Do this task here", P4 brief). No concept roll was run for the website | Recorded per impeccable finish review |
| 2026-11-16 | HOME page hero is a 3D winter-night scene (vanilla three.js, no React runtime): a low-poly Twin Cities lot the visitor can drag to turn, playing three beats (2:14 a.m. phone rings, 2:19 a.m. job booked, 7:30 a.m. van at the house at sunrise). Chosen by Tyler ("3D as the hero") over a 3D band under the approved hero and over CSS-only depth. Reopens L-5 for the home page only; the example call card moves to the stats section below. Landing pages keep the L-5 hero with no 3D | Tyler's call. Guard rails: headline and buttons are plain HTML and paint first; the scene chunk (144 KB gzip) is fetched only after load on desktop and on first touch/scroll on phones; a 28 KB still picture covers no-WebGL, software rendering, data-saver and load failure; reduced motion gets a still scene with no autoplay; story is also plain text in three buttons |
