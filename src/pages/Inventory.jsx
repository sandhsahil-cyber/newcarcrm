import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ACCESSORIES_INVENTORY } from '../data/InventoryData';
import './Inventory.css';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredInventory = ACCESSORIES_INVENTORY.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = ACCESSORIES_INVENTORY.reduce((acc, item) => acc + (item.price * item.stock), 0);
  const lowStockCount = ACCESSORIES_INVENTORY.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').length;

  return (
    <div className="inventory-page animate-fade-in">
      <div className="inventory-header">
        <div className="header-info">
          <h1>Inventory Stock</h1>
          <p>Accessories Department Warehouse Management</p>
        </div>
        
        <div className="inventory-summary">
          <div className="summary-card glass">
            <div className="s-icon purple">
              <Icons.Box size={24} />
            </div>
            <div className="s-data">
              <span className="s-label">Total Items</span>
              <span className="s-value">{ACCESSORIES_INVENTORY.length}</span>
            </div>
          </div>
          
          <div className="summary-card glass">
            <div className="s-icon orange">
              <Icons.AlertTriangle size={24} />
            </div>
            <div className="s-data">
              <span className="s-label">Stock Alerts</span>
              <span className="s-value">{lowStockCount}</span>
            </div>
          </div>
          
          <div className="summary-card glass">
            <div className="s-icon green">
              <Icons.CircleDollarSign size={24} />
            </div>
            <div className="s-data">
              <span className="s-label">Inventory Value</span>
              <span className="s-value">₹ {totalValue.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="inventory-controls mt-4">
        <div className="search-box glass">
          <Icons.Search size={20} />
          <input 
            type="text" 
            placeholder="Search by SKU or Item Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="action-buttons">
          <button className="btn-primary">
            <Icons.Plus size={18} />
            Add New Item
          </button>
          <button className="btn-secondary">
            <Icons.Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="inventory-table-wrapper glass mt-4">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>SKU ID</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Unit Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => (
              <tr key={item.id}>
                <td className="sku-cell"><strong>{item.id}</strong></td>
                <td>{item.name}</td>
                <td><span className="category-badge">{item.category}</span></td>
                <td>{item.stock} {item.unit}</td>
                <td>₹ {item.price.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`stock-status ${item.status.toLowerCase().replace(/ /g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="icon-btn" title="Edit Item"><Icons.Edit3 size={16} /></button>
                  <button className="icon-btn" title="View History"><Icons.History size={16} /></button>
                  <button className="icon-btn delete" title="Delete"><Icons.Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredInventory.length === 0 && (
          <div className="no-results">
            <Icons.SearchX size={48} />
            <p>No inventory items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
