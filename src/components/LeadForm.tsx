"use client";

import { useState } from "react";

type Props = {
  origem: "contato" | "financie" | "anuncie" | "visita";
  title: string;
  description: string;
  fields?: "basic" | "financie" | "anuncie";
};

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

async function postLead(payload: any) {
  if (!STRAPI) return { ok: true }; // demo mode
  const res = await fetch(`${STRAPI}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
  });
  return { ok: res.ok };
}

export default function LeadForm({ origem, title, description, fields = "basic" }: Props) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [form, setForm] = useState<any>({
    nome: "",
    whatsapp: "",
    email: "",
    mensagem: "",
    renda: "",
    valor_imovel: "",
    entrada: "",
    fgts: "Não",
    tipo: "",
    bairro: "",
    valor_desejado: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    const payload: any = {
      nome: form.nome,
      whatsapp: form.whatsapp,
      email: form.email || null,
      origem,
      mensagem: form.mensagem || null,
      page_url: typeof window !== "undefined" ? window.location.href : null,
    };

    if (fields === "financie") {
      payload.mensagem = `Renda: ${form.renda} | Valor imóvel: ${form.valor_imovel} | Entrada: ${form.entrada} | FGTS: ${form.fgts}\n` + (form.mensagem || "");
    }
    if (fields === "anuncie") {
      payload.mensagem = `Tipo: ${form.tipo} | Bairro/Cidade: ${form.bairro} | Valor desejado: ${form.valor_desejado}\n` + (form.mensagem || "");
    }

    const r = await postLead(payload);
    setOk(r.ok);
    setLoading(false);
  }

  return (
    <div className="card" style={{ padding: 18 }}>
      <h1 className="h1" style={{ fontSize: 28 }}>{title}</h1>
      <p className="p">{description}</p>
      <div className="hr" />

      <form onSubmit={submit} className="grid" style={{ gap: 12, maxWidth: 720 }}>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <label className="label">Nome</label>
            <input className="input" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
          </div>
          <div>
            <label className="label">WhatsApp</label>
            <input className="input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} required placeholder="(15) 99728-4640" />
          </div>
          <div>
            <label className="label">E-mail (opcional)</label>
            <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="voce@email.com" />
          </div>
        </div>

        {fields === "financie" ? (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div>
              <label className="label">Renda aproximada</label>
              <input className="input" value={form.renda} onChange={(e) => setForm({ ...form, renda: e.target.value })} placeholder="Ex: 6.500" />
            </div>
            <div>
              <label className="label">Valor do imóvel</label>
              <input className="input" value={form.valor_imovel} onChange={(e) => setForm({ ...form, valor_imovel: e.target.value })} placeholder="Ex: 480.000" />
            </div>
            <div>
              <label className="label">Entrada</label>
              <input className="input" value={form.entrada} onChange={(e) => setForm({ ...form, entrada: e.target.value })} placeholder="Ex: 80.000" />
            </div>
            <div>
              <label className="label">FGTS</label>
              <select className="input" value={form.fgts} onChange={(e) => setForm({ ...form, fgts: e.target.value })}>
                <option>Não</option>
                <option>Sim</option>
              </select>
            </div>
          </div>
        ) : null}

        {fields === "anuncie" ? (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div>
              <label className="label">Tipo de imóvel</label>
              <input className="input" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} placeholder="Casa, Apto, Terreno..." />
            </div>
            <div>
              <label className="label">Bairro/Cidade</label>
              <input className="input" value={form.bairro} onChange={(e) => setForm({ ...form, bairro: e.target.value })} placeholder="Ex: Campolim — Sorocaba" />
            </div>
            <div>
              <label className="label">Valor desejado</label>
              <input className="input" value={form.valor_desejado} onChange={(e) => setForm({ ...form, valor_desejado: e.target.value })} placeholder="Ex: 520.000" />
            </div>
          </div>
        ) : null}

        <div>
          <label className="label">Mensagem</label>
          <textarea className="input" rows={6} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} placeholder="Conte o que você precisa..." />
        </div>

        <button className="btn btnGold" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {ok === true ? <div className="badge" style={{ borderColor: "rgba(201,162,74,.5)" }}>Recebido! Vamos te chamar no WhatsApp.</div> : null}
        {ok === false ? <div className="badge">Não foi possível enviar agora. Tente novamente.</div> : null}
      </form>
    </div>
  );
}
