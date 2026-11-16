import { NavItem, Player, Screen, Team } from "../types/auction";

export const SCREEN_ROUTES: Record<Screen, string> = {
  dashboard: "/",
  tournaments: "/tournaments",
  command: "/overview",
  players: "/players",
  import: "/import",
  team: "/teams",
  queue: "/queue",
  auction: "/auction",
  projector: "/projector",
  reports: "/reports",
  settings: "/settings",
};

export const SCREEN_TITLES: Record<Screen, string> = {
  dashboard: "Dashboard",
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

export const playerImages = [
  "https://images.unsplash.com/photo-1644984785609-676ed703333e?auto=format&fit=crop&w=300&q=85",
  "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=300&q=85",
  "https://images.unsplash.com/photo-1593341646647-75b32930e4a1?auto=format&fit=crop&w=300&q=85",
  "https://images.unsplash.com/photo-1643294358128-0d2da3b4ea7a?auto=format&fit=crop&w=300&q=85",
];

export const tournamentNav: NavItem[] = [
  { label: "Overview", icon: "grid", screen: "command", path: "/overview" },
  { label: "Players", icon: "users", screen: "players", path: "/players" },
  { label: "Teams", icon: "shield", screen: "team", path: "/teams" },
  { label: "Auction Queue", icon: "list", screen: "queue", path: "/queue" },
  { label: "Auction Room", icon: "gavel", screen: "auction", path: "/auction" },
  { label: "Reports", icon: "chart", screen: "reports", path: "/reports" },
];

export const teams: Team[] = [];
export const players: Player[] = [];
