import { useState } from "react";
import { Cookie, X, ShieldCheck } from "lucide-react";
import { useStore } from "../store/StoreContext";

export default function CookieBanner() {
  const { go } = useStore();
  const [show, setShow] = useState(() => {
    try { return localStorage.getItem("aroma_cookie") !== "1"; } catch { return true; }
  });
  if (!show) return null;

  const accept = () => { try { localStorage.setItem("aroma_cookie", "1"); } catch { /* ignore */ } setShow(false); };

  return (
    <div className="fixed inset-x-3 bottom-3 z-[88] mx-auto max-w-2xl animate-fade-up rounded-3xl border border-amber-gold/20 bg-onyx-dark/95 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-gold/10 text-amber-gold"><Cookie size={20} /></div>
        <div className="flex-1">
          <h4 className="text-sm font-black text-zinc-100">ما از کوکی‌ها استفاده می‌کنیم</h4>
          <p className="mt-1 text-[11px] leading-6 text-zinc-400">
            برای بهبود تجربه‌ی خرید شما از کوکی‌ها استفاده می‌کنیم. با ادامه‌ی استفاده از سایت، با
            <button onClick={() => go("privacy")} className="mx-1 text-amber-gold hover:underline">سیاست حریم خصوصی</button>
            موافقت می‌کنید.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={accept} className="flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-l from-amber-dark to-amber-gold px-5 text-xs font-bold text-onyx-black"><ShieldCheck size={14} /> می‌پذیرم</button>
            <button onClick={() => { accept(); go("privacy"); }} className="flex h-10 items-center rounded-full border border-white/10 px-5 text-xs font-semibold text-zinc-300 hover:border-amber-gold/40">تنظیمات حریم خصوصی</button>
          </div>
        </div>
        <button onClick={accept} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/5 text-zinc-400 hover:text-amber-gold"><X size={16} /></button>
      </div>
    </div>
  );
}
