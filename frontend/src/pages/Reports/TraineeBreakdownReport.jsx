import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import {
  ArrowLeftOutlined, PrinterOutlined, DownloadOutlined, SearchOutlined, TeamOutlined,
  AimOutlined, CalendarOutlined, CheckCircleOutlined, WarningOutlined, PieChartOutlined, TableOutlined,
} from '@ant-design/icons';
import api from '../../services/api';
import { exportToExcel, usePrintOnlyReport } from '../../utils/reportUtils';
import './TraineeBreakdownReport.css';

const n = v => Number(v) || 0;
const fmt = v => n(v).toLocaleString('en-IN');
const pct = (a, b) => (b > 0 ? Math.round((a * 100) / b) : 0);

/**
 * Shared layout for the "trainees trained" breakdown reports (category / gender / qualification).
 * `items`: [{ label, short, d: <during-the-month key>, c: <up-to-the-month key> }] in legacy column order.
 */
export default function TraineeBreakdownReport({
  heading, kicker, legacyTitle, icon = <TeamOutlined />, items,
  apiPath, backPath, tableId, filePrefix,
}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { month, year } = state || {};
  const monthName = state?.monthName ? state.monthName.charAt(0) + state.monthName.slice(1).toLowerCase() : '';
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [search, setSearch]   = useState('');
  const [period, setPeriod]   = useState('both');   // both | dtm | cum
  const [hideEmpty, setHideEmpty] = useState(false);
  usePrintOnlyReport();

  useEffect(() => {
    if (!month || !year) { navigate(backPath, { replace: true }); return; }
    setLoading(true); setError(false);
    api.get(apiPath, { params: { month, year } })
      .then(res => setRows(res.data?.data || []))
      .catch(() => { setRows([]); setError(true); })
      .finally(() => setLoading(false));
  }, [month, year, navigate, apiPath, backPath]);

  if (!month) return null;

  const title = `${legacyTitle} up to ${monthName} ${year}`;
  const dKeys = items.map(i => i.d);
  const cKeys = items.map(i => i.c);
  const sum = (r, keys) => keys.reduce((s, k) => s + n(r[k]), 0);

  const withData = rows.filter(r => !r.noData);
  const missing  = rows.length - withData.length;
  const missingNames = rows.filter(r => r.noData).map(r => r.userId).join(', ');
  const tot = { target: 0 };
  [...dKeys, ...cKeys].forEach(k => { tot[k] = 0; });
  withData.forEach(r => {
    tot.target += n(r.target);
    [...dKeys, ...cKeys].forEach(k => { tot[k] += n(r[k]); });
  });
  const totD = sum(tot, dKeys);
  const totC = sum(tot, cKeys);
  const achieved = pct(totC, tot.target);

  /* composition follows the period shown (both → up to the month) */
  const compKeys = period === 'dtm' ? dKeys : cKeys;
  const compTotal = period === 'dtm' ? totD : totC;
  const comp = items.map((it, i) => ({ label: it.label, value: tot[compKeys[i]], share: pct(tot[compKeys[i]], compTotal) }));
  const compMax = Math.max(1, ...comp.map(c => c.value));

  const q = search.trim().toLowerCase();
  const shown = rows.filter(r => (!q || String(r.userId || '').toLowerCase().includes(q)) && !(hideEmpty && r.noData));
  const showD = period !== 'cum';
  const showC = period !== 'dtm';
  const span = items.length + 1;

  const num = (v, cls = '') => <td className={`${cls}${n(v) === 0 ? ' is-zero' : ''}`}>{fmt(v)}</td>;
  const periodLabel = { both: '', dtm: ' (during the month)', cum: ' (up to the month)' }[period];

  return (
    <div className="tb-page">
      <div className="tb-print-title">{title}{periodLabel}</div>

      {/* ── Header ── */}
      <header className="tb-hero rpt-no-print">
        <span className="tb-hero-icon">{icon}</span>
        <div className="tb-hero-text">
          <span className="tb-kicker">{kicker}</span>
          <h1>{heading}</h1>
          <p><CalendarOutlined /> Up to {monthName} · FY {year}{missing > 0 && ` · ${missing} centre${missing > 1 ? 's' : ''} without data`}</p>
        </div>
        <div className="tb-hero-actions">
          <button className="tb-btn tb-btn-ghost" onClick={() => navigate(backPath)}><ArrowLeftOutlined /> Change month</button>
          <button className="tb-btn tb-btn-ghost" onClick={() => window.print()} disabled={loading}><PrinterOutlined /> Print</button>
          <button className="tb-btn" disabled={loading || !rows.length}
            onClick={() => exportToExcel(tableId, `${filePrefix}-${monthName}-${year}.xls`, { title: title + periodLabel })}>
            <DownloadOutlined /> Export
          </button>
        </div>
      </header>

      {error && <div className="tb-banner rpt-no-print"><WarningOutlined /> Could not load report data. Please check your connection and try again.</div>}

      {/* ── Summary ── */}
      {!loading && withData.length > 0 && (
        <div className="tb-summary rpt-no-print">
          <div className="tb-kpi tb-k-navy">
            <span className="tb-kpi-label"><TeamOutlined /> Trained up to {monthName}</span>
            <span className="tb-kpi-value">{fmt(totC)}</span>
            {tot.target > 0 ? (
              <>
                <div className="tb-progress" role="progressbar" aria-valuenow={achieved} aria-valuemin={0} aria-valuemax={100}>
                  <i style={{ width: `${Math.min(100, achieved)}%` }} />
                </div>
                <span className="tb-kpi-sub">
                  {achieved >= 100
                    ? <span className="tb-status is-good"><CheckCircleOutlined /> Target achieved</span>
                    : <b>{achieved}%</b>} of target {fmt(tot.target)}
                </span>
              </>
            ) : <span className="tb-kpi-sub">No annual target entered</span>}
          </div>
          <div className="tb-kpi tb-k-gold">
            <span className="tb-kpi-label"><CalendarOutlined /> During {monthName}</span>
            <span className="tb-kpi-value">{fmt(totD)}</span>
            <span className="tb-kpi-sub">{totC > 0 ? `${pct(totD, totC)}% of the year so far` : 'trainees this month'}</span>
          </div>
          <div className="tb-kpi tb-k-slate">
            <span className="tb-kpi-label"><AimOutlined /> Annual target</span>
            <span className="tb-kpi-value">{fmt(tot.target)}</span>
            <span className="tb-kpi-sub">{withData.length} of {rows.length} centres reporting</span>
          </div>

          <section className="tb-comp">
            <div className="tb-comp-head">
              <h3><PieChartOutlined /> Share of trainees</h3>
              <span>{period === 'dtm' ? `During ${monthName}` : `Up to ${monthName}`} · {fmt(compTotal)} total</span>
            </div>
            <ul className={`tb-comp-list${comp.length > 5 ? ' is-two' : ''}`}>
              {comp.map(c => (
                <li key={c.label} title={`${c.label}: ${fmt(c.value)} (${c.share}%)`}>
                  <span className="tb-comp-lbl">{c.label}</span>
                  <span className="tb-comp-bar"><i style={{ width: `${(c.value / compMax) * 100}%` }} /></span>
                  <span className="tb-comp-val">{fmt(c.value)} <small>{c.share}%</small></span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* ── Table ── */}
      <section className="tb-card">
        <div className="tb-card-head rpt-no-print">
          <h2><TableOutlined /> Centre-wise</h2>
          <div className="tb-seg" role="tablist" aria-label="Period">
            {[['both', 'Both'], ['dtm', 'During the month'], ['cum', 'Up to the month']].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={period === k} className={period === k ? 'is-on' : ''} onClick={() => setPeriod(k)}>{l}</button>
            ))}
          </div>
          {missing > 0 && (
            <label className="tb-check">
              <input type="checkbox" checked={hideEmpty} onChange={e => setHideEmpty(e.target.checked)} />
              Hide centres without data ({missing})
            </label>
          )}
          <span className="tb-search">
            <SearchOutlined />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find technology centre…" aria-label="Find technology centre" />
          </span>
        </div>

        {loading ? <div className="tb-loading"><Spin /></div> : (
          <div className="rpt-table-wrap tb-wrap">
            <div className="tb-scroll">
              <table id={tableId} className={`tb-table${items.length > 6 && period === 'both' ? ' is-wide' : ''}`}>
                <thead>
                  <tr>
                    <th rowSpan={2} className="tb-sno tb-stick1">S.No</th>
                    <th rowSpan={2} className="tb-left tb-stick2">Name of Technology Centre</th>
                    <th rowSpan={2} className="tb-target">Target</th>
                    {showD && <th colSpan={span} className="tb-grp tb-t-d">During the Month</th>}
                    {showC && <th colSpan={span} className="tb-grp tb-t-c">Up to the Month</th>}
                  </tr>
                  <tr>
                    {showD && items.map(it => <th key={`d${it.d}`} className="tb-sub tb-t-d">{it.short}</th>)}
                    {showD && <th className="tb-sub tb-t-d tb-tot">TOTAL</th>}
                    {showC && items.map(it => <th key={`c${it.c}`} className="tb-sub tb-t-c">{it.short}</th>)}
                    {showC && <th className="tb-sub tb-t-c tb-tot">TOTAL</th>}
                  </tr>
                </thead>
                <tbody>
                  {shown.map((r, i) => (
                    <tr key={`${r.userId}${i}`} className={r.noData ? 'is-missing' : ''}>
                      <td className="tb-sno tb-stick1">{i + 1}</td>
                      <td className="tb-left tb-stick2 tb-inst">
                        {r.userId}
                        {/* label drawn by CSS so it stays out of the Excel export */}
                        {r.noData && <span className="tb-badge" data-label="No data" title="No record found for this technology centre" />}
                      </td>
                      {num(r.target, 'tb-target')}
                      {showD && dKeys.map(k => <td key={k} className={n(r[k]) === 0 ? 'is-zero' : ''}>{fmt(r[k])}</td>)}
                      {showD && num(sum(r, dKeys), 'tb-tot')}
                      {showC && cKeys.map(k => <td key={k} className={n(r[k]) === 0 ? 'is-zero' : ''}>{fmt(r[k])}</td>)}
                      {showC && num(sum(r, cKeys), 'tb-tot')}
                    </tr>
                  ))}
                  {shown.length === 0 && (
                    <tr><td colSpan={3 + (showD ? span : 0) + (showC ? span : 0)} className="tb-empty">
                      {rows.length ? 'No technology centre matches the search.' : `No data found for ${monthName} ${year}.`}
                    </td></tr>
                  )}
                </tbody>
                {withData.length > 0 && (
                  <tfoot>
                    <tr>
                      <td className="tb-sno tb-stick1" />
                      <td className="tb-left tb-stick2">TOTAL</td>
                      <td className="tb-target">{fmt(tot.target)}</td>
                      {showD && dKeys.map(k => <td key={k}>{fmt(tot[k])}</td>)}
                      {showD && <td className="tb-tot">{fmt(totD)}</td>}
                      {showC && cKeys.map(k => <td key={k}>{fmt(tot[k])}</td>)}
                      {showC && <td className="tb-tot">{fmt(totC)}</td>}
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
            {missing > 0 && (
              <div className="tb-note" title={missingNames}>
                <b>No record found for {missing} centre{missing > 1 ? 's' : ''}</b> (left out of the totals): {missingNames}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
