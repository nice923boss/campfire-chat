// Optional third-party libraries, loaded from jsDelivr on demand.
// Every feature that uses them must keep working when load() returns null
// (offline, CDN blocked, ad-blocker): animations fall back to CSS / WAAPI,
// audio stays silent, charts become plain numbers.

const CDN = 'https://cdn.jsdelivr.net/npm/';

const LIBS = {
  gsap:        { type: 'script', url: 'gsap@3.15.0/dist/gsap.min.js', global: 'gsap' },
  splitText:   { type: 'script', url: 'gsap@3.15.0/dist/SplitText.min.js', global: 'SplitText', needs: ['gsap'] },
  noise:       { type: 'esm', url: 'simplex-noise@4.0.3/dist/esm/simplex-noise.js' },
  confetti:    { type: 'script', url: 'canvas-confetti@1.9.4/dist/confetti.browser.min.js', global: 'confetti' },
  zzfx:        { type: 'esm', url: 'zzfx@1.4.0/ZzFX.js' },
  tone:        { type: 'script', url: 'tone@15.1.22/build/Tone.js', global: 'Tone' },
  rough:       { type: 'script', url: 'rough-notation@0.5.1/lib/rough-notation.iife.js', global: 'RoughNotation' },
  driver:      { type: 'script', url: 'driver.js@1.9.0/dist/driver.js.iife.js', global: 'driver', css: 'driver.js@1.9.0/dist/driver.css' },
  chart:       { type: 'script', url: 'chart.js@4.5.1/dist/chart.umd.min.js', global: 'Chart' },
  fuse:        { type: 'esm', url: 'fuse.js@7.5.0/dist/fuse.min.mjs' },
  htmlToImage: { type: 'script', url: 'html-to-image@1.11.13/dist/html-to-image.js', global: 'htmlToImage' },
  qr:          { type: 'script', url: 'qr-code-styling@1.9.2/lib/qr-code-styling.js', global: 'QRCodeStyling' },
};

const TIMEOUT_MS = 10000;
const loaded = new Map();

function withTimeout(promise, name) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`${name}: timeout`)), TIMEOUT_MS)),
  ]);
}

function addScript(src) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src;
    el.async = true;
    el.crossOrigin = 'anonymous';
    el.onload = resolve;
    el.onerror = () => reject(new Error(`failed: ${src}`));
    document.head.appendChild(el);
  });
}

function addStyle(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.href = href;
  document.head.appendChild(el);
}

async function fetchLib(name) {
  const lib = LIBS[name];
  if (!lib) throw new Error(`unknown library: ${name}`);
  for (const dep of lib.needs || []) {
    if (!(await load(dep))) throw new Error(`${name}: dependency ${dep} missing`);
  }
  if (lib.css) addStyle(CDN + lib.css);
  if (lib.type === 'esm') return import(CDN + lib.url);
  await addScript(CDN + lib.url);
  const value = window[lib.global];
  if (!value) throw new Error(`${name}: global ${lib.global} not found`);
  return value;
}

const ready = new Map();

// Resolves to the library (module namespace or global) or null on failure.
export function load(name) {
  if (!loaded.has(name)) {
    const p = withTimeout(fetchLib(name), name)
      .then((lib) => { ready.set(name, lib); return lib; })
      .catch((err) => {
        console.warn(`[vendor] ${name} unavailable, using fallback.`, err.message);
        return null;
      });
    loaded.set(name, p);
  }
  return loaded.get(name);
}

// Synchronous peek: the library if it already finished loading, else null.
export function peek(name) {
  return ready.get(name) || null;
}

export function preload(names) {
  return Promise.all(names.map(load));
}

export const LIBRARY_NAMES = Object.freeze(Object.keys(LIBS));
