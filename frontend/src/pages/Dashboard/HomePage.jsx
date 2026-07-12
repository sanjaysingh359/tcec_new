import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  DollarOutlined, BarChartOutlined,
  UserSwitchOutlined, AimOutlined, FundOutlined,
  LineChartOutlined, PieChartOutlined, FileTextOutlined,
  TableOutlined, EditOutlined,
} from '@ant-design/icons';

const ALL_ENTRY_MODULES = [
  { key: '/app/financial',  icon: <DollarOutlined />,      label: 'Financial Section',  desc: 'Income, expenditure & financial data',  color: '#990000' },
  { key: '/app/physical',   icon: <BarChartOutlined />,    label: 'Physical Section',   desc: 'Trainee & course physical data',        color: '#073354' },
  { key: '/app/budget',     icon: <FundOutlined />,        label: 'Budget Section',     desc: 'Budget allocations & utilization',      color: '#0077aa' },
  { key: '/app/placement',  icon: <UserSwitchOutlined />,  label: 'Placement Section',  desc: 'Trainee placement records',             color: '#27673a' },
  { key: '/app/target',     icon: <AimOutlined />,         label: 'Annual Target',      desc: 'Targets for the financial year',        color: '#5b3fa0', suOnly: true },
];

// SU sees all reports; IU sees only Graphical + MPR-AB (matching old app)
const SU_REPORT_MODULES = [
  { key: '/app/reports/graphical',              icon: <LineChartOutlined />, label: 'Graphical Representation', desc: 'Visual charts & graphs',      color: '#073354' },
  { key: '/app/reports/trainees/category',      icon: <TableOutlined />,     label: 'Category Wise',            desc: 'Trainees by category',         color: '#990000' },
  { key: '/app/reports/trainees/gender',        icon: <TableOutlined />,     label: 'Gender Wise',              desc: 'Trainees by gender',           color: '#27673a' },
  { key: '/app/reports/trainees/qualification', icon: <TableOutlined />,     label: 'Qualification Wise',       desc: 'Trainees by qualification',    color: '#5b3fa0' },
  { key: '/app/reports/trainees/age',           icon: <TableOutlined />,     label: 'Age Wise',                 desc: 'Trainees by age group',        color: '#b8860b' },
  { key: '/app/reports/budget',                 icon: <FundOutlined />,      label: 'Budget Report',            desc: 'Budget details report',        color: '#0077aa' },
  { key: '/app/reports/target',                 icon: <AimOutlined />,       label: 'Target Report',            desc: 'Annual target achievement',    color: '#073354' },
  { key: '/app/reports/mpr',                    icon: <FileTextOutlined />,  label: 'MPR-AB Report',            desc: 'Monthly progress report',      color: '#990000' },
];

const IU_REPORT_MODULES = [
  { key: '/app/reports/graphical', icon: <LineChartOutlined />, label: 'Graphical Representation', desc: 'Visual charts & graphs', color: '#073354' },
  { key: '/app/reports/mpr',       icon: <FileTextOutlined />,  label: 'MPR-AB Report',            desc: 'Monthly progress report', color: '#990000' },
];

function ModuleCard({ icon, label, desc, color, onClick }) {
  return (
    <div className="hp-card" onClick={onClick}>
      <div className="hp-card-strip" style={{ background: color }} />
      <div className="hp-card-body">
        <div className="hp-card-icon" style={{ color }}>
          {icon}
        </div>
        <div className="hp-card-label">{label}</div>
        <div className="hp-card-desc">{desc}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { selection, user } = useAuth();
  const navigate = useNavigate();

  const isEntry = selection?.section === '1';
  const isSU    = user?.role === 'SU';

  let modules;
  if (isEntry) {
    modules = ALL_ENTRY_MODULES.filter(m => !m.suOnly || isSU);
  } else {
    modules = isSU ? SU_REPORT_MODULES : IU_REPORT_MODULES;
  }

  return (
    <div className="hp-root">

      {/* ── Session Info Banner ── */}
      <div className="hp-info-bar">
        <div className="hp-info-item">
          <span className="hp-info-lbl">Institute</span>
          <span className="hp-info-val">{selection?.instName || '—'}</span>
        </div>
        <div className="hp-info-sep" />
        <div className="hp-info-item">
          <span className="hp-info-lbl">Month</span>
          <span className="hp-info-val">{selection?.monthName || '—'}</span>
        </div>
        <div className="hp-info-sep" />
        <div className="hp-info-item">
          <span className="hp-info-lbl">Year</span>
          <span className="hp-info-val">{selection?.year || '—'}</span>
        </div>
        <div className="hp-info-sep" />
        <div className="hp-info-item">
          <span className="hp-info-lbl">Section</span>
          <span className="hp-info-val">{isEntry ? 'Entry Form' : 'Reports'}</span>
        </div>
        <div className="hp-info-sep" />
        <div className="hp-info-item">
          <span className="hp-info-lbl">User</span>
          <span className="hp-info-val">{user?.uid || user?.userName || '—'}</span>
        </div>
      </div>

      {/* ── Section Title ── */}
      <div className="hp-section-title">
        {isEntry ? 'Entry Form Modules' : 'Report Modules'}
      </div>

      {/* ── Module Grid ── */}
      <div className="hp-grid">
        {modules.map(({ key, ...rest }) => (
          <ModuleCard key={key} {...rest} onClick={() => navigate(key)} />
        ))}
      </div>
    </div>
  );
}
