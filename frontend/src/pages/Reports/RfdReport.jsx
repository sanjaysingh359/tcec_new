import { ProfileOutlined, ToolOutlined, ReadOutlined, WomanOutlined, TeamOutlined, HeartOutlined } from '@ant-design/icons';
import InstituteTableReport, { fmt } from './InstituteTableReport';

const COLUMNS = [
  { group: 'Revenue from Production', tone: 'd', cols: [
    { key: 'tooling', label: 'Tooling' },
    { key: 'jobWork', label: 'Other Job Work' },
  ] },
  { key: 'revTraining', label: 'Revenue from Training' },
  { key: 'women',       label: 'No. of Women Trainee' },
  { key: 'sc',          label: 'No. of SC Trained' },
  { key: 'st',          label: 'No. of ST Trained' },
  { key: 'longTerm',    label: 'Long Term Trainees' },
  { key: 'shortTerm',   label: 'Short Term Trainees' },
  { key: 'ph',          label: 'PH Trainees' },
];

const tiles = t => [
  { icon: <ToolOutlined />, label: 'Revenue from production', value: fmt(t.tooling + t.jobWork), sub: `Tooling ${fmt(t.tooling)} · job work ${fmt(t.jobWork)}`, tone: 'blue' },
  { icon: <ReadOutlined />, label: 'Revenue from training', value: fmt(t.revTraining), sub: 'Up to the month', tone: 'orange' },
  { icon: <TeamOutlined />, label: 'Trainees (long + short)', value: fmt(t.longTerm + t.shortTerm), sub: `Long ${fmt(t.longTerm)} · short ${fmt(t.shortTerm)}`, tone: 'aqua' },
  { icon: <WomanOutlined />, label: 'Women trainees', value: fmt(t.women), sub: 'Up to the month', tone: 'purple' },
  { icon: <HeartOutlined />, label: 'SC · ST · PH trained', value: `${fmt(t.sc)} · ${fmt(t.st)} · ${fmt(t.ph)}`, sub: 'Up to the month', tone: 'gold' },
];

export default function RfdReport() {
  return (
    <InstituteTableReport
      heading="RFD Report"
      kicker="Reports · Results-Framework Document"
      icon={<ProfileOutlined />}
      titleFor={(m, y) => `RFD Report up to ${m}-${y}`}
      apiPath="/reports/rfd"
      backPath="/app/reports/rfd"
      tableId="rfd-rpt-tbl"
      filePrefix="RFD"
      columns={COLUMNS}
      tiles={tiles}
    />
  );
}
