import { Home as HomeIcon, Search, RefreshCw, ChevronLeft, Compass, ServerCrash } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { GoldButton, GhostButton } from "./ui";

export function NotFound() {
  const { go, setSearchOpen } = useStore();
  return (
    <div className="relative grid min-h-[78vh] place-items-center overflow-hidden px-4 py-20 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-gold/5 to-transparent" />
      <div className="relative max-w-md">
        <div className="mb-4 flex justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl border border-amber-gold/20 bg-amber-gold/5 text-amber-gold">
            <Compass size={30} />
          </span>
        </div>
        <div className="amber-gradient-text text-[110px] font-black leading-none sm:text-[140px]">۴۰۴</div>
        <h1 className="mt-2 text-2xl font-black text-zinc-100 sm:text-3xl">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-zinc-400">
          ممکن است آدرس را اشتباه وارد کرده باشید یا این صفحه دیگر وجود نداشته باشد. بیایید شما را به مسیر درست برگردانیم.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <GoldButton onClick={() => go("home")}><HomeIcon size={16} /> بازگشت به خانه</GoldButton>
          <GhostButton onClick={() => setSearchOpen(true)}><Search size={16} /> جستجو در سایت</GhostButton>
        </div>
      </div>
    </div>
  );
}

export function ServerError() {
  const { go } = useStore();
  return (
    <div className="relative grid min-h-[78vh] place-items-center overflow-hidden px-4 py-20 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-error/5 to-transparent" />
      <div className="relative max-w-md">
        <div className="mb-4 flex justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl border border-error/25 bg-error/10 text-error animate-pulse">
            <ServerCrash size={30} />
          </span>
        </div>
        <div className="text-[110px] font-black leading-none text-error sm:text-[140px]">۵۰۳</div>
        <h1 className="mt-2 text-2xl font-black text-zinc-100 sm:text-3xl">سرور در حال تعمیر است</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-zinc-400">
          هم‌اکنون در حال انجام کارهای نگهداری روی سرور هستیم تا تجربه‌ی بهتری ارائه دهیم. کمی بعد دوباره تلاش کنید.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <GoldButton onClick={() => window.location.reload()}><RefreshCw size={16} /> تلاش مجدد</GoldButton>
          <GhostButton onClick={() => go("home")}>بازگشت به خانه <ChevronLeft size={16} /></GhostButton>
        </div>
      </div>
    </div>
  );
}
