import { Icon } from "./Icon";
import { Team } from "../types/auction";

export function TeamDrawer({ team, onClose }: { team: Team; onClose: () => void }) {
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px]" />
      <aside className="fixed inset-y-0 right-0 z-50 w-[410px] overflow-y-auto bg-white shadow-2xl">
        <div className={`bg-gradient-to-br ${team.accent} p-6 text-white`}>
          <div className="flex justify-between">
            <span className="rounded-full bg-white/15 px-3 py-1 text-[9px] font-bold uppercase tracking-wider">
              Team Details
            </span>
            <button onClick={onClose} className="rounded-lg bg-white/10 p-2">
              <Icon name="close" size={18} />
            </button>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-lg font-black ring-1 ring-white/30">
              {team.short}
            </div>
            <div>
              <h2 className="text-2xl font-black">{team.name}</h2>
              <p className="mt-1 text-xs text-white/70">Owned by {team.owner}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <Icon name="wallet" className="text-blue-500" />
              <p className="mt-4 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Total Spend
              </p>
              <p className="mt-1 text-lg font-extrabold text-slate-900">{team.spend}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <Icon name="trend" className="text-emerald-500" />
              <p className="mt-4 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Purse Left
              </p>
              <p className="mt-1 text-lg font-extrabold text-emerald-600">{team.purse}</p>
            </div>
          </div>
          <div className="mt-7 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Squad Composition</h3>
            <span className="text-[10px] font-bold text-slate-400">{team.players}/11 players</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${(team.players / 11) * 100}%` }}
            />
          </div>
          <div className="mt-5 space-y-3">
            {["Batsmen", "All-rounders", "Bowlers", "Wicket-keepers"].map((role, i) => (
              <div
                key={role}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
                    <Icon name={i === 2 ? "bolt" : "user"} size={15} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{role}</span>
                </div>
                <span className="text-sm font-extrabold text-slate-800">{[3, 2, 2, 1][i]}</span>
              </div>
            ))}
          </div>
          <button className="mt-7 w-full rounded-lg border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50">
            View Full Team Profile
          </button>
        </div>
      </aside>
    </>
  );
}
