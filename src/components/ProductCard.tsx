import { GitCompare, Plus } from "lucide-react";
import type { Product } from "../data/products";
import { toman } from "../data/products";
import { useStore } from "../store/StoreContext";
import ProductImage from "./ProductImage";
import { Stars, ImgBadge } from "./ui";

export default function ProductCard({ product }: { product: Product }) {
  const { openProduct, addToCart, toggleCompare, compare } = useStore();
  const basePrice = product.sizes[0].price;
  const inCompare = compare.includes(product.id);
  const discount =
    product.oldPrice && product.oldPrice > basePrice
      ? Math.round((1 - basePrice / product.oldPrice) * 100)
      : 0;

  return (
    <div
      onClick={() => openProduct(product.id)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-amber-gold/10 bg-onyx-dark/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-gold/40 hover:shadow-2xl hover:shadow-amber-gold/10 sm:rounded-3xl"
    >
      {/* image */}
      <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-onyx-black/30">
        <ProductImage product={product} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx-dark/60 via-transparent to-transparent" />

        {/* badges — left, equal width */}
        <div className="absolute left-2 top-2 z-10 flex w-[84px] flex-col gap-1 sm:left-3 sm:top-3 sm:w-[88px]">
          {product.bestseller && <ImgBadge color="#E5C583" className="w-full">پرفروش</ImgBadge>}
          {discount > 0 && <ImgBadge color="#10b981" className="w-full">{discount}٪ تخفیف</ImgBadge>}
          {product.isNew && <ImgBadge color="#E08B69" className="w-full">تازه‌وارد</ImgBadge>}
        </div>

        {/* compare — right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product.id);
          }}
          title="افزودن به مقایسه"
          className={`absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-[rgba(255,255,255,0.95)] shadow-md backdrop-blur-sm transition hover:bg-[#ffffff] sm:right-3 sm:top-3 sm:h-9 sm:w-9 ${
            inCompare ? "ring-2 ring-amber-gold" : ""
          }`}
        >
          <GitCompare size={14} className="text-[#08130c] sm:hidden" />
          <GitCompare size={15} className="hidden text-[#08130c] sm:block" />
        </button>
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-1">
          <span className="truncate text-[10px] tracking-wide text-amber-gold/80">{product.brand}</span>
          <div className="flex shrink-0 items-center gap-0.5">
            <Stars value={product.rating} size={11} />
          </div>
        </div>
        <h3 className="mt-1 line-clamp-1 text-sm font-bold text-zinc-100 sm:text-base">{product.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-[10px] text-zinc-500 sm:text-[11px]">{product.category}</p>

        {/* sizes — limited on mobile */}
        <div className="mt-1.5 flex items-center gap-1 overflow-hidden">
          {product.sizes.slice(0, 2).map((s) => (
            <span key={s.ml} className="shrink-0 rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[8px] text-zinc-400 sm:text-[9px]">
              {toman(s.ml)}ml
            </span>
          ))}
          {product.sizes.length > 2 && <span className="text-[8px] text-zinc-600">+{toman(product.sizes.length - 2)}</span>}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2 sm:pt-3">
          <div className="min-w-0">
            <span className="block text-[9px] text-zinc-500">از</span>
            <span className="block truncate text-sm font-black text-amber-glow sm:text-base">{toman(basePrice)}</span>
            <span className="text-[8px] text-zinc-500 sm:text-[9px]">تومان</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id, product.sizes[0].ml);
            }}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-dark to-amber-gold text-onyx-black shadow-lg shadow-amber-gold/20 transition-all hover:scale-110 active:scale-95 sm:h-11 sm:w-11 sm:rounded-2xl"
            title="افزودن سریع به سبد"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
