import { useState } from "react";
import "./Tenant.css";

type PreferenceItem = {
  label: string;
  value: boolean;
};

interface TenantProfileData {
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  address?: string | null;
  tenantId?: string | null;
  building?: string | null;
  unit?: string | null;
  leaseStatus?: string | null;
  moveInDate?: string | null;
  twoStepEnabled?: boolean | null;
  lastPasswordChange?: string | null;
}

interface ProfilePageProps {
  profile?: TenantProfileData | null;
}

const defaultPreferences: PreferenceItem[] = [
  { label: "Email notifications", value: true },
  { label: "Notice notifications", value: true },
  { label: "Payment reminders", value: true },
  { label: "Maintenance updates", value: false },
];

function ProfilePage({ profile = null }: ProfilePageProps) {
  const [preferences, setPreferences] =
    useState<PreferenceItem[]>(defaultPreferences);

  const togglePreference = (index: number) => {
    setPreferences((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, value: !item.value } : item
      )
    );
  };

  const displayName = profile?.fullName || "Tenant";

  const initials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "T";

  const residencyText =
    profile?.building || profile?.unit
      ? `Tenant${
          profile?.building ? ` • Resident at ${profile.building}` : ""
        }`
      : "Tenant";

  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-panel tenant-panel--profile-header">
          <div className="tenant-profile-card">
            <div className="tenant-profile-card__identity">
              <div className="tenant-avatar tenant-avatar--xl">
                {initials}
              </div>

              <div>
                <span className="tenant-panel__eyebrow">Account</span>
                <h3>{displayName}</h3>
                <p>{residencyText}</p>
              </div>
            </div>

            <div className="tenant-profile-card__meta">
              <div>
                <small>Email</small>
                <strong>{profile?.email || "No data yet"}</strong>
              </div>

              <div>
                <small>Phone</small>
                <strong>{profile?.phone || "No data yet"}</strong>
              </div>

              <div>
                <small>Apartment</small>
                <strong>{profile?.unit || "No apartment assigned"}</strong>
              </div>

              <button
                type="button"
                className="btn btn-secondary btn-secondary--compact"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </section>

        <div className="tenant-two-column-layout">
          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Personal</span>
                <h3>Personal Information</h3>
              </div>
            </div>

            <div className="tenant-profile-detail-list">
              <div>
                <span>Full name</span>
                <strong>{profile?.fullName || "No data yet"}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{profile?.email || "No data yet"}</strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>{profile?.phone || "No data yet"}</strong>
              </div>

              <div>
                <span>Date of birth</span>
                <strong>{profile?.dateOfBirth || "No data yet"}</strong>
              </div>

              <div>
                <span>Address</span>
                <strong>{profile?.address || "No data yet"}</strong>
              </div>
            </div>
          </section>

          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Tenant Info</span>
                <h3>Lease & Residency</h3>
              </div>
            </div>

            <div className="tenant-profile-detail-list">
              <div>
                <span>Tenant ID</span>
                <strong>{profile?.tenantId || "No data yet"}</strong>
              </div>

              <div>
                <span>Building</span>
                <strong>{profile?.building || "No data yet"}</strong>
              </div>

              <div>
                <span>Unit</span>
                <strong>{profile?.unit || "No data yet"}</strong>
              </div>

              <div>
                <span>Lease status</span>
                <strong>{profile?.leaseStatus || "No data yet"}</strong>
              </div>

              <div>
                <span>Move-in date</span>
                <strong>{profile?.moveInDate || "No data yet"}</strong>
              </div>
            </div>
          </section>
        </div>

        <div className="tenant-two-column-layout">
          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Security</span>
                <h3>Account & Security</h3>
              </div>
            </div>

            <div className="tenant-security-list">
              <button type="button" className="tenant-quick-action">
                <span>
                  <i className="bi bi-shield-lock" aria-hidden="true" /> Change
                  Password
                </span>
                <i
                  className="bi bi-arrow-right-short"
                  aria-hidden="true"
                />
              </button>

              <div className="tenant-security-status">
                <span>Two-step verification</span>
                <strong>
                  {typeof profile?.twoStepEnabled === "boolean"
                    ? profile.twoStepEnabled
                      ? "Enabled"
                      : "Disabled"
                    : "No data yet"}
                </strong>
              </div>

              <div className="tenant-security-status">
                <span>Last password change</span>
                <strong>
                  {profile?.lastPasswordChange || "No data yet"}
                </strong>
              </div>
            </div>
          </section>

          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Preferences</span>
                <h3>Notification Settings</h3>
              </div>
            </div>

            <div className="tenant-toggle-list">
              {preferences.map((item, index) => (
                <label key={item.label} className="tenant-toggle-row">
                  <span>{item.label}</span>

                  <button
                    type="button"
                    className={`tenant-toggle ${
                      item.value ? "active" : ""
                    }`}
                    aria-pressed={item.value}
                    onClick={() => togglePreference(index)}
                  >
                    <span className="tenant-toggle__thumb" />
                  </button>
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;