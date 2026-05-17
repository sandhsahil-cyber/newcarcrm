export const ROLES = {
  SALES_EXECUTIVE: 'Sales Executive',
  TEAM_LEADER: 'Team Leader',
  SALES_MANAGER: 'Sales Manager',
  ACCOUNTS_FINANCE: 'Finance Department',
  RTO_DEPARTMENT: 'RTO Department',
  INSURANCE_DEPARTMENT: 'Insurance Department',
  ACCESSORIES_DEPARTMENT: 'Accessories Department',

  PDI_WORKSHOP: 'PDI Workshop',
  BRAND_CEO: 'Brand CEO',
  DEALER_PRINCIPAL: 'Dealer Principal (Owner)',
  EV_SALES_MANAGER: 'EV Sales Manager',
};

export const ROLE_CONFIGS = {
  [ROLES.SALES_EXECUTIVE]: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Pipeline', path: '/pipeline', icon: 'GitPullRequest' },
  ],
  [ROLES.TEAM_LEADER]: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Pipeline', path: '/pipeline', icon: 'GitPullRequest' },
    { label: 'Reports', path: '/reports', icon: 'BarChart' },
    { label: 'Deal Sheet', path: '/dashboard?view=dealsheet', icon: 'FileSpreadsheet' },
    { label: 'Team', path: '/team', icon: 'Users' },
  ],
  [ROLES.SALES_MANAGER]: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Pipeline', path: '/pipeline', icon: 'GitPullRequest' },
    { label: 'Reports', path: '/reports', icon: 'BarChart3' },
  ],
  [ROLES.ACCOUNTS_FINANCE]: [
    { label: 'Salesleads', path: '/salesleads', icon: 'Briefcase' },
    { label: 'Finance Report', path: '/sales-report', icon: 'FileText' },
  ],
  [ROLES.RTO_DEPARTMENT]: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Document Vault', path: '/vault', icon: 'ShieldCheck' },
  ],
  [ROLES.INSURANCE_DEPARTMENT]: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Policy Issuance', path: '/policies', icon: 'FileEdit' },
    { label: 'Premium Calculator', path: '/calculator', icon: 'Calculator' },
    { label: 'Renewals', path: '/renewals', icon: 'RefreshCw' },
    { label: 'Claims Desk', path: '/claims', icon: 'LifeBuoy' },
  ],
  [ROLES.ACCESSORIES_DEPARTMENT]: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Fitment Queue', path: '/pipeline/accessories', icon: 'Tool' },
    { label: 'Inventory Stock', path: '/inventory', icon: 'Box' },
  ],

  [ROLES.PDI_WORKSHOP]: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Ready for Delivery', path: '/ready', icon: 'CheckCircle2' },
  ],
  [ROLES.BRAND_CEO]: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Branch Performance', path: '/branch-performance', icon: 'Activity' },
    { label: 'Market Share', path: '/market-share', icon: 'Globe' },
    { label: 'Department Performance', path: '/department-performance', icon: 'Clock' },
  ],

  [ROLES.DEALER_PRINCIPAL]: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Branch Performance', path: '/branch-performance', icon: 'Activity' },
    { label: 'Market Share', path: '/market-share', icon: 'Globe' },
    { label: 'Department Performance', path: '/department-performance', icon: 'Clock' },
    { label: 'Profitability', path: '/profitability', icon: 'LineChart' },
  ],
  [ROLES.EV_SALES_MANAGER]: [
    { label: 'EV Dashboard', path: '/dashboard', icon: 'Zap' },
    { label: 'Pipeline', path: '/pipeline', icon: 'GitPullRequest' },
    { label: 'Deal Sheet', path: '/dashboard?view=dealsheet', icon: 'FileSpreadsheet' },
    { label: 'Charging Station', path: '/charging', icon: 'BatteryCharging' },
    { label: 'Team', path: '/team', icon: 'Users' },
    { label: 'Targets', path: '/targets', icon: 'Target' },
    { label: 'Reports', path: '/reports', icon: 'BarChart3' },
  ],
};
