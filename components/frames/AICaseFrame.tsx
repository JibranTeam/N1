"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function AICaseFrame() {
  const { showToast } = useApp();
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!symptoms.trim()) { showToast('Enter symptoms', 'warning'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(`<div style="margin-bottom:12px"><strong style="color:#5a9e70">Differential Diagnosis</strong></div>
        <div style="margin-bottom:8px">1. <strong>Psoric Sinusitis</strong> — 78% confidence. Key: nasal congestion, headaches worse morning, allergic tendency.</div>
        <div style="margin-bottom:8px">2. <strong>Sycotic Respiratory</strong> — 15% confidence. Consider if excessive discharge or wart history present.</div>
        <div style="margin-bottom:8px">3. <strong>Tubercular Tendency</strong> — 7% confidence. Check for family history of TB, restlessness, desire for travel.</div>
        <div style="margin-top:14px;padding:10px 14px;background:rgba(90,158,112,.1);border-radius:8px;font-size:12px"><strong>Recommended:</strong> Start with Kali Bich 30C for acute, then constitutional assessment for Nat. Mur or Sulphur.</div>`);
    }, 1200);
  };

  return (
    <div className="frame active" id="frame-ai_case">
      <div className="page-hdr"><div className="page-hdr-left"><h2>🔍 Case Analyzer</h2><p>AI-powered differential diagnosis & case analysis</p></div></div>
      <div className="grid2">
        <div className="ai-panel"><div className="ai-header"><div className="ai-orb">🔍</div><div><div className="ai-title">Case Input</div><div className="ai-subtitle">Enter symptoms for analysis</div></div></div>
          <div className="ai-body"><textarea className="ai-symptom-input" rows={6} placeholder="Enter detailed symptom picture: modalities, concomitants, mental symptoms, generals..." value={symptoms} onChange={e => setSymptoms(e.target.value)} />
            <button className="ai-suggest-btn" onClick={analyze} disabled={loading}>{loading ? '⏳ Analyzing…' : '🔍 Run Case Analysis'}</button>
          </div>
        </div>
        <div className="ai-panel"><div style={{padding:'12px 18px',background:'rgba(255,255,255,.03)',borderBottom:'1px solid rgba(255,255,255,.07)'}}><span style={{fontSize:10,textTransform:'uppercase',letterSpacing:'.1em',color:'rgba(90,158,112,.7)',fontWeight:800}}>Analysis Results</span></div>
          <div className="ai-body">{result ? <div dangerouslySetInnerHTML={{__html:result}} style={{fontSize:13,color:'rgba(253,252,249,.8)',lineHeight:1.6}} /> : <div style={{textAlign:'center',padding:30,color:'rgba(253,252,249,.3)'}}>Enter symptoms and run analysis</div>}</div>
        </div>
      </div>
    </div>
  );
}
