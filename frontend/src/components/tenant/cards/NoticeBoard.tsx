import { Link } from "react-router-dom";
import { tenantNotices } from "../../../data/tenantDashboardData";

function NoticeBoard() {
  return (
    <div className="dashboard-card notice-card">
      <div className="card-header-custom">
        <h5>Notice Board</h5>
        <Link to="/tenant/notices">View All</Link>
      </div>

      <div className="notice-list">
        {tenantNotices.map((notice) => (
          <div key={notice.id} className="notice-item">
            <div className="notice-text">
              <strong>{notice.title}</strong>
              <small>{notice.preview}</small>
            </div>

            <div className="notice-tag">
              <i className={`bi ${notice.icon}`}></i>
              <span>{notice.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticeBoard;