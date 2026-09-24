import { ReadOutlined } from '@ant-design/icons';
import ReportSelector from '../../components/ReportSelector';

export default function QualificationWisePage() {
  return (
    <ReportSelector
      title="Qualification wise Trainees Trained report of MSME-AB"
      description="Trainees trained by qualification — from below 10th to Ph.D."
      target="/app/reports/trainees/qualification/report"
      includes={[
        'Annual trainee target of each institute',
        'Trainees by qualification: below 10th to Ph.D. / M.Phil',
        'During the month and cumulative up to the month, with totals',
      ]}
      icon={<ReadOutlined />}
    />
  );
}
