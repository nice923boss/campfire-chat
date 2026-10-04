import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  createRun, advance, choose, retry, currentLine, currentLines, allEndings, endingKey, starsFor, progress, shuffle,
} from '../js/engine.js';
import { sampleLevel, seq } from './fixtures.mjs';

const level = sampleLevel();

// Press "next" until the phase changes; returns the new state.
function skipLines(state) {
  const phase = state.phase;
  let s = state;
  for (let guard = 0; s.phase === phase && guard < 20; guard++) s = advance(level, s);
  return s;
}

// Display index of the choice whose original index is choiceIdx.
const slotOf = (state, choiceIdx) => state.order.indexOf(choiceIdx);

test('createRun starts at intro with a full permutation as choice order', () => {
  const run = createRun(level, seq(0.1, 0.9, 0.5));
  assert.equal(run.phase, 'intro');
  assert.equal(run.step, 0);
  assert.deepEqual([...run.order].sort(), [0, 1, 2]);
  assert.equal(run.mistakes, 0);
});

test('createRun rejects a level without steps', () => {
  assert.throws(() => createRun({ id: 'X', steps: [] }), /no steps/);
});

test('a perfect run goes intro -> lines -> choose -> reaction -> ... -> clear', () => {
  let s = createRun(level, seq(0.3));
  assert.equal(currentLine(level, s).en, 'Morning.');
  s = skipLines(s);
  assert.equal(s.phase, 'lines');
  assert.equal(currentLine(level, s).en, 'Hi!');
  s = advance(level, s);
  assert.equal(currentLine(level, s).en, 'Coffee?');
  s = advance(level, s);
  assert.equal(s.phase, 'choose');

  s = choose(level, s, slotOf(s, 1));
  assert.equal(s.phase, 'reaction');
  assert.deepEqual(currentLines(level, s), [{ who: 'player', en: 'Yes, please.', zh: '對的選項' }]);
  s = advance(level, s);
  assert.equal(s.phase, 'lines');
  assert.equal(s.step, 1);

  s = skipLines(s);
  s = choose(level, s, slotOf(s, 0));
  s = advance(level, s);
  assert.equal(s.phase, 'outro');
  assert.equal(currentLine(level, s).en, 'Enjoy!');
  s = advance(level, s);
  assert.equal(s.phase, 'clear');
  assert.equal(s.mistakes, 0);
  assert.equal(progress(level, s), 1);
});

test('a wrong pick shows player + NPC reaction, then the bad ending, and counts the mistake', () => {
  let s = skipLines(skipLines(createRun(level, seq(0.3))));
  const before = s;
  s = choose(level, s, slotOf(s, 2));
  assert.equal(s.mistakes, 1);
  assert.deepEqual(s.fails, [{ key: endingKey(0, 2), kind: 'grammar' }]);
  assert.equal(currentLines(level, s).length, 2);
  assert.equal(currentLines(level, s)[0].who, 'player');
  s = skipLines(s);
  assert.equal(s.phase, 'bad');
  assert.deepEqual(before.fails, [], 'input state is not mutated');
});

test('retry replays the same question and moves the correct answer to another slot', () => {
  let s = skipLines(skipLines(createRun(level, seq(0.3))));
  const okSlotBefore = slotOf(s, 1);
  s = skipLines(choose(level, s, slotOf(s, 0)));
  // rng reproduces the old order [1,2,0] first, then gives [0,1,2].
  s = retry(level, s, seq(0.3, 0.3, 0.9, 0.9));
  assert.equal(s.phase, 'lines');
  assert.equal(s.step, 0);
  assert.equal(s.picked, null);
  assert.notEqual(slotOf(s, 1), okSlotBefore);
  assert.equal(s.mistakes, 1, 'mistakes are kept after retry');
});

test('choose and retry ignore calls in the wrong phase', () => {
  const s = createRun(level);
  assert.equal(choose(level, s, 0), s);
  assert.equal(retry(level, s), s);
});

test('allEndings lists the good ending plus every wrong choice', () => {
  assert.deepEqual(allEndings(level), ['good', 'bad:0:0', 'bad:0:2', 'bad:1:1', 'bad:1:2']);
});

test('starsFor: 0 mistakes = 3, 1-2 = 2, 3+ = 1', () => {
  assert.deepEqual([0, 1, 2, 3, 9].map(starsFor), [3, 2, 2, 1, 1]);
});

test('shuffle returns a new permutation and leaves the input alone', () => {
  const input = [1, 2, 3, 4];
  const out = shuffle(input, seq(0));
  assert.deepEqual(input, [1, 2, 3, 4]);
  assert.deepEqual([...out].sort(), [1, 2, 3, 4]);
  assert.notEqual(out, input);
});
