# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Owner-operators of plumbing, roofing, auto repair and contracting businesses in the Twin Cities seven-county metro (Minnesota): 1-10 trucks, roughly $500K-$5M revenue. They read on a phone, often in the truck or between jobs. Many were burned by monthly SEO retainers and have no time for long sales calls or new software.

## Product Purpose
Accelera is a one-person Twin Cities agency (founder: Tyler Maxwell) that sells three things: a website built to show up for the owner's trade and city, online booking customers can use without an account, and after-hours call answering that books the job. Success, site-wide: an owner requests the free missed-call and booking audit or calls Tyler. The website also has to be found for trade + Twin Cities searches and be cited by AI search; the landing pages only have to convert paid and social traffic.

## Positioning
Site, booking and after-hours answering from one local team, Twin Cities only. Fixed scope, the owner approves the site before launch, no monthly SEO retainer. Competitors split these across separate companies (site agency, answering service, AI site builder).

## Operating Context
- Website (PLAN P4, v1 built 2026-11-16): indexable core pages (home, 3 Minnesota service pages, 4 trade pages, pricing, how it works, about, FAQ, contact, missed-call calculator) with nav, schema, sitemap, robots and llms.txt. No city or city x trade pages until Accelera has unique local audit data for them (Tyler, 2026-11-16).
- Landing pages under `/lp/*` take paid and social traffic; they are `noindex`, one action per page, no site navigation.
- Both share `src/styles/tokens.css`, `base.css`, `src/components/ui/` and the `src/components/lp/` sections.
- Tyler personally sends every message, takes every call and signs every account. Pages draft; they never contact anyone.

## Capabilities and Constraints
- Stack: Astro (static output) in this repo; no backend yet. Forms are not connected to anything.
- OPEN, not approved for client-facing use (show only as marked placeholders): prices ($1,497 site, $597/mo booking, $997/mo answering), payment split, 30-day money-back guarantee, site ownership terms, two-week delivery promise.
- OPEN (AL-1): who answers after-hours calls (live partner vs AI receptionist). Copy stays neutral ("calls get answered and the job gets booked") until Tyler decides. Confirmed by Tyler 2026-11-15.
- OPEN (AL-2): client site platform. Copy names no platform (no "WordPress").
- No domain, phone number, business email or Cal.com link exists yet. Use obvious placeholders (555-01xx numbers, example.com).

## Brand Commitments
- Name: Accelera. Logo: `public/brand/accelera-logo.png` (black wordmark with triangle mark, "Business Solutions"), shown inverted to white on the navy header and footer.
- Palette (Tyler 2026-11-15, "use the blue orange Accelera colors"): navy #0A1929 / #1A2A47, white, orange #FF6B00 for the main buttons and a few highlights (60-30-10). Orange buttons carry navy text. Violet marks anything not real yet (placeholders, demo, example) and is not a brand color. Inter, self-hosted. Values live in `src/styles/tokens.css` and `landing/brand-kit.json`.
- Hero concept approved by Tyler (L-5, 2026-11-16): "The phone rings at 2 a.m. The job still gets booked." + the example after-hours call card.
- Home page hero (Tyler, 2026-11-16, "3D as the hero"): a 3D winter-night lot (`src/scripts/night-scene.ts`, `src/components/site/SceneHero.astro`) that plays the same story in three beats (2:14 a.m. the phone rings, 2:19 a.m. job booked, 7:30 a.m. the van is at the house). The example call card moved to the section below it. Landing pages keep the L-5 hero and load no 3D.
- Voice: plain, concrete, owner words ("book a job", "missed calls", "average ticket"), grade 5-7 on landing pages, active voice, no em-dashes, no emoji, no hype words, no jargon (SEO, funnel, dashboard, platform).

## Evidence on Hand
- Sourced stats only from `src/config/stats.ts`, checked against `research/STATS.md` and its correction sections: Invoca blog (27% of home-service calls unanswered, platform data 2022; under 3% of voicemail callers leave a message; no sample sizes published); Invoca 2025 benchmark report via pmmag.com (46% of home-services phone leads convert on the call; 60M+ calls across industries); 99 Calls (published 2026-09-17, Sep 2025-Aug 2026: plumbers 58% answered live n=1,794, roofers 28.1% n=3,604). BrightLocal figures are UNVERIFIED and not used.
- Internal check: 7 of 8 audited trade businesses' sites had no working online scheduler (2026-11-11, n=8; Doran-King still open as CRM task ae21d556).
- Founder story (Tyler's original docs, confirmed for use 2026-11-15): his electrician dad lost three jobs in one week because nobody answered until morning.
- ABSENT and must not be fabricated: clients, reviews, testimonials, logos, case studies, results, Tyler's photo, any "14 leads" style outcome claim.

## Product Principles
1. Prove the mechanism (a call answered, a job booked) instead of claiming it; label demo data as an example.
2. Every number carries its source; unknowns are labeled, never rounded into claims.
3. One action per page: request the free audit, or call.
4. Nothing ships as a commitment until Tyler approves it.

## Accessibility & Inclusion
WCAG 2.2 AA. 44px touch targets, 16px minimum input text, full keyboard use, `prefers-reduced-motion` respected.
