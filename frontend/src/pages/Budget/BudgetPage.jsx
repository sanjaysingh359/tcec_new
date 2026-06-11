import { useState } from 'react';
import { Button } from 'antd';
import { useAuth } from '../../context/AuthContext';
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
  const { selection } = useAuth();

  /* ── stub previous-cumulative values (replaced by API later) ── */
  const PREV_CF_CUM      = 0;   // sum of CRY_FWD_UTIL_DM for prev months this year
  const PREV_GIA_CUM     = 0;   // sum of GIA_UTIL_DM for prev months this year
  const PREV_MACHINE_CUM = 0;   // sum of MACHINE_DTM for prev months this year

  /* ── stub targets ── */
  const BE_BUDGET  = '0.00';   // Annual Budget Estimate from tbl_trng_exp_target
  const FIX_VAL1   = '0.00';   // CRY_FWD_AMT from January (carry-forward amount)
  const YEAR_LABEL = selection
    ? `${parseInt(selection.year) || 'YYYY'}-${(parseInt(selection.year) + 1) || 'YYYY'}`
    : 'YYYY-YYYY';

  /* ── form state ── */
  const INIT = {
    cfAmount:    FIX_VAL1,   // Carry Forward Amount (pre-filled)
    cfDtm:       '',          // CF Utilization During Month
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

  /* ── remaining char counts ── */
  const MAX_CHARS = 400;

  return (
    <div className="bud-page">

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
        <Button type="primary">Save</Button>
      </div>

    </div>
  );
}
