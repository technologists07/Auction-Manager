import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";
import { formatINR, useAuction } from "../context/AuctionContext";
import { Screen } from "../types/auction";

export function TournamentsPage({
  openModal,
  navigate,
}: {
  openModal: () => void;
  navigate: (screen: Screen) => void;
}) {
  const { tournaments, activeTournament, setActiveTournamentId } = useAuction();

  return (
    <main className="p-8">
      <PageTitle
        eyebrow="Tournament Management"
        title="Tournaments"
        description="Select a tournament to manage its players, teams, queue and live auction."
        action={
          <button
            onClick={openModal}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-200"
          >
            <Icon name="plus" size={16} /> Create Tournament
          </button>
        }
      />
      {tournaments.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-base font-extrabold text-slate-800">No tournaments yet</p>
          <p className="mt-1 text-xs text-slate-500">
            Create your first tournament to start adding teams and players.
          </p>
          <button
            onClick={openModal}
            className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white"
          >
            Create Tournament
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {tournaments.map((item) => {
            const isActive = item.id === activeTournament?.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTournamentId(item.id);
                  navigate("command");
                }}
                className={`group rounded-xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md ${
                  isActive ? "border-emerald-400 ring-2 ring-emerald-100" : "border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon name="trophy" size={20} />
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase text-emerald-700">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-extrabold text-slate-900 group-hover:text-emerald-700">
                  {item.name}
                </h3>
                <p className="mt-1 text-[11px] text-slate-400">
                  Season {item.season || "2027"} • Increment {formatINR(item.min_bid_increment)}
                </p>
                <div className="mt-5 grid grid-cols-2 divide-x divide-slate-100 rounded-lg bg-slate-50 py-3">
                  <div className="px-4">
                    <p className="text-lg font-extrabold text-slate-800">
                      {formatINR(item.total_purse)}
                    </p>
                    <p className="text-[9px] text-slate-400">Team Purse</p>
                  </div>
                  <div className="px-4">
                    <p className="text-lg font-extrabold text-slate-800">{item.max_squad_size}</p>
                    <p className="text-[9px] text-slate-400">Max Squad</p>
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
