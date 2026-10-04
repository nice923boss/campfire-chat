// Hand-drawn marks (Rough Notation): cross out a wrong answer, highlight a key
// phrase. Falls back to a CSS class when the library is unavailable.

import { load } from '../vendor.js';
import { reducedMotion } from '../ui/dom.js';

export async function mark(el, type, options = {}) {
  const lib = await load('rough');
  if (!el.isConnected) return null;
  if (!lib?.annotate) {
    el.classList.add(`mark--${type}`);
    return null;
  }
  const annotation = lib.annotate(el, { type, animate: !reducedMotion(), ...options });
  annotation.show();
  return annotation;
}
