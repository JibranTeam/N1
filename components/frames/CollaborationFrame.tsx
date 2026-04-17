"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useCollaboration } from '@/hooks/useCollaboration';

export default function CollaborationFrame() {
  const { showToast, showFrame } = useApp();
  const {
    cases, notes, requests, discussions, careTeam,
    discussionFilter, setDiscussionFilter,
    addNote, sendDiscussion, replyToRequest,
    addCareTeamMember, updateCaseStatus, saveReferral, requestOpinion, exportCSV,
  } = useCollaboration();
  const [msgInput, setMsgInput] = useState('');

  return (
    <div className="frame active" id="frame-collaboration">
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>Doctor Collaboration Hub</h2>
          <p>Collaborate on cases, share notes, request opinions &amp; referrals</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="ht-btn ht-btn-outline" onClick={() => { exportCSV(); showToast('Collaboration CSV exported'); }}>📥 Export</button>
          <button className="ht-btn ht-btn-outline" onClick={() => showToast('New referral — coming soon')}>🔗 New Referral</button>
          <button className="ht-btn ht-btn-primary" onClick={() => showToast('Request opinion — coming soon')}>💬 Request Opinion</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="u-stats cols-4">
        {[
          { icon:'📋', label:'Active Cases', val:String(cases.filter(c=>c.status==='active').length), change:'Being discussed', stripe:'var(--forest-mid)', iconBg:'var(--forest-bg)', iconColor:'var(--forest)' },
          { icon:'📝', label:'Shared Notes', val:String(notes.length), change:'This month', stripe:'var(--sapphire)', iconBg:'var(--sapphire-pale)', iconColor:'var(--sapphire)' },
          { icon:'🔗', label:'Referrals', val:'3', change:'2 pending', stripe:'var(--gold)', iconBg:'var(--gold-pale)', iconColor:'var(--gold)' },
          { icon:'💬', label:'Discussions', val:String(discussions.length), change:'Active threads', stripe:'var(--forest-light)', iconBg:'var(--forest-pale)', iconColor:'var(--forest-mid)' },
        ].map((kpi,i) => (
          <div key={i} className="u-stat" style={{'--u-stripe':kpi.stripe} as any}>
            <div className="u-stat-ico" style={{background:kpi.iconBg,color:kpi.iconColor}}>{kpi.icon}</div>
            <div className="u-stat-body">
              <div className="u-stat-lbl">{kpi.label}</div>
              <div className="u-stat-val">{kpi.val}</div>
              <div className="u-stat-trend neu">{kpi.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid2" style={{gap:18,marginTop:18}}>
        {/* LEFT: Care Team + Cases + Notes */}
        <div>
          {/* Care Team */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>👥</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Care Team</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Collaborating physicians</div></div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => showToast('Add care team member')}>+ Add</button>
            </div>
            <div>
              {careTeam.map((m,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 18px',borderBottom:i<careTeam.length-1?'1px solid var(--border-light)':'none'}}>
                  <div style={{width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,var(--forest-light),var(--forest))',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>{m.avatar}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600}}>{m.name}</div>
                    <div style={{fontSize:10.5,color:'var(--slate-soft)'}}>{m.role} · {m.clinic}</div>
                  </div>
                  <span className={`tag ${m.status==='active'?'g':'a'}`}>{m.status==='active'?'Active':'Invited'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Cases */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#fff4e0',color:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📋</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Active Cases</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Cases under discussion</div></div>
              </div>
            </div>
            <div>
              {cases.map((c,i) => (
                <div key={c.id} style={{padding:'14px 18px',borderBottom:i<cases.length-1?'1px solid var(--border-light)':'none'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontSize:14,fontWeight:700}}>{c.patient}</span>
                      <span className={`pill ${c.status==='active'?'active':c.status==='pending'?'warn':'inactive'}`} style={{fontSize:9}}>{c.status.charAt(0).toUpperCase()+c.status.slice(1)}</span>
                    </div>
                    <span style={{fontSize:10.5,color:'var(--slate-soft)'}}>{c.lastUpdate}</span>
                  </div>
                  <div style={{fontSize:12,color:'var(--slate-soft)',lineHeight:1.5,marginBottom:6}}>{c.summary}</div>
                  <div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Lead: <strong>{c.doctor}</strong></div>
                </div>
              ))}
            </div>
          </div>

          {/* Shared Notes */}
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#ebf5fb',color:'#2980b9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📝</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Shared Notes</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Clinical observations</div></div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => { addNote('Ayesha Farooq','New clinical observation added.','Dr. Rashid Malik','DR'); showToast('Note added'); }}>+ Add Note</button>
            </div>
            <div>
              {notes.map((n,i) => (
                <div key={n.id} style={{padding:'14px 18px',borderBottom:i<notes.length-1?'1px solid var(--border-light)':'none'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                    <div style={{width:24,height:24,borderRadius:'50%',background:'linear-gradient(135deg,var(--forest-light),var(--forest))',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,fontWeight:700}}>{n.avatar}</div>
                    <span style={{fontSize:12,fontWeight:600}}>{n.doctor}</span>
                    <span style={{fontSize:10,color:'var(--slate-soft)'}}>· {n.patient} · {n.time}</span>
                  </div>
                  <div style={{fontSize:12.5,color:'var(--slate-mid)',lineHeight:1.6}}>{n.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Incoming Requests + Discussion */}
        <div>
          {/* Incoming Requests */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--crimson-pale)',color:'var(--crimson)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📩</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Incoming Requests</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>{requests.length} pending</div></div>
              </div>
            </div>
            <div>
              {requests.length === 0 ? (
                <div style={{padding:24,textAlign:'center',fontSize:12.5,color:'var(--slate-soft)'}}>No pending requests ✓</div>
              ) : requests.map((r,i) => (
                <div key={r.id} style={{padding:'14px 18px',borderBottom:i<requests.length-1?'1px solid var(--border-light)':'none'}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                    <span style={{fontSize:12.5,fontWeight:600}}>{r.from}</span>
                    <span className="tag b" style={{fontSize:9}}>{r.type}</span>
                  </div>
                  <div style={{fontSize:12,color:'var(--slate-soft)',marginBottom:4}}>Re: <strong style={{color:'var(--slate)'}}>{r.patient}</strong></div>
                  <div style={{fontSize:12,color:'var(--slate-mid)',lineHeight:1.5,marginBottom:8}}>{r.message}</div>
                  <div style={{display:'flex',gap:6}}>
                    <button className="btn btn-primary btn-xs" onClick={() => { replyToRequest(r.id,'Acknowledged'); showToast('Response sent'); }}>Reply</button>
                    <button className="btn btn-ghost btn-xs" onClick={() => { replyToRequest(r.id,'Noted'); showToast('Dismissed'); }}>Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Feed */}
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#f3eff8',color:'#7b5ea7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>💬</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Discussion</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Team conversation</div></div>
              </div>
            </div>
            <div style={{maxHeight:350,overflowY:'auto',padding:'14px 18px'}}>
              {discussions.map((d,i) => (
                <div key={d.id} style={{display:'flex',gap:10,marginBottom:i<discussions.length-1?14:0}}>
                  <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,var(--forest-light),var(--forest))',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,flexShrink:0}}>{d.avatar}</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                      <span style={{fontSize:12,fontWeight:600}}>{d.from}</span>
                      <span style={{fontSize:10,color:'var(--slate-soft)'}}>{d.time}</span>
                    </div>
                    <div style={{fontSize:12.5,color:'var(--slate-mid)',lineHeight:1.5,background:'var(--surface-alt)',borderRadius:8,padding:'8px 12px'}}>{d.text}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <div style={{padding:'12px 18px',borderTop:'1px solid var(--border-light)',display:'flex',gap:8}}>
              <input type="text" value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter'&&msgInput.trim()) { sendDiscussion(msgInput,'Dr. Rashid Malik','DR'); setMsgInput(''); showToast('Message sent'); }}} placeholder="Type a message…" style={{flex:1,padding:'8px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:12.5,outline:'none'}} />
              <button className="btn btn-primary btn-sm" onClick={() => { if(msgInput.trim()){ sendDiscussion(msgInput,'Dr. Rashid Malik','DR'); setMsgInput(''); showToast('Message sent'); }}}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
