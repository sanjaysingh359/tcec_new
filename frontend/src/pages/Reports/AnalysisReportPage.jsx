import { PieChartOutlined } from '@ant-design/icons';
import ReportSelector from '../../components/ReportSelector';

export default function AnalysisReportPage() {
  return (
    <ReportSelector
      title="Analysis report of MSME-AB"
      description="Revenue, expenditure, surplus, trainees and units — targets vs achievement up to the month."
      target="/app/reports/analysis/report"
      includes={[
        'Revenue and revenue expenditure — target vs achievement',
        'Surplus (before depreciation)',
        'Trainees trained and units assisted — target vs achievement',
        'Institutes without complete data marked *',
      ]}
      icon={<PieChartOutlined />}
    />
  );
}
