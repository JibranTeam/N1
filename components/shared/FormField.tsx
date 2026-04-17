"use client";
/* ═══════════════════════════════════════
   FormField — .fg form group with label
   Used across Prescriptions, Billing, ClinicSetup,
   WhatsApp, and modal forms.
═══════════════════════════════════════ */

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function FormField({ label, required, children, style }: FormFieldProps) {
  return (
    <div className="fg" style={style}>
      <label>{label}{required && <span style={{ color: 'var(--crimson)' }}> *</span>}</label>
      {children}
    </div>
  );
}

/** Standard text input with the app's default styling */
export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: '100%', padding: '9px 12px',
        border: '1.5px solid var(--slate-pale)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)', fontSize: 13.5,
        color: 'var(--slate)', background: 'var(--white)',
        outline: 'none', boxSizing: 'border-box',
        ...props.style,
      }}
    />
  );
}

/** Standard textarea with the app's default styling */
export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{
        width: '100%', padding: '10px 12px',
        border: '1.5px solid var(--slate-pale)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)', fontSize: 13.5,
        color: 'var(--slate)', background: 'var(--white)',
        outline: 'none', resize: 'vertical', minHeight: 80,
        boxSizing: 'border-box',
        ...props.style,
      }}
    />
  );
}

/** Standard select with the app's default styling */
export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select
      {...props}
      style={{
        width: '100%', padding: '9px 12px',
        border: '1.5px solid var(--slate-pale)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-body)', fontSize: 13.5,
        color: 'var(--slate)', background: 'var(--white)',
        outline: 'none',
        ...props.style,
      }}
    />
  );
}
