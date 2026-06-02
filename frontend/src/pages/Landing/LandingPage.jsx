import { useNavigate } from 'react-router-dom';

const CLIENTS = [
  {
    id: 'DFO',
    title: 'Monthly Progress\nReport-DFO',
    subtitle: 'District Field Office',
    color: '#1a4a7a',
    gradient: 'linear-gradient(135deg,#1a4a7a 0%,#0e5a94 100%)',
    icon: (
      <svg viewBox="0 0 64 64" width="62" height="62" fill="none">
        <rect x="6" y="38" width="10" height="20" rx="2" fill="#FFD700" opacity="0.9"/>
        <rect x="20" y="26" width="10" height="32" rx="2" fill="#FFD700" opacity="0.85"/>
        <rect x="34" y="14" width="10" height="44" rx="2" fill="#FFD700" opacity="0.8"/>
        <rect x="48" y="20" width="10" height="38" rx="2" fill="#FFD700" opacity="0.75"/>
        <line x1="4" y1="58" x2="60" y2="58" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'TCEC',
    title: 'Monthly Progress\nReport-TCEC',
    subtitle: 'Technology Centre & Extension Centre',
    color: '#1a6b4a',
    gradient: 'linear-gradient(135deg,#1a6b4a 0%,#229958 100%)',
    icon: (
      <svg viewBox="0 0 64 64" width="62" height="62" fill="none">
        <circle cx="32" cy="32" r="26" stroke="#FFD700" strokeWidth="3" fill="none"/>
        <circle cx="32" cy="32" r="10" fill="#FFD700" opacity="0.9"/>
        <line x1="32" y1="6" x2="32" y2="18" stroke="#FFD700" strokeWidth="2.5"/>
        <line x1="32" y1="46" x2="32" y2="58" stroke="#FFD700" strokeWidth="2.5"/>
        <line x1="6" y1="32" x2="18" y2="32" stroke="#FFD700" strokeWidth="2.5"/>
        <line x1="46" y1="32" x2="58" y2="32" stroke="#FFD700" strokeWidth="2.5"/>
      </svg>
    ),
  },
  {
    id: 'AB',
    title: 'Monthly Progress\nReport-AB',
    subtitle: 'MSME Autonomous Body',
    color: '#8B0000',
    gradient: 'linear-gradient(135deg,#8B0000 0%,#b30000 100%)',
    active: true,
    icon: (
      <svg viewBox="0 0 64 64" width="62" height="62" fill="none">
        <polyline points="6,52 18,36 28,42 40,20 54,12" stroke="#FFD700" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
        <circle cx="18" cy="36" r="3.5" fill="#FFD700"/>
        <circle cx="28" cy="42" r="3.5" fill="#FFD700"/>
        <circle cx="40" cy="20" r="3.5" fill="#FFD700"/>
        <circle cx="54" cy="12" r="3.5" fill="#FFD700"/>
        <line x1="4" y1="56" x2="60" y2="56" stroke="#FFD700" strokeWidth="1.5" opacity="0.5"/>
        <line x1="4" y1="12" x2="4" y2="56" stroke="#FFD700" strokeWidth="1.5" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'TCSP',
    title: 'Monthly Progress\nReport-TCSP',
    subtitle: 'Technology Centre Scheme Project',
    color: '#7a4a00',
    gradient: 'linear-gradient(135deg,#7a4a00 0%,#a06200 100%)',
    icon: (
      <svg viewBox="0 0 64 64" width="62" height="62" fill="none">
        <rect x="8" y="16" width="48" height="36" rx="4" stroke="#FFD700" strokeWidth="2.5" fill="none"/>
        <line x1="8" y1="26" x2="56" y2="26" stroke="#FFD700" strokeWidth="2"/>
        <line x1="24" y1="26" x2="24" y2="52" stroke="#FFD700" strokeWidth="1.5" opacity="0.6"/>
        <rect x="14" y="32" width="6" height="14" rx="1" fill="#FFD700" opacity="0.8"/>
        <rect x="29" y="28" width="6" height="18" rx="1" fill="#FFD700" opacity="0.8"/>
        <rect x="42" y="34" width="6" height="12" rx="1" fill="#FFD700" opacity="0.8"/>
      </svg>
    ),
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="lp-page">
      <div className="lp-card">

        {/* ── HEADER ── */}
        <div className="lp-header">
          <div className="lp-brand">MPR</div>
          <div className="lp-emblem">
            <img src="/images/india-gov-logo.jpg" width="53" height="63" alt=""
              onError={e => { e.target.src = '/images/india-gov-logo.gif'; }} />
          </div>
          <div className="lp-org">
            <span className="lp-org-text">
              Office of Development Commissioner(MSME)<br />
              Ministry of Micro, Small &amp; Medium Enterprises
            </span>
          </div>
          <div className="lp-logo">
            <img src="/images/msme-logo.jpg" width="179" height="73" alt=""
              onError={e => { e.target.style.display = 'none'; }} />
          </div>
        </div>

        {/* ── MARQUEE ── */}
        <div className="lp-marquee">
          <span className="lp-scroll">Monthly Progress Report (MPR) of DC-MSME TCEC</span>
        </div>

        {/* ── BODY ── */}
        <div className="cl-sel-body">
          <div className="cl-sel-wrap">
            <div className="cl-headline">Select Your Application</div>
            <div className="cl-subline">Choose the Monthly Progress Report system to continue</div>
            <div className="cl-grid">
              {CLIENTS.map(c => (
                <div
                  key={c.id}
                  className={`cl-client-card${c.active ? ' cl-card-active' : ''}`}
                  style={{ '--cl-color': c.color, '--cl-gradient': c.gradient }}
                  onClick={() => navigate('/login', { state: { client: c.id, clientTitle: c.title.replace('\n', ' ') } })}
                >
                  {c.active && <div className="cl-active-badge">● Active</div>}
                  <div className="cl-icon-wrap">{c.icon}</div>
                  <div className="cl-card-title">
                    {c.title.split('\n').map((line, i) => (
                      <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                  </div>
                  <div className="cl-card-sub">{c.subtitle}</div>
                  <div className="cl-card-enter">Click to Enter →</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="lp-footer">
          <span>Created &amp; Designed by O/O DC-MSME</span>
          <span>Contact Us : 011-23062354 (Senet Division)</span>
        </div>

      </div>
    </div>
  );
}
