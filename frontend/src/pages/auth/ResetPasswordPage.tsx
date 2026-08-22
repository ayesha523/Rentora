import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../services/passwordRecovery";
import PasswordRecoveryFrame from "./PasswordRecoveryFrame";

interface ApiError {
  data?: { message?: string; errors?: Record<string, string[]> };
}

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const email = searchParams.get("email")?.trim() ?? "";
  const linkIsComplete = Boolean(token && email);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!linkIsComplete) return;
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await resetPassword(email, token, password, confirmation);
      setSuccess(true);
      setPassword("");
      setConfirmation("");
    } catch (err) {
      const apiError = err as ApiError;
      const firstValidationError = apiError.data?.errors
        ? Object.values(apiError.data.errors).flat()[0]
        : undefined;
      setError(firstValidationError || apiError.data?.message || "Unable to reset your password. Please request a new reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PasswordRecoveryFrame eyebrow="PROTECTED PASSWORD RESET" title="Choose a fresh key to your workspace.">
      <Link className="auth-home-link" to="/login"><i className="bi bi-arrow-left" /> Back to login</Link>
      <div className="auth-heading">
        <span className="auth-kicker">RESET PASSWORD</span>
        <h2>{success ? "Password updated" : "Create a new password"}</h2>
        <p>{success ? "Your account is secure and ready for you." : `Resetting the password for ${email || "your Rentora account"}.`}</p>
      </div>

      {!linkIsComplete ? (
        <div className="recovery-link-state">
          <div className="error-message" role="alert"><i className="bi bi-link-45deg" /><span>This reset link is incomplete or invalid. Request a new link to continue.</span></div>
          <Link className="auth-btn auth-btn-link" to="/forgot-password">Request New Link</Link>
        </div>
      ) : success ? (
        <>
          <div className="success-message" role="status" aria-live="polite"><i className="bi bi-check-circle" /><span>Password reset successful. Please sign in with your new password.</span></div>
          <Link className="auth-btn auth-btn-link" to="/login">Continue to Login <i className="bi bi-arrow-right" /></Link>
        </>
      ) : (
        <>
          {error && <div className="error-message" id="reset-error" role="alert"><i className="bi bi-exclamation-circle" /><span>{error}</span></div>}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="new-password">New password</label>
              <div className="auth-input-wrap">
                <i className="bi bi-lock" />
                <input id="new-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Enter a new password" value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={`password-requirements${error ? " reset-error" : ""}`} disabled={loading} autoFocus required />
                <button className="password-toggle" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide new password" : "Show new password"} aria-pressed={showPassword} disabled={loading}><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} /></button>
              </div>
            </div>
            <div className="password-requirements" id="password-requirements">
              <strong>Password requirements</strong>
              <span className={password.length >= 8 ? "met" : ""}><i className={`bi ${password.length >= 8 ? "bi-check-circle-fill" : "bi-circle"}`} /> At least 8 characters</span>
            </div>
            <div className="auth-field">
              <label htmlFor="confirm-new-password">Confirm new password</label>
              <div className="auth-input-wrap">
                <i className="bi bi-shield-lock" />
                <input id="confirm-new-password" type={showConfirmation ? "text" : "password"} autoComplete="new-password" placeholder="Enter the password again" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} aria-invalid={Boolean(confirmation && password !== confirmation)} disabled={loading} required />
                <button className="password-toggle" type="button" onClick={() => setShowConfirmation((value) => !value)} aria-label={showConfirmation ? "Hide confirmed password" : "Show confirmed password"} aria-pressed={showConfirmation} disabled={loading}><i className={`bi ${showConfirmation ? "bi-eye-slash" : "bi-eye"}`} /></button>
              </div>
            </div>
            <button type="submit" className="auth-btn" disabled={loading || password.length < 8 || !confirmation}>
              {loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true" /> Updating password...</> : <>Reset Password <i className="bi bi-arrow-right" /></>}
            </button>
          </form>
          <div className="auth-footer">Link expired or already used? <Link to="/forgot-password">Request a new one</Link></div>
        </>
      )}
    </PasswordRecoveryFrame>
  );
}
