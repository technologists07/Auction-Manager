import { useEffect, useState } from "react";
import { Icon } from "../components/Icon";
import { PageTitle } from "../components/PageTitle";
import { formatINR, useAuction } from "../context/AuctionContext";
import { playerImages } from "../data/mockData";
import { DbPlayer } from "../types/auction";

export function QueuePage({ start }: { start: () => void }) {
  const { players, saveQueueOrder } = useAuction();
  const [queue, setQueue] = useState<DbPlayer[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setQueue(
      players
        .filter((p) => p.status === "queued")
        .sort((a, b) => a.queue_order - b.queue_order),
    );
  }, [players]);

  const persist = async (next: DbPlayer[]) => {
    setQueue(next);
    setSaving(true);
    try {
      await saveQueueOrder(next.map((p) => p.id));
    } finally {
      setSaving(false);
    }
  };

  const move = (i: number, delta: number) => {
    const next = [...queue];
    const j = i + delta;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    void persist(next);
  };

  const dropAt = (target: number) => {
    if (dragging === null || dragging === target) return;
    const next = [...queue];
    const [item] = next.splice(dragging, 1);
    next.splice(target, 0, item);
    setDragging(null);
    void persist(next);
  };

  return (
    <main className="p-8">
      <PageTitle
        title="Auction Queue"
        description="Arrange the player order for the live auction (saved automatically to Supabase)."
        action={
          <button
            onClick={start}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white"
          >
            <Icon name="play" size={15} /> Open Auction Room
          </button>
        }
      />

      <div className="grid grid-cols-[1.35fr_.65fr] gap-5">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Auction Order {saving ? "• Saving..." : ""}
              </h3>
              <p className="mt-1 text-[10px] text-slate-400">
                Drag rows or use arrow controls to reorder
              </p>
            </div>
            <button
              onClick={() => void persist([...queue].sort(() => Math.random() - 0.5))}
              className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600"
            >
              Shuffle Queue
            </button>
          </div>

          {queue.length === 0 ? (
            <div className="p-10 text-center text-xs text-slate-400">
              No queued players yet. Add or import players first.
            </div>
          ) : (
            <div>
              {queue.map((p, i) => (
                <div
                  draggable
                  onDragStart={() => setDragging(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => dropAt(i)}
                  onDragEnd={() => setDragging(null)}
                  key={p.id}
                  className={`grid grid-cols-[50px_1fr_1fr_100px] items-center border-t border-slate-100 px-5 py-3 text-xs hover:bg-slate-50 ${
                    dragging === i ? "opacity-40" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="cursor-grab text-base">≡</span>
                    <b>#{i + 1}</b>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={playerImages[i % playerImages.length]}
                      className="h-9 w-9 rounded-lg object-cover"
                      alt=""
                    />
                    <b className="text-slate-800">{p.name}</b>
                  </div>
                  <span className="text-slate-500">{p.role}</span>
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => move(i, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-500"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-500"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900">Up Next</h3>
          <p className="mt-1 text-[10px] text-slate-400">Upcoming players preview</p>
          <div className="mt-4 space-y-3">
            {queue.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className={`flex items-center gap-3 rounded-xl p-3 ${
                  i === 0 ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-slate-50"
                }`}
              >
                <span className="text-[10px] font-black text-slate-400">#{i + 1}</span>
                <div>
                  <p className="text-[11px] font-bold text-slate-800">{p.name}</p>
                  <p className="text-[9px] text-slate-400">
                    {p.role} • {formatINR(p.base_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-slate-900 p-4 text-white">
            <p className="text-[9px] uppercase tracking-wider text-slate-400">Queue status</p>
            <p className="mt-2 text-xl font-black">{queue.length} players</p>
          </div>
        </section>
      </div>
    </main>
  );
}
