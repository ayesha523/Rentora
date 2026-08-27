import { Link } from "react-router-dom";

interface TenantComplaint {
  id: number;
  title: string;
  submittedDate: string;
  status: "Open" | "In Progress" | "Resolved";
}

interface RecentComplaintsProps {
  complaints?: TenantComplaint[];
}

function RecentComplaints({
  complaints = [],
}: RecentComplaintsProps) {
  return (
    <div className="dashboard-card">
      <div className="card-header-custom">
        <h5>Recent Complaints</h5>

        <Link to="/tenant/complaints">
          View All
        </Link>
      </div>

      <div className="dashboard-list">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <Link
              key={complaint.id}
              to="/tenant/complaints"
              className="dashboard-list-item dashboard-list-item--link"
            >
              <div className="item-text">
                <span>{complaint.title}</span>

                <small>
                  {complaint.submittedDate} ·{" "}
                  {complaint.status}
                </small>
              </div>

              <i className="bi bi-chevron-right"></i>
            </Link>
          ))
        ) : (
          <div className="dashboard-list-item">
            <div className="item-text">
              <span>No complaints yet</span>

              <small>
                Your recent complaints will appear here.
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentComplaints;