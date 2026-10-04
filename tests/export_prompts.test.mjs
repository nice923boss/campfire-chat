import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPrompts, isolationColor } from '../tools/export_prompts.mjs';

test('blue-family clothes get a light green isolation background, everything else light blue', () => {
  assert.equal(isolationColor('light blue denim jacket over a white t-shirt'), 'green');
  assert.equal(isolationColor('faded denim overalls'), 'green');
  assert.equal(isolationColor('teal scarf'), 'green');
  assert.equal(isolationColor('mint green hoodie, white sneakers'), 'blue');
  assert.equal(isolationColor('bluebell print dress'), 'blue');
});

test('every sprite prompt names exactly one isolation background and no white background', () => {
  const { items, cast } = buildPrompts();
  const sprites = items.filter((i) => i.kind === 'char');
  assert.ok(sprites.length > 0);
  for (const item of sprites) {
    const colors = ['light blue background', 'light green background'].filter((c) => item.prompt.includes(c));
    assert.equal(colors.length, 1, item.file);
    assert.ok(colors[0].includes(isolationColor(cast[item.id].appearance)), item.file);
    assert.ok(!/white background|\{isolation\}/.test(item.prompt), item.file);
  }
});

test('background and chapter cover prompts ask for blank signs', () => {
  const { items } = buildPrompts();
  for (const item of items.filter((i) => i.kind === 'bg' || i.kind === 'chapter')) {
    assert.ok(item.prompt.includes('blank signs, plain unmarked surfaces'), item.file);
  }
});
