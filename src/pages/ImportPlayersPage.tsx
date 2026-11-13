import { useState } from "react";
import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";

export function ImportPlayersPage({ done }: { done: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <main className="p-8">
      <PageTitle
        title="Import Players"
        description="Upload and validate player records before adding them to the tournament."
      />
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex items-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
              1
            </span>
            <span className="ml-2 text-xs font-bold text-slate-700">Upload Excel</span>
            <span className="mx-5 h-px w-28 bg-slate-200" />
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                step === 2 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              2
            </span>
            <span className="ml-2 text-xs font-bold text-slate-700">Validation Results</span>
          </div>
        </div>

        {step === 1 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 px-8 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                <Icon name="upload" size={25} />
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                Drop your Excel file here
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                Supports .xlsx and .csv files up to 10 MB
              </p>
              <button
                onClick={() => setStep(2)}
                className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-200"
              >
                Browse Files
              </button>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-xs font-bold text-slate-700">Need the correct format?</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Download our template with all required player fields.
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold text-slate-600">
                <Icon name="upload" size={14} className="rotate-180" /> Download Template
              </button>
            </div>
          </section>
        ) : (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Validation Complete</h3>
                  <p className="mt-1 text-[11px] text-slate-400">
                    players_gmpl_2027.xlsx • Checked just now
                  </p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold text-amber-700">
                  3 rows need attention
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ["Records Found", "74", "text-slate-900"],
                  ["Valid Rows", "71", "text-emerald-600"],
                  ["Error Rows", "3", "text-red-500"],
                ].map((x) => (
                  <div key={x[0]} className="rounded-lg bg-slate-50 p-4">
                    <p className={`text-2xl font-extrabold ${x[2]}`}>{x[1]}</p>
                    <p className="mt-1 text-[10px] font-semibold text-slate-400">{x[0]}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xs font-extrabold text-slate-800">Row-level errors</h4>
              <div className="mt-3 space-y-2">
                {[
                  ["Row 18", "Ankit Sharma", "Base Price is required"],
                  ["Row 43", "Dev Patel", "Role “Opener/Bowler” is not valid"],
                  ["Row 69", "Samar Gupta", "Duplicate phone number"],
                ].map((e) => (
                  <div
                    key={e[0]}
                    className="grid grid-cols-[70px_1fr_1.5fr] items-center rounded-lg border border-red-100 bg-red-50/50 px-4 py-3 text-[10px]"
                  >
                    <b className="text-red-600">{e[0]}</b>
                    <span className="font-bold text-slate-700">{e[1]}</span>
                    <span className="text-red-600">{e[2]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between border-t border-slate-100 pt-5">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600"
                >
                  Upload Another File
                </button>
                <button
                  onClick={done}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white"
                >
                  <Icon name="check" size={15} /> Import 71 Valid Records
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
