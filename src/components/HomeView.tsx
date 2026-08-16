import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ChevronLeft,
  Quote,
  Gift,
  Sparkles,
} from "lucide-react";
import Hero from "./Hero";
import Reveal from "./Reveal";
import FilterRail from "./FilterRail";
import Articles from "./Articles";

import { SectionHeading, GoldButton, GhostButton, Stars } from "./ui";
import { useStore } from "../store/StoreContext";
import { products, CATEGORIES } from "../data/products";

const FEATURES = [
  { icon: Truck, title: "ارسال رایگان", desc: "برای سفارش‌های بالای ۵ میلیون" },
  { icon: ShieldCheck, title: "اصالت تضمینی", desc: "ضمانت ۱۰۰٪ اصل بودن" },
  { icon: RotateCcw, title: "بازگشت ۷ روزه", desc: "ضمانت رضایت کامل" },
  { icon: Headphones, title: "پشتیبانی ۲۴/۷", desc: "همیشه کنار شما" },
];

const CAT_META: Record<string, { icon: string; desc: string }> = {
  "گل‌ایی": { icon: "🌸", desc: "لطیف و رمانتیک" },
  چوبی: { icon: "🪵", desc: "گرم و عمیق" },
  شرقی: { icon: "🕌", desc: "جذاب و مرموز" },
  "تازه و مرکباتی": { icon: "🍋", desc: "خنک و روشن" },
  "خوشبو و شیرین": { icon: "🍯", desc: "شیرین و اغواگر" },
  "خاج و آروماتیک": { icon: "🌿", desc: "مردانه و کلاسیک" },
};

const TESTIMONIALS = [
  { name: "سارا محمدی", role: "مشتری وفادار", text: "عطر کوکو مادموازل کاملاً اورجینال بود و بسته‌بندی فوق‌العاده. تجربه‌ای واقعاً سلطنتی!", rating: 5 },
  { name: "آرین رضایی", role: "خریدار", text: "دستیار هوشمند کمک کرد عطر متناسب با سلیقه‌ام پیدا کنم. سرعت ارسال عالی بود.", rating: 5 },
  { name: "نگار کریمی", role: "عطرشناس", text: "تنوع برندهای لوکس بی‌نظیره و امکان مقایسه کارم را خیلی راحت کرد.", rating: 4.5 },
];

export default function HomeView() {
  const { openCatalog, openProduct } = useStore();

  return (
    <div>
      <Hero />

      {/* feature strip */}
      <div className="border-y border-amber-gold/10 bg-onyx-dark/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-center gap-3 px-4 py-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-gold/10 text-amber-gold">
                <f.icon size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-100">{f.title}</div>
                <div className="text-[11px] text-zinc-400">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* categories */}
      <Section className="bg-transparent">
        <Reveal>
          <SectionHeading
            center
            eyebrow="EXPLORER"
            title={<span>سفری در <span className="amber-gradient-text">خانواده‌های رایحه</span></span>}
            desc="هر عطر متعلق به یک خانواده رایحه‌ای است. سلیقه خود را کشف کنید."
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.filter((c) => c !== "همه").map((cat, i) => (
            <Reveal key={cat} delay={i * 0.05}>
              <button
                onClick={() => openCatalog(cat)}
                className="group flex w-full flex-col items-center rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-5 text-center transition-all hover:-translate-y-1 hover:border-amber-gold/40 hover:bg-onyx-dark/70"
              >
                <span className="mb-2 text-4xl transition-transform group-hover:scale-125">
                  {CAT_META[cat]?.icon ?? "✦"}
                </span>
                <span className="text-sm font-bold text-zinc-100">{cat}</span>
                <span className="mt-0.5 text-[10px] text-zinc-500">{CAT_META[cat]?.desc}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* filterable collection (bestsellers / new / sale / gender / luxury) */}
      <FilterRail
        eyebrow="BESTSELLERS"
        title={<span>کاوش در <span className="amber-gradient-text">گالری عطرها</span></span>}
        desc="با تب‌ها بین پرفروش‌ترین‌ها، تازه‌ها، تخفیف‌دار و دسته‌بندی‌های دیگر جابه‌جا شوید."
      />

      {/* promo banner */}
      <Section>
        <Reveal>
          <div className="rounded-[2rem] border border-amber-gold/20 bg-gradient-to-l from-onyx-gray via-onyx-dark to-onyx-black p-8 sm:p-12">
            <div className="flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-rose/15 px-3 py-1 text-xs font-bold text-amber-rose">
                <Gift size={14} /> ست‌های هدیه
              </span>
              <h3 className="font-serif text-2xl font-black sm:text-3xl">
                هدیه‌ای <span className="amber-gradient-text">به‌یادماندنی</span> برای عزیزانتان
              </h3>
              <p className="max-w-lg text-sm text-zinc-300">
                ست‌های هدیه با بسته‌بندی اختصاصی و کارت تبریک. مناسب تمام مناسبت‌ها.
              </p>
              <GoldButton onClick={() => openCatalog()}>
                مشاهده ست‌های هدیه <ChevronLeft size={16} />
              </GoldButton>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* journal / articles */}
      <Articles />

      {/* craft section */}
      <Section>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-gold/15">
              <img src="/images/craft.jpg" alt="کارگاه عطرسازی" className="h-72 w-full object-cover sm:h-96" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx-black/70 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-amber-gold/50" />
                <span className="font-serif text-xs tracking-[0.3em] text-amber-gold">THE ATELIER</span>
              </div>
              <h2 className="font-serif text-2xl font-black sm:text-3xl">
                هنر <span className="amber-gradient-text">عطرسازی</span> در اوج ظرافت
              </h2>
              <p className="mt-4 text-sm leading-8 text-zinc-300">
                هر عطر در آروما، حاصل انتخاب سخت‌گیرانه‌ی مواد اولیه کمیاب و
                ترکیبی از هنر و علم عطرسازی است. از عود ناب کمبوج تا گل‌های دست‌چین،
                ما تنها بهترین‌ها را برای شما انتخاب می‌کنیم.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "مواد اولیه کمیاب و درجه یک",
                  "تأییدیه اصالت از برندهای معتبر",
                  "بسته‌بندی لوکس و ضد ضربه",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-zinc-200">
                    <Sparkles size={15} className="text-amber-gold" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <GhostButton onClick={() => openProduct(products[2].id)}>
                  آشنایی با عود وود <ChevronLeft size={16} />
                </GhostButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* testimonials */}
      <Section>
        <Reveal>
          <SectionHeading
            center
            eyebrow="TESTIMONIALS"
            title={<span>تجربه <span className="amber-gradient-text">مشتریان</span> ما</span>}
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-6">
                <Quote className="mb-3 text-amber-gold/40" size={28} />
                <p className="text-sm leading-7 text-zinc-300">{t.text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber-dark to-amber-gold font-black text-onyx-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-100">{t.name}</div>
                    <Stars value={t.rating} size={12} className="mt-0.5" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* newsletter */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-gold/20 bg-onyx-dark/50 p-8 text-center sm:p-12">
            <GoldenGlow />
            <Sparkles className="mx-auto mb-3 text-amber-gold" size={28} />
            <h3 className="font-serif text-2xl font-black sm:text-3xl">
              عضو <span className="amber-gradient-text">کلوب سلطنتی</span> شوید
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-300">
              از تخفیف‌های ویژه، عطرهای جدید و رویدادهای اختصاصی زودتر از همه باخبر شوید.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="ایمیل شما"
                className="flex-1 rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-zinc-100 outline-none transition focus:border-amber-gold/50"
              />
              <GoldButton type="submit">عضویت</GoldButton>
            </form>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 ${className}`}>
      {children}
    </section>
  );
}

function GoldenGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-gold/15 blur-3xl" />
    </div>
  );
}
