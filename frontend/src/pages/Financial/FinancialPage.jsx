import React, { useState, useCallback, useEffect } from 'react';
import { Button, message, Spin, Alert } from 'antd';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './FinancialPage.css';

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

/* ─── row background constants ─── */
const R1 = '#F2F2F2';
const R2 = '#FBF8EF';

/* ═══════════════════════════════════════
   Cell Components  (defined outside to
   avoid remount on parent re-render)
   ═══════════════════════════════════════ */

function TargetCell({ value = 0, bg = '#fff' }) {
  return (
    <td className="fin-cell" style={{ background: bg }}>
      <input className="fin-input fin-ro" type="text" value={value} readOnly />
    </td>
  );
}

function CalcCell({ value, bg = '#fff', total = false }) {
  return (
    <td className="fin-cell" style={{ background: bg }}>
      <input
        className={`fin-input fin-ro${total ? ' fin-total-input' : ''}`}
        type="text"
        value={fmt(value)}
        readOnly
      />
    </td>
  );
}

function PctCell({ cumVal, target, bg = '#fff' }) {
  return (
    <td className="fin-cell" style={{ background: bg }}>
      <input className="fin-input fin-ro" type="text" value={pct(cumVal, target)} readOnly />
    </td>
  );
}

function DashCell({ bg = '#fff' }) {
  return (
    <td className="fin-cell" style={{ background: bg }}>
      <input className="fin-input fin-ro" type="text" value="—" readOnly
        style={{ textAlign: 'center', color: '#999' }} />
    </td>
  );
}

function UserCell({ value, onChange, bg = '#fff' }) {
  return (
    <td className="fin-cell" style={{ background: bg }}>
      <input
        className="fin-input fin-editable"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="0"
      />
    </td>
  );
}

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
    }).then(() => message.success('Financial data saved successfully!'))
      .catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  const instName  = selection?.instName  || '—';
  const monthYear = selection ? `${selection.monthName} ${selection.year}` : '';

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  return (
    <div className="fin-page">

      {loadErr && <Alert type="warning" message={loadErr} style={{ margin: '8px 0' }} />}
      {blocked && <Alert type="error" message="Data already submitted for this month. Contact SU to modify." style={{ margin: '8px 0' }} />}

      {/* ── Title bar ── */}
      <div className="fin-titlebar">
        <div className="fin-titlebar-left">
          <span className="fin-page-label">Financial Section</span>
          <span className="fin-institute">{instName}</span>
        </div>
        <div className="fin-titlebar-right">
          {monthYear && <span className="fin-meta-chip">📅 {monthYear}</span>}
          <span className="fin-note">All Values in Rs. Lakhs</span>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="fin-card">
        <div className="fin-table-wrap">
          <table className="fin-table">
            <colgroup>
              <col style={{ width: '2%'  }} />
              <col style={{ width: '11%' }} />
              <col style={{ width: '9%'  }} />
              <col style={{ width: '17%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '16%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '13%' }} />
            </colgroup>

            {/* ══ HEADER ══ */}
            <thead>
              <tr>
                <th className="fin-th" colSpan={4} rowSpan={2}>
                  Financial Cash basis / Accrual basis
                </th>
                <th className="fin-th" rowSpan={2}>Target</th>
                <th className="fin-th" colSpan={3}>Achievement</th>
              </tr>
              <tr>
                <th className="fin-th">During the month</th>
                <th className="fin-th">Cum. upto month</th>
                <th className="fin-th">%age w.r.t. Target</th>
              </tr>
            </thead>

            {/* ══ BODY ══ */}
            <tbody>

              {/* ── FINANCIAL section header ── */}
              <tr>
                <td className="fin-cell fin-letter" rowSpan={23} valign="top">A</td>
                <td className="fin-cell fin-section-hdr" colSpan={7}>FINANCIAL</td>
              </tr>

              {/* ════════════════════════════
                  Revenue Earning — Cash basis
                  ════════════════════════════ */}

              {/* Training */}
              <tr>
                <td className="fin-cell fin-slabel" rowSpan={16}>Revenue<br />earning</td>
                <td className="fin-cell" rowSpan={8} style={{ background: R1, fontWeight: 500 }}>
                  Cash basis
                </td>
                <td className="fin-cell" style={{ background: R1 }}>Training</td>
                <TargetCell value={TARGETS.cashTraining} bg={R1} />
                <UserCell   value={dtm.cashTraining}     onChange={handleChange('cashTraining')} bg={R1} />
                <CalcCell   value={cum.cashTraining}     bg={R1} />
                <PctCell    cumVal={cum.cashTraining}    target={TARGETS.cashTraining} bg={R1} />
              </tr>

              {/* Production sub-header */}
              <tr>
                <td className="fin-cell fin-sub-hdr" colSpan={5}>Production</td>
              </tr>

              {/* (a) Tooling */}
              <tr>
                <td className="fin-cell" style={{ background: R2 }}>
                  <b>(a)</b>&nbsp;Tooling
                </td>
                <TargetCell value={TARGETS.cashTooling} bg={R2} />
                <UserCell   value={dtm.cashTooling}     onChange={handleChange('cashTooling')} bg={R2} />
                <CalcCell   value={cum.cashTooling}     bg={R2} />
                <PctCell    cumVal={cum.cashTooling}    target={TARGETS.cashTooling} bg={R2} />
              </tr>

              {/* (b) Other Job Work */}
              <tr>
                <td className="fin-cell" style={{ background: R2 }}>
                  <b>(b)</b>&nbsp;Other Job Work
                </td>
                <TargetCell value={TARGETS.cashOtherJob} bg={R2} />
                <UserCell   value={dtm.cashOtherJob}     onChange={handleChange('cashOtherJob')} bg={R2} />
                <CalcCell   value={cum.cashOtherJob}     bg={R2} />
                <PctCell    cumVal={cum.cashOtherJob}    target={TARGETS.cashOtherJob} bg={R2} />
              </tr>

              {/* Consultancy */}
              <tr>
                <td className="fin-cell" style={{ background: R1 }}>Consultancy</td>
                <TargetCell value={TARGETS.cashConsult} bg={R1} />
                <UserCell   value={dtm.cashConsult}     onChange={handleChange('cashConsult')} bg={R1} />
                <CalcCell   value={cum.cashConsult}     bg={R1} />
                <PctCell    cumVal={cum.cashConsult}    target={TARGETS.cashConsult} bg={R1} />
              </tr>

              {/* Misc. */}
              <tr>
                <td className="fin-cell" style={{ background: R1 }}>Misc.</td>
                <TargetCell value={TARGETS.cashMisc} bg={R1} />
                <UserCell   value={dtm.cashMisc}     onChange={handleChange('cashMisc')} bg={R1} />
                <CalcCell   value={cum.cashMisc}     bg={R1} />
                <PctCell    cumVal={cum.cashMisc}    target={TARGETS.cashMisc} bg={R1} />
              </tr>

              {/* Testing/calibration/services */}
              <tr>
                <td className="fin-cell" style={{ background: R1 }}>Testing / calibration / services</td>
                <TargetCell value={0} bg={R1} />
                <UserCell   value={dtm.cashTesting}  onChange={handleChange('cashTesting')} bg={R1} />
                <CalcCell   value={cum.cashTesting}  bg={R1} />
                <PctCell    cumVal={cum.cashTesting} target={0} bg={R1} />
              </tr>

              {/* Cash Total */}
              <tr>
                <td className="fin-cell" style={{ fontWeight: 'bold' }}>Total</td>
                <td className="fin-cell">
                  <input className="fin-input fin-ro fin-total-input" type="text"
                    value={TARGETS.cashTotal} readOnly />
                </td>
                <td className="fin-cell">
                  <input className="fin-input fin-ro fin-total-input" type="text"
                    value={fmt(cashDtm)} readOnly />
                </td>
                <td className="fin-cell">
                  <input className="fin-input fin-ro fin-total-input" type="text"
                    value={fmt(cashCum)} readOnly />
                </td>
                <td className="fin-cell">
                  <input className="fin-input fin-ro fin-total-input" type="text"
                    value={pct(cashCum, TARGETS.cashTotal)} readOnly />
                </td>
              </tr>

              {/* ══════════════════════════════
                  Revenue Earning — Accrual basis
                  ══════════════════════════════ */}

              {/* Training */}
              <tr>
                <td className="fin-cell" rowSpan={8} style={{ background: R2, fontWeight: 500 }}>
                  Accrual basis
                </td>
                <td className="fin-cell" style={{ background: R1 }}>Training</td>
                <TargetCell value={TARGETS.accrualTraining} bg={R1} />
                <UserCell   value={dtm.accrualTraining}     onChange={handleChange('accrualTraining')} bg={R1} />
                <CalcCell   value={cum.accrualTraining}     bg={R1} />
                <PctCell    cumVal={cum.accrualTraining}    target={TARGETS.accrualTraining} bg={R1} />
              </tr>

              {/* Production sub-header */}
              <tr>
                <td className="fin-cell fin-sub-hdr" colSpan={5}>Production</td>
              </tr>

              {/* (a) Tooling */}
              <tr>
                <td className="fin-cell" style={{ background: R2 }}>
                  <b>(a)</b>&nbsp;Tooling
                </td>
                <TargetCell value={TARGETS.accrualTooling} bg={R2} />
                <UserCell   value={dtm.accrualTooling}     onChange={handleChange('accrualTooling')} bg={R2} />
                <CalcCell   value={cum.accrualTooling}     bg={R2} />
                <PctCell    cumVal={cum.accrualTooling}    target={TARGETS.accrualTooling} bg={R2} />
              </tr>

              {/* (b) Other Job Work */}
              <tr>
                <td className="fin-cell" style={{ background: R2 }}>
                  <b>(b)</b>&nbsp;Other Job Work
                </td>
                <TargetCell value={TARGETS.accrualOtherJob} bg={R2} />
                <UserCell   value={dtm.accrualOtherJob}     onChange={handleChange('accrualOtherJob')} bg={R2} />
                <CalcCell   value={cum.accrualOtherJob}     bg={R2} />
                <PctCell    cumVal={cum.accrualOtherJob}    target={TARGETS.accrualOtherJob} bg={R2} />
              </tr>

              {/* Consultancy */}
              <tr>
                <td className="fin-cell" style={{ background: R1 }}>Consultancy</td>
                <TargetCell value={TARGETS.accrualConsult} bg={R1} />
                <UserCell   value={dtm.accrualConsult}     onChange={handleChange('accrualConsult')} bg={R1} />
                <CalcCell   value={cum.accrualConsult}     bg={R1} />
                <PctCell    cumVal={cum.accrualConsult}    target={TARGETS.accrualConsult} bg={R1} />
              </tr>

              {/* Misc. */}
              <tr>
                <td className="fin-cell" style={{ background: R2 }}>Misc.</td>
                <TargetCell value={TARGETS.accrualMisc} bg={R2} />
                <UserCell   value={dtm.accrualMisc}     onChange={handleChange('accrualMisc')} bg={R2} />
                <CalcCell   value={cum.accrualMisc}     bg={R2} />
                <PctCell    cumVal={cum.accrualMisc}    target={TARGETS.accrualMisc} bg={R2} />
              </tr>

              {/* Testing/calibration/services */}
              <tr>
                <td className="fin-cell" style={{ background: R1 }}>Testing / calibration / services</td>
                <TargetCell value={0} bg={R1} />
                <UserCell   value={dtm.accrualTesting}  onChange={handleChange('accrualTesting')} bg={R1} />
                <CalcCell   value={cum.accrualTesting}  bg={R1} />
                <PctCell    cumVal={cum.accrualTesting} target={0} bg={R1} />
              </tr>

              {/* Accrual Total */}
              <tr>
                <td className="fin-cell" style={{ fontWeight: 'bold' }}>Total</td>
                <td className="fin-cell">
                  <input className="fin-input fin-ro fin-total-input" type="text"
                    value={TARGETS.accrualTotal} readOnly />
                </td>
                <td className="fin-cell">
                  <input className="fin-input fin-ro fin-total-input" type="text"
                    value={fmt(accrDtm)} readOnly />
                </td>
                <td className="fin-cell">
                  <input className="fin-input fin-ro fin-total-input" type="text"
                    value={fmt(accrCum)} readOnly />
                </td>
                <td className="fin-cell">
                  <input className="fin-input fin-ro fin-total-input" type="text"
                    value={pct(accrCum, TARGETS.accrualTotal)} readOnly />
                </td>
              </tr>

              {/* ══════════════════════════
                  Revenue Expenditure
                  ══════════════════════════ */}
              <tr>
                <td className="fin-cell fin-slabel" rowSpan={2}>Revenue<br />Expenditure</td>
                <td className="fin-cell" colSpan={2} style={{ background: R1 }}>Cash basis</td>
                <TargetCell value={TARGETS.revExpCash} bg={R1} />
                <UserCell   value={dtm.revExpCash}     onChange={handleChange('revExpCash')} bg={R1} />
                <CalcCell   value={cum.revExpCash}     bg={R1} />
                <PctCell    cumVal={cum.revExpCash}    target={TARGETS.revExpCash} bg={R1} />
              </tr>
              <tr>
                <td className="fin-cell" colSpan={2} style={{ background: R2 }}>Accrual basis</td>
                <TargetCell value={TARGETS.revExpAccrual} bg={R2} />
                <UserCell   value={dtm.revExpAccrual}     onChange={handleChange('revExpAccrual')} bg={R2} />
                <CalcCell   value={cum.revExpAccrual}     bg={R2} />
                <PctCell    cumVal={cum.revExpAccrual}    target={TARGETS.revExpAccrual} bg={R2} />
              </tr>

              {/* ═══════════════════════════════════
                  Excess of Income over Expenditure
                  ═══════════════════════════════════ */}
              <tr>
                <td className="fin-cell fin-slabel" rowSpan={2}>
                  Excess of Income<br />over Expenditure
                </td>
                <td className="fin-cell" colSpan={2} style={{ background: R1 }}>Cash basis</td>
                <DashCell bg={R1} />
                <CalcCell value={excCashDtm} bg={R1} />
                <CalcCell value={excCashCum} bg={R1} />
                <DashCell bg={R1} />
              </tr>
              <tr>
                <td className="fin-cell" colSpan={2} style={{ background: R2 }}>Accrual basis</td>
                <DashCell bg={R2} />
                <CalcCell value={excAccrDtm} bg={R2} />
                <CalcCell value={excAccrCum} bg={R2} />
                <DashCell bg={R2} />
              </tr>

              {/* ══════════════════
                  %age Recovery
                  ══════════════════ */}
              <tr>
                <td className="fin-cell fin-slabel" rowSpan={2}>%age Recovery</td>
                <td className="fin-cell" colSpan={2} style={{ background: R1 }}>Cash Basis</td>
                <TargetCell value={TARGETS.perRecCash} bg={R1} />
                <CalcCell   value={prCashDtm} bg={R1} />
                <CalcCell   value={prCashCum} bg={R1} />
                <UserCell   value={dtm.perRecCashAch} onChange={handleChange('perRecCashAch')} bg={R1} />
              </tr>
              <tr>
                <td className="fin-cell" colSpan={2} style={{ background: R2 }}>Accrual Basis</td>
                <TargetCell value={TARGETS.perRecAccrual} bg={R2} />
                <CalcCell   value={prAccrDtm} bg={R2} />
                <CalcCell   value={prAccrCum} bg={R2} />
                <UserCell   value={dtm.perRecAccrualAch} onChange={handleChange('perRecAccrualAch')} bg={R2} />
              </tr>

            </tbody>
          </table>
        </div>

        {/* ── Action bar ── */}
        <div className="fin-actions">
          <Button icon={<ReloadOutlined />} onClick={() => setDtm(INIT_DTM)}>Reset</Button>
          <Button
            type="primary" icon={<SaveOutlined />}
            onClick={handleSubmit} loading={saving} disabled={blocked || hasData}
            style={{ backgroundColor: '#073354', borderColor: '#073354' }}
          >Add</Button>
          <Button icon={<SaveOutlined />} onClick={handleSubmit} loading={saving} disabled={blocked || !hasData}>Update</Button>
          <Button onClick={() => window.print()}>Print</Button>
        </div>
      </div>
    </div>
  );
}
