/*
  A button that leans a few pixels toward the mouse. Adapted from the 21st.dev "Magnetic" component
  (ibelick, motion-primitives): mouse only, at most about 5 px, nothing under reduced motion.
*/
import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

const RANGE = 80;
const INTENSITY = 0.25;

export default function Magnetic({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 180, damping: 14, mass: 0.3 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const scale = Math.max(0, 1 - Math.hypot(dx, dy) / RANGE);
    x.set(dx * INTENSITY * scale);
    y.set(dy * INTENSITY * scale);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} className="magnetic" style={reduce ? undefined : { x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.div>
  );
}
