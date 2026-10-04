// Dialogue box: speaker plate, word-by-word reveal, karaoke highlight while the
// line is read aloud, Chinese subtitle (hidden by a class on the stage).

import { h, clear } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { typeWords } from '../fx/motion.js';
import * as tts from '../audio/tts.js';

const MS_PER_WORD = { slow: 130, normal: 65, instant: 0 };

export function tokenize(text) {
  return [...String(text).matchAll(/\S+/g)].map((m) => ({ word: m[0], start: m.index, end: m.index + m[0].length }));
}

// Index of the word that contains charIndex (or the next word after it).
export function wordAt(tokens, charIndex) {
  const i = tokens.findIndex((t) => charIndex < t.end);
  return i === -1 ? tokens.length - 1 : i;
}

export function createDialog({ onVoice }) {
  const plate = h('div', { class: 'dialog__plate' });
  const en = h('p', { class: 'dialog__en', lang: 'en' });
  const zh = h('p', { class: 'dialog__zh' });
  const voice = tts.supported()
    ? h('button', {
      class: 'dialog__voice icon-btn', type: 'button', 'aria-label': '重播這一句', title: '重播這一句', html: icon('speaker'),
      onclick: (e) => { e.stopPropagation(); onVoice(); },
    })
    : null;
  const nextMark = h('span', { class: 'dialog__next', 'aria-hidden': 'true', html: icon('next', { size: 18 }) });
  const el = h('section', { class: 'dialog', 'aria-live': 'polite' }, plate, en, zh, voice, nextMark);

  let typing = { done: Promise.resolve(), finish() {} };
  let typingNow = false;
  let spans = [];
  let tokens = [];

  function highlight(charIndex) {
    const i = wordAt(tokens, charIndex);
    spans.forEach((s, j) => {
      s.classList.toggle('is-said', j < i);
      s.classList.toggle('is-current', j === i);
    });
  }

  function clearHighlight() {
    spans.forEach((s) => s.classList.remove('is-current', 'is-said'));
  }

  // speaker: { en, zh } or null; kind: 'npc' | 'player' | 'narrator'
  function show(line, { speaker, kind, speed = 'normal' }) {
    el.dataset.kind = kind;
    clear(plate);
    if (speaker) plate.append(h('span', { lang: 'en' }, speaker.en), h('small', {}, kind === 'player' ? '你' : speaker.zh));
    tokens = tokenize(line.en);
    spans = tokens.map((t) => h('span', { class: 'word' }, t.word));
    clear(en);
    spans.forEach((s, i) => en.append(s, i < spans.length - 1 ? ' ' : ''));
    zh.textContent = line.zh || '';
    typingNow = true;
    el.classList.add('is-typing');
    typing = typeWords(spans, MS_PER_WORD[speed] ?? MS_PER_WORD.normal);
    typing.done.then(() => {
      typingNow = false;
      el.classList.remove('is-typing');
    });
    return typing.done;
  }

  function speak(text, { gender, rate }) {
    clearHighlight();
    return tts.speak(text, { gender, rate, onWord: highlight, onEnd: clearHighlight });
  }

  return {
    el,
    show,
    speak,
    isTyping: () => typingNow,
    finish: () => typing.finish(),
    setWaiting: (on) => el.classList.toggle('is-waiting', on),
  };
}
