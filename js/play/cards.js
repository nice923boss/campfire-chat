// Full-screen cards of the play screen: scene intro, bad ending, good ending,
// the notes review and the dialogue log. Pure builders; the controller wires
// the callbacks.

import { h } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { KIND_LABELS, NOTE_LABELS, levelLabel } from '../ui/labels.js';
import { starRow } from '../ui/chrome.js';

const btn = (cls, label, onclick, iconName) => h('button', { class: `btn ${cls}`, type: 'button', onclick },
  iconName ? h('span', { html: icon(iconName) }) : null, label);

export function sceneCard({ level, meta, onStart }) {
  return h('article', { class: 'card card--scene', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'scene-title' },
    h('p', { class: 'card__kicker' }, `${meta.chapter.title.zh}・${levelLabel(meta)}・${meta.chapter.cefr}`),
    h('h2', { class: 'card__title', id: 'scene-title' }, h('span', { lang: 'en' }, meta.title.en), h('small', {}, meta.title.zh)),
    h('dl', { class: 'scene-facts' },
      h('div', {}, h('dt', { html: icon('pin', { label: '地點' }) }),
        h('dd', {}, h('span', { lang: 'en' }, level.location.en), h('small', {}, level.location.zh))),
      h('div', {}, h('dt', { html: icon('flame', { label: '任務' }) }),
        h('dd', {}, h('span', { lang: 'en' }, level.goal.en), h('small', {}, level.goal.zh)))),
    h('p', { class: 'card__hint' }, `共 ${level.steps.length} 題。點畫面或按空白鍵繼續對話，選項可按 1、2、3。`),
    h('div', { class: 'card__actions' }, btn('btn--primary btn--lg', '開始對話', onStart, 'play')));
}

export function badCard({ choice, isNew, found, total, onRetry, onMap }) {
  const { fail } = choice;
  const kind = KIND_LABELS[fail.kind] || { zh: fail.kind, en: '', tip: '' };
  const said = h('span', { class: 'ending__said-text', lang: 'en' }, choice.en);
  const card = h('article', { class: 'card ending ending--bad', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ending-title' },
    h('div', { class: 'ending__stamp', 'aria-hidden': 'true' }, 'BAD END'),
    h('p', { class: 'card__kicker' }, '壞結局', isNew ? h('span', { class: 'badge badge--new' }, '新結局') : null),
    h('h2', { class: 'card__title', id: 'ending-title' }, h('span', { lang: 'en' }, fail.title.en), h('small', {}, fail.title.zh)),
    h('p', { class: 'ending__story', lang: 'en' }, fail.story.en),
    h('p', { class: 'ending__story-zh' }, fail.story.zh),
    h('section', { class: 'ending__why' },
      h('p', { class: 'ending__said' }, h('span', { class: 'ending__label' }, '你說了'), said),
      h('p', { class: 'kind-chip', dataset: { kind: fail.kind } }, h('strong', {}, kind.zh), h('span', { lang: 'en' }, kind.en)),
      h('p', { class: 'ending__explain' }, fail.why),
      kind.tip ? h('p', { class: 'ending__tip' }, h('span', { html: icon('help', { size: 16 }) }), kind.tip) : null),
    h('p', { class: 'ending__count' }, `本關已發現結局 ${found} / ${total}`),
    h('div', { class: 'card__actions' },
      btn('btn--primary btn--lg', '重試這一題', onRetry, 'retry'),
      btn('btn--ghost', '回關卡地圖', onMap, 'map')));
  return { card, said };
}

export function clearCard({ level, stars, mistakes, fails, result, nextMeta, onNotes }) {
  const kinds = [...new Set(fails.map((f) => f.kind))];
  const badges = [
    result.firstClear ? h('span', { class: 'badge badge--good' }, '首次通關') : null,
    !result.firstClear && result.newBest ? h('span', { class: 'badge badge--good' }, '刷新紀錄') : null,
    result.firstClear && nextMeta ? h('span', { class: 'badge badge--unlock' }, `解鎖第 ${nextMeta.number} 關`) : null,
  ];
  const starsEl = starRow(stars, 3, 'stars stars--big');
  const card = h('article', { class: 'card ending ending--good', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ending-title' },
    h('div', { class: 'ending__stamp', 'aria-hidden': 'true' }, 'GOOD END'),
    h('p', { class: 'card__kicker' }, '好結局', badges),
    h('h2', { class: 'card__title', id: 'ending-title' }, h('span', { lang: 'en' }, level.good.title.en), h('small', {}, level.good.title.zh)),
    h('p', { class: 'ending__story', lang: 'en' }, level.good.story.en),
    h('p', { class: 'ending__story-zh' }, level.good.story.zh),
    starsEl,
    h('p', { class: 'ending__score' }, mistakes === 0 ? '零失誤通關！' : `這一關失誤 ${mistakes} 次`),
    kinds.length
      ? h('p', { class: 'ending__kinds' }, '踩過的坑：', kinds.map((k) => h('span', { class: 'kind-chip kind-chip--sm', dataset: { kind: k } }, KIND_LABELS[k]?.zh || k)))
      : null,
    h('div', { class: 'card__actions' }, btn('btn--primary btn--lg', '營火邊的重點整理', onNotes, 'book')));
  return { card, stars: [...starsEl.querySelectorAll('.star')] };
}

function speakBtn(text, onSpeak, label) {
  return h('button', {
    class: 'icon-btn icon-btn--sm', type: 'button', 'aria-label': label, title: label, html: icon('speaker', { size: 18 }),
    onclick: () => onSpeak(text),
  });
}

export function noteCard(note, onSpeak) {
  const phrase = h('span', { class: 'note__phrase' }, note.en);
  const el = h('article', { class: 'note', dataset: { type: note.type } },
    h('header', { class: 'note__head' },
      h('span', { class: 'note__type' }, NOTE_LABELS[note.type] || note.type),
      onSpeak ? speakBtn(note.en, onSpeak, '朗讀這個重點') : null),
    h('p', { class: 'note__en', lang: 'en' }, phrase),
    h('p', { class: 'note__zh' }, note.zh),
    h('p', { class: 'note__explain' }, note.explain),
    note.example
      ? h('div', { class: 'note__example' },
        h('p', { lang: 'en' }, note.example.en, onSpeak ? speakBtn(note.example.en, onSpeak, '朗讀例句') : null),
        h('p', { class: 'note__example-zh' }, note.example.zh))
      : null);
  return { el, phrase };
}

// actions: { onNext?, onReplay, onMap, onShare, onCertificate? }
export function notesPanel({ level, meta, mentor, mentorImg, stars, onSpeak, actions }) {
  const cards = level.notes.map((n) => noteCard(n, onSpeak));
  const say = stars === 3 ? '完美的一關！一起把重點再看一次。' : '這幾句學起來，下次就不會卡住了。';
  const panel = h('section', { class: 'notes-panel', 'aria-labelledby': 'notes-title' },
    h('header', { class: 'notes-panel__head' },
      h('img', { class: 'notes-panel__mentor', src: mentorImg, alt: mentor.name }),
      h('div', { class: 'bubble' },
        h('strong', {}, `${mentor.name} ${mentor.nameZh}`),
        h('p', {}, say)),
      h('h2', { class: 'notes-panel__title', id: 'notes-title' }, `${levelLabel(meta)}重點整理`, h('small', { lang: 'en' }, meta.title.en))),
    h('div', { class: 'notes-panel__list' }, cards.map((c) => c.el)),
    h('footer', { class: 'notes-panel__actions' },
      actions.onNext ? btn('btn--primary btn--lg', '下一關', actions.onNext, 'next') : null,
      actions.onCertificate ? btn('btn--primary btn--lg', '下載結業證書', actions.onCertificate, 'download') : null,
      btn('btn--glass', '重玩這一關', actions.onReplay, 'retry'),
      btn('btn--glass', '分享成績', actions.onShare, 'share'),
      btn('btn--ghost', '回關卡地圖', actions.onMap, 'map')));
  return { panel, phrases: cards.map((c) => c.phrase) };
}

// history: [{ name, en, zh, kind }]
export function logDialog(history) {
  const dlg = h('dialog', { class: 'modal modal--log', 'aria-labelledby': 'log-title' },
    h('header', { class: 'modal__head' },
      h('h2', { class: 'modal__title', id: 'log-title' }, '對話紀錄'),
      h('button', { class: 'icon-btn', type: 'button', 'aria-label': '關閉', html: icon('x'), onclick: () => dlg.close() })),
    history.length
      ? h('ol', { class: 'log' }, history.map((e) => h('li', { class: `log__item log__item--${e.kind}` },
        e.name ? h('strong', { class: 'log__name' }, e.name) : null,
        h('p', { lang: 'en' }, e.en),
        e.zh ? h('p', { class: 'log__zh' }, e.zh) : null)))
      : h('p', { class: 'empty' }, '還沒有對話。'));
  dlg.addEventListener('close', () => dlg.remove());
  return dlg;
}
