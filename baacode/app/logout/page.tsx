"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import ConfirmModal from "@/components/ConfirmModal";

export default function LogoutPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <SiteHeader auth="authenticated" />
      <ConfirmModal
        open={open}
        title="Log out?"
        body="Do you really want to leave B@acode? We'll miss you and so will you go."
        confirmLabel="Yes, Log Out"
        onConfirm={() => { setOpen(false); router.push("/login"); }}
        onCancel={() => { setOpen(false); router.back(); }}
      />
    </div>
  );
}
