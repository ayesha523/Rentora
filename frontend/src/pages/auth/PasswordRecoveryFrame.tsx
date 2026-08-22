import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

interface PasswordRecoveryFrameProps {
  children: ReactNode;
  title: string;
  eyebrow: string;
}

function AuthBrand() {
  return (
    <span className="auth-brand">
      <span className="auth-logo"><i className="bi bi-buildings-fill" /></span>
      <span>Rentora</span>
    </span>
  );
}

export default function PasswordRecoveryFrame({ children, title, eyebrow }: PasswordRecoveryFrameProps) {
  return (
    <main className="auth-page auth-recovery-page">
      <div className="auth-backdrop" aria-hidden="true"><span /><span /></div>
      <div className="auth-shell">
        <section className="auth-visual" aria-label="Rentora secure account recovery">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=88"
            alt="Modern apartment building at dusk"
          />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-top">
            <Link to="/" aria-label="Go to Rentora home"><AuthBrand /></Link>
            <span className="visual-chip"><i className="bi bi-shield-lock" /> Secure recovery</span>
          </div>
          <div className="auth-visual-copy">
            <span className="auth-eyebrow"><i className="bi bi-key" /> {eyebrow}</span>
            <h1>{title}</h1>
            <p>We protect every step of account recovery so you can return to your Rentora workspace with confidence.</p>
            <div className="register-benefits">
              <span><i className="bi bi-check2" /> Secure, time-limited reset links</span>
              <span><i className="bi bi-check2" /> Privacy-first account protection</span>
              <span><i className="bi bi-check2" /> Simple access back to your workspace</span>
            </div>
          </div>
        </section>
        <section className="auth-form-side">
          <div className="mobile-auth-brand"><Link to="/"><AuthBrand /></Link></div>
          <div className="auth-form-card auth-recovery-card">{children}</div>
          <p className="auth-security-note"><i className="bi bi-lock-fill" /> Your recovery details are sent securely.</p>
        </section>
      </div>
    </main>
  );
}
