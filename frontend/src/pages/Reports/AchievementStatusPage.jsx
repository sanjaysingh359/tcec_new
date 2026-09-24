import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import {
  TrophyOutlined, SearchOutlined, PrinterOutlined, DownloadOutlined, BankOutlined,
  CheckCircleOutlined, CalendarOutlined,
} from '@ant-design/icons';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { exportToExcel, usePrintOnlyReport } from '../../utils/reportUtils';
import './AchievementStatusPage.css';

const MONTH_COLS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
const MONTH_KEYS = ['1','2','3','4','5','6','7','8','9','10','11','12'];
const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
];

export default function AchievementStatusPage() {
  const { selection } = useAuth();
  const [year, setYear]       = useState(selection?.year || YEARS[0]);
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  usePrintOnlyReport();
  const tableId = 'ach-status-tbl';

  useEffect(() => {
    setLoading(true);
    api.get('/reports/achievement/status', { params: { year } })
      .then(r => setRows(r.data?.data || []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [year]);

  const curIdx   = year === selection?.year ? parseInt(selection?.month, 10) - 1 : -1;
  const shown    = rows.filter(r => !search || r.userId?.toLowerCase().includes(search.toLowerCase()));
  const perMonth = MONTH_KEYS.map(k => rows.filter(r => r[k] === 'Y').length);
  const totalY   = perMonth.reduce((s, v) => s + v, 0);
  const rowTotal = r => MONTH_KEYS.filter(k => r[k] === 'Y').length;

  const tiles = [
    { icon: <BankOutlined />,        label: 'Institutes',            value: rows.length, cls: 'ast-k-navy' },
    { icon: <TrophyOutlined />,      label: `Submissions in ${year}`, value: totalY,     cls: 'ast-k-gold' },
    curIdx >= 0 && { icon: <CheckCircleOutlined />, label: `Submitted for ${MONTH_COLS[curIdx]}`,
      value: `${perMonth[curIdx]} / ${rows.length}`, cls: perMonth[curIdx] === rows.length ? 'ast-k-green' : 'ast-k-red' },
  ].filter(Boolean);

  return (
    <div className="ast-page">
      {/* print-only title (the hero and controls are not printed) */}
      <div className="ast-print-title">Significant Achievement Status — {year}</div>

      <header className="ast-hero rpt-no-print">
        <div>
          <span className="ast-kicker">Reports · Significant achievements</span>
          <h1>Significant Achievement Status</h1>
          <p>Which institutes have submitted their significant achievements, month by month.</p>
        </div>
        <span className="ast-hero-icon"><TrophyOutlined /></span>
      </header>

      <section className="ast-card ast-controls rpt-no-print">
        <label className="ast-field">
          <span><CalendarOutlined /> Financial year</span>
          <select value={year} onChange={e => setYear(e.target.value)}>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label className="ast-field ast-field-wide">
          <span>Find institute</span>
          <span className="ast-search">
            <SearchOutlined />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Type to filter the table…" />
          </span>
        </label>
        {!loading && rows.length > 0 && (
          <div className="ast-tiles">
            {tiles.map(t => (
              <div key={t.label} className={`ast-tile ${t.cls}`}>
                <span className="ast-tile-icon">{t.icon}</span>
                <div><div className="ast-tile-label">{t.label}</div><div className="ast-tile-value">{t.value}</div></div>
              </div>
            ))}
          </div>
        )}
        <div className="ast-actions">
          <button className="ast-btn" onClick={() => window.print()} disabled={loading}><PrinterOutlined /> Print</button>
          <button className="ast-btn ast-btn-green" onClick={() => exportToExcel(tableId, `AchievementStatus_${year}.xls`, { title: `Significant Achievement Status — ${year}` })} disabled={loading}>
            <DownloadOutlined /> Export
          </button>
        </div>
      </section>

      <section className="ast-card ast-table-card">
        <div className="ast-card-head">
          <h2>Submission status — {year}</h2>
          <div className="ast-legend">
            <span><i className="ast-pill ast-y">✓</i> Submitted</span>
            <span><i className="ast-pill ast-n">—</i> Not submitted</span>
          </div>
        </div>

        {loading ? <div className="ast-loading"><Spin /></div> : (
          <div className="ast-table-wrap">
            <table id={tableId} className="ast-table">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>S.No</th>
                  <th className="ast-left">Institute</th>
                  {MONTH_COLS.map((m, i) => <th key={m} className={i === curIdx ? 'is-cur' : ''}>{m}</th>)}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r, idx) => (
                  <tr key={r.userId}>
                    <td className="ast-num">{idx + 1}</td>
                    <td className="ast-inst">{r.userId}</td>
                    {MONTH_KEYS.map((mk, i) => (
                      <td key={mk} className={i === curIdx ? 'is-cur' : ''}>
                        <span className={`ast-pill ${r[mk] === 'Y' ? 'ast-y' : 'ast-n'}`} title={r[mk] === 'Y' ? 'Submitted' : 'Not submitted'}>
                          {r[mk] === 'Y' ? '✓' : '—'}
                        </span>
                      </td>
                    ))}
                    <td className="ast-total">{rowTotal(r)}</td>
                  </tr>
                ))}
                {shown.length === 0 && (
                  <tr><td colSpan={15} className="ast-empty">{rows.length ? 'No institute matches the search.' : `No data found for ${year}.`}</td></tr>
                )}
              </tbody>
              {rows.length > 0 && (
                <tfoot>
                  <tr>
                    <td colSpan={2} className="ast-foot-lbl">Submitted ({rows.length} institutes)</td>
                    {perMonth.map((v, i) => <td key={i} className={i === curIdx ? 'is-cur' : ''}>{v}</td>)}
                    <td>{totalY}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
