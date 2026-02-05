export type Negocio = "venda" | "locacao" | "temporada";
export type Status = "disponivel" | "reservado" | "vendido" | "alugado";

export type TipoImovel =
  | "Casa de Bairro"
  | "Casa em Condomínio"
  | "Apartamento"
  | "Terreno"
  | "Comercial";

export type Imovel = {
  id: number;
  titulo: string;
  slug: string;
  ref: string;
  status: Status;
  negocio: Negocio;
  tipo: TipoImovel;
  preco?: number | null;
  preco_locacao?: number | null;
  condominio?: number | null;
  iptu?: number | null;
  area_util?: number | null;
  area_total?: number | null;
  quartos?: number | null;
  suites?: number | null;
  banheiros?: number | null;
  vagas?: number | null;
  descricao?: string | null;
  caracteristicas_imovel?: string[] | null;
  caracteristicas_condominio?: string[] | null;
  proximidades?: string[] | null;
  cidade: string;
  bairro: string;
  lat?: number | null;
  lng?: number | null;
  fotos?: { url: string; alternativeText?: string | null }[] | null;
  destaque?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
};
