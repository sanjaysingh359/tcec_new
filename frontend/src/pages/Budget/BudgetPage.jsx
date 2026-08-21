import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './BudgetPage.css';

/* ═══════════════════════════════════════════════════════
   Cell helpers — defined OUTSIDE component
   ═══════════════════════════════════════════════════════ */

function EditCell({ value, onChange, bg = '#fffef0', width = 100 }) {
  return (
    <td className="bud-cell bud-center">
      <input
        className="bud-input bud-editable"
        style={{ background: bg, width }}
        value={value}
        onChange={onChange}
      />
    </td>
  );
}

function CalcCell({ value, bg = '#f1f4f8', width = 100, total = false }) {
  const display =
    typeof value === 'number' ? value.toFixed(2) : (parseFloat(value) || 0).toFixed(2);
  return (
    <td className="bud-cell bud-center">
      <input
        className={`bud-input bud-ro${total ? ' bud-total-input' : ''}`}
        style={{ background: bg, width }}
        value={display}
        readOnly
      />
    </td>
  );
}

function LabelCell({ children, colSpan = 1, rowSpan = 1, align = 'left', bg }) {
  return (
    <td
      className="bud-cell bud-label"
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{ textAlign: align, background: bg }}
    >
      {children}
    </td>
  );
}

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
const n = (v) => parseFloat(v) || 0;

export default function BudgetPage() {
  const { selection, user } = useAuth();

  const [PREV_CF_CUM, setPrevCf]      = useState(0);
  const [PREV_GIA_CUM, setPrevGia]    = useState(0);
  const [PREV_MACHINE_CUM, setPrevMac]= useState(0);
  const [BE_BUDGET, setBeBudget]      = useState('0.00');
  const [loading, setLoading]         = useState(false);
  const [saving, setSaving]           = useState(false);
  const [blocked, setBlocked]         = useState(false);
  const [hasData, setHasData]         = useState(false);
  const [loadErr, setLoadErr]         = useState('');

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
  };

  const [form, setForm] = useState(INIT);
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  useEffect(() => {
    if (!selection?.instId || !selection?.month || !selection?.year) return;
    setLoading(true); setBlocked(false); setHasData(false); setLoadErr('');
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
          detailVisit: ex.detailVisit || '', sigAchiev: ex.sigAchiev || '',
          shortFalls: ex.shortFalls || '',
        }));
        if (user?.role !== 'SU') setBlocked(true);
      }
    }).catch(() => setLoadErr('Could not load form data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.month, selection?.year]);

  const handleSave = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    setSaving(true);
    api.post('/entry/budget/save', {
      instId: selection.instId, month: selection.month, year: selection.year, ...form,
    }).then(() => message.success('Budget data saved successfully!'))
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

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  /* ── remaining char counts ── */
  const MAX_CHARS = 400;

  return (
    <div className="bud-page">

      {loadErr && <Alert type="warning" message={loadErr} style={{ margin: '8px 0' }} />}
      {blocked && <Alert type="error" message="Data already submitted for this month. Contact SU to modify." style={{ margin: '8px 0' }} />}

      {/* ── Title Bar ── */}
      <div className="bud-titlebar">
        <div className="bud-titlebar-left">
          <span className="bud-page-label">Monthly Progress Report — Sections C–H</span>
          <span className="bud-institute">{selection?.instName || 'Budget Section'}</span>
        </div>
        <div className="bud-titlebar-right">
          {selection?.monthName && (
            <span className="bud-meta-chip">{selection.monthName} {selection.year}</span>
          )}
          <span className="bud-note">* All monetary values in Rs. Lakh</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          CARD — Sections C through H
          ═══════════════════════════════════════════════════ */}
      <div className="bud-card">
        <div className="bud-table-wrap">
          <table className="bud-table">
            <colgroup>
              <col style={{ width: 36 }} />
              <col style={{ width: 240 }} />
              <col style={{ width: 120 }} />
              <col style={{ width: 120 }} />
              <col style={{ width: 120 }} />
              <col style={{ width: 120 }} />
              <col style={{ width: 120 }} />
            </colgroup>

            <tbody>

              {/* ─── C. BUDGET ─────────────────────────────── */}
              <tr>
                <td className="bud-cell bud-letter" rowSpan={5}><b>C.</b></td>
                <td className="bud-cell bud-section-hdr" colSpan={6}>
                  <b>Budget B.E. (Rs. Lakh):</b>{' '}
                  <span className="bud-be-val">{BE_BUDGET}</span>
                  &nbsp;&nbsp;&nbsp;
                  <b>Year:</b> {YEAR_LABEL}
                </td>
              </tr>

              {/* Column headers */}
              <tr className="bud-col-hdr-row">
                <td className="bud-cell" colSpan={2}></td>
                <th className="bud-th">Amount<br />(Rs. Lakh.)</th>
                <th className="bud-th">Utilization<br />(During month)</th>
                <th className="bud-th">Utilization<br />(Cumulative)</th>
                <th className="bud-th">Balance<br />(Rs. Lakh.)</th>
              </tr>

              {/* (a) Carry Forward */}
              <tr>
                <LabelCell colSpan={2} bg="#FBF8EF">
                  (a) Carry Forward From Previous Year
                </LabelCell>
                <EditCell value={form.cfAmount}  onChange={set('cfAmount')} />
                <EditCell value={form.cfDtm}     onChange={set('cfDtm')} />
                <CalcCell value={cfCum} />
                <CalcCell value={cfBal} bg={cfBal < 0 ? '#ffe8e8' : '#f1f4f8'} />
              </tr>

              {/* (b) GIA */}
              <tr>
                <LabelCell colSpan={2} bg="#F2F2F2">
                  (b) GIA Released During the Year (Till Date)
                </LabelCell>
                <EditCell value={form.giaAmount} onChange={set('giaAmount')} bg="#F2F2F2" />
                <EditCell value={form.giaDtm}    onChange={set('giaDtm')}    bg="#F2F2F2" />
                <CalcCell value={giaCum} />
                <CalcCell value={giaBal} bg={giaBal < 0 ? '#ffe8e8' : '#f1f4f8'} />
              </tr>

              {/* Total */}
              <tr className="bud-total-row">
                <td className="bud-cell bud-total-label" colSpan={2}><b>Total</b></td>
                <CalcCell value={totalAmt} total bg="#e8f0fa" />
                <CalcCell value={totalDtm} total bg="#e8f0fa" />
                <CalcCell value={totalCum} total bg="#e8f0fa" />
                <CalcCell value={totalBal} total bg={totalBal < 0 ? '#ffd6d6' : '#e8f0fa'} />
              </tr>

              {/* ─── A/B/C/D column header divider ──────────── */}
              <tr className="bud-abcd-row">
                <td className="bud-cell" colSpan={3}></td>
                <th className="bud-th bud-abcd">A</th>
                <th className="bud-th bud-abcd">B</th>
                <th className="bud-th bud-abcd">C</th>
                <th className="bud-th bud-abcd">D</th>
              </tr>

              {/* ─── D. STAFF STRENGTH ───────────────────────── */}
              <tr>
                <td className="bud-cell bud-letter" rowSpan={2}><b>D.</b></td>
                <td className="bud-cell bud-label bud-center" rowSpan={2} style={{ background: '#eef3f8' }}>
                  Staff Strength
                </td>
                <LabelCell align="center" bg="#FBF8EF">Sanctioned</LabelCell>
                <EditCell value={form.ssA} onChange={set('ssA')} />
                <EditCell value={form.ssB} onChange={set('ssB')} />
                <EditCell value={form.ssC} onChange={set('ssC')} />
                <EditCell value={form.ssD} onChange={set('ssD')} />
              </tr>
              <tr>
                <LabelCell align="center" bg="#F2F2F2">In Position</LabelCell>
                <EditCell value={form.posA} onChange={set('posA')} bg="#F2F2F2" />
                <EditCell value={form.posB} onChange={set('posB')} bg="#F2F2F2" />
                <EditCell value={form.posC} onChange={set('posC')} bg="#F2F2F2" />
                <EditCell value={form.posD} onChange={set('posD')} bg="#F2F2F2" />
              </tr>

              {/* ─── E. MACHINE PROCURED ─────────────────────── */}
              <tr>
                <td className="bud-cell bud-letter"><b>E.</b></td>
                <LabelCell colSpan={2}>Machine Procured</LabelCell>
                <LabelCell align="center" bg="#FBF8EF">During the month</LabelCell>
                <EditCell value={form.machineDtm} onChange={set('machineDtm')} />
                <LabelCell align="center" bg="#FBF8EF">Cumulative</LabelCell>
                <CalcCell value={machineCum} />
              </tr>

              {/* ─── F. DETAILS OF VISITS ────────────────────── */}
              <tr>
                <td className="bud-cell bud-letter"><b>F.</b></td>
                <LabelCell bg="#eef3f8">
                  Details of Visits of MSME / Industrial / Assco / Institutions
                </LabelCell>
                <td className="bud-cell" colSpan={5} style={{ padding: 8 }}>
                  <textarea
                    className="bud-textarea"
                    rows={4}
                    maxLength={MAX_CHARS}
                    value={form.detailVisit}
                    onChange={set('detailVisit')}
                    placeholder="Enter details of visits… (max 400 characters)"
                  />
                  <div className="bud-char-count">
                    {MAX_CHARS - form.detailVisit.length} characters remaining
                  </div>
                </td>
              </tr>

              {/* ─── G. SIGNIFICANT ACHIEVEMENTS ─────────────── */}
              <tr>
                <td className="bud-cell bud-letter"><b>G.</b></td>
                <LabelCell bg="#eef3f8">
                  Significant Achievements, if any, including new initiatives taken like NMCP etc.
                </LabelCell>
                <td className="bud-cell" colSpan={5} style={{ padding: 8 }}>
                  <textarea
                    className="bud-textarea"
                    rows={4}
                    maxLength={MAX_CHARS}
                    value={form.sigAchiev}
                    onChange={set('sigAchiev')}
                    placeholder="Enter significant achievements… (max 400 characters)"
                  />
                  <div className="bud-char-count">
                    {MAX_CHARS - form.sigAchiev.length} characters remaining
                  </div>
                </td>
              </tr>

              {/* ─── H. SHORT FALLS ──────────────────────────── */}
              <tr>
                <td className="bud-cell bud-letter"><b>H.</b></td>
                <LabelCell bg="#eef3f8">
                  Short falls, if any (with reasons)
                </LabelCell>
                <td className="bud-cell" colSpan={5} style={{ padding: 8 }}>
                  <textarea
                    className="bud-textarea"
                    rows={4}
                    maxLength={MAX_CHARS}
                    value={form.shortFalls}
                    onChange={set('shortFalls')}
                    placeholder="Enter short falls with reasons… (max 400 characters)"
                  />
                  <div className="bud-char-count">
                    {MAX_CHARS - form.shortFalls.length} characters remaining
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* ── Summary strip ── */}
        <div className="bud-summary-strip">
          <div className="bud-summary-item">
            <span className="bud-summary-label">Total Amount</span>
            <span className="bud-summary-val">₹ {totalAmt.toFixed(2)} L</span>
          </div>
          <div className="bud-summary-item">
            <span className="bud-summary-label">Total Utilization (Month)</span>
            <span className="bud-summary-val">₹ {totalDtm.toFixed(2)} L</span>
          </div>
          <div className="bud-summary-item">
            <span className="bud-summary-label">Total Utilization (Cum.)</span>
            <span className="bud-summary-val">₹ {totalCum.toFixed(2)} L</span>
          </div>
          <div className="bud-summary-item">
            <span className="bud-summary-label">Total Unspent Balance</span>
            <span className={`bud-summary-val${totalBal < 0 ? ' bud-neg' : ''}`}>
              ₹ {totalBal.toFixed(2)} L
            </span>
          </div>
        </div>
      </div>

      {/* ── Action bar ── */}
      <div className="bud-actions">
        <Button onClick={handleReset}>Reset</Button>
        <Button type="primary" onClick={handleSave} loading={saving} disabled={blocked || hasData}>Add</Button>
        <Button onClick={handleSave} loading={saving} disabled={blocked || !hasData}>Update</Button>
        <Button onClick={() => window.print()}>Print</Button>
      </div>

    </div>
  );
}
