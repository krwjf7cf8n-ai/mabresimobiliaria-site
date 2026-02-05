export function brl(value?: number | null) {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function onlyDigits(s: string) {
  return (s || "").replace(/\D+/g, "");
}

export function waLink(phoneDigits: string, message: string) {
  const phone = onlyDigits(phoneDigits);
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}
