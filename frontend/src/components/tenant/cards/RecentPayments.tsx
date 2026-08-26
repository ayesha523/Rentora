import { Link } from "react-router-dom";

interface TenantPayment {
  id: number;
  title: string;
  paymentDate: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
}

interface RecentPaymentsProps {
  payments?: TenantPayment[];
}

function RecentPayments({ payments = [] }: RecentPaymentsProps) {
  return (
    <div className="dashboard-card">
      <div className="card-header-custom">
        <h5>Recent Payments</h5>
        <Link to="/tenant/rent-bills">View All</Link>
      </div>

      <div className="dashboard-list">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <div key={payment.id} className="dashboard-list-item">
              <div>
                <h6>{payment.title}</h6>
                <small>{payment.paymentDate}</small>
              </div>

              <div className="payment-right">
                <strong>{payment.amount}</strong>

                <span
                  className={`status-pill status-pill--${payment.status.toLowerCase()}`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="dashboard-list-item">
            <div>
              <h6>No payments yet</h6>
              <small>Your recent payment activity will appear here.</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentPayments;