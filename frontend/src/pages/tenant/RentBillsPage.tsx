import './Tenant.css';

const summaryCards = [
  { label: 'Monthly Rent', value: '৳20,000', detail: 'August 2026', tone: 'primary' },
  { label: 'Current Amount Due', value: '৳22,675', detail: 'Includes utilities', tone: 'warning' },
  { label: 'Next Due Date', value: 'Aug 10, 2026', detail: 'Due in 4 days', tone: 'info' },
  { label: 'Payment Status', value: 'Pending', detail: 'Awaiting confirmation', tone: 'success' },
];

const billingBreakdown = [
  { label: 'Monthly Rent', amount: '৳20,000' },
  { label: 'Water & Gas', amount: '৳1,250' },
  { label: 'Internet & Utilities', amount: '৳1,425' },
  { label: 'Management Fee', amount: '৳0' },
];

const paymentHistory = [
  { month: 'Jul 2026', date: 'Jul 05, 2026', amount: '৳20,000', method: 'Bank Transfer', reference: 'RT-20260705-201', status: 'Paid' },
  { month: 'Jun 2026', date: 'Jun 04, 2026', amount: '৳20,000', method: 'Bank Transfer', reference: 'RT-20260604-188', status: 'Paid' },
  { month: 'May 2026', date: 'May 05, 2026', amount: '৳20,000', method: 'Mobile Banking', reference: 'RT-20260505-154', status: 'Paid' },
  { month: 'Apr 2026', date: 'Apr 03, 2026', amount: '৳20,000', method: 'Bank Transfer', reference: 'RT-20260403-140', status: 'Paid' },
  { month: 'Mar 2026', date: 'Mar 03, 2026', amount: '৳20,000', method: 'Bank Transfer', reference: 'RT-20260303-118', status: 'Paid' },
];

function RentBillsPage() {
  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-stats-grid tenant-stats-grid--compact">
          {summaryCards.map((item) => (
            <div key={item.label} className="tenant-stat-card">
              <div className={`tenant-stat-card__icon tenant-stat-card__icon--${item.tone}`}>
                <i className="bi bi-cash-stack" aria-hidden="true" />
              </div>
              <div>
                <p className="tenant-stat-card__label">{item.label}</p>
                <div className="tenant-stat-card__value tenant-stat-card__value--sm">{item.value}</div>
                <p className="tenant-stat-card__subtitle">{item.detail}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="tenant-panel tenant-panel--featured">
          <div className="tenant-panel__header tenant-panel__header--split">
            <div>
              <span className="tenant-panel__eyebrow">Current Payment</span>
              <h3>August 2026 Billing</h3>
            </div>
            <span className="status-badge status-badge--warning">
              <i className="bi bi-clock-history" aria-hidden="true" />
              Pending
            </span>
          </div>

          <div className="tenant-payment-hero">
            <div>
              <small>Due date</small>
              <strong>August 10, 2026</strong>
            </div>
            <div>
              <small>Payment status</small>
              <strong>Waiting for payment</strong>
            </div>
          </div>

          <div className="tenant-payment-summary">
            <div className="tenant-payment-summary__row">
              <span>Rent</span>
              <strong>৳20,000</strong>
            </div>
            <div className="tenant-payment-summary__row">
              <span>Utility Charges</span>
              <strong>৳1,250</strong>
            </div>
            <div className="tenant-payment-summary__row">
              <span>Other Charges</span>
              <strong>৳1,425</strong>
            </div>
            <div className="tenant-payment-summary__row tenant-payment-summary__row--total">
              <span>Total Amount</span>
              <strong>৳22,675</strong>
            </div>
          </div>

          <div className="tenant-actions-row tenant-actions-row--align-end">
            <button type="button" className="btn btn-secondary btn-secondary--compact">
              View Invoice
            </button>
            <button type="button" className="btn btn-rentora btn-rentora--compact">
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
              {billingBreakdown.map((item) => (
                <div key={item.label} className="tenant-billing-list__row">
                  <span>{item.label}</span>
                  <strong>{item.amount}</strong>
                </div>
              ))}
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
              <button type="button" className="tenant-quick-action">
                <span><i className="bi bi-receipt" aria-hidden="true" /> Download Invoice</span>
                <i className="bi bi-arrow-right-short" aria-hidden="true" />
              </button>
              <button type="button" className="tenant-quick-action">
                <span><i className="bi bi-file-earmark-text" aria-hidden="true" /> View Receipt</span>
                <i className="bi bi-arrow-right-short" aria-hidden="true" />
              </button>
              <button type="button" className="tenant-quick-action">
                <span><i className="bi bi-credit-card" aria-hidden="true" /> Payment History</span>
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
            <button type="button" className="btn btn-secondary btn-secondary--compact">
              Download Statement
            </button>
          </div>

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
                  <tr key={`${item.month}-${item.reference}`}>
                    <td>{item.month}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>{item.method}</td>
                    <td>{item.reference}</td>
                    <td>
                      <span className={`tenant-table-badge tenant-table-badge--${item.status.toLowerCase()}`}>
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
        </section>
      </div>
    </main>
  );
}

export default RentBillsPage;
