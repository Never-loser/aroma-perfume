import { useState } from "react";
import {
  ChevronLeft,
  CheckCircle2,
  CreditCard,
  Truck,
  Wallet,
  ShoppingBag,
  ShieldCheck,
  XCircle,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useStore, getShipping, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "../store/StoreContext";
import { products, toman } from "../data/products";
import ProductImage from "./ProductImage";
import { GoldButton, GhostButton } from "./ui";

// هزینه ثابت پیک تهران
const PEYK_COST = 40_000;

export default function CheckoutView() {
  const { cart, cartTotal, clearCart, go } = useStore();
  const [placed, setPlaced] = useState(false);
  const [failed, setFailed] = useState(false);
  const [delivery, setDelivery] = useState("post");
  const [pay, setPay] = useState("online");
  // کد رهگیری فقط یک‌بار ساخته می‌شود تا با هر رندر عوض نشود
  const [trackingCode] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  // هزینه ارسال وابسته به روش انتخابی کاربر: پیک = ثابت، پست/درمحلی = طبق قانون فروشگاه
  const shipping = delivery === "peyk" ? PEYK_COST : getShipping(cartTotal);
  const total = cartTotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto grid max-w-lg place-items-center px-4 py-24 text-center">
        <div className="mb-5 grid h-24 w-24 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 size={56} />
        </div>
        <h1 className="text-2xl font-black text-zinc-100 sm:text-3xl">سفارش ثبت شد! ✦</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-400">
          سفارش شما با موفقیت ثبت شد. کد رهگیری شما: <span className="font-mono font-bold text-amber-gold" dir="ltr">AR-{trackingCode}</span>
        </p>
        <p className="mt-1 text-xs text-zinc-500">جزئیات سفارش به‌زودی برای شما ارسال خواهد شد.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <GoldButton onClick={() => go("home")}>بازگشت به خانه</GoldButton>
          <GhostButton onClick={() => go("catalog")}>خرید بیشتر</GhostButton>
        </div>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="mx-auto grid max-w-lg place-items-center px-4 py-20 text-center sm:py-24">
        <div className="mb-5 grid h-20 w-20 place-items-center rounded-full bg-error/15 text-error sm:h-24 sm:w-24">
          <XCircle size={48} />
        </div>
        <h1 className="text-xl font-black text-zinc-100 sm:text-2xl">پرداخت ناموفق بود</h1>
        <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-400">
          متأسفانه پرداخت شما با خطا مواجه شد. این ممکن است به دلیل انصراف از تراکنش، انقضای کارت یا اختلال موقت درگاه باشد.
        </p>
        <div className="mt-4 rounded-2xl border border-error/20 bg-error/5 p-4 text-right">
          <div className="flex items-center gap-2 text-sm font-bold text-error"><AlertTriangle size={16} /> علت‌های احتمالی</div>
          <ul className="mt-2 space-y-1.5 text-xs leading-6 text-zinc-400">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-error/50" /> انصراف از پرداخت توسط کاربر</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-error/50" /> انقضای مهلت تراکنش</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-error/50" /> موجودی ناکافی یا محدودیت کارت</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-error/50" /> اختلال موقت در درگاه پرداخت</li>
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <GoldButton onClick={() => { setFailed(false); window.scrollTo(0, 0); }}><RotateCcw size={16} /> تلاش مجدد</GoldButton>
          <GhostButton onClick={() => go("home")}>بازگشت به خانه</GhostButton>
        </div>
        <p className="mt-5 text-xs text-zinc-500">سفارش شما در سبد خرید باقی مانده است و می‌توانید مجدداً تلاش کنید.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto grid max-w-lg place-items-center px-4 py-24 text-center">
        <ShoppingBag size={48} className="mb-4 text-amber-gold/40" />
        <h1 className="text-xl font-bold text-zinc-200">سبد خرید شما خالی است</h1>
        <p className="mt-2 text-sm text-zinc-500">برای تکمیل خرید ابتدا محصولاتی را انتخاب کنید.</p>
        <GoldButton className="mt-6" onClick={() => go("catalog")}>مشاهده محصولات <ChevronLeft size={16} /></GoldButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-1.5 text-xs text-zinc-500">
        <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
        <ChevronLeft size={12} /> سبد خرید <ChevronLeft size={12} />
        <span className="text-zinc-300">تسویه حساب</span>
      </div>
      <h1 className="mb-6 font-serif text-2xl font-black sm:text-3xl">تکمیل <span className="amber-gradient-text">سفارش</span></h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* form */}
        <div className="space-y-5 lg:col-span-2">
          <Section title="اطلاعات تماس">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="نام و نام خانوادگی" />
              <Input placeholder="شماره موبایل" dir="ltr" />
              <Input placeholder="ایمیل (اختیاری)" dir="ltr" />
              <Input placeholder="کد پستی" dir="ltr" />
            </div>
          </Section>

          <Section title="آدرس ارسال">
            <div className="grid gap-3">
              <Input placeholder="استان" />
              <Input placeholder="شهر" />
              <Input placeholder="نشانی کامل" />
            </div>
          </Section>

          <Section title="روش ارسال">
            <div className="grid gap-3 sm:grid-cols-2">
              <Option active={delivery === "post"} onClick={() => setDelivery("post")} icon={<Truck size={18} />} title="پست پیشتاز" desc="۲ تا ۴ روز کاری" price={cartTotal >= FREE_SHIPPING_THRESHOLD ? "رایگان" : `${toman(SHIPPING_COST)} ت`} />
              <Option active={delivery === "peyk"} onClick={() => setDelivery("peyk")} icon={<Truck size={18} />} title="پیک تهران" desc="همان روز" price={`${toman(PEYK_COST)} ت`} />
            </div>
          </Section>

          <Section title="روش پرداخت">
            <div className="grid gap-3 sm:grid-cols-3">
              <Option active={pay === "online"} onClick={() => setPay("online")} icon={<CreditCard size={18} />} title="آنلاین" desc="درگاه امن" />
              <Option active={pay === "wallet"} onClick={() => setPay("wallet")} icon={<Wallet size={18} />} title="کیف پول" desc="موجودی حساب" />
              <Option active={pay === "cod"} onClick={() => setPay("cod")} icon={<Truck size={18} />} title="در محل" desc="پرداخت هنگام تحویل" />
            </div>
          </Section>
        </div>

        {/* summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-5">
            <h3 className="mb-4 font-serif font-black text-zinc-100">خلاصه سفارش</h3>
            <div className="max-h-64 space-y-3 overflow-y-auto pl-1">
              {cart.map((item) => {
                const p = products.find((x) => x.id === item.id);
                if (!p) return null;
                const size = p.sizes.find((s) => s.ml === item.sizeMl)!;
                return (
                  <div key={`${item.id}-${item.sizeMl}`} className="flex items-center gap-3">
                     <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg">
                       <ProductImage product={p} className="h-full w-full" />
                       <span className="absolute -right-1 -top-1 z-10 grid h-5 w-5 place-items-center rounded-full bg-amber-gold text-[10px] font-black text-onyx-black">{item.qty}</span>
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="font-bold text-zinc-100">{p.name}</div>
                      <div className="text-zinc-500">{item.sizeMl}ml</div>
                    </div>
                    <div className="text-xs font-bold text-amber-glow">{toman(size.price * item.qty)}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
              <Row label="جمع کالا" value={`${toman(cartTotal)} ت`} />
              <Row label="هزینه ارسال" value={shipping === 0 ? "رایگان" : `${toman(shipping)} ت`} valueClass={shipping === 0 ? "text-emerald-400" : ""} />
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <span className="font-bold text-zinc-200">مبلغ نهایی</span>
                <span className="font-serif text-xl font-black text-amber-glow">{toman(total)} <span className="text-xs font-normal text-zinc-400">تومان</span></span>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <GoldButton className="w-full" onClick={() => { setPlaced(true); clearCart(); window.scrollTo(0, 0); }}>
                <CreditCard size={16} /> پرداخت و ثبت سفارش
              </GoldButton>
              <button onClick={() => { setFailed(true); window.scrollTo(0, 0); }} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 py-2 text-xs font-semibold text-zinc-500 transition hover:border-error/30 hover:text-error">
                <XCircle size={14} /> شبیه‌سازی خطای پرداخت
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-zinc-600">
              <ShieldCheck size={12} className="text-emerald-500" /> پرداخت ۱۰۰٪ امن و رمزنگاری شده
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-amber-gold/10 bg-onyx-dark/30 p-5">
      <h3 className="mb-4 text-sm font-bold text-zinc-100">{title}</h3>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-zinc-100 outline-none transition duration-200 placeholder:text-zinc-500 focus:border-amber-gold/60 focus:ring-4 focus:ring-amber-gold/15"
    />
  );
}

function Option({ active, onClick, icon, title, desc, price }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string; price?: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-right transition ${
        active ? "border-amber-gold bg-amber-gold/10" : "border-white/10 bg-black/20 hover:border-amber-gold/30"
      }`}
    >
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${active ? "bg-amber-gold/20 text-amber-gold" : "bg-white/5 text-zinc-400"}`}>{icon}</span>
      <div className="flex-1">
        <div className="text-sm font-bold text-zinc-100">{title}</div>
        <div className="text-[11px] text-zinc-500">{desc}</div>
      </div>
      {price && <span className="text-xs font-bold text-amber-glow">{price}</span>}
      {active && <CheckCircle2 size={16} className="text-amber-gold" />}
    </button>
  );
}

function Row({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-400">{label}</span>
      <span className={`font-semibold text-zinc-200 ${valueClass}`}>{value}</span>
    </div>
  );
}