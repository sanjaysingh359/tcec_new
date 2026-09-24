import { TrophyOutlined } from '@ant-design/icons';
import ReportSelector from '../../components/ReportSelector';

export default function AchievementReportPage() {
  return (
    <ReportSelector
      title="Significant Achievement Report"
      description="Significant achievements reported by every institute for the month."
      target="/app/reports/achievement/report"
      includes={[
        'Every institute with its significant achievements for the month',
        'Institutes that have not submitted are marked "Not submitted"',
        'Print and Excel export',
      ]}
      icon={<TrophyOutlined />}
    />
  );
}
