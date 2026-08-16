import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHeading, GhostButton } from "./ui";
import { useStore } from "../store/StoreContext";

const FAQ = [
  {
    cat: "خرید و سفارش",
    items: [
      { q: "چگونه می‌توانم سفارش ثبت کنم؟", a: "کافی است عطر موردنظر را انتخاب کرده، حجم دلخواه را مشخص کنید و آن را به سبد خرید اضافه کنید. سپس در صفحه تسویه حساب، اطلاعات تماس و آدرس را وارد کرده و سفارش خود را نهایی کنید." },
      { q: "آیا امکان خرید حضوری وجود دارد؟", a: "بله، شما می‌توانید از گالری عطر سلطنتی در تهران، خیابان فرشته به‌صورت حضوری خرید و تست عطر انجام دهید." },
    ],
  },
  {
    cat: "اصالت کالا",
    items: [
      { q: "آیا عطرها صد در صد اورجینال هستند؟", a: "بله، تمامی محصولات آروما با ضمانت ۱۰۰٪ اصالت کالا عرضه می‌شوند و مستقیماً از واردکنندگان معتبر تهیه می‌گردند." },
      { q: "چگونه از اصالت محصول مطمئن شوم؟", a: "هر محصول دارای کد اصالت‌سنجی است که می‌توانید آن را استعلام کنید. همچنین در صورت عدم رضایت، امکان بازگشت کالا تا ۷ روز وجود دارد." },
    ],
  },
  {
    cat: "ارسال و تحویل",
    items: [
      { q: "هزینه و زمان ارسال چقدر است؟", a: "ارسال برای سفارش‌های بالای ۵ میلیون تومان رایگان است. زمان ارسال با پست پیشتاز ۲ تا ۴ روز کاری و با پیک تهران در همان روز انجام می‌شود." },
      { q: "آیا ارسال به سراسر کشور انجام می‌شود؟", a: "بله، ما به تمامی شهرهای ایران ارسال انجام می‌دهیم." },
    ],
  },
  {
    cat: "بازگشت و گارانتی",
    items: [
      { q: "شرایط بازگشت کالا چیست؟", a: "در صورت عدم رضایت یا وجود مشکل، تا ۷ روز پس از تحویل می‌توانید کالا را در شرایط اولیه بازگردانید." },
      { q: "آیا امکان تعویض وجود دارد؟", a: "بله، در صورت بروز هرگونه مشکل در محصول، آن را تعویض یا مبلغ پرداختی را عودت می‌دهیم." },
    ],
  },
];

export default function FaqView() {
  const { go } = useStore();
  const [open, setOpen] = useState<string | null>("خرید و سفارش-0");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Reveal>
        <SectionHeading center eyebrow="FAQ" title={<span>سوالات <span className="amber-gradient-text">متداول</span></span>} desc="پاسخ پرسش‌های پرتکرار مشتریان  آروما را اینجا بیابید." />
      </Reveal>

      <div className="space-y-8">
        {FAQ.map((group) => (
          <Reveal key={group.cat}>
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-black text-amber-glow">
                <HelpCircle size={18} /> {group.cat}
              </h3>
              <div className="space-y-2.5">
                {group.items.map((item, i) => {
                  const key = `${group.cat}-${i}`;
                  const isOpen = open === key;
                  return (
                    <div key={key} className={`overflow-hidden rounded-2xl border transition ${isOpen ? "border-amber-gold/30 bg-onyx-dark/50" : "border-white/8 bg-onyx-dark/30"}`}>
                      <button
                        onClick={() => setOpen(isOpen ? null : key)}
                        className="flex w-full items-center justify-between gap-3 p-4 text-right"
                      >
                        <span className="text-sm font-bold text-zinc-100">{item.q}</span>
                        <ChevronDown size={18} className={`shrink-0 text-amber-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                          <p className="px-4 pt-2 pb-4 text-sm leading-7 text-zinc-400">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-8 text-center">
          <MessageCircle size={28} className="text-amber-gold" />
          <h3 className="font-bold text-zinc-100">پاسخ سوال خود را پیدا نکردید؟</h3>
          <p className="max-w-md text-sm text-zinc-400">کارشناسان پشتیبانی ما آماده‌ی پاسخگویی به شما هستند.</p>
          <GhostButton onClick={() => go("contact")}>تماس با کارشناس</GhostButton>
        </div>
      </Reveal>
    </div>
  );
}
