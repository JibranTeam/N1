"use client";
/* ═══════════════════════════════════════
   SVG ICONS
   Exact replicas of the 49 unique inline SVGs from index.html.
   Each renders identical SVG markup to the original.
═══════════════════════════════════════ */
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const svgBase = (size: number, sw: number, className?: string) => ({
  width: size, height: size, viewBox: "0 0 24 24",
  fill: "none", stroke: "currentColor", strokeWidth: sw,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  className,
});

// ── Navigation & Layout Icons ──
export const IconGrid = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);

export const IconBook = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
);

export const IconUsers = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export const IconBot = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 14 22h-4a7 7 0 0 1-6.73-3H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2z"/></svg>
);

export const IconCalendar = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);

export const IconClipboard = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
);

export const IconActivity = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
);

export const IconMessageCircle = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

export const IconPackage = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);

export const IconCreditCard = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
);

export const IconBarChart = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);

export const IconHome = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

export const IconSettings = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);

export const IconUser = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export const IconRefresh = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
);

export const IconFileText = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
);

export const IconMessageSquare = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

export const IconSearch = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);

export const IconBookOpen = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

// ── Action/Status Icons ──
export const IconBell = ({ size = 15, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);

export const IconCheck = ({ size = 18, className, strokeWidth = 3 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><polyline points="20 6 9 17 4 12"/></svg>
);

export const IconPlus = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

export const IconX = ({ size = 18, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

export const IconChevronDown = ({ size = 12, className, strokeWidth = 2.5 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><polyline points="6 9 12 15 18 9"/></svg>
);

export const IconAlertTriangle = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);

export const IconAlertCircle = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

export const IconClock = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export const IconEdit = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

export const IconCheckCircle = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export const IconEye = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);

export const IconPill = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M10.5 1.5H8A6.5 6.5 0 0 0 8 14.5h1.5"/><path d="M13.5 1.5H16A6.5 6.5 0 0 1 16 14.5h-1.5"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="12" y1="14.5" x2="12" y2="22"/></svg>
);

export const IconDownload = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

export const IconPrinter = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
);

export const IconUserPlus = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
);

export const IconFilePlus = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
);

export const IconLogOut = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);

export const IconMenu = ({ size = 20, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);

export const IconGlobe = ({ size = 14, className, strokeWidth = 2 }: IconProps) => (
  <svg {...svgBase(size, strokeWidth, className)}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
);

// ── Icon map for sidebar navigation (maps icon string keys to components) ──
export const ICON_MAP: Record<string, React.FC<IconProps>> = {
  'grid': IconGrid,
  'book': IconBook,
  'book-open': IconBookOpen,
  'users': IconUsers,
  'users-collab': IconUsers,
  'bot': IconBot,
  'calendar': IconCalendar,
  'clipboard': IconClipboard,
  'activity': IconActivity,
  'message-circle': IconMessageCircle,
  'message-square': IconMessageSquare,
  'package': IconPackage,
  'credit-card': IconCreditCard,
  'bar-chart': IconBarChart,
  'home': IconHome,
  'settings': IconSettings,
  'user': IconUser,
  'refresh': IconRefresh,
  'file-text': IconFileText,
  'search': IconSearch,
};
