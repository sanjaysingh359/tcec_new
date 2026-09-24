import { ReadOutlined } from '@ant-design/icons';
import TraineeBreakdownReport from './TraineeBreakdownReport';

const ITEMS = [
  { label: '10th dropout / below', short: '10th Dropout/Below', d: 'tenfail',     c: 'tenfailC' },
  { label: '10th pass',            short: '10th Pass',          d: 'tenpass',     c: 'tenpassC' },
  { label: '12th pass',            short: '12th Pass',          d: 'twelth',      c: 'twelthC' },
  { label: 'ITI',                  short: 'ITI',                d: 'ITI',         c: 'ITIC' },
  { label: 'Diploma',              short: 'Diploma',            d: 'Diploma',     c: 'DiplomaC' },
  { label: 'Graduate (tech)',      short: 'Grad (Tech)',        d: 'GradTech',    c: 'GradTechC' },
  { label: 'Graduate (non-tech)',  short: 'Grad (Non-Tech)',    d: 'GradNonTech', c: 'GradNonTechC' },
  { label: 'PG (tech)',            short: 'PG (Tech)',          d: 'PGTech',      c: 'PGTechC' },
  { label: 'PG (non-tech)',        short: 'PG (Non-Tech)',      d: 'PGNonTech',   c: 'PGNonTechC' },
  { label: 'PhD / MPhil',          short: 'PhD/ MPhil',         d: 'Phd',         c: 'PhdC' },
];

export default function QualificationWiseReport() {
  return (
    <TraineeBreakdownReport
      heading="Qualification-wise Trainees Trained"
      kicker="Reports · Trainees · Qualification"
      legacyTitle="Qualification wise trainees trained"
      icon={<ReadOutlined />}
      items={ITEMS}
      apiPath="/reports/trainees/qualification"
      backPath="/app/reports/trainees/qualification"
      tableId="qualTable"
      filePrefix="Qualification-wise"
    />
  );
}
