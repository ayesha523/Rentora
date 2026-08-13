import TenantHero from "../cards/TenantHero";
import TenantStats from "../cards/TenantStats";
import ApartmentCard from "../cards/ApartmentCard";
import QuickActions from "../cards/QuickActions";
import RecentComplaints from "../cards/RecentComplaints";
import RecentPayments from "../cards/RecentPayments";
import NoticeBoard from "../cards/NoticeBoard";

function TenantOverviewSection() {
  return (
    <div className="tenant-overview">
      <div className="tenant-main-column">
        <TenantHero />
        <TenantStats />
        <RecentComplaints />
        <RecentPayments />
      </div>

      <aside className="tenant-side-column">
        <ApartmentCard />
        <QuickActions />
        <NoticeBoard />
      </aside>
    </div>
  );
}

export default TenantOverviewSection;