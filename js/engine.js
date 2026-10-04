// Pure game-flow state machine for one level. No DOM, no storage.
// Every function returns a new state object; the input is never mutated.
//
// Phases:
//   intro    -> narrator / NPC lines before the first question
//   lines    -> the NPC lines of the current step
//   choose   -> waiting for the player to pick one of three choices
//   reaction -> the player's line (+ NPC reaction lines on a wrong pick)
//   bad      -> bad-ending card for a wrong pick; player may retry the step
//   outro    -> good-ending lines after the last step
//   clear    -> level finished (good-ending card + notes)

export const PHASES = Object.freeze(['intro', 'lines', 'choose', 'reaction', 'bad', 'outro', 'clear']);

export function shuffle(list, rng = Math.random) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Choice order shown to the player. Re-rolled until the correct answer is not
// in the same slot as last time, so retrying is never "just click the same spot".
function makeOrder(step, rng, previous) {
  const base = step.choices.map((_, i) => i);
  let order = shuffle(base, rng);
  if (previous) {
    const okIdx = step.choices.findIndex((c) => c.ok);
    for (let tries = 0; tries < 8 && order.indexOf(okIdx) === previous.indexOf(okIdx); tries++) {
      order = shuffle(base, rng);
    }
  }
  return order;
}

export function createRun(level, rng = Math.random) {
  if (!level || !Array.isArray(level.steps) || level.steps.length === 0) {
    throw new Error('createRun: level has no steps');
  }
  const intro = level.intro || [];
  return {
    levelId: level.id,
    phase: intro.length ? 'intro' : 'lines',
    step: 0,
    line: 0,
    order: makeOrder(level.steps[0], rng),
    picked: null,
    mistakes: 0,
    fails: [],
  };
}

export function playerLine(choice) {
  return { who: 'player', en: choice.en, zh: choice.zh };
}

export function pickedChoice(level, state) {
  if (state.picked === null) return null;
  return level.steps[state.step].choices[state.picked];
}

export function currentLines(level, state) {
  switch (state.phase) {
    case 'intro': return level.intro || [];
    case 'lines': return level.steps[state.step].lines;
    case 'reaction': {
      const choice = pickedChoice(level, state);
      return choice.ok ? [playerLine(choice)] : [playerLine(choice), ...choice.fail.lines];
    }
    case 'outro': return level.good.lines;
    default: return [];
  }
}

export function currentLine(level, state) {
  return currentLines(level, state)[state.line] || null;
}

// Phase transition once all lines of the current phase have been shown.
function nextPhase(level, state) {
  switch (state.phase) {
    case 'intro':
      return { ...state, phase: 'lines', line: 0 };
    case 'lines':
      return { ...state, phase: 'choose', line: 0 };
    case 'reaction': {
      const choice = pickedChoice(level, state);
      if (!choice.ok) return { ...state, phase: 'bad', line: 0 };
      const last = state.step >= level.steps.length - 1;
      return last
        ? { ...state, phase: 'outro', line: 0, picked: null }
        : { ...state, phase: 'lines', step: state.step + 1, line: 0, picked: null };
    }
    case 'outro':
      return { ...state, phase: 'clear', line: 0 };
    default:
      return state;
  }
}

// Show the next line; moves to the next phase after the last line.
export function advance(level, state) {
  const lines = currentLines(level, state);
  if (lines.length === 0) return nextPhase(level, state);
  if (state.line < lines.length - 1) return { ...state, line: state.line + 1 };
  const next = nextPhase(level, state);
  // Steps never have zero lines (validator enforces it), but skip empties safely.
  return currentLines(level, next).length === 0 && ['intro', 'lines', 'outro'].includes(next.phase)
    ? advance(level, next)
    : next;
}

// displayIdx: index of the button the player pressed (0..2, in shown order).
export function choose(level, state, displayIdx) {
  if (state.phase !== 'choose') return state;
  const picked = state.order[displayIdx];
  const choice = level.steps[state.step].choices[picked];
  if (!choice) return state;
  if (choice.ok) return { ...state, phase: 'reaction', line: 0, picked };
  const key = endingKey(state.step, picked);
  return {
    ...state,
    phase: 'reaction',
    line: 0,
    picked,
    mistakes: state.mistakes + 1,
    fails: [...state.fails, { key, kind: choice.fail.kind }],
  };
}

// After a bad ending: replay the same question with a fresh choice order.
export function retry(level, state, rng = Math.random) {
  if (state.phase !== 'bad') return state;
  return {
    ...state,
    phase: 'lines',
    line: 0,
    picked: null,
    order: makeOrder(level.steps[state.step], rng, state.order),
  };
}

export function endingKey(step, choiceIdx) {
  return `bad:${step}:${choiceIdx}`;
}

export const GOOD_ENDING = 'good';

// All ending keys a level contains (1 good + every wrong choice).
export function allEndings(level) {
  const keys = [GOOD_ENDING];
  level.steps.forEach((step, s) => {
    step.choices.forEach((c, i) => { if (!c.ok) keys.push(endingKey(s, i)); });
  });
  return keys;
}

export function starsFor(mistakes) {
  if (mistakes === 0) return 3;
  if (mistakes <= 2) return 2;
  return 1;
}

// 0..1 progress through the level, for the step indicator.
export function progress(level, state) {
  if (state.phase === 'clear') return 1;
  return state.step / level.steps.length;
}
