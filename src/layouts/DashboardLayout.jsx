import React from 'react';
import Sidebar from '../components/Sidebar';
import * as Icons from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import './DashboardLayout.css';

const DashboardLayout = ({ children, role, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar role={role} onLogout={onLogout} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-wrapper">
        <header className="topbar">
          <div className="topbar-left">
            <button className="btn-icon menu-trigger" onClick={() => setSidebarOpen(true)}>
              <Icons.Menu size={20} />
            </button>
          </div>
          
          <div className="topbar-right">
            <button className="btn-icon theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? <Icons.Moon size={20} /> : <Icons.Sun size={20} />}
            </button>
            
            <div className="notification-bell">
              <Icons.Bell size={20} />
              <span className="badge">2</span>
            </div>
            
            <div className="user-profile-sm">
              <img src="https://ui-avatars.com/api/?name=HITESHBHAI&background=E66239&color=fff" alt="User" />
              <div className="user-meta">
                <span className="user-name">HITESHBHAI</span>
                <span className="user-role">@{role.split(' ')[0].toLowerCase()}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="content-area">

          <div className="page-content animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
