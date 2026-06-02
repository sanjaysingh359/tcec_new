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
import ModifyDataPage from './pages/ModifyData/ModifyDataPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';

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
              {/* Reports */}
              <Route path="reports/graphical" element={<GraphicalReportPage />} />
              <Route path="reports/graphical/chart" element={<GraphicalReportChart />} />
              <Route path="reports/trainees/category" element={<CategoryWisePage />} />
              <Route path="reports/trainees/category/report" element={<CategoryWiseReport />} />
              <Route path="reports/trainees/gender" element={<GenderWisePage />} />
              <Route path="reports/trainees/gender/report" element={<GenderWiseReport />} />
              <Route path="reports/trainees/qualification" element={<QualificationWisePage />} />
              <Route path="reports/trainees/qualification/report" element={<QualificationWiseReport />} />
              <Route path="reports/trainees/age" element={<AgeWisePage />} />
              <Route path="reports/trainees/age/report" element={<AgeWiseReport />} />
              {/* Budget */}
              <Route path="reports/budget" element={<BudgetReportPage />} />
              <Route path="reports/budget/report" element={<BudgetReport />} />
              {/* MPR-AB */}
              <Route path="reports/mpr" element={<MprReportPage />} />
              <Route path="reports/mpr/report" element={<MprReport />} />
              {/* Analysis */}
              <Route path="reports/analysis" element={<AnalysisReportPage />} />
              <Route path="reports/analysis/report" element={<AnalysisReport />} />
              {/* RFD */}
              <Route path="reports/rfd" element={<RfdReportPage />} />
              <Route path="reports/rfd/report" element={<RfdReport />} />
              {/* Modify Data */}
              <Route path="modify-data" element={<ModifyDataPage />} />
              {/* Contact Us */}
              <Route path="contact" element={<ContactUsPage />} />
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
