import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, ChevronLeft, Plus, Check, GitCompare } from "lucide-react";
import ProductCard from "./ProductCard";
import { useStore } from "../store/StoreContext";
import { products, CATEGORIES, BRANDS, toman, type Product } from "../data/products";
import { Stars } from "./ui";
import ProductImage from "./ProductImage";
import Select from "./Select";

const GENDERS = ["همه", "زنانه", "مردانه", "یونی‌سکس"];
const SORTS = [
  { id: "محبوب", label: "محبوب‌ترین" },
  { id: "جدیدترین", label: "جدیدترین" },
  { id: "امتیاز", label: "بیشترین امتیاز" },
  { id: "ماندگاری", label: "بیشترین ماندگاری" },
  { id: "پخش", label: "بیشترین پخش بو" },
  { id: "ارزان", label: "ارزان‌ترین" },
  { id: "گران", label: "گران‌ترین" },
];

function useFiltered() {
  const { filters } = useStore();
  return useMemo(() => {
    let list = products.slice();
    if (filters.category !== "همه") list = list.filter((p) => p.category === filters.category);
    if (filters.brand !== "همه") list = list.filter((p) => p.brand === filters.brand);
    if (filters.gender !== "همه") list = list.filter((p) => p.gender === filters.gender);
    if (filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.includes(filters.query) ||
          p.brand.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q)
      );
    }
    list = list.filter((p) => p.sizes[0].price <= filters.maxPrice);
    switch (filters.sort) {
      case "جدیدترین": list.sort((a, b) => b.launchYear - a.launchYear); break;
      case "امتیاز": list.sort((a, b) => b.rating - a.rating); break;
      case "ماندگاری": list.sort((a, b) => b.longevity - a.longevity); break;
      case "پخش": list.sort((a, b) => b.sillage - a.sillage); break;
      case "ارزان": list.sort((a, b) => a.sizes[0].price - b.sizes[0].price); break;
      case "گران": list.sort((a, b) => b.sizes[0].price - a.sizes[0].price); break;
      default: list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filters]);
}

/* ===================== LAYOUT 2 — MODERN (top bar + grid) ===================== */
export function CatalogLayoutB() {
  const { filters, setFilters, go } = useStore();
  const filtered = useFiltered();
  const [row, setRow] = useState<"cat" | "brand" | "gender">("cat");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-center gap-1.5 text-xs text-zinc-500">
        <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
        <ChevronLeft size={12} /> محصولات
      </div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-2xl font-black sm:text-3xl">گالری <span className="amber-gradient-text">عطرها</span></h1>
          <p className="mt-1 text-sm text-zinc-400">{toman(filtered.length)} عطر اورجینال</p>
        </div>
      </div>

      {/* top filter bar */}
      <div className="mb-6 rounded-3xl border border-amber-gold/15 bg-onyx-dark/50 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2.5">
          <Search size={16} className="text-amber-gold/70" />
          <input
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
            placeholder="جستجوی عطر یا برند..."
            className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
          />
          <Select
            value={filters.sort}
            onChange={(v) => setFilters({ sort: v })}
            options={SORTS.map((s) => ({ value: s.id, label: s.label }))}
            icon={<SlidersHorizontal size={12} />}
            className="w-32 shrink-0"
          />
        </div>

        {/* filter row tabs */}
        <div className="mt-3 flex gap-1.5 text-[11px]">
          {([["cat", "رایحه"], ["gender", "جنسیت"], ["brand", "برند"]] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setRow(k)}
              className={`rounded-full px-3 py-1 font-bold transition ${row === k ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(row === "cat" ? CATEGORIES : row === "gender" ? GENDERS : ["همه", ...BRANDS]).map((c) => (
            <button
              key={c}
              onClick={() => setFilters({ [row === "cat" ? "category" : row === "gender" ? "gender" : "brand"]: c })}
              className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                (row === "cat" ? filters.category : row === "gender" ? filters.gender : filters.brand) === c
                  ? "border-amber-gold/60 bg-amber-gold/15 text-amber-glow"
                  : "border-white/10 text-zinc-400 hover:border-amber-gold/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* advanced: price range + gender */}
        <div className="mt-4 grid gap-4 border-t border-white/8 pt-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">حداکثر قیمت</span>
              <span className="font-bold text-amber-gold">{toman(filters.maxPrice)} تومان</span>
            </div>
            <input type="range" min={5000000} max={32000000} step={500000} value={filters.maxPrice} onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })} className="w-full" />
            <div className="mt-1 flex justify-between text-[9px] text-zinc-500"><span>۵ م</span><span>۳۲ م</span></div>
          </div>
          <div>
            <div className="mb-2 text-[11px] text-zinc-400">جنسیت</div>
            <div className="flex flex-wrap gap-1.5">
              {GENDERS.map((g) => (
                <button key={g} onClick={() => setFilters({ gender: g })} className={`rounded-full border px-2.5 py-1 text-[11px] transition ${filters.gender === g ? "border-amber-gold/60 bg-amber-gold/15 text-amber-glow" : "border-white/10 text-zinc-400 hover:border-amber-gold/30"}`}>{g}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-amber-gold/10 bg-onyx-dark/30 py-20 text-center text-sm text-zinc-400">عطری یافت نشد.</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (<ProductCard key={p.id} product={p} />))}
        </div>
      )}
    </div>
  );
}

/* ===================== LAYOUT 3 — MAGAZINE (list rows) ===================== */
export function CatalogLayoutC() {
  const { filters, setFilters, go, addToCart, openProduct, toggleCompare, compare } = useStore();
  const filtered = useFiltered();

  const Row = ({ p }: { p: Product }) => {
    const inC = compare.includes(p.id);
    return (
      <div className="flex flex-col gap-4 p-4 transition hover:bg-white/[0.03] sm:flex-row sm:items-center">
        <button onClick={() => openProduct(p.id)} className="h-32 w-24 shrink-0 self-center sm:self-auto">
          <ProductImage product={p} className="h-full w-full" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-[11px] tracking-widest text-amber-gold/80">{p.brand}</span>
            {p.bestseller && <span className="rounded-full bg-amber-gold/15 px-2 py-0.5 text-[9px] font-bold text-amber-gold">پرفروش</span>}
          </div>
          <button onClick={() => openProduct(p.id)} className="mt-0.5 block text-right">
            <h3 className="text-lg font-black text-zinc-100 hover:text-amber-glow">{p.name}</h3>
          </button>
          <p className="mt-1 hidden max-w-xl text-xs leading-6 text-zinc-400 sm:block">{p.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {p.topNotes.slice(0, 3).map((n) => (
              <span key={n} className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-zinc-500">{n}</span>
            ))}
          </div>
          <div className="mt-2"><Stars value={p.rating} size={12} /></div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
          <div className="text-left">
            <div className="text-[10px] text-zinc-500">از</div>
            <div className="font-serif text-lg font-black text-amber-glow">{toman(p.sizes[0].price)}</div>
            <div className="text-[9px] text-zinc-500">تومان</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(p.id)}
              className={`grid h-10 w-10 place-items-center rounded-xl border transition ${inC ? "border-amber-gold bg-amber-gold/15 text-amber-gold" : "border-white/10 text-zinc-400 hover:border-amber-gold/40"}`}
            >
              {inC ? <Check size={16} /> : <GitCompare size={16} />}
            </button>
            <button
              onClick={() => addToCart(p.id, p.sizes[0].ml)}
              className="flex items-center gap-1 rounded-xl bg-gradient-to-br from-amber-dark to-amber-gold px-4 py-2.5 text-xs font-bold text-onyx-black transition hover:scale-105"
            >
              <Plus size={15} strokeWidth={2.5} /> افزودن
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-center gap-1.5 text-xs text-zinc-500">
        <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
        <ChevronLeft size={12} /> محصولات
      </div>
      <div className="mb-5">
        <h1 className="font-serif text-2xl font-black sm:text-3xl">فهرست <span className="amber-gradient-text">عطرها</span></h1>
        <p className="mt-1 text-sm text-zinc-400">{toman(filtered.length)} نتیجه · چیدمان لیستی</p>
      </div>

      {/* slim filter strip */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-zinc-500">رایحه:</span>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilters({ category: c })}
            className={`rounded-full px-3 py-1 text-[11px] transition ${filters.category === c ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            {c}
          </button>
        ))}
        <Select
          value={filters.sort}
          onChange={(v) => setFilters({ sort: v })}
          options={SORTS.map((s) => ({ value: s.id, label: s.label }))}
          icon={<SlidersHorizontal size={12} />}
          className="mr-auto w-32 shrink-0"
        />
      </div>

      {/* advanced: gender + price */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-zinc-500">جنسیت:</span>
          {GENDERS.map((g) => (
            <button key={g} onClick={() => setFilters({ gender: g })} className={`rounded-full px-3 py-1 text-[11px] transition ${filters.gender === g ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-400 hover:text-zinc-200"}`}>{g}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="shrink-0 text-[11px] text-zinc-500">قیمت تا:</span>
          <input type="range" min={5000000} max={32000000} step={500000} value={filters.maxPrice} onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })} className="w-full" />
          <span className="shrink-0 whitespace-nowrap text-[10px] font-bold text-amber-gold">{toman(Math.round(filters.maxPrice / 1000000))}م</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-amber-gold/10 bg-onyx-dark/30 py-20 text-center text-sm text-zinc-400">عطری یافت نشد.</div>
      ) : (
        <div className="divide-y divide-white/8 overflow-hidden rounded-3xl border border-amber-gold/10 bg-onyx-dark/30">
          {filtered.map((p) => (<Row key={p.id} p={p} />))}
        </div>
      )}
    </div>
  );
}
