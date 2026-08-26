interface TenantStatItem {
  id: string;
  label: string;
  value?: string | null;
  description?: string | null;
  status?: string | null;
  icon: string;
  variant: "primary" | "success" | "warning" | "info";
}

interface TenantStatsProps {
  stats?: TenantStatItem[];
}

const defaultStats: TenantStatItem[] = [
  {
    id: "rent",
    label: "Monthly Rent",
    value: null,
    description: null,
    status: null,
    icon: "bi-cash-stack",
    variant: "primary",
  },
  {
    id: "bills",
    label: "Utility Bills",
    value: null,
    description: null,
    status: null,
    icon: "bi-lightning-charge",
    variant: "success",
  },
  {
    id: "complaints",
    label: "My Complaints",
    value: null,
    description: null,
    status: null,
    icon: "bi-chat-left-text",
    variant: "warning",
  },
  {
    id: "notices",
    label: "New Notices",
    value: null,
    description: null,
    status: null,
    icon: "bi-bell",
    variant: "info",
  },
];

function TenantStats({ stats = defaultStats }: TenantStatsProps) {
  return (
    <div className="tenant-stats-grid">
      {stats.map((item) => (
        <article key={item.id} className="tenant-stat-card">
          <div
            className={`tenant-stat-card__icon tenant-stat-card__icon--${item.variant}`}
          >
            <i className={`bi ${item.icon}`}></i>
          </div>

          <p className="tenant-stat-card__label">{item.label}</p>

          <p className="tenant-stat-card__value">
            {item.value || "No data yet"}
          </p>

          <p className="tenant-stat-card__subtitle">
            {item.description || "No information available"}
          </p>

          <span className="stat-badge">
            {item.status || "No status"}
          </span>
        </article>
      ))}
    </div>
  );
}

export default TenantStats;