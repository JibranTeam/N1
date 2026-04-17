"use client";
/* ═══════════════════════════════════════
   DASHBOARD FRAME
   Exact replica of #frame-dashboard (index.html L201-411)
   Includes: ht-dash, ht-nav (green header), ht-content,
   greeting, KPI row, schedule card, alerts card,
   quick note, tasks, recent patients, performance,
   activity feed, remedy table, miasm distribution
═══════════════════════════════════════ */
import { useApp } from '@/context/AppContext';
import { useModal } from '@/context/ModalContext';
import { useSchedule, useLiveDate, usePerformance, useMiasmDistribution, useTasks, useNotes } from '@/hooks/useDashboard';
import { ACTIVITY_FEED, TOP_REMEDIES_DASHBOARD } from '@/lib/constants-data';
import { IconGrid, IconCalendar, IconUsers, IconBarChart, IconRefresh, IconBell, IconSettings, IconUserPlus, IconFilePlus } from '@/lib/icons';

const RECENT_PATIENTS = [
  { init:'AF', cls:'pa-1', name:'Ayesha Farooq', meta:'Sinusitis · Psoric · Visit #8 today', score:78, scoreColor:'var(--ht-primary)' },
  { init:'AK', cls:'pa-2', name:'Ahmed Khan', meta:'Asthma · Sycotic · Mar 20', score:65, scoreColor:'var(--ht-accent)' },
  { init:'SM', cls:'pa-3', name:'Sara Malik', meta:'Allergies · Psoric · Mar 18', score:82, scoreColor:'var(--ht-success)' },
  { init:'BA', cls:'pa-4', name:'Bilal Ahmad', meta:'Skin · Syphilitic · Mar 15', score:54, scoreColor:'var(--ht-warning)' },
  { init:'HA', cls:'pa-5', name:'Hina Akhtar', meta:'Eczema · Psoric · Mar 12', score:71, scoreColor:'var(--ht-primary)' },
];

export default function DashboardFrame() {
  const { showFrame, showToast, openPatientTimeline } = useApp();
  const { openModal } = useModal();
  const { activeTab: schedTab, setActiveTab: setSchedTab, data: schedData } = useSchedule();
  const { dateStr, timeStr, greeting } = useLiveDate();
  const { activeTab: perfTab, setActiveTab: setPerfTab, data: perfData } = usePerformance();
  const { miasmCards, selectedMiasm, selectMiasm, statusBars, statusTitle, miasmDetail } = useMiasmDistribution();
  const { tasks, toggleTask, deleteTask, addTask, remaining } = useTasks();
  const { notes, input, setInput, saveNote, deleteNote } = useNotes();

  return (
    <div className="frame active" id="frame-dashboard">
      <div className="ht-dash">

        {/* ══ GREEN NAV ══ */}
        <nav className="ht-nav" id="main-ht-nav">
          <div className="ht-nav-left">
            <div className="ht-nav-links">
              <button className="ht-nav-link active" onClick={() => showFrame('dashboard')}>Dashboard</button>
              <button className="ht-nav-link" onClick={() => showFrame('patient_list')}>Patients</button>
              <button className="ht-nav-link" onClick={() => showFrame('prescriptions')}>Prescriptions</button>
              <button className="ht-nav-link" onClick={() => showFrame('appointments')}>Calendar</button>
              <button className="ht-nav-link" onClick={() => showFrame('analytics')}>Reports</button>
            </div>
          </div>
          <div className="ht-nav-right">
            <div className="ht-sync-pill">Synced</div>
          </div>
        </nav>

        <div className="ht-content">
          {/* ══ GREETING ══ */}
          <div className="ht-greeting">
            <div className="ht-greeting-left">
              <h1><IconGrid size={18} />{greeting}, Dr. Rizwan</h1>
              <p>{dateStr} · {timeStr}</p>
            </div>
            <div className="ht-greeting-right">
              <button className="ht-btn ht-btn-primary" onClick={() => openModal('new-patient')}><IconUserPlus size={14} />+ Patient</button>
              <button className="ht-btn ht-btn-accent" onClick={() => openModal('new-rx')}><IconFilePlus size={14} />+ Prescription</button>
              <button className="ht-btn ht-btn-outline" onClick={() => openModal('book-appt')}><IconCalendar size={14} />+ Appointment</button>
              <button className="ht-btn ht-btn-outline" onClick={() => openModal('new-invoice')}>+ Invoice</button>
              <button className="ht-btn-icon ht-wa" title="WhatsApp" onClick={() => showFrame('whatsapp')}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a3.04 3.04 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </button>
              <button className="ht-btn-icon ht-ai" title="AI Assistant" onClick={() => showFrame('ai_assistant')}>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 14 22h-4a7 7 0 0 1-6.73-3H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2z"/></svg>
              </button>
            </div>
          </div>

          {/* ══ KPI ROW ══ */}
          <div className="ht-kpi-row">
            {[
              { key:'appointments', ico:'ki-g', change:'↑ 2', changeCls:'kc-up', val:'7', valCls:'kv-g', label:"Today's Appointments", sub:'2 follow-ups · 1 new · 4 regular', bar:'kb-g' },
              { key:'patients', ico:'ki-a', change:'↑ 3', changeCls:'kc-up', val:'124', valCls:'kv-a', label:'Active Patients', sub:'8 new this month', bar:'kb-a' },
              { key:'prescriptions', ico:'ki-s', change:'—', changeCls:'kc-flat', val:'18', valCls:'kv-s', label:'Active Prescriptions', sub:'6 expiring this week', bar:'kb-s' },
              { key:'improvement', ico:'ki-b', change:'↑ 4%', changeCls:'kc-up', val:'78%', valCls:'kv-b', label:'Avg. Improvement', sub:'Across all active patients', bar:'kb-b' },
              { key:'followups', ico:'ki-p', change:'5 overdue', changeCls:'kc-down', val:'12', valCls:'kv-p', label:'Pending Follow-ups', sub:'5 overdue · 7 upcoming', bar:'kb-p' },
            ].map(kpi => (
              <div className="ht-kpi" key={kpi.key} data-kpi={kpi.key}>
                <div className="ht-kpi-top">
                  <div className={`ht-kpi-ico ${kpi.ico}`}>
                    {kpi.key === 'appointments' && <IconCalendar size={16} />}
                    {kpi.key === 'patients' && <IconUsers size={16} />}
                    {kpi.key === 'prescriptions' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.5 1.5H8A6.5 6.5 0 0 0 8 14.5h1.5"/><path d="M13.5 1.5H16A6.5 6.5 0 0 1 16 14.5h-1.5"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="12" y1="14.5" x2="12" y2="22"/></svg>}
                    {kpi.key === 'improvement' && <IconBarChart size={16} />}
                    {kpi.key === 'followups' && <IconRefresh size={16} />}
                  </div>
                  <div className={`ht-kpi-change ${kpi.changeCls}`}>{kpi.change}</div>
                </div>
                <div className={`ht-kpi-value ${kpi.valCls}`}>{kpi.val}</div>
                <div className="ht-kpi-label">{kpi.label}</div>
                <div className="ht-kpi-sub">{kpi.sub}</div>
                <div className={`ht-kpi-bar ${kpi.bar}`}></div>
              </div>
            ))}
          </div>

          {/* ══ ROW 1: Schedule / Alerts / Sidebar ══ */}
          <div className="ht-grid-3">
            {/* Schedule Card */}
            <div className="ht-card">
              <div className="ht-card-h">
                <div className="ht-card-h-left">
                  <div className="ht-card-h-ico ki-g"><IconCalendar size={14} /></div>
                  <div><div className="ht-card-title">Today&apos;s Schedule</div><div className="ht-card-subtitle">{schedData.sub}</div></div>
                </div>
                <div className="ht-tabs">
                  {(['today','tomorrow','week'] as const).map(tab => (
                    <button key={tab} className={`ht-tab ${schedTab === tab ? 'on' : ''}`} onClick={() => setSchedTab(tab)}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ht-card-flush">
                {schedData.items.map((item, i) => (
                  <div key={i} className={`ht-sched-item ${item.done ? 'done' : ''} ${item.now ? 'now' : ''}`}>
                    <div className={`ht-sched-time ${item.c}`}>{item.t}</div>
                    <div className="ht-sched-info">
                      <div className="ht-sched-name">{item.n}</div>
                      <div className="ht-sched-desc">{item.d}</div>
                    </div>
                    <span className={`ht-sched-tag ${item.tc}`}>{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts Card */}
            <div className="ht-card">
              <div className="ht-card-h">
                <div className="ht-card-h-left">
                  <div className="ht-card-h-ico ki-d">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <div><div className="ht-card-title">Needs Attention</div><div className="ht-card-subtitle">5 items requiring action</div></div>
                </div>
                <span className="ht-alert-badge ab-r">5</span>
              </div>
              <div className="ht-card-flush">
                <div className="ht-alert-item"><div className="ht-alert-ico ai-r"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div><div className="ht-alert-info"><div className="ht-alert-title">5 Overdue Follow-ups</div><div className="ht-alert-desc">Ahmed Khan (3d), Sara Noor (5d), Farhan Ali (7d) and 2 more.</div></div><span className="ht-alert-badge ab-r">5</span></div>
                <div className="ht-alert-item"><div className="ht-alert-ico ai-a"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div className="ht-alert-info"><div className="ht-alert-title">6 Prescriptions Expiring</div><div className="ht-alert-desc">Nat. Mur for Ayesha (3d), Sulphur for Bilal (1d) and 4 others.</div></div><span className="ht-alert-badge ab-a">6</span></div>
                <div className="ht-alert-item"><div className="ht-alert-ico ai-b"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div className="ht-alert-info"><div className="ht-alert-title">Pending Lab Results</div><div className="ht-alert-desc">IgE for Fatima Noor. CT scan for Usman Ali.</div></div><div className="ht-alert-time">Since Mar 20</div></div>
                <div className="ht-alert-item"><div className="ht-alert-ico ai-g"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><div className="ht-alert-info"><div className="ht-alert-title">3 Patients Ready for Potency Change</div><div className="ht-alert-desc">Ayesha Farooq, Hina Akhtar, Sara Malik.</div></div></div>
                <div className="ht-alert-item"><div className="ht-alert-ico ai-a"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div><div className="ht-alert-info"><div className="ht-alert-title">Dr. Amina Left a Note</div><div className="ht-alert-desc">Recommends stepping down Nat. Mur to 30C.</div></div><div className="ht-alert-time">2 hrs ago</div></div>
              </div>
            </div>

            {/* Sidebar Column: Quick Note + Tasks */}
            <div>
              {/* Quick Note */}
              <div className="ht-card" style={{ marginBottom: 14 }}>
                <div className="ht-card-h"><div className="ht-card-h-left"><div className="ht-card-h-ico ki-a"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div><div><div className="ht-card-title">Quick Note</div></div></div></div>
                <div className="ht-card-body">
                  <textarea className="ht-note-input" placeholder="Jot down a quick reminder…" value={input} onChange={e => setInput(e.target.value)} />
                  <div className="ht-note-actions">
                    <button className="ht-btn ht-btn-primary ht-btn-sm" onClick={() => saveNote() && showToast('Note saved')}>Save Note</button>
                    <button className="ht-btn ht-btn-ghost ht-btn-sm" onClick={() => setInput('')}>Clear</button>
                  </div>
                  <div className="ht-saved-notes">
                    {notes.length === 0 && <div className="ht-notes-empty">No saved notes yet.</div>}
                    {notes.map(n => (
                      <div key={n.id} className="ht-saved-note">
                        <div className="sn-text">{n.text}</div>
                        <div className="sn-time">{n.time}</div>
                        <button className="sn-del" onClick={() => { deleteNote(n.id); showToast('Note deleted', 'info'); }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="ht-card">
                <div className="ht-card-h">
                  <div className="ht-card-h-left"><div className="ht-card-h-ico ki-p"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><div><div className="ht-card-title">Pending Tasks</div><div className="ht-card-subtitle">{remaining} remaining</div></div></div>
                  <button className="ht-btn ht-btn-ghost ht-btn-sm" onClick={() => { const t = prompt('New task:'); if (t) { addTask(t); showToast('Task added'); } }}>+ Add</button>
                </div>
                <div className="ht-card-flush">
                  {tasks.map(task => (
                    <div key={task.id} className={`ht-task-item ${task.done ? 'done' : ''}`}>
                      <div className="ht-task-check" onClick={() => toggleTask(task.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div className={`ht-task-priority tp-${task.priority[0]}`}></div>
                      <div className="ht-task-text">{task.text}</div>
                      <div className={`ht-task-due ${task.due.includes('Overdue') ? 'overdue' : ''}`}>{task.due}</div>
                      <button className="ht-task-del" title="Delete" onClick={() => { deleteTask(task.id); showToast('Task deleted', 'info'); }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══ ROW 2: Recent Patients / Performance / Activity ══ */}
          <div className="ht-grid-3">
            {/* Recent Patients */}
            <div className="ht-card">
              <div className="ht-card-h"><div className="ht-card-h-left"><div className="ht-card-h-ico ki-g"><IconUsers size={14} /></div><div><div className="ht-card-title">Recent Patients</div><div className="ht-card-subtitle">Last 7 days</div></div></div><button className="ht-btn ht-btn-outline ht-btn-sm" onClick={() => showFrame('patient_list')}>View All</button></div>
              <div className="ht-card-flush">
                {RECENT_PATIENTS.map((p, i) => (
                  <div key={i} className="ht-patient-row" onClick={() => openPatientTimeline(p.init.toLowerCase() === 'af' ? 'ayesha' : p.init.toLowerCase() === 'ak' ? 'bilal' : p.init.toLowerCase() === 'sm' ? 'sana' : p.init.toLowerCase() === 'ba' ? 'khalid' : 'ayesha')}>
                    <div className={`ht-patient-av ${p.cls}`}>{p.init}</div>
                    <div className="ht-patient-info"><div className="ht-patient-name">{p.name}</div><div className="ht-patient-meta">{p.meta}</div></div>
                    <div className="ht-patient-score"><div className="ht-score-num" style={{ color: p.scoreColor }}>{p.score}</div><div className="ht-score-label">Score</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="ht-card">
              <div className="ht-card-h"><div className="ht-card-h-left"><div className="ht-card-h-ico ki-s"><IconBarChart size={14} /></div><div><div className="ht-card-title">Performance Overview</div><div className="ht-card-subtitle">{perfData.subtitle}</div></div></div>
                <div className="ht-tabs">{(['month','quarter','year'] as const).map(t => (<button key={t} className={`ht-tab ${perfTab === t ? 'on' : ''}`} onClick={() => setPerfTab(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>))}</div>
              </div>
              <div className="ht-card-body" style={{ paddingBottom: 10 }}>
                <div className="ht-perf-row">
                  <div className="ht-perf-item"><div className="ht-perf-num pn-g">{perfData.improving}</div><div className="ht-perf-label">Patients Improving</div></div>
                  <div className="ht-perf-item"><div className="ht-perf-num pn-a">{perfData.visits}</div><div className="ht-perf-label">Visits</div></div>
                  <div className="ht-perf-item"><div className="ht-perf-num pn-b">{perfData.newPatients}</div><div className="ht-perf-label">New Patients</div></div>
                </div>
                <div className="ht-perf-row">
                  <div className="ht-perf-item"><div className="ht-perf-num pn-g">{perfData.avgRemedies}</div><div className="ht-perf-label">Avg. Remedies</div></div>
                  <div className="ht-perf-item"><div className="ht-perf-num pn-a">{perfData.followupRate}</div><div className="ht-perf-label">Follow-up Rate</div></div>
                  <div className="ht-perf-item"><div className="ht-perf-num pn-r">{perfData.noImprove}</div><div className="ht-perf-label">No Improvement</div></div>
                </div>
              </div>
              <div style={{ padding: '0 18px 6px' }}><div className="ht-section-label">{perfData.chartLabel}</div></div>
              <div className="ht-mini-chart">{perfData.bars.map((h, i) => <div key={i} className={`ht-mini-bar ${h > 75 ? 'mb-d' : h > 40 ? 'mb-m' : 'mb-l'}`} style={{ height: `${h}%` }}></div>)}</div>
            </div>

            {/* Activity Feed */}
            <div className="ht-card">
              <div className="ht-card-h"><div className="ht-card-h-left"><div className="ht-card-h-ico ki-b"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div><div className="ht-card-title">Activity Feed</div><div className="ht-card-subtitle">Latest updates</div></div></div></div>
              <div className="ht-card-flush">
                {ACTIVITY_FEED.map((a, i) => (
                  <div key={i} className="ht-activity">
                    <div className="ht-act-dot" style={{ background: a.dot }}></div>
                    <div className="ht-act-text" dangerouslySetInnerHTML={{ __html: a.text }}></div>
                    <div className="ht-act-time">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ ROW 3: Remedy Table / Patient Distribution ══ */}
          <div className="ht-grid-2">
            {/* Remedy Table */}
            <div className="ht-card">
              <div className="ht-card-h"><div className="ht-card-h-left"><div className="ht-card-h-ico ki-a"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.5 1.5H8A6.5 6.5 0 0 0 8 14.5h1.5"/><path d="M13.5 1.5H16A6.5 6.5 0 0 1 16 14.5h-1.5"/><line x1="8" y1="8" x2="16" y2="8"/></svg></div><div><div className="ht-card-title">Most Used Remedies</div><div className="ht-card-subtitle">This month</div></div></div></div>
              <div className="ht-card-flush">
                <table className="ht-rtable"><thead><tr><th>#</th><th>Remedy</th><th className="tc">Rx&apos;d</th><th className="tc">Response</th><th className="tc">Success</th></tr></thead>
                <tbody>{TOP_REMEDIES_DASHBOARD.map(r => (
                  <tr key={r.rank}><td>{r.rank}</td><td className="td-n">{r.name}</td><td className="td-c">{r.count}</td><td className="td-ct"><span className={`resp-tag ${r.respCls}`}>{r.response}</span></td><td className={r.successCls}>{r.success}</td></tr>
                ))}</tbody></table>
              </div>
            </div>

            {/* Patient Distribution */}
            <div className="ht-card">
              <div className="ht-card-h"><div className="ht-card-h-left"><div className="ht-card-h-ico ki-p"><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><line x1="2" y1="12" x2="22" y2="12"/></svg></div><div><div className="ht-card-title">Patient Distribution</div><div className="ht-card-subtitle">Click a miasm to filter</div></div></div>
                {selectedMiasm && <button className="ht-btn ht-btn-ghost ht-btn-sm" onClick={() => selectMiasm(selectedMiasm)}>Reset</button>}
              </div>
              <div className="ht-card-body">
                <div className="ht-section-label">By Miasm</div>
                <div className="ht-miasm-grid">
                  {miasmCards.map(m => (
                    <div key={m.id} className={`ht-miasm-card ${selectedMiasm === m.id ? 'selected' : ''}`}
                      style={{ background: m.id === 'psoric' ? 'var(--ht-primary-bg)' : m.id === 'sycotic' ? 'var(--ht-info-light)' : m.id === 'syphilitic' ? 'var(--ht-purple-light)' : 'var(--ht-accent-light)', border: `1px solid ${m.color}33` }}
                      onClick={() => selectMiasm(m.id)}>
                      <div className="ht-miasm-num" style={{ color: m.color }}>{m.count}</div>
                      <div className="ht-miasm-label" style={{ color: m.color }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                {miasmDetail && <div className="ht-miasm-detail">{miasmDetail}</div>}
                <div className="ht-section-label">{statusTitle}</div>
                <div>
                  {statusBars.map((b, i) => (
                    <div key={i} className="ht-status-row">
                      <div className="ht-status-label">{b.label}</div>
                      <div className="ht-status-track"><div className="ht-status-fill" style={{ width: `${b.pct}%`, background: b.color }}></div></div>
                      <div className="ht-status-val" style={{ color: b.color }}>{b.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>{/* /ht-content */}
      </div>{/* /ht-dash */}
    </div>
  );
}
