import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout, toggleSidebar }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex align-items-center justify-content-between">
      {/* Left section: Sidebar toggle + Brand */}
      <div className="d-flex align-items-center">
        {/* Hamburger menu */}
        <button
          className="btn btn-dark d-flex flex-column justify-content-between p-1 me-3"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          style={{ width: '30px', height: '22px' }}
        >
          <span style={{ backgroundColor: 'white', height: '3px', borderRadius: '2px' }}></span>
          <span style={{ backgroundColor: 'white', height: '3px', borderRadius: '2px' }}></span>
          <span style={{ backgroundColor: 'white', height: '3px', borderRadius: '2px' }}></span>
        </button>

        {/* Brand name */}
        <Link className="navbar-brand mb-0 h1" to="/">CRM Platform</Link>
      </div>

      {/* Right section: User Info + Logout */}
      {user && (
        <div className="d-flex align-items-center">
          <i className="bi bi-person-circle text-white fs-4 me-2"></i>
          <span className="text-white me-3">{user.name || 'User'}</span>
          <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
