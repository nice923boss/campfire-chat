// Animation helpers. GSAP (+ SplitText) when available, otherwise the native
// Web Animations API, otherwise nothing. Callers never need to know which.

import { load, peek } from '../vendor.js';
import { reducedMotion } from '../ui/dom.js';

export function init() {
  return load('splitText').then((SplitText) => {
    const gsap = peek('gsap');
    if (gsap && SplitText) gsap.registerPlugin(SplitText);
  });
}

const gsap = () => (reducedMotion() ? null : peek('gsap'));

function waapi(el, frames, opts) {
  if (reducedMotion() || !el?.animate) return Promise.resolve();
  return el.animate(frames, { fill: 'both', easing: 'cubic-bezier(.2,.8,.2,1)', ...opts }).finished.catch(() => {});
}

export function screenIn(el) {
  const g = gsap();
  if (g) return g.fromTo(el, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'transform' });
  return waapi(el, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 400 });
}

export function stagger(els, { y = 18, delay = 0, each = 0.06 } = {}) {
  const list = [...els];
  if (!list.length) return Promise.resolve();
  const g = gsap();
  if (g) return g.fromTo(list, { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, duration: 0.42, delay, stagger: each, ease: 'back.out(1.6)', clearProps: 'transform' });
  return Promise.all(list.map((el, i) => waapi(el,
    [{ opacity: 0, transform: `translateY(${y}px)` }, { opacity: 1, transform: 'none' }],
    { duration: 380, delay: (delay + i * each) * 1000 })));
}

export function spriteIn(el, fromX = 0) {
  const g = gsap();
  if (g) return g.fromTo(el, { autoAlpha: 0, x: fromX, y: 30 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
  return waapi(el, [{ opacity: 0, transform: `translate(${fromX}px, 30px)` }, { opacity: 1, transform: 'none' }], { duration: 550 });
}

// Small bounce when a character starts talking or changes expression.
export function bob(el) {
  const g = gsap();
  if (g) return g.fromTo(el, { y: 0 }, { y: -10, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.out' });
  return waapi(el, [{ transform: 'none' }, { transform: 'translateY(-10px)' }, { transform: 'none' }], { duration: 280, fill: 'none' });
}

export function shake(el) {
  const g = gsap();
  if (g) return g.fromTo(el, { x: 0 }, { x: 10, duration: 0.06, yoyo: true, repeat: 5, ease: 'sine.inOut', clearProps: 'transform' });
  return waapi(el, [0, 10, -10, 8, -6, 0].map((x) => ({ transform: `translateX(${x}px)` })), { duration: 380, fill: 'none' });
}

export function pop(el, delay = 0) {
  const g = gsap();
  if (g) return g.fromTo(el, { scale: 0.4, autoAlpha: 0, rotate: -12 }, { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.5, delay, ease: 'back.out(2.4)' });
  return waapi(el, [{ opacity: 0, transform: 'scale(.4) rotate(-12deg)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay: delay * 1000 });
}

// Ending card: slam in (bad) or rise in (good).
export function cardIn(el, tone) {
  const g = gsap();
  if (g) {
    return tone === 'bad'
      ? g.fromTo(el, { autoAlpha: 0, scale: 1.25, rotate: -3 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.45, ease: 'power4.out' })
      : g.fromTo(el, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' });
  }
  return tone === 'bad'
    ? waapi(el, [{ opacity: 0, transform: 'scale(1.25) rotate(-3deg)' }, { opacity: 1, transform: 'none' }], { duration: 420 })
    : waapi(el, [{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: 600 });
}

// Title letters float up one by one (SplitText), or the whole title fades in.
export function titleIn(el) {
  const g = gsap();
  const SplitText = peek('splitText');
  if (g && SplitText) {
    const split = new SplitText(el, { type: 'chars' });
    return g.from(split.chars, {
      autoAlpha: 0, y: 40, rotate: () => g.utils.random(-25, 25), duration: 0.9, ease: 'back.out(2)', stagger: 0.05,
      onComplete: () => split.revert(),
    });
  }
  return waapi(el, [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 800 });
}

// Words of a dialogue line appear one after another (typewriter by word).
// Returns a controller so a click can finish it instantly.
export function typeWords(spans, msPerWord) {
  if (!spans.length || msPerWord <= 0 || reducedMotion()) {
    spans.forEach((s) => s.classList.add('is-shown'));
    return { done: Promise.resolve(), finish() {} };
  }
  let timer = 0;
  let i = 0;
  let resolve;
  const done = new Promise((r) => { resolve = r; });
  const tick = () => {
    if (i >= spans.length) { resolve(); return; }
    spans[i++].classList.add('is-shown');
    timer = setTimeout(tick, msPerWord);
  };
  tick();
  return {
    done,
    finish() {
      clearTimeout(timer);
      spans.forEach((s) => s.classList.add('is-shown'));
      i = spans.length;
      resolve();
    },
  };
}
