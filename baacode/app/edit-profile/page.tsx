"use client";
import { useState, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import Spinner from "@/components/Spinner";

const BIO_MAX = 700;

const FILLED = {
  fullName: "Ejere MacDavies",
  username: "emacd",
  instagram: "www.instagram.com/emacd",
  linkedin: "www.linkedin.com/ejere-macdavies",
  twitter: "www.twitter.com/emacd",
  website: "www.ejeremacdavies.com",
  description: "Ipsum adipisicing culpa est nisi consequat ex amet magna culpa veniam tempor irure ea. Reprehenderit labore do tempor eiusmod in consectetur ex sunt id mollit commodo ipsum deserunt quis.",
};

const fieldStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  border: "1px solid #D1D5DB", borderRadius: 8,
  padding: "13px 16px", fontSize: 14, color: "#111111",
  outline: "none", fontFamily: "inherit", background: "#fff",
};

export default function EditProfilePage() {
  const [values, setValues] = useState(FILLED);
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80");
  const [avatarStatus, setAvatarStatus] = useState<"idle" | "uploading">("idle");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  function set(field: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field === "description" && e.target.value.length > BIO_MAX) return;
      setValues(v => ({ ...v, [field]: e.target.value }));
    };
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarStatus("uploading");
    await new Promise(r => setTimeout(r, 1000));
    setAvatar(URL.createObjectURL(file));
    setAvatarStatus("idle");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveStatus("saving");
    await new Promise(r => setTimeout(r, 1200));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2500);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <SiteHeader auth="authenticated" />

      <main style={{ maxWidth: 600, margin: "0 auto", padding: "32px 24px 60px" }}>
        {/* Avatar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
          <div style={{ position: "relative" }}>
            <button type="button" onClick={() => fileRef.current?.click()} aria-label="Change profile photo"
              style={{ width: 112, height: 112, borderRadius: "50%", overflow: "hidden", background: "#9CA3AF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: 0 }}>
              {avatar
                ? <img src={avatar} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="2" aria-hidden="true"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              }
              {/* Pencil icon overlay */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" strokeWidth="2.5" aria-hidden="true"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              </div>
              {avatarStatus === "uploading" && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Spinner size={28} color="#fff" />
                </div>
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} aria-label="Upload photo" />
          </div>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSave}>
          {[
            { id: "fullName", label: "Full Name", placeholder: "Full Name" },
            { id: "username", label: "Username", placeholder: "Username" },
            { id: "instagram", label: "Instagram URL", placeholder: "Instagram URL" },
            { id: "linkedin", label: "LinkedIn URL", placeholder: "Linkedin URL" },
            { id: "twitter", label: "Twitter URL", placeholder: "Twitter URL" },
            { id: "website", label: "Website URL", placeholder: "Website/Portfolio URL" },
          ].map(({ id, label, placeholder }) => (
            <div key={id} style={{ marginBottom: 12 }}>
              <label htmlFor={id} style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>{label}</label>
              <input id={id} type="text" placeholder={placeholder}
                value={values[id as keyof typeof values]} onChange={set(id as keyof typeof values)}
                disabled={saveStatus === "saving"}
                style={{ ...fieldStyle, opacity: saveStatus === "saving" ? 0.6 : 1 }} />
            </div>
          ))}

          {/* Description */}
          <div style={{ marginBottom: 28 }}>
            <label htmlFor="description" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>Description</label>
            <textarea id="description" placeholder="Description"
              value={values.description} onChange={set("description")}
              rows={6} disabled={saveStatus === "saving"}
              style={{ ...fieldStyle, resize: "none", opacity: saveStatus === "saving" ? 0.6 : 1 }} />
            <p style={{ fontSize: 12, color: "#9CA3AF", textAlign: "right", marginTop: 4 }} aria-live="polite">
              {values.description.length} of {BIO_MAX}
            </p>
          </div>

          {/* Save button */}
          <button type="submit" disabled={saveStatus === "saving"}
            style={{
              width: "100%", padding: "14px 0", background: "#4FC3D5", border: "none",
              borderRadius: 12, fontSize: 16, fontWeight: 800, color: "#111111",
              cursor: saveStatus === "saving" ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit",
            }}>
            {saveStatus === "saving"
              ? <><Spinner size={16} color="#111" /> Saving…</>
              : saveStatus === "saved" ? "✓ Saved!" : "Save Changes"}
          </button>
        </form>
      </main>
    </div>
  );
}
