"use client";
/* ═══════════════════════════════════════
   usePrescription
   Converts: addRxRow (L5168), removeRxRow (L5175),
   updatePreview (L5334), clearRxForm, applyTemplate (L5177),
   applySuggestion (L8481), addDietChip (L4431),
   removeDietChip, filterRxByPatient (L3892),
   saveRxAndDispatch (L3919), openNewRxForPatient (L3880)
═══════════════════════════════════════ */
import { useState, useCallback, useMemo } from 'react';
import { RX_TEMPLATES, DIET_OPTIONS } from '@/lib/constants-data';
import { RX_MED_LIST } from '@/lib/constants-data';
import { PATIENTS_DATA } from '@/lib/constants';
import { uid, todayISO } from '@/lib/utils';
import type { RemedyRow } from '@/lib/types';

export function usePrescription() {
  const [selectedPatient, setSelectedPatient] = useState('ayesha');
  const [date, setDate] = useState(todayISO());
  const [diagnosis, setDiagnosis] = useState('');
  const [instructions, setInstructions] = useState('');
  const [showAiSuggestion, setShowAiSuggestion] = useState(true);
  const [remedies, setRemedies] = useState<RemedyRow[]>([
    { id: uid('rx'), name: 'Natrum Muriaticum', potency: '200C', dosage: '2 drops', qty: '1', frequency: 'BD', duration: '14 days' },
  ]);
  const [dietChips, setDietChips] = useState<string[]>(['No coffee', 'No raw onion']);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Patient data
  const patientData = PATIENTS_DATA[selectedPatient];
  const patientRxHistory = patientData?.rxHistory || [];

  // ── Add remedy row (original addRxRow L5168) ──
  const addRemedyRow = useCallback(() => {
    setRemedies(prev => [...prev, {
      id: uid('rx'),
      name: '', potency: '30C', dosage: '2 drops', qty: '1', frequency: 'BD', duration: '7 days',
    }]);
  }, []);

  // ── Remove remedy row (original removeRxRow L5175) ──
  const removeRemedyRow = useCallback((id: string) => {
    setRemedies(prev => prev.filter(r => r.id !== id));
  }, []);

  // ── Update remedy field ──
  const updateRemedy = useCallback((id: string, field: keyof RemedyRow, value: string) => {
    setRemedies(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  }, []);

  // ── Apply template (original applyTemplate L5177) ──
  const applyTemplate = useCallback((templateId: string) => {
    const tpl = RX_TEMPLATES[templateId];
    if (!tpl) return;
    setSelectedTemplate(templateId);
    setRemedies(tpl.remedies.map(r => ({ ...r, id: uid('rx'), qty: '1' })));
    if (tpl.diet) setDietChips(tpl.diet);
    if (tpl.instructions) setInstructions(tpl.instructions);
  }, []);

  // ── Apply AI suggestion (original applySuggestion L8481) ──
  const applySuggestion = useCallback(() => {
    // Add suggested remedy based on patient history
    const suggested = patientRxHistory.find(r => r.response === 'excellent');
    if (suggested) {
      setRemedies(prev => {
        // Check if already exists
        if (prev.some(r => r.name.includes(suggested.remedies))) return prev;
        return [...prev, {
          id: uid('rx'),
          name: suggested.remedies,
          potency: suggested.potency,
          dosage: suggested.dosage.split(' ')[0] + ' ' + suggested.dosage.split(' ')[1],
          qty: '1',
          frequency: suggested.dosage.includes('BD') ? 'BD' : suggested.dosage.includes('TDS') ? 'TDS' : 'OD',
          duration: suggested.duration,
        }];
      });
    }
    setShowAiSuggestion(false);
  }, [patientRxHistory]);

  // ── Diet chips (original addDietChip L4431, removeDietChip) ──
  const addDietChip = useCallback((chip: string) => {
    if (!chip.trim() || dietChips.includes(chip.trim())) return;
    setDietChips(prev => [...prev, chip.trim()]);
  }, [dietChips]);

  const removeDietChip = useCallback((chip: string) => {
    setDietChips(prev => prev.filter(c => c !== chip));
  }, []);

  // ── Clear form (original clearRxForm) ──
  const clearForm = useCallback(() => {
    setRemedies([{ id: uid('rx'), name: '', potency: '30C', dosage: '2 drops', qty: '1', frequency: 'BD', duration: '7 days' }]);
    setDiagnosis('');
    setInstructions('');
    setDietChips([]);
    setSelectedTemplate('');
    setShowAiSuggestion(true);
  }, []);

  // ── Live preview data (original updatePreview L5334) ──
  const previewData = useMemo(() => {
    const p = patientData;
    if (!p) return null;
    return {
      patientName: p.name,
      date,
      diagnosis,
      remedies: remedies.filter(r => r.name),
      diet: dietChips,
      instructions,
      doctorName: 'Dr. Rashid Malik',
      clinicName: 'HerbaMed Pro Clinic',
    };
  }, [patientData, date, diagnosis, remedies, dietChips, instructions]);

  // ── Save (original saveRxAndDispatch L3919) ──
  const saveRx = useCallback(() => {
    const validRemedies = remedies.filter(r => r.name.trim());
    if (validRemedies.length === 0) return { success: false, error: 'Add at least one remedy' };
    // In real app, this would call an API
    return { success: true, remedies: validRemedies, patient: selectedPatient };
  }, [remedies, selectedPatient]);

  // ── Switch patient (original openNewRxForPatient L3880) ──
  const switchPatient = useCallback((patientId: string) => {
    setSelectedPatient(patientId);
    setShowAiSuggestion(true);
  }, []);

  // ── Repeat last Rx (original tlLastRxRepeat) ──
  const repeatLastRx = useCallback(() => {
    const lastRx = patientRxHistory[0];
    if (!lastRx) return;
    setRemedies([{
      id: uid('rx'),
      name: lastRx.remedies,
      potency: lastRx.potency,
      dosage: lastRx.dosage.split(' ').slice(0, 2).join(' '),
      qty: '1',
      frequency: lastRx.dosage.includes('BD') ? 'BD' : lastRx.dosage.includes('TDS') ? 'TDS' : 'OD',
      duration: lastRx.duration,
    }]);
  }, [patientRxHistory]);

  return {
    // State
    selectedPatient, date, diagnosis, instructions,
    showAiSuggestion, remedies, dietChips, selectedTemplate,
    patientData, patientRxHistory, previewData,

    // Setters
    setDate, setDiagnosis, setInstructions,

    // Actions
    switchPatient,
    addRemedyRow, removeRemedyRow, updateRemedy,
    applyTemplate, applySuggestion,
    addDietChip, removeDietChip,
    clearForm, saveRx, repeatLastRx,
    setShowAiSuggestion,

    // Data
    availableMedicines: RX_MED_LIST,
    dietOptions: DIET_OPTIONS,
    templateOptions: Object.keys(RX_TEMPLATES),
  };
}
