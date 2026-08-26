import { useMemo, useState } from "react";
import "./Tenant.css";

type ComplaintStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type ComplaintPriority = "Low" | "Normal" | "High" | "Urgent";
type ComplaintFilter =
  | "all"
  | "open"
  | "in-progress"
  | "resolved"
  | "closed"
  | "priority";

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

const complaints: ComplaintRecord[] = [];

const summaryCards = [
  { label: "Total Complaints", value: "No data yet", tone: "primary" },
  { label: "Open", value: "No data yet", tone: "warning" },
  { label: "In Progress", value: "No data yet", tone: "info" },
  { label: "Resolved", value: "No data yet", tone: "success" },
];

function ComplaintsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ComplaintFilter>("all");
  const [selectedId, setSelectedId] = useState<string>("");

  const visibleComplaints = useMemo(() => {
    const term = search.toLowerCase();

    return complaints.filter((complaint) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "open" && complaint.status === "Open") ||
        (filter === "in-progress" &&
          complaint.status === "In Progress") ||
        (filter === "resolved" && complaint.status === "Resolved") ||
        (filter === "closed" && complaint.status === "Closed") ||
        (filter === "priority" && complaint.priority === "High");

      const matchesSearch =
        complaint.title.toLowerCase().includes(term) ||
        complaint.category.toLowerCase().includes(term) ||
        complaint.id.toLowerCase().includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const selectedComplaint =
    visibleComplaints.find((complaint) => complaint.id === selectedId) ??
    visibleComplaints[0] ??
    null;

  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-stats-grid tenant-stats-grid--compact">
          {summaryCards.map((item) => (
            <div key={item.label} className="tenant-stat-card">
              <div
                className={`tenant-stat-card__icon tenant-stat-card__icon--${item.tone}`}
              >
                <i className="bi bi-journal-text" aria-hidden="true" />
              </div>

              <div>
                <p className="tenant-stat-card__label">{item.label}</p>
                <div className="tenant-stat-card__value tenant-stat-card__value--sm">
                  {item.value}
                </div>
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

          <div
            className="tenant-filter-group"
            role="tablist"
            aria-label="Complaint filters"
          >
            {[
              { label: "All", value: "all" },
              { label: "Open", value: "open" },
              { label: "In Progress", value: "in-progress" },
              { label: "Resolved", value: "resolved" },
              { label: "Closed", value: "closed" },
              { label: "Priority", value: "priority" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                className={`tenant-filter-button ${
                  filter === item.value ? "active" : ""
                }`}
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

              <h4>No complaints yet</h4>

              <p>
                Your submitted complaints and their status updates will appear
                here.
              </p>

              <a
                href="/tenant/complaints/new"
                className="btn btn-rentora btn-rentora--compact"
              >
                Submit a Complaint
              </a>
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
                    className={`tenant-complaint-item ${
                      selectedComplaint?.id === complaint.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedId(complaint.id)}
                  >
                    <div className="tenant-complaint-item__top">
                      <div>
                        <span className="tenant-complaint-id">
                          {complaint.id}
                        </span>
                        <h4>{complaint.title}</h4>
                      </div>

                      <span
                        className={`tenant-table-badge tenant-table-badge--${complaint.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
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

                  <span
                    className={`tenant-table-badge tenant-table-badge--${selectedComplaint.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
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