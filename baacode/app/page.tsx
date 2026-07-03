"use client";
import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ArticleCard from "@/components/ArticleCard";
import ConfirmModal from "@/components/ConfirmModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ARTICLES, SEARCH_TAGS } from "@/lib/mockData";

export default function HomePage() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [subEmail, setSubEmail] = useState("");

  const featured = ARTICLES[0];
  const editorPicks = ARTICLES.slice(1, 4);
  const bigCard = ARTICLES[4];
  const listArticles = ARTICLES.slice(5);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <SiteHeader auth="authenticated" activePage="home" />

      {/* ── Featured hero ── */}
      <div style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, padding: "28px 0 24px" }}>
            {/* Left: text */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
                {featured.category}
              </p>
              <Link href={`/article/${featured.id}`} style={{ textDecoration: "none" }}>
                <h1 style={{ fontSize: 22, fontWeight: 900, color: "#111111", lineHeight: 1.3, margin: "0 0 10px" }}>
                  {featured.title}
                </h1>
              </Link>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 10 }}>
                {featured.author} · {featured.date} · {featured.readTime}
              </p>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {featured.excerpt}
              </p>
            </div>
            {/* Right: image */}
            <div style={{ background: "#E5E7EB", borderRadius: 10, overflow: "hidden", aspectRatio: "16/10" }}>
              {featured.image && <img src={featured.image} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            </div>
          </div>
        </div>
      </div>

      {/* ── Editor's Picks ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 0" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: "center", color: "#111111", marginBottom: 28, fontFamily: "Georgia, serif" }}>
          Editor&apos;s Picks
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
          {/* Left 2 cols: horizontal list */}
          <div style={{ gridColumn: "span 2", borderRight: "1px solid #F3F4F6", paddingRight: 32 }}>
            {editorPicks.map(a => (
              <ArticleCard key={a.id} article={a} layout="horizontal" />
            ))}
          </div>

          {/* Right col: big overlay card */}
          <div style={{ paddingLeft: 32 }}>
            <ArticleCard article={bigCard} layout="featured-overlay" />
          </div>
        </div>
      </div>

      {/* ── Article list + Search sidebar ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 40 }}>
          {/* Article list */}
          <div>
            {listArticles.map(a => (
              <ArticleCard key={a.id} article={a} layout="horizontal" />
            ))}
          </div>

          {/* Search for sidebar */}
          <div style={{ paddingTop: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
              Search for:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {SEARCH_TAGS.map(tag => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}
                  style={{ fontSize: 13, color: "#6B7280", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#4FC3D5")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}>
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter section ── */}
      <div style={{ background: "#2d2d2d", padding: "40px 24px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#ffffff", marginBottom: 6, fontFamily: "Georgia, serif" }}>
            Subscribe to our Newsletter
          </h3>
          <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 20 }}>
            Join a million+ to stay in progress.
          </p>
          {/* Envelope icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, border: "2px solid #4FC3D5", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4FC3D5" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>
              </svg>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <input type="email" placeholder="Email" value={subEmail}
              onChange={e => setSubEmail(e.target.value)}
              style={{ flex: 1, maxWidth: 200, padding: "10px 14px", background: "#3d3d3d", border: "none", borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
            <button onClick={() => setSubscribeOpen(true)}
              style={{ padding: "10px 20px", background: "#4FC3D5", border: "none", borderRadius: 8, color: "#111111", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ background: "#1a1a1a", padding: "28px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            {/* Logo row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #4FC3D5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: "#4FC3D5" }}>Z</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#ffffff" }}>B@aCode</span>
            </div>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 16 }}>
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter" style={{ color: "#9CA3AF" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.07V8A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" style={{ color: "#9CA3AF" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
            {/* Nav links */}
            <div style={{ display: "flex", gap: 24 }}>
              {["Home", "Newsletter", "About"].map(item => (
                <Link key={item} href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  style={{ fontSize: 13, color: "#9CA3AF", textDecoration: "none" }}>
                  {item}
                </Link>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "#6B7280", margin: 0 }}>© 2024 B@aCode. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ConfirmModal open={logoutOpen} title="Log out?" body="Do you really want to leave B@acode? We'll miss you and so will you go."
        confirmLabel="Yes, Log Out" onConfirm={() => setLogoutOpen(false)} onCancel={() => setLogoutOpen(false)} />
      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </div>
  );
}
