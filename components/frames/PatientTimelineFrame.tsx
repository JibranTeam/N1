"use client";
import { useApp } from '@/context/AppContext';
import { useModal } from '@/context/ModalContext';
import { useTimeline } from '@/hooks/useTimeline';

const TYPE_CFG: Record<string, { icon: string; badge: string; badgeBg: string; badgeColor: string }> = {
  visit:   { icon: '🏥', badge: '📝 Visit',       badgeBg: 'var(--forest-bg)',  badgeColor: 'var(--forest-dark)' },
  rx:      { icon: '💊', badge: '💊 Rx',           badgeBg: '#fff4e0',          badgeColor: '#8B5E1A' },
  symptom: { icon: '📝', badge: '📈 Improvement',  badgeBg: '#e8f5e9',          badgeColor: '#1e6e37' },
};

export default function PatientTimelineFrame() {
  const { showFrame, showToast, openPatientTimeline } = useApp();
  const { openModal } = useModal();
  const {
    selectedPatient, activeView, timelineFilter, symptomPeriod,
    detailOpen, detailEntry,
    patientData, filteredTimeline, symptomBars, documents, rxHistory,
    patientOptions,
    switchPatient, switchView,
    setTimelineFilter, setSymptomPeriod,
    openDetail, closeDetail, toggleRxStatus,
  } = useTimeline();

  if (!patientData) return null;
  const p = patientData;

  return (
    <div className="frame active" id="frame-patient_timeline">

      {/* PAGE HEADER */}
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75 }}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Patient Timeline</h2>
          <p>Visual case history — visits, symptoms, prescriptions &amp; collaboration</p>
        </div>
        <div style={{ display:'flex',gap:8,alignItems:'center',flexWrap:'wrap' }}>
          <select value={selectedPatient} onChange={e => switchPatient(e.target.value)} style={{ padding:'0 12px',height:32,border:'1.5px solid var(--ht-primary-light)',borderRadius:8,fontFamily:'var(--font-body)',fontSize:12,fontWeight:500,outline:'none',background:'transparent',color:'var(--ht-primary)',cursor:'pointer' }}>
            {patientOptions.map(pt => <option key={pt.id} value={pt.id}>{pt.name}</option>)}
          </select>
          <button className="ht-btn ht-btn-primary" onClick={() => showFrame('prescriptions')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>+ New Rx
          </button>
          <button className="ht-btn ht-btn-outline" onClick={() => showToast('Edit patient — coming soon')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit
          </button>
          <button className="ht-btn ht-btn-outline" onClick={() => showToast('Full record PDF generating…')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>Full Record
          </button>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="card" style={{ padding:'20px 24px',marginBottom:18,display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap' }}>
        <div style={{ display:'flex',alignItems:'center',gap:16,flex:1,minWidth:260 }}>
          <div style={{ width:56,height:56,borderRadius:'50%',background:'linear-gradient(135deg,var(--forest-light),var(--forest))',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,flexShrink:0,boxShadow:'0 4px 12px rgba(45,90,61,.25)' }}>{p.initials}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18,fontWeight:700,color:'var(--slate)',marginBottom:3 }}>{p.name}</div>
            <div style={{ display:'flex',alignItems:'center',gap:10,fontSize:12.5,color:'var(--slate-soft)',marginBottom:7,flexWrap:'wrap' }}>
              <span>Age: <strong style={{ color:'var(--slate)' }}>{p.age}</strong></span>
              <span style={{ width:3,height:3,background:'var(--slate-soft)',borderRadius:'50%',display:'inline-block' }}></span>
              <span>Miasm: <strong style={{ color:'var(--slate)' }}>{p.miasm}</strong></span>
              <span style={{ width:3,height:3,background:'var(--slate-soft)',borderRadius:'50%',display:'inline-block' }}></span>
              <span>Since: <strong style={{ color:'var(--slate)' }}>{p.since}</strong></span>
              <span style={{ width:3,height:3,background:'var(--slate-soft)',borderRadius:'50%',display:'inline-block' }}></span>
              <span>📞 <strong style={{ color:'var(--slate)' }}>{p.phone}</strong></span>
              <span style={{ width:3,height:3,background:'var(--slate-soft)',borderRadius:'50%',display:'inline-block' }}></span>
              <span>{p.visits} Visits</span>
            </div>
            <div style={{ display:'flex',gap:5,flexWrap:'wrap' }}>
              {p.tags.map((t, i) => <span key={i} className={`tag ${i === 0 ? 'g' : i === 1 ? 'a' : 'b'}`}>{t}</span>)}
            </div>
          </div>
        </div>
        <div style={{ display:'flex',gap:0,flexShrink:0 }}>
          <div style={{ textAlign:'center',padding:'12px 18px',background:'var(--forest-bg)',border:'1px solid var(--slate-pale)',borderRadius:'var(--radius-sm) 0 0 var(--radius-sm)',minWidth:80 }}>
            <div style={{ fontSize:22,fontWeight:700,color:'var(--forest)',lineHeight:1.2 }}>{p.score}</div>
            <div style={{ fontSize:9,color:'var(--slate-soft)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',marginTop:2 }}>Health Score</div>
          </div>
          <div style={{ textAlign:'center',padding:'12px 18px',background:'var(--forest-bg)',border:'1px solid var(--slate-pale)',borderLeft:'none',minWidth:80 }}>
            <div style={{ fontSize:22,fontWeight:700,color:'var(--gold)',lineHeight:1.2 }}>{p.visits}</div>
            <div style={{ fontSize:9,color:'var(--slate-soft)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',marginTop:2 }}>Total Visits</div>
          </div>
          <div style={{ textAlign:'center',padding:'12px 18px',background:'var(--forest-bg)',border:'1px solid var(--slate-pale)',borderLeft:'none',borderRadius:'0 var(--radius-sm) var(--radius-sm) 0',minWidth:80 }}>
            <div style={{ fontSize:22,fontWeight:700,color:'var(--sapphire)',lineHeight:1.2 }}>14</div>
            <div style={{ fontSize:9,color:'var(--slate-soft)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',marginTop:2 }}>Months</div>
          </div>
        </div>
      </div>

      {/* VIEW TOGGLE */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18,gap:12,flexWrap:'wrap' }}>
        <div style={{ display:'flex',background:'var(--white)',border:'1px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',padding:3,boxShadow:'var(--shadow)',gap:2 }}>
          <button onClick={() => switchView('patient')} style={{ display:'flex',alignItems:'center',gap:7,padding:'9px 18px',borderRadius:7,fontSize:13,fontWeight:600,border:'none',cursor:'pointer',fontFamily:'var(--font-body)',background:activeView==='patient'?'var(--forest)':'transparent',color:activeView==='patient'?'white':'var(--slate-soft)',boxShadow:activeView==='patient'?'0 2px 8px rgba(45,90,61,.3)':'none',transition:'all .2s' }}>
            📊 Patient Records <span style={{ background:'rgba(255,255,255,.25)',padding:'1px 7px',borderRadius:10,fontSize:10,fontWeight:700 }}>{filteredTimeline.length}</span>
          </button>
          <button onClick={() => switchView('collab')} style={{ display:'flex',alignItems:'center',gap:7,padding:'9px 18px',borderRadius:7,fontSize:13,fontWeight:600,border:'none',cursor:'pointer',fontFamily:'var(--font-body)',background:activeView==='collab'?'var(--forest)':'transparent',color:activeView==='collab'?'white':'var(--slate-soft)',transition:'all .2s' }}>
            🤝 Doctors Collaboration
          </button>
        </div>
      </div>

      {/* PATIENT RECORDS VIEW */}
      {activeView === 'patient' && (
        <div className="grid2" style={{ gap:18 }}>
          {/* LEFT: Timeline + Symptom Trends */}
          <div>
            {/* Case Timeline */}
            <div className="card">
              <div className="card-header" style={{ flexWrap:'wrap',gap:8 }}>
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14 }}>⏱</div>
                  <div><div className="card-title" style={{ fontFamily:'var(--font-display)' }}>Case Timeline</div><div style={{ fontSize:10.5,color:'var(--slate-soft)' }}>Official medical record</div></div>
                </div>
                <div style={{ display:'flex',background:'var(--forest-bg)',borderRadius:6,padding:2,gap:1 }}>
                  {(['all','visit','rx','symptom'] as const).map(f => (
                    <button key={f} className={`tl-filter-btn ${timelineFilter===f?'active':''}`} onClick={() => setTimelineFilter(f)}>{f==='all'?'All':f.charAt(0).toUpperCase()+f.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div className="card-body" style={{ padding:18 }}>
                <div className="timeline">
                  {filteredTimeline.map((entry, i) => {
                    const cfg = TYPE_CFG[entry.type] || TYPE_CFG.visit;
                    return (
                      <div key={i} className="tl-item" data-type={entry.type}>
                        <div className={`tl-dot ${entry.type}`}>{cfg.icon}</div>
                        <div className="tl-card" onClick={() => openDetail(entry)} style={{ cursor:'pointer' }}>
                          <div style={{ marginBottom:4 }}>
                            <span style={{ background:cfg.badgeBg,color:cfg.badgeColor,fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',padding:'2px 7px',borderRadius:3 }}>{cfg.badge}</span>
                            {i === 0 && <span style={{ background:'var(--forest)',color:'white',padding:'1px 6px',borderRadius:3,fontSize:8,fontWeight:700,marginLeft:4 }}>Today</span>}
                          </div>
                          <div className="tl-date">{entry.date.toUpperCase()}</div>
                          <div className="tl-title">{entry.title}</div>
                          <div className="tl-body">{entry.detail}</div>
                          {entry.response && (
                            <div className="tl-badges"><span className="tag g">{entry.response}</span></div>
                          )}
                          <div style={{ display:'flex',alignItems:'center',gap:6,marginTop:8,paddingTop:7,borderTop:'1px solid var(--slate-pale)',fontSize:10.5,color:'var(--slate-soft)' }}>
                            <div style={{ width:18,height:18,borderRadius:'50%',background:'var(--forest)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:7,fontWeight:700,flexShrink:0 }}>DR</div>
                            <strong style={{ color:'var(--slate)' }}>{entry.doctor}</strong>&nbsp;· Recorded
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Symptom Trends */}
            <div className="card" style={{ marginTop:18,overflow:'visible' }}>
              <div className="card-header" style={{ flexWrap:'wrap',gap:8,overflow:'visible',position:'relative' }}>
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ width:30,height:30,borderRadius:7,background:'#ebf5fb',color:'#2980b9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14 }}>📊</div>
                  <div><div className="card-title" style={{ fontFamily:'var(--font-display)' }}>Symptom Trends</div><div style={{ fontSize:10.5,color:'var(--slate-soft)' }}>Current levels vs. baseline</div></div>
                </div>
                <div style={{ display:'flex',alignItems:'center',gap:6,marginLeft:'auto' }}>
                  {(['3m','6m','1y'] as const).map(per => (
                    <button key={per} className={`tl-filter-btn ${symptomPeriod===per?'active':''}`} onClick={() => setSymptomPeriod(per)}>{per.toUpperCase()}</button>
                  ))}
                </div>
              </div>
              <div className="card-body">
                <div id="symptom-bars-container">
                  {symptomBars.map((s, i) => (
                    <div key={i} className="sym-bar-row" style={ i===symptomBars.length-1?{borderBottom:'none'}:undefined }>
                      <div className="sym-name">{s.name}</div>
                      <div className="sym-bar-bg"><div className="sym-bar-fill" style={{ width:`${s.value}%`,background:s.color }}></div></div>
                      <div className="sym-val">{s.value}%<span className={`sym-change ${s.change.startsWith('↓')?'down':'up'}`}>{s.change}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Rx + Docs + Audit */}
          <div>
            {/* Prescriptions & Response */}
            <div className="card">
              <div className="card-header">
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ width:30,height:30,borderRadius:7,background:'#fff4e0',color:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14 }}>💊</div>
                  <div><div className="card-title" style={{ fontFamily:'var(--font-display)' }}>Prescriptions &amp; Response</div><div style={{ fontSize:10.5,color:'var(--slate-soft)' }}>for {p.name}</div></div>
                </div>
                <div style={{ display:'flex',gap:6 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => showFrame('prescriptions')} style={{ fontSize:11 }}>View Timeline</button>
                  <button className="btn btn-outline btn-sm" onClick={() => showFrame('prescriptions')}>+ New Rx</button>
                </div>
              </div>
              {/* Last Rx context */}
              {rxHistory.length > 0 && (
                <div style={{ background:'var(--forest-bg)',borderBottom:'1px solid var(--slate-pale)',padding:'10px 16px' }}>
                  <div style={{ fontSize:10,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:7 }}>🔄 Last Prescription — {rxHistory[0].date}</div>
                  {rxHistory.slice(0,2).map((rx, i) => (
                    <div key={i} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'5px 0',borderBottom:i<1?'1px solid var(--slate-pale)':'none' }}>
                      <div><div style={{ fontSize:12.5,fontWeight:600 }}>{rx.remedies} {rx.potency}</div><div style={{ fontSize:10.5,color:'var(--slate-soft)' }}>{rx.dosage} × {rx.duration} · Response: {rx.response}</div></div>
                      <button className="btn btn-ghost btn-xs" style={{ fontSize:10,color:'var(--forest)',fontWeight:700 }} onClick={() => showToast(`↻ Repeating ${rx.remedies}`)}>↻ Repeat</button>
                    </div>
                  ))}
                </div>
              )}
              {/* Rx Table */}
              <div className="tbl-wrap">
                <table>
                  <thead><tr><th>Date</th><th>Remedy &amp; Dosage</th><th>Duration</th><th>Times</th><th>Response</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {rxHistory.map((rx, i) => (
                      <tr key={i} style={{ background:rx.status==='active'?'rgba(39,174,96,.03)':undefined,cursor:'pointer' }}>
                        <td style={{ whiteSpace:'nowrap',fontWeight:600 }}>{rx.date}</td>
                        <td><div style={{ fontWeight:600 }}>{rx.remedies}</div><div style={{ fontSize:10.5,color:'var(--slate-soft)' }}>{rx.potency} · {rx.dosage.split(' ').pop()}</div></td>
                        <td>{rx.duration}</td>
                        <td style={{ fontWeight:600,color:'var(--slate)' }}>{rx.timesRx}</td>
                        <td><span className={`resp-pill ${rx.response}`}>{rx.response.charAt(0).toUpperCase()+rx.response.slice(1)}</span></td>
                        <td><span className={`pill ${rx.status==='active'?'active':'inactive'} rx-status-btn`} style={rx.status!=='active'?{color:'var(--slate-soft)'}:undefined} onClick={e => { e.stopPropagation(); toggleRxStatus(rx.date, rx.remedies); showToast(`Status toggled for ${rx.remedies}`); }}>{rx.status==='active'?'Active':'Completed'}</span></td>
                        <td><button className="btn btn-ghost btn-xs" onClick={e => { e.stopPropagation(); showToast(`Detail: ${rx.remedies} ${rx.potency}`); }}>→</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Clinical Documents */}
            <div className="card" style={{ marginTop:16 }}>
              <div className="card-header">
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14 }}>📁</div>
                  <div><div className="card-title" style={{ fontFamily:'var(--font-display)' }}>Clinical Documents</div><div style={{ fontSize:10.5,color:'var(--slate-soft)' }}>Reports &amp; lab results</div></div>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => showToast('Upload — coming soon')}>+ Upload</button>
              </div>
              <div>
                {documents.map((doc, i) => (
                  <div key={doc.id} className="doc-row" style={i===documents.length-1?{borderBottom:'none'}:undefined} onClick={() => showToast(`Viewing: ${doc.name}`)}>
                    <div className="doc-icon" style={{ background:doc.iconBg.includes(':')?undefined:doc.iconBg }}>{doc.icon}</div>
                    <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:500 }}>{doc.name}</div><div style={{ fontSize:10.5,color:'var(--slate-soft)' }}>{doc.meta}</div></div>
                    <button className="btn btn-ghost btn-xs" onClick={e => { e.stopPropagation(); showToast(`Downloading ${doc.name}`); }}>⬇</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Log */}
            <div className="card" style={{ marginTop:16 }}>
              <div className="card-header">
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ width:30,height:30,borderRadius:7,background:'#f3eff8',color:'#7b5ea7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14 }}>🕐</div>
                  <div><div className="card-title" style={{ fontFamily:'var(--font-display)' }}>Audit Log</div><div style={{ fontSize:10.5,color:'var(--slate-soft)' }}>Who changed what</div></div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => showToast('Full audit — coming soon')}>View All</button>
              </div>
              <div>
                <div className="audit-row"><div className="audit-dot" style={{ background:'var(--forest)' }}></div><div className="audit-text"><strong>Dr. Rizwan</strong> prescribed Nat. Mur 200C + Pulsatilla 30C</div><div className="audit-time">2 hrs ago</div></div>
                <div className="audit-row"><div className="audit-dot" style={{ background:'var(--sapphire)' }}></div><div className="audit-text"><strong>Dr. Amina</strong> added consultation note</div><div className="audit-time">3 hrs ago</div></div>
                <div className="audit-row"><div className="audit-dot" style={{ background:'var(--gold)' }}></div><div className="audit-text"><strong>System</strong> generated follow-up reminder for Apr 7</div><div className="audit-time">Yesterday</div></div>
                <div className="audit-row" style={{ borderBottom:'none' }}><div className="audit-dot" style={{ background:'var(--forest-mid)' }}></div><div className="audit-text"><strong>Patient</strong> submitted symptom diary</div><div className="audit-time">3 days ago</div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COLLAB VIEW */}
      {activeView === 'collab' && (
        <div className="card" style={{ padding:24 }}>
          <div style={{ textAlign:'center',padding:'40px 0' }}>
            <div style={{ fontSize:48,marginBottom:12 }}>🤝</div>
            <h3 style={{ fontSize:16,fontWeight:700,color:'var(--slate)',marginBottom:6 }}>Doctor Collaboration Hub</h3>
            <p style={{ fontSize:13,color:'var(--slate-soft)',lineHeight:1.6 }}>Share cases, request opinions, and collaborate on treatment plans.</p>
            <button className="ht-btn ht-btn-primary" style={{ marginTop:16 }} onClick={() => showFrame('collaboration')}>Open Collaboration Hub</button>
          </div>
        </div>
      )}

      {/* DETAIL DRAWER */}
      {detailOpen && detailEntry && (
        <div className="tl-detail-drawer" style={{ position:'fixed',top:0,right:0,bottom:0,width:400,maxWidth:'90vw',background:'white',boxShadow:'-8px 0 32px rgba(0,0,0,.12)',zIndex:1000,overflowY:'auto',padding:'24px 28px',animation:'htSlideIn .25s ease' }}>
          <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20 }}>
            <h3 style={{ fontSize:16,fontWeight:700,color:'var(--slate)' }}>Timeline Detail</h3>
            <button onClick={closeDetail} style={{ background:'none',border:'none',cursor:'pointer',fontSize:18,color:'var(--slate-soft)' }}>✕</button>
          </div>
          <div style={{ fontSize:10,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6 }}>{detailEntry.type.toUpperCase()} · {detailEntry.date}</div>
          <h4 style={{ fontSize:15,fontWeight:700,color:'var(--slate)',marginBottom:10 }}>{detailEntry.title}</h4>
          <p style={{ fontSize:13,color:'var(--slate-mid)',lineHeight:1.7,marginBottom:16 }}>{detailEntry.detail}</p>
          {detailEntry.response && <div style={{ marginBottom:12 }}><span className="tag g">{detailEntry.response}</span></div>}
          <div style={{ fontSize:12,color:'var(--slate-soft)' }}>Recorded by <strong>{detailEntry.doctor}</strong></div>
        </div>
      )}
    </div>
  );
}
