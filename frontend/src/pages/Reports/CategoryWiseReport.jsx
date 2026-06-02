import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { exportToExcel } from '../../utils/reportUtils';

/* ── Mock data (12 institutes) ── */
const MOCK_INSTITUTES = [
  'CFC Agra','CFC Aurangabad','CFC Bhiwadi','CFC Bhubaneswar',
  'CFC Chennai','CFC Guwahati','CFC Hyderabad','CFC Indore',
  'CFC Jalandhar','CFC Kolkata','CFC Ludhiana','CFC Mumbai',
];
function makeMockRows() {
  return MOCK_INSTITUTES.map((name, i) => {
    const target  = 200 + i * 20;
    const dGen    = 30 + i * 3;
    const dSC     = 8  + i;
    const dST     = 4  + i;
    const dOBC    = 12 + i * 2;
    const dMin    = 3  + i;
    const cGen    = dGen  * 3;
    const cSC     = dSC   * 3;
    const cST     = dST   * 3;
    const cOBC    = dOBC  * 3;
    const cMin    = dMin  * 3;
    return {
      userId: name, target,
      dtmGen: dGen, dtmSC: dSC, dtmST: dST, dtmOBC: dOBC, dtmMin: dMin,
      cumGen: cGen, cumSC: cSC, cumST: cST, cumOBC: cOBC, cumMin: cMin,
      noData: false,
    };
  });
}


export default function CategoryWiseReport() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { month, monthName, year } = state || {};

  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo,    setDemo]    = useState(false);

  useEffect(() => {
    if (!month || !year) { navigate('/app/reports/trainees/category', { replace: true }); return; }
    setLoading(true);
    api.get('/reports/trainees/category', { params: { month, year } })
      .then(res => { setRows(res.data || []); setDemo(false); })
      .catch(() => { setRows(makeMockRows()); setDemo(true); })
      .finally(() => setLoading(false));
  }, [month, year, navigate]);

  if (!month) return null;

  /* Column totals */
  const tot = rows.reduce((acc, r) => {
    if (r.noData) return acc;
    acc.target  += r.target  || 0;
    acc.dtmGen  += r.dtmGen  || 0; acc.dtmSC += r.dtmSC || 0;
    acc.dtmST   += r.dtmST   || 0; acc.dtmOBC+= r.dtmOBC|| 0;
    acc.dtmMin  += r.dtmMin  || 0;
    acc.cumGen  += r.cumGen  || 0; acc.cumSC += r.cumSC || 0;
    acc.cumST   += r.cumST   || 0; acc.cumOBC+= r.cumOBC|| 0;
    acc.cumMin  += r.cumMin  || 0;
    return acc;
  }, { target:0, dtmGen:0,dtmSC:0,dtmST:0,dtmOBC:0,dtmMin:0,
       cumGen:0,cumSC:0,cumST:0,cumOBC:0,cumMin:0 });

  const dtmTotal = r => (r.dtmGen||0)+(r.dtmSC||0)+(r.dtmST||0)+(r.dtmOBC||0)+(r.dtmMin||0);
  const cumTotal = r => (r.cumGen||0)+(r.cumSC||0)+(r.cumST||0)+(r.cumOBC||0)+(r.cumMin||0);

  return (
    <div className="rpt-page">

      {/* Header bar */}
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">
            Number of trainees trained up to {monthName} {year}
          </div>
          {demo && (
            <div className="rpt-demo-note">
              📊 Sample data — backend API not yet connected
            </div>
          )}
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-action-btn rpt-btn-back"
            onClick={() => navigate('/app/reports/trainees/category')}>
            ← Back
          </button>
          <button className="rpt-action-btn rpt-btn-print"
            onClick={() => window.print()}>
            🖨 Print
          </button>
          <button className="rpt-action-btn rpt-btn-excel"
            onClick={() => exportToExcel('catTable', `Category-wise-${monthName}-${year}.xls`)}>
            ⬇ Export
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rpt-loading">
          <span className="gr-spinner" /> Loading&hellip;
        </div>
      ) : (
        <div className="rpt-table-wrap">
          <table id="catTable" className="rpt-table">
            <thead>
              <tr>
                <th rowSpan="2" className="rpt-th rpt-th-ctr" style={{width:40}}>S.No</th>
                <th rowSpan="2" className="rpt-th rpt-th-left" style={{minWidth:160}}>Name of Technology Centre</th>
                <th rowSpan="2" className="rpt-th rpt-th-ctr" style={{width:65}}>Trainee Trained<br/>(Target)</th>
                <th colSpan="6" className="rpt-th rpt-th-ctr rpt-th-dtm">During the Month</th>
                <th colSpan="6" className="rpt-th rpt-th-ctr rpt-th-cum">Up to the Month</th>
              </tr>
              <tr>
                {['GEN','SC','ST','OBC','MIN','TOTAL'].map(h => (
                  <th key={'d'+h} className="rpt-th rpt-th-ctr rpt-th-dtm">{h}</th>
                ))}
                {['GEN','SC','ST','OBC','MIN','TOTAL'].map(h => (
                  <th key={'c'+h} className="rpt-th rpt-th-ctr rpt-th-cum">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={r.noData ? 'rpt-row-nodata' : (i % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd')}>
                  <td className="rpt-td rpt-td-ctr">{i + 1}</td>
                  <td className="rpt-td rpt-td-left">
                    {r.noData && <span className="rpt-nodata-star">*</span>}
                    {r.userId}
                  </td>
                  <td className="rpt-td rpt-td-ctr">{r.target || 0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.dtmGen  || 0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.dtmSC   || 0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.dtmST   || 0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.dtmOBC  || 0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.dtmMin  || 0}</td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total">{dtmTotal(r)}</td>
                  <td className="rpt-td rpt-td-ctr">{r.cumGen  || 0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.cumSC   || 0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.cumST   || 0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.cumOBC  || 0}</td>
                  <td className="rpt-td rpt-td-ctr">{r.cumMin  || 0}</td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total">{cumTotal(r)}</td>
                </tr>
              ))}
            </tbody>
            {rows.length > 0 && (
              <tfoot>
                <tr className="rpt-foot-row">
                  <td className="rpt-td rpt-td-ctr" colSpan="2"><strong>TOTAL</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.target}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.dtmGen}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.dtmSC}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.dtmST}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.dtmOBC}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.dtmMin}</strong></td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total">
                    <strong>{tot.dtmGen+tot.dtmSC+tot.dtmST+tot.dtmOBC+tot.dtmMin}</strong>
                  </td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.cumGen}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.cumSC}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.cumST}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.cumOBC}</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{tot.cumMin}</strong></td>
                  <td className="rpt-td rpt-td-ctr rpt-td-total">
                    <strong>{tot.cumGen+tot.cumSC+tot.cumST+tot.cumOBC+tot.cumMin}</strong>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
          {rows.some(r => r.noData) && (
            <div className="rpt-nodata-legend">
              <span className="rpt-nodata-star">*</span> No record found for this technology centre.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
