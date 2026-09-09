import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './PlacementPage.css';

const n = (v) => parseFloat(v) || 0;
const BG1 = '#F2F2F2';
const BG2 = '#FBF8EF';

/* ═══════════════════════════════════════════════════════
   Cell helpers — defined OUTSIDE component to avoid remount
   ═══════════════════════════════════════════════════════ */
function EditCell({ value, onChange, bg = '#fffef0', cls = '' }) {
  return (
    <td className={`plc-cell plc-center${cls ? ' ' + cls : ''}`}>
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

function CalcCell({ value, total = false, cls = '' }) {
  const display = typeof value === 'number' ? value : (parseFloat(value) || 0);
  return (
    <td className={`plc-cell plc-center${cls ? ' ' + cls : ''}`}>
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

/* Section E categories — each row is captured under all three */
const E_CATS = [
  { suf: '',    label: 'NSQF' },
  { suf: 'Ex',  label: 'NSQF exempted' },
  { suf: 'Non', label: 'Non NSQF' },
];

const D_KEYS   = D_ROWS.map(r => r.key);
const E_KEYS   = E_ROWS.flatMap(r => E_CATS.map(c => r.key + c.suf));
const ALL_KEYS = [...D_KEYS, ...E_KEYS];
const ZERO_PREV = Object.fromEntries(ALL_KEYS.map(k => [k, 0]));
const INIT      = Object.fromEntries(ALL_KEYS.map(k => [k, '']));

/* ═══════════════════════════════════════════════════════
   Main component
   ═══════════════════════════════════════════════════════ */
export default function PlacementPage() {
  const { selection, user } = useAuth();
  const [dtm, setDtm]        = useState(INIT);
  const [PREV, setPrev]      = useState(ZERO_PREV);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [clearing, setClearing] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [loadErr, setLoadErr] = useState('');
  const set = k => e => setDtm(prev => ({ ...prev, [k]: e.target.value }));

  useEffect(() => {
    if (!selection?.instId || !selection?.month || !selection?.year) return;
    setLoading(true); setBlocked(false); setHasData(false); setLoadErr('');
    api.get('/entry/placement/load', {
      params: { instId: selection.instId, month: selection.month, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (!data) return;
      setPrev({ ...ZERO_PREV, ...(data.prevCum || {}) });
      if (data.hasData) {
        setHasData(true);
        setDtm(prev => ({ ...prev, ...(data.existing || {}) }));
        if (user?.role !== 'SU') setBlocked(true);
      }
    }).catch(() => setLoadErr('Could not load form data from server.'))
      .finally(() => setLoading(false));
  }, [selection?.instId, selection?.month, selection?.year]);

  /* ── Print: strip the app shell so only the form prints (button + Ctrl+P) ── */
  useEffect(() => {
    const on  = () => document.body.classList.add('plc-printing');
    const off = () => document.body.classList.remove('plc-printing');
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
    api.post('/entry/placement/save', {
      instId: selection.instId, month: selection.month, year: selection.year, ...dtm,
    }).then(() => message.success('Placement data saved successfully!'))
      .catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  /* ── derived cumulatives: PREV_CUM + current DTM ── */
  const cum = Object.fromEntries(
    ALL_KEYS.map(k => [k, (PREV[k] || 0) + n(dtm[k])])
  );

  /* ── section totals ── */
  const dTotMon = D_ROWS.reduce((s, r) => s + n(dtm[r.key]), 0);
  const dTotCum = D_ROWS.reduce((s, r) => s + cum[r.key], 0);
  const eTot = E_CATS.map(c => ({
    mon: E_ROWS.reduce((s, r) => s + n(dtm[r.key + c.suf]), 0),
    cum: E_ROWS.reduce((s, r) => s + cum[r.key + c.suf], 0),
  }));

  const handleReset = () => setDtm(INIT);

  /* ── SU only: clear this month's submitted record so the institute can re-enter ── */
  const handleClear = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    const when = `${selection.monthName || selection.month} ${selection.year}`;
    if (!window.confirm(
      `Clear the submitted Placement Section data for ${selection.instName || selection.instId} — ${when}?\n\n` +
      `This deletes the month's entry. The institute will be able to fill it in again.`
    )) return;
    setClearing(true);
    api.delete('/admin/data', {
      params: { instId: selection.instId, year: selection.year, month: selection.month, section: '04' },
    }).then(() => {
      message.success('Placement Section data cleared — the institute can now re-enter it.');
      setDtm(INIT);
      setHasData(false);
      setBlocked(false);
    }).catch(err => message.error(err.response?.data?.message || 'Clear failed'))
      .finally(() => setClearing(false));
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  return (
    <div className="plc-page">
      {/* print-only header (app shell + title bar are hidden when printing) */}
      <div className="plc-print-header">
        <div className="plc-print-title">Monthly Progress Report — Sections D &amp; E</div>
        <div className="plc-print-sub">
          {selection?.instName || ''}
          {selection?.monthName ? ` — ${selection.monthName} ${selection.year}` : ''}
        </div>
      </div>

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

      {/* ═══════════════════════════════════════════════════
          D. Trainees Trained Under
          ═══════════════════════════════════════════════════ */}
      <div className="plc-card">
        <div className="plc-card-title">D. Trainees Trained Under</div>
        <div className="plc-table-wrap">
          <table className="plc-table">
            <colgroup>
              <col style={{ width: 36 }} />
              <col style={{ width: 54 }} />
              <col />
              <col style={{ width: 150 }} />
              <col style={{ width: 170 }} />
            </colgroup>
            <thead>
              <tr>
                <th className="plc-th" colSpan={3}></th>
                <th className="plc-th">During the month</th>
                <th className="plc-th">Cumulative<br />(up to the month)</th>
              </tr>
            </thead>
            <tbody>
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

              <tr className="plc-total-row">
                <td className="plc-cell plc-rowno"></td>
                <td className="plc-cell plc-total-label"><b>Total</b></td>
                <CalcCell value={dTotMon} total />
                <CalcCell value={dTotCum} total />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          E. Placement Section — NSQF / NSQF exempted / Non NSQF
          ═══════════════════════════════════════════════════ */}
      <div className="plc-card" style={{ marginTop: 14 }}>
        <div className="plc-card-title">E. Placement Section</div>
        <div className="plc-table-wrap">
          <table className="plc-table plc-table-e">
            <colgroup>
              <col style={{ width: 36 }} />
              <col style={{ width: 46 }} />
              <col style={{ width: 260 }} />
              {E_CATS.flatMap(c => [
                <col key={`${c.suf}-m`} style={{ width: 96 }} />,
                <col key={`${c.suf}-c`} style={{ width: 110 }} />,
              ])}
            </colgroup>
            <thead>
              <tr>
                <th className="plc-th" colSpan={3} rowSpan={2}>Name</th>
                {E_CATS.map(c => (
                  <th className="plc-th plc-grp-start" key={c.suf} colSpan={2}>{c.label}</th>
                ))}
              </tr>
              <tr>
                {E_CATS.map(c => [
                  <th className="plc-th plc-grp-start" key={`${c.suf}-m`}>During the month</th>,
                  <th className="plc-th" key={`${c.suf}-c`}>Cumulative<br />(up to the month)</th>,
                ])}
              </tr>
            </thead>
            <tbody>
              {E_ROWS.map((r, idx) => (
                <tr key={r.key}>
                  {idx === 0 && (
                    <td className="plc-letter" rowSpan={E_ROWS.length + 1}><b>E.</b></td>
                  )}
                  <td className="plc-cell plc-rowno">{r.no}</td>
                  <td className="plc-cell plc-label" style={{ background: r.bg }}>{r.label}</td>
                  {E_CATS.map(c => [
                    <EditCell key={`${c.suf}-m`} cls="plc-grp-start" value={dtm[r.key + c.suf]} onChange={set(r.key + c.suf)} bg={r.bg} />,
                    <CalcCell key={`${c.suf}-c`} value={cum[r.key + c.suf]} />,
                  ])}
                </tr>
              ))}

              <tr className="plc-total-row">
                <td className="plc-cell plc-rowno"></td>
                <td className="plc-cell plc-total-label"><b>Total</b></td>
                {eTot.map((t, i) => [
                  <CalcCell key={`t${i}-m`} cls="plc-grp-start" value={t.mon} total />,
                  <CalcCell key={`t${i}-c`} value={t.cum} total />,
                ])}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Summary strip ── */}
        <div className="plc-summary-strip">
          <div className="plc-summary-item">
            <span className="plc-summary-label">Trainees (D) — Cumulative</span>
            <span className="plc-summary-val">{dTotCum}</span>
          </div>
          <div className="plc-summary-divider" />
          <div className="plc-summary-item">
            <span className="plc-summary-label">Placements NSQF — Cum.</span>
            <span className="plc-summary-val plc-summary-green">{eTot[0].cum}</span>
          </div>
          <div className="plc-summary-divider" />
          <div className="plc-summary-item">
            <span className="plc-summary-label">Placements Exempted — Cum.</span>
            <span className="plc-summary-val plc-summary-green">{eTot[1].cum}</span>
          </div>
          <div className="plc-summary-divider" />
          <div className="plc-summary-item">
            <span className="plc-summary-label">Placements Non-NSQF — Cum.</span>
            <span className="plc-summary-val plc-summary-green">{eTot[2].cum}</span>
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="plc-legend">
        <span><b>C</b> : Auto Calculated / Formula Field</span>
        <span><b>*</b> : Mandatory Field</span>
        <span><b>D.</b> : Trainees Trained Under (NSQF / Non-NSQF)</span>
        <span><b>E.</b> : Placement Section (i–viii) × NSQF / NSQF exempted / Non NSQF</span>
      </div>

      {/* ── Action bar ── */}
      <div className="plc-actions">
        <Button onClick={handleReset}>Reset</Button>
        <Button type="primary" onClick={handleSave} loading={saving} disabled={blocked || hasData}>Add</Button>
        <Button onClick={handleSave} loading={saving} disabled={blocked || !hasData}>Update</Button>
        {user?.role === 'SU' && hasData && (
          <Button danger icon={<DeleteOutlined />} onClick={handleClear} loading={clearing}>Clear Data</Button>
        )}
        <Button onClick={() => window.print()}>Print</Button>
      </div>

    </div>
  );
}
