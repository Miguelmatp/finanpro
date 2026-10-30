import { Car, Gamepad2, Heart, Home, MoreHorizontal, UtensilsCrossed, Wallet, Zap } from "lucide-react";
import { CATEGORY_COLORS } from "../lib/categories";
import type { Category } from "../types/finance";

const ICONS: Record<Category, typeof Car> = {
  Alimentación: UtensilsCrossed,
  Vivienda: Home,
  Transporte: Car,
  Entretenimiento: Gamepad2,
  Servicios: Zap,
  Salud: Heart,
  Otros: MoreHorizontal,
  Ingresos: Wallet,
};

export function CategoryIcon({ category, size = 18 }: { category: Category; size?: number }) {
  const Icon = ICONS[category];
  const color = CATEGORY_COLORS[category];
  return (
    <span
      className="grid place-items-center size-10 shrink-0 rounded-xl"
      style={{ background: `${color}1a`, color }}
    >
      <Icon size={size} />
    </span>
  );
}
