import { FileTextOutlined, BankOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import ReportSelector from '../../components/ReportSelector';

const titleCase = s => s.charAt(0) + s.slice(1).toLowerCase();

export default function MprReportPage() {
  const { selection } = useAuth();
  const hasInst = !!selection?.instId;

  return (
    <ReportSelector
      title="Monthly Progress Report of MSME-AB"
      description="The complete MPR-AB of the institute for the month — sections A to P, in the official format."
      target="/app/reports/mpr/report"
      icon={<FileTextOutlined />}
      includes={[
        'A. Financial and B. Physical — target, month, cumulative and %',
        'Training activities with course-wise long term courses',
        'C–G. Trainees bifurcation (category, gender, qualification, age, PH)',
        'H–J. Budget, staff strength and machines',
        'K–P. Visits, achievements, short falls, promotion, NSQF and placement',
      ]}
      top={(
        <>
          <span className="rs2-inst-label">Institute</span>
          <div className="rs2-inst-fixed">
            <BankOutlined />
            <div>
              <b>{selection?.instName || 'No institute selected'}</b>
              <small>{hasInst ? 'Chosen at login — use “Switch month / section” to change it' : 'Go to the Dashboard and choose an institute first'}</small>
            </div>
          </div>
        </>
      )}
      subject={hasInst ? <><BankOutlined /> {selection.instName}</> : null}
      buildState={(month, monthName, year) => ({
        instId:   selection?.instId,
        instName: selection?.instName,
        month, monthName: titleCase(monthName), year,
      })}
      canGenerate={hasInst}
      blockedHint="Select an institute from the Dashboard first."
    />
  );
}
