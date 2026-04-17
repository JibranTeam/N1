"use client";
/* ═══════════════════════════════════════
   DataTable — .tbl-wrap responsive table container
   Used in 7 frames: PatientList, Prescriptions, Inventory,
   Appointments (list view), Billing, Team, MultiClinic
═══════════════════════════════════════ */

interface DataTableProps {
  headers: (string | { label: string; align?: 'center' | 'left' | 'right'; width?: number })[];
  children: React.ReactNode;
}

export default function DataTable({ headers, children }: DataTableProps) {
  return (
    <div className="tbl-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((h, i) => {
              const label = typeof h === 'string' ? h : h.label;
              const align = typeof h === 'string' ? undefined : h.align;
              const width = typeof h === 'string' ? undefined : h.width;
              return (
                <th key={i} style={{ textAlign: align, width }}>{label}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
