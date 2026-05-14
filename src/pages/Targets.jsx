import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './Targets.css';

const Targets = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const teamTargets = [
    { id: 1, name: 'Team Alpha', target: 50, achieved: 42, color: '#ff6b4a' },
    { id: 2, name: 'Team Beta', target: 45, achieved: 31, color: '#4caf50' },
    { id: 3, name: 'Team Gamma', target: 40, achieved: 12, color: '#2196f3' },
  ];

  const salesmenTargets = {
    1: [
      { name: 'Rahul S.', target: 20, achieved: 18 },
      { name: 'Anjali G.', target: 15, achieved: 14 },
      { name: 'Suresh M.', target: 15, achieved: 10 },
    ],
    2: [
      { name: 'Vikram K.', target: 15, achieved: 10 },
      { name: 'Priya M.', target: 15, achieved: 11 },
      { name: 'Rohan B.', target: 15, achieved: 10 },
    ],
    3: [
      { name: 'Amit P.', target: 15, achieved: 5 },
      { name: 'Sonal T.', target: 15, achieved: 4 },
      { name: 'Deepak V.', target: 10, achieved: 3 },
    ]
  };

  return (
    <div className="targets-page animate-fade-in">
      <div className="targets-header">
        <Icons.Target size={32} color="var(--accent)" />
        <div>
          <h2>Monthly Performance Targets</h2>
          <p>Monitor team-wise goals and individual sales targets.</p>
        </div>
      </div>

      <div className="targets-content">
        <div className="teams-target-grid">
          {teamTargets.map(team => (
            <div 
              key={team.id} 
              className={`team-target-card glass card-shadow clickable ${selectedTeam === team.id ? 'active' : ''}`}
              onClick={() => setSelectedTeam(team.id)}
            >
              <div className="team-info">
                <h3>{team.name}</h3>
                <span className="target-count">{team.achieved} / {team.target} Units</span>
              </div>
              <div className="progress-circle-container">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path 
                    className="circle" 
                    style={{ stroke: team.color }}
                    strokeDasharray={`${(team.achieved / team.target) * 100}, 100`} 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                  <text x="18" y="20.35" className="percentage">{Math.round((team.achieved / team.target) * 100)}%</text>
                </svg>
              </div>
              <div className="click-hint">Click to see Salesman details <Icons.ChevronRight size={14} /></div>
            </div>
          ))}
        </div>

        {selectedTeam && (
          <div className="salesman-targets-section animate-fade-in">
            <div className="section-header">
              <h3>{teamTargets.find(t => t.id === selectedTeam).name} - Salesman Wise Targets</h3>
              <button className="close-details" onClick={() => setSelectedTeam(null)}><Icons.X size={18} /></button>
            </div>
            <div className="salesman-target-list glass">
              {salesmenTargets[selectedTeam].map(s => (
                <div key={s.name} className="salesman-target-item">
                  <div className="s-info">
                    <span className="s-name">{s.name}</span>
                    <span className="s-count">{s.achieved} / {s.target}</span>
                  </div>
                  <div className="s-progress">
                    <div className="s-bar-bg">
                      <div className="s-bar-fill" style={{ width: `${(s.achieved / s.target) * 100}%`, backgroundColor: teamTargets.find(t => t.id === selectedTeam).color }}></div>
                    </div>
                    <span className="s-percent">{Math.round((s.achieved / s.target) * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Targets;
