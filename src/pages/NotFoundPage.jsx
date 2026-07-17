import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center text-center">
      <div>
        <p className="text-7xl font-black text-brand-500">404</p>
        <h1 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">الصفحة غير موجودة</h1>
        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">الرابط الذي فتحته غير صحيح أو تم تغييره.</p>
        <Link to="/" className="mt-6 inline-flex h-14 items-center gap-2 rounded-2xl bg-gradient-to-l from-brand-900 to-brand-500 px-6 text-sm font-black text-white shadow-glow">
          <Home size={19} />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
