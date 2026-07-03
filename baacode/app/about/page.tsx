import SiteHeader from "@/components/SiteHeader";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <SiteHeader auth="guest" activePage="about" />
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111111", marginBottom: 16, fontFamily: "Georgia, serif" }}>About B@aCode</h1>
        <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8 }}>
          B@aCode is a community platform for tech writers and readers. Share your thoughts,
          discover new ideas, and connect with like-minded people building the future of technology.
        </p>
      </main>
    </div>
  );
}
