import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type UserRole = "manager" | "tenant";

interface NavbarProps {
  role: UserRole;
}

function Navbar({ role }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
      setLoggingOut(false);
    }
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand fw-bold" to="/">
        <i className="bi bi-buildings me-2"></i>
        Rentora
      </Link>

      <div className="d-flex align-items-center gap-3">
        {user && (
          <span className="text-white small d-none d-md-inline">
            {user.name}
          </span>
        )}

        <span className="badge text-bg-light text-capitalize">
          {role}
        </span>

        <button
          type="button"
          className="btn btn-outline-light btn-sm"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              />
              Logging out...
            </>
          ) : (
            <>
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
