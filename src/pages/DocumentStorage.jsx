import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './DocumentStorage.css';

const DocumentStorage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCustomerId, setExpandedCustomerId] = useState(null);
  
  const deliveredCustomers = [
    {
      id: 'C-8821',
      name: 'Rahul Sharma',
      phone: '9876543210',
      vehicle: 'SUV XC90',
      deliveryDate: '2026-05-01',
      documents: [
        { name: 'Aadhar Card', type: 'PDF', size: '1.2 MB', icon: 'FileText', uploadedBy: 'Sales Executive' },
        { name: 'PAN Card', type: 'JPG', size: '0.8 MB', icon: 'Image', uploadedBy: 'Sales Executive' },
        { name: 'Insurance Policy', type: 'PDF', size: '2.5 MB', icon: 'Shield', uploadedBy: 'Insurance Department' },
        { name: 'Registration Certificate', type: 'PDF', size: '1.5 MB', icon: 'FileCheck', uploadedBy: 'RTO Office' }
      ]
    },
    {
      id: 'C-9932',
      name: 'Anjali Gupta',
      phone: '9988776655',
      vehicle: 'Sedan S60',
      deliveryDate: '2026-04-28',
      documents: [
        { name: 'Driving License', type: 'PDF', size: '1.1 MB', icon: 'IdCard', uploadedBy: 'Sales Executive' },
        { name: 'Address Proof', type: 'PDF', size: '1.4 MB', icon: 'Home', uploadedBy: 'Sales Executive' },
        { name: 'Sales Invoice', type: 'PDF', size: '3.2 MB', icon: 'Receipt', uploadedBy: 'Finance Department' },
        { name: 'Insurance Policy Document', type: 'PDF', size: '2.8 MB', icon: 'Shield', uploadedBy: 'Insurance Department' }
      ]
    }
  ];

  const filteredCustomers = deliveredCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWhatsAppShare = (customerName, docName) => {
    const message = `Hello ${customerName}, here is your ${docName} from DealerGuard ERP.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleExpand = (id) => {
    setExpandedCustomerId(expandedCustomerId === id ? null : id);
  };

  return (
    <div className="document-storage animate-fade-in">
      <div className="storage-header">
        <div className="header-left">
          <Icons.FolderClosed size={32} color="var(--accent)" />
          <div>
            <h2>Finance Documents</h2>
            <p>Access and manage documents for verified and processed leads.</p>
          </div>
        </div>
        
        <div className="search-box glass">
          <Icons.Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by name, number or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="customer-docs-grid">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(customer => (
            <div 
              key={customer.id} 
              className={`customer-doc-card card-shadow animate-fade-in ${expandedCustomerId === customer.id ? 'active' : ''}`}
              onClick={() => toggleExpand(customer.id)}
            >
              <div className="card-header">
                <div className="customer-info">
                  <h3>{customer.name}</h3>
                  <div className="customer-meta-row">
                    <span className="customer-id">{customer.id}</span>
                    <span className="customer-phone">• {customer.phone}</span>
                  </div>
                </div>
                <div className="vehicle-tag">{customer.vehicle}</div>
              </div>
              
              <div className="delivery-meta">
                <Icons.Calendar size={14} />
                <span>Delivered on {customer.deliveryDate}</span>
                <Icons.ChevronDown className={`expand-icon ${expandedCustomerId === customer.id ? 'rotate' : ''}`} size={18} />
              </div>

              {expandedCustomerId === customer.id && (
                <div className="doc-list animate-fade-in" onClick={(e) => e.stopPropagation()}>
                  <div className="doc-list-header">Customer Documents</div>
                  {customer.documents.map((doc, idx) => {
                    const Icon = Icons[doc.icon] || Icons.File;
                    return (
                      <div key={idx} className="doc-item">
                        <div className="doc-icon">
                          <Icon size={18} />
                        </div>
                        <div className="doc-details">
                          <span className="doc-name">{doc.name}</span>
                          <span className="doc-meta">
                            <span>{doc.type} • {doc.size}</span>
                            {doc.uploadedBy && (
                              <span className="doc-uploader-badge">
                                Uploaded by: {doc.uploadedBy}
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="doc-actions">
                          <button className="doc-action-btn whatsapp" title="Share via WhatsApp" onClick={() => handleWhatsAppShare(customer.name, doc.name)}>
                            <Icons.MessageSquare size={16} />
                          </button>
                          <button className="doc-action-btn download" title="Download">
                            <Icons.Download size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results glass">
            <Icons.SearchX size={48} />
            <p>No customers found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentStorage;
