"use client";
/* ═══════════════════════════════════════
   SyncActivity — .sync-activity log row
   Used in Team, Sync frames for activity feeds
═══════════════════════════════════════ */

interface SyncActivityProps {
  text: string;
  time: string;
  dotColor?: string;
}

export default function SyncActivity({ text, time, dotColor }: SyncActivityProps) {
  return (
    <div className="sync-activity">
      <div className="sync-activity-dot" style={dotColor ? { background: dotColor } : undefined}></div>
      <div className="sync-activity-txt">{text}</div>
      <div className="sync-activity-time">{time}</div>
    </div>
  );
}
