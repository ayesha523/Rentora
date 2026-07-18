import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/tenant-layout.css';

function TenantLayout() {
  return (
    <div className="app-shell tenant-shell">
      <Navbar role="tenant" />

      <div className="d-flex tenant-shell__body">
        <Sidebar role="tenant" />

        <div className="content-area tenant-shell__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TenantLayout;
