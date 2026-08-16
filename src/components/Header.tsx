import { useState } from "react";
import {
  Search,
  ShoppingBag,
  GitCompare,
  Sun,
  Moon,
  Menu,
  X,
  User,
  Type,
  ChevronDown,
  Sparkles,
  Truck,
} from "lucide-react";
import { useStore, type FontTheme } from "../store/StoreContext";
import { products } from "../data/products";
import PremiumBottle from "./PremiumBottle";

const NAV = [
  { key: "home", label: "خانه" },
  { key: "catalog", label: "محصولات" },
  { key: "about", label: "درباره ما" },
  { key: "contact", label: "تماس" },
  { key: "faq", label: "سوالات" },
  { key: "blog", label: "مقالات" },
] as const;

const FONTS: { id: FontTheme; label: string }[] = [
  { id: "vazir", label: "ایران یکان" },
  { id: "vazirmatn", label: "وزیرمتن" },
  { id: "markazi", label: "مرکزی" },
  { id: "noto", label: "نوتو نسخ" },
  { id: "katibeh", label: "کتیبه" },
  { id: "lalezar", label: "لاله‌زار" },
];

export default function Header() {
  const {
    go,
    view,
    cartCount,
    compare,
    setCartOpen,
    setCompareOpen,
    setSearchOpen,
    setAuthOpen,
    user,
    theme,
    setTheme,
    font,
    setFont,
  } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fontMenu, setFontMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* announcement bar */}
      <div className="bg-gradient-to-l from-amber-dark via-amber-gold to-amber-dark text-onyx-black">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-[11px] font-bold sm:text-xs">
          <Truck size={14} />
          ارسال رایگان برای سفارش‌های بالای ۵ میلیون تومان · ضمانت اصالت کالا
        </div>
      </div>

      <div className="border-b border-amber-gold/15 bg-onyx-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* logo */}
          <button onClick={() => go("home")} className="flex shrink-0 items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-dark to-amber-glow text-lg shadow-lg shadow-amber-gold/20">
              👑
            </span>
            <div className="text-right leading-none">
              <div className="font-serif text-base font-black tracking-wider text-amber-glow sm:text-lg">
                AROMA
              </div>
              <div className="text-[9px] tracking-[0.25em] text-amber-gold/70">
                آروما
              </div>
            </div>
          </button>

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => go(n.key as never)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                  view === n.key
                    ? "text-amber-glow"
                    : "text-zinc-300 hover:text-amber-gold"
                }`}
              >
                {n.label}
                {view === n.key && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-l from-amber-dark to-amber-glow" />
                )}
              </button>
            ))}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="hidden items-center gap-1 sm:gap-1.5 lg:flex">
            <IconBtn onClick={() => setSearchOpen(true)} title="جستجو">
              <Search size={18} />
            </IconBtn>

            {/* font switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setFontMenu((v) => !v)}
                onBlur={() => setTimeout(() => setFontMenu(false), 150)}
                className="grid h-9 w-9 place-items-center rounded-full text-zinc-300 transition hover:bg-white/5 hover:text-amber-gold"
                title="تغییر فونت"
              >
                <Type size={18} />
              </button>
              {fontMenu && (
                <div className="absolute left-0 top-11 w-36 overflow-hidden rounded-2xl border border-amber-gold/20 bg-onyx-dark/95 p-1.5 shadow-2xl backdrop-blur-xl">
                  <div className="px-2 py-1 text-[10px] text-zinc-500">نوع فونت</div>
                  {FONTS.map((f) => (
                    <button
                      key={f.id}
                      onMouseDown={() => setFont(f.id)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                        font === f.id
                          ? "bg-amber-gold/15 text-amber-glow"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="font-sans">{f.label}</span>
                      <ChevronDown size={12} className={font === f.id ? "rotate-0" : "opacity-30"} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <IconBtn onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="تم">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </IconBtn>

            <IconBtn onClick={() => setCompareOpen(true)} title="مقایسه" badge={compare.length || undefined}>
              <GitCompare size={18} />
            </IconBtn>

            <IconBtn onClick={() => setCartOpen(true)} title="سبد خرید" badge={cartCount || undefined}>
              <ShoppingBag size={18} />
            </IconBtn>
            </div>

            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  onClick={() => go("account")}
                  className="flex items-center gap-1.5 rounded-full border border-amber-gold/30 bg-amber-gold/5 py-1 pr-1.5 pl-3 text-xs font-semibold text-amber-gold transition hover:bg-amber-gold/15"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-amber-dark to-amber-glow text-[10px] font-black text-onyx-black">
                    {user.name.charAt(0)}
                  </span>
                  <span className="max-w-[90px] truncate">{user.name}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden items-center gap-1.5 rounded-full border border-amber-gold/30 bg-amber-gold/5 px-3.5 py-2 text-xs font-semibold text-amber-gold transition hover:bg-amber-gold/15 sm:flex"
              >
                <User size={15} /> ورود
              </button>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full text-zinc-200 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[80%] animate-fade-in border-l border-amber-gold/20 bg-onyx-dark p-5">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-serif font-black text-amber-glow">منو</span>
              <button onClick={() => setMobileOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-white/5">
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <button
                  key={n.key}
                  onClick={() => {
                    go(n.key as never);
                    setMobileOpen(false);
                  }}
                  className={`rounded-xl px-4 py-3 text-right text-sm font-semibold transition ${
                    view === n.key ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </nav>

            {/* quick actions inside drawer */}
            <div className="mt-5 grid grid-cols-4 gap-2">
              <DrawerAction icon={<Search size={18} />} label="جستجو" onClick={() => { setSearchOpen(true); setMobileOpen(false); }} />
              <DrawerAction icon={theme === "dark" ? <Sun size={18} /> : <Moon size={18} />} label={theme === "dark" ? "حالت روشن" : "حالت تاریک"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} />
              <DrawerAction icon={<ShoppingBag size={18} />} label="سبد خرید" badge={cartCount} onClick={() => { setCartOpen(true); setMobileOpen(false); }} />
              <DrawerAction icon={<GitCompare size={18} />} label="مقایسه" badge={compare.length} onClick={() => { setCompareOpen(true); setMobileOpen(false); }} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {FONTS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFont(f.id)}
                  className={`rounded-xl border px-2 py-2 text-xs ${
                    font === f.id ? "border-amber-gold/50 bg-amber-gold/10 text-amber-glow" : "border-white/10 text-zinc-300"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {user ? (
              <>
                <button
                  onClick={() => { go("account"); setMobileOpen(false); }}
                  className="mt-6 flex w-full items-center gap-2 rounded-full border border-amber-gold/30 bg-amber-gold/5 px-4 py-3 text-sm font-bold text-amber-gold transition hover:bg-amber-gold/15"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-amber-dark to-amber-glow text-[11px] font-black text-onyx-black">
                    {user.name.charAt(0)}
                  </span>
                  {user.name}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setAuthOpen(true);
                  setMobileOpen(false);
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-amber-dark to-amber-gold py-3 text-sm font-bold text-onyx-black"
              >
                <User size={16} /> ورود / ثبت‌نام
              </button>
            )}
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-amber-gold/15 bg-white/5 p-3 text-xs text-zinc-400">
              <Sparkles size={14} className="text-amber-gold" />
              دستیار هوشمند عطر، همیشه کنار شماست.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  badge,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="relative grid h-9 w-9 place-items-center rounded-full text-zinc-300 transition hover:bg-white/5 hover:text-amber-gold"
    >
      {children}
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-amber-rose px-1 text-[9px] font-black text-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function DrawerAction({ icon, label, badge, onClick }: { icon: React.ReactNode; label: string; badge?: number; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="relative flex flex-col items-center gap-1.5 rounded-2xl border border-white/8 bg-white/[0.03] py-3 text-zinc-200 transition hover:border-amber-gold/40 hover:bg-white/[0.06] hover:text-amber-glow">
      <span className="relative text-amber-gold">
        {icon}
        {badge ? <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-amber-rose px-1 text-[9px] font-black text-white">{badge}</span> : null}
      </span>
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, openProduct } = useStore();
  const [q, setQ] = useState("");
  if (!searchOpen) return null;
  const results = q.trim()
    ? products
        .filter(
          (p) =>
            p.name.includes(q) ||
            p.brand.toLowerCase().includes(q.toLowerCase()) ||
            p.nameEn.toLowerCase().includes(q.toLowerCase()) ||
            p.category.includes(q)
        )
        .slice(0, 6)
    : products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-24">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSearchOpen(false)} />
      <div className="relative w-full max-w-2xl animate-fade-up overflow-hidden rounded-3xl border border-amber-gold/20 bg-onyx-dark/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/10 p-4">
          <Search size={20} className="text-amber-gold" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="جستجوی عطر، برند یا رایحه..."
            className="flex-1 bg-transparent text-base text-zinc-100 outline-none placeholder:text-zinc-500"
          />
          <button onClick={() => setSearchOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-zinc-400">
            <X size={16} />
          </button>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="p-8 text-center text-sm text-zinc-500">نتیجه‌ای یافت نشد</div>
          )}
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                openProduct(p.id);
                setSearchOpen(false);
                setQ("");
              }}
              className="flex w-full items-center gap-3 rounded-2xl p-2 text-right transition hover:bg-white/5"
            >
              <div className="h-14 w-12 shrink-0">
                <PremiumBottle liquid={p.liquid} cap={p.cap} accent={p.accent} className="h-full w-full" />
              </div>
              <div className="flex-1">
                <div className="font-serif text-[10px] tracking-wider text-amber-gold/80">{p.brand}</div>
                <div className="text-sm font-bold text-zinc-100">{p.name}</div>
                <div className="text-[11px] text-zinc-500">{p.category} · {p.gender}</div>
              </div>
              <span className="text-xs text-amber-glow">از {p.sizes[0].price.toLocaleString("fa-IR")}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
