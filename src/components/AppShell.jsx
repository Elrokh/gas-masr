import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import DesktopSidebar from "./DesktopSidebar";
import MobileHeader from "./MobileHeader";
import Toast from "./Toast";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-44 -top-48 h-[30rem] w-[30rem] rounded-full bg-brand-500/15 blur-3xl dark:bg-brand-500/10" />
        <div className="absolute -bottom-52 -left-44 h-[32rem] w-[32rem] rounded-full bg-indigo-500/10 blur-3xl dark:bg-violet-500/10" />
      </div>

      <DesktopSidebar />
      <MobileHeader />

      <main className="relative pb-28 lg:mr-72 lg:pb-10">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
          <Outlet />
        </div>
      </main>

      <BottomNav />
      <Toast />
    </div>
  );
}
