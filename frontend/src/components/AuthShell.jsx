import { BarChartOutlined, SafetyCertificateOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';
import './AuthShell.css';

const HIGHLIGHTS = [
  { icon: <FileTextOutlined />,          title: 'Monthly progress reporting', text: 'Financial, physical, budget & placement data in one place.' },
  { icon: <BarChartOutlined />,          title: 'Reports & analysis',          text: 'Institute-wise reports, charts and target achievement.' },
  { icon: <TeamOutlined />,              title: 'All Technology Centres',      text: 'Common platform for TCs / TCECs under DC-MSME.' },
  { icon: <SafetyCertificateOutlined />, title: 'Secure access',               text: 'Role-based access for institutes, reports and admins.' },
];

/* Full-screen shell shared by the Login and Dashboard (month / section selection) screens */
export default function AuthShell({ children }) {
  return (
    <div className="as-page">
      <header className="as-top">
        <div className="as-top-left">
          <img src="/images/india-gov-logo.jpg" alt="" className="as-emblem"
            onError={e => { e.currentTarget.src = '/images/india-gov-logo.gif'; }} />
          <div className="as-org">
            <div className="as-org-main">Office of Development Commissioner (MSME)</div>
            <div className="as-org-sub">Ministry of Micro, Small &amp; Medium Enterprises, Government of India</div>
          </div>
        </div>
        <img src="/images/msme-logo.jpg" alt="MSME" className="as-msme"
          onError={e => { e.currentTarget.style.display = 'none'; }} />
      </header>

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

      <footer className="as-foot">
        <span>Created &amp; Designed by O/O DC-MSME</span>
        <span>Contact Us : 011-23062354 (Senet Division)</span>
      </footer>
    </div>
  );
}
