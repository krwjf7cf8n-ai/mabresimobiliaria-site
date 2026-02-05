import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";
import { fetchImoveis } from "@/lib/strapi";

export default async function ImoveisPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const page = Number(searchParams.page ?? "1");
  const pageSize = 12;

  const { data, meta } = await fetchImoveis({
    page,
    pageSize,
    cidade: searchParams.cidade ?? "Sorocaba",
    negocio: searchParams.negocio,
    tipo: searchParams.tipo,
    bairro: searchParams.bairro,
    minPreco: searchParams.min,
    maxPreco: searchParams.max,
    minQuartos: searchParams.quartos,
    minVagas: searchParams.vagas,
    sort: searchParams.sort ?? "createdAt:desc",
  } as any);

  const totalPages = meta?.pagination?.pageCount ?? 1;

  const mk = (p: number) => {
    const qs = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => { if (v) qs.set(k, v); });
    qs.set("page", String(p));
    return `/imoveis?${qs.toString()}`;
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1 className="h1" style={{ fontSize: 28 }}>Imóveis em Sorocaba</h1>
      <SearchForm compact />

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {data.length ? data.map((imovel) => <PropertyCard key={imovel.id} imovel={imovel} />) : (
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 800 }}>Nenhum imóvel encontrado</div>
            <p className="p">Tente ajustar os filtros (tipo, bairro ou preço).</p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
        <a className="btn" aria-disabled={page <= 1} href={mk(Math.max(1, page - 1))} style={{ opacity: page <= 1 ? 0.5 : 1, pointerEvents: page <= 1 ? "none" : "auto" }}>Anterior</a>
        <span className="badge">Página {page} de {totalPages}</span>
        <a className="btn" aria-disabled={page >= totalPages} href={mk(Math.min(totalPages, page + 1))} style={{ opacity: page >= totalPages ? 0.5 : 1, pointerEvents: page >= totalPages ? "none" : "auto" }}>Próxima</a>
      </div>
    </div>
  );
}
