import type { ReactNode } from "react";

interface Props {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, action, children, className = "" }: Props) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
