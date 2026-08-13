import { useMemo, useState } from 'react';
import './Tenant.css';

type ComplaintStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
type ComplaintPriority = 'Low' | 'Normal' | 'High' | 'Urgent';
type ComplaintFilter = 'all' | 'open' | 'in-progress' | 'resolved' | 'closed' | 'priority';

type ComplaintRecord = {
  id: string;
  title: string;
  category: string;
  submittedDate: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  lastUpdated: string;
  description: string;
  updates: string[];
};

const complaints: ComplaintRecord[] = [
  {
    id: 'CT-1042',
    title: 'Water leakage in bathroom sink',
    category: 'Plumbing',
    submittedDate: 'Aug 03, 2026',
    priority: 'High',
    status: 'In Progress',
    lastUpdated: 'Aug 07, 2026',
    description: 'A slow leak near the bathroom sink is causing damp patches under the vanity and the ceiling below is showing early signs of moisture.',
    updates: [
      'Maintenance team inspected the plumbing and identified the supply line connection issue.',
      'Replacement part has been ordered and expected to arrive within two working days.',
    ],
  },
  {
    id: 'CT-1017',
    title: 'Intermittent power cut in master bedroom',
    category: 'Electrical',
    submittedDate: 'Jul 28, 2026',
    priority: 'Urgent',
    status: 'Open',
    lastUpdated: 'Jul 30, 2026',
    description: 'The bedroom circuit trips occasionally during evening hours and causes the lights and power socket to reset unexpectedly.',
    updates: [
      'The issue has been escalated to the facilities electrician for inspection.',
      'Awaiting confirmation on the earliest visit window.',
    ],
  },
  {
    id: 'CT-0994',
    title: 'Garage light not working',
    category: 'Maintenance',
    submittedDate: 'Jul 16, 2026',
    priority: 'Normal',
    status: 'Resolved',
    lastUpdated: 'Jul 20, 2026',
    description: 'The motion sensor light in the north-side garage entrance is not turning on at night.',
    updates: [
      'Lighting fixture replaced by the building contractor.',
      'Performance check completed and the issue was resolved successfully.',
    ],
  },
];

const summaryCards = [
  { label: 'Total Complaints', value: complaints.length, tone: 'primary' },
  { label: 'Open', value: complaints.filter((item) => item.status === 'Open').length, tone: 'warning' },
  { label: 'In Progress', value: complaints.filter((item) => item.status === 'In Progress').length, tone: 'info' },
  { label: 'Resolved', value: complaints.filter((item) => item.status === 'Resolved').length, tone: 'success' },
];

function ComplaintsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<ComplaintFilter>('all');
  const [selectedId, setSelectedId] = useState<string>(complaints[0]?.id ?? '');

  const visibleComplaints = useMemo(() => {
    const term = search.toLowerCase();
    return complaints.filter((complaint) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'open' && complaint.status === 'Open') ||
        (filter === 'in-progress' && complaint.status === 'In Progress') ||
        (filter === 'resolved' && complaint.status === 'Resolved') ||
        (filter === 'closed' && complaint.status === 'Closed') ||
        (filter === 'priority' && complaint.priority === 'High');

      const matchesSearch =
        complaint.title.toLowerCase().includes(term) ||
        complaint.category.toLowerCase().includes(term) ||
        complaint.id.toLowerCase().includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const selectedComplaint = visibleComplaints.find((complaint) => complaint.id === selectedId) ?? visibleComplaints[0] ?? null;

  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-stats-grid tenant-stats-grid--compact">
          {summaryCards.map((item) => (
            <div key={item.label} className="tenant-stat-card">
              <div className={`tenant-stat-card__icon tenant-stat-card__icon--${item.tone}`}>
                <i className="bi bi-journal-text" aria-hidden="true" />
              </div>
              <div>
                <p className="tenant-stat-card__label">{item.label}</p>
                <div className="tenant-stat-card__value tenant-stat-card__value--sm">{item.value}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="tenant-panel">
          <div className="tenant-panel__header tenant-panel__header--split">
            <div>
              <span className="tenant-panel__eyebrow">Tracking</span>
              <h3>Complaint History</h3>
            </div>
            <div className="tenant-search-inline">
              <i className="bi bi-search" aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search complaints"
                aria-label="Search complaints"
              />
            </div>
          </div>

          <div className="tenant-filter-group" role="tablist" aria-label="Complaint filters">
            {[
              { label: 'All', value: 'all' },
              { label: 'Open', value: 'open' },
              { label: 'In Progress', value: 'in-progress' },
              { label: 'Resolved', value: 'resolved' },
              { label: 'Closed', value: 'closed' },
              { label: 'Priority', value: 'priority' },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                className={`tenant-filter-button ${filter === item.value ? 'active' : ''}`}
                onClick={() => setFilter(item.value as ComplaintFilter)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {visibleComplaints.length === 0 ? (
          <section className="tenant-panel">
            <div className="tenant-empty-state">
              <div className="tenant-empty-state__icon">
                <i className="bi bi-chat-left-text" aria-hidden="true" />
              </div>
              <h4>No complaints found</h4>
              <p>There are no complaints matching the current search or filter.</p>
              <a href="/tenant/complaints/new" className="btn btn-rentora btn-rentora--compact">Submit a Complaint</a>
            </div>
          </section>
        ) : (
          <div className="tenant-two-column-layout">
            <section className="tenant-panel">
              <div className="tenant-panel__header">
                <div>
                  <span className="tenant-panel__eyebrow">Records</span>
                  <h3>Complaint List</h3>
                </div>
              </div>

              <div className="tenant-complaint-list">
                {visibleComplaints.map((complaint) => (
                  <button
                    key={complaint.id}
                    type="button"
                    className={`tenant-complaint-item ${selectedComplaint?.id === complaint.id ? 'selected' : ''}`}
                    onClick={() => setSelectedId(complaint.id)}
                  >
                    <div className="tenant-complaint-item__top">
                      <div>
                        <span className="tenant-complaint-id">{complaint.id}</span>
                        <h4>{complaint.title}</h4>
                      </div>
                      <span className={`tenant-table-badge tenant-table-badge--${complaint.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {complaint.status}
                      </span>
                    </div>

                    <div className="tenant-complaint-item__meta">
                      <span>{complaint.category}</span>
                      <span>{complaint.submittedDate}</span>
                      <span>{complaint.priority}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {selectedComplaint && (
              <section className="tenant-panel">
                <div className="tenant-panel__header">
                  <div>
                    <span className="tenant-panel__eyebrow">Details</span>
                    <h3>{selectedComplaint.title}</h3>
                  </div>
                  <span className={`tenant-table-badge tenant-table-badge--${selectedComplaint.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {selectedComplaint.status}
                  </span>
                </div>

                <div className="tenant-detail-grid">
                  <div>
                    <span>Complaint ID</span>
                    <strong>{selectedComplaint.id}</strong>
                  </div>
                  <div>
                    <span>Category</span>
                    <strong>{selectedComplaint.category}</strong>
                  </div>
                  <div>
                    <span>Priority</span>
                    <strong>{selectedComplaint.priority}</strong>
                  </div>
                  <div>
                    <span>Submitted</span>
                    <strong>{selectedComplaint.submittedDate}</strong>
                  </div>
                  <div>
                    <span>Last updated</span>
                    <strong>{selectedComplaint.lastUpdated}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{selectedComplaint.status}</strong>
                  </div>
                </div>

                <div className="tenant-detail-description">
                  <h4>Description</h4>
                  <p>{selectedComplaint.description}</p>
                </div>

                <div className="tenant-detail-timeline">
                  <h4>Updates</h4>
                  <ul>
                    {selectedComplaint.updates.map((update) => (
                      <li key={update}>{update}</li>
                    ))}
                  </ul>
                </div>

                <div className="tenant-detail-attachments">
                  <h4>Attachments</h4>
                  <span>No attachments uploaded</span>
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default ComplaintsPage;
