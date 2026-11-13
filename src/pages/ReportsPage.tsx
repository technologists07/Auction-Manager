import { ChartCard } from "../components/ChartCard";
import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";
import { teams } from "../data/mockData";
import { IconName } from "../types/auction";

export function ReportsPage() {
  return (
    <main className="p-8">
      <PageTitle
        title="Auction Reports"
        description="Performance, spending and squad insights for the current tournament."
        action={
          <div className="flex gap-2">
            {["Excel", "CSV", "PDF"].map((x) => (
              <button
                key={x}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-600"
              >
                <Icon name="upload" size={13} className="rotate-180" />
                {x}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-5 gap-4">
        {[
          ["Players Sold", "42", "check", "text-emerald-600"],
          ["Players Unsold", "8", "users", "text-red-500"],
          ["Highest Sold", "₹18,500", "trophy", "text-amber-500"],
          ["Average Price", "₹7,240", "trend", "text-blue-600"],
          ["Most Expensive Team", "Sky Blazers", "shield", "text-violet-600"],
        ].map(([l, v, ic, c]) => (
          <div key={l} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <Icon name={ic as IconName} size={17} className={c} />
            <p className={`mt-4 text-lg font-extrabold ${c}`}>{v}</p>
            <p className="mt-1 text-[9px] font-semibold text-slate-400">{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <ChartCard title="Auction Progress" subtitle="Players by auction status">
          <div className="flex items-center justify-center gap-8 py-4">
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full"
              style={{ background: "conic-gradient(#10b981 0 68%, #f59e0b 68% 81%, #e2e8f0 81%)" }}
            >
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                <b className="text-2xl text-slate-900">68%</b>
                <span className="text-[8px] text-slate-400">SOLD</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["Sold", "42", "bg-emerald-500"],
                ["Unsold", "8", "bg-amber-500"],
                ["Remaining", "24", "bg-slate-300"],
              ].map((x) => (
                <div key={x[0]} className="flex items-center gap-3 text-[10px]">
                  <i className={`h-2.5 w-2.5 rounded-full ${x[2]}`} />
                  <span className="w-16 text-slate-500">{x[0]}</span>
                  <b className="text-slate-800">{x[1]}</b>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Team Spending" subtitle="Total spend against initial purse">
          <div className="space-y-4 py-3">
            {teams.map((t, i) => (
              <div key={t.name}>
                <div className="flex justify-between text-[10px]">
                  <b className="text-slate-600">{t.name}</b>
                  <span className="font-bold text-slate-800">{t.spend}</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${t.accent}`}
                    style={{ width: `${[29, 36, 18, 52][i]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Remaining Purse" subtitle="Available budget by team">
          <div className="flex h-48 items-end justify-around gap-5 px-5 pt-5">
            {teams.map((t, i) => (
              <div key={t.name} className="flex h-full flex-1 flex-col justify-end text-center">
                <b className="mb-2 text-[9px] text-slate-600">{t.purse}</b>
                <div
                  className={`mx-auto w-full max-w-12 rounded-t-lg bg-gradient-to-t ${t.accent}`}
                  style={{ height: `${[72, 64, 83, 48][i]}%` }}
                />
                <span className="mt-2 text-[8px] font-bold text-slate-400">{t.short}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Role Distribution" subtitle="Sold players by role">
          <div className="space-y-4 py-4">
            {[
              ["Batsmen", 16, 38, "bg-blue-500"],
              ["Bowlers", 13, 31, "bg-emerald-500"],
              ["All Rounders", 9, 21, "bg-violet-500"],
              ["Wicket Keepers", 4, 10, "bg-amber-500"],
            ].map((x) => (
              <div
                key={x[0] as string}
                className="grid grid-cols-[110px_1fr_30px] items-center gap-3"
              >
                <span className="text-[10px] font-semibold text-slate-600">{x[0]}</span>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${x[3]}`} style={{ width: `${x[2]}%` }} />
                </div>
                <b className="text-[10px] text-slate-800">{x[1]}</b>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </main>
  );
}
