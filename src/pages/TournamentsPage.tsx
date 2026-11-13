import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";
import { tournamentCards } from "../data/mockData";
import { Screen } from "../types/auction";

export function TournamentsPage({
  openModal,
  navigate,
}: {
  openModal: () => void;
  navigate: (screen: Screen) => void;
}) {
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
      <div className="grid grid-cols-2 gap-5">
        {tournamentCards.map((item, i) => (
          <button
            key={item[0]}
            onClick={() => i === 0 && navigate("command")}
            className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  i === 0 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                <Icon name="trophy" size={20} />
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${
                  item[1] === "Auction In Progress"
                    ? "bg-emerald-50 text-emerald-700"
                    : item[1] === "Ready"
                      ? "bg-blue-50 text-blue-600"
                      : item[1] === "Completed"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-amber-50 text-amber-600"
                }`}
              >
                {item[1]}
              </span>
            </div>
            <h3 className="mt-5 text-base font-extrabold text-slate-900 group-hover:text-emerald-700">
              {item[0]}
            </h3>
            <p className="mt-1 text-[11px] text-slate-400">Cricket • Auction date: {item[4]}</p>
            <div className="mt-5 grid grid-cols-2 divide-x divide-slate-100 rounded-lg bg-slate-50 py-3">
              <div className="px-4">
                <p className="text-lg font-extrabold text-slate-800">{item[2]}</p>
                <p className="text-[9px] text-slate-400">Teams</p>
              </div>
              <div className="px-4">
                <p className="text-lg font-extrabold text-slate-800">{item[3]}</p>
                <p className="text-[9px] text-slate-400">Players</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
