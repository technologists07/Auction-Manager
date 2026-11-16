import { Icon } from "./Icon";

export function Header({
  title,
  onMenu,
}: {
  title: string;
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
    </header>
  );
}
