import { useState } from "react";
import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";
import { formatINR, useAuction } from "../context/AuctionContext";
import { playerImages } from "../data/mockData";

export function TeamDetailPage() {
  const { activeTournament, teams, players, createTeam } = useAuction();
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [teamShort, setTeamShort] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [teamColor, setTeamColor] = useState("#10b981");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const maxSquad = activeTournament?.max_squad_size ?? 11;
  const selectedTeam = selectedTeamId ? teams.find((t) => t.id === selectedTeamId) ?? null : null;

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    setSaving(true);
    setErr(null);
    try {
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
        color: teamColor,
      });
      setTeamName("");
      setTeamShort("");
      setCaptainName("");
      setTeamColor("#10b981");
      setAddOpen(false);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Failed to create team");
    } finally {
      setSaving(false);
    }
  };

  if (selectedTeam) {
    const bought = players.filter((p) => p.team_id === selectedTeam.id && p.status === "sold");
    const totalPurse = Number(selectedTeam.total_purse);
    const remainingPurse = Number(selectedTeam.remaining_purse);
    const totalSpend = Math.max(0, totalPurse - remainingPurse);

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
          title={selectedTeam.name}
          description={`Squad, spending and role composition for ${selectedTeam.name}.`}
          action={
            <button
              onClick={() => setSelectedTeamId(null)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              ← All Teams
            </button>
          }
        />

        <section
          className="rounded-xl p-6 text-white"
          style={{ backgroundColor: selectedTeam.color || "#0f172a" }}
        >
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black ring-1 ring-white/30">
              {selectedTeam.short_name || selectedTeam.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/75">
                Team Profile
              </p>
              <h2 className="mt-1 text-3xl font-black">{selectedTeam.name}</h2>
              <div className="mt-2 flex gap-5 text-xs text-white/85">
                <span>
                  Owner / Captain:{" "}
                  <b className="text-white">{selectedTeam.captain_name || "TBD"}</b>
                </span>
                <span>
                  Squad:{" "}
                  <b className="text-white">
                    {bought.length} / {maxSquad}
                  </b>
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
            <div key={l} className="rounded-xl border border-slate-200 bg-white p-5">
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
          <section className="rounded-xl border border-slate-200 bg-white p-5">
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

          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="p-5">
              <h3 className="text-sm font-extrabold text-slate-900">Purchased Players</h3>
              <p className="mt-1 text-[10px] text-slate-400">Players secured during the auction</p>
            </div>
            {bought.length === 0 ? (
              <div className="border-t border-slate-100 p-8 text-center text-xs text-slate-400">
                No players bought by {selectedTeam.name} yet.
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

  return (
    <main className="p-8">
      <PageTitle
        eyebrow={activeTournament?.name ?? "Team Management"}
        title="Teams"
        description="View all competing teams or click a team card to inspect its roster and spending."
        action={
          <button
            onClick={() => setAddOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white-200 hover:bg-emerald-700"
          >
            <Icon name="plus" size={16} /> Add Team
          </button>
        }
      />

      {addOpen && (
        <form
          onSubmit={handleSaveTeam}
          className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Add New Team</h3>
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>
          {err && (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
              {err}
            </div>
          )}
          <div className="grid grid-cols-[1.5fr_.6fr_1.2fr_.6fr_auto] items-end gap-3">
            <label className="field-label">
              Team Name
              <input
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="field-input bg-white"
                placeholder="e.g. Thunder Kings"
              />
            </label>
            <label className="field-label">
              Short Code
              <input
                value={teamShort}
                onChange={(e) => setTeamShort(e.target.value)}
                className="field-input bg-white uppercase"
                placeholder="TK"
                maxLength={4}
              />
            </label>
            <label className="field-label">
              Owner / Captain
              <input
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                className="field-input bg-white"
                placeholder="e.g. Arjun Mehta"
              />
            </label>
            <label className="field-label">
              Color
              <input
                type="color"
                value={teamColor}
                onChange={(e) => setTeamColor(e.target.value)}
                className="h-[38px] w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
              />
            </label>
            <button
              disabled={saving}
              className="h-[38px] rounded-lg bg-emerald-600 px-5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Team"}
            </button>
          </div>
        </form>
      )}

      {teams.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-base font-extrabold text-slate-800">No teams in this tournament yet</p>
          <p className="mt-1 text-xs text-slate-500">
            Click "+ Add Team" above to create your first competing team.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {teams.map((team) => {
            const boughtCount = players.filter(
              (p) => p.team_id === team.id && p.status === "sold",
            ).length;
            const totalPurse = Number(team.total_purse);
            const remainingPurse = Number(team.remaining_purse);
            const spent = Math.max(0, totalPurse - remainingPurse);

            return (
              <button
                key={team.id}
                onClick={() => setSelectedTeamId(team.id)}
                className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-emerald-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white"
                    style={{ backgroundColor: team.color || "#10b981" }}
                  >
                    {team.short_name || team.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-extrabold text-slate-900 group-hover:text-emerald-700">
                      {team.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Owner / Captain: {team.captain_name || "TBD"}
                    </p>
                  </div>
                  <Icon
                    name="chevron"
                    size={18}
                    className="text-slate-300 group-hover:text-emerald-600"
                  />
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-lg bg-slate-50 py-3">
                  <div className="px-4">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Remaining Purse
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-emerald-600">
                      {formatINR(remainingPurse)}
                    </p>
                  </div>
                  <div className="px-4">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Total Spend
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-slate-800">
                      {formatINR(spent)}
                    </p>
                  </div>
                  <div className="px-4">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Squad
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-slate-800">
                      {boughtCount}{" "}
                      <span className="text-[10px] font-medium text-slate-400">/ {maxSquad}</span>
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </main>
  );
}
