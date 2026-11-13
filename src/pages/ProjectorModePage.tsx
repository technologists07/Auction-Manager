import { Icon } from "../components/Icon";
import { playerImages } from "../data/mockData";

export function ProjectorModePage({ exit }: { exit: () => void }) {
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
              <p className="text-xl font-black">Green Meadows Premier League 2027</p>
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
              className="rounded-lg border border-white/15 px-3 py-2 text-[10px] text-slate-400"
            >
              Exit Projector
            </button>
          </div>
        </header>

        <main className="grid flex-1 grid-cols-[.8fr_1.2fr] items-center gap-14 py-10">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
            <img
              src={playerImages[0]}
              className="h-[460px] w-full object-cover object-top"
              alt="Rohan Verma"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-8 pt-24">
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black uppercase">
                All-rounder
              </span>
              <h1 className="mt-4 text-5xl font-black">Rohan Verma</h1>
              <p className="mt-2 text-lg text-slate-400">Base price ₹5,000</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[.35em] text-emerald-400">
              Current Bid
            </p>
            <p className="mt-5 text-[108px] font-black leading-none tracking-tight">₹8,500</p>
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6">
              <p className="text-sm uppercase tracking-wider text-slate-400">Leading Team</p>
              <p className="mt-2 text-4xl font-black text-blue-400">Thunder Kings</p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-10">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Bid Count</p>
                <p className="mt-1 text-3xl font-black">12</p>
              </div>
              <div className="h-14 w-px bg-white/10" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Timer</p>
                <p className="mt-1 font-mono text-5xl font-black text-amber-400">18s</p>
              </div>
            </div>
          </div>
        </main>

        <footer className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-6">
            <p className="text-xs font-black uppercase tracking-wider text-slate-500">
              Recent Sales
            </p>
            {[
              ["Aditya Rao", "Royal Strikers", "₹12,000"],
              ["Karan Malhotra", "Green Warriors", "₹9,500"],
              ["Siddharth Jain", "Sky Blazers", "₹7,500"],
            ].map((x) => (
              <div
                key={x[0]}
                className="flex flex-1 items-center justify-between border-l border-white/10 pl-6"
              >
                <div>
                  <p className="text-sm font-bold">{x[0]}</p>
                  <p className="text-[10px] text-slate-500">{x[1]}</p>
                </div>
                <b className="text-lg text-emerald-400">{x[2]}</b>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
