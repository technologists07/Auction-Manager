import { Icon } from "./Icon";

export function Header({
  title,
  dark,
  onTheme,
  onMenu,
}: {
  title: string;
  dark: boolean;
  onTheme: () => void;
  onMenu?: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-8 backdrop-blur">
      <div className="flex items-center gap-4">
        <button onClick={onMenu} className="hidden">
          <Icon name="menu" />
        </button>
        <div>
          <p className="text-[11px] font-semibold text-slate-400">GREEN MEADOWS APARTMENT</p>
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onTheme}
          aria-label="Toggle color theme"
          className="flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 text-[10px] font-bold text-slate-600 transition hover:border-emerald-300"
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full ${
              dark ? "bg-slate-800 text-amber-300" : "bg-white text-amber-500 shadow-sm"
            }`}
          >
            {dark ? "D" : "L"}
          </span>
          {dark ? "Dark" : "Light"}
        </button>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50">
          <Icon name="bell" size={18} />
          <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <div className="h-7 w-px bg-slate-200" />
        <div className="text-right">
          <p className="text-xs font-bold text-slate-800">Sports Club</p>
          <p className="text-[10px] text-slate-400">2025 Season</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-black text-white">
          GM
        </div>
      </div>
    </header>
  );
}
