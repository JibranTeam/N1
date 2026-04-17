"use client";
import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { AI_RESPONSES } from '@/lib/constants';

export default function AIChatFrame() {
  const { showToast } = useApp();
  const [messages, setMessages] = useState<{from:'user'|'ai';text:string}[]>([]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if(chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const msg = input; setInput('');
    setMessages(prev => [...prev, {from:'user',text:msg}]);
    setTimeout(() => {
      const ml = msg.toLowerCase();
      let reply = AI_RESPONSES.default;
      if (ml.includes('psoric')) reply = AI_RESPONSES.psoric;
      if (ml.includes('ayesha')) reply = AI_RESPONSES.ayesha;
      if (ml.includes('improvement') || ml.includes('no improve')) reply = AI_RESPONSES.improvement;
      setMessages(prev => [...prev, {from:'ai',text:reply}]);
    }, 600);
  };

  return (
    <div className="frame active" id="frame-ai_chat">
      <div className="page-hdr"><div className="page-hdr-left"><h2>💬 AI Consult Chat</h2><p>Real-time consultation with AI clinical assistant</p></div></div>
      <div className="ai-panel" style={{height:'calc(100vh - 200px)',display:'flex',flexDirection:'column'}}>
        <div className="ai-header"><div className="ai-orb">🤖</div><div><div className="ai-title">HerbaMed AI</div><div className="ai-subtitle">Ready to assist</div></div><div className="ai-badge">⚡ Live</div></div>
        <div ref={chatRef} className="ai-body" style={{flex:1,overflowY:'auto',padding:18}}>
          {messages.length === 0 && <div style={{textAlign:'center',padding:'40px 0',color:'rgba(253,252,249,.4)'}}><div style={{fontSize:40,marginBottom:12}}>💬</div><div>Ask about remedies, cases, or miasms</div></div>}
          {messages.map((m,i) => m.from==='user' ? (
            <div key={i} style={{textAlign:'right',marginBottom:8}}><span style={{background:'var(--ht-primary)',color:'white',borderRadius:8,padding:'6px 12px',fontSize:12,display:'inline-block'}}>{m.text}</span></div>
          ) : (
            <div key={i} style={{background:'var(--ht-primary-bg)',borderRadius:8,padding:'8px 12px',marginBottom:8,color:'var(--ht-primary-dark)',fontSize:12}}>🤖 {m.text}</div>
          ))}
        </div>
        <div style={{padding:'12px 18px',borderTop:'1px solid rgba(255,255,255,.07)',display:'flex',gap:8}}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()} placeholder="Ask about remedies, cases, miasms..." style={{flex:1,padding:'10px 14px',background:'rgba(255,255,255,0.07)',border:'1.5px solid rgba(255,255,255,0.12)',borderRadius:'var(--radius-sm)',color:'var(--cream)',fontFamily:'var(--font-body)',fontSize:13,outline:'none'}} />
          <button className="ai-suggest-btn" style={{padding:'10px 20px'}} onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}
