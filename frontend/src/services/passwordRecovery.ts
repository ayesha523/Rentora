import { apiRequest } from "./api";

interface PasswordRecoveryResponse {
  success: boolean;
  message: string;
}

export function requestPasswordReset(email: string) {
  return apiRequest<PasswordRecoveryResponse>("/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(
  email: string,
  token: string,
  password: string,
  passwordConfirmation: string
) {
  return apiRequest<PasswordRecoveryResponse>("/reset-password", {
    method: "POST",
    body: JSON.stringify({
      email,
      token,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });
}
