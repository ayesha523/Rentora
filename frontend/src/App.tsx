import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import AuthLayout from "./layouts/AuthLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import TenantLayout from "./layouts/TenantLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import SubmitComplaintPage from "./pages/tenant/SubmitComplaintPage";
import ApartmentPage from "./pages/tenant/ApartmentPage";
import RentBillsPage from "./pages/tenant/RentBillsPage";
import ComplaintsPage from "./pages/tenant/ComplaintsPage";
import NoticesPage from "./pages/tenant/NoticesPage";
import ProfilePage from "./pages/tenant/ProfilePage";
import SupportPage from "./pages/tenant/SupportPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Manager protected routes */}
      <Route element={<ProtectedRoute role="manager" />}>
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
      </Route>

      {/* Tenant protected routes */}
      <Route element={<ProtectedRoute role="tenant" />}>
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
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
