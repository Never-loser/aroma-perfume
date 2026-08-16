import { useEffect, useState } from "react";
import {
  LogOut, Crown, Package, Heart, Wallet,
  MapPin, Check, Plus, Trash2, Sparkles, Star, Lock, MonitorSmartphone, KeyRound,
  Truck, LifeBuoy, Send, LayoutDashboard, Bell, Settings, ChevronLeft, ShieldCheck, Edit3,
} from "lucide-react";
import { useStore } from "../store/StoreContext";
import { products, toman, type Product } from "../data/products";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";
import { GoldButton, GhostButton } from "./ui";

type Tab = "overview" | "orders" | "favorites" | "addresses" | "notifications" | "tickets" | "settings" | "security" | "wallet";

const ORDERS = [
  { id: "AR-10248", date: "۱۴۰۳/۰۵/۱۲", status: "تحویل شده", total: 14200000, pid: "coco-mademoiselle" },
  { id: "AR-10192", date: "۱۴۰۳/۰۴/۲۸", status: "در حال ارسال", total: 9800000, pid: "eros-flame" },
  { id: "AR-10055", date: "۱۴۰۳/۰۳/۱۰", status: "تحویل شده", total: 26400000, pid: "oud-wood" },
  { id: "AR-09921", date: "۱۴۰۳/۰۲/۰۱", status: "لغو شده", total: 7200000, pid: "black-opium" },
];
const NOTIFS = [
  { icon: Truck, title: "سفارش شما ارسال شد", desc: "AR-10192 در مسیر تحویل است.", time: "۲ ساعت پیش" },
  { icon: Sparkles, title: "تخفیف ویژه کلوب طلایی", desc: "۲۰٪ تخفیف روی عطرهای منتخب.", time: "دیروز" },
  { icon: Star, title: "امتیاز جدید کلوب", desc: "۱۲۰ امتیاز به حساب شما افزوده شد.", time: "۳ روز پیش" },
];
type Addr = { id: number; title: string; addr: string; zip: string; def: boolean };

export default function AccountView() {
  const { user, logout, go, addToCart, openProduct, setAuthOpen } = useStore();
  const [tab, setTab] = useState<Tab>("overview");
  const [toast, setToast] = useState<string | null>(null);
  const [twoFA, setTwoFA] = useState(true);
  const [favIds, setFavIds] = useState<string[]>(["sauvage-edp", "baccarat-rouge", "bleu-de-chanel"]);
  const [walletBalance, setWalletBalance] = useState(250000);
  const [walletAmount, setWalletAmount] = useState(100000);
  const [showWallet, setShowWallet] = useState(false);
  const [addresses, setAddresses] = useState<Addr[]>([
    { id: 1, title: "آدرس اصلی", addr: "تهران، خیابان فرشته، کوچه‌ی گلستان، پلاک ۱۲، واحد ۳", zip: "۱۲۳۴۵۶۷۸۹۰", def: true },
    { id: 2, title: "محل کار", addr: "تهران، سعادت‌آباد، بلوار دریا، برج آبی، طبقه ۷", zip: "۹۸۷۶۵۴۳۲۱۰", def: false },
  ]);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrForm, setAddrForm] = useState({ title: "", addr: "", zip: "" });
  const [tickets, setTickets] = useState<{ id: string; subject: string; status: string; date: string; messages: number }[]>([
    { id: "T-204", subject: "سوال درباره اصالت عطر", status: "پاسخ داده شد", date: "۱۴۰۳/۰۵/۱۰", messages: 2 },
    { id: "T-198", subject: "تأخیر در ارسال سفارش", status: "در حال بررسی", date: "۱۴۰۳/۰۴/۲۹", messages: 1 },
  ]);
  const [ticketForm, setTicketForm] = useState({ subject: "", message: "", priority: "عادی" });
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? "", phone: user?.phone ?? "", email: user?.email ?? "", birth: "۱۳۷۰/۰۴/۱۵" });

  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(null), 1800); };

  // read tab from URL on mount (for live previews)
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const t = params.get("tab");
    if (t) setTab(t as Tab);
  }, []);

  if (!user) {
    return (
      <div className="grid min-h-[60vh] place-items-center px-4 text-center">
        <div className="max-w-sm">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-amber-gold/10 text-amber-gold"><Lock size={28} /></div>
          <h1 className="text-xl font-black text-zinc-100">برای مشاهده‌ی حساب کاربری وارد شوید</h1>
          <p className="mt-2 text-sm text-zinc-400">برای دسترسی به داشبورد، سفارش‌ها و تنظیمات، ابتدا وارد حساب خود شوید.</p>
          <GoldButton className="mt-6" onClick={() => setAuthOpen(true)}>ورود / ثبت‌نام</GoldButton>
        </div>
      </div>
    );
  }

  const initials = user.name.trim().charAt(0) || "U";
  const favs = favIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
  const recs = products.filter((p) => p.bestseller && !favIds.includes(p.id)).slice(0, 8);
  const statusTone = (s: string) => s === "تحویل شده" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : s === "در حال ارسال" ? "text-amber-glow bg-amber-gold/10 border-amber-gold/25" : s === "لغو شده" ? "text-error bg-error/10 border-error/20" : "text-zinc-300 bg-white/5 border-white/10";

  const NAV: { id: Tab; label: string; icon: typeof Package }[] = [
    { id: "overview", label: "نمای کلی", icon: LayoutDashboard },
    { id: "orders", label: "سفارش‌ها", icon: Package },
    { id: "favorites", label: "علاقه‌مندی‌ها", icon: Heart },
    { id: "wallet", label: "کیف پول", icon: Wallet },
    { id: "addresses", label: "آدرس‌ها", icon: MapPin },
    { id: "notifications", label: "اعلان‌ها", icon: Bell },
    { id: "tickets", label: "تیکت پشتیبانی", icon: LifeBuoy },
    { id: "settings", label: "اطلاعات حساب", icon: Settings },
    { id: "security", label: "امنیت", icon: ShieldCheck },
  ];

  const addAddress = () => {
    if (!addrForm.title.trim() || !addrForm.addr.trim()) { notify("عنوان و متن آدرس الزامی است"); return; }
    setAddresses((a) => [...a, { id: Date.now(), title: addrForm.title.trim(), addr: addrForm.addr.trim(), zip: addrForm.zip.trim() || "—", def: false }]);
    setAddrForm({ title: "", addr: "", zip: "" }); setShowAddrForm(false); notify("آدرس جدید ذخیره شد");
  };
  const submitTicket = () => {
    if (!ticketForm.subject.trim() || !ticketForm.message.trim()) { notify("موضوع و متن تیکت الزامی است"); return; }
    setTickets((t) => [{ id: "T-" + Math.floor(Math.random() * 900 + 100), subject: ticketForm.subject.trim(), status: "در حال بررسی", date: "هم‌اکنون", messages: 1 }, ...t]);
    setTicketForm({ subject: "", message: "", priority: "عادی" }); setShowTicketForm(false); notify("تیکت شما ثبت شد ✦");
  };

  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden px-3 py-6 sm:px-6 sm:py-8">
      {/* breadcrumb */}
      <div className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500">
        <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
        <ChevronLeft size={14} /> <span className="text-zinc-300">حساب کاربری</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {/* user card */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-gold/15 bg-gradient-to-l from-onyx-gray to-onyx-dark p-4 sm:rounded-3xl sm:p-5">
            <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-amber-gold/10 blur-2xl" />
            <div className="relative flex items-center gap-3 text-center sm:flex-col sm:gap-2">
              <div className="relative shrink-0">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber-dark to-amber-glow text-xl font-black text-onyx-black shadow-gold sm:h-16 sm:w-16 sm:text-2xl">{initials}</div>
                <span className="absolute -bottom-1 -left-1 grid h-6 w-6 place-items-center rounded-full border-2 border-onyx-dark bg-gradient-to-br from-amber-dark to-amber-glow text-onyx-black"><Crown size={12} /></span>
              </div>
              <div className="min-w-0 flex-1 text-right sm:text-center">
                <h3 className="truncate text-sm font-black text-zinc-100 sm:text-base">{user.name}</h3>
                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-amber-gold/15 px-2 py-0.5 text-[10px] font-bold text-amber-glow sm:text-[11px]"><Star size={10} fill="currentColor" /> عضو طلایی</span>
              </div>
            </div>
          </div>

          {/* nav — grid on mobile, vertical on desktop */}
          <nav className="mt-3 grid grid-cols-3 gap-1 rounded-2xl border border-amber-gold/10 bg-onyx-dark/40 p-2 sm:grid-cols-3 lg:flex lg:flex-col">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => setTab(n.id)} className={`flex flex-col items-center justify-center gap-1 rounded-lg px-1 py-2.5 text-[11px] font-semibold leading-tight transition lg:flex-row lg:gap-2.5 lg:rounded-xl lg:px-3.5 lg:py-3 lg:text-left lg:text-sm ${tab === n.id ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"}`}>
                <n.icon size={17} /> <span className="text-center lg:text-right">{n.label}</span>
              </button>
            ))}
          </nav>

          {/* logout — always visible */}
          <button onClick={() => { logout(); go("home"); }} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-rose/30 bg-amber-rose/10 px-4 py-3 text-xs font-bold text-amber-rose transition hover:bg-amber-rose/20 sm:text-sm">
            <LogOut size={15} /> خروج از حساب
          </button>
        </aside>

        {/* content */}
        <div className="min-w-0">
          {/* ===== OVERVIEW ===== */}
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {[["۴", "سفارش‌ها", Package, () => setTab("orders")], [toman(favIds.length), "علاقه‌مندی", Heart, () => setTab("favorites")], [`${toman(walletBalance)} ت`, "کیف پول", Wallet, () => setTab("wallet")], [toman(addresses.length), "آدرس‌ها", MapPin, () => setTab("addresses")]].map(([v, l, Icon, onClick]) => (
                  <button key={l as string} onClick={onClick as () => void} className="group flex min-w-0 flex-col items-center gap-1 rounded-xl border border-white/8 bg-white/[0.03] p-2.5 text-center transition hover:-translate-y-1 hover:border-amber-gold/40 hover:bg-white/[0.06] hover:shadow-card sm:rounded-2xl sm:p-4">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-gold/10 text-amber-gold transition group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-xl">{(() => { const I = Icon as typeof Package; return <I size={20} />; })()}</div>
                    <span className="text-base font-black text-zinc-100 sm:text-xl">{v as string}</span>
                    <span className="text-[10px] text-zinc-500 sm:text-xs">{l as string}</span>
                  </button>
                ))}
              </div>
              <Block title="آخرین سفارش‌ها" eyebrow="ORDERS">
                <div className="space-y-3">
                  {ORDERS.slice(0, 3).map((o) => {
                    const p = products.find((x) => x.id === o.pid);
                    return (
                      <div key={o.id} className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-2.5 transition hover:border-amber-gold/30 sm:flex-nowrap sm:gap-3 sm:p-3">
                        <button onClick={() => openProduct(o.pid)} className="h-14 w-12 shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-14 sm:rounded-xl">{p && <ProductImage product={p} className="h-full w-full" />}</button>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => openProduct(o.pid)} className="truncate text-right text-sm font-bold text-zinc-100 hover:text-amber-glow sm:text-base">{p?.name}</button>
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold sm:text-[11px] ${statusTone(o.status)}`}>{o.status}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-500 sm:text-sm"><span className="font-mono" dir="ltr">{o.id}</span><span>·</span><span>{o.date}</span></div>
                        </div>
                        <div className="shrink-0 text-left"><div className="text-sm font-black text-amber-glow sm:text-base">{toman(o.total)}</div><div className="text-[10px] text-zinc-500 sm:text-[11px]">تومان</div></div>
                      </div>
                    );
                  })}
                </div>
              </Block>
              <Block title="پیشنهادهای ویژه" eyebrow="FOR YOU">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {recs.slice(0, 6).map((p) => (<ProductCard key={p.id} product={p} />))}
                </div>
              </Block>
            </div>
          )}

          {/* ===== ORDERS ===== */}
          {tab === "orders" && (
            <Block title="تاریخچه سفارش‌ها" eyebrow="ORDERS">
              <div className="space-y-3">
                {ORDERS.map((o) => {
                  const p = products.find((x) => x.id === o.pid);
                  return (
                      <div key={o.id} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3 transition hover:border-amber-gold/30">
                        <button onClick={() => openProduct(o.pid)} className="h-16 w-14 shrink-0 overflow-hidden rounded-xl">{p && <ProductImage product={p} className="h-full w-full" />}</button>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <button onClick={() => openProduct(o.pid)} className="truncate text-right text-base font-bold text-zinc-100 hover:text-amber-glow">{p?.name}</button>
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-bold ${statusTone(o.status)}`}>{o.status}</span>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-sm text-zinc-500"><span className="font-mono" dir="ltr">{o.id}</span><span>{o.date}</span></div>
                      </div>
                      <div className="shrink-0 text-left"><div className="text-sm font-black text-amber-glow">{toman(o.total)}</div><div className="text-[9px] text-zinc-500">تومان</div></div>
                    </div>
                  );
                })}
              </div>
            </Block>
          )}

          {/* ===== FAVORITES ===== */}
          {tab === "favorites" && (
            <Block title="علاقه‌مندی‌ها" eyebrow="FAVORITES">
              {favs.length === 0 ? (
                <div className="grid place-items-center gap-2 rounded-2xl border border-dashed border-white/10 py-10 text-center"><Heart size={26} className="text-amber-gold/50" /><p className="text-xs text-zinc-400">هنوز عطر موردعلاقه‌ای ندارید.</p><button onClick={() => go("catalog")} className="mt-1 text-[11px] font-bold text-amber-gold hover:underline">کشف عطرها</button></div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {favs.map((p) => (
                    <div key={p.id} className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]">
                      <button onClick={() => openProduct(p.id)} className="block aspect-square w-full overflow-hidden"><ProductImage product={p} className="h-full w-full" /></button>
                      <div className="p-2"><div className="truncate text-[10px] text-amber-gold/80">{p.brand}</div><div className="truncate text-xs font-bold text-zinc-100">{p.name}</div>
                        <div className="mt-2 flex gap-1.5"><button onClick={() => { addToCart(p.id, p.sizes[0].ml); notify("به سبد افزوده شد"); }} className="flex-1 rounded-lg bg-gradient-to-l from-amber-dark to-amber-gold py-1.5 text-[10px] font-bold text-onyx-black">سبد</button><button onClick={() => { setFavIds((f) => f.filter((x) => x !== p.id)); notify("حذف شد"); }} className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 text-zinc-400 hover:border-error/40 hover:text-error"><Trash2 size={12} /></button></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Block>
          )}

          {/* ===== WALLET ===== */}
          {tab === "wallet" && (
            <Block title="کیف پول" eyebrow="WALLET">
              <div className="rounded-2xl border border-amber-gold/15 bg-gradient-to-l from-onyx-gray to-onyx-dark p-4 text-center sm:rounded-3xl sm:p-6">
                <div className="text-xs text-zinc-400 sm:text-sm">موجودی فعلی</div>
                <div className="mt-1 text-3xl font-black text-amber-glow sm:text-4xl">{toman(walletBalance)} <span className="text-sm text-zinc-400 sm:text-base">تومان</span></div>
                <GoldButton className="mt-4 w-full sm:mt-5 sm:w-auto" onClick={() => setShowWallet(true)}><Plus size={16} /> شارژ کیف پول</GoldButton>
              </div>
              {showWallet && (
                <div className="mt-3 rounded-2xl border border-amber-gold/20 bg-white/[0.03] p-3 sm:rounded-3xl sm:p-5">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[50000, 100000, 200000, 500000].map((a) => (<button key={a} onClick={() => setWalletAmount(a)} className={`rounded-xl border py-2.5 text-xs font-bold transition ${walletAmount === a ? "border-amber-gold bg-amber-gold/15 text-amber-glow" : "border-white/10 text-zinc-300 hover:border-amber-gold/30"}`}>{toman(a)} ت</button>))}
                  </div>
                  <label className="mt-3 block"><span className="mb-1 block text-[11px] text-zinc-400">مبلغ دلخواه</span><input type="number" value={walletAmount} onChange={(e) => setWalletAmount(Number(e.target.value) || 0)} dir="ltr" className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-zinc-100 outline-none focus:border-amber-gold/60" /></label>
                  <div className="mt-3 grid grid-cols-2 gap-2"><GoldButton className="w-full" onClick={() => { if (walletAmount > 0) { setWalletBalance((b) => b + walletAmount); notify("شارژ شد ✦"); setShowWallet(false); } }}><Check size={16} /> شارژ</GoldButton><GhostButton className="w-full" onClick={() => setShowWallet(false)}>انصراف</GhostButton></div>
                </div>
              )}
            </Block>
          )}

          {/* ===== ADDRESSES ===== */}
          {tab === "addresses" && (
            <Block title="آدرس‌های ذخیره‌شده" eyebrow="ADDRESSES">
              <div className="grid gap-3 sm:grid-cols-2">
                {addresses.map((a) => (
                  <div key={a.id} className={`rounded-2xl border p-4 ${a.def ? "border-amber-gold/30 bg-amber-gold/5" : "border-white/8 bg-white/[0.03]"}`}>
                    <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-bold text-zinc-100 sm:text-base"><MapPin size={15} className="text-amber-gold" /> {a.title}</span>{a.def && <span className="rounded-full bg-amber-gold/15 px-2 py-0.5 text-[10px] font-bold text-amber-glow sm:text-[11px]">پیش‌فرض</span>}</div>
                    <p className="mt-2 text-xs leading-6 text-zinc-400 sm:text-sm sm:leading-7">{a.addr}</p>
                    <p className="mt-1 text-[11px] text-zinc-500 sm:text-xs">کد پستی: <span dir="ltr">{a.zip}</span></p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {!a.def && <button onClick={() => { setAddresses((x) => x.map((y) => ({ ...y, def: y.id === a.id }))); notify("پیش‌فرض شد"); }} className="rounded-lg border border-white/10 px-2 py-1 text-[10px] text-zinc-300 hover:border-amber-gold/40 sm:px-2.5 sm:py-1.5">پیش‌فرض</button>}
                      <button onClick={() => notify("ویرایش")} className="flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-[10px] text-zinc-300 hover:border-amber-gold/40 sm:px-2.5 sm:py-1.5"><Edit3 size={11} /> ویرایش</button>
                      <button onClick={() => { setAddresses((x) => x.filter((y) => y.id !== a.id)); notify("حذف شد"); }} className="mr-auto grid h-6 w-6 place-items-center rounded-lg border border-white/10 text-zinc-400 hover:border-error/40 hover:text-error sm:h-7 sm:w-7"><Trash2 size={11} /></button>
                    </div>
                  </div>
                ))}
              </div>
              {showAddrForm ? (
                <div className="mt-3 space-y-2 rounded-2xl border border-amber-gold/20 bg-white/[0.03] p-4">
                  <input value={addrForm.title} onChange={(e) => setAddrForm((f) => ({ ...f, title: e.target.value }))} placeholder="عنوان" className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-zinc-100 outline-none focus:border-amber-gold/60" />
                  <textarea value={addrForm.addr} onChange={(e) => setAddrForm((f) => ({ ...f, addr: e.target.value }))} placeholder="نشانی کامل" rows={2} className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-gold/60" />
                  <input value={addrForm.zip} onChange={(e) => setAddrForm((f) => ({ ...f, zip: e.target.value }))} placeholder="کد پستی" dir="ltr" className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-zinc-100 outline-none focus:border-amber-gold/60" />
                  <div className="mt-3 grid grid-cols-2 gap-2"><GoldButton className="w-full" onClick={addAddress}><Check size={15} /> ذخیره</GoldButton><GhostButton className="w-full" onClick={() => setShowAddrForm(false)}>انصراف</GhostButton></div>
                </div>
              ) : (<button onClick={() => setShowAddrForm(true)} className="mt-3 flex w-full items-center justify-center gap-1 rounded-2xl border border-dashed border-white/15 py-4 text-xs text-zinc-400 hover:border-amber-gold/40 hover:text-amber-gold"><Plus size={15} /> افزودن آدرس جدید</button>)}
            </Block>
          )}

          {/* ===== NOTIFICATIONS ===== */}
          {tab === "notifications" && (
            <Block title="اعلان‌ها" eyebrow="NOTIFICATIONS">
              <div className="space-y-2.5">
                {NOTIFS.map((n, i) => (<div key={i} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-gold/10 text-amber-gold"><n.icon size={18} /></div><div className="flex-1"><div className="flex items-center justify-between gap-2"><span className="text-sm font-bold text-zinc-100 sm:text-base">{n.title}</span><span className="shrink-0 text-[11px] text-zinc-500 sm:text-xs">{n.time}</span></div><p className="mt-0.5 text-xs leading-5 text-zinc-400 sm:text-sm sm:leading-6">{n.desc}</p></div></div>))}
              </div>
            </Block>
          )}

          {/* ===== TICKETS ===== */}
          {tab === "tickets" && (
            <Block title="تیکت‌های پشتیبانی" eyebrow="SUPPORT">
              <div className="space-y-2.5">
                {tickets.map((t) => (<div key={t.id} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-gold/10 text-amber-gold"><LifeBuoy size={18} /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="truncate text-sm font-bold text-zinc-100 sm:text-base">{t.subject}</span><span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold sm:text-[11px] ${t.status === "پاسخ داده شد" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-amber-gold/25 bg-amber-gold/10 text-amber-glow"}`}>{t.status}</span></div><div className="mt-1 flex items-center justify-between text-xs text-zinc-500 sm:text-sm"><span className="font-mono" dir="ltr">{t.id}</span><span>{t.date}</span></div></div></div>))}
              </div>
              {showTicketForm ? (
                <div className="mt-3 space-y-2 rounded-2xl border border-amber-gold/20 bg-white/[0.03] p-4">
                  <input value={ticketForm.subject} onChange={(e) => setTicketForm((f) => ({ ...f, subject: e.target.value }))} placeholder="موضوع تیکت" className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-zinc-100 outline-none focus:border-amber-gold/60" />
                  <div className="flex gap-1.5">{["عادی", "مهم", "فوری"].map((pr) => (<button key={pr} onClick={() => setTicketForm((f) => ({ ...f, priority: pr }))} className={`rounded-lg border px-3 py-1.5 text-[11px] transition ${ticketForm.priority === pr ? "border-amber-gold/60 bg-amber-gold/15 text-amber-glow" : "border-white/10 text-zinc-400"}`}>{pr}</button>))}</div>
                  <textarea value={ticketForm.message} onChange={(e) => setTicketForm((f) => ({ ...f, message: e.target.value }))} placeholder="متن پیام..." rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-gold/60" />
                  <div className="mt-3 grid grid-cols-2 gap-2"><GoldButton className="w-full" onClick={submitTicket}><Send size={15} /> ثبت تیکت</GoldButton><GhostButton className="w-full" onClick={() => setShowTicketForm(false)}>انصراف</GhostButton></div>
                </div>
              ) : (<button onClick={() => setShowTicketForm(true)} className="mt-3 flex w-full items-center justify-center gap-1 rounded-2xl border border-dashed border-white/15 py-4 text-xs text-zinc-400 hover:border-amber-gold/40 hover:text-amber-gold"><Plus size={15} /> ثبت تیکت جدید</button>)}
            </Block>
          )}

          {/* ===== SETTINGS ===== */}
          {tab === "settings" && (
            <Block title="اطلاعات حساب" eyebrow="PROFILE">
              <div className="grid gap-3 sm:grid-cols-2">
                <SField label="نام و نام خانوادگی" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
                <SField label="شماره موبایل" value={form.phone} dir="ltr" onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
                <SField label="ایمیل" value={form.email} dir="ltr" onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
                <SField label="تاریخ تولد" value={form.birth} dir="ltr" onChange={(v) => setForm((f) => ({ ...f, birth: v }))} />
              </div>
              <div className="mt-3 flex justify-end"><GoldButton className="w-full sm:w-auto" onClick={() => notify("تغییرات ذخیره شد")}><Check size={15} /> ذخیره تغییرات</GoldButton></div>
            </Block>
          )}

          {/* ===== SECURITY ===== */}
          {tab === "security" && (
            <Block title="امنیت" eyebrow="SECURITY">
              <div className="space-y-2.5">
                <SecRow icon={KeyRound} title="تغییر رمز عبور" desc="رمز عبور خود را به‌روز کنید" action={<button onClick={() => notify("لینک ارسال شد")} className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-[10px] whitespace-nowrap sm:text-[11px] hover:border-amber-gold/40">تغییر</button>} />
                <SecRow icon={Lock} title="احراز هویت دومرحله‌ای" desc="لایه‌ی امنیتی اضافه" action={<Toggle on={twoFA} onClick={() => { setTwoFA((v) => !v); notify(twoFA ? "غیرفعال" : "فعال"); }} />} />
                <SecRow icon={MonitorSmartphone} title="نشست‌های فعال" desc="مدیریت دستگاه‌های واردشده" action={<button onClick={() => notify("مدیریت نشست‌ها")} className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-[10px] whitespace-nowrap sm:text-[11px] hover:border-amber-gold/40">مدیریت</button>} />
                <SecRow icon={LogOut} title="خروج از همه‌ی دستگاه‌ها" desc="پایان دادن به تمام نشست‌ها" danger action={<button onClick={() => { logout(); go("home"); }} className="shrink-0 rounded-lg border border-amber-rose/30 bg-amber-rose/10 px-3 py-1.5 text-[10px] font-semibold whitespace-nowrap sm:text-[11px] text-amber-rose hover:bg-amber-rose/20">خروج</button>} />
              </div>
            </Block>
          )}
        </div>
      </div>

      {toast && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-amber-gold/30 bg-onyx-black/95 px-4 py-2.5 text-xs font-semibold text-amber-glow shadow-xl sm:text-sm">
          <Check size={13} /> {toast}
        </div>
      )}
    </div>
  );
}

function Block({ title, eyebrow, children }: { title: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        {eyebrow && <span className="rounded-full border border-amber-gold/25 bg-amber-gold/5 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.2em] text-amber-gold">{eyebrow}</span>}
        <h4 className="text-lg font-black text-zinc-100 sm:text-xl">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function SField({ label, value, dir, onChange }: { label: string; value: string; dir?: string; onChange: (v: string) => void }) {
  return (
    <label className="block"><span className="mb-1.5 block text-xs font-semibold text-zinc-400 sm:text-sm">{label}</span><input value={value} dir={dir} onChange={(e) => onChange(e.target.value)} className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-zinc-100 outline-none transition focus:border-amber-gold/60 focus:ring-4 focus:ring-amber-gold/15 sm:h-14 sm:text-base" /></label>
  );
}

function SecRow({ icon: Icon, title, desc, action, danger }: { icon: typeof Package; title: string; desc: string; action: React.ReactNode; danger?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/[0.03] p-3 sm:gap-3 sm:p-4">
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${danger ? "bg-amber-rose/10 text-amber-rose" : "bg-amber-gold/10 text-amber-gold"} sm:h-11 sm:w-11`}><Icon size={18} /></div>
      <div className="min-w-0 flex-1"><div className="truncate text-sm font-bold text-zinc-100 sm:text-base"><span className="block truncate">{title}</span></div><div className="truncate text-xs text-zinc-500 sm:text-sm">{desc}</div></div>{action}
    </div>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (<button onClick={onClick} className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-emerald-500" : "bg-white/15"}`} aria-pressed={on}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "right-0.5" : "right-5"}`} /></button>);
}
