# Cinematic 3D Site Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the main Accelera site into a cinematic, scroll-driven 3D site (pinned home film, 3D object heroes, premium motion blocks) without touching `/lp/`.

**Architecture:** The existing vanilla three.js night scene gains a scroll-progress input, driven by a GSAP ScrollTrigger pin. A pure `film-timeline.ts` module maps scroll progress to scene state and is unit-tested with `node --test`. A second small three.js module renders one object per page hero. Framer Motion (`motion`) powers a few React islands built from 21st.dev starting components. New styles live in a main-site-only stylesheet.

**Tech Stack:** Astro 7 (static), Tailwind 3, three 0.187, gsap 3.15 (ScrollTrigger), @studio-freight/lenis 1.0.42, React 18 islands via @astrojs/react, `motion` (new), Node 24 (`node --test` runs `.ts` directly).

**Spec:** `docs/superpowers/specs/2026-11-18-cinematic-3d-design.md`

## Global Constraints

- `/lp/*` pages, `LandingLayout.astro`, `src/styles/tokens.css` and `src/styles/base.css` are not modified. `tests/lp-flows.js` must pass unchanged, apart from the one check added in Task 1.
- No copy, price, claim or stat changes. All `data-pending` placeholders and the `PUBLIC_RELEASE` guard in `src/config/offer.ts` stay as they are.
- Palette: navy `#1A2A47`, orange `#FF6B00` (from `tokens.css`). Font stays Inter.
- Lighthouse 12.8.2 mobile, local preview: accessibility 100 and SEO 100 on every page. Performance: home ≥ 80, every other main-site page ≥ 90. LCP is the headline text, < 2.5 s mobile everywhere. On a non-home page that can't hold 90, phones get the still picture instead of 3D.
- Every 3D module is dynamic-imported after first paint. `prefers-reduced-motion: reduce` or no WebGL → still picture, no pin, no scrub, no smooth scroll.
- Pinning only; scroll speed stays native. Lenis runs on fine pointers only (`(pointer: fine)`), default options.
- Keep the "Example night, not a real customer" label visible.
- New dependency allowed: `motion` only.
- The repo has unrelated uncommitted edits (`README.md`, `docs/MASTER.md`, `docs/PLAN.md`, `docs/RULES.md`, untracked docs). Each commit stages only the task's own files by path. Never push or deploy.
- Site checks run through the Playwright MCP (`browser_run_code_unsafe`) with `tests/site-flows.js` / `tests/lp-flows.js` against `npm run build && npx astro preview --port 4321 --host 127.0.0.1`. Pass means `fails: []`.

## Review Focus

1. Phone rotates or the window resizes mid-pin → the pin recomputes, no blank gap, no horizontal overflow, beat still matches position. (Task 4 test `resize mid-pin`)
2. Page loaded or reloaded already scrolled into the pin → the scene shows the beat for that position, not beat 0. (Task 4 test `reload mid-pin`)
3. Keyboard user tabs to a beat button and presses Enter → page scrolls to that moment and `data-beat` follows. (Task 4 test `keyboard beat`)
4. No WebGL → still picture, no pin spacer, buttons still switch the story. (Task 4 test `no webgl`)
5. Header CTA and `/#audit` deep link still land on the form with the pin and Lenis active. (Task 4 test `audit deep link`; the existing header-CTA check covers the click)

---

### Task 1: Rule changes and premium tokens (main site only)

**Files:**
- Modify: `landing/DESIGN-DIRECTION.md` (§1 Core aesthetic, §2 Color table, §7 Global motion principles and Three.js budget, decision log)
- Create: `src/styles/site-premium.css`
- Modify: `src/layouts/SiteLayout.astro:6-7` (import the new sheet after `base.css`)
- Test: `tests/site-flows.js`, `tests/lp-flows.js`

**Interfaces:**
- Produces CSS custom properties on `:root`, used by later tasks: `--premium: 1`, `--depth-1`, `--depth-2`, `--depth-3` (box-shadows), `--glow-cta` (orange glow shadow), `--surface-glass` (translucent navy background), `--ease-cinema` (cubic-bezier), `--dur-reveal` (ms).

- [ ] **Step 1:** Add to `tests/site-flows.js`, inside the `w === 1440` block: `ok((await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--premium').trim())) === '1', \`${tag}: premium tokens missing\`)`. Add to `tests/lp-flows.js`, once per page: the same expression must equal `''` (message `premium tokens leaked into /lp/`).
- [ ] **Step 2:** Run both checks. Expected: site-flows fails with `premium tokens missing` on every page; lp-flows passes.
- [ ] **Step 3:** Run `ui-ux-pro-max` for "premium dark cinematic service business, navy #1A2A47 + orange #FF6B00, Inter" and set the token values from its depth, glow, spacing and easing advice. Write `site-premium.css` with those tokens and import it in `SiteLayout.astro`.
- [ ] **Step 4:** Rewrite the four `DESIGN-DIRECTION.md` sections exactly as listed under "Rule changes" in the spec, each marked "main site; `/lp/` keeps the previous rule". Add the decision log line `2026-11-18: Tyler approved the cinematic 3D direction for the main site (spec docs/superpowers/specs/2026-11-18-cinematic-3d-design.md).`
- [ ] **Step 5:** Build and run both flows. Expected: both `fails: []`.
- [ ] **Step 6:** Commit `landing/DESIGN-DIRECTION.md src/styles/site-premium.css src/layouts/SiteLayout.astro tests/site-flows.js tests/lp-flows.js` with the message `Cinematic direction: rules and main-site premium tokens`.

### Task 2: Film timeline (pure scroll→scene mapping)

**Files:**
- Create: `src/scripts/film-timeline.ts`
- Modify: `src/scripts/night-scene.ts:63-68` (move `BEATS` and `State` out, import them back)
- Create: `tests/unit/film-timeline.test.ts`
- Modify: `package.json` scripts: `"test:unit": "node --test tests/unit/*.test.ts"`

**Interfaces:**
- Produces:
  - `export type State = { dawn: number; lit: number; ring: number; booked: number; phone: number; van: number }`
  - `export const BEATS: readonly State[]` (the existing three values, moved verbatim)
  - `export const SEGMENTS = [0.3, 0.6, 0.85] as const`: beat 0 holds before 0.3, beat 1 before 0.6, beat 2 before 0.85, and the pull-back runs from 0.85 to 1
  - `export type FilmFrame = State & { pullBack: number }`
  - `export function filmFrame(p: number): FilmFrame`: clamps `p` to 0..1. Beats 0 and 1 hold steady for the first two thirds of their segment, then ease (smoothstep) into the next beat over the last third. Beat 2 holds from its hold point to 1. `pullBack` eases 0→1 across 0.85..1.
  - `export function beatAt(p: number): 0 | 1 | 2`
  - `export function progressForBeat(beat: number): number`: returns `[0.1, 0.4, 0.7][clamp(beat)]`
- No imports in this file (so Node can run it without the three.js bundle).

- [ ] **Step 1: Write the failing tests** in `tests/unit/film-timeline.test.ts` (`node:test`, `node:assert/strict`, import from `../../src/scripts/film-timeline.ts`):
  - `holds each beat`: for b in 0..2, `filmFrame(progressForBeat(b))` deep-equals `{ ...BEATS[b], pullBack: 0 }`.
  - `round trip`: for b in 0..2, `beatAt(progressForBeat(b)) === b`.
  - `boundaries`: `beatAt(0.29) === 0`, `beatAt(0.3) === 1`, `beatAt(0.6) === 2`, `beatAt(1) === 2`.
  - `pull back`: `filmFrame(0.84).pullBack === 0`, `filmFrame(1).pullBack === 1`.
  - `clamps`: `filmFrame(-1)` deep-equals `filmFrame(0)` and `filmFrame(2)` deep-equals `filmFrame(1)`.
  - `dawn never goes backwards`: over p = 0, 0.01 … 1, `dawn` and `van` are non-decreasing.
- [ ] **Step 2:** `npm run test:unit`. Expected: FAIL, module not found.
- [ ] **Step 3:** Implement `film-timeline.ts`, then switch `night-scene.ts` to `import { BEATS, type State } from './film-timeline'`.
- [ ] **Step 4:** `npm run test:unit` → all pass. `npm run build` → passes.
- [ ] **Step 5:** Commit the four files with the message `Film timeline: scroll progress to scene state`.

### Task 3: Scroll progress in the night scene

**Files:**
- Modify: `src/scripts/night-scene.ts` (`NightScene` interface at :41-45, the camera block at :437-449, and the returned object at ~:605)

**Interfaces:**
- Consumes: `filmFrame`, `FilmFrame` (Task 2).
- Produces: `NightScene.setProgress(p: number): void`. Sets `goal = filmFrame(p)` (the existing per-frame smoothing still applies). Stores `pullBack`, which the camera block applies as `dist * (1 + 0.6 * pullBack)` and elevation `+ 0.15 * pullBack` rad. `setBeat` keeps working unchanged. Calling `setProgress` stops nothing else (drag and sway still work). Phones (below 768 px) get the lighter render the spec asks for: shadows off and half the snow particles.

- [ ] **Step 1:** Add the method and the camera pull-back.
- [ ] **Step 2:** `npm run build` passes. `npm run test:unit` passes.
- [ ] **Step 3:** Temporary check in the browser console on `/`, after the scene mounts: `setProgress(1)` shows the morning with the camera further out. Remove the temporary hook before committing.
- [ ] **Step 4:** Commit `src/scripts/night-scene.ts` with the message `Night scene: scroll progress input and camera pull-back`.

(No separate automated test: Task 4's flow checks drive this method end to end.)

### Task 4: Pinned home film and desktop smooth scroll

**Files:**
- Create: `src/scripts/smooth-scroll.ts`
- Modify: `src/layouts/SiteLayout.astro:167` (start smooth scroll in the existing page script)
- Modify: `src/components/site/SceneHero.astro` (the `<script>` from :87 on, plus styles for the pinned layout)
- Test: `tests/site-flows.js` (replace the "Home hero" block at the end)

**Interfaces:**
- Consumes: `NightScene.setProgress` (Task 3), `beatAt`, `progressForBeat` (Task 2).
- Produces: `export function startSmoothScroll(): void` in `smooth-scroll.ts`. It registers `ScrollTrigger` with `gsap`. Only when `(pointer: fine)` and not reduced motion, it starts Lenis, feeds `lenis.on('scroll', ScrollTrigger.update)`, drives Lenis from `gsap.ticker`, and makes in-page `a[href^="#"]` clicks use `lenis.scrollTo` with an offset of the header height (64). Also produces the DOM contract: `[data-night-hero]` carries `data-pinned="true"` while the pin is active, and SceneHero sets `window.__heroPin = { start, end }` (scroll px, refreshed on ScrollTrigger refresh) for the checks.
- SceneHero behaviour: when not reduced motion and WebGL is available, create a ScrollTrigger on `[data-night-hero]` with `pin: true`, `start: 'top top'`, `end: '+=300%'` at ≥768px and `'+=200%'` below, `scrub: true`, and `invalidateOnRefresh: true`. `onUpdate(self)` → `scene?.setProgress(self.progress)`; `root.dataset.beat = String(beatAt(self.progress))`; update `aria-pressed`. Beat buttons scroll to `st.start + progressForBeat(i) * (st.end - st.start)`. Autoplay is off while pinned. The headline, sub and CTA sit inside the pinned element and stay on screen. The pin is created up front (before the scene loads on phones), so scrolling works while the scene catches up. No pin under reduced motion or without WebGL; the buttons then call `setBeat` as today.

- [ ] **Step 1: Write the failing checks** at the end of `tests/site-flows.js` (1440×900 unless noted). Helper: `pinRange()` reads `ScrollTrigger` start/end from `window.__heroPin` (exposed by SceneHero as `{ start, end }`).
  - `pinned`: `[data-night-hero][data-pinned="true"]` exists.
  - `scrub`: scroll to `start + 0.45 * (end - start)` and wait 300 ms → `data-beat === '1'`, and the hero CTA (`[data-night-hero] a[href="#audit"]`) is inside the viewport.
  - `keyboard beat`: focus `[data-beat-btn="2"]`, press Enter, wait for settle → `data-beat === '2'` and `aria-pressed === 'true'`.
  - `reload mid-pin`: scroll to `start + 0.7 * (end - start)`, `page.reload()`, wait for `networkidle` + 500 ms → `data-beat === '2'`.
  - `resize mid-pin`: at 0.45, `setViewportSize({ width: 390, height: 844 })`, wait 500 ms → no horizontal overflow, `data-beat` is `'1'`, and `.site-header__cta` is visible.
  - `no webgl`: new page with `addInitScript` making `HTMLCanvasElement.prototype.getContext` return `null` for `webgl`/`webgl2` → no `.pin-spacer`, the still `img` is visible, and clicking `[data-beat-btn="1"]` sets `data-beat === '1'`.
  - `reduced motion`: `page.emulateMedia({ reducedMotion: 'reduce' })` → no `.pin-spacer`, and the button sets the beat.
  - `audit deep link`: `goto('/#audit')` → `#audit` top within 8 px of 64.
  - Keep: three beat buttons, still picture served, canvas `aria-hidden="true"`.
- [ ] **Step 2:** Build and run site-flows. Expected: the new checks fail (`pinned`, `scrub`, `reload mid-pin` at least).
- [ ] **Step 3:** Implement `smooth-scroll.ts`, call it from `SiteLayout.astro`, then rework the SceneHero script and layout as described above.
- [ ] **Step 4:** Build. Run site-flows and lp-flows → both `fails: []`.
- [ ] **Step 5:** Commit `src/scripts/smooth-scroll.ts src/layouts/SiteLayout.astro src/components/site/SceneHero.astro tests/site-flows.js` with the message `Home: pinned scroll film, desktop smooth scroll`.

### Task 5: 3D object heroes

**Files:**
- Create: `src/scripts/object-scene.ts`
- Modify: `src/components/site/PageHero.astro` (new prop, canvas, still, loader script)
- Modify: the page files that pass `object` (see map)
- Create: `public/hero/object-phone.webp`, `public/hero/object-calendar.webp`, `public/hero/object-browser.webp` (stills, captured from the rendered canvas at 1440 wide, ≤ 60 KB each)
- Test: `tests/site-flows.js`

**Interfaces:**
- Produces:
  - `export type ObjectKind = 'phone' | 'calendar' | 'browser'`
  - `export interface ObjectScene { setPaused(paused: boolean): void; dispose(): void }`
  - `export async function mountObjectScene(opts: { canvas: HTMLCanvasElement; kind: ObjectKind; reduceMotion: boolean }): Promise<ObjectScene | null>`. Returns `null` without WebGL. Built from primitives in the night scene's materials and colours. Pointer tilt on `(pointer: fine)`, slow rotation tied to scroll position, paused off-screen (IntersectionObserver) and on `visibilitychange`. Pixel ratio ≤ 1.5 below 768 px, and no shadows there.
  - `PageHero` prop `object?: ObjectKind`. Renders `<div data-object-hero={kind}>` with the still `<img>` (with `alt=""`, since it's decorative) and an `aria-hidden="true"` canvas. Its script dynamic-imports `object-scene.ts`: at ≥768 px when visible; below 768 px on first touch, scroll or keydown (same pattern as SceneHero). The existing slot visuals (CallCard, BookingCard, SiteCard) stay visible, layered in front of the object.
- Page map: after-hours, plumbers, roofers, about → `phone`; online-booking, auto-repair, how-it-works → `calendar`; website-design, contractors, pricing → `browser`. faq, contact, privacy, the missed-call calculator and 404 get no object.

- [ ] **Step 1: Write the failing checks** in `tests/site-flows.js`:
  - For each mapped path at 1440: `[data-object-hero="<kind>"]` exists, its canvas has `aria-hidden="true"`, and within 3 s the canvas has non-zero size and the still is hidden.
  - At 390, before any input: canvas not initialised (`data-object-ready` absent) and the still is visible.
  - Under `reducedMotion: 'reduce'`: no `data-object-ready`, and the still is visible.
  - Unmapped paths: no `[data-object-hero]`.
- [ ] **Step 2:** Build and run → the new checks fail.
- [ ] **Step 3:** Implement `object-scene.ts`, the `PageHero` prop and script, add `object=` to the mapped pages, and capture the three stills.
- [ ] **Step 4:** Build. Run site-flows → `fails: []`. Lighthouse mobile on `/after-hours-answering-service-minnesota/`, `/online-booking-minnesota/` and `/website-design-minnesota/` → performance ≥ 90. If any page is under 90, set that page's phones to still-only and recheck.
- [ ] **Step 5:** Commit the module, PageHero, the page files, the stills and the test file with the message `3D object heroes on service, trade and info pages`.

### Task 6: Premium blocks (Framer Motion + 21st.dev)

**Files:**
- `npm install motion`
- Create: `src/components/premium/ServiceBento.tsx` (replaces `<LinkCards>` in the home `#services` section)
- Create: `src/components/premium/TradeCards.tsx` (replaces `<TradeRows>` in the home `#trades` section)
- Create: `src/components/premium/PricingCards.tsx` (replaces the price card block in `src/pages/pricing.astro`)
- Create: `src/components/premium/MagneticLink.tsx` (wraps the home hero CTA and the home final CTA)
- Create: `src/scripts/reveals.ts`
- Modify: `src/pages/index.astro`, `src/pages/pricing.astro`, `src/layouts/SiteLayout.astro` (start reveals)
- Test: `tests/site-flows.js`

**Interfaces:**
- Each `.tsx` takes the same data the Astro component it replaces already receives (for example, `ServiceBento` gets `items` from `pages.filter(p => p.group === 'service')`, and `TradeCards` gets the `trades` array built in `index.astro`). Each is rendered with `client:visible`. The server-rendered HTML must already contain every link, label, price and `data-pending` marker, so it works without JS and SEO is unchanged.
- Start from 21st.dev components (search the 21st.dev registry for bento grid, 3D tilt card, pricing cards and magnetic button). Copy the source in and restyle it with Tailwind `accelera-*` colours and the Task 1 tokens. No shadcn theme files.
- Motion: `whileInView` fade/rise, hover tilt ≤ 8°, magnetic pull ≤ 8 px. Everything is off under `useReducedMotion()`. Tap targets stay ≥ 44 px.
- `export function startReveals(): void` in `reveals.ts`: GSAP ScrollTrigger fade/rise on `main > section:not(:first-child)` and `[data-reveal]`. The hidden start state is applied by JS only, and only to elements below the first viewport. Skipped under reduced motion.

- [ ] **Step 1: Write the failing checks** in `tests/site-flows.js`:
  - Home: `[data-premium="bento"] a` hrefs equal the three service paths; `[data-premium="trades"] a` hrefs equal the four trade paths, with the 99 Calls source links intact.
  - Pricing: `[data-premium="pricing"]` exists, and every price element sits inside `[data-pending]` (same rule as today).
  - JS disabled (new context, `javaScriptEnabled: false`) on `/` and `/pricing/`: all of the above links and prices are present and visible.
  - Reduced motion on `/`: no element under `[data-premium]` has a computed `transform` other than `none` after hover.
- [ ] **Step 2:** Build and run → fail (`data-premium` missing).
- [ ] **Step 3:** Install `motion`, build the four components and `reveals.ts`, and wire them in.
- [ ] **Step 4:** Build. Run site-flows and lp-flows → `fails: []`.
- [ ] **Step 5:** Commit `package.json package-lock.json src/components/premium src/scripts/reveals.ts src/pages/index.astro src/pages/pricing.astro src/layouts/SiteLayout.astro tests/site-flows.js` with the message `Premium blocks: bento, trade cards, pricing, magnetic CTA, reveals`.

### Task 7: Page transitions (keep only if clean)

**Files:**
- Modify: `src/layouts/SiteLayout.astro` (add `<ClientRouter />` from `astro:transitions`)
- Modify: `smooth-scroll.ts`, `SceneHero.astro`, `PageHero.astro`, `reveals.ts` (re-init on `astro:page-load`, tear down on `astro:before-swap`)

- [ ] **Step 1:** Add the router and the lifecycle hooks.
- [ ] **Step 2:** Build. Run site-flows. Also click home → pricing → back → home and confirm no console errors, the pin works again, and the canvas count is 1.
- [ ] **Step 3:** If all pass, commit with the message `Page transitions`. If anything fails after one fix attempt, revert this task's changes (`git checkout -- <files>`) and note "dropped: View Transitions" in the final report. The spec allows dropping them.

### Task 8: Final checks and records

- [ ] **Step 1:** `npm run test:unit`, a build, site-flows and lp-flows → all pass.
- [ ] **Step 2:** Lighthouse 12.8.2 mobile and desktop on every main-site page and `/lp/trades` → meets the Global Constraints budget. `/lp/trades` scores equal the 2026-11-16 report. Save to `docs/reports/lighthouse-2026-11-18.md`.
- [ ] **Step 3:** Run the `ui-ux-pro-max` UX check and the `impeccable` finish review on `/`, `/pricing/` and `/after-hours-answering-service-minnesota/`. Fix or list the findings.
- [ ] **Step 4:** Run aos-verifier on the whole change against the spec. Fix its defects and rerun.
- [ ] **Step 5:** Add the result to the B/C Website row and the sync log in `docs/MASTER.md`: what changed, the scores, "not tested on a real iPhone/Android, Safari or Firefox", and "local only, not deployed". Commit only the lines you added. MASTER.md already has unrelated uncommitted edits, so stage them with `git add -p docs/MASTER.md docs/reports/lighthouse-2026-11-18.md`.
