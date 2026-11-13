export type Screen =
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

export type IconName =
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

export interface DbTournament {
  id: string;
  name: string;
  season: string | null;
  status: "draft" | "live" | "completed";
  total_purse: number;
  max_squad_size: number;
  min_bid_increment: number;
  current_player_id: string | null;
  current_bid: number | null;
  highest_bidder_team_id: string | null;
  created_at: string;
}

export interface DbTeam {
  id: string;
  tournament_id: string;
  name: string;
  short_name: string | null;
  captain_name: string | null;
  total_purse: number;
  remaining_purse: number;
  color: string | null;
  created_at: string;
}

export interface DbPlayer {
  id: string;
  tournament_id: string;
  name: string;
  role: string;
  category: string | null;
  base_price: number;
  sold_price: number | null;
  status: "queued" | "live" | "sold" | "unsold";
  team_id: string | null;
  queue_order: number;
  stats: Record<string, unknown> | null;
  created_at: string;
}

export interface DbBid {
  id: string;
  tournament_id: string;
  player_id: string;
  team_id: string;
  amount: number;
  created_at: string;
}

export interface Team {
  name: string;
  short: string;
  owner: string;
  purse: string;
  players: number;
  color: string;
  spend: string;
  accent: string;
}

export interface Player {
  name: string;
  role: string;
  price: string;
  status: string;
  image: string;
}

export interface NavItem {
  label: string;
  icon: IconName;
  screen: Screen;
  path: string;
}
