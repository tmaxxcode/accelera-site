/*
  The home film's script: maps scroll progress (0..1 through the pinned hero) to what the night scene shows.
  No imports on purpose, so `node --test` can run it without the three.js bundle.
*/

/* What each beat asks the scene to be. Values ease toward these, so beats can be interrupted. */
export const BEATS = [
  { dawn: 0, lit: 1, ring: 1, booked: 0, phone: 1, van: 0 },
  { dawn: 0, lit: 1, ring: 0, booked: 1, phone: 1, van: 0 },
  { dawn: 1, lit: 0.12, ring: 0, booked: 0, phone: 0, van: 1 },
] as const satisfies readonly Record<string, number>[];

export type State = { dawn: number; lit: number; ring: number; booked: number; phone: number; van: number };
export type FilmFrame = State & { pullBack: number };

/* Beat 0 runs to 0.3, beat 1 to 0.6, beat 2 to 0.85; the camera pulls back from 0.85 to 1. */
export const SEGMENTS = [0.3, 0.6, 0.85] as const;
const HOLD_AT = [0.1, 0.4, 0.7] as const;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export function beatAt(p: number): 0 | 1 | 2 {
  const q = clamp01(p);
  return q < SEGMENTS[0] ? 0 : q < SEGMENTS[1] ? 1 : 2;
}

export function progressForBeat(beat: number): number {
  return HOLD_AT[Math.min(2, Math.max(0, Math.round(beat)))];
}

export function filmFrame(p: number): FilmFrame {
  const q = clamp01(p);
  const pullBack = smooth(clamp01((q - SEGMENTS[2]) / (1 - SEGMENTS[2])));
  const b = beatAt(q);
  if (b === 2) return { ...BEATS[2], pullBack };
  // Hold the beat for the first two thirds of its segment, then ease into the next one.
  const start = b === 0 ? 0 : SEGMENTS[0];
  const end = SEGMENTS[b];
  const easeFrom = start + ((end - start) * 2) / 3;
  if (q <= easeFrom) return { ...BEATS[b], pullBack };
  const t = smooth((q - easeFrom) / (end - easeFrom));
  const from: State = BEATS[b];
  const to: State = BEATS[b + 1];
  const out = { pullBack } as FilmFrame;
  for (const k of Object.keys(from) as (keyof State)[]) out[k] = from[k] + (to[k] - from[k]) * t;
  return out;
}
