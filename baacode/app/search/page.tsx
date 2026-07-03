"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import ArticleCard from "@/components/ArticleCard";
import { ARTICLES, TAGS } from "@/lib/mockData";

function SearchInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [activeTag, setActiveTag] = useState(params.get("q") || "");

  const hasSearch = query.trim().length > 0;
  const results = hasSearch
    ? ARTICLES.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : activeTag
    ? ARTICLES.filter(a => a.category.toLowerCase().includes(activeTag.toLowerCase()) || a.title.toLowerCase().includes(activeTag.toLowerCase()))
    : [];

  const showResults = hasSearch || (activeTag.length > 0);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <SiteHeader auth="authenticated" activePage="home" />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: 36 }}>
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveTag(""); }}
            placeholder="Find the topics you care about..."
            aria-label="Search articles"
            style={{
              width: "100%", boxSizing: "border-box",
              border: "1.5px solid #4FC3D5", borderRadius: 40,
              padding: "14px 48px 14px 20px",
              fontSize: 14, color: "#111111", outline: "none",
              fontFamily: "inherit", background: "#fff",
            }}
          />
          <button aria-label="Search"
            style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
        </div>

        {/* Topic chips — hide when typing */}
        {!hasSearch && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 40 }}>
            {TAGS.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag === activeTag ? "" : tag)}
                aria-pressed={activeTag === tag}
                style={{
                  padding: "8px 18px", borderRadius: 40, fontSize: 14,
                  border: activeTag === tag ? "1.5px solid #4FC3D5" : "1.5px solid #D1D5DB",
                  background: activeTag === tag ? "rgba(79,195,213,0.08)" : "#fff",
                  color: activeTag === tag ? "#4FC3D5" : "#374151",
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "all 0.15s",
                }}>
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div>
            <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 16 }} aria-live="polite">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query || activeTag}&rdquo;
            </p>
            {results.length === 0 ? (
              <p style={{ textAlign: "center", color: "#9CA3AF", padding: "40px 0", fontSize: 14 }}>
                No articles found. Try a different search.
              </p>
            ) : (
              results.map(a => <ArticleCard key={a.id} article={a} layout="horizontal" />)
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return <Suspense><SearchInner /></Suspense>;
}
