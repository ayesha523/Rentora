import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import "../styles/tenant-layout.css";

function TenantLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "tenant") {
    return <Navigate to="/manager/dashboard" replace />;
  }

  return (
    <div className="app-shell tenant-shell">
      <Navbar role="tenant" />

      <div className="d-flex tenant-shell__body">
        <Sidebar role="tenant" />

        <div className="content-area tenant-shell__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TenantLayout;