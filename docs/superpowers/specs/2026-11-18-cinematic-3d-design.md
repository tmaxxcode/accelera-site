# Cinematic 3D site upgrade: design

Date: 2026-11-18. Status: READY FOR APPROVAL (builder check done; speed trade-off decided by Tyler).

## Intent

Tyler wants the Accelera site (Astro, `~/AlCapital/web/accelera-site`) to look like a $10,000 website: cinematic, 3D, scroll-driven and interactive. His reason: a more interactive, 3D site is more impressive.

Builder's reading (proposal, not Tyler's words): the site doubles as Accelera's portfolio. A trade owner who lands on it should think "if they built this, they can build mine." So the 3D always shows the job (the call, the booking, the van) rather than decorating, and it never gets between the visitor and the "Get a free audit" button.

Tyler named the tools: ui-ux-pro-max, Framer Motion, 21st.dev, "and any other tools." He authorized rewriting the design rules that block this.

## Goals

1. **Home page becomes a cinematic scroll film.** The existing 3D night scene is pinned while you scroll, and scrolling drives the story: 2:14 a.m. the phone rings, 2:19 the call is answered and the job booked, 7:30 sunrise and the van pulls up. Then the camera pulls back and the page continues.
2. **Every main-site hero gets 3D.** The three service pages each get one interactive 3D object (ringing phone for after-hours answering, calendar for online booking, floating browser window for website design). The four trade pages and the remaining pages reuse one of those objects.
3. **Premium UI and motion site-wide.** Better section reveals, hover/tilt cards, magnetic CTA buttons, count-ups, smooth scroll and page transitions. Rebuild the services, trades and pricing blocks as premium components.
4. **Rewrite the design rules** in `landing/DESIGN-DIRECTION.md` so the new direction is written down (see "Rule changes").

## Non-goals

- `/lp/*` ad landing pages: unchanged and 3D-free. They serve paid traffic, where load speed is what pays.
- No copy, price, claim or stat changes. Words stay as they are; only layout and motion change.
- No new pages, no deploy, no audio, no new 3D model files or paid assets (scenes are built from three.js primitives, like the current hero).

## Anti-goals (a failure even if it works)

- Headline, CTA or phone number hidden, delayed or unreadable because of animation.
- Janky scrolling on a mid-range phone, or a page that feels trapped (scroll that doesn't respond at normal speed).
- Motion that ignores `prefers-reduced-motion`.
- Example data that looks like a real customer (keep the "Example night, not a real customer" label).
- Accessibility or SEO scores going down.

## Constraints

- Astro 7, static output, Tailwind 3, React islands via `@astrojs/react` (installed). three, gsap and @studio-freight/lenis are installed.
- New dependency: `motion` (Framer Motion). Tyler asked for it by name.
- 21st.dev components are React + Tailwind (shadcn style). They are copied in as source and restyled to the navy/orange tokens in `src/styles/tokens.css` and `tailwind.config.mjs`. No shadcn theme overrides the brand.
- Palette stays navy `#1A2A47` + orange `#FF6B00`. Font stays Inter unless ui-ux-pro-max makes a strong case for a display face; any change is shown to Tyler first.
- Release guard (`src/config/offer.ts`, `PUBLIC_RELEASE`) and all placeholders stay as they are.
- `tests/site-flows.js` and `tests/lp-flows.js` must pass; update site-flows where the structure changes on purpose.
- Budget (Lighthouse 12.8.2, local preview): accessibility 100 and SEO 100 everywhere; LCP is the headline text and stays under 2.5 s on mobile everywhere. Mobile performance: home at least 80, every other main-site page at least 90 (today 99-100). `/lp/` scores must not change.
- **When 3D and speed collide (Tyler, 2026-11-18): 3D wins on home**, down to the 80 floor. On every other page speed wins: a page that can't hold 90 with its 3D object shows a still picture on phones instead.
- All 3D loads after the text is on screen (dynamic import, as today). If WebGL is missing or reduced motion is on: still image plus static text, as the current hero does.

## Approaches considered

- **A. Showpiece home plus a 3D object on every hero. Chosen.** Big visible upgrade on every page at moderate cost. Reuses the existing night scene and its step data.
- **B. One persistent 3D world (a miniature Twin Cities map) that the camera flies through page to page.** Most impressive, but by far the largest build, the riskiest on older phones, and the gimmick can bury the message.
- **C. Premium polish only (tilt cards, reveals, cursor lighting) around the current hero.** Cheap and nearly free on speed, but reads as "nice site," not "cinematic."

Tyler asked for "cinematic 3D scrolling" after seeing these; A is the one that delivers that across the site. Recorded as the builder's call in line with his request.

## Decided how (builder's calls, stated to Tyler)

- **Scroll-driven 3D runs on GSAP ScrollTrigger + Lenis**, not Framer Motion. They are already installed, drive three.js directly, and scrub reliably. The home scene is pinned for about 300vh on desktop and 200vh on phones; scroll speed stays native (pinning, not hijacking).
- **Framer Motion runs the React UI islands**: the rebuilt services bento, trade cards, pricing cards, magnetic CTA, count-ups, and hover/tilt effects.
- **21st.dev** supplies the starting components for those blocks (bento grid, feature cards, pricing cards, animated buttons). Pick ones that fit a dark, cinematic look; restyle to tokens.
- **ui-ux-pro-max** is used to choose the premium style details (type scale, spacing, depth, shadow and glow system) inside the navy/orange palette, and to check UX rules on the result.
- **Page transitions** use Astro's built-in View Transitions (no library).
- **3D object heroes** share one small module (one renderer per page, lazy, paused off-screen) with three objects built from primitives. Pointer tilt on desktop, slow scroll rotation on all devices.
- **Phones** get a lighter render: lower pixel ratio, no shadows, fewer particles; 3D still starts on first touch or scroll, as today.

- **The home film is a continuous scrub**, not beat-snapping (Tyler asked for "cinematic 3D scrolling"). `night-scene.ts` gets a progress input (0 to 1) and a camera path including the final pull-back; `setBeat` stays for the buttons.
- **Existing hero controls:** the three beat buttons stay as accessible text and become "jump to this moment" (they scroll to that point in the pin). Autoplay is off while the pin is active. Drag-to-turn stays on desktop. The pause control stays and stops all scene motion.
- **CTA during the pin:** the headline, sub and "Get a free audit" stay on screen for the whole pinned section (copy column on desktop; on phones the sticky header's "Free audit" button covers it).
- **New tokens are scoped to the main site:** a new `src/styles/site-premium.css` imported only by `SiteLayout`. `tokens.css` and `base.css` stay untouched so `/lp/` cannot shift.
- **Lenis on desktop pointers only**, default settings; touch devices keep native scrolling.
- **Font:** stays Inter. A display face is only proposed to Tyler, never swapped in mid-build.
- **View Transitions** are kept only if Lenis, ScrollTrigger and the 3D renderers tear down cleanly and `site-flows.js` passes; otherwise they are dropped. Nice-to-have.

## Rule changes (to write into `landing/DESIGN-DIRECTION.md`, scoped to the main site; `/lp/` keeps the old rules)

- §1 Core aesthetic: "Not agency cool, owner-operator credible" becomes "Premium and cinematic, in owner language. The design shows craft; the words stay plain."
- §7 Global motion principles: allow parallax and scroll-scrubbed 3D, allow pinned scroll scenes with native scroll speed, Lenis smooth scroll site-wide, GSAP scrub allowed. Keep: content and CTA render first, reduced motion respected, no background video, 3D pauses when hidden.
- §7 Three.js budget: from "subtle glow, 20fps" to "full scenes allowed on main-site pages; 60fps target, mobile reduced quality."
- §2 Color: the table still lists the old blue/green palette; replace with the navy/orange tokens already in use.
- Add a decision log line dated 2026-11-18.

## Left to the builder

Exact camera paths and beat timing, which 21st.dev components, object modelling details, reveal choreography, how the trade and other pages map to the three objects, and test updates.

## Order of work

1. Rule changes and design tokens (depth, glow, type scale).
2. Home cinematic scroll scene.
3. 3D object heroes on service pages, then reused elsewhere.
4. Framer Motion + 21st.dev blocks site-wide.
5. Checks: flows, Lighthouse, reduced motion, no-WebGL, aos-verifier, impeccable finish review. Real iPhone/Android, Safari and Firefox remain Tyler's check.

Nothing is committed, pushed or deployed without Tyler asking.
