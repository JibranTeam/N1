"use client";
/* ═══════════════════════════════════════
   Tag — .tag label badges
   Used 18+ times. Variants: g (green), a (amber),
   b (blue), r (red), p (purple)
═══════════════════════════════════════ */

type TagVariant = 'g' | 'a' | 'b' | 'r' | 'p' | string;

interface TagProps {
  variant?: TagVariant;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Tag({ variant = 'g', children, style, onClick }: TagProps) {
  return (
    <span
      className={`tag ${variant}`}
      style={{ ...style, cursor: onClick ? 'pointer' : undefined }}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

/** Render an array of tags with auto-cycling variant colors */
export function TagList({ tags, variants }: { tags: string[]; variants?: TagVariant[] }) {
  const defaultVariants: TagVariant[] = ['g', 'a', 'b', 'r', 'p'];
  const v = variants || defaultVariants;
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {tags.map((t, i) => (
        <Tag key={i} variant={v[i % v.length]}>{t}</Tag>
      ))}
    </div>
  );
}
