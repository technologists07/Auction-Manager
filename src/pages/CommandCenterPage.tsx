import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";
import { playerImages } from "../data/mockData";
import { IconName, Screen } from "../types/auction";

export function CommandCenterPage({ navigate }: { navigate: (screen: Screen) => void }) {
  const actions: [string, IconName, Screen][] = [
    ["Import Players", "upload", "import"],
    ["Manage Teams", "shield", "team"],
    ["Configure Queue", "list", "queue"],
    ["Start Auction", "gavel", "auction"],
  ];

  return (
    <main className="p-8">
      <PageTitle
        title="Tournament Command Center"
        description="Everything you need to prepare, run and monitor this community auction."
        action={
          <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Auction In
            Progress
          </span>
        }
      />

      <section className="overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-emerald-400">
              Cricket • Season 2027
            </p>
            <h3 className="mt-2 text-2xl font-black">Green Meadows Premier League 2027</h3>
            <p className="mt-2 text-xs text-slate-400">
              8 teams • 74 registered players • Auction started 18 March 2027
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Auction progress</p>
            <p className="mt-1 text-3xl font-black text-emerald-400">68%</p>
            <div className="mt-2 h-1.5 w-40 rounded-full bg-slate-700">
              <div className="h-full w-[68%] rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-5 gap-4">
        {[
          ["Teams Created", "8 / 8", "shield", "bg-blue-50 text-blue-600"],
          ["Registered Players", "74", "users", "bg-violet-50 text-violet-600"],
          ["Sold Players", "42", "check", "bg-emerald-50 text-emerald-600"],
          ["Remaining Players", "24", "clock", "bg-amber-50 text-amber-600"],
          ["Remaining Purse", "₹5.32L", "wallet", "bg-cyan-50 text-cyan-600"],
        ].map(([label, value, icon, tone]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
              <Icon name={icon as IconName} size={17} />
            </div>
            <p className="mt-4 text-xl font-extrabold text-slate-900">{value}</p>
            <p className="mt-1 text-[10px] font-semibold text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_1.25fr] gap-5">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900">Quick Actions</h3>
          <p className="mt-1 text-[10px] text-slate-400">Tournament-specific operations</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {actions.map(([label, icon, screen]) => (
              <button
                key={label}
                onClick={() => navigate(screen)}
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left text-xs font-bold text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-emerald-600">
                  <Icon name={icon} size={17} />
                </span>
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Recent Auction Activity</h3>
              <p className="mt-1 text-[10px] text-slate-400">Live transaction feed</p>
            </div>
            <span className="rounded-full bg-red-50 px-2 py-1 text-[8px] font-black text-red-600">
              LIVE
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Rohan Verma", "Sold to Thunder Kings", "₹8,500", "Just now"],
              ["Aditya Rao", "Sold to Royal Strikers", "₹12,000", "2 min ago"],
              ["Nikhil Bhat", "Marked unsold", "₹3,000", "4 min ago"],
              ["Karan Malhotra", "Sold to Green Warriors", "₹9,500", "7 min ago"],
            ].map((a, i) => (
              <div key={a[0]} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                <img src={playerImages[i % 4]} className="h-9 w-9 rounded-lg object-cover" alt="" />
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-slate-800">{a[0]}</p>
                  <p className="text-[9px] text-slate-400">
                    {a[1]} • {a[3]}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-slate-800">{a[2]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
