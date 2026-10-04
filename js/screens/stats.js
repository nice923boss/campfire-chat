// Learning record: totals, stars per chapter (bar) and mistake types (radar)
// with Chart.js; plain CSS bars when the library is unavailable.

import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { topbar } from '../ui/chrome.js';
import { KIND_LABELS } from '../ui/labels.js';
import { downloadCertificate } from '../ui/share.js';
import { load } from '../vendor.js';
import { MISTAKE_KINDS, totals } from '../store.js';
import * as motion from '../fx/motion.js';

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function tile(label, value, sub) {
  return h('div', { class: 'tile' },
    h('span', { class: 'tile__label' }, label),
    h('strong', { class: 'tile__value' }, value),
    sub ? h('small', { class: 'tile__sub' }, sub) : null);
}

// Fallback chart: one labeled bar per row.
function cssBars(rows, max) {
  return h('ul', { class: 'bars' }, rows.map(([label, value]) => h('li', { class: 'bars__row' },
    h('span', { class: 'bars__label' }, label),
    h('span', { class: 'bars__track' }, h('span', { class: 'bars__fill', style: { width: `${max ? (value / max) * 100 : 0}%` } })),
    h('span', { class: 'bars__value' }, String(value)))));
}

export async function mount(root, _params, ctx) {
  const { core, store } = ctx;
  const state = store.get();
  const t = totals(state, core.game);
  const mistakes = MISTAKE_KINDS.reduce((n, k) => n + (state.kinds[k] || 0), 0);
  const chapterRows = core.game.chapters.map((ch, i) => [
    `CH${i + 1} ${ch.title.zh}`,
    ch.levels.reduce((n, l) => n + (state.levels[l.id]?.stars || 0), 0),
  ]);
  const kindRows = MISTAKE_KINDS.map((k) => [KIND_LABELS[k].zh, state.kinds[k] || 0]);
  const top = MISTAKE_KINDS.reduce((best, k) => ((state.kinds[k] || 0) > (state.kinds[best] || 0) ? k : best), MISTAKE_KINDS[0]);

  const barBox = h('div', { class: 'chart-box' });
  const radarBox = h('div', { class: 'chart-box chart-box--square' });
  const allDone = t.cleared === t.total;

  root.append(
    topbar(ctx, { title: '學習紀錄', active: 'stats' }),
    h('section', { class: 'stats' },
      h('div', { class: 'tiles' },
        tile('通關', `${t.cleared}`, `/ ${t.total} 關`),
        tile('星星', `${t.stars}`, `/ ${t.maxStars}`),
        tile('發現結局', `${t.endings}`, '好結局與壞結局'),
        tile('累計失誤', `${mistakes}`, '每次答錯都算一次')),
      h('div', { class: 'stats__grid' },
        h('article', { class: 'panel' }, h('h2', { class: 'panel__title' }, '各章星星'), barBox),
        h('article', { class: 'panel' }, h('h2', { class: 'panel__title' }, '失誤類型'), radarBox,
          mistakes
            ? h('div', { class: 'advice' },
              h('p', {}, '你最常踩到的坑是 ', h('strong', { class: 'kind-chip kind-chip--sm', dataset: { kind: top } }, KIND_LABELS[top].zh), '。'),
              h('p', { class: 'advice__tip' }, KIND_LABELS[top].tip))
            : h('p', { class: 'advice' }, '還沒有失誤紀錄。答錯也沒關係，每個壞結局都是一次學習。'))),
      h('article', { class: 'panel panel--cert' },
        h('h2', { class: 'panel__title' }, '結業證書'),
        allDone
          ? h('button', { class: 'btn btn--primary', type: 'button', onclick: () => downloadCertificate(t) }, h('span', { html: icon('download') }), '下載結業證書')
          : h('p', {}, `完成全部 ${t.total} 關後，就能下載結業證書。還差 ${t.total - t.cleared} 關。`))));

  motion.stagger(root.querySelectorAll('.tile, .panel'), { y: 18, each: 0.06 });

  const Chart = await load('chart');
  if (!Chart || !root.isConnected) {
    barBox.append(cssBars(chapterRows, 30));
    radarBox.append(cssBars(kindRows, Math.max(1, ...kindRows.map((r) => r[1]))));
    return () => {};
  }

  const ink = cssVar('--ink-2') || '#c9b8a6';
  const grid = cssVar('--line') || 'rgba(255,255,255,.12)';
  const accent = cssVar('--ember') || '#ff8a3d';
  Chart.defaults.color = ink;
  Chart.defaults.font.family = cssVar('--font-ui') || 'sans-serif';
  const barCanvas = h('canvas', { role: 'img', 'aria-label': `各章星星：${chapterRows.map((r) => `${r[0]} ${r[1]} 顆`).join('，')}` });
  const radarCanvas = h('canvas', { role: 'img', 'aria-label': `失誤類型：${kindRows.map((r) => `${r[0]} ${r[1]} 次`).join('，')}` });
  barBox.append(barCanvas);
  radarBox.append(radarCanvas);

  const charts = [
    new Chart(barCanvas, {
      type: 'bar',
      data: {
        labels: chapterRows.map((r) => r[0].split(' ')[0]),
        datasets: [{ label: '星星', data: chapterRows.map((r) => r[1]), backgroundColor: accent, borderRadius: 6, maxBarThickness: 28 }],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { title: (items) => chapterRows[items[0].dataIndex][0] } } },
        scales: { y: { min: 0, max: 30, ticks: { stepSize: 10 }, grid: { color: grid } }, x: { grid: { display: false } } },
      },
    }),
    new Chart(radarCanvas, {
      type: 'radar',
      data: {
        labels: kindRows.map((r) => r[0]),
        datasets: [{
          label: '失誤次數', data: kindRows.map((r) => r[1]),
          backgroundColor: 'rgba(255, 138, 61, .25)', borderColor: accent, pointBackgroundColor: accent,
        }],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { r: { beginAtZero: true, ticks: { display: false, precision: 0 }, grid: { color: grid }, angleLines: { color: grid }, pointLabels: { font: { size: 13 } } } },
      },
    }),
  ];
  return () => charts.forEach((c) => c.destroy());
}
