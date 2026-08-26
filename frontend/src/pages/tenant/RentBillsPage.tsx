import "./Tenant.css";

interface SummaryCard {
  label: string;
  value?: string | null;
  detail?: string | null;
  tone: "primary" | "warning" | "info" | "success";
}

interface BillingItem {
  label: string;
  amount: string;
}

interface PaymentHistoryItem {
  id: string | number;
  month: string;
  date: string;
  amount: string;
  method: string;
  reference: string;
  status: "Paid" | "Pending" | "Overdue";
}

interface RentBillsData {
  summaryCards?: SummaryCard[];
  billingTitle?: string | null;
  dueDate?: string | null;
  paymentStatus?: string | null;
  rentAmount?: string | null;
  utilityAmount?: string | null;
  otherCharges?: string | null;
  totalAmount?: string | null;
  billingBreakdown?: BillingItem[];
  paymentHistory?: PaymentHistoryItem[];
}

interface RentBillsPageProps {
  data?: RentBillsData | null;
}

const defaultSummaryCards: SummaryCard[] = [
  {
    label: "Monthly Rent",
    value: null,
    detail: null,
    tone: "primary",
  },
  {
    label: "Current Amount Due",
    value: null,
    detail: null,
    tone: "warning",
  },
  {
    label: "Next Due Date",
    value: null,
    detail: null,
    tone: "info",
  },
  {
    label: "Payment Status",
    value: null,
    detail: null,
    tone: "success",
  },
];

function RentBillsPage({ data = null }: RentBillsPageProps) {
  const summaryCards = data?.summaryCards ?? defaultSummaryCards;
  const billingBreakdown = data?.billingBreakdown ?? [];
  const paymentHistory = data?.paymentHistory ?? [];

  const hasCurrentBill = Boolean(
    data?.dueDate ||
      data?.paymentStatus ||
      data?.rentAmount ||
      data?.utilityAmount ||
      data?.otherCharges ||
      data?.totalAmount
  );

  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-stats-grid tenant-stats-grid--compact">
          {summaryCards.map((item) => (
            <div key={item.label} className="tenant-stat-card">
              <div
                className={`tenant-stat-card__icon tenant-stat-card__icon--${item.tone}`}
              >
                <i className="bi bi-cash-stack" aria-hidden="true" />
              </div>

              <div>
                <p className="tenant-stat-card__label">{item.label}</p>

                <div className="tenant-stat-card__value tenant-stat-card__value--sm">
                  {item.value || "No data yet"}
                </div>

                <p className="tenant-stat-card__subtitle">
                  {item.detail || "No information available"}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="tenant-panel tenant-panel--featured">
          <div className="tenant-panel__header tenant-panel__header--split">
            <div>
              <span className="tenant-panel__eyebrow">Current Payment</span>
              <h3>{data?.billingTitle || "No current billing data"}</h3>
            </div>

            <span className="status-badge">
              <i className="bi bi-clock-history" aria-hidden="true" />
              {data?.paymentStatus || "No status"}
            </span>
          </div>

          <div className="tenant-payment-hero">
            <div>
              <small>Due date</small>
              <strong>{data?.dueDate || "No data yet"}</strong>
            </div>

            <div>
              <small>Payment status</small>
              <strong>{data?.paymentStatus || "No data yet"}</strong>
            </div>
          </div>

          <div className="tenant-payment-summary">
            {hasCurrentBill ? (
              <>
                <div className="tenant-payment-summary__row">
                  <span>Rent</span>
                  <strong>{data?.rentAmount || "No data yet"}</strong>
                </div>

                <div className="tenant-payment-summary__row">
                  <span>Utility Charges</span>
                  <strong>{data?.utilityAmount || "No data yet"}</strong>
                </div>

                <div className="tenant-payment-summary__row">
                  <span>Other Charges</span>
                  <strong>{data?.otherCharges || "No data yet"}</strong>
                </div>

                <div className="tenant-payment-summary__row tenant-payment-summary__row--total">
                  <span>Total Amount</span>
                  <strong>{data?.totalAmount || "No data yet"}</strong>
                </div>
              </>
            ) : (
              <div className="tenant-payment-summary__row">
                <span>Current Billing</span>
                <strong>No billing data yet</strong>
              </div>
            )}
          </div>

          <div className="tenant-actions-row tenant-actions-row--align-end">
            <button
              type="button"
              className="btn btn-secondary btn-secondary--compact"
              disabled={!hasCurrentBill}
            >
              View Invoice
            </button>

            <button
              type="button"
              className="btn btn-rentora btn-rentora--compact"
              disabled={!hasCurrentBill}
            >
              Pay Rent
            </button>
          </div>
        </section>

        <div className="tenant-two-column-layout">
          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Details</span>
                <h3>Billing Breakdown</h3>
              </div>
            </div>

            <div className="tenant-billing-list">
              {billingBreakdown.length > 0 ? (
                billingBreakdown.map((item) => (
                  <div key={item.label} className="tenant-billing-list__row">
                    <span>{item.label}</span>
                    <strong>{item.amount}</strong>
                  </div>
                ))
              ) : (
                <div className="tenant-billing-list__row">
                  <span>Billing details</span>
                  <strong>No billing details available</strong>
                </div>
              )}
            </div>
          </section>

          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Receipts</span>
                <h3>Quick Actions</h3>
              </div>
            </div>

            <div className="tenant-quick-stack">
              <button
                type="button"
                className="tenant-quick-action"
                disabled={!hasCurrentBill}
              >
                <span>
                  <i className="bi bi-receipt" aria-hidden="true" /> Download
                  Invoice
                </span>
                <i className="bi bi-arrow-right-short" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="tenant-quick-action"
                disabled={paymentHistory.length === 0}
              >
                <span>
                  <i className="bi bi-file-earmark-text" aria-hidden="true" />{" "}
                  View Receipt
                </span>
                <i className="bi bi-arrow-right-short" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="tenant-quick-action"
                disabled={paymentHistory.length === 0}
              >
                <span>
                  <i className="bi bi-credit-card" aria-hidden="true" /> Payment
                  History
                </span>
                <i className="bi bi-arrow-right-short" aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>

        <section className="tenant-panel">
          <div className="tenant-panel__header tenant-panel__header--split">
            <div>
              <span className="tenant-panel__eyebrow">Transactions</span>
              <h3>Payment History</h3>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-secondary--compact"
              disabled={paymentHistory.length === 0}
            >
              Download Statement
            </button>
          </div>

          {paymentHistory.length > 0 ? (
            <div className="tenant-table-wrap">
              <table className="tenant-data-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Payment Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Reference</th>
                    <th>Status</th>
                    <th>Receipt</th>
                  </tr>
                </thead>

                <tbody>
                  {paymentHistory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.month}</td>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>{item.method}</td>
                      <td>{item.reference}</td>
                      <td>
                        <span
                          className={`tenant-table-badge tenant-table-badge--${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button type="button" className="tenant-link-button">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="tenant-info-card">
              <small>Payment History</small>
              <strong>No payment history yet</strong>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default RentBillsPage;