import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './RoleDashboard.css';

const RoleDashboard = ({ role, items }) => {
  const [showPipeline, setShowPipeline] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDeptForm, setShowDeptForm] = useState(false);
  const [showAllActiveLeads, setShowAllActiveLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [targetDept, setTargetDept] = useState('');
  const [activeLeadsCount, setActiveLeadsCount] = useState(124);
  const [recentLeads, setRecentLeads] = useState([
    { 
      id: 'BK-001', name: 'John Smith', model: 'SUV XC90', price: '75,00,000', status: 'In RTO', phone: '+91 98765 43210',
      initialDocs: ['Deal_Sheet.pdf', 'Aadhar.jpg', 'PAN_Card.jpg'],
      deptProgress: {
        RTO: { status: 'Approved', docs: ['Tax_Receipt.pdf', 'RC_Form.pdf'] },
        Insurance: { status: 'Pending', docs: [] }
      }
    },
    { 
      id: 'BK-002', name: 'Emma Wilson', model: 'Sedan S60', price: '45,00,000', status: 'Recent', phone: '+91 87654 32109',
      initialDocs: ['Deal_Sheet.pdf', 'Aadhar.jpg'],
      deptProgress: {}
    }
  ]);
  const [bookingData, setBookingData] = useState({
    name: '', phone: '', model: '', variant: '', color: '', price: '', paymentType: 'online'
  });
  
  const [loanRequired, setLoanRequired] = useState(false);
  const [loanSource, setLoanSource] = useState('');
  const [editLeadData, setEditLeadData] = useState({
    name: '', phone: '', model: '', variant: '', color: '', price: ''
  });

  const handleLeadClick = (lead) => {
    setSelectedLead(lead);
    setEditLeadData({
      name: lead.name || '',
      phone: lead.phone || '',
      model: lead.model || '',
      variant: lead.variant || '',
      color: lead.color || '',
      price: lead.price ? lead.price.toString().replace(/,/g, '') : ''
    });
    setShowDeptForm(true);
  };

  const handleSendToDept = () => {
    if (!targetDept) {
      alert('Please select a department first.');
      return;
    }
    
    // Simulate adding to progress
    const updatedLeads = recentLeads.map(l => {
      if (l.id === selectedLead.id) {
        return { 
          ...l, 
          status: `In ${targetDept}`,
          deptProgress: {
            ...(l.deptProgress || {}),
            [targetDept]: { status: 'Pending', docs: [] }
          }
        };
      }
      return l;
    });

    setRecentLeads(updatedLeads);
    alert(`Lead ${selectedLead.id} successfully sent to ${targetDept} Department!`);
    setShowDeptForm(false);
    setSelectedLead(null);
    setTargetDept('');
  };

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.phone || !bookingData.model || !bookingData.variant || !bookingData.color || !bookingData.price) {
      alert('Please fill all details before confirming.');
      return;
    }
    
    const newLead = {
      id: `BK-${Math.floor(100 + Math.random() * 900)}`,
      name: bookingData.name,
      model: bookingData.model,
      price: parseInt(bookingData.price).toLocaleString('en-IN'),
      status: 'New',
      phone: bookingData.phone,
      initialDocs: ['Deal_Sheet.pdf', 'Aadhar.jpg', 'PAN_Card.jpg'], // Simulate uploaded docs
      deptProgress: {}
    };

    setRecentLeads([newLead, ...recentLeads]);
    setActiveLeadsCount(prev => prev + 1);
    alert('Booking Confirmed! Lead added to Dashboard.');
    setShowBookingForm(false);
    setBookingData({ name: '', phone: '', model: '', variant: '', color: '', price: '', paymentType: 'online' });
  };

  const handleShareBooking = () => {
    const message = `*New Car Booking Details*\n\nCustomer: ${bookingData.name}\nPhone: ${bookingData.phone}\nModel: ${bookingData.model}\nVariant: ${bookingData.variant}\nColor: ${bookingData.color}\nFinal Price: ₹${bookingData.price}\nPayment: ${bookingData.paymentType}\n\n_DealerGuard ERP_`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const VEHICLE_DATA = {
    models: ['SUV XC90', 'Sedan S60', 'EV Recharge', 'Compact C40'],
    variants: ['Momentum', 'Inscription', 'Excellence', 'R-Design'],
    colors: ['Crystal White', 'Onyx Black', 'Denim Blue', 'Thunder Grey', 'Fusion Red']
  };

  const DEPARTMENTS = ['RTO', 'Insurance', 'Accessories', 'Accounts', 'Finance'];

  return (
    <>
      <div className="role-dashboard">
        <div className="dashboard-header-row">
          <button className="add-booking-btn" onClick={() => setShowBookingForm(true)}>
            <Icons.Plus size={18} />
            <span>Add Booking Lead</span>
          </button>
        </div>

        <div className="stats-grid">
          <div 
            className="stat-card glass animate-fade-in clickable" 
            style={{ animationDelay: '0.1s' }}
            onClick={() => setShowAllActiveLeads(true)}
          >
            <div className="stat-icon glass"><Icons.TrendingUp color="var(--accent)" /></div>
            <div className="stat-content">
              <h3>Active Leads</h3>
              <p className="stat-value">{activeLeadsCount}</p>
              <span className="stat-trend">+12% from last week</span>
            </div>
          </div>
          
          <div className="stat-card glass animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <div className="stat-icon glass"><Icons.Award color="#ffd700" /></div>
            <div className="stat-content">
              <h3>Monthly Target</h3>
              <div className="target-progress-wrapper">
                <p className="stat-value">84%</p>
                <div className="progress-bar-mini"><div className="progress-fill" style={{ width: '84%' }}></div></div>
              </div>
              <span className="stat-trend">21/25 Cars Booked</span>
            </div>
          </div>

          <div 
            className={`stat-card glass animate-fade-in ${showPipeline ? 'expanded' : ''}`} 
            style={{ animationDelay: '0.2s', cursor: 'pointer' }}
            onClick={() => setShowPipeline(!showPipeline)}
          >
            <div className="stat-icon glass"><Icons.GitBranch color="#4caf50" /></div>
            <div className="stat-content">
              <h3>Deal Pipeline</h3>
              <p className="stat-value">48</p>
              <span className="stat-trend">Across 5 Departments</span>
              
              {showPipeline && (
                <div className="pipeline-breakdown animate-fade-in">
                  <div className="breakdown-item"><span>RTO</span> <strong>12</strong></div>
                  <div className="breakdown-item"><span>Insurance</span> <strong>15</strong></div>
                  <div className="breakdown-item"><span>Accessories</span> <strong>8</strong></div>
                  <div className="breakdown-item"><span>Accounts</span> <strong>5</strong></div>
                  <div className="breakdown-item"><span>Finance</span> <strong>8</strong></div>
                </div>
              )}
            </div>
            <Icons.ChevronDown 
              size={16} 
              className={`expand-icon ${showPipeline ? 'rotate' : ''}`} 
            />
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="dashboard-left-col">
            <div className="recent-leads-section animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="section-header">
                <h3>Recent Bookings</h3>
                <button className="view-all-link">View All Leads</button>
              </div>
              
              <div className="leads-list glass">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer</th>
                      <th>Model</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map(lead => (
                      <tr key={lead.id} onClick={() => handleLeadClick(lead)} className="clickable-row">
                        <td className="booking-id">{lead.id}</td>
                        <td>
                          <div className="customer-cell">
                            <div className="avatar-sm">{lead.name.charAt(0)}</div>
                            <span>{lead.name}</span>
                          </div>
                        </td>
                        <td>{lead.model}</td>
                        <td className="amount-cell">₹{lead.price}</td>
                        <td><span className={`status-tag ${lead.status.toLowerCase().replace(' ', '-')}`}>{lead.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="dashboard-right-col animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="activity-section">
              <div className="section-header">
                <h3>Recent Activity</h3>
              </div>
              <div className="activity-feed glass">
                <div className="activity-item">
                  <div className="activity-dot approved"></div>
                  <div className="activity-info">
                    <p><strong>RTO Dept</strong> approved <strong>BK-001</strong></p>
                    <span>2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot pending"></div>
                  <div className="activity-info">
                    <p><strong>BK-002</strong> sent to <strong>Insurance</strong></p>
                    <span>4 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot new"></div>
                  <div className="activity-info">
                    <p>New booking <strong>BK-942</strong> added</p>
                    <span>Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeptForm && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowDeptForm(false)}>
          <div className="booking-modal glass wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="header-title">
                <Icons.Send size={24} color="var(--accent)" />
                <h2>Send to Department</h2>
              </div>
              <button className="close-btn" onClick={() => setShowDeptForm(false)}><Icons.X size={20} /></button>
            </div>

            <div className="modal-main-layout">
              <div className="modal-left-col">
                <div className="lead-edit-sections">
              <div className="form-section-title">Customer Details</div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input 
                    type="text" 
                    value={editLeadData.name} 
                    onChange={(e) => setEditLeadData({...editLeadData, name: e.target.value})} 
                    placeholder="Full Name" 
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={editLeadData.phone} 
                    onChange={(e) => setEditLeadData({...editLeadData, phone: e.target.value})} 
                    placeholder="+91 00000 00000" 
                  />
                </div>
              </div>

              <div className="form-section-title">Vehicle Details</div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Select Model</label>
                  <select 
                    value={editLeadData.model} 
                    onChange={(e) => setEditLeadData({...editLeadData, model: e.target.value})}
                  >
                    <option value="">Choose Model</option>
                    {VEHICLE_DATA.models.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Variant</label>
                  <select 
                    value={editLeadData.variant} 
                    onChange={(e) => setEditLeadData({...editLeadData, variant: e.target.value})}
                  >
                    <option value="">Choose Variant</option>
                    {VEHICLE_DATA.variants.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Select Color</label>
                  <select 
                    value={editLeadData.color} 
                    onChange={(e) => setEditLeadData({...editLeadData, color: e.target.value})}
                  >
                    <option value="">Choose Color</option>
                    {VEHICLE_DATA.colors.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Final Price (On-Road)</label>
                  <div className="input-with-prefix">
                    <span>₹</span>
                    <input 
                      type="number" 
                      value={editLeadData.price} 
                      onChange={(e) => setEditLeadData({...editLeadData, price: e.target.value})} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-right-col">
                <div className="pipeline-tracking-section">
                  <label className="section-label">Current Pipeline Progress</label>
                  <div className="tracking-grid">
                    <div className="tracking-card glass highlight">
                      <div className="tracking-header">
                        <span className="dept-name">Sales (Initial)</span>
                        <span className="status-pill approved">Uploaded</span>
                      </div>
                      <div className="dept-docs">
                        {selectedLead?.initialDocs?.map(doc => (
                          <div key={doc} className="doc-link">
                            <Icons.FileText size={14} color="var(--accent)" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {selectedLead?.deptProgress && Object.entries(selectedLead.deptProgress).map(([dept, data]) => (
                      <div key={dept} className="tracking-card glass">
                        <div className="tracking-header">
                          <span className="dept-name">{dept}</span>
                          <span className={`status-pill ${data.status.toLowerCase()}`}>{data.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <form className="dept-transfer-form">
                  <label className="section-label">Target & Processing</label>
                  
                  <div className="form-group">
                    <label>Target Department</label>
                    <select value={targetDept} onChange={(e) => setTargetDept(e.target.value)}>
                      <option value="">Choose Department...</option>
                      {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                  </div>

                  {targetDept === 'Finance' && (
                    <div className="finance-options-box animate-fade-in">
                      <div className="form-group">
                        <label>Loan Required?</label>
                        <div className="toggle-group">
                          <button 
                            type="button" 
                            className={loanRequired ? 'active' : ''} 
                            onClick={() => setLoanRequired(true)}
                          >
                            Yes
                          </button>
                          <button 
                            type="button" 
                            className={!loanRequired ? 'active' : ''} 
                            onClick={() => setLoanRequired(false)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                      
                      {loanRequired && (
                        <div className="form-group mt-3">
                          <label>Finance Source</label>
                          <div className="option-group">
                            <label className="radio-label">
                              <input 
                                type="radio" 
                                name="loanSource" 
                                value="DSA" 
                                checked={loanSource === 'DSA'} 
                                onChange={(e) => setLoanSource(e.target.value)} 
                              />
                              <span>DSA</span>
                            </label>
                            <label className="radio-label">
                              <input 
                                type="radio" 
                                name="loanSource" 
                                value="Self" 
                                checked={loanSource === 'Self'} 
                                onChange={(e) => setLoanSource(e.target.value)} 
                              />
                              <span>SELF</span>
                            </label>
                            <label className="radio-label">
                              <input 
                                type="radio" 
                                name="loanSource" 
                                value="In House" 
                                checked={loanSource === 'In House'} 
                                onChange={(e) => setLoanSource(e.target.value)} 
                              />
                              <span>IN HOUSE</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="form-actions mt-4">
                    <button type="button" className="btn-submit" onClick={handleSendToDept}>
                      Confirm & Send to {targetDept || '...'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBookingForm && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowBookingForm(false)}>
          <div className="booking-modal glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="header-title">
                <Icons.Car size={24} color="var(--accent)" />
                <h2>New Booking Lead</h2>
              </div>
              <button className="close-btn" onClick={() => setShowBookingForm(false)}><Icons.X size={20} /></button>
            </div>
            
            <form className="booking-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" name="name" placeholder="Full Name" onChange={handleBookingChange} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" name="phone" placeholder="+91 00000 00000" onChange={handleBookingChange} />
                </div>
                <div className="form-group">
                  <label>Vehicle Model</label>
                  <select name="model" onChange={handleBookingChange}>
                    <option value="">Select Model</option>
                    {VEHICLE_DATA.models.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Variant</label>
                  <select name="variant" onChange={handleBookingChange}>
                    <option value="">Select Variant</option>
                    {VEHICLE_DATA.variants.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <select name="color" onChange={handleBookingChange}>
                    <option value="">Select Color</option>
                    {VEHICLE_DATA.colors.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Final Price (On-Road)</label>
                  <div className="input-with-prefix">
                    <span>₹</span>
                    <input type="number" name="price" placeholder="0.00" onChange={handleBookingChange} />
                  </div>
                </div>
              </div>

              <div className="payment-section">
                <label className="section-label">Payment Method</label>
                <div className="payment-toggle">
                  <button type="button" className={bookingData.paymentType === 'online' ? 'active' : ''} onClick={() => setBookingData({...bookingData, paymentType: 'online'})}>
                    <Icons.CreditCard size={16} /> Online
                  </button>
                  <button type="button" className={bookingData.paymentType === 'cash' ? 'active' : ''} onClick={() => setBookingData({...bookingData, paymentType: 'cash'})}>
                    <Icons.Banknote size={16} /> Cash
                  </button>
                </div>
              </div>

              <div className="document-upload-section">
                <label className="section-label">Upload Documents</label>
                <div className="upload-grid">
                  <label className="upload-box">
                    <input type="file" hidden onChange={() => alert('Document Uploaded!')} />
                    <Icons.FileText size={18} />
                    <span>Deal Sheet</span>
                  </label>
                  <label className="upload-box">
                    <input type="file" hidden onChange={() => alert('Document Uploaded!')} />
                    <Icons.User size={18} />
                    <span>Aadhar Card</span>
                  </label>
                  <label className="upload-box">
                    <input type="file" hidden onChange={() => alert('Document Uploaded!')} />
                    <Icons.IdCard size={18} />
                    <span>PAN Card</span>
                  </label>
                  <label className="upload-box">
                    <input type="file" hidden onChange={() => alert('Document Uploaded!')} />
                    <Icons.PlusCircle size={18} />
                    <span>Other Docs</span>
                  </label>
                  {bookingData.paymentType === 'online' ? (
                    <label className="upload-box highlight">
                      <input type="file" hidden onChange={() => alert('Document Uploaded!')} />
                      <Icons.Smartphone size={18} />
                      <span>Txn Screenshot</span>
                    </label>
                  ) : (
                    <label className="upload-box highlight">
                      <input type="file" hidden onChange={() => alert('Document Uploaded!')} />
                      <Icons.Receipt size={18} />
                      <span>Cash Receipt</span>
                    </label>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-whatsapp" onClick={handleShareBooking}>
                  <Icons.MessageSquare size={18} />
                  Share via WhatsApp
                </button>
                <button type="button" className="btn-submit" onClick={handleSubmitBooking}>Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showAllActiveLeads && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowAllActiveLeads(false)}>
          <div className="booking-modal glass wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="header-title">
                <Icons.List size={24} color="var(--accent)" />
                <h2>All Active Leads</h2>
              </div>
              <div className="modal-actions">
                <div className="search-box-mini glass">
                  <Icons.Search size={16} />
                  <input 
                    type="text" 
                    placeholder="Search name or number..." 
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                  />
                </div>
                <button className="close-btn" onClick={() => setShowAllActiveLeads(false)}><Icons.X size={20} /></button>
              </div>
            </div>
            
            <div className="leads-list glass">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Model</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActiveLeads.map(lead => (
                    <tr key={lead.id}>
                      <td className="booking-id">{lead.id}</td>
                      <td>
                        <div className="customer-cell">
                          <div className="avatar-sm">{lead.name.charAt(0)}</div>
                          <div className="customer-info-cell">
                            <span className="customer-name-text">{lead.name}</span>
                            <span className="customer-phone-text">{lead.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td>{lead.model}</td>
                      <td className="amount-cell">₹{lead.price}</td>
                      <td><span className={`status-tag ${lead.status.toLowerCase().replace(' ', '-')}`}>{lead.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredActiveLeads.length === 0 && (
                <div className="no-results-msg">No leads found for "{leadSearch}"</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleDashboard;
