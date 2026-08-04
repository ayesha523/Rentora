import { Link } from 'react-router-dom';
import { managerNavigation, type ManagerSection } from '../../data/managerManagementData';

interface ManagerSidebarProps {
  activeSection: ManagerSection;
  isOpen: boolean;
  onSelect: (section: ManagerSection) => void;
  onClose: () => void;
}

function ManagerSidebar({ activeSection, isOpen, onSelect, onClose }: ManagerSidebarProps) {
  return (
    <>
      <button className={`manager-sidebar-backdrop ${isOpen ? 'is-open' : ''}`} type="button" aria-label="Close manager menu" onClick={onClose} />
      <aside className={`manager-sidebar ${isOpen ? 'is-open' : ''}`} aria-label="Manager navigation">
        <div className="manager-sidebar__brand">
          <span className="manager-sidebar__brand-mark"><i className="bi bi-buildings" aria-hidden="true" /></span>
          <span><strong>Rentora</strong><small>Property management</small></span>
          <button type="button" className="manager-icon-button manager-sidebar__close" aria-label="Close manager menu" onClick={onClose}>
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>

        <div className="manager-sidebar__label">Manager menu</div>
        <nav className="manager-sidebar__nav">
          {managerNavigation.map((item) => {
            const active = item.id === activeSection;
            return (
              <button
                type="button"
                key={item.id}
                className={`manager-sidebar__link ${active ? 'active' : ''}`}
                aria-label={`Open ${item.label}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => onSelect(item.id)}
              >
                <i className={`bi ${item.icon}`} aria-hidden="true" />
                <span>{item.label}</span>
                {active && <span className="manager-sidebar__active-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </nav>

        <div className="manager-sidebar__footer">
          <div className="manager-sidebar__support"><i className="bi bi-shield-check" aria-hidden="true" /><span><strong>Portfolio healthy</strong><small>All systems operational</small></span></div>
          <Link to="/login" className="manager-sidebar__logout" aria-label="Log out of manager portal">
            <i className="bi bi-box-arrow-right" aria-hidden="true" /> Logout
          </Link>
        </div>
      </aside>
    </>
  );
}

export default ManagerSidebar;
