import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './Team.css';

const Team = () => {
  const salesmanData = [
    { name: 'Rahul S.', team: 'Alpha', leads: 15, conversion: '12%', status: 'Active' },
    { name: 'Anjali G.', team: 'Alpha', leads: 12, conversion: '15%', status: 'Active' },
    { name: 'Siddharth M.', team: 'Alpha', leads: 18, conversion: '11%', status: 'Active' },
    { name: 'Kavita R.', team: 'Alpha', leads: 14, conversion: '14%', status: 'Active' },
  ];

  return (
    <div className="team-page animate-fade-in">
      <div className="team-header">
        <div className="header-info">
          <Icons.Users size={32} color="var(--accent)" />
          <div>
            <h2>Team Members & Performance</h2>
            <p>Monitor individual performance and lead distribution across your entire team.</p>
          </div>
        </div>
      </div>

      <div className="salesman-table-wrapper glass card-shadow">
        <table className="salesman-table">
          <thead>
            <tr>
              <th>Salesman</th>
              <th>Team</th>
              <th>Current Leads</th>
              <th>Conv. Rate</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {salesmanData.map(s => (
              <tr key={s.name}>
                <td data-label="Salesman">
                  <div className="salesman-info">
                    <div className="avatar-sm">{s.name.charAt(0)}</div>
                    <span>{s.name}</span>
                  </div>
                </td>
                <td data-label="Team"><span className="team-tag">{s.team}</span></td>
                <td data-label="Current Leads"><strong>{s.leads}</strong></td>
                <td data-label="Conv. Rate">{s.conversion}</td>
                <td data-label="Status">
                  <span className={`status-dot ${s.status.toLowerCase().replace(' ', '-')}`}></span>
                  {s.status}
                </td>
                <td data-label="Action"><button className="view-details-btn">View Pipeline</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Team;
