import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import {
  DeleteOutlined, PrinterOutlined, ReloadOutlined, SaveOutlined, EditOutlined, PlusOutlined, CloseOutlined,
  ToolOutlined, FundOutlined, TeamOutlined, SoundOutlined,
  CheckCircleOutlined, LockOutlined, ClockCircleOutlined, InfoCircleOutlined, WarningOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './PhysicalPage.css';
import '../../styles/entry-compact.css';

/* ═══════════════════════════════════════════════════════
   Cell helpers — defined OUTSIDE component to avoid remount
   ═══════════════════════════════════════════════════════ */

const fmt = v => {
  const x = typeof v === 'number' ? v : (parseFloat(v) || 0);
  return Number.isInteger(x) ? x : x.toFixed(2);
};

function EditCell({ value, onChange, disabled, decimal = false }) {
  return (
    <td className="phy-cell phy-in-cell">
      <input
        className="phy-input"
        inputMode={decimal ? 'decimal' : 'numeric'}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="0"
      />
    </td>
  );
}

function CalcCell({ value, total = false }) {
  return <td className={`phy-cell phy-calc${total ? ' phy-calc-total' : ''}`}>{fmt(value)}</td>;
}

function DashCell() {
  return <td className="phy-cell phy-dash">—</td>;
}

function TgtCell({ value }) {
  return <td className="phy-cell phy-tgt">{value ? fmt(value) : '—'}</td>;
}

function PctCell({ cum, target }) {
  if (!(target > 0)) return <td className="phy-cell phy-dash">—</td>;
  const p = (cum / target) * 100;
  return (
    <td className="phy-cell phy-pct">
      <div className="phy-pct-val">{p.toFixed(1)}%</div>
      <div className="phy-pct-bar"><span style={{ width: `${Math.min(p, 100)}%` }} /></div>
    </td>
  );
}

/* Standard Target / During / Cumulative / % head */
function StatHead({ first = 'Particulars' }) {
  return (
    <thead>
      <tr>
        <th className="phy-th phy-th-left" colSpan={2}>{first}</th>
        <th className="phy-th">Target</th>
        <th className="phy-th">During<span>the month</span></th>
        <th className="phy-th">Cumulative<span>up to the month</span></th>
        <th className="phy-th">Achievement<span>w.r.t. annual target</span></th>
      </tr>
    </thead>
  );
}

function GroupRow({ children }) {
  return <tr className="phy-group-row"><td colSpan={6}>{children}</td></tr>;
}

/* Bifurcation card (C – H): categories as columns; During (inputs) / Cumulative (calc) as rows */
function BifurCard({ letter, title, cols, dtm, set, cum, disabled, expected, total = true }) {
  const dSum = cols.reduce((s, c) => s + (parseFloat(dtm[c.key]) || 0), 0);
  const cSum = cols.reduce((s, c) => s + cum[c.key], 0);
  const check = expected > 0 && total;
  const ok = dSum === expected;
  return (
    <section className="phy-card">
      <div className="phy-card-head">
        <span className="phy-badge">{letter}</span>
        <div><h2>{title}</h2><p>Trainees trained — bifurcation</p></div>
        {check && (
          <span className={`phy-check ${ok ? 'phy-check-ok' : 'phy-check-warn'}`}
            title="Compared with Total (a+b+c) — No. of trainees during the month">
            {ok ? <CheckCircleOutlined /> : <WarningOutlined />}
            {ok ? `Matches ${expected} trainees` : `Total ${dSum} ≠ ${expected} trainees this month`}
          </span>
        )}
      </div>
      <div className="phy-table-wrap">
        <table className="phy-table phy-bifur">
          <thead>
            <tr>
              <th className="phy-th phy-th-left phy-bifur-lbl"></th>
              {cols.map(c => <th key={c.key} className="phy-th phy-bifur-th">{c.label}</th>)}
              {total && <th className="phy-th phy-bifur-th phy-th-total">Total</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="phy-cell phy-label">During the month</td>
              {cols.map(c => <EditCell key={c.key} value={dtm[c.key]} onChange={set(c.key)} disabled={disabled} />)}
              {total && <CalcCell value={dSum} total />}
            </tr>
            <tr>
              <td className="phy-cell phy-label">Cumulative</td>
              {cols.map(c => <CalcCell key={c.key} value={cum[c.key]} />)}
              {total && <CalcCell value={cSum} total />}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
const n = (v) => parseFloat(v) || 0;


const ZERO_PREV = {
  twMsmeNos: 0, twMsmeValues: 0, twOtherNos: 0, twOtherValues: 0,
  ojwMsmeNos: 0, ojwMsmeValues: 0, ojwOtherNos: 0, ojwOtherValues: 0,
  msmeCons: 0, otherCons: 0, anyOther: 0,
  stmNocComp: 0, stmNottComp: 0, trngOther: 0, trngTotalNoc: 0, trngTotalNot: 0,
  seminarsNos: 0, seminarsPts: 0,
  gen: 0, sc: 0, st: 0, obc: 0, min: 0,
  men: 0, wmn: 0, transgender: 0,
  thFail: 0, thPass: 0, twelfth: 0, iti: 0, diploma: 0,
  gradNonTech: 0, gradTech: 0, pgNonTech: 0, pgTech: 0, phdMhil: 0,
  a1520: 0, a2125: 0, a2630: 0, a3140: 0, above40: 0, ph: 0, ltcTotal: 0,
};

export default function PhysicalPage() {
  const { selection, user } = useAuth();

  const [PREV, setPrev]      = useState(ZERO_PREV);
  const [FIX_VAL1, setFix1]  = useState(0); // phy_total_nos_target
  const [FIX_VAL2, setFix2]  = useState(0); // trng_total_not_target
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [clearing, setClearing] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [loadErr, setLoadErr] = useState('');

  /* ── editable DTM state ── */
  const INIT_DTM = {
    twMsmeNos: '', twMsmeValues: '', twOtherNos: '', twOtherValues: '',
    ojwMsmeNos: '', ojwMsmeValues: '', ojwOtherNos: '', ojwOtherValues: '',
    msmeCons: '', otherCons: '',
    anyOther: '',
    stmNocComp: '', stmNottComp: '', trngOther: '',
    trngTotalNoc: '', trngTotalNot: '',
    seminarsNos: '', seminarsPts: '',
    gen: '', sc: '', st: '', obc: '', min: '', ph: '',
    men: '', wmn: '', transgender: '',
    thFail: '', thPass: '', twelfth: '', iti: '', diploma: '', gradNonTech: '', gradTech: '',
    pgNonTech: '', pgTech: '', phdMhil: '',
    a1520: '', a2125: '', a2630: '', a3140: '', above40: '',
  };

  const [dtm, setDtm] = useState(INIT_DTM);
  const [ltcCourses, setLtcCourses] = useState([{ name: '', dtm: '', cumMon: '' }]);

  const set = (key) => (e) => setDtm((prev) => ({ ...prev, [key]: e.target.value }));

  const setLtc = (i, field) => (e) => {
    setLtcCourses((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: e.target.value };
      return next;
    });
  };

  const addLtcRow = () => setLtcCourses(prev => [...prev, { name: '', dtm: '', cumMon: '' }]);
  const removeLtcRow = (i) => setLtcCourses(prev => prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== i));

  useEffect(() => {
    if (!selection?.instId || !selection?.month || !selection?.year) return;
    setLoading(true); setBlocked(false); setHasData(false); setLoadErr('');
    api.get('/entry/physical/load', {
      params: { instId: selection.instId, month: selection.month, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (!data) return;
      setPrev({ ...ZERO_PREV, ...(data.prevCum || {}) });
      setLtcCourses([{ name: '', dtm: '', cumMon: '' }]);
      if (data.targets) {
        if (data.targets.phyTotalNos != null) setFix1(data.targets.phyTotalNos);
        if (data.targets.trngTotalNot != null) setFix2(data.targets.trngTotalNot);
      }
      if (data.hasData) {
        setHasData(true);
        const { ltcCourses: savedLtc, ...ex } = data.existing || {};
        setDtm(prev => ({ ...prev, ...ex }));
        if (Array.isArray(savedLtc) && savedLtc.length)
          setLtcCourses(savedLtc.map(c => ({ name: c.name || '', dtm: String(c.dtm ?? ''), cumMon: String(c.cumMon ?? '') })));
        if (user?.role !== 'SU') setBlocked(true);
      }
    }).catch(() => setLoadErr('Could not load form data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.month, selection?.year]);

  /* ── Print: strip the app shell so only the form prints (button + Ctrl+P) ── */
  useEffect(() => {
    const on  = () => document.body.classList.add('phy-printing');
    const off = () => document.body.classList.remove('phy-printing');
    window.addEventListener('beforeprint', on);
    window.addEventListener('afterprint', off);
    return () => {
      window.removeEventListener('beforeprint', on);
      window.removeEventListener('afterprint', off);
      off();
    };
  }, []);

  const handleSave = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    setSaving(true);
    api.post('/entry/physical/save', {
      instId: selection.instId, month: selection.month, year: selection.year,
      ...dtm,
      ltcCourses,
    }).then(() => {
      message.success('Physical data saved successfully!');
      // saved → switch to "existing data" mode: enables Update / Clear Data (SU), locks the form for others
      setHasData(true);
      if (user?.role !== 'SU') setBlocked(true);
    })
      .catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  /* ── Section B computed values ── */
  // (a) Tooling Work
  const twMsmeNosCum    = PREV.twMsmeNos    + n(dtm.twMsmeNos);
  const twMsmeValuesCum = PREV.twMsmeValues + n(dtm.twMsmeValues);
  const twOtherNosCum   = PREV.twOtherNos   + n(dtm.twOtherNos);
  const twOtherValuesCum= PREV.twOtherValues+ n(dtm.twOtherValues);
  // (b) Other Job Work
  const ojwMsmeNosCum    = PREV.ojwMsmeNos    + n(dtm.ojwMsmeNos);
  const ojwMsmeValuesCum = PREV.ojwMsmeValues + n(dtm.ojwMsmeValues);
  const ojwOtherNosCum   = PREV.ojwOtherNos   + n(dtm.ojwOtherNos);
  const ojwOtherValuesCum= PREV.ojwOtherValues+ n(dtm.ojwOtherValues);
  // (c) Consultancies
  const msmeConsCum      = PREV.msmeCons      + n(dtm.msmeCons);
  const otherConsCum     = PREV.otherCons     + n(dtm.otherCons);
  // (d) Any Others
  const anyOtherCum      = PREV.anyOther      + n(dtm.anyOther);

  // Physical total Nos (a+b+c+d)
  const phyTotalNosDtm = n(dtm.twMsmeNos) + n(dtm.twOtherNos)
    + n(dtm.ojwMsmeNos) + n(dtm.ojwOtherNos)
    + n(dtm.msmeCons) + n(dtm.otherCons) + n(dtm.anyOther);
  const phyTotalNosCum = twMsmeNosCum + twOtherNosCum
    + ojwMsmeNosCum + ojwOtherNosCum
    + msmeConsCum + otherConsCum + anyOtherCum;

  // Physical total Values (Tooling + OtherJob)
  const phyTotalValuesDtm = n(dtm.twMsmeValues) + n(dtm.twOtherValues)
    + n(dtm.ojwMsmeValues) + n(dtm.ojwOtherValues);
  const phyTotalValuesCum = twMsmeValuesCum + twOtherValuesCum
    + ojwMsmeValuesCum + ojwOtherValuesCum;

  /* ── Training computed values ── */
  const ltcDtmTotal  = ltcCourses.reduce((s, r) => s + n(r.dtm),    0);
  const ltcCumTotal  = ltcCourses.reduce((s, r) => s + n(r.cumMon), 0);

  const stmNocCompCum  = PREV.stmNocComp  + n(dtm.stmNocComp);
  const stmNottCompCum = PREV.stmNottComp + n(dtm.stmNottComp);
  const trngOtherCum   = PREV.trngOther   + n(dtm.trngOther);

  const trngTotalNocCum = PREV.trngTotalNoc + n(dtm.trngTotalNoc);
  // (a+b+c) cumulative = LTC cumulative + short-term trainees cumulative + others (as in the legacy form)
  const trngTotalNotCum = ltcCumTotal + stmNottCompCum + trngOtherCum;

  const seminarsNosCum = PREV.seminarsNos + n(dtm.seminarsNos);
  const seminarsPtsCum = PREV.seminarsPts + n(dtm.seminarsPts);

  /* ── Bifurcation C (Category) ── */
  const genCum  = PREV.gen  + n(dtm.gen);
  const scCum   = PREV.sc   + n(dtm.sc);
  const stCum   = PREV.st   + n(dtm.st);
  const obcCum  = PREV.obc  + n(dtm.obc);
  const minCum  = PREV.min  + n(dtm.min);
  const catDtmTotal  = n(dtm.gen)  + n(dtm.sc) + n(dtm.st) + n(dtm.obc) + n(dtm.min);
  const catCumTotal  = genCum + scCum + stCum + obcCum + minCum;

  /* ── Bifurcation D (Gender) ── */
  const menCum   = PREV.men         + n(dtm.men);
  const wmnCum   = PREV.wmn         + n(dtm.wmn);
  const transCum = PREV.transgender + n(dtm.transgender);
  const genDtmTotal = n(dtm.men) + n(dtm.wmn) + n(dtm.transgender);
  const genCumTotal = menCum + wmnCum + transCum;

  /* ── Bifurcation E (Qualification part 1) ── */
  const thFailCum    = PREV.thFail     + n(dtm.thFail);
  const thPassCum    = PREV.thPass     + n(dtm.thPass);
  const twelfthCum   = PREV.twelfth    + n(dtm.twelfth);
  const itiCum       = PREV.iti        + n(dtm.iti);
  const diplomaCum   = PREV.diploma    + n(dtm.diploma);
  const gradNTCum    = PREV.gradNonTech+ n(dtm.gradNonTech);
  const gradTCum     = PREV.gradTech   + n(dtm.gradTech);
  const qualEDtmTot  = n(dtm.thFail)+n(dtm.thPass)+n(dtm.twelfth)+n(dtm.iti)+n(dtm.diploma)+n(dtm.gradNonTech)+n(dtm.gradTech);
  const qualECumTot  = thFailCum+thPassCum+twelfthCum+itiCum+diplomaCum+gradNTCum+gradTCum;

  /* ── Bifurcation F (Qualification part 2) ── */
  const pgNTCum     = PREV.pgNonTech + n(dtm.pgNonTech);
  const pgTCum      = PREV.pgTech    + n(dtm.pgTech);
  const phdMhilCum  = PREV.phdMhil   + n(dtm.phdMhil);
  const qualFDtmTot = n(dtm.pgNonTech)+n(dtm.pgTech)+n(dtm.phdMhil);
  const qualFCumTot = pgNTCum+pgTCum+phdMhilCum;
  // Grand totals for E+F
  const qualAllDtm = qualEDtmTot + qualFDtmTot;
  const qualAllCum = qualECumTot + qualFCumTot;

  /* ── Bifurcation G (Age) ── */
  const a1520Cum  = PREV.a1520  + n(dtm.a1520);
  const a2125Cum  = PREV.a2125  + n(dtm.a2125);
  const a2630Cum  = PREV.a2630  + n(dtm.a2630);
  const a3140Cum  = PREV.a3140  + n(dtm.a3140);
  const aboveCum  = PREV.above40+ n(dtm.above40);
  const ageDtmTot = n(dtm.a1520)+n(dtm.a2125)+n(dtm.a2630)+n(dtm.a3140)+n(dtm.above40);
  const ageCumTot = a1520Cum+a2125Cum+a2630Cum+a3140Cum+aboveCum;

  /* ── Bifurcation H (PH) ── */
  const phCum = PREV.ph + n(dtm.ph);

  /* ── Handlers ── */
  const handleReset = () => {
    setDtm(INIT_DTM);
    setLtcCourses([{ name: '', dtm: '', cumMon: '' }]);
  };

  /* ── SU only: clear this month's submitted record so the institute can re-enter ── */
  const handleClear = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    const when = `${selection.monthName || selection.month} ${selection.year}`;
    if (!window.confirm(
      `Clear the submitted Physical Section data for ${selection.instName || selection.instId} — ${when}?\n\n` +
      `This deletes the month's entry. The institute will be able to fill it in again.`
    )) return;
    setClearing(true);
    api.delete('/admin/data', {
      params: { instId: selection.instId, year: selection.year, month: selection.month, section: '03' },
    }).then(() => {
      message.success('Physical Section data cleared — the institute can now re-enter it.');
      handleReset();
      setHasData(false);
      setBlocked(false);
    }).catch(err => message.error(err.response?.data?.message || 'Clear failed'))
      .finally(() => setClearing(false));
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  const isSU = user?.role === 'SU';
  const cumOf = Object.fromEntries(Object.keys(ZERO_PREV).map(k => [k, (PREV[k] || 0) + n(dtm[k])]));
  const traineesThisMonth = n(dtm.trngTotalNot);

  const status = blocked
    ? { cls: 'phy-status-locked', icon: <LockOutlined />, text: 'Submitted — locked' }
    : hasData
      ? { cls: 'phy-status-saved', icon: <CheckCircleOutlined />, text: isSU ? 'Submitted — editable (SU)' : 'Submitted' }
      : { cls: 'phy-status-new', icon: <ClockCircleOutlined />, text: 'Not yet submitted' };

  const pctTxt = (c, t) => (t > 0 ? `${((c / t) * 100).toFixed(1)}% of target ${t}` : 'no annual target set');
  const kpis = [
    { label: 'Units benefited',       icon: <ToolOutlined />,  cls: 'phy-k-navy',  value: fmt(phyTotalNosCum),    sub: pctTxt(phyTotalNosCum, FIX_VAL1) },
    { label: 'Value of work (Rs. L)', icon: <FundOutlined />,  cls: 'phy-k-gold',  value: fmt(phyTotalValuesCum), sub: <>cumulative · <b>{fmt(phyTotalValuesDtm)}</b> this month</> },
    { label: 'Trainees trained',      icon: <TeamOutlined />,  cls: 'phy-k-teal',  value: fmt(trngTotalNotCum),   sub: pctTxt(trngTotalNotCum, FIX_VAL2) },
    { label: 'Seminar participants',  icon: <SoundOutlined />, cls: 'phy-k-purple', value: fmt(seminarsPtsCum),  sub: <>in <b>{fmt(seminarsNosCum)}</b> seminars / workshops</> },
  ];

  /* one "Nos. + Values" pair for tooling / other-job work */
  const workPair = (label, nosKey, valKey, nosCum, valCum) => ([
    <tr key={nosKey}>
      <td className="phy-cell phy-label phy-sub" rowSpan={2}>{label}</td>
      <td className="phy-cell phy-unit">Nos.</td>
      <DashCell />
      <EditCell value={dtm[nosKey]} onChange={set(nosKey)} disabled={blocked} />
      <CalcCell value={nosCum} />
      <DashCell />
    </tr>,
    <tr key={valKey}>
      <td className="phy-cell phy-unit">Value (Rs. Lakh)</td>
      <DashCell />
      <EditCell value={dtm[valKey]} onChange={set(valKey)} disabled={blocked} decimal />
      <CalcCell value={valCum} />
      <DashCell />
    </tr>,
  ]);

  /* ── Render ── */
  return (
    <div className="phy-page">
      {/* print-only header */}
      <div className="phy-print-header">
        <div className="phy-print-title">Monthly Progress Report — Section B (Physical) &amp; Bifurcation C – H</div>
        <div className="phy-print-sub">
          {selection?.instName || ''}
          {selection?.monthName ? ` — ${selection.monthName} ${selection.year}` : ''}
        </div>
      </div>

      {/* ── Hero ── */}
      <header className="phy-hero">
        <div className="phy-hero-main">
          <span className="phy-hero-kicker">Monthly Progress Report · Section B &amp; C – H</span>
          <h1 className="phy-hero-title">Physical Section</h1>
          <span className="phy-hero-inst">{selection?.instName || '—'}</span>
        </div>
        <div className="phy-hero-side">
          {selection?.monthName && <span className="phy-hero-chip">{selection.monthName} {selection.year}</span>}
          <span className={`phy-status ${status.cls}`}>{status.icon}{status.text}</span>
        </div>
      </header>

      {loadErr && <Alert type="warning" showIcon message={loadErr} className="phy-alert" />}
      {blocked && (
        <Alert type="info" showIcon icon={<LockOutlined />} className="phy-alert"
          message="This month's physical data has been submitted."
          description="The form is read-only. Contact the SU (Senet Division) if a correction is needed." />
      )}

      {/* ── KPI tiles ── */}
      <div className="phy-kpis">
        {kpis.map(k => (
          <div key={k.label} className={`phy-kpi ${k.cls}`}>
            <span className="phy-kpi-icon">{k.icon}</span>
            <div>
              <div className="phy-kpi-label">{k.label}</div>
              <div className="phy-kpi-value">{k.value}</div>
              <div className="phy-kpi-sub">{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════ B. Units benefited ═══════════ */}
      <section className="phy-card">
        <div className="phy-card-head">
          <span className="phy-badge">B</span>
          <div><h2>Number of units benefited</h2><p>Enter this month's figures — cumulative values and totals are calculated.</p></div>
        </div>
        <div className="phy-table-wrap">
          <table className="phy-table phy-stat">
            <colgroup>
              <col style={{ width: 230 }} /><col style={{ width: 150 }} />
              <col style={{ width: 100 }} /><col style={{ width: 130 }} /><col style={{ width: 130 }} /><col style={{ width: 170 }} />
            </colgroup>
            <StatHead />
            <tbody>
              <GroupRow>(a) Tooling work</GroupRow>
              {workPair('(i) MSMEs',  'twMsmeNos',  'twMsmeValues',  twMsmeNosCum, twMsmeValuesCum)}
              {workPair('(ii) Others', 'twOtherNos', 'twOtherValues', twOtherNosCum, twOtherValuesCum)}

              <GroupRow>(b) Other job work</GroupRow>
              {workPair('(i) MSMEs',  'ojwMsmeNos',  'ojwMsmeValues',  ojwMsmeNosCum, ojwMsmeValuesCum)}
              {workPair('(ii) Others', 'ojwOtherNos', 'ojwOtherValues', ojwOtherNosCum, ojwOtherValuesCum)}

              <GroupRow>(c) Consultancies</GroupRow>
              <tr>
                <td className="phy-cell phy-label phy-sub" colSpan={2}>(i) MSMEs</td>
                <DashCell /><EditCell value={dtm.msmeCons} onChange={set('msmeCons')} disabled={blocked} /><CalcCell value={msmeConsCum} /><DashCell />
              </tr>
              <tr>
                <td className="phy-cell phy-label phy-sub" colSpan={2}>(ii) Others</td>
                <DashCell /><EditCell value={dtm.otherCons} onChange={set('otherCons')} disabled={blocked} /><CalcCell value={otherConsCum} /><DashCell />
              </tr>

              <GroupRow>(d) Any others</GroupRow>
              <tr>
                <td className="phy-cell phy-label phy-sub" colSpan={2}>Any others</td>
                <DashCell /><EditCell value={dtm.anyOther} onChange={set('anyOther')} disabled={blocked} /><CalcCell value={anyOtherCum} /><DashCell />
              </tr>
            </tbody>
            <tfoot>
              <tr className="phy-total-row">
                <td className="phy-cell phy-total-label" rowSpan={2}>Total (a+b+c+d)</td>
                <td className="phy-cell phy-unit">Nos.</td>
                <TgtCell value={FIX_VAL1} />
                <CalcCell value={phyTotalNosDtm} total />
                <CalcCell value={phyTotalNosCum} total />
                <PctCell cum={phyTotalNosCum} target={FIX_VAL1} />
              </tr>
              <tr className="phy-total-row">
                <td className="phy-cell phy-unit">Value (Rs. Lakh)</td>
                <DashCell />
                <CalcCell value={phyTotalValuesDtm} total />
                <CalcCell value={phyTotalValuesCum} total />
                <DashCell />
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* ═══════════ Training activities ═══════════ */}
      <section className="phy-card">
        <div className="phy-card-head">
          <span className="phy-badge phy-badge-alt"><TeamOutlined /></span>
          <div><h2>Training activities</h2><p>Long term courses are entered course-wise; their cumulative is the figure up to this month as per course records.</p></div>
        </div>

        <div className="phy-subhead">(a) Long term courses <span>— course-wise details of trainees</span></div>
        <div className="phy-table-wrap">
          <table className="phy-table phy-ltc">
            <thead>
              <tr>
                <th className="phy-th" style={{ width: 56 }}>S.No</th>
                <th className="phy-th phy-th-left">Name of the programme</th>
                <th className="phy-th" style={{ width: 150 }}>Trainees trained<span>during the month</span></th>
                <th className="phy-th" style={{ width: 150 }}>Trainees trained<span>up to the month</span></th>
                {!blocked && <th className="phy-th" style={{ width: 56 }}></th>}
              </tr>
            </thead>
            <tbody>
              {ltcCourses.map((row, i) => (
                <tr key={i}>
                  <td className="phy-cell phy-rowno"><span>{i + 1}</span></td>
                  <td className="phy-cell">
                    <input className="phy-input phy-input-text" value={row.name} onChange={setLtc(i, 'name')}
                      disabled={blocked} placeholder="e.g. Diploma in Tool & Die Making" />
                  </td>
                  <td className="phy-cell phy-in-cell">
                    <input className="phy-input" inputMode="numeric" value={row.dtm} onChange={setLtc(i, 'dtm')} disabled={blocked} placeholder="0" />
                  </td>
                  <td className="phy-cell phy-in-cell">
                    <input className="phy-input" inputMode="numeric" value={row.cumMon} onChange={setLtc(i, 'cumMon')} disabled={blocked} placeholder="0" />
                  </td>
                  {!blocked && (
                    <td className="phy-cell phy-in-cell">
                      <button type="button" className="phy-row-del" onClick={() => removeLtcRow(i)}
                        disabled={ltcCourses.length <= 1} title="Remove course" aria-label="Remove course">
                        <CloseOutlined />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="phy-total-row">
                <td className="phy-cell" />
                <td className="phy-cell phy-total-label">
                  Total
                  {!blocked && (
                    <button type="button" className="phy-add-btn" onClick={addLtcRow}><PlusOutlined /> Add course</button>
                  )}
                </td>
                <CalcCell value={ltcDtmTotal} total />
                <CalcCell value={ltcCumTotal} total />
                {!blocked && <td className="phy-cell" />}
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="phy-table-wrap phy-gap">
          <table className="phy-table phy-stat">
            <colgroup>
              <col style={{ width: 230 }} /><col style={{ width: 150 }} />
              <col style={{ width: 100 }} /><col style={{ width: 130 }} /><col style={{ width: 130 }} /><col style={{ width: 170 }} />
            </colgroup>
            <StatHead />
            <tbody>
              <tr>
                <td className="phy-cell phy-label phy-sub" rowSpan={2}>(b) Short term</td>
                <td className="phy-cell phy-unit">Courses completed</td>
                <DashCell /><EditCell value={dtm.stmNocComp} onChange={set('stmNocComp')} disabled={blocked} /><CalcCell value={stmNocCompCum} /><DashCell />
              </tr>
              <tr>
                <td className="phy-cell phy-unit">Trainees trained (completed)</td>
                <DashCell /><EditCell value={dtm.stmNottComp} onChange={set('stmNottComp')} disabled={blocked} /><CalcCell value={stmNottCompCum} /><DashCell />
              </tr>
              <tr>
                <td className="phy-cell phy-label phy-sub" colSpan={2}>(c) Others</td>
                <DashCell /><EditCell value={dtm.trngOther} onChange={set('trngOther')} disabled={blocked} /><CalcCell value={trngOtherCum} /><DashCell />
              </tr>
              <tr className="phy-total-row">
                <td className="phy-cell phy-total-label" rowSpan={2}>Total (a+b+c)</td>
                <td className="phy-cell phy-unit">No. of courses</td>
                <DashCell /><EditCell value={dtm.trngTotalNoc} onChange={set('trngTotalNoc')} disabled={blocked} /><CalcCell value={trngTotalNocCum} total /><DashCell />
              </tr>
              <tr className="phy-total-row">
                <td className="phy-cell phy-unit">No. of trainees</td>
                <TgtCell value={FIX_VAL2} />
                <EditCell value={dtm.trngTotalNot} onChange={set('trngTotalNot')} disabled={blocked} />
                <CalcCell value={trngTotalNotCum} total />
                <PctCell cum={trngTotalNotCum} target={FIX_VAL2} />
              </tr>
              <tr>
                <td className="phy-cell phy-label phy-sub" rowSpan={2}>Seminars / Workshops</td>
                <td className="phy-cell phy-unit">No.</td>
                <DashCell /><EditCell value={dtm.seminarsNos} onChange={set('seminarsNos')} disabled={blocked} /><CalcCell value={seminarsNosCum} /><DashCell />
              </tr>
              <tr>
                <td className="phy-cell phy-unit">Participants</td>
                <DashCell /><EditCell value={dtm.seminarsPts} onChange={set('seminarsPts')} disabled={blocked} /><CalcCell value={seminarsPtsCum} /><DashCell />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════ C – H. Bifurcation ═══════════ */}
      <div className="phy-bifur-grid">
        <BifurCard letter="C" title="Category" dtm={dtm} set={set} cum={cumOf} disabled={blocked} expected={traineesThisMonth}
          cols={[{ key: 'gen', label: 'GEN' }, { key: 'sc', label: 'SC' }, { key: 'st', label: 'ST' }, { key: 'obc', label: 'OBC' }, { key: 'min', label: 'Minority' }]} />
        <BifurCard letter="D" title="Gender" dtm={dtm} set={set} cum={cumOf} disabled={blocked} expected={traineesThisMonth}
          cols={[{ key: 'men', label: 'Men' }, { key: 'wmn', label: 'Women' }, { key: 'transgender', label: 'Transgender' }]} />
      </div>

      <BifurCard letter="E – F" title="Qualification" dtm={dtm} set={set} cum={cumOf} disabled={blocked} expected={traineesThisMonth}
        cols={[
          { key: 'thFail', label: 'HSC (10th) dropout / below 10th' }, { key: 'thPass', label: 'HSC (10th)' },
          { key: 'twelfth', label: 'Intermediate (12th)' }, { key: 'iti', label: 'ITI & pursuing' },
          { key: 'diploma', label: 'Diploma & pursuing' }, { key: 'gradNonTech', label: 'Graduate (Non-Tech)' },
          { key: 'gradTech', label: 'Graduate (Tech)' }, { key: 'pgNonTech', label: 'PG (Non-Tech)' },
          { key: 'pgTech', label: 'PG (Tech)' }, { key: 'phdMhil', label: 'Ph.D / M.Phil' },
        ]} />

      <div className="phy-bifur-grid phy-bifur-grid-age">
        <BifurCard letter="G" title="Age group" dtm={dtm} set={set} cum={cumOf} disabled={blocked} expected={traineesThisMonth}
          cols={[{ key: 'a1520', label: '15 – 20' }, { key: 'a2125', label: '21 – 25' }, { key: 'a2630', label: '26 – 30' }, { key: 'a3140', label: '31 – 40' }, { key: 'above40', label: 'Above 40' }]} />
        <BifurCard letter="H" title="Persons with disability" dtm={dtm} set={set} cum={cumOf} disabled={blocked} total={false}
          cols={[{ key: 'ph', label: 'PH' }]} />
      </div>

      {/* ── Sticky action bar ── */}
      <div className="phy-actions">
        <div className="phy-actions-hint">
          <InfoCircleOutlined />
          <span>Enter figures <b>for this month</b>. Each bifurcation should add up to the month's <b>No. of trainees</b>.</span>
        </div>
        <div className="phy-actions-btns">
          <Button icon={<ReloadOutlined />} onClick={handleReset} disabled={blocked}>Reset</Button>
          <Button icon={<PrinterOutlined />} onClick={() => window.print()}>Print</Button>
          {isSU && hasData && (
            <Button danger icon={<DeleteOutlined />} onClick={handleClear} loading={clearing}>Clear Data</Button>
          )}
          {hasData
            ? <Button type="primary" icon={<EditOutlined />} onClick={handleSave} loading={saving} disabled={blocked}>Update</Button>
            : <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={saving} disabled={blocked}>Add</Button>}
        </div>
      </div>
    </div>
  );
}
