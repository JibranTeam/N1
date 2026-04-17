"use client";
/* ═══════════════════════════════════════
   SIDEBAR — exact replica of nav.sidebar (index.html L41-175)
   Classes: sidebar, sb-logo, logo-row, logo-mark, logo-name,
   logo-tagline, ai-status-bar, ai-live-dot, ai-live-text,
   ai-live-sub, sb-clinic-switcher, clinic-dot, clinic-name,
   clinic-arrow, sb-nav, nav-section, nav-item, ni, nav-badge,
   nav-ai-parent, ai-open, nav-chevron, nav-sub-item,
   sb-user, user-row, u-avatar, u-name, u-role, u-status, online-dot
═══════════════════════════════════════ */
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CLINICS_DATA } from '@/lib/constants';
import { AI_FRAME_IDS } from '@/lib/role-permissions';
import {
  IconGrid, IconBook, IconUsers, IconBot, IconCalendar, IconClipboard,
  IconActivity, IconMessageCircle, IconPackage, IconCreditCard, IconBarChart,
  IconHome, IconSettings, IconUser, IconRefresh, IconChevronDown,
  IconFileText, IconMessageSquare, IconSearch, IconBookOpen,
} from '@/lib/icons';
import type { FrameId } from '@/lib/types';

export default function Sidebar({ mobileOpen }: { mobileOpen?: boolean }) {
  const { state, dispatch, showFrame, switchClinic, canAccess } = useApp();
  const { activeFrame, activeClinicId, aiSubmenuOpen, currentUser } = state;
  const clinic = CLINICS_DATA[activeClinicId];
  const [clinicDropOpen, setClinicDropOpen] = useState(false);

  const isAiFrame = AI_FRAME_IDS.includes(activeFrame);

  return (
    <nav className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Logo */}
      <div className="sb-logo">
        <div className="logo-row">
          <div className="logo-mark">🌿</div>
          <div>
            <div className="logo-name">HerbaMed Pro</div>
            <div className="logo-tagline">Advanced Clinic Suite</div>
          </div>
        </div>
      </div>

      {/* AI Status */}
      <div className="ai-status-bar">
        <div className="ai-live-dot"></div>
        <div><div className="ai-live-text">AI Engine Active</div><div className="ai-live-sub">Claude Sonnet · Live</div></div>
      </div>

      {/* Clinic Switcher */}
      <div style={{ position: 'relative', margin: '0 14px 14px' }}>
        <div className="sb-clinic-switcher" style={{ margin: 0 }} onClick={() => setClinicDropOpen(p => !p)}>
          <div className="clinic-dot"></div>
          <span className="clinic-name">{clinic?.name || 'Rawalpindi Main Clinic'}</span>
          <span className="clinic-arrow">⌄</span>
        </div>
        {clinicDropOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999, background: '#243447', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }}>
            {Object.entries(CLINICS_DATA).map(([id, c]) => (
              <div
                key={id}
                className={`sb-dd-item ${activeClinicId === id ? 'active-dd' : ''}`}
                onClick={() => { switchClinic(id as any); setClinicDropOpen(false); }}
              >
                <div className="sb-dd-dot"></div>
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="sb-nav">
        {/* MAIN */}
        <div className="nav-section">Main</div>
        <NavItem id="dashboard" icon={<IconGrid />} label="Dashboard" />
        <NavItem id="library" icon={<IconBook />} label="Knowledge Library" />

        {/* CLINICAL */}
        <div className="nav-section">Clinical</div>
        <NavItem id="patient_list" icon={<IconUsers />} label="Patients" />

        {/* AI Assistant — accordion */}
        <div
          className={`nav-item nav-ai-parent ${aiSubmenuOpen || isAiFrame ? 'ai-open' : ''}`}
          onClick={() => dispatch({ type: 'TOGGLE_AI_SUBMENU' })}
        >
          <span className="ni"><IconBot /></span>
          AI Assistant
          <span className="nav-chevron" style={{ marginLeft: 'auto', transition: 'transform .2s', display: 'inline-flex', alignItems: 'center', transform: aiSubmenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <IconChevronDown />
          </span>
        </div>
        <div style={{ overflow: 'hidden', maxHeight: aiSubmenuOpen ? '200px' : '0px', transition: 'max-height .25s ease' }}>
          <NavSubItem id="ai_assistant" icon={<IconFileText />} label="AI Prescriptions" />
          <NavSubItem id="ai_chat" icon={<IconMessageSquare />} label="AI Consult Chat" />
          <NavSubItem id="ai_case" icon={<IconSearch />} label="Case Analyzer" />
          <NavSubItem id="ai_remedy" icon={<IconBookOpen />} label="Remedy Explainer" />
        </div>

        <NavItem id="appointments" icon={<IconCalendar />} label="Appointments" />
        <NavItem id="prescriptions" icon={<IconClipboard />} label="Prescriptions" />
        <NavItem id="patient_timeline" icon={<IconActivity />} label="Patient Timeline" />
        <NavItem id="whatsapp" icon={<IconMessageCircle />} label="WhatsApp Auto" />

        {/* OPERATIONS */}
        <div className="nav-section">Operations</div>
        <NavItem id="inventory" icon={<IconPackage />} label="Inventory" badge={<span className="nav-badge red">3</span>} />
        <NavItem id="billing" icon={<IconCreditCard />} label="Billing" />
        <NavItem id="analytics" icon={<IconBarChart />} label="Analytics" />

        {/* ADMIN */}
        <div className="nav-section">Admin</div>
        <NavItem id="multi_clinic" icon={<IconHome />} label="Multi-Clinic" />
        <NavItem id="clinic_setup" icon={<IconSettings />} label="Clinic Setup" />
        <NavItem id="collaboration" icon={<IconUsers />} label="Collab Hub" />
        <NavItem id="team" icon={<IconUser />} label="Team & Roles" />
        <NavItem id="sync" icon={<IconRefresh />} label="Sync" />
      </div>

      {/* User */}
      <div className="sb-user">
        <div className="user-row">
          <div className="u-avatar">{currentUser?.initials || 'DR'}</div>
          <div>
            <div className="u-name">{currentUser?.name || 'Dr. Rashid Malik'}</div>
            <div className="u-role">{currentUser?.roleLabel || 'Homeopathic Physician'}</div>
          </div>
          <div className="u-status"><div className="online-dot"></div></div>
        </div>
      </div>
    </nav>
  );

  // ── Internal nav item helpers ──
  function NavItem({ id, icon, label, badge }: { id: FrameId; icon: React.ReactNode; label: string; badge?: React.ReactNode }) {
    const isActive = activeFrame === id;
    const hidden = !canAccess(id);
    if (hidden) return null;
    return (
      <div className={`nav-item ${isActive ? 'active' : ''}`} onClick={() => showFrame(id)}>
        <span className="ni">{icon}</span>
        {label}
        {badge}
      </div>
    );
  }

  function NavSubItem({ id, icon, label }: { id: FrameId; icon: React.ReactNode; label: string }) {
    const isActive = activeFrame === id;
    return (
      <div className={`nav-item nav-sub-item ${isActive ? 'active' : ''}`} onClick={() => showFrame(id)}>
        <span className="ni">{icon}</span>
        {label}
      </div>
    );
  }
}
