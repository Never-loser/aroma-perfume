import { useState } from "react";
import {
  Crown, Sparkles, ShoppingBag, Package, ShoppingCart, CreditCard, User, LogIn,
  GitCompare, Search, Info, Mail, HelpCircle, Compass, ServerCrash, Bot,
  Home as HomeIcon, Smartphone, Boxes, Check, ChevronLeft, ChevronDown,
  Monitor, Code2, Palette, Layers, Moon, Type, Zap, AlignRight, ShieldCheck,
  Award, MousePointerClick, Gauge, RefreshCw, Headphones, BadgeCheck,
  Newspaper, LayoutGrid, Gem, TrendingUp, Heart, Wallet, MapPin, Bell, FileText,
} from "lucide-react";

import Reveal from "./Reveal";
import LivePreview from "./LivePreview";
import { GoldButton, GhostButton, Stars } from "./ui";

const SHOTS = [
  "/images/perfume-gold.jpg", "/images/perfume-dark.jpg", "/images/perfume-rose.jpg",
  "/images/perfume-blue.jpg", "/images/perfume-amber.jpg", "/images/perfume-purple.jpg",
  "/images/perfume-green.jpg", "/images/perfume-black.jpg", "/images/hero.jpg",
  "/images/craft.jpg", "/images/perfume-gold.jpg", "/images/perfume-dark.jpg",
  "/images/perfume-rose.jpg", "/images/perfume-blue.jpg", "/images/perfume-amber.jpg",
];

const HIGHLIGHTS = [
  { icon: LayoutGrid, title: "سه چیدمان کاملاً متفاوت", desc: "برای هر صفحه‌ی کلیدی، سه طرح مستقل با شخصیت بصری متمایز طراحی شده — از کلاسیک شبکه‌ای گرفته تا مجله‌ای تمام‌صفحه." },
  { icon: Smartphone, title: "ورود با موبایل + OTP", desc: "احراز هویت مدرن با شماره موبایل، کد ۶ رقمی، تایمر ارسال مجدد و اعتبارسنجی کامل." },
  { icon: Bot, title: "دستیار هوشمند عطر", desc: "چت‌بات تعاملی که بر اساس سلیقه و مناسبت، بهترین رایحه را پیشنهاد می‌دهد." },
  { icon: Boxes, title: "پنل کاربری بی‌نقص", desc: "داشبورد کامل: سفارش‌ها، علاقه‌مندی، تیکت پشتیبانی، آدرس‌ها، نشست‌های فعال، کیف پول قابل‌شارژ و امنیت." },
];

const FEATURES = [
  "React 19", "TypeScript", "Tailwind CSS 4", "Vite", "کاملاً Responsive", "Mobile First",
  "RTL Ready", "Dark Mode", "Light Mode", "SEO Friendly", "JSON-LD", "Clean Code",
  "Component Based", "Lazy Loading", "Skeleton Loading", "Glassmorphism", "Modern UI",
  "Smooth Animation", "Mega Menu", "Advanced Search", "Product Filtering", "Product Gallery",
  "Quick View", "Wishlist", "Compare", "Shopping Cart", "Multi Step Checkout", "User Dashboard",
  "Blog & Magazine", "FAQ", "Contact Page", "Newsletter", "Toast Notifications", "Premium Icons",
  "URL Routing", "Cookie Banner", "Fast Loading", "Cross Browser", "Pixel Perfect", "OTP Login",
];

const BENEFITS = [
  { icon: Crown, title: "طراحی لوکس و سلطنتی", desc: "هویت بصری اختصاصی برای صنعت عطر — طلایی، زمردی و کرم در هم آمیخته با گرادیان‌های لوکس و افکت‌های شیشه‌ای." },
  { icon: Smartphone, title: "Mobile First واقعی", desc: "تجربه‌ای بی‌نقص از ۳۲۰px تا ۱۹۲۰px. لیست‌های محصولات در موبایل به اسلایدر افقی تبدیل می‌شوند." },
  { icon: AlignRight, title: "راست‌چین اصیل", desc: "ساخته‌شده از پایه برای فارسی و RTL. نه ترجمه، نه هک — طراحی واقعی راست‌چین." },
  { icon: Moon, title: "دارک و لایت مود", desc: "دو تم کامل با حفظ کنتراست WCAG و رنگ‌بندی هوشمندانه‌ی هر دو حالت." },
  { icon: Sparkles, title: "انیمیشن‌های حرفه‌ای", desc: "حرکات ظریف reveal، float، blur-in و scale — بدون اغراق، در خدمت تجربه." },
  { icon: Code2, title: "کد تمیز و ماژولار", desc: "بیش از ۳۰ کامپوننت قابل‌استفاده‌ی مجدد، TypeScript کامل و ساختار قابل‌نگهداری." },
  { icon: Gauge, title: "سرعت بارگذاری بالا", desc: "بهینه برای امتیاز Lighthouse بالا — تصاویر lazy، باندل سبک و رندر سریع." },
  { icon: Search, title: "سئو + JSON-LD", desc: "HTML سمنتیک، متا‌تگ‌های پویا، URL Routing و داده‌های ساختاریافته برای گوگل." },
  { icon: Gem, title: "جزئیات بی‌نظیر", desc: "بج‌های سفید خوانا، افکت گردغبار تعاملی، لایت‌باکس گالری و اسکلتون لودینگ." },
  { icon: TrendingUp, title: "روی تبدیل تمرکز شده", desc: "نوار ارسال رایگان، تخفیف‌های برجسته، مقایسه و پیشنهادهای هوشمند — همه برای فروش بیشتر." },
  { icon: ShieldCheck, title: "صفحات حقوقی و امنیتی", desc: "قوانین، حریم خصوصی، بازگشت کالا و بنر کوکی — آماده برای کسب‌وکار واقعی." },
  { icon: Headphones, title: "پشتیبانی و مستندات", desc: "راهنمای کامل (README)، ساختار ماژولار و پشتیبانی برای راه‌اندازی." },
];

const SPECS = [
  { label: "Framework", value: "React 19" }, { label: "Language", value: "TypeScript" },
  { label: "CSS", value: "Tailwind CSS 4" }, { label: "Build Tool", value: "Vite" },
  { label: "Responsive", value: "✓ Mobile First" }, { label: "RTL", value: "✓ Ready" },
  { label: "Dark Mode", value: "✓" }, { label: "Performance", value: "95+ Lighthouse" },
  { label: "Browser Support", value: "Chrome / Firefox / Safari / Edge" }, { label: "Resolution", value: "320px – 1920px" },
  { label: "Pages", value: "۲۶+ صفحه و پنل" }, { label: "Components", value: "۳۰+ کامپوننت" },
];

const FAQ = [
  { q: "آیا قالب کاملاً راست‌چین و فارسی است؟", a: "بله، تمام بخش‌ها از صفر برای فارسی و راست‌چین طراحی شده‌اند و از فونت‌های فارسی استاندارد استفاده می‌شود." },
  { q: "آیا قالب واکنش‌گرا است؟", a: "بله، با رویکرد Mobile First از ۳۲۰px تا ۱۹۲۰px کاملاً بهینه است. در موبایل، لیست‌های محصول به اسلایدر افقی تبدیل می‌شوند." },
  { q: "چه تعداد صفحه و چیدمان دارد؟", a: "۲۶+ صفحه و پنل، و برای صفحه‌های کلیدی (خانه، فروشگاه، تک‌محصول و ورود) سه چیدمان کاملاً متفاوت." },
  { q: "با چه تکنولوژی‌هایی ساخته شده؟", a: "React 19، TypeScript، Tailwind CSS 4، Lucide، Motion و Vite — همگی به‌صورت ماژولار." },
  { q: "آیا حالت تاریک و روشن دارد؟", a: "بله، هر دو حالت دارک و لایت به‌صورت کامل پیاده‌سازی شده‌اند." },
  { q: "آیا از نظر سئو بهینه است؟", a: "بله، HTML سمنتیک، متا‌تگ‌های OG/Twitter پویا، URL Routing و JSON-LD دارد." },
  { q: "آیا پشتیبانی دریافت می‌کنم؟", a: "بله، راهنمای کامل (README) و پشتیبانی ارائه می‌شود." },
  { q: "آیا به‌روزرسانی رایگان است؟", a: "بله، تمام به‌روزرسانی‌های آینده رایگان هستند." },
];

export default function LandingView() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [pageTheme, setPageTheme] = useState<"dark" | "light">("dark");
  const [pageCat, setPageCat] = useState<string>("all");
  const openDemo = () => { window.open(`${window.location.origin}${window.location.pathname}#/home`, "_blank"); };

  type PCat = "main" | "shop" | "account" | "content" | "system";
  const CATS: { id: PCat | "all"; label: string }[] = [
    { id: "all", label: "همه" }, { id: "main", label: "صفحات اصلی و چیدمان" }, { id: "shop", label: "خرید" },
    { id: "account", label: "حساب کاربری" }, { id: "content", label: "محتوا" }, { id: "system", label: "سیستم" },
  ];

  const ALL_PAGES: { icon: typeof HomeIcon; name: string; path: string; cat: PCat }[] = [
    // Main pages + layouts (12)
    { icon: HomeIcon, name: "صفحه اصلی — کلاسیک", path: "#/home?layout=l1", cat: "main" },
    { icon: HomeIcon, name: "صفحه اصلی — مدرن", path: "#/home?layout=l2", cat: "main" },
    { icon: HomeIcon, name: "صفحه اصلی — مجله‌ای", path: "#/home?layout=l3", cat: "main" },
    { icon: ShoppingBag, name: "فروشگاه — کلاسیک", path: "#/catalog?layout=l1", cat: "main" },
    { icon: ShoppingBag, name: "فروشگاه — مدرن", path: "#/catalog?layout=l2", cat: "main" },
    { icon: ShoppingBag, name: "فروشگاه — مجله‌ای", path: "#/catalog?layout=l3", cat: "main" },
    { icon: Package, name: "تک‌محصول — کلاسیک", path: "#/product/coco-mademoiselle?layout=l1", cat: "main" },
    { icon: Package, name: "تک‌محصول — مدرن", path: "#/product/coco-mademoiselle?layout=l2", cat: "main" },
    { icon: Package, name: "تک‌محصول — مجله‌ای", path: "#/product/coco-mademoiselle?layout=l3", cat: "main" },
    { icon: LogIn, name: "ورود — کلاسیک", path: "#/home?open=auth&layout=l1", cat: "main" },
    { icon: LogIn, name: "ورود — مدرن", path: "#/home?open=auth&layout=l2", cat: "main" },
    { icon: LogIn, name: "ورود — مجله‌ای", path: "#/home?open=auth&layout=l3", cat: "main" },
    // Shop flow (5)
    { icon: ShoppingCart, name: "سبد خرید", path: "#/home?open=cart", cat: "shop" },
    { icon: CreditCard, name: "تسویه‌حساب", path: "#/checkout", cat: "shop" },
    { icon: GitCompare, name: "مقایسه عطرها", path: "#/home?open=compare", cat: "shop" },
    { icon: Search, name: "جستجوی هوشمند", path: "#/home?open=search", cat: "shop" },
    { icon: Bot, name: "دستیار هوشمند", path: "#/home", cat: "shop" },
    // Account sub-pages (7)
    { icon: User, name: "حساب کاربری — نمای کلی", path: "#/account", cat: "account" },
    { icon: Package, name: "حساب کاربری — سفارش‌ها", path: "#/account?tab=orders", cat: "account" },
    { icon: Heart, name: "حساب کاربری — علاقه‌مندی", path: "#/account?tab=favorites", cat: "account" },
    { icon: Wallet, name: "حساب کاربری — کیف پول", path: "#/account?tab=wallet", cat: "account" },
    { icon: MapPin, name: "حساب کاربری — آدرس‌ها", path: "#/account?tab=addresses", cat: "account" },
    { icon: Bell, name: "حساب کاربری — اعلان‌ها", path: "#/account?tab=notifications", cat: "account" },
    { icon: ShieldCheck, name: "حساب کاربری — امنیت", path: "#/account?tab=security", cat: "account" },
    // Content (6)
    { icon: Newspaper, name: "صفحه‌ی مقالات", path: "#/blog", cat: "content" },
    { icon: FileText, name: "مقاله‌ی نمونه", path: "#/article/seasons", cat: "content" },
    { icon: Info, name: "درباره ما", path: "#/about", cat: "content" },
    { icon: Mail, name: "تماس با ما", path: "#/contact", cat: "content" },
    { icon: HelpCircle, name: "سوالات متداول", path: "#/faq", cat: "content" },
    { icon: FileText, name: "قوانین و حریم خصوصی", path: "#/terms", cat: "content" },
    // System (2)
    { icon: Compass, name: "صفحه ۴۰۴", path: "#/notfound", cat: "system" },
    { icon: ServerCrash, name: "خطای سرور ۵۰۳", path: "#/servererror", cat: "system" },
  ];

  const filteredPages = pageCat === "all" ? ALL_PAGES : ALL_PAGES.filter((p) => p.cat === pageCat);

  return (
    <div className="relative min-h-screen overflow-x-hidden">


      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 border-b border-amber-gold/15 bg-onyx-black/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-dark to-amber-glow text-lg shadow-lg shadow-amber-gold/20">👑</span>
            <div className="leading-none text-right">
              <div className="text-base font-black tracking-wider text-amber-glow">AROMA</div>
              <div className="text-[9px] tracking-[0.25em] text-amber-gold/70">قالب فروشگاهی عطر</div>
            </div>
          </button>
          <GoldButton className="h-11 px-5 text-xs" onClick={openDemo}><Monitor size={16} /> مشاهده‌ی دمو</GoldButton>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-right">
            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-gold/30 bg-amber-gold/5 px-3 py-1 text-[11px] font-semibold text-amber-gold"><Sparkles size={12} /> قالب فروشگاهی عطر</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400"><Check size={12} /> واکنش‌گرا</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-rose/30 bg-amber-rose/10 px-3 py-1 text-[11px] font-semibold text-amber-rose"><Check size={12} /> RTL</span>
              </div>
            </Reveal>
            <Reveal delay={0.05} variant="blur">
              <h1 className="mt-5 text-balance text-4xl font-black leading-[1.1] sm:text-5xl lg:text-6xl">قالب فروشگاهی <span className="amber-gradient-text">آروما</span></h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-8 text-zinc-300 lg:mx-0 sm:text-base">
                قالبی کامل برای فروشگاه عطر و ادکلن. با ۲۶+ صفحه‌ی دقیق، سه چیدمان متفاوت برای هر صفحه‌ی کلیدی، پنل کاربری بی‌نقص، ورود با موبایل و OTP، دستیار هوشمند عطر، گالری محصول با لایت‌باکس، مقایسه و علاقه‌مندی، اسکلتون لودینگ، سئو + JSON-LD و ده‌ها قابلیت دیگر — آروما فقط یک قالب نیست؛ یک تجربه‌ی کامل خرید عطر است.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start"><Stars value={5} size={18} /><span className="text-sm text-zinc-400"><span className="font-bold text-amber-glow">۵.۰</span> · ۱۲۰+ نظر</span></div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <GoldButton className="h-14" onClick={openDemo}><Monitor size={18} /> مشاهده‌ی دموی زنده</GoldButton>
                <GhostButton className="h-14" onClick={() => document.getElementById("layouts")?.scrollIntoView({ behavior: "smooth" })}><LayoutGrid size={18} /> چیدمان‌ها</GhostButton>
              </div>
            </Reveal>
          </div>

          {/* mockup */}
          <Reveal delay={0.12} variant="scale" className="mx-auto w-full max-w-lg">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-amber-gold/25 via-emerald-500/5 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-amber-gold/20 bg-onyx-dark/60 shadow-pop">
                <div className="flex items-center gap-1.5 border-b border-white/8 bg-onyx-black/50 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-rose/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-gold/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="mr-auto font-mono text-[10px] text-zinc-500" dir="ltr">aroma.ir</span>
                </div>
                <img src="/images/hero.jpg" alt="پیش‌نمایش" className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-2xl border border-amber-gold/20 bg-onyx-black/85 px-4 py-3 shadow-card backdrop-blur-xl sm:flex"><Smartphone size={18} className="text-amber-gold" /><span className="text-[11px] font-semibold text-zinc-200">سازگار با همه‌ی دستگاه‌ها</span></div>
              <div className="absolute -right-4 top-1/4 hidden items-center gap-2 rounded-2xl border border-amber-gold/20 bg-onyx-black/85 px-4 py-3 shadow-card backdrop-blur-xl xl:flex"><Zap size={18} className="text-amber-gold" /><span className="text-[11px] font-semibold text-zinc-200">سرعت بالا</span></div>
            </div>
          </Reveal>
        </div>

        {/* stats */}
        <Reveal delay={0.25}>
          <div className="mt-12 grid grid-cols-2 gap-3 rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-4 sm:grid-cols-4 sm:p-6">
            {[["۲۶+", "صفحه و پنل"], ["۳۰+", "کامپوننت"], ["۳×۴", "چیدمان مستقل"], ["۹۵+", "امتیاز Lighthouse"]].map(([v, l]) => (
              <div key={l} className="text-center"><div className="text-2xl font-black text-amber-glow sm:text-3xl">{v}</div><div className="mt-1 text-[11px] text-zinc-400">{l}</div></div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== HIGHLIGHTS ===== */}
      <Section eyebrow="HIGHLIGHTS" title={<>چرا <span className="amber-gradient-text">آروما</span> متفاوت است؟</>} desc="این قالب فقط چند صفحه‌ی ساده نیست. هر بخش آن با دقت طراحی شده تا تجربه‌ای لوکس و حرفه‌ای بسازد.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.05}>
              <div className="flex h-full flex-col gap-3 rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-gold/40 hover:shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-dark/30 to-amber-gold/10 text-amber-gold"><f.icon size={22} /></div>
                <h3 className="text-base font-black text-zinc-100">{f.title}</h3>
                <p className="text-xs leading-6 text-zinc-400">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== FEATURES ===== */}
      <Section eyebrow="FEATURES" title={<>ویژگی‌های <span className="amber-gradient-text">قالب</span></>} desc="بیش از ۳۵ ویژگی حرفه‌ای که آروما را کامل می‌کنند — از فنی تا تجربه‌ی کاربری.">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f} delay={(i % 4) * 0.03}>
              <div className="flex items-center gap-2.5 rounded-2xl border border-amber-gold/10 bg-onyx-dark/40 px-3.5 py-3 text-xs font-semibold text-zinc-200 backdrop-blur-sm transition hover:border-amber-gold/30 hover:bg-onyx-dark/70">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400"><Check size={12} /></span> {f}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== ALL PAGES (31+ × dark/light) ===== */}
      <section id="pages" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
        <Reveal><SectionTitle eyebrow="ALL PAGES" title={<>۳۲ صفحه × <span className="amber-gradient-text">دارک + لایت</span> = ۶۴ طرح</>} desc="ماوس را روی هر کارت نگه دارید تا پیش‌نمایش زنده‌ی همان صفحه را ببینید. با کلیک، در تب جدید باز می‌شود." /></Reveal>

        {/* theme + category toggle */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex gap-1 rounded-full border border-amber-gold/20 bg-onyx-dark/60 p-1">
              <button onClick={() => setPageTheme("dark")} className={`flex items-center gap-1 rounded-full px-4 py-2 text-xs font-bold transition ${pageTheme === "dark" ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-400"}`}>🌙 حالت تاریک</button>
              <button onClick={() => setPageTheme("light")} className={`flex items-center gap-1 rounded-full px-4 py-2 text-xs font-bold transition ${pageTheme === "light" ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-400"}`}>☀️ حالت روشن</button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {CATS.map((c) => (
                <button key={c.id} onClick={() => setPageCat(c.id)} className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition ${pageCat === c.id ? "border-amber-gold/60 bg-amber-gold/15 text-amber-glow" : "border-white/10 text-zinc-400 hover:border-amber-gold/30"}`}>{c.label}</button>
              ))}
            </div>
            <span className="text-[11px] text-zinc-500">{filteredPages.length.toLocaleString("fa-IR")} صفحه در حالت {pageTheme === "dark" ? "تاریک" : "روشن"}</span>
          </div>
        </Reveal>

        {/* page cards — LIVE previews */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPages.map((p, i) => {
            const href = `${window.location.origin}${window.location.pathname}${p.path}${pageTheme === "light" ? (p.path.includes("?") ? "&theme=light" : "?theme=light") : ""}`;
            return (
              <Reveal key={p.name} delay={(i % 3) * 0.04}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 text-right backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-amber-gold/40 hover:shadow-card">
                  <LivePreview
                    path={p.path}
                    alt={p.name}
                    className="aspect-[16/10]"
                    icon={<p.icon size={18} />}
                    theme={pageTheme}
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center gap-2">
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${pageTheme === "dark" ? "bg-zinc-800 text-zinc-400" : "bg-amber-gold/15 text-amber-glow"}`}><p.icon size={14} /></span>
                      <h3 className="flex-1 text-sm font-black text-zinc-100">{p.name}</h3>
                      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold ${pageTheme === "dark" ? "border-zinc-700 text-zinc-500" : "border-amber-gold/30 bg-amber-gold/10 text-amber-glow"}`}>{pageTheme === "dark" ? "🌙" : "☀️"}</span>
                    </div>
                    <span className="mt-2 flex items-center gap-1 text-[11px] font-bold text-amber-gold">باز کردن در دمو <ChevronLeft size={13} className="transition-transform group-hover:-translate-x-1" /></span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <Section eyebrow="WHY US" title={<>چرا <span className="amber-gradient-text">این قالب</span>؟</>} desc="۱۲ دلیل محکم برای انتخاب آروما به‌جای ده‌ها قالب معمولی.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.05}>
              <div className="flex h-full items-start gap-3.5 rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-gold/40 hover:shadow-card">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-dark/30 to-amber-gold/10 text-amber-gold"><b.icon size={22} /></div>
                <div><h3 className="text-sm font-black text-zinc-100">{b.title}</h3><p className="mt-1 text-[11px] leading-6 text-zinc-400">{b.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== GALLERY ===== */}
      <Section eyebrow="GALLERY" title={<>گالری <span className="amber-gradient-text">پیش‌نمایش</span></>} desc="نگاهی به طراحی صفحات با افکت‌های Hover و درخشش.">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {SHOTS.map((src, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <div className="group relative overflow-hidden rounded-3xl border border-amber-gold/10 shadow-card transition duration-500 hover:border-amber-gold/40 hover:shadow-gold">
                <img src={src} alt={`پیش‌نمایش ${i + 1}`} loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx-black/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 right-0 translate-y-3 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-gold/30 bg-onyx-black/70 px-3 py-1.5 text-[10px] font-bold text-amber-gold backdrop-blur-md"><MousePointerClick size={12} /> آروما</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== DESIGN SYSTEM ===== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <Reveal><SectionTitle eyebrow="DESIGN SYSTEM" title={<>سیستم طراحی <span className="amber-gradient-text">حرفه‌ای</span></>} /></Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col gap-4 rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-6">
              <h4 className="flex items-center gap-2 text-sm font-black text-zinc-100"><Palette size={16} className="text-amber-gold" /> پالت رنگ لوکس</h4>
              <div className="flex flex-wrap gap-2.5">
                {[["زمردی", "#0e3d2b"], ["طلایی", "#E5C583"], ["Amber", "#B88B3E"], ["رزگلد", "#E08B69"], ["فیروزه‌ای", "#4fd1c0"], ["کرم", "#F7F4EF"]].map(([n, c]) => (
                  <div key={n} className="flex flex-col items-center gap-1"><span className="h-12 w-12 rounded-2xl border border-white/10 shadow-md" style={{ background: c }} /><span className="text-[10px] text-zinc-400">{n}</span></div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex h-full flex-col gap-3 rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-6">
              <h4 className="flex items-center gap-2 text-sm font-black text-zinc-100"><Type size={16} className="text-amber-gold" /> تایپوگرافی</h4>
              <div className="text-3xl font-black text-zinc-50">آروما</div>
              <div className="text-base font-bold text-amber-glow">گالری عطر سلطنتی</div>
              <p className="text-xs leading-6 text-zinc-400">سلسله‌مراتب تایپوگرافی و خوانایی متن در فونت فارسی استاندارد.</p>
              <div className="mt-1 flex flex-wrap gap-1.5">{["ایران‌یکنان", "وزیرمتن", "کتیبه", "لاله‌زار", "مرکزی", "نوتو"].map((f) => (<span key={f} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-zinc-300">{f}</span>))}</div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col gap-3 rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-6">
              <h4 className="flex items-center gap-2 text-sm font-black text-zinc-100"><Layers size={16} className="text-amber-gold" /> کامپوننت‌ها</h4>
              <div className="flex flex-wrap gap-2"><GoldButton className="h-10 px-4 text-xs">دکمه اصلی</GoldButton><GhostButton className="h-10 px-4 text-xs">دکمه فرعی</GhostButton></div>
              <div className="flex items-center gap-2"><Stars value={4.5} size={16} /><span className="text-xs text-zinc-400">سیستم امتیازدهی</span></div>
              <div className="flex flex-wrap gap-2"><span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#08130c] shadow">بج سفید</span><span className="rounded-full border border-amber-gold/30 bg-amber-gold/10 px-3 py-1 text-[10px] font-bold text-amber-glow">بج طلا</span></div>
              <span className="text-[11px] text-zinc-500">+ کارت، فرم، مودال، آکاردئون، اسلایدر و...</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SPECS ===== */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Reveal><SectionTitle eyebrow="SPECS" title={<>مشخصات <span className="amber-gradient-text">فنی</span></>} /></Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-amber-gold/15 bg-onyx-dark/40">
            {SPECS.map((s, i) => (
              <div key={s.label} className={`flex items-center justify-between gap-3 px-5 py-3.5 text-sm ${i % 2 ? "bg-white/[0.02]" : ""}`}>
                <span className="text-zinc-400">{s.label}</span><span className="font-bold text-zinc-100">{s.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Reveal><SectionTitle eyebrow="FAQ" title={<>سوالات <span className="amber-gradient-text">متداول</span></>} /></Reveal>
        <div className="mt-8 space-y-2.5">
          {FAQ.map((f, i) => {
            const open = faqOpen === i;
            return (
              <Reveal key={f.q} delay={(i % 4) * 0.03}>
                <div className={`overflow-hidden rounded-2xl border transition ${open ? "border-amber-gold/30 bg-onyx-dark/50" : "border-white/8 bg-onyx-dark/30"}`}>
                  <button onClick={() => setFaqOpen(open ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-right">
                    <span className="text-sm font-bold text-zinc-100">{f.q}</span>
                    <ChevronDown size={18} className={`shrink-0 text-amber-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><p className="px-4 pb-4 text-xs leading-7 text-zinc-400">{f.a}</p></div></div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-gold/20 bg-gradient-to-l from-onyx-gray to-onyx-dark p-8 text-center shadow-pop sm:p-14">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-amber-gold/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-rose/10 blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-3 flex items-center justify-center gap-2"><Sparkles className="text-amber-gold" size={26} /><Award className="text-amber-gold" size={26} /></div>
              <h3 className="text-balance text-2xl font-black text-zinc-50 sm:text-3xl">آماده‌اید <span className="amber-gradient-text">آروما</span> را تجربه کنید؟</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-zinc-300">قالبی لوکس، کامل و بی‌نقص برای فروشگاه عطر شما. همین حالا دموی کامل را کاوش کنید.</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <GoldButton className="h-14" onClick={openDemo}><Monitor size={18} /> مشاهده‌ی دموی زنده</GoldButton>
                <GhostButton className="h-14" onClick={() => document.getElementById("pages")?.scrollIntoView({ behavior: "smooth" })}>کاوش صفحات <ChevronLeft size={16} /></GhostButton>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-emerald-400" /> پشتیبانی کامل</span>
                <span className="flex items-center gap-1"><RefreshCw size={13} className="text-emerald-400" /> به‌روزرسانی مادام‌العمر</span>
                <span className="flex items-center gap-1"><BadgeCheck size={13} className="text-amber-gold" /> محصول اورجینال</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-amber-gold/15 py-6 text-center text-[11px] text-zinc-500">
        © {new Date().getFullYear()} آروما — قالب فروشگاهی عطر
      </footer>
    </div>
  );
}

function Section({ id, eyebrow, title, desc, children }: { id?: string; eyebrow: string; title: React.ReactNode; desc?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
      <Reveal><SectionTitle eyebrow={eyebrow} title={title} desc={desc} /></Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: React.ReactNode; desc?: string }) {
  return (
    <div className="text-center">
      <span className="rounded-full border border-amber-gold/25 bg-amber-gold/5 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.25em] text-amber-gold">{eyebrow}</span>
      <h2 className="mt-3 text-balance text-2xl font-black text-zinc-50 sm:text-4xl">{title}</h2>
      {desc && <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">{desc}</p>}
    </div>
  );
}
