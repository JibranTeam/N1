"use client";
import { useApp } from '@/context/AppContext';
import { useModal } from '@/context/ModalContext';
import { usePrescription } from '@/hooks/usePrescription';
import { usePdf } from '@/hooks/usePdf';

const POTENCY_OPTS = ['6C','12C','30C','200C','1M','10M','50M','CM','Q','LM1','LM2','LM3'];
const FREQ_OPTS = ['OD','BD','TDS','QDS','SOS','Weekly','Fortnightly','Monthly'];
const QTY_OPTS = ['1 drop','2 drops','3 drops','5 drops','10 drops','Single dose','2 globules','4 globules','6 globules','½ tsp'];
const DUR_OPTS = ['3 days','5 days','7 days','10 days','14 days','21 days','30 days','1 month','2 months','3 months'];
const REM_OPTS = ['Nat. Mur','Pulsatilla','Rhus Tox','Arnica','Nux Vomica','Sulphur','Lycopodium','Calcarea Carb','Sepia','Belladonna','Ignatia','Thuja','Bryonia','Kali Bich','Allium Cepa','Arsenicum Album'];

export default function PrescriptionsFrame() {
  const { showFrame, showToast } = useApp();
  const { openModal } = useModal();
  const {
    selectedPatient, date, diagnosis, instructions, showAiSuggestion,
    remedies, dietChips, selectedTemplate, patientData, patientRxHistory, previewData,
    setDate, setDiagnosis, setInstructions, switchPatient,
    addRemedyRow, removeRemedyRow, updateRemedy, applyTemplate, applySuggestion,
    addDietChip, removeDietChip, clearForm, saveRx, repeatLastRx,
    setShowAiSuggestion, dietOptions,
  } = usePrescription();
  const { openPdf, generateRxPdfHtml } = usePdf();

  const p = patientData;
  if (!p) return null;

  return (
    <div className="frame active" id="frame-prescriptions">
      {/* PAGE HEADER */}
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><path d="M9 12h6"/><path d="M11 10v4"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Prescriptions</h2>
          <p>Create, manage &amp; track prescriptions with response outcomes</p>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button className="ht-btn ht-btn-outline" onClick={() => showFrame('ai_assistant')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 14 22h-4a7 7 0 0 1-6.73-3H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2z"/></svg>AI Assist
          </button>
          <button className="ht-btn ht-btn-primary" onClick={() => { clearForm(); showToast('New prescription form ready'); }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>+ Prescription
          </button>
        </div>
      </div>

      {/* PATIENT CONTEXT BAR */}
      <div className="card" style={{marginBottom:24,padding:0}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,padding:'16px 20px',flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:14,flex:1}}>
            <div style={{width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,var(--forest-light),var(--forest))',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,fontWeight:600,flexShrink:0}}>{p.initials}</div>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
                <span style={{fontSize:16,fontWeight:700}}>{p.name}</span>
                <span style={{fontSize:11,color:'var(--slate-soft)',fontWeight:400}}>PID-001</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10,fontSize:12,color:'var(--slate-soft)',marginBottom:6,flexWrap:'wrap'}}>
                <span>Age: <strong style={{color:'var(--slate)'}}>{p.age}</strong></span>
                <span style={{width:3,height:3,background:'var(--slate-soft)',borderRadius:'50%',display:'inline-block'}}></span>
                <span>Miasm: <strong style={{color:'var(--slate)'}}>{p.miasm}</strong></span>
                <span style={{width:3,height:3,background:'var(--slate-soft)',borderRadius:'50%',display:'inline-block'}}></span>
                <span>Since: <strong style={{color:'var(--slate)'}}>{p.since}</strong></span>
              </div>
              <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                {p.tags.map((t,i) => <span key={i} className={`tag ${i===0?'g':i===1?'a':'b'}`}>{t}</span>)}
              </div>
            </div>
          </div>
          <div style={{display:'flex',gap:0,flexShrink:0}}>
            <div style={{textAlign:'center',padding:'10px 16px',background:'var(--forest-bg)',border:'1px solid var(--slate-pale)',borderRadius:'var(--radius-sm) 0 0 var(--radius-sm)'}}>
              <div style={{fontSize:20,fontWeight:700,color:'var(--forest)',lineHeight:1.2}}>{p.score}</div>
              <div style={{fontSize:9,color:'var(--slate-soft)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',marginTop:2}}>Health Score</div>
            </div>
            <div style={{textAlign:'center',padding:'10px 16px',background:'var(--forest-bg)',border:'1px solid var(--slate-pale)',borderLeft:'none',borderRadius:'0 var(--radius-sm) var(--radius-sm) 0'}}>
              <div style={{fontSize:20,fontWeight:700,color:'var(--gold)',lineHeight:1.2}}>{p.visits}</div>
              <div style={{fontSize:9,color:'var(--slate-soft)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.5px',marginTop:2}}>Visits</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid2">
        {/* LEFT: Create Form */}
        <div>
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#fff4e0',color:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📝</div>
                <div><div className="card-title">Create Prescription</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>New Rx for {p.name}</div></div>
              </div>
            </div>

            {/* Templates */}
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 16px 30px 16px',borderBottom:'1px solid var(--slate-pale)',background:'var(--forest-bg)',position:'relative',zIndex:100}}>
              <span style={{fontSize:10,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.4px',whiteSpace:'nowrap'}}>📋 Templates:</span>
              <select value="" onChange={e => { if(e.target.value==='repeat'){repeatLastRx();showToast('Last Rx applied')} else if(e.target.value){applyTemplate(e.target.value);showToast('Template applied')} }} style={{padding:'7px 32px 7px 12px',border:'1px solid var(--slate-pale)',borderRadius:7,fontFamily:'var(--font-body)',fontSize:12.5,fontWeight:500,color:'var(--slate)',background:'var(--white)',cursor:'pointer',outline:'none',minWidth:190}}>
                <option value="">Choose a template…</option>
                <option value="repeat">🔄 Repeat Last Rx</option>
                <option value="sinusitis">Sinusitis Protocol</option>
                <option value="headache">Headache Relief</option>
                <option value="constitutional">Constitutional</option>
                <option value="allergy">Acute Allergy</option>
              </select>
            </div>

            <div className="card-body" style={{marginTop:12}}>
              {/* Patient + Date */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
                <div className="fg"><label>Patient</label>
                  <select value={selectedPatient} onChange={e => switchPatient(e.target.value)} style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,color:'var(--slate)',background:'var(--white)',outline:'none'}}>
                    <option value="ayesha">Ayesha Farooq (PID-001)</option>
                    <option value="bilal">Bilal Chaudhry (PID-002)</option>
                    <option value="sana">Sana Imran (PID-003)</option>
                    <option value="khalid">Khalid Mehmood (PID-004)</option>
                  </select>
                </div>
                <div className="fg"><label>Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,color:'var(--slate)',background:'var(--white)',outline:'none'}} />
                </div>
              </div>

              {/* Diagnosis */}
              <div className="fg" style={{marginBottom:16}}><label>Diagnosis / Complaint</label>
                <textarea value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder="Enter clinical notes, chief complaint, observations…" style={{width:'100%',padding:'10px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,color:'var(--slate)',background:'var(--white)',outline:'none',resize:'vertical',minHeight:80,boxSizing:'border-box'}} />
              </div>

              {/* AI Suggestion */}
              {showAiSuggestion && (
                <div style={{background:'#ebf5fb',border:'1px solid #bfd9ec',borderRadius:8,padding:'11px 14px',marginBottom:16,display:'flex',alignItems:'flex-start',gap:10}}>
                  <span style={{fontSize:16,flexShrink:0}}>💡</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,color:'#2980b9',fontSize:11.5,marginBottom:2}}>AI Suggestion Based on Patient History</div>
                    <div style={{fontSize:12,color:'var(--slate-soft)',lineHeight:1.5}}>Nat. Mur 200C has shown <strong>Excellent</strong> response (3× prescribed). Consider continuing at same potency or stepping down to 30C.</div>
                    <div style={{display:'flex',gap:6,marginTop:7}}>
                      <button className="btn btn-outline btn-xs" onClick={() => { applySuggestion(); showToast('AI suggestion applied'); }}>Apply Suggestion</button>
                      <button className="btn btn-ghost btn-xs" onClick={() => setShowAiSuggestion(false)}>Dismiss</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Remedy Table */}
              <div style={{marginBottom:16}}>
                <label style={{display:'block',fontSize:10.5,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:7}}>Remedies <span style={{color:'var(--crimson)'}}>*</span></label>
                <table className="rx-form-table" style={{width:'100%',borderCollapse:'collapse',marginBottom:6}}>
                  <thead>
                    <tr style={{background:'#2d5a3d'}}>
                      {['Remedy','Potency','Qty','Frequency','Duration',''].map((h,i) => (
                        <th key={i} style={{padding:'8px 10px',fontSize:9.5,fontWeight:700,color:'white',textTransform:'uppercase',letterSpacing:'.6px',textAlign:i===5?'center':'left',background:'#2d5a3d',borderRadius:i===0?'6px 0 0 0':i===5?'0 6px 0 0':undefined,width:i===5?36:undefined}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {remedies.map((rx, ri) => (
                      <tr key={rx.id}>
                        <td style={{padding:'5px 4px',borderBottom:'1px solid var(--slate-pale)'}}><div style={{display:'flex',alignItems:'center',gap:2}}>
                          <select className="rx-remedy-sel rx-rem-sel" value={rx.name} onChange={e => updateRemedy(rx.id,'name',e.target.value)} style={{flex:1,minWidth:0}}>
                            {REM_OPTS.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        </div></td>
                        <td style={{padding:'5px 4px',borderBottom:'1px solid var(--slate-pale)'}}><select className="rx-potency-sel rx-rem-sel" value={rx.potency} onChange={e => updateRemedy(rx.id,'potency',e.target.value)} style={{width:'100%'}}>{POTENCY_OPTS.map(o => <option key={o}>{o}</option>)}</select></td>
                        <td style={{padding:'5px 4px',borderBottom:'1px solid var(--slate-pale)'}}><select className="rx-qty-sel rx-rem-sel" value={rx.dosage} onChange={e => updateRemedy(rx.id,'dosage',e.target.value)} style={{width:'100%'}}>{QTY_OPTS.map(o => <option key={o} value={o}>{o}</option>)}</select></td>
                        <td style={{padding:'5px 4px',borderBottom:'1px solid var(--slate-pale)'}}><select className="rx-freq-sel rx-rem-sel" value={rx.frequency} onChange={e => updateRemedy(rx.id,'frequency',e.target.value)} style={{width:'100%'}}>{FREQ_OPTS.map(o => <option key={o}>{o}</option>)}</select></td>
                        <td style={{padding:'5px 4px',borderBottom:'1px solid var(--slate-pale)'}}><select className="rx-duration-sel rx-rem-sel" value={rx.duration} onChange={e => updateRemedy(rx.id,'duration',e.target.value)} style={{width:'100%'}}>{DUR_OPTS.map(o => <option key={o} value={o}>{o}</option>)}</select></td>
                        <td style={{padding:'5px 4px',borderBottom:'1px solid var(--slate-pale)',textAlign:'center'}}><button onClick={() => removeRemedyRow(rx.id)} className="rem-remove-btn" title="Remove">×</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn btn-ghost btn-sm" onClick={addRemedyRow} style={{fontSize:11.5,marginTop:4}}>+ Add Remedy Row</button>
              </div>

              {/* Diet Restrictions */}
              <div className="fg" style={{marginBottom:16}}>
                <label>Diet Restrictions</label>
                <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:8}}>
                  {dietChips.map(chip => (
                    <span key={chip} className="tag r" style={{cursor:'pointer',display:'flex',alignItems:'center',gap:4}} onClick={() => removeDietChip(chip)}>{chip} <span style={{fontWeight:700,opacity:.6}}>×</span></span>
                  ))}
                </div>
                <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                  {dietOptions.filter(d => !dietChips.includes(d)).map(opt => (
                    <button key={opt} className="btn btn-ghost btn-xs" onClick={() => addDietChip(opt)} style={{fontSize:10.5}}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="fg" style={{marginBottom:16}}><label>Special Instructions</label>
                <textarea value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Follow-up in 14 days. Report any aggravation…" style={{width:'100%',padding:'10px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,color:'var(--slate)',background:'var(--white)',outline:'none',resize:'vertical',minHeight:60,boxSizing:'border-box'}} />
              </div>

              {/* Actions */}
              <div style={{display:'flex',gap:8,flexWrap:'wrap',paddingTop:12,borderTop:'1px solid var(--slate-pale)'}}>
                <button className="btn btn-ghost btn-sm" onClick={() => showToast('Draft saved')}>💾 Save Draft</button>
                <button className="btn btn-primary btn-sm" onClick={() => { const r=saveRx(); if(r.success){showToast('Rx saved & dispatched ✓','success')}else{showToast(r.error||'Error','error')} }}>Save &amp; Dispatch</button>
                <button className="btn btn-outline btn-sm" onClick={() => { if(previewData){const html=generateRxPdfHtml({clinicName:'HerbaMed Pro Clinic',doctorName:'Dr. Rashid Malik',patientName:p.name,date,diagnosis,remedies:previewData.remedies.map(r=>({name:r.name,potency:r.potency,dosage:r.dosage,frequency:r.frequency,duration:r.duration})),diet:dietChips,instructions});openPdf('Prescription Preview',html)} }}>📄 Preview PDF</button>
                <button className="btn btn-ghost btn-sm" onClick={() => { clearForm(); showToast('Form cleared'); }}>🗑️ Clear</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Preview + History */}
        <div>
          {/* Live Preview */}
          <div className="card" style={{background:'var(--slate)',color:'white',marginBottom:16}}>
            <div className="card-header" style={{borderBottomColor:'rgba(255,255,255,.12)'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'rgba(255,255,255,.12)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>👁</div>
                <div><div className="card-title" style={{color:'white'}}>Live Preview</div><div style={{fontSize:10.5,color:'rgba(255,255,255,.5)'}}>Auto-updates as you type</div></div>
              </div>
            </div>
            <div className="card-body" style={{padding:18}}>
              {previewData && (
                <div style={{fontSize:12.5,lineHeight:1.7}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>℞ Prescription</div>
                  <div style={{color:'rgba(255,255,255,.6)'}}>Patient: <strong style={{color:'white'}}>{previewData.patientName}</strong></div>
                  <div style={{color:'rgba(255,255,255,.6)'}}>Date: <strong style={{color:'white'}}>{previewData.date}</strong></div>
                  {previewData.diagnosis && <div style={{color:'rgba(255,255,255,.6)',marginTop:6}}>Dx: {previewData.diagnosis}</div>}
                  <div style={{marginTop:10,borderTop:'1px solid rgba(255,255,255,.12)',paddingTop:10}}>
                    {previewData.remedies.map((r,i) => (
                      <div key={i} style={{marginBottom:6}}><strong style={{color:'var(--forest-pale)'}}>{r.name}</strong> {r.potency} — {r.dosage} {r.frequency} × {r.duration}</div>
                    ))}
                  </div>
                  {previewData.diet.length > 0 && (
                    <div style={{marginTop:8,color:'rgba(255,255,255,.5)'}}>⚠ Avoid: {previewData.diet.join(', ')}</div>
                  )}
                  {previewData.instructions && (
                    <div style={{marginTop:4,color:'rgba(255,255,255,.5)'}}>📋 {previewData.instructions}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Rx History */}
          <div className="card">
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📋</div>
                <div><div className="card-title" style={{fontFamily:'var(--font-display)'}}>Prescription History</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>for {p.name}</div></div>
              </div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th>Date</th><th>Remedy</th><th>Potency</th><th>Duration</th><th>Response</th><th>Status</th></tr></thead>
                <tbody>
                  {patientRxHistory.map((rx,i) => (
                    <tr key={i} style={{cursor:'pointer'}}>
                      <td style={{whiteSpace:'nowrap',fontWeight:600}}>{rx.date}</td>
                      <td style={{fontWeight:600}}>{rx.remedies}</td>
                      <td>{rx.potency}</td>
                      <td>{rx.duration}</td>
                      <td><span className={`resp-pill ${rx.response}`}>{rx.response.charAt(0).toUpperCase()+rx.response.slice(1)}</span></td>
                      <td><span className={`pill ${rx.status==='active'?'active':'inactive'}`}>{rx.status==='active'?'Active':'Completed'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Documents */}
          <div className="card" style={{marginTop:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'var(--forest-bg)',color:'var(--forest)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>📁</div>
                <div><div className="card-title">Clinical Documents</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Attached reports</div></div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => showToast('Upload — coming soon')}>+ Upload</button>
            </div>
            <div>
              <div className="doc-row"><div className="doc-icon" style={{background:'#ebf5fb',color:'#2980b9'}}>📄</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>Constitutional Case Analysis</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>PDF · 2.4 MB · Dr. Rizwan</div></div><button className="btn btn-ghost btn-xs">⬇</button></div>
              <div className="doc-row"><div className="doc-icon" style={{background:'#eafaf1',color:'var(--forest)'}}>🧪</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>Lab Results — CBC &amp; IgE</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>PDF · 1.1 MB · Feb 3, 2026</div></div><button className="btn btn-ghost btn-xs">⬇</button></div>
              <div className="doc-row" style={{borderBottom:'none'}}><div className="doc-icon" style={{background:'#fff4e0',color:'var(--gold)'}}>📸</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500}}>Sinus CT Scan Report</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>DICOM · 8.7 MB</div></div><button className="btn btn-ghost btn-xs">⬇</button></div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="card" style={{marginTop:16}}>
            <div className="card-header">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:7,background:'#f3eff8',color:'#7b5ea7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🕐</div>
                <div><div className="card-title">Audit Log</div><div style={{fontSize:10.5,color:'var(--slate-soft)'}}>Change history</div></div>
              </div>
            </div>
            <div>
              <div className="audit-row"><div className="audit-dot" style={{background:'var(--forest)'}}></div><div className="audit-text"><strong>Dr. Rizwan</strong> prescribed Nat. Mur 200C</div><div className="audit-time">2 hrs ago</div></div>
              <div className="audit-row"><div className="audit-dot" style={{background:'var(--sapphire)'}}></div><div className="audit-text"><strong>Dr. Amina</strong> reviewed case</div><div className="audit-time">Yesterday</div></div>
              <div className="audit-row" style={{borderBottom:'none'}}><div className="audit-dot" style={{background:'var(--gold)'}}></div><div className="audit-text"><strong>System</strong> auto-generated follow-up</div><div className="audit-time">3 days ago</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
