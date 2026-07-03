"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { ARTICLES } from "@/lib/mockData";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES.find(a => a.id === id) ?? ARTICLES[0];
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(48);

  function toggleLike() {
    setLiked(v => !v);
    setLikeCount(c => liked ? c - 1 : c + 1);
  }

  const body = `Incididunt occaecat et qui dolore consectetur magna. Lorem veniam ut et labore consequat ut ex sunt. Ut et nostrud aliquip do anim proident ad nulla consectetur eu aute ex anim mollit. Anim aute exercitation nisi fugiat. Dolor velit excepteur commodo proident nulla commodo ullamco labore et esse.`;

  return (
    <div style={{ minHeight: "100vh", background: "#2d2d2d", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <SiteHeader auth="authenticated" activePage="home" writeMode />

      <main>
        {/* Hero image */}
        {article.image && (
          <div style={{ width: "100%", maxHeight: 420, overflow: "hidden" }}>
            <img src={article.image} alt={article.title} style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
          </div>
        )}

        {/* Article body */}
        <div style={{ background: "#ffffff", maxWidth: 800, margin: "0 auto", padding: "36px 48px 60px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
            {article.category}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: "#9CA3AF" }}>
              {article.author} · {article.date}{article.readTime ? ` (${article.readTime})` : ""}
            </p>
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#111111", lineHeight: 1.3, margin: "0 0 28px", fontFamily: "Georgia, serif" }}>
            {article.title}
          </h1>

          {/* Body paragraphs */}
          {[...Array(4)].map((_, i) => (
            <p key={i} style={{ fontSize: 16, color: "#111111", lineHeight: 1.85, marginBottom: 20, textAlign: "justify", fontFamily: "Georgia, serif" }}>
              {body}
            </p>
          ))}

          {/* Action bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, paddingTop: 24, marginTop: 8, borderTop: "1px solid #F3F4F6" }}>
            <button onClick={toggleLike} aria-pressed={liked} aria-label={liked ? "Unlike" : "Like"}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: liked ? "#E4572E" : "#9CA3AF", fontSize: 14, fontFamily: "inherit" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill={liked ? "#E4572E" : "none"} stroke={liked ? "#E4572E" : "#9CA3AF"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {likeCount}
            </button>

            <button aria-label="Comment"
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 14, fontFamily: "inherit" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              12
            </button>

            <button aria-label="Share"
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontFamily: "inherit" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>

            <button onClick={() => setBookmarked(v => !v)} aria-pressed={bookmarked} aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
              style={{ marginLeft: "auto", display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", color: bookmarked ? "#4FC3D5" : "#9CA3AF" }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill={bookmarked ? "#4FC3D5" : "none"} stroke={bookmarked ? "#4FC3D5" : "#9CA3AF"} strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
