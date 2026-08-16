import { ChevronLeft } from "lucide-react";
import { useStore } from "../store/StoreContext";
import Reveal from "./Reveal";

type LegalType = "terms" | "privacy" | "returns";

const CONTENT: Record<LegalType, { title: string; updated: string; sections: { h: string; p: string }[] }> = {
  terms: {
    title: "قوانین و شرایط استفاده",
    updated: "آخرین بروزرسانی: ۱۴۰۳/۰۵/۰۱",
    sections: [
      { h: "پذیرش قوانین", p: "با استفاده از وب‌سایت آروما، شما قوانین و شرایط زیر را می‌پذیرید. در صورت عدم موافقت، لطفاً از استفاده‌ی سایت خودداری کنید." },
      { h: "حساب کاربری", p: "شما مسئول حفظ محرمانگی رمز عبور خود و تمام فعالیت‌های انجام‌شده با حساب کاربری‌تان هستید. آروما مسئولیتی در قبال سوءاستفاده از حساب ندارد." },
      { h: "محصولات و قیمت‌ها", p: "تمامی تلاش ما بر این است که اطلاعات محصولات و قیمت‌ها دقیق نمایش داده شوند. در صورت بروز خطا، آروما حق اصلاح را محفوظ می‌دارد." },
      { h: "اصالت کالا", p: "تمامی محصولات با ضمانت ۱۰۰٪ اورجینال عرضه می‌شوند. در صورت اثبات غیراصیل بودن، مبلغ پرداختی مسترد خواهد شد." },
      { h: "مالکیت معنوی", p: "تمامی محتوا، طراحی و لوگوها متعلق به آروما بوده و کپی‌برداری بدون مجوز ممنوع است." },
      { h: "تغییر قوانین", p: "   آروما حق ویرایش این قوانین را در هر زمان برای خود محفوظ می‌داند." },
    ],
  },
  privacy: {
    title: "سیاست حریم خصوصی",
    updated: "آخرین بروزرسانی: ۱۴۰۳/۰۵/۰۱",
    sections: [
      { h: "جمع‌آوری اطلاعات", p: "ما اطلاعاتی نظیر نام، ایمیل، شماره تماس و آدرس را جهت پردازش سفارش‌ها جمع‌آوری می‌کنیم." },
      { h: "استفاده از اطلاعات", p: "اطلاعات شما صرفاً برای ارسال سفارش، پشتیبانی و بهبود خدمات استفاده می‌شود و هرگز به اشخاص ثالث فروخته نمی‌شود." },
      { h: "کوکی‌ها", p: "از کوکی‌ها برای شخصی‌سازی تجربه و به خاطر سپردن تنظیمات شما استفاده می‌کنیم. می‌توانید کوکی‌ها را از مرورگر خود غیرفعال کنید." },
      { h: "امنیت داده", p: "ما با به‌کارگیری روش‌های امنیتی استاندارد از اطلاعات شما محافظت می‌کنیم." },
      { h: "حقوق شما", p: "شما حق دسترسی، ویرایش یا حذف اطلاعات خود را دارید. برای این کار با پشتیبانی در تماس باشید." },
    ],
  },
  returns: {
    title: "شرایط بازگشت کالا",
    updated: "آخرین بروزرسانی: ۱۴۰۳/۰۵/۰۱",
    sections: [
      { h: "مهلت بازگشت", p: "شما می‌توانید تا ۷ روز پس از تحویل، کالا را در صورت عدم رضایت بازگردانید." },
      { h: "شرایط کالا", p: "کالا باید در شرایط اولیه، بدون استفاده، با بسته‌بندی اصلی و تمام ملحقات بازگردانده شود." },
      { h: "موارد مستثنی", p: "به دلایل بهداشتی، عطرهای بازشده و استفاده‌شده قابل بازگشت نیستند، مگر وجود نقص یا غیراصیل بودن." },
      { h: "هزینه ارسال", p: "در صورت تأیید نقص یا ارسال اشتباه، هزینه‌ی بازگشت بر عهده‌ی آروما خواهد بود." },
      { h: "نحوه بازگشت", p: "برای ثبت درخواست بازگشت، از طریق پشتیبانی یا پنل کاربری اقدام کنید." },
    ],
  },
};

export default function LegalView({ type }: { type: LegalType }) {
  const { go } = useStore();
  const c = CONTENT[type];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-1.5 text-xs text-zinc-500">
        <button onClick={() => go("home")} className="hover:text-amber-gold">خانه</button>
        <ChevronLeft size={12} /> <span className="text-zinc-300">{c.title}</span>
      </div>

      <Reveal>
        <span className="rounded-full border border-amber-gold/25 bg-amber-gold/5 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-amber-gold">LEGAL</span>
        <h1 className="mt-3 text-3xl font-black text-zinc-50 sm:text-4xl">{c.title}</h1>
        <p className="mt-2 text-xs text-zinc-500">{c.updated}</p>
      </Reveal>

      <div className="mt-8 space-y-6">
        {c.sections.map((s, i) => (
          <Reveal key={s.h} delay={i * 0.04}>
            <div className="rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-5 sm:p-6">
              <h2 className="text-base font-black text-amber-glow">{s.h}</h2>
              <p className="mt-2 text-sm leading-8 text-zinc-300">{s.p}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["terms", "privacy", "returns"] as LegalType[]).filter((t) => t !== type).map((t) => (
          <button key={t} onClick={() => go(t)} className="rounded-full border border-amber-gold/25 bg-amber-gold/5 px-4 py-2 text-xs font-semibold text-amber-gold transition hover:bg-amber-gold/15">{CONTENT[t].title}</button>
        ))}
      </div>
    </div>
  );
}
