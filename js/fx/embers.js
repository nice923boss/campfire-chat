// Drifting embers / fireflies on a full-screen canvas. Motion comes from
// simplex noise (flow field) so particles sway like hot air instead of
// moving in straight lines. Without the noise library a sine sway is used.

import { load } from '../vendor.js';
import { reducedMotion } from '../ui/dom.js';

const MODES = {
  // count per 100k px², rise speed, size range, hue range
  title: { density: 5.2, rise: 0.55, size: [0.8, 2.6], hues: [18, 42], glow: 1 },
  calm:  { density: 2.2, rise: 0.32, size: [0.6, 2.0], hues: [24, 48], glow: 0.7 },
  play:  { density: 0.9, rise: 0.25, size: [0.5, 1.6], hues: [30, 52], glow: 0.55 },
  off:   { density: 0, rise: 0, size: [0, 0], hues: [0, 0], glow: 0 },
};

// Pre-rendered glow dots, one per 6-degree hue bucket (cheaper than building
// a radial gradient for every particle on every frame).
const sprites = new Map();
function glowSprite(hue) {
  const key = Math.round(hue / 6) * 6;
  if (!sprites.has(key)) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, `hsla(${key}, 100%, 72%, 1)`);
    grad.addColorStop(0.35, `hsla(${key}, 100%, 56%, .35)`);
    grad.addColorStop(1, `hsla(${key}, 100%, 50%, 0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    sprites.set(key, c);
  }
  return sprites.get(key);
}

export function createEmbers(canvas) {
  const ctx = canvas.getContext('2d');
  let noise3 = (x, y, z) => Math.sin(x * 2.1 + z) * Math.cos(y * 1.7 - z * 0.7);
  let particles = [];
  let mode = MODES.calm;
  let w = 0;
  let h = 0;
  let dpr = 1;
  let raf = 0;
  let t = 0;
  let running = false;

  load('noise').then((mod) => {
    if (mod?.createNoise3D) noise3 = mod.createNoise3D();
  });

  function spawn(atBottom) {
    const [s0, s1] = mode.size;
    const [h0, h1] = mode.hues;
    return {
      x: Math.random() * w,
      y: atBottom ? h + Math.random() * 40 : Math.random() * h,
      r: s0 + Math.random() * (s1 - s0),
      hue: h0 + Math.random() * (h1 - h0),
      life: 0,
      max: 380 + Math.random() * 520,
      seed: Math.random() * 1000,
      flicker: Math.random() * Math.PI * 2,
    };
  }

  function targetCount() {
    return Math.round(((w * h) / 100000) * mode.density);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = targetCount();
    particles = particles.slice(0, n);
    while (particles.length < n) particles.push(spawn(false));
  }

  function frame() {
    if (!running) return;
    t += 0.0035;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    const n = targetCount();
    if (particles.length < n) particles.push(spawn(true));

    particles = particles.map((p) => {
      const angle = noise3(p.x * 0.0022, p.y * 0.0022, t + p.seed * 0.001) * Math.PI;
      const next = {
        ...p,
        x: p.x + Math.cos(angle) * 0.6,
        y: p.y - mode.rise - Math.abs(Math.sin(angle)) * 0.35,
        life: p.life + 1,
      };
      return next.y < -20 || next.life > next.max || next.x < -30 || next.x > w + 30 ? spawn(true) : next;
    }).slice(0, Math.max(n, 0));

    for (const p of particles) {
      const fadeIn = Math.min(p.life / 60, 1);
      const fadeOut = Math.min((p.max - p.life) / 120, 1);
      const flicker = 0.65 + 0.35 * Math.sin(p.life * 0.12 + p.flicker);
      ctx.globalAlpha = Math.max(0, fadeIn * fadeOut * flicker * mode.glow);
      const size = p.r * 10;
      ctx.drawImage(glowSprite(p.hue), p.x - size / 2, p.y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reducedMotion() || mode === MODES.off) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, w, h);
  }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { running = false; cancelAnimationFrame(raf); } else start();
  });
  resize();

  return {
    setMode(name) {
      const next = MODES[name] || MODES.calm;
      if (next === mode) return;
      mode = next;
      if (mode === MODES.off) { stop(); return; }
      resize();
      start();
    },
    start,
    stop,
  };
}
