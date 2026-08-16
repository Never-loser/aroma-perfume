import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ChevronLeft } from "lucide-react";
import Reveal from "./Reveal";
import { GoldButton, SectionHeading } from "./ui";

const INFO = [
  { icon: Phone, title: "تماس تلفنی", lines: ["۰۲۱ - ۹۱۰۰ ۲۰۳۰", "شنبه تا چهارشنبه ۹ تا ۲۱"], dir: true },
  { icon: Mail, title: "ایمیل", lines: ["info@aroma.ir", "پاسخ کمتر از ۲۴ ساعت"], dir: true },
  { icon: MapPin, title: "آدرس", lines: ["تهران، خیابان فرشته", "گالری عطر سلطنتی، طبقه اول"], dir: false },
  { icon: Clock, title: "ساعات کاری", lines: ["شنبه تا چهارشنبه: ۹–۲۱", "پنجشنبه: ۹–۱۴"], dir: false },
];

export default function ContactView() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal>
        <SectionHeading center eyebrow="CONTACT" title={<span>با ما در <span className="amber-gradient-text">ارتباط</span> باشید</span>} desc="تیم پشتیبانی  آروما آماده پاسخگویی به سوالات شماست." />
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* info cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {INFO.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-5">
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-amber-gold/10 text-amber-gold">
                  <c.icon size={20} />
                </div>
                <div className="font-bold text-zinc-100">{c.title}</div>
                {c.lines.map((l) => (
                  <div key={l} dir={c.dir ? "ltr" : "rtl"} className={`mt-1 text-xs text-zinc-400 ${c.dir ? "text-right" : ""}`}>{l}</div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {/* form */}
        <Reveal delay={0.1} className="lg:col-span-3">
          <div className="rounded-3xl border border-amber-gold/15 bg-onyx-dark/40 p-6 sm:p-8">
            {sent ? (
              <div className="grid place-items-center py-10 text-center">
                <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">پیام شما ارسال شد!</h3>
                <p className="mt-2 text-sm text-zinc-400">به‌زودی کارشناسان ما با شما تماس خواهند گرفت.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="mb-2">
                  <h3 className="font-serif text-lg font-black text-zinc-100">ارسال پیام</h3>
                  <p className="mt-1 text-xs text-zinc-500">تیم پشتیبانی آرما آماده‌ی پاسخگویی به سوالات شماست.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field placeholder="نام شما" />
                  <Field placeholder="شماره تماس" dir="ltr" />
                </div>
                <Field placeholder="موضوع" />
                <textarea
                  required
                  rows={5}
                  placeholder="متن پیام شما..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-amber-gold/50"
                />
                <GoldButton type="submit" className="w-full">
                  ارسال پیام <Send size={16} />
                </GoldButton>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* map placeholder */}
      <Reveal delay={0.1}>
        <div className="mt-6 grid h-64 place-items-center rounded-3xl border border-amber-gold/10 bg-gradient-to-br from-onyx-dark/60 to-onyx-black/60 text-center">
          <div>
            <MapPin size={32} className="mx-auto mb-2 text-amber-gold/60" />
            <p className="text-sm text-zinc-300">تهران، خیابان فرشته، گالری عطر سلطنتی</p>
            <button className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-gold">
              مشاهده روی نقشه <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      required
      className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-zinc-100 outline-none transition duration-200 placeholder:text-zinc-500 focus:border-amber-gold/60 focus:ring-4 focus:ring-amber-gold/15"
    />
  );
}
