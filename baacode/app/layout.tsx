import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B@aCode",
  description: "A community for tech writers and readers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
