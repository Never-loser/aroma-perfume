import { ArrowLeft, Clock, CalendarDays } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { ARTICLES } from "../data/articles";
import Reveal from "./Reveal";
import { SectionHeading } from "./ui";

export default function BlogView() {
  const { go, openArticle } = useStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-1.5 text-xs text-zinc-500">
        <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-300">مجله آروما</span>
      </div>

      <Reveal>
        <SectionHeading eyebrow="JOURNAL" title={<span>مجله‌ی <span className="amber-gradient-text"> آروما</span></span>} desc="جدیدترین مقالات و راهنماهای تخصصی دنیای عطر را بخوانید." />
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.05}>
            <article
              onClick={() => openArticle(a.id)}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-amber-gold/30 hover:shadow-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="rounded-full border border-amber-gold/25 bg-amber-gold/5 px-2.5 py-0.5 font-bold text-amber-gold">{a.category}</span>
                  <span className="flex items-center gap-1 text-zinc-500"><Clock size={11} /> {a.readTime}</span>
                </div>
                <h3 className="mt-2.5 text-base font-black leading-snug text-zinc-100 transition group-hover:text-amber-glow">{a.title}</h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-6 text-zinc-400">{a.excerpt}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="flex items-center gap-1 text-[10px] text-zinc-500"><CalendarDays size={11} /> {a.date}</span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-gold">
                    ادامه مطلب <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
