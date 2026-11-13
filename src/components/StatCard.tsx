import { Icon } from "./Icon";
import { IconName } from "../types/auction";

export function StatCard({
  title,
  value,
  change,
  icon,
  tone,
}: {
  title: string;
  value: string;
  change: string;
  icon: IconName;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}>
          <Icon name={icon} size={19} />
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
          <Icon name="trend" size={12} />
          {change}
        </span>
      </div>
      <p className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{title}</p>
    </div>
  );
}
