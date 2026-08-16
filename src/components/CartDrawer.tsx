import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ChevronLeft } from "lucide-react";
import { useStore, FREE_SHIPPING_THRESHOLD } from "../store/StoreContext";
import { products, toman } from "../data/products";
import ProductImage from "./ProductImage";
import { GoldButton } from "./ui";

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    setQty,
    removeFromCart,
    cartTotal,
    cartCount,
    go,
  } = useStore();

  if (!cartOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setCartOpen(false)} />
      <div className="absolute left-0 top-0 flex h-full w-full max-w-md animate-[fade-up_0.4s_ease] flex-col border-r border-amber-gold/20 bg-onyx-dark shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-amber-gold" />
            <span className="font-serif font-black text-zinc-100">سبد خرید</span>
            <span className="rounded-full bg-amber-gold/15 px-2 py-0.5 text-[10px] font-bold text-amber-gold">
              {toman(cartCount)}
            </span>
          </div>
          <button onClick={() => setCartOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-zinc-400 hover:text-amber-gold">
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-amber-gold/10 text-amber-gold">
              <ShoppingBag size={36} />
            </div>
            <div>
              <p className="font-bold text-zinc-200">سبد خرید شما خالی است</p>
              <p className="mt-1 text-xs text-zinc-500">عطرهای محبوبتان را به سبد اضافه کنید</p>
            </div>
            <GoldButton onClick={() => { setCartOpen(false); go("catalog"); }}>
              شروع خرید <ChevronLeft size={16} />
            </GoldButton>
          </div>
        ) : (
          <>
            {/* free shipping progress */}
            <div className="border-b border-white/5 p-4">
              {remaining > 0 ? (
                <p className="text-[11px] text-zinc-400">
                  تا <span className="font-bold text-amber-gold">{toman(remaining)} تومان</span> ارسال رایگان مانده!
                </p>
              ) : (
                <p className="text-[11px] font-bold text-emerald-400">✓ ارسال این سفارش رایگان است</p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-l from-amber-dark to-amber-gold transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* items */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {cart.map((item) => {
                  const p = products.find((x) => x.id === item.id);
                  if (!p) return null;
                  const size = p.sizes.find((s) => s.ml === item.sizeMl)!;
                  return (
                    <div key={`${item.id}-${item.sizeMl}`} className="flex gap-3 rounded-2xl border border-white/5 bg-white/5 p-3">
                      <div className="h-20 w-16 shrink-0">
                        <ProductImage product={p} className="h-full w-full" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-serif text-[10px] text-amber-gold/80">{p.brand}</div>
                            <div className="text-sm font-bold text-zinc-100">{p.name}</div>
                            <div className="text-[10px] text-zinc-500">حجم {item.sizeMl}ml</div>
                          </div>
                          <button onClick={() => removeFromCart(item.id, item.sizeMl)} className="text-zinc-500 hover:text-amber-rose">
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-0.5">
                            <button onClick={() => setQty(item.id, item.sizeMl, item.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/5 text-zinc-300">
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                            <button onClick={() => setQty(item.id, item.sizeMl, item.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/5 text-zinc-300">
                              <Plus size={13} />
                            </button>
                          </div>
                          <div className="text-sm font-black text-amber-glow">{toman(size.price * item.qty)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* footer */}
            <div className="border-t border-white/10 p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-zinc-400">مبلغ کل</span>
                <span className="font-serif text-xl font-black text-amber-glow">{toman(cartTotal)} <span className="text-xs font-normal text-zinc-400">تومان</span></span>
              </div>
              <GoldButton className="w-full" onClick={() => { setCartOpen(false); go("checkout"); }}>
                ادامه و پرداخت <ChevronLeft size={16} />
              </GoldButton>
              <button onClick={() => setCartOpen(false)} className="mt-2 w-full text-center text-xs text-zinc-500 hover:text-amber-gold">
                ادامه خرید
              </button>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-zinc-600">
                <ShieldCheck size={12} className="text-emerald-500" /> پرداخت امن و رمزنگاری شده
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}