import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './TargetPage.css';

const n = (v) => parseInt(v) || 0;

const INIT = {
  revEarnCash: '', revEarnAcc: '',
  revExpCash:  '', revExpAcc:  '',
  taTarget:    '', njuTarget:  '', beBudget: '',
};

function EditCell({ value, onChange }) {
  return (
    <td className="tgt-cell tgt-center">
      <input
        className="tgt-input tgt-editable"
        type="number" min="0" step="1"
        value={value} onChange={onChange} placeholder="0"
      />
    </td>
  );
}

function CalcCell({ value, highlight = false }) {
  return (
    <td className="tgt-cell tgt-center">
      <input
        className={`tgt-input ${highlight ? 'tgt-calc' : 'tgt-ro'}`}
        value={value} readOnly
      />
    </td>
  );
}

export default function TargetPage() {
  const { selection } = useAuth();
  const [form, setForm]       = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [loadErr, setLoadErr] = useState('');

  const set = k => e => setForm(prev => ({ ...prev, [k]: e.target.value }));

  useEffect(() => {
    if (!selection?.instId || !selection?.year) return;
    setLoading(true); setLoadErr('');
    api.get('/target/load', {
      params: { instId: selection.instId, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (data?.hasData) {
        setForm({
          revEarnCash: data.revEarnCash ?? '',
          revEarnAcc:  data.revEarnAcc  ?? '',
          revExpCash:  data.revExpCash  ?? '',
          revExpAcc:   data.revExpAcc   ?? '',
          taTarget:    data.taTarget    ?? '',
          njuTarget:   data.njuTarget   ?? '',
          beBudget:    data.beBudget    ?? '',
        });
      } else {
        setForm(INIT);
      }
    }).catch(() => setLoadErr('Could not load target data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.year]);

  const handleSave = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    setSaving(true);
    api.post('/target/save', {
      instId: selection.instId,
      year:   selection.year,
      ...Object.fromEntries(Object.entries(form).map(([k, v]) => [k, n(v)])),
    }).then(() => message.success('Annual targets saved successfully!'))
      .catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  const handleReset = () => setForm(INIT);

  /* ── auto-calculated fields ── */
  const incExpCash = n(form.revEarnCash) - n(form.revExpCash);
  const incExpAcc  = n(form.revEarnAcc)  - n(form.revExpAcc);
  const perRecCash = n(form.revExpCash) > 0
    ? ((n(form.revEarnCash) / n(form.revExpCash)) * 100).toFixed(1)
    : '0.0';
  const perRecAcc  = n(form.revExpAcc) > 0
    ? ((n(form.revEarnAcc)  / n(form.revExpAcc))  * 100).toFixed(1)
    : '0.0';

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  return (
    <div className="tgt-page">
      {loadErr && <Alert type="warning" message={loadErr} style={{ margin: '8px 16px' }} />}

      {/* ── Title Bar ── */}
      <div className="tgt-titlebar">
        <div className="tgt-titlebar-left">
          <span className="tgt-page-label">Annual Target Entry</span>
          <span className="tgt-institute">{selection?.instName || 'Institute'}</span>
        </div>
        <div className="tgt-titlebar-right">
          {selection?.year && (
            <span className="tgt-meta-chip">Year: {selection.year}</span>
          )}
          <span className="tgt-note">Set targets for the financial year</span>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div className="tgt-card">
        <div className="tgt-card-title">Annual Target — Financial, Physical &amp; Budget</div>
        <div className="tgt-table-wrap">
          <table className="tgt-table">
            <colgroup>
              <col style={{ width: 36 }} />
              <col style={{ width: 50 }} />
              <col />
              <col style={{ width: 140 }} />
              <col style={{ width: 140 }} />
            </colgroup>
            <thead>
              <tr>
                <th className="tgt-th" colSpan={3}></th>
                <th className="tgt-th">Cash (₹ Lakhs)</th>
                <th className="tgt-th">Accrual (₹ Lakhs)</th>
              </tr>
            </thead>
            <tbody>

              {/* ── A. Revenue Earning ── */}
              <tr>
                <td className="tgt-cell" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 14, background: '#eaf0f8', color: '#073354', verticalAlign: 'middle' }} rowSpan={2}>A.</td>
                <td className="tgt-cell tgt-section-hdr" colSpan={4}>
                  <b style={{ color: '#811700' }}>Revenue Earning Target</b>
                </td>
              </tr>
              <tr>
                <td className="tgt-cell tgt-center" style={{ color: '#555', fontSize: 11 }}>(i)</td>
                <td className="tgt-cell tgt-label" style={{ background: '#F2F2F2' }}>Annual Revenue Earning Target</td>
                <EditCell value={form.revEarnCash} onChange={set('revEarnCash')} />
                <EditCell value={form.revEarnAcc}  onChange={set('revEarnAcc')} />
              </tr>

              {/* ── B. Revenue Expenditure ── */}
              <tr>
                <td className="tgt-cell" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 14, background: '#eaf0f8', color: '#073354', verticalAlign: 'middle' }} rowSpan={2}>B.</td>
                <td className="tgt-cell tgt-section-hdr" colSpan={4}>
                  <b style={{ color: '#811700' }}>Revenue Expenditure Target</b>
                </td>
              </tr>
              <tr>
                <td className="tgt-cell tgt-center" style={{ color: '#555', fontSize: 11 }}>(i)</td>
                <td className="tgt-cell tgt-label" style={{ background: '#FBF8EF' }}>Annual Revenue Expenditure Target</td>
                <EditCell value={form.revExpCash} onChange={set('revExpCash')} />
                <EditCell value={form.revExpAcc}  onChange={set('revExpAcc')} />
              </tr>

              {/* ── C. Income over Expenditure (auto) ── */}
              <tr>
                <td className="tgt-cell" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 14, background: '#eaf0f8', color: '#073354', verticalAlign: 'middle' }} rowSpan={2}>C.</td>
                <td className="tgt-cell tgt-section-hdr" colSpan={4}>
                  <b style={{ color: '#811700' }}>Income over Expenditure</b>
                  <span style={{ fontWeight: 'normal', fontSize: 11, marginLeft: 8, color: '#555' }}>(Auto: A − B)</span>
                </td>
              </tr>
              <tr>
                <td className="tgt-cell tgt-center" style={{ color: '#555', fontSize: 11 }}>(i)</td>
                <td className="tgt-cell tgt-label" style={{ background: '#F2F2F2' }}>Income over Expenditure</td>
                <CalcCell value={incExpCash} highlight={true} />
                <CalcCell value={incExpAcc}  highlight={true} />
              </tr>

              {/* ── D. Percentage Recovery (auto) ── */}
              <tr>
                <td className="tgt-cell" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 14, background: '#eaf0f8', color: '#073354', verticalAlign: 'middle' }} rowSpan={2}>D.</td>
                <td className="tgt-cell tgt-section-hdr" colSpan={4}>
                  <b style={{ color: '#811700' }}>Percentage Recovery</b>
                  <span style={{ fontWeight: 'normal', fontSize: 11, marginLeft: 8, color: '#555' }}>(Auto: A/B × 100)</span>
                </td>
              </tr>
              <tr>
                <td className="tgt-cell tgt-center" style={{ color: '#555', fontSize: 11 }}>(i)</td>
                <td className="tgt-cell tgt-label" style={{ background: '#FBF8EF' }}>Percentage Recovery (%)</td>
                <CalcCell value={perRecCash} highlight={true} />
                <CalcCell value={perRecAcc}  highlight={true} />
              </tr>

              {/* ── Divider ── */}
              <tr>
                <td className="tgt-cell tgt-divider" colSpan={5} style={{ padding: '5px 10px', fontWeight: 'bold', color: '#073354', fontSize: 13 }}>
                  Physical &amp; Budget Targets
                </td>
              </tr>

              {/* ── E. Training Target ── */}
              <tr>
                <td className="tgt-cell" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 14, background: '#eaf0f8', color: '#073354', verticalAlign: 'middle' }} rowSpan={2}>E.</td>
                <td className="tgt-cell tgt-section-hdr" colSpan={4}>
                  <b style={{ color: '#811700' }}>Training &amp; Assistance Targets</b>
                </td>
              </tr>
              <tr>
                <td className="tgt-cell tgt-center" style={{ color: '#555', fontSize: 11 }}>(i)</td>
                <td className="tgt-cell tgt-label" style={{ background: '#F2F2F2' }}>Annual Training Target (No. of Trainees)</td>
                <td className="tgt-cell tgt-center" colSpan={2}>
                  <input
                    className="tgt-input tgt-editable"
                    type="number" min="0" step="1"
                    value={form.taTarget} onChange={set('taTarget')} placeholder="0"
                    style={{ width: 160 }}
                  />
                </td>
              </tr>
              <tr>
                <td className="tgt-cell" style={{ background: '#eaf0f8' }}></td>
                <td className="tgt-cell tgt-center" style={{ color: '#555', fontSize: 11 }}>(ii)</td>
                <td className="tgt-cell tgt-label" style={{ background: '#FBF8EF' }}>Annual NJU Target (No. of Units Assisted)</td>
                <td className="tgt-cell tgt-center" colSpan={2}>
                  <input
                    className="tgt-input tgt-editable"
                    type="number" min="0" step="1"
                    value={form.njuTarget} onChange={set('njuTarget')} placeholder="0"
                    style={{ width: 160 }}
                  />
                </td>
              </tr>

              {/* ── F. Budget Estimate ── */}
              <tr>
                <td className="tgt-cell" style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 14, background: '#eaf0f8', color: '#073354', verticalAlign: 'middle' }} rowSpan={2}>F.</td>
                <td className="tgt-cell tgt-section-hdr" colSpan={4}>
                  <b style={{ color: '#811700' }}>Budget Estimate</b>
                </td>
              </tr>
              <tr>
                <td className="tgt-cell tgt-center" style={{ color: '#555', fontSize: 11 }}>(i)</td>
                <td className="tgt-cell tgt-label" style={{ background: '#F2F2F2' }}>Budget Estimate (BE) for the Year (₹ Lakhs)</td>
                <td className="tgt-cell tgt-center" colSpan={2}>
                  <input
                    className="tgt-input tgt-editable"
                    type="number" min="0" step="1"
                    value={form.beBudget} onChange={set('beBudget')} placeholder="0"
                    style={{ width: 160 }}
                  />
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* ── Summary strip ── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          padding: '10px 16px',
          background: 'linear-gradient(135deg, #eef3f8 0%, #dce8f4 100%)',
          borderTop: '2px solid #b8cfe8',
        }}>
          {[
            { label: 'Revenue Earning (Cash)', val: n(form.revEarnCash) },
            { label: 'Revenue Earning (Accrual)', val: n(form.revEarnAcc) },
            { label: 'Training Target', val: n(form.taTarget) },
            { label: 'NJU Target', val: n(form.njuTarget) },
            { label: 'Budget Estimate', val: n(form.beBudget) },
          ].map(({ label, val }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 130, flex: 1 }}>
              <span style={{ fontSize: 10, color: '#556', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
              <span style={{ fontSize: 15, fontWeight: 'bold', color: '#073354' }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={{ margin: '10px 16px 0', fontSize: 11, color: '#666', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <span><b style={{ color: '#073354' }}>C</b> : Auto Calculated</span>
        <span><b style={{ color: '#073354' }}>A–D</b> : Financial Targets (₹ Lakhs)</span>
        <span><b style={{ color: '#073354' }}>E</b> : Physical Targets (Numbers)</span>
        <span><b style={{ color: '#073354' }}>F</b> : Budget Estimate (₹ Lakhs)</span>
      </div>

      {/* ── Action bar ── */}
      <div className="tgt-actions">
        <Button onClick={handleReset}>Reset</Button>
        <Button type="primary" onClick={handleSave} loading={saving}>Save Targets</Button>
      </div>
    </div>
  );
}
