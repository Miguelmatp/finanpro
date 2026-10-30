export const money = (n: number) =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayISO = () => toISO(new Date());

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function monthLabel(key: string, short = false) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  if (short) return cap(d.toLocaleDateString("es-PE", { month: "short" }).replace(".", ""));
  return cap(d.toLocaleDateString("es-PE", { month: "long", year: "numeric" }));
}

export function relativeDate(iso: string) {
  if (iso === todayISO()) return "Hoy";
  const y = new Date();
  y.setDate(y.getDate() - 1);
  if (iso === toISO(y)) return "Ayer";
  const [yy, mm, dd] = iso.split("-").map(Number);
  const d = new Date(yy, mm - 1, dd);
  return `${dd} ${d.toLocaleDateString("es-PE", { month: "short" }).replace(".", "")}.`;
}
