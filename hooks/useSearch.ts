"use client";
/* ═══════════════════════════════════════
   useSearch — Global + Toolbar search
   Converts: runSearch (L136), runNavSearch (L626),
   runPtSearch (L695), globalSearch (L1836),
   clearTbSearch (L685), highlight (L598)
═══════════════════════════════════════ */
import { useState, useCallback, useRef } from 'react';
import { SEARCH_INDEX, DASHBOARD_SEARCH_DB, PTS_BASE } from '@/lib/constants';
import { highlight, esc } from '@/lib/utils';
import type { FrameId } from '@/lib/types';

// ── Search result types ──
interface GlobalSearchResult {
  icon: string;
  label: string;
  sub: string;
  type: string;
  actionFrame: FrameId;
  actionParam?: string;
  highlighted?: string;
}

interface PatientSearchResult {
  idx: number;
  name: string;
  nameHtml: string;
  id: string;
  miasm: string;
  stCls: string;
  st: string;
  init: string;
  av: string;
}

interface DashboardSearchResult {
  type: 'patient' | 'medicine';
  name: string;
  meta: string;
  color?: string;
}

// ── Global Search (topbar, replaces globalSearch L1836) ──
export function useGlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback((q: string) => {
    setQuery(q);
    clearTimeout(timerRef.current);
    if (!q || q.trim().length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      const ql = q.toLowerCase();
      const res = SEARCH_INDEX.filter(
        r => r.label.toLowerCase().includes(ql) || r.sub.toLowerCase().includes(ql)
      ).slice(0, 8);
      setResults(res);
      setIsOpen(res.length > 0);
    }, 150);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  }, []);

  return { query, results, isOpen, search, close, clear };
}

// ── Dashboard Search (replaces runSearch L136) ──
export function useDashboardSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DashboardSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback((q: string) => {
    setQuery(q);
    clearTimeout(timerRef.current);
    if (!q || q.length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      const ql = q.toLowerCase();
      const filtered = DASHBOARD_SEARCH_DB.filter(
        i => i.name.toLowerCase().includes(ql) || i.meta.toLowerCase().includes(ql)
      );
      setResults(filtered);
      setIsOpen(filtered.length > 0);
    }, 200);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return { query, results, isOpen, search, close };
}

// ── Patient List Search (replaces runPtSearch L695, runNavSearch L626) ──
export function usePatientSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PatientSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback((q: string) => {
    setQuery(q);
    clearTimeout(timerRef.current);
    if (!q || q.trim().length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      const ql = q.toLowerCase();
      const res = PTS_BASE.map((p, idx) => ({ ...p, idx }))
        .filter(p =>
          p.name.toLowerCase().includes(ql) ||
          p.id.toLowerCase().includes(ql) ||
          p.phone.toLowerCase().includes(ql) ||
          p.conds.join(' ').toLowerCase().includes(ql) ||
          p.miasm.toLowerCase().includes(ql)
        )
        .slice(0, 6)
        .map(p => ({
          idx: p.idx,
          name: p.name,
          nameHtml: highlight(p.name, q),
          id: p.id,
          miasm: p.miasm,
          stCls: p.stCls,
          st: p.st,
          init: p.init,
          av: p.av,
        }));
      setResults(res);
      setIsOpen(res.length > 0);
    }, 150);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  }, []);

  return { query, results, isOpen, search, close, clear };
}
