"use client";
/* ═══════════════════════════════════════
   Avatar — circular initials avatar
   Used in Sidebar, Timeline, Team, Collaboration,
   Prescriptions, Dashboard patient rows
═══════════════════════════════════════ */

interface AvatarProps {
  initials: string;
  size?: number;
  gradient?: string;
  fontSize?: number;
}

export default function Avatar({
  initials,
  size = 36,
  gradient = 'linear-gradient(135deg,var(--forest-light),var(--forest))',
  fontSize,
}: AvatarProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: gradient, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: fontSize || Math.round(size * 0.35),
      fontWeight: 700, flexShrink: 0,
      boxShadow: size >= 48 ? '0 4px 12px rgba(45,90,61,.25)' : undefined,
    }}>
      {initials}
    </div>
  );
}
