"use client";
import { useState, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { IconBot } from '@/lib/icons';

export default function AIAssistantFrame() {
  const { showToast } = useApp();
  const [symptoms, setSymptoms] = useState('');
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [miasm, setMiasm] = useState('Psoric');
  const [caseType, setCaseType] = useState('Acute');
  const [patient, setPatient] = useState('Ayesha Farooq (PID-001)');
  const [status, setStatus] = useState('Waiting…');
  const [results, setResults] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleTag = useCallback((tag: string) => {
    setTags(prev => {
      const next = new Set(Array.from(prev));
      if (next.has(tag)) next.delete(tag); else next.add(tag);
      return next;
    });
  }, []);

  const runAI = useCallback(() => {
    if (!symptoms.trim() && tags.size === 0) { showToast('Please describe symptoms', 'warning'); return; }
    setLoading(true);
    setStatus('Analyzing…');
    setTimeout(() => {
      setLoading(false);
      setStatus('✓ Complete');
      setResults(`<div style="margin-bottom:18px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:rgba(253,252,249,.5);margin-bottom:8px;font-weight:700">Primary Recommendation</div>
        <div style="background:rgba(90,158,112,.12);border:1px solid rgba(90,158,112,.25);border-radius:10px;padding:14px 16px;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><strong style="color:#5a9e70;font-size:15px">Natrum Muriaticum 200C</strong><span style="background:rgba(90,158,112,.2);color:#5a9e70;font-size:10px;padding:2px 8px;border-radius:12px;font-weight:700">92% Match</span></div>
          <div style="font-size:12px;color:rgba(253,252,249,.6);line-height:1.6">Constitutional remedy for ${miasm} miasm. Key indicators: grief history, reserved personality, desire for salt, headaches worse in sun. Dosage: 2 drops BD × 14 days.</div>
        </div>
        <div style="background:rgba(41,128,185,.12);border:1px solid rgba(41,128,185,.25);border-radius:10px;padding:14px 16px;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><strong style="color:#3498db;font-size:15px">Pulsatilla 30C</strong><span style="background:rgba(41,128,185,.2);color:#3498db;font-size:10px;padding:2px 8px;border-radius:12px;font-weight:700">85% Match</span></div>
          <div style="font-size:12px;color:rgba(253,252,249,.6);line-height:1.6">Intercurrent remedy for changeable symptoms. Weeping disposition, thirstless, desires open air. Dosage: 3 drops TDS × 7 days.</div>
        </div>
        <div style="background:rgba(196,136,58,.12);border:1px solid rgba(196,136,58,.25);border-radius:10px;padding:14px 16px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><strong style="color:#c4883a;font-size:15px">Sulphur 30C</strong><span style="background:rgba(196,136,58,.2);color:#c4883a;font-size:10px;padding:2px 8px;border-radius:12px;font-weight:700">78% Match</span></div>
          <div style="font-size:12px;color:rgba(253,252,249,.6);line-height:1.6">Anti-psoric base remedy. Consider as constitutional support if skin symptoms present. Dosage: 2 drops OD × 21 days.</div>
        </div>
      </div>`);
      showToast('AI analysis complete');
    }, 1500);
  }, [symptoms, tags, miasm, showToast]);

  const TAGS = ['Headache','Anxiety','Digestive','Skin Issues','Joint Pain','Fever','Cough','Sleep Issues','Allergies','Fatigue'];

  return (
    <div className="frame active" id="frame-ai_assistant">
      <div className="page-hdr">
        <div className="page-hdr-left"><h2><IconBot size={18} />AI Prescription Assistant</h2><p style={{whiteSpace:'normal',overflowWrap:'break-word'}}>Intelligent remedy suggestions based on symptoms, miasm &amp; past cases</p></div>
      </div>
      <div className="grid2">
        {/* Input Panel */}
        <div className="ai-panel">
          <div className="ai-header">
            <div className="ai-orb">🧠</div>
            <div><div className="ai-title">HerbaMed AI Engine</div><div className="ai-subtitle">Trained on 50,000+ homeopathic cases</div></div>
            <div className="ai-badge">⚡ Pro</div>
          </div>
          <div className="ai-body">
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:'rgba(253,252,249,0.5)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,fontWeight:700}}>Select Patient</div>
              <select style={{marginTop:20,width:'100%',padding:'10px 14px',background:'rgba(255,255,255,0.07)',border:'1.5px solid rgba(255,255,255,0.12)',borderRadius:'var(--radius-sm)',color:'var(--cream)',fontFamily:'var(--font-body)',fontSize:14,outline:'none'}} value={patient} onChange={e=>setPatient(e.target.value)}>
                <option style={{background:'#1c2b3a'}}>Ayesha Farooq (PID-001)</option>
                <option style={{background:'#1c2b3a'}}>Bilal Chaudhry (PID-002)</option>
              </select>
            </div>
            <div style={{fontSize:12,color:'rgba(253,252,249,0.5)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,fontWeight:700}}>Describe Symptoms</div>
            <textarea className="ai-symptom-input" placeholder="e.g. Chronic headache worse in morning, throbbing, worse with motion, better lying still, irritable, oversensitive to noise..." rows={4} value={symptoms} onChange={e=>setSymptoms(e.target.value)} />
            <div style={{fontSize:12,color:'rgba(253,252,249,0.5)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,fontWeight:700}}>Quick Symptom Tags</div>
            <div className="ai-tags">
              {TAGS.map(t => <span key={t} className={`ai-tag ${tags.has(t)?'active':''}`} onClick={()=>toggleTag(t)}>{t}</span>)}
            </div>
            <div style={{margin:'14px 0'}}>
              <div style={{fontSize:12,color:'rgba(253,252,249,0.5)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8,fontWeight:700}}>Miasm &amp; Constitution</div>
              <div style={{display:'flex',gap:8}}>
                <select style={{flex:1,padding:'8px 12px',background:'rgba(255,255,255,0.07)',border:'1.5px solid rgba(255,255,255,0.12)',borderRadius:'var(--radius-sm)',color:'var(--cream)',fontFamily:'var(--font-body)',fontSize:13,outline:'none'}} value={miasm} onChange={e=>setMiasm(e.target.value)}>
                  <option style={{background:'#1c2b3a'}}>Psoric</option><option style={{background:'#1c2b3a'}}>Sycotic</option><option style={{background:'#1c2b3a'}}>Syphilitic</option><option style={{background:'#1c2b3a'}}>Mixed</option>
                </select>
                <select style={{flex:1,padding:'8px 12px',background:'rgba(255,255,255,0.07)',border:'1.5px solid rgba(255,255,255,0.12)',borderRadius:'var(--radius-sm)',color:'var(--cream)',fontFamily:'var(--font-body)',fontSize:13,outline:'none'}} value={caseType} onChange={e=>setCaseType(e.target.value)}>
                  <option style={{background:'#1c2b3a'}}>Acute</option><option style={{background:'#1c2b3a'}}>Chronic</option><option style={{background:'#1c2b3a'}}>Constitutional</option>
                </select>
              </div>
            </div>
            <button className="ai-suggest-btn" onClick={runAI} disabled={loading}>{loading ? '⏳ Analyzing…' : '🧠 Generate AI Suggestions'}</button>
          </div>
        </div>

        {/* Results Panel */}
        <div>
          <div className="ai-panel" style={{marginBottom:16}}>
            <div style={{padding:'12px 18px',background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:10,color:'rgba(90,158,112,0.7)',textTransform:'uppercase',letterSpacing:'.12em',fontWeight:800}}>AI Suggestions</span>
              <span style={{fontSize:10,background:'rgba(255,255,255,0.07)',color:'rgba(253,252,249,0.45)',padding:'2px 9px',borderRadius:20}}>{status}</span>
            </div>
            <div className="ai-body">
              {!results ? (
                <div style={{textAlign:'center',padding:'30px 0'}}>
                  <div style={{fontSize:40,marginBottom:12}}>🌿</div>
                  <div style={{fontSize:14,color:'rgba(253,252,249,0.4)'}}>Enter symptoms and click<br/><strong style={{color:'rgba(253,252,249,0.7)'}}>Generate AI Suggestions</strong></div>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{__html: results}} />
              )}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">📚 AI Learning Insights</div></div>
            <div className="card-body" style={{fontSize:'13.5px',color:'var(--slate-soft)',display:'flex',flexDirection:'column',gap:10}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span>Cases analyzed from your clinic</span><strong style={{color:'var(--forest)'}}>186</strong></div>
              <div className="stock-bar" style={{margin:'-4px 0 4px'}}><div className="stock-fill" style={{width:'74%'}}></div></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span>AI accuracy score</span><strong style={{color:'var(--forest)'}}>91.4%</strong></div>
              <div className="stock-bar" style={{margin:'-4px 0 4px'}}><div className="stock-fill" style={{width:'91%'}}></div></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span>Most used remedy (your clinic)</span><strong style={{color:'var(--forest)'}}>Sulphur 30C</strong></div>
              <div className="divider" style={{margin:'4px 0'}}></div>
              <div className="alert success" style={{margin:0}}><span className="a-icon">🧠</span><div className="a-text"><strong>Model updated</strong><span>AI learned from 4 new cases this week.</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
