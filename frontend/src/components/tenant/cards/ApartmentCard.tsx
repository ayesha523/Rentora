import { Link } from "react-router-dom";
import { tenantApartment } from "../../../data/tenantDashboardData";

function ApartmentCard() {
  const { name, block, flat, status, rent, moveInDate } = tenantApartment;

  return (
    <aside className="tenant-apartment-card">
      <div className="tenant-card-header">
        <div>
          <span className="tenant-card-label">My Apartment</span>
          <h2>{name}</h2>
          <p>{block} • {flat}</p>
        </div>

        <Link to="/tenant/apartment" className="tenant-card-link">
          View Details →
        </Link>
      </div>

      <div className="tenant-apartment-image">
        <div className="tenant-apartment-image__placeholder">Apartment Image</div>
      </div>

      <div className="tenant-status">
        <span className="status-badge">
          <i className="bi bi-check-circle-fill"></i>
          {status}
        </span>
      </div>

      <div className="tenant-apartment-footer">
        <div>
          <small>Monthly Rent</small>
          <h4>{rent}</h4>
        </div>

        <div>
          <small>Move-in Date</small>
          <h4>{moveInDate}</h4>
        </div>
      </div>
    </aside>
  );
}

export default ApartmentCard;