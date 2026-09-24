import React, { useState, useCallback, useEffect } from 'react';
import { Button, message, Spin, Alert } from 'antd';
import {
  SaveOutlined, ReloadOutlined, DeleteOutlined, EditOutlined, PrinterOutlined,
  RiseOutlined, WalletOutlined, FallOutlined, PercentageOutlined,
  CheckCircleOutlined, LockOutlined, ClockCircleOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './FinancialPage.css';
import '../../styles/entry-compact.css';

/* ─── pure helpers ─── */
const n    = (v) => parseFloat(v) || 0;
const fmt  = (v) => (typeof v === 'number' ? v.toFixed(2) : '0.00');
const pct  = (cum, target) => n(target) ? ((n(cum) / n(target)) * 100).toFixed(2) : '0.00';

/* ─── initial "During the month" state ─── */
const INIT_DTM = {
  cashTraining: '',   cashTooling: '',    cashOtherJob: '',
  cashConsult: '',    cashMisc: '',       cashTesting: '',
  accrualTraining: '', accrualTooling: '', accrualOtherJob: '',
  accrualConsult: '', accrualMisc: '',    accrualTesting: '',
  revExpCash: '',     revExpAccrual: '',
  perRecCashAch: '', perRecAccrualAch: '',
};

const ZERO_CUM = {
  cashTraining: 0,    cashTooling: 0,    cashOtherJob: 0,
  cashConsult: 0,     cashMisc: 0,       cashTesting: 0,
  accrualTraining: 0, accrualTooling: 0, accrualOtherJob: 0,
  accrualConsult: 0,  accrualMisc: 0,    accrualTesting: 0,
  revExpCash: 0,      revExpAccrual: 0,
};

const ZERO_TARGETS = {
  cashTraining: 0,    cashTooling: 0,    cashOtherJob: 0,
  cashConsult: 0,     cashMisc: 0,       cashTesting: 0,    cashTotal: 0,
  accrualTraining: 0, accrualTooling: 0, accrualOtherJob: 0,
  accrualConsult: 0,  accrualMisc: 0,    accrualTesting: 0, accrualTotal: 0,
  revExpCash: 0,      revExpAccrual: 0,
  perRecCash: 0,      perRecAccrual: 0,
};

/* Revenue-earning heads — each is entered on both Cash (`cash…`) and Accrual (`accrual…`) basis */
const EARN_ROWS = [
  { id: 'Training',  label: 'Training' },
  { group: 'Production' },
  { id: 'Tooling',   label: '(a) Tooling',       indent: true },
  { id: 'OtherJob',  label: '(b) Other job work', indent: true },
  { id: 'Consult',   label: 'Consultancy' },
  { id: 'Testing',   label: 'Testing / calibration / services' },
  { id: 'Misc',      label: 'Misc.' },
];

/* ═══════════════════════════════════════
   Cell Components  (defined outside to
   avoid remount on parent re-render)
   ═══════════════════════════════════════ */

function InCell({ value, onChange, disabled, cls = '', integer = false }) {
  return (
    <td className={`fin-cell fin-in-cell ${cls}`}>
      <input
        className="fin-input"
        inputMode={integer ? 'numeric' : 'decimal'}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={integer ? '0' : '0.00'}
      />
    </td>
  );
}

function CalcCell({ value, total = false, cls = '' }) {
  return <td className={`fin-cell fin-calc${total ? ' fin-calc-total' : ''}${value < 0 ? ' fin-neg' : ''} ${cls}`}>{fmt(value)}</td>;
}

function TgtCell({ value, cls = '' }) {
  return <td className={`fin-cell fin-tgt ${cls}`}>{n(value) ? n(value).toFixed(2) : '—'}</td>;
}

function DashCell({ cls = '' }) {
  return <td className={`fin-cell fin-dash ${cls}`}>—</td>;
}

function PctCell({ cumVal, target, cls = '' }) {
  if (!n(target)) return <td className={`fin-cell fin-dash ${cls}`}>—</td>;
  const p = (n(cumVal) / n(target)) * 100;
  return (
    <td className={`fin-cell fin-pct ${cls}`}>
      <div className="fin-pct-val">{p.toFixed(1)}%</div>
      <div className="fin-pct-bar"><span style={{ width: `${Math.min(Math.max(p, 0), 100)}%` }} /></div>
    </td>
  );
}

/* Two-basis head: Particulars | Cash (4 cols) | Accrual (4 cols) */
function BasisHead({ first = 'Particulars' }) {
  const sub = (cls) => (
    <>
      <th className={`fin-th fin-th-sub ${cls} fin-grp-start`}>Target</th>
      <th className={`fin-th fin-th-sub ${cls}`}>During<br />the month</th>
      <th className={`fin-th fin-th-sub ${cls}`}>Cumulative</th>
      <th className={`fin-th fin-th-sub ${cls}`}>% of target</th>
    </>
  );
  return (
    <thead>
      <tr>
        <th className="fin-th fin-th-left" rowSpan={2}>{first}</th>
        <th className="fin-th fin-th-cat fin-cash fin-grp-start" colSpan={4}>Cash basis</th>
        <th className="fin-th fin-th-cat fin-accr fin-grp-start" colSpan={4}>Accrual basis</th>
      </tr>
      <tr>{sub('fin-cash')}{sub('fin-accr')}</tr>
    </thead>
  );
}

const COLS = (
  <colgroup>
    <col style={{ width: 190 }} />
    {Array.from({ length: 8 }, (_, i) => <col key={i} style={{ width: 96 }} />)}
  </colgroup>
);

/* ═══════════════════════════════════════
   Main Component
   ═══════════════════════════════════════ */
export default function FinancialPage() {
  const { selection, user } = useAuth();
  const [dtm, setDtm]         = useState(INIT_DTM);
  const [PREV_CUM, setPrevCum] = useState(ZERO_CUM);
  const [TARGETS, setTargets]  = useState(ZERO_TARGETS);
  const [loading, setLoading]  = useState(false);
  const [saving, setSaving]    = useState(false);
  const [clearing, setClearing] = useState(false);
  const [blocked, setBlocked]  = useState(false);
  const [hasData, setHasData]  = useState(false);
  const [loadErr, setLoadErr]  = useState('');

  useEffect(() => {
    if (!selection?.instId || !selection?.month || !selection?.year) return;
    setLoading(true); setBlocked(false); setHasData(false); setLoadErr('');
    api.get('/entry/financial/load', {
      params: { instId: selection.instId, month: selection.month, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (!data) return;
      setPrevCum({ ...ZERO_CUM, ...(data.prevCum || {}) });
      setTargets({ ...ZERO_TARGETS, ...(data.targets || {}) });
      if (data.hasData) {
        setHasData(true);
        setDtm(prev => ({ ...prev, ...(data.existing || {}) }));
        if (user?.role !== 'SU') setBlocked(true);
      }
    }).catch(() => setLoadErr('Could not load form data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.month, selection?.year]);

  const handleChange = useCallback(
    (field) => (e) => {
      const val = e.target.value;
      if (val === '' || /^-?\d*\.?\d*$/.test(val))
        setDtm((prev) => ({ ...prev, [field]: val }));
    },
    []
  );

  /* Revenue Expenditure Target (Cash/Accrual) — the only two Target cells
     editable from this page; everything else in that column is annual and
     read-only here (set on /app/target). */
  const handleTargetChange = useCallback(
    (field) => (e) => {
      const val = e.target.value;
      setTargets((prev) => ({ ...prev, [field]: val }));
    },
    []
  );

  /* ── cumulative = prev months + current DTM ── */
  const cum = Object.fromEntries(
    Object.keys(PREV_CUM).map((k) => [k, n(PREV_CUM[k]) + n(dtm[k] ?? 0)])
  );

  /* ── cash totals ── */
  const cashDtm = n(dtm.cashTraining) + n(dtm.cashTooling) + n(dtm.cashOtherJob)
                + n(dtm.cashConsult)  + n(dtm.cashMisc)    + n(dtm.cashTesting);
  const cashCum = cum.cashTraining + cum.cashTooling + cum.cashOtherJob
                + cum.cashConsult  + cum.cashMisc   + cum.cashTesting;

  /* ── accrual totals ── */
  const accrDtm = n(dtm.accrualTraining) + n(dtm.accrualTooling) + n(dtm.accrualOtherJob)
                + n(dtm.accrualConsult)  + n(dtm.accrualMisc)    + n(dtm.accrualTesting);
  const accrCum = cum.accrualTraining + cum.accrualTooling + cum.accrualOtherJob
                + cum.accrualConsult  + cum.accrualMisc   + cum.accrualTesting;

  /* ── excess of income over expenditure ── */
  const excCashDtm   = cashDtm - n(dtm.revExpCash);
  const excCashCum   = cashCum - cum.revExpCash;
  const excAccrDtm   = accrDtm - n(dtm.revExpAccrual);
  const excAccrCum   = accrCum - cum.revExpAccrual;

  /* ── %age recovery = (Rev.Earning / Rev.Exp) × 100 ── */
  const prCashDtm  = n(dtm.revExpCash)   ? (cashDtm / n(dtm.revExpCash))   * 100 : 0;
  const prCashCum  = cum.revExpCash      ? (cashCum  / cum.revExpCash)      * 100 : 0;
  const prAccrDtm  = n(dtm.revExpAccrual)? (accrDtm / n(dtm.revExpAccrual)) * 100 : 0;
  const prAccrCum  = cum.revExpAccrual   ? (accrCum  / cum.revExpAccrual)   * 100 : 0;

  const handleSubmit = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    setSaving(true);
    api.post('/entry/financial/save', {
      instId: selection.instId, month: selection.month, year: selection.year,
      cashTraining: dtm.cashTraining, cashTooling: dtm.cashTooling,
      cashOtherJob: dtm.cashOtherJob, cashConsult: dtm.cashConsult,
      cashMisc: dtm.cashMisc, cashTesting: dtm.cashTesting,
      accrualTraining: dtm.accrualTraining, accrualTooling: dtm.accrualTooling,
      accrualOtherJob: dtm.accrualOtherJob, accrualConsult: dtm.accrualConsult,
      accrualMisc: dtm.accrualMisc, accrualTesting: dtm.accrualTesting,
      revExpCash: dtm.revExpCash, revExpAccrual: dtm.revExpAccrual,
      perRecCashAch: dtm.perRecCashAch, perRecAccrualAch: dtm.perRecAccrualAch,
      revExpCashTarget: TARGETS.revExpCash, revExpAccrualTarget: TARGETS.revExpAccrual,
    }).then(() => {
      message.success('Financial data saved successfully!');
      // saved → switch to "existing data" mode: enables Update / Clear Data (SU), locks the form for others
      setHasData(true);
      if (user?.role !== 'SU') setBlocked(true);
    })
      .catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  /* ── SU only: clear this month's submitted record so the institute can re-enter ── */
  const handleClear = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    const label = `${selection.monthName || selection.month} ${selection.year}`;
    if (!window.confirm(
      `Clear the submitted Financial data for ${selection.instName || selection.instId} — ${label}?\n\n` +
      `This deletes the month's entry. The institute will be able to fill it in again.`
    )) return;
    setClearing(true);
    api.delete('/admin/data', {
      params: { instId: selection.instId, year: selection.year, month: selection.month, section: '01' },
    }).then(() => {
      message.success('Financial data cleared — the institute can now re-enter it.');
      setDtm(INIT_DTM);
      setHasData(false);
      setBlocked(false);
    }).catch(err => message.error(err.response?.data?.message || 'Clear failed'))
      .finally(() => setClearing(false));
  };

  const instName  = selection?.instName  || '—';
  const isSU = user?.role === 'SU';

  /* ── Print: strip the app shell so only the form prints (button + Ctrl+P) ── */
  useEffect(() => {
    const on  = () => document.body.classList.add('fin-printing');
    const off = () => document.body.classList.remove('fin-printing');
    window.addEventListener('beforeprint', on);
    window.addEventListener('afterprint', off);
    return () => {
      window.removeEventListener('beforeprint', on);
      window.removeEventListener('afterprint', off);
      off();
    };
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  const status = blocked
    ? { cls: 'fin-status-locked', icon: <LockOutlined />, text: 'Submitted — locked' }
    : hasData
      ? { cls: 'fin-status-saved', icon: <CheckCircleOutlined />, text: isSU ? 'Submitted — editable (SU)' : 'Submitted' }
      : { cls: 'fin-status-new', icon: <ClockCircleOutlined />, text: 'Not yet submitted' };

  const ofTarget = (c, t) => (n(t) ? `${pct(c, t)}% of target ${n(t).toFixed(2)}` : 'no annual target set');
  const kpis = [
    { label: 'Revenue earned (cash)',     icon: <RiseOutlined />,       cls: 'fin-k-teal',  value: fmt(cashCum), sub: ofTarget(cashCum, TARGETS.cashTotal) },
    { label: 'Revenue earned (accrual)',  icon: <WalletOutlined />,     cls: 'fin-k-navy',  value: fmt(accrCum), sub: ofTarget(accrCum, TARGETS.accrualTotal) },
    { label: 'Revenue expenditure (cash)',icon: <FallOutlined />,       cls: 'fin-k-gold',  value: fmt(cum.revExpCash), sub: ofTarget(cum.revExpCash, TARGETS.revExpCash) },
    { label: 'Recovery (cash, cum.)',     icon: <PercentageOutlined />, cls: prCashCum >= 100 ? 'fin-k-green' : 'fin-k-red', value: `${prCashCum.toFixed(1)}%`,
      sub: <>surplus <b>{fmt(excCashCum)}</b> Rs. L</> },
  ];

  return (
    <div className="fin-page">
      {/* print-only header */}
      <div className="fin-print-header">
        <div className="fin-print-title">Monthly Progress Report — Section A (Financial) · All values in Rs. Lakh</div>
        <div className="fin-print-sub">
          {instName}{selection?.monthName ? ` — ${selection.monthName} ${selection.year}` : ''}
        </div>
      </div>

      {/* ── Hero ── */}
      <header className="fin-hero">
        <div className="fin-hero-main">
          <span className="fin-hero-kicker">Monthly Progress Report · Section A</span>
          <h1 className="fin-hero-title">Financial Section</h1>
          <span className="fin-hero-inst">{instName}</span>
        </div>
        <div className="fin-hero-side">
          {selection?.monthName && <span className="fin-hero-chip">{selection.monthName} {selection.year}</span>}
          <span className={`fin-status ${status.cls}`}>{status.icon}{status.text}</span>
        </div>
      </header>

      {loadErr && <Alert type="warning" showIcon message={loadErr} className="fin-alert" />}
      {blocked && (
        <Alert type="info" showIcon icon={<LockOutlined />} className="fin-alert"
          message="This month's financial data has been submitted."
          description="The form is read-only. Contact the SU (Senet Division) if a correction is needed." />
      )}

      {/* ── KPI tiles ── */}
      <div className="fin-kpis">
        {kpis.map(k => (
          <div key={k.label} className={`fin-kpi ${k.cls}`}>
            <span className="fin-kpi-icon">{k.icon}</span>
            <div>
              <div className="fin-kpi-label">{k.label}</div>
              <div className="fin-kpi-value">{k.value}</div>
              <div className="fin-kpi-sub">{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════ (1) Revenue earning ═══════════ */}
      <section className="fin-card">
        <div className="fin-card-head">
          <span className="fin-badge">1</span>
          <div>
            <h2>Revenue earning</h2>
            <p>Enter this month's earnings on both bases. Targets are the annual targets; cumulative and % are calculated. Rs. Lakh.</p>
          </div>
          <div className="fin-legend"><span className="fin-cash">Cash basis</span><span className="fin-accr">Accrual basis</span></div>
        </div>
        <div className="fin-table-wrap">
          <table className="fin-table">
            {COLS}
            <BasisHead first="Head of revenue" />
            <tbody>
              {EARN_ROWS.map(r => r.group ? (
                <tr key={r.group} className="fin-group-row"><td colSpan={9}>{r.group}</td></tr>
              ) : (
                <tr key={r.id}>
                  <td className={`fin-cell fin-label${r.indent ? ' fin-indent' : ''}`}>{r.label}</td>
                  {['cash', 'accrual'].map(b => {
                    const k = b + r.id;
                    return (
                      <React.Fragment key={b}>
                        <TgtCell value={TARGETS[k]} cls="fin-grp-start" />
                        <InCell value={dtm[k]} onChange={handleChange(k)} disabled={blocked} />
                        <CalcCell value={cum[k]} />
                        <PctCell cumVal={cum[k]} target={TARGETS[k]} />
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="fin-total-row">
                <td className="fin-cell fin-label">Total revenue earned</td>
                <TgtCell value={TARGETS.cashTotal} cls="fin-grp-start" />
                <CalcCell value={cashDtm} total />
                <CalcCell value={cashCum} total />
                <PctCell cumVal={cashCum} target={TARGETS.cashTotal} />
                <TgtCell value={TARGETS.accrualTotal} cls="fin-grp-start" />
                <CalcCell value={accrDtm} total />
                <CalcCell value={accrCum} total />
                <PctCell cumVal={accrCum} target={TARGETS.accrualTotal} />
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* ═══════════ (2)–(4) Expenditure, surplus & recovery ═══════════ */}
      <section className="fin-card">
        <div className="fin-card-head">
          <span className="fin-badge">2</span>
          <div>
            <h2>Expenditure, surplus &amp; recovery</h2>
            <p>Revenue expenditure targets can be edited here. Surplus and recovery are calculated from earnings and expenditure.</p>
          </div>
        </div>
        <div className="fin-table-wrap">
          <table className="fin-table">
            {COLS}
            <BasisHead />
            <tbody>
              <tr>
                <td className="fin-cell fin-label">(2) Revenue expenditure</td>
                <InCell value={TARGETS.revExpCash} onChange={handleTargetChange('revExpCash')} disabled={blocked} integer cls="fin-grp-start fin-in-tgt" />
                <InCell value={dtm.revExpCash} onChange={handleChange('revExpCash')} disabled={blocked} />
                <CalcCell value={cum.revExpCash} />
                <PctCell cumVal={cum.revExpCash} target={TARGETS.revExpCash} />
                <InCell value={TARGETS.revExpAccrual} onChange={handleTargetChange('revExpAccrual')} disabled={blocked} integer cls="fin-grp-start fin-in-tgt" />
                <InCell value={dtm.revExpAccrual} onChange={handleChange('revExpAccrual')} disabled={blocked} />
                <CalcCell value={cum.revExpAccrual} />
                <PctCell cumVal={cum.revExpAccrual} target={TARGETS.revExpAccrual} />
              </tr>
              <tr>
                <td className="fin-cell fin-label">(3) Excess of income over expenditure</td>
                <DashCell cls="fin-grp-start" />
                <CalcCell value={excCashDtm} />
                <CalcCell value={excCashCum} />
                <DashCell />
                <DashCell cls="fin-grp-start" />
                <CalcCell value={excAccrDtm} />
                <CalcCell value={excAccrCum} />
                <DashCell />
              </tr>
              <tr>
                <td className="fin-cell fin-label">
                  (4) %age recovery
                  <div className="fin-label-note">earning ÷ expenditure × 100 · last column: achievement (entered)</div>
                </td>
                <TgtCell value={TARGETS.perRecCash} cls="fin-grp-start" />
                <CalcCell value={prCashDtm} />
                <CalcCell value={prCashCum} />
                <InCell value={dtm.perRecCashAch} onChange={handleChange('perRecCashAch')} disabled={blocked} />
                <TgtCell value={TARGETS.perRecAccrual} cls="fin-grp-start" />
                <CalcCell value={prAccrDtm} />
                <CalcCell value={prAccrCum} />
                <InCell value={dtm.perRecAccrualAch} onChange={handleChange('perRecAccrualAch')} disabled={blocked} />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Sticky action bar ── */}
      <div className="fin-actions">
        <div className="fin-actions-hint">
          <InfoCircleOutlined />
          <span>All values in <b>Rs. Lakh</b>. Enter figures <b>for this month</b> — cumulative, totals and percentages are calculated.</span>
        </div>
        <div className="fin-actions-btns">
          <Button icon={<ReloadOutlined />} onClick={() => setDtm(INIT_DTM)} disabled={blocked}>Reset</Button>
          <Button icon={<PrinterOutlined />} onClick={() => window.print()}>Print</Button>
          {isSU && hasData && (
            <Button danger icon={<DeleteOutlined />} onClick={handleClear} loading={clearing}>Clear Data</Button>
          )}
          {hasData
            ? <Button type="primary" icon={<EditOutlined />} onClick={handleSubmit} loading={saving} disabled={blocked}>Update</Button>
            : <Button type="primary" icon={<SaveOutlined />} onClick={handleSubmit} loading={saving} disabled={blocked}>Add</Button>}
        </div>
      </div>
    </div>
  );
}
