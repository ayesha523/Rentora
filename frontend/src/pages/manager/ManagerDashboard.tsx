import { useState } from 'react';
import SectionHeader from '../../components/dashboard/SectionHeader';
import StatCard from '../../components/dashboard/StatCard';
import {
  dashboardStats,
  quickActions,
  recentComplaints,
  recentNotices,
  recentPayments,
} from '../../data/managerDashboardData';
import '../../styles/manager-dashboard.css';

const statusClass = (status: string) =>
  `manager-status manager-status--${status.toLowerCase().replaceAll(' ', '-')}`;

function ManagerDashboard() {
  const [announcement, setAnnouncement] = useState('');
  const currentMonth = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const announceComingSoon = (action: string) => {
    setAnnouncement(`${action} is coming soon.`);
  };

  return (
    <main className="manager-dashboard">
      <header className="manager-welcome">
        <div className="manager-welcome__content">
          <span className="manager-welcome__eyebrow">Overview</span>
          <h1>Manager Dashboard</h1>
          <p>Monitor occupancy, rent collection, complaints, and notices from one place.</p>
        </div>
        <div className="manager-welcome__month" aria-label={`Current reporting period: ${currentMonth}`}>
          <i className="bi bi-calendar3" aria-hidden="true" />
          <span>
            <small>Current month</small>
            <strong>{currentMonth}</strong>
          </span>
        </div>
      </header>

      <section aria-labelledby="dashboard-summary-title">
        <h2 id="dashboard-summary-title" className="visually-hidden">Property summary</h2>
        <div className="manager-stats-grid">
          {dashboardStats.map((stat) => <StatCard key={stat.id} stat={stat} />)}
        </div>
      </section>

      <section className="manager-panel" aria-labelledby="payments-title">
        <SectionHeader title="Recent Rent Payments" description="Latest rent collection activity" icon="bi-wallet2" />
        <div className="table-responsive manager-table-wrap">
          <table className="table manager-table align-middle mb-0">
            <caption className="visually-hidden">Five most recent tenant rent payments</caption>
            <thead>
              <tr>
                <th scope="col">Tenant</th><th scope="col">Flat</th><th scope="col">Month</th>
                <th scope="col">Amount</th><th scope="col">Payment Date</th><th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="manager-table__primary">{payment.tenant}</td>
                  <td>{payment.flat}</td><td>{payment.month}</td><td>{payment.amount}</td>
                  <td>{payment.paymentDate}</td><td><span className={statusClass(payment.status)}>{payment.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="manager-content-grid">
        <section className="manager-panel" aria-labelledby="complaints-title">
          <SectionHeader title="Recent Complaints" description="Issues that may need your attention" icon="bi-chat-left-dots" />
          <div className="manager-list">
            {recentComplaints.map((complaint) => (
              <article className="manager-list-item" key={complaint.id}>
                <div className="manager-list-item__main">
                  <h3>{complaint.title}</h3><p>{complaint.tenantOrFlat}</p>
                  <time>{complaint.submittedDate}</time>
                </div>
                <div className="manager-list-item__badges">
                  <span className={statusClass(complaint.priority)}>{complaint.priority} priority</span>
                  <span className={statusClass(complaint.status)}>{complaint.status}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="manager-side-stack">
          <section className="manager-panel" aria-labelledby="notices-title">
            <SectionHeader title="Recent Notices" description="Recently published updates" icon="bi-megaphone" />
            <div className="manager-list manager-list--compact">
              {recentNotices.map((notice) => (
                <article className="manager-list-item" key={notice.id}>
                  <div className="manager-list-item__main">
                    <h3>{notice.title}</h3><time>{notice.publicationDate}</time>
                  </div>
                  <span className={statusClass(notice.category)}>{notice.category}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="manager-panel" aria-labelledby="actions-title">
            <SectionHeader title="Quick Actions" description="Common management tasks" icon="bi-lightning-charge" />
            <div className="manager-actions">
              {quickActions.map((action) => (
                <button key={action.id} type="button" className="manager-action" onClick={() => announceComingSoon(action.label)}>
                  <i className={`bi ${action.icon}`} aria-hidden="true" /><span>{action.label}</span>
                  <i className="bi bi-arrow-right" aria-hidden="true" />
                </button>
              ))}
            </div>
            <p className="manager-action-announcement" role="status" aria-live="polite">{announcement}</p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ManagerDashboard;
