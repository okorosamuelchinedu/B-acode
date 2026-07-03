"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AuthCard from "./AuthCard";
import Spinner from "./Spinner";

type Step = "request" | "sent" | "reset" | "success";

const input: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "#F3F4F6", border: "none", borderRadius: 12,
  padding: "13px 16px", fontSize: 14, color: "#111111",
  outline: "none", fontFamily: "inherit",
};

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<Step>("request");
  const [emailVal, setEmailVal] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { headingRef.current?.focus(); }, [step]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!emailVal.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setResendTimer(30);
    setStep("sent");
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!newPw || newPw !== confirmPw) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStep("success");
  }

  const maskedEmail = emailVal ? emailVal.replace(/(.{2}).*(@.*)/, "$1**$2") : "ma**@gmail.com";

  return (
    <AuthCard>
      {/* STEP: request */}
      {step === "request" && (
        <>
          <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: 26, fontWeight: 800, textAlign: "center", color: "#111111", margin: "0 0 6px", outline: "none" }}>
            Forgot Password?
          </h1>
          <p style={{ fontSize: 14, textAlign: "center", color: "#6B7280", margin: "0 0 28px" }}>
            It&apos;s okay. Just change it!
          </p>
          <form onSubmit={handleRequest} noValidate>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="fp-email" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>Email</label>
              <input id="fp-email" type="email" placeholder="Email" value={emailVal}
                onChange={e => setEmailVal(e.target.value)} style={input} />
            </div>
            <button type="submit" disabled={loading}
              style={{
                width: "100%", padding: "14px 0", background: "#4FC3D5",
                border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800,
                color: "#111111", cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit",
              }}>
              {loading ? <Spinner size={17} color="#111" /> : "Continue>>>>>>>>"}
            </button>
          </form>
        </>
      )}

      {/* STEP: sent */}
      {step === "sent" && (
        <>
          <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: 26, fontWeight: 800, textAlign: "center", color: "#111111", margin: "0 0 6px", outline: "none" }}>
            Forgot Password?
          </h1>
          <p style={{ fontSize: 14, textAlign: "center", color: "#6B7280", margin: "0 0 36px" }}>
            It&apos;s okay. Just change it!
          </p>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111111", marginBottom: 10 }}>
              We&apos;ve sent an email
            </h2>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
              Please check the email sent to <strong>{maskedEmail}</strong>
              <br />to reset your password
            </p>
          </div>
          <div style={{ textAlign: "right", marginBottom: 12 }}>
            <button onClick={() => setStep("reset")}
              style={{ background: "none", border: "none", color: "#4FC3D5", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Continue&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <button disabled={resendTimer > 0} onClick={() => setResendTimer(30)}
              style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 12, cursor: resendTimer > 0 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Didn't get it? Resend"}
            </button>
          </div>
        </>
      )}

      {/* STEP: reset */}
      {step === "reset" && (
        <>
          <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: 26, fontWeight: 800, textAlign: "center", color: "#111111", margin: "0 0 6px", outline: "none" }}>
            Forgot Password?
          </h1>
          <p style={{ fontSize: 14, textAlign: "center", color: "#6B7280", margin: "0 0 28px" }}>
            It&apos;s okay. Just change it!
          </p>
          <form onSubmit={handleReset} noValidate>
            {/* New Password */}
            <div style={{ marginBottom: 12, position: "relative" }}>
              <label htmlFor="fp-new" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>New Password</label>
              <input id="fp-new" type={showNew ? "text" : "password"} placeholder="New Password"
                value={newPw} onChange={e => setNewPw(e.target.value)}
                style={{ ...input, paddingRight: 42 }} />
              <button type="button" aria-label={showNew ? "Hide" : "Show"} onClick={() => setShowNew(v => !v)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            {/* Confirm Password */}
            <div style={{ marginBottom: 20, position: "relative" }}>
              <label htmlFor="fp-confirm" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>Confirm Password</label>
              <input id="fp-confirm" type={showConfirm ? "text" : "password"} placeholder="Confirm Password"
                value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                style={{ ...input, paddingRight: 42 }} />
              <button type="button" aria-label={showConfirm ? "Hide" : "Show"} onClick={() => setShowConfirm(v => !v)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <button type="submit" disabled={loading}
              style={{
                width: "100%", padding: "14px 0", background: "#4FC3D5",
                border: "none", borderRadius: 12, fontSize: 15, fontWeight: 800,
                color: "#111111", cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit",
              }}>
              {loading ? <Spinner size={17} color="#111" /> : "Reset Password"}
            </button>
          </form>
        </>
      )}

      {/* STEP: success */}
      {step === "success" && (
        <>
          <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: 26, fontWeight: 800, textAlign: "center", color: "#111111", margin: "0 0 32px", outline: "none" }}>
            Congratulations!!!
          </h1>
          <p style={{ fontSize: 15, textAlign: "center", color: "#111111", lineHeight: 1.6, margin: "0 0 40px" }}>
            You have successfully<br />changed your password.
          </p>
          <div style={{ textAlign: "right" }}>
            <Link href="/login" style={{ color: "#4FC3D5", fontSize: 13, textDecoration: "none" }}>
              Back to Login&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;
            </Link>
          </div>
        </>
      )}
    </AuthCard>
  );
}
