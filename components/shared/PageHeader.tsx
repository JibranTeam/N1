"use client";
/* ═══════════════════════════════════════
   PageHeader — .page-hdr
   Used by 17/20 frames. Renders exact same HTML:
   <div class="page-hdr">
     <div class="page-hdr-left"><h2>icon Title</h2><p>subtitle</p></div>
     {actions}
   </div>
═══════════════════════════════════════ */
import type { ReactNode } from 'react';

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export default function PageHeader({ icon, title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="page-hdr">
      <div className="page-hdr-left">
        <h2>{icon}{title}</h2>
        <p>{subtitle}</p>
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {actions}
        </div>
      )}
    </div>
  );
}
