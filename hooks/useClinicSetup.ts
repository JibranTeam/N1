"use client";
/* ═══════════════════════════════════════
   useClinicSetup
   Converts: goStep (L3820), completeSetup (L3861),
   toggleDayRow, 5-step wizard state management
═══════════════════════════════════════ */
import { useState, useCallback } from 'react';
import { DEFAULT_HOURS, SETUP_FEATURES } from '@/lib/constants-data';

export function useClinicSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Step 1: Clinic Info
  const [clinicName, setClinicName] = useState('HerbaMed Pro Clinic');
  const [ownerName, setOwnerName] = useState('Dr. Rashid Malik');
  const [license, setLicense] = useState('');
  const [clinicType, setClinicType] = useState('Homeopathic Clinic');
  const [specialization, setSpecialization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Step 2: Branding
  const [logo, setLogo] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState('#2d5a3d');

  // Step 3: Hours
  const [hours, setHours] = useState([...DEFAULT_HOURS]);

  // Step 4: Team (managed by useTeam hook)

  // Step 5: Features
  const [features, setFeatures] = useState([...SETUP_FEATURES]);

  // ── goStep (original L3820) ──
  const goStep = useCallback((step: number) => {
    // Mark current step as completed
    setCompletedSteps(prev => { const next = new Set(Array.from(prev)); next.add(currentStep); return next; });
    setCurrentStep(step);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    if (currentStep < 5) goStep(currentStep + 1);
  }, [currentStep, goStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) goStep(currentStep - 1);
  }, [currentStep, goStep]);

  // ── toggleDayRow (original toggleDayRow) ──
  const toggleDay = useCallback((dayIndex: number) => {
    setHours(prev => prev.map((h, i) =>
      i === dayIndex ? { ...h, enabled: !h.enabled } : h
    ));
  }, []);

  const updateDayTime = useCallback((dayIndex: number, field: 'open' | 'close', value: string) => {
    setHours(prev => prev.map((h, i) =>
      i === dayIndex ? { ...h, [field]: value } : h
    ));
  }, []);

  // ── Toggle feature (original feature toggle rows) ──
  const toggleFeature = useCallback((id: string) => {
    setFeatures(prev => prev.map(f =>
      f.id === id ? { ...f, enabled: !f.enabled } : f
    ));
  }, []);

  // ── completeSetup (original L3861) ──
  const [isComplete, setIsComplete] = useState(false);
  const completeSetup = useCallback(() => {
    setCompletedSteps(new Set([1, 2, 3, 4, 5]));
    setIsComplete(true);
  }, []);

  return {
    currentStep, completedSteps, isComplete,
    // Step 1
    clinicName, setClinicName, ownerName, setOwnerName,
    license, setLicense, clinicType, setClinicType,
    specialization, setSpecialization,
    phone, setPhone, email, setEmail, address, setAddress,
    // Step 2
    logo, setLogo, themeColor, setThemeColor,
    // Step 3
    hours, toggleDay, updateDayTime,
    // Step 5
    features, toggleFeature,
    // Navigation
    goStep, nextStep, prevStep, completeSetup,
  };
}
