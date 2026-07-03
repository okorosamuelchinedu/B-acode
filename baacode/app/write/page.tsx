"use client";
import { useState, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [plusOpen, setPlusOpen] = useState(false);
  const [publishStatus, setPublishStatus] = useState<"idle" | "publishing" | "published">("idle");
  const plusRef = useRef<HTMLDivElement>(null);

  const canPublish = title.trim().length > 0;

  async function handlePublish() {
    if (!canPublish || publishStatus !== "idle") return;
    setPublishStatus("publishing");
    await new Promise(r => setTimeout(r, 1400));
    setPublishStatus("published");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#2d2d2d" }}>
      <SiteHeader auth="authenticated" activePage="write" writeMode publishStatus={publishStatus} onPublish={handlePublish} />

      {/* White editor area */}
      <main style={{ flex: 1, background: "#ffffff", maxWidth: 760, width: "100%", margin: "0 auto", padding: "48px 56px 80px", boxSizing: "border-box" }}>

        {/* Title */}
        {title ? (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 24 }}>
            {/* + button */}
            <div ref={plusRef} style={{ position: "relative", marginTop: 6 }}>
              <button
                type="button"
                aria-label="Insert content block"
                aria-haspopup="menu"
                onClick={() => setPlusOpen(v => !v)}
                style={{
                  width: 28, height: 28, border: "2px solid #9CA3AF", borderRadius: 6,
                  background: "#fff", color: "#9CA3AF", fontSize: 18, display: "flex",
                  alignItems: "center", justifyContent: "center", cursor: "pointer",
                  flexShrink: 0, fontFamily: "inherit", lineHeight: 1,
                }}
              >
                +
              </button>
              {plusOpen && (
                <div role="menu" style={{ position: "absolute", left: 0, top: 34, background: "#fff", borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid #F3F4F6", padding: "4px 0", width: 130, zIndex: 50 }}>
                  {["Add image", "Add video", "Embed link"].map(opt => (
                    <button key={opt} role="menuitem" onClick={() => setPlusOpen(false)}
                      style={{ display: "block", width: "100%", padding: "9px 14px", background: "none", border: "none", textAlign: "left", fontSize: 13, color: "#111111", cursor: "pointer", fontFamily: "inherit" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                      onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111111", lineHeight: 1.2, margin: 0, fontFamily: "Georgia, serif", flex: 1 }}>{title}</h1>
          </div>
        ) : (
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Post Title"
            aria-label="Post title"
            style={{
              width: "100%", boxSizing: "border-box",
              fontSize: 32, fontWeight: 900, color: "#9CA3AF",
              border: "none", outline: "none", background: "transparent",
              marginBottom: 24, fontFamily: "Georgia, serif",
            }}
          />
        )}

        {/* Body */}
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write your thoughts..."
          aria-label="Post body"
          rows={24}
          style={{
            width: "100%", boxSizing: "border-box",
            fontSize: 16, color: "#111111", lineHeight: 1.8,
            border: "none", outline: "none", background: "transparent",
            resize: "none", fontFamily: "Georgia, serif",
          }}
        />

        {/* Published toast */}
        {publishStatus === "published" && (
          <div role="status" aria-live="polite"
            style={{ position: "fixed", bottom: 24, right: 24, background: "#4FC3D5", color: "#111111", padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", zIndex: 99 }}>
            ✓ Post published!
          </div>
        )}
      </main>
    </div>
  );
}
