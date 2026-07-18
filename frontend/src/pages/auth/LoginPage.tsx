import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

type UserRole = "tenant" | "manager";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("tenant");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    navigate(role === "manager" ? "/manager/dashboard" : "/tenant/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-1"></div>
      <div className="auth-glow auth-glow-2"></div>

      <div className="auth-card">
        <div className="auth-brand">
          <div className="logo-box">R</div>
          <h1>Rentora</h1>
        </div>

        <p className="auth-subtitle">
          Welcome back to your property management platform.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e) => {
              const selectedRole = e.target.value;

              if (selectedRole === "tenant" || selectedRole === "manager") {
                setRole(selectedRole);
              }
            }}
          >
            <option value="tenant">Tenant</option>
            <option value="manager">Apartment Manager</option>
          </select>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
