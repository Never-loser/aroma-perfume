import { useMemo, useState } from "react";
import { SlidersHorizontal, X, Search, Frown, ChevronLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import Select from "./Select";
import { ProductCardSkeleton } from "./Skeleton";
import { useStore } from "../store/StoreContext";
import { useLoading } from "../hooks/useLoading";
import { products, CATEGORIES, BRANDS, toman } from "../data/products";

const GENDERS = ["همه", "زنانه", "مردانه", "یونی‌سکس"];
const SORTS = [
  { id: "محبوب", label: "محبوب‌ترین" },
  { id: "جدیدترین", label: "جدیدترین" },
  { id: "پرفروش", label: "پرفروش‌ترین" },
  { id: "امتیاز", label: "بیشترین امتیاز" },
  { id: "ماندگاری", label: "بیشترین ماندگاری" },
  { id: "پخش", label: "بیشترین پخش بو" },
  { id: "ارزان", label: "ارزان‌ترین" },
  { id: "گران", label: "گران‌ترین" },
];

export default function CatalogView() {
  const { filters, setFilters, go } = useStore();
  const [mobileFilters, setMobileFilters] = useState(false);
  const loading = useLoading(450, [filters.category, filters.gender, filters.brand, filters.sort, filters.maxPrice]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (filters.category !== "همه")
      list = list.filter((p) => p.category === filters.category);
    if (filters.brand !== "همه") list = list.filter((p) => p.brand === filters.brand);
    if (filters.gender !== "همه") list = list.filter((p) => p.gender === filters.gender);
    if (filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.includes(filters.query) ||
          p.brand.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.category.includes(filters.query)
      );
    }
    list = list.filter((p) => p.sizes[0].price <= filters.maxPrice);

    switch (filters.sort) {
      case "جدیدترین": list.sort((a, b) => b.launchYear - a.launchYear); break;
      case "پرفروش": list.sort((a, b) => b.sold - a.sold); break;
      case "امتیاز": list.sort((a, b) => b.rating - a.rating); break;
      case "ماندگاری": list.sort((a, b) => b.longevity - a.longevity); break;
      case "پخش": list.sort((a, b) => b.sillage - a.sillage); break;
      case "ارزان": list.sort((a, b) => a.sizes[0].price - b.sizes[0].price); break;
      case "گران": list.sort((a, b) => b.sizes[0].price - a.sizes[0].price); break;
      default: list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filters]);

  const clearFilters = () =>
    setFilters({ category: "همه", brand: "همه", gender: "همه", query: "", maxPrice: 32000000, sort: "محبوب" });

  const FilterPanel = (
    <div className="space-y-7">
      {/* search */}
      <div>
        <FilterLabel>جستجو</FilterLabel>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
          <Search size={16} className="text-amber-gold/70" />
          <input
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
            placeholder="نام عطر..."
            className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* category */}
      <div>
        <FilterLabel>خانواده رایحه</FilterLabel>
        <Select
          value={filters.category}
          onChange={(v) => setFilters({ category: v })}
          options={CATEGORIES.map((c) => ({ value: c, label: c }))}
        />
      </div>

      {/* gender */}
      <div>
        <FilterLabel>جنسیت</FilterLabel>
        <Select
          value={filters.gender}
          onChange={(v) => setFilters({ gender: v })}
          options={GENDERS.map((g) => ({ value: g, label: g }))}
        />
      </div>

      {/* brand */}
      <div>
        <FilterLabel>برند</FilterLabel>
        <Select
          value={filters.brand}
          onChange={(v) => setFilters({ brand: v })}
          options={["همه", ...BRANDS].map((b) => ({ value: b, label: b }))}
        />
      </div>

      {/* price */}
      <div>
        <FilterLabel>
          حداکثر قیمت: <span className="text-amber-gold">{toman(filters.maxPrice)} تومان</span>
        </FilterLabel>
        <input
          type="range"
          min={5000000}
          max={32000000}
          step={500000}
          value={filters.maxPrice}
          onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
          className="w-full"
        />
        <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
          <span>۵ م</span>
          <span>۳۲ م</span>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full rounded-xl border border-white/10 py-2.5 text-xs font-semibold text-zinc-300 transition hover:border-amber-gold/40 hover:text-amber-gold"
      >
        پاک کردن فیلترها
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* header */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
          <ChevronLeft size={12} /> محصولات
        </div>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl font-black sm:text-3xl">
              گالری <span className="amber-gradient-text">عطرها</span>
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {toman(filtered.length)} عطر اورجینال یافت شد
              {filters.category !== "همه" && ` در دسته «${filters.category}»`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* sort */}
            <Select
              value={filters.sort}
              onChange={(v) => setFilters({ sort: v })}
              options={SORTS.map((s) => ({ value: s.id, label: s.label }))}
              icon={<SlidersHorizontal size={13} />}
              className="w-36"
            />
            {/* mobile filter btn */}
            <button
              onClick={() => setMobileFilters(true)}
              className="flex items-center gap-1.5 rounded-full border border-amber-gold/20 bg-onyx-dark/70 px-4 py-2.5 text-xs font-semibold text-zinc-200 lg:hidden"
            >
              <SlidersHorizontal size={14} /> فیلتر
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-5">
            {FilterPanel}
          </div>
        </aside>

        {/* grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border border-amber-gold/10 bg-onyx-dark/30 py-24 text-center">
              <Frown size={40} className="mb-3 text-amber-gold/50" />
              <p className="text-sm text-zinc-400">عطری با این فیلترها یافت نشد.</p>
              <button onClick={clearFilters} className="mt-4 text-xs font-bold text-amber-gold hover:underline">
                پاک کردن فیلترها
              </button>
            </div>
          ) : (
            <div className="flex snap-x gap-3 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (<div key={i} className="w-[72%] max-w-[270px] shrink-0 sm:w-auto sm:max-w-none"><ProductCardSkeleton /></div>))
                : filtered.map((p) => (<div key={p.id} className="w-[72%] max-w-[270px] shrink-0 snap-start sm:w-auto sm:max-w-none"><ProductCard product={p} /></div>))}
            </div>
          )}
        </div>
      </div>

      {/* mobile filter drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] animate-fade-in overflow-y-auto border-l border-amber-gold/20 bg-onyx-dark p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-serif font-black text-amber-glow">فیلترها</span>
              <button onClick={() => setMobileFilters(false)} className="grid h-8 w-8 place-items-center rounded-full bg-white/5">
                <X size={18} />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setMobileFilters(false)}
              className="mt-5 w-full rounded-xl bg-gradient-to-l from-amber-dark to-amber-gold py-3 text-sm font-bold text-onyx-black"
            >
              مشاهده {toman(filtered.length)} عطر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 text-xs font-bold text-zinc-200">{children}</div>;
}




