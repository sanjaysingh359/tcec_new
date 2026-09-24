import { BarChartOutlined, SafetyCertificateOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';
import './AuthShell.css';

const HIGHLIGHTS = [
  { icon: <FileTextOutlined />,          title: 'Monthly progress reporting', text: 'Financial, physical, budget & placement data in one place.' },
  { icon: <BarChartOutlined />,          title: 'Reports & analysis',          text: 'Institute-wise reports, charts and target achievement.' },
  { icon: <TeamOutlined />,              title: 'All Technology Centres',      text: 'Common platform for TCs / TCECs under DC-MSME.' },
  { icon: <SafetyCertificateOutlined />, title: 'Secure access',               text: 'Role-based access for institutes, reports and admins.' },
];

/* Top bar and footer — also used on their own by the Landing page */
export function AuthTopBar() {
  return (
    <header className="as-top">
      <div className="as-top-left">
        <span className="as-logo-tile">
          <img src="/images/india-gov-logo.jpg" alt="Government of India" className="as-emblem"
            onError={e => { e.currentTarget.src = '/images/india-gov-logo.gif'; }} />
        </span>
        <div className="as-org">
          <div className="as-org-main">Office of Development Commissioner (MSME)</div>
          <div className="as-org-sub">
            Ministry of Micro, Small &amp; Medium Enterprises, Government of India
            <span className="as-org-app">MPR-AB</span>
          </div>
        </div>
      </div>
      <span className="as-logo-tile as-msme-tile">
        <img src="/images/msme-logo.jpg" alt="MSME" className="as-msme"
          onError={e => { e.currentTarget.parentElement.style.display = 'none'; }} />
      </span>
    </header>
  );
}

export function AuthFooter() {
  return (
    <footer className="as-foot">
      <span>Created &amp; Designed by O/O DC-MSME</span>
      <span>Contact Us : 011-23062354 (Senet Division)</span>
    </footer>
  );
}

/* Full-screen shell shared by the Login and Dashboard (month / section selection) screens */
export default function AuthShell({ children }) {
  return (
    <div className="as-page">
      <AuthTopBar />

      <main className="as-main">
        <section className="as-brand">
          <div className="as-brand-inner">
            <span className="as-kicker">DC-MSME · Technology Centres</span>
            <h1>MPR-AB <span>Portal</span></h1>
            <p className="as-tag">Monthly Progress Report of Technology Centres &amp; TCECs</p>
            <ul className="as-points">
              {HIGHLIGHTS.map(h => (
                <li key={h.title}>
                  <span className="as-point-icon">{h.icon}</span>
                  <span><b>{h.title}</b><small>{h.text}</small></span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="as-panel">
          {children}
        </section>
      </main>

      <AuthFooter />
    </div>
  );
}
