"use client";
/* ═══════════════════════════════════════
   MODAL CONTEXT
   Replaces: openXModal(), closeAnyModal(), showModal(),
   showConfirm() — all 22 modals managed centrally.
   Isolated from AppContext to prevent re-renders.
═══════════════════════════════════════ */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ModalId } from '@/lib/types';

interface ModalState {
  activeModal: ModalId;
  modalData: any;
  confirmCallback: (() => void) | null;
  confirmTitle: string;
  confirmMessage: string;
}

interface ModalContextType {
  modal: ModalState;
  openModal: (id: ModalId, data?: any) => void;
  closeModal: () => void;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({
    activeModal: null,
    modalData: null,
    confirmCallback: null,
    confirmTitle: '',
    confirmMessage: '',
  });

  // openModal (replaces openNewRxModal, openBookApptModal, openAddClinicModal, etc.)
  const openModal = useCallback((id: ModalId, data?: any) => {
    setModal(prev => ({ ...prev, activeModal: id, modalData: data || null }));
  }, []);

  // closeModal (replaces closeAnyModal)
  const closeModal = useCallback(() => {
    setModal(prev => ({ ...prev, activeModal: null, modalData: null, confirmCallback: null }));
  }, []);

  // showConfirm (replaces showConfirm with focus trap)
  const showConfirm = useCallback((title: string, message: string, onConfirm: () => void) => {
    setModal({
      activeModal: 'confirm' as any,
      modalData: null,
      confirmCallback: onConfirm,
      confirmTitle: title,
      confirmMessage: message,
    });
  }, []);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, showConfirm }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
