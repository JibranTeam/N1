"use client";
import { useApp } from '@/context/AppContext';
import { useModal } from '@/context/ModalContext';
import { usePatientList } from '@/hooks/usePatientList';
import { IconUsers, IconUserPlus, IconDownload } from '@/lib/icons';

export default function PatientListFrame() {
  const { showFrame, openPatientTimeline, showToast } = useApp();
  const { openModal } = useModal();
  const {
    pagedData, filtered, activeFilter, searchQuery, viewMode, selectedIds,
    currentPage, totalPages, pageNumbers, paginationInfo, quickProfilePatient, quickProfileIdx,
    setFilter, setSearchQuery, setView, setCurrentPage, sortByColumn,
    toggleSelect, toggleSelectAll, clearSelection, openQuickProfile, closeQuickProfile,
    exportAll, setMiasmFilter, setClinicFilter, applySort, sortKey,
  } = usePatientList();

  const kpis = [
    { label:'Total Patients', val:'124', sub:'All registered', cls:'kv-g', filter:'all' as const },
    { label:'Active', val:'89', sub:'Currently in treatment', cls:'kv-a', filter:'active' as const },
    { label:'New', val:'8', sub:'This month', cls:'kv-s', filter:'new' as const },
    { label:'Follow-up Due', val:'12', sub:'5 overdue', cls:'kv-b', filter:'follow-up' as const },
    { label:'Inactive', val:'15', sub:'No visit 30+ days', cls:'kv-p', filter:'inactive' as const },
  ];

  const nameToId: Record<string, string> = { 'Ayesha Farooq': 'ayesha', 'Ahmed Khan': 'bilal', 'Sara Malik': 'sana', 'Bilal Ahmad': 'khalid', 'Hina Akhtar': 'ayesha', 'Farhan Ali': 'bilal', 'Fatima Noor': 'sana' };

  return (
    <div className="frame active" id="frame-patient_list">
      {/* Green Header */}
      <nav className="ht-nav"><div className="ht-nav-left"><div className="ht-nav-links">
        <button className="ht-nav-link" onClick={() => showFrame('dashboard')}>Dashboard</button>
        <button className="ht-nav-link active" onClick={() => showFrame('patient_list')}>Patients</button>
        <button className="ht-nav-link" onClick={() => showFrame('prescriptions')}>Prescriptions</button>
        <button className="ht-nav-link" onClick={() => showFrame('appointments')}>Calendar</button>
        <button className="ht-nav-link" onClick={() => showFrame('analytics')}>Reports</button>
      </div></div></nav>

      <div className="page-hdr">
        <div className="page-hdr-left"><h2><IconUsers size={18} />Patients</h2><p>124 registered · 89 active</p></div>
        <div style={{ display:'flex', gap:8 }}>
          <button className="ht-btn ht-btn-primary" onClick={() => openModal('new-patient')}><IconUserPlus size={14} />+ New Patient</button>
          <button className="ht-btn ht-btn-outline" onClick={() => { const c = exportAll(); showToast(`Exported ${c} patients`); }}><IconDownload size={14} />Export</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="ht-kpi-row">
        {kpis.map(k => (
          <div key={k.filter} className={`ht-kpi ${activeFilter === k.filter ? 'kpi-selected' : ''}`} onClick={() => setFilter(k.filter)} style={{ cursor:'pointer' }}>
            <div className={`ht-kpi-value ${k.cls}`}>{k.val}</div>
            <div className="ht-kpi-label">{k.label}</div>
            <div className="ht-kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="toolbar" style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', marginBottom:16 }}>
        <div className="tb-search" style={{ flex:1, minWidth:200 }}>
          <span>🔍</span>
          <input type="text" placeholder="Search patients..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <div style={{ display:'flex', gap:4 }}>
          {(['all','active','new','follow-up','inactive'] as const).map(f => (
            <button key={f} className={`ht-btn ht-btn-sm ${activeFilter === f ? 'ht-btn-primary' : 'ht-btn-ghost'}`} onClick={() => setFilter(f)}>{f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
        <select style={{ padding:'6px 12px', border:'1px solid var(--slate-pale)', borderRadius:'var(--radius-sm)', fontSize:12 }} value={sortKey} onChange={e => applySort(e.target.value as any)}>
          <option value="default">Default Sort</option><option value="name">Name A–Z</option><option value="score-d">Score ↓</option><option value="score-a">Score ↑</option>
        </select>
        <div style={{ display:'flex', gap:2, background:'var(--white)', border:'1px solid var(--slate-pale)', borderRadius:'var(--radius-sm)', padding:2 }}>
          <button className={`ht-btn ht-btn-sm ${viewMode === 'table' ? 'ht-btn-primary' : 'ht-btn-ghost'}`} onClick={() => setView('table')}>☰</button>
          <button className={`ht-btn ht-btn-sm ${viewMode === 'cards' ? 'ht-btn-primary' : 'ht-btn-ghost'}`} onClick={() => setView('cards')}>⊞</button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="card">
          <div className="tbl-wrap"><table>
            <thead><tr>
              <th style={{ width:30 }}><input type="checkbox" onChange={toggleSelectAll} /></th>
              <th onClick={() => sortByColumn('name')} style={{ cursor:'pointer' }}>Patient</th>
              <th>Conditions</th>
              <th onClick={() => sortByColumn('miasm')} style={{ cursor:'pointer' }}>Miasm</th>
              <th onClick={() => sortByColumn('score')} style={{ cursor:'pointer' }}>Score</th>
              <th>Status</th>
              <th>Last Visit</th>
              <th onClick={() => sortByColumn('visits')} style={{ cursor:'pointer' }}>Visits</th>
              <th>Actions</th>
            </tr></thead>
            <tbody>
              {pagedData.map((p, i) => {
                const globalIdx = i + (currentPage - 1) * 7;
                return (
                  <tr key={p.id} style={{ cursor:'pointer' }} onClick={() => openQuickProfile(globalIdx)}>
                    <td onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedIds.has(globalIdx)} onChange={() => toggleSelect(globalIdx)} /></td>
                    <td><div style={{ fontWeight:600 }}>{p.name}</div><div style={{ fontSize:11, color:'var(--slate-soft)' }}>{p.id} · {p.city}</div></td>
                    <td><div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>{p.conds.map((c, ci) => <span key={ci} className={`tag ${p.condCls[ci]?.replace('ht-tag-','')}`}>{c}</span>)}</div></td>
                    <td><span className={`tag ${p.mCls.replace('ht-tag-','')}`}>{p.miasm}</span></td>
                    <td><div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <svg width="28" height="28" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border-light)" strokeWidth="3"/><circle cx="18" cy="18" r="15.9" fill="none" stroke={p.score>=75?'var(--forest)':p.score>=50?'var(--gold)':'var(--crimson)'} strokeWidth="3" strokeDasharray={`${p.score} ${100-p.score}`} strokeDashoffset="25" strokeLinecap="round"/></svg>
                      <span style={{ fontWeight:700, fontSize:13 }}>{p.score}%</span>
                    </div></td>
                    <td><span className={`pill ${p.stCls}`}>{p.st}</span></td>
                    <td><div>{p.lastV}</div><div style={{ fontSize:11, color:'var(--slate-soft)' }}>{p.lastSub}</div></td>
                    <td>{p.visits}</td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="btn btn-ghost btn-xs" onClick={() => { const id = nameToId[p.name] || 'ayesha'; openPatientTimeline(id); }}>View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table></div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 18px', borderTop:'1px solid var(--border-light)', fontSize:12 }}>
              <div style={{ color:'var(--slate-soft)' }}>{typeof paginationInfo === 'string' ? paginationInfo : `${paginationInfo.start}–${paginationInfo.end} of ${paginationInfo.total}`}</div>
              <div style={{ display:'flex', gap:4 }}>
                <button className="btn btn-ghost btn-xs" disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>‹</button>
                {pageNumbers.map((n, i) => n === '…' ? <span key={i} style={{ padding:'4px 4px' }}>…</span> :
                  <button key={i} className={`btn btn-xs ${currentPage === n ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setCurrentPage(n as number)}>{n}</button>
                )}
                <button className="btn btn-ghost btn-xs" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)}>›</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'cards' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:14 }}>
          {filtered.map((p, i) => (
            <div key={p.id} className="card" style={{ padding:16, cursor:'pointer' }} onClick={() => { const id = nameToId[p.name] || 'ayesha'; openPatientTimeline(id); }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,var(--forest-light),var(--forest))', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700 }}>{p.init}</div>
                <div><div style={{ fontWeight:600, fontSize:14 }}>{p.name}</div><div style={{ fontSize:11, color:'var(--slate-soft)' }}>{p.id}</div></div>
                <div style={{ marginLeft:'auto' }}><span className={`pill ${p.stCls}`}>{p.st}</span></div>
              </div>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:8 }}>{p.conds.map((c, ci) => <span key={ci} className={`tag ${p.condCls[ci]?.replace('ht-tag-','')}`} style={{ fontSize:10 }}>{c}</span>)}</div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--slate-soft)' }}>
                <span>Score: <strong style={{ color: p.score>=75?'var(--forest)':p.score>=50?'var(--gold)':'var(--crimson)' }}>{p.score}%</strong></span>
                <span>{p.miasm}</span>
                <span>{p.visits} visits</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Profile Slide-in */}
      {quickProfilePatient && (
        <>
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.3)', zIndex:999 }} onClick={closeQuickProfile}></div>
          <div style={{ position:'fixed', top:0, right:0, bottom:0, width:380, background:'var(--surface)', zIndex:1000, boxShadow:'var(--shadow-lg)', overflow:'auto', animation:'htSlideIn .2s ease' }}>
            <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--border-light)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontWeight:700, fontSize:15 }}>{quickProfilePatient.name}</div>
              <button onClick={closeQuickProfile} style={{ background:'none', border:'none', fontSize:18, cursor:'pointer' }}>✕</button>
            </div>
            <div style={{ padding:20 }}>
              <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:16 }}>
                <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,var(--forest-light),var(--forest))', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:700 }}>{quickProfilePatient.init}</div>
                <div><div style={{ fontWeight:600 }}>{quickProfilePatient.name}</div><div style={{ fontSize:12, color:'var(--slate-soft)' }}>{quickProfilePatient.id} · {quickProfilePatient.city}</div></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
                <div className="card" style={{ padding:'10px 14px', textAlign:'center' }}><div style={{ fontSize:18, fontWeight:700, color:'var(--forest)' }}>{quickProfilePatient.score}%</div><div style={{ fontSize:10, color:'var(--slate-soft)' }}>Health Score</div></div>
                <div className="card" style={{ padding:'10px 14px', textAlign:'center' }}><div style={{ fontSize:18, fontWeight:700, color:'var(--gold)' }}>{quickProfilePatient.visits}</div><div style={{ fontSize:10, color:'var(--slate-soft)' }}>Total Visits</div></div>
              </div>
              <div style={{ fontSize:12, color:'var(--slate-soft)', marginBottom:6 }}>Miasm: <strong style={{ color:'var(--slate)' }}>{quickProfilePatient.miasm}</strong></div>
              <div style={{ fontSize:12, color:'var(--slate-soft)', marginBottom:6 }}>Phone: <strong style={{ color:'var(--slate)' }}>{quickProfilePatient.phone}</strong></div>
              <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:16 }}>{quickProfilePatient.conds.map((c, i) => <span key={i} className="tag g">{c}</span>)}</div>
              {quickProfilePatient.rx.length > 0 && (
                <div><div style={{ fontSize:11, fontWeight:700, color:'var(--slate-soft)', textTransform:'uppercase', marginBottom:6 }}>Recent Prescriptions</div>
                {quickProfilePatient.rx.map((rx, i) => <div key={i} style={{ padding:'8px 12px', background:'var(--surface-alt)', borderRadius:8, marginBottom:6, fontSize:12 }}><div style={{ fontWeight:600 }}>{rx.n}</div><div style={{ color:'var(--slate-soft)' }}>{rx.d}</div></div>)}</div>
              )}
              <div style={{ display:'flex', gap:8, marginTop:16 }}>
                <button className="btn btn-primary btn-sm" style={{ flex:1 }} onClick={() => { const id = nameToId[quickProfilePatient.name] || 'ayesha'; openPatientTimeline(id); closeQuickProfile(); }}>View Timeline</button>
                <button className="btn btn-outline btn-sm" style={{ flex:1 }} onClick={() => { showFrame('prescriptions'); closeQuickProfile(); }}>Prescribe</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
