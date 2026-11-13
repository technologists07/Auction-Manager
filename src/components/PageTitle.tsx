import React from "react";

export function PageTitle({
  eyebrow = "Green Meadows Premier League 2027",
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-emerald-600">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}
