"use client";
/* ═══════════════════════════════════════
   TOAST CONTAINER
   Renders the global toast notification stack.
   Original classes: ht-toast, in, out, success, error, warning, info
═══════════════════════════════════════ */
import { useApp } from '@/context/AppContext';

const icons: Record<string, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export default function ToastContainer() {
  const { state } = useApp();

  if (state.toasts.length === 0) return null;

  return (
    <div id="toastCon" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {state.toasts.map(t => (
        <div key={t.id} className={`ht-toast ${t.type} in`} role="alert">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {t.type === 'success' && <polyline points="20 6 9 17 4 12"/>}
            {t.type === 'error' && <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/></>}
            {t.type === 'warning' && <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>}
            {t.type === 'info' && <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/></>}
          </svg>
          {' '}{t.message}
        </div>
      ))}
    </div>
  );
}
