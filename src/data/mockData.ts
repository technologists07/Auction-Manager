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

export const teams: Team[] = [
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

export const players: Player[] = [
  {
    name: "Rohan Sharma",
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

export const dashboardTournaments = [
  ["Green Meadows Premier League", "Cricket", "8 Teams", "Live"],
  ["Monsoon Cricket Cup 2025", "Cricket", "6 Teams", "Upcoming"],
  ["Summer Smash League", "Cricket", "10 Teams", "Completed"],
  ["Weekend Box Cricket", "Box Cricket", "6 Teams", "Draft"],
];

export const tournamentCards = [
  ["Green Meadows Premier League 2027", "Auction In Progress", "8", "74", "18 Mar 2027"],
  ["Monsoon Cricket Cup 2027", "Ready", "6", "66", "12 Jul 2027"],
  ["Summer Smash League 2026", "Completed", "10", "108", "22 May 2026"],
  ["Weekend Box Cricket 2027", "Draft", "6", "42", "Not scheduled"],
];
