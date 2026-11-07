import { useEffect, useState, type ReactNode } from 'react';

export function useRoute(): string[] {
  // Routes are plain names (#today, #session-5, #session-5-short, #feel-5-pain): the artifact host only passes plain #names.
  const read = () => {
    const h = window.location.hash.replace(/^#\/?/, '');
    const m = h.match(/^(session|feel)-(\d+)(?:-(short|pain))?$/);
    if (m) return [m[1], m[2]];
    return h ? [h] : [];
  };
  const [parts, setParts] = useState(read);
  useEffect(() => {
    const on = () => {
      setParts(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return parts;
}

export function hasFlag(flag: string) {
  return window.location.hash.endsWith('-' + flag);
}

export function go(path: string) {
  window.location.hash = path ? '#' + path : '';
}

export function Page({ children, nav = true, label }: { children: ReactNode; nav?: boolean; label: string }) {
  return (
    <>
      <main className={'page' + (nav ? '' : ' no-nav')} aria-label={label}>
        {children}
      </main>
      {nav && <Nav />}
    </>
  );
}

export function Back({ to, label = 'Back' }: { to: string; label?: string }) {
  return (
    <div className="topbar">
      <a className="btn ghost" href={'#' + to}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {label}
      </a>
    </div>
  );
}

const ICONS: Record<string, ReactNode> = {
  today: <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" />,
  program: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </>
  ),
  progress: <path d="M4 19V10M10 19V5M16 19v-7M21 19H3" />,
  group: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" />
    </>
  ),
  account: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
};

function Nav() {
  const [first] = useRoute();
  const items: [string, string][] = [
    ['today', 'Today'],
    ['program', 'Program'],
    ['progress', 'Progress'],
    ['group', 'Group'],
    ['account', 'Account'],
  ];
  return (
    <nav className="nav" aria-label="Main">
      <ul>
        {items.map(([id, label]) => (
          <li key={id}>
            <a href={'#' + id} aria-current={first === id ? 'page' : undefined}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[id]}
              </svg>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className="chip" aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}

export function DraftTag() {
  return <span className="draft-tag">Draft exercise · waiting for physio sign-off</span>;
}
