import React from "react";

export function SettingsSection({
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
      <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
      <p className="mt-1 text-[10px] text-slate-400">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}
