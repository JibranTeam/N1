"use client";
import { useApp } from '@/context/AppContext';
import { useClinicSetup } from '@/hooks/useClinicSetup';

export default function ClinicSetupFrame() {
  const { showToast, showFrame } = useApp();
  const {
    currentStep, completedSteps, isComplete,
    clinicName, setClinicName, ownerName, setOwnerName,
    license, setLicense, clinicType, setClinicType,
    specialization, setSpecialization,
    phone, setPhone, email, setEmail, address, setAddress,
    logo, setLogo, themeColor, setThemeColor,
    hours, toggleDay, updateDayTime,
    features, toggleFeature,
    goStep, nextStep, prevStep, completeSetup,
  } = useClinicSetup();

  const steps = [
    { num:1, label:'Clinic Info', icon:'🏥' },
    { num:2, label:'Branding', icon:'🎨' },
    { num:3, label:'Hours & Location', icon:'🕐' },
    { num:4, label:'Team', icon:'👥' },
    { num:5, label:'Features', icon:'⚡' },
  ];

  return (
    <div className="frame active" id="frame-clinic_setup">
      <div className="page-hdr">
        <div className="page-hdr-left">
          <h2><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline-flex',flexShrink:0,verticalAlign:'middle',marginRight:7,opacity:.75}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15"/></svg>Clinic Setup</h2>
          <p>Configure your clinic in 5 simple steps</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{display:'flex',gap:4,marginBottom:24,background:'var(--white)',borderRadius:'var(--radius)',padding:6,border:'1px solid var(--border-light)',boxShadow:'var(--shadow)'}}>
        {steps.map((s,i) => (
          <button key={s.num} onClick={() => goStep(s.num)} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'12px 8px',borderRadius:'var(--radius-sm)',border:'none',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:12,fontWeight:600,transition:'all .2s',background:currentStep===s.num?'var(--forest)':completedSteps.has(s.num)?'var(--forest-bg)':'transparent',color:currentStep===s.num?'white':completedSteps.has(s.num)?'var(--forest)':'var(--slate-soft)'}}>
            <span style={{fontSize:16}}>{completedSteps.has(s.num) && currentStep!==s.num ? '✓' : s.icon}</span>
            <span className="setup-step-label">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="card">
        <div className="card-body" style={{padding:24}}>

          {/* Step 1: Clinic Info */}
          {currentStep === 1 && (
            <div>
              <h3 style={{fontSize:16,fontWeight:700,color:'var(--slate)',marginBottom:4}}>🏥 Clinic Information</h3>
              <p style={{fontSize:12.5,color:'var(--slate-soft)',marginBottom:20}}>Basic details about your practice</p>
              <div className="form-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                <div className="fg"><label>Clinic Name *</label><input type="text" value={clinicName} onChange={e=>setClinicName(e.target.value)} style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,outline:'none'}} /></div>
                <div className="fg"><label>Owner / Lead Doctor *</label><input type="text" value={ownerName} onChange={e=>setOwnerName(e.target.value)} style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,outline:'none'}} /></div>
                <div className="fg"><label>License Number</label><input type="text" value={license} onChange={e=>setLicense(e.target.value)} placeholder="HC-XXXXXX" style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,outline:'none'}} /></div>
                <div className="fg"><label>Clinic Type</label><select value={clinicType} onChange={e=>setClinicType(e.target.value)} style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,outline:'none'}}><option>Homeopathic Clinic</option><option>Multi-specialty</option><option>Solo Practice</option></select></div>
                <div className="fg"><label>Phone</label><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+92-XXX-XXXXXXX" style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,outline:'none'}} /></div>
                <div className="fg"><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="clinic@email.com" style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,outline:'none'}} /></div>
                <div className="fg" style={{gridColumn:'1/-1'}}><label>Address</label><textarea value={address} onChange={e=>setAddress(e.target.value)} placeholder="Full clinic address" style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13.5,outline:'none',resize:'vertical',minHeight:60,boxSizing:'border-box'}} /></div>
              </div>
            </div>
          )}

          {/* Step 2: Branding */}
          {currentStep === 2 && (
            <div>
              <h3 style={{fontSize:16,fontWeight:700,color:'var(--slate)',marginBottom:4}}>🎨 Branding & Appearance</h3>
              <p style={{fontSize:12.5,color:'var(--slate-soft)',marginBottom:20}}>Customize your clinic's visual identity</p>
              <div className="form-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                <div className="fg"><label>Logo Upload</label><div style={{border:'2px dashed var(--slate-pale)',borderRadius:'var(--radius-sm)',padding:24,textAlign:'center',cursor:'pointer'}} onClick={() => showToast('Logo upload — drag & drop supported')}><div style={{fontSize:32,marginBottom:8}}>🖼️</div><div style={{fontSize:12,color:'var(--slate-soft)'}}>Click to upload or drag & drop</div><div style={{fontSize:10,color:'var(--slate-soft)',marginTop:4}}>PNG, JPG up to 2MB</div></div></div>
                <div className="fg"><label>Theme Color</label><div style={{display:'flex',alignItems:'center',gap:12,marginTop:8}}><input type="color" value={themeColor} onChange={e=>setThemeColor(e.target.value)} style={{width:48,height:48,borderRadius:8,border:'2px solid var(--slate-pale)',cursor:'pointer',padding:2}} /><div><div style={{fontSize:13,fontWeight:600}}>{themeColor}</div><div style={{fontSize:11,color:'var(--slate-soft)'}}>Primary brand color</div></div></div></div>
              </div>
            </div>
          )}

          {/* Step 3: Hours */}
          {currentStep === 3 && (
            <div>
              <h3 style={{fontSize:16,fontWeight:700,color:'var(--slate)',marginBottom:4}}>🕐 Operating Hours</h3>
              <p style={{fontSize:12.5,color:'var(--slate-soft)',marginBottom:20}}>Set your weekly schedule</p>
              <div style={{border:'1px solid var(--slate-pale)',borderRadius:'var(--radius-sm)',overflow:'hidden'}}>
                {hours.map((h,i) => (
                  <div key={h.day} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',borderBottom:i<hours.length-1?'1px solid var(--slate-pale)':'none',background:h.enabled?'white':'var(--surface-alt)',opacity:h.enabled?1:.6}}>
                    <div style={{width:100,fontSize:13,fontWeight:600}}>{h.day}</div>
                    <button className={`tog-sw ${h.enabled?'on':''}`} onClick={() => toggleDay(i)}><span className="tog-knob"></span></button>
                    <input type="time" value={h.open} onChange={e => updateDayTime(i,'open',e.target.value)} disabled={!h.enabled} style={{padding:'6px 8px',border:'1px solid var(--slate-pale)',borderRadius:6,fontFamily:'var(--font-body)',fontSize:12,outline:'none'}} />
                    <span style={{fontSize:12,color:'var(--slate-soft)'}}>to</span>
                    <input type="time" value={h.close} onChange={e => updateDayTime(i,'close',e.target.value)} disabled={!h.enabled} style={{padding:'6px 8px',border:'1px solid var(--slate-pale)',borderRadius:6,fontFamily:'var(--font-body)',fontSize:12,outline:'none'}} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Team */}
          {currentStep === 4 && (
            <div>
              <h3 style={{fontSize:16,fontWeight:700,color:'var(--slate)',marginBottom:4}}>👥 Team Members</h3>
              <p style={{fontSize:12.5,color:'var(--slate-soft)',marginBottom:20}}>Manage who has access to your clinic</p>
              <div style={{textAlign:'center',padding:'30px 0'}}>
                <div style={{fontSize:40,marginBottom:8}}>👥</div>
                <p style={{fontSize:13,color:'var(--slate-soft)',marginBottom:12}}>Team management is available in the <strong style={{color:'var(--forest)',cursor:'pointer'}} onClick={() => showFrame('team')}>Team & Roles</strong> section.</p>
                <button className="btn btn-outline btn-sm" onClick={() => showFrame('team')}>Go to Team & Roles →</button>
              </div>
            </div>
          )}

          {/* Step 5: Features */}
          {currentStep === 5 && (
            <div>
              <h3 style={{fontSize:16,fontWeight:700,color:'var(--slate)',marginBottom:4}}>⚡ Features & Modules</h3>
              <p style={{fontSize:12.5,color:'var(--slate-soft)',marginBottom:20}}>Enable or disable modules for your clinic</p>
              <div style={{display:'flex',flexDirection:'column',gap:1}}>
                {features.map((f,i) => (
                  <div key={f.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px',background:'white',borderBottom:i<features.length-1?'1px solid var(--border-light)':'none',borderRadius:i===0?'var(--radius-sm) var(--radius-sm) 0 0':i===features.length-1?'0 0 var(--radius-sm) var(--radius-sm)':0}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
                        <span style={{fontSize:14,fontWeight:600}}>{f.name}</span>
                        {f.badge && <span style={{fontSize:9,fontWeight:700,padding:'2px 7px',borderRadius:4,background:f.badge==='Recommended'?'var(--forest-bg)':f.badge==='Pro'?'var(--gold-pale)':'var(--sapphire-pale)',color:f.badge==='Recommended'?'var(--forest)':f.badge==='Pro'?'var(--gold)':'var(--sapphire)'}}>{f.badge}</span>}
                      </div>
                      <div style={{fontSize:11.5,color:'var(--slate-soft)',lineHeight:1.4}}>{f.description}</div>
                    </div>
                    <button className={`tog-sw ${f.enabled?'on':''}`} onClick={() => toggleFeature(f.id)}><span className="tog-knob"></span></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{display:'flex',justifyContent:'space-between',marginTop:24,paddingTop:16,borderTop:'1px solid var(--slate-pale)'}}>
            <button className="btn btn-ghost btn-sm" onClick={prevStep} style={{visibility:currentStep===1?'hidden':'visible'}}>← Previous</button>
            {currentStep < 5 ? (
              <button className="btn btn-primary btn-sm" onClick={nextStep}>Next Step →</button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => { completeSetup(); showToast('🎉 Clinic setup complete!','success'); }} style={{background:'var(--forest)',padding:'10px 24px'}}>✅ Complete Setup</button>
            )}
          </div>
        </div>
      </div>

      {/* Completion Card */}
      {isComplete && (
        <div className="card" style={{marginTop:18,padding:24,textAlign:'center',background:'var(--forest-bg)',border:'2px solid var(--forest-pale)'}}>
          <div style={{fontSize:48,marginBottom:8}}>🎉</div>
          <h3 style={{fontSize:18,fontWeight:700,color:'var(--forest)',marginBottom:6}}>Setup Complete!</h3>
          <p style={{fontSize:13,color:'var(--slate-soft)',marginBottom:16}}>Your clinic is configured and ready. You can adjust settings anytime.</p>
          <button className="btn btn-primary btn-sm" onClick={() => showFrame('dashboard')}>Go to Dashboard →</button>
        </div>
      )}
    </div>
  );
}
