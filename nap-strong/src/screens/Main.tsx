import { FREE_DAYS, PHASES, TOTAL_DAYS, movesFor, phaseOf, sessionTitle, weekOf } from '../program';
import { doneThisWeek, isLocked, needsCare, nextDay, selfCheckDue, useStore } from '../store';
import { Page } from '../ui';

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });

// S05
export function Today() {
  const s = useStore();
  const p = s.profile!;
  const day = nextDay(s);
  const finished = day > TOTAL_DAYS;
  const locked = !finished && isLocked(s, day);
  const version = p.minutes === 5 ? 'short' : 'full';
  const care = needsCare(s);
  const todayDone = s.sessions.some(x => new Date(x.completedAt).toDateString() === new Date().toDateString());
  const week = finished ? 8 : weekOf(day);
  const isFriday = new Date().getDay() === 5;
  const hasReply = s.replies.some(r => r.week === week);

  return (
    <Page label="Today">
      <div className="stack">
        <span className="eyebrow">{finished ? 'Program complete' : `Week ${week} · ${phaseOf(day).name}`}</span>
        <h1>{todayDone ? 'Done for today.' : finished ? 'You did all 8 weeks.' : 'Ready when the baby naps.'}</h1>
      </div>

      {care && (
        <div className="notice" role="status">
          <strong>Your core moves are on their easier option.</strong>
          <span className="small">
            Leaking, doming or pain came up in 2 recent sessions. That's worth a visit to a women's health physio.
            Keep going gently, and stop anything that hurts.
          </span>
        </div>
      )}

      {finished ? (
        <div className="card accent">
          <h2>32 sessions done.</h2>
          <p className="muted">Do a final self-check to see how far you've come.</p>
          <a className="btn primary" href="#self-check">Final self-check</a>
        </div>
      ) : locked ? (
        <div className="card accent">
          <span className="eyebrow">Free week done</span>
          <h2>Keep going: weeks 2 to 8</h2>
          <p className="muted">One payment, no subscription. Pick up exactly where you are.</p>
          <a className="btn primary" href="#unlock">See what's included</a>
        </div>
      ) : (
        <div className="card accent">
          <div className="spread">
            <span className="small muted">Session {day} of {TOTAL_DAYS}</span>
            <span className="small muted">{version === 'short' ? '5 min' : `${p.minutes} min`}</span>
          </div>
          <h2>{sessionTitle(day)}</h2>
          <p className="small muted">
            {movesFor(day, version).map(m => m.name).join(' · ')}
          </p>
          <a className="btn primary" href={`#session-${day}`}>{todayDone ? 'Do another session' : 'Start'}</a>
          {version === 'full' && (
            <a className="btn ghost" href={`#session-${day}-short`}>Only 5 minutes today</a>
          )}
        </div>
      )}

      {!finished && (
        <div className="card">
          <div className="spread">
            <h3>This week</h3>
            <span className="small muted">{doneThisWeek(s, day)} of 4</span>
          </div>
          <div className="progress-dots" aria-label={`${doneThisWeek(s, day)} of 4 sessions this week`}>
            {[1, 2, 3, 4].map(i => {
              const d = (week - 1) * 4 + i;
              const done = s.sessions.some(x => x.day === d);
              return <span key={d} className={'dot' + (done ? ' done' : d === day ? ' current' : '')} />;
            })}
          </div>
          <p className="small muted">Missed a day? Nothing resets. You pick up where you left off.</p>
        </div>
      )}

      {selfCheckDue(s) && (
        <div className="card">
          <h3>Tummy gap self-check due</h3>
          <p className="small muted">One minute, every 2 weeks.</p>
          <a className="btn secondary" href="#self-check">Do it now</a>
        </div>
      )}

      {(isFriday || s.sessions.length >= 2) && (
        <div className="card">
          <h3>Weekly check-in</h3>
          <p className="small muted">{hasReply ? 'Thanks, your answer is in.' : 'One question from me about your week.'}</p>
          <a className="btn secondary" href="#checkin">{hasReply ? 'See check-in' : 'Answer'}</a>
        </div>
      )}
    </Page>
  );
}

// S08
export function ProgramMap() {
  const s = useStore();
  const current = nextDay(s);
  return (
    <Page label="Program">
      <div className="stack">
        <span className="eyebrow">8 weeks · 4 sessions a week</span>
        <h1>Your program</h1>
      </div>
      {PHASES.map(ph => (
        <div className="card" key={ph.name}>
          <div className="stack" style={{ gap: 4 }}>
            <h3>{ph.name}</h3>
            <p className="small muted">Weeks {ph.weeks[0]} to {ph.weeks[1]} · {ph.aim}</p>
          </div>
          {[ph.weeks[0], ph.weeks[1]].map(w => (
            <div className="week" key={w}>
              <span className="small"><strong>Week {w}</strong>{w === 1 ? ' · free' : ''}</span>
              <div className="progress-dots">
                {[1, 2, 3, 4].map(i => {
                  const d = (w - 1) * 4 + i;
                  const done = s.sessions.some(x => x.day === d);
                  const locked = isLocked(s, d);
                  const open = !locked && (done || d === current);
                  const cls = 'dot' + (done ? ' done' : d === current ? ' current' : '');
                  const label = `Session ${d}${done ? ', done' : locked ? ', locked' : d === current ? ', next' : ''}`;
                  return open ? (
                    <a key={d} className={cls} href={`#session-${d}`} aria-label={label} />
                  ) : (
                    <span key={d} className={cls} aria-label={label} role="img" />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
      {!s.profile?.paidAt && (
        <p className="small muted">Sessions {FREE_DAYS + 1} to {TOTAL_DAYS} open with the full program.</p>
      )}
    </Page>
  );
}

// S09
export function Progress() {
  const s = useStore();
  const done = s.sessions.length;
  const checks = s.selfChecks;
  const weeks = Array.from({ length: 8 }, (_, i) => i + 1);
  const feelsByWeek = weeks.map(w => {
    const f = s.feels.filter(x => weekOf(x.day) === w);
    return { w, total: f.length, flagged: f.filter(x => x.leaking || x.doming).length };
  });

  return (
    <Page label="Progress">
      <div className="stack">
        <span className="eyebrow">Your progress</span>
        <h1>{done === 0 ? 'Your first session is waiting.' : `${done} session${done === 1 ? '' : 's'} done`}</h1>
      </div>
      <div className="card">
        <div className="spread"><h3>Program</h3><span className="small muted">{done} of {TOTAL_DAYS}</span></div>
        <div className="bar"><span style={{ width: `${(done / TOTAL_DAYS) * 100}%` }} /></div>
      </div>

      <div className="card">
        <h3>Tummy gap</h3>
        {checks.length === 0 ? (
          <>
            <p className="small muted">No self-checks yet.</p>
            <a className="btn secondary" href="#self-check">Do your first</a>
          </>
        ) : (
          <table className="small" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}><th>Date</th><th>Fingers</th><th>Doming</th></tr>
            </thead>
            <tbody>
              {checks.map(c => (
                <tr key={c.at}><td>{fmt(c.at)}</td><td>{c.widthFingers === 4 ? '4+' : c.widthFingers}</td><td>{c.doming ? 'Yes' : 'No'}</td></tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="small muted">A narrower, firmer gap over time is the goal. Your physio can measure it properly.</p>
      </div>

      <div className="card">
        <h3>Leaking or doming after sessions</h3>
        {s.feels.length === 0 ? (
          <p className="small muted">Shows up after your first session.</p>
        ) : (
          <div className="stack" style={{ gap: 8 }}>
            {feelsByWeek.filter(x => x.total > 0).map(x => (
              <div key={x.w} className="spread small">
                <span>Week {x.w}</span>
                <span className="muted">{x.flagged} of {x.total} sessions</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
