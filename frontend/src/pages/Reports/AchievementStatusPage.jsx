import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { exportToExcel } from '../../utils/reportUtils';

const MONTH_COLS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
const MONTH_KEYS = ['1','2','3','4','5','6','7','8','9','10','11','12'];
const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
];

export default function AchievementStatusPage() {
  const { selection } = useAuth();
  const [year, setYear]     = useState(selection?.year || YEARS[0]);
  const [rows, setRows]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const tableId = 'ach-status-tbl';

  function handleGenerate(e) {
    e.preventDefault();
    setLoading(true); setFetched(false);
    api.get('/reports/achievement/status', { params: { year } })
      .then(r => { setRows(r.data?.data || []); setFetched(true); })
      .catch(() => { setRows([]); setFetched(true); })
      .finally(() => setLoading(false));
  }

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div className="rpt-header-title">Significant Achievement Status</div>
        {fetched && (
          <div className="rpt-header-actions">
            <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
            <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel(tableId, `AchievementStatus_${year}.xls`)}>⬇ Export</button>
          </div>
        )}
      </div>

      {/* Year selector form */}
      <div style={{ padding: '0 0 14px' }}>
        <form onSubmit={handleGenerate} autoComplete="off">
          <table className="gr-form-tbl" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td className="gr-lbl">Year</td>
                <td className="gr-inp">
                  <select value={year} onChange={e => setYear(e.target.value)} className="lp-field gr-select">
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="gr-btn-row">
                  <button type="submit" className="gr-generate-btn" disabled={loading}>
                    {loading ? 'Loading…' : 'Show Status'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      {loading && <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div>}

      {fetched && !loading && (
        <div className="rpt-table-wrap">
          <table id={tableId} className="rpt-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th className="rpt-th rpt-th-ctr" style={{ width: 40 }}>S.No</th>
                <th className="rpt-th rpt-th-left" style={{ minWidth: 180 }}>Institute</th>
                {MONTH_COLS.map(m => (
                  <th key={m} className="rpt-th rpt-th-ctr rpt-th-dtm" style={{ minWidth: 48 }}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td" style={{ textAlign: 'center' }}>{idx + 1}</td>
                  <td className="rpt-td">{r.userId}</td>
                  {MONTH_KEYS.map(mk => (
                    <td key={mk} className={r[mk] === 'Y' ? 'rpt-ok' : 'rpt-not'}>
                      {r[mk]}
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="rpt-td" colSpan={14} style={{ textAlign: 'center', color: '#999', padding: 20 }}>
                    No data found for {year}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="rpt-nodata-legend" style={{ marginTop: 8 }}>
            <span className="rpt-ok" style={{ padding:'2px 8px', borderRadius:2 }}>Y</span>
            &nbsp;= Achievement submitted &nbsp;&nbsp;
            <span className="rpt-not" style={{ padding:'2px 8px', borderRadius:2 }}>N</span>
            &nbsp;= Not submitted
          </div>
        </div>
      )}
    </div>
  );
}
