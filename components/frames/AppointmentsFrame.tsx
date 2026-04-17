"use client";
import { useApp } from '@/context/AppContext';
import { useModal } from '@/context/ModalContext';
import { useCalendar } from '@/hooks/useCalendar';
import { MONTH_NAMES, DAY_NAMES } from '@/lib/utils';

const VIEW_LABELS = { month:'Month', week:'Week', day:'Day', list:'List' } as const;

export default function AppointmentsFrame() {
  const { showToast } = useApp();
  const { openModal } = useModal();
  const {
    year, month, view, selectedDate, dateDisplay,
    todayAppts, selectedDateAppts, monthGrid, weekData, hours,
    miniCalGrid, upcoming, stats,
    changeMonth, navigateDate, goToday,
    selectDate, switchToDay, setCalView,
    getApptsByDate, timeToY,
  } = useCalendar();

  return (
    <div className="frame active" id="frame-appointments">
      {/* Header */}
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Appointments</h2>
          <p>Schedule, manage &amp; track patient appointments</p>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
          <button className="ht-btn ht-btn-outline" onClick={() => showToast('Walk-in registered')}>🚶 Walk-in</button>
          <button className="ht-btn ht-btn-primary" onClick={() => showToast('Booking modal — coming soon')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Book Appointment
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="u-stats cols-4" style={{marginBottom:16}}>
        {[
          { icon:'📅', label:'Today', val:String(stats.total), change:`${stats.confirmed} confirmed`, stripe:'var(--forest-mid)', iconBg:'var(--forest-bg)', iconColor:'var(--forest)' },
          { icon:'✅', label:'Completed', val:String(stats.completed), change:'Seen today', stripe:'var(--forest-light)', iconBg:'var(--forest-pale)', iconColor:'var(--forest-mid)' },
          { icon:'👤', label:'New Patients', val:String(stats.newPatients), change:'First visit', stripe:'var(--sapphire)', iconBg:'var(--sapphire-pale)', iconColor:'var(--sapphire)' },
          { icon:'⏳', label:'In Progress', val:String(stats.inProgress), change:'Currently consulting', stripe:'var(--gold)', iconBg:'var(--gold-pale)', iconColor:'var(--gold)' },
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

      {/* Calendar Controls */}
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 18px',borderBottom:'1px solid var(--border-light)',flexWrap:'wrap',gap:10}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <button className="btn btn-ghost btn-xs" onClick={() => view==='month'?changeMonth(-1):navigateDate(-1)}>‹</button>
            <button className="btn btn-outline btn-xs" onClick={goToday}>Today</button>
            <button className="btn btn-ghost btn-xs" onClick={() => view==='month'?changeMonth(1):navigateDate(1)}>›</button>
            <h3 style={{fontSize:15,fontWeight:700,color:'var(--slate)',marginLeft:8}}>{dateDisplay}</h3>
          </div>
          <div style={{display:'flex',background:'var(--forest-bg)',borderRadius:6,padding:2,gap:1}}>
            {(['month','week','day','list'] as const).map(v => (
              <button key={v} className={`tl-filter-btn ${view===v?'active':''}`} onClick={() => setCalView(v)}>{VIEW_LABELS[v]}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:18}}>
        {/* Main Calendar Area */}
        <div className="card">
          {/* MONTH VIEW */}
          {view === 'month' && (
            <div style={{padding:16}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:1,marginBottom:2}}>
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                  <div key={d} style={{padding:'8px 4px',textAlign:'center',fontSize:10,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px'}}>{d}</div>
                ))}
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:1}}>
                {monthGrid.map((cell,i) => (
                  <div key={i} onClick={() => switchToDay(cell.date)} style={{padding:'8px 6px',minHeight:64,borderRadius:6,cursor:'pointer',background:cell.isToday?'var(--forest-bg)':cell.inMonth?'white':'var(--surface-alt)',border:cell.isToday?'2px solid var(--forest)':'1px solid var(--border-light)',opacity:cell.inMonth?1:.5,transition:'all .15s'}}>
                    <div style={{fontSize:12,fontWeight:cell.isToday?700:500,color:cell.isToday?'var(--forest)':'var(--slate)',marginBottom:4}}>{cell.day}</div>
                    {cell.apptCount > 0 && (
                      <div style={{display:'flex',gap:2,flexWrap:'wrap'}}>
                        {Array.from({length:Math.min(cell.apptCount,3)}).map((_,j) => (
                          <div key={j} style={{width:6,height:6,borderRadius:'50%',background:j===0?'var(--forest)':j===1?'var(--sapphire)':'var(--gold)'}}></div>
                        ))}
                        {cell.apptCount > 3 && <span style={{fontSize:8,color:'var(--slate-soft)'}}>+{cell.apptCount-3}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WEEK VIEW */}
          {view === 'week' && (
            <div style={{padding:16,overflowX:'auto'}}>
              <div style={{display:'grid',gridTemplateColumns:'60px repeat(7,1fr)',gap:1,minWidth:700}}>
                <div style={{padding:8}}></div>
                {weekData.map((d,i) => (
                  <div key={i} style={{padding:'8px 4px',textAlign:'center',fontSize:11,fontWeight:600,color:d.isToday?'var(--forest)':'var(--slate-soft)',background:d.isToday?'var(--forest-bg)':'transparent',borderRadius:6}}>
                    <div>{d.dayName}</div>
                    <div style={{fontSize:16,fontWeight:700,color:d.isToday?'var(--forest)':'var(--slate)'}}>{d.dayNum}</div>
                  </div>
                ))}
                {hours.map((hr,hi) => (
                  <div key={hi} style={{display:'contents'}}>
                    <div style={{padding:'8px 6px',fontSize:10,color:'var(--slate-soft)',textAlign:'right',borderTop:'1px solid var(--border-light)'}}>{hr}</div>
                    {weekData.map((d,di) => (
                      <div key={di} style={{borderTop:'1px solid var(--border-light)',minHeight:40,padding:2,position:'relative'}}>
                        {d.appointments.filter(a => {
                          const aHr = parseInt(a.time);
                          const hrNum = 7 + hi;
                          return (a.time.includes('AM') ? aHr : aHr+12) === hrNum || (aHr === 12 && a.time.includes('PM') && hrNum === 12);
                        }).map((appt,ai) => (
                          <div key={ai} onClick={() => showToast(`${appt.name} · ${appt.type}`)} style={{fontSize:9,padding:'3px 5px',borderRadius:4,background:'var(--forest-bg)',color:'var(--forest-dark)',border:'1px solid var(--forest-pale)',cursor:'pointer',marginBottom:1,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>
                            {appt.name.split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DAY VIEW */}
          {view === 'day' && (
            <div style={{padding:16}}>
              <div style={{fontSize:14,fontWeight:700,color:'var(--slate)',marginBottom:12}}>{DAY_NAMES[selectedDate.getDay()]}, {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()}</div>
              {selectedDateAppts.length === 0 ? (
                <div style={{textAlign:'center',padding:'40px 0',color:'var(--slate-soft)',fontSize:13}}>No appointments scheduled for this day.</div>
              ) : (
                <div>
                  {selectedDateAppts.map((appt,i) => (
                    <div key={appt.id} style={{display:'flex',gap:14,padding:'12px 0',borderBottom:i<selectedDateAppts.length-1?'1px solid var(--border-light)':'none',alignItems:'flex-start'}}>
                      <div style={{width:56,textAlign:'center',flexShrink:0}}>
                        <div style={{fontSize:13,fontWeight:700,color:'var(--forest)'}}>{appt.time}</div>
                        {appt.duration && <div style={{fontSize:9,color:'var(--slate-soft)'}}>{appt.duration}min</div>}
                      </div>
                      <div style={{flex:1,background:'var(--surface-alt)',borderRadius:'var(--radius-sm)',padding:'12px 14px',borderLeft:`3px solid ${appt.status==='completed'?'var(--success)':appt.status==='in-progress'?'var(--gold)':'var(--forest)'}`}}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
                          <span style={{fontSize:14,fontWeight:700}}>{appt.name}</span>
                          <span className={`pill ${appt.status==='completed'?'active':appt.status==='in-progress'?'warn':'active'}`} style={{fontSize:9}}>{appt.label}</span>
                        </div>
                        <div style={{fontSize:12,color:'var(--slate-soft)'}}>
                          {appt.type} {appt.phone && `· ${appt.phone}`} {appt.miasm && `· ${appt.miasm}`}
                        </div>
                        <div style={{display:'flex',gap:6,marginTop:8}}>
                          {appt.status === 'confirmed' && <button className="btn btn-primary btn-xs" onClick={() => showToast(`Check-in: ${appt.name}`)}>Check In</button>}
                          {appt.status === 'in-progress' && <button className="btn btn-primary btn-xs" onClick={() => showToast(`Complete: ${appt.name}`)}>Complete</button>}
                          <button className="btn btn-ghost btn-xs" onClick={() => showToast(`WhatsApp: ${appt.name}`)}>💬 WA</button>
                          <button className="btn btn-ghost btn-xs" onClick={() => showToast(`Cancel: ${appt.name}`)}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* LIST VIEW */}
          {view === 'list' && (
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Time</th><th>Patient</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {todayAppts.map(appt => (
                    <tr key={appt.id}>
                      <td style={{fontWeight:600,whiteSpace:'nowrap'}}>{appt.time}</td>
                      <td><div style={{fontWeight:600}}>{appt.name}</div>{appt.phone && <div style={{fontSize:10.5,color:'var(--slate-soft)'}}>{appt.phone}</div>}</td>
                      <td><span className={`tag ${appt.type==='New Patient'?'b':appt.type==='Follow-up'?'g':'a'}`}>{appt.type}</span></td>
                      <td><span className={`pill ${appt.status==='completed'?'active':appt.status==='in-progress'?'warn':'active'}`}>{appt.label}</span></td>
                      <td>
                        <div style={{display:'flex',gap:4}}>
                          <button className="btn btn-ghost btn-xs" onClick={() => showToast(`View: ${appt.name}`)}>View</button>
                          <button className="btn btn-ghost btn-xs" onClick={() => showToast(`WA: ${appt.name}`)}>💬</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div>
          {/* Mini Calendar */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header" style={{padding:'10px 14px'}}>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <button className="btn btn-ghost btn-xs" onClick={() => changeMonth(-1)} style={{padding:'2px 6px'}}>‹</button>
                <span style={{fontSize:12,fontWeight:700,color:'var(--slate)'}}>{MONTH_NAMES[month]} {year}</span>
                <button className="btn btn-ghost btn-xs" onClick={() => changeMonth(1)} style={{padding:'2px 6px'}}>›</button>
              </div>
            </div>
            <div style={{padding:'0 10px 10px'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:0}}>
                {['M','T','W','T','F','S','S'].map((d,i) => (
                  <div key={i} style={{padding:4,textAlign:'center',fontSize:9,fontWeight:700,color:'var(--slate-soft)'}}>{d}</div>
                ))}
                {miniCalGrid.map((cell,i) => (
                  <div key={i} onClick={() => selectDate(cell.date)} style={{padding:'4px 2px',textAlign:'center',fontSize:10,fontWeight:cell.isToday?700:400,color:cell.isToday?'white':cell.inMonth?'var(--slate)':'var(--slate-soft)',background:cell.isToday?'var(--forest)':'transparent',borderRadius:'50%',cursor:'pointer',width:24,height:24,display:'flex',alignItems:'center',justifyContent:'center',margin:'1px auto'}}>
                    {cell.day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:28,height:28,borderRadius:6,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12}}>📋</div>
                <div className="card-title" style={{fontSize:13}}>Upcoming</div>
              </div>
            </div>
            <div style={{maxHeight:350,overflowY:'auto'}}>
              {upcoming.map((group,gi) => (
                <div key={gi}>
                  <div style={{padding:'8px 14px',fontSize:10,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px',background:'var(--surface-alt)',borderBottom:'1px solid var(--border-light)'}}>{group.dateLabel}</div>
                  {group.appointments.map((appt,ai) => (
                    <div key={ai} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 14px',borderBottom:'1px solid var(--border-light)',cursor:'pointer'}} onClick={() => showToast(`${appt.name} · ${appt.time}`)}>
                      <div style={{fontSize:11,fontWeight:600,color:'var(--forest)',minWidth:48}}>{appt.time.replace(' AM','a').replace(' PM','p')}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:500}}>{appt.name}</div>
                        <div style={{fontSize:10,color:'var(--slate-soft)'}}>{appt.type}</div>
                      </div>
                      <span className={`pill ${appt.status==='completed'?'active':'active'}`} style={{fontSize:8}}>{appt.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
