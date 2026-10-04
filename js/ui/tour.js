// First-time guided tours with Driver.js. Each tour runs once (tracked in the
// store); "重看導覽" in settings clears the flags.

import { load } from '../vendor.js';

const TOURS = {
  map: [
    { element: '.chapter-tabs', title: '十個章節', description: '從 A1 到 B2，一章十關，跟著 Kai 在楓灣過完一年。' },
    { element: '.level-node.is-next', title: '下一關在這裡', description: '亮著火光的就是下一關。通關後才會解鎖再下一關。' },
    { element: '.topnav', title: '筆記與紀錄', description: '營火筆記本收集每關重點，學習紀錄會畫出你最常犯的錯誤類型。' },
  ],
  play: [
    { element: '.choices', title: '選一句來回應', description: '三個選項只有一個最恰當。也可以按鍵盤 1、2、3。答錯會看到壞結局，再從這一題重來。' },
    { element: '.dialog__voice', title: '再聽一次', description: '每句台詞都可以重播發音，跟著念念看。' },
    { element: '[data-tool="zh"]', title: '中文字幕', description: '覺得太難時打開中文字幕，熟練之後試著關掉。' },
    { element: '[data-tool="log"]', title: '對話紀錄', description: '錯過的句子可以在這裡回頭看。' },
  ],
};

// Resolves to the driver instance (so a screen can destroy it when leaving), or null.
export async function runTour(name, store) {
  if (store.get().tours[name]) return null;
  const steps = (TOURS[name] || []).filter((s) => document.querySelector(s.element));
  if (!steps.length) return null;
  const lib = await load('driver');
  const create = lib?.js?.driver;
  store.markTour(name); // mark first so a failed load never nags again
  if (!create) return null;
  const tour = create({
    showProgress: true,
    progressText: '{{current}} / {{total}}',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '知道了',
    popoverClass: 'cc-tour',
    steps: steps.map((s) => ({ element: s.element, popover: { title: s.title, description: s.description } })),
  });
  tour.drive();
  return tour;
}
