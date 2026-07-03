"use client";
import Modal from "./Modal";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ open, title, body, confirmLabel = "Confirm", onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onCancel} labelledBy="confirm-title">
      <div style={{ textAlign: "center" }}>
        {/* Title in violet/teal */}
        <h2 id="confirm-title" style={{ fontSize: 20, fontWeight: 800, color: "#7C5CFC", marginBottom: 6 }}>{title}</h2>
        <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.5 }}>{body}</p>

        {/* Sad face circle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #4FC3D5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4FC3D5" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 16s1.5-2 4-2 4 2 4 2" strokeLinecap="round"/>
              <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* No, Go Home button */}
        <button onClick={onCancel}
          style={{ width: "100%", padding: "12px 0", background: "#4FC3D5", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#111111", cursor: "pointer", marginBottom: 8, fontFamily: "inherit" }}>
          No, Go Home!
        </button>

        {/* Yes, Log Out */}
        <button onClick={onConfirm}
          style={{ width: "100%", padding: "12px 0", background: "none", border: "1.5px solid #E5E7EB", borderRadius: 12, fontSize: 14, color: "#6B7280", cursor: "pointer", fontFamily: "inherit" }}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
