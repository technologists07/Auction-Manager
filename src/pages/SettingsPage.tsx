import { useEffect, useRef, useState } from "react";
import { SettingsSection } from "../components/SettingsSection";
import { useAuction } from "../context/AuctionContext";

export function SettingsPage({ dark, onTheme }: { dark: boolean; onTheme: () => void }) {
  const {
    activeTournament,
    teams,
    players,
    bids,
    communityName,
    setCommunityName,
    primaryColor,
    setPrimaryColor,
    updateTournamentRules,
    resetActiveTournament,
    importPlayersBatch,
  } = useAuction();

  const restoreRef = useRef<HTMLInputElement | null>(null);

  const [defaultPurse, setDefaultPurse] = useState("100000");
  const [maxSquad, setMaxSquad] = useState("11");
  const [bidIncrement, setBidIncrement] = useState("500");

  const [busy, setBusy] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    if (activeTournament) {
      setDefaultPurse(String(activeTournament.total_purse ?? 100000));
      setMaxSquad(String(activeTournament.max_squad_size ?? 11));
      setBidIncrement(String(activeTournament.min_bid_increment ?? 500));
    }
  }, [activeTournament]);

  const handleSaveSettings = async () => {
    setBusy(true);
    setStatusMsg(null);
    try {
      setCommunityName(communityName.trim() || "Green Meadows Apartment");
      setPrimaryColor(primaryColor);
      if (activeTournament) {
        await updateTournamentRules({
          total_purse: Number(defaultPurse) || 100000,
          max_squad_size: Number(maxSquad) || 11,
          min_bid_increment: Number(bidIncrement) || 500,
        });
      }
      setStatusMsg("Settings saved!");
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setBusy(false);
    }
  };

  const handleBackupData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      communityName,
      tournament: activeTournament,
      teams,
      players,
      bids,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(activeTournament?.name || "auction").replace(/\s+/g, "_")}_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg("Backup JSON downloaded.");
  };

  const handleRestoreFile = async (file: File) => {
    setBusy(true);
    setStatusMsg(null);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as {
        players?: { name: string; role: string; base_price: number }[];
      };
      if (Array.isArray(parsed.players) && parsed.players.length > 0) {
        const existingNames = new Set(players.map((p) => p.name.toLowerCase()));
        const toImport = parsed.players
          .filter((p) => p.name && !existingNames.has(p.name.toLowerCase()))
          .map((p) => ({
            name: p.name,
            role: p.role || "All-rounder",
            base_price: Number(p.base_price) || 3000,
          }));
        if (toImport.length > 0) {
          await importPlayersBatch(toImport);
          setStatusMsg(`Restored ${toImport.length} players from backup!`);
        } else {
          setStatusMsg("All players in backup already exist in this tournament.");
        }
      } else {
        setStatusMsg("Backup file did not contain any player records.");
      }
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : "Invalid backup JSON file");
    } finally {
      setBusy(false);
    }
  };

  const handleResetTournament = async () => {
    setBusy(true);
    setStatusMsg(null);
    try {
      await resetActiveTournament();
      setConfirmReset(false);
      setStatusMsg("Tournament reset: all players returned to queue and team purses restored.");
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : "Failed to reset tournament");
    } finally {
      setBusy(false);
    }
  };

  const initials = communityName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Settings</h2>
        {statusMsg && (
          <span className="rounded-full bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700">
            {statusMsg}
          </span>
        )}
      </div>

      <input
        ref={restoreRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleRestoreFile(f);
        }}
      />

      <div className="max-w-4xl space-y-5">
        <SettingsSection
          title="Community Settings"
          subtitle="Identity shown across tournaments and projector mode"
        >
          <div className="grid grid-cols-[96px_1fr] gap-5">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-2xl text-2xl font-black text-white"
              style={{ backgroundColor: primaryColor || "#059669" }}
            >
              {initials || "GM"}
            </div>
            <div>
              <label className="field-label">
                Community Name
                <input
                  className="field-input"
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                />
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="field-label">
                  Active Tournament
                  <div className="field-input flex items-center text-xs font-bold text-slate-700">
                    {activeTournament?.name ?? "None selected"}
                  </div>
                </label>
                <label className="field-label">
                  Primary Color
                  <div className="field-input flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                    />
                    <span className="font-mono text-xs uppercase text-slate-700">
                      {primaryColor}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Auction Settings"
          subtitle="Rules for the active tournament in Supabase"
        >
          <div className="grid grid-cols-3 gap-4">
            <label className="field-label">
              Team Purse (₹)
              <input
                type="number"
                className="field-input"
                value={defaultPurse}
                onChange={(e) => setDefaultPurse(e.target.value)}
              />
            </label>
            <label className="field-label">
              Max Squad Size
              <input
                type="number"
                className="field-input"
                value={maxSquad}
                onChange={(e) => setMaxSquad(e.target.value)}
              />
            </label>
            <label className="field-label">
              Bid Increment (₹)
              <input
                type="number"
                className="field-input"
                value={bidIncrement}
                onChange={(e) => setBidIncrement(e.target.value)}
              />
            </label>
          </div>
        </SettingsSection>

        <SettingsSection title="Theme" subtitle="Choose light or dark appearance">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => dark && onTheme()}
              className={`rounded-lg border px-5 py-2.5 text-xs font-bold transition ${
                !dark
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Light Mode
            </button>
            <button
              type="button"
              onClick={() => !dark && onTheme()}
              className={`rounded-lg border px-5 py-2.5 text-xs font-bold transition ${
                dark
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              Dark Mode
            </button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Data Management"
          subtitle="Export JSON backup, restore players, or reset the active auction"
        >
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleBackupData}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Backup Data (JSON)
            </button>
            <button
              onClick={() => restoreRef.current?.click()}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Restore Backup
            </button>

            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="ml-auto rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-100"
              >
                Reset Tournament
              </button>
            ) : (
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[11px] font-bold text-red-600">Are you sure?</span>
                <button
                  disabled={busy}
                  onClick={() => void handleResetTournament()}
                  className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
                >
                  Yes, Reset All
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </SettingsSection>

        <div className="flex justify-end">
          <button
            disabled={busy}
            onClick={() => void handleSaveSettings()}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {busy ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </main>
  );
}
