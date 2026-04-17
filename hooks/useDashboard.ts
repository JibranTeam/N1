"use client";
/* ═══════════════════════════════════════
   useDashboard
   Converts: renderSched (L176), updateDate (L45),
   performance tabs (L210-213), miasm click (L216-242),
   mkBar (L235), tasks (L244-259), notes (L261-267)
═══════════════════════════════════════ */
import { useState, useCallback, useEffect } from 'react';
import { SCHEDULE_DATA, PERFORMANCE_DATA, MIASM_INFO, DEFAULT_TASKS } from '@/lib/constants';
import { formatDateFull, formatTime12, getGreeting, uid } from '@/lib/utils';
import type { Task, Note } from '@/lib/types';

// ── Schedule (replaces renderSched + tab handlers) ──
export function useSchedule() {
  const [activeTab, setActiveTab] = useState<'today' | 'tomorrow' | 'week'>('today');
  const data = SCHEDULE_DATA[activeTab];
  return { activeTab, setActiveTab, data };
}

// ── Live Date (replaces updateDate, L45-53) ──
export function useLiveDate() {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      setDateStr(formatDateFull(now));
      setTimeStr(formatTime12(now));
      setGreeting(getGreeting());
    }
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return { dateStr, timeStr, greeting };
}

// ── Performance Tabs (replaces pD data + tab handlers, L210-213) ──
export function usePerformance() {
  const [activeTab, setActiveTab] = useState<'month' | 'quarter' | 'year'>('month');
  const data = PERFORMANCE_DATA[activeTab];
  return { activeTab, setActiveTab, data };
}

// ── Miasm Distribution (replaces miasm click handlers, L216-242) ──
export function useMiasmDistribution() {
  const miasmCards = [
    { id: 'psoric', label: 'Psoric', count: 62, pct: 50, color: 'var(--forest-mid)', imp: 52, stab: 6, newP: 3, no: 1, total: 62 },
    { id: 'sycotic', label: 'Sycotic', count: 38, pct: 31, color: 'var(--sapphire)', imp: 28, stab: 5, newP: 3, no: 2, total: 38 },
    { id: 'syphilitic', label: 'Syphilitic', count: 16, pct: 13, color: 'var(--gold)', imp: 10, stab: 3, newP: 1, no: 2, total: 16 },
    { id: 'tubercular', label: 'Tubercular', count: 8, pct: 6, color: 'var(--crimson)', imp: 5, stab: 1, newP: 1, no: 1, total: 8 },
  ];

  const [selectedMiasm, setSelectedMiasm] = useState<string | null>(null);
  const [statusBars, setStatusBars] = useState([
    { label: 'Improving', pct: 72, val: '89', color: 'var(--success)' },
    { label: 'Stable', pct: 18, val: '22', color: 'var(--info)' },
    { label: 'New', pct: 6.5, val: '8', color: 'var(--accent)' },
    { label: 'No Improve', pct: 4, val: '5', color: 'var(--danger)' },
  ]);
  const [statusTitle, setStatusTitle] = useState('By Treatment Status — All Patients');
  const [miasmDetail, setMiasmDetail] = useState('');

  const selectMiasm = useCallback((id: string) => {
    const card = miasmCards.find(m => m.id === id);
    if (!card) return;

    if (selectedMiasm === id) {
      // Reset
      setSelectedMiasm(null);
      setStatusTitle('By Treatment Status — All Patients');
      setMiasmDetail('');
      setStatusBars([
        { label: 'Improving', pct: 72, val: '89', color: 'var(--success)' },
        { label: 'Stable', pct: 18, val: '22', color: 'var(--info)' },
        { label: 'New', pct: 6.5, val: '8', color: 'var(--accent)' },
        { label: 'No Improve', pct: 4, val: '5', color: 'var(--danger)' },
      ]);
      return;
    }

    setSelectedMiasm(id);
    const sum = card.imp + card.stab + card.newP + card.no;
    setStatusTitle(`By Treatment Status — ${card.label} Patients`);
    setMiasmDetail(`${card.label} — ${card.total} patients. ${MIASM_INFO[id] || ''}`);
    setStatusBars([
      { label: 'Improving', pct: Math.round(card.imp / sum * 100), val: `${card.imp}%`, color: 'var(--success)' },
      { label: 'Stable', pct: Math.round(card.stab / sum * 100), val: `${card.stab}%`, color: 'var(--info)' },
      { label: 'New', pct: Math.round(card.newP / sum * 100), val: `${card.newP}%`, color: 'var(--accent)' },
      { label: 'No Improve', pct: Math.round(card.no / sum * 100), val: `${card.no}%`, color: 'var(--danger)' },
    ]);
  }, [selectedMiasm]);

  const resetMiasm = useCallback(() => selectMiasm(selectedMiasm || ''), [selectedMiasm, selectMiasm]);

  return { miasmCards, selectedMiasm, selectMiasm, resetMiasm, statusBars, statusTitle, miasmDetail };
}

// ── Tasks (replaces bindTasks, uTC, L244-259) ──
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(
    DEFAULT_TASKS.map(t => ({ ...t, id: t.id || uid('task') }))
  );

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const addTask = useCallback((text: string) => {
    setTasks(prev => [...prev, { id: uid('task'), text, due: 'Today', priority: 'medium', done: false }]);
  }, []);

  const updateTask = useCallback((id: string, text: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  }, []);

  const remaining = tasks.filter(t => !t.done).length;

  return { tasks, toggleTask, deleteTask, addTask, updateTask, remaining };
}

// ── Notes (replaces renderNotes, L261-267) ──
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');

  const saveNote = useCallback(() => {
    if (!input.trim()) return false;
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    setNotes(prev => [{ id: uid('note'), text: input.trim(), time: `${h}:${m} ${ampm}` }, ...prev]);
    setInput('');
    return true;
  }, [input]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearInput = useCallback(() => setInput(''), []);

  return { notes, input, setInput, saveNote, deleteNote, clearInput };
}
