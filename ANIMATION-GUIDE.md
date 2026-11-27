# Accelera website: motion and visual system

## Brand tokens

The shared tokens live in `src/styles/tokens.css`. They follow
`landing/brand-kit.json`: navy `#0A1929`, deep blue `#1A2A47`, orange `#FF6B00`,
orange text `#B84A00`, muted gray `#5B6270`, and card gray `#F7F8FA`.
Inter is used for both headings and body copy. Orange buttons use navy text to
keep their contrast accessible.

## Motion

| Moment | Technique | Timing | Purpose |
| --- | --- | --- | --- |
| Hero copy on first load | Framer Motion opacity and 14px horizontal offset | 480ms, strong ease-out | Establishes the opening message without delaying access to the page |
| Layered product artwork | React Three Fiber with Drei `Float` | Slow, low-amplitude; disabled for reduced motion | Gives the existing Accelera renders depth without adding stock imagery |
| Hero scene as it leaves view | GSAP ScrollTrigger rotates one scene group by 0.16 radians | Scrubbed to natural scroll; no pinning | Gives the hero artwork a restrained sense of depth |
| Hero buttons | CSS color and 2px lift; active press feedback | 130–190ms | Confirms hover and press without moving content in the page |

No entrance reveals run on scroll. The hero does not pin sections or move the
camera. `prefers-reduced-motion` disables the hero transform, 3D float, and
scroll-driven scene rotation. The scene uses one WebGL canvas, hydrated when
the browser is idle and paused when out of view. The HTML fallback artwork
remains available until the canvas is ready.

## Scene and asset notes

`src/components/site/ImmersiveScene.tsx` contains one transparent React Three Fiber
canvas. Its scene graph uses the existing `/hero/night-call.webp`,
`/hero/object-phone.webp`, `/hero/object-calendar.webp`, and
`/hero/object-browser.webp` artwork as textured planes, plus two lightweight
torus accents and three lights. The repository has no GLB/GLTF model or
photography, so the page uses the existing branded renders and does not invent
photographs, clients, or testimonials.

The artwork is already rasterized WebP and there is no source GLB to Draco
compress or texture pipeline to document. Keep new 3D assets under 5 MB and
prefer a compressed GLB if an original model becomes available.

## Verification

Run `npm run build` and `npm run test:unit` from the repository root. The
production homepage layout has been checked at 1440, 1024, 768, and 390 CSS
pixels; test reduced motion in browser emulation before changing the scene.
