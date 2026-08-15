import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

function TenantTopbar({ title = "Tenant Dashboard", subtitle = "Everything about your home in one place. Stay updated, comfortable and connected with Rentora.", onMenuToggle, isMenuOpen = false }: Props) {
  return (
    <header className="tenant-topbar" role="banner">
      <div className="tenant-topbar__left">
        <button
          className="icon-btn tenant-topbar__menu-toggle"
          aria-controls="tenant-sidebar"
          aria-expanded={isMenuOpen}
          aria-label="Open tenant menu"
          onClick={onMenuToggle}
        >
          <i className="bi bi-list" aria-hidden="true"></i>
        </button>

        <div className="tenant-topbar__text-group">
          <span className="tenant-topbar__greeting">Hello,</span>
          <h1 className="tenant-topbar__title">{title}</h1>
          <p className="tenant-topbar__subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="tenant-topbar__right">
        <div className="topbar-search" role="search">
          <label htmlFor="tenant-search" className="visually-hidden">Search your portal</label>
          <i className="bi bi-search" aria-hidden="true"></i>
          <input id="tenant-search" aria-label="Search your portal" placeholder="Search your portal..." />
        </div>

        <button className="icon-btn tenant-topbar__notif" aria-label="View notifications">
          <i className="bi bi-bell" aria-hidden="true"></i>
          <span className="notif-badge">3</span>
        </button>

        <button className="tenant-profile-btn" type="button" aria-label="Open profile menu">
          <div className="tenant-avatar">
            <span className="avatar-initials">LN</span>
          </div>
          <div className="tenant-profile-copy">
            <span className="avatar-name">Lutfa Nahid</span>
            <span className="avatar-role">Tenant</span>
          </div>
          <i className="bi bi-chevron-down" aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
}

export default TenantTopbar;
