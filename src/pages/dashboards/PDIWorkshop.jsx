import React, { useState } from 'react';
import { PIPELINE_LEADS } from '../../data/PipelineData';
import * as Icons from 'lucide-react';
import './PDIWorkshop.css';

const PDIWorkshop = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Filter leads for PDI department
  const pdiLeads = PIPELINE_LEADS.filter(lead => lead.department === 'pdi');
  
  // Summary Stats
  const stats = {
    total: pdiLeads.length,
    pending: pdiLeads.filter(l => l.status === 'Pending').length,
    ready: pdiLeads.filter(l => l.status === 'Ready').length
  };

  return (
    <div className="pdi-dashboard">
      <div className="pdi-header">
        <div>
          <h1 className="text-2xl font-bold text-white">PDI Workshop Command Center</h1>
          <p className="text-gray-400">Manage pre-delivery inspections and vehicle readiness</p>
        </div>
        <button className="leads-action-btn">
          <Icons.ClipboardList size={20} />
          View All Leads
        </button>
      </div>

      <div className="pdi-stats">
        <div className="pdi-stat-card">
          <div className="stat-icon" style={{ background: 'rgba(255, 152, 0, 0.1)', color: '#ff9800' }}>
            <Icons.Clock size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Pending Inspection</div>
            <div className="text-2xl font-bold text-white">{stats.pending}</div>
          </div>
        </div>
        <div className="pdi-stat-card">
          <div className="stat-icon" style={{ background: 'rgba(33, 150, 243, 0.1)', color: '#2196f3' }}>
            <Icons.Wrench size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Currently Inspecting</div>
            <div className="text-2xl font-bold text-white">{pdiLeads.length - stats.pending - stats.ready}</div>
          </div>
        </div>
        <div className="pdi-stat-card">
          <div className="stat-icon" style={{ background: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' }}>
            <Icons.CheckCircle size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Ready for Delivery</div>
            <div className="text-2xl font-bold text-white">{stats.ready}</div>
          </div>
        </div>
      </div>

      <div className="pdi-table-container animate-fade-in">
        <table className="pdi-table">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Customer</th>
              <th>Vehicle Model</th>
              <th>Chasis No</th>
              <th>Status</th>
              <th>Delivery Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pdiLeads.map(lead => (
              <tr key={lead.id}>
                <td className="font-mono text-accent">{lead.id}</td>
                <td>
                  <div className="font-medium text-white">{lead.name}</div>
                  <div className="text-xs text-gray-500">{lead.salesman} ({lead.team})</div>
                </td>
                <td className="text-gray-300">{lead.vehicle}</td>
                <td className="text-gray-400 font-mono text-sm">{lead.pdiDetails?.chasisNumber || 'N/A'}</td>
                <td>
                  <span className={`pdi-status-tag ${lead.status.toLowerCase()}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="text-gray-400">{lead.pdiDetails?.deliveryDate || lead.date}</td>
                <td>
                  <button className="view-btn" onClick={() => setSelectedLead(lead)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Icons.FileText className="text-accent" />
                Detailed PDI Form Data
              </h2>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 transition-colors">
                <Icons.X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="pdi-detail-grid">
                <div className="detail-item">
                  <label>Customer Name</label>
                  <span>{selectedLead.pdiDetails?.customerName}</span>
                </div>
                <div className="detail-item">
                  <label>Vehicle Model</label>
                  <span>{selectedLead.pdiDetails?.vehicleModel}</span>
                </div>
                <div className="detail-item">
                  <label>Colour</label>
                  <span>{selectedLead.pdiDetails?.colour}</span>
                </div>
                <div className="detail-item">
                  <label>Fuel Type</label>
                  <span>{selectedLead.pdiDetails?.fuelType}</span>
                </div>
                <div className="detail-item">
                  <label>Chasis Number</label>
                  <span className="font-mono text-accent">{selectedLead.pdiDetails?.chasisNumber}</span>
                </div>
                <div className="detail-item">
                  <label>Register No</label>
                  <span>{selectedLead.pdiDetails?.registerNo || 'Pending'}</span>
                </div>
                <div className="detail-item">
                  <label>Invoice No</label>
                  <span>{selectedLead.pdiDetails?.invoiceNo || 'Pending'}</span>
                </div>
                <div className="detail-item">
                  <label>Accessories</label>
                  <span className="capitalize">{selectedLead.pdiDetails?.accessories}</span>
                </div>
                <div className="detail-item">
                  <label>Delivery Date</label>
                  <span className="text-accent">{selectedLead.pdiDetails?.deliveryDate}</span>
                </div>
                <div className="detail-item">
                  <label>Delivery Time</label>
                  <span>{selectedLead.pdiDetails?.deliveryTime}</span>
                </div>
                <div className="detail-item">
                  <label>TL Name</label>
                  <span>{selectedLead.pdiDetails?.tlName}</span>
                </div>
                <div className="detail-item">
                  <label>CA Name</label>
                  <span>{selectedLead.pdiDetails?.caName}</span>
                </div>
                <div className="detail-item full-width">
                  <label>Delivery Location</label>
                  <span>{selectedLead.pdiDetails?.deliveryLocation}</span>
                </div>
                <div className="detail-item full-width">
                  <label>Remark</label>
                  <div className="pdi-remark-box">
                    {selectedLead.pdiDetails?.remark || 'No special remarks provided.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-800 bg-gray-900/50 flex justify-end gap-3">
              <button className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors" onClick={() => setSelectedLead(null)}>
                Close
              </button>
              <button className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors flex items-center gap-2">
                <Icons.CheckCircle2 size={18} />
                Mark as Ready
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDIWorkshop;