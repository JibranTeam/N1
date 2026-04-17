"use client";
/* ═══════════════════════════════════════
   Toggle — .tog-sw toggle switch
   Used in ClinicSetup, WhatsApp, Sync, Settings panels.
   Renders: <button class="tog-sw on"><span class="tog-knob"></span></button>
═══════════════════════════════════════ */

interface ToggleProps {
  on: boolean;
  onToggle: () => void;
  id?: string;
}

export default function Toggle({ on, onToggle, id }: ToggleProps) {
  return (
    <button
      className={`tog-sw ${on ? 'on' : ''}`}
      onClick={onToggle}
      id={id}
      type="button"
    >
      <span className="tog-knob"></span>
    </button>
  );
}
