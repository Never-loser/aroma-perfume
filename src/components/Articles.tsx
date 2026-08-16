import { ArrowLeft, Clock } from "lucide-react";
import { ARTICLES } from "../data/articles";
import { useStore } from "../store/StoreContext";
import { SectionHeading } from "./ui";

export default function Articles() {
  const { openArticle } = useStore();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        center
        eyebrow="JOURNAL"
        title={<span>مجله‌ی <span className="amber-gradient-text">آروما</span></span>}
        desc="جدیدترین مقالات و راهنماهای تخصصی دنیای عطر را بخوانید."
      />

      {/* horizontal snap on mobile, grid on desktop */}
      <div className="-mx-4 mt-8 flex snap-x gap-5 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {ARTICLES.map((a) => (
          <article
            key={a.id}
            onClick={() => openArticle(a.id)}
            className="group w-72 shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-gold/30 hover:shadow-card sm:w-auto"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="rounded-full border border-amber-gold/25 bg-amber-gold/5 px-2.5 py-0.5 font-bold text-amber-gold">{a.category}</span>
                <span className="flex items-center gap-1 text-zinc-500"><Clock size={11} /> {a.readTime}</span>
              </div>
              <h3 className="mt-2.5 text-base font-black leading-snug text-zinc-100 transition group-hover:text-amber-glow">{a.title}</h3>
              <p className="mt-1.5 line-clamp-2 text-xs leading-6 text-zinc-400">{a.excerpt}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">{a.date}</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-gold">
                  ادامه مطلب <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
