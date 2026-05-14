import React from 'react';
import RoleDashboard from './RoleDashboard';
import { ROLE_CONFIGS, ROLES } from '../../config/RoleConfig';

const AccessoriesDepartment = () => {
  const roleName = ROLES.ACCESSORIES_DEPARTMENT;
  return <RoleDashboard role={roleName} items={ROLE_CONFIGS[roleName] || []} />;
};

export default AccessoriesDepartment;