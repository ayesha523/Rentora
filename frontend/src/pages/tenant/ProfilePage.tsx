import { useState } from 'react';
import './Tenant.css';

const accountPreferences = [
  { label: 'Email notifications', value: true },
  { label: 'Notice notifications', value: true },
  { label: 'Payment reminders', value: true },
  { label: 'Maintenance updates', value: false },
];

function ProfilePage() {
  const [preferences, setPreferences] = useState(accountPreferences);

  const togglePreference = (index: number) => {
    setPreferences((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, value: !item.value } : item,
      ),
    );
  };

  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-panel tenant-panel--profile-header">
          <div className="tenant-profile-card">
            <div className="tenant-profile-card__identity">
              <div className="tenant-avatar tenant-avatar--xl">LN</div>
              <div>
                <span className="tenant-panel__eyebrow">Account</span>
                <h3>Lutfa Nahid</h3>
                <p>Tenant • Resident at Aurora Heights</p>
              </div>
            </div>

            <div className="tenant-profile-card__meta">
              <div>
                <small>Email</small>
                <strong>lutfa.nahid@email.com</strong>
              </div>
              <div>
                <small>Phone</small>
                <strong>+880 1712-345678</strong>
              </div>
              <div>
                <small>Apartment</small>
                <strong>Flat B-406</strong>
              </div>
              <button type="button" className="btn btn-secondary btn-secondary--compact">
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
                <strong>Lutfa Nahid</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>lutfa.nahid@email.com</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>+880 1712-345678</strong>
              </div>
              <div>
                <span>Date of birth</span>
                <strong>May 17, 1994</strong>
              </div>
              <div>
                <span>Address</span>
                <strong>House 12, Road 4, Dhanmondi, Dhaka</strong>
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
                <strong>REN-2026-0147</strong>
              </div>
              <div>
                <span>Building</span>
                <strong>Aurora Heights</strong>
              </div>
              <div>
                <span>Unit</span>
                <strong>Flat B-406</strong>
              </div>
              <div>
                <span>Lease status</span>
                <strong>Active</strong>
              </div>
              <div>
                <span>Move-in date</span>
                <strong>Jan 12, 2026</strong>
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
                <span><i className="bi bi-shield-lock" aria-hidden="true" /> Change Password</span>
                <i className="bi bi-arrow-right-short" aria-hidden="true" />
              </button>
              <div className="tenant-security-status">
                <span>Two-step verification</span>
                <strong>Enabled</strong>
              </div>
              <div className="tenant-security-status">
                <span>Last password change</span>
                <strong>May 08, 2026</strong>
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
                    className={`tenant-toggle ${item.value ? 'active' : ''}`}
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
