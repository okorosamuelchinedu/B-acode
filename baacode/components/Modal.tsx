"use client";
import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
}

export default function Modal({ open, onClose, children, labelledBy }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key !== "Tab" || !ref.current) return;
    const focusable = ref.current.querySelectorAll<HTMLElement>(
      'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", trapFocus);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      ref.current?.querySelector<HTMLElement>("button,input,[tabindex]")?.focus();
    }, 10);
    return () => {
      document.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = "";
    };
  }, [open, trapFocus]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      role="dialog"
      aria-labelledby={labelledBy}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <div ref={ref} style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", width: "100%", maxWidth: 340, position: "relative", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
        {children}
      </div>
    </div>,
    document.body
  );
}
