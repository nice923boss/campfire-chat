// Procedural UI sounds with ZzFX (no audio files to host).
// ZzFX creates its AudioContext at import time, so it is imported lazily on
// the first user gesture and resumed then.

import { load } from '../vendor.js';

// ZzFX parameter lists: [volume, randomness, frequency, attack, sustain,
// release, shape, shapeCurve, slide, deltaSlide, pitchJump, pitchJumpTime,
// repeatTime, noise, modulation, bitCrush, delay, sustainVolume, decay, tremolo]
const SOUNDS = {
  tap:     [0.35, 0, 880, 0, 0.01, 0.04, 1, 1.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6],
  advance: [0.25, 0, 620, 0, 0.01, 0.05, 0, 1.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5],
  select:  [0.4, 0, 520, 0.01, 0.03, 0.08, 1, 1.4, 0, 0, 210, 0.04],
  correct: [0.55, 0, 660, 0.01, 0.08, 0.22, 1, 1.5, 0, 0, 330, 0.07, 0, 0, 0, 0, 0, 0.7],
  wrong:   [0.6, 0, 180, 0.02, 0.12, 0.3, 2, 2.2, -6, 0, 0, 0, 0, 0.3, 0, 0.1],
  bad:     [0.7, 0, 140, 0.04, 0.3, 0.6, 3, 2, -2, 0, -40, 0.18, 0, 0.6, 0, 0.05],
  star:    [0.45, 0, 1240, 0, 0.04, 0.2, 1, 1.8, 0, 0, 620, 0.05, 0, 0, 0, 0, 0.06, 0.5],
  clear:   [0.6, 0, 523, 0.02, 0.25, 0.5, 1, 1.3, 0, 0, 262, 0.12, 0.1, 0, 0, 0, 0.12, 0.8],
  unlock:  [0.5, 0, 392, 0.01, 0.1, 0.3, 1, 1.5, 0, 0, 392, 0.08, 0, 0, 0, 0, 0.05],
  page:    [0.2, 0.05, 300, 0.01, 0.02, 0.06, 4, 0, 0, 0, 0, 0, 0, 2.5, 0, 0, 0, 0.3],
};

let enabled = true;
let mod = null;
let loading = null;

export function setEnabled(on) {
  enabled = Boolean(on);
}

// Call from a click/keydown handler: loads ZzFX and resumes its AudioContext.
export function unlock() {
  if (!enabled) return Promise.resolve(null);
  if (!loading) {
    loading = load('zzfx').then((m) => {
      mod = m;
      return m;
    });
  }
  return loading.then((m) => {
    const ctx = m?.ZZFX?.audioContext;
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
    return m;
  });
}

export function play(name) {
  if (!enabled || !mod) return;
  const params = SOUNDS[name];
  if (!params) return;
  try {
    mod.zzfx(...params);
  } catch {
    // Audio is decoration; ignore device errors.
  }
}

export const SOUND_NAMES = Object.freeze(Object.keys(SOUNDS));
