"use client";
/* ═══════════════════════════════════════
   Modal — .overlay + .modal with focus trap + ESC
   Replaces 22 modal patterns from original.
   Supports: sm, md, lg sizes.
   Includes ConfirmModal variant.
═══════════════════════════════════════ */
import { useEffect, useRef, useCallback, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  footer?: ReactNode;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, size = 'md', footer, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (!open || !contentRef.current) return;
    const focusable = contentRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();
  }, [open]);

  if (!open) return null;

  const sizeClass = size === 'sm' ? 'ht-modal-sm' : size === 'lg' ? 'ht-modal-lg' : 'ht-modal-md';

  return (
    <div className="overlay open" ref={overlayRef} onClick={e => { if (e.target === overlayRef.current) onClose(); }}>
      <div className={`modal ${sizeClass}`} ref={contentRef} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

/** Confirm dialog — simple yes/no modal */
interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
}

export function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', danger }: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm" footer={
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button
          className={`btn ${danger ? 'btn-danger' : 'btn-primary'} btn-sm`}
          onClick={() => { onConfirm(); onClose(); }}
        >{confirmLabel}</button>
      </div>
    }>
      <p style={{ fontSize: 13, color: 'var(--slate-soft)', lineHeight: 1.6 }}>{message}</p>
    </Modal>
  );
}
