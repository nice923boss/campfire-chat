// Level map: chapter tabs, chapter cover and a winding path of ten levels.

import { h, toast } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { topbar, starRow } from '../ui/chrome.js';
import { runTour } from '../ui/tour.js';
import { loadLevels } from '../data.js';
import { chapterImage } from '../assets.js';
import { allEndings } from '../engine.js';
import { isCleared, isUnlocked, nextLevel } from '../store.js';
import * as motion from '../fx/motion.js';
import * as sfx from '../audio/sfx.js';

export async function mount(root, params, ctx) {
  const { core, store, unlockAll, go } = ctx;
  const { game } = core;
  const state = store.get();
  const nextId = nextLevel(state, game);
  const fallback = core.levelIndex.get(nextId).chapter.id;
  const chapter = game.chapters.find((c) => c.id === params[0]) || game.chapters.find((c) => c.id === fallback);
  const unlocked = (lvId) => isUnlocked(state, game, lvId, unlockAll);

  const tabs = h('nav', { class: 'chapter-tabs', 'aria-label': '章節' },
    game.chapters.map((ch, i) => {
      const done = ch.levels.filter((l) => isCleared(state, l.id)).length;
      const open = unlocked(ch.levels[0].id);
      return h('a', {
        class: `chapter-tab${ch.id === chapter.id ? ' is-active' : ''}${open ? '' : ' is-locked'}`,
        href: `#/map/${ch.id}`,
        'aria-current': ch.id === chapter.id ? 'page' : false,
      },
      h('span', { class: 'chapter-tab__no' }, `CH ${i + 1}`),
      h('span', { class: 'chapter-tab__name' }, ch.title.zh),
      h('span', { class: 'chapter-tab__meta' }, open ? `${done}/10` : h('span', { html: icon('lock', { size: 14, label: '未解鎖' }) })));
    }));

  const chapterNo = game.chapters.indexOf(chapter) + 1;
  const chStars = chapter.levels.reduce((n, l) => n + (state.levels[l.id]?.stars || 0), 0);
  const cover = h('div', { class: 'chapter-cover__art' });
  const coverPanel = h('section', { class: 'chapter-cover' },
    cover,
    h('div', { class: 'chapter-cover__text' },
      h('p', { class: 'chapter-cover__kicker' }, `第 ${chapterNo} 章・${chapter.cefr}`),
      h('h2', { class: 'chapter-cover__title' }, chapter.title.zh, h('small', { lang: 'en' }, chapter.title.en)),
      h('p', { class: 'chapter-cover__summary' }, chapter.summary.zh),
      h('p', { class: 'chapter-cover__stars' }, h('span', { html: icon('star', { size: 16 }) }), ` ${chStars} / 30`)));

  const nodes = chapter.levels.map((lv) => {
    const meta = core.levelIndex.get(lv.id);
    const open = unlocked(lv.id);
    const cleared = isCleared(state, lv.id);
    const isNext = lv.id === nextId && !cleared;
    const endingsEl = h('span', { class: 'level-node__endings' });
    const node = h('button', {
      class: `level-node${cleared ? ' is-cleared' : ''}${isNext ? ' is-next' : ''}${open ? '' : ' is-locked'}`,
      type: 'button',
      dataset: { id: lv.id },
      'aria-label': `第 ${meta.number} 關 ${lv.title.zh}${open ? '' : '（未解鎖）'}`,
      onclick: () => {
        if (!open) {
          sfx.play('wrong');
          motion.shake(node);
          toast('先通關前一關，才能解鎖這一關。');
          return;
        }
        sfx.play('select');
        go(`play/${lv.id}`);
      },
    },
    h('span', { class: 'level-node__badge' }, open ? String(meta.number) : h('span', { html: icon('lock', { size: 18 }) })),
    h('span', { class: 'level-node__text' },
      h('strong', {}, lv.title.zh),
      h('small', { lang: 'en' }, lv.title.en),
      cleared ? starRow(state.levels[lv.id].stars) : null,
      endingsEl));
    return { node, endingsEl, id: lv.id };
  });

  root.append(
    topbar(ctx, { title: '關卡地圖', active: 'map' }),
    tabs,
    h('div', { class: 'map-body' },
      coverPanel,
      h('ol', { class: 'level-path' }, nodes.map((n, i) => h('li', { class: 'level-path__item', dataset: { i: String(i) } }, n.node)))));

  tabs.querySelector('.is-active')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  chapterImage(chapter.id, chapter.title.en).then((url) => { cover.style.backgroundImage = `url("${url}")`; });
  motion.stagger(root.querySelectorAll('.level-node'), { y: 20, each: 0.045 });

  // Ending counts need the level files; fill them in when they arrive.
  loadLevels(chapter.levels.map((l) => l.id)).then((levels) => {
    levels.forEach((lv) => {
      const n = nodes.find((x) => x.id === lv.id);
      const found = (store.get().endings[lv.id] || []).length;
      if (n && found) n.endingsEl.textContent = `結局 ${found}/${allEndings(lv).length}`;
    });
  });

  let tour = null;
  let disposed = false;
  runTour('map', store).then((t) => { if (disposed) t?.destroy?.(); else tour = t; });
  return () => {
    disposed = true;
    tour?.destroy?.();
  };
}
