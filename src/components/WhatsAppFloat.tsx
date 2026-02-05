"use client";

import { waLink } from "@/lib/format";

export default function WhatsAppFloat() {
  const phone = process.env.NEXT_PUBLIC_WA_PRIMARY || "5515997284640";
  const msg = "Olá! Vim pelo site da Mabres Imobiliária e quero ajuda para encontrar um imóvel em Sorocaba.";
  const href = waLink(phone, msg);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed",
        right: 18,
        bottom: 18,
        zIndex: 50,
        padding: "12px 14px",
        borderRadius: 999,
        border: "1px solid rgba(201,162,74,.5)",
        background: "rgba(15,17,21,.9)",
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10
      }}
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--gold)", display: "inline-block" }} />
      <span style={{ fontWeight: 700 }}>WhatsApp</span>
    </a>
  );
}
