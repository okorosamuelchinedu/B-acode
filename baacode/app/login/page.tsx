"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginCard from "@/components/LoginCard";

export default function LoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  async function handleSubmit(values: { email: string; password: string; remember: boolean }) {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    router.push("/");
  }

  return <LoginCard status={status} onSubmit={handleSubmit} />;
}
