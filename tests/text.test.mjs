// Router hash parsing, dialogue word tokens, prompt seeds.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash } from '../js/router.js';
import { tokenize, wordAt } from '../js/play/dialog.js';
import { seedFor } from '../tools/export_prompts.mjs';

test('parseHash', () => {
  assert.deepEqual(parseHash(''), { name: 'title', params: [] });
  assert.deepEqual(parseHash('#/'), { name: 'title', params: [] });
  assert.deepEqual(parseHash('#/map'), { name: 'map', params: [] });
  assert.deepEqual(parseHash('#/play/L001'), { name: 'play', params: ['L001'] });
  assert.deepEqual(parseHash('#play/L001/'), { name: 'play', params: ['L001'] });
  assert.deepEqual(parseHash('#/notes/L001?x=1'), { name: 'notes', params: ['L001'] });
  assert.deepEqual(parseHash('#/a/%E5%87%B1'), { name: 'a', params: ['凱'] });
});

test('tokenize keeps punctuation with its word and records offsets', () => {
  const tokens = tokenize("Hi,  I'm Kai.");
  assert.deepEqual(tokens.map((t) => t.word), ['Hi,', "I'm", 'Kai.']);
  assert.deepEqual(tokens.map((t) => [t.start, t.end]), [[0, 3], [5, 8], [9, 13]]);
});

test('wordAt maps a speech boundary offset to the word being read', () => {
  const tokens = tokenize("Hi,  I'm Kai.");
  assert.equal(wordAt(tokens, 0), 0);
  assert.equal(wordAt(tokens, 4), 1, 'offset in the gap -> next word');
  assert.equal(wordAt(tokens, 9), 2);
  assert.equal(wordAt(tokens, 99), 2, 'past the end -> last word');
});

test('seedFor is stable FNV-1a (32-bit, unsigned)', () => {
  assert.equal(seedFor(''), 2166136261);
  assert.equal(seedFor('a'), 0xe40c292c);
  assert.equal(seedFor('char:mia'), seedFor('char:mia'));
  assert.notEqual(seedFor('bg:L001'), seedFor('bg:L002'));
});
