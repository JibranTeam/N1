"use client";
import { AppProvider } from '@/context/AppContext';
import { ModalProvider } from '@/context/ModalContext';
import AppShell from '@/components/app-shell/AppShell';

export default function Home() {
  return (
    <AppProvider>
      <ModalProvider>
        <AppShell />
      </ModalProvider>
    </AppProvider>
  );
}
