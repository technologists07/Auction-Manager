import { useEffect, useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { formatINR, useAuction } from "../context/AuctionContext";
import { playerImages } from "../data/mockData";

export function TeamDetailPage() {
  const { activeTournament, teams, players } = useAuction();
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (teams.length > 0 && !teams.some((t) => t.id === selectedId)) {
      setSelectedId(teams[0].id);
    }
  }, [teams, selectedId]);

  const team = teams.find((t) => t.id === selectedId) ?? teams[0] ?? null;

  if (!team) {
    return (
      <main className="p-8">
        <PageTitle
          eyebrow={activeTournament?.name ?? "Teams"}
          title="Team Detail"
          description="No teams created in this tournament yet."
        />
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500">
          Add teams on the Players &amp; Teams page to view their squad and spending here.
        </div>
      </main>
    );
  }

  const bought = players.filter((p) => p.team_id === team.id && p.status === "sold");
  const totalPurse = Number(team.total_purse);
  const remainingPurse = Number(team.remaining_purse);
  const totalSpend = Math.max(0, totalPurse - remainingPurse);
  const maxSquad = activeTournament?.max_squad_size ?? 11;

  const roleCounts = [
    ["Batsmen", bought.filter((p) => p.role.toLowerCase().includes("bat")).length, "bg-blue-500"],
    ["Bowlers", bought.filter((p) => p.role.toLowerCase().includes("bowl")).length, "bg-emerald-500"],
    [
      "All Rounders",
      bought.filter((p) => p.role.toLowerCase().includes("all")).length,
      "bg-violet-500",
    ],
    [
      "Wicket Keepers",
      bought.filter((p) => p.role.toLowerCase().includes("keep")).length,
      "bg-amber-500",
    ],
  ] as const;

  return (
    <main className="p-8">
      <PageTitle
        eyebrow={activeTournament?.name ?? "Team Profile"}
        title="Team Detail"
        description={`Squad, spending and role composition for ${team.name}.`}
        action={
          <select
            value={team.id}
            onChange={(e) => setSelectedId(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        }
      />

      <section
        className="rounded-xl p-6 text-white shadow-lg"
        style={{ backgroundColor: team.color || "#0f172a" }}
      >
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black ring-1 ring-white/30">
            {team.short_name || team.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/75">
              Team Profile
            </p>
            <h2 className="mt-1 text-3xl font-black">{team.name}</h2>
            <div className="mt-2 flex gap-5 text-xs text-white/85">
              <span>
                Owner / Captain: <b className="text-white">{team.captain_name || "TBD"}</b>
              </span>
              <span>
                Squad: <b className="text-white">{bought.length} / {maxSquad}</b>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-4 gap-4">
        {[
          ["Initial Purse", formatINR(totalPurse)],
          ["Remaining Purse", formatINR(remainingPurse)],
          ["Total Spend", formatINR(totalSpend)],
          ["Players Purchased", `${bought.length} / ${maxSquad}`],
        ].map(([l, v], i) => (
          <div key={l} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{l}</p>
            <p
              className={`mt-2 text-2xl font-extrabold ${
                i === 1 ? "text-emerald-600" : "text-slate-900"
              }`}
            >
              {v}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-[.7fr_1.3fr] gap-5">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900">Role Distribution</h3>
          <p className="mt-1 text-[10px] text-slate-400">Current squad balance</p>
          <div className="mt-5 space-y-4">
            {roleCounts.map(([r, n, c]) => {
              const pct = bought.length > 0 ? Math.round((n / bought.length) * 100) : 0;
              return (
                <div key={r}>
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold text-slate-600">{r}</span>
                    <b className="text-slate-800">{n}</b>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${c}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="p-5">
            <h3 className="text-sm font-extrabold text-slate-900">Purchased Players</h3>
            <p className="mt-1 text-[10px] text-slate-400">Players secured during the auction</p>
          </div>
          {bought.length === 0 ? (
            <div className="border-t border-slate-100 p-8 text-center text-xs text-slate-400">
              No players bought by {team.name} yet.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3">Player</th>
                  <th>Role</th>
                  <th>Purchase Price</th>
                </tr>
              </thead>
              <tbody>
                {bought.map((p, idx) => (
                  <tr key={p.id} className="border-t border-slate-100 text-xs">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={playerImages[idx % playerImages.length]}
                          className="h-9 w-9 rounded-lg object-cover"
                          alt=""
                        />
                        <b className="text-slate-800">{p.name}</b>
                      </div>
                    </td>
                    <td className="text-slate-500">{p.role}</td>
                    <td className="font-extrabold text-slate-800">{formatINR(p.sold_price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}
