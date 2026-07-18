import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function ManagerLayout() {
  return (
    <div className="app-shell manager-shell">
      <Navbar role="manager" />

      <div className="d-flex manager-shell__body">
        <Sidebar role="manager" />

        <div className="content-area manager-shell__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ManagerLayout;
