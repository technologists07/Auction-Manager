import { Icon } from "../components/Icon";
import { StatCard } from "../components/StatCard";
import { dashboardTournaments } from "../data/mockData";
import { IconName, Screen } from "../types/auction";

export function DashboardPage({
  openModal,
  navigate,
}: {
  openModal: () => void;
  navigate: (screen: Screen) => void;
}) {
  return (
    <main className="p-8">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Community Sports Auction Manager
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Run fair, fast and engaging cricket auctions for your community.
          </p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
        >
          <Icon name="plus" size={17} /> Create Tournament
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Tournaments"
          value="12"
          change="+2 this month"
          icon="trophy"
          tone="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Total Teams"
          value="38"
          change="+8.2%"
          icon="shield"
          tone="bg-violet-50 text-violet-600"
        />
        <StatCard
          title="Registered Players"
          value="264"
          change="+12.5%"
          icon="users"
          tone="bg-amber-50 text-amber-600"
        />
        <div
          onClick={() => navigate("auction")}
          className="cursor-pointer rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 p-5 text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
              <Icon name="gavel" size={19} />
            </div>
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300" /> Live
            </span>
          </div>
          <p className="mt-5 text-2xl font-extrabold tracking-tight">1 Active</p>
          <p className="mt-1 text-xs font-medium text-emerald-100">Green Meadows Premier League</p>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-emerald-600">
              Current Tournament
            </p>
            <button
              onClick={() => navigate("command")}
              className="mt-1 flex items-center gap-2 text-lg font-extrabold text-slate-900"
            >
              Green Meadows Premier League 2027 <Icon name="arrow" size={16} />
            </button>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Auction In Progress
          </span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            ["Create Tournament", "trophy", () => openModal()],
            ["Import Players", "upload", () => navigate("import")],
            ["Create Teams", "shield", () => navigate("team")],
            ["Start Auction", "gavel", () => navigate("auction")],
          ].map(([label, icon, action]) => (
            <button
              key={label as string}
              onClick={action as () => void}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-xs font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                <Icon name={icon as IconName} size={16} />
              </span>
              {label as string}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-[1.7fr_1fr] gap-5">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Recent Tournaments</h3>
              <p className="mt-1 text-[11px] text-slate-400">Manage your latest sports events</p>
            </div>
            <button
              onClick={() => navigate("tournaments")}
              className="flex items-center gap-1 text-[11px] font-bold text-emerald-600"
            >
              View all <Icon name="arrow" size={13} />
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Tournament Name</th>
                <th className="px-4 py-3">Sport</th>
                <th className="px-4 py-3">Teams</th>
                <th className="px-4 py-3">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dashboardTournaments.map((row, i) => (
                <tr
                  onClick={() => i === 0 && navigate("command")}
                  key={row[0]}
                  className="cursor-pointer border-t border-slate-100 text-xs hover:bg-slate-50/60"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          i === 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon name="trophy" size={15} />
                      </div>
                      <span className="font-bold text-slate-800">{row[0]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{row[1]}</td>
                  <td className="px-4 py-4 font-semibold text-slate-600">{row[2]}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        row[3] === "Live"
                          ? "bg-emerald-50 text-emerald-700"
                          : row[3] === "Upcoming"
                            ? "bg-blue-50 text-blue-600"
                            : row[3] === "Completed"
                              ? "bg-slate-100 text-slate-500"
                              : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {row[3]}
                    </span>
                  </td>
                  <td className="px-4">
                    <Icon name="more" size={16} className="text-slate-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Auction Overview</h3>
              <p className="mt-1 text-[11px] text-slate-400">Live progress</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Icon name="chart" size={17} />
            </div>
          </div>
          <div
            className="mx-auto my-6 flex h-32 w-32 items-center justify-center rounded-full"
            style={{ background: "conic-gradient(#0d9f6e 68%, #e8edf1 0)" }}
          >
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
              <span className="text-2xl font-black text-slate-900">68%</span>
              <span className="text-[9px] font-semibold text-slate-400">COMPLETED</span>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-100 rounded-lg bg-slate-50 py-3 text-center">
            <div>
              <p className="text-sm font-extrabold text-slate-800">42</p>
              <p className="text-[9px] text-slate-400">Sold</p>
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-800">8</p>
              <p className="text-[9px] text-slate-400">Unsold</p>
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-800">24</p>
              <p className="text-[9px] text-slate-400">Pending</p>
            </div>
          </div>
          <button
            onClick={() => navigate("auction")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
          >
            Open Auction Room <Icon name="arrow" size={14} />
          </button>
        </section>
      </div>
    </main>
  );
}
