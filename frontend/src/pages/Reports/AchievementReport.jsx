import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import {
  TrophyOutlined, ArrowLeftOutlined, PrinterOutlined, DownloadOutlined, SearchOutlined, CalendarOutlined,
  WarningOutlined, CheckCircleOutlined, ClockCircleOutlined, UnorderedListOutlined,
  ColumnHeightOutlined, VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import api from '../../services/api';
import { exportToExcel, usePrintOnlyReport } from '../../utils/reportUtils';
import './TraineeBreakdownReport.css';
import './AchievementReport.css';

const pct = (a, b) => (b > 0 ? Math.round((a * 100) / b) : 0);

export default function AchievementReport() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const { month, year } = state || {};
  const monthName = state?.monthName ? state.monthName.charAt(0) + state.monthName.slice(1).toLowerCase() : '';
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [search, setSearch]   = useState('');
  const [show, setShow]       = useState('all');   // all | done | pending
  const [expanded, setExpanded] = useState(false);
  usePrintOnlyReport();
  const tableId = 'ach-rpt-tbl';
  const title = `Significant Achievement — ${monthName}-${year}`;

  useEffect(() => {
    if (!month || !year) { navigate('/app/reports/achievement', { replace: true }); return; }
    setLoading(true); setError(false);
    api.get('/reports/achievement', { params: { month, year } })
      .then(r => setRows(r.data?.data || []))
      .catch(() => { setRows([]); setError(true); })
      .finally(() => setLoading(false));
  }, [month, year, navigate]);

  if (!month) return null;

  const done = rows.filter(r => !r.noData).length;
  const pending = rows.length - done;
  const q = search.trim().toLowerCase();
  const shown = rows.filter(r =>
    (show === 'all' || (show === 'done' ? !r.noData : r.noData)) &&
    (!q || String(r.instName || '').toLowerCase().includes(q) || String(r.text || '').toLowerCase().includes(q)));

  return (
    <div className="tb-page acr-page">
      <div className="tb-print-title">{title}</div>

      {/* ── Header ── */}
      <header className="tb-hero rpt-no-print">
        <span className="tb-hero-icon"><TrophyOutlined /></span>
        <div className="tb-hero-text">
          <span className="tb-kicker">Reports · Significant achievements</span>
          <h1>Significant Achievements</h1>
          <p><CalendarOutlined /> During {monthName} · FY {year}</p>
        </div>
        <div className="tb-hero-actions">
          <button className="tb-btn tb-btn-ghost" onClick={() => navigate('/app/reports/achievement')}><ArrowLeftOutlined /> Change month</button>
          <button className="tb-btn tb-btn-ghost" onClick={() => window.print()} disabled={loading}><PrinterOutlined /> Print</button>
          <button className="tb-btn" disabled={loading || !rows.length}
            onClick={() => exportToExcel(tableId, `Achievement_${monthName}_${year}.xls`, { title })}>
            <DownloadOutlined /> Export
          </button>
        </div>
      </header>

      {error && <div className="tb-banner rpt-no-print"><WarningOutlined /> Could not load report data. Please check your connection and try again.</div>}

      {/* ── Summary ── */}
      {!loading && rows.length > 0 && (
        <div className="tb-tiles rpt-no-print" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          <div className="tb-kpi tb-k-green">
            <span className="tb-kpi-label"><CheckCircleOutlined /> Submitted</span>
            <span className="tb-kpi-value">{done} <small className="acr-of">of {rows.length}</small></span>
            <div className="tb-progress" role="progressbar" aria-valuenow={pct(done, rows.length)} aria-valuemin={0} aria-valuemax={100}>
              <i style={{ width: `${pct(done, rows.length)}%` }} />
            </div>
            <span className="tb-kpi-sub">{pct(done, rows.length)}% of centres reported achievements</span>
          </div>
          <div className="tb-kpi tb-k-red">
            <span className="tb-kpi-label"><ClockCircleOutlined /> Not submitted</span>
            <span className="tb-kpi-value">{pending}</span>
            <span className="tb-kpi-sub">{pending ? 'Centres yet to send achievements' : 'Every centre has reported'}</span>
          </div>
          <div className="tb-kpi tb-k-gold">
            <span className="tb-kpi-label"><CalendarOutlined /> Period</span>
            <span className="tb-kpi-value">{monthName}</span>
            <span className="tb-kpi-sub">Financial year {year}</span>
          </div>
        </div>
      )}

      {/* ── List ── */}
      <section className="tb-card">
        <div className="tb-card-head rpt-no-print">
          <h2><UnorderedListOutlined /> Centre-wise achievements</h2>
          <div className="tb-seg" role="tablist" aria-label="Show">
            {[['all', `All (${rows.length})`], ['done', `Submitted (${done})`], ['pending', `Not submitted (${pending})`]].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={show === k} className={show === k ? 'is-on' : ''} onClick={() => setShow(k)}>{l}</button>
            ))}
          </div>
          <button className="acr-toggle" onClick={() => setExpanded(e => !e)} aria-pressed={expanded}>
            {expanded ? <><VerticalAlignMiddleOutlined /> Collapse text</> : <><ColumnHeightOutlined /> Show full text</>}
          </button>
          <span className="tb-search">
            <SearchOutlined />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search centre or text…" aria-label="Search centre or achievement text" />
          </span>
        </div>

        {loading ? <div className="tb-loading"><Spin /></div> : (
          <div className="rpt-table-wrap tb-wrap">
            <div className="tb-scroll">
              <table id={tableId} className={`tb-table acr-table${expanded ? ' is-expanded' : ''}`}>
                <thead>
                  <tr>
                    <th className="tb-sno">S.No</th>
                    <th className="tb-left acr-inst-col">Name of Technology Centre</th>
                    <th className="tb-left">Significant Achievements during {monthName}-{year}</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((r, i) => (
                    <tr key={`${r.instName}${i}`} className={r.noData ? 'is-missing' : ''}>
                      <td className="tb-sno">{i + 1}</td>
                      <td className="tb-left tb-inst">{r.instName}</td>
                      <td className="tb-left acr-text">
                        {r.noData
                          ? <span className="acr-pending">Not submitted</span>
                          : <div className="acr-body" title={expanded ? undefined : r.text}>{r.text}</div>}
                      </td>
                    </tr>
                  ))}
                  {shown.length === 0 && (
                    <tr><td colSpan={3} className="tb-empty">
                      {rows.length ? 'Nothing matches the filter.' : `No data found for ${monthName} ${year}.`}
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
