import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MONTHS = [
  { value:'1',  label:'April'     },{ value:'2',  label:'May'       },
  { value:'3',  label:'June'      },{ value:'4',  label:'July'      },
  { value:'5',  label:'August'    },{ value:'6',  label:'September' },
  { value:'7',  label:'October'   },{ value:'8',  label:'November'  },
  { value:'9',  label:'December'  },{ value:'10', label:'January'   },
  { value:'11', label:'February'  },{ value:'12', label:'March'     },
];
const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
  '2014-2015','2013-2014','2012-2013','2011-2012',
];

export default function MprReportPage() {
  const { selection } = useAuth();
  const navigate = useNavigate();
  const [month, setMonth] = useState(selection?.month || '1');
  const [year,  setYear]  = useState(selection?.year  || YEARS[0]);

  function handleGenerate(e) {
    e.preventDefault();
    const monthName = MONTHS.find(m => m.value === month)?.label || '';
    navigate('/app/reports/mpr/report', { state: {
      instId:    selection?.instId,
      instName:  selection?.instName,
      month, monthName, year,
    }});
  }

  return (
    <div className="gr-page">
      <div className="gr-title-bar">Monthly Progress Report of MSME-AB</div>
      <form onSubmit={handleGenerate} autoComplete="off">
        <table className="gr-form-tbl" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td className="gr-lbl">Institute</td>
              <td className="gr-inp">
                <input
                  className="lp-field gr-select"
                  value={selection?.instName || '(no institute selected — go to Dashboard first)'}
                  readOnly
                  style={{ background: '#f3f3f3', color: '#444', cursor: 'default' }}
                />
              </td>
            </tr>
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
                <button
                  type="submit"
                  className="gr-generate-btn"
                  disabled={!selection?.instId}
                  title={!selection?.instId ? 'Select an institute from Dashboard first' : ''}
                >
                  Generate Report
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
