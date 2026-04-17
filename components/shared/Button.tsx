"use client";
/* ═══════════════════════════════════════
   Button — .btn and .ht-btn variants
   95 button elements across frames.
   Variants: primary, outline, ghost, danger, gold
   Sizes: sm, xs
   Prefixes: btn (patient list style) or ht-btn (dashboard style)
═══════════════════════════════════════ */

type BtnVariant = 'primary' | 'outline' | 'ghost' | 'danger' | 'gold';
type BtnSize = 'sm' | 'xs' | 'default';
type BtnPrefix = 'btn' | 'ht-btn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
  prefix?: BtnPrefix;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'default',
  prefix = 'ht-btn',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variantCls = variant === 'primary' ? `${prefix}-primary`
    : variant === 'outline' ? `${prefix}-outline`
    : variant === 'ghost' ? `${prefix}-ghost`
    : variant === 'danger' ? 'btn-danger'
    : variant === 'gold' ? 'btn-gold'
    : '';
  const sizeCls = size === 'sm' ? `${prefix}-sm` : size === 'xs' ? `${prefix === 'ht-btn' ? 'ht-btn' : 'btn'}-xs` : '';

  return (
    <button className={`${prefix} ${variantCls} ${sizeCls} ${className}`.trim()} {...props}>
      {icon}{children}
    </button>
  );
}

/** Action button row — wraps buttons in a flex container */
export function ButtonRow({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', ...style }}>
      {children}
    </div>
  );
}
