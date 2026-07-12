import { useState, useEffect } from 'react';
import api from '../../services/api';

const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
  '2014-2015','2013-2014','2012-2013','2011-2012',
];

const MONTH_COLS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
const MONTH_KEYS = ['apr','may','jun','jul','aug','sep','oct','nov','dec','jan','feb','mar'];

const SECTIONS = [
  { value:'01', label:'Financial Section' },
  { value:'02', label:'Budget Section' },
  { value:'03', label:'Physical Section' },
  { value:'04', label:'Placement Section' },
];

const SECTION_KEY = { '01':'fin', '02':'bud', '03':'phy', '04':'pla' };

export default function ModifyDataPage() {
  const [year,        setYear]        = useState('');
  const [mode,        setMode]        = useState('');
  const [institutes,  setInstitutes]  = useState([]);
  const [institute,   setInstitute]   = useState('');
  const [section,     setSection]     = useState('');
  const [mprRows,     setMprRows]     = useState([]);
  const [monthStatus, setMonthStatus] = useState([]);
  const [mprLoading,  setMprLoading]  = useState(false);
  const [stLoading,   setStLoading]   = useState(false);
  const [deleting,    setDeleting]    = useState(null); // monthNum being deleted
  const [msg,         setMsg]         = useState('');

  /* Load institute list once */
  useEffect(() => {
    api.get('/admin/institutes')
      .then(r => setInstitutes(r.data?.data || []))
      .catch(() => {});
  }, []);

  /* Check Report: load MPR table when year + mode=check */
  useEffect(() => {
    if (year && mode === 'check') {
      setMprLoading(true);
      setMprRows([]);
      api.get('/reports/mpr', { params: { year } })
        .then(r => setMprRows(r.data?.data || []))
        .catch(() => setMprRows([]))
        .finally(() => setMprLoading(false));
    }
  }, [year, mode]);

  /* Load month-status when institute + section are both set in update mode */
  useEffect(() => {
    if (mode === 'update' && institute && year) {
      setStLoading(true);
      setMonthStatus([]);
      setMsg('');
      api.get('/admin/data-status', { params: { instId: institute, year } })
        .then(r => setMonthStatus(r.data?.data || []))
        .catch(() => setMonthStatus([]))
        .finally(() => setStLoading(false));
    }
  }, [mode, institute, year]);

  function handleYearChange(v) {
    setYear(v); setMode(''); setInstitute(''); setSection('');
    setMprRows([]); setMonthStatus([]); setMsg('');
  }

  function handleDelete(monthNum) {
    if (!window.confirm(`Delete ${SECTIONS.find(s=>s.value===section)?.label} data for month ${monthNum} of ${year}?`)) return;
    setDeleting(monthNum);
    setMsg('');
    const instItem = institutes.find(i => i.instId === institute);
    api.delete('/admin/data', { params: { instId: institute, year, month: monthNum, section } })
      .then(() => {
        setMsg(`✓ Deleted successfully.`);
        // refresh status
        return api.get('/admin/data-status', { params: { instId: institute, year } });
      })
      .then(r => setMonthStatus(r.data?.data || []))
      .catch(err => setMsg(`✗ Delete failed: ${err.response?.data?.message || err.message}`))
      .finally(() => setDeleting(null));
  }

  const sectionKey = SECTION_KEY[section];
  const instName = institutes.find(i => i.instId === institute)?.instName || institute;

  return (
    <div style={{ padding: '16px 20px', maxWidth: 1100 }}>
      <div className="gr-title-bar" style={{ maxWidth:'100%', marginBottom:16 }}>
        Check Report / Delete MPR
      </div>

      {/* ── Data Management Panel ── */}
      <div className="md-panel">
        <div className="md-legend">Data Management</div>

        <div className="md-row">
          <label className="md-lbl">Select Year :</label>
          <select className="lp-field md-select" value={year} onChange={e => handleYearChange(e.target.value)}>
            <option value="">-- Select --</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {year && (
          <div className="md-row md-radio-row">
            <label className="md-radio">
              <input type="radio" name="mode" value="check"
                checked={mode === 'check'} onChange={() => { setMode('check'); setInstitute(''); setSection(''); setMonthStatus([]); setMsg(''); }} />
              &nbsp; Check Report
            </label>
            <label className="md-radio" style={{ marginLeft: 24 }}>
              <input type="radio" name="mode" value="update"
                checked={mode === 'update'} onChange={() => { setMode('update'); setMprRows([]); setMsg(''); }} />
              &nbsp; Update / Delete Report
            </label>
          </div>
        )}

        {mode === 'update' && (
          <>
            <div className="md-row">
              <label className="md-lbl">Select Institute :</label>
              <select className="lp-field md-select" value={institute}
                onChange={e => { setInstitute(e.target.value); setSection(''); setMonthStatus([]); setMsg(''); }}>
                <option value="">-- Select --</option>
                {institutes.map(i => <option key={i.instId} value={i.instId}>{i.instName}</option>)}
              </select>
            </div>
            {institute && (
              <div className="md-row">
                <label className="md-lbl">Select Section :</label>
                <select className="lp-field md-select" value={section}
                  onChange={e => { setSection(e.target.value); setMsg(''); }}>
                  <option value="">-- Select --</option>
                  {SECTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            )}
          </>
        )}

        {msg && (
          <div className="md-msg" style={{ color: msg.startsWith('✓') ? '#1a7a2e' : '#c0392b' }}>
            {msg}
          </div>
        )}
      </div>

      {/* ── Check Report: MPR status table ── */}
      {mode === 'check' && (
        <div style={{ marginTop: 20 }}>
          {mprLoading && <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div>}
          {!mprLoading && mprRows.length > 0 && (
            <div className="rpt-table-wrap">
              <table className="rpt-table" cellPadding="0" cellSpacing="0">
                <thead>
                  <tr>
                    <th className="rpt-th rpt-th-ctr" style={{ width:36 }}>S.No</th>
                    <th className="rpt-th rpt-th-left" style={{ minWidth:160 }}>Institute</th>
                    {MONTH_COLS.map(m => (
                      <th key={m} className="rpt-th rpt-th-ctr rpt-th-dtm" style={{ minWidth:44 }}>{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mprRows.map((r, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                      <td className="rpt-td" style={{ textAlign:'center' }}>{idx + 1}</td>
                      <td className="rpt-td">{r.userId}</td>
                      {MONTH_KEYS.map(mk => (
                        <td key={mk} className={r[mk] === 'OK' ? 'rpt-ok' : 'rpt-not'}>{r[mk]}</td>
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

      {/* ── Update/Delete: month-by-section table ── */}
      {mode === 'update' && institute && (
        <div style={{ marginTop: 20 }}>
          {stLoading && <div className="rpt-loading"><span className="gr-spinner" /> Loading…</div>}
          {!stLoading && monthStatus.length > 0 && (
            <>
              <div style={{ marginBottom: 8, fontWeight: 600, color:'#073354' }}>
                {instName} — {year}
              </div>
              <div className="rpt-table-wrap">
                <table className="rpt-table" cellPadding="0" cellSpacing="0">
                  <thead>
                    <tr>
                      <th className="rpt-th rpt-th-ctr" style={{ width:36 }}>S.No</th>
                      <th className="rpt-th rpt-th-left" style={{ minWidth:100 }}>Month</th>
                      <th className="rpt-th rpt-th-ctr rpt-th-dtm" style={{ minWidth:90 }}>Financial</th>
                      <th className="rpt-th rpt-th-ctr rpt-th-cum" style={{ minWidth:80 }}>Budget</th>
                      <th className="rpt-th rpt-th-ctr rpt-th-dtm" style={{ minWidth:80 }}>Physical</th>
                      <th className="rpt-th rpt-th-ctr rpt-th-cum" style={{ minWidth:80 }}>Placement</th>
                      {section && <th className="rpt-th rpt-th-ctr" style={{ minWidth:80 }}>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {monthStatus.map((r, idx) => (
                      <tr key={r.month} className={idx % 2 === 0 ? 'rpt-row-even' : 'rpt-row-odd'}>
                        <td className="rpt-td" style={{ textAlign:'center' }}>{idx + 1}</td>
                        <td className="rpt-td">{r.label}</td>
                        <td className={r.fin ? 'rpt-ok' : 'rpt-not'} style={{ textAlign:'center' }}>{r.fin ? 'OK' : '—'}</td>
                        <td className={r.bud ? 'rpt-ok' : 'rpt-not'} style={{ textAlign:'center' }}>{r.bud ? 'OK' : '—'}</td>
                        <td className={r.phy ? 'rpt-ok' : 'rpt-not'} style={{ textAlign:'center' }}>{r.phy ? 'OK' : '—'}</td>
                        <td className={r.pla ? 'rpt-ok' : 'rpt-not'} style={{ textAlign:'center' }}>{r.pla ? 'OK' : '—'}</td>
                        {section && (
                          <td className="rpt-td" style={{ textAlign:'center' }}>
                            {r[sectionKey] ? (
                              <button
                                className="md-del-btn"
                                style={{ padding:'2px 10px', fontSize:11 }}
                                disabled={deleting === r.month}
                                onClick={() => handleDelete(r.month)}
                              >
                                {deleting === r.month ? '…' : 'Delete'}
                              </button>
                            ) : (
                              <span style={{ color:'#aaa', fontSize:11 }}>No data</span>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
