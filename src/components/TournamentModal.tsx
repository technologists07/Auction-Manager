import { useState } from "react";
import { useAuction } from "../context/AuctionContext";
import { Icon } from "./Icon";

export function TournamentModal({ onClose }: { onClose: () => void }) {
  const { createTournament } = useAuction();
  const [name, setName] = useState("");
  const [season, setSeason] = useState("2027");
  const [maxSquad, setMaxSquad] = useState("11");
  const [purse, setPurse] = useState("100000");
  const [increment, setIncrement] = useState("500");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      await createTournament({
        name: name.trim(),
        season: season.trim() || "2027",
        total_purse: Number(purse) || 100000,
        max_squad_size: Number(maxSquad) || 11,
        min_bid_increment: Number(increment) || 500,
      });
      setSaved(true);
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Failed to save tournament");
    } finally {
      setSaving(false);
    }
  };

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
              Saves directly to your Supabase database.
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
              {name} is saved and set as your active tournament.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            {err && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                {err}
              </div>
            )}
            <label className="field-label">
              Tournament Name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field-input"
                placeholder="e.g. Green Meadows Premier League"
              />
            </label>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="field-label">
                Season
                <input
                  required
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="field-input"
                  placeholder="2027"
                />
              </label>
              <label className="field-label">
                Max Squad Size
                <input
                  required
                  type="number"
                  min="1"
                  value={maxSquad}
                  onChange={(e) => setMaxSquad(e.target.value)}
                  className="field-input"
                />
              </label>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="field-label">
                Starting Purse (₹)
                <input
                  required
                  type="number"
                  min="1000"
                  value={purse}
                  onChange={(e) => setPurse(e.target.value)}
                  className="field-input"
                />
              </label>
              <label className="field-label">
                Bid Increment (₹)
                <input
                  required
                  type="number"
                  min="100"
                  value={increment}
                  onChange={(e) => setIncrement(e.target.value)}
                  className="field-input"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Create Tournament"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
