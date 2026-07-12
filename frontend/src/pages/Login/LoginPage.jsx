import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

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
    <div className="lp-page">
      <div className="lp-card">

        {/* ── HEADER ── */}
        <div className="lp-header">
          <div className="lp-brand">MPR-TCEC</div>
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
        <div className="db-body">
          <div className="lg-form-card">

            {/* Client bar */}
            <div className="lp-client-bar">{clientTitle}</div>

            {/* Form header */}
            <div className="db-form-header">Enter Your User ID &amp; Password</div>

            <div className="lg-form-body">
              <form onSubmit={handleSubmit} autoComplete="off" className="lp-form">
                <table className="lp-form-tbl" cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td className="lp-lbl"><span className="lp-req">*</span> User Name:</td>
                      <td className="lp-inp">
                        <input type="text" value={uid} onChange={e => { setUid(e.target.value); setErrorMsg(''); }}
                          maxLength={45} className="lp-field" autoComplete="off" />
                      </td>
                    </tr>
                    <tr>
                      <td className="lp-lbl"><span className="lp-req">*</span> Password:</td>
                      <td className="lp-inp">
                        <input type="password" value={pwd} onChange={e => { setPwd(e.target.value); setErrorMsg(''); }}
                          maxLength={45} className="lp-field" autoComplete="off" />
                      </td>
                    </tr>
                    <tr>
                      <td className="lp-lbl"><span className="lp-req">*</span> Please Enter code</td>
                      <td className="lp-inp">
                        <input type="text" value={code} onChange={e => setCode(e.target.value)}
                          maxLength={5} className="lp-field" autoComplete="off"
                          placeholder="Type the answer" />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="lp-captcha-row">
                        <span className="lp-captcha-box">{captcha.display}</span>
                        <button type="button" onClick={refreshCaptcha} className="lp-refresh">↻</button>
                      </td>
                    </tr>
                    {errorMsg && (
                      <tr>
                        <td colSpan="2">
                          <div className="lg-error-box">⚠ {errorMsg}</div>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan="2" className="lp-submit-row">
                        <input type="submit"
                          value={loading ? 'Please wait...' : 'Submit'}
                          disabled={loading}
                          className="lp-submit" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>

              <div className="lp-date">Date: {dateStr}</div>
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
