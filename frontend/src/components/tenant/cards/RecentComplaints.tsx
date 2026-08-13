import { Link } from "react-router-dom";
import { tenantComplaints } from "../../../data/tenantDashboardData";

function RecentComplaints() {
  return (
    <div className="dashboard-card">
      <div className="card-header-custom">
        <h5>Recent Complaints</h5>
        <Link to="/tenant/complaints">View All</Link>
      </div>

      <div className="dashboard-list">
        {tenantComplaints.map((complaint) => (
          <Link
            key={complaint.id}
            to="/tenant/complaints"
            className="dashboard-list-item dashboard-list-item--link"
          >
            <div className="item-text">
              <span>{complaint.title}</span>
              <small>
                {complaint.submittedDate} · {complaint.status}
              </small>
            </div>
            <i className="bi bi-chevron-right"></i>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentComplaints;