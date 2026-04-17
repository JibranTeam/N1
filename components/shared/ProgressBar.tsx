"use client";
/* ═══════════════════════════════════════
   ProgressBar — reusable bar for stock, goals, charts
   Used in Inventory (stock levels), Analytics (revenue goals,
   top remedies), and dashboard (miasm distribution)
═══════════════════════════════════════ */

interface ProgressBarProps {
  /** 0-100 percentage */
  value: number;
  color: string;
  height?: number;
  /** Show label text left/right of bar */
  label?: string;
  /** Right-side value text */
  valueText?: string;
  /** Background track color */
  trackColor?: string;
  animate?: boolean;
}

export default function ProgressBar({
  value, color, height = 6, label, valueText,
  trackColor = 'var(--border-light)', animate = true,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));

  if (label || valueText) {
    return (
      <div>
        {(label || valueText) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            {label && <span style={{ fontSize: 12, fontWeight: 500 }}>{label}</span>}
            {valueText && <span style={{ fontSize: 12, fontWeight: 700, color }}>{valueText}</span>}
          </div>
        )}
        <div style={{ height, background: trackColor, borderRadius: height / 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`, background: color,
            borderRadius: height / 2,
            transition: animate ? 'width 0.5s ease' : undefined,
          }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ height, background: trackColor, borderRadius: height / 2, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${pct}%`, background: color,
        borderRadius: height / 2,
        transition: animate ? 'width 0.4s ease' : undefined,
      }} />
    </div>
  );
}
