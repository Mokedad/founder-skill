import { useEffect, useMemo, useRef, useState } from 'react';
import { TOTAL_DAYS, movesFor, sessionTitle } from '../program';
import { addFeel, completeSession, easierByDefault, isLocked, nextDay, useStore, type Effort } from '../store';
import { Chip, DraftTag, Page, go, hasFlag } from '../ui';

function useElapsed(running: boolean) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs(x => x + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  return secs;
}
const mmss = (t: number) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;

// S06
export function SessionPlayer({ day }: { day: number }) {
  const s = useStore();
  const valid = Number.isInteger(day) && day >= 1 && day <= TOTAL_DAYS;
  const reachable = valid && (day <= nextDay(s) || s.sessions.some(x => x.day === day));
  const locked = valid && isLocked(s, day);

  useEffect(() => {
    if (!valid || !reachable) go('today');
    else if (locked) go('unlock');
  }, [valid, reachable, locked]);

  const version: 'full' | 'short' = hasFlag('short') || s.profile?.minutes === 5 ? 'short' : 'full';
  const moves = useMemo(() => (valid ? movesFor(day, version) : []), [day, version, valid]);
  const defaults = useMemo(() => easierByDefault(s), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [easier, setEasier] = useState<Set<string>>(() => new Set(moves.filter(m => defaults.has(m.id)).map(m => m.id)));
  const [pain, setPain] = useState<string[]>([]);
  const [setsDone, setSetsDone] = useState<Record<string, number>>({});
  const [paused, setPaused] = useState(false);
  const [hurt, setHurt] = useState(false);
  const [rest, setRest] = useState(0);
  const elapsed = useElapsed(!paused);
  const restTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (rest <= 0) return;
    restTimer.current = window.setTimeout(() => setRest(r => r - 1), 1000);
    return () => clearTimeout(restTimer.current);
  }, [rest]);

  if (!valid || !reachable || locked || moves.length === 0) return null;

  const m = moves[i];
  const isEasier = easier.has(m.id);
  const done = setsDone[m.id] ?? 0;
  const last = i === moves.length - 1;

  async function finish(stoppedEarly = false) {
    await completeSession({ day, version, easierMoves: [...easier], painMoves: pain });
    go(`feel/${day}${stoppedEarly || pain.length ? '?pain' : ''}`);
  }

  function toggleEasier() {
    setEasier(e => {
      const n = new Set(e);
      if (n.has(m.id)) n.delete(m.id);
      else n.add(m.id);
      return n;
    });
  }

  function tapSet(k: number) {
    const next = done === k + 1 ? k : k + 1;
    setSetsDone({ ...setsDone, [m.id]: next });
    if (next > done && next < m.sets) setRest(30);
  }

  return (
    <Page nav={false} label={`Session ${day}`}>
      <div className="spread">
        <button className="btn ghost" type="button" onClick={() => go('today')}>✕ Close</button>
        <span className="small muted">Move {i + 1} of {moves.length}</span>
      </div>
      <div className="bar" aria-hidden="true"><span style={{ width: `${((i + 1) / moves.length) * 100}%` }} /></div>

      <div className="stack" style={{ gap: 4 }}>
        <span className="eyebrow">{sessionTitle(day)} · {version === 'short' ? '5-minute version' : 'full session'}</span>
        <div className="spread">
          <span className="timer" aria-label={`Elapsed ${mmss(elapsed)}`}>{mmss(elapsed)}</span>
          <button className="btn secondary" type="button" onClick={() => setPaused(p => !p)}>{paused ? 'Resume' : 'Pause'}</button>
        </div>
      </div>

      <div className="card accent" aria-live="polite">
        <span className="small muted" style={{ textTransform: 'capitalize' }}>{m.area}</span>
        <h2>{isEasier ? m.easier.name : m.name}</h2>
        <p><strong>{m.dose}</strong></p>
        <p className="small">{isEasier ? m.easier.cue : m.cue}</p>
        <div
          aria-hidden="true"
          style={{ height: 140, borderRadius: 14, background: 'var(--accent-soft)', display: 'grid', placeItems: 'center' }}
        >
          <span className="small muted">Follow-along video goes here</span>
        </div>
        <DraftTag />
        {m.sets > 1 && (
          <div className="stack" style={{ gap: 8 }}>
            <span className="small muted">Tap each set as you finish it</span>
            <div className="sets">
              {Array.from({ length: m.sets }, (_, k) => (
                <button key={k} type="button" className="set-btn" aria-pressed={k < done} aria-label={`Set ${k + 1}`} onClick={() => tapSet(k)}>
                  {k + 1}
                </button>
              ))}
            </div>
            {rest > 0 && <span className="small" role="timer">Rest {rest}s</span>}
          </div>
        )}
        <label className="switch">
          <input type="checkbox" checked={isEasier} onChange={toggleEasier} />
          Easier option
        </label>
      </div>

      {hurt ? (
        <div className="notice" role="alert">
          <strong>Stop this move.</strong>
          <span className="small">
            Pain, leaking, heaviness or doming means this move isn't right for you today. We've noted it, and it will start
            on the easier option next time.
          </span>
          <div className="stack" style={{ gap: 8, marginTop: 8 }}>
            {!isEasier && (
              <button className="btn secondary" type="button" onClick={() => { toggleEasier(); setHurt(false); }}>
                Try the easier option
              </button>
            )}
            {!last && (
              <button className="btn secondary" type="button" onClick={() => { setHurt(false); setI(i + 1); }}>
                Skip to the next move
              </button>
            )}
            <button className="btn danger" type="button" onClick={() => finish(true)}>End today's session</button>
            <span className="small">If pain is sharp or doesn't settle, see your GP or a women's health physio.</span>
          </div>
        </div>
      ) : (
        <button
          className="btn danger"
          type="button"
          onClick={() => {
            setHurt(true);
            setPain(p => (p.includes(m.id) ? p : [...p, m.id]));
          }}
        >
          This hurts
        </button>
      )}

      <div className="row">
        <button className="btn secondary" type="button" disabled={i === 0} onClick={() => setI(i - 1)}>Previous</button>
        <button className="btn primary grow" type="button" onClick={() => (last ? finish() : setI(i + 1))}>
          {last ? 'Finish' : 'Next move'}
        </button>
      </div>
    </Page>
  );
}

// S07
export function HowDidItFeel({ day }: { day: number }) {
  const startPain = hasFlag('pain');
  const [leaking, setLeaking] = useState<boolean | null>(null);
  const [doming, setDoming] = useState<boolean | null>(null);
  const [pain, setPain] = useState<boolean | null>(startPain ? true : null);
  const [effort, setEffort] = useState<Effort | null>(null);
  const ready = leaking !== null && doming !== null && pain !== null && effort !== null;

  useEffect(() => {
    if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS) go('today');
  }, [day]);

  const yesNo = (v: boolean | null, set: (b: boolean) => void) => (
    <div className="chips">
      <Chip on={v === false} onClick={() => set(false)}>No</Chip>
      <Chip on={v === true} onClick={() => set(true)}>Yes</Chip>
    </div>
  );

  return (
    <Page nav={false} label="How did it feel">
      <div className="stack" style={{ marginTop: 16 }}>
        <span className="eyebrow">Session {day} done</span>
        <h1>How did that feel?</h1>
        <p className="muted">Four taps. Your answers shape the next session.</p>
      </div>
      <div className="stack">
        <h3>Any leaking?</h3>
        {yesNo(leaking, setLeaking)}
        <h3>Any doming or bulging in your tummy?</h3>
        {yesNo(doming, setDoming)}
        <h3>Any pain?</h3>
        {yesNo(pain, setPain)}
        <h3>How hard was it?</h3>
        <div className="chips">
          <Chip on={effort === 'too_easy'} onClick={() => setEffort('too_easy')}>Too easy</Chip>
          <Chip on={effort === 'right'} onClick={() => setEffort('right')}>About right</Chip>
          <Chip on={effort === 'too_hard'} onClick={() => setEffort('too_hard')}>Too hard</Chip>
        </div>
      </div>
      {(leaking || doming || pain) && (
        <p className="notice small">Thanks for telling us. Your next session starts core moves on their easier option.</p>
      )}
      <div className="grow" />
      <button
        className="btn primary block"
        type="button"
        disabled={!ready}
        onClick={async () => {
          await addFeel({ day, leaking: !!leaking, doming: !!doming, pain: !!pain, effort: effort! });
          go('today');
        }}
      >
        Save
      </button>
    </Page>
  );
}
