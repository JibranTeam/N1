"use client";
import { useApp } from '@/context/AppContext';
import { useModal } from '@/context/ModalContext';
import { useInventory, getStatusConfig } from '@/hooks/useInventory';

export default function InventoryFrame() {
  const { showToast } = useApp();
  const { openModal } = useModal();
  const {
    filtered, movements, kpis, reorderQueue, topConsumed,
    searchQuery, setSearchQuery, statusFilter, setStatusFilter,
    categoryFilter, setCategoryFilter, potencyFilter, setPotencyFilter,
    exportCSV, addMedicine,
  } = useInventory();

  return (
    <div className="frame active" id="frame-inventory">
      {/* Embedded Topbar */}
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><path d="M16.5 9.4l-9-5.19"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>Smart Inventory</h2>
          <p>Medicine stock management with predictive analytics</p>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button className="ht-btn ht-btn-outline" onClick={() => { exportCSV(); showToast('Inventory CSV exported'); }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Export
          </button>
          <button className="ht-btn ht-btn-primary" onClick={() => showToast('Add medicine modal — coming soon')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add Medicine
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="u-stats cols-4">
        {[
          { icon:'💊', label:'Total Medicines', val:String(kpis.total), change:`${kpis.total} items tracked`, stripe:'var(--forest-mid)', iconBg:'var(--forest-bg)', iconColor:'var(--forest)' },
          { icon:'⚠️', label:'Low Stock', val:String(kpis.lowStock), change:'Need attention', stripe:'var(--crimson)', iconBg:'var(--crimson-pale)', iconColor:'var(--crimson)' },
          { icon:'⏰', label:'Expiring Soon', val:String(kpis.expiringSoon), change:'Within 3 months', stripe:'var(--gold)', iconBg:'var(--gold-pale)', iconColor:'var(--gold)' },
          { icon:'₨', label:'Stock Value', val:kpis.stockValue, change:'Total inventory', stripe:'var(--sapphire)', iconBg:'var(--sapphire-pale)', iconColor:'var(--sapphire)' },
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

      {/* Alert Bar */}
      {kpis.lowStock > 0 && (
        <div style={{background:'var(--crimson-pale)',border:'1px solid #f0c5c0',borderRadius:'var(--radius-sm)',padding:'10px 16px',marginBottom:16,display:'flex',alignItems:'center',gap:10,fontSize:12.5}}>
          <span style={{fontSize:16}}>⚠️</span>
          <span><strong style={{color:'var(--crimson)'}}>{kpis.lowStock} medicines</strong> below minimum stock level. Auto-deduction active — prescriptions automatically reduce stock.</span>
        </div>
      )}

      {/* Toolbar */}
      <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap',alignItems:'center'}}>
        <div style={{flex:1,minWidth:200,position:'relative'}}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--slate-soft)'}}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search medicines…" style={{width:'100%',padding:'9px 12px 9px 34px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13,outline:'none'}} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:12.5,outline:'none'}}>
          <option value="">All Status</option><option value="in-stock">In Stock</option><option value="low">Low Stock</option><option value="critical">Critical</option>
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:12.5,outline:'none'}}>
          <option value="">All Categories</option><option value="polycrest">Polycrest</option><option value="acute">Acute</option><option value="nosode">Nosode</option><option value="mother">Mother Tincture</option>
        </select>
      </div>

      <div className="grid2" style={{gap:18,gridTemplateColumns:'1fr 320px'}}>
        {/* Main Table */}
        <div className="card">
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr><th>Medicine</th><th>Potency</th><th>Batch</th><th>Stock</th><th>Predicted Runout</th><th>Expiry</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {filtered.map((m,i) => {
                  const cfg = getStatusConfig(m.st);
                  const pct = Math.round((m.stock/m.cap)*100);
                  return (
                    <tr key={i}>
                      <td><div style={{fontWeight:600}}>{m.name}</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>{m.form} · {m.supplier}</div></td>
                      <td>{m.pot}</td>
                      <td style={{fontSize:11,color:'var(--slate-soft)'}}>{m.batch}</td>
                      <td>
                        <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <span style={{fontWeight:600,color:cfg.stockColor||'var(--slate)',minWidth:36}}>{m.stock}</span>
                          <div style={{flex:1,height:6,background:'var(--border-light)',borderRadius:3,overflow:'hidden',minWidth:40}}>
                            <div style={{height:'100%',width:`${pct}%`,background:m.st==='critical'?'var(--crimson)':m.st==='low'?'var(--gold)':'var(--forest-mid)',borderRadius:3,transition:'width .3s'}}></div>
                          </div>
                        </div>
                      </td>
                      <td style={{fontSize:12,color:cfg.runColor}}>{m.runout}</td>
                      <td style={{fontSize:12}}>{m.exp}</td>
                      <td><span className={`pill ${cfg.pill}`}>{cfg.label}</span></td>
                      <td><button className={`btn ${m.st==='critical'||m.st==='low'?'btn-danger':'btn-ghost'} btn-xs`} onClick={() => showToast(m.st==='critical'||m.st==='low'?`Reorder ${m.name}`:`Edit ${m.name}`)}>{m.st==='critical'||m.st==='low'?'Reorder':'Edit'}</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div>
          {/* Reorder Queue */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:28,height:28,borderRadius:6,background:'var(--crimson-pale)',color:'var(--crimson)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>🔔</div>
                <div className="card-title" style={{fontSize:13}}>Reorder Queue</div>
              </div>
              <span style={{fontSize:11,fontWeight:700,color:'var(--crimson)',background:'var(--crimson-pale)',padding:'2px 8px',borderRadius:10}}>{reorderQueue.length}</span>
            </div>
            <div style={{padding:'0 14px 14px'}}>
              {reorderQueue.map((m,i) => {
                const cfg = getStatusConfig(m.st);
                return (
                  <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:i<reorderQueue.length-1?'1px solid var(--border-light)':'none'}}>
                    <div><div style={{fontSize:12.5,fontWeight:600}}>{m.name} {m.pot}</div><div style={{fontSize:10.5,color:cfg.stockColor||'var(--slate-soft)'}}>{m.stock} units · {cfg.label}</div></div>
                    <button className="btn btn-danger btn-xs" onClick={() => showToast(`Reorder placed for ${m.name}`)}>Order</button>
                  </div>
                );
              })}
              {reorderQueue.length===0 && <div style={{fontSize:12,color:'var(--slate-soft)',textAlign:'center',padding:16}}>All stock levels healthy ✓</div>}
            </div>
          </div>

          {/* Recent Movements */}
          <div className="card" style={{marginBottom:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:28,height:28,borderRadius:6,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>📦</div>
                <div className="card-title" style={{fontSize:13}}>Recent Movements</div>
              </div>
            </div>
            <div style={{padding:'0 14px 14px'}}>
              {movements.map((m,i) => (
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8,padding:'7px 0',borderBottom:i<movements.length-1?'1px solid var(--border-light)':'none'}}>
                  <div style={{width:6,height:6,borderRadius:'50%',background:m.color,marginTop:5,flexShrink:0}}></div>
                  <div><div style={{fontSize:12,lineHeight:1.4}}>{m.text}</div><div style={{fontSize:10,color:'var(--slate-soft)'}}>{m.time}</div></div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Consumed */}
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:28,height:28,borderRadius:6,background:'#fff4e0',color:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>📊</div>
                <div className="card-title" style={{fontSize:13}}>Top Consumed</div>
              </div>
            </div>
            <div style={{padding:'0 14px 14px'}}>
              {topConsumed.map((m,i) => (
                <div key={i} style={{marginBottom:i<topConsumed.length-1?10:0}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                    <span style={{fontSize:11.5,fontWeight:500}}>{m.name}</span>
                    <span style={{fontSize:10.5,color:'var(--slate-soft)'}}>{m.mu}/mo</span>
                  </div>
                  <div style={{height:5,background:'var(--border-light)',borderRadius:3,overflow:'hidden'}}>
                    <div style={{height:'100%',width:`${m.pct}%`,background:'var(--forest-mid)',borderRadius:3}}></div>
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
