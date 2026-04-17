"use client";
/* ═══════════════════════════════════════
   useInventory
   Converts: statusCfg (L1394), sortedMeds (L1401),
   renderInvTable (L1407), renderReorder (L1458),
   renderMovements (L1484), renderTopConsumed (L1497),
   doFilter (L1516), invDoExport (L1541),
   autoDeductInventory (L2007), filterInventory (L1996)
═══════════════════════════════════════ */
import { useState, useCallback, useMemo } from 'react';
import { MEDS_DATA, INVENTORY_MOVEMENTS } from '@/lib/constants-data';
import { csvSafe, safeDownloadCSV, todayISO } from '@/lib/utils';
import type { Medicine, StockStatus, InventoryMovement } from '@/lib/types';

// ── Status config (original statusCfg L1394) ──
export function getStatusConfig(st: StockStatus) {
  const configs: Record<StockStatus, { label: string; pill: string; barCls: string; stockColor: string; runColor: string }> = {
    'in-stock': { label: 'In Stock', pill: 'active', barCls: 'bar-ok', stockColor: '', runColor: 'var(--slate-soft)' },
    'low': { label: 'Low Stock', pill: 'warn', barCls: 'bar-warn', stockColor: 'var(--gold)', runColor: 'var(--gold)' },
    'critical': { label: 'Critical', pill: 'low', barCls: 'bar-crit', stockColor: 'var(--crimson)', runColor: 'var(--crimson)' },
  };
  return configs[st] || configs['in-stock'];
}

export function useInventory() {
  const [meds, setMeds] = useState<(Medicine & { form: string; supplier: string })[]>([...MEDS_DATA]);
  const [movements, setMovements] = useState<InventoryMovement[]>([...INVENTORY_MOVEMENTS]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [potencyFilter, setPotencyFilter] = useState('');

  // ── Sort: critical → low → in-stock (original sortedMeds L1401) ──
  const sortedMeds = useMemo(() => {
    const order: Record<StockStatus, number> = { 'critical': 0, 'low': 1, 'in-stock': 2 };
    return [...meds].sort((a, b) => (order[a.st] ?? 2) - (order[b.st] ?? 2));
  }, [meds]);

  // ── Filter (original doFilter L1516) ──
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return sortedMeds.filter(m => {
      const okQ = !q || m.name.toLowerCase().includes(q) || m.pot.toLowerCase().includes(q);
      const okSt = !statusFilter ||
        (statusFilter === 'in-stock' && m.st === 'in-stock') ||
        (statusFilter === 'low' && (m.st === 'low' || m.st === 'critical')) ||
        (statusFilter === 'critical' && m.st === 'critical');
      const okCat = !categoryFilter || m.cat === categoryFilter;
      const okPot = !potencyFilter || m.pot.includes(potencyFilter);
      return okQ && okSt && okCat && okPot;
    });
  }, [sortedMeds, searchQuery, statusFilter, categoryFilter, potencyFilter]);

  // ── KPI calculations ──
  const kpis = useMemo(() => {
    const totalVal = meds.reduce((s, m) => s + m.stock * m.cost, 0);
    const lowCount = meds.filter(m => m.st === 'low' || m.st === 'critical').length;
    return {
      total: meds.length,
      lowStock: lowCount,
      expiringSoon: 6, // hardcoded like original
      stockValue: `₨${Math.round(totalVal / 1000)}k`,
    };
  }, [meds]);

  // ── Reorder queue (original renderReorder L1458) ──
  const reorderQueue = useMemo(() => {
    return sortedMeds.filter(m => m.st === 'critical' || m.st === 'low');
  }, [sortedMeds]);

  // ── Top consumed (original renderTopConsumed L1497) ──
  const topConsumed = useMemo(() => {
    const top = [...meds].sort((a, b) => b.mu - a.mu).slice(0, 5);
    const maxMu = top[0]?.mu || 1;
    return top.map(m => ({
      ...m,
      pct: Math.round((m.mu / maxMu) * 100),
      cfg: getStatusConfig(m.st),
    }));
  }, [meds]);

  // ── Auto-deduct (original autoDeductInventory L2007) ──
  const autoDeduct = useCallback((medicineName: string, qty: number = 1) => {
    setMeds(prev => prev.map(m => {
      if (!m.name.toLowerCase().includes(medicineName.toLowerCase().split(' ')[0])) return m;
      const newStock = Math.max(0, m.stock - qty);
      let newSt: StockStatus = m.st;
      if (newStock === 0) newSt = 'critical';
      else if (newStock < 10) newSt = 'low';
      return { ...m, stock: newStock, st: newSt };
    }));
    setMovements(prev => [
      { text: `${medicineName} dispensed (auto-deduct)`, time: 'Just now', color: 'var(--forest)' },
      ...prev,
    ]);
  }, []);

  // ── Export CSV (original invDoExport L1541) ──
  const exportCSV = useCallback(() => {
    const rows = ['Medicine,Potency,Batch,Stock,Runout,Expiry,Status,Category,Unit Cost'];
    meds.forEach(m => {
      rows.push([
        csvSafe(m.name), csvSafe(m.pot), csvSafe(m.batch), m.stock,
        csvSafe(m.runout), csvSafe(m.exp),
        csvSafe(getStatusConfig(m.st).label), csvSafe(m.cat), m.cost,
      ].join(','));
    });
    safeDownloadCSV(rows.join('\n'), `inventory_${todayISO()}.csv`);
    return meds.length;
  }, [meds]);

  // ── Add medicine ──
  const addMedicine = useCallback((med: Medicine & { form: string; supplier: string }) => {
    setMeds(prev => [...prev, med]);
  }, []);

  return {
    meds: sortedMeds,
    filtered,
    movements,
    kpis,
    reorderQueue,
    topConsumed,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    categoryFilter, setCategoryFilter,
    potencyFilter, setPotencyFilter,
    autoDeduct,
    exportCSV,
    addMedicine,
  };
}
