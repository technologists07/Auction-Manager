import { useState } from "react";
import { Icon } from "../components/Icon";
import { TeamDrawer } from "../components/TeamDrawer";
import { players, teams } from "../data/mockData";
import { Screen, Team } from "../types/auction";

export function PlayersPage({ navigate }: { navigate: (screen: Screen) => void }) {
  const [query, setQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = players.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.role.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Players & Teams</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage registrations, rosters and team budgets for the live tournament.
        </p>
      </div>

      <div className="grid grid-cols-[1.25fr_.75fr] gap-5">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Players</h3>
                <p className="mt-1 text-[11px] text-slate-400">264 players registered</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("import")}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50"
                >
                  <Icon name="upload" size={15} />
                  Import Excel
                </button>
                <button
                  onClick={() => setAddOpen(!addOpen)}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-bold text-white hover:bg-emerald-700"
                >
                  <Icon name="plus" size={15} />
                  Add Player
                </button>
              </div>
            </div>

            {addOpen && (
              <div className="mt-4 flex gap-2 rounded-lg bg-emerald-50 p-3">
                <input
                  autoFocus
                  className="min-w-0 flex-1 rounded-md border border-emerald-200 bg-white px-3 text-xs outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="Player name"
                />
                <select className="rounded-md border border-emerald-200 bg-white px-3 text-xs">
                  <option>Batsman</option>
                  <option>Bowler</option>
                  <option>All-rounder</option>
                </select>
                <button
                  onClick={() => setAddOpen(false)}
                  className="rounded-md bg-emerald-600 px-4 py-2 text-[10px] font-bold text-white"
                >
                  Save
                </button>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Icon name="search" size={16} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Search players by name or role..."
                />
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 text-[11px] font-bold text-slate-500">
                <Icon name="filter" size={14} />
                Filter
              </button>
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Player</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Base Price</th>
                <th className="px-3 py-3">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.name} className="border-t border-slate-100 text-xs hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-slate-800">{p.name}</p>
                        <p className="text-[9px] text-slate-400">GM-{players.indexOf(p) + 101}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-500">{p.role}</td>
                  <td className="px-3 py-3 font-bold text-slate-700">{p.price}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                        p.status === "Available"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="pr-4 text-slate-400">
                    <Icon name="more" size={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-[10px] text-slate-400">
            <span>Showing 1–{filtered.length} of 264 players</span>
            <div className="flex gap-1">
              <button className="rounded border border-slate-200 px-2 py-1">‹</button>
              <button className="rounded bg-emerald-600 px-2.5 py-1 font-bold text-white">1</button>
              <button className="rounded border border-slate-200 px-2.5 py-1">2</button>
              <button className="rounded border border-slate-200 px-2 py-1">›</button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Teams</h3>
              <p className="mt-1 text-[11px] text-slate-400">4 teams competing</p>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
              <Icon name="plus" size={15} />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {teams.map((team) => (
              <button
                key={team.name}
                onClick={() => setSelectedTeam(team)}
                className="group w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${team.accent} text-xs font-black text-white shadow-sm`}
                  >
                    {team.short}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-800">{team.name}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Owner: {team.owner}</p>
                  </div>
                  <Icon
                    name="chevron"
                    size={16}
                    className="text-slate-300 group-hover:text-emerald-500"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 divide-x divide-slate-100 rounded-lg bg-slate-50 py-2.5">
                  <div className="px-3">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Remaining Purse
                    </p>
                    <p className="mt-1 text-sm font-extrabold" style={{ color: team.color }}>
                      {team.purse}
                    </p>
                  </div>
                  <div className="px-3">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Players
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-slate-800">
                      {team.players}{" "}
                      <span className="text-[9px] font-medium text-slate-400">/ 11</span>
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
      {selectedTeam && <TeamDrawer team={selectedTeam} onClose={() => setSelectedTeam(null)} />}
    </main>
  );
}
