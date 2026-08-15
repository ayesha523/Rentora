import { Link } from "react-router-dom";
import { tenantPayments } from "../../../data/tenantDashboardData";

function RecentPayments() {
  return (
    <div className="dashboard-card">
      <div className="card-header-custom">
        <h5>Recent Payments</h5>
        <Link to="/tenant/rent-bills">View All</Link>
      </div>

      <div className="dashboard-list">
        {tenantPayments.map((payment) => (
          <div key={payment.id} className="dashboard-list-item">
            <div>
              <h6>{payment.title}</h6>
              <small>{payment.paymentDate}</small>
            </div>

            <div className="payment-right">
              <strong>{payment.amount}</strong>

              <span className={`status-pill status-pill--${payment.status.toLowerCase()}`}>
                {payment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentPayments;