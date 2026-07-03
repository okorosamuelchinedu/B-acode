"use client";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline flex-shrink-0">
      {/* Circle with Z */}
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        border: "2px solid #4FC3D5",
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "#fff"
      }}>
        <span style={{ fontSize: 14, fontWeight: 900, color: "#4FC3D5", lineHeight: 1 }}>Z</span>
      </div>
      {/* Wordmark: B@a in dark, C teal, o violet, d red, e dark */}
      <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1 }}>
        <span style={{ color: "#111111" }}>B@a</span>
        <span style={{ color: "#4FC3D5" }}>C</span>
        <span style={{ color: "#7C5CFC" }}>o</span>
        <span style={{ color: "#E4572E" }}>d</span>
        <span style={{ color: "#111111" }}>e</span>
      </span>
    </Link>
  );
}
