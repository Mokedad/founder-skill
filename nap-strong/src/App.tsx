import { useEffect } from 'react';
import { useStore } from './store';
import { go, useRoute } from './ui';
import { Welcome, QuickCheck, SeePhysio, SelfCheckScreen } from './screens/Onboarding';
import { Today, ProgramMap, Progress } from './screens/Main';
import { SessionPlayer, HowDidItFeel } from './screens/Session';
import { Group, CheckIn } from './screens/Community';
import { Unlock, Account } from './screens/Account';

const OPEN = new Set(['', 'check', 'physio']);

export default function App() {
  const route = useRoute();
  const s = useStore();
  const [screen, arg] = route;
  const key = screen ?? '';

  // No profile yet: only the welcome and quick check are open.
  const blocked = !s.profile && !OPEN.has(key);
  // Red flags: hold on the physio screen.
  const held = !!s.profile && s.profile.redFlags.length > 0 && !OPEN.has(key) && key !== 'account';
  useEffect(() => {
    if (blocked) go('');
    else if (held) go('physio');
    else if (key === '' && s.profile && s.profile.redFlags.length === 0) go('today');
  }, [blocked, held, key, s.profile]);

  if (blocked || held) return null;

  return <div className="app">{render(key, arg)}</div>;
}

function render(key: string, arg?: string) {
  const day = Number(arg);
  switch (key) {
    case '':
      return <Welcome />;
    case 'check':
      return <QuickCheck />;
    case 'physio':
      return <SeePhysio />;
    case 'self-check':
      return <SelfCheckScreen />;
    case 'today':
      return <Today />;
    case 'session':
      return <SessionPlayer day={day} />;
    case 'feel':
      return <HowDidItFeel day={day} />;
    case 'program':
      return <ProgramMap />;
    case 'progress':
      return <Progress />;
    case 'group':
      return <Group />;
    case 'checkin':
      return <CheckIn />;
    case 'unlock':
      return <Unlock />;
    case 'account':
      return <Account />;
    default:
      return <Today />;
  }
}
