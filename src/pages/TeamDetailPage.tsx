import { PageTitle } from "../components/PageTitle";
import { playerImages, teams } from "../data/mockData";

export function TeamDetailPage() {
  const team = teams[0];
  const bought = [
    ["Rohan Verma", "All-rounder", "₹8,500", playerImages[0]],
    ["Karan Malhotra", "Batsman", "₹7,000", playerImages[1]],
    ["Aditya Rao", "Fast Bowler", "₹5,500", playerImages[2]],
    ["Siddharth Jain", "Wicket-keeper", "₹4,500", playerImages[3]],
  ];

  return (
    <main className="p-8">
      <PageTitle
        title="Team Detail"
        description="Squad, spending and role composition for Thunder Kings."
      />
      <section className={`rounded-xl bg-gradient-to-r ${team.accent} p-6 text-white shadow-lg`}>
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black ring-1 ring-white/30">
            {team.short}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
              Team Profile
            </p>
            <h2 className="mt-1 text-3xl font-black">{team.name}</h2>
            <div className="mt-2 flex gap-5 text-xs text-white/80">
              <span>
                Owner: <b className="text-white">Arjun Mehta</b>
              </span>
              <span>
                Captain: <b className="text-white">Rohan Verma</b>
              </span>
              <span className="flex items-center gap-1.5">
                Color: <i className="h-3 w-3 rounded-full bg-blue-300" /> Royal Blue
              </span>
            </div>
          </div>
          <button className="rounded-lg bg-white/15 px-4 py-2 text-xs font-bold ring-1 ring-white/20">
            Edit Team
          </button>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-4 gap-4">
        {[
          ["Initial Purse", "₹1,00,000"],
          ["Remaining Purse", "₹71,500"],
          ["Total Spend", "₹28,500"],
          ["Players Purchased", "7 / 11"],
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
            {[
              ["Batsmen", 3, "bg-blue-500"],
              ["Bowlers", 2, "bg-emerald-500"],
              ["All Rounders", 1, "bg-violet-500"],
              ["Wicket Keepers", 1, "bg-amber-500"],
            ].map(([r, n, c]) => (
              <div key={r as string}>
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-600">{r}</span>
                  <b className="text-slate-800">{n}</b>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${c}`}
                    style={{ width: `${Number(n) * 25}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="p-5">
            <h3 className="text-sm font-extrabold text-slate-900">Purchased Players</h3>
            <p className="mt-1 text-[10px] text-slate-400">Players secured during the auction</p>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Player</th>
                <th>Role</th>
                <th>Purchase Price</th>
              </tr>
            </thead>
            <tbody>
              {bought.map((p) => (
                <tr key={p[0]} className="border-t border-slate-100 text-xs">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p[3]} className="h-9 w-9 rounded-lg object-cover" alt="" />
                      <b className="text-slate-800">{p[0]}</b>
                    </div>
                  </td>
                  <td className="text-slate-500">{p[1]}</td>
                  <td className="font-extrabold text-slate-800">{p[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
