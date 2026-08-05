import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../../context/AuthContext";

type UserRole = "tenant" | "manager";

type ApiError = {
  status?: number;
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
};

function AuthBrand() {
  return (
    <span className="auth-brand">
      <span className="auth-logo">
        <i className="bi bi-buildings-fill" />
      </span>
      <span>Rentora</span>
    </span>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("tenant");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      /*
       * Authentication is handled by AuthContext.
       *
       * AuthContext:
       * - sends credentials to Laravel
       * - stores the Sanctum token
       * - stores the authenticated user
       * - updates the authenticated user state
       */
      const user = await login(email.trim(), password);

      /*
       * IMPORTANT:
       * The backend-returned role is the source of truth.
       * We do NOT use the selected frontend role to decide access.
       */
      if (user.role === "manager") {
        navigate("/manager/dashboard", { replace: true });
      } else {
        navigate("/tenant/dashboard", { replace: true });
      }
    } catch (err) {
      const apiError = err as ApiError;

      const validationErrors = apiError.data?.errors;

      if (validationErrors) {
        const firstError = Object.values(validationErrors)
          .flat()[0];

        setError(
          firstError || "Please check your information."
        );
      } else {
        setError(
          apiError.data?.message ||
            "Login failed. Please check your email and password."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page auth-login-page">
      <div className="auth-backdrop" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="auth-shell">
        <section
          className="auth-visual"
          aria-label="Rentora property experience"
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=88"
            alt="Contemporary premium apartment building"
          />

          <div className="auth-visual-overlay" />

          <div className="auth-visual-top">
            <Link to="/" aria-label="Go to Rentora home">
              <AuthBrand />
            </Link>

            <span className="visual-chip">
              <i className="bi bi-shield-check" /> Secure platform
            </span>
          </div>

          <div className="auth-visual-copy">
            <span className="auth-eyebrow">
              <i className="bi bi-stars" /> PROPERTY MANAGEMENT, CONNECTED
            </span>

            <h1>Welcome home to simpler management.</h1>

            <p>
              One secure place for rent, utilities, maintenance and every
              conversation that keeps a community moving.
            </p>

            <div className="auth-trust-row">
              <span>
                <i className="bi bi-buildings" />
                <b>Organised properties</b>
              </span>

              <span>
                <i className="bi bi-people" />
                <b>Connected residents</b>
              </span>

              <span>
                <i className="bi bi-graph-up-arrow" />
                <b>Clearer operations</b>
              </span>
            </div>
          </div>

          <div className="auth-float-card">
            <span className="float-icon">
              <i className="bi bi-check2-circle" />
            </span>

            <span>
              <small>PORTFOLIO STATUS</small>
              <strong>Everything is up to date</strong>
            </span>
          </div>
        </section>

        <section className="auth-form-side">
          <div className="mobile-auth-brand">
            <Link to="/">
              <AuthBrand />
            </Link>
          </div>

          <div className="auth-form-card">
            <Link className="auth-home-link" to="/">
              <i className="bi bi-arrow-left" /> Back to home
            </Link>

            <div className="auth-heading">
              <span className="auth-kicker">WELCOME BACK</span>

              <h2>Sign in to Rentora</h2>

              <p>
                Access your workspace and continue managing with clarity.
              </p>
            </div>

            {error && (
              <div className="error-message" role="alert">
                <i className="bi bi-exclamation-circle" />
                <span>{error}</span>
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="auth-field">
                <label htmlFor="login-email">Email address</label>

                <div className="auth-input-wrap">
                  <i className="bi bi-envelope" />

                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <div className="label-row">
                  <label htmlFor="login-password">Password</label>
                  <span>Secure access</span>
                </div>

                <div className="auth-input-wrap">
                  <i className="bi bi-lock" />

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                    required
                  />

                  <button
                    className="password-toggle"
                    type="button"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowPassword((visible) => !visible)
                    }
                    disabled={loading}
                  >
                    <i
                      className={`bi ${
                        showPassword
                          ? "bi-eye-slash"
                          : "bi-eye"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <fieldset className="role-field">
                <legend>Sign in as</legend>

                <div className="role-options">
                  <label
                    className={role === "tenant" ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="login-role"
                      value="tenant"
                      checked={role === "tenant"}
                      onChange={() => setRole("tenant")}
                      disabled={loading}
                    />

                    <span className="role-icon">
                      <i className="bi bi-house-door" />
                    </span>

                    <span>
                      <b>Tenant</b>
                      <small>Resident portal</small>
                    </span>

                    <i className="bi bi-check-circle-fill role-check" />
                  </label>

                  <label
                    className={role === "manager" ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="login-role"
                      value="manager"
                      checked={role === "manager"}
                      onChange={() => setRole("manager")}
                      disabled={loading}
                    />

                    <span className="role-icon">
                      <i className="bi bi-building-gear" />
                    </span>

                    <span>
                      <b>Manager</b>
                      <small>Property workspace</small>
                    </span>

                    <i className="bi bi-check-circle-fill role-check" />
                  </label>
                </div>
              </fieldset>

              <label className="remember-option">
                <input
                  type="checkbox"
                  disabled={loading}
                />
                <span>Remember me on this device</span>
              </label>

              <button
                type="submit"
                className="auth-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <i className="bi bi-arrow-right" />
                  </>
                )}
              </button>
            </form>

            <div className="auth-footer">
              New to Rentora?{" "}
              <Link to="/register">
                Create an account{" "}
                <i className="bi bi-arrow-up-right" />
              </Link>
            </div>
          </div>

          <p className="auth-security-note">
            <i className="bi bi-lock-fill" /> Your information is protected
            with secure role-based access.
          </p>
        </section>
      </div>
    </main>
  );
}
