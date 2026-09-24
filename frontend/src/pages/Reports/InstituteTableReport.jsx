import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import {
  ArrowLeftOutlined, PrinterOutlined, DownloadOutlined, SearchOutlined, CalendarOutlined,
  WarningOutlined, TableOutlined, CheckCircleOutlined,
} from '@ant-design/icons';
import api from '../../services/api';
import { exportToExcel, usePrintOnlyReport } from '../../utils/reportUtils';
import './TraineeBreakdownReport.css';

export const n = v => Number(v) || 0;
export const fmt = v => n(v).toLocaleString('en-IN', { maximumFractionDigits: 2 });
export const pct = (a, b) => (b > 0 ? Math.round((a * 100) / b) : 0);

/**
 * Shared layout for the centre-wise monthly reports (budget / analysis / RFD).
 * `columns`: [{ group, tone, cols: [col] } | col], col = { key?, label, value?: r => number, strong? }.
 *   A col with `value` is computed (for rows and for the totals row, which gets the summed keys).
 * `tiles(tot, rows)` → [{ icon, label, value, sub, tone, progress?, good? }]
 */
export default function InstituteTableReport({
  heading, kicker, icon, titleFor, apiPath, backPath, tableId, filePrefix,
  columns, tiles, unitNote,
}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { month, year } = state || {};
  const monthName = state?.monthName ? state.monthName.charAt(0) + state.monthName.slice(1).toLowerCase() : '';
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [search, setSearch]   = useState('');
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

  const title = titleFor(monthName, year);
  const groups = columns.map(c => (c.cols ? c : { single: true, cols: [c] }));
  const leaf = groups.flatMap(g => g.cols);
  const keys = leaf.filter(c => c.key).map(c => c.key);
  const val = (r, c) => (c.value ? c.value(r) : n(r[c.key]));

  const withData = rows.filter(r => !r.noData);
  const missing = rows.length - withData.length;
  const missingNames = rows.filter(r => r.noData).map(r => r.userId).join(', ');
  const tot = Object.fromEntries(keys.map(k => [k, withData.reduce((s, r) => s + n(r[k]), 0)]));
  const tileList = tiles ? tiles(tot, withData) : [];

  const q = search.trim().toLowerCase();
  const shown = rows.filter(r => (!q || String(r.userId || '').toLowerCase().includes(q)) && !(hideEmpty && r.noData));
  const hasGroups = groups.some(g => !g.single);

  const cell = (v, c) => {
    const x = n(v);
    return (
      <td key={c.key || c.label} className={`${c.strong ? 'tb-tot' : ''}${x === 0 ? ' is-zero' : ''}${x < 0 ? ' is-neg' : ''}`}>{fmt(x)}</td>
    );
  };

  return (
    <div className="tb-page">
      <div className="tb-print-title">{title}</div>

      {/* ── Header ── */}
      <header className="tb-hero rpt-no-print">
        <span className="tb-hero-icon">{icon}</span>
        <div className="tb-hero-text">
          <span className="tb-kicker">{kicker}</span>
          <h1>{heading}</h1>
          <p><CalendarOutlined /> Up to {monthName} · FY {year}{unitNote ? ` · ${unitNote}` : ''}{missing > 0 ? ` · ${missing} centre${missing > 1 ? 's' : ''} without data` : ''}</p>
        </div>
        <div className="tb-hero-actions">
          <button className="tb-btn tb-btn-ghost" onClick={() => navigate(backPath)}><ArrowLeftOutlined /> Change month</button>
          <button className="tb-btn tb-btn-ghost" onClick={() => window.print()} disabled={loading}><PrinterOutlined /> Print</button>
          <button className="tb-btn" disabled={loading || !rows.length}
            onClick={() => exportToExcel(tableId, `${filePrefix}_${monthName}_${year}.xls`, { title })}>
            <DownloadOutlined /> Export
          </button>
        </div>
      </header>

      {error && <div className="tb-banner rpt-no-print"><WarningOutlined /> Could not load report data. Please check your connection and try again.</div>}

      {/* ── Summary tiles ── */}
      {!loading && withData.length > 0 && tileList.length > 0 && (
        <div className="tb-tiles rpt-no-print" style={{ gridTemplateColumns: `repeat(${tileList.length}, minmax(0, 1fr))` }}>
          {tileList.map(t => (
            <div key={t.label} className={`tb-kpi tb-k-${t.tone || 'navy'}`}>
              <span className="tb-kpi-label">{t.icon} {t.label}</span>
              <span className="tb-kpi-value">{t.value}</span>
              {t.progress != null && (
                <div className="tb-progress" role="progressbar" aria-valuenow={t.progress} aria-valuemin={0} aria-valuemax={100}>
                  <i style={{ width: `${Math.max(0, Math.min(100, t.progress))}%` }} />
                </div>
              )}
              <span className="tb-kpi-sub">
                {t.good && <span className="tb-status is-good"><CheckCircleOutlined /> {t.good}</span>} {t.sub}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Table ── */}
      <section className="tb-card">
        <div className="tb-card-head rpt-no-print">
          <h2><TableOutlined /> Centre-wise</h2>
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
              <table id={tableId} className="tb-table">
                <thead>
                  <tr>
                    <th rowSpan={hasGroups ? 2 : 1} className="tb-sno tb-stick1">S.No</th>
                    <th rowSpan={hasGroups ? 2 : 1} className="tb-left tb-stick2">Name of Technology Centre</th>
                    {groups.map(g => (g.single
                      ? <th key={g.cols[0].label} rowSpan={hasGroups ? 2 : 1} className={`tb-single${g.cols[0].strong ? ' tb-tot' : ''}`}>{g.cols[0].label}</th>
                      : <th key={g.group} colSpan={g.cols.length} className={`tb-grp tb-t-${g.tone || 'd'}`}>{g.group}</th>))}
                  </tr>
                  {hasGroups && (
                    <tr>
                      {groups.filter(g => !g.single).flatMap(g => g.cols.map(c => (
                        <th key={`${g.group}${c.label}`} className={`tb-sub tb-t-${g.tone || 'd'}${c.strong ? ' tb-tot' : ''}`}>{c.label}</th>
                      )))}
                    </tr>
                  )}
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
                      {leaf.map(c => cell(val(r, c), c))}
                    </tr>
                  ))}
                  {shown.length === 0 && (
                    <tr><td colSpan={2 + leaf.length} className="tb-empty">
                      {rows.length ? 'No technology centre matches the search.' : `No data found for ${monthName} ${year}.`}
                    </td></tr>
                  )}
                </tbody>
                {withData.length > 0 && (
                  <tfoot>
                    <tr>
                      <td className="tb-sno tb-stick1" />
                      <td className="tb-left tb-stick2">TOTAL</td>
                      {leaf.map(c => cell(val(tot, c), c))}
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
