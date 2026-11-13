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
