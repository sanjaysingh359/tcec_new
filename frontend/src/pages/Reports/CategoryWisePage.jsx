import { TagsOutlined } from '@ant-design/icons';
import ReportSelector from '../../components/ReportSelector';

export default function CategoryWisePage() {
  return (
    <ReportSelector
      title="Category wise Trainees Trained report of MSME-AB"
      description="Trainees trained by category — GEN, SC, ST, OBC and Minority."
      target="/app/reports/trainees/category/report"
      includes={[
        'Annual trainee target of each institute',
        'Trainees by category: GEN, SC, ST, OBC, Minority',
        'During the month and cumulative up to the month, with totals',
      ]}
      icon={<TagsOutlined />}
    />
  );
}
