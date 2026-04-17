"use client";
/* ═══════════════════════════════════════
   TOPBAR — exact replica of div.topbar (index.html L180-196)
   + notification panel, settings panel, logout menu, search results
   Classes: topbar, mobile-menu-btn, tb-title, tb-search,
   sync-indicator, sync-dot, tb-icon, notif-dot,
   lm-item, danger
═══════════════════════════════════════ */
import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useGlobalSearch } from '@/hooks/useSearch';
import { FRAME_TITLES } from '@/lib/role-permissions';
import { INITIAL_NOTIFICATIONS } from '@/lib/constants';
import { esc } from '@/lib/utils';

export default function Topbar() {
  const { state, dispatch, showFrame, doLogout, showToast } = useApp();
  const { activeFrame, currentUser, notifications, darkMode } = state;
  const { query, results, isOpen, search, close } = useGlobalSearch();

  const [logoutMenuOpen, setLogoutMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close panels on outside click
  useEffect(() => {
    function onClick() {
      setLogoutMenuOpen(false);
      setNotifPanelOpen(false);
      setSettingsPanelOpen(false);
      close();
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [close]);

  function togglePanel(panel: 'notif' | 'settings') {
    if (panel === 'notif') {
      setNotifPanelOpen(p => !p);
      setSettingsPanelOpen(false);
    } else {
      setSettingsPanelOpen(p => !p);
      setNotifPanelOpen(false);
    }
    setLogoutMenuOpen(false);
  }


  return (
    <>
      <div className="topbar" onClick={e => e.stopPropagation()}>
        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={() => dispatch({ type: 'TOGGLE_MOBILE_SIDEBAR' })}>☰</button>

        {/* Title */}
        <div className="tb-title">{FRAME_TITLES[activeFrame] || 'Dashboard'}</div>

        {/* Search */}
        <div className="tb-search" style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search patients, medicines, Rx..."
            value={query}
            onChange={e => search(e.target.value)}
            onFocus={() => query && search(query)}
            autoComplete="off"
          />
          {/* Search Results */}
          {isOpen && results.length > 0 && (
            <div id="search-results" className="tb-panel open" style={{ left: 0, right: 0, top: '100%', width: 'auto', transform: 'none', position: 'absolute' }}>
              <div id="search-results-list" style={{ overflowY: 'auto', maxHeight: '420px' }}>
                {results.map((r, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (r.actionFrame) showFrame(r.actionFrame);
                      close();
                      search('');
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 16px', cursor: 'pointer', borderBottom: '1px solid var(--slate-pale)' }}
                    onMouseOver={e => (e.currentTarget.style.background = 'var(--forest-bg)')}
                    onMouseOut={e => (e.currentTarget.style.background = '')}
                  >
                    <span style={{ fontSize: '18px', flexShrink: 0 }}>{r.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--slate)' }}>{r.label}</div>
                      <div style={{ fontSize: '11px', color: 'var(--slate-soft)' }}>{r.sub}</div>
                    </div>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: r.type === 'Patient' ? 'var(--forest-bg)' : r.type === 'Medicine' ? 'var(--gold-pale)' : 'var(--sapphire-pale)', color: r.type === 'Patient' ? 'var(--forest)' : r.type === 'Medicine' ? 'var(--gold)' : 'var(--sapphire)', fontWeight: 700 }}>{r.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sync */}
        <div className="sync-indicator"><div className="sync-dot"></div>Synced</div>

        {/* Notifications */}
        <div className="tb-icon" onClick={e => { e.stopPropagation(); togglePanel('notif'); }} title="Notifications">
          🔔
          {unreadCount > 0 && <span className="notif-dot"></span>}
        </div>

        {/* Settings */}
        <div className="tb-icon" onClick={e => { e.stopPropagation(); togglePanel('settings'); }} title="Settings">⚙️</div>

        {/* Profile / Logout */}
        <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
          <div
            onClick={() => { setLogoutMenuOpen(p => !p); setNotifPanelOpen(false); setSettingsPanelOpen(false); }}
            style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--forest-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer', border: '2px solid rgba(255,255,255,.2)' }}
            title="Account"
          >
            {currentUser?.initials || 'DR'}
          </div>
          {logoutMenuOpen && (
            <div id="logout-menu" style={{ display: 'block' }}>
              <div className="lm-item" onClick={() => { showFrame('team'); setLogoutMenuOpen(false); }}>👤 My Profile</div>
              <div className="lm-item" onClick={() => { togglePanel('settings'); setLogoutMenuOpen(false); }}>⚙️ Settings</div>
              <div className="lm-item danger" onClick={() => doLogout()}>🚪 Sign Out</div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Panel */}
      {notifPanelOpen && (
        <div className="tb-panel open" style={{ right: 140, width: 340 }} onClick={e => e.stopPropagation()}>
          <div className="tb-panel-hdr">
            <div className="tb-panel-title">Notifications</div>
            <span style={{ fontSize: 11, color: 'var(--forest)', cursor: 'pointer', fontWeight: 600 }} onClick={() => { dispatch({ type: 'MARK_ALL_NOTIF_READ' }); showToast('All notifications read'); }}>Mark all read</span>
          </div>
          {notifications.map(n => (
            <div key={n.id} onClick={() => dispatch({ type: 'MARK_NOTIF_READ', id: n.id })} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--slate-pale)', cursor: 'pointer', background: n.read ? '' : 'var(--forest-bg)' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, background: n.iconBg, color: n.iconColor }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: 'var(--slate-soft)', marginTop: 2 }}>{n.desc}</div>
                <div style={{ fontSize: 10, color: 'var(--slate-soft)', marginTop: 3 }}>{n.time}</div>
              </div>
              {!n.read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--forest-mid)', flexShrink: 0, marginTop: 6 }}></div>}
            </div>
          ))}
        </div>
      )}

      {/* Settings Panel */}
      {settingsPanelOpen && (
        <div className="tb-panel open" style={{ right: 100, width: 280, padding: 0 }} onClick={e => e.stopPropagation()}>
          <div className="tb-panel-hdr">
            <div className="tb-panel-title">⚙️ Quick Settings</div>
            <span style={{ cursor: 'pointer', fontSize: 14 }} onClick={() => setSettingsPanelOpen(false)}>✕</span>
          </div>
          <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Dark Mode */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Dark Mode</div>
                <div style={{ fontSize: 11, color: 'var(--slate-soft)' }}>Switch to dark theme</div>
              </div>
              <button
                className={`tog-sw ${darkMode ? 'on' : ''}`}
                onClick={() => {
                  dispatch({ type: 'TOGGLE_DARK_MODE' });
                  showToast(darkMode ? '☀️ Light mode restored' : '🌙 Dark mode on');
                }}
              ><span className="tog-knob"></span></button>
            </div>

            {/* Language */}
            <div style={{ borderTop: '1px solid var(--slate-pale)', paddingTop: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--slate-soft)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 8 }}>Language</div>
              <select style={{ width: '100%', padding: '7px 12px', border: '1px solid var(--slate-pale)', borderRadius: 'var(--radius-sm)', fontFamily: 'inherit', fontSize: '12.5px', outline: 'none' }}>
                <option>English</option>
                <option>اردو (Urdu)</option>
              </select>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
