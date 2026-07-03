"use client";
import Logo from "./Logo";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", position: "relative" }}>
      {/* Top-left logo */}
      <div style={{ position: "fixed", top: 20, left: 24, zIndex: 10 }}>
        <Logo />
      </div>

      {/* Centered card */}
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 16px 40px",
      }}>
        <div
          className="auth-card-gradient-border"
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "40px 36px",
            boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
