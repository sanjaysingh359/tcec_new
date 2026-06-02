import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { exportToExcel } from '../../utils/reportUtils';

const MOCK_INSTITUTES = [
  'CFC Agra','CFC Aurangabad','CFC Bhiwadi','CFC Bhubaneswar','CFC Chennai',
  'CFC Coimbatore','CFC Guwahati','CFC Hyderabad','CFC Jaipur','CFC Kolkata',
  'CFC Mumbai','CFC Nagpur',
];
const MONTH_COLS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

function generateMockData() {
  return MOCK_INSTITUTES.map(name => {
    const months = {};
    MONTH_COLS.forEach(m => {
      months[m] = Math.random() > 0.28 ? 'OK' : 'NOT';
    });
    return { name, ...months };
  });
}

export default function MprReport() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const { year }   = state || {};
  const [rows, setRows]     = useState([]);
  const [demo, setDemo]     = useState(false);
  const [loading, setLoading] = useState(true);
  const tableId = 'mpr-rpt-tbl';

  useEffect(() => {
    setLoading(true);
    api.get('/reports/mpr', { params: { year } })
      .then(r => { setRows(r.data); setDemo(false); })
      .catch(() => { setRows(generateMockData()); setDemo(true); })
      .finally(() => setLoading(false));
  }, [year]);

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">Monthly Progress Report — {year}</div>
          {demo && <div className="rpt-demo-note">📊 Sample data — backend API not yet connected</div>}
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-action-btn rpt-btn-back"  onClick={() => navigate('/app/reports/mpr')}>← Back</button>
          <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
          <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel(tableId, `MPR_${year}.xls`)}>⬇ Export</button>
        </div>
      </div>

      {loading && <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div>}

      {!loading && (
        <div className="rpt-table-wrap">
          <table id={tableId} className="rpt-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th className="rpt-th rpt-th-ctr" style={{ width:40 }}>S.No</th>
                <th className="rpt-th rpt-th-left" style={{ minWidth:160 }}>Institute &amp; Month</th>
                {MONTH_COLS.map(m => (
                  <th key={m} className="rpt-th rpt-th-ctr rpt-th-dtm" style={{ minWidth:48 }}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{idx + 1}</td>
                  <td className="rpt-td">{r.name}</td>
                  {MONTH_COLS.map(m => (
                    <td key={m} className={r[m] === 'OK' ? 'rpt-ok' : 'rpt-not'}>
                      {r[m]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="rpt-nodata-legend" style={{ marginTop: 8 }}>
        <span className="rpt-ok" style={{ padding:'2px 8px', borderRadius:2 }}>OK</span>
        &nbsp;= Data submitted &nbsp;&nbsp;
        <span className="rpt-not" style={{ padding:'2px 8px', borderRadius:2 }}>NOT</span>
        &nbsp;= Data not submitted
      </div>
    </div>
  );
}
