import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { exportToExcel } from '../../utils/reportUtils';

const INST = ['CFC Agra','CFC Aurangabad','CFC Bhiwadi','CFC Bhubaneswar','CFC Chennai',
              'CFC Guwahati','CFC Hyderabad','CFC Indore','CFC Jalandhar','CFC Kolkata',
              'CFC Ludhiana','CFC Mumbai'];

const QUAL_KEYS_DTM = ['tenfail','tenpass','twelth','ITI','Diploma','GradTech','GradNonTech','PGTech','PGNonTech','Phd'];
const QUAL_KEYS_CUM = ['tenfailC','tenpassC','twelthC','ITIC','DiplomaC','GradTechC','GradNonTechC','PGTechC','PGNonTechC','PhdC'];
const QUAL_HEADERS  = ['10th Dropout/Below','10th Pass','12th Pass','ITI','Diploma','Grad(Tech)','Grad(Non-Tech)','PG(Tech)','PG(Non-Tech)','PhD/MPhil','TOTAL'];

function makeMock() {
  return INST.map((name, i) => {
    const base = [10+i,15+i,20+i,25+i,18+i,12+i,8+i,5+i,3+i,1];
    const row = { userId: name, target: 200 + i * 20, noData: false };
    QUAL_KEYS_DTM.forEach((k, j) => { row[k] = base[j]; });
    QUAL_KEYS_CUM.forEach((k, j) => { row[k] = base[j] * 3; });
    return row;
  });
}

const sumKeys = (r, keys) => keys.reduce((s, k) => s + (r[k] || 0), 0);

export default function QualificationWiseReport() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { month, monthName, year } = state || {};
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    if (!month || !year) { navigate('/app/reports/trainees/qualification', { replace: true }); return; }
    setLoading(true);
    api.get('/reports/trainees/qualification', { params: { month, year } })
      .then(res => { setRows(res.data || []); setDemo(false); })
      .catch(() => { setRows(makeMock()); setDemo(true); })
      .finally(() => setLoading(false));
  }, [month, year, navigate]);

  if (!month) return null;

  const totals = { target: 0 };
  [...QUAL_KEYS_DTM, ...QUAL_KEYS_CUM].forEach(k => { totals[k] = 0; });
  rows.forEach(r => {
    if (!r.noData) {
      totals.target += r.target || 0;
      [...QUAL_KEYS_DTM, ...QUAL_KEYS_CUM].forEach(k => { totals[k] += r[k] || 0; });
    }
  });

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">Qualification wise trainees trained up to {monthName} {year}</div>
          {demo && <div className="rpt-demo-note">📊 Sample data — backend API not yet connected</div>}
        </div>
        <div className="rpt-header-actions">
          <button className="rpt-action-btn rpt-btn-back" onClick={() => navigate('/app/reports/trainees/qualification')}>← Back</button>
          <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
          <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel('qualTable', `Qualification-wise-${monthName}-${year}.xls`)}>⬇ Export</button>
        </div>
      </div>

      {loading ? <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div> : (
        <div className="rpt-table-wrap">
          <table id="qualTable" className="rpt-table">
            <thead>
              <tr>
                <th rowSpan="2" className="rpt-th rpt-th-ctr" style={{width:40}}>S.No</th>
                <th rowSpan="2" className="rpt-th rpt-th-left" style={{minWidth:150}}>Name of Technology Centre</th>
                <th rowSpan="2" className="rpt-th rpt-th-ctr" style={{width:60}}>Target</th>
                <th colSpan="11" className="rpt-th rpt-th-ctr rpt-th-dtm">During the Month</th>
                <th colSpan="11" className="rpt-th rpt-th-ctr rpt-th-cum">Up to the Month</th>
              </tr>
              <tr>
                {QUAL_HEADERS.map(h => <th key={'d'+h} className="rpt-th rpt-th-ctr rpt-th-dtm" style={{fontSize:10,minWidth:55}}>{h}</th>)}
                {QUAL_HEADERS.map(h => <th key={'c'+h} className="rpt-th rpt-th-ctr rpt-th-cum" style={{fontSize:10,minWidth:55}}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={r.noData ? 'rpt-row-nodata' : i % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td rpt-td-ctr">{i+1}</td>
                  <td className="rpt-td rpt-td-left">{r.noData && <span className="rpt-nodata-star">*</span>}{r.userId}</td>
                  <td className="rpt-td rpt-td-ctr">{r.target||0}</td>
                  {QUAL_KEYS_DTM.map(k => <td key={'d'+k} className="rpt-td rpt-td-ctr">{r[k]||0}</td>)}
                  <td className="rpt-td rpt-td-ctr rpt-td-total">{sumKeys(r, QUAL_KEYS_DTM)}</td>
                  {QUAL_KEYS_CUM.map(k => <td key={'c'+k} className="rpt-td rpt-td-ctr">{r[k]||0}</td>)}
                  <td className="rpt-td rpt-td-ctr rpt-td-total">{sumKeys(r, QUAL_KEYS_CUM)}</td>
                </tr>
              ))}
            </tbody>
            {rows.length > 0 && (
              <tfoot>
                <tr className="rpt-foot-row">
                  <td className="rpt-td rpt-td-ctr" colSpan="2"><strong>TOTAL</strong></td>
                  <td className="rpt-td rpt-td-ctr"><strong>{totals.target}</strong></td>
                  {QUAL_KEYS_DTM.map(k => <td key={'dt'+k} className="rpt-td rpt-td-ctr"><strong>{totals[k]}</strong></td>)}
                  <td className="rpt-td rpt-td-ctr rpt-td-total"><strong>{sumKeys(totals, QUAL_KEYS_DTM)}</strong></td>
                  {QUAL_KEYS_CUM.map(k => <td key={'ct'+k} className="rpt-td rpt-td-ctr"><strong>{totals[k]}</strong></td>)}
                  <td className="rpt-td rpt-td-ctr rpt-td-total"><strong>{sumKeys(totals, QUAL_KEYS_CUM)}</strong></td>
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
