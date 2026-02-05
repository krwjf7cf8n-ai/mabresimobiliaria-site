import Image from "next/image";
import { notFound } from "next/navigation";
import FavButton from "@/components/FavButton";
import { brl, waLink } from "@/lib/format";
import { fetchImovelBySlug } from "@/lib/strapi";

export default async function ImovelPage({ params }: { params: { slug: string } }) {
  const imovel = await fetchImovelBySlug(params.slug);
  if (!imovel) return notFound();

  const price = imovel.negocio === "locacao" ? imovel.preco_locacao : imovel.preco;
  const wa = process.env.NEXT_PUBLIC_WA_PRIMARY || "5515997284640";
  const msg = `Olá! Tenho interesse no imóvel REF ${imovel.ref} (${imovel.titulo}) no bairro ${imovel.bairro}, em Sorocaba. Pode me passar mais detalhes e agendar uma visita?`;
  const waHref = waLink(wa, msg);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#0F131B" }}>
          <Image
            src={imovel.fotos?.[0]?.url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"}
            alt={imovel.fotos?.[0]?.alternativeText || imovel.titulo}
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          <div style={{ position: "absolute", top: 12, right: 12 }}>
            <FavButton imovelId={imovel.id} />
          </div>
        </div>

        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span className="badge">{imovel.tipo}</span>
            <span className="badge">{imovel.negocio === "locacao" ? "Locação" : "Venda"}</span>
            <span className="badge">REF {imovel.ref}</span>
          </div>

          <h1 className="h1" style={{ marginTop: 10 }}>{imovel.titulo}</h1>
          <div style={{ marginTop: 8, color: "var(--muted)" }}>
            {imovel.bairro} — {imovel.cidade}/SP
          </div>

          <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 26, fontWeight: 900 }}>{brl(price)}</div>
            <a className="btn btnGold" href={waHref} target="_blank" rel="noreferrer">Agendar visita no WhatsApp</a>
          </div>

          <div className="hr" />

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))" }}>
            {imovel.quartos ? <div className="card" style={{ padding: 12 }}><div className="badge">Dormitórios</div><div style={{ fontWeight: 900, marginTop: 8 }}>{imovel.quartos}</div></div> : null}
            {imovel.suites ? <div className="card" style={{ padding: 12 }}><div className="badge">Suítes</div><div style={{ fontWeight: 900, marginTop: 8 }}>{imovel.suites}</div></div> : null}
            {imovel.banheiros ? <div className="card" style={{ padding: 12 }}><div className="badge">Banheiros</div><div style={{ fontWeight: 900, marginTop: 8 }}>{imovel.banheiros}</div></div> : null}
            {imovel.vagas ? <div className="card" style={{ padding: 12 }}><div className="badge">Vagas</div><div style={{ fontWeight: 900, marginTop: 8 }}>{imovel.vagas}</div></div> : null}
            {imovel.area_util ? <div className="card" style={{ padding: 12 }}><div className="badge">Área útil</div><div style={{ fontWeight: 900, marginTop: 8 }}>{imovel.area_util}m²</div></div> : null}
          </div>

          {imovel.condominio || imovel.iptu ? (
            <>
              <div className="hr" />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {imovel.condominio ? <span className="badge">Condomínio: {brl(imovel.condominio)}</span> : null}
                {imovel.iptu ? <span className="badge">IPTU: {brl(imovel.iptu)}</span> : null}
              </div>
            </>
          ) : null}

          {imovel.descricao ? (
            <>
              <div className="hr" />
              <h2 className="h2">Descrição</h2>
              <p className="p">{imovel.descricao}</p>
            </>
          ) : null}

          {imovel.caracteristicas_imovel?.length ? (
            <>
              <div className="hr" />
              <h2 className="h2">Características do imóvel</h2>
              <ul style={{ color: "var(--muted)", lineHeight: 1.8 }}>
                {imovel.caracteristicas_imovel.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </>
          ) : null}

          {imovel.proximidades?.length ? (
            <>
              <div className="hr" />
              <h2 className="h2">Proximidades</h2>
              <ul style={{ color: "var(--muted)", lineHeight: 1.8 }}>
                {imovel.proximidades.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </>
          ) : null}

          <div className="hr" />
          <div style={{ color: "var(--muted)" }}>
            Observação: por privacidade e segurança, exibimos apenas o bairro e a cidade.
          </div>
        </div>
      </div>
    </div>
  );
}
