import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { DbPlayer, DbTeam, DbTournament } from "../types/auction";

interface CreateTournamentInput {
  name: string;
  season: string;
  total_purse: number;
  max_squad_size: number;
  min_bid_increment: number;
}

interface CreateTeamInput {
  name: string;
  short_name: string;
  captain_name: string;
  total_purse: number;
  color: string;
}

interface CreatePlayerInput {
  name: string;
  role: string;
  base_price: number;
}

interface AuctionContextValue {
  tournaments: DbTournament[];
  activeTournament: DbTournament | null;
  teams: DbTeam[];
  players: DbPlayer[];
  loading: boolean;
  error: string | null;
  setActiveTournamentId: (id: string) => void;
  refreshAll: () => Promise<void>;
  createTournament: (input: CreateTournamentInput) => Promise<DbTournament>;
  createTeam: (input: CreateTeamInput) => Promise<void>;
  createPlayer: (input: CreatePlayerInput) => Promise<void>;
  seedDemoTournament: () => Promise<void>;
}

const AuctionContext = createContext<AuctionContextValue | null>(null);

const STORAGE_KEY = "auctionpro_active_tournament_id";

export function formatINR(amount: number | null | undefined): string {
  const val = Number(amount ?? 0);
  return `₹${val.toLocaleString("en-IN")}`;
}

export function AuctionProvider({ children }: { children: React.ReactNode }) {
  const [tournaments, setTournaments] = useState<DbTournament[]>([]);
  const [activeTournamentId, setActiveIdState] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY),
  );
  const [teams, setTeams] = useState<DbTeam[]>([]);
  const [players, setPlayers] = useState<DbPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setActiveTournamentId = (id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    setActiveIdState(id);
  };

  const fetchTournaments = useCallback(async () => {
    const { data, error: err } = await supabase
      .from("tournaments")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) {
      setError(err.message);
      return [] as DbTournament[];
    }
    const list = (data ?? []) as DbTournament[];
    setTournaments(list);
    if (list.length > 0) {
      setActiveIdState((prev) => {
        const valid = prev && list.some((t) => t.id === prev);
        const chosen = valid ? prev : list[0].id;
        localStorage.setItem(STORAGE_KEY, chosen);
        return chosen;
      });
    }
    return list;
  }, []);

  const fetchTournamentData = useCallback(async (tournamentId: string | null) => {
    if (!tournamentId) {
      setTeams([]);
      setPlayers([]);
      return;
    }
    const [teamsRes, playersRes] = await Promise.all([
      supabase.from("teams").select("*").eq("tournament_id", tournamentId).order("created_at"),
      supabase
        .from("players")
        .select("*")
        .eq("tournament_id", tournamentId)
        .order("queue_order")
        .order("created_at"),
    ]);

    if (teamsRes.error) setError(teamsRes.error.message);
    if (playersRes.error) setError(playersRes.error.message);

    setTeams((teamsRes.data ?? []) as DbTeam[]);
    setPlayers((playersRes.data ?? []) as DbPlayer[]);
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    const list = await fetchTournaments();
    const targetId =
      activeTournamentId && list.some((t) => t.id === activeTournamentId)
        ? activeTournamentId
        : list[0]?.id ?? null;
    await fetchTournamentData(targetId);
    setLoading(false);
  }, [activeTournamentId, fetchTournamentData, fetchTournaments]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    if (!activeTournamentId) return;
    void fetchTournamentData(activeTournamentId);

    const channel = supabase
      .channel(`auction-${activeTournamentId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tournaments", filter: `id=eq.${activeTournamentId}` },
        () => void fetchTournaments(),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "teams",
          filter: `tournament_id=eq.${activeTournamentId}`,
        },
        () => void fetchTournamentData(activeTournamentId),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
          filter: `tournament_id=eq.${activeTournamentId}`,
        },
        () => void fetchTournamentData(activeTournamentId),
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [activeTournamentId, fetchTournamentData, fetchTournaments]);

  const createTournament = async (input: CreateTournamentInput): Promise<DbTournament> => {
    const { data, error: err } = await supabase
      .from("tournaments")
      .insert({
        name: input.name,
        season: input.season,
        status: "draft",
        total_purse: input.total_purse,
        max_squad_size: input.max_squad_size,
        min_bid_increment: input.min_bid_increment,
      })
      .select()
      .single();

    if (err) throw new Error(err.message);
    const created = data as DbTournament;
    await fetchTournaments();
    setActiveTournamentId(created.id);
    return created;
  };

  const createTeam = async (input: CreateTeamInput) => {
    if (!activeTournamentId) throw new Error("Select or create a tournament first.");
    const { error: err } = await supabase.from("teams").insert({
      tournament_id: activeTournamentId,
      name: input.name,
      short_name: input.short_name.toUpperCase().slice(0, 4),
      captain_name: input.captain_name,
      total_purse: input.total_purse,
      remaining_purse: input.total_purse,
      color: input.color || "#10b981",
    });
    if (err) throw new Error(err.message);
    await fetchTournamentData(activeTournamentId);
  };

  const createPlayer = async (input: CreatePlayerInput) => {
    if (!activeTournamentId) throw new Error("Select or create a tournament first.");
    const { error: err } = await supabase.from("players").insert({
      tournament_id: activeTournamentId,
      name: input.name,
      role: input.role,
      base_price: input.base_price,
      status: "queued",
      queue_order: players.length + 1,
    });
    if (err) throw new Error(err.message);
    await fetchTournamentData(activeTournamentId);
  };

  const seedDemoTournament = async () => {
    setError(null);
    const created = await createTournament({
      name: "Green Meadows Premier League 2027",
      season: "2027",
      total_purse: 100000,
      max_squad_size: 11,
      min_bid_increment: 500,
    });

    await supabase.from("teams").insert([
      {
        tournament_id: created.id,
        name: "Thunder Kings",
        short_name: "TK",
        captain_name: "Arjun Mehta",
        total_purse: 100000,
        remaining_purse: 100000,
        color: "#2459d3",
      },
      {
        tournament_id: created.id,
        name: "Royal Strikers",
        short_name: "RS",
        captain_name: "Neha Kapoor",
        total_purse: 100000,
        remaining_purse: 100000,
        color: "#7c3aed",
      },
      {
        tournament_id: created.id,
        name: "Green Warriors",
        short_name: "GW",
        captain_name: "Vikram Shah",
        total_purse: 100000,
        remaining_purse: 100000,
        color: "#12985b",
      },
      {
        tournament_id: created.id,
        name: "Sky Blazers",
        short_name: "SB",
        captain_name: "Rhea Iyer",
        total_purse: 100000,
        remaining_purse: 100000,
        color: "#e06822",
      },
    ]);

    await supabase.from("players").insert([
      { tournament_id: created.id, name: "Rohan Verma", role: "All-rounder", base_price: 5000, status: "queued", queue_order: 1 },
      { tournament_id: created.id, name: "Karan Malhotra", role: "Batsman", base_price: 4000, status: "queued", queue_order: 2 },
      { tournament_id: created.id, name: "Aditya Rao", role: "Fast Bowler", base_price: 3500, status: "queued", queue_order: 3 },
      { tournament_id: created.id, name: "Siddharth Jain", role: "Wicket-keeper", base_price: 4500, status: "queued", queue_order: 4 },
      { tournament_id: created.id, name: "Manav Desai", role: "Spin Bowler", base_price: 3000, status: "queued", queue_order: 5 },
      { tournament_id: created.id, name: "Nikhil Bhat", role: "Batsman", base_price: 3000, status: "queued", queue_order: 6 },
    ]);

    await fetchTournamentData(created.id);
  };

  const activeTournament = tournaments.find((t) => t.id === activeTournamentId) ?? null;

  return (
    <AuctionContext.Provider
      value={{
        tournaments,
        activeTournament,
        teams,
        players,
        loading,
        error,
        setActiveTournamentId,
        refreshAll,
        createTournament,
        createTeam,
        createPlayer,
        seedDemoTournament,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuction() {
  const ctx = useContext(AuctionContext);
  if (!ctx) throw new Error("useAuction must be used inside AuctionProvider");
  return ctx;
}
