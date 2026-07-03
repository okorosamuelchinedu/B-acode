"use client";
import { useState } from "react";
import Link from "next/link";
import AuthCard from "./AuthCard";
import SocialAuthRow from "./SocialAuthRow";
import Spinner from "./Spinner";

interface SignUpCardProps {
  status?: "idle" | "loading" | "error" | "success";
  fieldErrors?: Partial<Record<"email" | "password", string>>;
  formError?: string;
  onSubmit?: (values: { email: string; password: string; remember: boolean }) => void;
}

const input: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "#F3F4F6", border: "none", borderRadius: 12,
  padding: "13px 16px", fontSize: 14, color: "#111111",
  outline: "none", fontFamily: "inherit",
};

export default function SignUpCard({ status = "idle", fieldErrors = {}, formError, onSubmit }: SignUpCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [localErrors, setLocalErrors] = useState<Partial<Record<"email" | "password", string>>>({});

  const isLoading = status === "loading";
  const allErrors = { ...localErrors, ...fieldErrors };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof localErrors = {};
    if (!email.trim()) errs.email = "Email is required";
    if (!password.trim()) errs.password = "Password is required";
    else if (password.length < 8) errs.password = "Password should be at least 8 characters long";
    if (Object.keys(errs).length) { setLocalErrors(errs); return; }
    setLocalErrors({});
    onSubmit?.({ email, password, remember });
  }

  if (status === "success") {
    return (
      <AuthCard>
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            background: "rgba(79,195,213,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4FC3D5" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111111", marginBottom: 8 }}>Account created!</h2>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>Welcome to B@aCode. You can now log in.</p>
          <Link href="/login" style={{
            display: "block", width: "100%", boxSizing: "border-box",
            padding: "14px 0", background: "#4FC3D5", borderRadius: 12,
            fontSize: 15, fontWeight: 800, color: "#111111", textDecoration: "none", textAlign: "center",
          }}>Continue to Login</Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <h1 style={{ fontSize: 26, fontWeight: 800, textAlign: "center", color: "#111111", margin: "0 0 6px" }}>
        Welcome to B@acode
      </h1>
      <p style={{ fontSize: 14, textAlign: "center", color: "#6B7280", margin: "0 0 28px" }}>
        Create an account, Create magic.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="su-email" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>Email</label>
          <input
            id="su-email" type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            style={{ ...input, outline: allErrors.email ? "1px solid #E4572E" : "none" }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 4, position: "relative" }}>
          <label htmlFor="su-password" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>Password</label>
          <input
            id="su-password" type={showPw ? "text" : "password"} placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            style={{ ...input, paddingRight: 42, outline: allErrors.password ? "1px solid #E4572E" : "none" }}
          />
          <button type="button" aria-label={showPw ? "Hide" : "Show"}
            onClick={() => setShowPw(v => !v)}
            style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", alignItems: "center" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>

        {/* Password error inline */}
        {allErrors.password && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#E4572E", fontSize: 12, marginBottom: 10, marginTop: 4 }}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 2L2 17h16L10 2z" stroke="#E4572E" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 8v4" stroke="#E4572E" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="14.5" r="0.8" fill="#E4572E"/></svg>
            {allErrors.password}
          </div>
        )}

        {/* Remember me */}
        <div style={{ marginBottom: 20, marginTop: allErrors.password ? 0 : 12 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13 }}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
              disabled={isLoading} style={{ accentColor: "#4FC3D5", width: 14, height: 14 }} />
            <span style={{ color: "#4FC3D5" }}>Remember me</span>
          </label>
        </div>

        {/* Sign up button */}
        <button type="submit" disabled={isLoading} aria-busy={isLoading}
          style={{
            width: "100%", padding: "14px 0", background: "#4FC3D5",
            border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800,
            color: "#111111", cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.9 : 1, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8, fontFamily: "inherit",
          }}>
          {isLoading ? <Spinner size={17} color="#111" /> : "Sign up"}
        </button>
      </form>

      <SocialAuthRow label="Sign up with" />

      <p style={{ textAlign: "center", fontSize: 12, color: "#6B7280", marginTop: 14 }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#4FC3D5", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
      </p>
    </AuthCard>
  );
}
