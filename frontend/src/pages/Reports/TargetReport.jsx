import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import {
  AimOutlined, SearchOutlined, PrinterOutlined, DownloadOutlined, CalendarOutlined, BankOutlined,
  RiseOutlined, WalletOutlined, PercentageOutlined, TeamOutlined, ToolOutlined, FundOutlined,
  CheckCircleOutlined, WarningOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { exportToExcel, usePrintOnlyReport } from '../../utils/reportUtils';
import './TargetReport.css';

const YEARS = [
  '2026-2027', '2025-2026', '2024-2025', '2023-2024', '2022-2023', '2021-2022',
  '2020-2021', '2019-2020', '2018-2019', '2017-2018', '2016-2017', '2015-2016',
];

const n = v => Number(v) || 0;
const fmt = v => n(v).toLocaleString('en-IN', { maximumFractionDigits: 2 });

/* column groups: key, header; `pct` columns get the recovery pill */
const GROUPS = [
  { label: 'Revenue Earning', tone: 'a', cols: ['revEarnCash', 'revEarnAcc'] },
  { label: 'Revenue Expenditure', tone: 'b', cols: ['revExpCash', 'revExpAcc'] },
  { label: 'Excess of Income over Exp.', tone: 'a', cols: ['incExpCash', 'incExpAcc'] },
  { label: '%age Recovery', tone: 'b', cols: ['perRecCash', 'perRecAcc'], pct: true },
];
const SINGLES = [
  { key: 'njuTarget', label: 'No. of Units' },
  { key: 'taTarget',  label: 'Trainees Trained' },
  { key: 'beBudget',  label: 'BE', unit: 'Rs. lakh' },
];
const COLS = [...GROUPS.flatMap(g => g.cols), ...SINGLES.map(s => s.key)];
const PCT = new Set(['perRecCash', 'perRecAcc']);

/* Legacy TargetReport.jsp: all institutes' annual targets for the financial year chosen at login
   (here also switchable from the controls). */
export default function TargetReport() {
  const { selection } = useAuth();
  const [year, setYear]       = useState(selection?.year || YEARS[0]);
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [search, setSearch]   = useState('');
  const [onlyMissing, setOnlyMissing] = useState(false);
  usePrintOnlyReport();
  const tableId = 'target-rpt-tbl';
  const title = `Target report for financial year ${year}`;

  useEffect(() => {
    setLoading(true); setError(false);
    api.get('/reports/target', { params: { year } })
      .then(r => setRows(r.data?.data || []))
      .catch(() => { setRows([]); setError(true); })
      .finally(() => setLoading(false));
  }, [year]);

  const withData = rows.filter(r => !r.noData);
  const missing  = rows.length - withData.length;
  const sum = k => withData.reduce((s, r) => s + n(r[k]), 0);
  const tot = {
    revEarnCash: sum('revEarnCash'), revEarnAcc: sum('revEarnAcc'),
    revExpCash:  sum('revExpCash'),  revExpAcc:  sum('revExpAcc'),
    njuTarget:   sum('njuTarget'),   taTarget:   sum('taTarget'), beBudget: sum('beBudget'),
  };
  tot.incExpCash = tot.revEarnCash - tot.revExpCash;
  tot.incExpAcc  = tot.revEarnAcc  - tot.revExpAcc;
  tot.perRecCash = tot.revExpCash > 0 ? Math.floor((tot.revEarnCash * 100) / tot.revExpCash) : 0;
  tot.perRecAcc  = tot.revExpAcc  > 0 ? Math.floor((tot.revEarnAcc  * 100) / tot.revExpAcc)  : 0;

  const q = search.trim().toLowerCase();
  const shown = rows.filter(r => (!q || r.instName?.toLowerCase().includes(q)) && (!onlyMissing || r.noData));

  const recoveryOk = tot.perRecCash >= 100;
  const tiles = [
    { icon: <BankOutlined />, label: 'Targets set', value: `${withData.length} / ${rows.length}`, sub: missing ? `${missing} without targets` : 'All institutes', tone: missing ? 'red' : 'green' },
    { icon: <RiseOutlined />, label: 'Revenue earning', value: `₹ ${fmt(tot.revEarnCash)}`, sub: `Cash · accrual ₹ ${fmt(tot.revEarnAcc)}`, tone: 'blue' },
    { icon: <WalletOutlined />, label: 'Expenditure', value: `₹ ${fmt(tot.revExpCash)}`, sub: `Cash · accrual ₹ ${fmt(tot.revExpAcc)}`, tone: 'orange' },
    { icon: <PercentageOutlined />, label: 'Recovery (cash)', value: `${tot.perRecCash}%`, sub: `Accrual ${tot.perRecAcc}%`, tone: recoveryOk ? 'green' : 'amber',
      status: recoveryOk ? { cls: 'is-good', icon: <CheckCircleOutlined />, text: 'Self-sustaining' } : { cls: 'is-warn', icon: <WarningOutlined />, text: 'Below 100%' } },
    { icon: <TeamOutlined />, label: 'Trainees to train', value: fmt(tot.taTarget), sub: 'Annual target', tone: 'aqua' },
    { icon: <ToolOutlined />, label: 'Units to assist', value: fmt(tot.njuTarget), sub: `BE ₹ ${fmt(tot.beBudget)} lakh`, tone: 'gold' },
  ];

  const cell = (r, k) => {
    if (r.noData) return <span className="tg-dash">0</span>;
    const v = n(r[k]);
    if (PCT.has(k)) return <span className={`tg-pct ${v >= 100 ? 'is-good' : v > 0 ? 'is-warn' : 'is-zero'}`}>{v}%</span>;
    return <span className={v < 0 ? 'tg-neg' : ''}>{fmt(v)}</span>;
  };

  return (
    <div className="tg-page">
      <div className="tg-print-title">{title}</div>

      {/* ── Header ── */}
      <header className="tg-hero rpt-no-print">
        <span className="tg-hero-icon"><AimOutlined /></span>
        <div className="tg-hero-text">
          <span className="tg-kicker">Reports · Annual targets</span>
          <h1>Target Report</h1>
          <p>Annual targets of every Technology Centre for FY {year} — revenue, expenditure, recovery, units, trainees and BE.</p>
        </div>
      </header>

      {/* ── Controls ── */}
      <section className="tg-card tg-controls rpt-no-print">
        <label className="tg-field">
          <span><CalendarOutlined /> Financial year</span>
          <select value={year} onChange={e => setYear(e.target.value)}>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label className="tg-field tg-field-wide">
          <span>Find institute</span>
          <span className="tg-search">
            <SearchOutlined />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Type to filter the table…" />
          </span>
        </label>
        {missing > 0 && (
          <label className="tg-check">
            <input type="checkbox" checked={onlyMissing} onChange={e => setOnlyMissing(e.target.checked)} />
            Only without targets ({missing})
          </label>
        )}
        <div className="tg-actions">
          <button className="tg-btn" onClick={() => window.print()} disabled={loading}><PrinterOutlined /> Print</button>
          <button className="tg-btn tg-btn-green" disabled={loading}
            onClick={() => exportToExcel(tableId, `Target_Report_${year}.xls`, { title })}>
            <DownloadOutlined /> Export
          </button>
        </div>
      </section>

      {error && <div className="tg-banner rpt-no-print"><WarningOutlined /> Could not load report data. Please try again.</div>}

      {/* ── Totals ── */}
      {!loading && withData.length > 0 && (
        <div className="tg-tiles rpt-no-print">
          {tiles.map(t => (
            <div key={t.label} className={`tg-tile tg-k-${t.tone}`}>
              <span className="tg-tile-icon">{t.icon}</span>
              <div className="tg-tile-body">
                <div className="tg-tile-label">{t.label}</div>
                <div className="tg-tile-value">{t.value}</div>
                <div className="tg-tile-sub">
                  {t.status ? <span className={`tg-status ${t.status.cls}`}>{t.status.icon} {t.status.text}</span> : t.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Table ── */}
      <section className="tg-card tg-table-card">
        <div className="tg-card-head rpt-no-print">
          <h2><FundOutlined /> Institute-wise targets <small>amounts in Rs. lakh</small></h2>
          <div className="tg-legend">
            <span><i className="tg-pct is-good">≥100%</i> Earning covers expenditure</span>
            <span><i className="tg-pct is-warn">&lt;100%</i> Below expenditure</span>
            <span><i className="tg-badge">No targets</i> Not entered</span>
          </div>
        </div>

        {loading ? <div className="tg-loading"><Spin /></div> : (
          <div className="rpt-table-wrap tg-wrap">
            <div className="tg-scroll">
              <table id={tableId} className="tg-table">
                <thead>
                  <tr>
                    <th rowSpan={2} className="tg-sno">S.No</th>
                    <th rowSpan={2} className="tg-left">Name of Technology Centre</th>
                    {GROUPS.map(g => (
                      <th key={g.label} colSpan={2} className={`tg-grp tg-t-${g.tone}`}>
                        {g.label}
                      </th>
                    ))}
                    {SINGLES.map(s => (
                      <th key={s.key} rowSpan={2}>{s.label}{s.unit && <><br /><small>({s.unit})</small></>}</th>
                    ))}
                  </tr>
                  <tr>
                    {GROUPS.flatMap(g => [
                      <th key={`${g.label}c`} className={`tg-sub tg-t-${g.tone}`}>Cash</th>,
                      <th key={`${g.label}a`} className={`tg-sub tg-t-${g.tone}`}>Accrual</th>,
                    ])}
                  </tr>
                </thead>
                <tbody>
                  {shown.map((r, i) => (
                    <tr key={r.instName + i} className={r.noData ? 'is-missing' : ''}>
                      <td className="tg-sno">{i + 1}</td>
                      <td className="tg-left tg-inst">
                        {r.instName}
                        {/* label drawn by CSS so it stays out of the Excel export */}
                        {r.noData && <span className="tg-badge tg-badge-row" data-label="No targets" title="No record found for this technology centre" />}
                      </td>
                      {COLS.map(k => <td key={k}>{cell(r, k)}</td>)}
                    </tr>
                  ))}
                  {shown.length === 0 && (
                    <tr><td colSpan={13} className="tg-empty">
                      {rows.length ? 'No institute matches the filter.' : `No institutes found for ${year}.`}
                    </td></tr>
                  )}
                </tbody>
                {withData.length > 0 && (
                  <tfoot>
                    <tr>
                      <td colSpan={2} className="tg-left">Total ({withData.length} institutes with targets)</td>
                      {COLS.map(k => (
                        <td key={k}>{PCT.has(k) ? `${tot[k]}%` : <span className={tot[k] < 0 ? 'tg-neg' : ''}>{fmt(tot[k])}</span>}</td>
                      ))}
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
            <div className="tg-note">
              <b>Note:</b> All amounts in Rs. lakh · Revenue earning / expenditure are annual targets on cash and accrual basis ·
              Excess of income over expenditure = earning − expenditure ·
              %age recovery = earning ÷ expenditure × 100 · Total %age recovery is calculated from the column totals.
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
