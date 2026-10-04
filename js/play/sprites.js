// Character sprites: up to three slots, left to right in the order of the
// level's cast list. The speaker is lit; the others step back a little.

import { h } from '../ui/dom.js';
import { EXPRESSIONS, spriteImage } from '../assets.js';
import { bob, shake, spriteIn } from '../fx/motion.js';

export async function createSprites(container, ids, cast) {
  // Resolve every expression up front so swaps are instant.
  const entries = await Promise.all(ids.flatMap((id) => EXPRESSIONS.map(async (expr) => (
    [`${id}:${expr}`, await spriteImage(id, cast[id]?.name || id, expr)]
  ))));
  const urls = new Map(entries);
  const url = (id, expr) => urls.get(`${id}:${expr}`) || urls.get(`${id}:neutral`);

  const slots = new Map(ids.map((id, i) => {
    const img = h('img', { class: 'sprite__img', alt: '', src: url(id, 'neutral'), draggable: 'false' });
    const el = h('div', { class: 'sprite', dataset: { slot: String(i + 1), id } }, img);
    return [id, { el, img }];
  }));
  const exprs = new Map(ids.map((id) => [id, 'neutral']));
  let speaker = null;

  container.dataset.count = String(ids.length);
  container.append(...[...slots.values()].map((s) => s.el));

  function setExpr(id, expr) {
    const slot = slots.get(id);
    if (!slot || !expr || exprs.get(id) === expr) return false;
    exprs.set(id, expr);
    slot.img.src = url(id, expr);
    return true;
  }

  return {
    enter() {
      [...slots.values()].forEach((s, i) => spriteIn(s.el, (i - (ids.length - 1) / 2) * 60));
    },
    // who: cast id, 'player' or 'narrator'
    focus(who, expr) {
      const npc = slots.get(who);
      slots.forEach((s, id) => {
        s.el.classList.toggle('is-speaking', id === who);
        s.el.classList.toggle('is-dim', Boolean(npc) && id !== who);
      });
      const changed = npc ? setExpr(who, expr) : false;
      if (npc && (changed || speaker !== who)) bob(npc.el);
      speaker = who;
    },
    shake(who) {
      const slot = slots.get(who);
      if (slot) shake(slot.el);
    },
    reset() {
      ids.forEach((id) => setExpr(id, 'neutral'));
      slots.forEach((s) => s.el.classList.remove('is-speaking', 'is-dim'));
      speaker = null;
    },
  };
}
