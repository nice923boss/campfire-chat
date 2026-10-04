// App bootstrap: loads content, wires global services, routes between screens.

import { loadCore } from './data.js';
import { createStore } from './store.js';
import { startRouter, go } from './router.js';
import { preload } from './vendor.js';
import { h, clear } from './ui/dom.js';
import { uiImage } from './assets.js';
import { createEmbers } from './fx/embers.js';
import * as motion from './fx/motion.js';
import * as sfx from './audio/sfx.js';
import * as ambient from './audio/ambient.js';
import * as tts from './audio/tts.js';

import * as titleScreen from './screens/title.js';
import * as mapScreen from './screens/map.js';
import * as playScreen from './screens/play.js';
import * as notesScreen from './screens/notes.js';
import * as statsScreen from './screens/stats.js';
import * as settingsScreen from './screens/settings.js';

const SCREENS = {
  title: { mod: titleScreen, backdrop: 'title', embers: 'title' },
  map: { mod: mapScreen, backdrop: 'camp', embers: 'calm' },
  play: { mod: playScreen, backdrop: 'none', embers: 'off' },
  notes: { mod: notesScreen, backdrop: 'camp', embers: 'calm' },
  stats: { mod: statsScreen, backdrop: 'camp', embers: 'calm' },
  settings: { mod: settingsScreen, backdrop: 'camp', embers: 'calm' },
};

const app = document.getElementById('app');
const backdrop = document.getElementById('backdrop');

function showFatal(message) {
  clear(app).appendChild(h('div', { class: 'fatal' },
    h('h1', {}, '營火點不起來'),
    h('p', {}, message),
    h('p', { class: 'fatal__hint' }, '如果是直接雙擊 index.html 開啟，瀏覽器會擋下資料讀取。請改用本機伺服器，例如在專案資料夾執行 python -m http.server 8080，再開 http://localhost:8080。'),
    h('button', { class: 'btn btn--primary', onclick: () => location.reload() }, '重新整理')));
}

async function setBackdrop(kind) {
  backdrop.dataset.kind = kind;
  if (kind === 'none') return;
  const name = kind === 'title' ? 'title' : 'campfire';
  const url = await uiImage(name, '');
  // Placeholder art for the backdrop is just the CSS gradient (no label).
  backdrop.style.backgroundImage = url.startsWith('data:') ? '' : `url("${url}")`;
  backdrop.classList.toggle('has-art', !url.startsWith('data:'));
}

async function boot() {
  let core;
  try {
    core = await loadCore();
  } catch (err) {
    showFatal(`讀取遊戲資料失敗：${err.message}`);
    return;
  }

  const store = createStore();
  const params = new URLSearchParams(location.search);
  const unlockAll = params.get('unlock') === 'all';
  const embers = createEmbers(document.getElementById('embers'));

  sfx.setEnabled(store.get().settings.sfx);
  store.subscribe((s) => sfx.setEnabled(s.settings.sfx));

  // Animations: load GSAP early; screens animate with fallbacks until then.
  preload(['gsap']).then(() => motion.init());

  // Browsers only allow audio after a user gesture.
  const onFirstGesture = () => {
    sfx.unlock();
    if (store.get().settings.ambient) ambient.start();
    window.removeEventListener('pointerdown', onFirstGesture);
    window.removeEventListener('keydown', onFirstGesture);
  };
  window.addEventListener('pointerdown', onFirstGesture);
  window.addEventListener('keydown', onFirstGesture);

  const ctx = { core, store, unlockAll, go, embers };
  let current = null;
  let routeId = 0;

  startRouter(async (route) => {
    const id = ++routeId;
    const screen = SCREENS[route.name] || SCREENS.title;
    tts.stop();
    if (current?.cleanup) {
      try { current.cleanup(); } catch (err) { console.warn('[router] cleanup failed', err); }
    }
    current = null;
    clear(app);
    document.body.dataset.screen = route.name in SCREENS ? route.name : 'title';
    embers.setMode(screen.embers);
    setBackdrop(screen.backdrop);
    const root = h('main', { class: `screen screen--${document.body.dataset.screen}` });
    app.appendChild(root);
    try {
      const cleanup = await screen.mod.mount(root, route.params, ctx);
      if (id !== routeId) { cleanup?.(); return; } // user navigated away meanwhile
      current = { cleanup };
    } catch (err) {
      console.error(err);
      if (id === routeId) {
        clear(root).appendChild(h('div', { class: 'fatal' },
          h('h1', {}, '這一頁出了點問題'),
          h('p', {}, err.message),
          h('button', { class: 'btn btn--primary', onclick: () => go('map') }, '回關卡地圖')));
      }
    }
  });
}

boot();
