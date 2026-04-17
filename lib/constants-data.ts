/* ═══════════════════════════════════════
   ALL APPLICATION DATA — Part 2
   Inventory, Rx, Appointments, Analytics,
   WhatsApp, Timeline, Collaboration, Team
═══════════════════════════════════════ */
import type { Medicine, InventoryMovement, WaTemplate, WaSentMessage, WaReminder, AnalyticsPeriod, FrameId } from './types';

// ═══ INVENTORY — MEDS ═══
export const MEDS_DATA: (Medicine & { form: string; supplier: string })[] = [
  { name:'Natrum Muriaticum', pot:'200C', batch:'BT-24A', stock:120, cap:200, cost:15, runout:'~40 days', exp:'Dec 2027', st:'in-stock', cat:'polycrest', mu:14, form:'Globules', supplier:'SBL' },
  { name:'Sulphur', pot:'30C', batch:'BT-24B', stock:85, cap:200, cost:12, runout:'~28 days', exp:'Oct 2027', st:'in-stock', cat:'polycrest', mu:11, form:'Globules', supplier:'Schwabe' },
  { name:'Pulsatilla', pot:'30C', batch:'BT-24C', stock:60, cap:200, cost:14, runout:'~20 days', exp:'Aug 2027', st:'in-stock', cat:'polycrest', mu:9, form:'Globules', supplier:'SBL' },
  { name:'Arsenicum Album', pot:'30C', batch:'BT-24D', stock:18, cap:200, cost:16, runout:'~6 days', exp:'Sep 2027', st:'low', cat:'polycrest', mu:6, form:'Globules', supplier:'Schwabe' },
  { name:'Lycopodium', pot:'200C', batch:'BT-24E', stock:45, cap:200, cost:18, runout:'~15 days', exp:'Nov 2027', st:'in-stock', cat:'polycrest', mu:7, form:'Globules', supplier:'SBL' },
  { name:'Calendula Q', pot:'Q', batch:'BT-24F', stock:8, cap:100, cost:35, runout:'~5 Rx left', exp:'May 2026', st:'critical', cat:'mother', mu:5, form:'Mother Tincture', supplier:'SBL' },
  { name:'Graphites', pot:'30C', batch:'BT-24G', stock:90, cap:200, cost:13, runout:'~35 days', exp:'Jul 2027', st:'in-stock', cat:'polycrest', mu:4, form:'Globules', supplier:'Schwabe' },
  { name:'Thuja', pot:'200C', batch:'BT-24H', stock:12, cap:200, cost:20, runout:'~8 days', exp:'Mar 2027', st:'low', cat:'polycrest', mu:3, form:'Globules', supplier:'SBL' },
  { name:'Tuberculinum', pot:'1M', batch:'BT-24I', stock:30, cap:50, cost:45, runout:'~60 days', exp:'Jun 2028', st:'in-stock', cat:'nosode', mu:2, form:'Globules', supplier:'Schwabe' },
  { name:'Nux Vomica', pot:'30C', batch:'BT-24J', stock:70, cap:200, cost:11, runout:'~25 days', exp:'Jan 2028', st:'in-stock', cat:'acute', mu:8, form:'Globules', supplier:'SBL' },
];

// ═══ INVENTORY MOVEMENTS ═══
export const INVENTORY_MOVEMENTS: InventoryMovement[] = [
  { text: 'Nat. Mur 200C dispensed — Ayesha Farooq', time: '2 hrs ago', color: 'var(--forest)' },
  { text: 'Pulsatilla 30C dispensed — Ayesha Farooq', time: '2 hrs ago', color: 'var(--forest-mid)' },
  { text: 'Arsenicum 30C restocked +50 units', time: 'Yesterday', color: 'var(--sapphire)' },
  { text: 'Calendula Q stock warning triggered', time: '2 days ago', color: 'var(--gold)' },
  { text: 'Thuja 200C low stock alert', time: '3 days ago', color: 'var(--crimson)' },
];

// ═══ PER-CLINIC INVENTORY ═══
export const CLINIC_INVENTORY: Record<string, { name: string; potency: string; batch: string; stock: string; pct: number; color: string; runout: string; expiry: string; status: string; label: string; btnCls: string; btnTxt: string }[]> = {
  rawalpindi: [
    { name:'Sulphur', potency:'30C', batch:'BT-2024A', stock:'120 units', pct:80, color:'', runout:'~3 months', expiry:'Dec 2027', status:'active', label:'In Stock', btnCls:'btn-ghost', btnTxt:'Edit' },
    { name:'Calendula Q', potency:'Q (Mother)', batch:'MT-2024C', stock:'8 units', pct:8, color:'color:var(--crimson)', runout:'~5 prescriptions', expiry:'Mar 2026', status:'low', label:'Critical', btnCls:'btn-danger', btnTxt:'Reorder' },
    { name:'Nux Vomica', potency:'30C', batch:'NX-2025B', stock:'15 units', pct:15, color:'color:var(--gold)', runout:'~2 weeks', expiry:'Jun 2026', status:'warn', label:'Low', btnCls:'btn-danger', btnTxt:'Reorder' },
    { name:'Rhus Tox', potency:'200C', batch:'RT-2025A', stock:'64 units', pct:64, color:'', runout:'~2 months', expiry:'Jan 2028', status:'active', label:'In Stock', btnCls:'btn-ghost', btnTxt:'Edit' },
  ],
  islamabad: [
    { name:'Sulphur', potency:'30C', batch:'BT-ISL-01', stock:'80 units', pct:80, color:'', runout:'~3 months', expiry:'Dec 2027', status:'active', label:'In Stock', btnCls:'btn-ghost', btnTxt:'Edit' },
    { name:'Pulsatilla', potency:'30C', batch:'PL-ISL-02', stock:'45 units', pct:45, color:'', runout:'~2 months', expiry:'Mar 2027', status:'active', label:'In Stock', btnCls:'btn-ghost', btnTxt:'Edit' },
    { name:'Ignatia', potency:'200C', batch:'IG-ISL-03', stock:'32 units', pct:32, color:'', runout:'~6 weeks', expiry:'Jun 2026', status:'active', label:'In Stock', btnCls:'btn-ghost', btnTxt:'Edit' },
  ],
};

// ═══ PER-CLINIC APPOINTMENTS ═══
export const CLINIC_APPOINTMENTS: Record<string, { time: string; name: string; type: string; reminder: string; rCls: string; status: string; label: string }[]> = {
  rawalpindi: [
    { time:'09:00 AM', name:'Ayesha Farooq', type:'Constitutional', reminder:'Sent ✓', rCls:'g', status:'active', label:'Confirmed' },
    { time:'10:30 AM', name:'Bilal Chaudhry', type:'Follow-up', reminder:'Sent ✓', rCls:'g', status:'active', label:'Confirmed' },
    { time:'11:45 AM', name:'Sana Imran', type:'Skin Consult', reminder:'Pending', rCls:'a', status:'warn', label:'Pending' },
    { time:'02:00 PM', name:'Khalid Mehmood', type:'Digestive', reminder:'Sent ✓', rCls:'g', status:'active', label:'Confirmed' },
  ],
  islamabad: [
    { time:'10:00 AM', name:'Fatima Zahra', type:'Follow-up', reminder:'Sent ✓', rCls:'g', status:'active', label:'Confirmed' },
    { time:'11:30 AM', name:'Omar Farooq', type:'New Patient', reminder:'Sent ✓', rCls:'g', status:'active', label:'Confirmed' },
    { time:'01:00 PM', name:'Sara Ahmed', type:'Constitutional', reminder:'Pending', rCls:'a', status:'warn', label:'Pending' },
    { time:'03:00 PM', name:'Hassan Ali', type:'Follow-up', reminder:'—', rCls:'', status:'inactive', label:'Cancelled' },
  ],
};

// ═══ RX MEDICINE LIST (Autocomplete) ═══
export const RX_MED_LIST = [
  'Natrum Muriaticum','Sulphur','Pulsatilla','Lycopodium','Arsenicum Album',
  'Nux Vomica','Graphites','Thuja','Phosphorus','Calcarea Carb',
  'Ignatia','Sepia','Silicea','Rhus Tox','Bryonia','Belladonna',
  'Aconitum','Apis Mellifica','Argentum Nitricum','Aurum Met',
  'Baryta Carb','Borax','Calcarea Fluor','Calcarea Phos',
  'Causticum','Chamomilla','China Officinalis','Conium',
  'Ferrum Met','Gelsemium','Hepar Sulph','Kali Bich',
  'Kali Carb','Kali Phos','Lachesis','Ledum','Mercurius Sol',
  'Medorrhinum','Natrum Phos','Natrum Sulph','Nitric Acid',
  'Opium','Platina','Plumbum','Podophyllum','Psorinum',
  'Syphilinum','Tuberculinum','Zincum Met',
];

// ═══ DIET OPTIONS ═══
export const DIET_OPTIONS = ['No coffee','No raw onion','No garlic','No mint','No strong perfumes','Avoid cold drinks','No camphor'];

// ═══ RX TEMPLATES ═══
export const RX_TEMPLATES: Record<string, { remedies: { name: string; potency: string; dosage: string; frequency: string; duration: string }[]; diet: string[]; instructions: string }> = {
  sinusitis: {
    remedies: [
      { name: 'Kali Bich', potency: '30C', dosage: '2 drops', frequency: 'TDS', duration: '7 days' },
      { name: 'Nat. Mur', potency: '200C', dosage: '2 drops', frequency: 'BD', duration: '14 days' },
    ],
    diet: ['No coffee', 'No raw onion'],
    instructions: 'Steam inhalation twice daily. Avoid cold drafts.',
  },
  headache: {
    remedies: [
      { name: 'Belladonna', potency: '30C', dosage: '3 drops', frequency: 'TDS', duration: '5 days' },
      { name: 'Glonoinum', potency: '30C', dosage: '2 drops', frequency: 'SOS', duration: '7 days' },
    ],
    diet: ['No coffee', 'No strong perfumes'],
    instructions: 'Rest in dark room during attacks. Avoid screens.',
  },
  constitutional: {
    remedies: [
      { name: 'Sulphur', potency: '200C', dosage: '2 drops', frequency: 'Weekly', duration: '4 weeks' },
    ],
    diet: ['No coffee', 'No raw onion', 'No garlic'],
    instructions: 'Single dose weekly. Report any aggravation.',
  },
  allergy: {
    remedies: [
      { name: 'Allium Cepa', potency: '30C', dosage: '3 drops', frequency: 'TDS', duration: '5 days' },
      { name: 'Arsenicum Album', potency: '30C', dosage: '2 drops', frequency: 'BD', duration: '7 days' },
    ],
    diet: ['Avoid cold drinks', 'No mint'],
    instructions: 'Avoid known allergens. Keep warm.',
  },
};

// ═══ WHATSAPP TEMPLATES ═══
export const WA_TEMPLATES_DATA: WaTemplate[] = [
  { id: 1, label: '🔔 Appointment Reminder (1 Day Before)', text: 'السلام علیکم [PatientName]! آپ کی [DoctorName] کے ساتھ کل [AppointmentTime] بجے اپوائنٹمنٹ ہے۔ — HerbaMed Clinic', enabled: true },
  { id: 2, label: '💊 Prescription Ready', text: 'Dear [PatientName], your prescription is ready. Nat. Mur 200C - 2 drops BD for 14 days. Avoid coffee & raw onion. — Dr. Rashid Malik, HerbaMed', enabled: true },
  { id: 3, label: '📅 Follow-up Reminder (14 Days)', text: 'Hi [PatientName], it has been 14 days since your last visit. Please book your follow-up at HerbaMed. Reply YES to confirm. ✨', enabled: true },
  { id: 4, label: '⚠️ Missed Appointment Alert', text: 'Dear [PatientName], we missed you today. Please contact us to reschedule at your earliest convenience. — HerbaMed Team', enabled: false },
];

export const WA_SENT_MESSAGES: WaSentMessage[] = [
  { name: 'Ayesha Farooq', msg: 'Appointment Reminder · Tomorrow 9:00 AM with Dr. Rashid', time: 'Today 8:00 AM', tick: '✓✓', icon: '💬' },
  { name: 'Ahmed Khan', msg: 'Follow-up Reminder · 14 days since last visit', time: 'Today 7:30 AM', tick: '✓✓', icon: '💬' },
  { name: 'Sara Malik', msg: 'Prescription Ready · Sulphur 30C', time: 'Yesterday 4:00 PM', tick: '✓✓', icon: '💬' },
  { name: 'Bilal Ahmad', msg: 'Missed Appointment · Was expected Mar 22', time: 'Yesterday 10:00 AM', tick: '✓', icon: '💬' },
  { name: 'Hina Akhtar', msg: 'Follow-up Reminder · 14 days since last visit', time: 'Mar 22 9:00 AM', tick: '✓✓', icon: '💬' },
  { name: 'Fatima Noor', msg: 'Welcome message · First appointment confirmed', time: 'Mar 21 2:00 PM', tick: '✓✓', icon: '💬' },
];

export const WA_REMINDERS: WaReminder[] = [
  { id: 'wr1', patient: 'Fatima Noor', type: 'Appointment Reminder', scheduledFor: 'Today 6:00 PM', enabled: true },
  { id: 'wr2', patient: 'Sara Malik', type: 'Follow-up Reminder', scheduledFor: 'Tomorrow 8:00 AM', enabled: true },
  { id: 'wr3', patient: 'Bilal Ahmad', type: 'Missed Appointment', scheduledFor: 'Tomorrow 10:00 AM', enabled: false },
];

// ═══ ANALYTICS PERIODS ═══
export const AN_PERIODS: Record<string, AnalyticsPeriod> = {
  '6m': {
    key: '6m', revenue: '₨264k', retention: '74%', rating: '4.8', avgPerPatient: '₨1,065', noShow: '18%',
    revenueChange: '↑ 22% YoY', retentionChange: '↑ 8% vs prior', ratingCount: '156 reviews',
    avgChange: '↑ 12%', noShowChange: '↓ 4% improved',
    revenueBars: [
      { label: 'Oct', value: 32, amount: '₨32k' }, { label: 'Nov', value: 38, amount: '₨38k' },
      { label: 'Dec', value: 45, amount: '₨45k' }, { label: 'Jan', value: 41, amount: '₨41k' },
      { label: 'Feb', value: 52, amount: '₨52k' }, { label: 'Mar', value: 56, amount: '₨56k' },
    ],
    revLabel: 'Last 6 Months', revFoot: '₨42,500 earned this month (ongoing)',
  },
  '3m': {
    key: '3m', revenue: '₨149k', retention: '78%', rating: '4.9', avgPerPatient: '₨1,120', noShow: '15%',
    revenueChange: '↑ 18% YoY', retentionChange: '↑ 5% vs prior', ratingCount: '82 reviews',
    avgChange: '↑ 8%', noShowChange: '↓ 3% improved',
    revenueBars: [
      { label: 'Jan', value: 41, amount: '₨41k' }, { label: 'Feb', value: 52, amount: '₨52k' },
      { label: 'Mar', value: 56, amount: '₨56k' },
    ],
    revLabel: 'Last 3 Months', revFoot: '₨56,000 this month',
  },
  '1y': {
    key: '1y', revenue: '₨485k', retention: '71%', rating: '4.7', avgPerPatient: '₨980', noShow: '21%',
    revenueChange: '↑ 28% YoY', retentionChange: '↑ 12% vs prior', ratingCount: '312 reviews',
    avgChange: '↑ 15%', noShowChange: '↓ 6% improved',
    revenueBars: [
      { label: 'Apr', value: 28, amount: '₨28k' }, { label: 'May', value: 31, amount: '₨31k' },
      { label: 'Jun', value: 35, amount: '₨35k' }, { label: 'Jul', value: 33, amount: '₨33k' },
      { label: 'Aug', value: 38, amount: '₨38k' }, { label: 'Sep', value: 36, amount: '₨36k' },
      { label: 'Oct', value: 32, amount: '₨32k' }, { label: 'Nov', value: 38, amount: '₨38k' },
      { label: 'Dec', value: 45, amount: '₨45k' }, { label: 'Jan', value: 41, amount: '₨41k' },
      { label: 'Feb', value: 52, amount: '₨52k' }, { label: 'Mar', value: 56, amount: '₨56k' },
    ],
    revLabel: 'Last 12 Months', revFoot: '₨485,000 total revenue',
  },
  'ytd': {
    key: 'ytd', revenue: '₨149k', retention: '76%', rating: '4.8', avgPerPatient: '₨1,050', noShow: '16%',
    revenueChange: '↑ 20% YoY', retentionChange: '↑ 6% vs prior', ratingCount: '98 reviews',
    avgChange: '↑ 10%', noShowChange: '↓ 5% improved',
    revenueBars: [
      { label: 'Jan', value: 41, amount: '₨41k' }, { label: 'Feb', value: 52, amount: '₨52k' },
      { label: 'Mar', value: 56, amount: '₨56k' },
    ],
    revLabel: 'Year to Date', revFoot: '₨149,000 YTD',
  },
};

// ═══ TOP REMEDIES (Analytics) ═══
export const TOP_REMEDIES_ANALYTICS = [
  { name: 'Sulphur 30C', count: 42, pct: 100, color: 'var(--forest-mid)' },
  { name: 'Nat. Mur 200C', count: 35, pct: 83, color: 'var(--forest)' },
  { name: 'Pulsatilla 30C', count: 28, pct: 67, color: 'var(--sapphire)' },
  { name: 'Ignatia 200C', count: 22, pct: 52, color: 'var(--gold)' },
  { name: 'Belladonna 30C', count: 18, pct: 43, color: 'var(--forest-light)' },
];

// ═══ PEAK DAYS (Analytics) ═══
export const PEAK_DAYS = [
  { day: 'Mon', count: 32, pct: 50 }, { day: 'Tue', count: 41, pct: 65 },
  { day: 'Wed', count: 48, pct: 76 }, { day: 'Thu', count: 52, pct: 82 },
  { day: 'Fri', count: 28, pct: 44 }, { day: 'Sat', count: 63, pct: 100 },
];

// ═══ BILLING HISTORY ═══
export const BILLING_HISTORY = [
  { id: 'INV-2026-0036', patient: 'Ayesha Farooq', date: 'Mar 24', method: 'Cash', amount: '₨2,000', status: 'paid' as const, iconBg: 'var(--forest-bg)', iconColor: 'var(--forest)', icon: '✅' },
  { id: 'INV-2026-0035', patient: 'Fatima Zahra', date: 'Mar 23', method: 'JazzCash', amount: '₨1,300', status: 'paid' as const, iconBg: 'var(--sapphire-pale)', iconColor: 'var(--sapphire)', icon: '✅' },
  { id: 'INV-2026-0034', patient: 'Bilal Chaudhry', date: 'Mar 22', method: 'Cash', amount: '₨950', status: 'pending' as const, iconBg: 'var(--gold-pale)', iconColor: 'var(--gold)', icon: '⏳' },
  { id: 'INV-2026-0033', patient: 'Khalid Mehmood', date: 'Mar 21', method: 'EasyPaisa', amount: '₨1,800', status: 'paid' as const, iconBg: 'var(--forest-bg)', iconColor: 'var(--forest)', icon: '✅' },
  { id: 'INV-2026-0032', patient: 'Sana Imran', date: 'Mar 20', method: 'Bank', amount: '₨2,250', status: 'paid' as const, iconBg: 'var(--forest-bg)', iconColor: 'var(--forest)', icon: '✅' },
];

// ═══ COLLABORATION DATA ═══
export const COLLAB_CASES = [
  { id: 'cc1', patient: 'Ayesha Farooq', status: 'active' as const, doctor: 'Dr. Amina Siddiqui', lastUpdate: '2 hrs ago', summary: 'Discussing potency change from 200C to 30C for maintenance phase' },
  { id: 'cc2', patient: 'Bilal Chaudhry', status: 'active' as const, doctor: 'Dr. Rashid Malik', lastUpdate: 'Yesterday', summary: 'Joint assessment — considering Rhus Tox vs Bryonia' },
  { id: 'cc3', patient: 'Khalid Mehmood', status: 'pending' as const, doctor: 'Dr. Tariq Hussain', lastUpdate: '3 days ago', summary: 'External referral for diabetes management consultation' },
];

export const COLLAB_NOTES = [
  { id: 'cn1', patient: 'Ayesha Farooq', doctor: 'Dr. Amina Siddiqui', text: 'Recommend stepping down Nat. Mur to 30C. Patient showing sustained improvement at 200C level. Maintenance dose appropriate now.', time: '2 hrs ago', avatar: 'DA' },
  { id: 'cn2', patient: 'Bilal Chaudhry', doctor: 'Dr. Rashid Malik', text: 'Skin symptoms persisting despite Sulphur. Consider Graphites or Mezereum as differential. Need to reassess miasm classification.', time: 'Yesterday', avatar: 'DR' },
  { id: 'cn3', patient: 'Ayesha Farooq', doctor: 'Dr. Rashid Malik', text: 'CT scan results normal. Sinusitis improving clinically. Continue current plan.', time: '3 days ago', avatar: 'DR' },
  { id: 'cn4', patient: 'Khalid Mehmood', doctor: 'Dr. Amina Siddiqui', text: 'Blood sugar trending down with Syzygium Q. HbA1c improved from 8.2 to 7.1. Continue and monitor.', time: '5 days ago', avatar: 'DA' },
];

export const INCOMING_REQUESTS = [
  { id: 'ir1', from: 'Dr. Amina Siddiqui', patient: 'Ayesha Farooq', type: 'Second Opinion', message: 'Should we switch to Sulphur given the persistent skin symptoms alongside sinusitis?', time: '2 hrs ago' },
  { id: 'ir2', from: 'Dr. Tariq Hussain', patient: 'Khalid Mehmood', type: 'Referral Response', message: 'I can see the patient next Tuesday. Please send full case file.', time: 'Yesterday' },
];

// ═══ TIMELINE SYMPTOM DATA ═══
export const SYMPTOM_DATA: Record<string, { name: string; periods: Record<string, number>; initial: number; color: string; change: string }[]> = {
  ayesha: [
    { name: 'Nasal Congestion', periods: { '3m': 25, '6m': 40, '1y': 60 }, initial: 85, color: 'var(--forest-mid)', change: '↓ 60%' },
    { name: 'Headaches', periods: { '3m': 30, '6m': 45, '1y': 55 }, initial: 75, color: 'var(--gold)', change: '↓ 45%' },
    { name: 'Sneezing', periods: { '3m': 40, '6m': 50, '1y': 60 }, initial: 60, color: 'var(--sapphire)', change: '↓ 20%' },
    { name: 'Fatigue', periods: { '3m': 20, '6m': 35, '1y': 50 }, initial: 70, color: 'var(--purple)', change: '↓ 50%' },
    { name: 'Sleep Issues', periods: { '3m': 15, '6m': 30, '1y': 45 }, initial: 55, color: 'var(--crimson)', change: '↓ 40%' },
  ],
  bilal: [
    { name: 'Joint Pain', periods: { '3m': 40, '6m': 55, '1y': 70 }, initial: 80, color: 'var(--forest-mid)', change: '↓ 40%' },
    { name: 'Skin Eruptions', periods: { '3m': 50, '6m': 60, '1y': 75 }, initial: 85, color: 'var(--gold)', change: '↓ 35%' },
    { name: 'Insomnia', periods: { '3m': 35, '6m': 50, '1y': 65 }, initial: 70, color: 'var(--sapphire)', change: '↓ 35%' },
  ],
  sana: [
    { name: 'Anxiety', periods: { '3m': 30, '6m': 45, '1y': 65 }, initial: 80, color: 'var(--forest-mid)', change: '↓ 50%' },
    { name: 'Hair Loss', periods: { '3m': 45, '6m': 55, '1y': 70 }, initial: 75, color: 'var(--gold)', change: '↓ 30%' },
  ],
  khalid: [
    { name: 'Blood Sugar', periods: { '3m': 55, '6m': 65, '1y': 80 }, initial: 90, color: 'var(--forest-mid)', change: '↓ 35%' },
    { name: 'Knee Pain', periods: { '3m': 60, '6m': 70, '1y': 80 }, initial: 85, color: 'var(--gold)', change: '↓ 25%' },
    { name: 'BP Readings', periods: { '3m': 40, '6m': 55, '1y': 70 }, initial: 75, color: 'var(--sapphire)', change: '↓ 35%' },
  ],
};

// ═══ CLINIC SETUP — FEATURES ═══
export const SETUP_FEATURES = [
  { id: 'ai', name: 'AI Prescription Assistant', description: 'Claude-powered remedy suggestions based on symptoms and materia medica', enabled: true, badge: 'Recommended' },
  { id: 'whatsapp', name: 'WhatsApp Automation', description: 'Send appointment reminders, prescription details, and follow-up messages', enabled: true, badge: 'Recommended' },
  { id: 'inventory', name: 'Smart Inventory', description: 'Auto-deduction when prescriptions are saved, expiry alerts, reorder predictions', enabled: true, badge: 'Recommended' },
  { id: 'multiclinic', name: 'Multi-Clinic Support', description: 'Manage multiple clinic locations from a single dashboard', enabled: false, badge: 'Pro' },
  { id: 'collab', name: 'Doctor Collaboration', description: 'Share cases, request second opinions, and collaborate on treatment plans', enabled: true },
  { id: 'analytics', name: 'Advanced Analytics', description: 'Revenue trends, patient demographics, remedy effectiveness reports', enabled: true },
  { id: 'timeline', name: 'Patient Timeline', description: 'Complete longitudinal medical record with symptom tracking', enabled: true },
  { id: 'pdf', name: 'PDF Prescriptions', description: 'Generate professional PDF prescriptions with clinic branding', enabled: true },
];

// ═══ CLINIC SETUP — DEFAULT HOURS ═══
export const DEFAULT_HOURS = [
  { day: 'Monday', open: '09:00', close: '17:00', enabled: true },
  { day: 'Tuesday', open: '09:00', close: '17:00', enabled: true },
  { day: 'Wednesday', open: '09:00', close: '17:00', enabled: true },
  { day: 'Thursday', open: '09:00', close: '17:00', enabled: true },
  { day: 'Friday', open: '09:00', close: '17:00', enabled: true },
  { day: 'Saturday', open: '09:00', close: '14:00', enabled: true },
  { day: 'Sunday', open: '', close: '', enabled: false },
];

// ═══ TEAM MEMBERS ═══
export const ALL_TEAM_MEMBERS = [
  { name: 'Dr. Rashid Malik', init: 'DR', role: 'admin' as const, email: 'admin@herbamed.pk', phone: '0321-000001', clinic: 'rawalpindi' as const, status: 'active' as const, lastActive: 'Now', avatar: 'av1' },
  { name: 'Dr. Amina Siddiqui', init: 'DA', role: 'doctor' as const, email: 'doctor@herbamed.pk', phone: '0300-111222', clinic: 'islamabad' as const, status: 'active' as const, lastActive: '10 min ago', avatar: 'av2' },
  { name: 'Dr. Farhan Ali', init: 'FA', role: 'doctor' as const, email: 'farhan@herbamed.pk', phone: '0321-1112222', clinic: 'rawalpindi' as const, status: 'active' as const, lastActive: '2 hrs ago', avatar: 'av6' },
  { name: 'Zainab Khan', init: 'ZK', role: 'receptionist' as const, email: 'zainab@herbamed.pk', phone: '0321-000002', clinic: 'rawalpindi' as const, status: 'active' as const, lastActive: '30 min ago', avatar: 'av3' },
  { name: 'Ali Hassan', init: 'AH', role: 'receptionist' as const, email: 'ali@herbamed.pk', phone: '0311-3334444', clinic: 'islamabad' as const, status: 'inactive' as const, lastActive: 'Yesterday', avatar: 'av4' },
];

// ═══ DASHBOARD REMEDY TABLE ═══
export const TOP_REMEDIES_DASHBOARD = [
  { rank: 1, name: 'Natrum Muriaticum', count: '14×', response: 'Excellent', respCls: 'rt-e', success: '92%', successCls: 'td-s' },
  { rank: 2, name: 'Sulphur', count: '11×', response: 'Good', respCls: 'rt-g', success: '85%', successCls: 'td-s' },
  { rank: 3, name: 'Pulsatilla', count: '9×', response: 'Moderate', respCls: 'rt-m', success: '68%', successCls: 'td-w' },
  { rank: 4, name: 'Lycopodium', count: '7×', response: 'Good', respCls: 'rt-g', success: '81%', successCls: 'td-s' },
  { rank: 5, name: 'Arsenicum Album', count: '6×', response: 'Excellent', respCls: 'rt-e', success: '94%', successCls: 'td-s' },
];

// ═══ DASHBOARD ACTIVITY FEED ═══
export const ACTIVITY_FEED = [
  { dot: 'var(--primary)', text: '<strong>You</strong> prescribed Nat. Mur 200C + Pulsatilla 30C for Ayesha', time: '2 hrs' },
  { dot: 'var(--info)', text: '<strong>Dr. Amina</strong> commented on Ayesha\'s case', time: '3 hrs' },
  { dot: 'var(--success)', text: '<strong>Ahmed Khan</strong> submitted symptom diary — headache reduced', time: '5 hrs' },
  { dot: 'var(--accent)', text: '<strong>System</strong> marked Sulphur 30C completed for Bilal', time: 'Yesterday' },
  { dot: 'var(--purple)', text: '<strong>Dr. Farhan</strong> endorsed treatment plan for case review', time: 'Yesterday' },
  { dot: 'var(--primary)', text: '<strong>You</strong> registered Fatima Noor (PID-128)', time: '2 days' },
  { dot: 'var(--warning)', text: '<strong>System</strong> flagged 5 overdue follow-ups', time: '2 days' },
  { dot: 'var(--success)', text: '<strong>Sara Malik</strong> — Score improved 68→82', time: '3 days' },
];
