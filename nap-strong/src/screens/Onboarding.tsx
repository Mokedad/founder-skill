import { useState } from 'react';
import { addSelfCheck, saveProfile, updateProfile, useStore, type Symptom } from '../store';
import { Back, Chip, Page, go } from '../ui';

// S01
export function Welcome() {
  return (
    <Page nav={false} label="Welcome">
      <div className="stack" style={{ marginTop: 24 }}>
        <span className="eyebrow">Nap Strong</span>
        <h1>Stronger by the time they wake.</h1>
        <p className="muted">
          A postpartum strength program in nap-sized sessions: 15 minutes for your pelvic floor, tummy gap, core,
          legs and arms.
        </p>
      </div>
      <div className="card">
        <div className="stack small">
          <p><strong>15 minutes, 4 days a week.</strong> There's a 5-minute version of every session too.</p>
          <p><strong>Made by a mum of three</strong> who has been through it.</p>
          <p><strong>Physio review:</strong> pending. A named women's health physio will sign off every move before launch.</p>
          <p><strong>Pay once.</strong> First week free, then a one-off price. No subscription, nothing to cancel.</p>
        </div>
      </div>
      <a className="btn primary block" href="#/check">Start the free week</a>
      <p className="small muted">
        Takes 2 minutes. Your answers stay on this phone in this prototype. Check with your GP or physio before starting
        any exercise after birth.
      </p>
    </Page>
  );
}

// S02
const SYMPTOMS: [Symptom, string][] = [
  ['leaking', 'Leaking when I cough, sneeze or jump'],
  ['doming', 'My tummy domes or bulges when I sit up'],
  ['heaviness', 'Heaviness or dragging down below'],
  ['pain', 'Pain in my pelvis, back or scar'],
  ['bleeding', 'Bleeding that has come back or got heavier'],
];

export function QuickCheck() {
  const [step, setStep] = useState(0);
  const [weeks, setWeeks] = useState('');
  const [birth, setBirth] = useState<'vaginal' | 'caesarean' | null>(null);
  const [cleared, setCleared] = useState<'yes' | 'no' | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [none, setNone] = useState(false);
  const [minutes, setMinutes] = useState<5 | 15 | 20>(15);
  const steps = 5;
  const w = Number(weeks);
  const weeksOk = weeks !== '' && Number.isFinite(w) && w >= 0 && w <= 104;

  const canNext = [weeksOk, !!birth, !!cleared, none || symptoms.length > 0, true][step];

  async function finish() {
    const redFlags: string[] = [];
    if (w < 6) redFlags.push('under6');
    if (cleared === 'no') redFlags.push('notCleared');
    (['heaviness', 'pain', 'bleeding'] as Symptom[]).forEach(x => symptoms.includes(x) && redFlags.push(x));
    await saveProfile({ weeksPostpartum: w, birthType: birth!, gpCleared: cleared === 'yes', symptoms, minutes, redFlags });
    go(redFlags.length ? 'physio' : 'self-check');
  }

  const toggle = (x: Symptom) => {
    setNone(false);
    setSymptoms(s => (s.includes(x) ? s.filter(y => y !== x) : [...s, x]));
  };

  return (
    <Page nav={false} label="Quick check">
      {step === 0 ? <Back to="" /> : (
        <div className="topbar">
          <button className="btn ghost" type="button" onClick={() => setStep(step - 1)}>‹ Back</button>
        </div>
      )}
      <div className="stack">
        <span className="eyebrow">Quick check · {step + 1} of {steps}</span>
        <div className="bar" aria-hidden="true"><span style={{ width: `${((step + 1) / steps) * 100}%` }} /></div>
      </div>

      {step === 0 && (
        <div className="stack">
          <h2>How many weeks since your baby was born?</h2>
          <label className="field">
            Weeks
            <input type="number" inputMode="numeric" min={0} max={104} value={weeks} onChange={e => setWeeks(e.target.value)} />
          </label>
          {weeks !== '' && !weeksOk && <p className="small" style={{ color: 'var(--danger)' }}>Enter a number from 0 to 104.</p>}
        </div>
      )}
      {step === 1 && (
        <div className="stack">
          <h2>How was your baby born?</h2>
          <div className="chips">
            <Chip on={birth === 'vaginal'} onClick={() => setBirth('vaginal')}>Vaginal birth</Chip>
            <Chip on={birth === 'caesarean'} onClick={() => setBirth('caesarean')}>Caesarean</Chip>
          </div>
          {birth === 'caesarean' && <p className="small muted">Your first weeks start gentler around your scar.</p>}
        </div>
      )}
      {step === 2 && (
        <div className="stack">
          <h2>Has your GP or physio cleared you to exercise?</h2>
          <p className="small muted">Usually at your 6-week check.</p>
          <div className="chips">
            <Chip on={cleared === 'yes'} onClick={() => setCleared('yes')}>Yes</Chip>
            <Chip on={cleared === 'no'} onClick={() => setCleared('no')}>Not yet</Chip>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="stack">
          <h2>Do any of these happen right now?</h2>
          <p className="small muted">Choose all that apply. This stays private.</p>
          <div className="chips">
            {SYMPTOMS.map(([id, label]) => (
              <Chip key={id} on={symptoms.includes(id)} onClick={() => toggle(id)}>{label}</Chip>
            ))}
            <Chip on={none} onClick={() => { setNone(!none); setSymptoms([]); }}>None of these</Chip>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="stack">
          <h2>How long do you usually get?</h2>
          <p className="small muted">You can change this any day.</p>
          <div className="chips">
            {([5, 15, 20] as const).map(m => (
              <Chip key={m} on={minutes === m} onClick={() => setMinutes(m)}>{m} minutes</Chip>
            ))}
          </div>
        </div>
      )}

      <div className="grow" />
      <button
        className="btn primary block"
        type="button"
        disabled={!canNext}
        onClick={() => (step < steps - 1 ? setStep(step + 1) : finish())}
      >
        {step < steps - 1 ? 'Next' : 'See my plan'}
      </button>
    </Page>
  );
}

// S03
const FLAG_TEXT: Record<string, string> = {
  under6: 'It is less than 6 weeks since your baby was born.',
  notCleared: 'Your GP or physio hasn’t cleared you to exercise yet.',
  heaviness: 'You have heaviness or a dragging feeling, which can be a sign of prolapse.',
  pain: 'You have pain in your pelvis, back or scar.',
  bleeding: 'Your bleeding has come back or got heavier.',
};

export function SeePhysio() {
  const s = useStore();
  const flags = s.profile?.redFlags ?? [];
  return (
    <Page nav={false} label="See a physio first">
      <div className="stack" style={{ marginTop: 16 }}>
        <span className="eyebrow">Before you start</span>
        <h1>Let's get a physio's OK first.</h1>
        <p className="muted">Exercise can still help you. A quick check with a professional makes sure it's the right kind.</p>
      </div>
      {flags.length > 0 && (
        <div className="notice">
          <strong>Why we're pausing</strong>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {flags.map(f => <li key={f}>{FLAG_TEXT[f] ?? f}</li>)}
          </ul>
        </div>
      )}
      <div className="card">
        <h3>Find a women's health physio</h3>
        <p className="small">
          Search “women's health” or “pelvic health” on the Australian Physiotherapy Association's directory.
          For heavy bleeding, fever or severe pain, contact your GP or call 000 in an emergency.
        </p>
        <a className="btn secondary" href="https://choose.physio" target="_blank" rel="noreferrer">Open choose.physio</a>
      </div>
      <div className="grow" />
      <button
        className="btn ghost"
        type="button"
        onClick={async () => {
          await updateProfile({ redFlags: [] });
          go('check');
        }}
      >
        I've been cleared now: redo my quick check
      </button>
    </Page>
  );
}

// S04
export function SelfCheckScreen() {
  const s = useStore();
  const [width, setWidth] = useState<number | null>(null);
  const [doming, setDoming] = useState<boolean | null>(null);
  const first = s.selfChecks.length === 0;
  return (
    <Page nav={!first} label="Tummy gap self-check">
      {!first && <Back to="today" />}
      <div className="stack">
        <span className="eyebrow">{first ? 'Your starting point' : 'Every 2 weeks'}</span>
        <h1>Tummy gap self-check</h1>
        <p className="muted">One minute. It shows your progress over the 8 weeks.</p>
      </div>
      <div className="card">
        <ol className="small" style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 6 }}>
          <li>Lie on your back, knees bent, feet flat.</li>
          <li>Place your fingertips across your belly button, pointing down.</li>
          <li>Breathe out and lift your head and shoulders a little.</li>
          <li>Feel how many fingers fit in the gap, and watch for a ridge or dome.</li>
        </ol>
        <span className="draft-tag">Draft steps · waiting for physio sign-off</span>
      </div>
      <div className="stack">
        <h3>How many fingers wide?</h3>
        <div className="chips">
          {[0, 1, 2, 3, 4].map(n => (
            <Chip key={n} on={width === n} onClick={() => setWidth(n)}>{n === 4 ? '4 or more' : n}</Chip>
          ))}
        </div>
        <h3>Did your tummy dome or ridge?</h3>
        <div className="chips">
          <Chip on={doming === true} onClick={() => setDoming(true)}>Yes</Chip>
          <Chip on={doming === false} onClick={() => setDoming(false)}>No</Chip>
        </div>
      </div>
      <div className="grow" />
      <button
        className="btn primary block"
        type="button"
        disabled={width === null || doming === null}
        onClick={async () => {
          await addSelfCheck({ widthFingers: width!, doming: doming! });
          go('today');
        }}
      >
        Save
      </button>
      {first && (
        <button className="btn ghost" type="button" onClick={() => go('today')}>Skip for now</button>
      )}
    </Page>
  );
}
