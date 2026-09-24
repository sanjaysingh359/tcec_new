import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined, ReloadOutlined,
  SafetyOutlined, LoginOutlined, WarningOutlined, CalendarOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import AuthShell from '../../components/AuthShell';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { display: `${a} + ${b}`, answer: String(a + b) };
}

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const clientTitle = state?.clientTitle || 'Monthly Progress Report-AB';
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [uid, setUid]   = useState('');
  const [pwd, setPwd]   = useState('');
  const [code, setCode] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setCode('');
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    if (!uid.trim())  { setErrorMsg('Please enter User Name'); return; }
    if (!pwd.trim())  { setErrorMsg('Please enter Password');  return; }
    if (code.trim() !== captcha.answer) {
      setErrorMsg('Incorrect captcha answer. Please try again.');
      refreshCaptcha(); return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', {
        userId: uid.trim(),
        password: pwd,
      });
      if (data.success) {
        login({
          userId: data.data.userId,
          role:   data.data.role,
          token:  data.data.token,
        });
        navigate('/dashboard');
      } else {
        setErrorMsg(data.message || 'Invalid User ID or Password');
        refreshCaptcha();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login failed. Please try again.');
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  }

  const now = new Date();
  const dateStr = `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <AuthShell>
      <div className="as-card">
        <div className="as-card-head">
          <h2>Sign in</h2>
          <p>{clientTitle} — enter your User ID and password to continue.</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off">
          <label className="as-field">
            <span className="as-label">User Name</span>
            <span className="as-input-wrap">
              <span className="as-input-icon"><UserOutlined /></span>
              <input className="as-input" type="text" value={uid} autoFocus
                onChange={e => { setUid(e.target.value); setErrorMsg(''); }}
                maxLength={45} autoComplete="off" placeholder="e.g. TCEC-Johrat" />
            </span>
          </label>

          <label className="as-field">
            <span className="as-label">Password</span>
            <span className="as-input-wrap">
              <span className="as-input-icon"><LockOutlined /></span>
              <input className="as-input" type={showPwd ? 'text' : 'password'} value={pwd}
                onChange={e => { setPwd(e.target.value); setErrorMsg(''); }}
                maxLength={45} autoComplete="off" placeholder="Enter your password" />
              <button type="button" className="as-eye" onClick={() => setShowPwd(s => !s)} tabIndex={-1}
                aria-label={showPwd ? 'Hide password' : 'Show password'}>
                {showPwd ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </span>
          </label>

          <div className="as-field">
            <span className="as-label">Security check — solve the sum</span>
            <div className="as-captcha">
              <span className="as-captcha-code" aria-label={`Captcha: ${captcha.display}`}>{captcha.display} =</span>
              <span className="as-input-wrap">
                <span className="as-input-icon"><SafetyOutlined /></span>
                <input className="as-input" type="text" inputMode="numeric" value={code}
                  onChange={e => setCode(e.target.value)} maxLength={5} autoComplete="off" placeholder="Answer" />
              </span>
              <button type="button" className="as-captcha-refresh" onClick={refreshCaptcha}
                title="New code" aria-label="Refresh captcha"><ReloadOutlined /></button>
            </div>
          </div>

          {errorMsg && <div className="as-error" role="alert"><WarningOutlined /> {errorMsg}</div>}

          <button type="submit" className="as-submit" disabled={loading}>
            <LoginOutlined /> {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="as-meta">
          <span><CalendarOutlined /> {dateStr}</span>
          <span>Forgot password? Call 011-23062354</span>
        </div>
      </div>
    </AuthShell>
  );
}
