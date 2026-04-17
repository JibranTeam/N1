"use client";
/* ═══════════════════════════════════════
   AUTH SCREEN
   Exact replica of #auth-screen from index.html L14-39
   Classes: auth-card, auth-logo, auth-tabs, auth-tab,
   auth-error, auth-field, auth-btn, auth-divider,
   demo-accounts, demo-btn, admin-btn, doctor-btn, recep-btn,
   db-role, db-name, db-email
═══════════════════════════════════════ */
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DEMO_USERS } from '@/lib/constants';
import type { Role, ClinicId } from '@/lib/types';

export default function AuthScreen() {
  const { state, dispatch, doLogin, doSignup, demoLogin } = useApp();
  const { authTab, authError } = state;

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [suName, setSuName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPass, setSuPass] = useState('');
  const [suRole, setSuRole] = useState<Role>('admin');
  const [suClinic, setSuClinic] = useState<ClinicId>('rawalpindi');

  return (
    <div id="auth-screen">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">🌿</div>
          <div className="auth-logo-name">HerbaMed Pro</div>
          <div className="auth-logo-tag">Homeopathic Clinic Suite</div>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <div
            className={`auth-tab ${authTab === 'login' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_AUTH_TAB', tab: 'login' })}
          >Sign In</div>
          <div
            className={`auth-tab ${authTab === 'signup' ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_AUTH_TAB', tab: 'signup' })}
          >Create Account</div>
        </div>

        {/* Error */}
        {authError && (
          <div className="auth-error" style={{ display: 'block' }}>{authError}</div>
        )}

        {/* Login Form */}
        {authTab === 'login' && (
          <div id="form-login">
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="doctor@clinic.com"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doLogin(loginEmail, loginPass)}
              />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doLogin(loginEmail, loginPass)}
              />
            </div>
            <button className="auth-btn" onClick={() => doLogin(loginEmail, loginPass)}>
              Sign In →
            </button>
            <div className="auth-divider">— or sign in as demo user —</div>
            <div className="demo-accounts">
              <div className="demo-btn admin-btn" onClick={() => demoLogin('admin')}>
                <span style={{ fontSize: '20px' }}>👑</span>
                <div>
                  <div className="db-role">Admin</div>
                  <div className="db-name">Dr. Rashid Malik</div>
                  <div className="db-email">admin@herbamed.pk</div>
                </div>
              </div>
              <div className="demo-btn doctor-btn" onClick={() => demoLogin('doctor')}>
                <span style={{ fontSize: '20px' }}>👨‍⚕️</span>
                <div>
                  <div className="db-role">Doctor</div>
                  <div className="db-name">Dr. Amina Siddiqui</div>
                  <div className="db-email">doctor@herbamed.pk</div>
                </div>
              </div>
              <div className="demo-btn recep-btn" onClick={() => demoLogin('receptionist')}>
                <span style={{ fontSize: '20px' }}>🧑‍💼</span>
                <div>
                  <div className="db-role">Receptionist</div>
                  <div className="db-name">Zainab (Reception)</div>
                  <div className="db-email">recep@herbamed.pk</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Signup Form */}
        {authTab === 'signup' && (
          <div id="form-signup">
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" placeholder="Dr. Your Name" value={suName} onChange={e => setSuName(e.target.value)} />
            </div>
            <div className="auth-field">
              <label>Email</label>
              <input type="email" placeholder="you@clinic.com" value={suEmail} onChange={e => setSuEmail(e.target.value)} />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="Min 8 characters" value={suPass} onChange={e => setSuPass(e.target.value)} />
            </div>
            <div className="auth-field">
              <label>Role</label>
              <select value={suRole} onChange={e => setSuRole(e.target.value as Role)}>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="receptionist">Receptionist</option>
              </select>
            </div>
            <div className="auth-field">
              <label>Clinic</label>
              <select value={suClinic} onChange={e => setSuClinic(e.target.value as ClinicId)}>
                <option value="rawalpindi">Rawalpindi Main</option>
                <option value="islamabad">Islamabad Branch</option>
              </select>
            </div>
            <button className="auth-btn" onClick={() => doSignup(suName, suEmail, suPass, suRole, suClinic)}>
              Create Account →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
