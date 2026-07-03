"use client";
import { useState } from "react";
import SignUpCard from "@/components/SignUpCard";

export default function SignUpPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  async function handleSubmit() {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  return <SignUpCard status={status} onSubmit={handleSubmit} />;
}
