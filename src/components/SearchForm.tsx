"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const TIPOS = ["Casa de Bairro", "Casa em Condomínio", "Apartamento", "Terreno", "Comercial"];

export default function SearchForm({ compact }: { compact?: boolean }) {
  const router = useRouter();
  const sp = useSearchParams();

  const initial = useMemo(() => ({
    tipo: sp.get("tipo") ?? "",
    negocio: sp.get("negocio") ?? "venda",
    bairro: sp.get("bairro") ?? "",
    min: sp.get("min") ?? "",
    max: sp.get("max") ?? "",
    quartos: sp.get("quartos") ?? "",
    vagas: sp.get("vagas") ?? "",
  }), [sp]);

  const [form, setForm] = useState(initial);

  function go(e: React.FormEvent) {
    e.preventDefault();
    const qs = new URLSearchParams();
    qs.set("cidade", "Sorocaba");
    if (form.negocio) qs.set("negocio", form.negocio);
    if (form.tipo) qs.set("tipo", form.tipo);
    if (form.bairro) qs.set("bairro", form.bairro);
    if (form.min) qs.set("min", form.min);
    if (form.max) qs.set("max", form.max);
    if (form.quartos) qs.set("quartos", form.quartos);
    if (form.vagas) qs.set("vagas", form.vagas);
    router.push(`/imoveis?${qs.toString()}`);
  }

  return (
    <form onSubmit={go} className="card" style={{ padding: 16 }}>
      <div className="grid" style={{ gridTemplateColumns: compact ? "1fr" : "repeat(6, 1fr)" }}>
        <div style={{ gridColumn: compact ? "auto" : "span 1" }}>
          <label className="label">Negócio</label>
          <select className="input" value={form.negocio} onChange={(e) => setForm({ ...form, negocio: e.target.value })}>
            <option value="venda">Venda</option>
            <option value="locacao">Locação</option>
          </select>
        </div>
        <div style={{ gridColumn: compact ? "auto" : "span 2" }}>
          <label className="label">Tipo</label>
          <select className="input" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
            <option value="">Todos</option>
            {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: compact ? "auto" : "span 2" }}>
          <label className="label">Bairro (somente)</label>
          <input className="input" value={form.bairro} onChange={(e) => setForm({ ...form, bairro: e.target.value })} placeholder="Ex: Campolim" />
        </div>
        <div style={{ gridColumn: compact ? "auto" : "span 1" }}>
          <label className="label">Preço mín.</label>
          <input className="input" inputMode="numeric" value={form.min} onChange={(e) => setForm({ ...form, min: e.target.value })} placeholder="300000" />
        </div>
        <div style={{ gridColumn: compact ? "auto" : "span 1" }}>
          <label className="label">Preço máx.</label>
          <input className="input" inputMode="numeric" value={form.max} onChange={(e) => setForm({ ...form, max: e.target.value })} placeholder="600000" />
        </div>

        {!compact && (
          <>
            <div style={{ gridColumn: "span 1" }}>
              <label className="label">Dormitórios</label>
              <input className="input" inputMode="numeric" value={form.quartos} onChange={(e) => setForm({ ...form, quartos: e.target.value })} placeholder="2" />
            </div>
            <div style={{ gridColumn: "span 1" }}>
              <label className="label">Vagas</label>
              <input className="input" inputMode="numeric" value={form.vagas} onChange={(e) => setForm({ ...form, vagas: e.target.value })} placeholder="1" />
            </div>
            <div style={{ gridColumn: "span 2", display: "flex", alignItems: "end" }}>
              <button className="btn btnGold" style={{ width: "100%" }} type="submit">Buscar imóveis</button>
            </div>
          </>
        )}

        {compact && (
          <div style={{ display: "flex", alignItems: "end" }}>
            <button className="btn btnGold" style={{ width: "100%" }} type="submit">Buscar imóveis</button>
          </div>
        )}
      </div>
    </form>
  );
}
