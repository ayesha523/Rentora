import { tenantQuickActions } from "../../../data/tenantDashboardData";
import { NavLink } from "react-router-dom";

function QuickActions() {
  return (
    <div className="dashboard-card quick-actions-card">
      <div className="card-header-custom">
        <h5>Quick Actions</h5>
      </div>

      <div className="quick-actions">
        {tenantQuickActions.map((action) => {
          const content = (
            <div className="quick-action-inner">
              <div className={`quick-icon quick-icon--${action.disabled ? "muted" : 'primary'}`}>
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
            <NavLink key={action.id} to={action.path} className="quick-action-btn">
              {content}
            </NavLink>
          ) : (
            <button key={action.id} type="button" className="quick-action-btn" disabled={action.disabled} aria-disabled={action.disabled}>
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;