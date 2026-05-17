import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import * as Icons from 'lucide-react';
import './RoleDashboard.css';
import './SalesManagerActive.css';

// ─── Team Data ────────────────────────────────────────────────────────────────
const TEAMS = [
  {
    id: 'sandip',
    leader: 'Sandip',
    avatar: 'S',
    color: '#e66239',
    target: 45,
    members: [
      { name: 'Arjun Patel', bookings: 12, rtoDelivered: 9 },
      { name: 'Manish Solanki', bookings: 8, rtoDelivered: 6 },
      { name: 'Hitesh Rana', bookings: 10, rtoDelivered: 8 },
      { name: 'Deepak Vyas', bookings: 7, rtoDelivered: 5 },
    ],
  },
  {
    id: 'ramdevsinh',
    leader: 'Ramdev Sinh',
    avatar: 'RS',
    color: '#3b82f6',
    target: 40,
    members: [
      { name: 'Kiran Jadav', bookings: 9, rtoDelivered: 7 },
      { name: 'Ravi Kumar', bookings: 11, rtoDelivered: 8 },
      { name: 'Sunil Sharma', bookings: 6, rtoDelivered: 4 },
      { name: 'Pankaj Singh', bookings: 8, rtoDelivered: 6 },
    ],
  },
  {
    id: 'sunilparmar',
    leader: 'Sunil Parmar',
    avatar: 'SP',
    color: '#10b981',
    target: 35,
    members: [
      { name: 'Akash Gupta', bookings: 7, rtoDelivered: 5 },
      { name: 'Neeraj Yadav', bookings: 9, rtoDelivered: 7 },
      { name: 'Rahul Verma', bookings: 5, rtoDelivered: 3 },
      { name: 'Vijay Singh', bookings: 8, rtoDelivered: 6 },
    ],
  },
  {
    id: 'nileshvaghela',
    leader: 'Nilesh Vaghela',
    avatar: 'NV',
    color: '#f59e0b',
    target: 50,
    members: [
      { name: 'Manoj Kumar', bookings: 14, rtoDelivered: 11 },
      { name: 'Ajay Sharma', bookings: 9, rtoDelivered: 7 },
      { name: 'Santosh Kumar', bookings: 11, rtoDelivered: 9 },
      { name: 'Deepak Kumar', bookings: 8, rtoDelivered: 6 },
    ],
  },
  {
    id: 'riyaz',
    leader: 'Riyaz',
    avatar: 'RI',
    color: '#8b5cf6',
    target: 42,
    members: [
      { name: 'Farhan Sheikh', bookings: 10, rtoDelivered: 8 },
      { name: 'Sameer Ansari', bookings: 7, rtoDelivered: 5 },
      { name: 'Zaid Malik', bookings: 9, rtoDelivered: 7 },
      { name: 'Imran Siddiqui', bookings: 6, rtoDelivered: 4 },
    ],
  },
  {
    id: 'azar',
    leader: 'Azar',
    avatar: 'AZ',
    color: '#ec4899',
    target: 38,
    members: [
      { name: 'Amir Khan', bookings: 8, rtoDelivered: 6 },
      { name: 'Abhishek Kumar', bookings: 9, rtoDelivered: 7 },
      { name: 'Rajesh Kumar', bookings: 7, rtoDelivered: 5 },
      { name: 'Anil Kumar', bookings: 6, rtoDelivered: 4 },
    ],
  },
  {
    id: 'nileshbhai',
    leader: 'Nileshbhai',
    avatar: 'NB',
    color: '#06b6d4',
    target: 45,
    members: [
      { name: 'Chirag Mehta', bookings: 11, rtoDelivered: 9 },
      { name: 'Rohan Trivedi', bookings: 8, rtoDelivered: 6 },
      { name: 'Vishal Shah', bookings: 10, rtoDelivered: 8 },
      { name: 'Parth Desai', bookings: 7, rtoDelivered: 5 },
    ],
  },
  {
    id: 'altaf',
    leader: 'Altaf',
    avatar: 'AL',
    color: '#84cc16',
    target: 30,
    members: [
      { name: 'Nikhil Bhatt', bookings: 6, rtoDelivered: 4 },
      { name: 'Vikram Singh', bookings: 8, rtoDelivered: 6 },
      { name: 'Rohit Verma', bookings: 5, rtoDelivered: 3 },
      { name: 'Gaurav Nair', bookings: 7, rtoDelivered: 5 },
    ],
  },
  {
    id: 'nayan',
    leader: 'Nayan',
    avatar: 'NA',
    color: '#f43f5e',
    target: 40,
    members: [
      { name: 'Sanjay Pillai', bookings: 9, rtoDelivered: 7 },
      { name: 'Amit Sharma', bookings: 10, rtoDelivered: 8 },
      { name: 'Rahul Gupta', bookings: 6, rtoDelivered: 4 },
      { name: 'Vivek Singh', bookings: 8, rtoDelivered: 6 },
    ],
  },
  {
    id: 'amreli',
    leader: 'Amreli',
    avatar: 'AM',
    color: '#6366f1',
    target: 35,
    members: [
      { name: 'Harsh Patel', bookings: 7, rtoDelivered: 5 },
      { name: 'Sagar Rana', bookings: 8, rtoDelivered: 6 },
      { name: 'Ankit Vyas', bookings: 6, rtoDelivered: 4 },
      { name: 'Pratik Jadav', bookings: 5, rtoDelivered: 3 },
    ],
  },
  {
    id: 'gondal',
    leader: 'Gondal',
    avatar: 'GO',
    color: '#14b8a6',
    target: 45,
    members: [
      { name: 'Jaydeep Singh', bookings: 11, rtoDelivered: 9 },
      { name: 'Kushal Shah', bookings: 9, rtoDelivered: 7 },
      { name: 'Mitul Trivedi', bookings: 8, rtoDelivered: 6 },
      { name: 'Ravi Desai', bookings: 10, rtoDelivered: 8 },
    ],
  },
  {
    id: 'rajula',
    leader: 'Rajula',
    avatar: 'RA',
    color: '#f97316',
    target: 30,
    members: [
      { name: 'Hardik Mehta', bookings: 5, rtoDelivered: 3 },
      { name: 'Vimal Bhatt', bookings: 6, rtoDelivered: 4 },
      { name: 'Yash Sharma', bookings: 7, rtoDelivered: 5 },
      { name: 'Karan Singh', bookings: 6, rtoDelivered: 4 },
    ],
  },
];

// Derive grand totals
const grandBookings = TEAMS.reduce((a, t) => a + t.members.reduce((b, m) => b + m.bookings, 0), 0);
const grandRTO = TEAMS.reduce((a, t) => a + t.members.reduce((b, m) => b + m.rtoDelivered, 0), 0);
const grandActive = grandBookings + grandRTO;

// ─── Component ────────────────────────────────────────────────────────────────
const SalesManager = () => {
  const [showActiveDeals, setShowActiveDeals] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null); // null = overview

  const VEHICLE_DATA = {
    models: ['SUV XC90', 'Sedan S60', 'EV Recharge', 'Compact C40'],
    variants: ['Momentum', 'Inscription', 'Excellence', 'R-Design'],
    colors: ['Crystal White', 'Onyx Black', 'Denim Blue', 'Thunder Grey', 'Fusion Red'],
  };


  // Compute per-team totals
  const teamTotals = (team) => ({
    bookings: team.members.reduce((a, m) => a + m.bookings, 0),
    rtoDelivered: team.members.reduce((a, m) => a + m.rtoDelivered, 0),
  });

  return (
    <>
      <div className="role-dashboard professional-theme">
        {/* ── Dashboard Header ── */}
        <div className="dashboard-top-bar">
          <div className="header-meta">
            <div className="breadcrumb">
              <span>Management</span>
              <Icons.ChevronRight size={12} />
              <span className="active">Sales Dashboard</span>
            </div>
            <h1>Performance Command Center</h1>
          </div>
        </div>

        {/* ── Key Metrics Row ── */}
        <div className="metrics-summary-row">
          <div className="metric-box glass animate-slide-up" style={{ animationDelay: '0.05s' }}>
            <div className="metric-icon bookings"><Icons.BookOpen size={20} /></div>
            <div className="metric-info">
              <span className="metric-label">Gross Bookings</span>
              <span className="metric-value">{grandBookings}</span>
            </div>
          </div>
          <div className="metric-box glass animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="metric-icon delivered"><Icons.PackageCheck size={20} /></div>
            <div className="metric-info">
              <span className="metric-label">RTO Delivered</span>
              <span className="metric-value">{grandRTO}</span>
            </div>
          </div>
          <div className="metric-box glass animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <div className="metric-icon active"><Icons.Zap size={20} /></div>
            <div className="metric-info">
              <span className="metric-label">Active Leads</span>
              <span className="metric-value">{grandActive}</span>
            </div>
          </div>
          <div className="metric-box glass animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="metric-icon conversion"><Icons.BarChart3 size={20} /></div>
            <div className="metric-info">
              <span className="metric-label">Delivery Rate</span>
              <span className="metric-value">{Math.round((grandRTO / (grandBookings || 1)) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* ── Main content split ── */}
        <div className="dashboard-content-split">
          
          {/* Left: Team Grid */}
          <div className="content-main-panel">
            <div className="panel-header">
              <Icons.Users size={18} />
              <h2>Operational Team Performance</h2>
            </div>
            <div className="sm-team-summary-grid">
              {TEAMS.map((team, idx) => {
                const t = teamTotals(team);
                return (
                  <div
                    key={team.id}
                    className="sm-team-widget glass animate-fade-in"
                    style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
                    onClick={() => { setSelectedTeam(team); setShowActiveDeals(true); }}
                  >
                    <div className="widget-top">
                      <div className="widget-avatar" style={{ background: `${team.color}15`, color: team.color }}>
                        {team.avatar}
                      </div>
                      <div className="widget-title">
                        <span className="leader-name">{team.leader}</span>
                        <span className="leader-role">Team Leader</span>
                      </div>
                      <Icons.ArrowUpRight size={14} className="widget-arrow" />
                    </div>
                    
                    <div className="widget-stats">
                      <div className="w-stat">
                        <span className="w-label">Bookings</span>
                        <span className="w-val">{t.bookings}</span>
                      </div>
                      <div className="w-divider" />
                      <div className="w-stat">
                        <span className="w-label">Delivered</span>
                        <span className="w-val">{t.rtoDelivered}</span>
                      </div>
                    </div>
                    
                    <div className="widget-progress">
                      <div className="progress-info">
                        <span>Target Progress</span>
                        <span>{Math.round((t.bookings / team.target) * 100)}%</span>
                      </div>
                      <div className="progress-track">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${Math.min(100, (t.bookings / team.target) * 100)}%`, background: team.color }} 
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Targets Sidebar */}
          <div className="content-side-panel">
            <div className="side-card glass">
              <div className="panel-header">
                <Icons.Target size={18} />
                <h2>Monthly Targets</h2>
              </div>
              <div className="sm-teams-target-scroll">
                {TEAMS.map((team) => {
                  const achieved = teamTotals(team).bookings;
                  const pct = Math.min(100, Math.round((achieved / team.target) * 100));
                  return (
                    <div className="sm-team-target-row-v2" key={team.id}>
                      <div className="target-row-info">
                        <span className="team-indicator" style={{ background: team.color }} />
                        <span className="team-name">{team.leader}</span>
                        <span className="team-count">{achieved} / {team.target}</span>
                      </div>
                      <div className="target-row-bar">
                        <div className="bar-track">
                          <div className="bar-fill" style={{ width: `${pct}%`, background: team.color }} />
                        </div>
                        <span className="bar-pct">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ═══════════════════ Active Deals Modal ═══════════════════ */}
      {showActiveDeals && createPortal(
        <div className="modal-overlay sm-premium-overlay animate-fade-in" onClick={() => { setShowActiveDeals(false); setSelectedTeam(null); }}>
          <div className="booking-modal sm-premium-modal sm-active-modal" onClick={(e) => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="modal-header">
              <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {selectedTeam && (
                  <button
                    className="sm-back-btn"
                    onClick={(e) => { e.stopPropagation(); setSelectedTeam(null); }}
                  >
                    <Icons.ArrowLeft size={18} />
                  </button>
                )}
                <Icons.Users size={22} color="var(--accent)" />
                <h2>
                  {selectedTeam
                    ? `${selectedTeam.leader}'s Team — Sales Executive Leads`
                    : 'Active Deals — All Teams'}
                </h2>
              </div>
              <button className="close-btn" onClick={() => { setShowActiveDeals(false); setSelectedTeam(null); }}>
                <Icons.X size={20} />
              </button>
            </div>

            {/* Grand total banner */}
            {!selectedTeam && (
              <div className="sm-grand-banner">
                <div className="sm-grand-stat">
                  <Icons.BookOpen size={18} />
                  <div>
                    <span className="sm-grand-label">Total Bookings</span>
                    <span className="sm-grand-value">{grandBookings}</span>
                  </div>
                </div>
                <div className="sm-grand-divider" />
                <div className="sm-grand-stat">
                  <Icons.CheckCircle2 size={18} color="#4caf50" />
                  <div>
                    <span className="sm-grand-label">RTO Delivered</span>
                    <span className="sm-grand-value" style={{ color: '#4caf50' }}>{grandRTO}</span>
                  </div>
                </div>
                <div className="sm-grand-divider" />
                <div className="sm-grand-stat">
                  <Icons.TrendingUp size={18} color="var(--accent)" />
                  <div>
                    <span className="sm-grand-label">Total Active</span>
                    <span className="sm-grand-value" style={{ color: 'var(--accent)' }}>{grandActive}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── View 1: All Team Leaders ── */}
            {!selectedTeam && (
              <div className="sm-team-cards-grid">
                {TEAMS.map((team) => {
                  const t = teamTotals(team);
                  const total = t.bookings + t.rtoDelivered;
                  const pct = Math.round((t.rtoDelivered / (t.bookings || 1)) * 100);
                  return (
                    <div
                      key={team.id}
                      className="sm-team-card premium-card"
                      style={{ borderTop: `4px solid ${team.color}` }}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <div className="sm-team-card-header">
                        <div className="sm-team-avatar" style={{ background: team.color + '22', color: team.color }}>
                          {team.avatar}
                        </div>
                        <div>
                          <div className="sm-team-card-name">{team.leader}</div>
                          <div className="sm-team-card-role">Team Leader · {team.members.length} Members</div>
                        </div>
                        <Icons.ChevronRight size={18} style={{ marginLeft: 'auto', color: team.color }} />
                      </div>

                      <div className="sm-team-card-stats">
                        <div className="sm-team-stat-item">
                          <span className="sm-team-stat-label">Bookings</span>
                          <span className="sm-team-stat-val">{t.bookings}</span>
                        </div>
                        <div className="sm-team-stat-item">
                          <span className="sm-team-stat-label">RTO Delivered</span>
                          <span className="sm-team-stat-val" style={{ color: '#4caf50' }}>{t.rtoDelivered}</span>
                        </div>
                        <div className="sm-team-stat-item">
                          <span className="sm-team-stat-label">Total Active</span>
                          <span className="sm-team-stat-val" style={{ color: team.color }}>{total}</span>
                        </div>
                      </div>

                      {/* Conversion bar */}
                      <div className="sm-conv-bar-wrap">
                        <span className="sm-conv-label">Delivery Rate</span>
                        <div className="sm-conv-bar-track">
                          <div className="sm-conv-bar-fill" style={{ width: `${pct}%`, background: team.color }} />
                        </div>
                        <span className="sm-conv-pct" style={{ color: team.color }}>{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── View 2: Sales Executive Wise Leads ── */}
            {selectedTeam && (
              <>
                {/* Team header */}
                <div className="sm-se-team-banner" style={{ borderLeft: `4px solid ${selectedTeam.color}` }}>
                  <div className="sm-team-avatar" style={{ background: selectedTeam.color + '22', color: selectedTeam.color }}>
                    {selectedTeam.avatar}
                  </div>
                  <div>
                    <div className="sm-team-card-name">{selectedTeam.leader}</div>
                    <div className="sm-team-card-role">Team Leader · {selectedTeam.members.length} Sales Executives</div>
                  </div>
                  <div className="sm-se-team-totals">
                    <span>
                      <Icons.BookOpen size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      {teamTotals(selectedTeam).bookings} Bookings
                    </span>
                    <span style={{ color: '#4caf50' }}>
                      <Icons.CheckCircle2 size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      {teamTotals(selectedTeam).rtoDelivered} RTO Delivered
                    </span>
                  </div>
                </div>

                {/* Sales Executive table */}
                <div className="leads-list premium-list" style={{ marginTop: '1.25rem' }}>
                  <table className="dashboard-table premium-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Sales Executive</th>
                        <th>Bookings</th>
                        <th>RTO Delivered</th>
                        <th>Total Active</th>
                        <th>Delivery Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTeam.members.map((m, idx) => {
                        const total = m.bookings + m.rtoDelivered;
                        const pct = Math.round((m.rtoDelivered / (m.bookings || 1)) * 100);
                        return (
                          <tr key={m.name}>
                            <td className="booking-id">{idx + 1}</td>
                            <td>
                              <div className="customer-cell">
                                <div className="avatar-sm" style={{ background: selectedTeam.color + '22', color: selectedTeam.color }}>
                                  {m.name.charAt(0)}
                                </div>
                                <span>{m.name}</span>
                              </div>
                            </td>
                            <td>
                              <span className="sm-se-badge booking">{m.bookings}</span>
                            </td>
                            <td>
                              <span className="sm-se-badge rto">{m.rtoDelivered}</span>
                            </td>
                            <td>
                              <span className="sm-se-badge total" style={{ background: selectedTeam.color + '22', color: selectedTeam.color }}>
                                {total}
                              </span>
                            </td>
                            <td>
                              <div className="sm-inline-bar">
                                <div className="sm-inline-bar-track">
                                  <div className="sm-inline-bar-fill" style={{ width: `${pct}%`, background: selectedTeam.color }} />
                                </div>
                                <span style={{ color: selectedTeam.color, fontWeight: 700, fontSize: '0.78rem', minWidth: 36 }}>{pct}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}

    </>
  );
};

export default SalesManager;