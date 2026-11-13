import { useState } from "react";
import { Icon } from "./Icon";

export function TournamentModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-6 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-[620px] rounded-2xl bg-white shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 p-6">
          <div>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Icon name="trophy" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Create Tournament</h2>
            <p className="mt-1 text-xs text-slate-500">
              Set up your tournament details and auction rules.
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <Icon name="close" />
          </button>
        </div>
        {saved ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Icon name="check" size={30} />
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-slate-900">Tournament created</h3>
            <p className="mt-2 text-sm text-slate-500">
              Your new tournament is ready for teams and players.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
            className="p-6"
          >
            <label className="field-label">
              Tournament Name
              <input
                required
                className="field-input"
                placeholder="e.g. Green Meadows Premier League"
              />
            </label>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="field-label">
                Sport
                <select className="field-input">
                  <option>Cricket</option>
                  <option>Box Cricket</option>
                </select>
              </label>
              <label className="field-label">
                Number of Teams
                <input required type="number" min="2" defaultValue="8" className="field-input" />
              </label>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="field-label">
                Players Per Team
                <input required type="number" min="1" defaultValue="11" className="field-input" />
              </label>
              <label className="field-label">
                Starting Purse
                <input required className="field-input" defaultValue="₹1,00,000" />
              </label>
            </div>
            <label className="field-label mt-4">
              Auction Date
              <div className="relative">
                <input required type="date" className="field-input" />
                <Icon
                  name="calendar"
                  size={16}
                  className="pointer-events-none absolute right-3 top-3 text-slate-400"
                />
              </div>
            </label>
            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700">
                Create Tournament
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
