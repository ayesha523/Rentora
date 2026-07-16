import { useState } from "react";

function SubmitComplaintPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !description) {
      alert("Please fill all required fields.");
      return;
    }

    setMessage("Complaint submitted successfully!");

    setTitle("");
    setCategory("");
    setPriority("Low");
    setDescription("");
  };

  return (
    <main className="container py-5">
      <h1 className="mb-4">Submit Complaint</h1>

      <div className="card shadow-sm">
        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Complaint Title
              </label>

              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Category
              </label>

              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option>Water</option>
                <option>Electricity</option>
                <option>Maintenance</option>
                <option>Security</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Priority
              </label>

              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Description
              </label>

              <textarea
                rows={5}
                className="form-control"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Attachment (Optional)
              </label>

              <input
                type="file"
                className="form-control"
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Submit Complaint
            </button>

          </form>

          {message && (
            <div className="alert alert-success mt-4">
              {message}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

export default SubmitComplaintPage;