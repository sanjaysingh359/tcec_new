import { FundOutlined, RiseOutlined, WalletOutlined, LineChartOutlined, TeamOutlined, ToolOutlined } from '@ant-design/icons';
import InstituteTableReport, { fmt, pct } from './InstituteTableReport';

/* T = target, A = achievement (legacy Performance Analysis) */
const pair = (group, tone, t, a) => ({ group, tone, cols: [{ key: t, label: 'Target' }, { key: a, label: 'Achieved' }] });
const COLUMNS = [
  pair('Revenue (Rs. lakh)', 'd', 'revT', 'revA'),
  pair('Rec. Expdr. (Rs. lakh)', 'c', 'expT', 'expA'),
  pair('Surplus before Depreciation', 'd', 'surpT', 'surpA'),
  pair('Trainees Trained', 'c', 'trainT', 'trainA'),
  pair('Units Assisted', 'd', 'unitT', 'unitA'),
];

const tile = (icon, label, a, t, tone, unit = '') => {
  const p = pct(a, t);
  return {
    icon, label, tone,
    value: `${unit}${fmt(a)}`,
    progress: t > 0 ? p : null,
    good: t > 0 && p >= 100 ? 'Target met' : null,
    sub: t > 0 ? `${p >= 100 ? '' : `${p}% of `}target ${unit}${fmt(t)}` : 'No target',
  };
};

const tiles = t => [
  tile(<RiseOutlined />, 'Revenue', t.revA, t.revT, 'blue', '₹ '),
  tile(<WalletOutlined />, 'Rec. expenditure', t.expA, t.expT, 'orange', '₹ '),
  tile(<LineChartOutlined />, 'Surplus (before dep.)', t.surpA, t.surpT, t.surpA < 0 ? 'red' : 'green', '₹ '),
  tile(<TeamOutlined />, 'Trainees trained', t.trainA, t.trainT, 'aqua'),
  tile(<ToolOutlined />, 'Units assisted', t.unitA, t.unitT, 'gold'),
];

export default function AnalysisReport() {
  return (
    <InstituteTableReport
      heading="Performance Analysis"
      kicker="Reports · Target vs achievement"
      icon={<FundOutlined />}
      titleFor={(m, y) => `Performance Analysis up to ${m}-${y}`}
      apiPath="/reports/analysis"
      backPath="/app/reports/analysis"
      tableId="analysis-rpt-tbl"
      filePrefix="Analysis"
      columns={COLUMNS}
      tiles={tiles}
      unitNote="amounts in Rs. lakh"
    />
  );
}
