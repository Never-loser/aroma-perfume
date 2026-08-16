import { Crown, Gem, Leaf, ShieldCheck, Sparkles, Users } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHeading } from "./ui";

const VALUES = [
  { icon: Gem, title: "اصالت خالص", desc: "هر عطر با ضمانت ۱۰۰٪ اورجینال، مستقیم از برندهای معتبر جهانی." },
  { icon: Leaf, title: "مواد کمیاب", desc: "انتخاب سخت‌گیرانه‌ی نادرترین مواد اولیه از سراسر جهان." },
  { icon: ShieldCheck, title: "اعتماد سلطنتی", desc: "بازگشت ۷ روزه و رضایت کامل مشتریان، تعهد ما به شماست." },
  { icon: Users, title: "خدمت اختصاصی", desc: "مشاوره تخصصی عطر و راهنمایی دستیار هوشمند، در هر لحظه." },
];

const STATS = [
  { value: "+۱۲", label: "سال تجربه" },
  { value: "+۱۲۰۰", label: "عطر اورجینال" },
  { value: "+۵۰", label: "برند لوکس" },
  { value: "+۹۸٪", label: "رضایت مشتری" },
];

const TIMELINE = [
  { year: "۱۳۹۲", title: "آغاز راه", desc: "افتتاح اولین گالری عطر تخصصی با رویکرد ارائه محصولات اورجینال." },
  { year: "۱۳۹۷", title: "گسترش برندها", desc: "همکاری با بیش از ۵۰ برند لوکس جهان و راه‌اندازی فروش آنلاین." },
  { year: "۱۴۰۱", title: "دستیار هوشمند", desc: "معرفی اولین دستیار هوشمند عطر در ایران برای انتخاب آسان‌تر." },
  { year: "۱۴۰۳", title: "کلوب سلطنتی", desc: "راه‌اندازی کلوب وفاداری مشتریان با خدمات ویژه و اختصاصی." },
];

export default function AboutView() {
  return (
    <div>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-amber-gold/10 py-16 sm:py-24">
        <div className="absolute inset-0">
          <img src="/images/hero.jpg" alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx-black via-onyx-black/80 to-onyx-black/60" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-dark to-amber-glow shadow-lg shadow-amber-gold/20">
            <Crown size={32} className="text-onyx-black" />
          </div>
          <h1 className="font-serif text-3xl font-black sm:text-5xl">
            داستان <span className="amber-gradient-text">آروما</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-zinc-300">
            ما باور داریم که عطر، تنها یک بو نیست؛ بلکه امضا، خاطره و تجسم شخصیت شماست.
            ماموریت ما، رساندن این تجربه‌ی سلطنتی به هر ایرانی است.
          </p>
        </div>
      </section>

      {/* story */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Reveal>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-gold/15">
              <img src="/images/craft.jpg" alt="کارگاه" className="h-80 w-full object-cover" />
            </div>
            <div>
              <SectionHeading eyebrow="OUR STORY" title={<span>از یک <span className="amber-gradient-text">عشق</span> کوچک</span>} />
              <div className="space-y-4 text-sm leading-8 text-zinc-300">
                <p> آروما با شوق معرفی عطرهای اورجینال به بازار ایران متولد شد؛ جایی که اصالت و کیفیت حرف اول را می‌زند.</p>
                <p>ما با تیمی از عطرشناسان متخصص، هر محصول را پیش از عرضه بررسی و تأیید می‌کنیم تا با خیالی آسوده، عطر ایده‌آل خود را تجربه کنید.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* stats */}
      <section className="border-y border-amber-gold/10 bg-onyx-dark/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="font-serif text-3xl font-black text-amber-glow sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs text-zinc-400">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <Reveal>
          <SectionHeading center eyebrow="WHY US" title={<span>ارزش‌های <span className="amber-gradient-text">سلطنتی</span> ما</span>} />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="h-full rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-6 text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-amber-gold/10 text-amber-gold">
                  <v.icon size={24} />
                </div>
                <h3 className="font-bold text-zinc-100">{v.title}</h3>
                <p className="mt-2 text-xs leading-6 text-zinc-400">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <Reveal>
          <SectionHeading center eyebrow="JOURNEY" title={<span>مسیر <span className="amber-gradient-text">پیشرفت</span> ما</span>} />
        </Reveal>
        <div className="relative mr-4 border-r border-amber-gold/20 pr-8">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className="relative mb-8">
                <span className="absolute -right-[42px] top-1 grid h-6 w-6 place-items-center rounded-full border border-amber-gold/40 bg-onyx-black text-amber-gold">
                  <Sparkles size={11} />
                </span>
                <div className="font-serif text-lg font-black text-amber-glow">{t.year}</div>
                <div className="mt-1 font-bold text-zinc-100">{t.title}</div>
                <p className="mt-1 text-sm text-zinc-400">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
