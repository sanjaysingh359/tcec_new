import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const MONTHS = [
  { value: '1',  label: 'APRIL' },
  { value: '2',  label: 'MAY' },
  { value: '3',  label: 'JUNE' },
  { value: '4',  label: 'JULY' },
  { value: '5',  label: 'AUGUST' },
  { value: '6',  label: 'SEPTEMBER' },
  { value: '7',  label: 'OCTOBER' },
  { value: '8',  label: 'NOVEMBER' },
  { value: '9',  label: 'DECEMBER' },
  { value: '10', label: 'JANUARY' },
  { value: '11', label: 'FEBRUARY' },
  { value: '12', label: 'MARCH' },
];

const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023',
  '2021-2022','2020-2021','2019-2020','2018-2019','2017-2018',
  '2016-2017','2015-2016','2014-2015','2013-2014','2012-2013','2011-2012',
];

function getDefaults() {
  const d = new Date();
  const fiscalMonth = String(((d.getMonth() - 3 + 12) % 12) + 1);
  const y = d.getFullYear();
  const year = d.getMonth() >= 3 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
  return { fiscalMonth, year };
}

export default function DashboardPage() {
  const { user, logout, saveSelection } = useAuth();
  const navigate = useNavigate();
  const { fiscalMonth, year: defaultYear } = getDefaults();

  const isSU = user?.role === 'SU';

  const [section,    setSection]    = useState('1');
  const [month,      setMonth]      = useState(fiscalMonth);
  const [year,       setYear]       = useState(defaultYear);
  const [institutes, setInstitutes] = useState([]);      // SU: all institutes
  const [selInstId,  setSelInstId]  = useState('');      // selected inst_id
  const [selInstName,setSelInstName]= useState('');      // selected inst_name
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login', { replace: true });
  }, [user, navigate]);

  // Load institute data after login
  useEffect(() => {
    if (!user) return;

    async function loadInstitute() {
      setLoading(true);
      setError('');
      try {
        if (isSU) {
          // SU: load active institutes (those with real IU user mappings)
          const { data } = await api.get('/institutes/active');
          if (data.success && data.data?.length) {
            setInstitutes(data.data);
            setSelInstId(data.data[0].instId);
            setSelInstName(data.data[0].instName);
          }
        } else {
          // IU: look up their inst_id from user_id_mapping
          const { data } = await api.get(`/institutes/mapping/${user.userId}`);
          if (data.success && data.data?.instId) {
            const instId = data.data.instId;
            setSelInstId(instId);
            // Also fetch the full name
            const { data: instData } = await api.get(`/institutes/${instId}`);
            if (instData.success && instData.data) {
              setSelInstName(instData.data.instName);
            } else {
              setSelInstName(instId);
            }
          } else {
            // Fallback: use userId as inst_id
            setSelInstId(user.userId);
            setSelInstName(user.userId);
          }
        }
      } catch (err) {
        setError('Could not load institute data. Please refresh.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadInstitute();
  }, [user, isSU]);

  // When SU changes selected institute, update name
  function handleInstChange(instId) {
    setSelInstId(instId);
    const found = institutes.find(i => i.instId === instId);
    setSelInstName(found?.instName || instId);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selInstId) { setError('Please select an institute.'); return; }
    const monthLabel = MONTHS.find(m => m.value === month)?.label || '';
    saveSelection({
      section,
      month,
      monthName: monthLabel,
      year,
      instId:   selInstId,
      instName: selInstName,
    });
    navigate('/app');
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const username = user?.userId || user?.uid || 'User';

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

        {/* ── USER BAR ── */}
        <div className="db-user-bar">
          <span>Welcome, <strong>{username}</strong>
            {isSU && <span className="db-role-badge db-role-su"> (Super User)</span>}
            {!isSU && <span className="db-role-badge db-role-iu"> (Institute User)</span>}
          </span>
          <button className="db-logout-btn" onClick={handleLogout}>&#x2715; Logout</button>
        </div>

        {/* ── BODY ── */}
        <div className="db-body">
          <div className="db-form-card">
            <div className="db-form-header">Choose your Respective Month &amp; Year</div>

            {error && (
              <div className="db-error-bar">{error}</div>
            )}

            <form onSubmit={handleSubmit} autoComplete="off">
              <table className="lp-form-tbl" cellPadding="0" cellSpacing="0">
                <tbody>

                  {/* Institute row */}
                  <tr>
                    <td className="lp-lbl"><span className="lp-req">*</span> Institute:</td>
                    <td className="lp-inp">
                      {loading ? (
                        <span className="db-loading-text">Loading…</span>
                      ) : isSU ? (
                        <select
                          value={selInstId}
                          onChange={e => handleInstChange(e.target.value)}
                          className="lp-field db-select"
                          required
                        >
                          {institutes.map(inst => (
                            <option key={inst.instId} value={inst.instId}>
                              {inst.instId} — {inst.instName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          readOnly
                          value={selInstName || selInstId || '—'}
                          className="lp-field db-inst-readonly"
                        />
                      )}
                    </td>
                  </tr>

                  {/* Section */}
                  <tr>
                    <td className="lp-lbl"><span className="lp-req">*</span> Section:</td>
                    <td className="lp-inp">
                      <select value={section} onChange={e => setSection(e.target.value)} className="lp-field db-select">
                        <option value="1">Entry Form Section</option>
                        <option value="2">Report Section</option>
                      </select>
                    </td>
                  </tr>

                  {/* Month */}
                  <tr>
                    <td className="lp-lbl"><span className="lp-req">*</span> Month:</td>
                    <td className="lp-inp">
                      <select value={month} onChange={e => setMonth(e.target.value)} className="lp-field db-select">
                        {MONTHS.map(m => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  {/* Year */}
                  <tr>
                    <td className="lp-lbl"><span className="lp-req">*</span> Year:</td>
                    <td className="lp-inp">
                      <select value={year} onChange={e => setYear(e.target.value)} className="lp-field db-select">
                        {YEARS.map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2" className="lp-submit-row">
                      <input
                        type="submit"
                        value={loading ? 'Please wait…' : 'Go'}
                        disabled={loading || !selInstId}
                        className="lp-submit"
                        style={{ padding: '7px 48px' }}
                      />
                    </td>
                  </tr>

                </tbody>
              </table>
            </form>
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
