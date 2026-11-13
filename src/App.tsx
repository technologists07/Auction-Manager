import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { TournamentModal } from "./components/TournamentModal";
import { AuctionProvider } from "./context/AuctionContext";
import { SCREEN_ROUTES, SCREEN_TITLES } from "./data/mockData";
import { AuctionRoomPage } from "./pages/AuctionRoomPage";
import { CommandCenterPage } from "./pages/CommandCenterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ImportPlayersPage } from "./pages/ImportPlayersPage";
import { PlayersPage } from "./pages/PlayersPage";
import { ProjectorModePage } from "./pages/ProjectorModePage";
import { QueuePage } from "./pages/QueuePage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TeamDetailPage } from "./pages/TeamDetailPage";
import { TournamentsPage } from "./pages/TournamentsPage";
import { Screen } from "./types/auction";

function AppShell() {
  const [modal, setModal] = useState(false);
  const [dark, setDark] = useState(false);
  const routerNavigate = useNavigate();
  const location = useLocation();

  const navigate = (screen: Screen) => {
    routerNavigate(SCREEN_ROUTES[screen]);
  };

  if (location.pathname === "/projector") {
    return <ProjectorModePage exit={() => navigate("auction")} />;
  }

  const currentScreen =
    (Object.entries(SCREEN_ROUTES).find(([, path]) => path === location.pathname)?.[0] as Screen) ??
    "dashboard";

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen bg-[#f5f7f8] text-slate-900`}>
      <Sidebar activePath={location.pathname} onNavigate={navigate} />
      <div className="ml-[236px] min-w-[1020px]">
        <Header title={SCREEN_TITLES[currentScreen]} dark={dark} onTheme={() => setDark((v) => !v)} />
        <Routes>
          <Route path="/" element={<DashboardPage openModal={() => setModal(true)} navigate={navigate} />} />
          <Route path="/tournaments" element={<TournamentsPage openModal={() => setModal(true)} navigate={navigate} />} />
          <Route path="/overview" element={<CommandCenterPage navigate={navigate} />} />
          <Route path="/players" element={<PlayersPage navigate={navigate} />} />
          <Route path="/import" element={<ImportPlayersPage done={() => navigate("players")} />} />
          <Route path="/teams" element={<TeamDetailPage />} />
          <Route path="/queue" element={<QueuePage start={() => navigate("auction")} />} />
          <Route path="/auction" element={<AuctionRoomPage projector={() => navigate("projector")} />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage dark={dark} onTheme={() => setDark((v) => !v)} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {modal && <TournamentModal onClose={() => setModal(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <AuctionProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuctionProvider>
  );
}
