import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import {
  DeleteOutlined, PrinterOutlined, ReloadOutlined, SaveOutlined, EditOutlined,
  WalletOutlined, FundOutlined, PieChartOutlined, BankOutlined,
  CheckCircleOutlined, LockOutlined, ClockCircleOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './BudgetPage.css';
import '../../styles/entry-compact.css';

/* ═══════════════════════════════════════════════════════
   Cell helpers — defined OUTSIDE component
   ═══════════════════════════════════════════════════════ */

function EditCell({ value, onChange, disabled, cls = '' }) {
  return (
    <td className={`bud-cell bud-in-cell${cls ? ' ' + cls : ''}`}>
      <input
        className="bud-input"
        inputMode="decimal"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="0"
      />
    </td>
  );
}

function CalcCell({ value, total = false, neg = false, decimals = 2 }) {
  const v = typeof value === 'number' ? value : (parseFloat(value) || 0);
  return (
    <td className={`bud-cell bud-calc${total ? ' bud-calc-total' : ''}${neg ? ' bud-neg' : ''}`}>
      {v.toFixed(decimals)}
    </td>
  );
}

/* Free-text section (F – I) */
function TextCard({ letter, title, value, onChange, disabled, readOnlyText, max, placeholder }) {
  const ro = readOnlyText !== undefined && readOnlyText !== null;
  const text = ro ? readOnlyText : value;
  return (
    <section className="bud-card bud-text-card">
      <div className="bud-card-head">
        <span className="bud-badge">{letter}</span>
        <h2>{title}</h2>
      </div>
      <div className="bud-text-body">
        <textarea
          className={`bud-textarea${ro ? ' bud-textarea-ro' : ''}`}
          rows={4}
          maxLength={ro ? undefined : max}
          value={text}
          onChange={onChange}
          readOnly={ro}
          disabled={!ro && disabled}
          placeholder={placeholder}
        />
        <div className="bud-char-count">
          {ro
            ? <span className="bud-ro-note"><LockOutlined /> Entered on the Significant Achievement page — edit it there.</span>
            : <span className={max - (value || '').length < 40 ? 'bud-count-low' : ''}>{max - (value || '').length} characters remaining</span>}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
const n = (v) => parseFloat(v) || 0;

/* The `significant` column is shared with the Significant Achievement page, which stores JSON.
   Returns that page's Technical & Production text (HTML stripped), or null for legacy plain text. */
function achievementText(raw) {
  if (!raw || !raw.trim().startsWith('{')) return null;
  try {
    const p = JSON.parse(raw);
    const div = document.createElement('div');
    div.innerHTML = (p.technical || '').replace(/<(br|\/p|\/div|\/li)\b[^>]*>/gi, '\n$&');
    return (div.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  } catch { return null; }
}

export default function BudgetPage() {
  const { selection, user } = useAuth();

  const [PREV_CF_CUM, setPrevCf]      = useState(0);
  const [PREV_GIA_CUM, setPrevGia]    = useState(0);
  const [PREV_MACHINE_CUM, setPrevMac]= useState(0);
  const [BE_BUDGET, setBeBudget]      = useState('0.00');
  const [loading, setLoading]         = useState(false);
  const [saving, setSaving]           = useState(false);
  const [clearing, setClearing]       = useState(false);
  const [blocked, setBlocked]         = useState(false);
  const [hasData, setHasData]         = useState(false);
  const [loadErr, setLoadErr]         = useState('');
  const [sigFromAch, setSigFromAch]   = useState(null);   // G owned by Achievement page → read-only

  const YEAR_LABEL = selection
    ? `${parseInt(selection.year) || 'YYYY'}-${(parseInt(selection.year) + 1) || 'YYYY'}`
    : 'YYYY-YYYY';

  /* ── form state ── */
  const INIT = {
    cfAmount:    '0.00',
    cfDtm:       '',
    giaAmount:   '',          // GIA Amount
    giaDtm:      '',          // GIA Utilization During Month
    // Staff Strength — Sanctioned
    ssA: '', ssB: '', ssC: '', ssD: '',
    // Staff Strength — In Position
    posA: '', posB: '', posC: '', posD: '',
    // Machine Procured
    machineDtm: '',
    // Textareas
    detailVisit: '',
    sigAchiev:   '',
    shortFalls:  '',
    promoActiv:  '',
  };

  const [form, setForm] = useState(INIT);
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  useEffect(() => {
    if (!selection?.instId || !selection?.month || !selection?.year) return;
    setLoading(true); setBlocked(false); setHasData(false); setLoadErr(''); setSigFromAch(null);
    api.get('/entry/budget/load', {
      params: { instId: selection.instId, month: selection.month, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (!data) return;
      const pc = data.prevCum || {};
      setPrevCf(parseFloat(pc.cfCum) || 0);
      setPrevGia(parseFloat(pc.giaCum) || 0);
      setPrevMac(parseFloat(pc.machineCum) || 0);
      if (data.targets?.beBudget != null)
        setBeBudget(parseFloat(data.targets.beBudget).toFixed(2));
      const achText = achievementText(data.existing?.sigAchiev);
      setSigFromAch(achText);
      if (data.hasData) {
        setHasData(true);
        const ex = data.existing || {};
        setForm(prev => ({
          ...prev,
          cfAmount: ex.cfAmount?.toString() || prev.cfAmount,
          cfDtm: ex.cfDtm?.toString() || '',
          giaAmount: ex.giaAmount?.toString() || '',
          giaDtm: ex.giaDtm?.toString() || '',
          ssA: ex.ssA?.toString() || '', ssB: ex.ssB?.toString() || '',
          ssC: ex.ssC?.toString() || '', ssD: ex.ssD?.toString() || '',
          posA: ex.posA?.toString() || '', posB: ex.posB?.toString() || '',
          posC: ex.posC?.toString() || '', posD: ex.posD?.toString() || '',
          machineDtm: ex.machineDtm?.toString() || '',
          detailVisit: ex.detailVisit || '', sigAchiev: achText === null ? (ex.sigAchiev || '') : '',
          shortFalls: ex.shortFalls || '',
          promoActiv: ex.promoActiv || '',
        }));
        if (user?.role !== 'SU') setBlocked(true);
      }
    }).catch(() => setLoadErr('Could not load form data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.month, selection?.year]);

  /* ── Print: strip the app shell so only the form prints (button + Ctrl+P) ── */
  useEffect(() => {
    const on  = () => document.body.classList.add('bud-printing');
    const off = () => document.body.classList.remove('bud-printing');
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
    api.post('/entry/budget/save', {
      instId: selection.instId, month: selection.month, year: selection.year, ...form,
      // never overwrite the Achievement page's JSON with the Budget textarea
      sigAchiev: sigFromAch === null ? form.sigAchiev : '',
    }).then(() => {
      message.success('Budget data saved successfully!');
      // saved → switch to "existing data" mode: enables Update / Clear Data (SU), locks the form for others
      setHasData(true);
      if (user?.role !== 'SU') setBlocked(true);
    })
      .catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  /* ── computed values ── */
  const cfCum    = PREV_CF_CUM      + n(form.cfDtm);
  const cfBal    = n(form.cfAmount) - cfCum;
  const giaCum   = PREV_GIA_CUM     + n(form.giaDtm);
  const giaBal   = n(form.giaAmount) - giaCum;

  const totalAmt = n(form.cfAmount) + n(form.giaAmount);
  const totalDtm = n(form.cfDtm)    + n(form.giaDtm);
  const totalCum = cfCum  + giaCum;
  const totalBal = cfBal  + giaBal;

  const machineCum = PREV_MACHINE_CUM + n(form.machineDtm);

  const handleReset = () => setForm(INIT);

  /* ── SU only: clear this month's submitted Budget figures so the institute can re-enter.
        The month's Significant Achievement (shared row) is left untouched. ── */
  const handleClear = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    const when = `${selection.monthName || selection.month} ${selection.year}`;
    if (!window.confirm(
      `Clear the submitted Budget Section data for ${selection.instName || selection.instId} — ${when}?\n\n` +
      `This deletes the month's budget entry (the Significant Achievement for the month is kept). ` +
      `The institute will be able to fill it in again.`
    )) return;
    setClearing(true);
    api.delete('/admin/data', {
      params: { instId: selection.instId, year: selection.year, month: selection.month, section: '02' },
    }).then(() => {
      message.success('Budget Section data cleared — the institute can now re-enter it.');
      setForm(INIT);
      setHasData(false);
      setBlocked(false);
    }).catch(err => message.error(err.response?.data?.message || 'Clear failed'))
      .finally(() => setClearing(false));
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  /* ── remaining char counts ── */
  const MAX_CHARS = 400;
  const isSU = user?.role === 'SU';

  const status = blocked
    ? { cls: 'bud-status-locked', icon: <LockOutlined />, text: 'Submitted — locked' }
    : hasData
      ? { cls: 'bud-status-saved', icon: <CheckCircleOutlined />, text: isSU ? 'Submitted — editable (SU)' : 'Submitted' }
      : { cls: 'bud-status-new', icon: <ClockCircleOutlined />, text: 'Not yet submitted' };

  const kpis = [
    { label: 'Budget B.E.',               icon: <BankOutlined />,     cls: 'bud-k-gold',  value: BE_BUDGET,            sub: `Year ${YEAR_LABEL}` },
    { label: 'Total funds (CF + GIA)',    icon: <WalletOutlined />,   cls: 'bud-k-navy',  value: totalAmt.toFixed(2),  sub: 'Rs. Lakh' },
    { label: 'Utilization',               icon: <PieChartOutlined />, cls: 'bud-k-teal',  value: totalCum.toFixed(2),  sub: <>cumulative · <b>{totalDtm.toFixed(2)}</b> this month</> },
    { label: 'Unspent balance',           icon: <FundOutlined />,     cls: totalBal < 0 ? 'bud-k-red' : 'bud-k-green', value: totalBal.toFixed(2), sub: totalBal < 0 ? 'Over-utilized!' : 'Rs. Lakh' },
  ];

  return (
    <div className="bud-page">
      {/* print-only header (app shell + hero are hidden when printing) */}
      <div className="bud-print-header">
        <div className="bud-print-title">Monthly Progress Report — Sections C to I (Budget)</div>
        <div className="bud-print-sub">
          {selection?.instName || ''}
          {selection?.monthName ? ` — ${selection.monthName} ${selection.year}` : ''}
          {' · '}Budget B.E. (Rs. Lakh): {BE_BUDGET}
        </div>
      </div>

      {/* ── Hero ── */}
      <header className="bud-hero">
        <div className="bud-hero-main">
          <span className="bud-hero-kicker">Monthly Progress Report · Sections C – I</span>
          <h1 className="bud-hero-title">Budget Section</h1>
          <span className="bud-hero-inst">{selection?.instName || '—'}</span>
        </div>
        <div className="bud-hero-side">
          {selection?.monthName && <span className="bud-hero-chip">{selection.monthName} {selection.year}</span>}
          <span className={`bud-status ${status.cls}`}>{status.icon}{status.text}</span>
        </div>
      </header>

      {loadErr && <Alert type="warning" showIcon message={loadErr} className="bud-alert" />}
      {blocked && (
        <Alert type="info" showIcon icon={<LockOutlined />} className="bud-alert"
          message="This month's budget data has been submitted."
          description="The form is read-only. Contact the SU (Senet Division) if a correction is needed." />
      )}

      {/* ── KPI tiles ── */}
      <div className="bud-kpis">
        {kpis.map(k => (
          <div key={k.label} className={`bud-kpi ${k.cls}`}>
            <span className="bud-kpi-icon">{k.icon}</span>
            <div>
              <div className="bud-kpi-label">{k.label}</div>
              <div className="bud-kpi-value">₹ {k.value} <small>L</small></div>
              <div className="bud-kpi-sub">{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════ C. Budget ═══════════ */}
      <section className="bud-card">
        <div className="bud-card-head">
          <span className="bud-badge">C</span>
          <div>
            <h2>Budget</h2>
            <p>Enter the amounts and this month's utilization — cumulative and balance are calculated. All values in Rs. Lakh.</p>
          </div>
          <span className="bud-be-pill">B.E. {BE_BUDGET} · {YEAR_LABEL}</span>
        </div>
        <div className="bud-table-wrap">
          <table className="bud-table">
            <colgroup>
              <col />
              <col style={{ width: 150 }} /><col style={{ width: 150 }} />
              <col style={{ width: 150 }} /><col style={{ width: 150 }} />
            </colgroup>
            <thead>
              <tr>
                <th className="bud-th bud-th-left">Particulars</th>
                <th className="bud-th">Amount</th>
                <th className="bud-th">Utilization<span>during the month</span></th>
                <th className="bud-th">Utilization<span>cumulative</span></th>
                <th className="bud-th">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bud-cell bud-label"><span className="bud-rowno">(a)</span>Carry forward from previous year</td>
                <EditCell value={form.cfAmount} onChange={set('cfAmount')} disabled={blocked} />
                <EditCell value={form.cfDtm}    onChange={set('cfDtm')}    disabled={blocked} />
                <CalcCell value={cfCum} />
                <CalcCell value={cfBal} neg={cfBal < 0} />
              </tr>
              <tr>
                <td className="bud-cell bud-label"><span className="bud-rowno">(b)</span>GIA released during the year (till date)</td>
                <EditCell value={form.giaAmount} onChange={set('giaAmount')} disabled={blocked} />
                <EditCell value={form.giaDtm}    onChange={set('giaDtm')}    disabled={blocked} />
                <CalcCell value={giaCum} />
                <CalcCell value={giaBal} neg={giaBal < 0} />
              </tr>
            </tbody>
            <tfoot>
              <tr className="bud-total-row">
                <td className="bud-cell bud-total-label">Total</td>
                <CalcCell value={totalAmt} total />
                <CalcCell value={totalDtm} total />
                <CalcCell value={totalCum} total />
                <CalcCell value={totalBal} total neg={totalBal < 0} />
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* ═══════════ D. Staff strength  +  E. Machine procured ═══════════ */}
      <div className="bud-pair">
        <section className="bud-card">
          <div className="bud-card-head">
            <span className="bud-badge">D</span>
            <div><h2>Staff strength</h2><p>Sanctioned posts and staff in position, by group.</p></div>
          </div>
          <div className="bud-table-wrap">
            <table className="bud-table bud-table-staff">
              <thead>
                <tr>
                  <th className="bud-th bud-th-left"></th>
                  <th className="bud-th">Group A</th><th className="bud-th">Group B</th>
                  <th className="bud-th">Group C</th><th className="bud-th">Group D</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bud-cell bud-label">Sanctioned</td>
                  {['ssA', 'ssB', 'ssC', 'ssD'].map(k => <EditCell key={k} value={form[k]} onChange={set(k)} disabled={blocked} />)}
                </tr>
                <tr>
                  <td className="bud-cell bud-label">In position</td>
                  {['posA', 'posB', 'posC', 'posD'].map(k => <EditCell key={k} value={form[k]} onChange={set(k)} disabled={blocked} />)}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bud-card">
          <div className="bud-card-head">
            <span className="bud-badge">E</span>
            <div><h2>Machine procured</h2><p>Value in Rs. Lakh.</p></div>
          </div>
          <div className="bud-table-wrap">
            <table className="bud-table">
              <thead>
                <tr>
                  <th className="bud-th">During the month</th>
                  <th className="bud-th">Cumulative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <EditCell value={form.machineDtm} onChange={set('machineDtm')} disabled={blocked} />
                  <CalcCell value={machineCum} />
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ═══════════ F – I. Narrative sections ═══════════ */}
      <div className="bud-text-grid">
        <TextCard letter="F" title="Details of visits of MSME / Industrial / Assco / Institutions"
          value={form.detailVisit} onChange={set('detailVisit')} disabled={blocked} max={MAX_CHARS}
          placeholder="Enter details of visits…" />
        <TextCard letter="G" title="Significant achievements, including new initiatives like NMCP"
          value={form.sigAchiev} onChange={set('sigAchiev')} disabled={blocked} max={MAX_CHARS}
          readOnlyText={sigFromAch} placeholder="Enter significant achievements…" />
        <TextCard letter="H" title="Short falls, if any (with reasons)"
          value={form.shortFalls} onChange={set('shortFalls')} disabled={blocked} max={MAX_CHARS}
          placeholder="Enter short falls with reasons…" />
        <TextCard letter="I" title="Promotional activities"
          value={form.promoActiv} onChange={set('promoActiv')} disabled={blocked} max={MAX_CHARS}
          placeholder="Enter promotional activities…" />
      </div>

      {/* ── Sticky action bar ── */}
      <div className="bud-actions">
        <div className="bud-actions-hint">
          <InfoCircleOutlined />
          <span>All monetary values are in <b>Rs. Lakh</b>. Cumulative utilization and balances are calculated automatically.</span>
        </div>
        <div className="bud-actions-btns">
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
