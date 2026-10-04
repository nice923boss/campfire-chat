// Shared screen chrome: top bar with navigation and the ambience toggle.

import { h } from './dom.js';
import { icon } from './icons.js';
import * as ambient from '../audio/ambient.js';
import * as sfx from '../audio/sfx.js';

const NAV = [
  { route: 'map', label: '關卡地圖', icon: 'map' },
  { route: 'notes', label: '營火筆記本', icon: 'book' },
  { route: 'stats', label: '學習紀錄', icon: 'chart' },
  { route: 'settings', label: '設定', icon: 'gear' },
];

export function ambientButton(store) {
  const btn = h('button', { class: 'icon-btn', type: 'button' });
  const paint = () => {
    const on = store.get().settings.ambient;
    btn.innerHTML = icon(on ? 'music' : 'mute');
    btn.setAttribute('aria-label', on ? '關閉營火環境音' : '開啟營火環境音');
    btn.setAttribute('aria-pressed', String(on));
    btn.title = btn.getAttribute('aria-label');
  };
  btn.addEventListener('click', async () => {
    const on = !store.get().settings.ambient;
    store.setting('ambient', on);
    if (on) await ambient.start(); else ambient.stop();
    sfx.play('tap');
    paint();
  });
  paint();
  return btn;
}

export function topbar(ctx, { title, active, back = '' }) {
  return h('header', { class: 'topbar' },
    h('a', { class: 'icon-btn', href: `#/${back}`, 'aria-label': back ? '返回' : '回首頁', html: icon('back') }),
    h('h1', { class: 'topbar__title' }, title),
    h('nav', { class: 'topnav', 'aria-label': '主選單' },
      NAV.map((n) => h('a', {
        class: `topnav__link${n.route === active ? ' is-active' : ''}`,
        href: `#/${n.route}`,
        'aria-current': n.route === active ? 'page' : false,
      }, h('span', { html: icon(n.icon, { size: 18 }) }), h('span', { class: 'topnav__label' }, n.label)))),
    ambientButton(ctx.store));
}

export function starRow(count, max = 3, cls = 'stars') {
  return h('span', { class: cls, 'aria-label': `${count} / ${max} 顆星` },
    Array.from({ length: max }, (_, i) => h('span', { class: `star${i < count ? ' is-on' : ''}`, html: icon('star', { size: 16 }) })));
}
