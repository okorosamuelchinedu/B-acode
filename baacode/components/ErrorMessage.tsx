export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div role="alert" style={{ display: "flex", alignItems: "center", gap: 6, color: "#E4572E", fontSize: 13, fontWeight: 500 }}>
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M10 2L2 17h16L10 2z" stroke="#E4572E" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <path d="M10 8v4" stroke="#E4572E" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="14.5" r="0.8" fill="#E4572E"/>
      </svg>
      <span>{message}</span>
    </div>
  );
}
