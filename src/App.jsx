import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import { ROLES } from './config/RoleConfig';

// Import Dashboards
import SalesExecutive from './pages/dashboards/SalesExecutive';
import TeamLeader from './pages/dashboards/TeamLeader';
import SalesManager from './pages/dashboards/SalesManager';
import AccountsFinance from './pages/dashboards/AccountsFinance';
import RTODepartment from './pages/dashboards/RTODepartment';
import InsuranceDepartment from './pages/dashboards/InsuranceDepartment';
import AccessoriesDepartment from './pages/dashboards/AccessoriesDepartment';
import FinanceDepartment from './pages/dashboards/FinanceDepartment';
import PDIWorkshop from './pages/dashboards/PDIWorkshop';
import BrandCEO from './pages/dashboards/BrandCEO';
import GroupCEO from './pages/dashboards/GroupCEO';
import DealerPrincipal from './pages/dashboards/DealerPrincipal';
import EVSalesManager from './pages/dashboards/EVSalesManager';
import PipelineView from './pages/PipelineView';
import PipelineOverview from './pages/PipelineOverview';
import DocumentStorage from './pages/DocumentStorage';
import Team from './pages/Team';
import Targets from './pages/Targets';
import SalesReport from './pages/dashboards/SalesReport';

function App() {
  const [userRole, setUserRole] = useState(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole && !Object.values(ROLES).includes(savedRole)) {
      localStorage.removeItem('userRole');
      return null;
    }
    return savedRole;
  });

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!userRole ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
        />
        
        <Route 
          path="/*" 
          element={
            userRole ? (
              <DashboardLayout role={userRole} onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<DashboardRouter role={userRole} />} />
                  <Route path="/pipeline" element={<PipelineOverview />} />
                  <Route path="/pipeline/:department" element={<PipelineView />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/targets" element={<Targets />} />
                  <Route path="/sales-report" element={<SalesReport />} />
                  <Route path="/reports" element={<SalesReport />} />
                  <Route path="/salesleads" element={<AccountsFinance />} />
                  <Route path="/documents/delivered" element={<DocumentStorage />} />
                  {/* Catch all for dashboard items - in a real app these would be real routes */}
                  <Route path="*" element={<DashboardRouter role={userRole} />} />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

// Simple router to switch between dashboard views based on role
const DashboardRouter = ({ role }) => {
  switch (role) {
    case ROLES.SALES_EXECUTIVE: return <SalesExecutive />;
    case ROLES.TEAM_LEADER: return <TeamLeader />;
    case ROLES.SALES_MANAGER: return <SalesManager />;
    case ROLES.ACCOUNTS_FINANCE: return <AccountsFinance />;
    case ROLES.RTO_DEPARTMENT: return <RTODepartment />;
    case ROLES.INSURANCE_DEPARTMENT: return <InsuranceDepartment />;
    case ROLES.ACCESSORIES_DEPARTMENT: return <AccessoriesDepartment />;
    case ROLES.FINANCE_DEPARTMENT: return <FinanceDepartment />;
    case ROLES.PDI_WORKSHOP: return <PDIWorkshop />;
    case ROLES.BRAND_CEO: return <BrandCEO />;
    case ROLES.GROUP_CEO: return <GroupCEO />;
    case ROLES.DEALER_PRINCIPAL: return <DealerPrincipal />;
    case ROLES.EV_SALES_MANAGER: return <EVSalesManager />;
    default: return <Navigate to="/login" />;
  }
};

export default App;
