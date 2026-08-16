import { ArrowRight, Clock, CalendarDays, ChevronLeft, Sparkles } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { ARTICLES } from "../data/articles";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { GoldButton, GhostButton, SectionHeading } from "./ui";

export default function ArticleView() {
  const { selectedArticleId, go, openArticle } = useStore();
  const article = ARTICLES.find((a) => a.id === selectedArticleId) ?? ARTICLES[0];
  const more = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);
  const related = products.filter((p) => p.bestseller).slice(0, 4);

  return (
    <article>
      {/* breadcrumb */}
      <div className="mx-auto flex max-w-3xl items-center gap-1.5 px-4 pt-8 text-xs text-zinc-500 sm:px-6">
        <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
        <ChevronLeft size={12} />
        <button onClick={() => go("home")} className="hover:text-amber-gold">مجله</button>
        <ChevronLeft size={12} />
        <span className="truncate text-zinc-300">{article.title}</span>
      </div>

      {/* hero */}
      <header className="mx-auto mt-5 max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="rounded-full border border-amber-gold/25 bg-amber-gold/5 px-2.5 py-0.5 font-bold text-amber-gold">{article.category}</span>
            <span className="flex items-center gap-1 text-zinc-500"><Clock size={11} /> {article.readTime}</span>
            <span className="flex items-center gap-1 text-zinc-500"><CalendarDays size={11} /> {article.date}</span>
          </div>
          <h1 className="mt-3 text-balance text-3xl font-black leading-snug text-zinc-50 sm:text-4xl">{article.title}</h1>
          <p className="mt-3 text-sm leading-8 text-zinc-400">{article.excerpt}</p>
          <button onClick={() => go("home")} className="mt-5 flex items-center gap-1 text-xs font-bold text-amber-gold hover:underline"><ArrowRight size={14} /> بازگشت به مجله</button>
        </Reveal>
        <Reveal delay={0.05} variant="scale">
          <div className="mt-6 aspect-[16/9] overflow-hidden rounded-[2rem] border border-amber-gold/15 shadow-pop">
            <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </header>

      {/* body */}
      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="space-y-5 text-sm leading-9 text-zinc-300">
            <p>در دنیای عطر، انتخاب درست نیازمند شناخت جزئیات و سلیقه‌ی شخصی است. در این مقاله از <span className="font-bold text-amber-glow">آروما</span> به‌صورت تخصصی به این موضوع می‌پردازیم تا با آگاهی کامل‌تر، بهترین انتخاب را داشته باشید.</p>
            <h2 className="pt-2 text-xl font-black text-zinc-100">از کجا شروع کنیم؟</h2>
            <p>پیش از هر چیز باید بدانید که رایحه‌ها در خانواده‌های مختلفی دسته‌بندی می‌شوند؛ از گل‌ایی و چوبی گرفته تا شرقی و تازه. شناخت خانواده‌ی رایحه‌ای که به آن گرایش دارید، اولین گام در انتخاب عطر ایده‌آل است.</p>
            <blockquote className="rounded-2xl border-r-4 border-amber-gold/50 bg-amber-gold/5 px-5 py-4 text-zinc-200">عطر، نخستین چیزی است که از شما به یاد می‌ماند و آخرین چیزی که از یاد می‌رود.</blockquote>
            <p>پس از انتخاب خانواده‌ی رایحه، به ماندگاری و پخش بو توجه کنید. این دو ویژگی نشان می‌دهند که عطر چقدر روی پوست باقی می‌ماند و دیگران از چه فاصله‌ای آن را حس می‌کنند.</p>
            <h2 className="pt-2 text-xl font-black text-zinc-100">نکات طلایی</h2>
            <ul className="space-y-2.5">
              {[
                "عطر را روی نقاط نبض‌دار بدن (مچ، گردن) بزنید.",
                "از تست هم‌زمان چند عطر روی پوست خودداری کنید.",
                "عطر را در جای خشک و خنک و دور از نور نگه‌داری کنید.",
                "پیش از خرید، عطر را حداقل ۲۴ ساعت روی پوست امتحان کنید.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-gold" /> {t}</li>
              ))}
            </ul>
            <p>در نهایت، فراموش نکنید که بهترین عطر، عطری است که با شخصیت و سبک زندگی شما هماهنگ باشد. در گالری  آروما، تیم تخصصی ما برای راهنمایی شما در انتخاب این تجربه‌ی منحصربه‌فرد آماده است.</p>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-3xl border border-amber-gold/15 bg-gradient-to-l from-onyx-gray to-onyx-dark p-5">
          <Sparkles className="text-amber-gold" size={22} />
          <p className="flex-1 text-xs leading-6 text-zinc-300">به کمک دستیار هوشمند آروما، عطر متناسب با سلیقه‌ی خود را در چند ثانیه پیدا کنید.</p>
          <GoldButton className="h-11 px-5 text-xs" onClick={() => go("catalog")}>کاوش گالری <ChevronLeft size={15} /></GoldButton>
        </div>
      </div>

      {/* related products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="SHOP" title={<span>عطرهای <span className="amber-gradient-text">منتخب</span></span>} />
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {related.map((p) => (<div key={p.id} className="w-60 shrink-0 snap-start sm:w-auto"><ProductCard product={p} /></div>))}
        </div>
      </section>

      {/* more articles */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <SectionHeading eyebrow="MORE" title={<span>مقالات <span className="amber-gradient-text">بیشتر</span></span>} />
          <GhostButton className="hidden h-11 px-5 text-xs sm:inline-flex" onClick={() => go("home")}>همه مقالات <ChevronLeft size={15} /></GhostButton>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {more.map((a) => (
            <button key={a.id} onClick={() => openArticle(a.id)} className="group overflow-hidden rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 text-right transition hover:-translate-y-1 hover:border-amber-gold/30">
              <div className="aspect-[16/10] overflow-hidden"><img src={a.image} alt={a.title} className="h-full w-full object-cover transition group-hover:scale-105" /></div>
              <div className="p-4"><span className="text-[10px] font-bold text-amber-gold">{a.category}</span><h4 className="mt-1 line-clamp-2 text-sm font-bold text-zinc-100">{a.title}</h4></div>
            </button>
          ))}
        </div>
      </section>
    </article>
  );
}


