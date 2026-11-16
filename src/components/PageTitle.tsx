import React from "react";

export function PageTitle({
  eyebrow = "",
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        {eyebrow && (
          <p className="text-sm font-extrabold uppercase tracking-[.12em] text-emerald-600">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2>
        )}
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
