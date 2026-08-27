import { Link } from "react-router-dom";

interface ApartmentCardProps {
  name?: string | null;
  block?: string | null;
  flat?: string | null;
  status?: "Occupied" | "Vacant" | null;
  rent?: string | null;
  moveInDate?: string | null;
}

function ApartmentCard({
  name,
  block,
  flat,
  status,
  rent,
  moveInDate,
}: ApartmentCardProps) {
  const hasApartment = Boolean(name || block || flat);

  return (
    <aside className="tenant-apartment-card">
      <div className="tenant-card-header">
        <div>
          <span className="tenant-card-label">
            My Apartment
          </span>

          <h2>{name || "No apartment assigned"}</h2>

          <p>
            {hasApartment
              ? [block, flat]
                  .filter(Boolean)
                  .join(" • ")
              : "Apartment details will appear here"}
          </p>
        </div>

        <Link
          to="/tenant/apartment"
          className="tenant-card-link"
        >
          View Details →
        </Link>
      </div>

      <div className="tenant-apartment-image">
        <div className="tenant-apartment-image__placeholder">
          <i className="bi bi-building"></i>
        </div>
      </div>

      <div className="tenant-status">
        <span className="status-badge">
          <i className="bi bi-building"></i>
          {status || "No status"}
        </span>
      </div>

      <div className="tenant-apartment-footer">
        <div>
          <small>Monthly Rent</small>
          <h4>{rent || "No data yet"}</h4>
        </div>

        <div>
          <small>Move-in Date</small>
          <h4>{moveInDate || "No data yet"}</h4>
        </div>
      </div>
    </aside>
  );
}

export default ApartmentCard;