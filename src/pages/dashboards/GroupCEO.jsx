import React from 'react';
import RoleDashboard from './RoleDashboard';
import { ROLE_CONFIGS, ROLES } from '../../config/RoleConfig';

const GroupCEO = () => {
  const roleName = ROLES.GROUP_CEO;
  return <RoleDashboard role={roleName} items={ROLE_CONFIGS[roleName] || []} />;
};

export default GroupCEO;