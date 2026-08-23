import { useEffect, useState } from 'react';
import ManagerSidebar from '../../components/manager/ManagerSidebar';
import ManagerTopbar from '../../components/manager/ManagerTopbar';
import OverviewSection from '../../components/manager/sections/OverviewSection';
import {
  ComplaintsSection,
  ReportsSection,
  TenantsSection,
  UtilitiesSection,
} from '../../components/manager/sections/ManagementSections';
import { ApartmentsSection, FlatsSection, NoticesSection, RentSection } from '../../components/manager/sections/PropertyRecordSections';
import { managerNavigation, type ManagerSection } from '../../data/managerManagementData';
import { useAuth } from '../../context/AuthContext';
import { getAuthenticatedUserIdentity } from '../../utils/authDisplay';
import '../../styles/manager-dashboard.css';

function ManagerDashboard() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<ManagerSection>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const currentSection = managerNavigation.find((item) => item.id === activeSection) ?? managerNavigation[0];
  const identity = getAuthenticatedUserIdentity(user);

  useEffect(() => {
    document.title = `${currentSection.shortLabel} | Rentora Manager`;
  }, [currentSection.shortLabel]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const selectSection = (section: ManagerSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    setAnnouncement('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection firstName={identity.firstName} onNavigate={selectSection} onComingSoon={setAnnouncement} />;
      case 'apartments': return <ApartmentsSection />;
      case 'flats': return <FlatsSection />;
      case 'tenants': return <TenantsSection />;
      case 'rent': return <RentSection />;
      case 'utilities': return <UtilitiesSection />;
      case 'complaints': return <ComplaintsSection />;
      case 'notices': return <NoticesSection />;
      case 'reports': return <ReportsSection />;
    }
  };

  return (
    <div className="manager-app-shell">
      <ManagerSidebar activeSection={activeSection} isOpen={mobileMenuOpen} onSelect={selectSection} onClose={() => setMobileMenuOpen(false)} />
      <div className="manager-app-main">
        <ManagerTopbar identity={identity} section={currentSection} onMenuOpen={() => setMobileMenuOpen(true)} />
        <main className="manager-app-content">
          <p className="visually-hidden" role="status" aria-live="polite">{announcement || `${currentSection.label} selected`}</p>
          <div key={activeSection} className="manager-section-transition">{renderActiveSection()}</div>
        </main>
      </div>
    </div>
  );
}

export default ManagerDashboard;
