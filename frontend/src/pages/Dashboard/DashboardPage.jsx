import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import {
  BankOutlined, EditOutlined, BarChartOutlined, CalendarOutlined, LogoutOutlined,
  ArrowRightOutlined, WarningOutlined, CheckCircleFilled, LockOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import AuthShell from '../../components/AuthShell';
import './DashboardPage.css';

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

const cap = s => s.charAt(0) + s.slice(1).toLowerCase();

export default function DashboardPage() {
  const { user, logout, saveSelection } = useAuth();
  const navigate = useNavigate();
  const { fiscalMonth, year: defaultYear } = getDefaults();

  const isSU = user?.role === 'SU';
  const isRU = user?.role === 'RU';

  const [section,    setSection]    = useState(isRU ? '2' : '1');
  const [month,      setMonth]      = useState(fiscalMonth);
  const [year,       setYear]       = useState(defaultYear);
  const [institutes, setInstitutes] = useState([]);      // SU/RU: all institutes
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
        if (isSU || isRU) {
          // SU/RU: load active institutes (those with real IU user mappings)
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
  }, [user, isSU, isRU]);

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

  const username  = user?.userId || user?.uid || 'User';
  const roleLabel = isSU ? 'Super User' : isRU ? 'Report User' : 'Institute User';
  const monthName = MONTHS.find(m => m.value === month)?.label || '';
  const sections = [
    { v: '1', icon: <EditOutlined />,     title: 'Entry Section',  text: 'Fill in the monthly forms', locked: isRU },
    { v: '2', icon: <BarChartOutlined />, title: 'Report Section', text: 'View reports & analysis' },
  ];

  return (
    <AuthShell>
      <div className="as-card as-card-wide">
        {/* ── Welcome ── */}
        <div className="db2-welcome">
          <span className="db2-avatar">{username.charAt(0).toUpperCase()}</span>
          <div className="db2-welcome-text">
            <span className="db2-hello">Welcome back,</span>
            <b>{username}</b>
            <span className={`db2-role db2-role-${isSU ? 'su' : isRU ? 'ru' : 'iu'}`}>{roleLabel}</span>
          </div>
          <button type="button" className="db2-logout" onClick={handleLogout}><LogoutOutlined /> Logout</button>
        </div>

        <div className="as-card-head db2-head">
          <h2>Choose where to work</h2>
          <p>Select the institute, section and the reporting month &amp; year.</p>
        </div>

        {error && <div className="as-error" role="alert"><WarningOutlined /> {error}</div>}

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Institute */}
          <div className="as-field">
            <span className="as-label">Institute</span>
            {loading ? (
              <div className="db2-skeleton" />
            ) : (isSU || isRU) ? (
              <Select
                className="db2-select"
                size="large"
                showSearch
                value={selInstId || undefined}
                onChange={handleInstChange}
                optionFilterProp="label"
                placeholder="Search institute…"
                suffixIcon={<BankOutlined />}
                options={institutes.map(i => ({ value: i.instId, label: `${i.instName} (${i.instId})` }))}
              />
            ) : (
              <div className="db2-inst-fixed"><BankOutlined /> {selInstName || selInstId || '—'}</div>
            )}
          </div>

          {/* Section */}
          <div className="as-field">
            <span className="as-label">Section</span>
            <div className="db2-sections">
              {sections.map(s => (
                <button type="button" key={s.v} disabled={s.locked}
                  className={`db2-section${section === s.v ? ' is-on' : ''}`}
                  onClick={() => setSection(s.v)}>
                  <span className="db2-section-icon">{s.icon}</span>
                  <span className="db2-section-text"><b>{s.title}</b><small>{s.locked ? 'Not available for your role' : s.text}</small></span>
                  {s.locked ? <LockOutlined className="db2-section-mark" />
                    : section === s.v && <CheckCircleFilled className="db2-section-mark" />}
                </button>
              ))}
            </div>
          </div>

          {/* Month + Year */}
          <div className="as-field">
            <div className="db2-my-head">
              <span className="as-label">Month</span>
              <label className="db2-year">
                <CalendarOutlined />
                <span>Financial year</span>
                <select value={year} onChange={e => setYear(e.target.value)} aria-label="Financial year">
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </label>
            </div>
            <div className="db2-months">
              {MONTHS.map(m => (
                <button type="button" key={m.value}
                  className={`db2-month${month === m.value ? ' is-on' : ''}${m.value === fiscalMonth && year === defaultYear ? ' is-now' : ''}`}
                  onClick={() => setMonth(m.value)}
                  title={m.value === fiscalMonth && year === defaultYear ? 'Current month' : undefined}>
                  {cap(m.label).slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="db2-summary">
            You're opening <b>{section === '1' ? 'Entry Section' : 'Report Section'}</b> for{' '}
            <b>{cap(monthName)} {year}</b>{selInstName && <> · <b>{selInstName}</b></>}
          </div>

          <button type="submit" className="as-submit" disabled={loading || !selInstId}>
            {loading ? 'Please wait…' : <>Continue <ArrowRightOutlined /></>}
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
