import { FundOutlined } from '@ant-design/icons';
import ReportSelector from '../../components/ReportSelector';

export default function BudgetReportPage() {
  return (
    <ReportSelector
      title="Budget report of MSME-AB"
      description="Budget amount, utilization and balance of every institute."
      target="/app/reports/budget/report"
      includes={[
        'Carry forward from previous year and GIA released',
        'Utilization during the month and cumulative',
        'Unspent balance of each head and in total',
      ]}
      icon={<FundOutlined />}
    />
  );
}
