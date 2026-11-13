import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";
import { useAuction } from "../context/AuctionContext";

interface ParsedRow {
  rowNum: number;
  name: string;
  role: string;
  base_price: number;
  error?: string;
}

export function ImportPlayersPage({ done }: { done: () => void }) {
  const { importPlayersBatch } = useAuction();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [importing, setImporting] = useState(false);

  const validRows = rows.filter((r) => !r.error);
  const errorRows = rows.filter((r) => Boolean(r.error));

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      { name: "Virat Sharma", role: "Batsman", base_price: 5000 },
      { name: "Rahul Nair", role: "All-rounder", base_price: 4000 },
      { name: "Vikram Patel", role: "Fast Bowler", base_price: 3500 },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Players");
    XLSX.writeFile(wb, "players_template.xlsx");
  };

  const handleFile = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, { defval: "" });

    const parsed: ParsedRow[] = rawRows.map((record, i) => {
      const entries = Object.entries(record).map(([k, v]) => [k.trim().toLowerCase(), v] as const);
      const findVal = (keywords: string[]) =>
        entries.find(([k]) => keywords.some((kw) => k.includes(kw)))?.[1];

      const name = String(findVal(["name", "player"]) ?? "").trim();
      const role = String(findVal(["role", "position", "type"]) ?? "").trim() || "All-rounder";
      const rawPrice = String(findVal(["price", "base", "amount"]) ?? "3000");
      const base_price = Number(rawPrice.replace(/[^0-9.]/g, ""));

      let error: string | undefined;
      if (!name) error = "Player name is required";
      else if (Number.isNaN(base_price) || base_price <= 0) error = "Valid Base Price is required";

      return { rowNum: i + 2, name: name || "(Empty)", role, base_price: base_price || 0, error };
    });

    setFileName(file.name);
    setRows(parsed);
    setStep(2);
  };

  const commitImport = async () => {
    if (validRows.length === 0) return;
    setImporting(true);
    try {
      await importPlayersBatch(
        validRows.map((r) => ({ name: r.name, role: r.role, base_price: r.base_price })),
      );
      done();
    } finally {
      setImporting(false);
    }
  };

  return (
    <main className="p-8">
      <PageTitle
        title="Import Players"
        description="Upload an Excel (.xlsx, .xls) or .csv file to validate and import players into Supabase."
      />
      <div className="mx-auto max-w-4xl">
        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
          }}
        />

        {step === 1 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 px-8 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                <Icon name="upload" size={25} />
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                Upload your Excel or CSV file
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                Supports .xlsx, .xls, and .csv with columns: name, role, base_price
              </p>
              <button
                onClick={() => fileRef.current?.click()}
                className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-200"
              >
                Browse Excel / CSV File
              </button>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-xs font-bold text-slate-700">Need the correct format?</p>
                <p className="mt-1 text-[10px] text-slate-400">
                  Download our Excel (.xlsx) template with the required columns.
                </p>
              </div>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold text-slate-600"
              >
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
                  <p className="mt-1 text-[11px] text-slate-400">{fileName}</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold text-amber-700">
                  {errorRows.length} rows need attention
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ["Records Found", String(rows.length), "text-slate-900"],
                  ["Valid Rows", String(validRows.length), "text-emerald-600"],
                  ["Error Rows", String(errorRows.length), "text-red-500"],
                ].map((x) => (
                  <div key={x[0]} className="rounded-lg bg-slate-50 p-4">
                    <p className={`text-2xl font-extrabold ${x[2]}`}>{x[1]}</p>
                    <p className="mt-1 text-[10px] font-semibold text-slate-400">{x[0]}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              {errorRows.length > 0 && (
                <div className="mb-5 space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-800">Row-level errors</h4>
                  {errorRows.map((e) => (
                    <div
                      key={e.rowNum}
                      className="grid grid-cols-[70px_1fr_1.5fr] items-center rounded-lg border border-red-100 bg-red-50/50 px-4 py-3 text-[10px]"
                    >
                      <b className="text-red-600">Row {e.rowNum}</b>
                      <span className="font-bold text-slate-700">{e.name}</span>
                      <span className="text-red-600">{e.error}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between border-t border-slate-100 pt-5">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600"
                >
                  Upload Another File
                </button>
                <button
                  disabled={importing || validRows.length === 0}
                  onClick={() => void commitImport()}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white disabled:opacity-45"
                >
                  <Icon name="check" size={15} />
                  {importing ? "Importing..." : `Import ${validRows.length} Valid Records`}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
