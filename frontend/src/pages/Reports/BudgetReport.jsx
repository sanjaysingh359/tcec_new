import { WalletOutlined, BankOutlined, FallOutlined, CalendarOutlined, SafetyOutlined } from '@ant-design/icons';
import InstituteTableReport, { fmt, pct } from './InstituteTableReport';

const COLUMNS = [
  { group: 'Carry Forward from Previous Year', tone: 'd', cols: [
    { key: 'cryAmt',    label: 'Amount' },
    { key: 'cryUtlDm',  label: 'Util. During Month' },
    { key: 'cryUtlCum', label: 'Util. Cumulative' },
    { key: 'cryBal',    label: 'Unspent Bal (A)' },
  ] },
  { group: 'GIA Released During the Year', tone: 'c', cols: [
    { key: 'giaAmt',    label: 'Amount' },
    { key: 'giaUtlDm',  label: 'Util. During Month' },
    { key: 'giaUtlCum', label: 'Util. Cumulative' },
    { key: 'giaBal',    label: 'Unspent Bal (B)' },
  ] },
  { label: 'Total Unspent Balance (A+B)', value: r => (Number(r.cryBal) || 0) + (Number(r.giaBal) || 0), strong: true },
];

const tiles = t => {
  const available = t.cryAmt + t.giaAmt;
  const used = t.cryUtlCum + t.giaUtlCum;
  return [
    { icon: <BankOutlined />, label: 'Funds available', value: fmt(available), sub: `Carry fwd ${fmt(t.cryAmt)} · GIA ${fmt(t.giaAmt)}`, tone: 'blue' },
    { icon: <FallOutlined />, label: 'Utilised so far', value: fmt(used), progress: pct(used, available), sub: `${pct(used, available)}% of funds available`, tone: 'orange' },
    { icon: <CalendarOutlined />, label: 'Utilised this month', value: fmt(t.cryUtlDm + t.giaUtlDm), sub: `Carry fwd ${fmt(t.cryUtlDm)} · GIA ${fmt(t.giaUtlDm)}`, tone: 'gold' },
    { icon: <SafetyOutlined />, label: 'Unspent balance (A+B)', value: fmt(t.cryBal + t.giaBal), sub: `A ${fmt(t.cryBal)} · B ${fmt(t.giaBal)}`, tone: 'green' },
  ];
};

export default function BudgetReport() {
  return (
    <InstituteTableReport
      heading="Budget Report"
      kicker="Reports · Budget utilisation"
      icon={<WalletOutlined />}
      titleFor={(m, y) => `Budget report up to ${m}-${y}`}
      apiPath="/reports/budget"
      backPath="/app/reports/budget"
      tableId="budget-rpt-tbl"
      filePrefix="Budget"
      columns={COLUMNS}
      tiles={tiles}
    />
  );
}
