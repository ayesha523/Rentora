import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserRole } from "../context/AuthContext";

interface ProtectedRouteProps {
  role?: UserRole;
}

export default function ProtectedRoute({
  role,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={
          user.role === "manager"
            ? "/manager/dashboard"
            : "/tenant/dashboard"
        }
        replace
      />
    );
  }

  return <Outlet />;
}
