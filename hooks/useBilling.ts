"use client";
/* ═══════════════════════════════════════
   useBilling
   Converts: calcTotal (L3220), bilGenerate (L3237),
   generateInvoice, exportBillingCSV (L3252)
═══════════════════════════════════════ */
import { useState, useCallback, useMemo } from 'react';
import { BILLING_HISTORY } from '@/lib/constants-data';
import { csvSafe, safeDownloadCSV, todayISO, formatDateShort, uid } from '@/lib/utils';

interface InvoiceHistoryItem {
  id: string;
  patient: string;
  date: string;
  method: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  iconBg: string;
  iconColor: string;
  icon: string;
}

export function useBilling() {
  // Form state
  const [patient, setPatient] = useState('Ayesha Farooq');
  const [invoiceDate, setInvoiceDate] = useState(todayISO());
  const [consultation, setConsultation] = useState(800);
  const [medicines, setMedicines] = useState(1200);
  const [discount, setDiscount] = useState(0);
  const [payMethod, setPayMethod] = useState('cash');
  const [history, setHistory] = useState<InvoiceHistoryItem[]>([...BILLING_HISTORY]);
  const [invoiceNum, setInvoiceNum] = useState(37);

  // ── Calculate total (original calcTotal L3220) ──
  const total = useMemo(() => {
    return Math.max(0, consultation + medicines - discount);
  }, [consultation, medicines, discount]);

  // ── Preview data ──
  const previewData = useMemo(() => ({
    patient,
    invoiceNo: `INV-2026-${String(invoiceNum).padStart(4, '0')}`,
    date: formatDateShort(new Date(invoiceDate)),
    total: `₨ ${total.toLocaleString()}`,
    method: payMethod === 'cash' ? '💵 Cash' : payMethod === 'jazzcash' ? '📱 JazzCash' : payMethod === 'easypaisa' ? '📱 EasyPaisa' : '🏦 Bank Transfer',
  }), [patient, invoiceNum, invoiceDate, total, payMethod]);

  // ── Generate invoice (original bilGenerate L3237) ──
  const generateInvoice = useCallback(() => {
    const newInvoice: InvoiceHistoryItem = {
      id: `INV-2026-${String(invoiceNum).padStart(4, '0')}`,
      patient,
      date: formatDateShort(new Date(invoiceDate)),
      method: payMethod === 'cash' ? 'Cash' : payMethod === 'jazzcash' ? 'JazzCash' : payMethod === 'easypaisa' ? 'EasyPaisa' : 'Bank',
      amount: `₨${total.toLocaleString()}`,
      status: 'paid',
      iconBg: 'var(--forest-bg)',
      iconColor: 'var(--forest)',
      icon: '✅',
    };
    setHistory(prev => [newInvoice, ...prev]);
    setInvoiceNum(prev => prev + 1);

    // Reset form
    setConsultation(800);
    setMedicines(1200);
    setDiscount(0);

    return newInvoice;
  }, [patient, invoiceDate, total, payMethod, invoiceNum]);

  // ── Export CSV (original exportBillingCSV) ──
  const exportCSV = useCallback(() => {
    const rows = ['Invoice,Patient,Date,Method,Amount,Status'];
    history.forEach(inv => {
      rows.push([csvSafe(inv.id), csvSafe(inv.patient), csvSafe(inv.date), csvSafe(inv.method), csvSafe(inv.amount), csvSafe(inv.status)].join(','));
    });
    safeDownloadCSV(rows.join('\n'), `billing_${todayISO()}.csv`);
    return history.length;
  }, [history]);

  return {
    // Form state
    patient, setPatient,
    invoiceDate, setInvoiceDate,
    consultation, setConsultation,
    medicines, setMedicines,
    discount, setDiscount,
    payMethod, setPayMethod,

    // Computed
    total, previewData,

    // Data
    history,

    // Actions
    generateInvoice, exportCSV,
  };
}
