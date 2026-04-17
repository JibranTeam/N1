"use client";
/* ═══════════════════════════════════════
   Card — .card, .card-header, .card-body, .card-title
   Used 55 times across frames.
═══════════════════════════════════════ */
import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  id?: string;
  onClick?: () => void;
}

export default function Card({ children, style, className = '', id, onClick }: CardProps) {
  return (
    <div className={`card ${className}`} style={style} id={id} onClick={onClick}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return <div className="card-header" style={style}>{children}</div>;
}

interface CardHeaderIconProps {
  icon: string;
  title: string;
  subtitle?: string;
  iconBg: string;
  iconColor?: string;
  /** Use display font for title */
  displayFont?: boolean;
}

/** Standardized card header with icon + title + optional subtitle */
export function CardHeaderWithIcon({ icon, title, subtitle, iconBg, iconColor, displayFont = true }: CardHeaderIconProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 30, height: 30, borderRadius: 7,
        background: iconBg, color: iconColor || 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14,
      }}>{icon}</div>
      <div>
        <div className="card-title" style={displayFont ? { fontFamily: 'var(--font-display)' } : undefined}>{title}</div>
        {subtitle && <div style={{ fontSize: 10.5, color: 'var(--slate-soft)' }}>{subtitle}</div>}
      </div>
    </div>
  );
}

export function CardBody({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="card-body" style={style}>{children}</div>;
}
