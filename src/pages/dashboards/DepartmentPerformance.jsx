import React from 'react';
import Chart from 'react-apexcharts';
import * as Icons from 'lucide-react';
import './BrandCEO.css';

const DepartmentPerformance = () => {
  const deptData = [
    { name: 'Finance', avgDays: 1.2, target: 1.0, status: 'warning' },
    { name: 'Insurance', avgDays: 0.5, target: 1.0, status: 'success' },
    { name: 'RTO', avgDays: 4.5, target: 3.0, status: 'critical' },
    { name: 'Accessories', avgDays: 1.8, target: 1.5, status: 'warning' },
    { name: 'PDI Workshop', avgDays: 0.8, target: 1.0, status: 'success' },
  ];

  const tatChartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      }
    },
    colors: ['#e66239', '#3b82f6'],
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth', width: 3 },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.1)',
      row: { colors: ['transparent'], opacity: 0.5 },
    },
    markers: { size: 4 },
    xaxis: {
      categories: ['Finance', 'Insurance', 'RTO', 'Accessories', 'PDI'],
      labels: { style: { colors: '#94a3b8' } }
    },
    yaxis: {
      title: { text: 'Days', style: { color: '#94a3b8' } },
      labels: { style: { colors: '#94a3b8' } }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: '#94a3b8' }
    },
    theme: { mode: 'dark' }
  };

  const tatChartSeries = [
    { name: 'Actual TAT (Days)', data: [1.2, 0.5, 4.5, 1.8, 0.8] },
    { name: 'Target TAT (Days)', data: [1.0, 1.0, 3.0, 1.5, 1.0] }
  ];

  return (
    <div className="ceo-dashboard">
      <div className="ceo-header">
        <div>
          <div className="breadcrumb">
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Strategic View</span>
            <Icons.ChevronRight size={12} style={{ margin: '0 8px', color: 'var(--text-dim)' }} />
            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>Department Performance</span>
          </div>
          <h1>Turnaround Time (TAT) Analysis</h1>
        </div>
        <div className="date-badge">
          <Icons.Calendar size={14} style={{ marginRight: 8 }} />
          {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="ceo-stats-grid">
        <div className="ceo-stat-card">
          <div className="ceo-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <Icons.FastForward size={20} />
          </div>
          <div className="ceo-stat-info">
            <span className="ceo-stat-label">Best Performer</span>
            <span className="ceo-stat-value">Insurance</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>0.5 Days Avg. TAT</span>
          </div>
        </div>
        <div className="ceo-stat-card urgent">
          <div className="ceo-stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <Icons.AlertCircle size={20} />
          </div>
          <div className="ceo-stat-info">
            <span className="ceo-stat-label" style={{ color: '#ef4444' }}>Bottleneck Area</span>
            <span className="ceo-stat-value" style={{ color: '#ef4444' }}>RTO Dept</span>
            <span style={{ fontSize: '0.7rem', color: '#ef4444' }}>4.5 Days (Target: 3)</span>
          </div>
        </div>
        <div className="ceo-stat-card">
          <div className="ceo-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Icons.Timer size={20} />
          </div>
          <div className="ceo-stat-info">
            <span className="ceo-stat-label">Overall Avg. TAT</span>
            <span className="ceo-stat-value">1.76 Days</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Across all departments</span>
          </div>
        </div>
      </div>

      <div className="ceo-main-grid" style={{ gridTemplateColumns: '1fr', marginTop: '1.5rem' }}>
        <div className="ceo-chart-container">
          <div className="chart-header">
            <h3>Department Efficiency: Actual vs Target TAT</h3>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <Chart 
              options={tatChartOptions} 
              series={tatChartSeries} 
              type="line" 
              height={350} 
            />
          </div>
        </div>
      </div>

      <div className="ceo-main-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="ceo-chart-container">
          <div className="chart-header">
            <h3>Department Breakdown</h3>
          </div>
          <div className="branch-performance-list">
            {deptData.map(dept => (
              <div key={dept.name} className="branch-item">
                <div className="branch-item-header">
                  <span className="branch-name">{dept.name}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span className="branch-value" style={{ color: dept.status === 'success' ? '#10b981' : dept.status === 'warning' ? '#f59e0b' : '#ef4444' }}>
                      {dept.avgDays} Days
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginLeft: '8px' }}>/ {dept.target} Target</span>
                  </div>
                </div>
                <div className="branch-progress">
                  <div 
                    className="branch-progress-fill" 
                    style={{ 
                      width: `${Math.min((dept.avgDays / dept.target) * 100, 100)}%`, 
                      background: dept.status === 'success' ? '#10b981' : dept.status === 'warning' ? '#f59e0b' : '#ef4444' 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPerformance;
