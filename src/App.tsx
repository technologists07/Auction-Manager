import { useMemo, useState } from "react";

type Screen =
  | "dashboard"
  | "tournaments"
  | "command"
  | "players"
  | "import"
  | "team"
  | "queue"
  | "auction"
  | "projector"
  | "reports"
  | "settings";

type IconName =
  | "grid"
  | "trophy"
  | "users"
  | "shield"
  | "list"
  | "gavel"
  | "chart"
  | "settings"
  | "bell"
  | "search"
  | "plus"
  | "arrow"
  | "calendar"
  | "upload"
  | "filter"
  | "more"
  | "wallet"
  | "user"
  | "clock"
  | "chevron"
  | "close"
  | "check"
  | "bolt"
  | "undo"
  | "play"
  | "trend"
  | "bat"
  | "menu";

function Icon({
  name,
  size = 18,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
        <path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    list: (
      <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <path d="M3 6h.01M3 12h.01M3 18h.01" />
      </>
    ),
    gavel: (
      <>
        <path d="m14 13-7.5 7.5a2.1 2.1 0 0 1-3-3L11 10" />
        <path d="m16 16 6-6M8 8l6-6 4 4-6 6zM13 3l5 5" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 16 4-5 4 3 5-7" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.83 2.83-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21h-4v-.09a1.65 1.65 0 0 0-1.08-1.5 1.65 1.65 0 0 0-1.82.33l-.06.06-2.83-2.83.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3v-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06 2.83-2.83.06.06A1.65 1.65 0 0 0 9 4.6h.08a1.65 1.65 0 0 0 1-1.51V3h4v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06 2.83 2.83-.06.06A1.65 1.65 0 0 0 19.4 9v.08a1.65 1.65 0 0 0 1.51 1H21v4h-.09A1.65 1.65 0 0 0 19.4 15Z" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    ),
    upload: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
      </>
    ),
    filter: <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
    wallet: (
      <>
        <path d="M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v12H5a3 3 0 0 1-3-3V6" />
        <path d="M16 13h2" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    close: (
      <>
        <path d="M18 6 6 18M6 6l12 12" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />,
    undo: (
      <>
        <path d="M9 7 4 12l5 5" />
        <path d="M20 17a8 8 0 0 0-12-5H4" />
      </>
    ),
    play: <path d="m9 18 6-6-6-6v12Z" />,
    trend: (
      <>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M14 7h7v7" />
      </>
    ),
    bat: (
      <>
        <path d="M14 3c3-2 6 1 4 4L9 16l-3-3 8-10Z" />
        <path d="m5 14-2 5 2 2 5-2" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

const playerImages = [
  "https://images.unsplash.com/photo-1644984785609-676ed703333e?auto=format&fit=crop&w=300&q=85",
  "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=300&q=85",
  "https://images.unsplash.com/photo-1593341646647-75b32930e4a1?auto=format&fit=crop&w=300&q=85",
  "https://images.unsplash.com/photo-1643294358128-0d2da3b4ea7a?auto=format&fit=crop&w=300&q=85",
];

const tournamentNav: { label: string; icon: IconName; screen: Screen }[] = [
  { label: "Overview", icon: "grid", screen: "command" },
  { label: "Players", icon: "users", screen: "players" },
  { label: "Teams", icon: "shield", screen: "team" },
  { label: "Auction Queue", icon: "list", screen: "queue" },
  { label: "Auction Room", icon: "gavel", screen: "auction" },
  { label: "Reports", icon: "chart", screen: "reports" },
];

const teams = [
  {
    name: "Thunder Kings",
    short: "TK",
    owner: "Arjun Mehta",
    purse: "₹71,500",
    players: 7,
    color: "#2459d3",
    spend: "₹28,500",
    accent: "from-blue-600 to-blue-400",
  },
  {
    name: "Royal Strikers",
    short: "RS",
    owner: "Neha Kapoor",
    purse: "₹64,000",
    players: 8,
    color: "#7c3aed",
    spend: "₹36,000",
    accent: "from-violet-600 to-fuchsia-500",
  },
  {
    name: "Green Warriors",
    short: "GW",
    owner: "Vikram Shah",
    purse: "₹82,500",
    players: 5,
    color: "#12985b",
    spend: "₹17,500",
    accent: "from-emerald-600 to-teal-400",
  },
  {
    name: "Sky Blazers",
    short: "SB",
    owner: "Rhea Iyer",
    purse: "₹48,000",
    players: 9,
    color: "#e06822",
    spend: "₹52,000",
    accent: "from-orange-500 to-amber-400",
  },
];

const players = [
  {
    name: "Rohan Verma",
    role: "All-rounder",
    price: "₹5,000",
    status: "Available",
    image: playerImages[0],
  },
  {
    name: "Karan Malhotra",
    role: "Batsman",
    price: "₹4,000",
    status: "Available",
    image: playerImages[1],
  },
  {
    name: "Aditya Rao",
    role: "Fast Bowler",
    price: "₹3,500",
    status: "Sold",
    image: playerImages[2],
  },
  {
    name: "Siddharth Jain",
    role: "Wicket-keeper",
    price: "₹4,500",
    status: "Available",
    image: playerImages[3],
  },
  {
    name: "Manav Desai",
    role: "Spin Bowler",
    price: "₹3,000",
    status: "Sold",
    image: playerImages[1],
  },
];

function Sidebar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (label: string, screen: Screen) => void;
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[236px] flex-col border-r border-slate-200 bg-white">
      <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
          <Icon name="bat" size={21} />
        </div>
        <div>
          <div className="text-[15px] font-extrabold tracking-tight text-slate-900">
            Auction<span className="text-emerald-600">Pro</span>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">
            Sports Manager
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">
          Workspace
        </p>
        {[
          { label: "Dashboard", icon: "grid" as IconName, screen: "dashboard" as Screen },
          { label: "Tournaments", icon: "trophy" as IconName, screen: "tournaments" as Screen },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label, item.screen)}
            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition ${active === item.label ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
          >
            <Icon
              name={item.icon}
              size={18}
              className={
                active === item.label
                  ? "text-emerald-600"
                  : "text-slate-400 group-hover:text-slate-600"
              }
            />
            {item.label}
          </button>
        ))}
        <div className="mx-1 my-4 border-t border-slate-100" />
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">
          Current Tournament
        </p>
        <button
          onClick={() => onNavigate("Overview", "command")}
          className="mb-2 flex w-full items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-left"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Icon name="trophy" size={17} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-extrabold text-emerald-900">Green Meadows PL</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[9px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Auction in progress
            </p>
          </div>
          <Icon name="chevron" size={13} className="text-emerald-500" />
        </button>
        <div className="space-y-0.5 border-l border-slate-200 pl-2">
          {tournamentNav.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label, item.screen)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] font-semibold transition ${active === item.label ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Icon
                name={item.icon}
                size={16}
                className={active === item.label ? "text-emerald-600" : "text-slate-400"}
              />
              {item.label}
              {item.label === "Auction Room" && (
                <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-red-500" />
              )}
            </button>
          ))}
        </div>
        <div className="mx-1 my-4 border-t border-slate-100" />
        <button
          onClick={() => onNavigate("Settings", "settings")}
          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold ${active === "Settings" ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50"}`}
        >
          <Icon name="settings" size={18} className="text-slate-400" />
          Settings
        </button>
      </nav>
      <div className="m-4 rounded-xl bg-slate-900 p-4 text-white">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> GMPL 2027
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Auction is live with 4 teams participating.
        </p>
        <button
          onClick={() => onNavigate("Auction Room", "auction")}
          className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400"
        >
          Enter room <Icon name="arrow" size={13} />
        </button>
      </div>
      <div className="flex items-center gap-3 border-t border-slate-100 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700">
          RM
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-slate-800">Rahul Mehta</p>
          <p className="text-[10px] text-slate-400">Administrator</p>
        </div>
        <Icon name="more" size={17} className="text-slate-400" />
      </div>
    </aside>
  );
}

function Header({
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
            className={`flex h-5 w-5 items-center justify-center rounded-full ${dark ? "bg-slate-800 text-amber-300" : "bg-white text-amber-500 shadow-sm"}`}
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

function StatCard({
  title,
  value,
  change,
  icon,
  tone,
}: {
  title: string;
  value: string;
  change: string;
  icon: IconName;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}>
          <Icon name={icon} size={19} />
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
          <Icon name="trend" size={12} />
          {change}
        </span>
      </div>
      <p className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{title}</p>
    </div>
  );
}

function Dashboard({
  openModal,
  navigate,
}: {
  openModal: () => void;
  navigate: (label: string, screen: Screen) => void;
}) {
  const tournaments = [
    ["Green Meadows Premier League", "Cricket", "8 Teams", "Live"],
    ["Monsoon Cricket Cup 2025", "Cricket", "6 Teams", "Upcoming"],
    ["Summer Smash League", "Cricket", "10 Teams", "Completed"],
    ["Weekend Box Cricket", "Box Cricket", "6 Teams", "Draft"],
  ];
  return (
    <main className="p-8">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Community Sports Auction Manager
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Run fair, fast and engaging cricket auctions for your community.
          </p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
        >
          <Icon name="plus" size={17} /> Create Tournament
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Tournaments"
          value="12"
          change="+2 this month"
          icon="trophy"
          tone="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Total Teams"
          value="38"
          change="+8.2%"
          icon="shield"
          tone="bg-violet-50 text-violet-600"
        />
        <StatCard
          title="Registered Players"
          value="264"
          change="+12.5%"
          icon="users"
          tone="bg-amber-50 text-amber-600"
        />
        <div
          onClick={() => navigate("Auction Room", "auction")}
          className="cursor-pointer rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 p-5 text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
              <Icon name="gavel" size={19} />
            </div>
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-300" /> Live
            </span>
          </div>
          <p className="mt-5 text-2xl font-extrabold tracking-tight">1 Active</p>
          <p className="mt-1 text-xs font-medium text-emerald-100">Green Meadows Premier League</p>
        </div>
      </div>
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-emerald-600">
              Current Tournament
            </p>
            <button
              onClick={() => navigate("Overview", "command")}
              className="mt-1 flex items-center gap-2 text-lg font-extrabold text-slate-900"
            >
              Green Meadows Premier League 2027 <Icon name="arrow" size={16} />
            </button>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Auction In Progress
          </span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            ["Create Tournament", "trophy", () => openModal()],
            ["Import Players", "upload", () => navigate("Players", "import")],
            ["Create Teams", "shield", () => navigate("Teams", "team")],
            ["Start Auction", "gavel", () => navigate("Auction Room", "auction")],
          ].map(([label, icon, action]) => (
            <button
              key={label as string}
              onClick={action as () => void}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left text-xs font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                <Icon name={icon as IconName} size={16} />
              </span>
              {label as string}
            </button>
          ))}
        </div>
      </section>
      <div className="mt-6 grid grid-cols-[1.7fr_1fr] gap-5">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Recent Tournaments</h3>
              <p className="mt-1 text-[11px] text-slate-400">Manage your latest sports events</p>
            </div>
            <button
              onClick={() => navigate("Tournaments", "tournaments")}
              className="flex items-center gap-1 text-[11px] font-bold text-emerald-600"
            >
              View all <Icon name="arrow" size={13} />
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Tournament Name</th>
                <th className="px-4 py-3">Sport</th>
                <th className="px-4 py-3">Teams</th>
                <th className="px-4 py-3">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tournaments.map((row, i) => (
                <tr
                  onClick={() => i === 0 && navigate("Overview", "command")}
                  key={row[0]}
                  className="cursor-pointer border-t border-slate-100 text-xs hover:bg-slate-50/60"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${i === 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                      >
                        <Icon name="trophy" size={15} />
                      </div>
                      <span className="font-bold text-slate-800">{row[0]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{row[1]}</td>
                  <td className="px-4 py-4 font-semibold text-slate-600">{row[2]}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${row[3] === "Live" ? "bg-emerald-50 text-emerald-700" : row[3] === "Upcoming" ? "bg-blue-50 text-blue-600" : row[3] === "Completed" ? "bg-slate-100 text-slate-500" : "bg-amber-50 text-amber-600"}`}
                    >
                      {row[3]}
                    </span>
                  </td>
                  <td className="px-4">
                    <Icon name="more" size={16} className="text-slate-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Auction Overview</h3>
              <p className="mt-1 text-[11px] text-slate-400">Live progress</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Icon name="chart" size={17} />
            </div>
          </div>
          <div
            className="mx-auto my-6 flex h-32 w-32 items-center justify-center rounded-full"
            style={{ background: "conic-gradient(#0d9f6e 68%, #e8edf1 0)" }}
          >
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
              <span className="text-2xl font-black text-slate-900">68%</span>
              <span className="text-[9px] font-semibold text-slate-400">COMPLETED</span>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-100 rounded-lg bg-slate-50 py-3 text-center">
            <div>
              <p className="text-sm font-extrabold text-slate-800">42</p>
              <p className="text-[9px] text-slate-400">Sold</p>
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-800">8</p>
              <p className="text-[9px] text-slate-400">Unsold</p>
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-800">24</p>
              <p className="text-[9px] text-slate-400">Pending</p>
            </div>
          </div>
          <button
            onClick={() => navigate("Auction Room", "auction")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
          >
            Open Auction Room <Icon name="arrow" size={14} />
          </button>
        </section>
      </div>
    </main>
  );
}

function TournamentModal({ onClose }: { onClose: () => void }) {
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

function Management({ navigate }: { navigate: (label: string, screen: Screen) => void }) {
  const [query, setQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<(typeof teams)[0] | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const filtered = players.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.role.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Players & Teams</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage registrations, rosters and team budgets for the live tournament.
        </p>
      </div>
      <div className="grid grid-cols-[1.25fr_.75fr] gap-5">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Players</h3>
                <p className="mt-1 text-[11px] text-slate-400">264 players registered</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("Players", "import")}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50"
                >
                  <Icon name="upload" size={15} />
                  Import Excel
                </button>
                <button
                  onClick={() => setAddOpen(!addOpen)}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-bold text-white hover:bg-emerald-700"
                >
                  <Icon name="plus" size={15} />
                  Add Player
                </button>
              </div>
            </div>
            {addOpen && (
              <div className="mt-4 flex gap-2 rounded-lg bg-emerald-50 p-3">
                <input
                  autoFocus
                  className="min-w-0 flex-1 rounded-md border border-emerald-200 bg-white px-3 text-xs outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="Player name"
                />
                <select className="rounded-md border border-emerald-200 bg-white px-3 text-xs">
                  <option>Batsman</option>
                  <option>Bowler</option>
                  <option>All-rounder</option>
                </select>
                <button
                  onClick={() => setAddOpen(false)}
                  className="rounded-md bg-emerald-600 px-4 py-2 text-[10px] font-bold text-white"
                >
                  Save
                </button>
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Icon name="search" size={16} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Search players by name or role..."
                />
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 text-[11px] font-bold text-slate-500">
                <Icon name="filter" size={14} />
                Filter
              </button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Player</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Base Price</th>
                <th className="px-3 py-3">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.name} className="border-t border-slate-100 text-xs hover:bg-slate-50/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-slate-800">{p.name}</p>
                        <p className="text-[9px] text-slate-400">GM-{players.indexOf(p) + 101}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-500">{p.role}</td>
                  <td className="px-3 py-3 font-bold text-slate-700">{p.price}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-bold ${p.status === "Available" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-600"}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="pr-4 text-slate-400">
                    <Icon name="more" size={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-[10px] text-slate-400">
            <span>Showing 1–{filtered.length} of 264 players</span>
            <div className="flex gap-1">
              <button className="rounded border border-slate-200 px-2 py-1">‹</button>
              <button className="rounded bg-emerald-600 px-2.5 py-1 font-bold text-white">1</button>
              <button className="rounded border border-slate-200 px-2.5 py-1">2</button>
              <button className="rounded border border-slate-200 px-2 py-1">›</button>
            </div>
          </div>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Teams</h3>
              <p className="mt-1 text-[11px] text-slate-400">4 teams competing</p>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500">
              <Icon name="plus" size={15} />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {teams.map((team) => (
              <button
                key={team.name}
                onClick={() => navigate("Teams", "team")}
                className="group w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${team.accent} text-xs font-black text-white shadow-sm`}
                  >
                    {team.short}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-800">{team.name}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Owner: {team.owner}</p>
                  </div>
                  <Icon
                    name="chevron"
                    size={16}
                    className="text-slate-300 group-hover:text-emerald-500"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 divide-x divide-slate-100 rounded-lg bg-slate-50 py-2.5">
                  <div className="px-3">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Remaining Purse
                    </p>
                    <p className="mt-1 text-sm font-extrabold" style={{ color: team.color }}>
                      {team.purse}
                    </p>
                  </div>
                  <div className="px-3">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                      Players
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-slate-800">
                      {team.players}{" "}
                      <span className="text-[9px] font-medium text-slate-400">/ 11</span>
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
      {selectedTeam && <TeamDrawer team={selectedTeam} onClose={() => setSelectedTeam(null)} />}
    </main>
  );
}

function TeamDrawer({ team, onClose }: { team: (typeof teams)[0]; onClose: () => void }) {
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px]" />
      <aside className="fixed inset-y-0 right-0 z-50 w-[410px] overflow-y-auto bg-white shadow-2xl">
        <div className={`bg-gradient-to-br ${team.accent} p-6 text-white`}>
          <div className="flex justify-between">
            <span className="rounded-full bg-white/15 px-3 py-1 text-[9px] font-bold uppercase tracking-wider">
              Team Details
            </span>
            <button onClick={onClose} className="rounded-lg bg-white/10 p-2">
              <Icon name="close" size={18} />
            </button>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-lg font-black ring-1 ring-white/30">
              {team.short}
            </div>
            <div>
              <h2 className="text-2xl font-black">{team.name}</h2>
              <p className="mt-1 text-xs text-white/70">Owned by {team.owner}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <Icon name="wallet" className="text-blue-500" />
              <p className="mt-4 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Total Spend
              </p>
              <p className="mt-1 text-lg font-extrabold text-slate-900">{team.spend}</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <Icon name="trend" className="text-emerald-500" />
              <p className="mt-4 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Purse Left
              </p>
              <p className="mt-1 text-lg font-extrabold text-emerald-600">{team.purse}</p>
            </div>
          </div>
          <div className="mt-7 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900">Squad Composition</h3>
            <span className="text-[10px] font-bold text-slate-400">{team.players}/11 players</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${(team.players / 11) * 100}%` }}
            />
          </div>
          <div className="mt-5 space-y-3">
            {["Batsmen", "All-rounders", "Bowlers", "Wicket-keepers"].map((role, i) => (
              <div
                key={role}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
                    <Icon name={i === 2 ? "bolt" : "user"} size={15} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{role}</span>
                </div>
                <span className="text-sm font-extrabold text-slate-800">{[3, 2, 2, 1][i]}</span>
              </div>
            ))}
          </div>
          <button className="mt-7 w-full rounded-lg border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50">
            View Full Team Profile
          </button>
        </div>
      </aside>
    </>
  );
}

function PageTitle({
  eyebrow = "Green Meadows Premier League 2027",
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-emerald-600">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function TournamentsPage({
  openModal,
  navigate,
}: {
  openModal: () => void;
  navigate: (label: string, screen: Screen) => void;
}) {
  const items = [
    ["Green Meadows Premier League 2027", "Auction In Progress", "8", "74", "18 Mar 2027"],
    ["Monsoon Cricket Cup 2027", "Ready", "6", "66", "12 Jul 2027"],
    ["Summer Smash League 2026", "Completed", "10", "108", "22 May 2026"],
    ["Weekend Box Cricket 2027", "Draft", "6", "42", "Not scheduled"],
  ];
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
        {items.map((item, i) => (
          <button
            key={item[0]}
            onClick={() => i === 0 && navigate("Overview", "command")}
            className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${i === 0 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                <Icon name="trophy" size={20} />
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${item[1] === "Auction In Progress" ? "bg-emerald-50 text-emerald-700" : item[1] === "Ready" ? "bg-blue-50 text-blue-600" : item[1] === "Completed" ? "bg-slate-100 text-slate-500" : "bg-amber-50 text-amber-600"}`}
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

function CommandCenter({ navigate }: { navigate: (label: string, screen: Screen) => void }) {
  const actions: [string, IconName, Screen][] = [
    ["Import Players", "upload", "import"],
    ["Manage Teams", "shield", "team"],
    ["Configure Queue", "list", "queue"],
    ["Start Auction", "gavel", "auction"],
  ];
  return (
    <main className="p-8">
      <PageTitle
        title="Tournament Command Center"
        description="Everything you need to prepare, run and monitor this community auction."
        action={
          <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Auction In
            Progress
          </span>
        }
      />
      <section className="overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-emerald-400">
              Cricket • Season 2027
            </p>
            <h3 className="mt-2 text-2xl font-black">Green Meadows Premier League 2027</h3>
            <p className="mt-2 text-xs text-slate-400">
              8 teams • 74 registered players • Auction started 18 March 2027
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Auction progress</p>
            <p className="mt-1 text-3xl font-black text-emerald-400">68%</p>
            <div className="mt-2 h-1.5 w-40 rounded-full bg-slate-700">
              <div className="h-full w-[68%] rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>
      </section>
      <div className="mt-5 grid grid-cols-5 gap-4">
        {[
          ["Teams Created", "8 / 8", "shield", "bg-blue-50 text-blue-600"],
          ["Registered Players", "74", "users", "bg-violet-50 text-violet-600"],
          ["Sold Players", "42", "check", "bg-emerald-50 text-emerald-600"],
          ["Remaining Players", "24", "clock", "bg-amber-50 text-amber-600"],
          ["Remaining Purse", "₹5.32L", "wallet", "bg-cyan-50 text-cyan-600"],
        ].map(([label, value, icon, tone]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
              <Icon name={icon as IconName} size={17} />
            </div>
            <p className="mt-4 text-xl font-extrabold text-slate-900">{value}</p>
            <p className="mt-1 text-[10px] font-semibold text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-[1fr_1.25fr] gap-5">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900">Quick Actions</h3>
          <p className="mt-1 text-[10px] text-slate-400">Tournament-specific operations</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {actions.map(([label, icon, screen]) => (
              <button
                key={label}
                onClick={() => navigate(label, screen)}
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left text-xs font-bold text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-emerald-600">
                  <Icon name={icon} size={17} />
                </span>
                {label}
              </button>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Recent Auction Activity</h3>
              <p className="mt-1 text-[10px] text-slate-400">Live transaction feed</p>
            </div>
            <span className="rounded-full bg-red-50 px-2 py-1 text-[8px] font-black text-red-600">
              LIVE
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["Rohan Verma", "Sold to Thunder Kings", "₹8,500", "Just now"],
              ["Aditya Rao", "Sold to Royal Strikers", "₹12,000", "2 min ago"],
              ["Nikhil Bhat", "Marked unsold", "₹3,000", "4 min ago"],
              ["Karan Malhotra", "Sold to Green Warriors", "₹9,500", "7 min ago"],
            ].map((a, i) => (
              <div key={a[0]} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                <img src={playerImages[i % 4]} className="h-9 w-9 rounded-lg object-cover" alt="" />
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-slate-800">{a[0]}</p>
                  <p className="text-[9px] text-slate-400">
                    {a[1]} • {a[3]}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-slate-800">{a[2]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function TeamDetailPage() {
  const team = teams[0];
  const bought = [
    ["Rohan Verma", "All-rounder", "₹8,500", playerImages[0]],
    ["Karan Malhotra", "Batsman", "₹7,000", playerImages[1]],
    ["Aditya Rao", "Fast Bowler", "₹5,500", playerImages[2]],
    ["Siddharth Jain", "Wicket-keeper", "₹4,500", playerImages[3]],
  ];
  return (
    <main className="p-8">
      <PageTitle
        title="Team Detail"
        description="Squad, spending and role composition for Thunder Kings."
      />
      <section className={`rounded-xl bg-gradient-to-r ${team.accent} p-6 text-white shadow-lg`}>
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black ring-1 ring-white/30">
            {team.short}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
              Team Profile
            </p>
            <h2 className="mt-1 text-3xl font-black">{team.name}</h2>
            <div className="mt-2 flex gap-5 text-xs text-white/80">
              <span>
                Owner: <b className="text-white">Arjun Mehta</b>
              </span>
              <span>
                Captain: <b className="text-white">Rohan Verma</b>
              </span>
              <span className="flex items-center gap-1.5">
                Color: <i className="h-3 w-3 rounded-full bg-blue-300" /> Royal Blue
              </span>
            </div>
          </div>
          <button className="rounded-lg bg-white/15 px-4 py-2 text-xs font-bold ring-1 ring-white/20">
            Edit Team
          </button>
        </div>
      </section>
      <div className="mt-5 grid grid-cols-4 gap-4">
        {[
          ["Initial Purse", "₹1,00,000"],
          ["Remaining Purse", "₹71,500"],
          ["Total Spend", "₹28,500"],
          ["Players Purchased", "7 / 11"],
        ].map(([l, v], i) => (
          <div key={l} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{l}</p>
            <p
              className={`mt-2 text-2xl font-extrabold ${i === 1 ? "text-emerald-600" : "text-slate-900"}`}
            >
              {v}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-[.7fr_1.3fr] gap-5">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900">Role Distribution</h3>
          <p className="mt-1 text-[10px] text-slate-400">Current squad balance</p>
          <div className="mt-5 space-y-4">
            {[
              ["Batsmen", 3, "bg-blue-500"],
              ["Bowlers", 2, "bg-emerald-500"],
              ["All Rounders", 1, "bg-violet-500"],
              ["Wicket Keepers", 1, "bg-amber-500"],
            ].map(([r, n, c]) => (
              <div key={r as string}>
                <div className="flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-600">{r}</span>
                  <b className="text-slate-800">{n}</b>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${c}`}
                    style={{ width: `${Number(n) * 25}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="p-5">
            <h3 className="text-sm font-extrabold text-slate-900">Purchased Players</h3>
            <p className="mt-1 text-[10px] text-slate-400">Players secured during the auction</p>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Player</th>
                <th>Role</th>
                <th>Purchase Price</th>
              </tr>
            </thead>
            <tbody>
              {bought.map((p) => (
                <tr key={p[0]} className="border-t border-slate-100 text-xs">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p[3]} className="h-9 w-9 rounded-lg object-cover" alt="" />
                      <b className="text-slate-800">{p[0]}</b>
                    </div>
                  </td>
                  <td className="text-slate-500">{p[1]}</td>
                  <td className="font-extrabold text-slate-800">{p[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}

function ImportPlayers({ done }: { done: () => void }) {
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
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step === 2 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}
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

function QueuePage({ start }: { start: () => void }) {
  const initial = players.concat([
    {
      name: "Nikhil Bhat",
      role: "Batsman",
      price: "₹3,000",
      status: "Available",
      image: playerImages[2],
    },
    {
      name: "Dev Patel",
      role: "All-rounder",
      price: "₹4,000",
      status: "Available",
      image: playerImages[3],
    },
  ]);
  const [queue, setQueue] = useState(initial);
  const [dragging, setDragging] = useState<number | null>(null);
  const move = (i: number, delta: number) => {
    const next = [...queue];
    const j = i + delta;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setQueue(next);
  };
  const dropAt = (target: number) => {
    if (dragging === null || dragging === target) return;
    const next = [...queue];
    const [item] = next.splice(dragging, 1);
    next.splice(target, 0, item);
    setQueue(next);
    setDragging(null);
  };
  return (
    <main className="p-8">
      <PageTitle
        title="Auction Queue"
        description="Arrange the player order for the live auction."
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
              <h3 className="text-sm font-extrabold text-slate-900">Auction Order</h3>
              <p className="mt-1 text-[10px] text-slate-400">
                Drag rows or use arrow controls to reorder
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setQueue([...queue].sort(() => Math.random() - 0.5))}
                className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600"
              >
                Shuffle Queue
              </button>
              <button
                onClick={() => setQueue(initial)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600"
              >
                Reset Queue
              </button>
            </div>
          </div>
          <div>
            {queue.map((p, i) => (
              <div
                draggable
                onDragStart={() => setDragging(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => dropAt(i)}
                onDragEnd={() => setDragging(null)}
                key={p.name}
                className={`grid grid-cols-[50px_1fr_1fr_100px] items-center border-t border-slate-100 px-5 py-3 text-xs hover:bg-slate-50 ${dragging === i ? "opacity-40" : ""}`}
              >
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="cursor-grab text-base">≡</span>
                  <b>#{i + 1}</b>
                </div>
                <div className="flex items-center gap-3">
                  <img src={p.image} className="h-9 w-9 rounded-lg object-cover" alt="" />
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
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900">Up Next</h3>
          <p className="mt-1 text-[10px] text-slate-400">Upcoming players preview</p>
          <div className="mt-4 space-y-3">
            {queue.slice(0, 4).map((p, i) => (
              <div
                key={p.name}
                className={`flex items-center gap-3 rounded-xl p-3 ${i === 0 ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-slate-50"}`}
              >
                <span className="text-[10px] font-black text-slate-400">#{i + 1}</span>
                <img src={p.image} className="h-10 w-10 rounded-lg object-cover" alt="" />
                <div>
                  <p className="text-[11px] font-bold text-slate-800">{p.name}</p>
                  <p className="text-[9px] text-slate-400">
                    {p.role} • {p.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-slate-900 p-4 text-white">
            <p className="text-[9px] uppercase tracking-wider text-slate-400">Queue status</p>
            <p className="mt-2 text-xl font-black">{queue.length} players</p>
            <p className="mt-1 text-[9px] text-slate-400">Estimated duration: 1h 45m</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Auction({ projector }: { projector: () => void }) {
  const [bid, setBid] = useState(8500);
  const [count, setCount] = useState(12);
  const [leader, setLeader] = useState("Thunder Kings");
  const [custom, setCustom] = useState("");
  const [increment, setIncrement] = useState(500);
  const [timer, setTimer] = useState(18);
  const [status, setStatus] = useState("BIDDING OPEN");
  const history = useMemo(
    () => [
      {
        team: leader,
        amount: `₹${bid.toLocaleString("en-IN")}`,
        time: "Just now",
        color: "#2459d3",
      },
      { team: "Royal Strikers", amount: "₹8,000", time: "5 sec ago", color: "#7c3aed" },
      { team: "Thunder Kings", amount: "₹7,000", time: "9 sec ago", color: "#2459d3" },
      { team: "Green Warriors", amount: "₹6,000", time: "14 sec ago", color: "#12985b" },
    ],
    [bid, leader],
  );
  const placeBid = (amount?: number, teamName?: string) => {
    const next = custom ? Number(custom) : bid + (amount || increment);
    if (next > bid) {
      setBid(next);
      if (teamName) setLeader(teamName);
      setCount((c) => c + 1);
      setTimer(18);
      setStatus("BIDDING OPEN");
      setCustom("");
    }
  };
  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f3f6f8] p-5">
      <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black tracking-wider text-red-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            LIVE AUCTION
          </span>
          <div className="h-5 w-px bg-slate-200" />
          <div>
            <p className="text-xs font-extrabold text-slate-800">Green Meadows Premier League</p>
            <p className="text-[9px] text-slate-400">Player 51 of 74 • Round 4</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Auction Timer
          </span>
          <div
            className={`flex h-10 min-w-16 items-center justify-center gap-1.5 rounded-lg font-mono text-lg font-black ${timer < 10 ? "bg-red-50 text-red-600" : "bg-slate-900 text-white"}`}
          >
            <Icon name="clock" size={15} />
            {timer}s
          </div>
          <button
            onClick={() => setTimer(Math.max(0, timer - 1))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-500"
          >
            Tick
          </button>
          <button
            onClick={projector}
            className="rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-bold text-white"
          >
            Projector Mode
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[.75fr_1.4fr_.85fr] gap-4">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Current Player
            </h3>
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-600">
              #GM-151
            </span>
          </div>
          <div className="relative h-[245px] overflow-hidden bg-slate-100">
            <img
              src={playerImages[0]}
              alt="Rohan Verma playing cricket"
              className="h-full w-full object-cover object-[center_25%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-md bg-white/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-700">
              All-rounder
            </span>
          </div>
          <div className="p-5">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Rohan Verma</h2>
            <p className="mt-1 text-xs text-slate-400">Age 27 • Green Meadows A Wing</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Batting Style
                </p>
                <p className="mt-1.5 text-xs font-bold text-slate-700">Right Hand Bat</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Bowling Style
                </p>
                <p className="mt-1.5 text-xs font-bold text-slate-700">Right-arm Medium</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                  Base Price
                </p>
                <p className="mt-1 text-xl font-black text-emerald-700">₹5,000</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                <Icon name="wallet" size={18} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Previous Stats
                </p>
                <span className="text-[9px] text-slate-400">2026 season</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Runs", "286"],
                  ["Wickets", "14"],
                  ["S/R", "142"],
                ].map((s) => (
                  <div key={s[0]} className="rounded-lg bg-slate-50 p-2">
                    <p className="text-xs font-extrabold text-slate-800">{s[1]}</p>
                    <p className="text-[8px] text-slate-400">{s[0]}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Upcoming Players
              </p>
              <div className="mt-2 flex gap-2">
                {players.slice(1, 4).map((p, i) => (
                  <div
                    key={p.name}
                    className="min-w-0 flex-1 rounded-lg border border-slate-100 p-2 text-center"
                  >
                    <img
                      src={p.image}
                      className="mx-auto h-8 w-8 rounded-full object-cover"
                      alt=""
                    />
                    <p className="mt-1 truncate text-[8px] font-bold text-slate-700">
                      {p.name.split(" ")[0]}
                    </p>
                    <p className="text-[7px] text-slate-400">#{i + 2}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-slate-900 px-6 py-5 text-center text-white">
              <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {status}
              </div>
              <p className="mt-2 text-[42px] font-black tracking-tight">
                ₹{bid.toLocaleString("en-IN")}
              </p>
              <div className="mt-2 flex items-center justify-center gap-5 text-[10px] text-slate-400">
                <span>
                  Leading: <b className="text-white">{leader}</b>
                </span>
                <span className="h-3 w-px bg-slate-700" />
                <span>
                  Bid count: <b className="text-white">{count}</b>
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Place next bid
                </p>
                <p className="text-[10px] text-slate-400">
                  Min. ₹{(bid + 500).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {teams.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => placeBid(increment, t.name)}
                    className={`flex items-center gap-2.5 rounded-lg border p-3 text-left transition ${leader === t.name ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-200" : "border-slate-200 bg-slate-50 hover:border-emerald-300"}`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${t.accent} text-[8px] font-black text-white`}
                    >
                      {t.short}
                    </span>
                    <span>
                      <b className="block text-[10px] text-slate-800">{t.name}</b>
                      <span className="text-[8px] text-slate-400">
                        Click to bid +₹{increment.toLocaleString()}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Current Increment
                </span>
                <span className="text-xs font-extrabold text-emerald-600">
                  +₹{increment.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[500, 1000, 2000].map((n) => (
                  <button
                    key={n}
                    onClick={() => setIncrement(n)}
                    className={`rounded-lg border py-2.5 text-xs font-extrabold transition ${increment === n ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300"}`}
                  >
                    +₹{n.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                    ₹
                  </span>
                  <input
                    value={custom}
                    onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-7 pr-3 text-xs font-bold outline-none focus:border-emerald-400"
                    placeholder="Enter custom bid"
                  />
                </div>
                <button
                  onClick={() => placeBid()}
                  className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-xs font-extrabold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
                >
                  <Icon name="gavel" size={15} />
                  Place Bid
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-800">Bid History</h3>
              <span className="text-[9px] font-semibold text-slate-400">Latest bids</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {history.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="relative flex h-7 w-7 items-center justify-center rounded-full text-[8px] font-black text-white"
                    style={{ background: h.color }}
                  >
                    {h.team
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-bold text-slate-700">{h.team}</p>
                    <p className="text-[8px] text-slate-400">{h.time}</p>
                  </div>
                  <p className="text-[11px] font-extrabold text-slate-900">{h.amount}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
              Auction Controls
            </p>
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => setStatus("SOLD TO " + leader.toUpperCase())}
                className="rounded-lg bg-emerald-600 py-3 text-[10px] font-black text-white hover:bg-emerald-700"
              >
                SOLD
              </button>
              <button
                onClick={() => setStatus("PLAYER UNSOLD")}
                className="rounded-lg bg-red-50 py-3 text-[10px] font-black text-red-600 hover:bg-red-100"
              >
                UNSOLD
              </button>
              <button
                onClick={() => setStatus("BIDDING REOPENED")}
                className="rounded-lg bg-blue-50 py-3 text-[10px] font-black text-blue-600 hover:bg-blue-100"
              >
                REOPEN
              </button>
              <button
                onClick={() => {
                  setBid(Math.max(5000, bid - 500));
                  setCount(Math.max(0, count - 1));
                }}
                className="flex items-center justify-center gap-1 rounded-lg bg-slate-100 py-3 text-[10px] font-black text-slate-600 hover:bg-slate-200"
              >
                <Icon name="undo" size={13} />
                UNDO
              </button>
              <button
                onClick={() => {
                  setBid(5000);
                  setCount(0);
                  setStatus("NEXT PLAYER READY");
                }}
                className="flex items-center justify-center gap-1 rounded-lg bg-slate-900 py-3 text-[10px] font-black text-white hover:bg-slate-800"
              >
                NEXT <Icon name="play" size={12} />
              </button>
            </div>
          </div>
        </section>
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Live Team Tracker</h3>
                <p className="mt-1 text-[10px] text-slate-400">Purse and squad status</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Icon name="shield" size={17} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1.25fr_.7fr_.45fr_.7fr] bg-slate-50 px-4 py-3 text-[7px] font-black uppercase tracking-wider text-slate-400">
            <span>Team</span>
            <span>Purse Left</span>
            <span className="text-center">Bought</span>
            <span className="text-right">Max Bid</span>
          </div>
          <div>
            {teams.map((team, i) => (
              <div
                key={team.name}
                className={`grid grid-cols-[1.25fr_.7fr_.45fr_.7fr] items-center border-t border-slate-100 px-4 py-4 ${leader === team.name ? "bg-emerald-50/50" : ""}`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${team.accent} text-[8px] font-black text-white`}
                  >
                    {team.short}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-bold text-slate-800">{team.name}</p>
                    {leader === team.name && (
                      <p className="mt-0.5 text-[7px] font-bold uppercase tracking-wider text-emerald-600">
                        Leading bid
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[11px] font-extrabold ${i === 3 ? "text-red-500" : i === 1 ? "text-amber-500" : "text-emerald-600"}`}
                >
                  {team.purse}
                </span>
                <span className="text-center text-xs font-extrabold text-slate-700">
                  {team.players}
                </span>
                <span
                  className={`text-right text-[10px] font-extrabold ${i === 3 ? "text-red-500" : i === 1 ? "text-amber-500" : "text-emerald-600"}`}
                >
                  {["₹61K", "₹54K", "₹72K", "₹38K"][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="m-4 rounded-xl bg-slate-900 p-4 text-white">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Total purse remaining
              </p>
              <Icon name="wallet" size={15} className="text-emerald-400" />
            </div>
            <p className="mt-2 text-xl font-black">₹2,66,000</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-[66%] rounded-full bg-emerald-400" />
            </div>
            <p className="mt-2 text-[8px] text-slate-500">66.5% of total auction purse</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function ReportsPage() {
  return (
    <main className="p-8">
      <PageTitle
        title="Auction Reports"
        description="Performance, spending and squad insights for the current tournament."
        action={
          <div className="flex gap-2">
            {["Excel", "CSV", "PDF"].map((x) => (
              <button
                key={x}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-600"
              >
                <Icon name="upload" size={13} className="rotate-180" />
                {x}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid grid-cols-5 gap-4">
        {[
          ["Players Sold", "42", "check", "text-emerald-600"],
          ["Players Unsold", "8", "users", "text-red-500"],
          ["Highest Sold", "₹18,500", "trophy", "text-amber-500"],
          ["Average Price", "₹7,240", "trend", "text-blue-600"],
          ["Most Expensive Team", "Sky Blazers", "shield", "text-violet-600"],
        ].map(([l, v, ic, c]) => (
          <div key={l} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <Icon name={ic as IconName} size={17} className={c} />
            <p className={`mt-4 text-lg font-extrabold ${c}`}>{v}</p>
            <p className="mt-1 text-[9px] font-semibold text-slate-400">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-5">
        <ChartCard title="Auction Progress" subtitle="Players by auction status">
          <div className="flex items-center justify-center gap-8 py-4">
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full"
              style={{ background: "conic-gradient(#10b981 0 68%, #f59e0b 68% 81%, #e2e8f0 81%)" }}
            >
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                <b className="text-2xl text-slate-900">68%</b>
                <span className="text-[8px] text-slate-400">SOLD</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["Sold", "42", "bg-emerald-500"],
                ["Unsold", "8", "bg-amber-500"],
                ["Remaining", "24", "bg-slate-300"],
              ].map((x) => (
                <div key={x[0]} className="flex items-center gap-3 text-[10px]">
                  <i className={`h-2.5 w-2.5 rounded-full ${x[2]}`} />
                  <span className="w-16 text-slate-500">{x[0]}</span>
                  <b className="text-slate-800">{x[1]}</b>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
        <ChartCard title="Team Spending" subtitle="Total spend against initial purse">
          <div className="space-y-4 py-3">
            {teams.map((t, i) => (
              <div key={t.name}>
                <div className="flex justify-between text-[10px]">
                  <b className="text-slate-600">{t.name}</b>
                  <span className="font-bold text-slate-800">{t.spend}</span>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${t.accent}`}
                    style={{ width: `${[29, 36, 18, 52][i]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
        <ChartCard title="Remaining Purse" subtitle="Available budget by team">
          <div className="flex h-48 items-end justify-around gap-5 px-5 pt-5">
            {teams.map((t, i) => (
              <div key={t.name} className="flex h-full flex-1 flex-col justify-end text-center">
                <b className="mb-2 text-[9px] text-slate-600">{t.purse}</b>
                <div
                  className={`mx-auto w-full max-w-12 rounded-t-lg bg-gradient-to-t ${t.accent}`}
                  style={{ height: `${[72, 64, 83, 48][i]}%` }}
                />
                <span className="mt-2 text-[8px] font-bold text-slate-400">{t.short}</span>
              </div>
            ))}
          </div>
        </ChartCard>
        <ChartCard title="Role Distribution" subtitle="Sold players by role">
          <div className="space-y-4 py-4">
            {[
              ["Batsmen", 16, 38, "bg-blue-500"],
              ["Bowlers", 13, 31, "bg-emerald-500"],
              ["All Rounders", 9, 21, "bg-violet-500"],
              ["Wicket Keepers", 4, 10, "bg-amber-500"],
            ].map((x) => (
              <div
                key={x[0] as string}
                className="grid grid-cols-[110px_1fr_30px] items-center gap-3"
              >
                <span className="text-[10px] font-semibold text-slate-600">{x[0]}</span>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${x[3]}`} style={{ width: `${x[2]}%` }} />
                </div>
                <b className="text-[10px] text-slate-800">{x[1]}</b>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </main>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
        <p className="mt-1 text-[10px] text-slate-400">{subtitle}</p>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function SettingsPage({ dark, onTheme }: { dark: boolean; onTheme: () => void }) {
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
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-xs font-bold ${i === 0 ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50"}`}
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
                className={`rounded-xl border p-3 text-left ${!dark ? "border-emerald-500 ring-2 ring-emerald-100" : "border-slate-200"}`}
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
                className={`rounded-xl border p-3 text-left ${dark ? "border-emerald-500 ring-2 ring-emerald-100" : "border-slate-200"}`}
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

function SettingsSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
      <p className="mt-1 text-[10px] text-slate-400">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ProjectorMode({ exit }: { exit: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 25% 40%, #10b981 0, transparent 35%), radial-gradient(circle at 80% 20%, #2563eb 0, transparent 30%)",
        }}
      />
      <div className="relative flex min-h-screen flex-col p-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500">
              <Icon name="bat" size={24} />
            </div>
            <div>
              <p className="text-xl font-black">Green Meadows Premier League 2027</p>
              <p className="text-xs uppercase tracking-[.2em] text-emerald-400">
                Live Community Auction
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 text-xs font-black text-red-400">
              <i className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> LIVE
            </span>
            <button
              onClick={exit}
              className="rounded-lg border border-white/15 px-3 py-2 text-[10px] text-slate-400"
            >
              Exit Projector
            </button>
          </div>
        </header>
        <main className="grid flex-1 grid-cols-[.8fr_1.2fr] items-center gap-14 py-10">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
            <img
              src={playerImages[0]}
              className="h-[460px] w-full object-cover object-top"
              alt="Rohan Verma"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-8 pt-24">
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black uppercase">
                All-rounder
              </span>
              <h1 className="mt-4 text-5xl font-black">Rohan Verma</h1>
              <p className="mt-2 text-lg text-slate-400">Base price ₹5,000</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[.35em] text-emerald-400">
              Current Bid
            </p>
            <p className="mt-5 text-[108px] font-black leading-none tracking-tight">₹8,500</p>
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6">
              <p className="text-sm uppercase tracking-wider text-slate-400">Leading Team</p>
              <p className="mt-2 text-4xl font-black text-blue-400">Thunder Kings</p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-10">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Bid Count</p>
                <p className="mt-1 text-3xl font-black">12</p>
              </div>
              <div className="h-14 w-px bg-white/10" />
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Timer</p>
                <p className="mt-1 font-mono text-5xl font-black text-amber-400">18s</p>
              </div>
            </div>
          </div>
        </main>
        <footer className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-6">
            <p className="text-xs font-black uppercase tracking-wider text-slate-500">
              Recent Sales
            </p>
            {[
              ["Aditya Rao", "Royal Strikers", "₹12,000"],
              ["Karan Malhotra", "Green Warriors", "₹9,500"],
              ["Siddharth Jain", "Sky Blazers", "₹7,500"],
            ].map((x) => (
              <div
                key={x[0]}
                className="flex flex-1 items-center justify-between border-l border-white/10 pl-6"
              >
                <div>
                  <p className="text-sm font-bold">{x[0]}</p>
                  <p className="text-[10px] text-slate-500">{x[1]}</p>
                </div>
                <b className="text-lg text-emerald-400">{x[2]}</b>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [active, setActive] = useState("Dashboard");
  const [modal, setModal] = useState(false);
  const [dark, setDark] = useState(false);
  const navigate = (label: string, next: Screen) => {
    setActive(label);
    setScreen(next);
  };
  const titles: Record<Screen, string> = {
    dashboard: "Community Sports Auction Manager",
    tournaments: "Tournament Management",
    command: "Tournament Command Center",
    players: "Player Management",
    import: "Player Import",
    team: "Team Management",
    queue: "Auction Queue",
    auction: "Live Auction Control Room",
    projector: "Projector Mode",
    reports: "Tournament Reports",
    settings: "Settings",
  };
  if (screen === "projector") {
    return <ProjectorMode exit={() => navigate("Auction Room", "auction")} />;
  }
  const content: Record<Exclude<Screen, "projector">, React.ReactNode> = {
    dashboard: <Dashboard openModal={() => setModal(true)} navigate={navigate} />,
    tournaments: <TournamentsPage openModal={() => setModal(true)} navigate={navigate} />,
    command: <CommandCenter navigate={navigate} />,
    players: <Management navigate={navigate} />,
    import: <ImportPlayers done={() => navigate("Players", "players")} />,
    team: <TeamDetailPage />,
    queue: <QueuePage start={() => navigate("Auction Room", "auction")} />,
    auction: <Auction projector={() => navigate("Projector Mode", "projector")} />,
    reports: <ReportsPage />,
    settings: <SettingsPage dark={dark} onTheme={() => setDark((v) => !v)} />,
  };
  return (
    <div className={`${dark ? "dark" : ""} min-h-screen bg-[#f5f7f8] text-slate-900`}>
      <Sidebar active={active} onNavigate={navigate} />
      <div className="ml-[236px] min-w-[1020px]">
        <Header title={titles[screen]} dark={dark} onTheme={() => setDark((v) => !v)} />
        {content[screen as Exclude<Screen, "projector">]}
      </div>
      {modal && <TournamentModal onClose={() => setModal(false)} />}
    </div>
  );
}
