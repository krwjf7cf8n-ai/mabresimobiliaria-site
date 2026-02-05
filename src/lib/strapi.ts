import { Imovel } from "./types";
import demo from "@/data/demo.json";

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

type StrapiMedia = { url: string; alternativeText?: string | null };

function normalizeMedia(base: string, media: any): StrapiMedia[] | null {
  if (!media?.data) return null;
  const items = Array.isArray(media.data) ? media.data : [media.data];
  return items.map((m: any) => ({
    url: m?.attributes?.url?.startsWith("http") ? m.attributes.url : `${base}${m.attributes.url}`,
    alternativeText: m?.attributes?.alternativeText ?? null,
  }));
}

function mapImovel(base: string, item: any): Imovel {
  const a = item.attributes;
  return {
    id: item.id,
    titulo: a.titulo,
    slug: a.slug,
    ref: a.ref,
    status: a.status,
    negocio: a.negocio,
    tipo: a.tipo,
    preco: a.preco,
    preco_locacao: a.preco_locacao,
    condominio: a.condominio,
    iptu: a.iptu,
    area_util: a.area_util,
    area_total: a.area_total,
    quartos: a.quartos,
    suites: a.suites,
    banheiros: a.banheiros,
    vagas: a.vagas,
    descricao: a.descricao,
    caracteristicas_imovel: a.caracteristicas_imovel ?? null,
    caracteristicas_condominio: a.caracteristicas_condominio ?? null,
    proximidades: a.proximidades ?? null,
    cidade: a.cidade,
    bairro: a.bairro,
    lat: a.lat,
    lng: a.lng,
    fotos: normalizeMedia(base, a.fotos),
    destaque: a.destaque ?? null,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  };
}

export async function fetchImoveis(params: Record<string, string | number | undefined>) {
  if (!STRAPI) {
    return { data: demo as Imovel[], meta: { pagination: { page: 1, pageSize: 12, pageCount: 1, total: (demo as any[]).length } } };
  }

  const qs = new URLSearchParams();
  qs.set("populate[fotos]", "*");
  qs.set("pagination[page]", String(params.page ?? 1));
  qs.set("pagination[pageSize]", String(params.pageSize ?? 12));
  qs.set("sort", String(params.sort ?? "createdAt:desc"));

  // filters
  const add = (k: string, v?: any) => { if (v !== undefined && v !== "" && v !== null) qs.set(k, String(v)); };

  add("filters[cidade][$eq]", params.cidade);
  add("filters[bairro][$containsi]", params.bairro);
  add("filters[tipo][$eq]", params.tipo);
  add("filters[negocio][$eq]", params.negocio);

  add("filters[quartos][$gte]", params.minQuartos);
  add("filters[vagas][$gte]", params.minVagas);

  // price: choose field depending on negocio
  if (params.minPreco) add("filters[preco][$gte]", params.minPreco);
  if (params.maxPreco) add("filters[preco][$lte]", params.maxPreco);

  const url = `${STRAPI}/api/imoveis?${qs.toString()}`;
  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Erro ao buscar imoveis: ${res.status}`);
  const json = await res.json();
  const data = json.data.map((it: any) => mapImovel(STRAPI, it));
  return { data, meta: json.meta };
}

export async function fetchImovelBySlug(slug: string) {
  if (!STRAPI) {
    const found = (demo as any[]).find((x) => x.slug === slug);
    return found ?? null;
  }
  const qs = new URLSearchParams();
  qs.set("populate[fotos]", "*");
  qs.set("filters[slug][$eq]", slug);

  const url = `${STRAPI}/api/imoveis?${qs.toString()}`;
  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Erro ao buscar imóvel: ${res.status}`);
  const json = await res.json();
  const item = json.data?.[0];
  if (!item) return null;
  return mapImovel(STRAPI, item);
}
