import "./Tenant.css";

function TenantDashboard() {
  return (
    <main className="page-dark">
      <div className="container">

        <h1 className="page-title">
          Tenant Dashboard
        </h1>

        <div className="row g-4">

          {/* Tenant Information */}
          <div className="col-md-6">
            <div className="card glass-card">
              <div className="card-body">
                <h5>Tenant Information</h5>
                <hr />

                <p><strong>Name:</strong> Lutfa Nahar</p>
                <p><strong>Apartment:</strong> Green View Apartment</p>
                <p><strong>Flat:</strong> A-302</p>
              </div>
            </div>
          </div>

          {/* Monthly Rent */}
          <div className="col-md-6">
            <div className="card glass-card">
              <div className="card-body">
                <h5>Monthly Rent</h5>
                <hr />

                <h3 style={{ color: "#52b8ff" }}>৳ 15,000</h3>

                <span className="badge bg-success">
                  Paid
                </span>
              </div>
            </div>
          </div>

          {/* Utility Bills */}
          <div className="col-md-6">
            <div className="card glass-card">
              <div className="card-body">
                <h5>Utility Bills</h5>
                <hr />

                <p>Electricity : ৳1200</p>
                <p>Water : ৳350</p>
                <p>Gas : ৳800</p>
              </div>
            </div>
          </div>

          {/* Complaint Status */}
          <div className="col-md-6">
            <div className="card glass-card">
              <div className="card-body">
                <h5>Complaint Status</h5>
                <hr />

                <span className="badge bg-warning text-dark">
                  Under Review
                </span>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="col-12">
            <div className="card glass-card">
              <div className="card-body">

                <h5>Payment History</h5>
                <hr />

                <table className="table table-dark-custom">

                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td>May</td>
                      <td>৳15,000</td>
                      <td>
                        <span className="badge bg-success">
                          Paid
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>June</td>
                      <td>৳15,000</td>
                      <td>
                        <span className="badge bg-success">
                          Paid
                        </span>
                      </td>
                    </tr>

                  </tbody>

                </table>

              </div>
            </div>
          </div>

          {/* Recent Notices */}
          <div className="col-12">
            <div className="card glass-card">
              <div className="card-body">

                <h5>Recent Notices</h5>
                <hr />

                <ul>
                  <li>Water supply maintenance on Sunday.</li>
                  <li>Monthly meeting on Friday.</li>
                  <li>Parking area cleaning next week.</li>
                </ul>

              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

export default TenantDashboard;