import SectionHeader from '../../dashboard/SectionHeader';
import StatCard from '../../dashboard/StatCard';
import { dashboardStats } from '../../../data/managerDashboardData';
import type { ManagerSection } from '../../../data/managerManagementData';

interface OverviewSectionProps { onNavigate: (section: ManagerSection) => void; onComingSoon: (message: string) => void; }

const quickActions: readonly { label: string; icon: string; section: ManagerSection }[] = [
  { label: 'Add apartment', icon: 'bi-building-add', section: 'apartments' },
  { label: 'Add flat', icon: 'bi-door-open', section: 'flats' },
  { label: 'Add tenant', icon: 'bi-person-plus', section: 'tenants' },
  { label: 'Record payment', icon: 'bi-receipt', section: 'rent' },
  { label: 'Publish notice', icon: 'bi-megaphone', section: 'notices' },
  { label: 'Review complaints', icon: 'bi-chat-square-text', section: 'complaints' },
];

function OverviewSection({ onNavigate, onComingSoon }: OverviewSectionProps) {
  const month = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date());
  return (
    <div className="manager-section manager-section--overview">
      <section className="manager-welcome">
        <div className="manager-welcome__content">
          <div className="manager-welcome__meta">
            <span className="manager-welcome__eyebrow"><i aria-hidden="true" /> Portfolio overview</span>
            <div className="manager-welcome__month" aria-label={`Current reporting period: ${month}`}><i className="bi bi-calendar3" aria-hidden="true" /><span><small>Reporting period</small><strong>{month}</strong></span></div>
          </div>
          <h1>Good morning, <span>Maya.</span></h1>
          <p>Your portfolio is performing steadily. Review today’s priorities and keep every property moving forward.</p>
          <div className="manager-welcome__actions">
            <button type="button" onClick={() => onNavigate('complaints')}>Review priorities <i className="bi bi-arrow-right" aria-hidden="true" /></button>
            <span><i className="bi bi-check-circle-fill" aria-hidden="true" /> Portfolio operations are healthy</span>
          </div>
        </div>
        <figure className="manager-welcome__visual">
          <img src="/images/manager/overview-property.png" alt="Aurora Heights apartment property at blue hour" />
          <div className="manager-welcome__visual-shade" aria-hidden="true" />
          <figcaption>
            <span><i className="bi bi-stars" aria-hidden="true" /> Featured property</span>
            <div><strong>Aurora Heights</strong><small>14 of 16 flats occupied</small></div>
            <button type="button" aria-label="View Aurora Heights in Apartment Management" onClick={() => onNavigate('apartments')}><i className="bi bi-arrow-up-right" aria-hidden="true" /></button>
          </figcaption>
          <div className="manager-welcome__occupancy"><span>Occupancy</span><strong>87.5%</strong></div>
        </figure>
      </section>

      <section aria-labelledby="dashboard-summary-title"><h2 id="dashboard-summary-title" className="visually-hidden">Property summary</h2><div className="manager-stats-grid">{dashboardStats.map((stat) => <StatCard key={stat.id} stat={stat} />)}</div></section>

      <div className="manager-overview-grid">
        <section className="manager-panel">
          <SectionHeader title="Requires attention" description="Three items to review today" icon="bi-exclamation-diamond" />
          <div className="manager-alert-list">
            <button type="button" onClick={() => onNavigate('rent')}><span className="manager-alert-icon manager-alert-icon--danger"><i className="bi bi-wallet2" /></span><span><strong>7 rent payments pending</strong><small>2 accounts are now overdue</small></span><i className="bi bi-chevron-right" /></button>
            <button type="button" onClick={() => onNavigate('complaints')}><span className="manager-alert-icon manager-alert-icon--warning"><i className="bi bi-tools" /></span><span><strong>3 maintenance requests active</strong><small>One high-priority lift inspection</small></span><i className="bi bi-chevron-right" /></button>
            <button type="button" onClick={() => onNavigate('flats')}><span className="manager-alert-icon"><i className="bi bi-house-door" /></span><span><strong>9 flats currently vacant</strong><small>Review units ready for new tenants</small></span><i className="bi bi-chevron-right" /></button>
          </div>
        </section>

        <section className="manager-panel manager-insight">
          <SectionHeader title="Occupancy insight" description="Across four properties" icon="bi-pie-chart" />
          <div className="manager-occupancy"><div className="manager-occupancy__ring"><span><strong>81%</strong><small>occupied</small></span></div><div><div><span>Occupied</span><strong>39 flats</strong></div><div><span>Vacant</span><strong>9 flats</strong></div><button type="button" onClick={() => onNavigate('apartments')}>View properties <i className="bi bi-arrow-right" /></button></div></div>
        </section>
      </div>

      <section className="manager-panel">
        <SectionHeader title="Quick actions" description="Jump directly to a management task" icon="bi-lightning-charge" />
        <div className="manager-quick-grid">{quickActions.map((action) => <button key={action.label} type="button" onClick={() => { onNavigate(action.section); onComingSoon(`${action.label} tools are ready in ${action.section === 'complaints' ? 'Service Desk' : action.label.replace(/^(Add|Record|Publish|Review) /, '')}.`); }}><span><i className={`bi ${action.icon}`} /></span><strong>{action.label}</strong><i className="bi bi-arrow-up-right" /></button>)}</div>
      </section>
    </div>
  );
}

export default OverviewSection;
