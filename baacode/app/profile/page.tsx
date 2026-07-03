"use client";
import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ArticleCard from "@/components/ArticleCard";
import { ARTICLES } from "@/lib/mockData";

const USER = {
  name: "Ejere MacDavies",
  username: "emacd",
  bio: "Ipsum adipisicing culpa est nisi consequat ex amet magna culpa veniam tempor irure ea. Reprehenderit labore do tempor eiusmod in consectetur ex sunt id mollit commodo ipsum deserunt quis.",
  website: "ejeremacdavies.com",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
};

export default function ProfilePage() {
  const isOwnProfile = false;
  const [following, setFollowing] = useState(false);
  const topRead = { ...ARTICLES[4], category: "TOP READS BY DAVIES" };
  const alsoReads = ARTICLES.slice(5, 9);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <SiteHeader auth="authenticated" activePage="home" />

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 60px" }}>
        {/* Profile header */}
        <div style={{ display: "flex", gap: 32, marginBottom: 40, alignItems: "flex-start" }}>
          <div style={{ width: 110, height: 110, borderRadius: "50%", overflow: "hidden", background: "#E5E7EB", flexShrink: 0 }}>
            <img src={USER.avatar} alt={USER.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#111111", margin: 0, fontFamily: "Georgia, serif" }}>{USER.name}</h1>
              {isOwnProfile ? (
                <Link href="/edit-profile"
                  style={{ padding: "7px 16px", border: "1.5px solid #D1D5DB", borderRadius: 8, fontSize: 13, color: "#111111", textDecoration: "none", fontFamily: "Arial, sans-serif" }}>
                  Edit Profile
                </Link>
              ) : (
                <button onClick={() => setFollowing(v => !v)} aria-pressed={following}
                  style={{ padding: "7px 20px", background: following ? "#F3F4F6" : "#4FC3D5", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, color: following ? "#6B7280" : "#111111", cursor: "pointer", fontFamily: "inherit" }}>
                  {following ? "Following" : "Follow"}
                </button>
              )}
            </div>
            <p style={{ fontSize: 14, color: "#9CA3AF", margin: "0 0 10px" }}>@{USER.username}</p>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, margin: "0 0 12px", maxWidth: 480 }}>{USER.bio}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <a href={`https://${USER.website}`} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#9CA3AF", textDecoration: "none" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                {USER.website}
              </a>
              {/* Social icons */}
              <div style={{ display: "flex", gap: 12 }}>
                <a href="#" aria-label="LinkedIn" style={{ color: "#9CA3AF" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" aria-label="Instagram" style={{ color: "#9CA3AF" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" aria-label="Twitter" style={{ color: "#9CA3AF" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.07V8A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Top read featured card */}
        <div style={{ marginBottom: 40 }}>
          <ArticleCard article={topRead} layout="featured-overlay" />
        </div>

        {/* Also reads */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
            DAVIES ALSO READS
          </p>
          {alsoReads.map(a => (
            <ArticleCard key={a.id} article={a} layout="horizontal" />
          ))}
        </div>
      </main>
    </div>
  );
}
