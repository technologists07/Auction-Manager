import { ChartCard } from "../components/ChartCard";
import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";
import { formatINR, useAuction } from "../context/AuctionContext";
import { IconName } from "../types/auction";

export function ReportsPage() {
  const { activeTournament, teams, players } = useAuction();

  const sold = players.filter((p) => p.status === "sold");
  const unsold = players.filter((p) => p.status === "unsold");
  const remaining = players.filter((p) => p.status === "queued" || p.status === "live");
  const totalCount = players.length || 1;
  const soldPct = Math.round((sold.length / totalCount) * 100);
  const unsoldPct = Math.round((unsold.length / totalCount) * 100);

  const highestSold = sold.reduce((max, p) => Math.max(max, Number(p.sold_price ?? 0)), 0);
  const totalSpent = sold.reduce((sum, p) => sum + Number(p.sold_price ?? 0), 0);
  const avgPrice = sold.length > 0 ? Math.round(totalSpent / sold.length) : 0;

  const exportCsv = () => {
    const header = "Player,Role,Status,Team,Sold Price\n";
    const body = players
      .map((p) => {
        const teamName = teams.find((t) => t.id === p.team_id)?.name ?? "";
        return `"${p.name}","${p.role}","${p.status}","${teamName}",${p.sold_price ?? ""}`;
      })
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(activeTournament?.name || "auction").replace(/\s+/g, "_")}_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-8">
      <PageTitle
        title="Auction Reports"
        description={`Live summary for ${activeTournament?.name ?? "Active Tournament"}`}
        action={
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            <Icon name="upload" size={14} className="rotate-180" />
            Export CSV
          </button>
        }
      />

      <div className="grid grid-cols-4 gap-4">
        {[
          ["Players Sold", String(sold.length), "check", "text-emerald-600"],
          ["Players Unsold", String(unsold.length), "users", "text-red-500"],
          ["Highest Sold", formatINR(highestSold), "trophy", "text-amber-500"],
          ["Average Price", formatINR(avgPrice), "trend", "text-blue-600"],
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
              style={{
                background: `conic-gradient(#10b981 0 ${soldPct}%, #f59e0b ${soldPct}% ${soldPct + unsoldPct}%, #e2e8f0 ${soldPct + unsoldPct}%)`,
              }}
            >
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                <b className="text-2xl text-slate-900">{soldPct}%</b>
                <span className="text-[8px] text-slate-400">SOLD</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["Sold", String(sold.length), "bg-emerald-500"],
                ["Unsold", String(unsold.length), "bg-amber-500"],
                ["Remaining", String(remaining.length), "bg-slate-300"],
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
            {teams.map((t) => {
              const spent = Number(t.total_purse) - Number(t.remaining_purse);
              const pct = Math.min(100, Math.round((spent / (Number(t.total_purse) || 1)) * 100));
              return (
                <div key={t.id}>
                  <div className="flex justify-between text-[10px]">
                    <b className="text-slate-600">{t.name}</b>
                    <span className="font-bold text-slate-800">{formatINR(spent)}</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: t.color || "#10b981" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>
    </main>
  );
}
