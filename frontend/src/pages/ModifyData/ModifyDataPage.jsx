import { useState, useEffect } from 'react';
import api from '../../services/api';

const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
  '2014-2015','2013-2014','2012-2013','2011-2012',
];

const MONTH_COLS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

const SECTIONS = [
  { value:'01', label:'Financial Section' },
  { value:'02', label:'Budget Section' },
  { value:'03', label:'Physical Section' },
  { value:'04', label:'Placement Section' },
];

const MOCK_INSTITUTES = [
  'CFC Agra','CFC Aurangabad','CFC Bhiwadi','CFC Bhubaneswar','CFC Chennai',
  'CFC Coimbatore','CFC Guwahati','CFC Hyderabad','CFC Jaipur','CFC Kolkata',
  'CFC Mumbai','CFC Nagpur',
];

function generateMockStatus() {
  return MOCK_INSTITUTES.map(name => {
    const months = {};
    MONTH_COLS.forEach(m => { months[m] = Math.random() > 0.25 ? 'OK' : 'NOT'; });
    return { name, ...months };
  });
}

export default function ModifyDataPage() {
  const [year,      setYear]      = useState('');
  const [mode,      setMode]      = useState('');      // 'check' | 'update'
  const [institute, setInstitute] = useState('');
  const [section,   setSection]   = useState('');
  const [statusRows, setStatusRows] = useState([]);
  const [demo,      setDemo]      = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [msg,       setMsg]       = useState('');

  /* When year + mode=check is ready, load status */
  useEffect(() => {
    if (year && mode === 'check') {
      setLoading(true);
      api.get('/reports/mpr', { params: { year } })
        .then(r  => { setStatusRows(r.data); setDemo(false); })
        .catch(() => { setStatusRows(generateMockStatus()); setDemo(true); })
        .finally(() => setLoading(false));
    }
  }, [year, mode]);

  function handleYearChange(v) {
    setYear(v);
    setMode('');
    setInstitute('');
    setSection('');
    setStatusRows([]);
    setMsg('');
  }

  function handleDelete(e) {
    e.preventDefault();
    if (!institute || !section) { setMsg('Please select Institute and Section.'); return; }
    setMsg('Delete functionality will be available once backend is connected.');
  }

  return (
    <div style={{ padding: '16px 20px', maxWidth: 960 }}>
      <div className="gr-title-bar" style={{ maxWidth:'100%', marginBottom:16 }}>
        Check Report / Delete MPR
      </div>

      {/* ── Data Management Panel ── */}
      <div className="md-panel">
        <div className="md-legend">Data Management</div>

        <div className="md-row">
          <label className="md-lbl">Select Year :</label>
          <select
            className="lp-field md-select"
            value={year}
            onChange={e => handleYearChange(e.target.value)}
          >
            <option value="">-- Select --</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {year && (
          <div className="md-row md-radio-row">
            <label className="md-radio">
              <input type="radio" name="mode" value="check"
                checked={mode === 'check'} onChange={() => setMode('check')} />
              &nbsp; Check Report
            </label>
            <label className="md-radio" style={{ marginLeft: 24 }}>
              <input type="radio" name="mode" value="update"
                checked={mode === 'update'} onChange={() => setMode('update')} />
              &nbsp; Update / Delete Report
            </label>
          </div>
        )}

        {mode === 'update' && (
          <>
            <div className="md-row">
              <label className="md-lbl">Select Institute :</label>
              <select className="lp-field md-select" value={institute}
                onChange={e => { setInstitute(e.target.value); setMsg(''); }}>
                <option value="">-- Select --</option>
                {MOCK_INSTITUTES.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="md-row">
              <label className="md-lbl">Select Section :</label>
              <select className="lp-field md-select" value={section}
                onChange={e => { setSection(e.target.value); setMsg(''); }}>
                <option value="">-- Select --</option>
                {SECTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="md-row">
              <button className="md-del-btn" onClick={handleDelete}>Delete Record</button>
            </div>
          </>
        )}

        {msg && <div className="md-msg">{msg}</div>}
      </div>

      {/* ── Status Table ── */}
      {mode === 'check' && (
        <div style={{ marginTop: 20 }}>
          {demo && <div className="gr-demo-banner">Demo data — connect backend for live records</div>}
          {loading && <div style={{ padding: 12, color:'#073354' }}>Loading…</div>}
          {!loading && statusRows.length > 0 && (
            <div className="rpt-table-wrap">
              <table className="rpt-table" cellPadding="0" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="rpt-td" style={{ width:36, textAlign:'center' }}>S.No</th>
                    <th className="rpt-td" style={{ textAlign:'left', minWidth:160 }}>Institute</th>
                    {MONTH_COLS.map(m => (
                      <th key={m} className="rpt-th-dtm" style={{ minWidth:44 }}>{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {statusRows.map((r, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                      <td className="rpt-td" style={{ textAlign:'center' }}>{idx + 1}</td>
                      <td className="rpt-td">{r.name}</td>
                      {MONTH_COLS.map(m => (
                        <td key={m} className={r[m] === 'OK' ? 'rpt-ok' : 'rpt-not'}>{r[m]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="rpt-nodata-legend" style={{ marginTop: 8 }}>
            <span className="rpt-ok" style={{ padding:'2px 8px', borderRadius:2 }}>OK</span>
            &nbsp;= Data submitted &nbsp;&nbsp;
            <span className="rpt-not" style={{ padding:'2px 8px', borderRadius:2 }}>NOT</span>
            &nbsp;= Data not submitted
          </div>
        </div>
      )}
    </div>
  );
}
