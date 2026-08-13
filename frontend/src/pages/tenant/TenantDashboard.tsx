import "./Tenant.css";
import TenantOverviewSection from "../../components/tenant/sections/TenantOverviewSection";

function TenantDashboard() {
  return (
    <main className="page-dark">
      <div className="container-fluid px-4 py-4">
        <TenantOverviewSection />
      </div>
    </main>
  );
}

export default TenantDashboard;