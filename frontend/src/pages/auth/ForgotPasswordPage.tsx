import { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../../services/passwordRecovery";
import PasswordRecoveryFrame from "./PasswordRecoveryFrame";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_MESSAGE = "If an account exists for that email address, a password reset link has been sent.";

interface ApiError {
  status?: number;
  data?: { errors?: Record<string, string[]> };
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await requestPasswordReset(normalizedEmail);
      setSuccess(true);
    } catch (err) {
      const apiError = err as ApiError;
      const validationError = apiError.data?.errors?.email?.[0];
      setError(
        apiError.status === 422 && validationError
          ? validationError
          : "We could not send a reset link right now. Please try again shortly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordRecoveryFrame eyebrow="SAFE ACCOUNT RECOVERY" title="A secure way back to your account.">
      <Link className="auth-home-link" to="/login"><i className="bi bi-arrow-left" /> Back to login</Link>
      <div className="auth-heading">
        <span className="auth-kicker">FORGOT PASSWORD</span>
        <h2>{success ? "Check your inbox" : "Reset your password"}</h2>
        <p>{success ? "Follow the link in the email to choose a new password." : "Enter your email and we'll send password reset instructions."}</p>
      </div>

      {success ? (
        <>
          <div className="success-message" role="status" aria-live="polite">
            <i className="bi bi-envelope-check" /><span>{SUCCESS_MESSAGE}</span>
          </div>
          <Link className="auth-btn auth-btn-link" to="/login">Return to Login <i className="bi bi-arrow-right" /></Link>
        </>
      ) : (
        <>
          {error && <div className="error-message" id="forgot-error" role="alert"><i className="bi bi-exclamation-circle" /><span>{error}</span></div>}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="forgot-email">Email address</label>
              <div className="auth-input-wrap">
                <i className="bi bi-envelope" />
                <input
                  id="forgot-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "forgot-error" : undefined}
                  disabled={loading}
                  autoFocus
                  required
                />
              </div>
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true" /> Sending link...</> : <>Send Reset Link <i className="bi bi-arrow-right" /></>}
            </button>
          </form>
          <div className="auth-footer">Remembered your password? <Link to="/login">Sign in</Link></div>
        </>
      )}
    </PasswordRecoveryFrame>
  );
}
