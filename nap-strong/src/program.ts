// Nap Strong program content.
// DRAFT ONLY: every move, cue and easier option must be written or approved by
// the named women's health physio before any real mum uses it.

export type Move = {
  id: string;
  name: string;
  area: 'breath' | 'pelvic floor' | 'core' | 'legs' | 'arms' | 'whole body';
  dose: string; // sets and reps, or time
  sets: number;
  cue: string;
  easier: { name: string; cue: string };
  core: boolean; // affected by leaking or doming answers
};

export type Phase = { name: string; weeks: [number, number]; aim: string };

export const PHASES: Phase[] = [
  { name: 'Reconnect', weeks: [1, 2], aim: 'Breathing, pelvic floor and gentle deep core' },
  { name: 'Rebuild', weeks: [3, 4], aim: 'Add legs and arms while the core stays in control' },
  { name: 'Strengthen', weeks: [5, 6], aim: 'More load, longer holds, still no straining' },
  { name: 'Carry', weeks: [7, 8], aim: 'Strength for lifting, carrying and the pram' },
];

const M: Record<string, Move> = {
  breath: {
    id: 'breath', name: '360 breathing', area: 'breath', dose: '10 slow breaths', sets: 1,
    cue: 'Lie on your back, knees bent. Breathe in and let your ribs widen to the sides and back. Breathe out slowly.',
    easier: { name: '360 breathing, propped up', cue: 'Same breathing, sitting propped on pillows.' }, core: false,
  },
  pfLong: {
    id: 'pfLong', name: 'Pelvic floor: long holds', area: 'pelvic floor', dose: '3 sets of 10, hold 5 seconds', sets: 3,
    cue: 'Breathe out, gently lift and squeeze as if stopping wind and wee. Hold, then fully let go.',
    easier: { name: 'Pelvic floor: short holds', cue: 'Hold for 2 seconds only, and rest well between.' }, core: true,
  },
  pfQuick: {
    id: 'pfQuick', name: 'Pelvic floor: quick lifts', area: 'pelvic floor', dose: '3 sets of 10', sets: 3,
    cue: 'Quick lift and let go, fully relaxing between each one.',
    easier: { name: 'Pelvic floor: 5 quick lifts', cue: 'Five per set, lying down.' }, core: true,
  },
  heelSlide: {
    id: 'heelSlide', name: 'Heel slides', area: 'core', dose: '3 sets of 10 each side', sets: 3,
    cue: 'On your back, breathe out and slide one heel away, keeping your tummy calm and flat. Slide it back.',
    easier: { name: 'Small heel slides', cue: 'Slide only halfway, slowly.' }, core: true,
  },
  bridge: {
    id: 'bridge', name: 'Glute bridge', area: 'legs', dose: '3 sets of 10', sets: 3,
    cue: 'Breathe out, lift your hips until your body is a straight line from knees to shoulders. Lower slowly.',
    easier: { name: 'Small bridge', cue: 'Lift your hips just off the floor.' }, core: true,
  },
  clam: {
    id: 'clam', name: 'Side-lying clam', area: 'legs', dose: '3 sets of 10 each side', sets: 3,
    cue: 'Lie on your side, knees bent. Keep your feet together and lift the top knee. Lower slowly.',
    easier: { name: 'Small clam', cue: 'Lift the knee only a little.' }, core: false,
  },
  wallPush: {
    id: 'wallPush', name: 'Wall push-up', area: 'arms', dose: '3 sets of 10', sets: 3,
    cue: 'Hands on the wall at shoulder height. Bend your elbows to bring your chest towards the wall, then push away.',
    easier: { name: 'Close wall push-up', cue: 'Stand closer to the wall.' }, core: false,
  },
  sitStand: {
    id: 'sitStand', name: 'Sit to stand', area: 'legs', dose: '3 sets of 10', sets: 3,
    cue: 'From a chair, breathe out as you stand without using your hands. Sit back down slowly.',
    easier: { name: 'Sit to stand with hands', cue: 'Push lightly off your thighs.' }, core: false,
  },
  toeTap: {
    id: 'toeTap', name: 'Toe taps', area: 'core', dose: '3 sets of 10 each side', sets: 3,
    cue: 'On your back with knees up over hips. Breathe out and lower one toe to tap the floor. Bring it back.',
    easier: { name: 'Feet-down marching', cue: 'Feet start on the floor; lift one foot a few centimetres.' }, core: true,
  },
  birdDog: {
    id: 'birdDog', name: 'Bird dog', area: 'core', dose: '3 sets of 8 each side', sets: 3,
    cue: 'On hands and knees. Reach one arm forward and the opposite leg back. Keep your back still.',
    easier: { name: 'Arm or leg only', cue: 'Move one arm, or one leg, at a time.' }, core: true,
  },
  calf: {
    id: 'calf', name: 'Calf raises', area: 'legs', dose: '3 sets of 10', sets: 3,
    cue: 'Hold the wall lightly. Rise onto your toes, then lower slowly.',
    easier: { name: 'Seated calf raises', cue: 'Sitting down, lift your heels.' }, core: false,
  },
  splitSquat: {
    id: 'splitSquat', name: 'Supported split squat', area: 'legs', dose: '3 sets of 8 each side', sets: 3,
    cue: 'One foot forward, one back, hand on a chair. Lower your back knee towards the floor and rise.',
    easier: { name: 'Small split squat', cue: 'Lower only a little.' }, core: false,
  },
  benchPush: {
    id: 'benchPush', name: 'Incline push-up', area: 'arms', dose: '3 sets of 8', sets: 3,
    cue: 'Hands on a sturdy bench or table. Lower your chest, then push away. Breathe out as you push.',
    easier: { name: 'Wall push-up', cue: 'Back to the wall version.' }, core: true,
  },
  sidePlank: {
    id: 'sidePlank', name: 'Side plank from knees', area: 'core', dose: '3 holds of 15 seconds each side', sets: 3,
    cue: 'On your side, elbow under shoulder, knees bent. Lift your hips. Keep breathing.',
    easier: { name: 'Side-lying hip lift', cue: 'Lift your hips just off the floor, 5 seconds.' }, core: true,
  },
  babyLift: {
    id: 'babyLift', name: 'Baby-weight lift', area: 'whole body', dose: '3 sets of 8', sets: 3,
    cue: 'Squat to pick up a weight about your baby’s weight (a laundry basket works). Breathe out as you lift.',
    easier: { name: 'Light basket lift', cue: 'Use a lighter basket.' }, core: true,
  },
  carry: {
    id: 'carry', name: 'Side carry walk', area: 'whole body', dose: '3 walks of 20 steps each side', sets: 3,
    cue: 'Carry a bag in one hand and walk tall. Don’t lean.',
    easier: { name: 'Light carry', cue: 'Use a lighter bag, 10 steps.' }, core: true,
  },
};

const PLAN: string[][] = [
  // Reconnect (weeks 1 to 2): days A to D
  ['breath', 'pfLong', 'heelSlide', 'bridge', 'clam', 'wallPush'],
  ['breath', 'pfQuick', 'heelSlide', 'sitStand', 'clam', 'wallPush'],
  ['breath', 'pfLong', 'bridge', 'calf', 'heelSlide', 'wallPush'],
  ['breath', 'pfQuick', 'sitStand', 'clam', 'bridge', 'wallPush'],
  // Rebuild (weeks 3 to 4)
  ['breath', 'pfLong', 'toeTap', 'bridge', 'sitStand', 'wallPush'],
  ['breath', 'pfQuick', 'birdDog', 'splitSquat', 'clam', 'wallPush'],
  ['breath', 'pfLong', 'toeTap', 'calf', 'sitStand', 'benchPush'],
  ['breath', 'pfQuick', 'birdDog', 'bridge', 'splitSquat', 'wallPush'],
  // Strengthen (weeks 5 to 6)
  ['pfLong', 'toeTap', 'birdDog', 'splitSquat', 'benchPush', 'bridge'],
  ['pfQuick', 'sidePlank', 'sitStand', 'calf', 'benchPush', 'clam'],
  ['pfLong', 'birdDog', 'splitSquat', 'bridge', 'benchPush', 'toeTap'],
  ['pfQuick', 'sidePlank', 'sitStand', 'splitSquat', 'benchPush', 'calf'],
  // Carry (weeks 7 to 8)
  ['pfLong', 'babyLift', 'splitSquat', 'benchPush', 'sidePlank', 'carry'],
  ['pfQuick', 'birdDog', 'babyLift', 'bridge', 'benchPush', 'carry'],
  ['pfLong', 'sidePlank', 'splitSquat', 'babyLift', 'benchPush', 'carry'],
  ['pfQuick', 'toeTap', 'babyLift', 'sitStand', 'benchPush', 'carry'],
];

export const TOTAL_DAYS = 32; // 8 weeks x 4 sessions
export const FREE_DAYS = 4; // the free week

export function weekOf(day: number) {
  return Math.ceil(day / 4);
}

export function phaseOf(day: number): Phase {
  const w = weekOf(day);
  return PHASES.find(p => w >= p.weeks[0] && w <= p.weeks[1]) ?? PHASES[0];
}

export function movesFor(day: number, version: 'full' | 'short'): Move[] {
  const w = weekOf(day); // 1..8
  const block = Math.floor((w - 1) / 2); // 0..3
  const slot = (day - 1) % 4; // 0..3
  const ids = PLAN[block * 4 + slot];
  const moves = ids.map(id => M[id]);
  return version === 'short' ? moves.slice(0, 2) : moves;
}

export function sessionTitle(day: number) {
  const titles = ['Gentle start', 'Steady core', 'Legs and lift', 'Whole body'];
  return titles[(day - 1) % 4];
}

export const ALL_MOVES = M;
