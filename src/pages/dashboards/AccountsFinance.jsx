import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import * as Icons from 'lucide-react';
import './FinanceDashboard.css';

const FinanceDepartment = () => {
  const BANKS = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra', 'IDFC First'];
  
  const [bankingInfo, setBankingInfo] = useState({
    bankName: '',
    loanAmount: '',
    disbursementAmount: '',
    remark: ''
  });

  const [leads, setLeads] = useState([
    { 
      id: 'BK-701', 
      customer: 'Rajesh Kumar', 
      customerPhone: '+91 98765 43210',
      salesman: 'Amit Sharma',
      model: 'SUV XC90', 
      variant: 'Inscription',
      color: 'Crystal White',
      amount: '75,00,000',
      status: 'Pending Verification',
      timestamp: '10 mins ago',
      docs: ['Deal Sheet', 'Aadhar Card', 'PAN Card'],
      verified: false,
      approved: false,
      loanSent: false,
      loanRequired: true,
      loanSource: 'DSA'
    },
    { 
      id: 'BK-702', 
      customer: 'Suresh Patel', 
      customerPhone: '+91 91234 56789',
      salesman: 'Vijay Varma',
      model: 'Sedan S60', 
      variant: 'Momentum',
      color: 'Onyx Black',
      amount: '45,00,000',
      status: 'Verified',
      timestamp: '1 hour ago',
      docs: ['Deal Sheet', 'Aadhar Card', 'PAN Card'],
      verified: true,
      approved: true,
      loanSent: false,
      loanRequired: false,
      loanSource: ''
    }
  ]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleVerify = (id) => {
    setLeads(leads.map(l => l.id === id ? { ...l, verified: true, status: 'Verified' } : l));
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, verified: true, status: 'Verified' });
  };

  const handleApprove = (id) => {
    setLeads(leads.map(l => l.id === id ? { ...l, approved: true, status: 'Approved' } : l));
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, approved: true, status: 'Approved' });
    alert('Lead approved! Documents can now be shared with the customer.');
  };

  const handleSendToCustomer = (id) => {
    alert('Approved documents and details have been sent to the lead via WhatsApp/Email.');
  };

  const handleSendToAccount = (id) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: 'Sent to Accounts' } : l));
    alert('Lead has been successfully sent to the Accounts department for payment processing.');
    setShowModal(false);
  };

  const handleDownload = (docName) => {
    alert(`Downloading ${docName}... (This would trigger a file download in a real app)`);
  };

  return (
    <div className="finance-dashboard">
      <div className="finance-header">
        <h1>Salesleads Command Center</h1>
        <div className="finance-stats">
          <div className="f-stat-card glass">
            <Icons.Clock size={20} color="#ff9800" />
            <div>
              <h3>Pending Verification</h3>
              <p>{leads.filter(l => !l.verified).length}</p>
            </div>
          </div>
          <div className="f-stat-card glass">
            <Icons.CheckCircle size={20} color="#4caf50" />
            <div>
              <h3>Approved Today</h3>
              <p>{leads.filter(l => l.approved).length}</p>
            </div>
          </div>
          <div className="f-stat-card glass">
            <Icons.Wallet size={20} color="var(--accent)" />
            <div>
              <h3>Loan Handoffs</h3>
              <p>{leads.filter(l => l.loanSent).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content-area glass mt-4">
        <div className="section-title-row">
          <h2>Salesman Submissions (Incoming Leads)</h2>
          <div className="search-mini glass">
            <Icons.Search size={16} />
            <input type="text" placeholder="Search lead ID or customer..." />
          </div>
        </div>

        <div className="finance-table-container">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Salesman</th>
                <th>Vehicle Model</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className={lead.id === selectedLead?.id ? 'active-row' : ''}>
                  <td data-label="Booking ID"><strong>{lead.id}</strong></td>
                  <td data-label="Customer Name">{lead.customer}</td>
                  <td data-label="Salesman"><span className="salesman-tag">@{lead.salesman.split(' ')[0].toLowerCase()}</span></td>
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

      {showModal && selectedLead && createPortal(
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="finance-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Verify Sales Lead: {selectedLead.id}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <Icons.X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="verification-grid">
                <div className="v-section docs">
                  <h3>
                    <Icons.ShieldCheck size={20} color="var(--accent)" />
                    1. Document Verification
                  </h3>
                  <div className="doc-list">
                    {selectedLead.docs.map(doc => (
                      <div key={doc} className={`doc-item ${selectedLead.verified ? 'is-verified' : ''}`}>
                        <div className="doc-info">
                          <div className="doc-icon">
                            <Icons.FileText size={22} />
                          </div>
                          <div className="doc-text">
                            <span className="doc-name">{doc}</span>
                            <span className="doc-size">Digital Copy • PDF • 2.4 MB</span>
                          </div>
                        </div>
                        <div className="doc-actions">
                          <button className="btn-icon-sm" title="Download" onClick={() => handleDownload(doc)}>
                            <Icons.Download size={16} />
                          </button>
                          {selectedLead.verified ? (
                            <div className="verified-badge">
                              <Icons.CheckCircle size={18} />
                              <span>Verified</span>
                            </div>
                          ) : (
                            <button className="btn-verify-tick" onClick={() => handleVerify(selectedLead.id)}>
                              Verify Now
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
                        <div className="detail-row"><label>Price</label> <span className="price-tag">₹{selectedLead.amount}</span></div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <div className="section-subtitle">Finance Processing</div>
                      <div className="detail-grid-mini">
                        <div className="detail-row">
                          <label>Loan Required</label> 
                          <span className={`loan-badge ${selectedLead.loanRequired ? 'yes' : 'no'}`}>
                            {selectedLead.loanRequired ? 'YES' : 'NO'}
                          </span>
                        </div>
                        {selectedLead.loanRequired && (
                          <div className="detail-row">
                            <label>Finance Source</label> 
                            <span className="source-tag">{selectedLead.loanSource}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="detail-section submission-info">
                      <div className="detail-row"><label>Salesman</label> <span className="salesman-badge">@{selectedLead.salesman.split(' ')[0].toLowerCase()}</span></div>
                      <div className="detail-row"><label>Submitted</label> <span>{selectedLead.timestamp}</span></div>
                    </div>
                  </div>
                  
                  <div className="workflow-steps">
                    <div className="step-indicator">
                      <div className={`step-dot ${selectedLead.verified ? 'active' : ''}`}>1</div>
                      <div className={`step-line ${selectedLead.approved ? 'active' : ''}`}></div>
                      <div className={`step-dot ${selectedLead.approved ? 'active' : ''}`}>2</div>
                      <div className={`step-line ${selectedLead.loanSent ? 'active' : ''}`}></div>
                      <div className={`step-dot ${selectedLead.loanSent ? 'active' : ''}`}>3</div>
                    </div>                    <div className="detail-section bank-details-area animate-fade-in mt-4">
                      <div className="section-subtitle">Banking & Disbursement</div>
                      <div className="detail-grid-mini">
                        <div className="detail-row">
                          <label>Bank Name</label>
                          <select 
                            className="f-select"
                            value={bankingInfo.bankName} 
                            onChange={(e) => setBankingInfo({...bankingInfo, bankName: e.target.value})}
                          >
                            <option value="">Select Bank</option>
                            {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                        <div className="detail-row">
                          <label>Approved Loan Amount</label>
                          <input 
                            type="text" 
                            className="f-input"
                            placeholder="₹ 0.00"
                            value={bankingInfo.loanAmount} 
                            onChange={(e) => setBankingInfo({...bankingInfo, loanAmount: e.target.value})} 
                          />
                        </div>
                        <div className="detail-row">
                          <label>Loan Disbursement</label>
                          <input 
                            type="text" 
                            className="f-input"
                            placeholder="₹ 0.00"
                            value={bankingInfo.disbursementAmount} 
                            onChange={(e) => setBankingInfo({...bankingInfo, disbursementAmount: e.target.value})} 
                          />
                        </div>
                      </div>

                      <div className="detail-row mt-3">
                        <label>Internal Remarks</label>
                        <textarea 
                          className="f-textarea"
                          placeholder="Add specific notes for the Accounts department..."
                          value={bankingInfo.remark} 
                          onChange={(e) => setBankingInfo({...bankingInfo, remark: e.target.value})} 
                        />
                      </div>

                      <div className="detail-row mt-4">
                        <label>Disbursement Letter</label>
                        <div className="f-upload-box">
                          <div className="upload-icon-circle">
                            <Icons.UploadCloud size={20} color="var(--accent)" />
                          </div>
                          <div className="upload-text">
                            <strong>Upload Disbursement Letter</strong>
                            <span>Select PDF or Image</span>
                          </div>
                          <input type="file" className="f-file-input" />
                        </div>
                      </div>
                    </div>

                    <div className="workflow-actions-grid mt-4">
                      <div className="post-approval-grid">
                        <button 
                          className="btn-approve-new" 
                          onClick={() => handleApprove(selectedLead.id)}
                        >
                          <Icons.CheckCircle size={20} />
                          Approve
                        </button>
                        <button 
                          className="btn-send-account" 
                          onClick={() => handleSendToAccount(selectedLead.id)}
                        >
                          <Icons.Send size={20} />
                          Send to Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default FinanceDepartment;