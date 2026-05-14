import React from 'react';
import { useLocation } from 'react-router-dom';
import RoleDashboard from './RoleDashboard';
import DealSheet from '../DealSheet';
import { ROLE_CONFIGS, ROLES } from '../../config/RoleConfig';

const EVSalesManager = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentView = queryParams.get('view');
  
  const roleName = ROLES.EV_SALES_MANAGER;
  
  if (currentView === 'dealsheet') {
    return <DealSheet />;
  }

  return <RoleDashboard role={roleName} items={ROLE_CONFIGS[roleName] || []} />;
};

export default EVSalesManager;
