import { UserSwitchOutlined } from '@ant-design/icons';
import TraineeBreakdownReport from './TraineeBreakdownReport';

const ITEMS = [
  { label: 'Men',         short: 'MEN',         d: 'dtmMen',   c: 'cumMen' },
  { label: 'Women',       short: 'WOMEN',       d: 'dtmWomen', c: 'cumWomen' },
  { label: 'Transgender', short: 'TRANSGENDER', d: 'dtmTrans', c: 'cumTrans' },
];

export default function GenderWiseReport() {
  return (
    <TraineeBreakdownReport
      heading="Gender-wise Trainees Trained"
      kicker="Reports · Trainees · Gender"
      legacyTitle="Gender wise trainees trained"
      icon={<UserSwitchOutlined />}
      items={ITEMS}
      apiPath="/reports/trainees/gender"
      backPath="/app/reports/trainees/gender"
      tableId="genderTable"
      filePrefix="Gender-wise"
    />
  );
}
