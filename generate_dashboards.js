const fs = require('fs');
const path = require('path');

const mapping = {
    'SalesExecutive': 'SALES_EXECUTIVE',
    'TeamLeader': 'TEAM_LEADER',
    'SalesManager': 'SALES_MANAGER',
    'AccountsFinance': 'ACCOUNTS_FINANCE',
    'RTODepartment': 'RTO_DEPARTMENT',
    'InsuranceDepartment': 'INSURANCE_DEPARTMENT',
    'AccessoriesDepartment': 'ACCESSORIES_DEPARTMENT',
    'FinanceDepartment': 'FINANCE_DEPARTMENT',
    'PDIWorkshop': 'PDI_WORKSHOP',
    'BrandCEO': 'BRAND_CEO',
    'GroupCEO': 'GROUP_CEO',
    'DealerPrincipal': 'DEALER_PRINCIPAL'
};

const dir = path.join(__dirname, 'src', 'pages', 'dashboards');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

Object.entries(mapping).forEach(([role, key]) => {
    const content = `import React from 'react';
import RoleDashboard from './RoleDashboard';
import { ROLE_CONFIGS, ROLES } from '../../config/RoleConfig';

const ${role} = () => {
  const roleName = ROLES.${key};
  return <RoleDashboard role={roleName} items={ROLE_CONFIGS[roleName] || []} />;
};

export default ${role};`;
    fs.writeFileSync(path.join(dir, `${role}.jsx`), content);
});
