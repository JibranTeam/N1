"use client";
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

const REMEDIES = ['Natrum Muriaticum','Sulphur','Pulsatilla','Lycopodium','Arsenicum Album','Thuja','Ignatia','Sepia','Phosphorus','Calcarea Carb'];
const PROFILES: Record<string,string> = {
  'Natrum Muriaticum': 'Constitutional polycrest. Key themes: grief, reserved personality, aversion to consolation, desire for salt, headaches worse in sun. Thermal: hot patient. Miasm: Psoric. Complementary: Ignatia, Sepia. Antidote: Nux Vomica.',
  'Sulphur': 'King of anti-psorics. Burning sensations, skin eruptions, philosophical nature, untidy, worse bathing, 11AM hunger. Hot patient. Often starts chronic treatment.',
  'Pulsatilla': 'Emotional, weeping disposition. Changeable symptoms, thirstless, desires open air, worse warm rooms, bland discharges. For hormonal and respiratory complaints.',
};

export default function AIRemedyFrame() {
  const { showToast } = useApp();
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const explain = (remedy: string) => {
    setSelected(remedy); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(PROFILES[remedy] || `${remedy}: Deep-acting polycrest remedy. Full materia medica profile available in Knowledge Library. Click to explore detailed proving symptoms, keynotes, and clinical applications.`);
    }, 800);
  };

  return (
    <div className="frame active" id="frame-ai_remedy">
      <div className="page-hdr"><div className="page-hdr-left"><h2>📖 Remedy Explainer</h2><p>AI-powered materia medica with clinical insights</p></div></div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:18}}>
        {REMEDIES.map(r => <button key={r} className={`btn btn-sm ${selected===r?'btn-primary':'btn-outline'}`} onClick={() => explain(r)}>{r}</button>)}
      </div>
      <div className="ai-panel"><div className="ai-header"><div className="ai-orb">📖</div><div><div className="ai-title">{selected || 'Select a Remedy'}</div><div className="ai-subtitle">AI materia medica profile</div></div></div>
        <div className="ai-body" style={{minHeight:200}}>
          {loading ? <div style={{textAlign:'center',padding:30,color:'rgba(253,252,249,.4)'}}>⏳ Generating profile…</div> :
           result ? <div style={{fontSize:13,color:'rgba(253,252,249,.8)',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{result}</div> :
           <div style={{textAlign:'center',padding:40,color:'rgba(253,252,249,.3)'}}><div style={{fontSize:40,marginBottom:12}}>📖</div><div>Select a remedy above to view its AI-powered profile</div></div>}
        </div>
      </div>
    </div>
  );
}
