import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import TenantSidebar from '../components/tenant/TenantSidebar';
import TenantTopbar from '../components/tenant/TenantTopbar';
import '../styles/tenant-layout.css';

type RouteMeta = {
  title: string;
  subtitle?: string;
};

const routeMetaMap: Record<string, RouteMeta> = {
  '/tenant/dashboard': { title: 'Dashboard', subtitle: 'Overview of your home' },
  '/tenant/apartment': { title: 'My Apartment', subtitle: 'Details about your apartment' },
  '/tenant/rent-bills': { title: 'Rent & Bills', subtitle: 'Payments and billing history' },
  '/tenant/complaints/new': { title: 'Submit Complaint', subtitle: 'Report an issue' },
  '/tenant/complaints': { title: 'Complaint History', subtitle: 'Track past complaints' },
  '/tenant/notices': { title: 'Notices', subtitle: 'Community announcements' },
  '/tenant/profile': { title: 'Profile', subtitle: 'Manage your profile' },
  '/tenant/support': { title: 'Help & Support', subtitle: 'Get assistance' },
};

function TenantLayout() {
  const location = useLocation();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const meta = useMemo(() => {
    const path = location.pathname;
    return routeMetaMap[path] ?? { title: 'Tenant Portal', subtitle: '' };
  }, [location]);

  useEffect(() => {
    // Close drawer on route change only if open
    if (!isDrawerOpen) return;
    const t = window.setTimeout(() => setDrawerOpen(false), 0);
    return () => window.clearTimeout(t);
  }, [location.pathname, isDrawerOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDrawerOpen(false);
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    // prevent background scroll when drawer open
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
  }, [isDrawerOpen]);

  return (
    <div className={`app-shell tenant-shell ${isDrawerOpen ? 'drawer-open' : ''}`}>
      <TenantSidebar onNavigate={() => setDrawerOpen(false)} isOpen={isDrawerOpen} />

      <div className="tenant-shell__content">
        <TenantTopbar title={meta.title} subtitle={meta.subtitle} onMenuToggle={() => setDrawerOpen(v => !v)} isMenuOpen={isDrawerOpen} />

        <div className="tenant-shell__page">
          <Outlet />
        </div>
      </div>

      {isDrawerOpen && (
        <div className="tenant-drawer-backdrop" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      )}
    </div>
  );
}

export default TenantLayout;
