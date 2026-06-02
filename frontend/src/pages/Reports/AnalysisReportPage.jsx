import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MONTHS = [
  { value:'1',label:'APRIL'},{ value:'2',label:'MAY'},{ value:'3',label:'JUNE'},
  { value:'4',label:'JULY'},{ value:'5',label:'AUGUST'},{ value:'6',label:'SEPTEMBER'},
  { value:'7',label:'OCTOBER'},{ value:'8',label:'NOVEMBER'},{ value:'9',label:'DECEMBER'},
  { value:'10',label:'JANUARY'},{ value:'11',label:'FEBRUARY'},{ value:'12',label:'MARCH'},
];
const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
  '2014-2015','2013-2014','2012-2013','2011-2012',
];

export default function AnalysisReportPage() {
  const { selection } = useAuth();
  const navigate = useNavigate();
  const [month, setMonth] = useState(selection?.month || '1');
  const [year,  setYear]  = useState(selection?.year  || YEARS[0]);

  function handleGenerate(e) {
    e.preventDefault();
    const monthName = MONTHS.find(m => m.value === month)?.label || '';
    navigate('/app/reports/analysis/report', { state: { month, monthName, year } });
  }

  return (
    <div className="gr-page">
      <div className="gr-title-bar">Analysis report of MSME-AB</div>
      <form onSubmit={handleGenerate} autoComplete="off">
        <table className="gr-form-tbl" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td className="gr-lbl">Month</td>
              <td className="gr-inp">
                <select value={month} onChange={e => setMonth(e.target.value)} className="lp-field gr-select">
                  {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td className="gr-lbl">Year</td>
              <td className="gr-inp">
                <select value={year} onChange={e => setYear(e.target.value)} className="lp-field gr-select">
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="gr-btn-row">
                <button type="submit" className="gr-generate-btn">Generate Report</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
