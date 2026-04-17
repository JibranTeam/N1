"use client";
import { useApp } from '@/context/AppContext';
import { useBilling } from '@/hooks/useBilling';

export default function BillingFrame() {
  const { showToast, showFrame } = useApp();
  const {
    patient, setPatient, invoiceDate, setInvoiceDate,
    consultation, setConsultation, medicines, setMedicines,
    discount, setDiscount, payMethod, setPayMethod,
    total, previewData, history,
    generateInvoice, exportCSV,
  } = useBilling();

  return (
    <div className="frame active" id="frame-billing">
      {/* Header */}
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>Billing &amp; Payments</h2>
          <p>Generate invoices, track payments &amp; export records</p>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button className="ht-btn ht-btn-outline" onClick={() => { exportCSV(); showToast('Billing CSV exported'); }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Export CSV
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="u-stats cols-4">
        {[
          { icon:'₨', label:'This Month', val:'₨42,500', change:'↑ 18% vs Feb', stripe:'var(--forest-mid)', iconBg:'var(--forest-bg)', iconColor:'var(--forest)' },
          { icon:'📋', label:'Invoices Generated', val:'36', change:'↑ 8 this month', stripe:'var(--sapphire)', iconBg:'var(--sapphire-pale)', iconColor:'var(--sapphire)' },
          { icon:'✅', label:'Collection Rate', val:'94%', change:'↑ 3% improved', stripe:'var(--forest-light)', iconBg:'var(--forest-pale)', iconColor:'var(--forest-mid)' },
          { icon:'⏳', label:'Pending', val:'₨3,200', change:'2 invoices', stripe:'var(--gold)', iconBg:'var(--gold-pale)', iconColor:'var(--gold)' },
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
        {/* LEFT: Invoice Form */}
        <div>
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🧾</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Create Invoice</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>#{previewData.invoiceNo}</div></div>
              </div>
            </div>
            <div className="card-body" style={{padding:18}}>
              {/* Patient + Date */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
                <div className="fg"><label>Patient</label>
                  <select value={patient} onChange={e => setPatient(e.target.value)} style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,color:'var(--slate)',background:'var(--white)',outline:'none'}}>
                    <option>Ayesha Farooq</option><option>Bilal Chaudhry</option><option>Sana Imran</option><option>Khalid Mehmood</option><option>Fatima Noor</option>
                  </select>
                </div>
                <div className="fg"><label>Invoice Date</label>
                  <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,color:'var(--slate)',background:'var(--white)',outline:'none'}} />
                </div>
              </div>

              {/* Items */}
              <div style={{marginBottom:16}}>
                <label style={{display:'block',fontSize:10.5,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8}}>Invoice Items</label>
                <div style={{border:'1px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',overflow:'hidden'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderBottom:'1px solid var(--slate-pale)'}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:14}}>🏥</span><span style={{fontSize:13,fontWeight:500}}>Consultation Fee</span></div>
                    <div style={{display:'flex',alignItems:'center',gap:4}}><span style={{fontSize:12,color:'var(--slate-soft)'}}>₨</span>
                      <input type="number" value={consultation} onChange={e => setConsultation(+e.target.value)} style={{width:80,padding:'6px 8px',border:'1px solid var(--slate-pale)',borderRadius:6,fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,textAlign:'right',outline:'none'}} />
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderBottom:'1px solid var(--slate-pale)'}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:14}}>💊</span><span style={{fontSize:13,fontWeight:500}}>Medicines</span></div>
                    <div style={{display:'flex',alignItems:'center',gap:4}}><span style={{fontSize:12,color:'var(--slate-soft)'}}>₨</span>
                      <input type="number" value={medicines} onChange={e => setMedicines(+e.target.value)} style={{width:80,padding:'6px 8px',border:'1px solid var(--slate-pale)',borderRadius:6,fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,textAlign:'right',outline:'none'}} />
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',background:'var(--crimson-pale)'}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:14}}>🏷️</span><span style={{fontSize:13,fontWeight:500,color:'var(--crimson)'}}>Discount</span></div>
                    <div style={{display:'flex',alignItems:'center',gap:4}}><span style={{fontSize:12,color:'var(--crimson)'}}>−₨</span>
                      <input type="number" value={discount} onChange={e => setDiscount(+e.target.value)} style={{width:80,padding:'6px 8px',border:'1px solid var(--crimson-pale)',borderRadius:6,fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,textAlign:'right',outline:'none',color:'var(--crimson)'}} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',background:'var(--forest-bg)',borderRadius:'var(--radius-sm)',marginBottom:16}}>
                <span style={{fontSize:14,fontWeight:700,color:'var(--forest)'}}>Total Amount</span>
                <span style={{fontSize:22,fontWeight:700,color:'var(--forest)'}}>₨ {total.toLocaleString()}</span>
              </div>

              {/* Payment Method */}
              <div className="fg" style={{marginBottom:16}}>
                <label>Payment Method</label>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {[
                    {val:'cash',icon:'💵',label:'Cash'},
                    {val:'jazzcash',icon:'📱',label:'JazzCash'},
                    {val:'easypaisa',icon:'📱',label:'EasyPaisa'},
                    {val:'bank',icon:'🏦',label:'Bank Transfer'},
                  ].map(m => (
                    <button key={m.val} onClick={() => setPayMethod(m.val)} className={`btn ${payMethod===m.val?'btn-primary':'btn-outline'} btn-sm`} style={{fontSize:12}}>
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{display:'flex',gap:8,flexWrap:'wrap',paddingTop:12,borderTop:'1px solid var(--slate-pale)'}}>
                <button className="btn btn-ghost btn-sm" onClick={() => showToast('Invoice emailed to patient')}>📧 Email Invoice</button>
                <button className="btn btn-ghost btn-sm" onClick={() => showToast('Invoice sent via WhatsApp')}>💬 Send WhatsApp</button>
                <button className="btn btn-primary btn-sm" onClick={() => { generateInvoice(); showToast('Invoice generated ✓','success'); }}>✅ Generate Invoice</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Preview + History */}
        <div>
          {/* Invoice Preview */}
          <div className="card" style={{background:'var(--slate)',color:'white',marginBottom:16}}>
            <div className="card-header" style={{borderBottomColor:'rgba(255,255,255,.12)'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'rgba(255,255,255,.12)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>👁</div>
                <div><div className="card-title" style={{color:'white'}}>Invoice Preview</div><div style={{fontSize:10.5,color:'rgba(255,255,255,.5)'}}>Auto-generated</div></div>
              </div>
            </div>
            <div className="card-body" style={{padding:18}}>
              <div style={{fontSize:12.5,lineHeight:1.8}}>
                <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>🌿 HerbaMed Pro Clinic</div>
                <div style={{color:'rgba(255,255,255,.5)'}}>Invoice: <strong style={{color:'white'}}>{previewData.invoiceNo}</strong></div>
                <div style={{color:'rgba(255,255,255,.5)'}}>Patient: <strong style={{color:'white'}}>{previewData.patient}</strong></div>
                <div style={{color:'rgba(255,255,255,.5)'}}>Date: <strong style={{color:'white'}}>{previewData.date}</strong></div>
                <div style={{borderTop:'1px solid rgba(255,255,255,.12)',margin:'10px 0',paddingTop:10}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'rgba(255,255,255,.5)'}}>Consultation</span><span>₨ {consultation.toLocaleString()}</span></div>
                  <div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'rgba(255,255,255,.5)'}}>Medicines</span><span>₨ {medicines.toLocaleString()}</span></div>
                  {discount > 0 && <div style={{display:'flex',justifyContent:'space-between',color:'#ff8a80'}}><span>Discount</span><span>−₨ {discount.toLocaleString()}</span></div>}
                </div>
                <div style={{borderTop:'1px solid rgba(255,255,255,.25)',paddingTop:8,display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:16}}>
                  <span>Total</span><span style={{color:'var(--forest-pale)'}}>{previewData.total}</span>
                </div>
                <div style={{marginTop:8,color:'rgba(255,255,255,.4)',fontSize:11}}>Payment: {previewData.method}</div>
              </div>
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📋</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Recent Invoices</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Last {history.length} invoices</div></div>
              </div>
            </div>
            <div>
              {history.map((inv,i) => (
                <div key={inv.id} className="doc-row" style={i===history.length-1?{borderBottom:'none'}:undefined}>
                  <div className="doc-icon" style={{background:inv.iconBg,color:inv.iconColor}}>{inv.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontSize:13,fontWeight:600}}>{inv.patient}</span>
                      <span className={`pill ${inv.status==='paid'?'active':'warn'}`} style={{fontSize:9}}>{inv.status==='paid'?'Paid':'Pending'}</span>
                    </div>
                    <div style={{fontSize:10.5,color:'var(--slate-soft)'}}>{inv.id} · {inv.date} · {inv.method}</div>
                  </div>
                  <div style={{fontWeight:700,fontSize:13,color:'var(--forest)'}}>{inv.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
