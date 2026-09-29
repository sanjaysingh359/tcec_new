import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { AuthTopBar, AuthFooter } from '../../components/AuthShell';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { APPS, getAppKey, setAppKey } from '../../utils/apps';
import './LandingPage.css';

/* card icons; names, colours and availability come from utils/apps.js */
const ICONS = [
  {
    key: 'dfo',
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <rect x="6" y="38" width="10" height="20" rx="2" fill="currentColor" opacity="0.9"/>
        <rect x="20" y="26" width="10" height="32" rx="2" fill="currentColor" opacity="0.85"/>
        <rect x="34" y="14" width="10" height="44" rx="2" fill="currentColor" opacity="0.8"/>
        <rect x="48" y="20" width="10" height="38" rx="2" fill="currentColor" opacity="0.75"/>
        <line x1="4" y1="58" x2="60" y2="58" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'tcec',
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="3" fill="none"/>
        <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.9"/>
        <line x1="32" y1="6" x2="32" y2="18" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="32" y1="46" x2="32" y2="58" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="6" y1="32" x2="18" y2="32" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="46" y1="32" x2="58" y2="32" stroke="currentColor" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    key: 'ab',
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <polyline points="6,52 18,36 28,42 40,20 54,12" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
        <circle cx="18" cy="36" r="3.5" fill="currentColor"/>
        <circle cx="28" cy="42" r="3.5" fill="currentColor"/>
        <circle cx="40" cy="20" r="3.5" fill="currentColor"/>
        <circle cx="54" cy="12" r="3.5" fill="currentColor"/>
        <line x1="4" y1="56" x2="60" y2="56" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        <line x1="4" y1="12" x2="4" y2="56" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      </svg>
    ),
  },
  {
    key: 'tcsp',
    icon: (
      <svg viewBox="0 0 64 64" width="44" height="44" fill="none">
        <rect x="8" y="16" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <line x1="8" y1="26" x2="56" y2="26" stroke="currentColor" strokeWidth="2"/>
        <line x1="24" y1="26" x2="24" y2="52" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
        <rect x="14" y="32" width="6" height="14" rx="1" fill="currentColor" opacity="0.8"/>
        <rect x="29" y="28" width="6" height="18" rx="1" fill="currentColor" opacity="0.8"/>
        <rect x="42" y="34" width="6" height="12" rx="1" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [ready, setReady] = useState(null);   // { tcec: true, tcsp: false } from the server; 'offline' when unreachable
  const chosen = getAppKey();

  // ask the server which applications are up; keep retrying while it is unreachable
  // (e.g. during a backend restart) and re-check now and then so a new database shows up
  useEffect(() => {
    let alive = true;
    let timer;
    const check = () => {
      api.get('/apps', { timeout: 8000 })
        .then(r => { if (alive) { setReady(r.data?.data || {}); timer = setTimeout(check, 30000); } })
        .catch(() => { if (alive) { setReady('offline'); timer = setTimeout(check, 4000); } });
    };
    check();
    return () => { alive = false; clearTimeout(timer); };
  }, []);

  const statusOf = key => {
    if (APPS[key].comingSoon) return 'soon';
    if (ready === null) return 'checking';
    if (ready === 'offline') return 'offline';
    return ready[key] ? 'open' : 'setup';
  };

  async function enter(key) {
    if (statusOf(key) !== 'open') return;
    if (user && user.app !== key) await logout();   // a session never carries over to another application
    setAppKey(key);
    navigate(user && user.app === key ? '/dashboard' : '/login');
  }

  return (
    <div className="as-page">
      <AuthTopBar />

      <main className="ld-main">
        <section className="ld-hero">
          <span className="as-kicker">DC-MSME · Monthly Progress Report</span>
          <h1>Select your <span>application</span></h1>
          <p>Choose the Monthly Progress Report system you want to sign in to. Each one has its own users and data.</p>
        </section>

        <section className="ld-grid">
          {ICONS.map(({ key, icon }) => {
            const app = APPS[key];
            const [l1, l2] = ['Monthly Progress', `Report-${app.code}`];
            const status = statusOf(key);
            const open = status === 'open';
            return (
              <button
                key={key}
                type="button"
                className={`ld-card${open && chosen === key ? ' is-active' : ''}${open ? '' : ' is-disabled'}`}
                style={{ '--c': app.color }}
                onClick={() => enter(key)}
                disabled={!open}
                aria-disabled={!open}
              >
                {open && chosen === key && <span className="ld-badge">● Last used</span>}
                {status === 'soon' && <span className="ld-badge ld-badge-soon">Coming soon</span>}
                <span className="ld-icon">{icon}</span>
                <span className="ld-title"><small>{l1}</small>{l2}</span>
                <span className="ld-sub">{app.subtitle}</span>
                <span className="ld-enter">
                  {status === 'open' && <>Click to enter <ArrowRightOutlined /></>}
                  {status === 'checking' && <><LoadingOutlined /> Checking…</>}
                  {status === 'setup' && <><ClockCircleOutlined /> Database not set up yet</>}
                  {status === 'offline' && <><LoadingOutlined /> Server not reachable — retrying…</>}
                  {status === 'soon' && <><ClockCircleOutlined /> Coming soon</>}
                </span>
              </button>
            );
          })}
        </section>
      </main>

      <AuthFooter />
    </div>
  );
}
