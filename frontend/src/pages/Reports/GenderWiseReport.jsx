import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { exportToExcel } from '../../utils/reportUtils';

const INST = ['CFC Agra','CFC Aurangabad','CFC Bhiwadi','CFC Bhubaneswar','CFC Chennai',
              'CFC Guwahati','CFC Hyderabad','CFC Indore','CFC Jalandhar','CFC Kolkata',
              'CFC Ludhiana','CFC Mumbai'];

function makeMock() {
  return INST.map((name, i) => ({
    userId: name, target: 200 + i * 20,
    dtmMen: 120 + i * 5, dtmWomen: 50 + i * 3, dtmTrans: i % 3,
    cumMen: (120 + i * 5) * 3, cumWomen: (50 + i * 3) * 3, cumTrans: (i % 3) * 3,
    noData: false,
  }));
}

const dtm = r => (r.dtmMen||0) + (r.dtmWomen||0) + (r.dtmTrans||0);
const cum = r => (r.cumMen||0) + (r.cumWomen||0) + (r.cumTrans||0);

export default function GenderWiseReport() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { month, monthName, year } = state || {};
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    if (!month || !year) { navigate('/app/reports/trainees/gender', { replace: true }); return; }
    setLoading(true);
    api.get('/reports/trainees/gender', { params: { month, year } })
      .then(res => { setRows(res.data?.data || []); setDemo(false); })
      .catch(() => { setRows([]); setDemo(true); })
      .finally(() => setLoading(false));
  }, [month, year, navigate]);

  if (!month) return null;

  const tot = rows.reduce((a, r) => ({
    target: a.target + (r.target||0),
    dtmMen: a.dtmMen + (r.dtmMen||0), dtmWomen: a.dtmWomen + (r.dtmWomen||0), dtmTrans: a.dtmTrans + (r.dtmTrans||0),
    cumMen: a.cumMen + (r.cumMen||0), cumWomen: a.cumWomen + (r.cumWomen||0), cumTrans: a.cumTrans + (r.cumTrans||0),
  }), { target:0, dtmMen:0, dtmWomen:0, dtmTrans:0, cumMen:0, cumWomen:0, cumTrans:0 });

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">Gender wise trainees trained up to {monthName} {year}</div>
          {demo && <div className="rpt-demo-note">⚠ Could not load report data. Please try again.</div>}
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-action-btn rpt-btn-back" onClick={() => navigate('/app/reports/trainees/gender')}>← Back</button>
          <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
          <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel('genderTable', `Gender-wise-${monthName}-${year}.xls`)}>⬇ Export</button>
        </div>
      </div>

      {loading ? <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div> : (
        <div className="rpt-table-wrap">
          <table id="genderTable" className="rpt-table">
            <thead>
              <tr>
                <th rowSpan="2" className="rpt-th rpt-th-ctr" style={{width:40}}>S.No</th>
                <th rowSpan="2" className="rpt-th rpt-th-left" style={{minWidth:160}}>Name of Technology Centre</th>
                <th rowSpan="2" className="rpt-th rpt-th-ctr" style={{width:65}}>Target</th>
                <th colSpan="4" className="rpt-th rpt-th-ctr rpt-th-dtm">During the Month</th>
                <th colSpan="4" className="rpt-th rpt-th-ctr rpt-th-cum">Up to the Month</th>
              </tr>
              <tr>
                {['MEN','WOMEN','TRANSGENDER','TOTAL'].map(h => <th key={'d'+h} className="rpt-th rpt-th-ctr rpt-th-dtm">{h}</th>)}
                {['MEN','WOMEN','TRANSGENDER','TOTAL'].map(h => <th key={'c'+h} className="rpt-th rpt-th-ctr rpt-th-cum">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={r.noData ? 'rpt-row-nodata' : i % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td rpt-td-ctr">{i+1}</td>
                  <td className="rpt-td rpt-td-left">{r.noData && <span className="rpt-nodata-star">*</span>}{r.userId}</td>
                  <td className="rpt-td rpt-td-ctr">{r.target||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.dtmMen||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.dtmWomen||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.dtmTrans||0}</td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total">{dtm(r)}</td>
                  <td className="rpt-td rpt-td-ctr">{r.cumMen||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.cumWomen||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.cumTrans||0}</td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total">{cum(r)}</td>
                </tr>
              ))}
            </tbody>
            {rows.length > 0 && (
              <tfoot>
                <tr className="rpt-foot-row">
                  <td className="rpt-td rpt-td-ctr" colSpan="2"><strong>TOTAL</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.target}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.dtmMen}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.dtmWomen}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.dtmTrans}</strong></td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total"><strong>{tot.dtmMen+tot.dtmWomen+tot.dtmTrans}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.cumMen}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.cumWomen}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.cumTrans}</strong></td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total"><strong>{tot.cumMen+tot.cumWomen+tot.cumTrans}</strong></td>
                </tr>
              </tfoot>
            )}
          </table>
          {rows.some(r => r.noData) && <div className="rpt-nodata-legend"><span className="rpt-nodata-star">*</span> No record found for this technology centre.</div>}
        </div>
      )}
    </div>
  );
}
