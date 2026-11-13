import { useState } from "react";
import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";
import { SettingsSection } from "../components/SettingsSection";
import { IconName } from "../types/auction";

export function SettingsPage({ dark, onTheme }: { dark: boolean; onTheme: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <main className="p-8">
      <PageTitle
        eyebrow="Workspace Configuration"
        title="Settings"
        description="Manage community branding, auction defaults and tournament data."
        action={
          saved ? (
            <span className="rounded-full bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700">
              Changes saved
            </span>
          ) : null
        }
      />
      <div className="grid grid-cols-[.75fr_1.25fr] gap-5">
        <nav className="h-fit rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          {["Community Settings", "Auction Settings", "Appearance", "Data Management"].map(
            (x, i) => (
              <button
                key={x}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-xs font-bold ${
                  i === 0 ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Icon name={["settings", "gavel", "grid", "upload"][i] as IconName} size={16} />
                {x}
              </button>
            ),
          )}
        </nav>

        <div className="space-y-5">
          <SettingsSection
            title="Community Settings"
            subtitle="Identity shown across tournaments and projector mode"
          >
            <div className="grid grid-cols-[100px_1fr] gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl font-black text-white">
                GM
              </div>
              <div>
                <label className="field-label">
                  Community Name
                  <input
                    className="field-input"
                    defaultValue="Green Meadows Apartment Sports Club"
                  />
                </label>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <label className="field-label">
                    Logo<button className="field-input text-left">Upload new logo</button>
                  </label>
                  <label className="field-label">
                    Primary Color
                    <div className="field-input flex items-center gap-2">
                      <i className="h-4 w-4 rounded-full bg-emerald-600" /> #059669
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </SettingsSection>

          <SettingsSection title="Auction Settings" subtitle="Default rules for new tournaments">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Default Purse", "₹1,00,000"],
                ["Base Price", "₹3,000"],
                ["Bid Increment", "₹500"],
                ["Default Timer", "20 seconds"],
              ].map((x) => (
                <label key={x[0]} className="field-label">
                  {x[0]}
                  <input className="field-input" defaultValue={x[1]} />
                </label>
              ))}
            </div>
          </SettingsSection>

          <SettingsSection title="Theme" subtitle="Light and dark design system states">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => dark && onTheme()}
                className={`rounded-xl border p-3 text-left ${
                  !dark ? "border-emerald-500 ring-2 ring-emerald-100" : "border-slate-200"
                }`}
              >
                <div className="rounded-lg bg-[#f5f7f8] p-3">
                  <div className="h-3 rounded bg-white shadow-sm" />
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <i className="h-8 rounded bg-white" />
                    <i className="h-8 rounded bg-white" />
                    <i className="h-8 rounded bg-emerald-500" />
                  </div>
                </div>
                <p className="mt-2 text-[10px] font-bold text-slate-700">Light Mode</p>
              </button>

              <button
                onClick={() => !dark && onTheme()}
                className={`rounded-xl border p-3 text-left ${
                  dark ? "border-emerald-500 ring-2 ring-emerald-100" : "border-slate-200"
                }`}
              >
                <div className="rounded-lg bg-slate-950 p-3">
                  <div className="h-3 rounded bg-slate-800" />
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <i className="h-8 rounded bg-slate-800" />
                    <i className="h-8 rounded bg-slate-800" />
                    <i className="h-8 rounded bg-emerald-500" />
                  </div>
                </div>
                <p className="mt-2 text-[10px] font-bold text-slate-700">Dark Mode</p>
              </button>
            </div>
          </SettingsSection>

          <SettingsSection
            title="Data Management"
            subtitle="Protect, transfer or clear tournament data"
          >
            <div className="flex gap-3">
              <button className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600">
                Backup Data
              </button>
              <button className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600">
                Restore Backup
              </button>
              <button className="ml-auto rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600">
                Reset Tournament
              </button>
            </div>
          </SettingsSection>

          <button
            onClick={() => setSaved(true)}
            className="float-right rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}
