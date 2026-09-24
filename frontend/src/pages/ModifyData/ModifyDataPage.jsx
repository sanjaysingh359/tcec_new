import { useState, useEffect } from 'react';
import { Select, Modal, Spin, message } from 'antd';
import {
  DatabaseOutlined, FileSearchOutlined, DeleteOutlined, BankOutlined, SearchOutlined,
  CheckCircleFilled, ExclamationCircleFilled, DollarOutlined, FundOutlined, BarChartOutlined,
  UserSwitchOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './ModifyDataPage.css';

const YEARS = [
  '2026-2027','2025-2026','2024-2025','2023-2024','2022-2023','2021-2022',
  '2020-2021','2019-2020','2018-2019','2017-2018','2016-2017','2015-2016',
  '2014-2015','2013-2014','2012-2013','2011-2012',
];

const MONTH_COLS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
const MONTH_KEYS = ['apr','may','jun','jul','aug','sep','oct','nov','dec','jan','feb','mar'];

const SECTIONS = [
  { value: '01', key: 'fin', label: 'Financial', icon: <DollarOutlined /> },
  { value: '02', key: 'bud', label: 'Budget',    icon: <FundOutlined /> },
  { value: '03', key: 'phy', label: 'Physical',  icon: <BarChartOutlined /> },
  { value: '04', key: 'pla', label: 'Placement', icon: <UserSwitchOutlined /> },
];

/* /reports/mpr cell codes */
const MPR_STATUS = {
  OK:  { cls: 'md-st-ok',  short: '✓',   label: 'Complete (Financial + Physical)' },
  A:   { cls: 'md-st-a',   short: 'Fin', label: 'Financial only' },
  B:   { cls: 'md-st-b',   short: 'Phy', label: 'Physical only' },
  NOT: { cls: 'md-st-not', short: '—',   label: 'Not submitted' },
};

export default function ModifyDataPage() {
  const { selection } = useAuth();
  const [year,        setYear]        = useState(selection?.year || YEARS[0]);
  const [mode,        setMode]        = useState('check');
  const [institutes,  setInstitutes]  = useState([]);
  const [institute,   setInstitute]   = useState('');
  const [section,     setSection]     = useState('');
  const [mprRows,     setMprRows]     = useState([]);
  const [monthStatus, setMonthStatus] = useState([]);
  const [mprLoading,  setMprLoading]  = useState(false);
  const [stLoading,   setStLoading]   = useState(false);
  const [deleting,    setDeleting]    = useState(null); // monthNum being deleted
  const [search,      setSearch]      = useState('');

  /* Load institute list once */
  useEffect(() => {
    api.get('/admin/institutes')
      .then(r => setInstitutes(r.data?.data || []))
      .catch(() => {});
  }, []);

  /* Check submissions: MPR status table for the year */
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

  /* Update / Delete: month-by-section status of the chosen institute */
  const loadStatus = () => {
    setStLoading(true);
    return api.get('/admin/data-status', { params: { instId: institute, year } })
      .then(r => setMonthStatus(r.data?.data || []))
      .catch(() => setMonthStatus([]))
      .finally(() => setStLoading(false));
  };
  useEffect(() => {
    if (mode === 'update' && institute && year) { setMonthStatus([]); loadStatus(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, institute, year]);

  const instName = institutes.find(i => i.instId === institute)?.instName || institute;
  const sec = SECTIONS.find(s => s.value === section);

  function handleDelete(row) {
    Modal.confirm({
      title: `Delete ${sec.label} data?`,
      icon: <ExclamationCircleFilled style={{ color: '#c62828' }} />,
      content: (
        <div className="md-confirm">
          <p>This permanently deletes the <b>{sec.label} Section</b> entry for:</p>
          <ul>
            <li><b>{instName}</b></li>
            <li><b>{row.label} {year}</b></li>
          </ul>
          <p>The institute will be able to fill it in again.</p>
        </div>
      ),
      okText: 'Delete',
      okButtonProps: { danger: true },
      cancelText: 'Cancel',
      onOk: () => {
        setDeleting(row.month);
        return api.delete('/admin/data', { params: { instId: institute, year, month: row.month, section } })
          .then(() => { message.success(`${sec.label} data for ${row.label} ${year} deleted.`); return loadStatus(); })
          .catch(err => message.error(`Delete failed: ${err.response?.data?.message || err.message}`))
          .finally(() => setDeleting(null));
      },
    });
  }

  /* ── Check-mode summary ── */
  const filtered = mprRows.filter(r => !search || r.userId?.toLowerCase().includes(search.toLowerCase()));
  const counts = { OK: 0, A: 0, B: 0, NOT: 0 };
  mprRows.forEach(r => MONTH_KEYS.forEach(k => { counts[r[k]] = (counts[r[k]] || 0) + 1; }));
  const monthDone = MONTH_KEYS.map(k => mprRows.filter(r => r[k] === 'OK').length);

  return (
    <div className="md-page">
      {/* ── Hero ── */}
      <header className="md-hero">
        <div>
          <span className="md-hero-kicker">Admin · Data management</span>
          <h1>Check Report / Update &amp; Delete MPR</h1>
          <p>See which institutes have submitted, and clear a month's entry so the institute can re-enter it.</p>
        </div>
        <span className="md-hero-icon"><DatabaseOutlined /></span>
      </header>

      {/* ── Controls ── */}
      <section className="md-card md-controls">
        <div className="md-tabs">
          <button className={`md-tab${mode === 'check' ? ' is-on' : ''}`} onClick={() => setMode('check')}>
            <FileSearchOutlined /> <span><b>Check submissions</b><small>All institutes, month by month</small></span>
          </button>
          <button className={`md-tab${mode === 'update' ? ' is-on' : ''}`} onClick={() => setMode('update')}>
            <DeleteOutlined /> <span><b>Update / Delete</b><small>Clear one institute's month</small></span>
          </button>
        </div>

        <div className="md-fields">
          <label className="md-field">
            <span>Financial year</span>
            <select className="md-native" value={year} onChange={e => { setYear(e.target.value); setMonthStatus([]); }}>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>

          {mode === 'update' && (
            <label className="md-field md-field-wide">
              <span>Institute</span>
              <Select
                showSearch
                size="large"
                className="md-select"
                value={institute || undefined}
                placeholder="Search institute…"
                optionFilterProp="label"
                suffixIcon={<BankOutlined />}
                onChange={v => { setInstitute(v); setSection(''); }}
                options={institutes.map(i => ({ value: i.instId, label: i.instName }))}
              />
            </label>
          )}

          {mode === 'check' && (
            <label className="md-field md-field-wide">
              <span>Find institute</span>
              <span className="md-search">
                <SearchOutlined />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Type to filter the table…" />
              </span>
            </label>
          )}
        </div>

        {mode === 'update' && institute && (
          <div className="md-sections">
            <span className="md-sections-lbl">Section to delete</span>
            {SECTIONS.map(s => (
              <button key={s.value} className={`md-chip${section === s.value ? ' is-on' : ''}`}
                onClick={() => setSection(section === s.value ? '' : s.value)}>
                {s.icon} {s.label}
              </button>
            ))}
            {!section && <span className="md-hint"><InfoCircleOutlined /> Choose a section to show Delete buttons</span>}
          </div>
        )}
      </section>

      {/* ── Check submissions ── */}
      {mode === 'check' && (
        <section className="md-card">
          <div className="md-card-head">
            <h2>Submission status — {year}</h2>
            <div className="md-legend">
              {Object.entries(MPR_STATUS).map(([k, s]) => (
                <span key={k}><i className={s.cls}>{s.short}</i>{s.label} <b>{counts[k] || 0}</b></span>
              ))}
            </div>
          </div>
          {mprLoading ? <div className="md-loading"><Spin /></div> : (
            <div className="md-table-wrap">
              <table className="md-table">
                <thead>
                  <tr>
                    <th style={{ width: 50 }}>S.No</th>
                    <th className="md-th-left">Institute</th>
                    {MONTH_COLS.map(m => <th key={m}>{m}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, idx) => (
                    <tr key={r.userId}>
                      <td className="md-num">{idx + 1}</td>
                      <td className="md-inst">{r.userId}</td>
                      {MONTH_KEYS.map(mk => {
                        const s = MPR_STATUS[r[mk]] || MPR_STATUS.NOT;
                        return <td key={mk}><span className={`md-pill ${s.cls}`} title={s.label}>{s.short}</span></td>;
                      })}
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={14} className="md-empty">{mprRows.length ? 'No institute matches the search.' : 'No data for this year.'}</td></tr>
                  )}
                </tbody>
                {mprRows.length > 0 && (
                  <tfoot>
                    <tr>
                      <td colSpan={2} className="md-foot-lbl">Complete ({mprRows.length} institutes)</td>
                      {monthDone.map((v, i) => <td key={i} className="md-foot-val">{v}</td>)}
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          )}
        </section>
      )}

      {/* ── Update / Delete ── */}
      {mode === 'update' && (
        <section className="md-card">
          {!institute ? (
            <div className="md-empty md-empty-big"><BankOutlined /> Select an institute to see its monthly data.</div>
          ) : stLoading && !monthStatus.length ? (
            <div className="md-loading"><Spin /></div>
          ) : (
            <>
              <div className="md-card-head">
                <h2>{instName} — {year}</h2>
                <div className="md-legend">
                  <span><i className="md-dot on" /> Data submitted</span>
                  <span><i className="md-dot" /> No data</span>
                </div>
              </div>
              <div className="md-months">
                {monthStatus.map(r => {
                  const has = sec && r[sec.key];
                  return (
                    <div key={r.month} className={`md-month${has ? ' is-target' : ''}`}>
                      <div className="md-month-name">{r.label}</div>
                      <ul>
                        {SECTIONS.map(s => (
                          <li key={s.key} className={s.value === section ? 'is-sel' : ''}>
                            <i className={`md-dot${r[s.key] ? ' on' : ''}`} /> {s.label}
                          </li>
                        ))}
                      </ul>
                      {sec && (has ? (
                        <button className="md-del" disabled={deleting === r.month} onClick={() => handleDelete(r)}>
                          <DeleteOutlined /> {deleting === r.month ? 'Deleting…' : `Delete ${sec.label}`}
                        </button>
                      ) : (
                        <span className="md-nodata"><CheckCircleFilled /> Nothing to delete</span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
