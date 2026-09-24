import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Alert } from 'antd';
import {
  LockOutlined, KeyOutlined, EyeOutlined, EyeInvisibleOutlined, CheckCircleFilled,
  CloseCircleFilled, SafetyCertificateOutlined, HomeOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './ChangePasswordPage.css';

/* Same policy the server enforces (and the legacy portal used) */
const RULES = [
  { id: 'len',   label: '8 to 15 characters',               test: p => p.length >= 8 && p.length <= 15 },
  { id: 'upper', label: 'An upper-case letter (A–Z)',       test: p => /[A-Z]/.test(p) },
  { id: 'lower', label: 'A lower-case letter (a–z)',        test: p => /[a-z]/.test(p) },
  { id: 'digit', label: 'A number (0–9)',                   test: p => /\d/.test(p) },
  { id: 'spec',  label: 'A special character (e.g. @ # $ !)', test: p => /[^a-zA-Z0-9]/.test(p) },
  { id: 'space', label: 'No spaces',                        test: p => p.length > 0 && !/\s/.test(p) },
];

const STRENGTH = [
  { label: 'Too weak', cls: 's0' },
  { label: 'Weak',     cls: 's1' },
  { label: 'Fair',     cls: 's2' },
  { label: 'Good',     cls: 's3' },
  { label: 'Strong',   cls: 's4' },
];

function PwdField({ label, value, onChange, show, onToggle, autoComplete, icon, status, hint, autoFocus }) {
  return (
    <label className={`cp-field${status ? ' cp-field-' + status : ''}`}>
      <span className="cp-label">{label}</span>
      <span className="cp-input-wrap">
        <span className="cp-input-icon">{icon}</span>
        <input
          className="cp-input"
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={40}
          spellCheck={false}
        />
        <button type="button" className="cp-eye" onClick={onToggle} tabIndex={-1}
          aria-label={show ? 'Hide password' : 'Show password'} title={show ? 'Hide' : 'Show'}>
          {show ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </button>
      </span>
      {hint && <span className="cp-hint">{hint}</span>}
    </label>
  );
}

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cur, setCur]     = useState('');
  const [pwd, setPwd]     = useState('');
  const [conf, setConf]   = useState('');
  const [show, setShow]   = useState({ cur: false, pwd: false, conf: false });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone]   = useState(false);

  const userName = user?.userId || user?.uid || user?.userName || '—';
  const passed   = RULES.filter(r => r.test(pwd)).length;
  const allOk    = passed === RULES.length;
  // all rules met → Good (Strong at 12+ chars); otherwise Too weak / Weak / Fair by rules met
  const strength = pwd ? STRENGTH[allOk ? (pwd.length >= 12 ? 4 : 3) : Math.min(2, Math.max(0, passed - 3))] : null;
  const sameAsCur = pwd && cur && pwd === cur;
  const match    = conf.length > 0 && conf === pwd;
  const canSave  = cur && allOk && match && !sameAsCur && !saving;

  const toggle = k => () => setShow(s => ({ ...s, [k]: !s[k] }));

  const submit = e => {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true); setError('');
    api.post('/auth/change-password', { currentPassword: cur, newPassword: pwd })
      .then(() => { setDone(true); setCur(''); setPwd(''); setConf(''); })
      .catch(err => setError(err.response?.data?.message || 'Could not change the password. Please try again.'))
      .finally(() => setSaving(false));
  };

  return (
    <div className="cp-page">
      <header className="cp-hero">
        <div>
          <span className="cp-hero-kicker">Account security</span>
          <h1>Change Password</h1>
          <p>Signed in as <b>{userName}</b>{user?.role ? ` · ${user.role === 'SU' ? 'Super User' : user.role === 'RU' ? 'Report User' : 'Institute User'}` : ''}</p>
        </div>
        <span className="cp-hero-icon"><SafetyCertificateOutlined /></span>
      </header>

      <div className="cp-grid">
        {/* ── Form ── */}
        <section className="cp-card">
          {done ? (
            <div className="cp-done">
              <span className="cp-done-icon"><CheckCircleFilled /></span>
              <h2>Password changed</h2>
              <p>Your new password is active. Use it the next time you log in.<br />
                Any other sessions signed in with this account have been logged out.</p>
              <div className="cp-done-actions">
                <Button type="primary" icon={<HomeOutlined />} onClick={() => navigate('/app/home')}>Go to home</Button>
                <Button onClick={() => setDone(false)}>Change again</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} autoComplete="off">
              <div className="cp-card-head">
                <span className="cp-badge"><KeyOutlined /></span>
                <div>
                  <h2>Set a new password</h2>
                  <p>Enter your current password, then choose a new one that meets all the rules.</p>
                </div>
              </div>

              {error && <Alert type="error" showIcon message={error} className="cp-alert" closable onClose={() => setError('')} />}

              <PwdField label="Current password" value={cur} onChange={v => { setCur(v); setError(''); }}
                show={show.cur} onToggle={toggle('cur')} autoComplete="current-password" icon={<LockOutlined />} autoFocus />

              <PwdField label="New password" value={pwd} onChange={v => { setPwd(v); setError(''); }}
                show={show.pwd} onToggle={toggle('pwd')} autoComplete="new-password" icon={<KeyOutlined />}
                status={pwd ? (allOk && !sameAsCur ? 'ok' : 'bad') : null}
                hint={sameAsCur ? 'The new password must be different from the current one.' : null} />

              {pwd && (
                <div className="cp-strength">
                  <div className="cp-strength-bar">
                    {[0, 1, 2, 3].map(i => (
                      <span key={i} className={i < STRENGTH.indexOf(strength) ? strength.cls : ''} />
                    ))}
                  </div>
                  <span className={`cp-strength-lbl ${strength.cls}`}>{strength.label}</span>
                </div>
              )}

              <PwdField label="Confirm new password" value={conf} onChange={setConf}
                show={show.conf} onToggle={toggle('conf')} autoComplete="new-password" icon={<KeyOutlined />}
                status={conf ? (match ? 'ok' : 'bad') : null}
                hint={conf ? (match ? 'Passwords match' : 'Passwords do not match') : null} />

              <div className="cp-actions">
                <Button onClick={() => { setCur(''); setPwd(''); setConf(''); setError(''); }} disabled={saving}>Clear</Button>
                <Button type="primary" htmlType="submit" icon={<SafetyCertificateOutlined />} loading={saving} disabled={!canSave}>
                  Change Password
                </Button>
              </div>
            </form>
          )}
        </section>

        {/* ── Rules / tips ── */}
        <aside className="cp-side">
          <section className="cp-card cp-rules">
            <h3>Password rules</h3>
            <ul>
              {RULES.map(r => {
                const ok = r.test(pwd);
                return (
                  <li key={r.id} className={pwd ? (ok ? 'ok' : 'bad') : ''}>
                    {pwd ? (ok ? <CheckCircleFilled /> : <CloseCircleFilled />) : <span className="cp-bullet" />}
                    {r.label}
                  </li>
                );
              })}
              <li className={pwd && cur ? (sameAsCur ? 'bad' : 'ok') : ''}>
                {pwd && cur ? (sameAsCur ? <CloseCircleFilled /> : <CheckCircleFilled />) : <span className="cp-bullet" />}
                Different from the current password
              </li>
              <li className="cp-rule-server">
                <InfoCircleOutlined /> Must not be one of your last 3 passwords (checked when you save)
              </li>
            </ul>
          </section>

          <section className="cp-card cp-tips">
            <h3>Tips</h3>
            <ul>
              <li>Don't reuse a password from email or other websites.</li>
              <li>Avoid names, dates of birth or the institute name.</li>
              <li>Never share your password — O/O DC-MSME staff will never ask for it.</li>
              <li>Forgot your password? Contact the Senet Division (see <a onClick={() => navigate('/app/contact')}>Contact Us</a>).</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
