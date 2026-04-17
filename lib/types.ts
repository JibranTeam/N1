/* ═══════════════════════════════════════
   COMPLETE TYPE DEFINITIONS
   Maps 1:1 to all data structures in app.js
═══════════════════════════════════════ */

// ── Auth ──
export type Role = 'admin' | 'doctor' | 'receptionist';
export type ClinicId = 'rawalpindi' | 'islamabad';

export interface User {
  name: string;
  email: string;
  role: Role;
  clinic: ClinicId;
  initials: string;
  roleLabel: string;
}

export interface DemoUser {
  role: Role;
  name: string;
  email: string;
  emoji: string;
  initials: string;
  roleLabel: string;
  clinic: ClinicId;
}

// ── Navigation ──
export type FrameId =
  | 'dashboard' | 'patient_list' | 'library'
  | 'ai_assistant' | 'ai_chat' | 'ai_case' | 'ai_remedy'
  | 'patient_timeline' | 'prescriptions' | 'inventory'
  | 'appointments' | 'whatsapp' | 'billing' | 'analytics'
  | 'clinic_setup' | 'multi_clinic' | 'team' | 'sync' | 'collaboration';

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface NavItem {
  id: FrameId | string;
  label: string;
  icon: string; // SVG path key
  badge?: { text: string; variant: 'red' | 'gold' | 'blue' };
  children?: NavSubItem[];
}

export interface NavSubItem {
  id: FrameId;
  label: string;
  icon: string;
}

// ── Clinic ──
export interface ClinicData {
  name: string;
  city: string;
  address: string;
  phone: string;
  doctors: number;
  patients: number;
  revenue: string;
  lowStock: number;
  todayAppts: number;
}

// ── Patient ──
export interface Patient {
  id: string;
  name: string;
  init: string;
  av: string;
  gen: 'M' | 'F';
  age: number;
  conds: string[];
  condCls: string[];
  miasm: string;
  mCls: string;
  score: number;
  scrCls: string;
  trend: string;
  tCls: string;
  st: string;
  stCls: string;
  lastV: string;
  lastSub: string;
  nextV: string;
  nextSub: string;
  nextOv: boolean;
  visits: number;
  phone: string;
  email: string;
  city: string;
  clinic: string;
  rx: PatientRx[];
}

export interface PatientRx {
  n: string; // remedy name + potency
  d: string; // dosage details
}

// ── Schedule ──
export interface ScheduleItem {
  t: string;   // time
  n: string;   // name
  d: string;   // detail
  c: string;   // color class
  tag: string;
  tc: string;  // tag color class
  done?: boolean;
  now?: boolean;
}

export interface ScheduleData {
  sub: string;
  items: ScheduleItem[];
}

// ── Tasks ──
export interface Task {
  id: string;
  text: string;
  due: string;
  priority: 'high' | 'medium' | 'low';
  done: boolean;
}

// ── Notes ──
export interface Note {
  id: string;
  text: string;
  time: string;
}

// ── Toast ──
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

// ── Modal ──
export type ModalId =
  | 'new-patient' | 'new-rx' | 'book-appt' | 'new-invoice'
  | 'broadcast' | 'dispatch' | 'edit-patient'
  | 'add-clinic' | 'add-member' | 'add-medicine'
  | 'reorder' | 'add-care-team' | 'new-referral'
  | 'request-opinion' | 'add-collab-note' | 'upload-doc'
  | 'pdf-preview' | 'booking' | 'walkin'
  | null;

// ── Inventory ──
export type StockStatus = 'in-stock' | 'low' | 'critical';

export interface Medicine {
  name: string;
  pot: string;
  batch: string;
  stock: number;
  cap: number;
  cost: number;
  runout: string;
  exp: string;
  st: StockStatus;
  cat: string;
  mu: number; // monthly usage
  form?: string;
  supplier?: string;
}

export interface InventoryMovement {
  text: string;
  time: string;
  color: string;
}

// ── Prescriptions ──
export interface RemedyRow {
  id: string;
  name: string;
  potency: string;
  dosage: string;
  qty: string;
  frequency: string;
  duration: string;
}

export interface RxHistoryItem {
  date: string;
  remedy: string;
  potency: string;
  duration: string;
  rxCount: string;
  response: 'excellent' | 'good' | 'moderate' | 'pending';
  status: 'active' | 'done';
}

export interface ClinicalDocument {
  id: string;
  name: string;
  type: string;
  icon: string;
  meta: string;
  iconBg: string;
  iconColor: string;
}

export interface AuditEntry {
  who: string;
  action: string;
  time: string;
  color: string;
}

export interface RxTemplate {
  id: string;
  label: string;
  remedies: Omit<RemedyRow, 'id'>[];
  diet?: string[];
  instructions?: string;
}

// ── Appointments ──
export type CalView = 'month' | 'week' | 'day' | 'list';

export interface CalendarState {
  year: number;
  month: number; // 0-indexed
  view: CalView;
  selectedDate: Date;
}

export interface Appointment {
  id: string;
  time: string;
  endTime?: string;
  name: string;
  type: string;
  typeCls: string;
  phone?: string;
  miasm?: string;
  visit?: number;
  status: 'confirmed' | 'checked-in' | 'in-progress' | 'completed' | 'no-show' | 'cancelled';
  label: string;
  date: string; // YYYY-MM-DD
  duration?: number; // minutes
  notes?: string;
}

export interface AppointmentStats {
  total: number;
  confirmed: number;
  completed: number;
  noShow: number;
  cancelled: number;
  newPatients: number;
}

// ── Billing ──
export interface InvoiceItem {
  label: string;
  amount: number;
}

export interface Invoice {
  id: string;
  patient: string;
  date: string;
  items: InvoiceItem[];
  discount: number;
  total: number;
  method: string;
  status: 'paid' | 'pending' | 'overdue';
}

// ── Analytics ──
export interface AnalyticsPeriod {
  key: string;
  revenue: string;
  retention: string;
  rating: string;
  avgPerPatient: string;
  noShow: string;
  revenueChange: string;
  retentionChange: string;
  ratingCount: string;
  avgChange: string;
  noShowChange: string;
  revenueBars: { label: string; value: number; amount: string }[];
  revLabel: string;
  revFoot: string;
}

// ── WhatsApp ──
export interface WaTemplate {
  id: number;
  label: string;
  text: string;
  enabled: boolean;
}

export interface WaSentMessage {
  name: string;
  msg: string;
  time: string;
  tick: string;
  icon: string;
}

export interface WaReminder {
  id: string;
  patient: string;
  type: string;
  scheduledFor: string;
  enabled: boolean;
}

// ── Timeline ──
export interface TimelineEntry {
  date: string;
  type: 'visit' | 'rx' | 'symptom' | 'note' | 'lab';
  title: string;
  detail: string;
  doctor: string;
  response?: string;
  tags?: string[];
}

export interface SymptomData {
  name: string;
  periods: { '3m': number; '6m': number; '1y': number };
  initial: number;
  color: string;
  change: string;
}

export interface TimelinePatient {
  id: string;
  name: string;
  init: string;
  age: number;
  gen: string;
  miasm: string;
  since: string;
  phone: string;
  score: number;
  visits: number;
  tags: string[];
  timeline: TimelineEntry[];
  symptoms: SymptomData[];
  rxHistory: RxHistoryItem[];
  documents: ClinicalDocument[];
}

// ── Collaboration ──
export interface CollabCase {
  id: string;
  patient: string;
  doctor: string;
  status: 'active' | 'resolved' | 'pending';
  lastUpdate: string;
  summary: string;
}

export interface CollabNote {
  id: string;
  patient: string;
  doctor: string;
  text: string;
  time: string;
  avatar: string;
}

export interface CollabReferral {
  id: string;
  patient: string;
  from: string;
  to: string;
  reason: string;
  status: 'pending' | 'accepted' | 'declined';
  date: string;
}

// ── Team ──
export interface TeamMember {
  name: string;
  init: string;
  role: Role;
  email: string;
  phone: string;
  clinic: ClinicId;
  status: 'active' | 'inactive';
  lastActive: string;
  avatar: string;
}

// ── Clinic Setup ──
export interface ClinicSetupData {
  step: number;
  clinicName: string;
  ownerName: string;
  license: string;
  type: string;
  specialization: string;
  phone: string;
  email: string;
  address: string;
  logo: string | null;
  themeColor: string;
  hours: DaySchedule[];
  features: FeatureToggle[];
}

export interface DaySchedule {
  day: string;
  open: string;
  close: string;
  enabled: boolean;
}

export interface FeatureToggle {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  badge?: string;
}

// ── Library ──
export interface LibraryBook {
  id: string;
  name: string;
  icon: string;
  category: string;
  content: string;
  pages?: number;
}

export interface LibraryState {
  query: string;
  results: LibrarySearchResult[];
  aiAnswer: string | null;
  books: LibraryBook[];
  removedBooks: LibraryBook[];
  activeBook: string | null;
  sidebarOpen: boolean;
  recentSearches: string[];
  recentOpen: boolean;
}

export interface LibrarySearchResult {
  name: string;
  snippet: string;
  structured: {
    use: string;
    type: string;
    note: string;
  };
}

// ── Search ──
export interface SearchIndexItem {
  icon: string;
  label: string;
  sub: string;
  type: 'Patient' | 'Page' | 'Medicine';
  action: () => void;
}

// ── Performance ──
export interface PerformanceData {
  improving: string;
  visits: string;
  newPatients: string;
  avgRemedies: string;
  followupRate: string;
  noImprove: string;
  subtitle: string;
  chartLabel: string;
  bars: number[];
}

// ── Notification ──
export interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  read: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
}

// ── PDF ──
export interface PdfPreviewState {
  open: boolean;
  title: string;
  html: string;
}
