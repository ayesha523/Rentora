function TenantDashboard() {
  return (
    <main className="container py-5">
      <h1 className="mb-4 text-white fw-bold">
    Tenant Dashboard
</h1>
      <div className="row g-4">

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
             <h5 className="fw-bold">
    Tenant Information
</h5>
              <hr />
              <p><strong>Name:</strong> Sarah Zaman</p>
              <p><strong>Apartment:</strong> Green View Apartment</p>
              <p><strong>Flat:</strong> A-302</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Monthly Rent</h5>
              <hr />
              <h3 className="text-primary">৳ 15,000</h3>
              <span className="badge bg-success">
                Paid
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Utility Bills</h5>
              <hr />
              <p>Electricity : ৳1200</p>
              <p>Water : ৳350</p>
              <p>Gas : ৳800</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Complaint Status</h5>
              <hr />
              <span className="badge bg-warning text-dark">
                Under Review
              </span>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body">
              <h5>Recent Notices</h5>
              <div className="col-12">
 <div className="card shadow border-0 rounded-4">
    <div className="card-body">
      <h5>Payment History</h5>
      <hr />

      <table className="table">
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
              <ul>
                <li>Water supply maintenance on Sunday.</li>
                <li>Monthly meeting on Friday.</li>
                <li>Parking area cleaning next week.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

export default TenantDashboard;