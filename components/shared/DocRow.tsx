"use client";
/* ═══════════════════════════════════════
   DocRow — .doc-row document/invoice list item
   Used in Timeline, Prescriptions, Billing frames.
═══════════════════════════════════════ */

interface DocRowProps {
  icon: string;
  iconBg: string;
  iconColor?: string;
  title: string;
  meta: string;
  onClick?: () => void;
  onDownload?: (e: React.MouseEvent) => void;
  /** Extra content on the right (e.g. amount, pill) */
  rightContent?: React.ReactNode;
  /** Remove bottom border (last item) */
  noBorder?: boolean;
}

export default function DocRow({ icon, iconBg, iconColor, title, meta, onClick, onDownload, rightContent, noBorder }: DocRowProps) {
  return (
    <div
      className="doc-row"
      style={noBorder ? { borderBottom: 'none' } : undefined}
      onClick={onClick}
    >
      <div className="doc-icon" style={{ background: iconBg, color: iconColor }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 10.5, color: 'var(--slate-soft)' }}>{meta}</div>
      </div>
      {rightContent}
      {onDownload && (
        <button className="btn btn-ghost btn-xs" onClick={e => { e.stopPropagation(); onDownload(e); }}>⬇</button>
      )}
    </div>
  );
}
