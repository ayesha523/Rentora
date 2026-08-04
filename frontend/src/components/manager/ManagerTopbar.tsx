import type { ManagerNavigationItem } from '../../data/managerManagementData';

interface ManagerTopbarProps {
  section: ManagerNavigationItem;
  onMenuOpen: () => void;
}

function ManagerTopbar({ section, onMenuOpen }: ManagerTopbarProps) {
  return (
    <header className="manager-topbar">
      <div className="manager-topbar__heading">
        <button type="button" className="manager-icon-button manager-topbar__menu" aria-label="Open manager menu" onClick={onMenuOpen}>
          <i className="bi bi-list" aria-hidden="true" />
        </button>
        <div>
          <strong>{section.shortLabel}</strong>
          <span>{section.description}</span>
        </div>
      </div>

      <div className="manager-topbar__actions">
        <label className="manager-topbar__search">
          <span className="visually-hidden">Search manager portal</span>
          <i className="bi bi-search" aria-hidden="true" />
          <input type="search" placeholder="Search portfolio" aria-label="Search manager portal" />
          <kbd>⌘ K</kbd>
        </label>
        <button type="button" className="manager-icon-button manager-notification" aria-label="View notifications">
          <i className="bi bi-bell" aria-hidden="true" /><span aria-hidden="true" />
        </button>
        <button type="button" className="manager-profile" aria-label="Open manager profile">
          <span className="manager-profile__avatar">MS</span>
          <span className="manager-profile__copy"><strong>Maya Sultana</strong><small>Property Manager</small></span>
          <i className="bi bi-chevron-down" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

export default ManagerTopbar;
