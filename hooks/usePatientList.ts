"use client";
/* ═══════════════════════════════════════
   usePatientList
   Converts: getFiltered (L739), renderTable (L813),
   renderCards (L933), render (L974), renderPagination (L895),
   filter pills (L776), sort (L791-810), column sort,
   view toggle (L980-997), selectAll (L999-1027),
   updateBulk (L1015), clearSel (L1021), export (L1053),
   openQP (L1120), closeQP (L1158)
═══════════════════════════════════════ */
import { useState, useCallback, useMemo } from 'react';
import { PTS_BASE } from '@/lib/constants';
import { csvSafe, safeDownloadCSV, todayISO } from '@/lib/utils';

type PatientItem = typeof PTS_BASE[0];
type FilterKey = 'all' | 'active' | 'new' | 'follow-up' | 'inactive';
type SortKey = 'default' | 'name' | 'score-d' | 'score-a';
type ViewMode = 'table' | 'cards';

const PER_PAGE = 7;

export function usePatientList() {
  const [patients] = useState<PatientItem[]>([...PTS_BASE]);
  const [sortedPatients, setSortedPatients] = useState<PatientItem[]>([...PTS_BASE]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [miasmFilter, setMiasmFilter] = useState('');
  const [clinicFilter, setClinicFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [quickProfileIdx, setQuickProfileIdx] = useState<number>(-1);

  // ── getFiltered (original L739-757) ──
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return sortedPatients.filter(p => {
      const stKey = p.st.toLowerCase().replace(/\s+/g, '-');
      const okF =
        activeFilter === 'all' ||
        (activeFilter === 'active' && stKey === 'active') ||
        (activeFilter === 'new' && stKey === 'new') ||
        (activeFilter === 'follow-up' && (stKey === 'follow-up' || stKey === 'needs-review')) ||
        (activeFilter === 'inactive' && stKey === 'inactive');
      const okQ = !q ||
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        p.conds.join(' ').toLowerCase().includes(q) ||
        p.miasm.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q);
      const okM = !miasmFilter || p.miasm === miasmFilter;
      const okC = !clinicFilter || p.clinic.toLowerCase().includes(clinicFilter.toLowerCase());
      return okF && okQ && okM && okC;
    });
  }, [sortedPatients, activeFilter, searchQuery, miasmFilter, clinicFilter]);

  // ── Pagination ──
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, currentPage]);

  const paginationInfo = useMemo(() => {
    const total = filtered.length;
    if (total === 0) return 'No patients found';
    const s = Math.min((currentPage - 1) * PER_PAGE + 1, total);
    const e = Math.min(currentPage * PER_PAGE, total);
    return { start: s, end: e, total };
  }, [filtered.length, currentPage]);

  // ── Page numbers (with truncation, original L917-929) ──
  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [];
    const pages: (number | '…')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('…');
      for (let j = Math.max(2, currentPage - 1); j <= Math.min(totalPages - 1, currentPage + 1); j++) pages.push(j);
      if (currentPage < totalPages - 2) pages.push('…');
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  // ── Sort (original L791-810) ──
  const applySort = useCallback((key: SortKey) => {
    setSortKey(key);
    const sorted = [...PTS_BASE];
    if (key === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (key === 'score-d') sorted.sort((a, b) => b.score - a.score);
    else if (key === 'score-a') sorted.sort((a, b) => a.score - b.score);
    setSortedPatients(sorted);
    setCurrentPage(1);
  }, []);

  const sortByColumn = useCallback((col: 'name' | 'score' | 'visits' | 'miasm') => {
    const sorted = [...sortedPatients];
    if (col === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (col === 'score') sorted.sort((a, b) => b.score - a.score);
    else if (col === 'visits') sorted.sort((a, b) => b.visits - a.visits);
    else if (col === 'miasm') sorted.sort((a, b) => a.miasm.localeCompare(b.miasm));
    setSortedPatients(sorted);
    setCurrentPage(1);
  }, [sortedPatients]);

  // ── Filter (original L776-788) ──
  const setFilter = useCallback((filter: FilterKey) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  }, []);

  // ── View toggle (original L980-997) ──
  const setView = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'table') setCurrentPage(1);
  }, []);

  // ── Selection (original L999-1027) ──
  const toggleSelect = useCallback((idx: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    const allSelected = pagedData.every((_, i) => {
      const globalIdx = PTS_BASE.indexOf(sortedPatients.find(p => p === pagedData[i])!);
      return selectedIds.has(globalIdx);
    });
    setSelectedIds(prev => {
      const next = new Set(prev);
      pagedData.forEach(p => {
        const globalIdx = PTS_BASE.indexOf(sortedPatients.find(sp => sp === p)!);
        if (allSelected) next.delete(globalIdx);
        else next.add(globalIdx);
      });
      return next;
    });
  }, [pagedData, selectedIds, sortedPatients]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  // ── Quick Profile (original openQP L1120, closeQP L1158) ──
  const openQuickProfile = useCallback((idx: number) => {
    setQuickProfileIdx(idx);
  }, []);

  const closeQuickProfile = useCallback(() => {
    setQuickProfileIdx(-1);
  }, []);

  const quickProfilePatient = quickProfileIdx >= 0 ? PTS_BASE[quickProfileIdx] : null;

  // ── Export (original L1053-1063) ──
  const exportAll = useCallback(() => {
    const rows = ['Name,ID,Gender,Age,Miasm,Score,Status,Clinic'];
    filtered.forEach(p => {
      rows.push([csvSafe(p.name), csvSafe(p.id), p.gen, p.age, csvSafe(p.miasm), p.score, csvSafe(p.st), csvSafe(p.clinic)].join(','));
    });
    safeDownloadCSV(rows.join('\n'), `patients_${todayISO()}.csv`);
    return filtered.length;
  }, [filtered]);

  const exportSelected = useCallback(() => {
    if (selectedIds.size === 0) return 0;
    const rows = ['Name,ID,Gender,Age,Miasm,Score,Status,Clinic'];
    selectedIds.forEach(idx => {
      const p = PTS_BASE[idx];
      if (p) rows.push([csvSafe(p.name), csvSafe(p.id), p.gen, p.age, csvSafe(p.miasm), p.score, csvSafe(p.st), csvSafe(p.clinic)].join(','));
    });
    safeDownloadCSV(rows.join('\n'), `patients_selected_${todayISO()}.csv`);
    return selectedIds.size;
  }, [selectedIds]);

  return {
    // Data
    patients: sortedPatients,
    filtered,
    pagedData,
    totalPages,
    pageNumbers,
    paginationInfo,
    quickProfilePatient,
    quickProfileIdx,

    // State
    activeFilter,
    searchQuery,
    miasmFilter,
    clinicFilter,
    sortKey,
    currentPage,
    viewMode,
    selectedIds,

    // Actions
    setFilter,
    setSearchQuery,
    setMiasmFilter,
    setClinicFilter,
    applySort,
    sortByColumn,
    setCurrentPage,
    setView,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    openQuickProfile,
    closeQuickProfile,
    exportAll,
    exportSelected,
  };
}
