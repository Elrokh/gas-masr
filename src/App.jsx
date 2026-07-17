import { HashRouter, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import { AppProvider } from "./context/AppContext";
import CalculatorPage from "./pages/CalculatorPage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RatesPage from "./pages/RatesPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculator/:type" element={<CalculatorPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/rates" element={<RatesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
