import { useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icon";
import { formatINR, useAuction } from "../context/AuctionContext";
import { playerImages } from "../data/mockData";
import { DbPlayer } from "../types/auction";

export function ProjectorModePage({ exit }: { exit: () => void }) {
  const { activeTournament, teams, players, bids } = useAuction();

  const livePlayer =
    players.find((p) => p.id === activeTournament?.current_player_id) ??
    players.find((p) => p.status === "live") ??
    null;

  const lastLiveIdRef = useRef<string | null>(null);
  const [outcomePlayer, setOutcomePlayer] = useState<DbPlayer | null>(null);

  useEffect(() => {
    if (livePlayer) {
      lastLiveIdRef.current = livePlayer.id;
      setOutcomePlayer(null);
    } else if (lastLiveIdRef.current) {
      const finished = players.find((p) => p.id === lastLiveIdRef.current);
      if (finished && (finished.status === "sold" || finished.status === "unsold")) {
        setOutcomePlayer(finished);
      }
    }
  }, [livePlayer, players]);

  const currentBid = Number(activeTournament?.current_bid ?? 0);
  const leadingTeam = teams.find((t) => t.id === activeTournament?.highest_bidder_team_id) ?? null;
  const bidCount = livePlayer ? bids.filter((b) => b.player_id === livePlayer.id).length : 0;
  const recentSold = players.filter((p) => p.status === "sold").slice(-3).reverse();

  const outcomeTeam =
    outcomePlayer?.status === "sold"
      ? teams.find((t) => t.id === outcomePlayer.team_id) ?? null
      : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 25% 40%, #10b981 0, transparent 35%), radial-gradient(circle at 80% 20%, #2563eb 0, transparent 30%)",
        }}
      />
      <div className="relative flex min-h-screen flex-col p-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500">
              <Icon name="bat" size={24} />
            </div>
            <div>
              <p className="text-xl font-black">
                {activeTournament?.name ?? "Community Sports Auction"}
              </p>
              <p className="text-xs uppercase tracking-[.2em] text-emerald-400">
                Live Community Auction
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 text-xs font-black text-red-400">
              <i className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> LIVE
            </span>
            <button
              onClick={exit}
              className="rounded-lg border border-white/15 px-3 py-2 text-[10px] text-slate-400 hover:text-white"
            >
              Exit Projector
            </button>
          </div>
        </header>

        {outcomePlayer && !livePlayer ? (
          <main className="flex flex-1 items-center justify-center py-10">
            <div
              className={`w-full max-w-3xl rounded-3xl border p-12 text-center shadow-2xl ${
                outcomePlayer.status === "sold"
                  ? "border-emerald-400/40 bg-emerald-500/10"
                  : "border-red-400/40 bg-red-500/10"
              }`}
            >
              <span
                className={`inline-block rounded-full px-6 py-2 text-sm font-black uppercase tracking-[.3em] ${
                  outcomePlayer.status === "sold"
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-red-500 text-white"
                }`}
              >
                {outcomePlayer.status === "sold" ? "SOLD!" : "UNSOLD"}
              </span>
              <h1 className="mt-6 text-6xl font-black tracking-tight">{outcomePlayer.name}</h1>
              <p className="mt-2 text-lg text-slate-300">{outcomePlayer.role}</p>

              {outcomePlayer.status === "sold" ? (
                <>
                  <p className="mt-8 text-7xl font-black text-emerald-400">
                    {formatINR(outcomePlayer.sold_price)}
                  </p>
                  <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-black text-white"
                      style={{ backgroundColor: outcomeTeam?.color || "#10b981" }}
                    >
                      {outcomeTeam?.short_name || "TM"}
                    </span>
                    <span className="text-2xl font-black">{outcomeTeam?.name ?? "Winning Team"}</span>
                  </div>
                </>
              ) : (
                <p className="mt-8 text-2xl font-bold text-red-300">
                  Returned to unsold pool
                </p>
              )}
              <p className="mt-8 text-xs uppercase tracking-[.2em] text-slate-400">
                Waiting for auctioneer to start next lot...
              </p>
            </div>
          </main>
        ) : (
          <main className="grid flex-1 grid-cols-[.8fr_1.2fr] items-center gap-14 py-10">
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
              {livePlayer ? (
                <>
                  <img
                    src={playerImages[livePlayer.queue_order % playerImages.length]}
                    className="h-[460px] w-full object-cover object-top"
                    alt={livePlayer.name}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-8 pt-24">
                    <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black uppercase">
                      {livePlayer.role}
                    </span>
                    <h1 className="mt-4 text-5xl font-black">{livePlayer.name}</h1>
                    <p className="mt-2 text-lg text-slate-400">
                      Base price {formatINR(livePlayer.base_price)}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-[460px] flex-col items-center justify-center p-8 text-center">
                  <p className="text-2xl font-black text-slate-300">Waiting for Next Player</p>
                  <p className="mt-2 text-sm text-slate-500">
                    The auctioneer will bring the next lot live shortly.
                  </p>
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[.35em] text-emerald-400">
                Current Bid
              </p>
              <p className="mt-5 text-[108px] font-black leading-none tracking-tight">
                {formatINR(currentBid)}
              </p>
              <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6">
                <p className="text-sm uppercase tracking-wider text-slate-400">Leading Team</p>
                <p className="mt-2 text-4xl font-black text-blue-400">
                  {leadingTeam?.name ?? "No Bids Yet"}
                </p>
              </div>
              <div className="mt-10 flex items-center justify-center gap-10">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Bid Count</p>
                  <p className="mt-1 text-3xl font-black">{bidCount}</p>
                </div>
                <div className="h-14 w-px bg-white/10" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Teams</p>
                  <p className="mt-1 text-3xl font-black text-emerald-400">{teams.length}</p>
                </div>
              </div>
            </div>
          </main>
        )}

        <footer className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-6">
            <p className="text-xs font-black uppercase tracking-wider text-slate-500">
              Recent Sales
            </p>
            {recentSold.length === 0 ? (
              <p className="text-xs text-slate-500">No players sold yet in this session.</p>
            ) : (
              recentSold.map((p) => {
                const t = teams.find((x) => x.id === p.team_id);
                return (
                  <div
                    key={p.id}
                    className="flex flex-1 items-center justify-between border-l border-white/10 pl-6"
                  >
                    <div>
                      <p className="text-sm font-bold">{p.name}</p>
                      <p className="text-[10px] text-slate-500">{t?.name ?? "Team"}</p>
                    </div>
                    <b className="text-lg text-emerald-400">{formatINR(p.sold_price)}</b>
                  </div>
                );
              })
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
