// Minimal hash router: #/map, #/play/L001, #/notes ... (works on GitHub Pages
// without any server rewrite rules).

export function parseHash(hash) {
  const clean = String(hash || '').replace(/^#\/?/, '').split('?')[0];
  const [name = '', ...params] = clean.split('/').filter(Boolean).map(decodeURIComponent);
  return { name: name || 'title', params };
}

export function go(path) {
  const target = `#/${path}`;
  if (location.hash === target) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else location.hash = target;
}

export function startRouter(onRoute) {
  const run = () => onRoute(parseHash(location.hash));
  window.addEventListener('hashchange', run);
  run();
}
