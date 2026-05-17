import React, { useState } from 'react';
import { PIPELINE_LEADS } from '../../data/PipelineData';
import * as Icons from 'lucide-react';
import './InsuranceDepartment.css';

const InsuranceDepartment = () => {
  // Pre-load leads with 'insurance' department
  const [leads, setLeads] = useState(
    PIPELINE_LEADS.filter(lead => lead.department === 'insurance')
  );
  
  const [selectedLead, setSelectedLead] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showProcessModal, setShowProcessModal] = useState(false);
  
  // State for policy processing form
  const [policyForm, setPolicyForm] = useState({
    insurer: 'Tata AIG',
    policyType: 'Comprehensive',
    premiumAmount: '',
    policyNumber: '',
    term: '1 Year'
  });

  // Calculate statistics
  const stats = {
    total: leads.length,
    pending: leads.filter(l => l.status === 'Pending').length,
    inReview: leads.filter(l => l.status === 'In Review').length,
    approved: leads.filter(l => l.status === 'Approved').length
  };

  // Filter & Search Logic
  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'All' || lead.status === filter;
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) || 
      lead.id.toLowerCase().includes(search.toLowerCase()) || 
      lead.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      lead.salesman.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle opening details / processing modal
  const handleOpenProcess = (lead) => {
    setSelectedLead(lead);
    setPolicyForm({
      insurer: lead.insuranceDetails?.insurer || 'Tata AIG',
      policyType: lead.insuranceDetails?.policyType || 'Comprehensive',
      premiumAmount: lead.insuranceDetails?.premiumAmount || '',
      policyNumber: lead.insuranceDetails?.policyNumber || '',
      term: lead.insuranceDetails?.term || '1 Year'
    });
    setShowProcessModal(true);
  };

  // Process / Issue Policy
  const handleIssuePolicy = (e) => {
    e.preventDefault();
    if (!policyForm.policyNumber || !policyForm.premiumAmount) {
      alert('Please fill in both the Policy Number and Premium Amount.');
      return;
    }

    const updatedLeads = leads.map(l => {
      if (l.id === selectedLead.id) {
        return {
          ...l,
          status: 'Approved',
          insuranceDetails: {
            ...policyForm
          }
        };
      }
      return l;
    });

    setLeads(updatedLeads);
    alert(`Insurance policy successfully processed and approved for lead ${selectedLead.id}!`);
    setShowProcessModal(false);
    setSelectedLead(null);
  };

  // Reject / Update to Review
  const handleUpdateStatus = (status) => {
    const updatedLeads = leads.map(l => {
      if (l.id === selectedLead.id) {
        return {
          ...l,
          status: status,
          insuranceDetails: {
            ...l.insuranceDetails,
            ...policyForm
          }
        };
      }
      return l;
    });

    setLeads(updatedLeads);
    alert(`Lead status updated to '${status}'.`);
    setShowProcessModal(false);
    setSelectedLead(null);
  };

  return (
    <div className="insurance-dashboard">
      {/* Dashboard Header */}
      <div className="insurance-header animate-fade-in">
        <div>
          <h1>Insurance Department Command Center</h1>
          <p>Manage and process active car insurance applications sent by sales executives</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="insurance-stats">
        <div className="insurance-stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
            <Icons.Briefcase size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Leads</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
        </div>
        <div className="insurance-stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <Icons.Clock size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Pending Processing</div>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </div>
        </div>
        <div className="insurance-stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Icons.Activity size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">In Review</div>
            <div className="text-2xl font-bold">{stats.inReview}</div>
          </div>
        </div>
        <div className="insurance-stat-card glass">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <Icons.ShieldCheck size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Policies Issued</div>
            <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{stats.approved}</div>
          </div>
        </div>
      </div>

      {/* Control Actions Row */}
      <div className="insurance-controls animate-slide-up">
        <div className="filter-tabs">
          {['All', 'Pending', 'In Review', 'Approved'].map(tab => (
            <button
              key={tab}
              className={`filter-tab ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="search-wrapper">
          <Icons.Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search leads, models, salesmen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="insurance-table-container animate-fade-in">
        {filteredLeads.length > 0 ? (
          <table className="insurance-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Customer</th>
                <th>Vehicle Model</th>
                <th>Date Sent</th>
                <th>Status</th>
                <th>Insurer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id}>
                  <td data-label="Lead ID" className="lead-id-mono font-bold">{lead.id}</td>
                  <td data-label="Customer">
                    <div className="font-bold">{lead.name}</div>
                    <div className="salesman-subtext">{lead.salesman} ({lead.team})</div>
                  </td>
                  <td data-label="Vehicle Model">{lead.vehicle}</td>
                  <td data-label="Date Sent">{lead.date}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${lead.status.toLowerCase().replace(' ', '-')}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td data-label="Insurer">
                    {lead.insuranceDetails?.insurer || 'Not Assigned'}
                  </td>
                  <td data-label="Actions">
                    <button
                      className="action-btn-sm"
                      onClick={() => handleOpenProcess(lead)}
                    >
                      {lead.status === 'Approved' ? 'View Details' : 'Process Lead'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            <Icons.ShieldAlert size={48} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }} />
            <h3>No Insurance Leads Found</h3>
            <p>We couldn't find any insurance leads matching the criteria.</p>
          </div>
        )}
      </div>

      {/* Detailed Policy Processing Modal */}
      {showProcessModal && selectedLead && (
        <div className="insurance-modal-overlay" onClick={() => { setShowProcessModal(false); setSelectedLead(null); }}>
          <div className="insurance-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="insurance-modal-header">
              <h2 className="insurance-modal-title">
                <Icons.FileText className="text-accent" />
                Insurance Policy Processing Center
              </h2>
              <button
                onClick={() => { setShowProcessModal(false); setSelectedLead(null); }}
                className="insurance-modal-close"
              >
                <Icons.X size={20} />
              </button>
            </div>

            <div className="insurance-modal-body">
              <div className="insurance-detail-grid">
                {/* Customer Details Section */}
                <div className="detail-item">
                  <label>Customer Name</label>
                  <span>{selectedLead.name}</span>
                </div>
                <div className="detail-item">
                  <label>Vehicle Model</label>
                  <span>{selectedLead.vehicle}</span>
                </div>
                <div className="detail-item">
                  <label>Sales Executive</label>
                  <span>{selectedLead.salesman} ({selectedLead.team})</span>
                </div>
                <div className="detail-item">
                  <label>Application Status</label>
                  <span style={{ textTransform: 'capitalize' }}>{selectedLead.status}</span>
                </div>

                {/* Separator Heading */}
                <div className="detail-item full-width" style={{ marginTop: '1rem', borderTop: '1px solid #1e293b', paddingTop: '1.25rem' }}>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Policy Details</h3>
                </div>

                {/* Form Inputs for Policy Details */}
                <div className="detail-item">
                  <label>Insurer Company</label>
                  {selectedLead.status === 'Approved' ? (
                    <span>{policyForm.insurer}</span>
                  ) : (
                    <select
                      value={policyForm.insurer}
                      onChange={(e) => setPolicyForm({ ...policyForm, insurer: e.target.value })}
                    >
                      <option value="Tata AIG">Tata AIG</option>
                      <option value="HDFC Ergo">HDFC Ergo</option>
                      <option value="ICICI Lombard">ICICI Lombard</option>
                      <option value="Bajaj Allianz">Bajaj Allianz</option>
                      <option value="SBI General">SBI General</option>
                    </select>
                  )}
                </div>

                <div className="detail-item">
                  <label>Policy Term</label>
                  {selectedLead.status === 'Approved' ? (
                    <span>{policyForm.term}</span>
                  ) : (
                    <select
                      value={policyForm.term}
                      onChange={(e) => setPolicyForm({ ...policyForm, term: e.target.value })}
                    >
                      <option value="1 Year">1 Year</option>
                      <option value="2 Years">2 Years</option>
                      <option value="3 Years">3 Years</option>
                    </select>
                  )}
                </div>

                <div className="detail-item">
                  <label>Policy Type</label>
                  {selectedLead.status === 'Approved' ? (
                    <span>{policyForm.policyType}</span>
                  ) : (
                    <select
                      value={policyForm.policyType}
                      onChange={(e) => setPolicyForm({ ...policyForm, policyType: e.target.value })}
                    >
                      <option value="Comprehensive">Comprehensive</option>
                      <option value="Zero Depreciation">Zero Depreciation</option>
                      <option value="Third Party Only">Third Party Only</option>
                    </select>
                  )}
                </div>

                <div className="detail-item">
                  <label>Premium Amount (₹)</label>
                  {selectedLead.status === 'Approved' ? (
                    <span>₹{policyForm.premiumAmount}</span>
                  ) : (
                    <input
                      type="text"
                      placeholder="e.g. 52,400"
                      value={policyForm.premiumAmount}
                      onChange={(e) => setPolicyForm({ ...policyForm, premiumAmount: e.target.value })}
                    />
                  )}
                </div>

                <div className="detail-item full-width">
                  <label>Policy Document Number</label>
                  {selectedLead.status === 'Approved' ? (
                    <span className="font-mono text-accent">{policyForm.policyNumber}</span>
                  ) : (
                    <input
                      type="text"
                      className="font-mono"
                      placeholder="e.g. POL-TATA-998822"
                      value={policyForm.policyNumber}
                      onChange={(e) => setPolicyForm({ ...policyForm, policyNumber: e.target.value })}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="insurance-modal-footer">
              <button
                className="btn-secondary"
                onClick={() => { setShowProcessModal(false); setSelectedLead(null); }}
              >
                Close
              </button>

              {selectedLead.status !== 'Approved' && (
                <>
                  <button
                    className="btn-primary-blue"
                    onClick={() => handleUpdateStatus('In Review')}
                  >
                    Set In Review
                  </button>
                  <button
                    className="btn-primary-green"
                    onClick={handleIssuePolicy}
                  >
                    <Icons.CheckCircle2 size={18} />
                    Issue & Approve Policy
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceDepartment;