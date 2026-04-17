"use client";
/* ═══════════════════════════════════════
   useAnalytics
   Converts: anSetPeriod (L9908), AN_PERIODS data switching,
   showAnalyticsPDF
═══════════════════════════════════════ */
import { useState, useCallback, useMemo } from 'react';
import { AN_PERIODS, TOP_REMEDIES_ANALYTICS, PEAK_DAYS } from '@/lib/constants-data';

export function useAnalytics() {
  const [activePeriod, setActivePeriod] = useState<string>('6m');
  const periodData = AN_PERIODS[activePeriod] || AN_PERIODS['6m'];

  const setPeriod = useCallback((key: string) => {
    setActivePeriod(key);
  }, []);

  // ── Revenue bar max for scaling ──
  const maxRevBar = useMemo(() => {
    return Math.max(...periodData.revenueBars.map(b => b.value));
  }, [periodData]);

  return {
    activePeriod,
    periodData,
    maxRevBar,
    setPeriod,
    topRemedies: TOP_REMEDIES_ANALYTICS,
    peakDays: PEAK_DAYS,
    periods: ['6m', '3m', '1y', 'ytd'] as const,
    periodLabels: { '6m': 'Last 6 Months', '3m': 'Last 3 Months', '1y': 'Last 12 Months', 'ytd': 'Year to Date' } as Record<string, string>,
  };
}
