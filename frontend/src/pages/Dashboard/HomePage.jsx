import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import {
  DollarOutlined, BarChartOutlined, UserSwitchOutlined, AimOutlined, FundOutlined, TrophyOutlined,
  LineChartOutlined, PieChartOutlined, FileTextOutlined, FileDoneOutlined, CheckCircleOutlined,
  TagsOutlined, ManOutlined, ReadOutlined, CalendarOutlined, EditOutlined,
  ClockCircleOutlined, ArrowRightOutlined, SwapOutlined, TeamOutlined, ToolOutlined, RiseOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './HomePage.css';

const n = v => parseFloat(v) || 0;
const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const MPR_KEYS = ['apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar'];

/* ── Entry forms (status comes from /admin/data-status + achievement / target loads) ── */
const ENTRY_FORMS = [
  { key: '/app/financial',   status: 'fin', icon: <DollarOutlined />,     label: 'Financial Section',       desc: 'Revenue, expenditure & recovery',  color: '#0f8a7a' },
  { key: '/app/physical',    status: 'phy', icon: <BarChartOutlined />,   label: 'Physical Section',        desc: 'Units benefited, training & bifurcation', color: '#1f6fb2' },
  { key: '/app/budget',      status: 'bud', icon: <FundOutlined />,       label: 'Budget Section',          desc: 'Budget, staff, machines & remarks', color: '#c08a00' },
  { key: '/app/placement',   status: 'pla', icon: <UserSwitchOutlined />, label: 'Placement Section',       desc: 'Trainees & placement outcomes',     color: '#7a4bb3' },
  { key: '/app/achievement', status: 'ach', icon: <TrophyOutlined />,     label: 'Significant Achievement', desc: 'Highlights of the month',           color: '#b01818' },
  { key: '/app/target',      status: 'tgt', icon: <AimOutlined />,        label: 'Annual Target',           desc: 'Targets for the financial year',    color: '#073354', suOnly: true, yearly: true },
];

/* ── Report shortcuts (same set as the sidebar, per role) ── */
const REPORT_GROUPS = [
  { title: 'Overview', items: [
    { key: '/app/reports/graphical', icon: <LineChartOutlined />, label: 'Graphical Representation', desc: 'Charts & trends', iu: true },
    { key: '/app/reports/mpr',       icon: <FileTextOutlined />,  label: 'MPR-AB Report',            desc: 'Monthly progress report', iu: true },
    { key: '/app/reports/analysis',  icon: <PieChartOutlined />,  label: 'Analysis Report',          desc: 'Targets vs achievement' },
  ]},
  { title: 'Trainees trained', items: [
    { key: '/app/reports/trainees/category',      icon: <TagsOutlined />,     label: 'Category wise',      desc: 'GEN / SC / ST / OBC / Minority' },
    { key: '/app/reports/trainees/gender',        icon: <ManOutlined />,      label: 'Gender wise',        desc: 'Men / Women / Transgender' },
    { key: '/app/reports/trainees/qualification', icon: <ReadOutlined />,     label: 'Qualification wise', desc: '10th to Ph.D.' },
    { key: '/app/reports/trainees/age',           icon: <CalendarOutlined />, label: 'Age wise',           desc: 'Age groups' },
  ]},
  { title: 'Other reports', items: [
    { key: '/app/reports/budget',             icon: <FundOutlined />,        label: 'Budget Report',            desc: 'Utilization & balance' },
    { key: '/app/reports/target',             icon: <AimOutlined />,         label: 'Target Report',            desc: 'Annual targets' },
    { key: '/app/reports/rfd',                icon: <FileDoneOutlined />,    label: 'Report for RFD',           desc: 'Results framework' },
    { key: '/app/reports/achievement',        icon: <TrophyOutlined />,      label: 'Significant Achievements', desc: 'Institute highlights' },
    { key: '/app/reports/achievement/status', icon: <CheckCircleOutlined />, label: 'Achievement Status',       desc: 'Who has submitted' },
    { key: '/app/modify-data',                icon: <EditOutlined />,        label: 'Update / Delete',          desc: 'Correct submitted data', suOnly: true },
  ]},
];

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

function Progress({ icon, label, value, target, unit, color }) {
  const p = target > 0 ? (value / target) * 100 : null;
  return (
    <div className="home-prog" style={{ '--c': color }}>
      <div className="home-prog-top">
        <span className="home-prog-icon">{icon}</span>
        <div className="home-prog-lbl">{label}</div>
        <div className="home-prog-pct">{p === null ? '—' : `${p.toFixed(1)}%`}</div>
      </div>
      <div className="home-prog-bar"><span style={{ width: `${Math.min(p || 0, 100)}%` }} /></div>
      <div className="home-prog-nums">
        <b>{Number.isInteger(value) ? value : value.toFixed(2)}</b>
        {target > 0 ? <> of {target} {unit}</> : <> {unit} · <i>no annual target set</i></>}
      </div>
    </div>
  );
}

function Section({ title, sub, right, className = '', children }) {
  return (
    <section className={`home-sec ${className}`.trim()}>
      <div className="home-sec-head">
        <div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>
        {right}
      </div>
      {children}
    </section>
  );
}

/* ═══════════════════ Institute view: own forms, progress, year tracker ═══════════════════ */
function InstituteView({ selection, isSU, isEntry, navigate }) {
  const [status, setStatus]   = useState(null);   // 12 rows from /admin/data-status
  const [extra, setExtra]     = useState({});     // { ach, tgt }
  const [prog, setProg]       = useState(null);
  const monthIdx = parseInt(selection.month, 10) - 1;

  useEffect(() => {
    const p = { instId: selection.instId, year: selection.year };
    const pm = { ...p, month: selection.month };
    api.get('/admin/data-status', { params: p }).then(r => setStatus(r.data?.data || [])).catch(() => setStatus([]));
    Promise.allSettled([
      api.get('/entry/achievement/load', { params: pm }),
      api.get('/target/load', { params: p }),
      api.get('/entry/financial/load', { params: pm }),
      api.get('/entry/physical/load', { params: pm }),
    ]).then(([ach, tgt, fin, phy]) => {
      const v = x => (x.status === 'fulfilled' ? x.value.data?.data : null);
      const t = v(tgt) || {};
      setExtra({ ach: !!v(ach)?.hasData, tgt: !!t.hasData });

      const f = v(fin) || {}, fe = f.existing || {}, fp = f.prevCum || {};
      const cash = ['cashTraining', 'cashTooling', 'cashOtherJob', 'cashConsult', 'cashMisc', 'cashTesting']
        .reduce((s, k) => s + n(fp[k]) + n(fe[k]), 0);
      const ph = v(phy) || {}, pe = ph.existing || {}, pp = ph.prevCum || {};
      const units = ['twMsmeNos', 'twOtherNos', 'ojwMsmeNos', 'ojwOtherNos', 'msmeCons', 'otherCons', 'anyOther']
        .reduce((s, k) => s + n(pp[k]) + n(pe[k]), 0);
      const ltc = pe.ltcCumTotal != null ? n(pe.ltcCumTotal) : n(pp.ltcTotal) + n(pe.ltcTotal);
      const trainees = ltc + n(pp.stmNottComp) + n(pe.stmNottComp) + n(pp.trngOther) + n(pe.trngOther);
      setProg({
        cash, units, trainees,
        cashT: n(t.revEarnCash), unitsT: n(t.njuTarget), traineesT: n(t.taTarget),
      });
    });
  }, [selection.instId, selection.month, selection.year]);

  const cur = status?.[monthIdx] || {};
  const done = { fin: cur.fin, phy: cur.phy, bud: cur.bud, pla: cur.pla, ach: extra.ach, tgt: extra.tgt };
  const forms = ENTRY_FORMS.filter(f => !f.suOnly || isSU);
  const monthly = forms.filter(f => !f.yearly);
  const doneCount = monthly.filter(f => done[f.status]).length;

  return (
    <>
      {isEntry && (
        <Section
          title={`This month — ${selection.monthName} ${selection.year}`}
          sub="Submission status of each form for the selected month."
          right={status && (
            <div className="home-ring" style={{ '--p': (doneCount / monthly.length) * 100 }}>
              <span>{doneCount}/{monthly.length}</span><small>submitted</small>
            </div>
          )}>
          <div className="home-forms">
            {forms.map(f => {
              const ok = done[f.status];
              return (
                <button key={f.key} className={`home-form${ok ? ' is-done' : ''}`} style={{ '--c': f.color }} onClick={() => navigate(f.key)}>
                  <span className="home-form-icon">{f.icon}</span>
                  <span className="home-form-body">
                    <span className="home-form-label">{f.label}</span>
                    <span className="home-form-desc">{f.desc}</span>
                    <span className={`home-pill ${ok ? 'home-pill-ok' : 'home-pill-wait'}`}>
                      {status === null ? '…' : ok ? <><CheckCircleOutlined /> {f.yearly ? 'Set' : 'Submitted'}</> : <><ClockCircleOutlined /> {f.yearly ? 'Not set' : 'Pending'}</>}
                    </span>
                  </span>
                  <ArrowRightOutlined className="home-form-go" />
                </button>
              );
            })}
          </div>
        </Section>
      )}

      <div className="home-two">
        <Section title="Progress towards annual targets" sub={`Cumulative up to ${selection.monthName} ${selection.year}.`}>
          {!prog ? <div className="home-loading"><Spin /></div> : (
            <div className="home-progs">
              <Progress icon={<RiseOutlined />} label="Revenue earned (cash)" value={prog.cash} target={prog.cashT} unit="Rs. Lakh" color="#0f8a7a" />
              <Progress icon={<ToolOutlined />} label="Units benefited" value={prog.units} target={prog.unitsT} unit="units" color="#1f6fb2" />
              <Progress icon={<TeamOutlined />} label="Trainees trained" value={prog.trainees} target={prog.traineesT} unit="trainees" color="#7a4bb3" />
            </div>
          )}
        </Section>

        <Section title="Year at a glance" sub={`Monthly submissions for ${selection.year}.`}>
          {!status ? <div className="home-loading"><Spin /></div> : (
            <div className="home-year">
              <table>
                <thead>
                  <tr><th />{MONTHS.map((m, i) => <th key={m} className={i === monthIdx ? 'is-cur' : ''}>{m}</th>)}</tr>
                </thead>
                <tbody>
                  {[['fin', 'Financial'], ['phy', 'Physical'], ['bud', 'Budget'], ['pla', 'Placement']].map(([k, lbl]) => (
                    <tr key={k}>
                      <td className="home-year-lbl">{lbl}</td>
                      {status.map((r, i) => (
                        <td key={i} className={i === monthIdx ? 'is-cur' : ''}>
                          <span className={`home-dot ${r[k] ? 'on' : i < monthIdx ? 'miss' : ''}`} title={`${lbl} — ${r.label}: ${r[k] ? 'submitted' : 'not submitted'}`} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="home-year-legend">
                <span><i className="home-dot on" /> Submitted</span>
                <span><i className="home-dot miss" /> Missing (past month)</span>
                <span><i className="home-dot" /> Not yet due</span>
              </div>
            </div>
          )}
        </Section>
      </div>
    </>
  );
}

/* ═══════════════════ Admin view (SU / RU reports): all institutes ═══════════════════ */
function AdminView({ selection }) {
  const [mpr, setMpr] = useState(null);
  const [ana, setAna] = useState(null);
  const monthIdx = parseInt(selection.month, 10) - 1;
  const mk = MPR_KEYS[monthIdx];

  useEffect(() => {
    api.get('/reports/mpr', { params: { year: selection.year } }).then(r => setMpr(r.data?.data || [])).catch(() => setMpr([]));
    api.get('/reports/analysis', { params: { month: selection.month, year: selection.year } }).then(r => setAna(r.data?.data || [])).catch(() => setAna([]));
  }, [selection.month, selection.year]);

  const counts = { OK: 0, A: 0, B: 0, NOT: 0 };
  (mpr || []).forEach(r => { counts[r[mk]] = (counts[r[mk]] || 0) + 1; });
  const total = (mpr || []).length || 1;
  const pending = (mpr || []).filter(r => r[mk] !== 'OK');
  const trend = MPR_KEYS.map(k => (mpr || []).filter(r => r[k] === 'OK').length);
  const trendMax = Math.max(1, (mpr || []).length);

  const sum = k => (ana || []).reduce((s, r) => s + n(r[k]), 0);
  const reporting = (ana || []).filter(r => !r.noData).length;

  const segs = [
    { k: 'OK',  label: 'Complete',            cls: 'seg-ok' },
    { k: 'A',   label: 'Financial only',      cls: 'seg-a' },
    { k: 'B',   label: 'Physical only',       cls: 'seg-b' },
    { k: 'NOT', label: 'Not submitted',       cls: 'seg-not' },
  ];

  return (
    <>
      <div className="home-two home-three">
        <Section title={`Submission status — ${selection.monthName} ${selection.year}`}
          sub="MPR submission by institutes (Financial + Physical) for the selected month.">
          {!mpr ? <div className="home-loading"><Spin /></div> : (
            <>
              <div className="home-stack">
                {segs.map(s => counts[s.k] > 0 && (
                  <span key={s.k} className={s.cls} style={{ flex: counts[s.k] }} title={`${s.label}: ${counts[s.k]}`} />
                ))}
              </div>
              <div className="home-stat-row">
                {segs.map(s => (
                  <div key={s.k} className="home-stat">
                    <i className={s.cls} />
                    <b>{counts[s.k] || 0}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="home-pending">
                <div className="home-pending-title">
                  {pending.length ? <><WarningOutlined /> Awaiting complete submission ({pending.length} of {total})</> : <><CheckCircleOutlined /> All institutes have submitted</>}
                </div>
                <div className="home-chips">
                  {pending.slice(0, 40).map(r => (
                    <span key={r.userId} className={`home-chip ${r[mk] === 'NOT' ? 'chip-not' : 'chip-part'}`}
                      title={r[mk] === 'A' ? 'Financial only' : r[mk] === 'B' ? 'Physical only' : 'Not submitted'}>
                      {r.userId}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </Section>

        <Section title="All institutes — up to this month" sub={`Cumulative achievement vs annual targets · ${reporting} institute(s) reporting.`}>
          {!ana ? <div className="home-loading"><Spin /></div> : (
            <div className="home-progs">
              <Progress icon={<RiseOutlined />} label="Revenue earned (accrual)" value={sum('revA')} target={sum('revT')} unit="Rs. Lakh" color="#0f8a7a" />
              <Progress icon={<TeamOutlined />} label="Trainees trained" value={sum('trainA')} target={sum('trainT')} unit="trainees" color="#7a4bb3" />
              <Progress icon={<ToolOutlined />} label="Units assisted" value={sum('unitA')} target={sum('unitT')} unit="units" color="#1f6fb2" />
            </div>
          )}
        </Section>

        <Section title={`Complete submissions through ${selection.year}`} sub="Number of institutes with both Financial and Physical data, month by month.">
          {!mpr ? <div className="home-loading"><Spin /></div> : (
            <div className="home-trend">
              {trend.map((v, i) => (
                <div key={i} className={`home-trend-col${i === monthIdx ? ' is-cur' : ''}`}>
                  <span className="home-trend-val">{v}</span>
                  <div className="home-trend-bar"><span style={{ height: `${(v / trendMax) * 100}%` }} /></div>
                  <span className="home-trend-lbl">{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </>
  );
}

/* ═══════════════════ Page ═══════════════════ */
export default function HomePage() {
  const { selection, user } = useAuth();
  const navigate = useNavigate();

  const isEntry = selection?.section === '1';
  const isSU    = user?.role === 'SU';
  const isRU    = user?.role === 'RU';
  const adminReports = !isEntry && (isSU || isRU);
  const name = user?.userId || user?.uid || user?.userName || 'User';

  const groups = REPORT_GROUPS
    .map(g => ({ ...g, items: g.items.filter(i => (adminReports ? (!i.suOnly || isSU) : i.iu)) }))
    .filter(g => g.items.length);

  if (!selection) return null;

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <header className="home-hero">
        <div className="home-hero-main">
          <span className="home-hero-kicker">{greeting()}, {name}</span>
          <h1>{adminReports ? 'MPR-AB Reports Dashboard' : selection.instName}</h1>
          <div className="home-hero-meta">
            <span><CalendarOutlined /> {selection.monthName} {selection.year}</span>
            {adminReports && <span><BarChartOutlined /> Viewing: {selection.instName}</span>}
            <span className={isEntry ? 'is-entry' : 'is-report'}>{isEntry ? 'Entry Section' : 'Report Section'}</span>
            <span>{isSU ? 'Super User' : isRU ? 'Report User' : 'Institute User'}</span>
          </div>
        </div>
        <button className="home-switch" onClick={() => navigate('/dashboard')}>
          <SwapOutlined /> Switch month / section
        </button>
      </header>

      {adminReports
        ? <AdminView selection={selection} />
        : <InstituteView selection={selection} isSU={isSU} isEntry={isEntry} navigate={navigate} />}

      {/* ── Report shortcuts ── */}
      {!isEntry && (
        <Section title="Reports" className="home-reports" sub="Open a report — you'll choose the month / year on the next screen.">
          <div className="home-groups">
            {groups.map(g => (
              <div key={g.title} className="home-group">
                <div className="home-group-title">{g.title}</div>
                <div className="home-links">
                  {g.items.map(i => (
                    <button key={i.key} className="home-link" title={i.desc} onClick={() => navigate(i.key)}>
                      <span className="home-link-icon">{i.icon}</span>
                      <span className="home-link-body"><b>{i.label}</b><small>{i.desc}</small></span>
                      <ArrowRightOutlined className="home-link-go" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
