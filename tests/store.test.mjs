import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  createStore, memoryStorage, STORAGE_KEY, DEFAULT_SETTINGS, isUnlocked, nextLevel, totals, levelOrder,
} from '../js/store.js';

const game = {
  chapters: [
    { levels: [{ id: 'L001' }, { id: 'L002' }] },
    { levels: [{ id: 'L011' }] },
  ],
};

test('a fresh store has default settings and no progress', () => {
  const store = createStore(memoryStorage());
  assert.deepEqual(store.get().settings, DEFAULT_SETTINGS);
  assert.deepEqual(store.get().levels, {});
});

test('progress survives a reload from the same storage', () => {
  const storage = memoryStorage();
  createStore(storage).recordClear('L001', 3, 0);
  assert.equal(createStore(storage).get().levels.L001.stars, 3);
});

test('recordClear keeps best stars / fewest mistakes and reports first clear', () => {
  const store = createStore(memoryStorage());
  assert.deepEqual(store.recordClear('L001', 2, 1), { firstClear: true, newBest: true });
  assert.deepEqual(store.recordClear('L001', 1, 4), { firstClear: false, newBest: false });
  assert.deepEqual(store.get().levels.L001, { stars: 2, best: 1, clears: 2 });
  assert.deepEqual(store.recordClear('L001', 3, 0), { firstClear: false, newBest: true });
  assert.deepEqual(store.get().endings.L001, ['good']);
});

test('recordFail counts the kind once per pick and stores each ending once', () => {
  const store = createStore(memoryStorage());
  store.recordFail('L001', 'bad:0:1', 'tone');
  store.recordFail('L001', 'bad:0:1', 'tone');
  store.recordFail('L001', 'bad:1:2', 'unknown-kind');
  assert.equal(store.get().kinds.tone, 2);
  assert.equal(store.get().kinds['unknown-kind'], undefined);
  assert.deepEqual(store.get().endings.L001, ['bad:0:1', 'bad:1:2']);
});

test('corrupt saved data falls back to an empty state', () => {
  const storage = memoryStorage();
  storage.setItem(STORAGE_KEY, '{not json');
  assert.deepEqual(createStore(storage).get().levels, {});
});

test('old saves get new fields with defaults', () => {
  const storage = memoryStorage();
  storage.setItem(STORAGE_KEY, JSON.stringify({ levels: { L001: { stars: 1, best: 3, clears: 1 } }, settings: { tts: false } }));
  const state = createStore(storage).get();
  assert.equal(state.settings.tts, false);
  assert.equal(state.settings.zhLines, DEFAULT_SETTINGS.zhLines);
  assert.deepEqual(state.tours, {});
});

test('a failing storage keeps the game running and exposes the error', () => {
  const storage = { getItem: () => null, setItem: () => { throw new Error('quota'); }, removeItem: () => {} };
  const store = createStore(storage);
  store.setting('tts', false);
  assert.equal(store.get().settings.tts, false);
  assert.match(store.lastError().message, /quota/);
});

test('markTour / resetTours and reset keep settings', () => {
  const store = createStore(memoryStorage());
  store.markTour('map');
  assert.deepEqual(store.get().tours, { map: true });
  store.resetTours();
  assert.deepEqual(store.get().tours, {});
  store.setting('rate', 1.2);
  store.recordClear('L001', 3, 0);
  store.reset();
  assert.deepEqual(store.get().levels, {});
  assert.equal(store.get().settings.rate, 1.2);
});

test('subscribe is notified on commit and can unsubscribe', () => {
  const store = createStore(memoryStorage());
  const seen = [];
  const off = store.subscribe((s) => seen.push(s.last));
  store.setLast('L002');
  off();
  store.setLast('L011');
  assert.deepEqual(seen, ['L002']);
});

test('unlocking follows play order across chapters; unlockAll opens everything', () => {
  const store = createStore(memoryStorage());
  assert.deepEqual(levelOrder(game), ['L001', 'L002', 'L011']);
  assert.equal(isUnlocked(store.get(), game, 'L001'), true);
  assert.equal(isUnlocked(store.get(), game, 'L002'), false);
  assert.equal(isUnlocked(store.get(), game, 'L011', true), true);
  store.recordClear('L001', 3, 0);
  store.recordClear('L002', 1, 5);
  assert.equal(isUnlocked(store.get(), game, 'L011'), true);
  assert.equal(isUnlocked(store.get(), game, 'L999'), false);
});

test('nextLevel and totals', () => {
  const store = createStore(memoryStorage());
  assert.equal(nextLevel(store.get(), game), 'L001');
  store.recordClear('L001', 3, 0);
  store.recordFail('L002', 'bad:0:0', 'tone');
  assert.equal(nextLevel(store.get(), game), 'L002');
  assert.deepEqual(totals(store.get(), game), { cleared: 1, total: 3, stars: 3, maxStars: 9, endings: 2 });
  store.recordClear('L002', 1, 3);
  store.recordClear('L011', 2, 1);
  assert.equal(nextLevel(store.get(), game), 'L011', 'all cleared: stay on the last level');
});
