import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-50/85 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 lg:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <Logo compact />
        <p className="text-sm font-black text-slate-900 dark:text-white">فاتورة الغاز</p>
        <ThemeToggle />
      </div>
    </header>
  );
}
