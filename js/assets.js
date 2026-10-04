// Image paths for generated art, with SVG placeholders while the art does not
// exist yet. Drop the ComfyUI output into assets/ and the game picks it up.

export const EXPRESSIONS = Object.freeze(['neutral', 'happy', 'upset', 'confused']);

export const paths = {
  bg: (levelId) => `assets/bg/${levelId}.webp`,
  char: (charId, expr = 'neutral') => `assets/char/${charId}_${expr}.webp`,
  chapter: (chapterId) => `assets/chapter/${chapterId}.webp`,
  ui: (name) => `assets/ui/${name}.webp`,
};

function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function esc(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function svgUri(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Night-sky gradient picked from the id, so each scene looks different.
export function scenePlaceholder(id, label, w = 1280, h = 720) {
  const hue = hash(id) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="hsl(${hue},45%,22%)"/><stop offset="1" stop-color="hsl(${(hue + 40) % 360},40%,10%)"/>
</linearGradient></defs>
<rect width="100%" height="100%" fill="url(#g)"/>
<g fill="none" stroke="hsla(${hue},60%,75%,.12)" stroke-width="2">
<path d="M0 ${h * 0.72} Q ${w * 0.3} ${h * 0.6} ${w * 0.55} ${h * 0.7} T ${w} ${h * 0.66}"/>
<path d="M0 ${h * 0.84} Q ${w * 0.4} ${h * 0.76} ${w * 0.7} ${h * 0.84} T ${w} ${h * 0.8}"/>
</g>
<text x="50%" y="44%" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(h / 16)}" fill="hsla(${hue},60%,90%,.55)">${esc(label)}</text>
<text x="50%" y="54%" text-anchor="middle" font-family="monospace" font-size="${Math.round(h / 32)}" fill="hsla(${hue},40%,85%,.4)">${esc(id)}</text>
</svg>`;
  return svgUri(svg);
}

// Silhouette sprite with name + expression, same proportions as real sprites.
export function spritePlaceholder(charId, name, expr) {
  const hue = hash(charId) % 360;
  const face = { neutral: 'M-18 6 h36', happy: 'M-20 0 q20 20 40 0', upset: 'M-18 12 q18 -14 36 0', confused: 'M-18 8 q10 -8 18 0 t18 0' }[expr] || 'M-18 6 h36';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 960" width="640" height="960">
<g transform="translate(320 0)">
<path d="M-230 960 C -230 700 -150 610 0 610 C 150 610 230 700 230 960 Z" fill="hsla(${hue},35%,55%,.85)"/>
<circle cx="0" cy="400" r="150" fill="hsla(${hue},30%,78%,.92)"/>
<path d="M-158 380 C -160 220 160 220 158 380 C 120 300 -120 300 -158 380 Z" fill="hsla(${hue},35%,25%,.95)"/>
<circle cx="-52" cy="400" r="12" fill="hsl(${hue},30%,20%)"/><circle cx="52" cy="400" r="12" fill="hsl(${hue},30%,20%)"/>
<path d="${face}" transform="translate(0 460)" stroke="hsl(${hue},30%,20%)" stroke-width="7" fill="none" stroke-linecap="round"/>
<rect x="-210" y="800" width="420" height="110" rx="20" fill="rgba(10,14,24,.6)"/>
<text x="0" y="848" text-anchor="middle" font-family="sans-serif" font-size="40" fill="#fff">${esc(name)}</text>
<text x="0" y="890" text-anchor="middle" font-family="monospace" font-size="26" fill="rgba(255,255,255,.7)">${esc(expr)}</text>
</g></svg>`;
  return svgUri(svg);
}

// Remember which files exist so each one is probed once per session.
const probes = new Map();

export function probe(url) {
  if (!probes.has(url)) {
    probes.set(url, new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    }));
  }
  return probes.get(url);
}

// assets/manifest.json lists the art files that exist (the ComfyUI generator
// rewrites it). Only listed files are requested, so missing art never causes
// 404s. Without a readable manifest, every file is probed instead.
export const MANIFEST_URL = 'assets/manifest.json';
let manifest = null;

function listedFiles() {
  manifest ??= fetch(MANIFEST_URL, { cache: 'no-cache' })
    .then((r) => (r.ok ? r.json() : null))
    .then((m) => (Array.isArray(m?.files) ? new Set(m.files) : null))
    .catch(() => null);
  return manifest;
}

// Resolve to the real file if it exists, else the placeholder data URI.
export async function resolveImage(url, placeholder) {
  const listed = await listedFiles();
  const exists = listed ? listed.has(url) && await probe(url) : await probe(url);
  return exists ? url : placeholder();
}

export function bgImage(levelId, label) {
  return resolveImage(paths.bg(levelId), () => scenePlaceholder(levelId, label));
}

export function chapterImage(chapterId, label) {
  return resolveImage(paths.chapter(chapterId), () => scenePlaceholder(chapterId, label));
}

export function uiImage(name, label) {
  return resolveImage(paths.ui(name), () => scenePlaceholder(name, label));
}

export function spriteImage(charId, name, expr = 'neutral') {
  return resolveImage(paths.char(charId, expr), () => spritePlaceholder(charId, name, expr));
}
