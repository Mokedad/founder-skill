import { useState } from 'react';
import { weekOf } from '../program';
import { addPost, addReply, nextDay, useStore } from '../store';
import { Back, Page } from '../ui';

const ago = (iso: string) => new Date(iso).toLocaleString('en-AU', { weekday: 'short', hour: 'numeric', minute: '2-digit' });

// S10
export function Group() {
  const s = useStore();
  const [text, setText] = useState('');
  const start = s.profile ? new Date(s.profile.startedAt) : new Date();
  // Groups start on Mondays: the Monday on or after sign-up.
  const monday = new Date(start);
  monday.setDate(start.getDate() + ((8 - start.getDay()) % 7));
  return (
    <Page label="My group">
      <div className="stack">
        <span className="eyebrow">Your group</span>
        <h1>Mums starting with you</h1>
        <p className="muted small">
          A small group that starts the week of {monday.toLocaleDateString('en-AU', { day: 'numeric', month: 'long' })}.
          Never share symptoms you'd rather keep private.
        </p>
      </div>
      <div className="notice info small">Prototype: posts stay on this phone. The real group opens with the founding cohort.</div>
      <form
        className="card"
        onSubmit={async e => {
          e.preventDefault();
          if (!text.trim()) return;
          await addPost(text.trim().slice(0, 500));
          setText('');
        }}
      >
        <label className="field">
          Share a win or ask the group
          <textarea value={text} maxLength={500} onChange={e => setText(e.target.value)} placeholder="Did my first session during the 2pm nap!" />
        </label>
        <button className="btn primary" type="submit" disabled={!text.trim()}>Post</button>
      </form>
      {s.posts.length === 0 ? (
        <p className="small muted">No posts yet. Be the first to say hello.</p>
      ) : (
        s.posts.map(p => (
          <div className="card" key={p.id}>
            <span className="small muted">You · {ago(p.at)}</span>
            <p style={{ whiteSpace: 'pre-wrap' }}>{p.text}</p>
          </div>
        ))
      )}
    </Page>
  );
}

// S11
export function CheckIn() {
  const s = useStore();
  const day = Math.min(nextDay(s), 32);
  const week = weekOf(day);
  const existing = s.replies.find(r => r.week === week);
  const [text, setText] = useState(existing?.text ?? '');
  const [saved, setSaved] = useState(false);
  return (
    <Page label="Weekly check-in">
      <Back to="today" />
      <div className="stack">
        <span className="eyebrow">Week {week} check-in</span>
        <h1>How's your week going?</h1>
      </div>
      <div className="card">
        <span className="small muted">From the founder · sample message</span>
        <p>
          Hi! You're in week {week}. However many sessions you fit in, that counts. One question: what got in the way
          this week, and what helped? I read every answer.
        </p>
      </div>
      <form
        className="stack"
        onSubmit={async e => {
          e.preventDefault();
          await addReply(week, text.trim());
          setSaved(true);
        }}
      >
        <label className="field">
          Your answer
          <textarea value={text} maxLength={1000} onChange={e => { setText(e.target.value); setSaved(false); }} />
        </label>
        <button className="btn primary" type="submit" disabled={!text.trim()}>{existing ? 'Update answer' : 'Send'}</button>
        {saved && <p className="small" role="status" style={{ color: 'var(--success)' }}>Sent. Thank you!</p>}
      </form>
    </Page>
  );
}
