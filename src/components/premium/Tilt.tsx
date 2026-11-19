/*
  3D hover tilt for a card. Adapted from the 21st.dev "Tilt" component (ibelick, motion-primitives) for Accelera:
  capped at 8 degrees, mouse only, nothing under reduced motion. The card's markup comes from Astro as children,
  so links and prices are in the HTML with or without JavaScript. Perspective comes from the parent's CSS.
*/
import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

export default function Tilt({ children, className, rotationFactor = 6 }: { children?: ReactNode; className?: string; rotationFactor?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const xs = useSpring(x, spring);
  const ys = useSpring(y, spring);
  const f = Math.min(8, rotationFactor);
  const rotateX = useTransform(ys, [-0.5, 0.5], [f, -f]);
  const rotateY = useTransform(xs, [-0.5, 0.5], [-f, f]);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { rotateX, rotateY }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.div>
  );
}
