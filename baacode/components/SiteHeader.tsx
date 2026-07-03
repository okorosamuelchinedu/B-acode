"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

interface SiteHeaderProps {
  auth: "guest" | "authenticated";
  activePage?: "home" | "write" | "about";
  writeMode?: boolean;
  publishStatus?: "idle" | "publishing" | "published";
  onPublish?: () => void;
}

export default function SiteHeader({ auth, activePage, writeMode = false, publishStatus = "idle", onPublish }: SiteHeaderProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const bg = writeMode ? "#2d2d2d" : "#ffffff";
  const border = writeMode ? "none" : "1px solid #F3F4F6";
  const navColor = (page: string) => {
    if (activePage === page) return writeMode ? "#4FC3D5" : "#4FC3D5";
    return writeMode ? "#cccccc" : "#111111";
  };

  return (
    <header style={{ background: bg, borderBottom: border, position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

        {/* Logo */}
        <Logo />

        {/* Nav */}
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["home", "Home", "/"], ["write", "Write", "/write"], ["about", "About", "/about"]].map(([key, label, href]) => (
            <Link key={key} href={href} style={{ fontSize: 15, fontWeight: 500, color: navColor(key), textDecoration: "none", fontFamily: "Arial, sans-serif" }}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

          {/* Search icon */}
          <button
            aria-label="Search"
            onClick={() => router.push("/search")}
            style={{ background: "none", border: "none", cursor: "pointer", color: writeMode ? "#ccc" : "#111111", display: "flex", padding: 4 }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>

          {/* Write mode: publish + more */}
          {writeMode && (
            <>
              <button
                onClick={onPublish}
                disabled={publishStatus === "publishing"}
                style={{
                  padding: "6px 16px", background: publishStatus === "idle" ? "#5a5a5a" : publishStatus === "published" ? "#4FC3D5" : "#5a5a5a",
                  border: "none", borderRadius: 8, color: "#ffffff", fontSize: 13, fontWeight: 600,
                  cursor: publishStatus === "publishing" ? "not-allowed" : "pointer", fontFamily: "inherit",
                }}
              >
                {publishStatus === "publishing" ? "Publishing…" : publishStatus === "published" ? "Published ✓" : "Publish"}
              </button>

              <div ref={moreRef} style={{ position: "relative" }}>
                <button onClick={() => setMoreOpen(v => !v)}
                  style={{ background: "none", border: "none", color: "#ffffff", fontSize: 20, cursor: "pointer", padding: "0 4px", letterSpacing: 2 }}>
                  •••
                </button>
                {moreOpen && (
                  <div style={{ position: "absolute", right: 0, top: 34, background: "#ffffff", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", padding: "6px 0", width: 180, zIndex: 50 }}>
                    {["Save draft", "Share to Twitter", "Share to Facebook", "Copy link", "Edit Post"].map(item => (
                      <button key={item} style={{ display: "block", width: "100%", padding: "9px 16px", background: "none", border: "none", textAlign: "left", fontSize: 14, color: "#111111", cursor: "pointer", fontFamily: "inherit" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                        onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Guest: Login button */}
          {!writeMode && auth === "guest" && (
            <Link href="/login" style={{
              padding: "7px 18px", border: "1.5px solid #111111", borderRadius: 8,
              fontSize: 14, fontWeight: 600, color: "#111111", textDecoration: "none", fontFamily: "Arial, sans-serif",
            }}>Login</Link>
          )}

          {/* Authenticated: bell + avatar */}
          {!writeMode && auth === "authenticated" && (
            <>
              <button aria-label="Notifications" style={{ background: "none", border: "none", cursor: "pointer", color: "#111111", display: "flex", padding: 4 }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </button>

              <div ref={menuRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setMenuOpen(v => !v)}
                  aria-haspopup="menu" aria-expanded={menuOpen} aria-label="User menu"
                  style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #E5E7EB", overflow: "hidden", cursor: "pointer", background: "#E5E7EB", padding: 0 }}
                >
                  <img src="https://i.pravatar.cc/64?img=12" alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>

                {menuOpen && (
                  <div role="menu" style={{ position: "absolute", right: 0, top: 44, background: "#ffffff", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", padding: "6px 0", width: 180, zIndex: 50 }}>
                    <div style={{ padding: "10px 16px 8px", borderBottom: "1px solid #F3F4F6" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>Ejere MacDavies</div>
                      <div style={{ fontSize: 12, color: "#9CA3AF" }}>@emacd</div>
                    </div>
                    {[["View Profile", "/profile"], ["Writing Post", "/write"], ["Edit Profile", "/edit-profile"]].map(([label, href]) => (
                      <Link key={label} href={href} role="menuitem" onClick={() => setMenuOpen(false)}
                        style={{ display: "block", padding: "9px 16px", fontSize: 14, color: "#111111", textDecoration: "none", fontFamily: "Arial, sans-serif" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                        onMouseLeave={e => (e.currentTarget.style.background = "")}>
                        {label}
                      </Link>
                    ))}
                    <div style={{ borderTop: "1px solid #F3F4F6", marginTop: 4 }}>
                      <Link href="/logout" role="menuitem" onClick={() => setMenuOpen(false)}
                        style={{ display: "block", padding: "9px 16px", fontSize: 14, color: "#E4572E", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>
                        Sign out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Write mode avatar */}
          {writeMode && auth === "authenticated" && (
            <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", border: "2px solid #555" }}>
              <img src="https://i.pravatar.cc/64?img=12" alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
