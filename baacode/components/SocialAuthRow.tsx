export default function SocialAuthRow({ label = "Sign in with" }: { label?: string }) {
  return (
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>Or {label}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <button
          type="button"
          aria-label="Continue with Google"
          style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </button>
        <button
          type="button"
          aria-label="Continue with Apple"
          style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="15" height="18" viewBox="0 0 15 18" fill="#111111">
            <path d="M12.27 9.36c-.02-2.03 1.66-3.01 1.73-3.05-0.94-1.38-2.41-1.57-2.93-1.59-1.25-.13-2.44.74-3.07.74-.63 0-1.6-.72-2.63-.7-1.35.02-2.6.79-3.3 2-1.41 2.45-.36 6.08 1.01 8.07.67.97 1.47 2.06 2.52 2.02 1.01-.04 1.4-.65 2.62-.65 1.22 0 1.57.65 2.64.63 1.09-.02 1.78-.99 2.44-1.96.77-1.12 1.09-2.21 1.11-2.27-.02-.01-2.13-.82-2.15-3.24z"/>
            <path d="M10.28 3.1c.56-.68.94-1.62.83-2.56-.81.03-1.78.54-2.36 1.21-.52.6-.97 1.56-.85 2.48.9.07 1.82-.46 2.38-1.13z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
