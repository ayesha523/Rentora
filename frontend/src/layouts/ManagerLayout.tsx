import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ManagerLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "manager") {
    return <Navigate to="/tenant/dashboard" replace />;
  }

  return <Outlet />;
}

export default ManagerLayout;