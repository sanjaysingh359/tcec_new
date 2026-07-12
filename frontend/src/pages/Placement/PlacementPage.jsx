import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './PlacementPage.css';

const n = (v) => parseFloat(v) || 0;
const BG1 = '#F2F2F2';
const BG2 = '#FBF8EF';

/* ═══════════════════════════════════════════════════════
   Cell helpers — defined OUTSIDE component to avoid remount
   ═══════════════════════════════════════════════════════ */
function EditCell({ value, onChange, bg = '#fffef0' }) {
  return (
    <td className="plc-cell plc-center">
      <input
        className="plc-input plc-editable"
        style={{ background: bg }}
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={onChange}
        placeholder="0"
      />
    </td>
  );
}

function CalcCell({ value, total = false }) {
  const display = typeof value === 'number' ? value : (parseFloat(value) || 0);
  return (
    <td className="plc-cell plc-center">
      <input
        className={`plc-input plc-ro${total ? ' plc-total-input' : ''}`}
        value={display}
        readOnly
      />
    </td>
  );
}

/* ── Row definitions ── */
const D_ROWS = [
  { key: 'nsqfCom',  no: '(i)',   label: 'NSQF (NSQF Compliance, AICTE / NCVT / SCVTC Courses)',      bg: BG1 },
  { key: 'nsqfExe',  no: '(ii)',  label: 'NSQF Exempted — 26 Courses',                                 bg: BG2 },
  { key: 'nonNsqf',  no: '(iii)', label: 'Non-NSQF (all other short term / tailor-made courses)',      bg: BG1 },
];

const E_ROWS = [
  { key: 'trnCert',     no: '(i)',    label: 'Trainees Certified',                                                                            bg: BG2 },
  { key: 'trnOptPlc',   no: '(ii)',   label: 'Total trainees opted for placement',                                                            bg: BG1 },
  { key: 'trnRegSmrk',  no: '(iii)',  label: 'Trainees registered on Sampark Portal',                                                         bg: BG2 },
  { key: 'cndPlcd',     no: '(iv)',   label: 'Candidates got placement (through institute as well as after leaving the institution)',          bg: BG1 },
  { key: 'empTrn',      no: '(v)',    label: 'Candidates who were already employed, attending training for re-skilling / up-skilling',        bg: BG2 },
  { key: 'cndOptHstd',  no: '(vi)',   label: 'Candidates who opted for higher studies (including candidates continuing their education)',      bg: BG1 },
  { key: 'cndOptSlfs',  no: '(vii)',  label: 'Candidates opted for self-employment',                                                          bg: BG2 },
  { key: 'cndToBePlcd', no: '(viii)', label: 'Candidates who were yet to be placed',                                                          bg: BG1 },
];

const ALL_ROWS = [...D_ROWS, ...E_ROWS];
const ZERO_PREV = Object.fromEntries(ALL_ROWS.map(r => [r.key, 0]));
const INIT = Object.fromEntries(ALL_ROWS.map(r => [r.key, '']));

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
export default function PlacementPage() {
  const { selection, user } = useAuth();
  const [dtm, setDtm]       = useState(INIT);
  const [PREV, setPrev]      = useState(ZERO_PREV);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [loadErr, setLoadErr] = useState('');
  const set = k => e => setDtm(prev => ({ ...prev, [k]: e.target.value }));

  useEffect(() => {
    if (!selection?.instId || !selection?.month || !selection?.year) return;
    setLoading(true); setBlocked(false); setLoadErr('');
    api.get('/entry/placement/load', {
      params: { instId: selection.instId, month: selection.month, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (!data) return;
      setPrev({ ...ZERO_PREV, ...(data.prevCum || {}) });
      if (data.hasData) {
        if (user?.role === 'SU') {
          const ex = data.existing || {};
          setDtm(prev => ({ ...prev, ...ex }));
        } else {
          setBlocked(true);
        }
      }
    }).catch(() => setLoadErr('Could not load form data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.month, selection?.year]);

  const handleSave = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    setSaving(true);
    api.post('/entry/placement/save', {
      instId: selection.instId, month: selection.month, year: selection.year, ...dtm,
    }).then(() => message.success('Placement data saved successfully!'))
      .catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  /* ── derived cumulatives: PREV_CUM + current DTM ── */
  const cum = Object.fromEntries(
    ALL_ROWS.map(r => [r.key, PREV[r.key] + n(dtm[r.key])])
  );

  /* ── section totals ── */
  const dTotMon = D_ROWS.reduce((s, r) => s + n(dtm[r.key]), 0);
  const dTotCum = D_ROWS.reduce((s, r) => s + cum[r.key], 0);
  const eTotMon = E_ROWS.reduce((s, r) => s + n(dtm[r.key]), 0);
  const eTotCum = E_ROWS.reduce((s, r) => s + cum[r.key], 0);

  const handleReset = () => setDtm(INIT);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  return (
    <div className="plc-page">
      {loadErr && <Alert type="warning" message={loadErr} style={{ margin: '8px 0' }} />}
      {blocked && <Alert type="error" message="Data already submitted for this month. Contact SU to modify." style={{ margin: '8px 0' }} />}

      {/* ── Title Bar ── */}
      <div className="plc-titlebar">
        <div className="plc-titlebar-left">
          <span className="plc-page-label">Monthly Progress Report — Sections D &amp; E</span>
          <span className="plc-institute">{selection?.instName || 'Placement Section'}</span>
        </div>
        <div className="plc-titlebar-right">
          {selection?.monthName && (
            <span className="plc-meta-chip">{selection.monthName} {selection.year}</span>
          )}
          <span className="plc-note">Trainees &amp; Placement Data</span>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div className="plc-card">
        <div className="plc-card-title">D. Trainees Trained Under &amp; E. Placement Section</div>
        <div className="plc-table-wrap">
          <table className="plc-table">
            <colgroup>
              <col style={{ width: 36 }} />
              <col style={{ width: 54 }} />
              <col />
              <col style={{ width: 130 }} />
              <col style={{ width: 130 }} />
            </colgroup>
            <thead>
              <tr>
                <th className="plc-th" colSpan={3}></th>
                <th className="plc-th">During the Month</th>
                <th className="plc-th">Cumulative<br />(up to the month)</th>
              </tr>
            </thead>
            <tbody>

              {/* ═══════════════════════════════════════════
                  D. Trainees Trained Under
                  rowSpan = 1 (hdr) + 3 (data) + 1 (total) = 5
                  ═══════════════════════════════════════════ */}
              <tr>
                <td className="plc-letter" rowSpan={D_ROWS.length + 2}><b>D.</b></td>
                <td className="plc-cell plc-section-hdr" colSpan={4}>
                  <b style={{ color: '#811700' }}>Trainees trained under</b>
                </td>
              </tr>

              {D_ROWS.map(r => (
                <tr key={r.key}>
                  <td className="plc-cell plc-rowno">{r.no}</td>
                  <td className="plc-cell plc-label" style={{ background: r.bg }}>{r.label}</td>
                  <EditCell value={dtm[r.key]} onChange={set(r.key)} bg={r.bg} />
                  <CalcCell value={cum[r.key]} />
                </tr>
              ))}

              {/* D Total */}
              <tr className="plc-total-row">
                <td className="plc-cell plc-rowno"></td>
                <td className="plc-cell plc-total-label"><b>Total</b></td>
                <CalcCell value={dTotMon} total />
                <CalcCell value={dTotCum} total />
              </tr>

              {/* ── Separator ── */}
              <tr>
                <td className="plc-cell plc-separator" colSpan={5}>
                  <b style={{ color: '#811700' }}>Placement Section</b>
                </td>
              </tr>

              {/* ═══════════════════════════════════════════
                  E. Placement Section
                  rowSpan = 8 (data) + 1 (total) = 9
                  applied on the first data row (idx === 0)
                  ═══════════════════════════════════════════ */}
              {E_ROWS.map((r, idx) => (
                <tr key={r.key}>
                  {idx === 0 && (
                    <td className="plc-letter" rowSpan={E_ROWS.length + 1}><b>E.</b></td>
                  )}
                  <td className="plc-cell plc-rowno">{r.no}</td>
                  <td className="plc-cell plc-label" style={{ background: r.bg }}>{r.label}</td>
                  <EditCell value={dtm[r.key]} onChange={set(r.key)} bg={r.bg} />
                  <CalcCell value={cum[r.key]} />
                </tr>
              ))}

              {/* E Total */}
              <tr className="plc-total-row">
                <td className="plc-cell plc-rowno"></td>
                <td className="plc-cell plc-total-label"><b>Total</b></td>
                <CalcCell value={eTotMon} total />
                <CalcCell value={eTotCum} total />
              </tr>

            </tbody>
          </table>
        </div>

        {/* ── Summary strip ── */}
        <div className="plc-summary-strip">
          <div className="plc-summary-item">
            <span className="plc-summary-label">Trainees (D) — Month</span>
            <span className="plc-summary-val">{dTotMon}</span>
          </div>
          <div className="plc-summary-divider" />
          <div className="plc-summary-item">
            <span className="plc-summary-label">Trainees (D) — Cumulative</span>
            <span className="plc-summary-val">{dTotCum}</span>
          </div>
          <div className="plc-summary-divider" />
          <div className="plc-summary-item">
            <span className="plc-summary-label">Placements (E) — Month</span>
            <span className="plc-summary-val plc-summary-green">{eTotMon}</span>
          </div>
          <div className="plc-summary-divider" />
          <div className="plc-summary-item">
            <span className="plc-summary-label">Placements (E) — Cumulative</span>
            <span className="plc-summary-val plc-summary-green">{eTotCum}</span>
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="plc-legend">
        <span><b>C</b> : Auto Calculated / Formula Field</span>
        <span><b>*</b> : Mandatory Field</span>
        <span><b>D.</b> : Trainees Trained Under (NSQF / Non-NSQF)</span>
        <span><b>E.</b> : Placement Section (i–viii)</span>
      </div>

      {/* ── Action bar ── */}
      <div className="plc-actions">
        <Button onClick={handleReset} disabled={blocked}>Reset</Button>
        <Button type="primary" onClick={handleSave} loading={saving} disabled={blocked}>Save</Button>
      </div>

    </div>
  );
}
