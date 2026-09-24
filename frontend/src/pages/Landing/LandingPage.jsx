import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { AuthTopBar, AuthFooter } from '../../components/AuthShell';
import './LandingPage.css';

const CLIENTS = [
  {
    id: 'DFO',
    title: 'Monthly Progress\nReport-DFO',
    subtitle: 'District Field Office',
    color: '#1f6fb2',
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
    id: 'TCEC',
    title: 'Monthly Progress\nReport-TCEC',
    subtitle: 'Technology Centre & Extension Centre',
    color: '#1e7e34',
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
    id: 'AB',
    title: 'Monthly Progress\nReport-AB',
    subtitle: 'MSME Autonomous Body',
    color: '#b01818',
    active: true,
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
    id: 'TCSP',
    title: 'Monthly Progress\nReport-TCSP',
    subtitle: 'Technology Centre Scheme Project',
    color: '#b36b00',
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

  return (
    <div className="as-page">
      <AuthTopBar />

      <main className="ld-main">
        <section className="ld-hero">
          <span className="as-kicker">DC-MSME · Monthly Progress Report</span>
          <h1>Select your <span>application</span></h1>
          <p>Choose the Monthly Progress Report system you want to sign in to.</p>
        </section>

        <section className="ld-grid">
          {CLIENTS.map(c => {
            const [l1, l2] = c.title.split('\n');
            return (
              <button
                key={c.id}
                type="button"
                className={`ld-card${c.active ? ' is-active' : ''}`}
                style={{ '--c': c.color }}
                onClick={() => navigate('/login', { state: { client: c.id, clientTitle: c.title.replace('\n', ' ') } })}
              >
                {c.active && <span className="ld-badge">● Active</span>}
                <span className="ld-icon">{c.icon}</span>
                <span className="ld-title"><small>{l1}</small>{l2}</span>
                <span className="ld-sub">{c.subtitle}</span>
                <span className="ld-enter">Click to enter <ArrowRightOutlined /></span>
              </button>
            );
          })}
        </section>
      </main>

      <AuthFooter />
    </div>
  );
}
