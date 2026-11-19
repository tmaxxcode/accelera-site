/*
  Main-site scrolling (cinematic upgrade, 2026-11-18). Registers GSAP ScrollTrigger for the pinned home
  film and runs Lenis smooth scrolling on mouse/trackpad only. Touch devices and reduced motion keep
  native scrolling, so the page never feels trapped. /lp/ pages never load this.
*/
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

let lenis: Lenis | null = null;
const navH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;

/* Scrolls to a page position, through Lenis when it is running. */
export function scrollToY(y: number): void {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
}

// Layout position (offsetTop), so an element mid-reveal (still shifted by its entrance transform) is not missed.
const targetY = (el: HTMLElement) => {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
  return y - navH();
};

export function startSmoothScroll(): void {
  // The pinned film adds page height after the browser would restore the scroll, so the site restores it
  // itself, per history entry: a reload or back/forward returns to that entry's spot; a deep link (/#audit)
  // lands under the header. ScrollTrigger keeps its own copy of this setting and writes it back on every
  // refresh, so it is set through ScrollTrigger.
  ScrollTrigger.clearScrollMemory('manual');
  const save = () => {
    try {
      history.replaceState({ ...(history.state ?? {}), scrollY: Math.round(window.scrollY) }, '');
    } catch {
      /* Safari rate-limits replaceState; the next save catches up. */
    }
  };
  let saveTimer = 0;
  addEventListener('scroll', () => {
    clearTimeout(saveTimer);
    saveTimer = window.setTimeout(save, 150);
  }, { passive: true });
  addEventListener('pagehide', save);
  const jump = (y: number) => {
    window.scrollTo(0, y);
    lenis?.scrollTo(y, { immediate: true });
  };
  const hashTarget = () => (location.hash.length > 1 ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null);
  const savedY = (): number | null => (typeof history.state?.scrollY === 'number' ? history.state.scrollY : null);
  const land = () => {
    ScrollTrigger.refresh();
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const el = hashTarget();
    const restored = nav && nav.type !== 'navigate' ? savedY() : null;
    const y = restored ?? (el ? targetY(el) : null);
    if (y !== null) jump(y);
  };
  // Back/forward between entries of this page (after an in-page jump) returns to each entry's spot.
  addEventListener('popstate', () => {
    const y = savedY();
    if (y !== null) jump(y);
  });
  // A new same-page hash (typed URL) lands under the header, not under a section's reveal offset.
  addEventListener('hashchange', () => {
    if (savedY() !== null) return; // popstate already restored this entry
    const el = hashTarget();
    if (el) jump(targetY(el));
  });
  if (document.readyState === 'complete') requestAnimationFrame(land);
  else addEventListener('load', () => requestAnimationFrame(land), { once: true });

  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Same-page links glide through Lenis; the URL and keyboard focus still move like a normal jump.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest?.('a[href^="#"]');
    const id = a?.getAttribute('href')?.slice(1);
    const el = id && document.getElementById(id);
    if (!el || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    save(); // this entry keeps the spot the visitor jumped from, for Back
    lenis!.scrollTo(targetY(el));
    history.pushState(null, '', `#${id}`);
    if (!el.hasAttribute('tabindex') && !el.matches('a, button, input, select, textarea, summary')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });
}
