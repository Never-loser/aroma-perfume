import { useEffect, useMemo, useState } from "react";
import { useLoading } from "../hooks/useLoading";
import { DetailSkeleton } from "./Skeleton";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Minus,
  ShoppingBag,
  GitCompare,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Wind,
  Clock,
  Award,
} from "lucide-react";
import { useStore, findProduct } from "../store/StoreContext";
import { products, toman } from "../data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { Stars, GoldButton, SectionHeading, Badge, ImgBadge } from "./ui";

const SAMPLE_REVIEWS = [
  { name: "مریم ا.", rating: 5, date: "۲ هفته پیش", text: "بوی فوق‌العاده‌ای داره و کاملاً اصل بود. ماندگاری عالی. حتماً پیشنهاد می‌کنم." },
  { name: "حسین ر.", rating: 4.5, date: "۱ ماه پیش", text: "کیفیت عالی و بسته‌بندی مرتب. پخش بوی خوبی داره. راضی‌ام." },
  { name: "الهام ک.", rating: 5, date: "۲ ماه پیش", text: "ارسال سریع و محصول دقیقاً مطابق توضیحات. تجربه خرید عالی." },
];

export default function DetailView() {
  const { selectedId, addToCart, toggleCompare, compare, go, openCatalog } = useStore();
  const product = findProduct(selectedId);

useEffect(() => {
  if (!product) go("notfound");
}, [product, go]);

if (!product) return null;  const loading = useLoading(400, [product.id]);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "notes" | "reviews">("desc");
  const [wish, setWish] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const images = product.images;
  const len = images.length;

  const size = product.sizes[sizeIdx];
  const inCompare = compare.includes(product.id);
  const basePrice = product.sizes[0].price;
  const discount = product.oldPrice && product.oldPrice > basePrice ? Math.round((1 - basePrice / product.oldPrice) * 100) : 0;

  useEffect(() => { setImgIdx(0); }, [product.id]);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") setImgIdx((i) => (i + 1) % len);
      if (e.key === "ArrowRight") setImgIdx((i) => (i - 1 + len) % len);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, len]);
  const related = useMemo(
    () =>
      products
        .filter((p) => p.id !== product.id && p.category === product.category)
        .concat(products.filter((p) => p.id !== product.id))
        .slice(0, 4),
    [product.id]
  );

  if (loading) return <DetailSkeleton />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* breadcrumb */}
      <div className="mb-6 flex items-center gap-1.5 text-xs text-zinc-500">
        <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
        <ChevronLeft size={12} />
        <button onClick={() => openCatalog(product.category)} className="hover:text-amber-gold">{product.category}</button>
        <ChevronLeft size={12} />
        <span className="text-zinc-300">{product.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* gallery */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-gold/15 bg-gradient-to-br from-onyx-dark/60 to-onyx-black/60 p-6">
              {/* badges — left, equal width */}
              <div className="absolute left-4 top-4 z-10 flex w-[92px] flex-col gap-1.5">
                {product.bestseller && <ImgBadge color="#E5C583" className="w-full">پرفروش</ImgBadge>}
                {discount > 0 && <ImgBadge color="#10b981" className="w-full">{discount}٪ تخفیف</ImgBadge>}
                {product.isNew && <ImgBadge color="#E08B69" className="w-full">تازه‌وارد</ImgBadge>}
              </div>
              {/* actions — right */}
              <div className="absolute right-4 top-4 z-10 flex flex-col gap-1.5">
                <button
                  onClick={() => toggleCompare(product.id)}
                  title="مقایسه"
                  className={`grid h-10 w-10 place-items-center rounded-full bg-[rgba(255,255,255,0.95)] shadow-md backdrop-blur-sm transition hover:bg-[#ffffff] ${inCompare ? "ring-2 ring-amber-gold" : ""}`}
                >
                  <GitCompare size={17} className="text-[#08130c]" />
                </button>
                <button
                  onClick={() => setWish((v) => !v)}
                  title="علاقه‌مندی"
                  className={`grid h-10 w-10 place-items-center rounded-full bg-[rgba(255,255,255,0.95)] shadow-md backdrop-blur-sm transition hover:bg-[#ffffff] ${wish ? "ring-2 ring-amber-rose" : ""}`}
                >
                  <Heart size={17} className="text-[#08130c]" fill={wish ? "#E08B69" : "none"} />
                </button>
              </div>

              {/* main image — clickable, with prev/next */}
              <div className="relative">
                <button onClick={() => setLightbox(true)} className="block w-full" title="نمایش بزرگ‌نمایی">
                  <div className="flex h-80 items-center justify-center px-4 pb-4 pt-14 sm:h-96">
                    <img src={images[imgIdx]} alt={product.name} className="max-h-full max-w-full animate-float rounded-2xl object-contain drop-shadow-2xl transition-opacity duration-300" />
                  </div>
                </button>
                {len > 1 && (
                  <>
                    <button onClick={() => setImgIdx((i) => (i - 1 + len) % len)} title="قبلی" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[rgba(255,255,255,0.92)] text-[#08130c] shadow-md backdrop-blur-sm transition hover:bg-[#ffffff]">
                      <ChevronRight size={20} />
                    </button>
                    <button onClick={() => setImgIdx((i) => (i + 1) % len)} title="بعدی" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[rgba(255,255,255,0.92)] text-[#08130c] shadow-md backdrop-blur-sm transition hover:bg-[#ffffff]">
                      <ChevronLeft size={20} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-onyx-black/70 px-3 py-0.5 text-[10px] font-bold text-zinc-200 backdrop-blur">{toman(imgIdx + 1)} / {toman(len)}</div>
                  </>
                )}
              </div>
            </div>
            {/* thumbnails */}
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {images.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${i === imgIdx ? "border-amber-gold ring-2 ring-amber-gold/30" : "border-amber-gold/10 opacity-70 hover:opacity-100"}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* info */}
        <Reveal delay={0.1}>
          <div>
            <div className="font-serif text-sm tracking-[0.25em] text-amber-gold/80">{product.brand}</div>
            <h1 className="mt-1 font-serif text-3xl font-black sm:text-4xl">{product.name}</h1>
            <div className="mt-1 text-sm text-zinc-400">{product.nameEn} · {product.gender}</div>

            <div className="mt-3 flex items-center gap-3">
              <Stars value={product.rating} size={16} />
              <span className="text-sm font-bold text-amber-glow">{toman(product.rating)}</span>
              <span className="text-xs text-zinc-500">({toman(product.reviews)} نظر)</span>
              <span className="text-xs text-zinc-600">·</span>
              <span className="text-xs text-zinc-500">{toman(product.sold)} فروش</span>
            </div>

            <p className="mt-5 text-sm leading-8 text-zinc-300">{product.description}</p>

            {/* price */}
            <div className="mt-6 flex items-end gap-3 rounded-2xl border border-amber-gold/15 bg-onyx-dark/40 p-5">
              <div>
                <div className="text-[11px] text-zinc-500">قیمت برای سایز انتخابی</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-serif text-3xl font-black text-amber-glow">{toman(size.price)}</span>
                  <span className="text-sm text-zinc-400">تومان</span>
                  {product.oldPrice && sizeIdx === 0 && (
                    <span className="text-sm text-zinc-600 line-through">{toman(product.oldPrice)}</span>
                  )}
                </div>
              </div>
              <div className="mr-auto text-left text-[11px] text-zinc-500">
                موجود در انبار<br />
                <span className="font-bold text-emerald-400">آماده ارسال</span>
              </div>
            </div>

            {/* sizes */}
            <div className="mt-5">
              <div className="mb-2 text-sm font-bold text-zinc-200">انتخاب حجم:</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s.ml}
                    onClick={() => setSizeIdx(i)}
                    className={`flex flex-col items-center rounded-xl border px-5 py-2.5 transition ${
                      sizeIdx === i
                        ? "border-amber-gold bg-amber-gold/15 text-amber-glow"
                        : "border-white/10 bg-white/5 text-zinc-300 hover:border-amber-gold/40"
                    }`}
                  >
                    <span className="text-sm font-black">{toman(s.ml)}<span className="text-[10px] font-normal">ml</span></span>
                    <span className="text-[10px] opacity-70">{toman(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* quantity + actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5 text-zinc-300">
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-zinc-100">{toman(qty)}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/5 text-zinc-300">
                  <Plus size={16} />
                </button>
              </div>

              <GoldButton onClick={() => addToCart(product.id, size.ml, qty)} className="flex-1 min-w-[160px]">
                <ShoppingBag size={17} /> افزودن به سبد
              </GoldButton>

              <button
                onClick={() => toggleCompare(product.id)}
                className={`grid h-12 w-12 place-items-center rounded-full border transition ${
                  inCompare ? "border-amber-gold bg-amber-gold/15 text-amber-gold" : "border-amber-gold/30 text-zinc-300 hover:bg-amber-gold/10"
                }`}
                title="مقایسه"
              >
                {inCompare ? <Check size={18} /> : <GitCompare size={18} />}
              </button>
            </div>

            {/* quick benefits */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "ارسال رایگان" },
                { icon: ShieldCheck, label: "اصالت تضمینی" },
                { icon: RotateCcw, label: "بازگشت ۷ روزه" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/5 bg-white/5 p-3 text-center">
                  <b.icon size={18} className="text-amber-gold" />
                  <span className="text-[10px] text-zinc-400">{b.label}</span>
                </div>
              ))}
            </div>

            {/* meters */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Meter icon={Clock} label="ماندگاری" value={product.longevity} />
              <Meter icon={Wind} label="پخش بو" value={product.sillage} />
            </div>
          </div>
        </Reveal>
      </div>

      {/* tabs */}
      <div className="mt-12">
        <div className="flex gap-2 border-b border-white/10">
          {([
            ["desc", "توضیحات"],
            ["notes", "هرم نت‌ها"],
            ["reviews", `نظرات (${toman(product.reviews)})`],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`relative px-4 py-3 text-sm font-bold transition ${
                tab === id ? "text-amber-glow" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {label}
              {tab === id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-amber-gold" />}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === "desc" && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4 text-sm leading-8 text-zinc-300">
                <p>{product.description}</p>
                <p>
                  این عطر از خانواده رایحه‌های {product.category} است و در سال {toman(product.launchYear)} عرضه شده است.
                  ترکیبی هنرمندانه از نت‌های دست‌چین که تجربه‌ای ماندگار و به‌یادماندنی برای شما رقم می‌زند.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge tone="dark">سال عرضه: {toman(product.launchYear)}</Badge>
                  <Badge tone="dark">{product.gender}</Badge>
                  <Badge tone="dark">{product.category}</Badge>
                </div>
              </div>
              <div className="rounded-2xl border border-amber-gold/10 bg-onyx-dark/40 p-5">
                <div className="flex items-center gap-2 text-amber-gold"><Award size={16} /><span className="text-sm font-bold">مشخصات کلی</span></div>
                <dl className="mt-4 space-y-2.5 text-xs">
                  <Spec label="برند" value={product.brand} />
                  <Spec label="نام لاتین" value={product.nameEn} />
                  <Spec label="خانواده" value={product.category} />
                  <Spec label="جنسیت" value={product.gender} />
                  <Spec label="سال عرضه" value={toman(product.launchYear)} />
                  <Spec label="امتیاز" value={`${toman(product.rating)} از ۵`} />
                </dl>
              </div>
            </div>
          )}

          {tab === "notes" && (
            <div className="grid gap-5 md:grid-cols-3">
              <NoteCard title="نت‌های سر" color="from-emerald-400/20" notes={product.topNotes} icon="🌸" />
              <NoteCard title="نت‌های قلب" color="from-amber-gold/20" notes={product.heartNotes} icon="💛" />
              <NoteCard title="نت‌های پایه" color="from-amber-rose/20" notes={product.baseNotes} icon="🪵" />
            </div>
          )}

          {tab === "reviews" && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="rounded-2xl border border-amber-gold/10 bg-onyx-dark/40 p-5 text-center">
                  <div className="font-serif text-5xl font-black text-amber-glow">{toman(product.rating)}</div>
                  <Stars value={product.rating} size={18} className="mt-2 justify-center" />
                  <div className="mt-2 text-xs text-zinc-400">{toman(product.reviews)} نظر ثبت شده</div>
                  <div className="mt-4 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <div key={s} className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <span className="w-3 text-right">{toman(s)}</span>
                        <Star size={10} className="text-amber-gold/60" fill="currentColor" />
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-l from-amber-dark to-amber-gold"
                            style={{ width: `${s === 5 ? 78 : s === 4 ? 15 : s === 3 ? 5 : 1}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4 md:col-span-2">
                {SAMPLE_REVIEWS.map((r) => (
                  <div key={r.name} className="rounded-2xl border border-amber-gold/10 bg-onyx-dark/30 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-dark to-amber-gold font-black text-onyx-black">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-zinc-100">{r.name}</div>
                          <div className="text-[10px] text-zinc-500">{r.date}</div>
                        </div>
                      </div>
                      <Stars value={r.rating} size={12} />
                    </div>
                    <p className="mt-3 text-sm leading-7 text-zinc-300">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* related */}
      <div className="mt-12">
        <SectionHeading eyebrow="RELATED" title={<span>عطرهای <span className="amber-gradient-text">مشابه</span></span>} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md" onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"><X size={22} /></button>
          {len > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + len) % len); }} className="absolute right-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"><ChevronRight size={24} /></button>
              <button onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % len); }} className="absolute left-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"><ChevronLeft size={24} /></button>
            </>
          )}
          <img src={images[imgIdx]} alt={product.name} onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-xs font-bold text-white backdrop-blur">{toman(imgIdx + 1)} / {toman(len)}</div>
        </div>
      )}
    </div>
  );
}

function Meter({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs text-zinc-300">
        <Icon size={14} className="text-amber-gold" /> {label}
      </div>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= value ? "bg-gradient-to-l from-amber-dark to-amber-gold" : "bg-white/10"}`}
          />
        ))}
        <span className="mr-1 text-[10px] text-zinc-500">{toman(value)}/۵</span>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="font-semibold text-zinc-200">{value}</dd>
    </div>
  );
}

function NoteCard({ title, notes, color, icon }: { title: string; notes: string[]; color: string; icon: string }) {
  return (
    <div className={`rounded-2xl border border-amber-gold/10 bg-gradient-to-b ${color} to-transparent p-5`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-bold text-zinc-100">{title}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {notes.map((n) => (
          <span key={n} className="rounded-full border border-amber-gold/20 bg-black/20 px-3 py-1.5 text-xs text-zinc-200">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
