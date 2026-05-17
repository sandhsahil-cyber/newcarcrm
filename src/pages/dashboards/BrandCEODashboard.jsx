import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Chart from 'react-apexcharts';
import * as Icons from 'lucide-react';
import RTOMarketShare from '../../components/RTOMarketShare';
import './BrandCEO.css';
const BrandCEODashboard = ({ title = "Brand CEO Dashboard", isOwner = false }) => {
  const [showRevenueDetail, setShowRevenueDetail] = useState(false);
  const [showConvDetail, setShowConvDetail] = useState(false);
  const [showAgingDetail, setShowAgingDetail] = useState(false);
  const [showProfitDetail, setShowProfitDetail] = useState(false);
  const [showLiquidityDetail, setShowLiquidityDetail] = useState(false);
  const [showApprovalsDetail, setShowApprovalsDetail] = useState(false);

  // Mock Data
  const metrics = {
    totalRevenue: '₹12.48 Cr',
    revenueTrend: '+14.2%',
    stockValuation: '₹42.80 Cr',
    stockTrend: '-2.1%',
    conversionRate: '18.5%',
    convTrend: '+1.5%',
    agingAlert: 14,
    // Owner specific
    groupProfitability: '₹2.84 Cr',
    profitTrend: '+5.4%',
    cashLiquidity: '₹8.50 Cr',
    liquidityStatus: 'Stable',
    pendingApprovals: 12,
    overallCSAT: '4.8/5'
  };


  const revenueChartOptions = {
    chart: {
      id: 'revenue-trend',
      toolbar: { show: false },
      sparkline: { enabled: false },
      background: 'transparent',
    },
    colors: ['#e66239'],
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8' } }
    },
    yaxis: {
      labels: { style: { colors: '#94a3b8' } }
    },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.1)',
      strokeDashArray: 4,
    },
    theme: { mode: 'dark' },
    tooltip: { theme: 'dark' }
  };

  const revenueChartSeries = [{
    name: 'Revenue (Cr)',
    data: [8.2, 9.1, 10.5, 11.2, 11.8, 12.48]
  }];


  const stockChartOptions = {
    chart: { type: 'donut' },
    labels: ['SUV XC90', 'Sedan S60', 'EV Recharge', 'Compact C40'],
    colors: ['#e66239', '#3b82f6', '#10b981', '#f59e0b'],
    legend: {
      position: 'bottom',
      labels: { colors: '#94a3b8' }
    },
    stroke: { show: false },
    dataLabels: { enabled: false },
    theme: { mode: 'dark' }
  };

  const stockChartSeries = [45, 25, 20, 10];


  return (
    <div className="ceo-dashboard">
      <div className="ceo-header">
        <div>
          <div className="breadcrumb">
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Strategic View</span>
            <Icons.ChevronRight size={12} style={{ margin: '0 8px', color: 'var(--text-dim)' }} />
            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>{title}</span>
          </div>
          <h1>Command Center Overview</h1>
        </div>
        <div className="date-badge">
          <Icons.Calendar size={14} style={{ marginRight: 8 }} />
          {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="ceo-stats-grid">
        <div className="ceo-stat-card clickable" onClick={() => setShowRevenueDetail(true)}>
          <div className="ceo-stat-icon"><Icons.IndianRupee size={20} /></div>
          <div className="ceo-stat-info">
            <span className="ceo-stat-label">Total Sales Revenue</span>
            <span className="ceo-stat-value">{metrics.totalRevenue}</span>
          </div>
          <div className={`ceo-stat-trend up`}>
            <Icons.TrendingUp size={14} />
            <span>{metrics.revenueTrend} vs last month</span>
          </div>
        </div>

        <div className="ceo-stat-card clickable" onClick={() => setShowConvDetail(true)}>
          <div className="ceo-stat-icon"><Icons.Target size={20} /></div>
          <div className="ceo-stat-info">
            <span className="ceo-stat-label">Conv. Rate (L2D)</span>
            <span className="ceo-stat-value">{metrics.conversionRate}</span>
          </div>
          <div className={`ceo-stat-trend up`}>
            <Icons.TrendingUp size={14} />
            <span>{metrics.convTrend} Efficiency</span>
          </div>
        </div>

        <div className="ceo-stat-card urgent clickable" onClick={() => setShowAgingDetail(true)}>
          <div className="ceo-stat-icon" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}>
            <Icons.AlertTriangle size={20} />
          </div>
          <div className="ceo-stat-info">
            <span className="ceo-stat-label" style={{ color: '#ef4444' }}>Aging Alert (90+ Days)</span>
            <span className="ceo-stat-value">{metrics.agingAlert} Units</span>
          </div>
          <div className="aging-alert-list">
            <div className="aging-item">
              <span>SUV XC90</span>
              <span>8 Units</span>
            </div>
            <div className="aging-item">
              <span>Sedan S60</span>
              <span>6 Units</span>
            </div>
          </div>
        </div>
      </div>

      {isOwner && (
        <>
          <div className="section-divider" style={{ margin: '3rem 0 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text)', whiteSpace: 'nowrap' }}>Owner's Strategic Insights</h2>
            <div style={{ height: '1px', background: 'var(--border)', width: '100%' }}></div>
          </div>
          
          <div className="ceo-stats-grid">
            <div className="ceo-stat-card clickable" onClick={() => setShowProfitDetail(true)}>
              <div className="ceo-stat-icon" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
                <Icons.TrendingUp size={20} />
              </div>
              <div className="ceo-stat-info">
                <span className="ceo-stat-label">Group Net Profitability</span>
                <span className="ceo-stat-value">{metrics.groupProfitability}</span>
              </div>
              <div className="ceo-stat-trend up">
                <Icons.ArrowUpRight size={14} />
                <span>{metrics.profitTrend} vs Target</span>
              </div>
            </div>

            <div className="ceo-stat-card clickable" onClick={() => setShowLiquidityDetail(true)}>
              <div className="ceo-stat-icon" style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' }}>
                <Icons.Wallet size={20} />
              </div>
              <div className="ceo-stat-info">
                <span className="ceo-stat-label">Available Cash Liquidity</span>
                <span className="ceo-stat-value">{metrics.cashLiquidity}</span>
              </div>
              <div className="ceo-stat-trend" style={{ color: 'var(--text-dim)' }}>
                <Icons.CheckCircle2 size={14} />
                <span>{metrics.liquidityStatus}</span>
              </div>
            </div>

            <div className="ceo-stat-card clickable" onClick={() => setShowApprovalsDetail(true)}>
              <div className="ceo-stat-icon" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
                <Icons.Stamp size={20} />
              </div>
              <div className="ceo-stat-info">
                <span className="ceo-stat-label">Pending Major Approvals</span>
                <span className="ceo-stat-value">{metrics.pendingApprovals} Items</span>
              </div>
              <div className="ceo-stat-trend urgent" style={{ color: '#f59e0b' }}>
                <Icons.Clock size={14} />
                <span>Action Required</span>
              </div>
            </div>

            <div className="ceo-stat-card">
              <div className="ceo-stat-icon" style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)' }}>
                <Icons.SmilePlus size={20} />
              </div>
              <div className="ceo-stat-info">
                <span className="ceo-stat-label">Overall Group CSAT</span>
                <span className="ceo-stat-value">{metrics.overallCSAT}</span>
              </div>
              <div className="ceo-stat-trend up" style={{ color: '#8b5cf6' }}>
                <Icons.Star size={14} />
                <span>Excellence Level</span>
              </div>
            </div>
          </div>
        </>
      )}




      
      {showRevenueDetail && <RevenueDetailModal onClose={() => setShowRevenueDetail(false)} />}
      {showConvDetail && <ConvDetailModal onClose={() => setShowConvDetail(false)} />}
      {showAgingDetail && <AgingDetailModal onClose={() => setShowAgingDetail(false)} />}
      {showProfitDetail && <ProfitabilityDetailModal onClose={() => setShowProfitDetail(false)} />}
      {showLiquidityDetail && <LiquidityDetailModal onClose={() => setShowLiquidityDetail(false)} />}
      {showApprovalsDetail && <ApprovalsDetailModal onClose={() => setShowApprovalsDetail(false)} />}
    </div>
  );
};

// ── Sub-component: Revenue Detail Modal ──────────────────────────────────────
const RevenueDetailModal = ({ onClose }) => {
  const sourceChartOptions = {
    chart: { type: 'donut' },
    labels: ['Walk-in Leads', 'Digital Leads', 'Reference Leads'],
    colors: ['#e66239', '#3b82f6', '#10b981'],
    legend: { position: 'bottom', labels: { colors: '#94a3b8' } },
    stroke: { show: false },
    theme: { mode: 'dark' }
  };

  const sourceChartSeries = [6.5, 4.2, 1.78];

  const funnelData = [
    { label: 'Total Leads', value: 1240, color: '#94a3b8' },
    { label: 'Bookings', value: 248, color: '#3b82f6', sub: '20% Conv.' },
    { label: 'Deliveries', value: 186, color: '#10b981', sub: '75% of Bookings' },
  ];

  return createPortal(
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="booking-modal glass wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title">
            <Icons.BarChart size={24} color="var(--accent)" />
            <h2>Revenue & Lead Performance Detail</h2>
          </div>
          <button className="close-btn" onClick={onClose}><Icons.X size={20} /></button>
        </div>

        <div className="modal-main-layout">
          <div className="modal-left-col">
            <div className="detail-section">
              <h3 className="detail-title">Revenue by Lead Source</h3>
              <div style={{ marginTop: '1.5rem' }}>
                <Chart options={sourceChartOptions} series={sourceChartSeries} type="donut" height={320} />
              </div>
              <div className="source-breakdown-list">
                <div className="source-item">
                  <div className="source-info">
                    <span className="source-dot" style={{ background: '#e66239' }}></span>
                    <span>Walk-in Leads</span>
                  </div>
                  <strong>₹6.50 Cr</strong>
                </div>
                <div className="source-item">
                  <div className="source-info">
                    <span className="source-dot" style={{ background: '#3b82f6' }}></span>
                    <span>Digital Leads</span>
                  </div>
                  <strong>₹4.20 Cr</strong>
                </div>
                <div className="source-item">
                  <div className="source-info">
                    <span className="source-dot" style={{ background: '#10b981' }}></span>
                    <span>Reference Leads</span>
                  </div>
                  <strong>₹1.78 Cr</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-right-col">
            <div className="detail-section">
              <h3 className="detail-title">Sales Funnel Efficiency</h3>
              <div className="funnel-container">
                {funnelData.map((item, idx) => (
                  <React.Fragment key={item.label}>
                    <div className="funnel-step glass">
                      <div className="funnel-step-info">
                        <span className="funnel-label">{item.label}</span>
                        <span className="funnel-value">{item.value}</span>
                      </div>
                      {item.sub && <span className="funnel-sub">{item.sub}</span>}
                      <div className="funnel-bar-track">
                        <div 
                          className="funnel-bar-fill" 
                          style={{ width: `${(item.value / funnelData[0].value) * 100}%`, background: item.color }}
                        ></div>
                      </div>
                    </div>
                    {idx < funnelData.length - 1 && (
                      <div className="funnel-arrow">
                        <Icons.ChevronDown size={16} color="var(--text-dim)" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="outlet-total-card glass">
                <h4>Outlet Summary</h4>
                <div className="outlet-grid">
                  <div className="outlet-stat">
                    <span>Total Vehicles Sold</span>
                    <strong>186 Units</strong>
                  </div>
                  <div className="outlet-stat">
                    <span>Avg. Value / Unit</span>
                    <strong>₹6.71 L</strong>
                  </div>
                  <div className="outlet-stat">
                    <span>Target Achievement</span>
                    <strong style={{ color: '#10b981' }}>104.2%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Sub-component: Conversion Detail Modal ───────────────────────────────────
const ConvDetailModal = ({ onClose }) => {
  const activityData = [
    { label: 'Total Leads', value: 1240, icon: 'Users', color: '#94a3b8' },
    { label: 'Test Drives', value: 450, icon: 'Car', color: '#3b82f6', ratio: '36.3% of Leads' },
    { label: 'Home Visits', value: 180, icon: 'Home', color: '#f59e0b', ratio: '14.5% of Leads' },
  ];

  const milestoneData = [
    { label: 'Bookings Done', value: 248, icon: 'ClipboardCheck', color: '#e66239', ratio: '20.0% Conversion' },
    { label: 'RTO Processed', value: 210, icon: 'FileText', color: '#10b981', ratio: '84.7% of Bookings' },
    { label: 'Deliveries Done', value: 186, icon: 'CheckCircle2', color: '#10b981', ratio: '88.6% of RTO' },
  ];

  return createPortal(
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="booking-modal glass wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title">
            <Icons.Target size={24} color="var(--accent)" />
            <h2>Conversion & Activity Analysis</h2>
          </div>
          <button className="close-btn" onClick={onClose}><Icons.X size={20} /></button>
        </div>

        <div className="modal-main-layout">
          <div className="modal-left-col">
            <div className="detail-section">
              <h3 className="detail-title">Engagement Activities</h3>
              <div className="activity-cards-grid">
                {activityData.map(item => {
                  const Icon = Icons[item.icon];
                  return (
                    <div key={item.label} className="activity-detail-card glass">
                      <div className="activity-header">
                        <Icon size={18} style={{ color: item.color }} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>{item.label}</span>
                      </div>
                      <div className="activity-body">
                        <span className="activity-val">{item.value}</span>
                        {item.ratio && <span className="activity-ratio">{item.ratio}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="efficiency-box glass">
                <h4>Activity-to-Booking Efficiency</h4>
                <div className="efficiency-bar-container">
                  <div className="efficiency-stat">
                    <span>Test Drive to Booking</span>
                    <strong>55.1%</strong>
                  </div>
                  <div className="efficiency-progress"><div className="efficiency-fill" style={{ width: '55.1%', background: '#3b82f6' }}></div></div>
                </div>
                <div className="efficiency-bar-container" style={{ marginTop: '1rem' }}>
                  <div className="efficiency-stat">
                    <span>Home Visit to Booking</span>
                    <strong>42.8%</strong>
                  </div>
                  <div className="efficiency-progress"><div className="efficiency-fill" style={{ width: '42.8%', background: '#f59e0b' }}></div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-right-col">
            <div className="detail-section">
              <h3 className="detail-title">Pipeline Milestones</h3>
              <div className="milestone-list">
                {milestoneData.map((item, idx) => {
                  const Icon = Icons[item.icon];
                  return (
                    <div key={item.label} className="milestone-card glass">
                      <div className="milestone-icon-box" style={{ background: `${item.color}20`, color: item.color }}>
                        <Icon size={20} />
                      </div>
                      <div className="milestone-info">
                        <div className="milestone-top">
                          <span className="milestone-label">{item.label}</span>
                          <span className="milestone-val">{item.value}</span>
                        </div>
                        <span className="milestone-ratio">{item.ratio}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="conv-summary-box glass">
                <Icons.Zap size={20} color="#f59e0b" />
                <div>
                  <p>Overall Lead to Delivery Ratio</p>
                  <strong>15.0% (186/1240)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Sub-component: Aging Detail Modal ────────────────────────────────────────
const AgingDetailModal = ({ onClose }) => {
  const agedUnits = [
    { chassis: 'TATA-X90-101', model: 'SUV XC90', variant: 'B6 Inscription', age: 112, branch: 'Rajkot', color: 'Pine Grey' },
    { chassis: 'TATA-X90-105', model: 'SUV XC90', variant: 'B6 Inscription', age: 98, branch: 'Rajkot', color: 'Crystal White' },
    { chassis: 'TATA-X90-112', model: 'SUV XC90', variant: 'Recharge', age: 104, branch: 'Ahmedabad', color: 'Denim Blue' },
    { chassis: 'TATA-S60-202', model: 'Sedan S60', variant: 'Momentum', age: 115, branch: 'Ahmedabad', color: 'Fusion Red' },
    { chassis: 'TATA-S60-209', model: 'Sedan S60', variant: 'Momentum', age: 92, branch: 'Morbi', color: 'Onyx Black' },
    { chassis: 'TATA-X90-128', model: 'SUV XC90', variant: 'B6 Inscription', age: 95, branch: 'Rajkot', color: 'Pine Grey' },
    { chassis: 'TATA-S60-215', model: 'Sedan S60', variant: 'Inscription', age: 108, branch: 'Ahmedabad', color: 'Pebble Grey' },
  ];

  return createPortal(
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="booking-modal glass wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title">
            <Icons.History size={24} color="#ef4444" />
            <h2>Inventory Aging Detail (90+ Days)</h2>
          </div>
          <button className="close-btn" onClick={onClose}><Icons.X size={20} /></button>
        </div>

        <div className="modal-body-scrollable">
          <div className="aging-summary-banner">
            <div className="banner-item">
              <span className="banner-label">Oldest Unit</span>
              <strong className="banner-val">115 Days</strong>
            </div>
            <div className="banner-item">
              <span className="banner-label">Avg. Aging</span>
              <strong className="banner-val">103 Days</strong>
            </div>
            <div className="banner-item">
              <span className="banner-label">Inventory Risk</span>
              <strong className="banner-val" style={{ color: '#ef4444' }}>High</strong>
            </div>
          </div>

          <div className="aging-table-container glass">
            <table className="aging-table">
              <thead>
                <tr>
                  <th>Model & Variant</th>
                  <th>Chassis No.</th>
                  <th>Age (Days)</th>
                  <th>Branch</th>
                  <th>Color</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {agedUnits.map((unit) => (
                  <tr key={unit.chassis}>
                    <td>
                      <div className="unit-model-info">
                        <strong>{unit.model}</strong>
                        <span>{unit.variant}</span>
                      </div>
                    </td>
                    <td><code className="chassis-code">{unit.chassis}</code></td>
                    <td>
                      <span className={`age-badge ${unit.age > 110 ? 'critical' : 'warning'}`}>
                        {unit.age} Days
                      </span>
                    </td>
                    <td>{unit.branch}</td>
                    <td>
                      <div className="color-preview">
                        <span className="color-dot" style={{ background: unit.color.toLowerCase().replace(' ', '') }}></span>
                        {unit.color}
                      </div>
                    </td>
                    <td>
                      <button className="action-btn-small">Request Liquidation</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BrandCEODashboard;

// ── Sub-component: Profitability Detail Modal ────────────────────────────────
const ProfitabilityDetailModal = ({ onClose }) => {
  const profitChartOptions = {
    chart: { type: 'area', toolbar: { show: false }, background: 'transparent' },
    colors: ['#10b981'],
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100] }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#94a3b8' } }
    },
    yaxis: { labels: { style: { colors: '#94a3b8' } } },
    grid: { borderColor: 'rgba(148, 163, 184, 0.1)', strokeDashArray: 4 },
    theme: { mode: 'dark' }
  };

  const profitChartSeries = [{
    name: 'Net Profit (Cr)',
    data: [1.8, 2.1, 2.3, 2.5, 2.7, 2.84]
  }];

  const branchProfitData = [
    { name: 'Ahmedabad (Main)', profit: '₹1.12 Cr', margin: '14.2%', status: 'Stable' },
    { name: 'Rajkot (South)', profit: '₹0.85 Cr', margin: '12.8%', status: 'Growing' },
    { name: 'Morbi (West)', profit: '₹0.48 Cr', margin: '11.5%', status: 'At Risk' },
    { name: 'Surat (East)', profit: '₹0.39 Cr', margin: '10.9%', status: 'Stable' },
  ];

  return createPortal(
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="booking-modal glass wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title">
            <Icons.TrendingUp size={24} color="#10b981" />
            <h2>Group Net Profitability Analysis</h2>
          </div>
          <button className="close-btn" onClick={onClose}><Icons.X size={20} /></button>
        </div>

        <div className="modal-main-layout">
          <div className="modal-left-col">
            <div className="detail-section">
              <h3 className="detail-title">Monthly Net Profit Trend</h3>
              <div style={{ marginTop: '1rem' }}>
                <Chart options={profitChartOptions} series={profitChartSeries} type="area" height={280} />
              </div>
              <div className="efficiency-box glass" style={{ marginTop: '1.5rem' }}>
                <h4>Key Financial Ratio</h4>
                <div className="efficiency-bar-container">
                  <div className="efficiency-stat">
                    <span>Operating Margin</span>
                    <strong>12.4%</strong>
                  </div>
                  <div className="efficiency-progress"><div className="efficiency-fill" style={{ width: '62%', background: '#10b981' }}></div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-right-col">
            <div className="detail-section">
              <h3 className="detail-title">Branch Performance Breakdown</h3>
              <div className="milestone-list">
                {branchProfitData.map(branch => (
                  <div key={branch.name} className="milestone-card glass">
                    <div className="milestone-info">
                      <div className="milestone-top">
                        <span className="milestone-label">{branch.name}</span>
                        <span className="milestone-val" style={{ color: '#10b981' }}>{branch.profit}</span>
                      </div>
                      <div className="milestone-ratio">
                        <span>Margin: {branch.margin}</span>
                        <span style={{ marginLeft: '1rem', color: branch.status === 'At Risk' ? '#ef4444' : 'inherit' }}>
                          • {branch.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Sub-component: Liquidity Detail Modal ────────────────────────────────────
const LiquidityDetailModal = ({ onClose }) => {
  const liquidChartOptions = {
    chart: { type: 'donut' },
    labels: ['Bank Balances', 'Cash in Hand', 'Receivables', 'Investments'],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
    legend: { position: 'bottom', labels: { colors: '#94a3b8' } },
    stroke: { show: false },
    theme: { mode: 'dark' }
  };

  const liquidChartSeries = [4.5, 0.8, 2.2, 1.0];

  return createPortal(
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="booking-modal glass wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title">
            <Icons.Wallet size={24} color="#3b82f6" />
            <h2>Cash Liquidity & Fund Flow</h2>
          </div>
          <button className="close-btn" onClick={onClose}><Icons.X size={20} /></button>
        </div>

        <div className="modal-main-layout">
          <div className="modal-left-col">
            <div className="detail-section">
              <h3 className="detail-title">Liquidity Composition</h3>
              <div style={{ marginTop: '2rem' }}>
                <Chart options={liquidChartOptions} series={liquidChartSeries} type="donut" height={320} />
              </div>
            </div>
          </div>

          <div className="modal-right-col">
            <div className="detail-section">
              <h3 className="detail-title">Receivables Aging</h3>
              <div className="aging-alert-list" style={{ marginTop: '1rem' }}>
                <div className="aging-item" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', marginBottom: '0.75rem' }}>
                  <span>0 - 30 Days</span>
                  <strong style={{ color: '#10b981' }}>₹1.45 Cr</strong>
                </div>
                <div className="aging-item" style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '8px', marginBottom: '0.75rem' }}>
                  <span>31 - 60 Days</span>
                  <strong style={{ color: '#f59e0b' }}>₹0.52 Cr</strong>
                </div>
                <div className="aging-item" style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', marginBottom: '0.75rem' }}>
                  <span>61+ Days</span>
                  <strong style={{ color: '#ef4444' }}>₹0.23 Cr</strong>
                </div>
              </div>
              <div className="outlet-total-card glass" style={{ marginTop: '1.5rem' }}>
                <h4>Working Capital Status</h4>
                <div className="outlet-grid">
                  <div className="outlet-stat">
                    <span>Current Ratio</span>
                    <strong>2.4</strong>
                  </div>
                  <div className="outlet-stat">
                    <span>Burn Rate</span>
                    <strong>₹1.2M / mo</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ── Sub-component: Approvals Detail Modal ────────────────────────────────────
const ApprovalsDetailModal = ({ onClose }) => {
  const approvalItems = [
    { id: 1, type: 'Special Discount', requestor: 'Jayesh (Sales Mgr)', amount: '₹1,45,000', model: 'SUV XC90', date: '2 hours ago' },
    { id: 2, type: 'Marketing Spend', requestor: 'Meera (CMO)', amount: '₹3,50,000', model: 'New Launch Event', date: '5 hours ago' },
    { id: 3, type: 'Spare Inventory', requestor: 'Rahul (Workshop)', amount: '₹8,20,000', model: 'Critical Stock', date: 'Yesterday' },
    { id: 4, type: 'Credit Extension', requestor: 'Accounts Dept', amount: '₹12,00,000', model: 'Corporate Deal', date: 'Yesterday' },
  ];

  return createPortal(
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="booking-modal glass wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-title">
            <Icons.Stamp size={24} color="#f59e0b" />
            <h2>Pending Executive Approvals</h2>
          </div>
          <button className="close-btn" onClick={onClose}><Icons.X size={20} /></button>
        </div>

        <div className="modal-body-scrollable">
          <div className="aging-table-container glass">
            <table className="aging-table">
              <thead>
                <tr>
                  <th>Request Type</th>
                  <th>Requestor</th>
                  <th>Value / Subject</th>
                  <th>Context</th>
                  <th>Requested</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {approvalItems.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.type}</strong></td>
                    <td>{item.requestor}</td>
                    <td><strong style={{ color: 'var(--accent)' }}>{item.amount}</strong></td>
                    <td>{item.model}</td>
                    <td style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{item.date}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="action-btn-small" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                          Approve
                        </button>
                        <button className="action-btn-small" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};



