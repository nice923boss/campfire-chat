// Player progress + settings, persisted to localStorage.
// The storage backend is injectable so tests can run in Node.

export const STORAGE_KEY = 'campfire-chat:v1';

export const DEFAULT_SETTINGS = Object.freeze({
  zhLines: true,      // Chinese subtitle under each dialogue line
  zhChoices: false,   // Chinese under each choice (off: keeps the challenge)
  tts: true,          // read lines aloud with the browser's speech engine
  rate: 0.9,          // speech rate
  sfx: true,          // UI sound effects
  ambient: false,     // campfire ambience (needs a user gesture to start)
  textSpeed: 'normal' // 'slow' | 'normal' | 'instant'
});

export const MISTAKE_KINDS = Object.freeze(['literal', 'grammar', 'tone', 'offtopic', 'culture']);

function emptyState() {
  return {
    version: 1,
    levels: {},       // { L001: { stars, best, clears } }
    endings: {},      // { L001: ['good', 'bad:0:1'] }
    kinds: Object.fromEntries(MISTAKE_KINDS.map((k) => [k, 0])),
    settings: { ...DEFAULT_SETTINGS },
    tours: {},        // { map: true, play: true }
    last: null,       // last played level id
  };
}

export function memoryStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => { data.set(k, String(v)); },
    removeItem: (k) => { data.delete(k); },
  };
}

function browserStorage() {
  try {
    const s = globalThis.localStorage;
    const probe = `${STORAGE_KEY}:probe`;
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return memoryStorage(); // private mode / blocked storage: play without saving
  }
}

// Merge whatever was saved onto a fresh state so new fields get defaults.
function revive(raw) {
  const base = emptyState();
  if (!raw || typeof raw !== 'object') return base;
  return {
    ...base,
    levels: raw.levels && typeof raw.levels === 'object' ? raw.levels : {},
    endings: raw.endings && typeof raw.endings === 'object' ? raw.endings : {},
    kinds: { ...base.kinds, ...(raw.kinds || {}) },
    settings: { ...base.settings, ...(raw.settings || {}) },
    tours: raw.tours && typeof raw.tours === 'object' ? raw.tours : {},
    last: typeof raw.last === 'string' ? raw.last : null,
  };
}

export function createStore(storage = browserStorage()) {
  let state;
  try {
    state = revive(JSON.parse(storage.getItem(STORAGE_KEY)));
  } catch {
    state = emptyState();
  }
  const listeners = new Set();
  let saveError = null;

  function commit(next) {
    state = next;
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
      saveError = null;
    } catch (err) {
      saveError = err; // quota / blocked: keep playing, surface via lastError()
    }
    listeners.forEach((fn) => fn(state));
  }

  return {
    get: () => state,
    lastError: () => saveError,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

    setting(key, value) {
      commit({ ...state, settings: { ...state.settings, [key]: value } });
    },

    markTour(name) {
      commit({ ...state, tours: { ...state.tours, [name]: true } });
    },

    resetTours() {
      commit({ ...state, tours: {} });
    },

    setLast(levelId) {
      commit({ ...state, last: levelId });
    },

    // A wrong pick: count its kind and record the bad ending as discovered.
    recordFail(levelId, endingKey, kind) {
      const seen = state.endings[levelId] || [];
      commit({
        ...state,
        kinds: MISTAKE_KINDS.includes(kind) ? { ...state.kinds, [kind]: (state.kinds[kind] || 0) + 1 } : state.kinds,
        endings: seen.includes(endingKey) ? state.endings : { ...state.endings, [levelId]: [...seen, endingKey] },
      });
    },

    // Level cleared. Returns { firstClear, newBest }.
    recordClear(levelId, stars, mistakes) {
      const prev = state.levels[levelId];
      const seen = state.endings[levelId] || [];
      const entry = {
        stars: Math.max(stars, prev?.stars || 0),
        best: prev ? Math.min(mistakes, prev.best) : mistakes,
        clears: (prev?.clears || 0) + 1,
      };
      commit({
        ...state,
        levels: { ...state.levels, [levelId]: entry },
        endings: seen.includes('good') ? state.endings : { ...state.endings, [levelId]: [...seen, 'good'] },
      });
      return { firstClear: !prev, newBest: !prev || stars > prev.stars };
    },

    reset() {
      commit({ ...emptyState(), settings: state.settings });
    },
  };
}

// ---- derived helpers (pure) ----

export function isCleared(state, levelId) {
  return Boolean(state.levels[levelId]);
}

// Level ids in play order, from game.json.
export function levelOrder(game) {
  return game.chapters.flatMap((ch) => ch.levels.map((l) => l.id));
}

export function isUnlocked(state, game, levelId, unlockAll = false) {
  if (unlockAll) return true;
  const order = levelOrder(game);
  const i = order.indexOf(levelId);
  if (i <= 0) return i === 0;
  return isCleared(state, order[i - 1]);
}

// The level the "continue" button should open.
export function nextLevel(state, game) {
  const order = levelOrder(game);
  return order.find((id) => !isCleared(state, id)) || order[order.length - 1];
}

export function totals(state, game) {
  const order = levelOrder(game);
  const cleared = order.filter((id) => isCleared(state, id)).length;
  const stars = order.reduce((n, id) => n + (state.levels[id]?.stars || 0), 0);
  const endings = Object.values(state.endings).reduce((n, list) => n + list.length, 0);
  return { cleared, total: order.length, stars, maxStars: order.length * 3, endings };
}
