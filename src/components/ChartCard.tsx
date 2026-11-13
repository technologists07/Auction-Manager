import React from "react";

export function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
        <p className="mt-1 text-[10px] text-slate-400">{subtitle}</p>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
