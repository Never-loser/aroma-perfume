import { MessageCircle, Send, Phone, MapPin, Mail } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { CATEGORIES, BRANDS } from "../data/products";

export default function Footer() {
  const { go, openCatalog } = useStore();

  return (
    <footer className="relative mt-24 border-t border-amber-gold/15 bg-onyx-black/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👑</span>
              <div>
                <div className="font-serif text-lg font-black tracking-wider text-amber-glow">
                  AROMA
                </div>
                <div className="text-[10px] tracking-widest text-amber-gold/70">
                  آروما
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-7 text-zinc-400">
              فروشگاه آنلاین عطر و ادکلن‌های اورجینال با ضمانت اصالت کالا و ارسال سریع.
            </p>
            <div className="mt-5 flex gap-2">
              {[MessageCircle, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-amber-gold/20 bg-white/5 text-amber-gold transition hover:bg-amber-gold/15"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* categories */}
          <div>
            <h4 className="mb-4 font-bold text-zinc-200">دسته‌بندی‌ها</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              {CATEGORIES.filter((c) => c !== "همه").map((c) => (
                <li key={c}>
                  <button
                    onClick={() => openCatalog(c)}
                    className="transition hover:text-amber-gold"
                  >
                    عطرهای {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* quick links */}
          <div>
            <h4 className="mb-4 font-bold text-zinc-200">دسترسی سریع</h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><button onClick={() => go("about")} className="transition hover:text-amber-gold">درباره ما</button></li>
              <li><button onClick={() => go("contact")} className="transition hover:text-amber-gold">تماس با ما</button></li>
              <li><button onClick={() => go("faq")} className="transition hover:text-amber-gold">سوالات متداول</button></li>
              <li><button onClick={() => go("blog")} className="transition hover:text-amber-gold">مجله و مقالات</button></li>
              <li><button onClick={() => go("catalog")} className="transition hover:text-amber-gold">همه محصولات</button></li>
              <li><button onClick={() => go("home")} className="transition hover:text-amber-gold">صفحه اصلی</button></li>
              <li><button onClick={() => go("notfound")} className="transition hover:text-amber-gold">صفحه ۴۰۴</button></li>
              <li><button onClick={() => go("servererror")} className="transition hover:text-amber-gold">خطای سرور ۵۰۳</button></li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="mb-4 font-bold text-zinc-200">ارتباط با ما</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-amber-gold" />
                <span dir="ltr">۰۲۱ - ۹۱۰۰ ۲۰۳۰</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-amber-gold" />
                <span dir="ltr">info@aroma.ir</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-amber-gold" />
                <span>تهران، خیابان فرشته، گالری عطر سلطنتی</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {BRANDS.slice(0, 4).map((b) => (
                <span key={b} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-zinc-500">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-center text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} آروما — تمامی حقوق محفوظ است.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <button onClick={() => go("terms")} className="transition hover:text-amber-gold">قوانین</button>
            <span className="text-zinc-700">·</span>
            <button onClick={() => go("privacy")} className="transition hover:text-amber-gold">حریم خصوصی</button>
            <span className="text-zinc-700">·</span>
            <button onClick={() => go("returns")} className="transition hover:text-amber-gold">بازگشت کالا</button>
            <span className="text-zinc-700">·</span>
            <span className="flex items-center gap-1 text-amber-gold">✦ ضمانت اصالت کالا</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
