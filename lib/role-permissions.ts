/* ═══════════════════════════════════════
   ROLE PERMISSIONS
   Exact mapping from original app.js ROLE_PERMISSIONS
═══════════════════════════════════════ */
import type { Role, FrameId } from './types';

export const ROLE_PERMISSIONS: Record<Role, FrameId[]> = {
  admin: [
    'dashboard', 'patient_list', 'library',
    'ai_assistant', 'ai_chat', 'ai_case', 'ai_remedy',
    'patient_timeline', 'prescriptions', 'inventory',
    'appointments', 'whatsapp', 'billing', 'analytics',
    'clinic_setup', 'multi_clinic', 'team', 'sync', 'collaboration',
  ],
  doctor: [
    'dashboard', 'patient_list', 'library',
    'ai_assistant', 'ai_chat', 'ai_case', 'ai_remedy',
    'patient_timeline', 'prescriptions', 'inventory',
    'appointments', 'whatsapp', 'collaboration',
  ],
  receptionist: [
    'dashboard', 'patient_list', 'library',
    'appointments', 'billing', 'whatsapp',
  ],
};

export const FRAME_TITLES: Record<FrameId, string> = {
  dashboard: 'Dashboard',
  clinic_setup: 'Clinic Setup',
  ai_assistant: 'AI Prescription Assistant',
  ai_chat: 'AI Consult Chat',
  ai_case: 'Case Analyzer',
  ai_remedy: 'Remedy Explainer',
  patient_timeline: 'Patient Timeline',
  patient_list: 'Patients',
  prescriptions: 'Prescriptions',
  inventory: 'Smart Inventory',
  appointments: 'Appointments',
  whatsapp: 'WhatsApp Automation',
  billing: 'Billing & Payments',
  analytics: 'Analytics & Reports',
  multi_clinic: 'Multi-Clinic Management',
  team: 'Team & Roles',
  sync: 'Cloud & Sync',
  collaboration: 'Doctor Collaboration',
  library: 'Knowledge Library',
};

export const AI_FRAME_IDS: FrameId[] = ['ai_assistant', 'ai_chat', 'ai_case', 'ai_remedy'];
