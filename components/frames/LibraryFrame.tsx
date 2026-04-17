"use client";
import { useApp } from '@/context/AppContext';
import { useLibrary } from '@/hooks/useLibrary';

export default function LibraryFrame() {
  const { showToast } = useApp();
  const {
    query, results, aiAnswer,
    books, removedBooks,
    activeBook, activeBookData,
    sidebarOpen, recentSearches, recentOpen,
    onQuery, clearQuery,
    toggleBook, toggleSidebar, toggleRecent,
    removeRecentSearch, clearRecentSearches,
    removeBook, permanentlyDelete, restoreBook, restoreAll,
  } = useLibrary();

  return (
    <div className="frame active" id="frame-library" style={{padding:0,margin:0}}>
      <div className="lib-layout" style={{display:'flex',height:'100%',minHeight:'calc(100vh - 64px)'}}>
        {/* SIDEBAR */}
        <div className="lib-sidebar" style={{width:sidebarOpen?260:0,overflow:'hidden',transition:'width .25s ease',borderRight:sidebarOpen?'1px solid var(--border-light)':'none',background:'var(--surface-alt)',flexShrink:0}}>
          <div style={{padding:'16px 14px'}}>
            <div style={{fontSize:14,fontWeight:700,color:'var(--slate)',marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span>📚 Library</span>
              <button onClick={toggleSidebar} style={{background:'none',border:'none',cursor:'pointer',fontSize:14,color:'var(--slate-soft)'}}>◀</button>
            </div>

            {/* Books */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8}}>BOOKS ({books.length})</div>
              {books.map(b => (
                <div key={b.id} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:6,cursor:'pointer',marginBottom:2,background:activeBook===b.name?'var(--forest-bg)':'transparent',color:activeBook===b.name?'var(--forest)':'var(--slate)'}} onClick={() => toggleBook(b.name)}>
                  <span style={{fontSize:16}}>{b.icon}</span>
                  <div style={{flex:1,overflow:'hidden'}}>
                    <div style={{fontSize:12,fontWeight:activeBook===b.name?600:400,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{b.name}</div>
                    <div style={{fontSize:9,color:'var(--slate-soft)'}}>{b.category} · {b.pages}p</div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); removeBook(b.id); showToast(`"${b.name}" removed`); }} style={{background:'none',border:'none',cursor:'pointer',fontSize:12,color:'var(--slate-soft)',opacity:0.5,padding:'2px 4px'}} title="Remove">×</button>
                </div>
              ))}
            </div>

            {/* Removed Books */}
            {removedBooks.length > 0 && (
              <div>
                <div style={{fontSize:10,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:8}}>REMOVED ({removedBooks.length})</div>
                {removedBooks.map(b => (
                  <div key={b.id} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 10px',borderRadius:6,marginBottom:2,opacity:.6}}>
                    <span style={{fontSize:14}}>{b.icon}</span>
                    <div style={{flex:1,fontSize:11,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{b.name}</div>
                    <button onClick={() => { restoreBook(b.id); showToast(`"${b.name}" restored`); }} style={{background:'none',border:'none',cursor:'pointer',fontSize:9,color:'var(--forest)',fontWeight:600}}>Restore</button>
                    <button onClick={() => { permanentlyDelete(b.id); showToast(`"${b.name}" permanently deleted`,'error'); }} style={{background:'none',border:'none',cursor:'pointer',fontSize:9,color:'var(--crimson)',fontWeight:600}}>Delete</button>
                  </div>
                ))}
                <button onClick={() => { restoreAll(); showToast('All books restored'); }} style={{width:'100%',padding:'6px',borderRadius:6,border:'1px solid var(--border-light)',background:'white',fontSize:10,fontWeight:600,color:'var(--forest)',cursor:'pointer',marginTop:4}}>Restore All</button>
              </div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{flex:1,padding:'20px 24px',overflowY:'auto'}}>
          {/* Toggle sidebar button when collapsed */}
          {!sidebarOpen && (
            <button onClick={toggleSidebar} style={{position:'absolute',left:4,top:'50%',transform:'translateY(-50%)',background:'var(--forest-bg)',border:'1px solid var(--forest-pale)',borderRadius:'0 6px 6px 0',padding:'8px 4px',cursor:'pointer',fontSize:12,color:'var(--forest)',zIndex:10}}>▶</button>
          )}

          {/* Search Bar */}
          <div style={{position:'relative',marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',background:'white',border:'2px solid var(--forest-pale)',borderRadius:12,boxShadow:'0 2px 12px rgba(45,90,61,.08)'}}>
              <svg width="16" height="16" fill="none" stroke="var(--forest)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" value={query} onChange={e => onQuery(e.target.value)} placeholder="Search remedies, materia medica, repertory…" style={{flex:1,border:'none',outline:'none',fontFamily:'var(--font-body)',fontSize:14,color:'var(--slate)',background:'transparent'}} />
              {query && <button onClick={clearQuery} style={{background:'none',border:'none',cursor:'pointer',fontSize:16,color:'var(--slate-soft)'}}>×</button>}
            </div>

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div style={{marginTop:8}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
                  <button onClick={toggleRecent} style={{background:'none',border:'none',cursor:'pointer',fontSize:11,fontWeight:600,color:'var(--slate-soft)'}}>
                    🕐 Recent Searches {recentOpen ? '▾' : '▸'}
                  </button>
                  {recentOpen && <button onClick={() => { clearRecentSearches(); showToast('Recent searches cleared'); }} style={{background:'none',border:'none',cursor:'pointer',fontSize:10,color:'var(--crimson)',fontWeight:600}}>Clear all</button>}
                </div>
                {recentOpen && (
                  <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                    {recentSearches.map((s,i) => (
                      <span key={i} style={{padding:'4px 10px',borderRadius:14,background:'var(--forest-bg)',color:'var(--forest)',fontSize:11,fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',gap:4}} onClick={() => onQuery(s)}>
                        {s}
                        <button onClick={e => { e.stopPropagation(); removeRecentSearch(s); }} style={{background:'none',border:'none',cursor:'pointer',fontSize:10,color:'var(--forest)',opacity:.5}}>×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* AI Answer */}
          {aiAnswer && (
            <div style={{background:'linear-gradient(135deg,#ebf5fb,#e8f8f5)',border:'1px solid #bfd9ec',borderRadius:12,padding:'16px 20px',marginBottom:20}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                <span style={{fontSize:18}}>🤖</span>
                <span style={{fontSize:12,fontWeight:700,color:'#2980b9'}}>AI Knowledge Assistant</span>
              </div>
              <div style={{fontSize:13,lineHeight:1.7,color:'var(--slate-mid)'}} dangerouslySetInnerHTML={{__html:aiAnswer.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}} />
            </div>
          )}

          {/* Search Results */}
          {query && results.length > 0 && (
            <div style={{marginBottom:20}}>
              <div style={{fontSize:11,fontWeight:700,color:'var(--slate-soft)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:10}}>SEARCH RESULTS ({results.length})</div>
              {results.map((r,i) => (
                <div key={i} style={{padding:'14px 18px',background:'white',borderRadius:10,marginBottom:8,border:'1px solid var(--border-light)',boxShadow:'0 1px 4px rgba(0,0,0,.04)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                    <span style={{fontSize:13,fontWeight:700,color:'var(--forest)'}}>{r.name}</span>
                    <span style={{fontSize:9,padding:'2px 6px',borderRadius:4,background:'var(--forest-bg)',color:'var(--forest)',fontWeight:600}}>{r.structured.type}</span>
                  </div>
                  <div style={{fontSize:12,color:'var(--slate-soft)',lineHeight:1.5}} dangerouslySetInnerHTML={{__html:r.snippet}} />
                </div>
              ))}
            </div>
          )}

          {query && results.length === 0 && !aiAnswer && (
            <div style={{textAlign:'center',padding:'40px 0',color:'var(--slate-soft)'}}>
              <div style={{fontSize:32,marginBottom:8}}>🔍</div>
              <div style={{fontSize:13}}>No results found for &ldquo;{query}&rdquo;</div>
            </div>
          )}

          {/* Book Content Viewer */}
          {activeBookData && !query && (
            <div style={{background:'white',borderRadius:12,border:'1px solid var(--border-light)',padding:'24px 28px',boxShadow:'0 2px 12px rgba(0,0,0,.04)'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <span style={{fontSize:28}}>{activeBookData.icon}</span>
                <div>
                  <div style={{fontSize:18,fontWeight:700,color:'var(--slate)'}}>{activeBookData.name}</div>
                  <div style={{fontSize:12,color:'var(--slate-soft)'}}>{activeBookData.category} · {activeBookData.pages} pages</div>
                </div>
              </div>
              <div style={{fontSize:13.5,lineHeight:1.8,color:'var(--slate-mid)'}}>
                {activeBookData.content.split('. ').map((sentence,i) => (
                  <span key={i}>{sentence.trim()}{i < activeBookData.content.split('. ').length-1 ? '. ' : ''}</span>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!query && !activeBookData && (
            <div style={{textAlign:'center',padding:'60px 0'}}>
              <div style={{fontSize:48,marginBottom:12}}>📚</div>
              <h3 style={{fontSize:18,fontWeight:700,color:'var(--slate)',marginBottom:6}}>Knowledge Library</h3>
              <p style={{fontSize:13,color:'var(--slate-soft)',lineHeight:1.6,maxWidth:400,margin:'0 auto'}}>Search homeopathic remedies, materia medica, repertory references, and miasmatic prescribing guides. AI-powered answers included.</p>
              <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:16,flexWrap:'wrap'}}>
                {['sulphur','natrum','sinusitis','psoric miasm'].map(term => (
                  <button key={term} onClick={() => onQuery(term)} style={{padding:'6px 14px',borderRadius:20,border:'1px solid var(--forest-pale)',background:'var(--forest-bg)',color:'var(--forest)',fontSize:12,fontWeight:500,cursor:'pointer'}}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast root for library */}
      <div id="lib-toast-root" style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',zIndex:10000}}></div>
    </div>
  );
}
