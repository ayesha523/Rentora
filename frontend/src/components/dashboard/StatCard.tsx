import type { DashboardStat } from '../../data/managerDashboardData';

interface StatCardProps {
  stat: DashboardStat;
}

function StatCard({ stat }: StatCardProps) {
  return (
    <article className={`manager-stat-card manager-stat-card--${stat.accent}`}>
      <div className="manager-stat-card__top">
        <div className="manager-stat-card__icon" aria-hidden="true">
          <i className={`bi ${stat.icon}`} />
        </div>
        <i className="bi bi-arrow-up-right manager-stat-card__arrow" aria-hidden="true" />
      </div>
      <p className="manager-stat-card__label">{stat.label}</p>
      <p className="manager-stat-card__value">{stat.value}</p>
      <p className="manager-stat-card__description">{stat.description}</p>
    </article>
  );
}

export default StatCard;
