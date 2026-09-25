import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import {
  TrophyOutlined, ArrowLeftOutlined, PrinterOutlined, CalendarOutlined, WarningOutlined, SearchOutlined,
} from '@ant-design/icons';
import api from '../../services/api';
import { usePrintOnlyReport } from '../../utils/reportUtils';
import { parseAch, safeHtml, isBlankHtml } from '../../utils/achievement';
import './TraineeBreakdownReport.css';
import './AchievementReport.css';

const ALL_INST = 'all';
const n = v => Number(v) || 0;

/* Numbered section heading, as on the entry form and the old report */
function Sec({ num, title, hint, children }) {
  return (
    <section className="acr-sec">
      <h3><span className="acr-num">{num}</span>{title}{hint && <small>{hint}</small>}</h3>
      {children}
    </section>
  );
}

function Rich({ html }) {
  return isBlankHtml(html)
    ? <div className="acr-box acr-empty">Nothing reported.</div>
    : <div className="acr-box" dangerouslySetInnerHTML={{ __html: safeHtml(html) }} />;
}

/* One institute's achievements — the layout of the legacy Segificant_achivements_report.jsp */
function AchievementDoc({ instName, a }) {
  const rows = (a.importRows || []).filter(r => r && (r.component || r.importedFrom || r.outcome));
  return (
    <article className="acr-doc">
      <header className="acr-doc-head">
        <h2>{instName}</h2>
        {a.note && <p className="acr-note"><b>Note:</b> {a.note}</p>}
      </header>

      <Sec num="1" title="Import Substitution & Export Support">
        <table className="acr-tbl">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Components Designed / Manufactured</th>
              <th style={{ width: '25%' }}>Imported From / Exported To</th>
              <th>Outcome (in terms of Cost / Lead time saving etc.)</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((r, i) => (
              <tr key={i}>
                <td>{r.component}</td>
                <td>{r.importedFrom}</td>
                <td>{r.outcome}</td>
              </tr>
            )) : <tr><td colSpan={3} className="acr-empty">Nothing reported.</td></tr>}
          </tbody>
        </table>
      </Sec>

      <Sec num="2" title="Technical & Production Achievements"><Rich html={a.technical} /></Sec>

      <Sec num="3" title="High-End Skilling">
        <table className="acr-tbl acr-tbl-num">
          <thead>
            <tr>
              <th>Category</th>
              <th style={{ width: 190 }}>Number of Trainees<br /><small>During the Month</small></th>
              <th style={{ width: 190 }}>Number of Trainees<br /><small>Cumulative</small></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>High-End Skilling<small>e.g. Emerging Technologies like AR/VR, 3D Printing, AI in Mfg, Robotics, IoT etc.</small></td>
              <td>{n(a.highEndDtm)}</td>
              <td>{n(a.highEndCum)}</td>
            </tr>
            <tr>
              <td>Certified Master Trainers Trained / TOT / ToA</td>
              <td>{n(a.masterDtm)}</td>
              <td>{n(a.masterCum)}</td>
            </tr>
          </tbody>
        </table>
      </Sec>

      <Sec num="4" title="MoUs" hint="(Date of Execution, Purpose, Expected Outcomes)"><Rich html={a.mous} /></Sec>
      <Sec num="5" title="Outcome of Earlier MoUs"><Rich html={a.earlierMous} /></Sec>
      <Sec num="6" title="Academia Linkages"><Rich html={a.academia} /></Sec>
      <Sec num="7" title="Awards and Recognitions"><Rich html={a.awards} /></Sec>
    </article>
  );
}

export default function AchievementReport() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const { month, year } = state || {};
  const instId   = state?.instId || ALL_INST;
  const isAll    = instId === ALL_INST;
  const instName = state?.instName || (isAll ? 'All institutes' : instId);
  const monthName = state?.monthName ? state.monthName.charAt(0) + state.monthName.slice(1).toLowerCase() : '';
  const [docs, setDocs]       = useState([]);     // [{ instName, a }]
  const [missing, setMissing] = useState([]);     // institute names without data
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [search, setSearch]   = useState('');
  usePrintOnlyReport();

  useEffect(() => {
    if (!month || !year) { navigate('/app/reports/achievement', { replace: true }); return; }
    setLoading(true); setError(false);
    const req = isAll
      ? api.get('/reports/achievement', { params: { month, year } }).then(r => {
          const rows = r.data?.data || [];
          setDocs(rows.filter(x => !x.noData).map(x => ({ instName: x.instName, a: parseAch(x.text) })));
          setMissing(rows.filter(x => x.noData).map(x => x.instName));
        })
      : api.get('/entry/achievement/load', { params: { instId, month, year } }).then(r => {
          const d = r.data?.data || {};
          setDocs(d.hasData ? [{ instName, a: parseAch(d.text) }] : []);
          setMissing(d.hasData ? [] : [instName]);
        });
    req.catch(() => { setDocs([]); setMissing([]); setError(true); })
      .finally(() => setLoading(false));
  }, [month, year, instId, isAll, instName, navigate]);

  if (!month) return null;

  const q = search.trim().toLowerCase();
  const shown = docs.filter(d => !q || d.instName.toLowerCase().includes(q));
  const total = docs.length + missing.length;

  return (
    <div className="tb-page acr-page">
      <div className="tb-print-title acr-print-title">
        Significant Achievements<br />
        <span>{isAll ? 'All institutes' : instName} — {monthName} {year}</span>
      </div>

      {/* ── Header ── */}
      <header className="tb-hero rpt-no-print">
        <span className="tb-hero-icon"><TrophyOutlined /></span>
        <div className="tb-hero-text">
          <span className="tb-kicker">Reports · Significant achievements</span>
          <h1>Significant Achievements</h1>
          <p><CalendarOutlined /> {instName} · {monthName} · FY {year}</p>
        </div>
        <div className="tb-hero-actions">
          <button className="tb-btn tb-btn-ghost" onClick={() => navigate('/app/reports/achievement')}><ArrowLeftOutlined /> Change selection</button>
          <button className="tb-btn" onClick={() => window.print()} disabled={loading || !docs.length}><PrinterOutlined /> Print</button>
        </div>
      </header>

      {error && <div className="tb-banner rpt-no-print"><WarningOutlined /> Could not load report data. Please check your connection and try again.</div>}

      {/* all-institutes view: count + search */}
      {isAll && !loading && !error && (
        <div className="acr-bar rpt-no-print">
          <span><b>{docs.length}</b> of {total} institutes submitted achievements for {monthName}</span>
          {docs.length > 1 && (
            <span className="tb-search">
              <SearchOutlined />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find institute…" aria-label="Find institute" />
            </span>
          )}
        </div>
      )}

      {loading ? <div className="tb-loading"><Spin /></div> : (
        <>
          {shown.map(d => <AchievementDoc key={d.instName} instName={d.instName} a={d.a} />)}

          {!error && !docs.length && (
            <div className="acr-doc acr-none">
              {isAll ? `No institute has submitted significant achievements for ${monthName} ${year}.`
                     : `${instName} has not submitted significant achievements for ${monthName} ${year}.`}
            </div>
          )}
          {isAll && docs.length > 0 && q && !shown.length && (
            <div className="acr-doc acr-none rpt-no-print">No institute matches “{search}”.</div>
          )}

          {isAll && missing.length > 0 && (
            <div className="acr-missing">
              <b>Not submitted ({missing.length}):</b> {missing.join(', ')}
            </div>
          )}
        </>
      )}
    </div>
  );
}
