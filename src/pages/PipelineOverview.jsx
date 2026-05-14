import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import './PipelineOverview.css';

const PipelineOverview = () => {
  const navigate = useNavigate();

  const deptData = [
    { name: 'RTO', pending: 12, approved: 45, color: '#00897b' },
    { name: 'Insurance', pending: 15, approved: 38, color: '#1e88e5' },
    { name: 'Accessories', pending: 8, approved: 22, color: '#fb8c00' },
    { name: 'Accounts', pending: 5, approved: 18, color: '#8e24aa' },
    { name: 'Finance', pending: 8, approved: 30, color: '#43a047' },
  ];

  const maxVal = Math.max(...deptData.map(d => d.pending + d.approved));

  return (
    <div className="pipeline-overview animate-fade-in">
      <div className="overview-header">
        <Icons.Activity size={32} color="var(--accent)" />
        <div>
          <h2>Lead Pipeline Overview</h2>
          <p>Real-time department throughput and pending workloads.</p>
        </div>
      </div>

      <div className="pipeline-chart-card glass card-shadow">
        <div className="chart-title">Department Volume (Pending vs Approved)</div>
        <div className="chart-container">
          <div className="y-axis">
            <span>{maxVal}</span>
            <span>{Math.floor(maxVal/2)}</span>
            <span>0</span>
          </div>
          <div className="bars-wrapper">
            {deptData.map((dept) => (
              <div 
                key={dept.name} 
                className="dept-candle-group"
                onClick={() => navigate(`/pipeline/${dept.name.toLowerCase()}`)}
              >
                <div className="bars">
                  <div 
                    className="bar approved" 
                    style={{ height: `${(dept.approved / maxVal) * 100}%`, backgroundColor: dept.color }}
                  >
                    <span className="bar-label">{dept.approved}</span>
                  </div>
                  <div 
                    className="bar pending" 
                    style={{ height: `${(dept.pending / maxVal) * 100}%` }}
                  >
                    <span className="bar-label">{dept.pending}</span>
                  </div>
                </div>
                <div className="dept-name-label">{dept.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-legend">
          <div className="legend-item"><div className="dot approved"></div> Approved</div>
          <div className="legend-item"><div className="dot pending"></div> Pending</div>
        </div>
      </div>

      <div className="dept-grid">
        {deptData.map((dept) => (
          <div 
            key={dept.name} 
            className="dept-stat-card glass clickable"
            onClick={() => navigate(`/pipeline/${dept.name.toLowerCase()}`)}
          >
            <div className="dept-header">
              <span className="dept-indicator" style={{ backgroundColor: dept.color }}></span>
              <h3>{dept.name}</h3>
            </div>
            <div className="dept-body">
              <div className="stat-mini">
                <label>Pending</label>
                <span className="val pending">{dept.pending}</span>
              </div>
              <div className="stat-mini">
                <label>Approved</label>
                <span className="val approved">{dept.approved}</span>
              </div>
            </div>
            <div className="dept-footer">
              <span>View Full Pipeline</span>
              <Icons.ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineOverview;
