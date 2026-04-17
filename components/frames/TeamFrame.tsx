"use client";
import { useApp } from '@/context/AppContext';
import { useTeam } from '@/hooks/useTeam';
import { CLINICS_DATA } from '@/lib/constants';

const PERM_MATRIX = [
  { feature:'View Patients', admin:true, doctor:true, receptionist:true },
  { feature:'Create Prescriptions', admin:true, doctor:true, receptionist:false },
  { feature:'AI Assistant', admin:true, doctor:true, receptionist:false },
  { feature:'Collab Hub', admin:true, doctor:true, receptionist:false },
  { feature:'View Billing', admin:true, doctor:false, receptionist:true },
  { feature:'Manage Inventory', admin:true, doctor:false, receptionist:false },
  { feature:'Analytics', admin:true, doctor:false, receptionist:false },
  { feature:'Team & Settings', admin:true, doctor:false, receptionist:false },
  { feature:'Multi-Clinic', admin:true, doctor:false, receptionist:false },
];

export default function TeamFrame() {
  const { state, showToast } = useApp();
  const { allMembers, roleCounts, toggleAccess } = useTeam();
  const clinicName = CLINICS_DATA[state.activeClinicId]?.name || 'Clinic';

  return (
    <div className="frame active" id="frame-team">
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg>Team &amp; Roles</h2>
          <p>Manage team members, permissions and access control</p>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="ht-btn ht-btn-outline" onClick={() => showToast('Invite link copied to clipboard')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>Copy Invite Link
          </button>
          <button className="ht-btn ht-btn-primary" onClick={() => showToast('Add member modal — coming soon')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>+ Add Member
          </button>
        </div>
      </div>

      {/* Role Summary Cards */}
      <div className="grid3 mb-20">
        {[
          { emoji:'👑', name:'Admin', desc:'Full access — clinics, billing, settings, analytics and team management', count:roleCounts.admin, cls:'admin' },
          { emoji:'👨‍⚕️', name:'Doctor', desc:'Patients, prescriptions, AI tools and patient timeline. No billing or settings.', count:roleCounts.doctor, cls:'doctor' },
          { emoji:'🧑‍💼', name:'Receptionist', desc:'Appointments, patient check-in, WhatsApp and billing. No clinical access.', count:roleCounts.receptionist, cls:'receptionist' },
        ].map(r => (
          <div key={r.name} className="team-role-card">
            <div className="team-role-emoji">{r.emoji}</div>
            <div className="team-role-name">{r.name}</div>
            <div className="team-role-desc">{r.desc}</div>
            <div className="team-role-count"><span className={`role-chip ${r.cls}`}>{r.count} member{r.count!==1?'s':''}</span></div>
          </div>
        ))}
      </div>

      {/* Team Members List */}
      <div className="card mb-20">
        <div className="card-header">
          <div className="card-title">👥 Team — <span>{clinicName}</span></div>
          <div style={{display:'flex',gap:8}}>
            <select style={{padding:'5px 10px',border:'1.5px solid var(--slate-pale)',borderRadius:7,fontSize:12,fontFamily:'var(--font-body)',outline:'none'}}>
              <option value="">All Roles</option><option value="Admin">Admin</option><option value="Doctor">Doctor</option><option value="Receptionist">Receptionist</option>
            </select>
            <button className="btn btn-ghost btn-xs" onClick={() => showToast('Add member modal')}>+ Add</button>
          </div>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Member</th><th>Role</th><th>Clinic</th><th>Status</th><th>Last Active</th><th>Actions</th></tr></thead>
            <tbody>
              {allMembers.map(m => (
                <tr key={m.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,var(--forest-light),var(--forest))',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>{m.init}</div>
                      <div><div style={{fontWeight:600,fontSize:13}}>{m.name}</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>{m.email}</div></div>
                    </div>
                  </td>
                  <td><span className={`role-chip ${m.role}`}>{m.role.charAt(0).toUpperCase()+m.role.slice(1)}</span></td>
                  <td style={{fontSize:12}}>{m.clinic==='rawalpindi'?'Rawalpindi':'Islamabad'}</td>
                  <td><span className={`pill ${m.status==='active'?'active':'inactive'}`}>{m.status==='active'?'Active':'Inactive'}</span></td>
                  <td style={{fontSize:12,color:'var(--slate-soft)'}}>{m.lastActive}</td>
                  <td>
                    <div style={{display:'flex',gap:4}}>
                      <button className="btn btn-ghost btn-xs" onClick={() => showToast(`Edit ${m.name}`)}>Edit</button>
                      <button className={`btn ${m.status==='active'?'btn-ghost':'btn-outline'} btn-xs`} onClick={() => { toggleAccess(m.id); showToast(`${m.name} access toggled`); }}>{m.status==='active'?'Deactivate':'Activate'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Matrix + Activity */}
      <div className="grid2">
        <div className="card">
          <div className="card-header"><div className="card-title">🔐 Permission Matrix</div></div>
          <div className="tbl-wrap"><table>
            <thead><tr><th>Feature</th><th style={{textAlign:'center'}}>Admin</th><th style={{textAlign:'center'}}>Doctor</th><th style={{textAlign:'center'}}>Receptionist</th></tr></thead>
            <tbody>
              {PERM_MATRIX.map(p => (
                <tr key={p.feature}><td>{p.feature}</td><td className="perm-check">{p.admin?'✅':'❌'}</td><td className="perm-check">{p.doctor?'✅':'❌'}</td><td className="perm-check">{p.receptionist?'✅':'❌'}</td></tr>
              ))}
            </tbody>
          </table></div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">📋 Recent Activity</div></div>
          <div style={{padding:'4px 0'}}>
            {[
              { text:'Dr. Rashid Malik logged in · Rawalpindi Main', time:'Now' },
              { text:'Dr. Amina Siddiqui created prescription for Ayesha Farooq', time:'10 min' },
              { text:'Zainab booked appointment for Khalid Mehmood', time:'42 min' },
              { text:'Dr. Tariq Hussain invited — invite pending', time:'2h ago', dot:'var(--gold)' },
              { text:'Dr. Amina Siddiqui logged out', time:'3h ago', dot:'var(--slate-pale)' },
              { text:'Admin exported billing report', time:'Yesterday' },
            ].map((a,i) => (
              <div key={i} className="sync-activity"><div className="sync-activity-dot" style={a.dot?{background:a.dot}:undefined}></div><div className="sync-activity-txt">{a.text}</div><div className="sync-activity-time">{a.time}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
