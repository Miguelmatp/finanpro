export const EXPENSE_CATEGORIES = [
  "Alimentación",
  "Vivienda",
  "Transporte",
  "Entretenimiento",
  "Servicios",
  "Salud",
  "Otros",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type Category = ExpenseCategory | "Ingresos";

export interface Transaction {
  id: string;
  type: "ingreso" | "gasto";
  amount: number;
  category: Category;
  description: string;
  date: string; // YYYY-MM-DD
}

export type GoalIcon = "home" | "car" | "plane" | "piggy";

export interface Goal {
  id: string;
  name: string;
  saved: number;
  target: number;
  icon: GoalIcon;
}

export type View =
  | "inicio"
  | "transacciones"
  | "presupuesto"
  | "reportes"
  | "metas"
  | "categorias"
  | "cuentas"
  | "calendario";
