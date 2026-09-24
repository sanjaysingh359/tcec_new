import { CalendarOutlined } from '@ant-design/icons';
import ReportSelector from '../../components/ReportSelector';

export default function AgeWisePage() {
  return (
    <ReportSelector
      title="Age wise Trainees Trained report of MSME-AB"
      description="Trainees trained by age group — during the month and cumulative."
      target="/app/reports/trainees/age/report"
      includes={[
        'Annual trainee target of each institute',
        'Trainees by age group: 15–20, 21–25, 26–30, 31–40, above 40',
        'During the month and cumulative up to the month, with totals',
      ]}
      icon={<CalendarOutlined />}
    />
  );
}
