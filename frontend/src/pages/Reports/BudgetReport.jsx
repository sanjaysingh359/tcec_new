import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { exportToExcel } from '../../utils/reportUtils';

const MOCK_INSTITUTES = [
  'CFC Agra','CFC Aurangabad','CFC Bhiwadi','CFC Bhubaneswar','CFC Chennai',
  'CFC Coimbatore','CFC Guwahati','CFC Hyderabad','CFC Jaipur','CFC Kolkata',
  'CFC Mumbai','CFC Nagpur',
];

function rand(min, max) { return +(Math.random() * (max - min) + min).toFixed(2); }

function generateMockData() {
  return MOCK_INSTITUTES.map(name => {
    const cryAmt   = rand(50, 300);
    const cryUtlDm = rand(5, 40);
    const cryUtlCum= rand(10, cryAmt * 0.6);
    const cryBal   = +(cryAmt - cryUtlCum).toFixed(2);
    const giaAmt   = rand(100, 500);
    const giaUtlDm = rand(10, 60);
    const giaUtlCum= rand(20, giaAmt * 0.6);
    const giaBal   = +(giaAmt - giaUtlCum).toFixed(2);
    return { userId: name, cryAmt, cryUtlDm, cryUtlCum, cryBal, giaAmt, giaUtlDm, giaUtlCum, giaBal };
  });
}

export default function BudgetReport() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const { month, monthName, year } = state || {};
  const [rows, setRows]   = useState([]);
  const [demo, setDemo]   = useState(false);
  const [loading, setLoading] = useState(true);
  const tableId = 'budget-rpt-tbl';

  useEffect(() => {
    setLoading(true);
    api.get('/reports/budget', { params: { month, year } })
      .then(r => { setRows(r.data?.data || []); setDemo(false); })
      .catch(() => { setRows([]); setDemo(true); })
      .finally(() => setLoading(false));
  }, [month, year]);

  const totals = rows.reduce((acc, r) => ({
    cryAmt:   +(acc.cryAmt   + r.cryAmt).toFixed(2),
    cryUtlDm: +(acc.cryUtlDm + r.cryUtlDm).toFixed(2),
    cryUtlCum:+(acc.cryUtlCum+ r.cryUtlCum).toFixed(2),
    cryBal:   +(acc.cryBal   + r.cryBal).toFixed(2),
    giaAmt:   +(acc.giaAmt   + r.giaAmt).toFixed(2),
    giaUtlDm: +(acc.giaUtlDm + r.giaUtlDm).toFixed(2),
    giaUtlCum:+(acc.giaUtlCum+ r.giaUtlCum).toFixed(2),
    giaBal:   +(acc.giaBal   + r.giaBal).toFixed(2),
  }), { cryAmt:0,cryUtlDm:0,cryUtlCum:0,cryBal:0,giaAmt:0,giaUtlDm:0,giaUtlCum:0,giaBal:0 });

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">Budget report up to {monthName}-{year}</div>
          {demo && <div className="rpt-demo-note">⚠ Could not load report data. Please try again.</div>}
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-action-btn rpt-btn-back"  onClick={() => navigate('/app/reports/budget')}>← Back</button>
          <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
          <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel(tableId, `Budget_${monthName}_${year}.xls`)}>⬇ Export</button>
        </div>
      </div>

      {loading && <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div>}

      {!loading && (
        <div className="rpt-table-wrap">
          <table id={tableId} className="rpt-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th className="rpt-th rpt-th-ctr" rowSpan="2" style={{ width:36 }}>S.No</th>
                <th className="rpt-th rpt-th-left" rowSpan="2" style={{ minWidth:160 }}>Name of Technology Centre</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan="4">Carry Forward from Previous Year</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" colSpan="4">GIA Released During the Year</th>
                <th className="rpt-th rpt-th-ctr" rowSpan="2" style={{ minWidth:90 }}>Total Unspent Balance (A+B)</th>
              </tr>
              <tr>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Amount</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Util. During Month</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Util. Cumulative</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Unspent Bal (A)</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum">Amount</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum">Util. During Month</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum">Util. Cumulative</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum">Unspent Bal (B)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{idx + 1}</td>
                  <td className="rpt-td">{r.userId}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.cryAmt}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.cryUtlDm}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.cryUtlCum}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.cryBal}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.giaAmt}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.giaUtlDm}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.giaUtlCum}</td>
                  <td className="rpt-td" style={{ textAlign:'center' }}>{r.giaBal}</td>
                  <td className="rpt-td" style={{ textAlign:'center', fontWeight:'bold' }}>
                    {+(r.cryBal + r.giaBal).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="rpt-foot-row">
                <td className="rpt-td-total" colSpan="2" style={{ textAlign:'center' }}>Total</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{totals.cryAmt}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{totals.cryUtlDm}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{totals.cryUtlCum}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{totals.cryBal}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{totals.giaAmt}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{totals.giaUtlDm}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{totals.giaUtlCum}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>{totals.giaBal}</td>
                <td className="rpt-td-total" style={{ textAlign:'center' }}>
                  {+(totals.cryBal + totals.giaBal).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
