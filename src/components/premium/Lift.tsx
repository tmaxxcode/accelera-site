/*
  Hover lift for a linked card (cinematic upgrade, refined 2026-11-19): the card rises 2px toward the mouse on a
  soft spring, per the taste skill's hover rule (lift, never tilt). Built with motion (Framer Motion); nothing
  under reduced motion. The card's markup comes from Astro as children, so links and prices are in the HTML with
  or without JavaScript. Keyboard focus gets the same raised look from CSS (:focus-within).
*/
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export default function Lift({ children, className }: { children?: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} whileHover={reduce ? undefined : { y: -2 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }}>
      {children}
    </motion.div>
  );
}
