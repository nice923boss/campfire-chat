// Share card / certificate: builds an off-screen card, adds a QR code to the
// game (qr-code-styling) and renders it to PNG (html-to-image).

import { load } from '../vendor.js';
import { h, toast } from './dom.js';

export function gameUrl() {
  return `${location.origin}${location.pathname}`;
}

async function qrCanvas(url) {
  const lib = await load('qr');
  const QR = lib?.default || lib;
  if (typeof QR !== 'function') return null;
  const qr = new QR({
    width: 220, height: 220, type: 'canvas', data: url, margin: 0,
    qrOptions: { errorCorrectionLevel: 'M' },
    dotsOptions: { type: 'rounded', color: '#3b2a1a' },
    cornersSquareOptions: { type: 'extra-rounded', color: '#e2552b' },
    cornersDotOptions: { type: 'dot', color: '#e2552b' },
    backgroundOptions: { color: '#fff4e0' },
  });
  const holder = h('div', { class: 'share-card__qr' });
  qr.append(holder);
  return holder;
}

// card: { kicker, title, subtitle, stars, lines: [string], filename }
export async function downloadCard(card) {
  const [toImage, qr] = await Promise.all([load('htmlToImage'), qrCanvas(gameUrl())]);
  if (!toImage) {
    toast('圖片元件載入失敗，請檢查網路後再試。', { tone: 'bad' });
    return false;
  }
  const el = h('div', { class: 'share-card' },
    h('div', { class: 'share-card__glow' }),
    h('p', { class: 'share-card__kicker' }, card.kicker),
    h('h1', { class: 'share-card__title' }, card.title),
    card.subtitle ? h('p', { class: 'share-card__subtitle' }, card.subtitle) : null,
    typeof card.stars === 'number'
      ? h('p', { class: 'share-card__stars', 'aria-label': `${card.stars} 顆星` }, '★'.repeat(card.stars) + '☆'.repeat(Math.max(0, 3 - card.stars)))
      : null,
    h('ul', { class: 'share-card__lines' }, (card.lines || []).map((l) => h('li', {}, l))),
    h('div', { class: 'share-card__foot' },
      qr,
      h('div', { class: 'share-card__brand' },
        h('strong', {}, 'Campfire Chat'),
        h('span', {}, '營火英語對話'),
        h('small', {}, gameUrl()))));
  const stage = h('div', { class: 'share-stage', 'aria-hidden': 'true' }, el);
  document.body.appendChild(stage);
  try {
    const dataUrl = await toImage.toPng(el, { pixelRatio: 1, skipFonts: true, cacheBust: false });
    const a = h('a', { href: dataUrl, download: card.filename || 'campfire-chat.png' });
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('圖片已下載。', { tone: 'good' });
    return true;
  } catch (err) {
    console.warn('[share] render failed', err);
    toast('圖片產生失敗，請再試一次。', { tone: 'bad' });
    return false;
  } finally {
    stage.remove();
  }
}

// t: totals() from the store.
export function downloadCertificate(t) {
  const date = new Date().toLocaleDateString('zh-TW');
  return downloadCard({
    kicker: 'Certificate of Completion',
    title: '營火英語對話・結業證書',
    subtitle: '完成 Campfire Chat 全部 100 個英語對話情境',
    lines: [`收集星星 ${t.stars} / ${t.maxStars}`, `發現結局 ${t.endings} 種`, `完成日期 ${date}`],
    filename: 'campfire-chat-certificate.png',
  });
}
