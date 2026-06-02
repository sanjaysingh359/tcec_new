import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { exportToExcel } from '../../utils/reportUtils';

const INST = ['CFC Agra','CFC Aurangabad','CFC Bhiwadi','CFC Bhubaneswar','CFC Chennai',
              'CFC Guwahati','CFC Hyderabad','CFC Indore','CFC Jalandhar','CFC Kolkata',
              'CFC Ludhiana','CFC Mumbai'];

function makeMock() {
  return INST.map((name, i) => ({
    userId: name, target: 200 + i * 20, noData: false,
    age1520: 40+i*2, age2125: 60+i*3, age2630: 50+i*2, age3140: 30+i, above40: 10+i,
    age1520C:(40+i*2)*3, age2125C:(60+i*3)*3, age2630C:(50+i*2)*3, age3140C:(30+i)*3, above40C:(10+i)*3,
  }));
}

const dtm = r => (r.age1520||0)+(r.age2125||0)+(r.age2630||0)+(r.age3140||0)+(r.above40||0);
const cum = r => (r.age1520C||0)+(r.age2125C||0)+(r.age2630C||0)+(r.age3140C||0)+(r.above40C||0);

export default function AgeWiseReport() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { month, monthName, year } = state || {};
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    if (!month || !year) { navigate('/app/reports/trainees/age', { replace: true }); return; }
    setLoading(true);
    api.get('/reports/trainees/age', { params: { month, year } })
      .then(res => { setRows(res.data || []); setDemo(false); })
      .catch(() => { setRows(makeMock()); setDemo(true); })
      .finally(() => setLoading(false));
  }, [month, year, navigate]);

  if (!month) return null;

  const tot = rows.reduce((a, r) => ({
    target: a.target+(r.target||0),
    age1520: a.age1520+(r.age1520||0), age2125: a.age2125+(r.age2125||0),
    age2630: a.age2630+(r.age2630||0), age3140: a.age3140+(r.age3140||0), above40: a.above40+(r.above40||0),
    age1520C: a.age1520C+(r.age1520C||0), age2125C: a.age2125C+(r.age2125C||0),
    age2630C: a.age2630C+(r.age2630C||0), age3140C: a.age3140C+(r.age3140C||0), above40C: a.above40C+(r.above40C||0),
  }), { target:0,age1520:0,age2125:0,age2630:0,age3140:0,above40:0,age1520C:0,age2125C:0,age2630C:0,age3140C:0,above40C:0 });

  const AGE_HEADERS = ['Age(15-20)','Age(21-25)','Age(26-30)','Age(31-40)','Above 40','TOTAL'];

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">Age wise trainees trained up to {monthName} {year}</div>
          {demo && <div className="rpt-demo-note">📊 Sample data — backend API not yet connected</div>}
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-action-btn rpt-btn-back" onClick={() => navigate('/app/reports/trainees/age')}>← Back</button>
          <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
          <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel('ageTable', `Age-wise-${monthName}-${year}.xls`)}>⬇ Export</button>
        </div>
      </div>

      {loading ? <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div> : (
        <div className="rpt-table-wrap">
          <table id="ageTable" className="rpt-table">
            <thead>
              <tr>
                <th rowSpan="2" className="rpt-th rpt-th-ctr" style={{width:40}}>S.No</th>
                <th rowSpan="2" className="rpt-th rpt-th-left" style={{minWidth:160}}>Name of Technology Centre</th>
                <th rowSpan="2" className="rpt-th rpt-th-ctr" style={{width:65}}>Target</th>
                <th colSpan="6" className="rpt-th rpt-th-ctr rpt-th-dtm">During the Month</th>
                <th colSpan="6" className="rpt-th rpt-th-ctr rpt-th-cum">Up to the Month</th>
              </tr>
              <tr>
                {AGE_HEADERS.map(h => <th key={'d'+h} className="rpt-th rpt-th-ctr rpt-th-dtm">{h}</th>)}
                {AGE_HEADERS.map(h => <th key={'c'+h} className="rpt-th rpt-th-ctr rpt-th-cum">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={r.noData ? 'rpt-row-nodata' : i % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td rpt-td-ctr">{i+1}</td>
                  <td className="rpt-td rpt-td-left">{r.noData && <span className="rpt-nodata-star">*</span>}{r.userId}</td>
                  <td className="rpt-td rpt-td-ctr">{r.target||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.age1520||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.age2125||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.age2630||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.age3140||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.above40||0}</td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total">{dtm(r)}</td>
                  <td className="rpt-td rpt-td-ctr">{r.age1520C||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.age2125C||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.age2630C||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.age3140C||0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.above40C||0}</td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total">{cum(r)}</td>
                </tr>
              ))}
            </tbody>
            {rows.length > 0 && (
              <tfoot>
                <tr className="rpt-foot-row">
                  <td className="rpt-td rpt-td-ctr" colSpan="2"><strong>TOTAL</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.target}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.age1520}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.age2125}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.age2630}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.age3140}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.above40}</strong></td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total"><strong>{tot.age1520+tot.age2125+tot.age2630+tot.age3140+tot.above40}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.age1520C}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.age2125C}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.age2630C}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.age3140C}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.above40C}</strong></td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total"><strong>{tot.age1520C+tot.age2125C+tot.age2630C+tot.age3140C+tot.above40C}</strong></td>
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
