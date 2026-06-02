import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023',
  '2021-2022','2020-2021','2019-2020','2018-2019','2017-2018',
  '2016-2017','2015-2016','2014-2015','2013-2014','2012-2013','2011-2012',
];

function getDefaultYear() {
  const d = new Date();
  const y = d.getFullYear();
  return d.getMonth() >= 3 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
}

export default function GraphicalReportPage() {
  const { selection } = useAuth();
  const navigate = useNavigate();

  const [institutes, setInstitutes] = useState([]);
  const [loadingInst, setLoadingInst] = useState(true);
  const [instError, setInstError] = useState(null);

  const [selectedInst, setSelectedInst] = useState('totalInstitutes');
  const [selectedYear, setSelectedYear] = useState(selection?.year || getDefaultYear());

  useEffect(() => {
    setLoadingInst(true);
    api.get('/institutes')
      .then(res => {
        setInstitutes(res.data || []);
        setInstError(null);
      })
      .catch(() => {
        setInstError('Could not load institutes. Using offline mode.');
        setInstitutes([]);
      })
      .finally(() => setLoadingInst(false));
  }, []);

  function handleGenerate(e) {
    e.preventDefault();
    const isAll = selectedInst === 'totalInstitutes';
    const instName = isAll
      ? 'Cumulative Of All Institutes'
      : (institutes.find(i => i.instId === selectedInst)?.instName || selectedInst);

    navigate('/app/reports/graphical/chart', {
      state: { instId: selectedInst, instName, year: selectedYear, isAll },
    });
  }

  return (
    <div className="gr-page">
      <div className="gr-title-bar">
        Check your monthly progress report of MSME-AB in Graphical Representation
      </div>

      {instError && (
        <div className="gr-warn">{instError}</div>
      )}

      <form onSubmit={handleGenerate} autoComplete="off">
        <table className="gr-form-tbl" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td className="gr-lbl">Institute / Tool Room</td>
              <td className="gr-inp">
                <select
                  value={selectedInst}
                  onChange={e => setSelectedInst(e.target.value)}
                  className="lp-field gr-select"
                  disabled={loadingInst}
                >
                  <option value="totalInstitutes">Cumulative Of All Institutes</option>
                  {institutes.map(inst => (
                    <option key={inst.instId} value={inst.instId}>{inst.instName}</option>
                  ))}
                </select>
                {loadingInst && <span className="gr-loading"> Loading...</span>}
              </td>
            </tr>
            <tr>
              <td className="gr-lbl">Year</td>
              <td className="gr-inp">
                <select
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                  className="lp-field gr-select"
                >
                  {YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="gr-btn-row">
                <button type="submit" className="gr-generate-btn">
                  Generate
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
