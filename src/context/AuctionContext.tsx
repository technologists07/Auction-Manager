import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { DbBid, DbPlayer, DbTeam, DbTournament } from "../types/auction";

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
  bids: DbBid[];
  loading: boolean;
  error: string | null;
  setActiveTournamentId: (id: string) => void;
  refreshAll: () => Promise<void>;
  createTournament: (input: CreateTournamentInput) => Promise<DbTournament>;
  createTeam: (input: CreateTeamInput) => Promise<void>;
  createPlayer: (input: CreatePlayerInput) => Promise<void>;
  importPlayersBatch: (rows: CreatePlayerInput[]) => Promise<void>;
  saveQueueOrder: (orderedPlayerIds: string[]) => Promise<void>;
  openNextPlayer: () => Promise<void>;
  placeTeamBid: (teamId: string, amount: number) => Promise<void>;
  markSold: () => Promise<void>;
  markUnsold: () => Promise<void>;
  undoLastBid: () => Promise<void>;
  reopenLastPlayer: () => Promise<void>;
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
  const [bids, setBids] = useState<DbBid[]>([]);
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
      setBids([]);
      return;
    }
    const [teamsRes, playersRes, bidsRes] = await Promise.all([
      supabase.from("teams").select("*").eq("tournament_id", tournamentId).order("created_at"),
      supabase
        .from("players")
        .select("*")
        .eq("tournament_id", tournamentId)
        .order("queue_order")
        .order("created_at"),
      supabase
        .from("bids")
        .select("*")
        .eq("tournament_id", tournamentId)
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    if (teamsRes.error) setError(teamsRes.error.message);
    if (playersRes.error) setError(playersRes.error.message);
    if (bidsRes.error) setError(bidsRes.error.message);

    setTeams((teamsRes.data ?? []) as DbTeam[]);
    setPlayers((playersRes.data ?? []) as DbPlayer[]);
    setBids((bidsRes.data ?? []) as DbBid[]);
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
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bids",
          filter: `tournament_id=eq.${activeTournamentId}`,
        },
        () => void fetchTournamentData(activeTournamentId),
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [activeTournamentId, fetchTournamentData, fetchTournaments]);

  const activeTournament = tournaments.find((t) => t.id === activeTournamentId) ?? null;

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

  const importPlayersBatch = async (rows: CreatePlayerInput[]) => {
    if (!activeTournamentId) throw new Error("Select or create a tournament first.");
    const startOrder = players.length + 1;
    const payload = rows.map((r, i) => ({
      tournament_id: activeTournamentId,
      name: r.name,
      role: r.role,
      base_price: r.base_price,
      status: "queued",
      queue_order: startOrder + i,
    }));
    const { error: err } = await supabase.from("players").insert(payload);
    if (err) throw new Error(err.message);
    await fetchTournamentData(activeTournamentId);
  };

  const saveQueueOrder = async (orderedPlayerIds: string[]) => {
    if (!activeTournamentId) return;
    await Promise.all(
      orderedPlayerIds.map((id, idx) =>
        supabase.from("players").update({ queue_order: idx + 1 }).eq("id", id),
      ),
    );
    await fetchTournamentData(activeTournamentId);
  };

  const openNextPlayer = async () => {
    if (!activeTournament) throw new Error("No active tournament.");
    const livePlayer = players.find((p) => p.status === "live");
    if (livePlayer) {
      throw new Error(`Mark ${livePlayer.name} as Sold or Unsold before moving to Next.`);
    }
    const nextQueued = players
      .filter((p) => p.status === "queued")
      .sort((a, b) => a.queue_order - b.queue_order)[0];
    if (!nextQueued) throw new Error("No queued players remaining.");

    await supabase.from("players").update({ status: "live" }).eq("id", nextQueued.id);
    await supabase
      .from("tournaments")
      .update({
        status: "live",
        current_player_id: nextQueued.id,
        current_bid: 0,
        highest_bidder_team_id: null,
      })
      .eq("id", activeTournament.id);

    await Promise.all([fetchTournaments(), fetchTournamentData(activeTournament.id)]);
  };

  const placeTeamBid = async (teamId: string, amount: number) => {
    if (!activeTournament) throw new Error("No active tournament.");
    const livePlayer =
      players.find((p) => p.id === activeTournament.current_player_id) ??
      players.find((p) => p.status === "live");
    if (!livePlayer) throw new Error("Click NEXT to bring a player onto the block first.");

    const team = teams.find((t) => t.id === teamId);
    if (!team) throw new Error("Team not found.");

    const currentBid = Number(activeTournament.current_bid ?? 0);
    if (currentBid > 0 && amount <= currentBid) {
      throw new Error(`Bid must be higher than ${formatINR(currentBid)}.`);
    }
    if (currentBid === 0 && amount < Number(livePlayer.base_price)) {
      throw new Error(`Opening bid cannot be less than base price ${formatINR(livePlayer.base_price)}.`);
    }
    if (amount > Number(team.remaining_purse)) {
      throw new Error(`${team.name} only has ${formatINR(team.remaining_purse)} remaining.`);
    }

    const { error: bidErr } = await supabase.from("bids").insert({
      tournament_id: activeTournament.id,
      player_id: livePlayer.id,
      team_id: team.id,
      amount,
    });
    if (bidErr) throw new Error(bidErr.message);

    const { error: tErr } = await supabase
      .from("tournaments")
      .update({
        current_bid: amount,
        highest_bidder_team_id: team.id,
      })
      .eq("id", activeTournament.id);
    if (tErr) throw new Error(tErr.message);

    await Promise.all([fetchTournaments(), fetchTournamentData(activeTournament.id)]);
  };

  const markSold = async () => {
    if (!activeTournament) throw new Error("No active tournament.");
    const livePlayer =
      players.find((p) => p.id === activeTournament.current_player_id) ??
      players.find((p) => p.status === "live");
    if (!livePlayer) throw new Error("No live player to sell.");
    if (!activeTournament.highest_bidder_team_id || !activeTournament.current_bid) {
      throw new Error("At least one bid is required before marking SOLD.");
    }

    const winningTeam = teams.find((t) => t.id === activeTournament.highest_bidder_team_id);
    if (!winningTeam) throw new Error("Leading team not found.");

    const soldPrice = Number(activeTournament.current_bid);
    const newRemaining = Math.max(0, Number(winningTeam.remaining_purse) - soldPrice);

    await supabase
      .from("teams")
      .update({ remaining_purse: newRemaining })
      .eq("id", winningTeam.id);

    await supabase
      .from("players")
      .update({
        status: "sold",
        team_id: winningTeam.id,
        sold_price: soldPrice,
      })
      .eq("id", livePlayer.id);

    await supabase
      .from("tournaments")
      .update({
        current_player_id: null,
        current_bid: 0,
        highest_bidder_team_id: null,
      })
      .eq("id", activeTournament.id);

    await Promise.all([fetchTournaments(), fetchTournamentData(activeTournament.id)]);
  };

  const markUnsold = async () => {
    if (!activeTournament) throw new Error("No active tournament.");
    const livePlayer =
      players.find((p) => p.id === activeTournament.current_player_id) ??
      players.find((p) => p.status === "live");
    if (!livePlayer) throw new Error("No live player on the block.");

    await supabase
      .from("players")
      .update({ status: "unsold", team_id: null, sold_price: null })
      .eq("id", livePlayer.id);

    await supabase
      .from("tournaments")
      .update({
        current_player_id: null,
        current_bid: 0,
        highest_bidder_team_id: null,
      })
      .eq("id", activeTournament.id);

    await Promise.all([fetchTournaments(), fetchTournamentData(activeTournament.id)]);
  };

  const undoLastBid = async () => {
    if (!activeTournament) throw new Error("No active tournament.");
    const livePlayer =
      players.find((p) => p.id === activeTournament.current_player_id) ??
      players.find((p) => p.status === "live");
    if (!livePlayer) throw new Error("No live player to undo bids for.");

    const playerBids = bids.filter((b) => b.player_id === livePlayer.id);
    if (playerBids.length === 0) throw new Error("No bids to undo on this player.");

    const latest = playerBids[0];
    const previous = playerBids[1] ?? null;

    await supabase.from("bids").delete().eq("id", latest.id);
    await supabase
      .from("tournaments")
      .update({
        current_bid: previous ? Number(previous.amount) : 0,
        highest_bidder_team_id: previous ? previous.team_id : null,
      })
      .eq("id", activeTournament.id);

    await Promise.all([fetchTournaments(), fetchTournamentData(activeTournament.id)]);
  };

  const reopenLastPlayer = async () => {
    if (!activeTournament) throw new Error("No active tournament.");
    const alreadyLive = players.find((p) => p.status === "live");
    if (alreadyLive) {
      throw new Error(`Finish ${alreadyLive.name} before reopening another player.`);
    }

    const lastFinished = [...players]
      .reverse()
      .find((p) => p.status === "sold" || p.status === "unsold");
    if (!lastFinished) throw new Error("No sold or unsold player to reopen.");

    if (lastFinished.status === "sold" && lastFinished.team_id && lastFinished.sold_price) {
      const team = teams.find((t) => t.id === lastFinished.team_id);
      if (team) {
        await supabase
          .from("teams")
          .update({
            remaining_purse: Number(team.remaining_purse) + Number(lastFinished.sold_price),
          })
          .eq("id", team.id);
      }
    }

    await supabase
      .from("players")
      .update({ status: "live", team_id: null, sold_price: null })
      .eq("id", lastFinished.id);

    const playerBids = bids.filter((b) => b.player_id === lastFinished.id);
    const latestBid = playerBids[0] ?? null;

    await supabase
      .from("tournaments")
      .update({
        current_player_id: lastFinished.id,
        current_bid: latestBid ? Number(latestBid.amount) : 0,
        highest_bidder_team_id: latestBid ? latestBid.team_id : null,
      })
      .eq("id", activeTournament.id);

    await Promise.all([fetchTournaments(), fetchTournamentData(activeTournament.id)]);
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

  return (
    <AuctionContext.Provider
      value={{
        tournaments,
        activeTournament,
        teams,
        players,
        bids,
        loading,
        error,
        setActiveTournamentId,
        refreshAll,
        createTournament,
        createTeam,
        createPlayer,
        importPlayersBatch,
        saveQueueOrder,
        openNextPlayer,
        placeTeamBid,
        markSold,
        markUnsold,
        undoLastBid,
        reopenLastPlayer,
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
