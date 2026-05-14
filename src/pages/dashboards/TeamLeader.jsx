import React from 'react';
import { useLocation } from 'react-router-dom';
import RoleDashboard from './RoleDashboard';
import DealSheet from '../DealSheet';
import { ROLE_CONFIGS, ROLES } from '../../config/RoleConfig';

const TeamLeader = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentView = queryParams.get('view');
  
  const roleName = ROLES.TEAM_LEADER;
  
  if (currentView === 'dealsheet') {
    return <DealSheet />;
  }

  return <RoleDashboard role={roleName} items={ROLE_CONFIGS[roleName] || []} />;
};

export default TeamLeader;