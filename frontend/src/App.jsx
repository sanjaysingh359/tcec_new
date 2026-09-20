import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Dashboard/HomePage';
import GraphicalReportPage from './pages/Reports/GraphicalReportPage';
import GraphicalReportChart from './pages/Reports/GraphicalReportChart';
import CategoryWisePage from './pages/Reports/CategoryWisePage';
import CategoryWiseReport from './pages/Reports/CategoryWiseReport';
import GenderWisePage from './pages/Reports/GenderWisePage';
import GenderWiseReport from './pages/Reports/GenderWiseReport';
import QualificationWisePage from './pages/Reports/QualificationWisePage';
import QualificationWiseReport from './pages/Reports/QualificationWiseReport';
import AgeWisePage from './pages/Reports/AgeWisePage';
import AgeWiseReport from './pages/Reports/AgeWiseReport';
import BudgetReportPage from './pages/Reports/BudgetReportPage';
import BudgetReport from './pages/Reports/BudgetReport';
import MprReportPage from './pages/Reports/MprReportPage';
import MprReport from './pages/Reports/MprReport';
import AnalysisReportPage from './pages/Reports/AnalysisReportPage';
import AnalysisReport from './pages/Reports/AnalysisReport';
import RfdReportPage from './pages/Reports/RfdReportPage';
import RfdReport from './pages/Reports/RfdReport';
import FinancialPage from './pages/Financial/FinancialPage';
import PhysicalPage from './pages/Physical/PhysicalPage';
import BudgetPage from './pages/Budget/BudgetPage';
import PlacementPage from './pages/Placement/PlacementPage';
import ModifyDataPage from './pages/ModifyData/ModifyDataPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';
import TargetPage from './pages/Target/TargetPage';
import UserManagementPage from './pages/UserManagement/UserManagementPage';
import AchievementPage from './pages/Achievement/AchievementPage';
import AchievementReportPage from './pages/Reports/AchievementReportPage';
import AchievementReport from './pages/Reports/AchievementReport';
import AchievementStatusPage from './pages/Reports/AchievementStatusPage';

const antTheme = {
  token: {
    colorPrimary: '#073354',
    colorLink: '#073354',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: 13,
    borderRadius: 4,
  },
  components: {
    Menu: {
      darkItemBg: '#073354',
      darkItemHoverBg: '#0e5a94',
      darkItemSelectedBg: '#990000',
    },
    Button: {
      colorPrimary: '#073354',
    },
  },
};

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function SelectionRoute({ children }) {
  const { user, selection } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!selection) return <Navigate to="/dashboard" replace />;
  return children;
}

// Redirects non-SU users back to home
function SuRoute({ children }) {
  const { user, selection } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!selection) return <Navigate to="/dashboard" replace />;
  if (user.role !== 'SU') return <Navigate to="/app/home" replace />;
  return children;
}

// SU or RU — full report access, but not entry-only admin pages
function SuOrRuRoute({ children }) {
  const { user, selection } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!selection) return <Navigate to="/dashboard" replace />;
  if (user.role !== 'SU' && user.role !== 'RU') return <Navigate to="/app/home" replace />;
  return children;
}

export default function App() {
  return (
    <ConfigProvider theme={antTheme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            <Route
              path="/app"
              element={<SelectionRoute><MainLayout /></SelectionRoute>}
            >
              <Route index element={<Navigate to="/app/home" replace />} />
              <Route path="home" element={<HomePage />} />
              {/* Reports — accessible by both SU and IU */}
              <Route path="reports/graphical" element={<GraphicalReportPage />} />
              <Route path="reports/graphical/chart" element={<GraphicalReportChart />} />
              <Route path="reports/mpr" element={<MprReportPage />} />
              <Route path="reports/mpr/report" element={<MprReport />} />
              {/* Reports — SU or RU */}
              <Route path="reports/trainees/category" element={<SuOrRuRoute><CategoryWisePage /></SuOrRuRoute>} />
              <Route path="reports/trainees/category/report" element={<SuOrRuRoute><CategoryWiseReport /></SuOrRuRoute>} />
              <Route path="reports/trainees/gender" element={<SuOrRuRoute><GenderWisePage /></SuOrRuRoute>} />
              <Route path="reports/trainees/gender/report" element={<SuOrRuRoute><GenderWiseReport /></SuOrRuRoute>} />
              <Route path="reports/trainees/qualification" element={<SuOrRuRoute><QualificationWisePage /></SuOrRuRoute>} />
              <Route path="reports/trainees/qualification/report" element={<SuOrRuRoute><QualificationWiseReport /></SuOrRuRoute>} />
              <Route path="reports/trainees/age" element={<SuOrRuRoute><AgeWisePage /></SuOrRuRoute>} />
              <Route path="reports/trainees/age/report" element={<SuOrRuRoute><AgeWiseReport /></SuOrRuRoute>} />
              <Route path="reports/budget" element={<SuOrRuRoute><BudgetReportPage /></SuOrRuRoute>} />
              <Route path="reports/budget/report" element={<SuOrRuRoute><BudgetReport /></SuOrRuRoute>} />
              <Route path="reports/target" element={<SuOrRuRoute><div style={{ padding: 24, color: '#073354', fontWeight: 'bold' }}>Target Report — Coming Soon</div></SuOrRuRoute>} />
              <Route path="reports/analysis" element={<SuOrRuRoute><AnalysisReportPage /></SuOrRuRoute>} />
              <Route path="reports/analysis/report" element={<SuOrRuRoute><AnalysisReport /></SuOrRuRoute>} />
              <Route path="reports/rfd" element={<SuOrRuRoute><RfdReportPage /></SuOrRuRoute>} />
              <Route path="reports/rfd/report" element={<SuOrRuRoute><RfdReport /></SuOrRuRoute>} />
              <Route path="reports/achievement" element={<SuOrRuRoute><AchievementReportPage /></SuOrRuRoute>} />
              <Route path="reports/achievement/report" element={<SuOrRuRoute><AchievementReport /></SuOrRuRoute>} />
              <Route path="reports/achievement/status" element={<SuOrRuRoute><AchievementStatusPage /></SuOrRuRoute>} />
              {/* SU only — admin actions */}
              <Route path="modify-data" element={<SuRoute><ModifyDataPage /></SuRoute>} />
              <Route path="users" element={<SuRoute><UserManagementPage /></SuRoute>} />
              {/* Annual Target — SU only */}
              <Route path="target" element={<SuRoute><TargetPage /></SuRoute>} />
              {/* Contact Us */}
              <Route path="contact" element={<ContactUsPage />} />
              {/* Significant Achievement — both roles */}
              <Route path="achievement" element={<AchievementPage />} />
              {/* Entry forms — both roles */}
              <Route path="financial" element={<FinancialPage />} />
              <Route path="physical" element={<PhysicalPage />} />
              <Route path="budget" element={<BudgetPage />} />
              <Route path="placement" element={<PlacementPage />} />
              {/* Screens added one by one as we build them */}
              <Route path="*" element={
                <div style={{ padding: 24, color: '#073354', fontWeight: 'bold' }}>
                  This screen is coming soon.
                </div>
              } />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}
