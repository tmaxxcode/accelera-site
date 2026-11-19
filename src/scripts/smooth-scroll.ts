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
  // itself: a reload or back/forward returns to the same spot; a deep link (/#audit) lands under the header.
  history.scrollRestoration = 'manual';
  const key = `scroll:${location.pathname}`;
  addEventListener('pagehide', () => sessionStorage.setItem(key, String(Math.round(window.scrollY))));
  const land = () => {
    ScrollTrigger.refresh();
    const el = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const saved = Number(sessionStorage.getItem(key));
    const y = nav && nav.type !== 'navigate' && saved ? saved : el ? targetY(el) : null;
    if (y === null) return;
    window.scrollTo(0, y);
    lenis?.scrollTo(y, { immediate: true });
  };
  // Same-page hash changes (typed URL, back to #section) land under the header too, not under a reveal offset.
  addEventListener('hashchange', () => {
    const el = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!el) return;
    window.scrollTo(0, targetY(el));
    lenis?.scrollTo(targetY(el), { immediate: true });
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
    lenis!.scrollTo(targetY(el));
    history.pushState(null, '', `#${id}`);
    if (!el.hasAttribute('tabindex') && !el.matches('a, button, input, select, textarea, summary')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });
}
