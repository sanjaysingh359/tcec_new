import { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import {
  DeleteOutlined, ReloadOutlined, SaveOutlined, CheckCircleOutlined, ClockCircleOutlined,
  InfoCircleOutlined, ToolOutlined, TeamOutlined, BankOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './TargetPage.css';

const n = (v) => parseInt(v) || 0;

const INIT = {
  revEarnCash: '', revEarnAcc: '',
  revExpCash:  '', revExpAcc:  '',
  taTarget:    '', njuTarget:  '', beBudget: '',
};

function NumInput({ value, onChange, big = false }) {
  return (
    <input
      className={`tgt-input${big ? ' tgt-input-big' : ''}`}
      type="number" min="0" step="1" inputMode="numeric"
      value={value} onChange={onChange} placeholder="0"
    />
  );
}

export default function TargetPage() {
  const { selection, user } = useAuth();
  const [form, setForm]       = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [clearing, setClearing] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [loadErr, setLoadErr] = useState('');

  const set = k => e => setForm(prev => ({ ...prev, [k]: e.target.value }));

  useEffect(() => {
    if (!selection?.instId || !selection?.year) return;
    setLoading(true); setLoadErr(''); setHasData(false);
    api.get('/target/load', {
      params: { instId: selection.instId, year: selection.year }
    }).then(r => {
      const data = r.data?.data;
      if (data?.hasData) {
        setHasData(true);
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
    }).then(() => {
      message.success('Annual targets saved successfully!');
      setHasData(true);   // enables Clear Data straight away
    })
      .catch(err => message.error(err.response?.data?.message || 'Save failed'))
      .finally(() => setSaving(false));
  };

  const handleReset = () => setForm(INIT);

  /* ── SU only: clear the saved annual targets so they can be set again ── */
  const handleClear = () => {
    if (!selection?.instId) { message.error('No institute selected. Go to Dashboard first.'); return; }
    if (!window.confirm(
      `Clear the saved Annual Targets for ${selection.instName || selection.instId} — ${selection.year}?\n\n` +
      `The Financial / Physical / Budget screens will show no target until new ones are saved.`
    )) return;
    setClearing(true);
    api.delete('/target', {
      params: { instId: selection.instId, year: selection.year },
    }).then(() => {
      message.success('Annual Targets cleared.');
      setForm(INIT);
      setHasData(false);
    }).catch(err => message.error(err.response?.data?.message || 'Clear failed'))
      .finally(() => setClearing(false));
  };

  /* ── auto-calculated fields ── */
  const incExpCash = n(form.revEarnCash) - n(form.revExpCash);
  const incExpAcc  = n(form.revEarnAcc)  - n(form.revExpAcc);
  const perRec = (earn, exp) => (n(exp) > 0 ? (n(earn) / n(exp)) * 100 : null);
  const perRecCash = perRec(form.revEarnCash, form.revExpCash);
  const perRecAcc  = perRec(form.revEarnAcc,  form.revExpAcc);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;

  const RecCell = ({ v }) => (
    <td className="tgt-cell tgt-calc">
      {v === null ? <span className="tgt-muted">—</span> : (
        <>
          <span className={v < 100 ? 'tgt-neg' : 'tgt-pos'}>{v.toFixed(1)}%</span>
          <div className="tgt-bar"><span style={{ width: `${Math.min(v, 100)}%` }} className={v < 100 ? 'tgt-bar-low' : ''} /></div>
        </>
      )}
    </td>
  );

  const physical = [
    { key: 'njuTarget', icon: <ToolOutlined />, cls: 'tgt-k-navy', title: 'Units to be assisted',
      unit: 'No. of units (NJU)', help: 'Used for % achievement of “Number of units benefited” on the Physical page.' },
    { key: 'taTarget',  icon: <TeamOutlined />, cls: 'tgt-k-teal', title: 'Trainees to be trained',
      unit: 'No. of trainees', help: 'Used for % achievement of “Total trainees (a+b+c)” on the Physical page.' },
    { key: 'beBudget',  icon: <BankOutlined />, cls: 'tgt-k-gold', title: 'Budget estimate (B.E.)',
      unit: 'Rs. Lakh', help: 'Shown as the B.E. on the Budget page and in reports.' },
  ];

  return (
    <div className="tgt-page">

      {/* ── Hero ── */}
      <header className="tgt-hero">
        <div className="tgt-hero-main">
          <span className="tgt-hero-kicker">Annual target entry · Financial year {selection?.year || ''}</span>
          <h1 className="tgt-hero-title">Annual Targets</h1>
          <span className="tgt-hero-inst">{selection?.instName || '—'}</span>
        </div>
        <div className="tgt-hero-side">
          {selection?.year && <span className="tgt-hero-chip">FY {selection.year}</span>}
          {hasData
            ? <span className="tgt-status tgt-status-saved"><CheckCircleOutlined /> Targets set</span>
            : <span className="tgt-status tgt-status-new"><ClockCircleOutlined /> Not set yet</span>}
        </div>
      </header>

      {loadErr && <Alert type="warning" showIcon message={loadErr} className="tgt-alert" />}

      {/* ═══════════ Financial targets ═══════════ */}
      <section className="tgt-card">
        <div className="tgt-card-head">
          <span className="tgt-badge">₹</span>
          <div>
            <h2>Financial targets</h2>
            <p>Annual targets in Rs. Lakh. Income over expenditure and % recovery are calculated.</p>
          </div>
          <div className="tgt-legend"><span className="tgt-cash">Cash basis</span><span className="tgt-accr">Accrual basis</span></div>
        </div>
        <div className="tgt-table-wrap">
          <table className="tgt-table">
            <colgroup><col /><col style={{ width: 210 }} /><col style={{ width: 210 }} /></colgroup>
            <thead>
              <tr>
                <th className="tgt-th tgt-th-left">Target</th>
                <th className="tgt-th tgt-th-cash">Cash basis</th>
                <th className="tgt-th tgt-th-accr">Accrual basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tgt-cell tgt-label"><span className="tgt-rowno">A</span>Annual revenue earning target</td>
                <td className="tgt-cell tgt-in-cell"><NumInput value={form.revEarnCash} onChange={set('revEarnCash')} /></td>
                <td className="tgt-cell tgt-in-cell"><NumInput value={form.revEarnAcc}  onChange={set('revEarnAcc')} /></td>
              </tr>
              <tr>
                <td className="tgt-cell tgt-label"><span className="tgt-rowno">B</span>Annual revenue expenditure target</td>
                <td className="tgt-cell tgt-in-cell"><NumInput value={form.revExpCash} onChange={set('revExpCash')} /></td>
                <td className="tgt-cell tgt-in-cell"><NumInput value={form.revExpAcc}  onChange={set('revExpAcc')} /></td>
              </tr>
              <tr className="tgt-calc-row">
                <td className="tgt-cell tgt-label"><span className="tgt-rowno">C</span>Income over expenditure <small>A − B</small></td>
                <td className={`tgt-cell tgt-calc ${incExpCash < 0 ? 'tgt-neg' : ''}`}>{incExpCash}</td>
                <td className={`tgt-cell tgt-calc ${incExpAcc  < 0 ? 'tgt-neg' : ''}`}>{incExpAcc}</td>
              </tr>
              <tr className="tgt-calc-row">
                <td className="tgt-cell tgt-label"><span className="tgt-rowno">D</span>Percentage recovery <small>A ÷ B × 100</small></td>
                <RecCell v={perRecCash} />
                <RecCell v={perRecAcc} />
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════ Physical & budget targets ═══════════ */}
      <section className="tgt-card">
        <div className="tgt-card-head">
          <span className="tgt-badge">#</span>
          <div>
            <h2>Physical &amp; budget targets</h2>
            <p>Annual figures for the year.</p>
          </div>
        </div>
        <div className="tgt-tiles">
          {physical.map(t => (
            <label key={t.key} className={`tgt-tile ${t.cls}`}>
              <div className="tgt-tile-top">
                <span className="tgt-tile-icon">{t.icon}</span>
                <div>
                  <div className="tgt-tile-title">{t.title}</div>
                  <div className="tgt-tile-unit">{t.unit}</div>
                </div>
              </div>
              <NumInput big value={form[t.key]} onChange={set(t.key)} />
              <div className="tgt-tile-help">{t.help}</div>
            </label>
          ))}
        </div>
      </section>

      {/* ── Sticky action bar ── */}
      <div className="tgt-actions">
        <div className="tgt-actions-hint">
          <InfoCircleOutlined />
          <span>These targets drive the <b>Target</b> and <b>% achievement</b> columns on the Financial, Physical and Budget pages.</span>
        </div>
        <div className="tgt-actions-btns">
          <Button icon={<ReloadOutlined />} onClick={handleReset}>Reset</Button>
          {user?.role === 'SU' && hasData && (
            <Button danger icon={<DeleteOutlined />} onClick={handleClear} loading={clearing}>Clear Data</Button>
          )}
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} loading={saving}>
            {hasData ? 'Update Targets' : 'Save Targets'}
          </Button>
        </div>
      </div>
    </div>
  );
}
