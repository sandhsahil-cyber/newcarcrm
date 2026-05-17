import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './FinanceDashboard.css';

const AccessoriesDepartment = () => {
  const PACKAGES = ['Standard Protection', 'Luxury Premium', 'Adventure Pack', 'Style & Chrome', 'Basic Essential'];
  
  const [processingInfo, setProcessingInfo] = useState({
    packageName: '',
    totalValue: '',
    fitterAssigned: '',
    remark: ''
  });

  const [leads, setLeads] = useState([
    { 
      id: 'ACC-301', 
      customer: 'Manish Gupta', 
      customerPhone: '+91 99887 76655',
      salesman: 'Rahul S.',
      model: 'SUV XC90', 
      variant: 'Inscription',
      color: 'Onyx Black',
      amount: '75,00,000',
      status: 'Pending Verification',
      timestamp: '15 mins ago',
      requestedItems: ['Floor Mats', 'Mud Flaps', 'Body Cover', 'Perfume'],
      verified: false,
      approved: false,
      processed: false
    },
    { 
      id: 'ACC-302', 
      customer: 'Priya Sharma', 
      customerPhone: '+91 91234 56789',
      salesman: 'Anjali G.',
      model: 'Sedan S60', 
      variant: 'Momentum',
      color: 'Crystal White',
      amount: '45,00,000',
      status: 'Verified',
      timestamp: '2 hours ago',
      requestedItems: ['Seat Covers', 'Steering Wrap', 'Dashcam'],
      verified: true,
      approved: true,
      processed: false
    }
  ]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleVerify = (id) => {
    setLeads(prevLeads => prevLeads.map(l => l.id === id ? { ...l, verified: true, status: 'Verified' } : l));
    if (selectedLead?.id === id) {
      setSelectedLead(prev => ({ ...prev, verified: true, status: 'Verified' }));
    }
  };

  const handleApprove = (id) => {
    setLeads(prevLeads => prevLeads.map(l => l.id === id ? { ...l, approved: true, status: 'Approved' } : l));
    if (selectedLead?.id === id) {
      setSelectedLead(prev => ({ ...prev, approved: true, status: 'Approved' }));
    }
    alert('Accessories plan approved! Fitment queue updated.');
  };

  const handleCompleteFitment = (id) => {
    setLeads(prevLeads => prevLeads.map(l => l.id === id ? { ...l, status: 'Fitment Complete', processed: true } : l));
    alert('Fitment marked as complete. Lead sent to PDI Workshop.');
    setShowModal(false);
    setSelectedLead(null);
  };

  const handleDownload = (docName) => {
    alert(`Downloading ${docName}...`);
  };

  return (
    <div className="finance-dashboard">
      <div className="finance-header">
        <h1>Accessories Command Center</h1>
        <div className="finance-stats">
          <div className="f-stat-card glass">
            <Icons.Clock size={20} color="#ff9800" />
            <div>
              <h3>Pending Verification</h3>
              <p>{leads.filter(l => !l.verified).length}</p>
            </div>
          </div>
          <div className="f-stat-card glass">
            <Icons.Wrench size={20} color="#4caf50" />
            <div>
              <h3>Approved Today</h3>
              <p>{leads.filter(l => l.approved).length}</p>
            </div>
          </div>
          <div className="f-stat-card glass">
            <Icons.CheckCircle size={20} color="var(--accent)" />
            <div>
              <h3>Fitment Complete</h3>
              <p>{leads.filter(l => l.processed).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content-area glass mt-4">
        <div className="section-title-row">
          <h2>Salesman Submissions (Accessories Leads)</h2>
          <div className="search-mini glass">
            <Icons.Search size={16} />
            <input type="text" placeholder="Search lead ID or customer..." />
          </div>
        </div>

        <div className="finance-table-container">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Customer Name</th>
                <th>Salesman</th>
                <th>Vehicle Model</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className={selectedLead && lead.id === selectedLead.id ? 'active-row' : ''}>
                  <td data-label="Lead ID"><strong>{lead.id}</strong></td>
                  <td data-label="Customer Name">{lead.customer}</td>
                  <td data-label="Salesman"><span className="salesman-tag">@{lead.salesman ? lead.salesman.split(' ')[0].toLowerCase() : 'unknown'}</span></td>
                  <td data-label="Vehicle Model">{lead.model}</td>
                  <td data-label="Status">
                    <span className={`f-status ${lead.status.toLowerCase().replace(' ', '-')}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-verify-view" onClick={() => { setSelectedLead(lead); setShowModal(true); }}>
                      <Icons.Eye size={16} />
                      Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedLead && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); setSelectedLead(null); }}>
          <div className="finance-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Accessories Processing: {selectedLead.id}</h2>
              <button className="close-btn" onClick={() => { setShowModal(false); setSelectedLead(null); }}>
                <Icons.X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="verification-grid">
                <div className="v-section docs">
                  <h3>
                    <Icons.ListChecks size={20} color="var(--accent)" />
                    1. Requested Items
                  </h3>
                  <div className="doc-list">
                    {selectedLead.requestedItems && selectedLead.requestedItems.map(item => (
                      <div key={item} className={`doc-item ${selectedLead.verified ? 'is-verified' : ''}`}>
                        <div className="doc-info">
                          <div className="doc-icon">
                            <Icons.Package size={22} />
                          </div>
                          <div className="doc-text">
                            <span className="doc-name">{item}</span>
                            <span className="doc-size">Genuine Accessory • In Stock</span>
                          </div>
                        </div>
                        <div className="doc-actions">
                          {selectedLead.verified ? (
                            <div className="verified-badge">
                              <Icons.CheckCircle size={18} />
                              <span>Verified</span>
                            </div>
                          ) : (
                            <button className="btn-verify-tick" onClick={() => handleVerify(selectedLead.id)}>
                              Confirm Stock
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="v-section details">
                  <h3>
                    <Icons.Info size={20} color="var(--accent)" />
                    2. Lead Information
                  </h3>
                  <div className="details-card glass">
                    <div className="detail-section">
                      <div className="section-subtitle">Customer Details</div>
                      <div className="detail-grid-mini">
                        <div className="detail-row"><label>Full Name</label> <strong>{selectedLead.customer}</strong></div>
                        <div className="detail-row"><label>Phone Number</label> <span>{selectedLead.customerPhone}</span></div>
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <div className="section-subtitle">Vehicle Details</div>
                      <div className="detail-grid-mini">
                        <div className="detail-row"><label>Model</label> <span>{selectedLead.model}</span></div>
                        <div className="detail-row"><label>Variant</label> <span>{selectedLead.variant}</span></div>
                        <div className="detail-row"><label>Color</label> <span>{selectedLead.color}</span></div>
                      </div>
                    </div>

                    <div className="detail-section submission-info">
                      <div className="detail-row"><label>Salesman</label> <span className="salesman-badge">@{selectedLead.salesman ? selectedLead.salesman.split(' ')[0].toLowerCase() : 'unknown'}</span></div>
                      <div className="detail-row"><label>Submitted</label> <span>{selectedLead.timestamp}</span></div>
                    </div>
                  </div>
                  
                  <div className="detail-section bank-details-area animate-fade-in mt-4">
                    <div className="section-subtitle">Fitment & Packaging</div>
                    <div className="detail-grid-mini">
                      <div className="detail-row">
                        <label>Select Package</label>
                        <select 
                          className="f-select"
                          value={processingInfo.packageName} 
                          onChange={(e) => setProcessingInfo({...processingInfo, packageName: e.target.value})}
                        >
                          <option value="">Select Package</option>
                          {PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div className="detail-row">
                        <label>Total Value (₹)</label>
                        <input 
                          type="text" 
                          className="f-input"
                          placeholder="₹ 0.00"
                          value={processingInfo.totalValue} 
                          onChange={(e) => setProcessingInfo({...processingInfo, totalValue: e.target.value})} 
                        />
                      </div>
                      <div className="detail-row">
                        <label>Assign Fitter</label>
                        <input 
                          type="text" 
                          className="f-input"
                          placeholder="Fitter Name"
                          value={processingInfo.fitterAssigned} 
                          onChange={(e) => setProcessingInfo({...processingInfo, fitterAssigned: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div className="detail-row mt-3">
                      <label>Internal Remarks</label>
                      <textarea 
                        className="f-textarea"
                        placeholder="Add specific fitment instructions..."
                        value={processingInfo.remark} 
                        onChange={(e) => setProcessingInfo({...processingInfo, remark: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="workflow-actions-grid mt-4">
                    <div className="post-approval-grid">
                      <button 
                        className="btn-approve-new" 
                        onClick={() => handleApprove(selectedLead.id)}
                      >
                        <Icons.CheckCircle size={20} />
                        Approve Plan
                      </button>
                      <button 
                        className="btn-send-account" 
                        onClick={() => handleCompleteFitment(selectedLead.id)}
                      >
                        <Icons.Wrench size={20} />
                        Complete Fitment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessoriesDepartment;