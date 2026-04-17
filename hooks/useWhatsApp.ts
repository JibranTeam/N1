"use client";
/* ═══════════════════════════════════════
   useWhatsApp
   Converts: toggleSwitch (template toggle), waEditTemplate,
   waNewTemplate, testSendWhatsApp, waSendQuick,
   sendAllReminders, sendFollowUpWA, openBroadcastModal,
   saveBroadcast, toggleReminder, renderReminders
═══════════════════════════════════════ */
import { useState, useCallback } from 'react';
import { WA_TEMPLATES_DATA, WA_SENT_MESSAGES, WA_REMINDERS } from '@/lib/constants-data';
import { uid } from '@/lib/utils';
import type { WaTemplate, WaSentMessage, WaReminder } from '@/lib/types';

export function useWhatsApp() {
  const [templates, setTemplates] = useState<WaTemplate[]>([...WA_TEMPLATES_DATA]);
  const [sentMessages, setSentMessages] = useState<WaSentMessage[]>([...WA_SENT_MESSAGES]);
  const [reminders, setReminders] = useState<WaReminder[]>([...WA_REMINDERS]);
  const [quickMessage, setQuickMessage] = useState('');
  const [quickRecipient, setQuickRecipient] = useState('');

  // ── Toggle template (original toggleSwitch on template) ──
  const toggleTemplate = useCallback((id: number) => {
    setTemplates(prev => prev.map(t =>
      t.id === id ? { ...t, enabled: !t.enabled } : t
    ));
  }, []);

  // ── Edit template text (original waEditTemplate) ──
  const editTemplate = useCallback((id: number, newText: string) => {
    setTemplates(prev => prev.map(t =>
      t.id === id ? { ...t, text: newText } : t
    ));
  }, []);

  // ── Add new template (original waNewTemplate) ──
  const addTemplate = useCallback(() => {
    const newId = Math.max(...templates.map(t => t.id)) + 1;
    setTemplates(prev => [...prev, {
      id: newId,
      label: '📋 New Template',
      text: 'Dear [PatientName], ...',
      enabled: false,
    }]);
  }, [templates]);

  // ── Test send (original testSendWhatsApp) ──
  const testSend = useCallback((templateLabel: string): string => {
    const msg: WaSentMessage = {
      name: 'Test Patient',
      msg: `Test: ${templateLabel}`,
      time: 'Just now',
      tick: '✓',
      icon: '💬',
    };
    setSentMessages(prev => [msg, ...prev]);
    return `Test sent: ${templateLabel}`;
  }, []);

  // ── Quick send (original waSendQuick) ──
  const quickSend = useCallback(() => {
    if (!quickMessage.trim() || !quickRecipient.trim()) {
      return { success: false, error: 'Enter recipient and message' };
    }
    const msg: WaSentMessage = {
      name: quickRecipient,
      msg: quickMessage,
      time: 'Just now',
      tick: '✓',
      icon: '💬',
    };
    setSentMessages(prev => [msg, ...prev]);
    setQuickMessage('');
    setQuickRecipient('');
    return { success: true, message: `Sent to ${quickRecipient}` };
  }, [quickMessage, quickRecipient]);

  // ── Send follow-up WA (original sendFollowUpWA) ──
  const sendFollowUp = useCallback((patientName: string) => {
    const msg: WaSentMessage = {
      name: patientName,
      msg: 'Follow-up Reminder · Please book your next visit',
      time: 'Just now',
      tick: '✓',
      icon: '💬',
    };
    setSentMessages(prev => [msg, ...prev]);
    return `Follow-up sent to ${patientName}`;
  }, []);

  // ── Toggle reminder (original toggleReminder) ──
  const toggleReminder = useCallback((id: string) => {
    setReminders(prev => prev.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  }, []);

  // ── Send all reminders (original sendAllReminders) ──
  const sendAllReminders = useCallback(() => {
    const active = reminders.filter(r => r.enabled);
    active.forEach(r => {
      setSentMessages(prev => [{
        name: r.patient,
        msg: `${r.type} · Sent automatically`,
        time: 'Just now',
        tick: '✓',
        icon: '💬',
      }, ...prev]);
    });
    return active.length;
  }, [reminders]);

  // ── KPI data ──
  const kpis = {
    sent: sentMessages.length,
    openRate: '91%',
    apptsBooked: 18,
    rating: '4.8',
  };

  return {
    templates, sentMessages, reminders, kpis,
    quickMessage, setQuickMessage,
    quickRecipient, setQuickRecipient,
    toggleTemplate, editTemplate, addTemplate,
    testSend, quickSend, sendFollowUp,
    toggleReminder, sendAllReminders,
  };
}
