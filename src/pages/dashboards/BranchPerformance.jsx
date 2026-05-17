import React from 'react';
import Chart from 'react-apexcharts';
import * as Icons from 'lucide-react';
import './BrandCEO.css';

const BranchPerformance = () => {
  const branchData = [
    { name: 'Rajkot', target: 100, achieved: 85 },
    { name: 'Ahmedabad', target: 120, achieved: 72 },
    { name: 'Morbi', target: 60, achieved: 64 },
  ];

  const branchChartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '55%',
      }
    },
    colors: ['#3b82f6', '#10b981'],
    xaxis: {
      categories: ['Rajkot', 'Ahmedabad', 'Morbi'],
      labels: { style: { colors: '#94a3b8' } }
    },
    yaxis: {
      title: { text: 'Cars / Deliveries', style: { color: '#94a3b8' } },
      labels: { style: { colors: '#94a3b8' } }
    },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.1)',
    },
    legend: { 
      show: true,
      position: 'top',
      labels: { colors: '#94a3b8' }
    },
    theme: { mode: 'dark' }
  };

  const branchChartSeries = [
    { name: 'Monthly Target', data: [100, 120, 60] },
    { name: 'Achieved Deliveries', data: [85, 72, 64] }
  ];

  return (
    <div className="ceo-dashboard">
      <div className="ceo-header">
        <div>
          <div className="breadcrumb">
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Strategic View</span>
            <Icons.ChevronRight size={12} style={{ margin: '0 8px', color: 'var(--text-dim)' }} />
            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>Branch Performance</span>
          </div>
          <h1>Branch Performance Analysis</h1>
        </div>
        <div className="date-badge">
          <Icons.Calendar size={14} style={{ marginRight: 8 }} />
          {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="ceo-main-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="ceo-chart-container">
          <div className="chart-header">
            <h3>Branch Achievement: Deliveries vs Targets</h3>
          </div>
          <div className="branch-performance-list">
            {branchData.map(branch => (
              <div key={branch.name} className="branch-item">
                <div className="branch-item-header">
                  <span className="branch-name">{branch.name}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span className="branch-value" style={{ color: '#10b981' }}>{branch.achieved} Deliveries</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginLeft: '8px' }}>/ {branch.target} Target</span>
                  </div>
                </div>
                <div className="branch-progress">
                  <div 
                    className="branch-progress-fill" 
                    style={{ 
                      width: `${Math.min((branch.achieved / branch.target) * 100, 100)}%`, 
                      background: branch.achieved >= branch.target ? '#10b981' : '#3b82f6' 
                    }} 
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    {((branch.achieved / branch.target) * 100).toFixed(1)}% Achievement
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Chart 
              options={branchChartOptions} 
              series={branchChartSeries} 
              type="bar" 
              height={350} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchPerformance;
