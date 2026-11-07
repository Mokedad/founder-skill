// Data layer. Prototype: everything lives in this browser's localStorage.
// Production: replace the bodies with Supabase calls; keep the signatures,
// so no screen code changes (see replica/architecture.md).
import { useSyncExternalStore } from 'react';
import { FREE_DAYS, TOTAL_DAYS, movesFor } from './program';

export type Symptom = 'leaking' | 'heaviness' | 'pain' | 'doming' | 'bleeding';
export type Effort = 'too_easy' | 'right' | 'too_hard';

export type Profile = {
  weeksPostpartum: number;
  birthType: 'vaginal' | 'caesarean';
  gpCleared: boolean;
  symptoms: Symptom[];
  minutes: 5 | 15 | 20;
  redFlags: string[];
  startedAt: string;
  paidAt: string | null;
  reminder: string;
};

export type SessionLog = {
  day: number;
  version: 'full' | 'short';
  easierMoves: string[];
  painMoves: string[];
  completedAt: string;
};
export type Feel = { day: number; leaking: boolean; doming: boolean; pain: boolean; effort: Effort; at: string };
export type SelfCheck = { widthFingers: number; doming: boolean; at: string };
export type Post = { id: string; text: string; at: string };
export type Reply = { week: number; text: string; at: string };

export type State = {
  profile: Profile | null;
  sessions: SessionLog[];
  feels: Feel[];
  selfChecks: SelfCheck[];
  posts: Post[];
  replies: Reply[];
};

const KEY = 'nap-strong:v1';
const EMPTY: State = { profile: null, sessions: [], feels: [], selfChecks: [], posts: [], replies: [] };

let state: State = load();
const listeners = new Set<() => void>();

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function save(next: State) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode or storage blocked: keep working in memory */
  }
  listeners.forEach(l => l());
}

export function useStore(): State {
  return useSyncExternalStore(
    l => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );
}

const now = () => new Date().toISOString();

// ---- writes (async, like the future API) ----

export async function saveProfile(p: Omit<Profile, 'startedAt' | 'paidAt' | 'reminder'>) {
  // Redoing the quick check keeps the start date, payment and reminder.
  const prev = state.profile;
  save({
    ...state,
    profile: { ...p, startedAt: prev?.startedAt ?? now(), paidAt: prev?.paidAt ?? null, reminder: prev?.reminder ?? '13:00' },
  });
}

export async function updateProfile(patch: Partial<Profile>) {
  if (!state.profile) return;
  save({ ...state, profile: { ...state.profile, ...patch } });
}

export async function completeSession(log: Omit<SessionLog, 'completedAt'>) {
  const others = state.sessions.filter(s => s.day !== log.day);
  save({ ...state, sessions: [...others, { ...log, completedAt: now() }] });
}

export async function addFeel(f: Omit<Feel, 'at'>) {
  save({ ...state, feels: [...state.feels.filter(x => x.day !== f.day), { ...f, at: now() }] });
}

export async function addSelfCheck(c: Omit<SelfCheck, 'at'>) {
  save({ ...state, selfChecks: [...state.selfChecks, { ...c, at: now() }] });
}

export async function addPost(text: string) {
  save({ ...state, posts: [{ id: crypto.randomUUID(), text, at: now() }, ...state.posts] });
}

export async function addReply(week: number, text: string) {
  save({ ...state, replies: [...state.replies.filter(r => r.week !== week), { week, text, at: now() }] });
}

/** Prototype only: no payment is taken. Production: Stripe Checkout + webhook. */
export async function unlockDemo() {
  await updateProfile({ paidAt: now() });
}

export async function deleteEverything() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  save(EMPTY);
}

export function exportJson(): string {
  return JSON.stringify(state, null, 2);
}

// ---- derived values ----

/** The next day to do. Missed days never reset anything. */
export function nextDay(s: State): number {
  const done = new Set(s.sessions.map(x => x.day));
  for (let d = 1; d <= TOTAL_DAYS; d++) if (!done.has(d)) return d;
  return TOTAL_DAYS + 1;
}

export function isLocked(s: State, day: number) {
  return day > FREE_DAYS && !s.profile?.paidAt;
}

export function doneThisWeek(s: State, day: number) {
  const week = Math.ceil(day / 4);
  return s.sessions.filter(x => Math.ceil(x.day / 4) === week).length;
}

/** Leaking or doming in 2 or more recent sessions: easier core moves + a physio suggestion. */
export function needsCare(s: State) {
  const recent = [...s.feels].sort((a, b) => b.day - a.day).slice(0, 4);
  const flagged = recent.filter(f => f.leaking || f.doming || f.pain).length;
  return flagged >= 2;
}

/** Moves that start on the easier option. */
export function easierByDefault(s: State): Set<string> {
  const ids = new Set<string>();
  s.sessions.forEach(x => x.painMoves.forEach(m => ids.add(m)));
  const last = [...s.feels].sort((a, b) => b.day - a.day)[0];
  const care = needsCare(s);
  if (care || last?.effort === 'too_hard') {
    // all core-affecting moves start easier
    for (let d = 1; d <= TOTAL_DAYS; d++) movesFor(d, 'full').forEach(m => m.core && ids.add(m.id));
  }
  return ids;
}

export function selfCheckDue(s: State) {
  if (!s.selfChecks.length) return true;
  const last = new Date(s.selfChecks[s.selfChecks.length - 1].at).getTime();
  return Date.now() - last > 14 * 864e5;
}
