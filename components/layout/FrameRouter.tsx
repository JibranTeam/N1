"use client";
/* ═══════════════════════════════════════
   FRAME ROUTER
   React equivalent of showFrame() frame-switching.
   Original: document.querySelectorAll('.frame').forEach(f => f.classList.remove('active'));
             document.getElementById('frame-'+id).classList.add('active');
   
   Now: renders only the active frame component.
   Each frame component renders with className="frame active"
   to keep original CSS animations (fadeUp) working.
═══════════════════════════════════════ */
import { lazy, Suspense } from 'react';
import { useApp } from '@/context/AppContext';
import type { FrameId } from '@/lib/types';

// Lazy load all frame components for code splitting
const DashboardFrame = lazy(() => import('@/components/frames/DashboardFrame'));
const PatientListFrame = lazy(() => import('@/components/frames/PatientListFrame'));
const PrescriptionsFrame = lazy(() => import('@/components/frames/PrescriptionsFrame'));
const InventoryFrame = lazy(() => import('@/components/frames/InventoryFrame'));
const AppointmentsFrame = lazy(() => import('@/components/frames/AppointmentsFrame'));
const BillingFrame = lazy(() => import('@/components/frames/BillingFrame'));
const AnalyticsFrame = lazy(() => import('@/components/frames/AnalyticsFrame'));
const PatientTimelineFrame = lazy(() => import('@/components/frames/PatientTimelineFrame'));
const WhatsAppFrame = lazy(() => import('@/components/frames/WhatsAppFrame'));
const AIAssistantFrame = lazy(() => import('@/components/frames/AIAssistantFrame'));
const AIChatFrame = lazy(() => import('@/components/frames/AIChatFrame'));
const AICaseFrame = lazy(() => import('@/components/frames/AICaseFrame'));
const AIRemedyFrame = lazy(() => import('@/components/frames/AIRemedyFrame'));
const ClinicSetupFrame = lazy(() => import('@/components/frames/ClinicSetupFrame'));
const MultiClinicFrame = lazy(() => import('@/components/frames/MultiClinicFrame'));
const TeamFrame = lazy(() => import('@/components/frames/TeamFrame'));
const SyncFrame = lazy(() => import('@/components/frames/SyncFrame'));
const CollaborationFrame = lazy(() => import('@/components/frames/CollaborationFrame'));
const LibraryFrame = lazy(() => import('@/components/frames/LibraryFrame'));

const FRAME_MAP: Record<FrameId, React.LazyExoticComponent<React.ComponentType>> = {
  dashboard: DashboardFrame,
  patient_list: PatientListFrame,
  prescriptions: PrescriptionsFrame,
  inventory: InventoryFrame,
  appointments: AppointmentsFrame,
  billing: BillingFrame,
  analytics: AnalyticsFrame,
  patient_timeline: PatientTimelineFrame,
  whatsapp: WhatsAppFrame,
  ai_assistant: AIAssistantFrame,
  ai_chat: AIChatFrame,
  ai_case: AICaseFrame,
  ai_remedy: AIRemedyFrame,
  clinic_setup: ClinicSetupFrame,
  multi_clinic: MultiClinicFrame,
  team: TeamFrame,
  sync: SyncFrame,
  collaboration: CollaborationFrame,
  library: LibraryFrame,
};

function FrameLoading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--slate-soft)', fontSize: '13px' }}>
      Loading…
    </div>
  );
}

export default function FrameRouter() {
  const { state } = useApp();
  const Component = FRAME_MAP[state.activeFrame] || DashboardFrame;

  return (
    <Suspense fallback={<FrameLoading />}>
      <Component />
    </Suspense>
  );
}
