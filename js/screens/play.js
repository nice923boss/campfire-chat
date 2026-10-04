// Play screen: runs one level through the engine state machine and renders
// each phase (dialogue, choices, bad ending, good ending, notes).

import { h, clear, toast, confirmDialog } from '../ui/dom.js';
import { icon } from '../ui/icons.js';
import { levelLabel } from '../ui/labels.js';
import { runTour } from '../ui/tour.js';
import { downloadCard, downloadCertificate } from '../ui/share.js';
import { loadLevel, speakerName } from '../data.js';
import { bgImage, spriteImage, uiImage } from '../assets.js';
import {
  createRun, advance, choose, retry, currentLine, pickedChoice, allEndings, starsFor,
} from '../engine.js';
import { isUnlocked, levelOrder, totals } from '../store.js';
import { createDialog } from '../play/dialog.js';
import { createSprites } from '../play/sprites.js';
import { sceneCard, badCard, clearCard, notesPanel, logDialog } from '../play/cards.js';
import { mark } from '../fx/notation.js';
import { celebrate, sparks } from '../fx/celebrate.js';
import * as motion from '../fx/motion.js';
import * as sfx from '../audio/sfx.js';
import * as tts from '../audio/tts.js';

const LINE_PHASES = new Set(['intro', 'lines', 'reaction', 'outro']);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function speakerKind(who) {
  if (who === 'narrator') return 'narrator';
  return who === 'player' ? 'player' : 'npc';
}

export async function mount(root, params, ctx) {
  const { core, store, unlockAll, go } = ctx;
  const id = String(params[0] || '').toUpperCase();
  const meta = core.levelIndex.get(id);
  if (!meta) throw new Error(`找不到關卡 ${id || '（未指定）'}`);
  const mapRoute = `map/${meta.chapter.id}`;
  if (!isUnlocked(store.get(), core.game, id, unlockAll)) {
    toast('這一關還沒解鎖，先完成前一關吧。');
    go(mapRoute);
    return () => {};
  }

  const level = await loadLevel(id).catch((err) => {
    throw new Error(`第 ${meta.number} 關的對話檔讀取失敗（${err.message}）`);
  });
  const order = levelOrder(core.game);
  const nextId = order[order.indexOf(id) + 1] || null;
  const nextMeta = nextId ? core.levelIndex.get(nextId) : null;
  const isFinal = !nextId;
  const settings = () => store.get().settings;
  store.setLast(id);

  // ---- DOM ----
  const bgEl = h('div', { class: 'stage__bg' });
  const spritesEl = h('div', { class: 'sprites' });
  const stepsEl = h('ol', { class: 'hud__steps', 'aria-label': '題目進度' },
    level.steps.map((_, i) => h('li', { class: 'hud__step' }, h('span', { class: 'sr-only' }, `第 ${i + 1} 題`))));
  const toolBtn = (tool, label, onclick) => h('button', {
    class: 'icon-btn', type: 'button', dataset: { tool }, 'aria-label': label, title: label,
    onclick: (e) => { onclick(); e.currentTarget.blur(); },
  });
  const zhBtn = toolBtn('zh', '中文字幕', () => store.setting('zhLines', !settings().zhLines));
  const ttsBtn = tts.supported() ? toolBtn('tts', '語音朗讀', () => {
    const on = !settings().tts;
    store.setting('tts', on);
    if (!on) tts.stop();
  }) : null;
  const logBtn = toolBtn('log', '對話紀錄', () => openLog());
  logBtn.innerHTML = icon('log');
  const tipbar = h('div', { class: 'tipbar', role: 'status' });
  const choicesEl = h('div', { class: 'choices', role: 'group', 'aria-label': '選擇你的回答', hidden: true });
  const dialog = createDialog({ onVoice: () => speakLine(lastLine) });
  const overlayEl = h('div', { class: 'overlay', hidden: true });
  const stage = h('div', { class: 'stage' },
    bgEl,
    h('div', { class: 'stage__shade' }),
    spritesEl,
    h('header', { class: 'hud' },
      h('button', { class: 'icon-btn', type: 'button', 'aria-label': '離開關卡', title: '離開關卡', html: icon('back'), onclick: () => confirmLeave() }),
      h('div', { class: 'hud__title' },
        h('span', { class: 'hud__no' }, levelLabel(meta)),
        h('strong', {}, meta.title.zh),
        h('small', { lang: 'en' }, meta.title.en)),
      stepsEl,
      h('div', { class: 'hud__tools' }, zhBtn, ttsBtn, logBtn)),
    tipbar,
    h('div', { class: 'dock' }, choicesEl, dialog.el),
    overlayEl);
  root.append(stage);

  function paintSettings(s) {
    stage.classList.toggle('zh-off', !s.zhLines);
    stage.classList.toggle('zh-choices', s.zhChoices);
    zhBtn.innerHTML = icon('zh');
    zhBtn.setAttribute('aria-pressed', String(s.zhLines));
    if (ttsBtn) {
      ttsBtn.innerHTML = icon(s.tts ? 'speaker' : 'mute');
      ttsBtn.setAttribute('aria-pressed', String(s.tts));
    }
  }
  paintSettings(settings());
  const unsubscribe = store.subscribe((s) => paintSettings(s.settings));

  const [bgUrl, sprites] = await Promise.all([
    bgImage(id, meta.title.en),
    createSprites(spritesEl, level.cast, core.cast),
  ]);
  bgEl.style.backgroundImage = `url("${bgUrl}")`;

  // ---- run state ----
  let state = createRun(level);
  let busy = false;
  let disposed = false;
  let lastLine = null;
  let history = [];
  let lastFail = null;
  let tour = null;
  let annotations = [];

  function updateSteps() {
    [...stepsEl.children].forEach((li, i) => {
      li.classList.toggle('is-done', i < state.step || state.phase === 'clear');
      li.classList.toggle('is-current', i === state.step && state.phase !== 'clear' && state.phase !== 'outro');
    });
  }

  function speakLine(line) {
    if (!line || !settings().tts) return;
    const gender = line.who === 'narrator' ? 'narrator' : (core.cast[line.who]?.gender || 'neutral');
    dialog.speak(line.en, { gender, rate: settings().rate });
  }

  function openOverlay(content) {
    clear(overlayEl).append(content);
    overlayEl.hidden = false;
    stage.classList.add('has-overlay');
    overlayEl.scrollTop = 0;
    content.querySelector('button')?.focus({ preventScroll: true });
  }

  function closeOverlay() {
    annotations.forEach((a) => a?.remove());
    annotations = [];
    clear(overlayEl);
    overlayEl.hidden = true;
    stage.classList.remove('has-overlay');
  }

  // ---- phases ----
  function render() {
    if (disposed) return;
    updateSteps();
    tipbar.classList.toggle('is-in', state.phase === 'reaction' && Boolean(pickedChoice(level, state)?.ok));
    if (LINE_PHASES.has(state.phase)) showLine();
    else if (state.phase === 'choose') showChoices();
    else if (state.phase === 'bad') showBad();
    else if (state.phase === 'clear') showClear();
  }

  function showLine() {
    const line = currentLine(level, state);
    if (!line) { state = advance(level, state); render(); return; }
    const kind = speakerKind(line.who);
    const speaker = speakerName(core.cast, line.who);
    choicesEl.hidden = true;
    dialog.setWaiting(false);
    sprites.focus(line.who, line.expr);
    // First NPC reaction to a wrong answer: make it land.
    if (state.phase === 'reaction' && state.line === 1 && !pickedChoice(level, state).ok) {
      sfx.play('wrong');
      sprites.shake(line.who);
    }
    lastLine = line;
    history = [...history, { kind, name: speaker ? `${speaker.en} ${kind === 'player' ? '（你）' : speaker.zh}` : '', en: line.en, zh: line.zh }];
    dialog.show(line, { speaker, kind, speed: settings().textSpeed });
    speakLine(line);
  }

  function onAdvance() {
    if (disposed || busy || !overlayEl.hidden || !LINE_PHASES.has(state.phase)) return;
    if (dialog.isTyping()) { dialog.finish(); return; }
    tts.stop();
    sfx.play('advance');
    state = advance(level, state);
    render();
  }

  function showChoices() {
    const step = level.steps[state.step];
    dialog.setWaiting(true);
    clear(choicesEl);
    state.order.forEach((choiceIdx, displayIdx) => {
      const c = step.choices[choiceIdx];
      choicesEl.append(h('button', { class: 'choice', type: 'button', onclick: () => pick(displayIdx) },
        h('span', { class: 'choice__key', 'aria-hidden': 'true' }, String(displayIdx + 1)),
        h('span', { class: 'choice__text' },
          h('span', { class: 'choice__en', lang: 'en' }, c.en),
          h('span', { class: 'choice__zh' }, c.zh))));
    });
    choicesEl.hidden = false;
    motion.stagger(choicesEl.children, { y: 14, each: 0.07 });
    if (!store.get().tours.play) runTour('play', store).then((t) => { if (disposed) t?.destroy?.(); else tour = t; });
  }

  async function pick(displayIdx) {
    if (busy || state.phase !== 'choose' || !overlayEl.hidden) return;
    busy = true;
    tts.stop();
    state = choose(level, state, displayIdx);
    const choice = pickedChoice(level, state);
    const buttons = [...choicesEl.children];
    buttons.forEach((b, i) => {
      b.disabled = true;
      b.classList.toggle('is-picked', i === displayIdx);
      b.classList.toggle('is-faded', i !== displayIdx);
    });
    if (choice.ok) {
      sfx.play('correct');
      buttons[displayIdx].classList.add('is-correct');
      clear(tipbar).append(h('span', { html: icon('check', { size: 18 }) }), h('strong', {}, '說得好！'), h('span', {}, choice.tip));
    } else {
      sfx.play('select');
      const fail = state.fails[state.fails.length - 1];
      const seen = store.get().endings[id] || [];
      lastFail = { key: fail.key, isNew: !seen.includes(fail.key) };
      store.recordFail(id, fail.key, fail.kind);
    }
    await wait(choice.ok ? 700 : 450);
    if (disposed) return;
    busy = false;
    render();
  }

  async function showBad() {
    tts.stop();
    sfx.play('bad');
    motion.shake(stage);
    const choice = pickedChoice(level, state);
    const found = (store.get().endings[id] || []).length;
    const { card, said } = badCard({
      choice,
      isNew: Boolean(lastFail?.isNew),
      found,
      total: allEndings(level).length,
      onRetry: doRetry,
      onMap: () => go(mapRoute),
    });
    openOverlay(card);
    await motion.cardIn(card, 'bad');
    if (disposed || !said.isConnected) return;
    annotations = [...annotations, await mark(said, 'crossed-off', { color: '#ff5e3a', strokeWidth: 2.5, animationDuration: 600 })];
  }

  function doRetry() {
    closeOverlay();
    sprites.reset();
    state = retry(level, state);
    sfx.play('page');
    render();
  }

  async function showClear() {
    tts.stop();
    const stars = starsFor(state.mistakes);
    const result = store.recordClear(id, stars, state.mistakes);
    const { card, stars: starEls } = clearCard({
      level, stars, mistakes: state.mistakes, fails: state.fails, result, nextMeta, onNotes: showNotes,
    });
    starEls.forEach((s) => { s.style.opacity = '0'; });
    openOverlay(card);
    sfx.play('clear');
    celebrate(stars);
    if (isFinal) sparks(5);
    await motion.cardIn(card, 'good');
    for (const [i, s] of starEls.entries()) {
      if (disposed) return;
      s.style.opacity = '';
      motion.pop(s);
      if (i < stars) sfx.play('star');
      await wait(220);
    }
    if (result.firstClear && nextMeta) sfx.play('unlock');
  }

  async function showNotes() {
    sfx.play('page');
    const mentor = core.cast[core.game.mentor];
    const [mentorImg, campUrl] = await Promise.all([
      spriteImage(core.game.mentor, mentor.name, 'happy'),
      uiImage('campfire', ''),
    ]);
    if (disposed) return;
    const stars = store.get().levels[id]?.stars || 0;
    const speakNote = (text) => tts.speak(text, { gender: mentor.gender, rate: settings().rate });
    const shareCard = () => downloadCard({
      kicker: `Campfire Chat・${levelLabel(meta)}`,
      title: meta.title.en,
      subtitle: meta.title.zh,
      stars: starsFor(state.mistakes),
      lines: level.notes.slice(0, 3).map((n) => `${n.en}　${n.zh}`),
      filename: `campfire-chat-${id}.png`,
    });
    const { panel, phrases } = notesPanel({
      level, meta, mentor, mentorImg, stars, onSpeak: tts.supported() ? speakNote : null,
      actions: {
        onNext: nextId ? () => go(`play/${nextId}`) : null,
        onCertificate: isFinal ? () => downloadCertificate(totals(store.get(), core.game)) : null,
        onReplay: () => go(`play/${id}`),
        onShare: shareCard,
        onMap: () => go(mapRoute),
      },
    });
    closeOverlay();
    overlayEl.classList.add('overlay--notes');
    if (!campUrl.startsWith('data:')) overlayEl.style.backgroundImage = `url("${campUrl}")`;
    spritesEl.hidden = true;
    ctx.embers.setMode('calm');
    openOverlay(panel);
    await motion.stagger(panel.querySelectorAll('.note, .notes-panel__actions .btn'), { y: 24, each: 0.08 });
    for (const p of phrases) {
      if (disposed || !p.isConnected) return;
      annotations = [...annotations, await mark(p, 'highlight', { color: 'rgba(255, 197, 102, .45)', animationDuration: 500, multiline: true })];
      await wait(160);
    }
  }

  function openLog() {
    const dlg = logDialog(history);
    stage.append(dlg);
    dlg.showModal();
  }

  async function confirmLeave() {
    if (state.phase === 'clear') { go(mapRoute); return; }
    const ok = await confirmDialog({
      title: '離開這一關？',
      body: '目前的對話進度不會保存，下次會從頭開始。',
      ok: '離開',
      cancel: '繼續玩',
    });
    if (ok && !disposed) go(mapRoute);
  }

  // ---- input ----
  function onStageClick(e) {
    if (e.target.closest('button, a, .hud, .choices, .overlay, dialog')) return;
    onAdvance();
  }

  function onKey(e) {
    if (disposed || e.repeat || e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.querySelector('dialog[open], .driver-popover')) return;
    if (!overlayEl.hidden) return;
    if (state.phase === 'choose' && /^[1-3]$/.test(e.key)) {
      e.preventDefault();
      pick(Number(e.key) - 1);
    } else if ((e.key === ' ' || e.key === 'Enter') && !e.target.closest?.('button, a')) {
      e.preventDefault();
      onAdvance();
    }
  }

  stage.addEventListener('click', onStageClick);
  window.addEventListener('keydown', onKey);

  openOverlay(sceneCard({
    level, meta,
    onStart: () => {
      closeOverlay();
      sprites.enter();
      sfx.play('select');
      render();
    },
  }));
  motion.cardIn(overlayEl.firstElementChild, 'good');

  return () => {
    disposed = true;
    tts.stop();
    unsubscribe();
    window.removeEventListener('keydown', onKey);
    annotations.forEach((a) => a?.remove());
    tour?.destroy?.();
  };
}
