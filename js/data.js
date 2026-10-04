// Loads the JSON content. All paths are relative so the site works from any
// sub-path (e.g. https://user.github.io/campfire-chat/).

const cache = new Map();

async function getJSON(path) {
  if (!cache.has(path)) {
    const p = fetch(path, { cache: 'no-cache' }).then((res) => {
      if (!res.ok) throw new Error(`${path} (${res.status})`);
      return res.json();
    });
    cache.set(path, p);
    p.catch(() => cache.delete(path)); // allow a retry after a network error
  }
  return cache.get(path);
}

let bundle = null;

// game.json + art.json + every cast file, merged into one lookup.
export async function loadCore() {
  if (bundle) return bundle;
  const [game, art] = await Promise.all([getJSON('data/game.json'), getJSON('data/art.json')]);
  const castFiles = await Promise.all(game.cast.map((name) => getJSON(`data/cast/${name}.json`).catch(() => ({}))));
  const cast = Object.assign({}, ...castFiles);
  const levelIndex = new Map();
  game.chapters.forEach((ch, c) => ch.levels.forEach((lv, i) => {
    levelIndex.set(lv.id, { ...lv, chapter: ch, chapterIndex: c, indexInChapter: i, number: c * 10 + i + 1 });
  }));
  bundle = { game, art, cast, levelIndex };
  return bundle;
}

export function loadLevel(id) {
  if (!/^L\d{3}$/.test(id)) return Promise.reject(new Error(`bad level id: ${id}`));
  return getJSON(`data/levels/${id}.json`);
}

// Loads many levels in parallel; missing files are skipped (returns only found).
export async function loadLevels(ids) {
  const results = await Promise.allSettled(ids.map(loadLevel));
  return results.filter((r) => r.status === 'fulfilled').map((r) => r.value);
}

export function speakerName(cast, who) {
  if (who === 'narrator') return null;
  if (who === 'player') return { en: 'Kai', zh: '凱' };
  const c = cast[who];
  return c ? { en: c.name, zh: c.nameZh } : { en: who, zh: who };
}
