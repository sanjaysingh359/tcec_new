import { ApartmentOutlined } from '@ant-design/icons';
import TraineeBreakdownReport from './TraineeBreakdownReport';

const ITEMS = [
  { label: 'General',  short: 'GEN', d: 'dtmGen', c: 'cumGen' },
  { label: 'SC',       short: 'SC',  d: 'dtmSC',  c: 'cumSC' },
  { label: 'ST',       short: 'ST',  d: 'dtmST',  c: 'cumST' },
  { label: 'OBC',      short: 'OBC', d: 'dtmOBC', c: 'cumOBC' },
  { label: 'Minority', short: 'MIN', d: 'dtmMin', c: 'cumMin' },
];

export default function CategoryWiseReport() {
  return (
    <TraineeBreakdownReport
      heading="Category-wise Trainees Trained"
      kicker="Reports · Trainees · Category"
      legacyTitle="Number of trainees trained"
      icon={<ApartmentOutlined />}
      items={ITEMS}
      apiPath="/reports/trainees/category"
      backPath="/app/reports/trainees/category"
      tableId="catTable"
      filePrefix="Category-wise"
    />
  );
}
