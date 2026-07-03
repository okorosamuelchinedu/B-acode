"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AuthCard from "./AuthCard";
import SocialAuthRow from "./SocialAuthRow";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";

interface LoginCardProps {
  status?: "idle" | "loading" | "error" | "success";
  errorMessage?: string;
  onSubmit?: (values: { email: string; password: string; remember: boolean }) => void;
}

const input: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "#F3F4F6", border: "none", borderRadius: 12,
  padding: "13px 16px", fontSize: 14, color: "#111111",
  outline: "none", fontFamily: "inherit",
};
const inputError: React.CSSProperties = { ...input, outline: "1px solid #E4572E" };

export default function LoginCard({ status = "idle", errorMessage = "Incorrect credentials", onSubmit }: LoginCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [localErr, setLocalErr] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "loading";
  const isError = status === "error" || !!localErr;
  const errText = localErr || errorMessage;

  useEffect(() => { if (status === "error") emailRef.current?.focus(); }, [status]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalErr("");
    if (!email.trim()) { setLocalErr("Email is required"); return; }
    if (!password.trim()) { setLocalErr("Password is required"); return; }
    onSubmit?.({ email, password, remember });
  }

  return (
    <AuthCard>
      <h1 style={{ fontSize: 26, fontWeight: 800, textAlign: "center", color: "#111111", margin: "0 0 6px" }}>
        Welcome back!
      </h1>
      <p style={{ fontSize: 14, textAlign: "center", color: "#6B7280", margin: "0 0 28px" }}>
        We missed you for a minute.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Error row */}
        {isError && (
          <div style={{ marginBottom: 12 }}>
            <ErrorMessage message={errText} />
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="login-email" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>Email</label>
          <input
            ref={emailRef}
            id="login-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            aria-invalid={isError}
            style={isError ? inputError : input}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 14, position: "relative" }}>
          <label htmlFor="login-password" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>Password</label>
          <input
            id="login-password"
            type={showPw ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            aria-invalid={isError}
            style={{ ...(isError ? inputError : input), paddingRight: 42 }}
          />
          <button
            type="button"
            aria-label={showPw ? "Hide password" : "Show password"}
            onClick={() => setShowPw((v) => !v)}
            style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", padding: 0, color: "#9CA3AF",
              display: "flex", alignItems: "center",
            }}
          >
            {showPw ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>

        {/* Remember + Forgot */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13 }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={isLoading}
              style={{ accentColor: "#4FC3D5", width: 14, height: 14 }}
            />
            <span style={{ color: "#4FC3D5" }}>Remember me</span>
          </label>
          <Link href="/forgot-password" style={{ fontSize: 13, color: "#4FC3D5", textDecoration: "none" }}>
            Forgot Password?
          </Link>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          style={{
            width: "100%", padding: "14px 0", background: "#4FC3D5",
            border: "none", borderRadius: 12, fontSize: 16, fontWeight: 800,
            color: "#111111", cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.9 : 1, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8, fontFamily: "inherit",
          }}
        >
          {isLoading ? <Spinner size={17} color="#111" /> : "Login"}
        </button>
      </form>

      <SocialAuthRow label="Sign in with" />

      <p style={{ textAlign: "center", fontSize: 12, color: "#6B7280", marginTop: 14 }}>
        Don&apos;t have an account yet?{" "}
        <Link href="/signup" style={{ color: "#4FC3D5", textDecoration: "none", fontWeight: 600 }}>Sign up</Link>
      </p>
    </AuthCard>
  );
}
