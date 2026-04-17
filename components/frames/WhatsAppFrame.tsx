"use client";
import { useApp } from '@/context/AppContext';
import { useWhatsApp } from '@/hooks/useWhatsApp';

export default function WhatsAppFrame() {
  const { showToast } = useApp();
  const {
    templates, sentMessages, reminders, kpis,
    quickMessage, setQuickMessage, quickRecipient, setQuickRecipient,
    toggleTemplate, editTemplate, addTemplate,
    testSend, quickSend, sendFollowUp, toggleReminder, sendAllReminders,
  } = useWhatsApp();

  return (
    <div className="frame active" id="frame-whatsapp">
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>WhatsApp Automation</h2>
          <p>Automated patient communication &amp; reminders</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="ht-btn ht-btn-outline" onClick={() => showToast('Broadcast modal — coming soon')}>📢 Broadcast</button>
          <button className="ht-btn ht-btn-primary" onClick={() => { const c=sendAllReminders(); showToast(`${c} reminders sent`); }}>🚀 Send All Reminders</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="u-stats cols-4">
        {[
          { icon:'💬', label:'Messages Sent', val:String(kpis.sent), change:'↑ 22% vs last month', stripe:'var(--forest-mid)', iconBg:'var(--forest-bg)', iconColor:'var(--forest)' },
          { icon:'👁', label:'Open Rate', val:kpis.openRate, change:'↑ 4% improved', stripe:'var(--sapphire)', iconBg:'var(--sapphire-pale)', iconColor:'var(--sapphire)' },
          { icon:'📅', label:'Appts Booked via WA', val:String(kpis.apptsBooked), change:'From reminders', stripe:'var(--gold)', iconBg:'var(--gold-pale)', iconColor:'var(--gold)' },
          { icon:'⭐', label:'Patient Rating', val:kpis.rating, change:'Communication quality', stripe:'var(--forest-light)', iconBg:'var(--forest-pale)', iconColor:'var(--forest-mid)' },
        ].map((kpi,i) => (
          <div key={i} className="u-stat" style={{'--u-stripe':kpi.stripe} as any}>
            <div className="u-stat-ico" style={{background:kpi.iconBg,color:kpi.iconColor}}>{kpi.icon}</div>
            <div className="u-stat-body">
              <div className="u-stat-lbl">{kpi.label}</div>
              <div className="u-stat-val">{kpi.val}</div>
              <div className="u-stat-trend up">{kpi.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid2" style={{gap:18,marginTop:18}}>
        {/* LEFT: Templates */}
        <div>
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📋</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Automation Templates</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Auto-send based on triggers</div></div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => { addTemplate(); showToast('New template added'); }}>+ New</button>
            </div>
            <div>
              {templates.map((tpl,i) => (
                <div key={tpl.id} style={{padding:'14px 18px',borderBottom:i<templates.length-1?'1px solid var(--border-light)':'none'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                    <div style={{fontSize:13,fontWeight:600,flex:1}}>{tpl.label}</div>
                    <button className={`tog-sw ${tpl.enabled?'on':''}`} onClick={() => toggleTemplate(tpl.id)}><span className="tog-knob"></span></button>
                  </div>
                  <div style={{fontSize:12,color:'var(--slate-soft)',lineHeight:1.5,marginBottom:8,background:'var(--surface-alt)',borderRadius:6,padding:'8px 10px'}}>{tpl.text}</div>
                  <div style={{display:'flex',gap:6}}>
                    <button className="btn btn-ghost btn-xs" onClick={() => { const msg=testSend(tpl.label); showToast(msg); }}>🧪 Test</button>
                    <button className="btn btn-ghost btn-xs" onClick={() => showToast('Edit template — inline editing')}>✏️ Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Sent + Quick Send + Reminders */}
        <div>
          {/* Sent Messages */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#ebf5fb',color:'#2980b9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📨</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Sent Messages</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Recent activity</div></div>
              </div>
            </div>
            <div style={{maxHeight:280,overflowY:'auto'}}>
              {sentMessages.map((msg,i) => (
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'10px 18px',borderBottom:i<sentMessages.length-1?'1px solid var(--border-light)':'none'}}>
                  <span style={{fontSize:16,flexShrink:0}}>{msg.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                      <span style={{fontSize:12.5,fontWeight:600}}>{msg.name}</span>
                      <span style={{fontSize:10,color:'var(--forest)'}}>{msg.tick}</span>
                    </div>
                    <div style={{fontSize:11.5,color:'var(--slate-soft)',lineHeight:1.4}}>{msg.msg}</div>
                    <div style={{fontSize:10,color:'var(--slate-soft)',marginTop:2}}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Send */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>⚡</div>
                <div className="card-title" style={{fontSize:13}}>Quick Send</div>
              </div>
            </div>
            <div style={{padding:'14px 18px'}}>
              <div className="fg" style={{marginBottom:10}}><label>Recipient</label>
                <select value={quickRecipient} onChange={e => setQuickRecipient(e.target.value)} style={{width:'100%',padding:'8px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:12.5,outline:'none'}}>
                  <option value="">Select patient…</option>
                  <option value="Ayesha Farooq">Ayesha Farooq</option>
                  <option value="Bilal Chaudhry">Bilal Chaudhry</option>
                  <option value="Sana Imran">Sana Imran</option>
                  <option value="Khalid Mehmood">Khalid Mehmood</option>
                </select>
              </div>
              <div className="fg" style={{marginBottom:10}}><label>Message</label>
                <textarea value={quickMessage} onChange={e => setQuickMessage(e.target.value)} placeholder="Type your message…" style={{width:'100%',padding:'8px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:12.5,outline:'none',resize:'vertical',minHeight:60,boxSizing:'border-box'}} />
              </div>
              <button className="btn btn-primary btn-sm" style={{width:'100%'}} onClick={() => { const r=quickSend(); showToast(r.success?r.message||'Sent':r.error||'Error'); }}>📤 Send Message</button>
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#fff4e0',color:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>⏰</div>
                <div className="card-title" style={{fontSize:13}}>Upcoming Reminders</div>
              </div>
            </div>
            <div>
              {reminders.map((r,i) => (
                <div key={r.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 18px',borderBottom:i<reminders.length-1?'1px solid var(--border-light)':'none'}}>
                  <div>
                    <div style={{fontSize:12.5,fontWeight:600}}>{r.patient}</div>
                    <div style={{fontSize:10.5,color:'var(--slate-soft)'}}>{r.type} · {r.scheduledFor}</div>
                  </div>
                  <button className={`tog-sw ${r.enabled?'on':''}`} onClick={() => toggleReminder(r.id)}><span className="tog-knob"></span></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
