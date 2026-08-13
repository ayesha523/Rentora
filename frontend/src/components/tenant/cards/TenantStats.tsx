import { tenantStats } from "../../../data/tenantDashboardData";

function TenantStats() {
  return (
    <div className="tenant-stats-grid">
      {tenantStats.map((item) => (
        <article key={item.id} className="tenant-stat-card">
          <div className={`tenant-stat-card__icon tenant-stat-card__icon--${item.variant}`}>
            <i className={`bi ${item.icon}`}></i>
          </div>

          <p className="tenant-stat-card__label">{item.label}</p>
          <p className="tenant-stat-card__value">{item.value}</p>
          <p className="tenant-stat-card__subtitle">{item.description}</p>
          <span className="stat-badge">{item.status}</span>
        </article>
      ))}
    </div>
  );
}

export default TenantStats;