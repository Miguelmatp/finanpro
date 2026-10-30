import { Card } from "./Card";
import { CategoryIcon } from "./CategoryIcon";
import { CATEGORY_COLORS } from "../lib/categories";
import { money } from "../lib/format";
import { EXPENSE_CATEGORIES, type Category } from "../types/finance";

interface Props {
  data: { name: string; value: number }[];
}

export function CategoryBars({ data }: Props) {
  const map = new Map(data.map((d) => [d.name, d.value]));
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <Card title="Gastos por categoría">
      <ul className="space-y-3">
        {EXPENSE_CATEGORIES.map((c) => {
          const v = map.get(c) ?? 0;
          return (
            <li key={c} className="flex items-center gap-3 text-sm">
              <CategoryIcon category={c as Category} size={16} />
              <span className="w-28 shrink-0 text-slate-700">{c}</span>
              <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${(v / max) * 100}%`, background: CATEGORY_COLORS[c] }} />
              </div>
              <span className="w-20 text-right font-semibold">{money(v)}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
