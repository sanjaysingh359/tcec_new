import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSearchOutlined, CheckOutlined, CalendarOutlined, HistoryOutlined, FlagOutlined,
  ArrowRightOutlined, AimOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import './ReportSelector.css';

const MONTHS = [
  { value: '1',  label: 'APRIL' },    { value: '2',  label: 'MAY' },      { value: '3',  label: 'JUNE' },
  { value: '4',  label: 'JULY' },     { value: '5',  label: 'AUGUST' },   { value: '6',  label: 'SEPTEMBER' },
  { value: '7',  label: 'OCTOBER' },  { value: '8',  label: 'NOVEMBER' }, { value: '9',  label: 'DECEMBER' },
  { value: '10', label: 'JANUARY' },  { value: '11', label: 'FEBRUARY' }, { value: '12', label: 'MARCH' },
];
const QUARTERS = [
  { q: 'Q1', months: ['1', '2', '3'] },
  { q: 'Q2', months: ['4', '5', '6'] },
  { q: 'Q3', months: ['7', '8', '9'] },
  { q: 'Q4', months: ['10', '11', '12'] },
];
const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
  '2014-2015','2013-2014','2012-2013','2011-2012',
];

const cap = s => s.charAt(0) + s.slice(1).toLowerCase();
/* calendar year of a fiscal month: Apr–Dec → first year, Jan–Mar → second year */
const calYear = (fy, m) => { const [a, b] = fy.split('-'); return parseInt(m, 10) >= 10 ? b : a; };

/**
 * Month / year selection screen shared by the monthly reports.
 * Navigates to `target` with state { month, monthName, year } — the same state the report pages expect.
 */
export default function ReportSelector({
  title, description, target, icon = <FileSearchOutlined />, includes = [], note,
  yearOnly = false,          // yearly reports (e.g. Graphical): no month picker
  top = null,                // extra block at the top of the period card (e.g. institute picker)
  subject = null,            // extra line in the summary card (e.g. institute name)
  buildState = null,         // (month, monthName, year) => navigation state; default { month, monthName, year }
  canGenerate = true, blockedHint = '',
}) {
  const { selection } = useAuth();
  const navigate = useNavigate();
  const loginMonth = selection?.month || '1';
  const loginYear  = selection?.year  || YEARS[0];
  const [month, setMonth] = useState(loginMonth);
  const [year,  setYear]  = useState(loginYear);

  const yIdx = Math.max(0, YEARS.indexOf(loginYear));
  const quickYears = YEARS.slice(yIdx, yIdx + 3);
  const monthName = MONTHS.find(m => m.value === month)?.label || '';

  const pick = (m, y) => { setMonth(m); setYear(y); };
  const prevMonth = () => {
    const m = parseInt(loginMonth, 10);
    if (m > 1) return pick(String(m - 1), loginYear);
    const older = YEARS[yIdx + 1];
    if (older) pick('12', older);
  };
  const quick = [
    { icon: <AimOutlined />,     label: 'Login month',    sub: `${cap(MONTHS[+loginMonth - 1].label).slice(0, 3)} ${loginYear}`, on: () => pick(loginMonth, loginYear) },
    { icon: <HistoryOutlined />, label: 'Previous month', sub: 'One month earlier', on: prevMonth },
    { icon: <FlagOutlined />,    label: 'Year end',       sub: `Mar ${year.split('-')[1]}`, on: () => setMonth('12') },
  ];

  function handleGenerate(e) {
    e.preventDefault();
    if (!canGenerate) return;
    navigate(target, { state: buildState ? buildState(month, monthName, year) : { month, monthName, year } });
  }

  return (
    <form className="rs2-page" onSubmit={handleGenerate} autoComplete="off">
      {/* ── Header ── */}
      <header className="rs2-hero">
        <span className="rs2-hero-icon">{icon}</span>
        <div className="rs2-hero-text">
          <span className="rs2-kicker">Reports · {yearOnly ? 'Yearly' : 'Monthly'}</span>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
      </header>

      <div className="rs2-grid">
        {/* ── Period picker ── */}
        <section className="rs2-card">
          {top && <div className="rs2-top">{top}</div>}
          <div className="rs2-card-head">
            <h2><CalendarOutlined /> {yearOnly ? 'Select financial year' : 'Select period'}</h2>
            <div className="rs2-years" role="radiogroup" aria-label="Financial year">
              {quickYears.map(y => (
                <button type="button" key={y} role="radio" aria-checked={year === y}
                  className={`rs2-year${year === y ? ' is-on' : ''}`} onClick={() => setYear(y)}>
                  FY {y}
                </button>
              ))}
              <select className={`rs2-year-more${quickYears.includes(year) ? '' : ' is-on'}`}
                value={quickYears.includes(year) ? '' : year} onChange={e => e.target.value && setYear(e.target.value)}
                aria-label="Older financial years">
                <option value="">More…</option>
                {YEARS.filter(y => !quickYears.includes(y)).map(y => <option key={y} value={y}>FY {y}</option>)}
              </select>
            </div>
          </div>

          {!yearOnly && (<>
          <div className="rs2-quarters">
            {QUARTERS.map(({ q, months }) => (
              <div key={q} className="rs2-quarter">
                <span className="rs2-q">{q}</span>
                <div className="rs2-qmonths">
                  {months.map(v => {
                    const m = MONTHS[+v - 1];
                    const on = month === v;
                    const isLogin = v === loginMonth && year === loginYear;
                    return (
                      <button type="button" key={v} role="radio" aria-checked={on}
                        className={`rs2-month${on ? ' is-on' : ''}${isLogin ? ' is-login' : ''}`}
                        onClick={() => setMonth(v)}>
                        <b>{cap(m.label)}</b>
                        <small>{calYear(year, v)}</small>
                        {isLogin && <i title="Month selected at login">Login</i>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="rs2-quick">
            <span className="rs2-quick-lbl">Quick pick</span>
            {quick.map(q => (
              <button type="button" key={q.label} className="rs2-chip" onClick={q.on}>
                {q.icon} <span><b>{q.label}</b><small>{q.sub}</small></span>
              </button>
            ))}
          </div>
          </>)}
          {yearOnly && (
            <div className="rs2-fy">
              <span className="rs2-fy-range">April {year.split('-')[0]} <ArrowRightOutlined /> March {year.split('-')[1]}</span>
              <span className="rs2-fy-hint">The chart covers all 12 months of the financial year.</span>
            </div>
          )}
        </section>

        {/* ── Summary ── */}
        <aside className="rs2-card rs2-summary">
          <span className="rs2-sum-kicker">Report for</span>
          <div className="rs2-sum-period">
            {yearOnly ? <>
              <span className="rs2-sum-month">FY {year}</span>
              <span className="rs2-sum-year">April – March · 12 months</span>
            </> : <>
              <span className="rs2-sum-month">{cap(monthName)}</span>
              <span className="rs2-sum-year">{calYear(year, month)} · FY {year}</span>
            </>}
          </div>
          {subject && <div className="rs2-subject">{subject}</div>}

          {includes.length > 0 && (
            <>
              <div className="rs2-sum-sub">What this report shows</div>
              <ul className="rs2-includes">
                {includes.map(t => <li key={t}><CheckOutlined /> {t}</li>)}
              </ul>
            </>
          )}
          {note && <div className="rs2-note">{note}</div>}

          <button type="submit" className="rs2-go" disabled={!canGenerate}>
            Generate Report <ArrowRightOutlined />
          </button>
          <span className="rs2-go-hint">{!canGenerate && blockedHint ? blockedHint : 'Opens on screen — you can Print or Export from there.'}</span>
        </aside>
      </div>
    </form>
  );
}
