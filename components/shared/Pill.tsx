"use client";
/* ═══════════════════════════════════════
   Pill — .pill status badges
   Used 15+ times across frames.
   Variants: active, inactive, warn, low, new
═══════════════════════════════════════ */

type PillVariant = 'active' | 'inactive' | 'warn' | 'low' | 'new' | string;

interface PillProps {
  variant: PillVariant;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export default function Pill({ variant, children, style, onClick, className = '' }: PillProps) {
  return (
    <span
      className={`pill ${variant} ${className}`}
      style={{ ...style, cursor: onClick ? 'pointer' : undefined }}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

/** Response pill for Rx history — .resp-pill.excellent|good|moderate|pending */
export function ResponsePill({ response }: { response: string }) {
  const label = response.charAt(0).toUpperCase() + response.slice(1);
  return <span className={`resp-pill ${response}`}>{label}</span>;
}
