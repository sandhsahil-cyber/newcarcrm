import React from 'react';
import RoleDashboard from './RoleDashboard';
import { ROLE_CONFIGS, ROLES } from '../../config/RoleConfig';

const PDIWorkshop = () => {
  const roleName = ROLES.PDI_WORKSHOP;
  return <RoleDashboard role={roleName} items={ROLE_CONFIGS[roleName] || []} />;
};

export default PDIWorkshop;