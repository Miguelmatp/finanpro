import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { todayISO } from "../lib/format";
import { EXPENSE_CATEGORIES, type Transaction } from "../types/finance";

const schema = z.object({
  type: z.enum(["ingreso", "gasto"]),
  amount: z
    .number({ invalid_type_error: "Ingresa un monto" })
    .positive("El monto debe ser mayor a 0"),
  category: z.enum([...EXPENSE_CATEGORIES, "Ingresos"]),
  description: z.string().trim().min(1, "Escribe una descripción").max(60, "Máximo 60 caracteres"),
  date: z.string().min(1, "Elige una fecha"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (t: Omit<Transaction, "id">) => void;
}

const input =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export function TransactionForm({ open, onClose, onSubmit }: Props) {
  const {
    register, handleSubmit, watch, setValue, reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: "gasto", category: "Alimentación", date: todayISO(), description: "" },
  });

  const type = watch("type");

  useEffect(() => {
    setValue("category", type === "ingreso" ? "Ingresos" : "Alimentación");
  }, [type, setValue]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = handleSubmit((v) => {
    onSubmit(v);
    reset({ type: v.type, category: v.category, date: todayISO(), description: "" });
    onClose();
  });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Nueva transacción</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1 text-sm font-medium">
          {(["gasto", "ingreso"] as const).map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded-md py-2 text-center capitalize ${type === t ? "bg-white shadow-sm" : "text-slate-500"}`}
            >
              <input type="radio" value={t} {...register("type")} className="sr-only" />
              {t}
            </label>
          ))}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Monto (S/)</label>
          <input type="number" step="0.01" inputMode="decimal" className={input} {...register("amount", { valueAsNumber: true })} />
          {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Descripción</label>
          <input className={input} placeholder="Ej. Almuerzo, Sueldo, Alquiler" {...register("description")} />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Categoría</label>
            <select className={input} disabled={type === "ingreso"} {...register("category")}>
              {type === "ingreso" ? (
                <option value="Ingresos">Ingresos</option>
              ) : (
                EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)
              )}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Fecha</label>
            <input type="date" className={input} {...register("date")} />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
          </div>
        </div>

        <button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          Guardar transacción
        </button>
      </form>
    </div>
  );
}
