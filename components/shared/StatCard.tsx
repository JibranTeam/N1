"use client";
/* ═══════════════════════════════════════
   StatCard — .u-stat
   Used in 7 frames, 49 instances.
   Renders:
   <div class="u-stat" style="--u-stripe: ...">
     <div class="u-stat-ico" style="background:...; color:...">icon</div>
     <div class="u-stat-body">
       <div class="u-stat-lbl">label</div>
       <div class="u-stat-val">value</div>
       <div class="u-stat-trend up|down|neu">change</div>
     </div>
   </div>
═══════════════════════════════════════ */

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change: string;
  stripe: string;
  iconBg: string;
  iconColor: string;
  onClick?: () => void;
  /** Override value font size */
  valSize?: number;
}

export default function StatCard({ icon, label, value, change, stripe, iconBg, iconColor, onClick, valSize }: StatCardProps) {
  const trendClass = change.startsWith('↑') ? 'up' : change.startsWith('↓') ? 'down' : 'neu';

  return (
    <div
      className="u-stat"
      style={{ '--u-stripe': stripe, cursor: onClick ? 'pointer' : undefined } as any}
      onClick={onClick}
    >
      <div className="u-stat-ico" style={{ background: iconBg, color: iconColor }}>{icon}</div>
      <div className="u-stat-body">
        <div className="u-stat-lbl">{label}</div>
        <div className="u-stat-val" style={valSize ? { fontSize: valSize } : undefined}>{value}</div>
        <div className={`u-stat-trend ${trendClass}`}>{change}</div>
      </div>
    </div>
  );
}

/** Container for stat cards: <StatRow cols={4}>{children}</StatRow> */
export function StatRow({ cols, children }: { cols: 3 | 4 | 5; children: React.ReactNode }) {
  return <div className={`u-stats cols-${cols}`}>{children}</div>;
}
