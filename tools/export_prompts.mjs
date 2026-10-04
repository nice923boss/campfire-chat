#!/usr/bin/env node
// Collects every image the game can show into one prompt list for ComfyUI.
// Usage: node tools/export_prompts.mjs
// Writes prompts/manifest.json (read by tools/comfyui_generate.py) and
// prompts/PROMPTS.md (the same prompts for reading or copy-pasting).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

// Same FNV-1a hash as js/assets.js, so a seed never changes between exports.
export function seedFor(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return h >>> 0;
}

const joinPrompt = (...parts) => parts.map((p) => String(p || '').trim().replace(/,$/, '')).filter(Boolean).join(', ');

// Sprites are drawn on a coloured background so white clothes and hair are never cut out with it.
// Blue-family clothes would vanish on light blue, so those characters get light green.
const BLUEISH = /\b(blue|denim|teal|turquoise|cyan|aqua)\b/i;
export const isolationColor = (appearance) => (BLUEISH.test(appearance) ? 'green' : 'blue');

function linesOf(level) {
  const steps = level.steps || [];
  return [
    ...(level.intro || []),
    ...steps.flatMap((s) => [...(s.lines || []), ...(s.choices || []).flatMap((c) => c.fail?.lines || [])]),
    ...(level.good?.lines || []),
  ];
}

// Expressions each character actually uses, plus neutral (the default pose).
function usedExpressions(levels, mentor) {
  const used = new Map();
  const add = (id, expr) => {
    if (!used.has(id)) used.set(id, new Set(['neutral']));
    if (expr) used.get(id).add(expr);
  };
  for (const level of levels) {
    (level.cast || []).forEach((id) => add(id));
    linesOf(level).forEach((line) => add(line.who, line.expr));
  }
  add(mentor, 'happy'); // the campfire notes panel always shows the mentor smiling
  return used;
}

export function buildPrompts(root = ROOT) {
  const game = readJson(join(root, 'data', 'game.json'));
  const art = readJson(join(root, 'data', 'art.json'));
  const cast = Object.assign({}, ...game.cast.map((key) => readJson(join(root, 'data', 'cast', `${key}.json`))));

  const missing = [];
  const levels = [];
  for (const meta of game.chapters.flatMap((ch) => ch.levels)) {
    const file = join(root, 'data', 'levels', `${meta.id}.json`);
    if (existsSync(file)) levels.push(readJson(file));
    else missing.push(meta.id);
  }

  const items = [];
  const negative = (extra) => joinPrompt(art.negative, extra);

  for (const [name, ui] of Object.entries(art.ui)) {
    items.push({
      file: `assets/ui/${name}.webp`, kind: 'ui', id: name,
      width: ui.width, height: ui.height, seed: seedFor(`ui:${name}`),
      prompt: ui.prompt, negative: negative(art.background.negative),
    });
  }

  const cover = art.chapterCover;
  for (const ch of game.chapters) {
    items.push({
      file: `assets/chapter/${ch.id}.webp`, kind: 'chapter', id: ch.id,
      width: cover.width, height: cover.height, seed: seedFor(`chapter:${ch.id}`),
      prompt: joinPrompt(cover.prefix, ch.cover, cover.suffix), negative: negative(art.background.negative),
    });
  }

  const bg = art.background;
  for (const level of levels) {
    items.push({
      file: `assets/bg/${level.id}.webp`, kind: 'bg', id: level.id,
      width: bg.width, height: bg.height, seed: seedFor(`bg:${level.id}`),
      prompt: joinPrompt(bg.prefix, level.background, bg.suffix), negative: negative(bg.negative),
    });
  }

  // One seed per character for every expression keeps the face consistent.
  const sprite = art.character;
  const used = usedExpressions(levels, game.mentor);
  const order = Object.keys(sprite.expressions);
  for (const [id, ch] of Object.entries(cast)) {
    const exprs = order.filter((expr) => used.get(id)?.has(expr));
    const suffix = sprite.suffix.replace('{isolation}', sprite.isolation[isolationColor(ch.appearance)]);
    for (const expr of exprs) {
      items.push({
        file: `assets/char/${id}_${expr}.webp`, kind: 'char', id, expr,
        width: sprite.width, height: sprite.height, seed: seedFor(`char:${id}`),
        prompt: joinPrompt(sprite.prefix, ch.appearance, sprite.expressions[expr], suffix),
        negative: negative(sprite.negative),
      });
    }
  }

  const unusedCast = Object.keys(cast).filter((id) => !used.has(id));
  return { game, cast, items, missing, unusedCast };
}

const KIND_TITLES = { ui: '介面畫面', chapter: '章節封面', bg: '關卡背景', char: '角色立繪' };

export function renderMarkdown({ game, cast, items }) {
  const count = (kind) => items.filter((i) => i.kind === kind).length;
  const out = [
    '# Campfire Chat 生圖提示詞',
    '',
    '由 `node tools/export_prompts.mjs` 產生，請勿手動修改；要改提示詞請改 `data/` 底下的 JSON 再重新匯出。',
    '',
    `共 ${items.length} 張：${Object.keys(KIND_TITLES).map((k) => `${KIND_TITLES[k]} ${count(k)}`).join('、')}。`,
    '',
    '- 角色立繪同一角色的所有表情共用同一個 seed，臉才會一致。',
    '- 立繪以淺藍底生成（外觀有藍色系衣著的角色用淺綠底，避免衣服被當成背景），`tools/comfyui_generate.py` 會用 rembg 去背。',
    '- 負面提示詞（negative）同一類共用一組，列在每一類的開頭。',
    '',
  ];
  const chapterOf = new Map(game.chapters.flatMap((ch) => ch.levels.map((l) => [l.id, ch])));
  const titleOf = new Map(game.chapters.flatMap((ch) => ch.levels.map((l) => [l.id, l.title])));

  for (const kind of Object.keys(KIND_TITLES)) {
    const list = items.filter((i) => i.kind === kind);
    if (!list.length) continue;
    out.push(`## ${KIND_TITLES[kind]}（${list.length} 張，${list[0].width}x${list[0].height}）`, '');
    out.push('負面提示詞：', '', '```text', list[0].negative, '```', '');
    if (kind === 'char') {
      for (const id of [...new Set(list.map((i) => i.id))]) {
        const ch = cast[id];
        const mine = list.filter((i) => i.id === id);
        out.push(`### ${ch.name} ${ch.nameZh}（${id}，seed ${mine[0].seed}）`, '');
        for (const item of mine) out.push(`- \`${item.file}\``, '', '  ```text', `  ${item.prompt}`, '  ```', '');
      }
      continue;
    }
    for (const item of list) {
      let label = item.id;
      if (kind === 'bg') label = `${item.id} ${titleOf.get(item.id).zh}（${chapterOf.get(item.id).id}）`;
      if (kind === 'chapter') label = `${item.id} ${game.chapters.find((c) => c.id === item.id).title.zh}`;
      out.push(`### ${label}`, '', `\`${item.file}\`，seed ${item.seed}`, '', '```text', item.prompt, '```', '');
    }
  }
  return `${out.join('\n').trimEnd()}\n`;
}

function main() {
  const result = buildPrompts();
  const outDir = join(ROOT, 'prompts');
  mkdirSync(outDir, { recursive: true });
  const manifest = { version: result.game.version, count: result.items.length, items: result.items };
  writeFileSync(join(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync(join(outDir, 'PROMPTS.md'), renderMarkdown(result));

  const byKind = Object.keys(KIND_TITLES).map((k) => `${KIND_TITLES[k]} ${result.items.filter((i) => i.kind === k).length}`);
  console.log(`已輸出 prompts/manifest.json 與 prompts/PROMPTS.md：共 ${result.items.length} 張（${byKind.join('、')}）`);
  if (result.missing.length) console.log(`警告：${result.missing.length} 個關卡檔不存在，沒有背景提示詞：${result.missing.join(' ')}`);
  if (result.unusedCast.length) console.log(`提醒：這些角色沒有出現在任何關卡，只產生 neutral：${result.unusedCast.join(' ')}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) main();
