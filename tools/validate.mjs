#!/usr/bin/env node
// Content validator for Campfire Chat game data.
// Usage: node tools/validate.mjs [--chapter N]
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const EXPRESSIONS = ['neutral', 'happy', 'upset', 'confused'];
export const NOTE_TYPES = ['phrase', 'grammar', 'vocab', 'culture', 'trap'];
export const FAIL_KINDS = ['literal', 'grammar', 'tone', 'offtopic', 'culture'];
export const STEPS_PER_CHAPTER = { 1: 3, 2: 3, 3: 4, 4: 4, 5: 4, 6: 4, 7: 5, 8: 5, 9: 5, 10: 5 };
const MAX_CHOICE_WORDS = { 1: 8, 2: 10, 3: 12, 4: 12, 5: 15, 6: 18, 7: 18, 8: 22, 9: 25, 10: 25 };
const SPECIAL_SPEAKERS = ['narrator', 'player'];

const EM_DASH = '\u2014';
const CJK = /[㐀-鿿]/;
// High-frequency simplified-only characters; any hit means the text is not Traditional Chinese.
const SIMPLIFIED = new Set(
  '们这个说时会对没还么过吗让买卖钱问题车东门见觉认识请谢话语应该为发现开关处务员电网络视频软质账号单书长从样爱学习经热点间听写读给级场边进远运动机预约办护签证两乐习乡亲仅优伤价众传儿兴养决减击则刚创别剧动劳势区医华协卫压厅历厕厨县参双变叶号员响团园围图圆块坏坚备复够头奖妈娱孙宝实宽导将尔尝层岁币师帮带帐并广应庆库废张弹强归录彻忆态总恋恶惊惯戏战户扫扬报拥择挂换损摄摆数断无旧显暂术杀杂权条杨极构枪树标桥梦检楼欢欧气汇汉沟泪洁浅济浓涨温湾满灯灵炉烟烦爷牵状犹独狮猪环画畅疗盐监盖盘矿码础确礼种称积稳穷竞笔简类粮紧红约纪纯纸线练组细终结绕绝统继绩续维综绿罗罚联肃肠肤肿胆胜脏脑脚脸腾舰艺节芦苏苹荐药莲获营萝蓝虑虽虾补装观规视览触计订认训议记讲许论设访证评诉词译试诗诚询详误诸课谁调谈谊谋谨谱贝负贡财责贤败货贩贪贫购贯贵贷费贸资赏赔赖赚赛赞赠赢赶趋跃践轨转轮轻载较辅辆辈输辞辽达迁运违连迟选递遗邮酱释针钉钓钟钢钥铁铃铜银铺链销锁锅错锦键镇镜闪闭闯闲闷闹闻阅队阳阴阵阶际陆陈险随隐难雾韩页顶项顺须顾顿领颇频颜额风飞饭饮饰饱饼饿馆马驾验骑骗鱼鸟鸡鸭鸿麦齐齿龄龙体'
);
// Mainland-China wording that should be Taiwan wording.
const MAINLAND_TERMS = {
  出租車: '計程車', 信息: '資訊／訊息', 視頻: '影片', 網絡: '網路', 軟件: '軟體', 打印: '列印',
  公交: '公車', 屏幕: '螢幕', 鼠標: '滑鼠', 土豆: '馬鈴薯', 酸奶: '優格', 短信: '簡訊',
  默認: '預設', 早上好: '早安', 晚上好: '晚安／你好', 打車: '叫車', 質量: '品質',
};
const GENDERED_ADDRESS = /\b(sir|ma'am|madam)\b/i;

function readJson(path, report) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    report.error(path, '', `無法讀取或解析 JSON：${err.message}`);
    return null;
  }
}

function makeReport() {
  const errors = [];
  const warnings = [];
  return {
    errors,
    warnings,
    error: (file, path, msg) => errors.push({ file, path, msg }),
    warn: (file, path, msg) => warnings.push({ file, path, msg }),
  };
}

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;

function checkText(report, file, path, value, lang) {
  if (!isNonEmptyString(value)) {
    report.error(file, path, `缺少${lang === 'zh' ? '中文' : '英文'}文字`);
    return;
  }
  if (value.includes(EM_DASH)) report.error(file, path, '含破折號 U+2014，請改用逗號、冒號或括號');
  if (lang === 'en' && CJK.test(value)) report.error(file, path, '英文欄位含中文字');
  if (lang === 'zh') {
    if (!CJK.test(value)) report.error(file, path, '中文欄位沒有中文字');
    const hits = [...new Set([...value].filter((ch) => SIMPLIFIED.has(ch)))];
    if (hits.length) report.error(file, path, `含簡體字：${hits.join('')}`);
    for (const [term, fix] of Object.entries(MAINLAND_TERMS)) {
      if (value.includes(term)) report.warn(file, path, `「${term}」建議改為台灣用語「${fix}」`);
    }
  }
}

function checkBilingual(report, file, path, obj) {
  if (!obj || typeof obj !== 'object') {
    report.error(file, path, '缺少 { en, zh } 物件');
    return;
  }
  checkText(report, file, `${path}.en`, obj.en, 'en');
  checkText(report, file, `${path}.zh`, obj.zh, 'zh');
}

function checkLine(report, file, path, line, levelCast) {
  if (!line || typeof line !== 'object') {
    report.error(file, path, '台詞必須是物件');
    return;
  }
  const { who, expr } = line;
  if (!SPECIAL_SPEAKERS.includes(who) && !levelCast.includes(who)) {
    report.error(file, `${path}.who`, `說話者「${who}」不在本關 cast 清單`);
  }
  if (expr !== undefined) {
    if (SPECIAL_SPEAKERS.includes(who)) report.warn(file, `${path}.expr`, '旁白與玩家不需要 expr');
    else if (!EXPRESSIONS.includes(expr)) report.error(file, `${path}.expr`, `表情「${expr}」不合法，可用：${EXPRESSIONS.join('、')}`);
  }
  checkText(report, file, `${path}.en`, line.en, 'en');
  checkText(report, file, `${path}.zh`, line.zh, 'zh');
  if (!SPECIAL_SPEAKERS.includes(who) && GENDERED_ADDRESS.test(line.en || '')) {
    report.warn(file, `${path}.en`, 'NPC 台詞含 sir／ma\'am，Kai 為性別中立角色');
  }
}

function checkLines(report, file, path, lines, levelCast, { min, max }) {
  if (!Array.isArray(lines) || lines.length < min || lines.length > max) {
    report.error(file, path, `需要 ${min} 到 ${max} 句台詞，目前 ${Array.isArray(lines) ? lines.length : 0} 句`);
    return;
  }
  lines.forEach((line, i) => checkLine(report, file, `${path}[${i}]`, line, levelCast));
}

// English cast names left in translated Chinese text (Mia instead of 米亞).
// tip / why / note explanations are skipped: they quote English on purpose.
// Note examples are checked: their zh is a translation.
// Names are deduped by English spelling (two cast entries may share one).
function checkZhNames(report, file, level, names) {
  const fields = [['location.zh', level.location?.zh], ['goal.zh', level.goal?.zh]];
  const addLines = (path, lines) => (Array.isArray(lines) ? lines : []).forEach((l, i) => fields.push([`${path}[${i}].zh`, l?.zh]));
  addLines('intro', level.intro);
  (level.steps || []).forEach((step, si) => {
    addLines(`steps[${si}].lines`, step.lines);
    (step.choices || []).forEach((c, ci) => {
      const path = `steps[${si}].choices[${ci}]`;
      fields.push([`${path}.zh`, c?.zh]);
      if (!c?.fail) return;
      addLines(`${path}.fail.lines`, c.fail.lines);
      fields.push([`${path}.fail.title.zh`, c.fail.title?.zh], [`${path}.fail.story.zh`, c.fail.story?.zh]);
    });
  });
  addLines('good.lines', level.good?.lines);
  fields.push(['good.title.zh', level.good?.title?.zh], ['good.story.zh', level.good?.story?.zh]);
  (Array.isArray(level.notes) ? level.notes : []).forEach((n, i) => fields.push([`notes[${i}].example.zh`, n?.example?.zh]));
  for (const [path, text] of fields) {
    if (typeof text !== 'string') continue;
    // 「After Leo finish」: a quoted all-English fragment keeps its English name.
    const translated = text.replace(/「[\x00-\x7F]*」/g, '');
    const hits = names.filter((n) => n.re.test(translated));
    if (hits.length) report.error(file, path, `中文用了英文名：${hits.map((n) => `${n.en} 改為 ${n.zh}`).join('、')}`);
  }
}

export function nameMatchers(cast, protagonist) {
  const people = [...Object.values(cast), ...(protagonist ? [protagonist] : [])];
  const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const zhByEn = new Map();
  for (const p of people) {
    if (!isNonEmptyString(p.name) || !isNonEmptyString(p.nameZh)) continue;
    zhByEn.set(p.name, [...new Set([...(zhByEn.get(p.name) || []), p.nameZh])]);
  }
  return [...zhByEn].map(([en, zhs]) => ({ en, zh: zhs.join('或'), re: new RegExp(`(?<![A-Za-z])${escape(en)}(?![A-Za-z])`) }));
}

function wordCount(text) {
  return String(text || '').trim().split(/\s+/).filter(Boolean).length;
}

function checkStep(report, file, path, step, levelCast, chapterNo, stats) {
  checkLines(report, file, `${path}.lines`, step.lines, levelCast, { min: 1, max: 3 });
  const last = Array.isArray(step.lines) ? step.lines[step.lines.length - 1] : null;
  if (last && SPECIAL_SPEAKERS.includes(last.who)) {
    report.error(file, `${path}.lines`, '選擇前的最後一句必須是 NPC 台詞');
  }
  const choices = step.choices;
  if (!Array.isArray(choices) || choices.length !== 3) {
    report.error(file, `${path}.choices`, '每題必須剛好 3 個選項');
    return;
  }
  const correct = choices.filter((c) => c && c.ok === true);
  if (correct.length !== 1) report.error(file, `${path}.choices`, `必須恰好 1 個正解，目前 ${correct.length} 個`);
  const maxWords = MAX_CHOICE_WORDS[chapterNo];
  const lengths = choices.map((c) => (c && c.en ? c.en.length : 0));
  choices.forEach((choice, i) => {
    const cPath = `${path}.choices[${i}]`;
    checkText(report, file, `${cPath}.en`, choice.en, 'en');
    checkText(report, file, `${cPath}.zh`, choice.zh, 'zh');
    if (maxWords && wordCount(choice.en) > maxWords) {
      report.warn(file, `${cPath}.en`, `選項 ${wordCount(choice.en)} 字，超過本章建議上限 ${maxWords} 字`);
    }
    if (choice.ok === true) {
      checkText(report, file, `${cPath}.tip`, choice.tip, 'zh');
      if (choice.fail) report.error(file, `${cPath}.fail`, '正解不應有 fail');
    } else if (choice.ok === false) {
      const fail = choice.fail;
      if (!fail) {
        report.error(file, `${cPath}.fail`, '錯誤選項缺少 fail 壞結局');
        return;
      }
      if (!FAIL_KINDS.includes(fail.kind)) report.error(file, `${cPath}.fail.kind`, `kind「${fail.kind}」不合法，可用：${FAIL_KINDS.join('、')}`);
      else stats.kinds.add(fail.kind);
      checkLines(report, file, `${cPath}.fail.lines`, fail.lines, levelCast, { min: 1, max: 2 });
      checkBilingual(report, file, `${cPath}.fail.title`, fail.title);
      checkBilingual(report, file, `${cPath}.fail.story`, fail.story);
      checkText(report, file, `${cPath}.fail.why`, fail.why, 'zh');
    } else {
      report.error(file, `${cPath}.ok`, 'ok 必須是 true 或 false');
    }
  });
  const okIndex = choices.findIndex((c) => c && c.ok === true);
  if (okIndex >= 0) {
    stats.steps += 1;
    const okLen = lengths[okIndex];
    if (lengths.every((len, i) => i === okIndex || len < okLen)) stats.correctLongest += 1;
  }
}

function checkNotes(report, file, notes) {
  if (!Array.isArray(notes) || notes.length < 4 || notes.length > 5) {
    report.error(file, 'notes', `營火筆記需要 4 到 5 則，目前 ${Array.isArray(notes) ? notes.length : 0} 則`);
    return;
  }
  notes.forEach((note, i) => {
    const path = `notes[${i}]`;
    if (!NOTE_TYPES.includes(note.type)) report.error(file, `${path}.type`, `type「${note.type}」不合法，可用：${NOTE_TYPES.join('、')}`);
    checkText(report, file, `${path}.en`, note.en, 'en');
    checkText(report, file, `${path}.zh`, note.zh, 'zh');
    checkText(report, file, `${path}.explain`, note.explain, 'zh');
    checkBilingual(report, file, `${path}.example`, note.example);
  });
  if (!notes.some((n) => n.type === 'trap' || n.type === 'culture')) {
    report.error(file, 'notes', '至少需要 1 則 trap 或 culture 筆記');
  }
}

export function validateLevel(report, file, level, { expectedId, chapterNo, cast, stats, names = [] }) {
  if (!level) return;
  checkZhNames(report, file, level, names);
  if (level.id !== expectedId) report.error(file, 'id', `id「${level.id}」應為「${expectedId}」`);
  checkBilingual(report, file, 'location', level.location);
  checkBilingual(report, file, 'goal', level.goal);
  if (!isNonEmptyString(level.background)) {
    report.error(file, 'background', '缺少背景提示詞');
  } else {
    const words = wordCount(level.background);
    if (words < 8 || words > 60) report.warn(file, 'background', `背景提示詞 ${words} 字，建議 15 到 35 字`);
    if (CJK.test(level.background)) report.error(file, 'background', '背景提示詞必須是英文');
    if (/\b(sign|poster|menu|label|signage|banner)s?\b/i.test(level.background) && !/\b(blank|without text|no text|empty)\b/i.test(level.background)) {
      report.warn(file, 'background', '提示詞含可能生成文字的物件，請加 blank 或 without text');
    }
  }
  const levelCast = Array.isArray(level.cast) ? level.cast : [];
  if (levelCast.length < 1 || levelCast.length > 3) report.error(file, 'cast', 'cast 需要 1 到 3 位角色');
  levelCast.forEach((id, i) => {
    if (!cast[id]) report.error(file, `cast[${i}]`, `角色「${id}」不存在於任何 cast 檔`);
  });
  checkLines(report, file, 'intro', level.intro, levelCast, { min: 1, max: 4 });
  const expectedSteps = STEPS_PER_CHAPTER[chapterNo];
  if (!Array.isArray(level.steps) || level.steps.length !== expectedSteps) {
    report.error(file, 'steps', `本章每關需要 ${expectedSteps} 題，目前 ${Array.isArray(level.steps) ? level.steps.length : 0} 題`);
  }
  const levelStats = { ...stats, kinds: new Set() };
  (level.steps || []).forEach((step, i) => checkStep(report, file, `steps[${i}]`, step, levelCast, chapterNo, levelStats));
  stats.steps = levelStats.steps;
  stats.correctLongest = levelStats.correctLongest;
  levelStats.kinds.forEach((k) => stats.kinds.add(k));
  if (levelStats.kinds.size < 3) report.warn(file, 'steps', `錯誤選項只用到 ${levelStats.kinds.size} 種 kind，建議至少 3 種`);
  const good = level.good || {};
  checkLines(report, file, 'good.lines', good.lines, levelCast, { min: 1, max: 3 });
  checkBilingual(report, file, 'good.title', good.title);
  checkBilingual(report, file, 'good.story', good.story);
  checkNotes(report, file, level.notes);
  const speakers = new Set();
  const collect = (lines) => (lines || []).forEach((l) => l && speakers.add(l.who));
  collect(level.intro);
  (level.steps || []).forEach((s) => {
    collect(s.lines);
    (s.choices || []).forEach((c) => collect(c.fail && c.fail.lines));
  });
  collect(good.lines);
  levelCast.forEach((id) => {
    if (!speakers.has(id)) report.warn(file, 'cast', `角色「${id}」列在 cast 但沒有說話`);
  });
}

function checkCastFile(report, file, entries, fileKey, cast) {
  const prefix = fileKey === 'core' ? null : `c${fileKey.slice(2)}_`;
  for (const [id, ch] of Object.entries(entries)) {
    const path = id;
    if (!/^[a-z0-9_]+$/.test(id)) report.error(file, path, 'id 只能用小寫英數與底線');
    if (prefix && !id.startsWith(prefix)) report.error(file, path, `本章新角色 id 必須以「${prefix}」開頭`);
    if (cast[id]) report.error(file, path, `角色 id 重複（已定義於 ${cast[id].__file}）`);
    // Two people with one name read as the same character to the player.
    for (const [otherId, other] of Object.entries(cast)) {
      if (otherId === id) continue;
      if (other.name === ch.name) report.error(file, `${path}.name`, `英文名「${ch.name}」與 ${otherId} 重複，請換名字`);
      if (other.nameZh === ch.nameZh) report.error(file, `${path}.nameZh`, `中文名「${ch.nameZh}」與 ${otherId} 重複，請換名字`);
    }
    checkText(report, file, `${path}.name`, ch.name, 'en');
    checkText(report, file, `${path}.nameZh`, ch.nameZh, 'zh');
    checkBilingual(report, file, `${path}.role`, ch.role);
    if (!['female', 'male'].includes(ch.gender)) report.error(file, `${path}.gender`, 'gender 必須是 female 或 male');
    checkText(report, file, `${path}.appearance`, ch.appearance, 'en');
    if (/\b(asian|smil\w*|frown\w*|background)\b/i.test(ch.appearance || '')) {
      report.warn(file, `${path}.appearance`, 'appearance 不要寫 Asian、表情或背景（全域設定會加）');
    }
    cast[id] = { ...ch, __file: file };
  }
}

export function validateAll({ root = ROOT, chapter = null } = {}) {
  const report = makeReport();
  const gamePath = join(root, 'data', 'game.json');
  const game = readJson(gamePath, report);
  if (!game) return report;

  const cast = {};
  for (const key of game.cast || []) {
    const file = join(root, 'data', 'cast', `${key}.json`);
    if (!existsSync(file)) {
      if (chapter === null) report.error(file, '', '角色檔不存在');
      continue;
    }
    const entries = readJson(file, report);
    if (entries) checkCastFile(report, file, entries, key, cast);
  }
  if (game.mentor && !cast[game.mentor]) report.error(gamePath, 'mentor', `導師角色「${game.mentor}」不存在`);
  const names = nameMatchers(cast, game.protagonist);

  const seen = new Set();
  (game.chapters || []).forEach((ch, ci) => {
    const chapterNo = ci + 1;
    if (ch.id !== `ch${String(chapterNo).padStart(2, '0')}`) report.error(gamePath, `chapters[${ci}].id`, '章節 id 順序錯誤');
    checkBilingual(report, gamePath, `chapters[${ci}].title`, ch.title);
    checkBilingual(report, gamePath, `chapters[${ci}].summary`, ch.summary);
    if (!isNonEmptyString(ch.cover)) report.error(gamePath, `chapters[${ci}].cover`, '缺少章節封面提示詞');
    if (!Array.isArray(ch.levels) || ch.levels.length !== 10) report.error(gamePath, `chapters[${ci}].levels`, '每章需要 10 關');
    const stats = { steps: 0, correctLongest: 0, kinds: new Set() };
    (ch.levels || []).forEach((meta, li) => {
      const expectedId = `L${String(ci * 10 + li + 1).padStart(3, '0')}`;
      if (meta.id !== expectedId) report.error(gamePath, `chapters[${ci}].levels[${li}]`, `關卡 id 應為 ${expectedId}`);
      if (seen.has(meta.id)) report.error(gamePath, `chapters[${ci}].levels[${li}]`, '關卡 id 重複');
      seen.add(meta.id);
      checkBilingual(report, gamePath, `chapters[${ci}].levels[${li}].title`, meta.title);
      if (chapter !== null && chapter !== chapterNo) return;
      const file = join(root, 'data', 'levels', `${meta.id}.json`);
      if (!existsSync(file)) {
        report.error(file, '', '關卡檔不存在');
        return;
      }
      validateLevel(report, file, readJson(file, report), { expectedId, chapterNo, cast, stats, names });
    });
    if (chapter === null || chapter === chapterNo) {
      const missing = FAIL_KINDS.filter((k) => !stats.kinds.has(k));
      if (missing.length) report.warn(gamePath, `chapters[${ci}]`, `本章沒有用到這些錯誤類型：${missing.join('、')}`);
    }
    if (stats.steps >= 10 && stats.correctLongest / stats.steps > 0.5) {
      report.warn(gamePath, `chapters[${ci}]`, `本章 ${stats.correctLongest}/${stats.steps} 題的正解是最長選項，玩家容易猜到，請平衡長度`);
    }
  });
  return report;
}

function main() {
  const args = process.argv.slice(2);
  const idx = args.indexOf('--chapter');
  const chapter = idx >= 0 ? Number(args[idx + 1]) : null;
  const report = validateAll({ chapter });
  const rel = (f) => f.replace(ROOT, '').replace(/^[\\/]/, '');
  for (const w of report.warnings) console.log(`警告  ${rel(w.file)}  ${w.path}  ${w.msg}`);
  for (const e of report.errors) console.log(`錯誤  ${rel(e.file)}  ${e.path}  ${e.msg}`);
  console.log(`\n結果：${report.errors.length} 個錯誤，${report.warnings.length} 個警告${chapter ? `（只檢查第 ${chapter} 章）` : ''}`);
  process.exitCode = report.errors.length ? 1 : 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) main();
