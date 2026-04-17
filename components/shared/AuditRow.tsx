"use client";
/* ═══════════════════════════════════════
   AuditRow — .audit-row timeline audit entry
   Used in Timeline, Prescriptions frames.
═══════════════════════════════════════ */

interface AuditRowProps {
  dotColor: string;
  children: React.ReactNode;
  time: string;
  noBorder?: boolean;
}

export default function AuditRow({ dotColor, children, time, noBorder }: AuditRowProps) {
  return (
    <div className="audit-row" style={noBorder ? { borderBottom: 'none' } : undefined}>
      <div className="audit-dot" style={{ background: dotColor }}></div>
      <div className="audit-text">{children}</div>
      <div className="audit-time">{time}</div>
    </div>
  );
}
