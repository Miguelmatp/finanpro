import type { Goal, Transaction } from "../types/finance";
import { keyOf, lastMonths } from "./stats";
import { todayISO } from "./format";

// Datos de ejemplo para que el dashboard no arranque vacío.
// Se generan relativos a la fecha actual. Se borran desde "Restablecer datos".
export function seedTransactions(): Transaction[] {
  const today = todayISO();
  const months = lastMonths(6);
  const items: Transaction[] = [];
  let n = 0;

  const add = (
    key: string,
    day: number,
    type: Transaction["type"],
    category: Transaction["category"],
    description: string,
    amount: number,
  ) => {
    let date = `${key}-${String(day).padStart(2, "0")}`;
    if (date > today) date = today;
    items.push({ id: `seed-${n++}`, type, category, description, amount, date });
  };

  months.forEach((key, i) => {
    const f = 0.9 + ((i * 7) % 5) / 20;
    add(key, 25, "ingreso", "Ingresos", "Sueldo", 3500);
    if (i % 2 === 1 || i === months.length - 1)
      add(key, 12, "ingreso", "Ingresos", "Proyecto freelance", Math.round(1200 * f + i * 150));
    add(key, 22, "gasto", "Vivienda", "Alquiler", 850);
    add(key, 5, "gasto", "Alimentación", "Supermercado", Math.round(420 * f));
    add(key, 15, "gasto", "Alimentación", "Restaurante", Math.round(180 * f));
    add(key, 8, "gasto", "Transporte", "Uber", Math.round(90 * f));
    add(key, 18, "gasto", "Transporte", "Gasolina", Math.round(120 * f));
    add(key, 10, "gasto", "Entretenimiento", "Cine y streaming", Math.round(110 * f));
    add(key, 3, "gasto", "Servicios", "Luz y agua", Math.round(150 * f));
    add(key, 4, "gasto", "Servicios", "Internet", 110);
    add(key, 14, "gasto", "Salud", "Farmacia", Math.round(95 * f));
    add(key, 20, "gasto", "Otros", "Compras varias", Math.round(160 * f));
  });

  return items.filter((t) => keyOf(t.date) <= keyOf(today));
}

export function seedGoals(): Goal[] {
  return [
    { id: "g1", name: "Laptop nueva", saved: 2800, target: 4000, icon: "home" },
    { id: "g2", name: "Auto propio", saved: 8500, target: 25000, icon: "car" },
    { id: "g3", name: "Viaje", saved: 1200, target: 10000, icon: "plane" },
  ];
}
