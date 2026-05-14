import React from 'react';
import { useParams } from 'react-router-dom';
import * as Icons from 'lucide-react';
import './PipelineView.css';

const PipelineView = () => {
  const { department } = useParams();
  const [activeTab, setActiveTab] = React.useState('all');
  
  // Sample data
  const leads = [
    { id: 'LD-1001', name: 'John Doe', vehicle: 'SUV XC90', status: 'Pending', date: '2026-05-12' },
    { id: 'LD-1002', name: 'Sarah Smith', vehicle: 'Sedan S60', status: 'In Review', date: '2026-05-11' },
    { id: 'LD-1003', name: 'Mike Johnson', vehicle: 'EV Recharge', status: 'Approved', date: '2026-05-10' },
  ];

  const filteredLeads = leads.filter(lead => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return lead.status === 'Pending' || lead.status === 'In Review';
    if (activeTab === 'approved') return lead.status === 'Approved';
    return true;
  });

  return (
    <div className="pipeline-view animate-fade-in">
      <div className="pipeline-header">
        <div className="header-top">
          <div className="dept-badge">{department?.toUpperCase()}</div>
          <h2>{department?.charAt(0).toUpperCase() + department?.slice(1)} Department Leads</h2>
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
          <div className="no-data-msg">No {activeTab} leads found.</div>
        )}
      </div>
    </div>
  );
};

export default PipelineView;
