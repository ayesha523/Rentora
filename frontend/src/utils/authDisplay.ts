import type { User, UserRole } from "../context/AuthContext";

export interface AuthenticatedUserIdentity {
  displayName: string;
  firstName: string;
  initials: string;
  roleLabel: string;
}

const roleLabels: Record<UserRole, string> = {
  manager: "Property Manager",
  tenant: "Tenant",
};

export function getAuthenticatedUserIdentity(
  user: User | null
): AuthenticatedUserIdentity {
  const nameParts = user?.name.trim().split(/\s+/).filter(Boolean) ?? [];
  const displayName = nameParts.join(" ") || "User";
  const firstName = nameParts[0] || "User";
  const initials = nameParts.length
    ? `${nameParts[0][0]}${nameParts.length > 1 ? nameParts.at(-1)?.[0] ?? "" : ""}`.toUpperCase()
    : "U";

  return {
    displayName,
    firstName,
    initials,
    roleLabel: user ? roleLabels[user.role] : "User",
  };
}
