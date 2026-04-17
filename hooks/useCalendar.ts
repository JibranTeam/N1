"use client";
/* ═══════════════════════════════════════
   useCalendar
   Converts the entire 1175-line appointment calendar engine:
   CAL_STATE, calRender, calRenderMonth (L2172),
   calRenderWeek (L2225), calRenderDay (L2306),
   calRenderMini (L2354), calRenderUpcoming (L2384),
   changeCalMonth (L2130), navigateDate (L2122),
   calSelectDate (L2406), calSetView (L2108),
   calSwitchToDay (L2297), calToday,
   calTimeToY (L2230), calWeekMonday,
   calDateStr, calApptsByDate
═══════════════════════════════════════ */
import { useState, useCallback, useMemo } from 'react';
import { calDateStr, getWeekMonday, timeToMin, MONTH_NAMES, DAY_NAMES } from '@/lib/utils';
import type { CalView, Appointment } from '@/lib/types';

// ── Appointment data for calendar (original DATA + CAL_APPTS) ──
const TODAY_APPOINTMENTS: Appointment[] = [
  { id: 'a1', time: '9:00 AM', endTime: '9:30 AM', name: 'Ahmed Khan', type: 'Follow-up', typeCls: 'type-followup', status: 'completed', label: 'Completed', date: calDateStr(new Date()), duration: 30, phone: '+92-300-1234567', miasm: 'Sycotic', visit: 5 },
  { id: 'a2', time: '10:00 AM', endTime: '10:45 AM', name: 'Ayesha Farooq', type: 'Follow-up', typeCls: 'type-followup', status: 'in-progress', label: 'In Progress', date: calDateStr(new Date()), duration: 45, phone: '+92-321-4567890', miasm: 'Psoric', visit: 8 },
  { id: 'a3', time: '11:00 AM', endTime: '12:00 PM', name: 'Fatima Noor', type: 'New Patient', typeCls: 'type-new', status: 'confirmed', label: 'Confirmed', date: calDateStr(new Date()), duration: 60, phone: '+92-333-0001111', visit: 1 },
  { id: 'a4', time: '11:45 AM', endTime: '12:15 PM', name: 'Usman Ali', type: 'Acute', typeCls: 'type-urgent', status: 'confirmed', label: 'Urgent', date: calDateStr(new Date()), duration: 30 },
  { id: 'a5', time: '2:00 PM', endTime: '2:30 PM', name: 'Sara Malik', type: 'Follow-up', typeCls: 'type-followup', status: 'confirmed', label: 'Confirmed', date: calDateStr(new Date()), duration: 30, phone: '+92-333-9876543', miasm: 'Psoric', visit: 3 },
  { id: 'a6', time: '3:00 PM', endTime: '3:45 PM', name: 'Bilal Ahmad', type: 'Review', typeCls: 'type-review', status: 'confirmed', label: 'Confirmed', date: calDateStr(new Date()), duration: 45, phone: '+92-311-5554444', miasm: 'Syphilitic', visit: 6 },
  { id: 'a7', time: '4:30 PM', endTime: '5:00 PM', name: 'Hina Akhtar', type: 'Follow-up', typeCls: 'type-followup', status: 'confirmed', label: 'Confirmed', date: calDateStr(new Date()), duration: 30, phone: '+92-300-8765432', miasm: 'Psoric', visit: 6 },
];

// Generate some appointments for other days
function generateCalAppts(): Appointment[] {
  const result: Appointment[] = [];
  const names = ['Zara Hussain','Imran Qureshi','Sara Noor','Farhan Ali','Aisha Bibi','Omar Shah'];
  const types = ['Follow-up','New Patient','Review','Acute'];
  const now = new Date();
  for (let d = -14; d <= 30; d++) {
    if (d === 0) continue; // today handled by TODAY_APPOINTMENTS
    const date = new Date(now);
    date.setDate(date.getDate() + d);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) continue; // no Sunday
    const count = dayOfWeek === 6 ? 5 : 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const hour = 9 + i + Math.floor(Math.random() * 3);
      const min = Math.random() > 0.5 ? '30' : '00';
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const h12 = hour > 12 ? hour - 12 : hour;
      result.push({
        id: `cal-${d}-${i}`,
        time: `${h12}:${min} ${ampm}`,
        name: names[i % names.length],
        type: types[i % types.length],
        typeCls: `type-${types[i % types.length].toLowerCase().replace(' ', '-')}`,
        status: d < 0 ? 'completed' : 'confirmed',
        label: d < 0 ? 'Completed' : 'Confirmed',
        date: calDateStr(date),
        duration: 30,
      });
    }
  }
  return result;
}

const ALL_CAL_APPTS = generateCalAppts();

export function useCalendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [view, setView] = useState<CalView>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ── Get appointments by date string (original calApptsByDate) ──
  const getApptsByDate = useCallback((dateStr: string): Appointment[] => {
    if (dateStr === calDateStr(new Date())) return TODAY_APPOINTMENTS;
    return ALL_CAL_APPTS.filter(a => a.date === dateStr);
  }, []);

  // ── Today's appointments ──
  const todayAppts = TODAY_APPOINTMENTS;

  // ── Selected date appointments ──
  const selectedDateAppts = useMemo(() => {
    return getApptsByDate(calDateStr(selectedDate));
  }, [selectedDate, getApptsByDate]);

  // ── Month grid data (original calRenderMonth L2172) ──
  const monthGrid = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay(); // 0=Sun
    const daysInMonth = lastDay.getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells: { day: number; inMonth: boolean; date: Date; isToday: boolean; apptCount: number }[] = [];

    // Previous month overflow
    const startOffset = startDay === 0 ? 6 : startDay - 1; // Monday start
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthDays - i);
      cells.push({ day: prevMonthDays - i, inMonth: false, date: d, isToday: false, apptCount: getApptsByDate(calDateStr(d)).length });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const isToday = calDateStr(d) === calDateStr(new Date());
      cells.push({ day: i, inMonth: true, date: d, isToday, apptCount: getApptsByDate(calDateStr(d)).length });
    }

    // Next month fill
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      cells.push({ day: i, inMonth: false, date: d, isToday: false, apptCount: getApptsByDate(calDateStr(d)).length });
    }

    return cells;
  }, [year, month, getApptsByDate]);

  // ── Week data (original calRenderWeek L2225) ──
  const weekData = useMemo(() => {
    const monday = getWeekMonday(selectedDate);
    const days: { date: Date; dateStr: string; dayName: string; dayNum: number; isToday: boolean; appointments: Appointment[] }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = calDateStr(d);
      days.push({
        date: d,
        dateStr,
        dayName: DAY_NAMES[d.getDay()].slice(0, 3),
        dayNum: d.getDate(),
        isToday: dateStr === calDateStr(new Date()),
        appointments: getApptsByDate(dateStr),
      });
    }
    return days;
  }, [selectedDate, getApptsByDate]);

  // ── Hours for week/day view ──
  const hours = useMemo(() => {
    const result: string[] = [];
    for (let h = 7; h <= 17; h++) {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h > 12 ? h - 12 : h;
      result.push(`${h12}:00 ${ampm}`);
    }
    return result;
  }, []);

  // ── Time to Y position (original calTimeToY) ──
  const timeToY = useCallback((timeStr: string): number => {
    const mins = timeToMin(timeStr);
    const startMins = 7 * 60; // 7:00 AM
    return ((mins - startMins) / 60) * 60; // 60px per hour
  }, []);

  // ── Mini calendar (same month grid, smaller) ──
  const miniCalGrid = monthGrid;

  // ── Upcoming appointments sidebar (original calRenderUpcoming L2384) ──
  const upcoming = useMemo(() => {
    const result: { date: string; dateLabel: string; appointments: Appointment[] }[] = [];
    for (let d = 0; d <= 6; d++) {
      const date = new Date();
      date.setDate(date.getDate() + d);
      const dateStr = calDateStr(date);
      const appts = getApptsByDate(dateStr);
      if (appts.length > 0) {
        const label = d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : DAY_NAMES[date.getDay()].slice(0, 3) + ' ' + date.getDate();
        result.push({ date: dateStr, dateLabel: label, appointments: appts });
      }
    }
    return result;
  }, [getApptsByDate]);

  // ── Stats ──
  const stats = useMemo(() => {
    return {
      total: todayAppts.length,
      confirmed: todayAppts.filter(a => a.status === 'confirmed').length,
      completed: todayAppts.filter(a => a.status === 'completed').length,
      inProgress: todayAppts.filter(a => a.status === 'in-progress').length,
      noShow: todayAppts.filter(a => a.status === 'no-show').length,
      newPatients: todayAppts.filter(a => a.type === 'New Patient').length,
    };
  }, [todayAppts]);

  // ── Navigation (original changeCalMonth L2130, navigateDate L2122) ──
  const changeMonth = useCallback((delta: number) => {
    setMonth(prev => {
      const newMonth = prev + delta;
      if (newMonth < 0) { setYear(y => y - 1); return 11; }
      if (newMonth > 11) { setYear(y => y + 1); return 0; }
      return newMonth;
    });
  }, []);

  const navigateDate = useCallback((delta: number) => {
    setSelectedDate(prev => {
      const d = new Date(prev);
      if (view === 'day') d.setDate(d.getDate() + delta);
      else if (view === 'week') d.setDate(d.getDate() + delta * 7);
      else { /* month nav handled by changeMonth */ }
      return d;
    });
  }, [view]);

  const goToday = useCallback(() => {
    const now = new Date();
    setSelectedDate(now);
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }, []);

  // ── Select date (original calSelectDate L2406) ──
  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }, []);

  // ── Switch to day view for a specific date (original calSwitchToDay L2297) ──
  const switchToDay = useCallback((date: Date) => {
    setSelectedDate(date);
    setView('day');
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }, []);

  // ── Set view (original calSetView L2108) ──
  const setCalView = useCallback((v: CalView) => {
    setView(v);
  }, []);

  // ── Date display string ──
  const dateDisplay = useMemo(() => {
    if (view === 'month') return `${MONTH_NAMES[month]} ${year}`;
    if (view === 'week') {
      const mon = getWeekMonday(selectedDate);
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);
      return `${MONTH_NAMES[mon.getMonth()]} ${mon.getDate()} – ${sun.getDate()}, ${year}`;
    }
    return `${DAY_NAMES[selectedDate.getDay()]}, ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${year}`;
  }, [view, month, year, selectedDate]);

  return {
    // State
    year, month, view, selectedDate, dateDisplay,

    // Data
    todayAppts, selectedDateAppts, monthGrid, weekData, hours,
    miniCalGrid, upcoming, stats,

    // Actions
    changeMonth, navigateDate, goToday,
    selectDate, switchToDay, setCalView,
    getApptsByDate, timeToY,
  };
}
