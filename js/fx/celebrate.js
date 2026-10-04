// Ember-colored confetti for good endings (canvas-confetti). Silent no-op
// when the library is unavailable or the player prefers reduced motion.

import { load } from '../vendor.js';
import { reducedMotion } from '../ui/dom.js';

const COLORS = ['#ff8a3d', '#ffc566', '#ffe3a8', '#ff5e3a', '#fff4e0'];

export async function celebrate(stars = 3) {
  if (reducedMotion()) return;
  const confetti = await load('confetti');
  if (!confetti) return;
  const base = { colors: COLORS, disableForReducedMotion: true, zIndex: 60 };
  confetti({ ...base, particleCount: 50 + stars * 30, spread: 70, startVelocity: 42, origin: { y: 0.7 } });
  if (stars === 3) {
    setTimeout(() => confetti({ ...base, particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.75 } }), 250);
    setTimeout(() => confetti({ ...base, particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.75 } }), 400);
  }
}

// Rising sparks from the bottom, used on the final level.
export async function sparks(seconds = 3) {
  if (reducedMotion()) return;
  const confetti = await load('confetti');
  if (!confetti) return;
  const end = Date.now() + seconds * 1000;
  (function burst() {
    confetti({
      particleCount: 4, startVelocity: 26, spread: 50, angle: 90, gravity: 0.4, ticks: 260,
      origin: { x: Math.random(), y: 1 }, colors: COLORS, shapes: ['circle'], scalar: 0.7, zIndex: 60,
    });
    if (Date.now() < end) requestAnimationFrame(burst);
  })();
}
