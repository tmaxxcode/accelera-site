/*
  Section entrances on the main site (cinematic upgrade): sections below the first screen rise and fade in
  once as they scroll into view. Anything already on screen is never hidden, so the first paint and LCP are
  untouched; without JavaScript or under reduced motion every section simply shows.
*/
import { gsap } from './smooth-scroll';

export function startReveals(): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll<HTMLElement>('main > section:not(:first-child), [data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight) return;
    gsap.from(el, {
      opacity: 0,
      y: 32,
      duration: 0.5,
      ease: 'expo.out',
      clearProps: 'opacity,transform',
      // After the hero pin on refresh, so the pin's extra height is counted.
      scrollTrigger: { trigger: el, start: 'top 88%', once: true, refreshPriority: -1 },
    });
  });
}
