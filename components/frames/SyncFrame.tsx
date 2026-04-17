"use client";
import { useApp } from '@/context/AppContext';

export default function SyncFrame() {
  const { showToast } = useApp();

  return (
    <div className="frame active" id="frame-sync">
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>Sync</h2>
          <p>Real-time sync across all devices and clinics — works offline automatically</p>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="ht-btn ht-btn-outline" onClick={() => showToast('Backup downloaded')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download Backup
          </button>
          <button className="ht-btn ht-btn-primary" onClick={() => showToast('Sync complete ✓','success')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>Sync Now
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="u-stats cols-4">
        {[
          { icon:'☁️', label:'Sync Status', val:'All Synced', change:'2 min ago', stripe:'var(--forest-mid)', iconBg:'var(--forest-bg)', iconColor:'var(--forest)' },
          { icon:'📦', label:'Storage Used', val:'48 MB', change:'of 5 GB plan', stripe:'var(--sapphire)', iconBg:'var(--sapphire-pale)', iconColor:'var(--sapphire)' },
          { icon:'📱', label:'Devices', val:'3', change:'2 online', stripe:'var(--gold)', iconBg:'var(--gold-pale)', iconColor:'var(--gold)' },
          { icon:'✅', label:'Records Synced', val:'1,284', change:'23 today', stripe:'var(--forest-light)', iconBg:'var(--forest-pale)', iconColor:'var(--forest-mid)' },
        ].map((kpi,i) => (
          <div key={i} className="u-stat" style={{'--u-stripe':kpi.stripe} as any}>
            <div className="u-stat-ico" style={{background:kpi.iconBg,color:kpi.iconColor}}>{kpi.icon}</div>
            <div className="u-stat-body">
              <div className="u-stat-lbl">{kpi.label}</div>
              <div className="u-stat-val" style={i===0?{fontSize:18}:undefined}>{kpi.val}</div>
              <div className={`u-stat-trend ${kpi.change.includes('ago')||kpi.change.includes('today')?'up':'neu'}`}>{kpi.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sync-layout">
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {/* Connected Devices */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📱 Connected Devices</div>
              <div className="sync-indicator"><div className="sync-dot"></div>Live</div>
            </div>
            <div>
              {[
                { icon:'💻', name:'Dr. Rashid · MacBook (Chrome)', meta:'Rawalpindi Main · Last active: Now', status:'Active' },
                { icon:'📱', name:'Dr. Amina · iPhone (Safari)', meta:'Islamabad Branch · Last active: 10 min ago', status:'Active' },
                { icon:'💻', name:'Zainab · Desktop (Chrome)', meta:'Rawalpindi Main · Last active: Yesterday', status:'Offline' },
              ].map((d,i) => (
                <div key={i} className="sync-device-row">
                  <div className="sync-device-ico" style={{background:'var(--forest-bg)',color:d.status==='Active'?'var(--forest)':'var(--slate-soft)'}}>{d.icon}</div>
                  <div className="sync-device-info">
                    <div className="sync-device-name">{d.name}</div>
                    <div className="sync-device-meta">{d.meta}</div>
                  </div>
                  <span className={`tag ${d.status==='Active'?'g':'a'}`}>{d.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backup Schedule */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">💾 Backup Schedule</div>
              <button className="btn btn-ghost btn-sm" onClick={() => showToast('Configure backup schedule')}>⚙️ Configure</button>
            </div>
            <div style={{padding:'0 18px 18px'}}>
              {[
                { label:'Auto Backup', desc:'Every 6 hours', enabled:true },
                { label:'Last Backup', desc:'Today, 8:00 AM — 47.2 MB', enabled:true },
                { label:'Cloud Backup', desc:'Google Drive connected', enabled:true },
                { label:'Encryption', desc:'AES-256 at rest', enabled:true },
              ].map((item,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:i<3?'1px solid var(--border-light)':'none'}}>
                  <div><div style={{fontSize:13,fontWeight:500}}>{item.label}</div><div style={{fontSize:11,color:'var(--slate-soft)'}}>{item.desc}</div></div>
                  <button className={`tog-sw ${item.enabled?'on':''}`}><span className="tog-knob"></span></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Sync History */}
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">📋 Sync History</div>
              <select style={{padding:'5px 10px',border:'1.5px solid var(--slate-pale)',borderRadius:7,fontSize:12,fontFamily:'var(--font-body)',outline:'none'}}>
                <option>Today</option><option>This week</option><option>All</option>
              </select>
            </div>
            <div>
              {[
                { dot:'var(--forest)', text:'Full sync completed — 1,284 records verified', time:'2 min ago' },
                { dot:'var(--forest)', text:'Patient data synced — Ayesha Farooq Rx updated', time:'15 min ago' },
                { dot:'var(--sapphire)', text:'Inventory sync — Calendula Q stock updated', time:'1 hr ago' },
                { dot:'var(--forest)', text:'Appointments synced for March 25', time:'2 hrs ago' },
                { dot:'var(--gold)', text:'Backup auto-created — 47.2 MB', time:'8:00 AM' },
                { dot:'var(--forest)', text:'Full sync on login — Dr. Rashid Malik', time:'7:45 AM' },
                { dot:'var(--sapphire)', text:'Billing records synced — 5 new invoices', time:'Yesterday' },
                { dot:'var(--forest)', text:'Analytics data refreshed', time:'Yesterday' },
                { dot:'var(--gold)', text:'Weekly backup completed — 46.8 MB', time:'Mar 22' },
                { dot:'var(--forest)', text:'Dr. Amina synced from mobile', time:'Mar 22' },
                { dot:'var(--slate-pale)', text:'Device removed — old tablet', time:'Mar 20' },
              ].map((item,i) => (
                <div key={i} className="sync-activity">
                  <div className="sync-activity-dot" style={{background:item.dot}}></div>
                  <div className="sync-activity-txt">{item.text}</div>
                  <div className="sync-activity-time">{item.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Integrity */}
          <div className="card">
            <div className="card-header"><div className="card-title">🔒 Data Integrity</div></div>
            <div style={{padding:'0 18px 18px'}}>
              {[
                { label:'Patients', count:'248 records', status:'✅ Verified' },
                { label:'Prescriptions', count:'1,024 records', status:'✅ Verified' },
                { label:'Appointments', count:'892 records', status:'✅ Verified' },
                { label:'Billing', count:'436 records', status:'✅ Verified' },
                { label:'Inventory', count:'10 items', status:'✅ Verified' },
              ].map((item,i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:i<4?'1px solid var(--border-light)':'none'}}>
                  <div><span style={{fontWeight:500,fontSize:13}}>{item.label}</span><span style={{fontSize:11,color:'var(--slate-soft)',marginLeft:8}}>{item.count}</span></div>
                  <span style={{fontSize:11,color:'var(--forest)',fontWeight:600}}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
