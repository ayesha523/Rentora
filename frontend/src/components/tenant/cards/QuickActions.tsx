import { NavLink } from "react-router-dom";

interface TenantQuickAction {
  id: string;
  title: string;
  icon: string;
  disabled: boolean;
  note: string;
  path?: string;
}

const quickActions: TenantQuickAction[] = [
  {
    id: "pay-rent",
    title: "Pay Rent",
    icon: "bi-credit-card",
    disabled: false,
    note: "Pay your rent",
    path: "/tenant/rent-bills",
  },
  {
    id: "submit-complaint",
    title: "Submit Complaint",
    icon: "bi-chat-left-text",
    disabled: false,
    note: "File a new complaint",
    path: "/tenant/complaints/new",
  },
  {
    id: "view-notices",
    title: "View Notices",
    icon: "bi-megaphone",
    disabled: false,
    note: "See all notices",
    path: "/tenant/notices",
  },
  {
    id: "update-profile",
    title: "Update Profile",
    icon: "bi-person-circle",
    disabled: false,
    note: "Edit your profile",
    path: "/tenant/profile",
  },
];

function QuickActions() {
  return (
    <div className="dashboard-card quick-actions-card">
      <div className="card-header-custom">
        <h5>Quick Actions</h5>
      </div>

      <div className="quick-actions">
        {quickActions.map((action) => {
          const content = (
            <div className="quick-action-inner">
              <div
                className={`quick-icon quick-icon--${
                  action.disabled ? "muted" : "primary"
                }`}
              >
                <i className={`bi ${action.icon}`}></i>
              </div>

              <div className="quick-action-copy">
                <span>{action.title}</span>
                <small>{action.note}</small>
              </div>

              <i className="bi bi-arrow-right-short quick-action-arrow"></i>
            </div>
          );

          return action.path && !action.disabled ? (
            <NavLink
              key={action.id}
              to={action.path}
              className="quick-action-btn"
            >
              {content}
            </NavLink>
          ) : (
            <button
              key={action.id}
              type="button"
              className="quick-action-btn"
              disabled={action.disabled}
              aria-disabled={action.disabled}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;