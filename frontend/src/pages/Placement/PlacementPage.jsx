import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import {
  DeleteOutlined, PrinterOutlined, ReloadOutlined, SaveOutlined, EditOutlined,
  TeamOutlined, TrophyOutlined, CheckCircleOutlined, LockOutlined, ClockCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './PlacementPage.css';
import '../../styles/entry-compact.css';

const n = (v) => parseFloat(v) || 0;

/* ═══════════════════════════════════════════════════════
   Cell helpers — defined OUTSIDE component to avoid remount
   ═══════════════════════════════════════════════════════ */
function EditCell({ value, onChange, disabled, cls = '' }) {
  return (
    <td className={`plc-cell plc-in-cell${cls ? ' ' + cls : ''}`}>
      <input
        className="plc-input"
        type="number"
        min="0"
        step="1"
        inputMode="numeric"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="0"
      />
    </td>
  );
}

function CalcCell({ value, total = false, cls = '' }) {
  return (
    <td className={`plc-cell plc-calc${total ? ' plc-calc-total' : ''}${cls ? ' ' + cls : ''}`}>
      {n(value)}
    </td>
  );
}

/* ── Row definitions ── */
const D_ROWS = [
  { key: 'nsqfCom',  no: '(i)',   label: 'NSQF (NSQF Compliance, AICTE / NCVT / SCVTC Courses)' },
  { key: 'nsqfExe',  no: '(ii)',  label: 'NSQF Exempted — 26 Courses' },
  { key: 'nonNsqf',  no: '(iii)', label: 'Non-NSQF (all other short term / tailor-made courses)' },
];

const E_ROWS = [
  { key: 'trnCert',     no: '(i)',    label: 'Trainees certified' },
  { key: 'trnOptPlc',   no: '(ii)',   label: 'Total trainees opted for placement' },
  { key: 'trnRegSmrk',  no: '(iii)',  label: 'Trainees registered on Sampark Portal' },
  { key: 'cndPlcd',     no: '(iv)',   label: 'Candidates got placement (through institute as well as after leaving the institution)' },
  { key: 'empTrn',      no: '(v)',    label: 'Candidates already employed, attending training for re-skilling / up-skilling' },
  { key: 'cndOptHstd',  no: '(vi)',   label: 'Candidates who opted for higher studies (including those continuing their education)' },
  { key: 'cndOptSlfs',  no: '(vii)',  label: 'Candidates opted for self-employment' },
  { key: 'cndToBePlcd', no: '(viii)', label: 'Candidates yet to be placed' },
];

/* Section E categories — each row is captured under all three */
const E_CATS = [
  { suf: '',    label: 'NSQF',          cls: 'plc-cat-a' },
  { suf: 'Ex',  label: 'NSQF exempted', cls: 'plc-cat-b' },
  { suf: 'Non', label: 'Non-NSQF',      cls: 'plc-cat-c' },
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
  const isSU = user?.role === 'SU';

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
    }).then(() => {
      message.success('Placement data saved successfully!');
      // saved → switch to "existing data" mode: enables Update / Clear Data (SU), locks the form for others
      setHasData(true);
      if (user?.role !== 'SU') setBlocked(true);
    })
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
  /* "Candidates got placement" (iv) per category — the headline placement figure */
  const placed = E_CATS.map(c => ({ mon: n(dtm['cndPlcd' + c.suf]), cum: cum['cndPlcd' + c.suf] }));

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

  const status = blocked
    ? { cls: 'plc-status-locked', icon: <LockOutlined />, text: 'Submitted — locked' }
    : hasData
      ? { cls: 'plc-status-saved', icon: <CheckCircleOutlined />, text: isSU ? 'Submitted — editable (SU)' : 'Submitted' }
      : { cls: 'plc-status-new', icon: <ClockCircleOutlined />, text: 'Not yet submitted' };

  const kpis = [
    { label: 'Trainees trained (D)', icon: <TeamOutlined />, cls: 'plc-kpi-main', mon: dTotMon, cum: dTotCum },
    ...E_CATS.map((c, i) => ({ label: `Placed — ${c.label}`, icon: <TrophyOutlined />, cls: c.cls, mon: placed[i].mon, cum: placed[i].cum })),
  ];

  return (
    <div className="plc-page">
      {/* print-only header (app shell + hero are hidden when printing) */}
      <div className="plc-print-header">
        <div className="plc-print-title">Monthly Progress Report — Sections D &amp; E (Trainees &amp; Placement)</div>
        <div className="plc-print-sub">
          {selection?.instName || ''}
          {selection?.monthName ? ` — ${selection.monthName} ${selection.year}` : ''}
        </div>
      </div>

      {/* ── Hero ── */}
      <header className="plc-hero">
        <div className="plc-hero-main">
          <span className="plc-hero-kicker">Monthly Progress Report · Sections D &amp; E</span>
          <h1 className="plc-hero-title">Placement Section</h1>
          <span className="plc-hero-inst">{selection?.instName || '—'}</span>
        </div>
        <div className="plc-hero-side">
          {selection?.monthName && <span className="plc-hero-chip">{selection.monthName} {selection.year}</span>}
          <span className={`plc-status ${status.cls}`}>{status.icon}{status.text}</span>
        </div>
      </header>

      {loadErr && <Alert type="warning" showIcon message={loadErr} className="plc-alert" />}
      {blocked && (
        <Alert type="info" showIcon icon={<LockOutlined />} className="plc-alert"
          message="This month's placement data has been submitted."
          description="The form is read-only. Contact the SU (Senet Division) if a correction is needed." />
      )}

      {/* ── KPI tiles ── */}
      <div className="plc-kpis">
        {kpis.map(k => (
          <div key={k.label} className={`plc-kpi ${k.cls}`}>
            <span className="plc-kpi-icon">{k.icon}</span>
            <div className="plc-kpi-body">
              <div className="plc-kpi-label">{k.label}</div>
              <div className="plc-kpi-value">{k.cum}</div>
              <div className="plc-kpi-sub">cumulative · <b>{k.mon}</b> this month</div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════
          D. Trainees Trained Under
          ═══════════════════════════════════════════════════ */}
      <section className="plc-card">
        <div className="plc-card-head">
          <span className="plc-badge">D</span>
          <div>
            <h2>Trainees trained under</h2>
            <p>Number of trainees trained this month, by course type.</p>
          </div>
        </div>
        <div className="plc-table-wrap">
          <table className="plc-table plc-table-d">
            <colgroup>
              <col style={{ width: 58 }} />
              <col />
              <col style={{ width: 170 }} />
              <col style={{ width: 170 }} />
            </colgroup>
            <thead>
              <tr>
                <th className="plc-th">S.No</th>
                <th className="plc-th plc-th-left">Course type</th>
                <th className="plc-th">During the month</th>
                <th className="plc-th">Cumulative <span>(up to the month)</span></th>
              </tr>
            </thead>
            <tbody>
              {D_ROWS.map(r => (
                <tr key={r.key}>
                  <td className="plc-cell plc-rowno"><span>{r.no}</span></td>
                  <td className="plc-cell plc-label">{r.label}</td>
                  <EditCell value={dtm[r.key]} onChange={set(r.key)} disabled={blocked} />
                  <CalcCell value={cum[r.key]} />
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="plc-total-row">
                <td className="plc-cell" />
                <td className="plc-cell plc-total-label">Total</td>
                <CalcCell value={dTotMon} total />
                <CalcCell value={dTotCum} total />
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          E. Placement Section — NSQF / NSQF exempted / Non NSQF
          ═══════════════════════════════════════════════════ */}
      <section className="plc-card">
        <div className="plc-card-head">
          <span className="plc-badge">E</span>
          <div>
            <h2>Placement</h2>
            <p>Outcome of trainees for each course category — enter the figures for this month.</p>
          </div>
          <div className="plc-cat-legend">
            {E_CATS.map(c => <span key={c.suf} className={c.cls}>{c.label}</span>)}
          </div>
        </div>
        <div className="plc-table-wrap">
          <table className="plc-table plc-table-e">
            <colgroup>
              <col style={{ width: 58 }} />
              <col style={{ width: 280 }} />
              {E_CATS.flatMap(c => [
                <col key={`${c.suf}-m`} style={{ width: 104 }} />,
                <col key={`${c.suf}-c`} style={{ width: 104 }} />,
              ])}
            </colgroup>
            <thead>
              <tr>
                <th className="plc-th" rowSpan={2}>S.No</th>
                <th className="plc-th plc-th-left" rowSpan={2}>Particulars</th>
                {E_CATS.map(c => (
                  <th className={`plc-th plc-th-cat ${c.cls} plc-grp-start`} key={c.suf} colSpan={2}>{c.label}</th>
                ))}
              </tr>
              <tr>
                {E_CATS.map(c => [
                  <th className={`plc-th plc-th-sub ${c.cls} plc-grp-start`} key={`${c.suf}-m`}>During<br />the month</th>,
                  <th className={`plc-th plc-th-sub ${c.cls}`} key={`${c.suf}-c`}>Cumulative</th>,
                ])}
              </tr>
            </thead>
            <tbody>
              {E_ROWS.map(r => (
                <tr key={r.key}>
                  <td className="plc-cell plc-rowno"><span>{r.no}</span></td>
                  <td className="plc-cell plc-label">{r.label}</td>
                  {E_CATS.map(c => [
                    <EditCell key={`${c.suf}-m`} cls="plc-grp-start" value={dtm[r.key + c.suf]} onChange={set(r.key + c.suf)} disabled={blocked} />,
                    <CalcCell key={`${c.suf}-c`} value={cum[r.key + c.suf]} />,
                  ])}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="plc-total-row">
                <td className="plc-cell" />
                <td className="plc-cell plc-total-label">Total</td>
                {eTot.map((t, i) => [
                  <CalcCell key={`t${i}-m`} cls="plc-grp-start" value={t.mon} total />,
                  <CalcCell key={`t${i}-c`} value={t.cum} total />,
                ])}
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* ── Sticky action bar ── */}
      <div className="plc-actions">
        <div className="plc-actions-hint">
          <InfoCircleOutlined />
          <span>Enter figures <b>for this month</b> only — cumulative values and totals are calculated automatically.</span>
        </div>
        <div className="plc-actions-btns">
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
