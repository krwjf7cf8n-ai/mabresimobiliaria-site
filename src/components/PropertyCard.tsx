import Link from "next/link";
import Image from "next/image";
import { Imovel } from "@/lib/types";
import { brl } from "@/lib/format";
import FavButton from "./FavButton";

export default function PropertyCard({ imovel }: { imovel: Imovel }) {
  const price = imovel.negocio === "locacao" ? imovel.preco_locacao : imovel.preco;

  return (
    <div className="card">
      <div style={{ position: "relative" }}>
        <Link href={`/imovel/${imovel.slug}`} aria-label={imovel.titulo}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", background: "#0F131B" }}>
            <Image
              src={imovel.fotos?.[0]?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"}
              alt={imovel.fotos?.[0]?.alternativeText || imovel.titulo}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </Link>

        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="badge">{imovel.tipo}</span>
          <span className="badge">{imovel.negocio === "locacao" ? "Locação" : "Venda"}</span>
        </div>

        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <FavButton imovelId={imovel.id} />
        </div>
      </div>

      <div style={{ padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
          <div>
            <div style={{ fontWeight: 800 }}>{brl(price)}</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>{imovel.bairro} — {imovel.cidade}/SP</div>
          </div>
          <span className="badge">REF {imovel.ref}</span>
        </div>

        <div style={{ marginTop: 10, fontWeight: 700, lineHeight: 1.25 }}>
          <Link href={`/imovel/${imovel.slug}`}>{imovel.titulo}</Link>
        </div>

        <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 13, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {imovel.quartos ? <span>🛏 {imovel.quartos}</span> : null}
          {imovel.banheiros ? <span>🛁 {imovel.banheiros}</span> : null}
          {imovel.vagas ? <span>🚗 {imovel.vagas}</span> : null}
          {imovel.area_util ? <span>📐 {imovel.area_util}m²</span> : null}
        </div>
      </div>
    </div>
  );
}
