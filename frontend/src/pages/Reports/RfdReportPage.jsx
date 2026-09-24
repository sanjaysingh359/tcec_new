import { FileDoneOutlined } from '@ant-design/icons';
import ReportSelector from '../../components/ReportSelector';

export default function RfdReportPage() {
  return (
    <ReportSelector
      title="RFD report of MSME-AB"
      description="Results-Framework Document figures — revenue from production & training and trainee bifurcation."
      target="/app/reports/rfd/report"
      includes={[
        'Revenue from production and from training',
        'Women, SC, ST and PH trainees',
        'Long-term and short-term trainees',
        'Tooling and other job work units',
      ]}
      icon={<FileDoneOutlined />}
    />
  );
}
