# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Owner-operators of plumbing, roofing, auto repair and contracting businesses in the Twin Cities seven-county metro (Minnesota): 1-10 trucks, roughly $500K-$5M revenue. They read on a phone, often in the truck or between jobs. Many were burned by monthly SEO retainers and have no time for long sales calls or new software.

## Product Purpose
Accelera is a one-person Twin Cities agency (founder: Tyler Maxwell) that sells three things: a website built to show up for the owner's trade and city, online booking customers can use without an account, and after-hours call answering that books the job. Success for the landing pages: an owner requests the free missed-call and booking audit or calls Tyler.

## Positioning
Site, booking and after-hours answering from one local team, Twin Cities only. Fixed scope, the owner approves the site before launch, no monthly SEO retainer. Competitors split these across separate companies (site agency, answering service, AI site builder).

## Operating Context
- Landing pages under `/lp/*` take paid and social traffic; they are `noindex`, one action per page, no site navigation.
- The full website (PLAN P4) will reuse this project's tokens and components.
- Tyler personally sends every message, takes every call and signs every account. Pages draft; they never contact anyone.

## Capabilities and Constraints
- Stack: Astro (static output) in this repo; no backend yet. Forms are not connected to anything.
- OPEN, not approved for client-facing use (show only as marked placeholders): prices ($1,497 site, $597/mo booking, $997/mo answering), payment split, 30-day money-back guarantee, site ownership terms, two-week delivery promise.
- OPEN (AL-1): who answers after-hours calls (live partner vs AI receptionist). Copy stays neutral ("calls get answered and the job gets booked") until Tyler decides. Confirmed by Tyler 2026-11-15.
- OPEN (AL-2): client site platform. Copy names no platform (no "WordPress").
- No domain, phone number, business email or Cal.com link exists yet. Use obvious placeholders (555-01xx numbers, example.com).

## Brand Commitments
- Name: Accelera. Logo: `landing/accelera-logo.png` (black wordmark with triangle mark, "Business Solutions").
- Palette and type pinned in `landing/brand-kit.json` and `landing/DESIGN-DIRECTION.md`: primary #2B67BD, accent #00A859, foreground #1A1A2E, Inter.
- Voice: plain, concrete, owner words ("book a job", "missed calls", "average ticket"), grade 5-7 on landing pages, active voice, no em-dashes, no emoji, no hype words, no jargon (SEO, funnel, dashboard, platform).

## Evidence on Hand
- Sourced stats only from `research/STATS.md` (Invoca 60M+ calls: 27% unanswered, under 3% leave voicemail, 46% of phone leads book; 99 Calls 36,498 calls: roofers answer 28.1% live, plumbers 58%; BrightLocal 2025 n=1,200+; Unbounce 2024).
- Internal audit: 7 of 8 audited prospects advertise booking but have no scheduler (2026-11-11, n=8).
- Founder story (Tyler's original docs, confirmed for use 2026-11-15): his electrician dad lost three jobs in one week because nobody answered until morning.
- ABSENT and must not be fabricated: clients, reviews, testimonials, logos, case studies, results, Tyler's photo, any "14 leads" style outcome claim.

## Product Principles
1. Prove the mechanism (a call answered, a job booked) instead of claiming it; label demo data as an example.
2. Every number carries its source; unknowns are labeled, never rounded into claims.
3. One action per page: request the free audit, or call.
4. Nothing ships as a commitment until Tyler approves it.

## Accessibility & Inclusion
WCAG 2.2 AA. 44px touch targets, 16px minimum input text, full keyboard use, `prefers-reduced-motion` respected.
