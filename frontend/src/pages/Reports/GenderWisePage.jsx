import { ManOutlined } from '@ant-design/icons';
import ReportSelector from '../../components/ReportSelector';

export default function GenderWisePage() {
  return (
    <ReportSelector
      title="Gender wise Trainees Trained report of MSME-AB"
      description="Trainees trained by gender — Men, Women and Transgender."
      target="/app/reports/trainees/gender/report"
      includes={[
        'Annual trainee target of each institute',
        'Trainees by gender: Men, Women, Transgender',
        'During the month and cumulative up to the month, with totals',
      ]}
      icon={<ManOutlined />}
    />
  );
}
