import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Home from './pages/home/Home';
import AuthLayout from './layouts/AuthLayout';
import ManagerLayout from './layouts/ManagerLayout';
import TenantLayout from './layouts/TenantLayout';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import TenantDashboard from './pages/tenant/TenantDashboard';
import SubmitComplaintPage from './pages/tenant/SubmitComplaintPage';
import ApartmentPage from './pages/tenant/ApartmentPage';
import RentBillsPage from './pages/tenant/RentBillsPage';
import ComplaintsPage from './pages/tenant/ComplaintsPage';
import NoticesPage from './pages/tenant/NoticesPage';
import ProfilePage from './pages/tenant/ProfilePage';
import SupportPage from './pages/tenant/SupportPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route path="/manager" element={<ManagerLayout />}>
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />
        <Route
          path="dashboard"
          element={<ManagerDashboard />}
        />
      </Route>

      <Route path="/tenant" element={<TenantLayout />}>
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />
        <Route
          path="dashboard"
          element={<TenantDashboard />}
        />
        <Route
          path="complaints/new"
          element={<SubmitComplaintPage />}
        />
        <Route path="apartment" element={<ApartmentPage />} />
        <Route path="rent-bills" element={<RentBillsPage />} />
        <Route path="complaints" element={<ComplaintsPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="support" element={<SupportPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;