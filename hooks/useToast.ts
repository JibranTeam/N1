"use client";
/* Converts: toast() ×3 variants, showToast() (107 calls), invToast, ptToast, apptShowToast */
import { useApp } from '@/context/AppContext';
import type { ToastType } from '@/lib/types';

export function useToast() {
  const { showToast } = useApp();
  return { toast: showToast, showToast };
}
