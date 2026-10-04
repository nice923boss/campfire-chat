// Title screen.

import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { ambientButton, confirmReset } from '../ui/chrome.js';
import { nextLevel, totals } from '../store.js';
import * as motion from '../fx/motion.js';
import * as sfx from '../audio/sfx.js';

export function mount(root, _params, ctx) {
  const { core, store } = ctx;
  const state = store.get();
  const t = totals(state, core.game);
  const nextId = nextLevel(state, core.game);
  const next = core.levelIndex.get(nextId);
  const started = t.cleared > 0;

  const logo = h('h1', { class: 'title__logo' }, core.game.title);
  const buttons = [
    h('a', { class: 'btn btn--primary btn--xl', href: `#/play/${nextId}`, onclick: () => sfx.play('select') },
      h('span', { html: icon('flame') }),
      h('span', {}, started ? '繼續旅程' : '開始旅程'),
      h('small', {}, `第 ${next.number} 關・${next.title.zh}`)),
    h('a', { class: 'btn btn--glass', href: '#/map' }, h('span', { html: icon('map') }), '關卡地圖'),
    h('a', { class: 'btn btn--glass', href: '#/notes' }, h('span', { html: icon('book') }), '營火筆記本'),
    h('a', { class: 'btn btn--glass', href: '#/stats' }, h('span', { html: icon('chart') }), '學習紀錄'),
    h('a', { class: 'btn btn--glass', href: '#/settings' }, h('span', { html: icon('gear') }), '設定'),
  ];

  root.append(
    h('div', { class: 'title__corner' }, ambientButton(store)),
    h('div', { class: 'title__fire', 'aria-hidden': 'true' },
      h('span', { class: 'flame flame--a' }), h('span', { class: 'flame flame--b' }), h('span', { class: 'flame flame--c' }),
      h('span', { class: 'logs' })),
    h('section', { class: 'title__hero' },
      h('p', { class: 'title__kicker' }, 'A 100-level English conversation journey'),
      logo,
      h('p', { class: 'title__subtitle' }, core.game.subtitle),
      h('p', { class: 'title__tagline' }, '十個章節、一百個情境：從楓灣機場的入境櫃檯，一路走到最後的營火。'),
      h('div', { class: 'title__menu' }, buttons),
      h('p', { class: 'title__progress' },
        h('span', {}, `已通關 ${t.cleared} / ${t.total}`),
        h('span', { html: icon('star', { size: 14 }) }), h('span', {}, `${t.stars} / ${t.maxStars}`),
        h('span', {}, `・已發現結局 ${t.endings}`)),
      // lets the next player start fresh on a shared browser
      (started || t.endings > 0) && h('button', {
        class: 'btn btn--ghost btn--sm', type: 'button', onclick: () => confirmReset(ctx),
      }, h('span', { html: icon('retry', { size: 16 }) }), '清除進度，換人玩')));

  motion.titleIn(logo);
  motion.stagger(root.querySelectorAll('.title__menu > *'), { delay: 0.5 });
  return () => {};
}
