import { Icon } from "./Icon";
import { tournamentNav } from "../data/mockData";
import { IconName, Screen } from "../types/auction";

export function Sidebar({
  activePath,
  onNavigate,
}: {
  activePath: string;
  onNavigate: (screen: Screen) => void;
}) {
  const workspaceItems: { label: string; icon: IconName; screen: Screen; path: string }[] = [
    { label: "Dashboard", icon: "grid", screen: "dashboard", path: "/" },
    { label: "Tournaments", icon: "trophy", screen: "tournaments", path: "/tournaments" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[236px] flex-col border-r border-slate-200 bg-white">
      <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
          <Icon name="bat" size={21} />
        </div>
        <div>
          <div className="text-[15px] font-extrabold tracking-tight text-slate-900">
            Auction<span className="text-emerald-600">Pro</span>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">
            Sports Manager
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">
          Workspace
        </p>
        {workspaceItems.map((item) => {
          const isActive = activePath === item.path;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.screen)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon
                name={item.icon}
                size={18}
                className={
                  isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                }
              />
              {item.label}
            </button>
          );
        })}

        <div className="mx-1 my-4 border-t border-slate-100" />
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">
          Current Tournament
        </p>
        <button
          onClick={() => onNavigate("command")}
          className="mb-2 flex w-full items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-left"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Icon name="trophy" size={17} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-extrabold text-emerald-900">Green Meadows PL</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[9px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Auction in progress
            </p>
          </div>
          <Icon name="chevron" size={13} className="text-emerald-500" />
        </button>

        <div className="space-y-0.5 border-l border-slate-200 pl-2">
          {tournamentNav.map((item) => {
            const isActive =
              activePath === item.path ||
              (item.screen === "players" && activePath === "/import");
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.screen)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] font-semibold transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  className={isActive ? "text-emerald-600" : "text-slate-400"}
                />
                {item.label}
                {item.label === "Auction Room" && (
                  <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-red-500" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mx-1 my-4 border-t border-slate-100" />
        <button
          onClick={() => onNavigate("settings")}
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold ${
            activePath === "/settings"
              ? "bg-emerald-50 text-emerald-700"
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          <Icon name="settings" size={18} className="text-slate-400" />
          Settings
        </button>
      </nav>

      <div className="m-4 rounded-xl bg-slate-900 p-4 text-white">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> GMPL 2027
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Auction is live with 4 teams participating.
        </p>
        <button
          onClick={() => onNavigate("auction")}
          className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400"
        >
          Enter room <Icon name="arrow" size={13} />
        </button>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700">
          RM
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-slate-800">Rahul Mehta</p>
          <p className="text-[10px] text-slate-400">Administrator</p>
        </div>
        <Icon name="more" size={17} className="text-slate-400" />
      </div>
    </aside>
  );
}
