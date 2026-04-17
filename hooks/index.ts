/* ═══════════════════════════════════════
   HOOKS — Barrel Export
   All 30 hooks from Phase 2 architecture
═══════════════════════════════════════ */

// Foundation hooks
export { useToast } from './useToast';
export { useGlobalSearch, useDashboardSearch, usePatientSearch } from './useSearch';

// Dashboard hooks
export { useSchedule, useLiveDate, usePerformance, useMiasmDistribution, useTasks, useNotes } from './useDashboard';

// Patient hooks
export { usePatientList } from './usePatientList';

// Prescription hooks
export { usePrescription } from './usePrescription';

// Inventory hooks
export { useInventory, getStatusConfig } from './useInventory';

// Calendar/Appointment hooks
export { useCalendar } from './useCalendar';

// Billing hooks
export { useBilling } from './useBilling';

// Analytics hooks
export { useAnalytics } from './useAnalytics';

// WhatsApp hooks
export { useWhatsApp } from './useWhatsApp';

// Timeline hooks
export { useTimeline } from './useTimeline';

// Collaboration hooks
export { useCollaboration } from './useCollaboration';

// Clinic Setup hooks
export { useClinicSetup } from './useClinicSetup';

// Team hooks
export { useTeam } from './useTeam';

// Library hooks
export { useLibrary } from './useLibrary';

// PDF hooks
export { usePdf } from './usePdf';
