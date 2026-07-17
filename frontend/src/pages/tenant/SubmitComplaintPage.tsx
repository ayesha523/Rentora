import "./Tenant.css";

function SubmitComplaintPage() {
  return (
    <main className="page-dark">

      <div className="container">

        <h1 className="page-title">
          Submit Complaint
        </h1>

        <div className="card glass-card">

          <div className="card-body">

            <div className="mb-3">
              <label className="form-label text-white">
                Subject
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter complaint subject"
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">
                Description
              </label>

              <textarea
                rows={5}
                className="form-control"
                placeholder="Describe your issue..."
              ></textarea>
            </div>

            <button className="btn btn-rentora">
              Submit Complaint
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default SubmitComplaintPage;