"use client";
import { useApp } from '@/context/AppContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { usePdf } from '@/hooks/usePdf';

export default function AnalyticsFrame() {
  const { showToast } = useApp();
  const { activePeriod, periodData, maxRevBar, setPeriod, topRemedies, peakDays, periods, periodLabels } = useAnalytics();
  const { openPdf, generateAnalyticsPdfHtml } = usePdf();
  const d = periodData;

  return (
    <div className="frame active" id="frame-analytics">
      {/* Header */}
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>Business Analytics</h2>
          <p>Comprehensive clinic performance insights <span className="an-live">Live</span></p>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          <div className="an-tabs">
            {periods.map(p => (
              <button key={p} className={`an-tab ${activePeriod===p?'active':''}`} onClick={() => setPeriod(p)}>{periodLabels[p]}</button>
            ))}
          </div>
          <button className="ht-btn ht-btn-outline" onClick={() => { const html=generateAnalyticsPdfHtml({period:periodLabels[activePeriod],revenue:d.revenue,patients:164,retention:d.retention}); openPdf('Analytics Report',html); }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Export Report
          </button>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="u-stats cols-5">
        {[
          { icon:'₨', label:`${periodLabels[activePeriod]} Revenue`, val:d.revenue, change:d.revenueChange, stripe:'var(--forest-mid)', iconBg:'var(--forest-bg)', iconColor:'var(--forest)' },
          { icon:'👥', label:'Patient Retention', val:d.retention, change:d.retentionChange, stripe:'var(--forest-light)', iconBg:'var(--forest-pale)', iconColor:'var(--forest-mid)' },
          { icon:'⭐', label:'Avg Rating', val:d.rating, change:d.ratingCount, stripe:'var(--gold)', iconBg:'var(--gold-pale)', iconColor:'var(--gold)' },
          { icon:'💰', label:'Avg / Patient', val:d.avgPerPatient, change:d.avgChange, stripe:'var(--sapphire)', iconBg:'var(--sapphire-pale)', iconColor:'var(--sapphire)' },
          { icon:'🚫', label:'No-Show Rate', val:d.noShow, change:d.noShowChange, stripe:'var(--crimson)', iconBg:'var(--crimson-pale)', iconColor:'var(--crimson)' },
        ].map((kpi,i) => (
          <div key={i} className="u-stat" style={{'--u-stripe':kpi.stripe} as any}>
            <div className="u-stat-ico" style={{background:kpi.iconBg,color:kpi.iconColor}}>{kpi.icon}</div>
            <div className="u-stat-body">
              <div className="u-stat-lbl">{kpi.label}</div>
              <div className="u-stat-val">{kpi.val}</div>
              <div className={`u-stat-trend ${kpi.change.startsWith('↑')?'up':kpi.change.startsWith('↓')?'down':'neu'}`}>{kpi.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid2" style={{gap:18,marginTop:18}}>
        {/* LEFT: Revenue + Top Remedies */}
        <div>
          {/* Revenue Trend */}
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📈</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Revenue Trend</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>{d.revLabel}</div></div>
              </div>
            </div>
            <div className="card-body" style={{padding:18}}>
              <div className="an-chart" style={{display:'flex',alignItems:'flex-end',gap:8,height:160}}>
                {d.revenueBars.map((bar,i) => (
                  <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                    <div style={{fontSize:9,fontWeight:600,color:'var(--slate-soft)'}}>{bar.amount}</div>
                    <div style={{width:'100%',borderRadius:'6px 6px 0 0',background:`linear-gradient(180deg,var(--forest-mid),var(--forest))`,height:`${Math.round(bar.value/maxRevBar*140)}px`,transition:'height .4s ease',minHeight:8}}></div>
                    <div style={{fontSize:9,fontWeight:600,color:'var(--slate-soft)'}}>{bar.label}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:'var(--slate-soft)',textAlign:'center',marginTop:10}}>{d.revFoot}</div>
            </div>
          </div>

          {/* Top Remedies */}
          <div className="card" style={{marginTop:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#fff4e0',color:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>💊</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Top Remedies Prescribed</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>By frequency</div></div>
              </div>
            </div>
            <div className="card-body" style={{padding:18}}>
              {topRemedies.map((r,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,marginBottom:i<topRemedies.length-1?12:0}}>
                  <div style={{width:24,fontSize:11,fontWeight:700,color:'var(--slate-soft)',textAlign:'right'}}>#{i+1}</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                      <span style={{fontSize:12.5,fontWeight:600}}>{r.name}</span>
                      <span style={{fontSize:11,color:'var(--slate-soft)'}}>{r.count}×</span>
                    </div>
                    <div style={{height:6,background:'var(--border-light)',borderRadius:3,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${r.pct}%`,background:r.color,borderRadius:3,transition:'width .4s ease'}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Visit Types + Revenue Goal + Peak Days */}
        <div>
          {/* Visit Types Donut */}
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#ebf5fb',color:'#2980b9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🍩</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Visit Types</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Appointment breakdown</div></div>
              </div>
            </div>
            <div className="card-body" style={{padding:18,display:'flex',alignItems:'center',gap:24}}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--forest-bg)" strokeWidth="16"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--forest-mid)" strokeWidth="16" strokeDasharray="141.4 172" strokeDashoffset="0" transform="rotate(-90 60 60)"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--sapphire)" strokeWidth="16" strokeDasharray="62.8 250.6" strokeDashoffset="-141.4" transform="rotate(-90 60 60)"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--gold)" strokeWidth="16" strokeDasharray="47.1 266.3" strokeDashoffset="-204.2" transform="rotate(-90 60 60)"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--crimson)" strokeWidth="16" strokeDasharray="15.7 297.7" strokeDashoffset="-251.3" transform="rotate(-90 60 60)"/>
                <text x="60" y="56" textAnchor="middle" style={{fontSize:18,fontWeight:700,fill:'var(--slate)'}}>248</text>
                <text x="60" y="70" textAnchor="middle" style={{fontSize:9,fill:'var(--slate-soft)'}}>Total</text>
              </svg>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {[
                  {color:'var(--forest-mid)',label:'Follow-up',val:'45%'},
                  {color:'var(--sapphire)',label:'New Patient',val:'20%'},
                  {color:'var(--gold)',label:'Constitutional',val:'15%'},
                  {color:'var(--crimson)',label:'Acute / Urgent',val:'5%'},
                ].map((item,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{width:10,height:10,borderRadius:2,background:item.color,flexShrink:0}}></div>
                    <div style={{fontSize:12}}><span style={{color:'var(--slate-soft)'}}>{item.label}</span> <strong>{item.val}</strong></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Goals */}
          <div className="card" style={{marginTop:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🎯</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Revenue Goals</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Progress tracking</div></div>
              </div>
            </div>
            <div className="card-body" style={{padding:18}}>
              {[
                {label:'Monthly (₨60k)',pct:93,color:'var(--forest-mid)'},
                {label:'Quarterly (₨160k)',pct:78,color:'var(--sapphire)'},
                {label:'Annual (₨600k)',pct:45,color:'var(--gold)'},
              ].map((g,i) => (
                <div key={i} style={{marginBottom:i<2?14:0}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontSize:12,fontWeight:500}}>{g.label}</span>
                    <span style={{fontSize:12,fontWeight:700,color:g.color}}>{g.pct}%</span>
                  </div>
                  <div style={{height:8,background:'var(--border-light)',borderRadius:4,overflow:'hidden'}}>
                    <div style={{height:'100%',width:`${g.pct}%`,background:g.color,borderRadius:4,transition:'width .5s ease'}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Days */}
          <div className="card" style={{marginTop:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#f3eff8',color:'#7b5ea7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📅</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Peak Visit Days</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Busiest days of the week</div></div>
              </div>
            </div>
            <div className="card-body" style={{padding:18}}>
              <div style={{display:'flex',alignItems:'flex-end',gap:8,height:80}}>
                {peakDays.map((day,i) => (
                  <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                    <div style={{fontSize:9,fontWeight:600,color:'var(--slate-soft)'}}>{day.count}</div>
                    <div style={{width:'100%',borderRadius:'4px 4px 0 0',background:day.pct===100?'var(--forest-mid)':'var(--forest-pale)',height:`${Math.round(day.pct/100*60)}px`,minHeight:6,transition:'height .3s ease'}}></div>
                    <div style={{fontSize:9,fontWeight:600,color:'var(--slate-soft)'}}>{day.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Per-Clinic Revenue */}
          <div className="card" style={{marginTop:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🏥</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Per-Clinic Revenue</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Comparison</div></div>
              </div>
            </div>
            <div className="card-body" style={{padding:18}}>
              {[
                {name:'Rawalpindi Main Clinic',amount:'₨160k',pct:100,color:'var(--forest-mid)'},
                {name:'Islamabad Branch',amount:'₨104k',pct:65,color:'var(--sapphire)'},
              ].map((cl,i) => (
                <div key={i} style={{marginBottom:i<1?14:0}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontSize:12,fontWeight:500}}>{cl.name}</span>
                    <span style={{fontSize:12,fontWeight:700}}>{cl.amount}</span>
                  </div>
                  <div style={{height:8,background:'var(--border-light)',borderRadius:4,overflow:'hidden'}}>
                    <div style={{height:'100%',width:`${cl.pct}%`,background:cl.color,borderRadius:4}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
