import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "rgba(15,17,21,.85)", position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(10px)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/brand/logo.jpg" alt="Mabres Imobiliária" width={44} height={44} style={{ borderRadius: 12, border: "1px solid rgba(201,162,74,.35)" }} />
          <div>
            <div style={{ fontWeight: 700, letterSpacing: 0.2 }}>Mabres Imobiliária</div>
            <div style={{ color: "var(--muted)", fontSize: 12 }}>Sorocaba/SP</div>
          </div>
        </Link>

        <nav style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Link href="/imoveis" className="badge">Imóveis</Link>
          <Link href="/financie" className="badge">Financie</Link>
          <Link href="/anuncie" className="badge">Anuncie</Link>
          <Link href="/contato" className="badge">Contato</Link>
          <Link href="/favoritos" className="badge">Favoritos</Link>
        </nav>
      </div>
    </header>
  );
}
