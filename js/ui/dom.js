// Tiny DOM helpers. Text always goes through textContent (no innerHTML with
// content strings), so level data can never inject markup.

export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs || {})) {
    if (value === false || value === null || value === undefined) continue;
    if (key === 'class') el.className = value;
    else if (key === 'style' && typeof value === 'object') Object.assign(el.style, value);
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === 'html') el.innerHTML = value; // trusted, static markup only (icons)
    else el.setAttribute(key, value === true ? '' : value);
  }
  append(el, children);
  return el;
}

export function append(parent, children) {
  for (const child of children.flat(Infinity)) {
    if (child === null || child === undefined || child === false) continue;
    parent.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return parent;
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function reducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// Small toast at the bottom of the screen.
export function toast(message, { tone = 'info', ms = 2600 } = {}) {
  let host = document.getElementById('toasts');
  if (!host) {
    host = h('div', { id: 'toasts', 'aria-live': 'polite' });
    document.body.appendChild(host);
  }
  const el = h('div', { class: `toast toast--${tone}` }, message);
  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-in'));
  setTimeout(() => {
    el.classList.remove('is-in');
    setTimeout(() => el.remove(), 400);
  }, ms);
}

// Confirm dialog using <dialog>; resolves true/false.
export function confirmDialog({ title, body, ok = '確定', cancel = '取消', danger = false }) {
  return new Promise((resolve) => {
    const dlg = h('dialog', { class: 'modal' },
      h('h2', { class: 'modal__title' }, title),
      h('p', { class: 'modal__body' }, body),
      h('div', { class: 'modal__actions' },
        h('button', { class: 'btn btn--ghost', value: 'cancel', onclick: () => dlg.close('cancel') }, cancel),
        h('button', { class: `btn ${danger ? 'btn--danger' : 'btn--primary'}`, onclick: () => dlg.close('ok') }, ok)));
    dlg.addEventListener('close', () => { resolve(dlg.returnValue === 'ok'); dlg.remove(); });
    document.body.appendChild(dlg);
    dlg.showModal();
  });
}
