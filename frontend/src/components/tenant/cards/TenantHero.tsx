import { Link } from "react-router-dom";

interface TenantHeroProps {
  firstName?: string | null;
  nextRentDue?: string | null;
  activeComplaints?: string | null;
  apartmentName?: string | null;
}

function TenantHero({
  firstName,
  nextRentDue,
  activeComplaints,
  apartmentName,
}: TenantHeroProps) {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="tenant-hero">
      <div className="tenant-hero__content">
        <div className="tenant-hero__top">
          <div>
            <span className="tenant-hero__eyebrow">
              Tenant Portal
            </span>

            <div className="tenant-hero__greeting">
              <p>Good Day,</p>

              <h1>
                <span>{firstName || "Tenant"}</span> 👋
              </h1>
            </div>
          </div>

          <div className="tenant-hero__month">
            <span className="tenant-hero__month-icon">
              <i className="bi bi-calendar3"></i>
            </span>

            <div>
              <small>Today</small>
              <strong>{today}</strong>
            </div>
          </div>
        </div>

        <div className="tenant-hero__meta">
          <div>
            <span className="tenant-hero__date">
              Next rent due
            </span>

            <strong>
              {nextRentDue || "No rent data yet"}
            </strong>
          </div>

          <div>
            <span className="tenant-hero__date">
              Active complaints
            </span>

            <strong>
              {activeComplaints || "No active complaints"}
            </strong>
          </div>
        </div>

        <p>
          Everything about your home in one place. Stay updated,
          comfortable, and connected with Rentora.
        </p>

        <div className="tenant-hero__buttons">
          <Link
            to="/tenant/complaints/new"
            className="btn btn-rentora"
          >
            <i className="bi bi-plus-lg me-2"></i>
            Submit Complaint
          </Link>

          <Link
            to="/tenant/apartment"
            className="btn btn-secondary"
          >
            View Apartment
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>

      <div className="tenant-hero__image">
        <div className="tenant-hero__image-placeholder">
          <i className="bi bi-building"></i>

          <span>
            {apartmentName || "No apartment assigned"}
          </span>
        </div>
      </div>
    </section>
  );
}

export default TenantHero;