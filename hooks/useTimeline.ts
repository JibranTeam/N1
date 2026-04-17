"use client";
/* ═══════════════════════════════════════
   useTimeline
   Converts: switchTimelinePatient (L6462),
   switchTLView (L6367), tlFilter (L6404),
   tlPeriod (L6417), openTimelineCardDetail (L6031),
   closeTlDetail (L5998), toggleRxStatus (L6010),
   showRxDetail (L6521), printPatientRecords (L5504),
   bindTimelineCardClicks (L6116)
═══════════════════════════════════════ */
import { useState, useCallback, useMemo } from 'react';
import { PATIENTS_DATA } from '@/lib/constants';
import { SYMPTOM_DATA } from '@/lib/constants-data';
import type { TimelineEntry } from '@/lib/types';

type TLView = 'patient' | 'collab';
type TLFilter = 'all' | 'visit' | 'rx' | 'symptom';
type SymptomPeriod = '3m' | '6m' | '1y';

// ── Timeline entries per patient ──
const TIMELINE_ENTRIES: Record<string, TimelineEntry[]> = {
  ayesha: [
    { date: 'Mar 24, 2026', type: 'visit', title: 'Follow-up Visit #8', detail: 'Sinusitis improving. Nasal discharge reduced by 60%. Headaches less frequent — from daily to 2x/week. Sleep quality improved.', doctor: 'Dr. Rizwan', response: 'Excellent' },
    { date: 'Mar 24, 2026', type: 'rx', title: 'Prescription Updated', detail: 'Nat. Mur 200C BD × 14 days continued. Added Pulsatilla 30C TDS × 7 days for seasonal allergy onset.', doctor: 'Dr. Rizwan' },
    { date: 'Mar 10, 2026', type: 'visit', title: 'Follow-up Visit #7', detail: 'Patient reports 60% improvement overall. Sleep quality better. Headaches less intense. Mood significantly improved.', doctor: 'Dr. Rizwan', response: 'Good' },
    { date: 'Feb 10, 2026', type: 'rx', title: 'Potency Change', detail: 'Stepped up from Nat. Mur 30C to 200C. Patient showed clear signs of readiness — aggravation resolved, plateau reached.', doctor: 'Dr. Rizwan' },
    { date: 'Jan 14, 2026', type: 'symptom', title: 'Symptom Diary Update', detail: 'Patient reports new sneezing episodes in morning, worse on waking. Possible seasonal trigger identified.', doctor: 'Patient' },
    { date: 'Dec 29, 2025', type: 'visit', title: 'Follow-up Visit #6', detail: 'Good overall progress. Weight stable at 58kg. Emotional state much improved — less reserved, engaging more socially.', doctor: 'Dr. Rizwan', response: 'Good' },
    { date: 'Nov 15, 2025', type: 'rx', title: 'Initial Prescription', detail: 'Started Nat. Mur 30C BD × 21 days. Constitutional remedy based on grief history, reserved personality, salt craving.', doctor: 'Dr. Rizwan' },
    { date: 'Nov 15, 2025', type: 'visit', title: 'First Consultation', detail: 'New patient. Chief complaint: chronic sinusitis × 3 years. Associated headaches above eyes, worse morning. History of suppressed grief.', doctor: 'Dr. Rizwan' },
  ],
  bilal: [
    { date: 'Mar 20, 2026', type: 'visit', title: 'Follow-up Visit #5', detail: 'Joint pain improved but skin eruptions persisting. May need miasm reassessment.', doctor: 'Dr. Amina', response: 'Moderate' },
    { date: 'Mar 20, 2026', type: 'rx', title: 'Prescription Updated', detail: 'Thuja 200C BD × 21 days. Considering Graphites if skin symptoms persist beyond 2 weeks.', doctor: 'Dr. Amina' },
    { date: 'Feb 01, 2026', type: 'visit', title: 'Follow-up Visit #4', detail: 'Joint mobility improved. Eczema patches still active on forearms. Sleep slightly better with Nux Vomica.', doctor: 'Dr. Amina', response: 'Good' },
  ],
  sana: [
    { date: 'Mar 15, 2026', type: 'visit', title: 'Follow-up Visit #3', detail: 'Anxiety levels significantly reduced. Hair fall slowing. Patient more confident in social situations.', doctor: 'Dr. Rizwan', response: 'Excellent' },
    { date: 'Mar 15, 2026', type: 'rx', title: 'Prescription Continued', detail: 'Ignatia 200C showing excellent response. Continue BD × 14 days. Monitor for any proving symptoms.', doctor: 'Dr. Rizwan' },
  ],
  khalid: [
    { date: 'Mar 10, 2026', type: 'visit', title: 'Follow-up Visit #12', detail: 'Blood sugar trending down — fasting 128 from 145. Knee pain stable. BP 130/85.', doctor: 'Dr. Rizwan', response: 'Moderate' },
    { date: 'Mar 10, 2026', type: 'rx', title: 'Prescription Updated', detail: 'Syzygium Q TDS continued. Added Lycopodium 200C weekly for constitutional support.', doctor: 'Dr. Rizwan' },
  ],
};

// ── Documents per patient ──
const PATIENT_DOCUMENTS: Record<string, { id: string; name: string; type: string; icon: string; meta: string; iconBg: string }[]> = {
  ayesha: [
    { id: 'doc1', name: 'Constitutional Case Analysis', type: 'PDF', icon: '📄', meta: 'PDF · 2.4 MB · Dr. Rizwan · Jan 5, 2025', iconBg: 'background:#ebf5fb;color:#2980b9' },
    { id: 'doc2', name: 'Lab Results — CBC & IgE', type: 'PDF', icon: '🧪', meta: 'PDF · 1.1 MB · Feb 3, 2026', iconBg: 'background:#eafaf1;color:var(--forest)' },
    { id: 'doc3', name: 'Sinus CT Scan Report', type: 'DICOM', icon: '📸', meta: 'DICOM · 8.7 MB · Jan 15, 2026', iconBg: 'background:#fff4e0;color:var(--gold)' },
  ],
  bilal: [
    { id: 'doc4', name: 'Skin Biopsy Report', type: 'PDF', icon: '🧪', meta: 'PDF · 0.8 MB · Feb 15, 2026', iconBg: 'background:#eafaf1;color:var(--forest)' },
  ],
  sana: [
    { id: 'doc5', name: 'Thyroid Panel Results', type: 'PDF', icon: '🧪', meta: 'PDF · 0.6 MB · Mar 1, 2026', iconBg: 'background:#eafaf1;color:var(--forest)' },
  ],
  khalid: [
    { id: 'doc6', name: 'HbA1c Report', type: 'PDF', icon: '🧪', meta: 'PDF · 0.4 MB · Feb 28, 2026', iconBg: 'background:#eafaf1;color:var(--forest)' },
    { id: 'doc7', name: 'Knee X-Ray', type: 'DICOM', icon: '📸', meta: 'DICOM · 5.2 MB · Jan 10, 2026', iconBg: 'background:#fff4e0;color:var(--gold)' },
  ],
};

export function useTimeline() {
  const [selectedPatient, setSelectedPatient] = useState('ayesha');
  const [activeView, setActiveView] = useState<TLView>('patient');
  const [timelineFilter, setTimelineFilter] = useState<TLFilter>('all');
  const [symptomPeriod, setSymptomPeriod] = useState<SymptomPeriod>('3m');
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailEntry, setDetailEntry] = useState<TimelineEntry | null>(null);

  // ── Patient data ──
  const patientData = PATIENTS_DATA[selectedPatient];
  const timelineEntries = TIMELINE_ENTRIES[selectedPatient] || [];
  const symptoms = SYMPTOM_DATA[selectedPatient] || [];
  const documents = PATIENT_DOCUMENTS[selectedPatient] || [];
  const rxHistory = patientData?.rxHistory || [];

  // ── Filtered timeline (original tlFilter L6404) ──
  const filteredTimeline = useMemo(() => {
    if (timelineFilter === 'all') return timelineEntries;
    return timelineEntries.filter(e => e.type === timelineFilter);
  }, [timelineEntries, timelineFilter]);

  // ── Symptom bars with current period (original tlPeriod L6417) ──
  const symptomBars = useMemo(() => {
    return symptoms.map(s => ({
      name: s.name,
      value: s.periods[symptomPeriod],
      initial: s.initial,
      color: s.color,
      change: s.change,
    }));
  }, [symptoms, symptomPeriod]);

  // ── Switch patient (original switchTimelinePatient L6462) ──
  const switchPatient = useCallback((id: string) => {
    setSelectedPatient(id);
    setTimelineFilter('all');
    setSymptomPeriod('3m');
    setDetailOpen(false);
    setDetailEntry(null);
  }, []);

  // ── Switch view tab (original switchTLView L6367) ──
  const switchView = useCallback((view: TLView) => {
    setActiveView(view);
  }, []);

  // ── Open detail drawer (original openTimelineCardDetail L6031) ──
  const openDetail = useCallback((entry: TimelineEntry) => {
    setDetailEntry(entry);
    setDetailOpen(true);
  }, []);

  // ── Close detail drawer (original closeTlDetail L5998) ──
  const closeDetail = useCallback(() => {
    setDetailOpen(false);
    setDetailEntry(null);
  }, []);

  // ── Toggle Rx status (original toggleRxStatus L6010) ──
  // In the original this toggles active/done on the Rx history table
  // Here it returns the toggled status — actual state lives in patientData
  const toggleRxStatus = useCallback((rxDate: string, rxRemedy: string) => {
    // This would mutate state in a real app
    return { date: rxDate, remedy: rxRemedy, toggled: true };
  }, []);

  // ── Available patients for dropdown ──
  const patientOptions = useMemo(() => {
    return Object.entries(PATIENTS_DATA).map(([id, p]) => ({
      id,
      name: p.name,
      initials: p.initials,
      miasm: p.miasm,
      score: p.score,
    }));
  }, []);

  return {
    // State
    selectedPatient, activeView, timelineFilter, symptomPeriod,
    detailOpen, detailEntry,

    // Data
    patientData, filteredTimeline, symptomBars, documents, rxHistory,
    patientOptions,

    // Actions
    switchPatient, switchView,
    setTimelineFilter, setSymptomPeriod,
    openDetail, closeDetail, toggleRxStatus,
  };
}
