import { useState } from 'react';
import { deleteEverything, exportJson, unlockDemo, updateProfile, useStore } from '../store';
import { Back, Chip, Page, go } from '../ui';

// S12
export function Unlock() {
  const s = useStore();
  const paid = !!s.profile?.paidAt;
  return (
    <Page label="Unlock the program">
      <Back to="today" />
      <div className="stack">
        <span className="eyebrow">The full program</span>
        <h1>{paid ? 'You have the full program.' : 'Weeks 2 to 8, paid once.'}</h1>
      </div>
      <div className="card accent">
        <div className="spread">
          <h2>A$19.99</h2>
          <span className="small muted">one-off · founding price</span>
        </div>
        <ul className="small" style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 6 }}>
          <li>28 more sessions, 15 minutes each, with 5-minute versions</li>
          <li>An easier option for every move</li>
          <li>Tummy gap self-check every 2 weeks</li>
          <li>A small group of mums starting with you</li>
          <li>A weekly check-in from the founder</li>
        </ul>
        <p className="small muted">No subscription and nothing renews. Full refund within 14 days, no questions.</p>
        {paid ? (
          <a className="btn primary" href="#today">Back to today</a>
        ) : (
          <button
            className="btn primary"
            type="button"
            onClick={async () => {
              await unlockDemo();
              go('today');
            }}
          >
            Unlock (demo: no payment is taken)
          </button>
        )}
      </div>
      <p className="small muted">
        Prototype: this button unlocks the program on this phone without any payment. The live app will use a secure
        Stripe checkout page.
      </p>
    </Page>
  );
}

// S13
export function Account() {
  const s = useStore();
  const p = s.profile;
  const [confirm, setConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  if (!p) return null;
  return (
    <Page label="Account">
      <div className="stack">
        <span className="eyebrow">Account</span>
        <h1>Settings</h1>
      </div>
      <div className="card">
        <h3>Session length</h3>
        <div className="chips">
          {([5, 15, 20] as const).map(m => (
            <Chip key={m} on={p.minutes === m} onClick={() => updateProfile({ minutes: m })}>{m} min</Chip>
          ))}
        </div>
        <label className="field">
          Reminder time
          <input type="time" value={p.reminder} onChange={e => updateProfile({ reminder: e.target.value })} />
        </label>
        <p className="small muted">Prototype: reminders aren't sent yet.</p>
      </div>
      <div className="card">
        <h3>Your answers</h3>
        <p className="small muted">
          {p.weeksPostpartum} weeks after birth · {p.birthType === 'caesarean' ? 'caesarean' : 'vaginal birth'} ·{' '}
          {p.paidAt ? 'full program' : 'free week'}
        </p>
        <a className="btn secondary" href="#check">Redo the quick check</a>
      </div>
      <div className="card">
        <h3>Your data</h3>
        <p className="small muted">Everything stays on this phone in this prototype. Symptom answers are never shared with the group.</p>
        <button
          className="btn secondary"
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(exportJson());
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? 'Copied to clipboard' : 'Copy my data'}
        </button>
        {confirm ? (
          <div className="notice" role="alert">
            <strong>Delete everything?</strong>
            <span className="small">Your answers, sessions and self-checks will be gone from this phone.</span>
            <div className="row">
              <button className="btn secondary" type="button" onClick={() => setConfirm(false)}>Cancel</button>
              <button
                className="btn danger"
                type="button"
                onClick={async () => {
                  await deleteEverything();
                  go('');
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <button className="btn danger" type="button" onClick={() => setConfirm(true)}>Delete my data</button>
        )}
      </div>
      <p className="small muted">Nap Strong prototype · exercises are drafts waiting for physio sign-off · not medical advice.</p>
    </Page>
  );
}
