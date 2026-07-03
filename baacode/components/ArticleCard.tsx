"use client";
import Link from "next/link";
import { Article } from "@/lib/mockData";

interface ArticleCardProps {
  article: Article;
  layout?: "horizontal" | "featured-hero" | "featured-overlay";
}

export default function ArticleCard({ article, layout = "horizontal" }: ArticleCardProps) {
  // Big featured card with image bg + white overlay card bottom-right (Editor's Picks large card)
  if (layout === "featured-overlay") {
    return (
      <Link href={`/article/${article.id}`} style={{ display: "block", textDecoration: "none", borderRadius: 12, overflow: "hidden", position: "relative", background: "#E5E7EB", aspectRatio: "4/3" }}>
        {article.image && (
          <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        )}
        <div style={{
          position: "absolute", bottom: 12, right: 12,
          background: "rgba(255,255,255,0.93)", borderRadius: 10,
          padding: "12px 14px", maxWidth: "68%",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{article.category}</p>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: "#111111", lineHeight: 1.35, margin: "0 0 4px" }}>{article.title}</h3>
          <p style={{ fontSize: 11, color: "#9CA3AF", margin: "0 0 6px" }}>{article.author} · {article.date}{article.readTime ? ` · ${article.readTime}` : ""}</p>
          <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  // Horizontal list item (category + title + author/date + excerpt + thumbnail left)
  return (
    <Link href={`/article/${article.id}`} style={{ display: "flex", gap: 16, textDecoration: "none", padding: "16px 0", borderBottom: "1px solid #F3F4F6" }}>
      <div style={{ width: 100, height: 80, flexShrink: 0, background: "#E5E7EB", borderRadius: 8, overflow: "hidden" }}>
        {article.image && <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{article.category}</p>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#111111", lineHeight: 1.3, margin: "0 0 3px" }}>{article.title}</h3>
        <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 4px" }}>{article.author} · {article.date}{article.readTime ? ` · ${article.readTime}` : ""}</p>
        <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{article.excerpt}</p>
      </div>
    </Link>
  );
}
