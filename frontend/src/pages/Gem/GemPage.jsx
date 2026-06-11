import { useState } from 'react';
import { Button } from 'antd';
import { useAuth } from '../../context/AuthContext';
import './GemPage.css';

const n = (v) => parseFloat(v) || 0;

export default function GemPage() {
  const { selection } = useAuth();

  const INIT = { totalProc: '', totalProcGem: '' };
  const [form, setForm] = useState(INIT);
  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  /* ── Auto-computed percentage ── */
  const pct =
    n(form.totalProc) > 0
      ? ((n(form.totalProcGem) / n(form.totalProc)) * 100).toFixed(2)
      : '';

  /* colour code the percentage */
  const pctNum  = parseFloat(pct) || 0;
  const pctColor =
    pct === ''     ? '#888' :
    pctNum >= 50   ? '#1a7a3a' :
    pctNum >= 25   ? '#b86e00' : '#cc2200';

  const instName = selection?.instName || '—';

  return (
    <div className="gem-page">

      {/* ── Title Bar ── */}
      <div className="gem-titlebar">
        <div className="gem-titlebar-left">
          <span className="gem-page-label">Monthly Progress Report — GEM Section</span>
          <span className="gem-institute">{instName}</span>
        </div>
        <div className="gem-titlebar-right">
          {selection?.monthName && (
            <span className="gem-meta-chip">{selection.monthName} {selection.year}</span>
          )}
          <span className="gem-note">* Values in Rs. Crore</span>
        </div>
      </div>

      {/* ── Info banner ── */}
      <div className="gem-info-banner">
        <span className="gem-info-icon">🏛️</span>
        <span>
          <b>Government e-Marketplace (GEM)</b> — Enter the total procurement value and the
          portion procured through GEM portal. The percentage will be computed automatically.
        </span>
      </div>

      {/* ── Main Card ── */}
      <div className="gem-card">
        <div className="gem-card-title">GEM Procurement Data</div>
        <div className="gem-table-wrap">
          <table className="gem-table">
            <thead>
              <tr>
                <th className="gem-th" colSpan={4}>GEM — Government e-Marketplace</th>
              </tr>
              <tr>
                <th className="gem-th" style={{ width: '28%' }}>Organisation</th>
                <th className="gem-th" style={{ width: '24%' }}>
                  Total Procurement<br />(Rs. in Crore)
                </th>
                <th className="gem-th" style={{ width: '24%' }}>
                  Total Procurement<br />through GEM (Rs. in Crore)
                </th>
                <th className="gem-th" style={{ width: '24%' }}>
                  GEM %<br />(Auto-calculated)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Organisation */}
                <td className="gem-cell gem-inst-cell">
                  <div className="gem-inst-name">{instName}</div>
                </td>

                {/* Total Procurement */}
                <td className="gem-cell gem-center">
                  <input
                    className="gem-input gem-editable"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.totalProc}
                    onChange={set('totalProc')}
                  />
                  <div className="gem-field-hint">Total procurement this month</div>
                </td>

                {/* Total Procurement through GEM */}
                <td className="gem-cell gem-center">
                  <input
                    className="gem-input gem-editable"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.totalProcGem}
                    onChange={set('totalProcGem')}
                  />
                  <div className="gem-field-hint">GEM portal procurement</div>
                </td>

                {/* Percentage — auto */}
                <td className="gem-cell gem-center">
                  <div className="gem-pct-wrapper">
                    <input
                      className="gem-input gem-ro gem-pct-input"
                      value={pct !== '' ? `${pct} %` : '—'}
                      readOnly
                      style={{ color: pctColor }}
                    />
                    {pct !== '' && (
                      <div className="gem-pct-bar-bg">
                        <div
                          className="gem-pct-bar-fill"
                          style={{
                            width: `${Math.min(pctNum, 100)}%`,
                            background: pctColor,
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="gem-field-hint">= (GEM ÷ Total) × 100</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Summary strip ── */}
        {(form.totalProc || form.totalProcGem) && (
          <div className="gem-summary-strip">
            <div className="gem-summary-item">
              <span className="gem-summary-label">Total Procurement</span>
              <span className="gem-summary-val">₹ {n(form.totalProc).toFixed(2)} Cr</span>
            </div>
            <div className="gem-summary-divider" />
            <div className="gem-summary-item">
              <span className="gem-summary-label">Through GEM</span>
              <span className="gem-summary-val" style={{ color: '#0a4a78' }}>
                ₹ {n(form.totalProcGem).toFixed(2)} Cr
              </span>
            </div>
            <div className="gem-summary-divider" />
            <div className="gem-summary-item">
              <span className="gem-summary-label">GEM Percentage</span>
              <span
                className="gem-summary-val gem-summary-pct"
                style={{ color: pctColor }}
              >
                {pct !== '' ? `${pct} %` : '—'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Legend ── */}
      <div className="gem-legend">
        <span><b>C</b> : Auto Calculated / Formula Field</span>
        <span><b>*</b> : Mandatory Field</span>
        <span><b>F</b> : Fixed Value Field</span>
        <span><b>—</b> : No Value / Not Applicable</span>
      </div>

      {/* ── Action bar ── */}
      <div className="gem-actions">
        <Button onClick={() => setForm(INIT)}>Reset</Button>
        <Button type="primary">Save</Button>
      </div>

    </div>
  );
}
