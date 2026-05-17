import React from 'react';
import { useParams } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { PIPELINE_LEADS, MOCK_USER } from '../data/PipelineData';
import { ROLES } from '../config/RoleConfig';
import './PipelineView.css';

const PipelineView = () => {
  const { department } = useParams();
  const [activeTab, setActiveTab] = React.useState('all');
  const userRole = localStorage.getItem('userRole');
  
  // Access Control check
  const isDepartmentRole = userRole.includes('Department');
  const roleDepartment = userRole.split(' ')[0].toLowerCase();
  
  const hasAccess = !isDepartmentRole || roleDepartment === department.toLowerCase() || 
                    (userRole === ROLES.ACCOUNTS_FINANCE && (department === 'finance' || department === 'accounts'));

  // Filter leads based on role AND department
  const filteredLeads = PIPELINE_LEADS.filter(lead => {
    if (!hasAccess) return false;
    
    // Check department first
    if (department && lead.department !== department.toLowerCase()) return false;

    // Then check role scope
    if (userRole === ROLES.SALES_EXECUTIVE) {
      return lead.salesman === MOCK_USER.name;
    }
    if (userRole === ROLES.TEAM_LEADER) {
      return lead.team === MOCK_USER.team;
    }
    
    // For department roles, we already checked hasAccess
    return true;
  }).filter(lead => {
    // Finally apply status tab filter
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return lead.status === 'Pending' || lead.status === 'In Review';
    if (activeTab === 'approved') return lead.status === 'Approved';
    return true;
  });

  let scopeLabel = "Showroom-wide";
  if (userRole === ROLES.SALES_EXECUTIVE) scopeLabel = "Personal";
  else if (userRole === ROLES.TEAM_LEADER) scopeLabel = `Team ${MOCK_USER.team}`;

  return (
    <div className="pipeline-view animate-fade-in">
      <div className="pipeline-header">
        <div className="header-top">
          <div className="dept-badge">{department?.toUpperCase()}</div>
          <h2>{department?.charAt(0).toUpperCase() + department?.slice(1)} Pipeline ({scopeLabel})</h2>
        </div>
        
        <div className="pipeline-tabs glass">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Leads
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button 
            className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved
          </button>
        </div>
      </div>

      <div className="leads-table-wrapper card-shadow">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Customer Name</th>
              <th>Vehicle Model</th>
              <th>Salesman</th>
              <th>Current Status</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id}>
                <td data-label="Lead ID" className="lead-id">{lead.id}</td>
                <td data-label="Customer" className="lead-name">{lead.name}</td>
                <td data-label="Vehicle">{lead.vehicle}</td>
                <td data-label="Salesman"><span className="salesman-tag">@{lead.salesman.split(' ')[0].toLowerCase()}</span></td>
                <td data-label="Status">
                  <span className={`status-pill ${lead.status.toLowerCase().replace(' ', '-')}`}>
                    {lead.status}
                  </span>
                </td>
                <td data-label="Date">{lead.date}</td>
                <td data-label="Action">
                  <button className="view-btn">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div className="no-data-msg">
            {!hasAccess ? (
              <div className="access-denied">
                <Icons.Lock size={48} />
                <p>Access Denied: You only have permission to view the {roleDepartment} department pipeline.</p>
              </div>
            ) : (
              `No ${activeTab} leads found in this scope.`
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PipelineView;
