import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ visible }) {
  if (!visible) return null;

  return (
    <div
      className="d-flex flex-column bg-light border-end vh-100 p-3"
      style={{ width: '250px', minWidth: '250px' }}
    >
      {/* Sidebar Header */}
      <h4 className="border-bottom pb-2">My CRM</h4>

      {/* Scrollable navigation items */}
      <nav
        className="nav flex-column mt-3 mb-3"
        style={{ overflowY: 'auto', flexGrow: 1, paddingRight: '5px' }}
      >
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            'nav-link d-flex align-items-center py-2 ' + (isActive ? 'active fw-bold' : '')
          }
        >
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </NavLink>

        <NavLink
          to="/customers"
          className={({ isActive }) =>
            'nav-link d-flex align-items-center py-2 ' + (isActive ? 'active fw-bold' : '')
          }
        >
          <i className="bi bi-people me-2"></i> Customers
        </NavLink>

        <NavLink
          to="/add-customer"
          className={({ isActive }) =>
            'nav-link d-flex align-items-center py-2 ' + (isActive ? 'active fw-bold' : '')
          }
        >
          <i className="bi bi-person-plus me-2"></i> Add Customer
        </NavLink>

        <NavLink
          to="/campaigns"
          className={({ isActive }) =>
            'nav-link d-flex align-items-center py-2 ' + (isActive ? 'active fw-bold' : '')
          }
        >
          <i className="bi bi-megaphone me-2"></i> Campaigns
        </NavLink>

        {/* New Create Campaign Link */}
        <NavLink
          to="/campaigns/create"
          className={({ isActive }) =>
            'nav-link d-flex align-items-center py-2 ps-4 ' + (isActive ? 'active fw-bold' : '')
          }
        >
          <i className="bi bi-plus-circle me-2"></i> Create Campaign
        </NavLink>

        <NavLink
          to="/logs"
          className={({ isActive }) =>
            'nav-link d-flex align-items-center py-2 ' + (isActive ? 'active fw-bold' : '')
          }
        >
          <i className="bi bi-journal-text me-2"></i> Logs
        </NavLink>
      </nav>

      {/* Bottom fixed nav */}
      <nav className="nav flex-column border-top pt-3">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            'nav-link d-flex align-items-center py-2 ' + (isActive ? 'active fw-bold' : '')
          }
        >
          <i className="bi bi-person-circle me-2"></i> Profile
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            'nav-link d-flex align-items-center py-2 ' + (isActive ? 'active fw-bold' : '')
          }
        >
          <i className="bi bi-gear me-2"></i> Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
