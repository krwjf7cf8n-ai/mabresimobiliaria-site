import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "26px 0", color: "var(--muted)" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
        <div>© {new Date().getFullYear()} Mabres Imobiliária — Sorocaba/SP</div>
        <div style={{ display: "flex", gap: 14 }}>
          <Link href="/politica-de-privacidade">Privacidade</Link>
          <Link href="/termos">Termos</Link>
        </div>
      </div>
    </footer>
  );
}
