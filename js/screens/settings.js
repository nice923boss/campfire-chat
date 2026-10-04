// Settings: subtitles, voice, sound, text speed, tours, progress reset and
// the credits for the open-source libraries the game loads.

import { h, toast } from '../ui/dom.js';
import { topbar, confirmReset } from '../ui/chrome.js';
import { DEFAULT_SETTINGS, totals } from '../store.js';
import * as tts from '../audio/tts.js';
import * as sfx from '../audio/sfx.js';
import * as ambient from '../audio/ambient.js';
import * as motion from '../fx/motion.js';

const TOGGLES = [
  { key: 'zhLines', label: '台詞中文字幕', hint: '每句英文台詞下方顯示中文。' },
  { key: 'zhChoices', label: '選項中文翻譯', hint: '選項下方顯示中文。關掉比較有挑戰性。' },
  { key: 'tts', label: '自動朗讀台詞', hint: '用瀏覽器內建語音念出英文台詞，並逐字標示。' },
  { key: 'sfx', label: '音效', hint: '點擊、答對、答錯等提示音。' },
  { key: 'ambient', label: '營火環境音', hint: '柴火聲與輕柔的五聲音階。' },
];

const SPEEDS = [['slow', '慢'], ['normal', '一般'], ['instant', '立即顯示']];

const CREDITS = [
  ['GSAP', '動畫', 'GreenSock Standard License'],
  ['simplex-noise', '火星飄動', 'MIT'],
  ['canvas-confetti', '通關彩帶', 'ISC'],
  ['ZzFX', '音效合成', 'MIT'],
  ['Tone.js', '營火環境音', 'MIT'],
  ['Rough Notation', '手繪重點標記', 'MIT'],
  ['Driver.js', '新手導覽', 'MIT'],
  ['Chart.js', '學習紀錄圖表', 'MIT'],
  ['Fuse.js', '筆記模糊搜尋', 'Apache-2.0'],
  ['html-to-image', '成績卡與證書', 'MIT'],
  ['qr-code-styling', '分享 QR Code', 'MIT'],
];

function row(label, hint, control) {
  return h('div', { class: 'setting' },
    h('div', { class: 'setting__text' }, h('span', { class: 'setting__label' }, label), hint ? h('small', { class: 'setting__hint' }, hint) : null),
    control);
}

export async function mount(root, _params, ctx) {
  const { core, store } = ctx;
  const get = (key) => store.get().settings[key];
  const voiceOk = tts.supported();

  const switches = TOGGLES.map((t) => {
    const disabled = t.key === 'tts' && !voiceOk;
    const input = h('input', {
      type: 'checkbox', class: 'switch__input', role: 'switch', disabled,
      onchange: async (e) => {
        const on = e.target.checked;
        store.setting(t.key, on);
        if (t.key === 'ambient') { if (on) await ambient.start(); else ambient.stop(); }
        if (t.key === 'tts' && !on) tts.stop();
        sfx.play('tap');
      },
    });
    input.checked = get(t.key);
    return { key: t.key, input, el: row(t.label, disabled ? '這個瀏覽器不支援語音朗讀。' : t.hint, h('label', { class: 'switch' }, input, h('span', { class: 'switch__track', 'aria-hidden': 'true' }), h('span', { class: 'sr-only' }, t.label))) };
  });

  const rateOut = h('output', { class: 'range__value' }, `${get('rate').toFixed(2)}x`);
  const rate = h('input', {
    type: 'range', class: 'range', min: '0.6', max: '1.2', step: '0.05', value: String(get('rate')),
    'aria-label': '朗讀速度', disabled: !voiceOk,
    oninput: (e) => { rateOut.textContent = `${Number(e.target.value).toFixed(2)}x`; },
    onchange: (e) => store.setting('rate', Number(e.target.value)),
  });
  const testVoice = h('button', {
    class: 'btn btn--ghost btn--sm', type: 'button', disabled: !voiceOk,
    onclick: () => tts.speak("Hi, I'm Ember. Let's talk by the campfire.", { gender: 'female', rate: get('rate') }),
  }, '試聽');

  const speeds = h('div', { class: 'segmented', role: 'radiogroup', 'aria-label': '文字速度' },
    SPEEDS.map(([value, label]) => {
      const input = h('input', {
        type: 'radio', name: 'textSpeed', value, class: 'sr-only',
        onchange: () => { store.setting('textSpeed', value); sfx.play('tap'); },
      });
      input.checked = get('textSpeed') === value;
      return h('label', { class: 'segmented__opt' }, input, h('span', {}, label));
    }));

  const saveNotice = store.lastError()
    ? h('p', { class: 'notice notice--bad', role: 'alert' }, '目前無法儲存進度（可能是無痕模式或儲存空間已滿）。可以繼續玩，但關閉頁面後進度會消失。')
    : null;

  const t = totals(store.get(), core.game);

  root.append(
    topbar(ctx, { title: '設定', active: 'settings' }),
    h('section', { class: 'settings' },
      saveNotice,
      h('article', { class: 'panel' },
        h('h2', { class: 'panel__title' }, '字幕與聲音'),
        switches.map((s) => s.el),
        row('朗讀速度', '數字越小越慢，初學建議 0.8 到 0.9。', h('div', { class: 'range-wrap' }, rate, rateOut, testVoice)),
        row('文字速度', '台詞逐字出現的速度。', speeds)),
      h('article', { class: 'panel' },
        h('h2', { class: 'panel__title' }, '導覽與進度'),
        row('重看新手導覽', '下次進入關卡地圖和對話畫面時再顯示一次說明。', h('button', {
          class: 'btn btn--ghost btn--sm', type: 'button',
          onclick: () => { store.resetTours(); sfx.play('tap'); toast('導覽已重設，回到地圖就會看到。', { tone: 'good' }); },
        }, '重看導覽')),
        row('重設學習進度', `目前已通關 ${t.cleared} 關、${t.stars} 顆星。設定會保留。`, h('button', {
          class: 'btn btn--danger btn--sm', type: 'button',
          onclick: () => confirmReset(ctx),
        }, '清除進度'))),
      h('article', { class: 'panel panel--about' },
        h('h2', { class: 'panel__title' }, '關於'),
        h('p', {}, 'Campfire Chat 營火英語對話：100 個生活情境、選擇式英語對話練習。所有進度只存在這台裝置的瀏覽器裡。'),
        h('p', { class: 'muted' }, '以下開源元件由 jsDelivr CDN 載入，載入失敗時遊戲會改用簡化效果，仍可正常遊玩。'),
        h('ul', { class: 'credits' }, CREDITS.map(([name, use, license]) => h('li', {},
          h('strong', {}, name), h('span', {}, use), h('small', {}, license)))),
        h('button', {
          class: 'btn btn--ghost btn--sm', type: 'button',
          onclick: () => {
            Object.entries(DEFAULT_SETTINGS).forEach(([k, v]) => store.setting(k, v));
            ambient.stop();
            ctx.go('settings'); // re-render with the restored values
            toast('設定已恢復預設值。');
          },
        }, '恢復預設設定'))));

  motion.stagger(root.querySelectorAll('.panel'), { y: 18, each: 0.07 });

  // Keep switches in sync when the top-bar ambience button changes a setting.
  const unsubscribe = store.subscribe((s) => {
    switches.forEach(({ key, input }) => { input.checked = s.settings[key]; });
  });
  return () => unsubscribe();
}
