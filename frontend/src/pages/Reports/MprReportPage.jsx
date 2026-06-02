import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
  '2014-2015','2013-2014','2012-2013','2011-2012',
];

export default function MprReportPage() {
  const { selection } = useAuth();
  const navigate = useNavigate();
  const [year, setYear] = useState(selection?.year || YEARS[0]);

  function handleGenerate(e) {
    e.preventDefault();
    navigate('/app/reports/mpr/report', { state: { year } });
  }

  return (
    <div className="gr-page">
      <div className="gr-title-bar">Check your monthly progress report of MSME-AB</div>
      <form onSubmit={handleGenerate} autoComplete="off">
        <table className="gr-form-tbl" cellPadding="0" cellSpacing="0">
          <tbody>
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
