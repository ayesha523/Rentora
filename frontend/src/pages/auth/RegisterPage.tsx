import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

type UserRole = "tenant" | "manager";

function AuthBrand() {
  return <span className="auth-brand"><span className="auth-logo"><i className="bi bi-buildings-fill" /></span><span>Rentora</span></span>;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "", role: "tenant" as UserRole });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    alert("Registration successful");
    navigate(form.role === "manager" ? "/manager/dashboard" : "/tenant/dashboard");
  };

  return (
    <main className="auth-page auth-register-page">
      <div className="auth-backdrop" aria-hidden="true"><span /><span /></div>
      <div className="auth-shell">
        <section className="auth-visual" aria-label="Rentora apartment experience">
          <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=88" alt="Elegant modern apartment interior" />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-top"><Link to="/" aria-label="Go to Rentora home"><AuthBrand /></Link><span className="visual-chip"><i className="bi bi-stars" /> Built for modern living</span></div>
          <div className="auth-visual-copy"><span className="auth-eyebrow"><i className="bi bi-building-check" /> ONE PLATFORM, TWO EXPERIENCES</span><h1>Bring your apartment community together.</h1><p>Create your account and step into a calmer, clearer way to manage property life.</p><div className="register-benefits"><span><i className="bi bi-check2" /> Purpose-built manager tools</span><span><i className="bi bi-check2" /> Simple resident self-service</span><span><i className="bi bi-check2" /> Clear records and communication</span></div></div>
          <div className="auth-float-card"><span className="float-icon"><i className="bi bi-people" /></span><span><small>COMMUNITY READY</small><strong>Manager and tenant portals</strong></span></div>
        </section>

        <section className="auth-form-side">
          <div className="mobile-auth-brand"><Link to="/"><AuthBrand /></Link></div>
          <div className="auth-form-card auth-register-card">
            <Link className="auth-home-link" to="/"><i className="bi bi-arrow-left" /> Back to home</Link>
            <div className="auth-heading"><span className="auth-kicker">JOIN RENTORA</span><h2>Create your account</h2><p>Choose your role and set up your secure workspace.</p></div>
            {error && <div className="error-message" role="alert"><i className="bi bi-exclamation-circle" /><span>{error}</span></div>}
            <form className="auth-form register-form" onSubmit={handleSubmit} noValidate>
              <div className="register-fields"><div className="auth-field"><label htmlFor="register-name">Full name</label><div className="auth-input-wrap"><i className="bi bi-person" /><input id="register-name" type="text" autoComplete="name" placeholder="Your full name" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} required /></div></div><div className="auth-field"><label htmlFor="register-phone">Phone number</label><div className="auth-input-wrap"><i className="bi bi-telephone" /><input id="register-phone" type="tel" autoComplete="tel" placeholder="Your phone number" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required /></div></div></div>
              <div className="auth-field"><label htmlFor="register-email">Email address</label><div className="auth-input-wrap"><i className="bi bi-envelope" /><input id="register-email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(event) => updateField("email", event.target.value)} required /></div></div>
              <fieldset className="role-field"><legend>I am joining as</legend><div className="role-options"><label className={form.role === "tenant" ? "selected" : ""}><input type="radio" name="register-role" value="tenant" checked={form.role === "tenant"} onChange={() => updateField("role", "tenant")} /><span className="role-icon"><i className="bi bi-house-door" /></span><span><b>Tenant</b><small>Manage your home</small></span><i className="bi bi-check-circle-fill role-check" /></label><label className={form.role === "manager" ? "selected" : ""}><input type="radio" name="register-role" value="manager" checked={form.role === "manager"} onChange={() => updateField("role", "manager")} /><span className="role-icon"><i className="bi bi-building-gear" /></span><span><b>Manager</b><small>Manage properties</small></span><i className="bi bi-check-circle-fill role-check" /></label></div></fieldset>
              <div className="register-fields"><div className="auth-field"><label htmlFor="register-password">Password</label><div className="auth-input-wrap"><i className="bi bi-lock" /><input id="register-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Create password" value={form.password} onChange={(event) => updateField("password", event.target.value)} required /><button className="password-toggle" type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)}><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} /></button></div></div><div className="auth-field"><label htmlFor="register-confirm">Confirm password</label><div className="auth-input-wrap"><i className="bi bi-shield-lock" /><input id="register-confirm" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" placeholder="Repeat password" value={form.confirmPassword} onChange={(event) => updateField("confirmPassword", event.target.value)} required /><button className="password-toggle" type="button" aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"} onClick={() => setShowConfirmPassword((visible) => !visible)}><i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`} /></button></div></div></div>
              <button type="submit" className="auth-btn">Create Account <i className="bi bi-arrow-right" /></button>
            </form>
            <div className="auth-footer">Already have an account? <Link to="/login">Sign in <i className="bi bi-arrow-up-right" /></Link></div>
          </div>
          <p className="auth-security-note"><i className="bi bi-lock-fill" /> Your information is protected with secure role-based access.</p>
        </section>
      </div>
    </main>
  );
}
