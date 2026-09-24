import { useState } from 'react';
import {
  PhoneOutlined, MailOutlined, CopyOutlined, CheckOutlined,
  BankOutlined, CustomerServiceOutlined, ToolOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import './ContactUsPage.css';

/* Contact details as published on the legacy portal (msmecontact.jsp) */
const CONTACTS = [
  {
    key: 'admin',
    icon: <CustomerServiceOutlined />,
    title: 'Administration',
    subtitle: 'Senet Division, O/O DC-MSME',
    help: 'Targets, report submissions, month/section access and data corrections.',
    phone: '011-23062354',
    email: 'charanjeet8882@gmail.com',
  },
  {
    key: 'tech',
    icon: <ToolOutlined />,
    title: 'Technical Support',
    subtitle: 'MPR-AB portal',
    help: 'Login problems, errors on a page, reports not loading or exports failing.',
    phone: '9097846381',
    email: 'sanjay.singh359@gmail.com',
  },
];

function CopyBtn({ text }) {
  const [done, setDone] = useState(false);
  const flash = () => { setDone(true); setTimeout(() => setDone(false), 1500); };
  // Fallback for browsers / non-HTTPS pages where the async Clipboard API is unavailable or denied
  const legacyCopy = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    if (ok) flash();
  };
  const copy = () => {
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(flash, legacyCopy);
    else legacyCopy();
  };
  return (
    <button type="button" className={`ct-copy${done ? ' ct-copied' : ''}`} onClick={copy}
      title={done ? 'Copied' : 'Copy'} aria-label={`Copy ${text}`}>
      {done ? <CheckOutlined /> : <CopyOutlined />}
    </button>
  );
}

function Line({ icon, label, value, href }) {
  return (
    <div className="ct-line">
      <span className="ct-line-icon">{icon}</span>
      <div className="ct-line-body">
        <div className="ct-line-label">{label}</div>
        <a className="ct-line-value" href={href}>{value}</a>
      </div>
      <CopyBtn text={value} />
    </div>
  );
}

export default function ContactUsPage() {
  return (
    <div className="ct-page">

      {/* ── Hero ── */}
      <header className="ct-hero">
        <div className="ct-hero-text">
          <h1>Contact Us</h1>
          <p>Need help with the MPR-AB portal? Reach the right team below.</p>
        </div>
        <img src="/images/india-gov-logo.jpg" alt="" className="ct-hero-emblem"
          onError={e => { e.currentTarget.style.display = 'none'; }} />
      </header>

      {/* ── Contact cards ── */}
      <div className="ct-grid">
        {CONTACTS.map(c => (
          <section key={c.key} className={`ct-card ct-card-${c.key}`}>
            <div className="ct-card-head">
              <span className="ct-card-icon">{c.icon}</span>
              <div>
                <h2>{c.title}</h2>
                <div className="ct-card-sub">{c.subtitle}</div>
              </div>
            </div>
            <p className="ct-card-help">{c.help}</p>
            <Line icon={<PhoneOutlined />} label="Phone" value={c.phone} href={`tel:${c.phone.replace(/[^\d+]/g, '')}`} />
            <Line icon={<MailOutlined />}  label="Email" value={c.email} href={`mailto:${c.email}`} />
          </section>
        ))}
      </div>

      {/* ── Organisation ── */}
      <section className="ct-org">
        <span className="ct-org-icon"><BankOutlined /></span>
        <div className="ct-org-body">
          <div className="ct-org-name">Office of Development Commissioner (MSME)</div>
          <div className="ct-org-sub">Ministry of Micro, Small &amp; Medium Enterprises, Government of India</div>
        </div>
      </section>

      <div className="ct-note">
        <InfoCircleOutlined />
        <span>When reporting a problem, please mention your institute, the month / year and the page you were on.</span>
      </div>
    </div>
  );
}
