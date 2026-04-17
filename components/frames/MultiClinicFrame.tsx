"use client";
import { useApp } from '@/context/AppContext';
import { CLINICS_DATA } from '@/lib/constants';

export default function MultiClinicFrame() {
  const { state, switchClinic, showToast, showFrame } = useApp();
  const { activeClinicId } = state;

  return (
    <div className="frame active" id="frame-multi_clinic">
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Multi-Clinic Management</h2>
          <p>Manage all clinic locations from a single dashboard</p>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="ht-btn ht-btn-outline" onClick={() => showToast('Compare clinics report generating…')}>📊 Compare</button>
          <button className="ht-btn ht-btn-outline" onClick={() => showToast('Export multi-clinic report')}>📥 Export</button>
          <button className="ht-btn ht-btn-primary" onClick={() => showToast('Add clinic modal — coming soon')}>+ Add Clinic</button>
        </div>
      </div>

      {/* Clinic Cards */}
      <div className="grid2" style={{gap:18,marginBottom:18}}>
        {Object.entries(CLINICS_DATA).map(([id, c]) => (
          <div key={id} className="card" style={{borderLeft:`4px solid ${id===activeClinicId?'var(--forest)':'var(--sapphire)'}`,cursor:'pointer'}} onClick={() => { switchClinic(id as any); showToast(`Switched to ${c.name}`); }}>
            <div className="card-body" style={{padding:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
                <div>
                  <div style={{fontSize:16,fontWeight:700,color:'var(--slate)',marginBottom:3}}>{c.name}</div>
                  <div style={{fontSize:12,color:'var(--slate-soft)'}}>{c.sub}</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  {id===activeClinicId && <span className="pill active" style={{fontSize:9}}>Active</span>}
                  <span className="tag g">{c.status}</span>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
                {[
                  { val:c.patients, label:'Patients', color:'var(--forest)' },
                  { val:c.revenue, label:'Revenue', color:'var(--gold)' },
                  { val:c.doctors, label:'Doctors', color:'var(--sapphire)' },
                  { val:c.todayAppts, label:'Today Appts', color:'var(--forest-mid)' },
                ].map((s,i) => (
                  <div key={i} style={{textAlign:'center'}}>
                    <div style={{fontSize:18,fontWeight:700,color:s.color}}>{s.val}</div>
                    <div style={{fontSize:9,color:'var(--slate-soft)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px'}}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:14,paddingTop:12,borderTop:'1px solid var(--border-light)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:11,color:'var(--slate-soft)'}}>
                  {c.lowStock > 0 && <span style={{color:'var(--crimson)',fontWeight:600}}>⚠ {c.lowStock} low stock</span>}
                  {c.lowStock === 0 && <span style={{color:'var(--forest)'}}>✅ Stock healthy</span>}
                  <span style={{marginLeft:10}}>{c.ptTrend}</span>
                </div>
                <button className="btn btn-ghost btn-xs" onClick={e => { e.stopPropagation(); showFrame('clinic_setup'); }}>⚙️ Settings</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="card" style={{marginBottom:18}}>
        <div className="card-header"><div className="card-title">📊 Clinic Comparison</div></div>
        <div className="tbl-wrap"><table>
          <thead><tr><th>Metric</th><th>Rawalpindi Main</th><th>Islamabad Branch</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td style={{fontWeight:600}}>Patients</td><td>{CLINICS_DATA.rawalpindi.patients}</td><td>{CLINICS_DATA.islamabad.patients}</td><td style={{fontWeight:700,color:'var(--forest)'}}>{CLINICS_DATA.rawalpindi.patients+CLINICS_DATA.islamabad.patients}</td></tr>
            <tr><td style={{fontWeight:600}}>Revenue</td><td>{CLINICS_DATA.rawalpindi.revenue}</td><td>{CLINICS_DATA.islamabad.revenue}</td><td style={{fontWeight:700,color:'var(--forest)'}}>₨264k</td></tr>
            <tr><td style={{fontWeight:600}}>Doctors</td><td>{CLINICS_DATA.rawalpindi.doctors}</td><td>{CLINICS_DATA.islamabad.doctors}</td><td style={{fontWeight:700}}>{CLINICS_DATA.rawalpindi.doctors+CLINICS_DATA.islamabad.doctors}</td></tr>
            <tr><td style={{fontWeight:600}}>Today Appointments</td><td>{CLINICS_DATA.rawalpindi.todayAppts}</td><td>{CLINICS_DATA.islamabad.todayAppts}</td><td style={{fontWeight:700}}>{CLINICS_DATA.rawalpindi.todayAppts+CLINICS_DATA.islamabad.todayAppts}</td></tr>
            <tr><td style={{fontWeight:600}}>Low Stock Items</td><td style={{color:'var(--crimson)',fontWeight:600}}>{CLINICS_DATA.rawalpindi.lowStock}</td><td style={{color:'var(--forest)'}}>{CLINICS_DATA.islamabad.lowStock}</td><td>{CLINICS_DATA.rawalpindi.lowStock+CLINICS_DATA.islamabad.lowStock}</td></tr>
            <tr><td style={{fontWeight:600}}>Rx This Month</td><td>{CLINICS_DATA.rawalpindi.rxThisMonth}</td><td>{CLINICS_DATA.islamabad.rxThisMonth}</td><td style={{fontWeight:700}}>{CLINICS_DATA.rawalpindi.rxThisMonth+CLINICS_DATA.islamabad.rxThisMonth}</td></tr>
          </tbody>
        </table></div>
      </div>

      {/* Team across clinics */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">👥 Team Across Clinics</div>
          <button className="btn btn-ghost btn-sm" onClick={() => showFrame('team')}>Manage →</button>
        </div>
        <div>
          {Object.entries(CLINICS_DATA).map(([id, c]) => (
            <div key={id}>
              <div style={{padding:'8px 18px',fontSize:10,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px',background:'var(--surface-alt)',borderBottom:'1px solid var(--border-light)'}}>{c.name}</div>
              {c.team.map((m,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 18px',borderBottom:'1px solid var(--border-light)'}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,var(--forest-light),var(--forest))',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700}}>{m.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>{m.name}</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>{m.phone}</div></div>
                  <span className={`role-chip ${m.roleCls}`}>{m.role}</span>
                  <span className={`tag ${m.status==='active'?'g':'a'}`}>{m.status==='active'?'Active':'Offline'}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
