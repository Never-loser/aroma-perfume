import { Sparkles, ChevronLeft, ShieldCheck, Star, Truck } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { GoldButton, GhostButton, Stars } from "./ui";

import Reveal from "./Reveal";
import ProductImage from "./ProductImage";
import { products, toman } from "../data/products";

export default function Hero() {
  const { openCatalog, openProduct } = useStore();
  const featured = products[0];

  return (
    <section className="relative overflow-hidden">
      {/* ambient background */}
      <div className="absolute inset-0">
        <img src="/images/hero.jpg" alt="" className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-l from-onyx-black via-onyx-black/75 to-onyx-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx-black via-transparent to-transparent" />
      </div>


      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        {/* copy */}
        <div className="text-center lg:text-right">
          <Reveal variant="up">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-gold/30 bg-amber-gold/5 px-4 py-1.5 text-xs font-semibold text-amber-gold backdrop-blur-sm">
              <Sparkles size={14} /> گالری تخصصی عطرهای اورجینال لوکس
            </span>
          </Reveal>

          <Reveal delay={0.05} variant="blur">
            <h1 className="mt-6 text-balance text-4xl font-black leading-[1.12] sm:text-5xl lg:text-6xl">
              رایحه‌ای که <span className="amber-gradient-text">امضای شما</span> می‌شود
            </h1>
          </Reveal>

          <Reveal delay={0.1} variant="up">
            <p className="mx-auto mt-6 max-w-lg text-balance text-sm leading-8 text-zinc-300 sm:text-base lg:mx-0">
              کشف کنید، مقایسه کنید و عطر ایده‌آل خود را با راهنمایی دستیار هوشمند آروما بیابید. اصالت تضمینی، تجربه‌ای سلطنتی.
            </p>
          </Reveal>

          <Reveal delay={0.15} variant="up">
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <GoldButton onClick={() => openCatalog()}>
                مشاهده گالری عطرها <ChevronLeft size={18} />
              </GoldButton>
              <GhostButton onClick={() => openProduct(featured.id)}>پرفروش‌ترین عطر</GhostButton>
            </div>
          </Reveal>

          <Reveal delay={0.2} variant="up">
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
              <HeroStat value="+۱۲۰۰" label="عطر اورجینال" />
              <span className="hidden h-10 w-px bg-amber-gold/15 sm:block" />
              <HeroStat value="+۵۰" label="برند لوکس" />
              <span className="hidden h-10 w-px bg-amber-gold/15 sm:block" />
              <HeroStat value="٪۱۰۰" label="ضمانت اصالت" />
            </div>
          </Reveal>
        </div>

        {/* visual */}
        <Reveal delay={0.15} variant="scale" className="mx-auto hidden w-full max-w-sm lg:block">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-amber-gold/25 via-onyx-light/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-gold/20 bg-onyx-dark/50 p-3 shadow-pop backdrop-blur-md">
              <div className="overflow-hidden rounded-[2rem]">
                <div className="aspect-[4/5] w-full">
                  <ProductImage product={featured} className="h-full w-full" />
                </div>
              </div>

              {/* floating rating chip */}
              <div className="absolute right-5 top-5 flex items-center gap-2 rounded-2xl border border-amber-gold/20 bg-onyx-black/70 px-3 py-2 backdrop-blur-md">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-gold/15 text-amber-gold">
                  <Star size={16} fill="currentColor" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Stars value={featured.rating} size={12} />
                  </div>
                  <div className="text-[10px] text-zinc-400">{toman(featured.reviews)} نظر</div>
                </div>
              </div>

              {/* floating price / brand card */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-amber-gold/20 bg-onyx-black/75 px-4 py-3 backdrop-blur-md">
                <div>
                  <div className="text-[10px] tracking-wide text-amber-gold/80">{featured.brand}</div>
                  <div className="text-sm font-black text-zinc-100">{featured.name}</div>
                </div>
                <div className="text-left">
                  <div className="text-[9px] text-zinc-500">از</div>
                  <div className="font-serif text-base font-black text-amber-glow">{toman(featured.sizes[0].price)}</div>
                </div>
              </div>
            </div>

            {/* trust pill */}
            <div className="absolute -left-4 top-1/3 hidden items-center gap-2 rounded-full border border-amber-gold/20 bg-onyx-black/80 px-3 py-2 text-[11px] font-semibold text-emerald-300 shadow-card backdrop-blur-md xl:flex">
              <ShieldCheck size={14} /> اصالت تضمینی
            </div>
            <div className="absolute -right-4 bottom-1/4 hidden items-center gap-2 rounded-full border border-amber-gold/20 bg-onyx-black/80 px-3 py-2 text-[11px] font-semibold text-amber-gold shadow-card backdrop-blur-md xl:flex">
              <Truck size={14} /> ارسال رایگان
            </div>
          </div>
        </Reveal>
      </div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-amber-gold/25 to-transparent" />
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center lg:text-right">
      <div className="text-2xl font-black text-amber-glow sm:text-3xl">{value}</div>
      <div className="mt-0.5 text-[11px] text-zinc-400">{label}</div>
    </div>
  );
}
