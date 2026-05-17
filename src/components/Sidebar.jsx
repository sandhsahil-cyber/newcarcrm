import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ROLE_CONFIGS } from '../config/RoleConfig';
import './Sidebar.css';

const Sidebar = ({ role, onLogout, isOpen, onClose }) => {
  const menuItems = ROLE_CONFIGS[role] || [];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo-area">
        <Icons.Car size={24} color="var(--accent)" />
        <span className="logo-text">DEALERGUARD</span>
        <button className="mobile-close" onClick={onClose}>
          <Icons.X size={20} />
        </button>
      </div>

      <div className="nav-section">
        <small className="nav-label">MAIN MENU</small>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const IconComponent = Icons[item.icon] || Icons.HelpCircle;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => {
                  const currentPath = window.location.pathname + window.location.search;
                  const isItemActive = item.path.includes('?')
                    ? currentPath === item.path
                    : window.location.pathname === item.path;
                  return `nav-link ${isItemActive ? 'active' : ''}`;
                }}
              >
                <IconComponent size={18} className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {role !== 'Sales Manager' && role !== 'Accessories Department' && role !== 'RTO Department' && role !== 'Brand CEO' && role !== 'Dealer Principal (Owner)' && (
        <>
          <div className="nav-section">
            <small className="nav-label">DOCUMENT STORAGE</small>
            <nav className="sidebar-nav">
              <NavLink to="/documents/delivered" className="nav-link">
                <Icons.FolderClosed size={18} />
                <span>{role === 'Finance Department' ? 'Finance Documents' : 'Delivered Leads'}</span>
              </NavLink>
            </nav>
          </div>
        </>
      )}

      <div className="nav-section mt-auto">
        <small className="nav-label">ACCOUNT</small>
        <button className="nav-link logout-btn" onClick={onLogout}>
          <Icons.LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
