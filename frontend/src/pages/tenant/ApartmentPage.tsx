import './Tenant.css';

const apartmentDetails = [
  { label: 'Bedrooms', value: '2 Bedroom' },
  { label: 'Bathrooms', value: '2' },
  { label: 'Floor', value: '4th Floor' },
  { label: 'Approx. Size', value: '1,260 sq ft' },
  { label: 'Unit Type', value: 'Premium Apartment' },
  { label: 'Furnishing', value: 'Semi-furnished' },
];

const leaseDetails = [
  { label: 'Lease Start', value: 'Jan 12, 2026' },
  { label: 'Lease Expiration', value: 'Jan 11, 2028' },
  { label: 'Monthly Rent', value: '৳20,000' },
  { label: 'Security Deposit', value: '৳40,000' },
  { label: 'Remaining Term', value: '14 months' },
];

const amenities = [
  'Parking',
  'Security',
  'Elevator',
  'Generator',
  'Water Supply',
  'Internet',
  'Housekeeping',
  'Guest Access',
];

function ApartmentPage() {
  return (
    <main className="page-dark">
      <div className="tenant-page-shell">
        <section className="tenant-page-hero tenant-property-hero">
          <div className="tenant-property-hero__visual">
            <div className="tenant-property-visual">
              <div className="tenant-property-visual__badge">Aurora Heights</div>
              <div className="tenant-property-visual__icon-wrap">
                <i className="bi bi-building" aria-hidden="true" />
              </div>
              <div className="tenant-property-visual__meta">
                <span>Block B</span>
                <span>Flat B-406</span>
              </div>
            </div>
          </div>

          <div className="tenant-property-hero__content">
            <div className="tenant-detail-kicker">Apartment Overview</div>
            <h2 className="tenant-page-title">Flat B-406</h2>
            <div className="tenant-property-line">
              <span className="tenant-property-line__label">Property</span>
              <strong>Aurora Heights Residences</strong>
            </div>

            <div className="tenant-property-meta-grid">
              <div>
                <span>Tenant</span>
                <strong>Lutfa Nahid</strong>
              </div>
              <div>
                <span>Occupancy</span>
                <strong>Occupied</strong>
              </div>
              <div>
                <span>Lease Status</span>
                <strong>Active</strong>
              </div>
              <div>
                <span>Monthly Rent</span>
                <strong>৳20,000</strong>
              </div>
            </div>

            <div className="tenant-property-status-row">
              <span className="status-badge status-badge--success">
                <i className="bi bi-check-circle-fill" aria-hidden="true" />
                Occupied
              </span>
              <span className="status-badge status-badge--info">
                <i className="bi bi-calendar3" aria-hidden="true" />
                Lease active
              </span>
            </div>
          </div>
        </section>

        <div className="tenant-two-column-layout">
          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Home Details</span>
                <h3>Apartment Details</h3>
              </div>
            </div>

            <div className="tenant-info-grid">
              {apartmentDetails.map((item) => (
                <div key={item.label} className="tenant-info-card">
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <aside className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Management</span>
                <h3>Property Contact</h3>
              </div>
            </div>

            <div className="tenant-contact-card">
              <div className="tenant-contact-card__header">
                <div className="tenant-avatar tenant-avatar--lg">LN</div>
                <div>
                  <strong>Rentora Management</strong>
                  <span>Property Office</span>
                </div>
              </div>

              <ul className="tenant-contact-list">
                <li>
                  <i className="bi bi-telephone" aria-hidden="true" />
                  +880 1700-000000
                </li>
                <li>
                  <i className="bi bi-envelope" aria-hidden="true" />
                  support@rentora.com
                </li>
                <li>
                  <i className="bi bi-geo-alt" aria-hidden="true" />
                  Block B, Aurora Heights
                </li>
              </ul>

              <div className="tenant-actions-row">
                <button type="button" className="btn btn-rentora btn-rentora--compact">
                  View Lease
                </button>
                <button type="button" className="btn btn-secondary btn-secondary--compact">
                  Contact Management
                </button>
              </div>
            </div>
          </aside>
        </div>

        <div className="tenant-two-column-layout">
          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Lease</span>
                <h3>Lease Information</h3>
              </div>
            </div>

            <div className="tenant-info-grid tenant-info-grid--compact">
              {leaseDetails.map((item) => (
                <div key={item.label} className="tenant-info-card">
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="tenant-panel">
            <div className="tenant-panel__header">
              <div>
                <span className="tenant-panel__eyebrow">Amenities</span>
                <h3>Property Amenities</h3>
              </div>
            </div>

            <div className="tenant-amenity-list">
              {amenities.map((amenity) => (
                <span key={amenity} className="tenant-amenity-chip">
                  <i className="bi bi-check-circle-fill" aria-hidden="true" />
                  {amenity}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ApartmentPage;
