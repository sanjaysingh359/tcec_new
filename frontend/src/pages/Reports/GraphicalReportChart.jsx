import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import api from '../../services/api';

const MONTH_LABELS = [
  'April','May','June','July','August','September',
  'October','November','December','January','February','March',
];

/* ── Mock data (used until backend API is wired up) ── */
function generateMockRows() {
  // Realistic-looking monthly values for a toolroom institute
  const dtmRevenue   = [48, 52, 61, 58, 65, 70, 63, 72, 80, 75, 85, 92];
  const dtmRecExpdt  = [42, 46, 54, 51, 57, 62, 56, 65, 72, 68, 78, 84];
  const dtmSurplus   = dtmRevenue.map((r, i) => r - dtmRecExpdt[i]);
  const dtmTrainees  = [180, 210, 195, 225, 240, 200, 215, 260, 245, 230, 270, 290];
  const dtmUnit      = [22, 26, 24, 28, 31, 27, 29, 34, 32, 30, 35, 38];

  let cumRev = 0, cumExp = 0, cumSur = 0, cumTr = 0, cumUn = 0;
  return dtmRevenue.map((_, i) => {
    cumRev += dtmRevenue[i];
    cumExp += dtmRecExpdt[i];
    cumSur += dtmSurplus[i];
    cumTr  += dtmTrainees[i];
    cumUn  += dtmUnit[i];
    return {
      revenue:         dtmRevenue[i],
      recExpdt:        dtmRecExpdt[i],
      surplus:         dtmSurplus[i],
      trainees:        dtmTrainees[i],
      unitAssisted:    dtmUnit[i],
      revenueCum:      cumRev,
      recExpdtCum:     cumExp,
      surplusCum:      cumSur,
      traineesCum:     cumTr,
      unitAssistedCum: cumUn,
    };
  });
}
const MOCK_ROWS = generateMockRows();

/* Chart colour palette — matching the original Chart.js colours */
const COLORS = {
  revenue:  '#3c9718',
  recExpdt: '#ff6300',
  surplus:  '#178c8c',
  trainees: '#1017b2',
  unit:     '#af08b9',
};

/* Build recharts-compatible data array from raw API arrays */
function buildChartData(apiData, keys) {
  // apiData is an array of row objects, one per month (up to 12)
  return apiData.map((row, i) => ({
    month: MONTH_LABELS[i],
    ...keys.reduce((acc, k) => ({ ...acc, [k]: row[k] ?? 0 }), {}),
  }));
}

/* ── Single line chart panel ── */
function ChartPanel({ title, data, dataKey, color, label, unit = '' }) {
  if (!data || data.length === 0) {
    return (
      <div className="gr-chart-panel">
        <div className="gr-chart-title">{title}</div>
        <div className="gr-chart-empty">No data available</div>
      </div>
    );
  }
  return (
    <div className="gr-chart-panel">
      <div className="gr-chart-title">{title}</div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: '#444' }}
            interval={0}
            angle={-35}
            textAnchor="end"
            height={52}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#444' }}
            tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
            allowDecimals={false}
          />
          <Tooltip
            formatter={(value) => [`${value}${unit ? ' ' + unit : ''}`, label]}
            labelStyle={{ fontWeight: 'bold', fontSize: 11 }}
            contentStyle={{ fontSize: 11 }}
          />
          <Line
            type="linear"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3, fill: color }}
            activeDot={{ r: 5 }}
            name={label}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Pair row: DTM left | CUM right ── */
function ChartPair({ dtmProps, cumProps }) {
  return (
    <div className="gr-chart-row">
      <ChartPanel {...dtmProps} />
      {cumProps && <ChartPanel {...cumProps} />}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   Main page
   ══════════════════════════════════════════════════════ */
export default function GraphicalReportChart() {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* If user lands here with no state (e.g. direct URL), bounce back */
  const { instId, instName, year, isAll } = state || {};

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!instId || !year) {
      navigate('/app/reports/graphical', { replace: true });
      return;
    }
    setLoading(true);
    setError(null);

    api.get('/reports/graphical', { params: { instId, year } })
      .then(res => {
        const rows = res.data?.data;
        if (Array.isArray(rows) && rows.length > 0) {
          setChartData(rows);
          setError(null);
        } else {
          // Year exists but no data entered yet
          setChartData([]);
          setError('nodata');
        }
      })
      .catch(() => {
        setChartData([]);
        setError('failed');
      })
      .finally(() => setLoading(false));
  }, [instId, year, navigate]);

  if (!instId) return null; // navigating away

  /* Build Recharts data arrays */
  const rows = chartData || [];
  const dtmData = buildChartData(rows, ['revenue','recExpdt','surplus','trainees','unitAssisted']);
  const cumData = buildChartData(rows, ['revenueCum','recExpdtCum','surplusCum','traineesCum','unitAssistedCum']);

  const dtmCharts = [
    { title: 'Revenue (Rs in lakh)',   dataKey: 'revenue',      color: COLORS.revenue,  label: 'Revenue',          unit: 'Rs lakh' },
    { title: 'Rec. Expenditure',       dataKey: 'recExpdt',     color: COLORS.recExpdt, label: 'Rec.Expdr',        unit: 'Rs lakh' },
    { title: 'Surplus (Before Dep.)',  dataKey: 'surplus',      color: COLORS.surplus,  label: 'Surplus',          unit: 'Rs lakh' },
    { title: 'Trainees Trained',       dataKey: 'trainees',     color: COLORS.trainees, label: 'Trainees Trained', unit: 'Nos'     },
    { title: 'Unit Assisted',          dataKey: 'unitAssisted', color: COLORS.unit,     label: 'Unit Assisted',    unit: 'Nos'     },
  ];

  const cumCharts = [
    { title: 'Revenue Cumulative (Rs in lakh)', dataKey: 'revenueCum',      color: COLORS.revenue,  label: 'Revenue Cum.',          unit: 'Rs lakh' },
    { title: 'Rec. Expenditure Cumulative',     dataKey: 'recExpdtCum',     color: COLORS.recExpdt, label: 'Rec.Expdr Cum.',        unit: 'Rs lakh' },
    { title: 'Surplus Cumulative',              dataKey: 'surplusCum',      color: COLORS.surplus,  label: 'Surplus Cum.',          unit: 'Rs lakh' },
    { title: 'Trainees Trained Cumulative',     dataKey: 'traineesCum',     color: COLORS.trainees, label: 'Trainees Trained Cum.', unit: 'Nos'     },
    { title: 'Unit Assisted Cumulative',        dataKey: 'unitAssistedCum', color: COLORS.unit,     label: 'Unit Assisted Cum.',    unit: 'Nos'     },
  ];

  return (
    <div className="gr-chart-page">

      {/* ── Title block ── */}
      <div className="gr-page-header">
        <div className="gr-inst-name">{instName}</div>
        <div className="gr-year-label">Monthly Progress Report — {year}</div>
        <button className="gr-back-btn" onClick={() => navigate('/app/reports/graphical')}>
          ← Back to Selection
        </button>
      </div>

      {/* ── Loading / Demo notice ── */}
      {loading && (
        <div className="gr-status-msg">
          <span className="gr-spinner" /> Loading chart data&hellip;
        </div>
      )}
      {error === 'nodata' && !loading && (
        <div className="gr-demo-banner">
          ℹ No data found for {instName} — {year}. Data may not have been entered yet.
        </div>
      )}
      {error === 'failed' && !loading && (
        <div className="gr-demo-banner" style={{background:'#fff3cd',borderColor:'#ffc107',color:'#856404'}}>
          ⚠ Could not load chart data. Please check your connection and try again.
        </div>
      )}

      {/* ── Column headers (always 2 columns) ── */}
      <div className="gr-col-headers">
        <div className="gr-col-hdr gr-col-hdr-dtm">During the month</div>
        <div className="gr-col-hdr gr-col-hdr-cum">Cumulative up to the month</div>
      </div>

      {/* ── Chart pairs — always 2 per row ── */}
      {dtmCharts.map((dtm, idx) => (
        <ChartPair
          key={idx}
          dtmProps={{ ...dtm,          data: loading ? [] : dtmData }}
          cumProps={{ ...cumCharts[idx], data: loading ? [] : cumData }}
        />
      ))}

    </div>
  );
}
