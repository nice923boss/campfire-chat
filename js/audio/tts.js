// Text-to-speech with the browser's Web Speech API.
// onWord(charIndex) fires on word boundaries when the voice supports them, so
// the dialogue box can highlight the word being spoken (karaoke style).

const synth = globalThis.speechSynthesis || null;
let voices = [];
let current = null;

function refreshVoices() {
  if (!synth) return;
  voices = synth.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
}

if (synth) {
  refreshVoices();
  synth.addEventListener?.('voiceschanged', refreshVoices);
}

export function supported() {
  return Boolean(synth && globalThis.SpeechSynthesisUtterance);
}

// Prefer local (offline) voices: they fire boundary events reliably.
function pickVoice(gender) {
  if (!voices.length) refreshVoices();
  const pool = voices.filter((v) => /en[-_](US|GB|CA|AU)/i.test(v.lang));
  const list = pool.length ? pool : voices;
  if (!list.length) return null;
  const femaleHint = /female|zira|aria|jenny|samantha|susan|hazel|libby|sonia|karen|moira|tessa|victoria/i;
  const maleHint = /\bmale\b|david|guy|mark|daniel|george|ryan|alex|fred|thomas/i;
  const hint = gender === 'female' ? femaleHint : gender === 'male' ? maleHint : null;
  const local = list.filter((v) => v.localService);
  const byHint = hint ? list.filter((v) => hint.test(v.name)) : [];
  const localHint = byHint.filter((v) => v.localService);
  return localHint[0] || byHint[0] || local[0] || list[0];
}

const PITCH = { female: 1.12, male: 0.88, neutral: 1, narrator: 0.96 };

export function stop() {
  if (synth) synth.cancel();
  current = null;
}

// Resolves when speech ends (or immediately when unsupported / cancelled).
export function speak(text, { gender = 'neutral', rate = 0.9, onWord, onEnd } = {}) {
  return new Promise((resolve) => {
    if (!supported() || !text) { onEnd?.(); resolve(false); return; }
    stop();
    const u = new SpeechSynthesisUtterance(text);
    const voice = pickVoice(gender);
    if (voice) { u.voice = voice; u.lang = voice.lang; } else { u.lang = 'en-US'; }
    u.rate = rate;
    u.pitch = PITCH[gender] ?? 1;
    u.onboundary = (e) => { if (current === u && e.name !== 'sentence') onWord?.(e.charIndex); };
    const done = (ok) => { if (current === u) current = null; onEnd?.(); resolve(ok); };
    u.onend = () => done(true);
    u.onerror = () => done(false);
    current = u;
    synth.speak(u);
  });
}
