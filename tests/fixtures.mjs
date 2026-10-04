// Small hand-made level shared by the engine tests.

const line = (who, en, zh) => ({ who, en, zh });
const wrong = (en, kind) => ({
  en,
  zh: '錯的選項',
  ok: false,
  fail: { kind, lines: [line('mia', 'Hmm?', '嗯？')], title: { en: 'Oops', zh: '糟糕' }, story: { en: 'It went wrong.', zh: '出錯了。' }, why: '說明' },
});
const right = (en) => ({ en, zh: '對的選項', ok: true, tip: '提示' });

export function sampleLevel() {
  return {
    id: 'L001',
    cast: ['mia'],
    intro: [line('narrator', 'Morning.', '早上。')],
    steps: [
      { lines: [line('mia', 'Hi!', '嗨！'), line('mia', 'Coffee?', '咖啡？')], choices: [wrong('No.', 'tone'), right('Yes, please.'), wrong('Coffee is.', 'grammar')] },
      { lines: [line('mia', 'Sugar?', '糖？')], choices: [right('No, thanks.'), wrong('Sugar me.', 'literal'), wrong('Bye.', 'offtopic')] },
    ],
    good: { lines: [line('mia', 'Enjoy!', '慢用！')], title: { en: 'Nice', zh: '很好' }, story: { en: 'Good.', zh: '好。' } },
  };
}

// Deterministic rng: cycles through the given values.
export function seq(...values) {
  let i = 0;
  return () => values[i++ % values.length];
}
