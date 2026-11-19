// Unit checks for the home film's scroll mapping. Run: npm run test:unit (Node 24 strips the types).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BEATS, beatAt, filmFrame, progressForBeat } from '../../src/scripts/film-timeline.ts';

test('holds each beat', () => {
  for (const b of [0, 1, 2]) assert.deepEqual(filmFrame(progressForBeat(b)), { ...BEATS[b], pullBack: 0 });
});

test('round trip', () => {
  for (const b of [0, 1, 2]) assert.equal(beatAt(progressForBeat(b)), b);
});

test('boundaries', () => {
  assert.equal(beatAt(0.29), 0);
  assert.equal(beatAt(0.3), 1);
  assert.equal(beatAt(0.6), 2);
  assert.equal(beatAt(1), 2);
});

test('pull back', () => {
  assert.equal(filmFrame(0.84).pullBack, 0);
  assert.equal(filmFrame(1).pullBack, 1);
});

test('clamps', () => {
  assert.deepEqual(filmFrame(-1), filmFrame(0));
  assert.deepEqual(filmFrame(2), filmFrame(1));
});

test('dawn never goes backwards', () => {
  let prev = filmFrame(0);
  for (let i = 1; i <= 100; i++) {
    const f = filmFrame(i / 100);
    assert.ok(f.dawn >= prev.dawn - 1e-9, `dawn went back at ${i / 100}`);
    assert.ok(f.van >= prev.van - 1e-9, `van went back at ${i / 100}`);
    prev = f;
  }
});
