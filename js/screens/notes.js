// Campfire notebook: every note from cleared levels, with fuzzy search
// (Fuse.js, plain substring match as fallback) and type filters.

import { h, clear } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { topbar } from '../ui/chrome.js';
import { NOTE_LABELS, levelLabel } from '../ui/labels.js';
import { noteCard } from '../play/cards.js';
import { loadLevels } from '../data.js';
import { load } from '../vendor.js';
import { isCleared, levelOrder } from '../store.js';
import * as tts from '../audio/tts.js';
import * as motion from '../fx/motion.js';

const SEARCH_KEYS = ['en', 'zh', 'explain', 'example.en', 'example.zh', 'levelTitle'];

function plainMatch(note, query) {
  const q = query.toLowerCase();
  return [note.en, note.zh, note.explain, note.example?.en, note.example?.zh, note.levelTitle]
    .some((t) => String(t || '').toLowerCase().includes(q));
}

export async function mount(root, _params, ctx) {
  const { core, store } = ctx;
  const state = store.get();
  const clearedIds = levelOrder(core.game).filter((id) => isCleared(state, id));

  root.append(topbar(ctx, { title: '營火筆記本', active: 'notes' }));

  if (!clearedIds.length) {
    root.append(h('section', { class: 'empty-state' },
      h('span', { class: 'empty-state__icon', html: icon('book', { size: 40 }) }),
      h('h2', {}, '筆記本還是空的'),
      h('p', {}, '通關後，Ember 的筆記會收進這裡。'),
      h('a', { class: 'btn btn--primary', href: '#/map' }, '去關卡地圖')));
    return () => {};
  }

  const levels = await loadLevels(clearedIds);
  const notes = levels.flatMap((lv) => {
    const meta = core.levelIndex.get(lv.id);
    return lv.notes.map((n, i) => ({ ...n, key: `${lv.id}-${i}`, levelId: lv.id, levelTitle: meta.title.zh, meta }));
  });

  const FuseMod = await load('fuse');
  const Fuse = FuseMod?.default || null;
  const fuse = Fuse ? new Fuse(notes, { keys: SEARCH_KEYS, threshold: 0.34, ignoreLocation: true }) : null;

  const mentor = core.cast[core.game.mentor];
  const speak = tts.supported() ? (text) => tts.speak(text, { gender: mentor.gender, rate: store.get().settings.rate }) : null;

  let query = '';
  let type = 'all';
  const list = h('div', { class: 'notebook__list' });
  const count = h('p', { class: 'notebook__count', role: 'status' });
  const input = h('input', {
    class: 'search__input', type: 'search', placeholder: '搜尋英文、中文或說明，例如 here you are、時態', 'aria-label': '搜尋筆記',
    oninput: (e) => { query = e.target.value.trim(); paint(); },
  });
  const chips = h('div', { class: 'chips', role: 'radiogroup', 'aria-label': '筆記類型' },
    [['all', '全部'], ...Object.entries(NOTE_LABELS)].map(([value, label]) => h('button', {
      class: `chip${value === type ? ' is-active' : ''}`, type: 'button', role: 'radio',
      'aria-checked': String(value === type), dataset: { type: value },
      onclick: (e) => {
        type = value;
        chips.querySelectorAll('.chip').forEach((c) => {
          const on = c === e.currentTarget;
          c.classList.toggle('is-active', on);
          c.setAttribute('aria-checked', String(on));
        });
        paint();
      },
    }, label)));

  function results() {
    const matched = !query ? notes : fuse ? fuse.search(query).map((r) => r.item) : notes.filter((n) => plainMatch(n, query));
    return type === 'all' ? matched : matched.filter((n) => n.type === type);
  }

  function paint() {
    const found = results();
    count.textContent = query || type !== 'all'
      ? `找到 ${found.length} 則`
      : `已收集 ${notes.length} 則重點，來自 ${levels.length} 關`;
    clear(list);
    if (!found.length) {
      list.append(h('p', { class: 'empty' }, '沒有符合的筆記，換個關鍵字試試。'));
      return;
    }
    list.append(...found.map((n) => {
      const { el } = noteCard(n, speak);
      el.prepend(h('a', { class: 'note__source', href: `#/play/${n.levelId}` }, `${levelLabel(n.meta)}・${n.levelTitle}`));
      return el;
    }));
  }

  root.append(h('section', { class: 'notebook' },
    h('div', { class: 'search' }, h('span', { class: 'search__icon', html: icon('search') }), input),
    chips,
    count,
    list));
  paint();
  motion.stagger([...list.children].slice(0, 24), { y: 16, each: 0.03 });
  return () => {};
}
