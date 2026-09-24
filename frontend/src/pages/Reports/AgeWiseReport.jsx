import { HourglassOutlined } from '@ant-design/icons';
import TraineeBreakdownReport from './TraineeBreakdownReport';

const ITEMS = [
  { label: 'Age 15–20', short: 'Age (15-20)', d: 'age1520', c: 'age1520C' },
  { label: 'Age 21–25', short: 'Age (21-25)', d: 'age2125', c: 'age2125C' },
  { label: 'Age 26–30', short: 'Age (26-30)', d: 'age2630', c: 'age2630C' },
  { label: 'Age 31–40', short: 'Age (31-40)', d: 'age3140', c: 'age3140C' },
  { label: 'Above 40',  short: 'Above 40',    d: 'above40', c: 'above40C' },
];

export default function AgeWiseReport() {
  return (
    <TraineeBreakdownReport
      heading="Age-wise Trainees Trained"
      kicker="Reports · Trainees · Age"
      legacyTitle="Age wise trainees trained"
      icon={<HourglassOutlined />}
      items={ITEMS}
      apiPath="/reports/trainees/age"
      backPath="/app/reports/trainees/age"
      tableId="ageTable"
      filePrefix="Age-wise"
    />
  );
}
