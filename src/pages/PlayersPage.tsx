import { useState } from "react";
import { Icon } from "../components/Icon";
import { TeamDrawer } from "../components/TeamDrawer";
import { formatINR, useAuction } from "../context/AuctionContext";
import { playerImages } from "../data/mockData";
import { Screen, Team } from "../types/auction";

export function PlayersPage({ navigate }: { navigate: (screen: Screen) => void }) {
  const { activeTournament, players, teams, createPlayer, createTeam } = useAuction();
  const [query, setQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addTeamOpen, setAddTeamOpen] = useState(false);

  const [playerName, setPlayerName] = useState("");
  const [playerRole, setPlayerRole] = useState("Batsman");
  const [basePrice, setBasePrice] = useState("3000");

  const [teamName, setTeamName] = useState("");
  const [teamShort, setTeamShort] = useState("");
  const [captainName, setCaptainName] = useState("");

  const filtered = players.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.role.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSavePlayer = async () => {
    if (!playerName.trim()) return;
    await createPlayer({
      name: playerName.trim(),
      role: playerRole,
      base_price: Number(basePrice) || 3000,
    });
    setPlayerName("");
    setAddOpen(false);
  };

  const handleSaveTeam = async () => {
    if (!teamName.trim()) return;
    await createTeam({
      name: teamName.trim(),
      short_name:
        teamShort.trim() ||
        teamName
          .trim()
          .split(" ")
          .map((w) => w[0])
          .join(""),
      captain_name: captainName.trim() || "TBD",
      total_purse: Number(activeTournament?.total_purse ?? 100000),
      color: "#10b981",
    });
    setTeamName("");
    setTeamShort("");
    setCaptainName("");
    setAddTeamOpen(false);
  };

  return (
    <main className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Players & Teams</h2>
        <p className="mt-1 text-sm text-slate-500">
          {activeTournament
            ? `Managing ${activeTournament.name}`
            : "Create or select a tournament first."}
        </p>
      </div>

      <div className="grid grid-cols-[1.25fr_.75fr] gap-5">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Players</h3>
                <p className="mt-1 text-[11px] text-slate-400">
                  {players.length} players registered
                </p>
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
              <div className="mt-4 flex flex-wrap gap-2 rounded-lg bg-emerald-50 p-3">
                <input
                  autoFocus
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="min-w-[160px] flex-1 rounded-md border border-emerald-200 bg-white px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="Player name"
                />
                <select
                  value={playerRole}
                  onChange={(e) => setPlayerRole(e.target.value)}
                  className="rounded-md border border-emerald-200 bg-white px-3 py-2 text-xs"
                >
                  <option>Batsman</option>
                  <option>Fast Bowler</option>
                  <option>Spin Bowler</option>
                  <option>All-rounder</option>
                  <option>Wicket-keeper</option>
                </select>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-24 rounded-md border border-emerald-200 bg-white px-3 py-2 text-xs"
                  placeholder="Base ₹"
                />
                <button
                  onClick={handleSavePlayer}
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
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Player</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Base Price</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-xs text-slate-400">
                    No players yet. Click "Add Player" or "Import Excel" above.
                  </td>
                </tr>
              ) : (
                filtered.map((p, idx) => (
                  <tr key={p.id} className="border-t border-slate-100 text-xs hover:bg-slate-50/60">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={playerImages[idx % playerImages.length]}
                          alt=""
                          className="h-9 w-9 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-800">{p.name}</p>
                          <p className="text-[9px] text-slate-400">Lot #{p.queue_order || idx + 1}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-500">{p.role}</td>
                    <td className="px-3 py-3 font-bold text-slate-700">
                      {formatINR(p.base_price)}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase ${
                          p.status === "sold"
                            ? "bg-blue-50 text-blue-600"
                            : p.status === "unsold"
                              ? "bg-red-50 text-red-600"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Teams</h3>
              <p className="mt-1 text-[11px] text-slate-400">{teams.length} teams competing</p>
            </div>
            <button
              onClick={() => setAddTeamOpen(!addTeamOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              <Icon name="plus" size={15} />
            </button>
          </div>

          {addTeamOpen && (
            <div className="mt-4 space-y-2 rounded-lg bg-slate-50 p-3">
              <input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs"
                placeholder="Team name (e.g. Thunder Kings)"
              />
              <div className="flex gap-2">
                <input
                  value={teamShort}
                  onChange={(e) => setTeamShort(e.target.value)}
                  className="w-20 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs uppercase"
                  placeholder="TK"
                />
                <input
                  value={captainName}
                  onChange={(e) => setCaptainName(e.target.value)}
                  className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs"
                  placeholder="Captain / Owner"
                />
              </div>
              <button
                onClick={handleSaveTeam}
                className="w-full rounded-md bg-emerald-600 py-2 text-xs font-bold text-white"
              >
                Save Team
              </button>
            </div>
          )}

          <div className="mt-4 space-y-3">
            {teams.map((team) => {
              const boughtCount = players.filter((p) => p.team_id === team.id).length;
              const spent = Number(team.total_purse) - Number(team.remaining_purse);
              const drawerTeam: Team = {
                name: team.name,
                short: team.short_name || team.name.slice(0, 2).toUpperCase(),
                owner: team.captain_name || "TBD",
                purse: formatINR(team.remaining_purse),
                players: boughtCount,
                color: team.color || "#10b981",
                spend: formatINR(spent),
                accent: "from-emerald-600 to-teal-500",
              };
              return (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(drawerTeam)}
                  className="group w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-xs font-black text-white shadow-sm"
                      style={{ backgroundColor: team.color || "#10b981" }}
                    >
                      {drawerTeam.short}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-800">{team.name}</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Owner: {drawerTeam.owner}
                      </p>
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
                      <p
                        className="mt-1 text-sm font-extrabold"
                        style={{ color: drawerTeam.color }}
                      >
                        {drawerTeam.purse}
                      </p>
                    </div>
                    <div className="px-3">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        Players
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-slate-800">
                        {boughtCount}{" "}
                        <span className="text-[9px] font-medium text-slate-400">
                          / {activeTournament?.max_squad_size ?? 11}
                        </span>
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
      {selectedTeam && <TeamDrawer team={selectedTeam} onClose={() => setSelectedTeam(null)} />}
    </main>
  );
}
