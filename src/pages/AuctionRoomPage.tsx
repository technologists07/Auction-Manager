import { useEffect, useState } from "react";
import { Icon } from "../components/Icon";
import { formatINR, useAuction } from "../context/AuctionContext";
import { playerImages } from "../data/mockData";

export function AuctionRoomPage({ projector }: { projector: () => void }) {
  const {
    activeTournament,
    teams,
    players,
    bids,
    openNextPlayer,
    placeTeamBid,
    markSold,
    markUnsold,
    undoLastBid,
    reopenLastPlayer,
  } = useAuction();

  const [increment, setIncrement] = useState(500);
  const [custom, setCustom] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [timer, setTimer] = useState(20);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (activeTournament?.min_bid_increment) {
      setIncrement(Number(activeTournament.min_bid_increment));
    }
  }, [activeTournament?.min_bid_increment]);

  const livePlayer =
    players.find((p) => p.id === activeTournament?.current_player_id) ??
    players.find((p) => p.status === "live") ??
    null;

  const currentBid = Number(activeTournament?.current_bid ?? 0);
  const leadingTeam = teams.find((t) => t.id === activeTournament?.highest_bidder_team_id) ?? null;
  const liveBids = livePlayer ? bids.filter((b) => b.player_id === livePlayer.id) : [];
  const upcomingPlayers = players.filter((p) => p.status === "queued").slice(0, 3);

  const nextBidForClick = livePlayer
    ? currentBid === 0
      ? Number(livePlayer.base_price)
      : currentBid + increment
    : 0;

  const runAction = async (fn: () => Promise<void>, successMsg?: string) => {
    setBusy(true);
    setFeedback(null);
    try {
      await fn();
      setTimer(20);
      if (successMsg) setFeedback(successMsg);
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Action failed");
    } finally {
      setBusy(false);
    }
  };

  const totalRemainingPurse = teams.reduce((sum, t) => sum + Number(t.remaining_purse), 0);
  const totalInitialPurse = teams.reduce((sum, t) => sum + Number(t.total_purse), 0) || 1;
  const pursePct = Math.round((totalRemainingPurse / totalInitialPurse) * 100);

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f3f6f8] p-5">
      <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black tracking-wider text-red-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            LIVE AUCTION
          </span>
          <div className="h-5 w-px bg-slate-200" />
          <div>
            <p className="text-xs font-extrabold text-slate-800">
              {activeTournament?.name ?? "No Tournament Selected"}
            </p>
            <p className="text-[9px] text-slate-400">
              {players.filter((p) => p.status === "sold").length} sold •{" "}
              {players.filter((p) => p.status === "queued").length} queued
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Timer
          </span>
          <div
            className={`flex h-10 min-w-16 items-center justify-center gap-1.5 rounded-lg font-mono text-lg font-black ${
              timer < 10 ? "bg-red-50 text-red-600" : "bg-slate-900 text-white"
            }`}
          >
            <Icon name="clock" size={15} />
            {timer}s
          </div>
          <button
            onClick={() => setTimer((t) => Math.max(0, t - 1))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-500"
          >
            Tick
          </button>
          <button
            onClick={projector}
            className="rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-bold text-white"
          >
            Projector Mode
          </button>
        </div>
      </div>

      {feedback && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-800">
          {feedback}
        </div>
      )}

      <div className="grid grid-cols-[.75fr_1.4fr_.85fr] gap-4">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Current Player
            </h3>
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-600">
              {livePlayer ? `Lot #${livePlayer.queue_order}` : "Waiting"}
            </span>
          </div>
          {livePlayer ? (
            <>
              <div className="relative h-[220px] overflow-hidden bg-slate-100">
                <img
                  src={playerImages[livePlayer.queue_order % playerImages.length]}
                  alt={livePlayer.name}
                  className="h-full w-full object-cover object-[center_25%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-md bg-white/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-700">
                  {livePlayer.role}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  {livePlayer.name}
                </h2>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                      Base Price
                    </p>
                    <p className="mt-1 text-xl font-black text-emerald-700">
                      {formatINR(livePlayer.base_price)}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                    <Icon name="wallet" size={18} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm font-bold text-slate-700">No player on the block</p>
              <p className="mt-1 text-xs text-slate-400">
                Click <b>NEXT</b> below to bring the next queued player live.
              </p>
            </div>
          )}

          <div className="border-t border-slate-100 p-5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Upcoming Players
            </p>
            <div className="mt-2 flex gap-2">
              {upcomingPlayers.length === 0 ? (
                <p className="text-[10px] text-slate-400">Queue empty</p>
              ) : (
                upcomingPlayers.map((p, i) => (
                  <div
                    key={p.id}
                    className="min-w-0 flex-1 rounded-lg border border-slate-100 p-2 text-center"
                  >
                    <p className="truncate text-[9px] font-bold text-slate-700">{p.name}</p>
                    <p className="text-[8px] text-slate-400">#{i + 1}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-900 px-6 py-5 text-center text-white">
              <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {livePlayer ? (currentBid > 0 ? "BIDDING OPEN" : "AWAITING OPENING BID") : "IDLE"}
              </div>
              <p className="mt-2 text-[42px] font-black tracking-tight">
                {formatINR(currentBid)}
              </p>
              <div className="mt-2 flex items-center justify-center gap-5 text-[10px] text-slate-400">
                <span>
                  Leading: <b className="text-white">{leadingTeam?.name ?? "None"}</b>
                </span>
                <span className="h-3 w-px bg-slate-700" />
                <span>
                  Bid count: <b className="text-white">{liveBids.length}</b>
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Click team to bid
                </p>
                <p className="text-[10px] text-slate-400">
                  Next: {formatINR(nextBidForClick)}
                </p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {teams.map((t) => {
                  const overPurse = nextBidForClick > Number(t.remaining_purse);
                  const isLeading = leadingTeam?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      disabled={busy || !livePlayer || overPurse}
                      onClick={() => {
                        setSelectedTeamId(t.id);
                        void runAction(() => placeTeamBid(t.id, nextBidForClick));
                      }}
                      className={`flex items-center gap-2.5 rounded-lg border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-45 ${
                        isLeading
                          ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-200"
                          : "border-slate-200 bg-slate-50 hover:border-emerald-300"
                      }`}
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[9px] font-black text-white"
                        style={{ backgroundColor: t.color || "#10b981" }}
                      >
                        {t.short_name || t.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span>
                        <b className="block text-[10px] text-slate-800">{t.name}</b>
                        <span className="text-[8px] text-slate-400">
                          {overPurse ? "Over purse" : `Bid ${formatINR(nextBidForClick)}`}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {[500, 1000, 2000].map((n) => (
                  <button
                    key={n}
                    onClick={() => setIncrement(n)}
                    className={`rounded-lg border py-2 text-xs font-extrabold transition ${
                      increment === n
                        ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    +₹{n.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  <option value="">Select team</option>
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <input
                  value={custom}
                  onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold outline-none focus:border-emerald-400"
                  placeholder="Custom ₹ amount"
                />
                <button
                  disabled={busy || !livePlayer || !selectedTeamId || !custom}
                  onClick={() =>
                    void runAction(async () => {
                      await placeTeamBid(selectedTeamId, Number(custom));
                      setCustom("");
                    })
                  }
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-extrabold text-white disabled:opacity-45"
                >
                  <Icon name="gavel" size={14} /> Bid
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-800">Bid History</h3>
              <span className="text-[9px] font-semibold text-slate-400">Current lot</span>
            </div>
            {liveBids.length === 0 ? (
              <p className="text-[11px] text-slate-400">No bids placed for this player yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {liveBids.slice(0, 6).map((b) => {
                  const t = teams.find((x) => x.id === b.team_id);
                  return (
                    <div key={b.id} className="flex items-center gap-2.5">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[8px] font-black text-white"
                        style={{ backgroundColor: t?.color || "#10b981" }}
                      >
                        {t?.short_name || "TM"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[10px] font-bold text-slate-700">
                          {t?.name ?? "Team"}
                        </p>
                      </div>
                      <p className="text-[11px] font-extrabold text-slate-900">
                        {formatINR(b.amount)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
              Auction Controls
            </p>
            <div className="grid grid-cols-5 gap-2">
              <button
                disabled={busy || !livePlayer || !leadingTeam}
                onClick={() => void runAction(markSold, "Marked SOLD!")}
                className="rounded-lg bg-emerald-600 py-3 text-[10px] font-black text-white hover:bg-emerald-700 disabled:opacity-45"
              >
                SOLD
              </button>
              <button
                disabled={busy || !livePlayer}
                onClick={() => void runAction(markUnsold, "Marked UNSOLD.")}
                className="rounded-lg bg-red-50 py-3 text-[10px] font-black text-red-600 hover:bg-red-100 disabled:opacity-45"
              >
                UNSOLD
              </button>
              <button
                disabled={busy || Boolean(livePlayer)}
                onClick={() => void runAction(reopenLastPlayer, "Reopened last player.")}
                className="rounded-lg bg-blue-50 py-3 text-[10px] font-black text-blue-600 hover:bg-blue-100 disabled:opacity-45"
              >
                REOPEN
              </button>
              <button
                disabled={busy || liveBids.length === 0}
                onClick={() => void runAction(undoLastBid, "Undid last bid.")}
                className="flex items-center justify-center gap-1 rounded-lg bg-slate-100 py-3 text-[10px] font-black text-slate-600 hover:bg-slate-200 disabled:opacity-45"
              >
                <Icon name="undo" size={13} />
                UNDO
              </button>
              <button
                disabled={busy || Boolean(livePlayer)}
                onClick={() => void runAction(openNextPlayer)}
                className="flex items-center justify-center gap-1 rounded-lg bg-slate-900 py-3 text-[10px] font-black text-white hover:bg-slate-800 disabled:opacity-45"
              >
                NEXT <Icon name="play" size={12} />
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h3 className="text-sm font-extrabold text-slate-900">Live Team Tracker</h3>
            <p className="mt-1 text-[10px] text-slate-400">Purse and squad status</p>
          </div>
          <div className="grid grid-cols-[1.25fr_.75fr_.45fr] bg-slate-50 px-4 py-3 text-[8px] font-black uppercase tracking-wider text-slate-400">
            <span>Team</span>
            <span>Purse Left</span>
            <span className="text-center">Bought</span>
          </div>
          <div>
            {teams.map((team) => {
              const boughtCount = players.filter(
                (p) => p.team_id === team.id && p.status === "sold",
              ).length;
              return (
                <div
                  key={team.id}
                  className={`grid grid-cols-[1.25fr_.75fr_.45fr] items-center border-t border-slate-100 px-4 py-3.5 ${
                    leadingTeam?.id === team.id ? "bg-emerald-50/50" : ""
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[8px] font-black text-white"
                      style={{ backgroundColor: team.color || "#10b981" }}
                    >
                      {team.short_name || team.name.slice(0, 2).toUpperCase()}
                    </div>
                    <p className="truncate text-[10px] font-bold text-slate-800">{team.name}</p>
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-600">
                    {formatINR(team.remaining_purse)}
                  </span>
                  <span className="text-center text-xs font-extrabold text-slate-700">
                    {boughtCount}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="m-4 rounded-xl bg-slate-900 p-4 text-white">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Total purse remaining
            </p>
            <p className="mt-2 text-xl font-black">{formatINR(totalRemainingPurse)}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${pursePct}%` }} />
            </div>
            <p className="mt-2 text-[8px] text-slate-500">{pursePct}% of total auction purse</p>
          </div>
        </section>
      </div>
    </main>
  );
}
