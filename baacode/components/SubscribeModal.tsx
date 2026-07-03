"use client";
import { useState } from "react";
import Modal from "./Modal";
import Spinner from "./Spinner";

export default function SubscribeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1200));
    setStatus("success");
  }

  function handleClose() { setEmail(""); setStatus("idle"); onClose(); }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="sub-title">
      {/* Close X */}
      <button onClick={handleClose} aria-label="Close"
        style={{ position: "absolute", top: 12, right: 16, background: "none", border: "none", fontSize: 22, color: "#9CA3AF", cursor: "pointer", lineHeight: 1 }}>
        ×
      </button>

      {status === "success" ? (
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <h2 id="sub-title" style={{ fontSize: 20, fontWeight: 800, color: "#7C5CFC", marginBottom: 6 }}>Yes!!!</h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.5 }}>
            You have successfully<br />subscribed to our newsletter
          </p>
          {/* Envelope icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 60, height: 60, border: "2px solid #4FC3D5", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4FC3D5" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>
              </svg>
            </div>
          </div>
          <button onClick={handleClose}
            style={{ padding: "10px 32px", background: "#4FC3D5", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#111111", cursor: "pointer", fontFamily: "inherit" }}>
            Go Home
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <h2 id="sub-title" style={{ fontSize: 17, fontWeight: 800, color: "#111111", marginBottom: 6 }}>Subscribe to our Newsletter</h2>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Join a million+ to stay in progress.</p>
          {/* Envelope icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <div style={{ width: 56, height: 56, border: "2px solid #4FC3D5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4FC3D5" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>
              </svg>
            </div>
          </div>
          <label htmlFor="sub-email" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>Email</label>
          <input id="sub-email" type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required
            style={{ width: "100%", boxSizing: "border-box", background: "#F3F4F6", border: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, outline: "none", marginBottom: 12, fontFamily: "inherit" }} />
          <button type="submit" disabled={status === "loading"}
            style={{ width: "100%", padding: "12px 0", background: "#4FC3D5", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#111111", cursor: status === "loading" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}>
            {status === "loading" ? <Spinner size={16} color="#111" /> : "Subscribe"}
          </button>
        </form>
      )}
    </Modal>
  );
}
