import { ChevronLeft, Sparkles, Quote, ArrowLeft, Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { products, toman, CATEGORIES, BRANDS } from "../data/products";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";
import FilterRail from "./FilterRail";
import Articles from "./Articles";
import Reveal from "./Reveal";

import { Stars, GoldButton, GhostButton, SectionHeading } from "./ui";

/* ---------- shared "complete site" sections ---------- */
const FEATURES = [
  { icon: Truck, title: "ارسال رایگان", desc: "بالای ۵ میلیون" },
  { icon: ShieldCheck, title: "اصالت تضمینی", desc: "ضمانت ۱۰۰٪" },
  { icon: RotateCcw, title: "بازگشت ۷ روزه", desc: "رضایت کامل" },
  { icon: Headphones, title: "پشتیبانی ۲۴/۷", desc: "همیشه کنار شما" },
];

const TESTIMONIALS = [
  { name: "سارا م.", text: "تجربه‌ای واقعاً سلطنتی؛ عطر کاملاً اورجینال و بسته‌بندی بی‌نظیر بود.", rating: 5 },
  { name: "آرین ر.", text: "دستیار هوشمند کمک کرد عطر متناسب با سلیقه‌ام پیدا کنم.", rating: 4.5 },
  { name: "نگار ک.", text: "تنوع برندهای لوکس بی‌نظیره و امکان مقایسه عالی است.", rating: 5 },
];

function TrustBand() {
  return (
    <div className="border-y border-amber-gold/10 bg-onyx-dark/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-gold/10 text-amber-gold"><f.icon size={20} /></div>
            <div>
              <div className="text-sm font-bold text-zinc-100">{f.title}</div>
              <div className="text-[11px] text-zinc-400">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandsStrip() {
  const { openCatalog } = useStore();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading center eyebrow="BRANDS" title={<span>برندهای <span className="amber-gradient-text">لوکس</span></span>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {BRANDS.slice(0, 5).map((b) => (
          <button key={b} onClick={() => openCatalog()} className="grid h-20 place-items-center rounded-2xl border border-amber-gold/10 bg-onyx-dark/40 px-4 text-center transition hover:border-amber-gold/40 hover:bg-onyx-dark/70">
            <span className="text-sm font-bold text-zinc-200">{b}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <SectionHeading center eyebrow="REVIEWS" title={<span>نظر <span className="amber-gradient-text">مشتریان</span></span>} />
      <div className="grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-6">
            <Quote className="mb-3 text-amber-gold/40" size={26} />
            <p className="text-sm leading-7 text-zinc-300">{t.text}</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-dark to-amber-gold font-black text-onyx-black">{t.name.charAt(0)}</div>
              <div>
                <div className="text-sm font-bold text-zinc-100">{t.name}</div>
                <Stars value={t.rating} size={12} className="mt-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-amber-gold/20 bg-onyx-dark/50 p-8 text-center sm:p-12">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-gold/15 blur-3xl" />
        <Sparkles className="relative mx-auto mb-3 text-amber-gold" size={26} />
        <h3 className="relative text-xl font-black sm:text-2xl">عضو <span className="amber-gradient-text">کلوب سلطنتی</span> شوید</h3>
        <p className="relative mx-auto mt-2 max-w-md text-sm text-zinc-300">از تخفیف‌های ویژه و عطرهای جدید زودتر از همه باخبر شوید.</p>
        <form onSubmit={(e) => e.preventDefault()} className="relative mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
          <input type="email" required placeholder="ایمیل شما" className="flex-1 rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-zinc-100 outline-none transition focus:border-amber-gold/50" />
          <GoldButton type="submit">عضویت</GoldButton>
        </form>
      </div>
    </section>
  );
}

/* ===================== LAYOUT 2 — MODERN ===================== */
export function HomeLayoutB() {
  const { openCatalog, openProduct } = useStore();
  const best = products.filter((p) => p.bestseller).slice(0, 8);
  const cats = CATEGORIES.filter((c) => c !== "همه");
  const pick = products[6];

  return (
    <div>
      {/* compact hero */}
      <section className="relative overflow-hidden border-b border-amber-gold/10">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="text-center lg:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-gold/30 bg-amber-gold/5 px-3 py-1 text-[11px] text-amber-gold"><Sparkles size={12} /> چیدمان مدرن</span>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl"><span className="amber-gradient-text">رایحه‌ای</span> برای هر لحظه</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-zinc-300 lg:mx-0">با چیدمان مدرن، سریع‌تر کاوش کنید. عطر ایده‌آل خود را در چند ثانیه بیابید.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <GoldButton onClick={() => openCatalog()}>گالری عطرها <ChevronLeft size={16} /></GoldButton>
              <GhostButton onClick={() => openProduct(products[0].id)}>پرفروش‌ترین</GhostButton>
            </div>
          </div>
          <div className="relative mx-auto h-72 w-48 overflow-hidden rounded-3xl border border-amber-gold/20 shadow-2xl lg:block">
            <ProductImage product={pick} contain className="h-full w-full" />
          </div>
        </div>
      </section>

      <TrustBand />

      {/* category rail */}
      <div className="border-b border-amber-gold/10 bg-onyx-dark/30">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 no-scrollbar sm:px-6">
          {cats.map((c) => (
            <button key={c} onClick={() => openCatalog(c)} className="shrink-0 rounded-full border border-amber-gold/20 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 transition hover:border-amber-gold/50 hover:text-amber-gold">{c}</button>
          ))}
        </div>
      </div>

      {/* editor's pick */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="EDITOR'S PICK" title={<span>انتخاب <span className="amber-gradient-text">سردبیر</span></span>} />
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <button onClick={() => openProduct(pick.id)} className="group relative flex h-full w-full items-center overflow-hidden rounded-3xl border border-amber-gold/15 bg-gradient-to-l from-onyx-gray to-onyx-dark p-6 text-right transition hover:border-amber-gold/40">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-gold/15 px-3 py-0.5 text-[10px] font-bold text-amber-glow"><Sparkles size={11} /> منتخب ویژه</span>
                <div className="mt-3 text-[10px] tracking-wide text-amber-gold/80">{pick.brand}</div>
                <h3 className="mt-1 text-2xl font-black text-zinc-100 sm:text-3xl">{pick.name}</h3>
                <p className="mt-2 max-w-xs text-xs leading-6 text-zinc-400">{pick.description}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Stars value={pick.rating} size={14} />
                  <span className="text-sm font-black text-amber-glow">از {toman(pick.sizes[0].price)}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-gold">مشاهده <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /></span>
              </div>
              <div className="h-44 w-32 shrink-0 overflow-hidden rounded-2xl"><ProductImage product={pick} contain className="h-full w-full transition-transform group-hover:scale-110" /></div>
            </button>
          </Reveal>
          <div className="grid gap-4">
            {products.slice(1, 3).map((p) => (
              <button key={p.id} onClick={() => openProduct(p.id)} className="group flex items-center gap-3 rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-4 text-right transition hover:border-amber-gold/40">
                <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl"><ProductImage product={p} contain className="h-full w-full" /></div>
                <div className="flex-1">
                  <div className="text-[10px] text-amber-gold/80">{p.brand}</div>
                  <div className="text-sm font-bold text-zinc-100">{p.name}</div>
                  <div className="text-xs text-amber-glow">از {toman(p.sizes[0].price)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* bestsellers horizontal */}
      <section className="py-6">
        <div className="mx-auto mb-5 flex max-w-7xl items-end justify-between px-4 sm:px-6">
          <SectionHeading eyebrow="BESTSELLERS" title={<span>پرفروش‌ترین‌ها</span>} />
          <GhostButton onClick={() => openCatalog()} className="hidden sm:inline-flex">همه <ChevronLeft size={16} /></GhostButton>
        </div>
        <div className="flex snap-x gap-4 overflow-x-auto px-4 pb-4 no-scrollbar sm:px-6">
          {best.map((p) => (<div key={p.id} className="w-60 shrink-0 snap-start sm:w-64"><ProductCard product={p} /></div>))}
        </div>
      </section>

      <FilterRail
        eyebrow="EXPLORE"
        title={<span>کاوش با <span className="amber-gradient-text">فیلتر هوشمند</span></span>}
        desc="بین پرفروش‌ترین‌ها، تازه‌ها، تخفیف‌دار و دسته‌های مختلف جابه‌جا شوید."
      />

      <Articles />

      <BrandsStrip />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

/* ===================== LAYOUT 3 — MAGAZINE ===================== */
export function HomeLayoutC() {
  const { openCatalog, openProduct } = useStore();
  const feat = products.slice(0, 3);
  const best = products.filter((p) => p.bestseller).slice(0, 4);

  return (
    <div>
      {/* full-bleed editorial hero */}
      <section className="relative flex h-[78vh] min-h-[500px] items-center overflow-hidden">
        <img src="/images/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-l from-onyx-black via-onyx-black/55 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <span className="text-xs tracking-[0.4em] text-amber-gold">EDITORIAL · ۲۰۲۶</span>
          <h1 className="mt-4 max-w-2xl text-5xl font-black leading-[1.05] sm:text-7xl">هنرِ <span className="amber-gradient-text">بویایی</span></h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-zinc-300">یک مجله‌ی بصری از عطر. روایت هر رایحه، در چیدمانی تمام‌صفحه و نامتقارن.</p>
          <div className="mt-7"><GoldButton onClick={() => openCatalog()}>کاوش گالری <ChevronLeft size={16} /></GoldButton></div>
        </div>
      </section>

      <TrustBand />

      {/* numbered features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {feat.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <button onClick={() => openProduct(p.id)} className="group block w-full text-right">
                <span className="text-5xl font-black text-amber-gold/25">{["۰۱", "۰۲", "۰۳"][i]}</span>
                <div className="mt-2 text-[10px] tracking-wide text-amber-gold/80">{p.brand}</div>
                <h3 className="mt-1 text-2xl font-black text-zinc-100 transition group-hover:text-amber-glow">{p.name}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{p.description}</p>
                <div className="mt-4 h-px w-full bg-amber-gold/15" />
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-gold">ادامه مطلب <ArrowLeft size={13} /></span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* alternating rows */}
      <section className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-6">
        {products.slice(4, 6).map((p, i) => (
          <Reveal key={p.id}>
            <div className={`grid items-center gap-6 md:grid-cols-2 ${i % 2 ? "md:[direction:ltr]" : ""}`}>
              <div className="h-72 overflow-hidden rounded-[2rem] border border-amber-gold/10 bg-onyx-dark/40"><ProductImage product={p} contain className="h-full w-full drop-shadow-2xl" /></div>
              <div className={i % 2 ? "md:[direction:rtl]" : ""}>
                <div className="text-xs tracking-[0.3em] text-amber-gold">{p.brand}</div>
                <h3 className="mt-1 text-3xl font-black sm:text-4xl">{p.name}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{p.description}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Stars value={p.rating} />
                  <span className="text-xs text-zinc-500">از {toman(p.sizes[0].price)} ت</span>
                </div>
                <div className="mt-5"><GoldButton onClick={() => openProduct(p.id)}>مشاهده <ChevronLeft size={16} /></GoldButton></div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* pull quote */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <Quote className="mx-auto mb-4 text-amber-gold/40" size={40} />
        <p className="text-2xl font-black leading-relaxed sm:text-3xl">عطر، <span className="amber-gradient-text">بهترین خاطره</span> است که می‌توان پوشید.</p>
      </section>

      <BrandsStrip />

      <FilterRail
        eyebrow="EXPLORE"
        title={<span>کاوش با <span className="amber-gradient-text">فیلتر هوشمند</span></span>}
        desc="بین پرفروش‌ترین‌ها، تازه‌ها، تخفیف‌دار و دسته‌های مختلف جابه‌جا شوید."
      />

      {/* bestsellers */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <SectionHeading eyebrow="BESTSELLERS" title={<span>پرفروش‌ترین <span className="amber-gradient-text">عطرها</span></span>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {best.map((p) => (<ProductCard key={p.id} product={p} />))}
        </div>
      </section>

      <Articles />

      <Testimonials />
      <Newsletter />
    </div>
  );
}
