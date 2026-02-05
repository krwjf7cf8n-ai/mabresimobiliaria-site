"use client";

import { useEffect, useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Imovel } from "@/lib/types";

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

function readFav(): number[] {
  try {
    const raw = localStorage.getItem("mabres:favs");
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "number") : [];
  } catch {
    return [];
  }
}

async function fetchByIds(ids: number[]): Promise<Imovel[]> {
  if (!ids.length) return [];
  if (!STRAPI) {
    const demo: Imovel[] = (await import("@/data/demo.json")).default as any;
    return demo.filter((x) => ids.includes(x.id));
  }
  const qs = new URLSearchParams();
  qs.set("populate[fotos]", "*");
  // build OR filters
  ids.forEach((id, idx) => qs.set(`filters[$or][${idx}][id][$eq]`, String(id)));
  const res = await fetch(`${STRAPI}/api/imoveis?${qs.toString()}`);
  const json = await res.json();
  return (json.data || []).map((it: any) => ({
    id: it.id,
    ...it.attributes,
    fotos: it.attributes?.fotos?.data?.map((m: any) => ({
      url: m.attributes.url.startsWith("http") ? m.attributes.url : `${STRAPI}${m.attributes.url}`,
      alternativeText: m.attributes.alternativeText,
    })) ?? null
  })) as Imovel[];
}

export default function FavoritesClient() {
  const [ids, setIds] = useState<number[]>([]);
  const [items, setItems] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fav = readFav();
    setIds(fav);
    setLoading(true);
    fetchByIds(fav).then((x) => { setItems(x); setLoading(false); });
  }, []);

  const empty = useMemo(() => !loading && items.length === 0, [loading, items]);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <h1 className="h1" style={{ fontSize: 28 }}>Favoritos</h1>

      {loading ? <div className="card" style={{ padding: 18 }}>Carregando...</div> : null}
      {empty ? (
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 800 }}>Você ainda não salvou imóveis.</div>
          <p className="p">Abra um imóvel e clique em “Salvar”.</p>
        </div>
      ) : null}

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {items.map((imovel) => <PropertyCard key={imovel.id} imovel={imovel} />)}
      </div>
    </div>
  );
}
