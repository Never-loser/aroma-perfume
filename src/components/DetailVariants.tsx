import { useState } from "react";
import {
  ChevronLeft, Plus, Minus, ShoppingBag, GitCompare, Check, Heart,
  Clock, Wind, Award, Star, ShieldCheck, Truck, RotateCcw,
} from "lucide-react";
import { useStore, findProduct } from "../store/StoreContext";
import { products, toman } from "../data/products";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { Stars, GoldButton, GhostButton, ImgBadge, SectionHeading } from "./ui";

/* ===================== LAYOUT 2 — MODERN (info left, gallery right, sticky buy) ===================== */
export function DetailLayoutB() {
  const { selectedId, addToCart, toggleCompare, compare, go, openCatalog } = useStore();
  const product = findProduct(selectedId) ?? products[0];
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const size = product.sizes[sizeIdx];
  const inCompare = compare.includes(product.id);
  const basePrice = product.sizes[0].price;
  const discount = product.oldPrice && product.oldPrice > basePrice ? Math.round((1 - basePrice / product.oldPrice) * 100) : 0;
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-1.5 text-xs text-zinc-500">
        <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
        <ChevronLeft size={12} />
        <button onClick={() => openCatalog(product.category)} className="hover:text-amber-gold">{product.category}</button>
        <ChevronLeft size={12} /><span className="text-zinc-300">{product.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* info (first → right in RTL) */}
        <Reveal>
          <div>
            <div className="font-serif text-sm tracking-[0.25em] text-amber-gold/80">{product.brand}</div>
            <h1 className="mt-1 font-serif text-3xl font-black sm:text-4xl">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Stars value={product.rating} size={16} />
              <span className="text-xs text-zinc-500">{toman(product.reviews)} نظر · {toman(product.sold)} فروش</span>
            </div>
            <p className="mt-4 text-sm leading-8 text-zinc-300">{product.description}</p>

            {/* sizes */}
            <div className="mt-5">
              <div className="mb-2 text-sm font-bold text-zinc-200">حجم:</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button key={s.ml} onClick={() => setSizeIdx(i)}
                    className={`rounded-xl border px-5 py-2.5 transition ${sizeIdx === i ? "border-amber-gold bg-amber-gold/15 text-amber-glow" : "border-white/10 text-zinc-300 hover:border-amber-gold/40"}`}>
                    <span className="text-sm font-black">{toman(s.ml)}<span className="text-[10px]">ml</span></span>
                  </button>
                ))}
              </div>
            </div>

            {/* sticky buy box */}
            <div className="sticky top-28 mt-6 rounded-2xl border border-amber-gold/20 bg-onyx-dark/50 p-5 backdrop-blur">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[11px] text-zinc-500">قیمت</div>
                  <div className="font-serif text-3xl font-black text-amber-glow">{toman(size.price)} <span className="text-xs text-zinc-400">ت</span></div>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5 text-zinc-300"><Minus size={15} /></button>
                  <span className="w-7 text-center text-sm font-bold">{toman(qty)}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5 text-zinc-300"><Plus size={15} /></button>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <GoldButton onClick={() => addToCart(product.id, size.ml, qty)} className="flex-1"><ShoppingBag size={17} /> افزودن به سبد</GoldButton>
                <button onClick={() => toggleCompare(product.id)} className={`grid h-12 w-12 place-items-center rounded-full border transition ${inCompare ? "border-amber-gold bg-amber-gold/15 text-amber-gold" : "border-amber-gold/30 text-zinc-300 hover:bg-amber-gold/10"}`}>
                  {inCompare ? <Check size={18} /> : <GitCompare size={18} />}
                </button>
              </div>
              {/* meters */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniMeter icon={Clock} label="ماندگاری" v={product.longevity} />
                <MiniMeter icon={Wind} label="پخش بو" v={product.sillage} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* gallery (left) */}
        <Reveal delay={0.1}>
          <div>
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-gold/15 bg-gradient-to-br from-onyx-dark/60 to-onyx-black/60 p-6">
              {/* badges — left, equal width */}
              <div className="absolute left-4 top-4 z-10 flex w-[92px] flex-col gap-1.5">
                {product.bestseller && <ImgBadge color="#E5C583" className="w-full">پرفروش</ImgBadge>}
                {discount > 0 && <ImgBadge color="#10b981" className="w-full">{discount}٪ تخفیف</ImgBadge>}
                {product.isNew && <ImgBadge color="#E08B69" className="w-full">تازه‌وارد</ImgBadge>}
              </div>
              {/* compare — right */}
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={() => toggleCompare(product.id)}
                  title="مقایسه"
                  className={`grid h-10 w-10 place-items-center rounded-full bg-[rgba(255,255,255,0.95)] shadow-md backdrop-blur-sm transition hover:bg-[#ffffff] ${inCompare ? "ring-2 ring-amber-gold" : ""}`}
                >
                  <GitCompare size={17} className="text-[#08130c]" />
                </button>
              </div>
              <div className="flex h-80 items-center justify-center px-4 pb-2 pt-14 sm:h-[28rem]">
                <ProductImage product={product} contain className="max-h-full max-w-full animate-float" />
              </div>
            </div>
            {/* notes horizontal */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[["سر", product.topNotes], ["قلب", product.heartNotes], ["پایه", product.baseNotes]].map(([t, notes]) => (
                <div key={t as string} className="rounded-2xl border border-amber-gold/10 bg-onyx-dark/40 p-3">
                  <div className="mb-1.5 text-[11px] font-bold text-amber-gold">نت‌های {t}</div>
                  <div className="flex flex-wrap gap-1">
                    {(notes as string[]).map((n) => (<span key={n} className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-zinc-400">{n}</span>))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* detail: about + specs grid + review summary */}
      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-amber-gold"><Wind size={15} /> درباره‌ی این عطر</h3>
          <p className="text-sm leading-8 text-zinc-300">{product.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[["خانواده", product.category], ["جنسیت", product.gender], ["سال عرضه", toman(product.launchYear)], ["امتیاز", `${toman(product.rating)}/۵`], ["ماندگاری", `${toman(product.longevity)}/۵`], ["پخش بو", `${toman(product.sillage)}/۵`]].map(([l, v]) => (
              <div key={l} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-xs"><div className="text-zinc-500">{l}</div><div className="mt-0.5 font-bold text-zinc-100">{v}</div></div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-6 text-center">
          <div className="font-serif text-4xl font-black text-amber-glow">{toman(product.rating)}</div>
          <Stars value={product.rating} size={16} className="mt-2 justify-center" />
          <div className="mt-1 text-[11px] text-zinc-500">{toman(product.reviews)} نظر · {toman(product.sold)} فروش</div>
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-3 py-2 text-[11px] text-emerald-400"><ShieldCheck size={14} /> اصالت تضمینی</div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-amber-gold/15 bg-amber-gold/5 px-3 py-2 text-[11px] text-amber-gold"><Truck size={14} /> ارسال رایگان</div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-[11px] text-zinc-300"><RotateCcw size={14} /> بازگشت ۷ روزه</div>
          </div>
        </div>
      </section>

      <Related related={related} />
    </div>
  );
}

/* ===================== LAYOUT 3 — MAGAZINE (immersive centered) ===================== */
export function DetailLayoutC() {
  const { selectedId, addToCart, toggleCompare, compare, go, openCatalog } = useStore();
  const product = findProduct(selectedId) ?? products[0];
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const size = product.sizes[sizeIdx];
  const inCompare = compare.includes(product.id);
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div>
      {/* immersive hero */}
      <section className="relative overflow-hidden border-b border-amber-gold/10">
        <div className="absolute inset-0">
          <img src="/images/hero.jpg" alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx-black via-onyx-black/70 to-onyx-black/40" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <button onClick={() => go("home")} className="mb-6 inline-flex items-center gap-1 text-xs text-amber-gold hover:underline">
            <ChevronLeft size={13} /> بازگشت
          </button>
          <div className="mx-auto h-80 w-52 animate-float overflow-hidden rounded-3xl border border-amber-gold/15 shadow-2xl">
            <ProductImage product={product} className="h-full w-full" />
          </div>
          <div className="mt-6 font-serif text-sm tracking-[0.35em] text-amber-gold">{product.brand}</div>
          <h1 className="mt-2 font-serif text-4xl font-black sm:text-6xl">{product.name}</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-zinc-300">{product.description}</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Stars value={product.rating} size={16} />
            <span className="text-sm font-black text-amber-glow">{toman(product.rating)}</span>
            <span className="text-xs text-zinc-500">({toman(product.reviews)} نظر)</span>
          </div>
        </div>
      </section>

      {/* buy + info columns */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* size + price */}
          <div className="rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-6 text-center">
            <div className="text-[11px] text-zinc-500">انتخاب حجم</div>
            <div className="mt-3 flex justify-center gap-2">
              {product.sizes.map((s, i) => (
                <button key={s.ml} onClick={() => setSizeIdx(i)} className={`rounded-xl border px-4 py-2 text-sm font-black transition ${sizeIdx === i ? "border-amber-gold bg-amber-gold/15 text-amber-glow" : "border-white/10 text-zinc-300"}`}>
                  {toman(s.ml)}ml
                </button>
              ))}
            </div>
            <div className="mt-4 font-serif text-3xl font-black text-amber-glow">{toman(size.price)} <span className="text-xs text-zinc-400">ت</span></div>
            <div className="mt-4 flex items-center justify-center gap-1 rounded-full border border-white/10 bg-black/20 p-1">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5 text-zinc-300"><Minus size={15} /></button>
              <span className="w-7 text-center text-sm font-bold">{toman(qty)}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5 text-zinc-300"><Plus size={15} /></button>
            </div>
            <div className="mt-4 flex gap-2">
              <GoldButton onClick={() => addToCart(product.id, size.ml, qty)} className="flex-1"><ShoppingBag size={16} /> خرید</GoldButton>
              <button onClick={() => toggleCompare(product.id)} className={`grid h-11 w-11 place-items-center rounded-full border transition ${inCompare ? "border-amber-gold bg-amber-gold/15 text-amber-gold" : "border-amber-gold/30 text-zinc-300"}`}>
                {inCompare ? <Check size={16} /> : <GitCompare size={16} />}
              </button>
              <button onClick={() => setWish((v) => !v)} className={`grid h-11 w-11 place-items-center rounded-full border transition ${wish ? "border-amber-rose bg-amber-rose/15 text-amber-rose" : "border-amber-gold/30 text-zinc-300"}`}>
                <Heart size={16} fill={wish ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* notes */}
          <div className="rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-6">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-gold"><Wind size={15} /> هرم رایحه</div>
            <div className="space-y-3">
              {[["سر", product.topNotes], ["قلب", product.heartNotes], ["پایه", product.baseNotes]].map(([t, notes]) => (
                <div key={t as string}>
                  <div className="text-[11px] font-bold text-zinc-300">نت‌های {t}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {(notes as string[]).map((n) => (<span key={n} className="rounded-full border border-amber-gold/15 bg-black/20 px-2 py-0.5 text-[10px] text-zinc-300">{n}</span>))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* specs */}
          <div className="rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-6">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-gold"><Award size={15} /> مشخصات</div>
            <ul className="space-y-2 text-xs">
              <Spec label="خانواده" value={product.category} />
              <Spec label="جنسیت" value={product.gender} />
              <Spec label="سال عرضه" value={toman(product.launchYear)} />
              <Spec label="ماندگاری" value={`${toman(product.longevity)}/۵`} />
              <Spec label="پخش بو" value={`${toman(product.sillage)}/۵`} />
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
          <GhostButton onClick={() => openCatalog()}>عطرهای مشابه <ChevronLeft size={16} /></GhostButton>
        </div>
      </section>

      {/* editorial detail: story + performance */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-6">
            <h3 className="mb-3 text-sm font-black text-amber-gold">روایت رایحه</h3>
            <p className="text-sm leading-8 text-zinc-300">{product.description}</p>
            <p className="mt-3 text-sm leading-8 text-zinc-400">از خانواده‌ی رایحه‌های {product.category} و مناسب برای {product.gender === "زنانه" ? "بانوان" : product.gender === "مردانه" ? "آقایان" : "همه"}؛ تجربه‌ای ماندگار و به‌یادماندنی.</p>
          </div>
          <div className="rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-6">
            <h3 className="mb-4 text-sm font-black text-amber-gold">عملکرد عطر</h3>
            <div className="space-y-3">
              {([["ماندگاری", product.longevity], ["پخش بو", product.sillage]] as const).map(([l, v]) => (
                <div key={l}>
                  <div className="mb-1 flex justify-between text-[11px] text-zinc-300"><span>{l}</span><span className="font-bold text-amber-glow">{toman(v)}/۵</span></div>
                  <div className="flex gap-1">{[1, 2, 3, 4, 5].map((i) => (<span key={i} className={`h-1.5 flex-1 rounded-full ${i <= v ? "bg-gradient-to-l from-amber-dark to-amber-gold" : "bg-white/10"}`} />))}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center gap-1 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-2 text-emerald-400"><ShieldCheck size={16} /><span className="text-[9px]">اصالت</span></div>
              <div className="flex flex-col items-center gap-1 rounded-xl border border-amber-gold/15 bg-amber-gold/5 p-2 text-amber-gold"><Truck size={16} /><span className="text-[9px]">ارسال رایگان</span></div>
              <div className="flex flex-col items-center gap-1 rounded-xl border border-white/8 bg-white/[0.03] p-2 text-zinc-300"><RotateCcw size={16} /><span className="text-[9px]">بازگشت</span></div>
            </div>
          </div>
        </div>
      </section>

      <Related related={related} />
    </div>
  );
}

/* ===== shared bits ===== */
function MiniMeter({ icon: Icon, label, v }: { icon: typeof Clock; label: string; v: number }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 p-2.5">
      <div className="mb-1.5 flex items-center gap-1 text-[10px] text-zinc-300"><Icon size={12} className="text-amber-gold" /> {label}</div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (<span key={i} className={`h-1.5 flex-1 rounded-full ${i <= v ? "bg-gradient-to-l from-amber-dark to-amber-gold" : "bg-white/10"}`} />))}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (<li className="flex items-center justify-between border-b border-white/5 pb-1.5"><span className="text-zinc-500">{label}</span><span className="font-semibold text-zinc-200">{value}</span></li>);
}

function Related({ related }: { related: typeof products }) {
  void Star;
  return (
    <div className="mt-14">
      <SectionHeading eyebrow="RELATED" title={<span>عطرهای <span className="amber-gradient-text">مشابه</span></span>} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (<ProductCard key={p.id} product={p} />))}
      </div>
    </div>
  );
}
