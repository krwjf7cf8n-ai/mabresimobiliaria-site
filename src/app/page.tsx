import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";
import { fetchImoveis } from "@/lib/strapi";

export default async function Home() {
  const { data } = await fetchImoveis({ page: 1, pageSize: 6, cidade: "Sorocaba", sort: "createdAt:desc" });

  return (
    <div className="grid" style={{ gap: 18 }}>
      <section className="card" style={{ padding: 18, borderColor: "rgba(201,162,74,.35)", background: "linear-gradient(135deg, rgba(201,162,74,.08), rgba(21,25,34,.6))" }}>
        <div style={{ display: "grid", gap: 10 }}>
          <h1 className="h1">Encontre o imóvel ideal em Sorocaba</h1>
          <p className="p" style={{ margin: 0 }}>
            Casas, apartamentos, terrenos e imóveis comerciais para venda ou locação. Atendimento rápido pelo WhatsApp.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link className="btn btnGold" href="/imoveis?cidade=Sorocaba&negocio=venda">Ver imóveis</Link>
            <Link className="btn" href="/financie">Financie</Link>
            <Link className="btn" href="/anuncie">Anuncie seu imóvel</Link>
          </div>
        </div>
      </section>

      <SearchForm />

      <section>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h2 className="h2">Destaques</h2>
            <p className="p" style={{ marginTop: 6 }}>Seleção de oportunidades em Sorocaba.</p>
          </div>
          <Link className="badge" href="/imoveis?cidade=Sorocaba&negocio=venda">Ver todos</Link>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 12 }}>
          {data.map((imovel) => <PropertyCard key={imovel.id} imovel={imovel} />)}
        </div>
      </section>
    </div>
  );
}
