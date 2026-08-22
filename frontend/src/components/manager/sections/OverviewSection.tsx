import SectionHeader from '../../dashboard/SectionHeader';
import StatCard from '../../dashboard/StatCard';
import { managerDashboardData } from '../../../data/managerDashboardData';
import type { ManagerSection } from '../../../data/managerManagementData';

interface OverviewSectionProps {
  firstName: string;
  onNavigate: (section: ManagerSection) => void;
  onComingSoon: (message: string) => void;
}

const quickActions: readonly { label: string; icon: string; section: ManagerSection }[] = [
  { label: 'Add apartment', icon: 'bi-building-add', section: 'apartments' },
  { label: 'Add flat', icon: 'bi-door-open', section: 'flats' },
  { label: 'Add tenant', icon: 'bi-person-plus', section: 'tenants' },
  { label: 'Record payment', icon: 'bi-receipt', section: 'rent' },
  { label: 'Publish notice', icon: 'bi-megaphone', section: 'notices' },
  { label: 'Review complaints', icon: 'bi-chat-square-text', section: 'complaints' },
];

function OverviewSection({ firstName, onNavigate, onComingSoon }: OverviewSectionProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const { reportingPeriod, stats, featuredProperty, attentionItems, occupancy } = managerDashboardData;

  return (
    <div className="manager-section manager-section--overview">
      <section className="manager-welcome">
        <div className="manager-welcome__content">
          <div className="manager-welcome__meta">
            <span className="manager-welcome__eyebrow"><i aria-hidden="true" /> Portfolio overview</span>
            <div className="manager-welcome__month" aria-label={reportingPeriod ? `Current reporting period: ${reportingPeriod}` : 'Reporting period unavailable'}>
              <i className="bi bi-calendar3" aria-hidden="true" />
              <span><small>Reporting period</small><strong>{reportingPeriod ?? '—'}</strong></span>
            </div>
          </div>
          <h1>{greeting}, <span>{firstName}.</span></h1>
          <p>Portfolio insights will appear here when verified property data becomes available.</p>
          <div className="manager-welcome__actions">
            <button type="button" onClick={() => onNavigate('complaints')}>Review priorities <i className="bi bi-arrow-right" aria-hidden="true" /></button>
            <span><i className="bi bi-info-circle" aria-hidden="true" /> Portfolio status unavailable</span>
          </div>
        </div>

        <figure className="manager-welcome__visual manager-welcome__empty-feature">
          {featuredProperty ? (
            <>
              {featuredProperty.imageUrl && <img src={featuredProperty.imageUrl} alt="" />}
              <figcaption><span>Featured property</span><div><strong>{featuredProperty.name}</strong><small>{featuredProperty.occupancyLabel ?? 'Occupancy unavailable'}</small></div></figcaption>
            </>
          ) : (
            <figcaption>
              <span><i className="bi bi-stars" aria-hidden="true" /> Featured property</span>
              <div><strong>No featured property available</strong><small>Property details will appear when connected.</small></div>
            </figcaption>
          )}
        </figure>
      </section>

      <section aria-labelledby="dashboard-summary-title">
        <h2 id="dashboard-summary-title" className="visually-hidden">Property summary</h2>
        <div className="manager-stats-grid">{stats.map((stat) => <StatCard key={stat.id} stat={stat} />)}</div>
      </section>

      <div className="manager-overview-grid">
        <section className="manager-panel">
          <SectionHeader title="Requires attention" description="Items needing review will appear here" icon="bi-exclamation-diamond" />
          {attentionItems.length ? null : (
            <div className="manager-inline-empty"><span><i className="bi bi-inbox" aria-hidden="true" /></span><div><strong>Nothing to review yet</strong><p>Attention items will appear when manager data is available.</p></div></div>
          )}
        </section>

        <section className="manager-panel manager-insight">
          <SectionHeader title="Occupancy insight" description="Verified portfolio occupancy" icon="bi-pie-chart" />
          <div className={`manager-occupancy ${occupancy ? '' : 'manager-occupancy--empty'}`}>
            <div
              className="manager-occupancy__ring"
              style={occupancy?.percentage != null ? { background: `conic-gradient(#6366f1 0 ${occupancy.percentage}%, rgba(255,255,255,.08) ${occupancy.percentage}%)` } : undefined}
            ><span><strong>{occupancy?.percentage != null ? `${occupancy.percentage}%` : '—'}</strong><small>occupancy</small></span></div>
            <div>
              <div><span>Occupied</span><strong>{occupancy?.occupied ?? '—'}</strong></div>
              <div><span>Vacant</span><strong>{occupancy?.vacant ?? '—'}</strong></div>
              <p>No occupancy data yet</p>
            </div>
          </div>
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
