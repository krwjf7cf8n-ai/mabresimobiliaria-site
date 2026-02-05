"use client";

import { useEffect, useMemo, useState } from "react";

function readFav(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("mabres:favs");
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "number") : [];
  } catch {
    return [];
  }
}

function writeFav(ids: number[]) {
  localStorage.setItem("mabres:favs", JSON.stringify(ids));
}

export default function FavButton({ imovelId }: { imovelId: number }) {
  const [ids, setIds] = useState<number[]>([]);
  useEffect(() => setIds(readFav()), []);

  const active = useMemo(() => ids.includes(imovelId), [ids, imovelId]);

  function toggle() {
    const current = readFav();
    const next = current.includes(imovelId) ? current.filter((x) => x !== imovelId) : [...current, imovelId];
    writeFav(next);
    setIds(next);
  }

  return (
    <button onClick={toggle} className="btn" style={{ padding: "10px 12px", borderRadius: 999 }}>
      <span style={{ color: active ? "var(--gold)" : "var(--text)" }}>{active ? "❤" : "♡"}</span>
      <span style={{ fontSize: 13 }}>{active ? "Salvo" : "Salvar"}</span>
    </button>
  );
}
