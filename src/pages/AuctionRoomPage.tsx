import { useMemo, useState } from "react";
import { Icon } from "../components/Icon";
import { playerImages, players, teams } from "../data/mockData";

export function AuctionRoomPage({ projector }: { projector: () => void }) {
  const [bid, setBid] = useState(8500);
  const [count, setCount] = useState(12);
  const [leader, setLeader] = useState("Thunder Kings");
  const [custom, setCustom] = useState("");
  const [increment, setIncrement] = useState(500);
  const [timer, setTimer] = useState(18);
  const [status, setStatus] = useState("BIDDING OPEN");

  const history = useMemo(
    () => [
      {
        team: leader,
        amount: `₹${bid.toLocaleString("en-IN")}`,
        time: "Just now",
        color: "#2459d3",
      },
      { team: "Royal Strikers", amount: "₹8,000", time: "5 sec ago", color: "#7c3aed" },
      { team: "Thunder Kings", amount: "₹7,000", time: "9 sec ago", color: "#2459d3" },
      { team: "Green Warriors", amount: "₹6,000", time: "14 sec ago", color: "#12985b" },
    ],
    [bid, leader],
  );

  const placeBid = (amount?: number, teamName?: string) => {
    const next = custom ? Number(custom) : bid + (amount || increment);
    if (next > bid) {
      setBid(next);
      if (teamName) setLeader(teamName);
      setCount((c) => c + 1);
      setTimer(18);
      setStatus("BIDDING OPEN");
      setCustom("");
    }
  };

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
            <p className="text-xs font-extrabold text-slate-800">Green Meadows Premier League</p>
            <p className="text-[9px] text-slate-400">Player 51 of 74 • Round 4</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Auction Timer
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
            onClick={() => setTimer(Math.max(0, timer - 1))}
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

      <div className="grid grid-cols-[.75fr_1.4fr_.85fr] gap-4">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Current Player
            </h3>
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-600">
              #GM-151
            </span>
          </div>
          <div className="relative h-[245px] overflow-hidden bg-slate-100">
            <img
              src={playerImages[0]}
              alt="Rohan Verma playing cricket"
              className="h-full w-full object-cover object-[center_25%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-md bg-white/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-700">
              All-rounder
            </span>
          </div>
          <div className="p-5">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Rohan Verma</h2>
            <p className="mt-1 text-xs text-slate-400">Age 27 • Green Meadows A Wing</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Batting Style
                </p>
                <p className="mt-1.5 text-xs font-bold text-slate-700">Right Hand Bat</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Bowling Style
                </p>
                <p className="mt-1.5 text-xs font-bold text-slate-700">Right-arm Medium</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                  Base Price
                </p>
                <p className="mt-1 text-xl font-black text-emerald-700">₹5,000</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                <Icon name="wallet" size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Previous Stats
                </p>
                <span className="text-[9px] text-slate-400">2026 season</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Runs", "286"],
                  ["Wickets", "14"],
                  ["S/R", "142"],
                ].map((s) => (
                  <div key={s[0]} className="rounded-lg bg-slate-50 p-2">
                    <p className="text-xs font-extrabold text-slate-800">{s[1]}</p>
                    <p className="text-[8px] text-slate-400">{s[0]}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Upcoming Players
              </p>
              <div className="mt-2 flex gap-2">
                {players.slice(1, 4).map((p, i) => (
                  <div
                    key={p.name}
                    className="min-w-0 flex-1 rounded-lg border border-slate-100 p-2 text-center"
                  >
                    <img
                      src={p.image}
                      className="mx-auto h-8 w-8 rounded-full object-cover"
                      alt=""
                    />
                    <p className="mt-1 truncate text-[8px] font-bold text-slate-700">
                      {p.name.split(" ")[0]}
                    </p>
                    <p className="text-[7px] text-slate-400">#{i + 2}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-900 px-6 py-5 text-center text-white">
              <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {status}
              </div>
              <p className="mt-2 text-[42px] font-black tracking-tight">
                ₹{bid.toLocaleString("en-IN")}
              </p>
              <div className="mt-2 flex items-center justify-center gap-5 text-[10px] text-slate-400">
                <span>
                  Leading: <b className="text-white">{leader}</b>
                </span>
                <span className="h-3 w-px bg-slate-700" />
                <span>
                  Bid count: <b className="text-white">{count}</b>
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Place next bid
                </p>
                <p className="text-[10px] text-slate-400">
                  Min. ₹{(bid + 500).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {teams.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => placeBid(increment, t.name)}
                    className={`flex items-center gap-2.5 rounded-lg border p-3 text-left transition ${
                      leader === t.name
                        ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-200"
                        : "border-slate-200 bg-slate-50 hover:border-emerald-300"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${t.accent} text-[8px] font-black text-white`}
                    >
                      {t.short}
                    </span>
                    <span>
                      <b className="block text-[10px] text-slate-800">{t.name}</b>
                      <span className="text-[8px] text-slate-400">
                        Click to bid +₹{increment.toLocaleString()}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Current Increment
                </span>
                <span className="text-xs font-extrabold text-emerald-600">
                  +₹{increment.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[500, 1000, 2000].map((n) => (
                  <button
                    key={n}
                    onClick={() => setIncrement(n)}
                    className={`rounded-lg border py-2.5 text-xs font-extrabold transition ${
                      increment === n
                        ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300"
                    }`}
                  >
                    +₹{n.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                    ₹
                  </span>
                  <input
                    value={custom}
                    onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-7 pr-3 text-xs font-bold outline-none focus:border-emerald-400"
                    placeholder="Enter custom bid"
                  />
                </div>
                <button
                  onClick={() => placeBid()}
                  className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-xs font-extrabold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
                >
                  <Icon name="gavel" size={15} />
                  Place Bid
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-800">Bid History</h3>
              <span className="text-[9px] font-semibold text-slate-400">Latest bids</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {history.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="relative flex h-7 w-7 items-center justify-center rounded-full text-[8px] font-black text-white"
                    style={{ background: h.color }}
                  >
                    {h.team
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-bold text-slate-700">{h.team}</p>
                    <p className="text-[8px] text-slate-400">{h.time}</p>
                  </div>
                  <p className="text-[11px] font-extrabold text-slate-900">{h.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
              Auction Controls
            </p>
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => setStatus("SOLD TO " + leader.toUpperCase())}
                className="rounded-lg bg-emerald-600 py-3 text-[10px] font-black text-white hover:bg-emerald-700"
              >
                SOLD
              </button>
              <button
                onClick={() => setStatus("PLAYER UNSOLD")}
                className="rounded-lg bg-red-50 py-3 text-[10px] font-black text-red-600 hover:bg-red-100"
              >
                UNSOLD
              </button>
              <button
                onClick={() => setStatus("BIDDING REOPENED")}
                className="rounded-lg bg-blue-50 py-3 text-[10px] font-black text-blue-600 hover:bg-blue-100"
              >
                REOPEN
              </button>
              <button
                onClick={() => {
                  setBid(Math.max(5000, bid - 500));
                  setCount(Math.max(0, count - 1));
                }}
                className="flex items-center justify-center gap-1 rounded-lg bg-slate-100 py-3 text-[10px] font-black text-slate-600 hover:bg-slate-200"
              >
                <Icon name="undo" size={13} />
                UNDO
              </button>
              <button
                onClick={() => {
                  setBid(5000);
                  setCount(0);
                  setStatus("NEXT PLAYER READY");
                }}
                className="flex items-center justify-center gap-1 rounded-lg bg-slate-900 py-3 text-[10px] font-black text-white hover:bg-slate-800"
              >
                NEXT <Icon name="play" size={12} />
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Live Team Tracker</h3>
                <p className="mt-1 text-[10px] text-slate-400">Purse and squad status</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Icon name="shield" size={17} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1.25fr_.7fr_.45fr_.7fr] bg-slate-50 px-4 py-3 text-[7px] font-black uppercase tracking-wider text-slate-400">
            <span>Team</span>
            <span>Purse Left</span>
            <span className="text-center">Bought</span>
            <span className="text-right">Max Bid</span>
          </div>
          <div>
            {teams.map((team, i) => (
              <div
                key={team.name}
                className={`grid grid-cols-[1.25fr_.7fr_.45fr_.7fr] items-center border-t border-slate-100 px-4 py-4 ${
                  leader === team.name ? "bg-emerald-50/50" : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${team.accent} text-[8px] font-black text-white`}
                  >
                    {team.short}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-bold text-slate-800">{team.name}</p>
                    {leader === team.name && (
                      <p className="mt-0.5 text-[7px] font-bold uppercase tracking-wider text-emerald-600">
                        Leading bid
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[11px] font-extrabold ${
                    i === 3 ? "text-red-500" : i === 1 ? "text-amber-500" : "text-emerald-600"
                  }`}
                >
                  {team.purse}
                </span>
                <span className="text-center text-xs font-extrabold text-slate-700">
                  {team.players}
                </span>
                <span
                  className={`text-right text-[10px] font-extrabold ${
                    i === 3 ? "text-red-500" : i === 1 ? "text-amber-500" : "text-emerald-600"
                  }`}
                >
                  {["₹61K", "₹54K", "₹72K", "₹38K"][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="m-4 rounded-xl bg-slate-900 p-4 text-white">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Total purse remaining
              </p>
              <Icon name="wallet" size={15} className="text-emerald-400" />
            </div>
            <p className="mt-2 text-xl font-black">₹2,66,000</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-[66%] rounded-full bg-emerald-400" />
            </div>
            <p className="mt-2 text-[8px] text-slate-500">66.5% of total auction purse</p>
          </div>
        </section>
      </div>
    </main>
  );
}
