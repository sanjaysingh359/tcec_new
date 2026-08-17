import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { exportToExcel } from '../../utils/reportUtils';

export default function AchievementReport() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const { month, monthName, year } = state || {};
  const [rows, setRows]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);
  const tableId = 'ach-rpt-tbl';

  useEffect(() => {
    setLoading(true);
    api.get('/reports/achievement', { params: { month, year } })
      .then(r => { setRows(r.data?.data || []); setError(false); })
      .catch(() => { setRows([]); setError(true); })
      .finally(() => setLoading(false));
  }, [month, year]);

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">Significant Achievement — {monthName}-{year}</div>
          {error && <div className="rpt-demo-note">⚠ Could not load report data. Please try again.</div>}
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-action-btn rpt-btn-back"  onClick={() => navigate('/app/reports/achievement')}>← Back</button>
          <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
          <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel(tableId, `Achievement_${monthName}_${year}.xls`)}>⬇ Export</button>
        </div>
      </div>

      {loading && <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div>}

      {!loading && (
        <div className="rpt-table-wrap">
          <table id={tableId} className="rpt-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th className="rpt-th rpt-th-ctr" style={{ width: 40 }}>S.No</th>
                <th className="rpt-th rpt-th-left" style={{ minWidth: 180 }}>Name of Technology Centre</th>
                <th className="rpt-th rpt-th-left">Significant Achievements during {monthName}-{year}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td" style={{ textAlign: 'center' }}>{idx + 1}</td>
                  <td className="rpt-td">{r.instName}</td>
                  <td className="rpt-td" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {r.noData
                      ? <span style={{ color: '#999', fontStyle: 'italic' }}>Not submitted</span>
                      : r.text}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="rpt-td" colSpan={3} style={{ textAlign: 'center', color: '#999', padding: 20 }}>
                    No data found for this month and year.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
