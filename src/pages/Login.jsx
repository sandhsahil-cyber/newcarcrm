import React, { useState } from 'react';
import { ROLES } from '../config/RoleConfig';
import { useTheme } from '../contexts/ThemeContext';
import * as Icons from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.SALES_EXECUTIVE);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="login-wrapper">
      <button className="login-theme-toggle glass-hover" onClick={toggleTheme}>
        {theme === 'light' ? <Icons.Moon size={20} /> : <Icons.Sun size={20} />}
      </button>
      <div className="login-container glass animate-fade-in">
        <div className="login-header">
          <div className="login-logo glass">
            <Icons.Car size={40} color="var(--accent)" />
          </div>
          <h1>Welcome Back</h1>
          <p>Login to Car Dealership ERP</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Select Your Role</label>
            <div className="select-wrapper glass">
              <Icons.ShieldCheck size={18} className="input-icon" />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                {Object.values(ROLES).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper glass">
              <Icons.Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="name@dealership.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper glass">
              <Icons.Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn glass-hover">
            <span>Access Dashboard</span>
            <Icons.ArrowRight size={20} />
          </button>
        </form>

        <div className="login-footer">
          <p>Secure Enterprise Gateway v2.4</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
