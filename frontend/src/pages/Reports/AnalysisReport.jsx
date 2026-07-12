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
  return MOCK_INSTITUTES.map(name => {
    const revT   = ri(120, 280);
    const revA   = ri(80, revT);
    const expT   = ri(80, 200);
    const expA   = ri(50, expT);
    const surpT  = revT - expT;
    const surpA  = revA - expA;
    const trainT = ri(300, 800);
    const trainA = ri(200, trainT);
    const unitT  = ri(100, 400);
    const unitA  = ri(60, unitT);
    return { userId: name, revT, revA, expT, expA, surpT, surpA, trainT, trainA, unitT, unitA };
  });
}

export default function AnalysisReport() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const { month, monthName, year } = state || {};
  const [rows, setRows]   = useState([]);
  const [demo, setDemo]   = useState(false);
  const [loading, setLoading] = useState(true);
  const tableId = 'analysis-rpt-tbl';

  useEffect(() => {
    setLoading(true);
    api.get('/reports/analysis', { params: { month, year } })
      .then(r => { setRows(r.data?.data || []); setDemo(false); })
      .catch(() => { setRows([]); setDemo(true); })
      .finally(() => setLoading(false));
  }, [month, year]);

  function sum(key) { return rows.reduce((a, r) => a + (r[key] || 0), 0); }

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">Performance Analysis up to {monthName}-{year}</div>
          {demo && <div className="rpt-demo-note">⚠ Could not load report data. Please try again.</div>}
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-action-btn rpt-btn-back"  onClick={() => navigate('/app/reports/analysis')}>← Back</button>
          <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
          <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel(tableId, `Analysis_${monthName}_${year}.xls`)}>⬇ Export</button>
        </div>
      </div>

      {loading && <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div>}

      {!loading && (
        <div className="rpt-table-wrap">
          <table id={tableId} className="rpt-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th className="rpt-th rpt-th-ctr" rowSpan="4" style={{ width:36 }}>S.No</th>
                <th className="rpt-th rpt-th-left" rowSpan="4" style={{ minWidth:160 }}>Name of Technology Centre</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan="10">
                  Performance during year {year} up to {monthName}
                </th>
              </tr>
              <tr>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan="2">Revenue (Rs. in lakh)</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" colSpan="2">Rec. Expdr. (Rs. in lakh)</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan="2">Surplus</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" colSpan="2">Trainees Trained</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan="2">Units Assisted</th>
              </tr>
              <tr>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" rowSpan="2">T</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" rowSpan="2">A</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" rowSpan="2">T</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" rowSpan="2">A</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan="2">Before Depreciation</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" rowSpan="2">T</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" rowSpan="2">A</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" rowSpan="2">T</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" rowSpan="2">A</th>
              </tr>
              <tr>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">T</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">A</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{idx + 1}</td>
                  <td className="rpt-td">{r.userId}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.revT}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.revA}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.expT}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.expA}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.surpT}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.surpA}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.trainT}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.trainA}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.unitT}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.unitA}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="rpt-foot-row">
                <td className="rpt-td-total" colSpan="2" style={{ textAlign:'center' }}>Total</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('revT')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('revA')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('expT')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('expA')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('surpT')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('surpA')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('trainT')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('trainA')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('unitT')}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{sum('unitA')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
