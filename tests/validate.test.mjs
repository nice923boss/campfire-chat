import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateLevel, validateAll, nameMatchers } from '../tools/validate.mjs';

const cast = {
  mia: { name: 'Mia', nameZh: '米亞' },
  sam: { name: 'Sam', nameZh: '山姆' },
};
const protagonist = { name: 'Kai', nameZh: '凱' };

function report() {
  const errors = [];
  const warnings = [];
  return { errors, warnings, error: (file, path, msg) => errors.push({ path, msg }), warn: (file, path, msg) => warnings.push({ path, msg }) };
}

const line = (who, en, zh) => ({ who, expr: who === 'mia' ? 'happy' : undefined, en, zh });
const fail = (kind) => ({
  kind,
  lines: [line('mia', 'Oh.', '喔。')],
  title: { en: 'Oops', zh: '糟糕' },
  story: { en: 'It went wrong.', zh: '出了點狀況。' },
  why: '這樣說太直接。',
});
const step = (kinds) => ({
  lines: [line('mia', 'Coffee?', '要咖啡嗎？')],
  choices: [
    { en: 'Yes, please.', zh: '好，麻煩了。', ok: true, tip: '用 please 比較禮貌。' },
    { en: 'Give.', zh: '給我。', ok: false, fail: fail(kinds[0]) },
    { en: 'Coffee is me.', zh: '咖啡是我。', ok: false, fail: fail(kinds[1]) },
  ],
});
const note = (type) => ({ type, en: 'Yes, please.', zh: '好，麻煩了。', explain: '禮貌地接受。', example: { en: 'Yes, please, Mia.', zh: '好，麻煩了，米亞。' } });

// A level that passes every chapter-1 rule.
function validLevel() {
  return {
    id: 'L001',
    location: { en: 'Kitchen', zh: '廚房' },
    goal: { en: 'Answer Mia.', zh: '回答米亞。' },
    background: 'small bright kitchen with a wooden table, morning sunlight through a window, two mugs on the counter',
    cast: ['mia'],
    intro: [line('narrator', 'Morning.', '早上。')],
    steps: [step(['tone', 'grammar']), step(['literal', 'offtopic']), step(['culture', 'tone'])],
    good: { lines: [line('mia', 'Great!', '太好了！')], title: { en: 'Nice', zh: '很好' }, story: { en: 'Good.', zh: '一切順利。' } },
    notes: [note('phrase'), note('grammar'), note('vocab'), note('trap')],
  };
}

function run(level) {
  const r = report();
  const stats = { steps: 0, correctLongest: 0, kinds: new Set() };
  validateLevel(r, 'L001.json', level, { expectedId: 'L001', chapterNo: 1, cast, stats, names: nameMatchers(cast, protagonist) });
  return r;
}

test('the reference level is valid', () => {
  const r = run(validLevel());
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.warnings, []);
});

test('em dash, simplified characters and Chinese in English fields are errors', () => {
  const level = validLevel();
  level.intro = [line('narrator', 'Morning — early.', '早上，这么早。')];
  level.goal = { en: 'Answer 米亞.', zh: '回答米亞。' };
  const msgs = run(level).errors.map((e) => `${e.path} ${e.msg}`);
  assert.ok(msgs.some((m) => m.startsWith('intro[0].en') && m.includes('U+2014')));
  assert.ok(msgs.some((m) => m.startsWith('intro[0].zh') && m.includes('简') === false && m.includes('含簡體字')));
  assert.ok(msgs.some((m) => m.startsWith('goal.en') && m.includes('英文欄位含中文字')));
});

test('English cast names inside Chinese text are errors (lines, choices, fail, notes example)', () => {
  const level = validLevel();
  level.steps[0].lines[0].zh = '要咖啡嗎，Kai？';
  level.steps[0].choices[1].fail.story.zh = 'Sam 嚇了一跳。';
  level.notes[0].example.zh = '好，麻煩了，Mia。';
  const errs = run(level).errors;
  assert.deepEqual(errs.map((e) => e.path), ['steps[0].lines[0].zh', 'steps[0].choices[1].fail.story.zh', 'notes[0].example.zh']);
  assert.equal(errs[0].msg, '中文用了英文名：Kai 改為 凱');
});

test('name check skips tip / why / explain and quoted all-English fragments', () => {
  const level = validLevel();
  level.steps[0].choices[0].tip = '跟 Mia 說 please 比較禮貌。';
  level.steps[0].choices[1].fail.why = 'Sam 會覺得你太直接。';
  level.notes[0].explain = '對 Mia 這樣說。';
  level.good.lines[0].zh = '「After Mia finish」？太好了！';
  assert.deepEqual(run(level).errors, []);
});

test('names inside longer words are not flagged', () => {
  const level = validLevel();
  level.location.zh = '廚房（Samsung 冰箱旁）';
  assert.deepEqual(run(level).errors, []);
});

test('structural rules: three choices, one correct answer, step count, notes need a trap or culture', () => {
  const level = validLevel();
  level.steps[0].choices[1] = { ...level.steps[0].choices[0] };
  level.steps.pop();
  level.notes = [note('phrase'), note('grammar'), note('vocab'), note('vocab')];
  const msgs = run(level).errors.map((e) => e.msg);
  assert.ok(msgs.includes('必須恰好 1 個正解，目前 2 個'));
  assert.ok(msgs.includes('本章每關需要 3 題，目前 2 題'));
  assert.ok(msgs.includes('至少需要 1 則 trap 或 culture 筆記'));
});

test('speakers must be in the level cast', () => {
  const level = validLevel();
  level.steps[1].lines[0].who = 'sam';
  assert.ok(run(level).errors.some((e) => e.msg === '說話者「sam」不在本關 cast 清單'));
});

test('nameMatchers merges entries that share an English name', () => {
  const merged = nameMatchers({ a: { name: 'Ann', nameZh: '安' }, b: { name: 'Ann', nameZh: '安妮' } }, protagonist);
  assert.deepEqual(merged.map((m) => `${m.en}:${m.zh}`), ['Ann:安或安妮', 'Kai:凱']);
});

test('two cast entries with the same English or Chinese name are errors', () => {
  const root = mkdtempSync(join(tmpdir(), 'campfire-validate-'));
  try {
    mkdirSync(join(root, 'data', 'cast'), { recursive: true });
    const person = (name, nameZh) => ({ name, nameZh, role: { en: 'Clerk', zh: '店員' }, gender: 'female', appearance: 'young woman, short hair, green apron' });
    writeFileSync(join(root, 'data', 'game.json'), JSON.stringify({ cast: ['core', 'ch01'], chapters: [] }));
    writeFileSync(join(root, 'data', 'cast', 'core.json'), JSON.stringify({ mia: person('Mia', '米亞') }));
    writeFileSync(join(root, 'data', 'cast', 'ch01.json'), JSON.stringify({ c01_a: person('Mia', '米婭'), c01_b: person('Nora', '米亞') }));
    const msgs = validateAll({ root }).errors.map((e) => e.msg);
    assert.deepEqual(msgs, ['英文名「Mia」與 mia 重複，請換名字', '中文名「米亞」與 mia 重複，請換名字']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('the shipped game data passes the validator with no errors', () => {
  const r = validateAll();
  assert.deepEqual(r.errors.map((e) => `${e.file} ${e.path} ${e.msg}`), []);
});
