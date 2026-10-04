// Campfire ambience generated with Tone.js: crackling fire (filtered noise
// pops) plus a slow, quiet pentatonic pluck through reverb. Loaded only when
// the player turns ambience on.

import { load } from '../vendor.js';

const SCALE = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'];

let nodes = null;
let starting = null;

async function build(Tone) {
  await Tone.start();
  const master = new Tone.Volume(-16).toDestination();
  const reverb = new Tone.Reverb({ decay: 6, wet: 0.45 }).connect(master);

  // Fire bed: brown noise through a band-pass, gently wobbling.
  const bed = new Tone.Noise('brown').start();
  const bedFilter = new Tone.Filter(420, 'bandpass');
  const bedGain = new Tone.Gain(0.18);
  const wobble = new Tone.LFO(0.13, 0.1, 0.24).start();
  wobble.connect(bedGain.gain);
  bed.chain(bedFilter, bedGain, master);

  // Crackles: short noise bursts at random times.
  const crackle = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.03, sustain: 0 },
    volume: -14,
  });
  const crackleFilter = new Tone.Filter(2600, 'highpass');
  crackle.chain(crackleFilter, master);

  const pluck = new Tone.PluckSynth({ attackNoise: 0.6, dampening: 2600, resonance: 0.92, volume: -12 }).connect(reverb);

  let alive = true;
  const timers = [];
  const later = (fn, ms) => { const t = setTimeout(() => alive && fn(), ms); timers.push(t); };

  function scheduleCrackle() {
    later(() => {
      const burst = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < burst; i++) {
        crackle.triggerAttackRelease(0.02, Tone.now() + i * (0.02 + Math.random() * 0.05), 0.3 + Math.random() * 0.7);
      }
      scheduleCrackle();
    }, 120 + Math.random() * 900);
  }

  function schedulePluck() {
    later(() => {
      const note = SCALE[Math.floor(Math.random() * SCALE.length)];
      pluck.triggerAttack(note, Tone.now(), 0.3 + Math.random() * 0.3);
      schedulePluck();
    }, 2600 + Math.random() * 4200);
  }

  scheduleCrackle();
  schedulePluck();

  return {
    stop() {
      alive = false;
      timers.forEach(clearTimeout);
      master.volume.rampTo(-60, 0.6);
      setTimeout(() => {
        [bed, bedFilter, bedGain, wobble, crackle, crackleFilter, pluck, reverb, master].forEach((n) => n.dispose());
      }, 800);
    },
  };
}

// Must be called from a user gesture (browser autoplay policy).
export async function start() {
  if (nodes) return true;
  if (!starting) {
    starting = load('tone').then((Tone) => (Tone ? build(Tone) : null)).catch(() => null);
  }
  nodes = await starting;
  starting = null;
  return Boolean(nodes);
}

export function stop() {
  if (nodes) nodes.stop();
  nodes = null;
}

export function isPlaying() {
  return Boolean(nodes);
}
