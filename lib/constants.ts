/* ═══════════════════════════════════════
   ALL APPLICATION DATA — Part 1
   Auth, Clinics, Navigation, Dashboard
   Extracted 1:1 from original app.js
═══════════════════════════════════════ */
import type { NavSection, ScheduleItem, PerformanceData, Notification, FrameId } from './types';

// ═══ DEMO USERS ═══
export const DEMO_USERS: Record<string, { password: string; name: string; initials: string; role: 'admin'|'doctor'|'receptionist'; clinic: 'rawalpindi'|'islamabad'; roleLabel: string; emoji: string; email: string }> = {
  'admin@herbamed.pk': { password: 'admin123', name: 'Dr. Rashid Malik', initials: 'DR', role: 'admin', clinic: 'rawalpindi', roleLabel: 'Admin', emoji: '👑', email: 'admin@herbamed.pk' },
  'doctor@herbamed.pk': { password: 'doctor123', name: 'Dr. Amina Siddiqui', initials: 'DA', role: 'doctor', clinic: 'islamabad', roleLabel: 'Doctor', emoji: '👨‍⚕️', email: 'doctor@herbamed.pk' },
  'recep@herbamed.pk': { password: 'recep123', name: 'Zainab (Reception)', initials: 'ZR', role: 'receptionist', clinic: 'rawalpindi', roleLabel: 'Receptionist', emoji: '🧑‍💼', email: 'recep@herbamed.pk' },
};

// ═══ CLINICS ═══
export const CLINICS_DATA = {
  rawalpindi: {
    id: 'rawalpindi' as const, name: 'Rawalpindi Main Clinic', sub: 'Satellite Town, Rawalpindi', status: 'Active',
    patients: 164, revenue: '₨160k', revTrend: '↑ 18% vs Feb', doctors: 2, todayAppts: 9,
    apptNote: '3 remaining', lowStock: 3, totalMeds: 142, rxThisMonth: 31, ptTrend: '↑ 12 this month',
    team: [
      { name: 'Dr. Rashid Malik', role: 'Admin' as const, roleCls: 'admin', phone: '0321-000001', status: 'active' as const, last: 'Now' },
      { name: 'Zainab (Reception)', role: 'Receptionist' as const, roleCls: 'receptionist', phone: '0321-000002', status: 'inactive' as const, last: 'Yesterday' },
    ],
  },
  islamabad: {
    id: 'islamabad' as const, name: 'Islamabad Branch', sub: 'Blue Area, Islamabad', status: 'Active',
    patients: 84, revenue: '₨104k', revTrend: '↑ 9% vs Feb', doctors: 1, todayAppts: 4,
    apptNote: '1 remaining', lowStock: 0, totalMeds: 80, rxThisMonth: 18, ptTrend: '↑ 6 this month',
    team: [
      { name: 'Dr. Amina Siddiqui', role: 'Doctor' as const, roleCls: 'doctor', phone: '0300-111222', status: 'active' as const, last: '10 min ago' },
    ],
  },
};

// ═══ PATIENTS (Multi-clinic keyed — used by timeline, prescriptions, etc.) ═══
export const PATIENTS_DATA: Record<string, {
  name: string; initials: string; age: number; gender: string; miasm: string;
  score: number; visits: number; since: string; tags: string[]; phone: string;
  rxHistory: { date: string; remedies: string; potency: string; dosage: string; duration: string; status: string; response: string; timesRx: string; doctor: string }[];
}> = {
  ayesha: { name: 'Ayesha Farooq', initials: 'AF', age: 32, gender: 'F', miasm: 'Psoric', score: 78, visits: 8, since: 'Jan 2025', tags: ['Sinusitis','Headaches','Seasonal Allergy'], phone: '0321-4567890',
    rxHistory: [
      { date: 'Mar 24, 2026', remedies: 'Nat. Mur', potency: '200C', dosage: '2 drops BD', duration: '14 days', status: 'active', response: 'excellent', timesRx: '3×', doctor: 'Dr. Rashid Malik' },
      { date: 'Feb 10, 2026', remedies: 'Sulphur', potency: '30C', dosage: '3 drops TDS', duration: '21 days', status: 'completed', response: 'good', timesRx: '2×', doctor: 'Dr. Rashid Malik' },
      { date: 'Jan 05, 2026', remedies: 'Pulsatilla', potency: '30C', dosage: '2 drops BD', duration: '14 days', status: 'completed', response: 'moderate', timesRx: '1×', doctor: 'Dr. Amina Siddiqui' },
    ],
  },
  bilal: { name: 'Bilal Chaudhry', initials: 'BC', age: 45, gender: 'M', miasm: 'Sycotic', score: 65, visits: 5, since: 'Mar 2024', tags: ['Joint Pain','Skin Issues'], phone: '0300-1234567',
    rxHistory: [
      { date: 'Mar 20, 2026', remedies: 'Thuja', potency: '200C', dosage: '2 drops BD', duration: '21 days', status: 'active', response: 'good', timesRx: '2×', doctor: 'Dr. Amina Siddiqui' },
      { date: 'Feb 01, 2026', remedies: 'Nux Vomica', potency: '30C', dosage: '3 drops TDS', duration: '14 days', status: 'completed', response: 'moderate', timesRx: '1×', doctor: 'Dr. Amina Siddiqui' },
    ],
  },
  sana: { name: 'Sana Imran', initials: 'SI', age: 27, gender: 'F', miasm: 'Syphilitic', score: 45, visits: 3, since: 'Jun 2024', tags: ['Anxiety','Hair Loss'], phone: '0333-9876543',
    rxHistory: [
      { date: 'Mar 15, 2026', remedies: 'Ignatia', potency: '200C', dosage: '2 drops BD', duration: '14 days', status: 'active', response: 'excellent', timesRx: '2×', doctor: 'Dr. Rashid Malik' },
      { date: 'Feb 20, 2026', remedies: 'Aurum Met', potency: '30C', dosage: '3 drops TDS', duration: '21 days', status: 'completed', response: 'good', timesRx: '1×', doctor: 'Dr. Rashid Malik' },
    ],
  },
  khalid: { name: 'Khalid Mehmood', initials: 'KM', age: 58, gender: 'M', miasm: 'Mixed', score: 30, visits: 12, since: 'Aug 2023', tags: ['Diabetes','BP','Knee Pain'], phone: '0311-5554444',
    rxHistory: [
      { date: 'Mar 10, 2026', remedies: 'Syzygium', potency: 'Q', dosage: '10 drops TDS', duration: '30 days', status: 'active', response: 'moderate', timesRx: '3×', doctor: 'Dr. Rashid Malik' },
      { date: 'Feb 05, 2026', remedies: 'Lycopodium', potency: '200C', dosage: '2 drops BD', duration: '21 days', status: 'completed', response: 'good', timesRx: '2×', doctor: 'Dr. Rashid Malik' },
    ],
  },
};

// ═══ PTS_BASE (Patient List Frame — the full patient list table data) ═══
export const PTS_BASE = [
  { id:'PID-001', name:'Ayesha Farooq', init:'AF', av:'av1', gen:'F' as const, age:32, conds:['Sinusitis','Headaches'], condCls:['ht-tag-g','ht-tag-a'], miasm:'Psoric', mCls:'ht-tag-g', score:78, scrCls:'sr-md', trend:'↑ 12', tCls:'sc-up', st:'Active', stCls:'st-active', lastV:'Mar 24, 2026', lastSub:'Today', nextV:'Apr 7, 2026', nextSub:'14 days', nextOv:false, visits:8, phone:'+92-321-4567890', email:'ayesha@email.com', city:'Rawalpindi', clinic:'Rawalpindi', rx:[{n:'Nat. Mur 200C',d:'BD × 14 days · Excellent'},{n:'Pulsatilla 30C',d:'TDS × 7 days · Moderate'}] },
  { id:'PID-002', name:'Ahmed Khan', init:'AK', av:'av2', gen:'M' as const, age:45, conds:['Asthma','Anxiety'], condCls:['ht-tag-b','ht-tag-p'], miasm:'Sycotic', mCls:'ht-tag-b', score:65, scrCls:'sr-lo', trend:'↑ 5', tCls:'sc-up', st:'Follow-up', stCls:'st-follow', lastV:'Mar 20, 2026', lastSub:'4 days ago', nextV:'Mar 22, 2026', nextSub:'Overdue 2d', nextOv:true, visits:5, phone:'+92-300-1234567', email:'ahmed@email.com', city:'Islamabad', clinic:'Islamabad', rx:[{n:'Thuja 200C',d:'BD × 21 days · Good'}] },
  { id:'PID-003', name:'Sara Malik', init:'SM', av:'av3', gen:'F' as const, age:28, conds:['Allergies'], condCls:['ht-tag-a'], miasm:'Psoric', mCls:'ht-tag-g', score:82, scrCls:'sr-hi', trend:'↑ 14', tCls:'sc-up', st:'Active', stCls:'st-active', lastV:'Mar 18, 2026', lastSub:'6 days ago', nextV:'Apr 1, 2026', nextSub:'8 days', nextOv:false, visits:3, phone:'+92-333-9876543', email:'sara@email.com', city:'Rawalpindi', clinic:'Rawalpindi', rx:[{n:'Allium Cepa 30C',d:'TDS × 5 days · Good'}] },
  { id:'PID-004', name:'Bilal Ahmad', init:'BA', av:'av4', gen:'M' as const, age:38, conds:['Eczema','Insomnia'], condCls:['ht-tag-p','ht-tag-a'], miasm:'Syphilitic', mCls:'ht-tag-p', score:54, scrCls:'sr-lo', trend:'↓ 3', tCls:'sc-dn', st:'Needs Review', stCls:'st-crit', lastV:'Mar 15, 2026', lastSub:'9 days ago', nextV:'Mar 20, 2026', nextSub:'Overdue 4d', nextOv:true, visits:6, phone:'+92-311-5554444', email:'bilal@email.com', city:'Rawalpindi', clinic:'Rawalpindi', rx:[{n:'Sulphur 30C',d:'OD × 21 days · Moderate'}] },
  { id:'PID-005', name:'Hina Akhtar', init:'HA', av:'av5', gen:'F' as const, age:41, conds:['Dermatitis'], condCls:['ht-tag-g'], miasm:'Psoric', mCls:'ht-tag-g', score:71, scrCls:'sr-md', trend:'↑ 8', tCls:'sc-up', st:'Active', stCls:'st-active', lastV:'Mar 12, 2026', lastSub:'12 days ago', nextV:'Mar 26, 2026', nextSub:'2 days', nextOv:false, visits:6, phone:'+92-300-8765432', email:'hina@email.com', city:'Islamabad', clinic:'Islamabad', rx:[{n:'Graphites 30C',d:'BD × 14 days · Good'}] },
  { id:'PID-006', name:'Farhan Ali', init:'FA', av:'av6', gen:'M' as const, age:52, conds:['Arthritis','Migraine'], condCls:['ht-tag-r','ht-tag-a'], miasm:'Sycotic', mCls:'ht-tag-b', score:42, scrCls:'sr-cr', trend:'↓ 6', tCls:'sc-dn', st:'Needs Review', stCls:'st-crit', lastV:'Mar 10, 2026', lastSub:'14 days ago', nextV:'Mar 17, 2026', nextSub:'Overdue 7d', nextOv:true, visits:4, phone:'+92-321-1112222', email:'farhan@email.com', city:'Rawalpindi', clinic:'Rawalpindi', rx:[{n:'Rhus Tox 200C',d:'BD × 14 days · Moderate'}] },
  { id:'PID-128', name:'Fatima Noor', init:'FN', av:'av7', gen:'F' as const, age:25, conds:[] as string[], condCls:[] as string[], miasm:'TBD', mCls:'', score:0, scrCls:'', trend:'', tCls:'', st:'New', stCls:'st-new', lastV:'', lastSub:'No visits', nextV:'Mar 24, 2026', nextSub:'Today', nextOv:false, visits:0, phone:'+92-333-0001111', email:'fatima@email.com', city:'Islamabad', clinic:'Islamabad', rx:[] as {n:string;d:string}[] },
];

// ═══ SCHEDULE DATA ═══
export const SCHEDULE_DATA: Record<string, { sub: string; items: ScheduleItem[] }> = {
  today: { sub: '7 appointments · Mar 24', items: [
    { t:'9:00', n:'Ahmed Khan', d:'Follow-up · Sycotic miasm · Visit #5', c:'sl-g', tag:'✓ Done', tc:'st-f', done:true },
    { t:'10:00', n:'Ayesha Farooq', d:'Follow-up · Psoric · Visit #8 · Sinusitis', c:'sl-g', tag:'● Now', tc:'st-now', now:true },
    { t:'11:00', n:'Fatima Noor', d:'New patient · First consultation', c:'sl-b', tag:'New', tc:'st-n' },
    { t:'11:45', n:'Usman Ali', d:'Acute · Headache + vertigo', c:'sl-a', tag:'Urgent', tc:'st-u' },
    { t:'2:00', n:'Sara Malik', d:'Follow-up · Allergies · Visit #3', c:'sl-g', tag:'Follow-up', tc:'st-f' },
    { t:'3:00', n:'Bilal Ahmad', d:'Review · Miasm reassessment', c:'sl-p', tag:'Review', tc:'st-r' },
    { t:'4:30', n:'Hina Akhtar', d:'Follow-up · Skin disorder · Visit #6', c:'sl-g', tag:'Follow-up', tc:'st-f' },
  ]},
  tomorrow: { sub: '4 appointments · Mar 25', items: [
    { t:'9:30', n:'Farhan Ali', d:'Follow-up · Overdue 7 days', c:'sl-a', tag:'Overdue', tc:'st-u' },
    { t:'10:30', n:'Zara Hussain', d:'New patient · Respiratory issues', c:'sl-b', tag:'New', tc:'st-n' },
    { t:'1:00', n:'Sara Noor', d:'Follow-up · Overdue 5 days', c:'sl-a', tag:'Overdue', tc:'st-u' },
    { t:'3:30', n:'Imran Qureshi', d:'Review · Treatment progress · Visit #4', c:'sl-p', tag:'Review', tc:'st-r' },
  ]},
  week: { sub: '18 appointments · Mar 24–28', items: [
    { t:'Mon', n:'7 appointments today', d:'Including 1 urgent · 1 new patient · 5 follow-ups', c:'sl-g', tag:'Today', tc:'st-now' },
    { t:'Tue', n:'4 appointments', d:'2 follow-ups · 1 new · 1 review', c:'sl-b', tag:'4 apts', tc:'st-n' },
    { t:'Wed', n:'3 appointments', d:'All follow-ups · routine visits', c:'sl-g', tag:'3 apts', tc:'st-f' },
    { t:'Thu', n:'2 appointments', d:'1 new patient · 1 review', c:'sl-p', tag:'2 apts', tc:'st-r' },
    { t:'Fri', n:'2 appointments', d:'Follow-ups only', c:'sl-g', tag:'2 apts', tc:'st-f' },
  ]},
};

// ═══ PERFORMANCE DATA ═══
export const PERFORMANCE_DATA: Record<string, PerformanceData> = {
  month:   { improving:'89%', visits:'32', newPatients:'8', avgRemedies:'4.2', followupRate:'92%', noImprove:'3', subtitle:'This month', chartLabel:'Visits — Last 14 Days', bars:[30,50,70,40,90,20,60,80,45,100,30,55,75,85] },
  quarter: { improving:'84%', visits:'98', newPatients:'22', avgRemedies:'3.8', followupRate:'88%', noImprove:'8', subtitle:'This quarter', chartLabel:'Visits — Last 90 Days', bars:[40,65,55,80,70,90,50,75,60,85,45,70,80,95] },
  year:    { improving:'81%', visits:'412', newPatients:'86', avgRemedies:'4.5', followupRate:'90%', noImprove:'14', subtitle:'This year', chartLabel:'Visits — 12 Months', bars:[60,45,80,70,55,90,75,85,65,100,80,90,70,60] },
};

// ═══ DASHBOARD SEARCH DB ═══
export const DASHBOARD_SEARCH_DB = [
  { type: 'patient' as const, name: 'Ayesha Farooq', meta: 'Sinusitis · Psoric · Score 78', color: '#5B7553' },
  { type: 'patient' as const, name: 'Ahmed Khan', meta: 'Asthma · Sycotic · Score 65', color: '#2980B9' },
  { type: 'patient' as const, name: 'Sara Malik', meta: 'Allergies · Psoric · Score 82', color: '#C4883A' },
  { type: 'patient' as const, name: 'Bilal Ahmad', meta: 'Skin · Syphilitic · Score 54', color: '#7B5EA7' },
  { type: 'patient' as const, name: 'Hina Akhtar', meta: 'Eczema · Psoric · Score 71', color: '#27AE60' },
  { type: 'patient' as const, name: 'Fatima Noor', meta: 'New patient · First consultation', color: '#2980B9' },
  { type: 'patient' as const, name: 'Usman Ali', meta: 'Acute · Headache + vertigo', color: '#C4883A' },
  { type: 'medicine' as const, name: 'Natrum Muriaticum', meta: 'Remedy · 200C, 30C available' },
  { type: 'medicine' as const, name: 'Sulphur', meta: 'Remedy · 30C, 200C, 1M available' },
  { type: 'medicine' as const, name: 'Pulsatilla', meta: 'Remedy · 30C, 200C available' },
  { type: 'medicine' as const, name: 'Lycopodium', meta: 'Remedy · 30C, 200C available' },
  { type: 'medicine' as const, name: 'Arsenicum Album', meta: 'Remedy · 30C, 200C, 1M available' },
  { type: 'medicine' as const, name: 'Graphites', meta: 'Remedy · 30C, 200C available' },
  { type: 'medicine' as const, name: 'Thuja', meta: 'Remedy · 30C, 200C available' },
];

// ═══ MIASM INFO ═══
export const MIASM_INFO: Record<string, string> = {
  psoric: 'Top remedies: Sulphur, Nat. Mur, Pulsatilla · Avg improvement: 82% · Common: Skin, Allergies, Sinusitis, Grief',
  sycotic: 'Top remedies: Thuja, Medorrhinum, Nat. Sulph · Avg improvement: 74% · Common: Asthma, Warts, Joint pain',
  syphilitic: 'Top remedies: Merc Sol, Aurum Met, Syphilinum · Avg improvement: 68% · Common: Ulcers, Bone pain, Chronic skin',
  tubercular: 'Top remedies: Tuberculinum, Phosphorus, Calc Carb · Avg improvement: 71% · Common: Respiratory, Weight loss, Fatigue',
};

// ═══ NOTIFICATIONS ═══
export const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: '5 Overdue Follow-ups', desc: 'Ahmed Khan, Sara Noor and 3 others', time: '10 min ago', type: 'danger', read: false, icon: '⚠', iconBg: 'var(--danger-light)', iconColor: 'var(--danger)' },
  { id: 'n2', title: '6 Prescriptions Expiring', desc: 'Need renewal decisions this week', time: '1 hr ago', type: 'warning', read: false, icon: '⏰', iconBg: 'var(--warning-light)', iconColor: 'var(--warning)' },
  { id: 'n3', title: 'Dr. Amina Left a Note', desc: 'Re: Ayesha Farooq case — review needed', time: '2 hrs ago', type: 'info', read: false, icon: '💬', iconBg: 'var(--info-light)', iconColor: 'var(--info)' },
  { id: 'n4', title: 'Sara Malik Score Updated', desc: 'Health score improved from 68 to 82', time: '3 days ago', type: 'success', read: true, icon: '📈', iconBg: 'var(--success-light)', iconColor: 'var(--success)' },
];

// ═══ GLOBAL SEARCH INDEX ═══
export const SEARCH_INDEX = [
  { icon: '👥', label: 'Ayesha Farooq', sub: 'PID-001 Rawalpindi Psoric', type: 'Patient' as const, actionFrame: 'patient_timeline' as FrameId, actionParam: 'ayesha' },
  { icon: '👥', label: 'Bilal Chaudhry', sub: 'PID-002 Rawalpindi Sycotic', type: 'Patient' as const, actionFrame: 'patient_timeline' as FrameId, actionParam: 'bilal' },
  { icon: '👥', label: 'Sana Imran', sub: 'PID-003 Rawalpindi Syphilitic', type: 'Patient' as const, actionFrame: 'patient_timeline' as FrameId, actionParam: 'sana' },
  { icon: '👥', label: 'Khalid Mehmood', sub: 'PID-004 Rawalpindi Mixed', type: 'Patient' as const, actionFrame: 'patient_timeline' as FrameId, actionParam: 'khalid' },
  { icon: '👥', label: 'Fatima Zahra', sub: 'PID-101 Islamabad Psoric', type: 'Patient' as const, actionFrame: 'patient_list' as FrameId },
  { icon: '👥', label: 'Omar Farooq', sub: 'PID-102 Islamabad', type: 'Patient' as const, actionFrame: 'patient_list' as FrameId },
  { icon: '🏠', label: 'Dashboard', sub: 'Main overview', type: 'Page' as const, actionFrame: 'dashboard' as FrameId },
  { icon: '📋', label: 'Prescriptions', sub: 'Create Rx', type: 'Page' as const, actionFrame: 'prescriptions' as FrameId },
  { icon: '💊', label: 'Inventory', sub: 'Medicine stock', type: 'Page' as const, actionFrame: 'inventory' as FrameId },
  { icon: '📅', label: 'Appointments', sub: 'Book manage', type: 'Page' as const, actionFrame: 'appointments' as FrameId },
  { icon: '💳', label: 'Billing', sub: 'Invoices', type: 'Page' as const, actionFrame: 'billing' as FrameId },
  { icon: '📊', label: 'Analytics', sub: 'Reports', type: 'Page' as const, actionFrame: 'analytics' as FrameId },
  { icon: '💊', label: 'Sulphur 30C', sub: '120 units In Stock', type: 'Medicine' as const, actionFrame: 'inventory' as FrameId },
  { icon: '💊', label: 'Calendula Q', sub: '8 units Critical', type: 'Medicine' as const, actionFrame: 'inventory' as FrameId },
  { icon: '💊', label: 'Nux Vomica 30C', sub: '15 units Low', type: 'Medicine' as const, actionFrame: 'inventory' as FrameId },
];

// ═══ NAV STRUCTURE ═══
export const NAV_SECTIONS: NavSection[] = [
  { title: 'Main', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { id: 'library', label: 'Knowledge Library', icon: 'book' },
  ]},
  { title: 'Clinical', items: [
    { id: 'patient_list', label: 'Patients', icon: 'users' },
    { id: 'ai_assistant', label: 'AI Assistant', icon: 'bot', children: [
      { id: 'ai_assistant' as FrameId, label: 'AI Prescriptions', icon: 'file-text' },
      { id: 'ai_chat' as FrameId, label: 'AI Consult Chat', icon: 'message-square' },
      { id: 'ai_case' as FrameId, label: 'Case Analyzer', icon: 'search' },
      { id: 'ai_remedy' as FrameId, label: 'Remedy Explainer', icon: 'book-open' },
    ]},
    { id: 'appointments', label: 'Appointments', icon: 'calendar' },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'clipboard' },
    { id: 'patient_timeline', label: 'Patient Timeline', icon: 'activity' },
    { id: 'whatsapp', label: 'WhatsApp Auto', icon: 'message-circle' },
  ]},
  { title: 'Operations', items: [
    { id: 'inventory', label: 'Inventory', icon: 'package', badge: { text: '3', variant: 'red' as const } },
    { id: 'billing', label: 'Billing', icon: 'credit-card' },
    { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
  ]},
  { title: 'Admin', items: [
    { id: 'multi_clinic', label: 'Multi-Clinic', icon: 'home' },
    { id: 'clinic_setup', label: 'Clinic Setup', icon: 'settings' },
    { id: 'collaboration', label: 'Collab Hub', icon: 'users-collab' },
    { id: 'team', label: 'Team & Roles', icon: 'user' },
    { id: 'sync', label: 'Sync & Backup', icon: 'refresh' },
  ]},
];

// ═══ DEFAULT TASKS ═══
export const DEFAULT_TASKS = [
  { id: 't1', text: "Review Ayesha's CT scan report", due: 'Today', priority: 'high' as const, done: true },
  { id: 't2', text: 'Call Ahmed Khan about overdue follow-up', due: 'Overdue 3d', priority: 'high' as const, done: false },
  { id: 't3', text: 'Prepare case notes for Dr. Farhan review', due: 'Tomorrow', priority: 'medium' as const, done: false },
  { id: 't4', text: 'Update remedy database with new potencies', due: 'This week', priority: 'low' as const, done: false },
];

// ═══ AI RESPONSES (Dashboard AI quick chat) ═══
export const AI_RESPONSES: Record<string, string> = {
  default: "Based on the symptom picture, I'd recommend considering Nat. Mur or Sulphur. Can you provide more details about modalities and constitution?",
  psoric: 'For Psoric miasm, consider Sulphur, Nat. Mur, or Calcarea Carb. The choice depends on the constitutional picture — thermal state, food desires, and mental symptoms.',
  ayesha: 'For Ayesha Farooq (Psoric, sinusitis): Current Nat. Mur 200C is showing excellent response. Consider maintaining or stepping down to 30C for maintenance. Pulsatilla 30C as intercurrent.',
  improvement: 'Patients showing no improvement may need: 1) Miasm reassessment 2) Potency adjustment 3) Constitutional remedy change. Consider consulting repertory for missed symptoms.',
};
