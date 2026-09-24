import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import {
  ArrowLeftOutlined, PrinterOutlined, LineChartOutlined, BarChartOutlined, TableOutlined,
  RiseOutlined, FallOutlined, TeamOutlined, ToolOutlined, WalletOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, Cell,
} from 'recharts';
import api from '../../services/api';
import { usePrintOnlyReport } from '../../utils/reportUtils';
import './GraphicalReportChart.css';

const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
const MONTHS_FULL = ['April','May','June','July','August','September','October','November','December','January','February','March'];

/* Categorical slots in fixed order (validated: scripts/validate_palette.js, light, surface #fff —
   all checks pass; aqua & yellow < 3:1 → relief via hover values + Table view).
   Diverging pair (surplus ±) is blue ↔ red around a neutral zero line. */
const C = {
  revenue:  '#2a78d6',   // slot 1 blue
  expense:  '#eb6834',   // slot 2 orange
  trainees: '#1baf7a',   // slot 3 aqua
  units:    '#eda100',   // slot 4 yellow
  pos:      '#2a78d6',   // diverging +
  neg:      '#e34948',   // diverging −
};
const INK = { primary: '#0f2440', secondary: '#4a5a6c', muted: '#8a99aa', grid: '#edf1f6' };

const fmtL = v => (v == null ? '—' : Number(v).toLocaleString('en-IN', { maximumFractionDigits: 2 }));
const fmtN = v => (v == null ? '—' : Math.round(Number(v)).toLocaleString('en-IN'));
const axisTick = { fontSize: 11, fill: INK.muted };
const axisFmt = v => (Math.abs(v) >= 1000 ? `${(v / 1000).toFixed(1)}k` : v);

/* Hover tooltip — values in text ink, a colored swatch carries identity */
function Tip({ active, payload, label, unit, fmt }) {
  if (!active || !payload?.length) return null;
  const rows = payload.filter(p => p.value != null);
  if (!rows.length) return null;
  return (
    <div className="gc-tip">
      <div className="gc-tip-title">{MONTHS_FULL[MONTHS.indexOf(label)] || label}</div>
      {rows.map(p => (
        <div key={p.dataKey} className="gc-tip-row">
          <i style={{ background: p.payload?.[`${p.dataKey}Color`] || p.color || p.fill }} />
          <span>{p.name}</span>
          <b>{fmt(p.value)} <small>{unit}</small></b>
        </div>
      ))}
    </div>
  );
}

function ChartCard({ title, unit, legend, children, note }) {
  return (
    <section className="gc-card">
      <header className="gc-card-head">
        <div>
          <h3>{title}</h3>
          <span className="gc-unit">{unit}</span>
        </div>
        {legend && (
          <div className="gc-legend">
            {legend.map(l => <span key={l.label}><i style={{ background: l.color }} />{l.label}</span>)}
          </div>
        )}
      </header>
      <div className="gc-plot">{children}</div>
      {note && <div className="gc-card-note">{note}</div>}
    </section>
  );
}

export default function GraphicalReportChart() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { instId, instName, year } = state || {};
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [mode, setMode]       = useState('monthly');   // monthly | cumulative
  const [view, setView]       = useState('charts');    // charts | table
  usePrintOnlyReport();

  useEffect(() => {
    if (!instId || !year) { navigate('/app/reports/graphical', { replace: true }); return; }
    setLoading(true); setError(null);
    api.get('/reports/graphical', { params: { instId, year } })
      .then(res => {
        const r = res.data?.data;
        if (Array.isArray(r) && r.length) setRows(r); else { setRows([]); setError('nodata'); }
      })
      .catch(() => { setRows([]); setError('failed'); })
      .finally(() => setLoading(false));
  }, [instId, year, navigate]);

  if (!instId) return null;

  /* last month that has any data — cumulative lines stop there instead of falling to 0 */
  const hasData = r => ['revenue','recExpdt','surplus','trainees','unitAssisted']
    .some(k => Number(r?.[k]) !== 0 && r?.[k] != null);
  let lastIdx = -1;
  rows.forEach((r, i) => { if (hasData(r)) lastIdx = i; });
  const empty = lastIdx < 0;

  const cum = mode === 'cumulative';
  const data = MONTHS.map((m, i) => {
    const r = rows[i] || {};
    const keep = !cum || i <= lastIdx;
    const surplus = keep ? Number(cum ? r.surplusCum : r.surplus) || 0 : null;
    return {
      month: m,
      revenue:  keep ? Number(cum ? r.revenueCum : r.revenue) || 0 : null,
      expense:  keep ? Number(cum ? r.recExpdtCum : r.recExpdt) || 0 : null,
      surplus,
      surplusColor: surplus != null && surplus < 0 ? C.neg : C.pos,
      trainees: keep ? Number(cum ? r.traineesCum : r.trainees) || 0 : null,
      units:    keep ? Number(cum ? r.unitAssistedCum : r.unitAssisted) || 0 : null,
    };
  });

  const last = rows[lastIdx] || {};
  const upTo = lastIdx >= 0 ? MONTHS_FULL[lastIdx] : '—';
  const ytd = {
    revenue: Number(last.revenueCum) || 0, expense: Number(last.recExpdtCum) || 0,
    surplus: Number(last.surplusCum) || 0, trainees: Number(last.traineesCum) || 0, units: Number(last.unitAssistedCum) || 0,
  };
  const tiles = [
    { label: 'Revenue earned',       value: `₹ ${fmtL(ytd.revenue)}`, unit: 'lakh', color: C.revenue, icon: <RiseOutlined /> },
    { label: 'Rec. expenditure',     value: `₹ ${fmtL(ytd.expense)}`, unit: 'lakh', color: C.expense, icon: <WalletOutlined /> },
    { label: 'Surplus (before dep.)', value: `₹ ${fmtL(ytd.surplus)}`, unit: 'lakh', color: ytd.surplus < 0 ? C.neg : C.pos,
      icon: ytd.surplus < 0 ? <FallOutlined /> : <RiseOutlined />,
      status: ytd.surplus < 0 ? { cls: 'is-bad', text: 'Deficit' } : { cls: 'is-good', text: 'Surplus' } },
    { label: 'Trainees trained',     value: fmtN(ytd.trainees), unit: 'trainees', color: C.trainees, icon: <TeamOutlined /> },
    { label: 'Units assisted',       value: fmtN(ytd.units),    unit: 'units',    color: C.units,    icon: <ToolOutlined /> },
  ];

  const grid = <CartesianGrid vertical={false} stroke={INK.grid} />;
  const xAxis = <XAxis dataKey="month" tick={axisTick} tickLine={false} axisLine={{ stroke: '#d8e0ea' }} interval={0} />;
  const yAxis = <YAxis tick={axisTick} tickLine={false} axisLine={false} tickFormatter={axisFmt} width={46} />;
  const cursorBar = { fill: 'rgba(7,51,84,0.05)' };
  const cursorLine = { stroke: '#9fb3c8', strokeDasharray: '3 3' };
  const dot = color => ({ r: 4, fill: color, stroke: '#fff', strokeWidth: 2 });
  const H = '100%';   // plot height comes from .gc-plot (shrinks on short screens)

  const single = (key, name, color, unit, fmt) => (
    <ResponsiveContainer width="100%" height={H}>
      {cum ? (
        <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          {grid}{xAxis}{yAxis}
          <Tooltip cursor={cursorLine} content={<Tip unit={unit} fmt={fmt} />} />
          <Line type="monotone" dataKey={key} name={name} stroke={color} strokeWidth={2} dot={dot(color)} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} connectNulls={false} />
        </LineChart>
      ) : (
        <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          {grid}{xAxis}{yAxis}
          <Tooltip cursor={cursorBar} content={<Tip unit={unit} fmt={fmt} />} />
          <Bar dataKey={key} name={name} fill={color} radius={[4, 4, 0, 0]} maxBarSize={26} />
        </BarChart>
      )}
    </ResponsiveContainer>
  );

  return (
    <div className="gc-page">
      <div className="gc-print-title">Graphical Representation — {instName} — FY {year} ({cum ? 'cumulative' : 'monthly'})</div>

      {/* ── Header ── */}
      <header className="gc-hero rpt-no-print">
        <span className="gc-hero-icon"><LineChartOutlined /></span>
        <div className="gc-hero-text">
          <span className="gc-kicker">Graphical Representation · FY {year}</span>
          <h1>{instName}</h1>
          <p>Monthly progress of MSME-AB {empty ? '' : `— data up to ${upTo}`}</p>
        </div>
        <div className="gc-hero-actions">
          <div className="gc-controls">
            <div className="gc-seg" role="tablist" aria-label="Values">
              <button role="tab" aria-selected={!cum} className={!cum ? 'is-on' : ''} onClick={() => setMode('monthly')}><BarChartOutlined /> During the month</button>
              <button role="tab" aria-selected={cum} className={cum ? 'is-on' : ''} onClick={() => setMode('cumulative')}><LineChartOutlined /> Cumulative</button>
            </div>
            <div className="gc-seg" role="tablist" aria-label="View">
              <button role="tab" aria-selected={view === 'charts'} className={view === 'charts' ? 'is-on' : ''} onClick={() => setView('charts')}><BarChartOutlined /> Charts</button>
              <button role="tab" aria-selected={view === 'table'} className={view === 'table' ? 'is-on' : ''} onClick={() => setView('table')}><TableOutlined /> Table</button>
            </div>
          </div>
          <button className="gc-btn gc-btn-ghost" onClick={() => navigate('/app/reports/graphical')}><ArrowLeftOutlined /> Change selection</button>
          <button className="gc-btn" onClick={() => window.print()} disabled={loading}><PrinterOutlined /> Print</button>
        </div>
      </header>

      {loading && <div className="gc-state"><Spin /> Loading chart data…</div>}
      {!loading && (error === 'failed') && <div className="gc-banner gc-banner-warn"><InfoCircleOutlined /> Could not load chart data. Please check your connection and try again.</div>}
      {!loading && (error === 'nodata' || (!error && empty)) && <div className="gc-banner"><InfoCircleOutlined /> No data found for {instName} — FY {year}. Data may not have been entered yet.</div>}

      {!loading && !empty && (
        <>
          {/* ── Year-to-date tiles ── */}
          <div className="gc-tiles">
            {tiles.map(t => (
              <div key={t.label} className="gc-tile" style={{ '--k': t.color }}>
                <span className="gc-tile-icon">{t.icon}</span>
                <div className="gc-tile-body">
                  <div className="gc-tile-label">{t.label}</div>
                  <div className="gc-tile-value">{t.value} <small>{t.unit}</small></div>
                  <div className="gc-tile-sub">
                    up to {upTo}
                    {t.status && <span className={`gc-status ${t.status.cls}`}>{t.status.cls === 'is-bad' ? <FallOutlined /> : <RiseOutlined />} {t.status.text}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {view === 'charts' ? (
            <div className="gc-grid">
              <ChartCard title="Revenue vs recurring expenditure" unit="Rs. lakh"
                legend={[{ label: 'Revenue', color: C.revenue }, { label: 'Rec. expenditure', color: C.expense }]}>
                <ResponsiveContainer width="100%" height={H}>
                  {cum ? (
                    <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                      {grid}{xAxis}{yAxis}
                      <Tooltip cursor={cursorLine} content={<Tip unit="lakh" fmt={fmtL} />} />
                      <Line type="monotone" dataKey="revenue" name="Revenue" stroke={C.revenue} strokeWidth={2} dot={dot(C.revenue)} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} />
                      <Line type="monotone" dataKey="expense" name="Rec. expenditure" stroke={C.expense} strokeWidth={2} dot={dot(C.expense)} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} />
                    </LineChart>
                  ) : (
                    <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }} barGap={2} barCategoryGap="28%">
                      {grid}{xAxis}{yAxis}
                      <Tooltip cursor={cursorBar} content={<Tip unit="lakh" fmt={fmtL} />} />
                      <Bar dataKey="revenue" name="Revenue" fill={C.revenue} radius={[4, 4, 0, 0]} maxBarSize={18} />
                      <Bar dataKey="expense" name="Rec. expenditure" fill={C.expense} radius={[4, 4, 0, 0]} maxBarSize={18} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Surplus (before depreciation)" unit="Rs. lakh"
                legend={[{ label: 'Surplus', color: C.pos }, { label: 'Deficit', color: C.neg }]}>
                <ResponsiveContainer width="100%" height={H}>
                  <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                    {grid}{xAxis}{yAxis}
                    <ReferenceLine y={0} stroke="#9fb3c8" />
                    <Tooltip cursor={cursorBar} content={<Tip unit="lakh" fmt={fmtL} />} />
                    <Bar dataKey="surplus" name={cum ? 'Surplus (cum.)' : 'Surplus'} radius={[4, 4, 0, 0]} maxBarSize={26}>
                      {data.map((d, i) => <Cell key={i} fill={d.surplusColor} radius={d.surplus < 0 ? [0, 0, 4, 4] : [4, 4, 0, 0]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Trainees trained" unit="trainees">
                {single('trainees', cum ? 'Trainees (cum.)' : 'Trainees', C.trainees, 'trainees', fmtN)}
              </ChartCard>

              <ChartCard title="Units assisted" unit="units">
                {single('units', cum ? 'Units (cum.)' : 'Units', C.units, 'units', fmtN)}
              </ChartCard>
            </div>
          ) : (
            <section className="gc-card">
              <div className="gc-table-wrap">
                <table className="gc-table">
                  <thead>
                    <tr>
                      <th className="gc-left">Month</th>
                      <th><i style={{ background: C.revenue }} />Revenue <small>Rs. lakh</small></th>
                      <th><i style={{ background: C.expense }} />Rec. expenditure <small>Rs. lakh</small></th>
                      <th>Surplus <small>Rs. lakh</small></th>
                      <th><i style={{ background: C.trainees }} />Trainees</th>
                      <th><i style={{ background: C.units }} />Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, i) => (
                      <tr key={d.month} className={i > lastIdx ? 'is-future' : ''}>
                        <td className="gc-left">{MONTHS_FULL[i]}</td>
                        <td>{fmtL(d.revenue)}</td>
                        <td>{fmtL(d.expense)}</td>
                        <td className={d.surplus < 0 ? 'is-neg' : ''}>{fmtL(d.surplus)}</td>
                        <td>{fmtN(d.trainees)}</td>
                        <td>{fmtN(d.units)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="gc-left">Total up to {upTo}</td>
                      <td>{fmtL(ytd.revenue)}</td>
                      <td>{fmtL(ytd.expense)}</td>
                      <td className={ytd.surplus < 0 ? 'is-neg' : ''}>{fmtL(ytd.surplus)}</td>
                      <td>{fmtN(ytd.trainees)}</td>
                      <td>{fmtN(ytd.units)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
