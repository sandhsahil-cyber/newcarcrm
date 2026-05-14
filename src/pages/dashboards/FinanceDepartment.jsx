import React from 'react';
import RoleDashboard from './RoleDashboard';
import { ROLE_CONFIGS, ROLES } from '../../config/RoleConfig';

const FinanceDepartment = () => {
  const roleName = ROLES.FINANCE_DEPARTMENT;
  return <RoleDashboard role={roleName} items={ROLE_CONFIGS[roleName] || []} />;
};

export default FinanceDepartment;