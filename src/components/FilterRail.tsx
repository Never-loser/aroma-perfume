import { useState } from "react";
import { products, type Product } from "../data/products";
import ProductCard from "./ProductCard";
import { SectionHeading } from "./ui";
import { ChevronLeft } from "lucide-react";
import { useStore } from "../store/StoreContext";

type TabDef = { id: string; label: string; filter: (p: Product) => boolean };

const TABS: TabDef[] = [
  { id: "best", label: "پرفروش‌ترین", filter: (p) => p.bestseller },
  { id: "new", label: "تازه‌ها", filter: (p) => p.isNew },
  { id: "sale", label: "تخفیف‌دار", filter: (p) => !!p.oldPrice },
  { id: "women", label: "زنانه", filter: (p) => p.gender === "زنانه" },
  { id: "men", label: "مردانه", filter: (p) => p.gender === "مردانه" },
  { id: "lux", label: "لوکس", filter: (p) => p.sizes[0].price > 12000000 },
];

export default function FilterRail({
  eyebrow = "COLLECTION",
  title,
  desc,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  desc?: string;
}) {
  const { openCatalog } = useStore();
  const [tab, setTab] = useState("best");
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];
  const items = products.filter(active.filter);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />
        <button onClick={() => openCatalog()} className="hidden items-center gap-1 text-xs font-bold text-amber-gold hover:underline sm:flex">
          مشاهده همه <ChevronLeft size={14} />
        </button>
      </div>

      {/* tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {TABS.map((t) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition duration-200 ${
                on
                  ? "border-amber-gold/60 bg-amber-gold/15 text-amber-glow"
                  : "border-white/10 bg-white/5 text-zinc-400 hover:border-amber-gold/30 hover:text-zinc-200"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* products: horizontal snap on mobile, grid on desktop */}
      <div className="flex snap-x gap-3 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
        {items.map((p) => (
          <div key={p.id} className="w-[70%] max-w-[260px] shrink-0 snap-start sm:w-auto sm:max-w-none">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
