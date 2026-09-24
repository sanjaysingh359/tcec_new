import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { exportToExcel, usePrintOnlyReport } from '../../utils/reportUtils';

const YEARS = [
  '2026-2027', '2025-2026', '2024-2025', '2023-2024', '2022-2023', '2021-2022',
  '2020-2021', '2019-2020', '2018-2019', '2017-2018', '2016-2017', '2015-2016',
];

const n = v => Number(v) || 0;

/* Legacy TargetReport.jsp: all institutes' annual targets for the financial year chosen at login
   (here also switchable from the header). */
export default function TargetReport() {
  const { selection } = useAuth();
  const [year, setYear]       = useState(selection?.year || YEARS[0]);
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  usePrintOnlyReport();
  const tableId = 'target-rpt-tbl';

  useEffect(() => {
    setLoading(true); setError(false);
    api.get('/reports/target', { params: { year } })
      .then(r => setRows(r.data?.data || []))
      .catch(() => { setRows([]); setError(true); })
      .finally(() => setLoading(false));
  }, [year]);

  const withData = rows.filter(r => !r.noData);
  const sum = k => withData.reduce((s, r) => s + n(r[k]), 0);
  const tot = {
    revEarnCash: sum('revEarnCash'), revEarnAcc: sum('revEarnAcc'),
    revExpCash:  sum('revExpCash'),  revExpAcc:  sum('revExpAcc'),
    njuTarget:   sum('njuTarget'),   taTarget:   sum('taTarget'), beBudget: sum('beBudget'),
  };
  tot.incExpCash = tot.revEarnCash - tot.revExpCash;
  tot.incExpAcc  = tot.revEarnAcc  - tot.revExpAcc;
  tot.perRecCash = tot.revExpCash > 0 ? Math.floor((tot.revEarnCash * 100) / tot.revExpCash) : 0;
  tot.perRecAcc  = tot.revExpAcc  > 0 ? Math.floor((tot.revEarnAcc  * 100) / tot.revExpAcc)  : 0;

  const COLS = ['revEarnCash', 'revEarnAcc', 'revExpCash', 'revExpAcc', 'incExpCash', 'incExpAcc',
                'perRecCash', 'perRecAcc', 'njuTarget', 'taTarget', 'beBudget'];
  const neg = v => (n(v) < 0 ? { color: '#c62828' } : undefined);

  return (
    <div className="rpt-page">
      <div className="rpt-header">
        <div>
          <div className="rpt-header-title">Target report for financial year {year}</div>
          {error && <div className="rpt-demo-note">⚠ Could not load report data. Please try again.</div>}
        </div>
        <div className="rpt-header-actions">
          <select className="rpt-no-print rpt-year-select"
            value={year} onChange={e => setYear(e.target.value)} aria-label="Financial year">
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <button className="rpt-action-btn rpt-btn-print" onClick={() => window.print()}>🖨 Print</button>
          <button className="rpt-action-btn rpt-btn-excel" onClick={() => exportToExcel(tableId, `Target_Report_${year}.xls`)}>⬇ Export</button>
        </div>
      </div>

      {loading && <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div>}

      {!loading && (
        <div className="rpt-table-wrap">
          <table id={tableId} className="rpt-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th className="rpt-th rpt-th-ctr" rowSpan={2} style={{ width: 40 }}>S.No</th>
                <th className="rpt-th rpt-th-left" rowSpan={2} style={{ minWidth: 170 }}>Name of Technology Centre</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan={2}>Revenue Earning (Rs. Lakh)</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" colSpan={2}>Revenue Expenditure (Rs. Lakh)</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm" colSpan={2}>Excess of Income over Exp.</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum" colSpan={2}>%age Recovery</th>
                <th className="rpt-th rpt-th-ctr" rowSpan={2}>No. of Units</th>
                <th className="rpt-th rpt-th-ctr" rowSpan={2}>Trainees Trained</th>
                <th className="rpt-th rpt-th-ctr" rowSpan={2}>BE<br />(Rs. Lakh)</th>
              </tr>
              <tr>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Cash</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Accrual</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum">Cash</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum">Accrual</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Cash</th>
                <th className="rpt-th rpt-th-ctr rpt-th-dtm">Accrual</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum">Cash</th>
                <th className="rpt-th rpt-th-ctr rpt-th-cum">Accrual</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.instName + i} className={i % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                  <td className="rpt-td" style={{ textAlign: 'center' }}>{i + 1}</td>
                  <td className="rpt-td">
                    {r.noData && <span className="rpt-nodata-star">*</span>}
                    {r.instName}
                  </td>
                  {COLS.map(k => (
                    <td key={k} className="rpt-td" style={{ textAlign: 'center', ...neg(r[k]) }}>{n(r[k])}</td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="rpt-td" colSpan={13} style={{ textAlign: 'center', color: '#999', padding: 20 }}>
                  No institutes found.
                </td></tr>
              )}
            </tbody>
            {withData.length > 0 && (
              <tfoot>
                <tr className="rpt-foot-row">
                  <td className="rpt-td-total" colSpan={2} style={{ textAlign: 'center' }}>Total</td>
                  {COLS.map(k => (
                    <td key={k} className="rpt-td-total" style={{ textAlign: 'center', ...neg(tot[k]) }}>{tot[k]}</td>
                  ))}
                </tr>
              </tfoot>
            )}
          </table>
          {rows.some(r => r.noData) && (
            <div className="rpt-nodata-legend">
              <span className="rpt-nodata-star">*</span> No record is found for this technology centre.
            </div>
          )}
          <div className="rpt-target-note">
            <b>Note:</b> Revenue earning / expenditure are annual targets on cash and accrual basis ·
            Excess of income over expenditure = earning − expenditure ·
            %age recovery = earning ÷ expenditure × 100 · Total %age recovery is calculated from the column totals.
          </div>
        </div>
      )}
    </div>
  );
}
