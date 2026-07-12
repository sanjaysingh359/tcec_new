import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { exportToExcel } from '../../utils/reportUtils';

const MOCK_INSTITUTES = [
  'CFC Agra','CFC Aurangabad','CFC Bhiwadi','CFC Bhubaneswar','CFC Chennai',
  'CFC Coimbatore','CFC Guwahati','CFC Hyderabad','CFC Jaipur','CFC Kolkata',
  'CFC Mumbai','CFC Nagpur',
];

function ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateMockData() {
  return MOCK_INSTITUTES.map(userId => ({
    userId,
    tooling:     ri(10, 80),
    jobWork:     ri(5, 40),
    revTraining: ri(20, 100),
    women:       ri(20, 120),
    sc:          ri(10, 60),
    st:          ri(5, 40),
    longTerm:    ri(50, 300),
    shortTerm:   ri(100, 500),
    ph:          ri(2, 25),
  }));
}

export default function RfdReport() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const { month, monthName, year } = state || {};
  const [rows, setRows]   = useState([]);
  const [demo, setDemo]   = useState(false);
  const [loading, setLoading] = useState(true);
  const tableId = 'rfd-rpt-tbl';

  useEffect(() => {
    setLoading(true);
    api.get('/reports/rfd', { params: { month, year } })
      .then(r => { setRows(r.data?.data || []); setDemo(false); })
      .catch(() => { setRows([]); setDemo(true); })
      .finally(() => setLoading(false));
  }, [month, year]);

  function sum(key) { return rows.reduce((a, r) => a + (r[key] || 0), 0); }

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">RFD Report up to {monthName}-{year}</div>
          {demo && <div className="rpt-demo-note">⚠ Could not load report data. Please try again.</div>}
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-action-btn rpt-btn-back"  onClick={() => navigate('/app/reports/rfd')}>← Back</button>
          <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
          <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel(tableId, `RFD_${monthName}_${year}.xls`)}>⬇ Export</button>
        </div>
      </div>

      {loading && <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div>}

      {!loading && (
        <div className="rpt-table-wrap">
          <table id={tableId} className="rpt-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th className="rpt-th rpt-th-ctr" rowSpan="3" style={{ width:36 }}>S.No</th>
                <th className="rpt-th rpt-th-left" rowSpan="3" style={{ minWidth:160 }}>Name of Technology Centre</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan="9">
                  RFD year {year} up to {monthName}
                </th>
              </tr>
              <tr>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan="2">Revenue from Production</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" rowSpan="2" style={{ minWidth:70 }}>Revenue from Training</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" rowSpan="2" style={{ minWidth:60 }}>No. of Women Trainee</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" rowSpan="2" style={{ minWidth:55 }}>No. of SC Trained</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" rowSpan="2" style={{ minWidth:55 }}>No. of ST Trained</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" rowSpan="2" style={{ minWidth:65 }}>Long Term Trainees</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" rowSpan="2" style={{ minWidth:65 }}>Short Term Trainees</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" rowSpan="2" style={{ minWidth:60 }}>PH Trainees</th>
              </tr>
              <tr>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Tooling</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Other Job Work</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{idx + 1}</td>
                  <td className="rpt-td">{r.userId}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.tooling}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.jobWork}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.revTraining}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.women}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.sc}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.st}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.longTerm}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.shortTerm}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.ph}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="rpt-foot-row">
                <td className="rpt-td-total" colSpan="2" style={{ textAlign:'center' }}>Total</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('tooling')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('jobWork')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('revTraining')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('women')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('sc')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('st')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('longTerm')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('shortTerm')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('ph')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
