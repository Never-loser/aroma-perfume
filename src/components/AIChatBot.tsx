import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { products, toman, type Product } from "../data/products";
import PremiumBottle from "./PremiumBottle";

interface Msg {
  from: "bot" | "user";
  text: string;
  picks?: Product[];
}

const GREETING: Msg = {
  from: "bot",
  text: "سلام 👑 من دستیار عطر آروما  هستم. بگید برای چه مناسبتی یا با چه سلیقه‌ای عطر می‌خواید تا بهترین گزینه‌ها رو معرفی کنم.",
};

const SUGGESTIONS = [
  "عطر زنانه شیرین",
  "عطر مردانه شبانه",
  "عطر تازه برای روز",
  "عطر یونی‌سکس چوبی",
  "بهترین عطر برای مهمونی",
  "عطر لوکس هدیه",
];

function recommend(text: string): Product[] {
  const t = text.toLowerCase();
  const score = (p: Product) => {
    let s = p.rating * 2 + (p.bestseller ? 4 : 0);
    if (/زن|بانو|خانم|دختر/.test(text)) s += p.gender === "زنانه" ? 6 : 0;
    if (/مرد|آقا|پسر|جوان/.test(text)) s += p.gender === "مردانه" ? 6 : 0;
    if (/یونی|مشترک|دو\.?نفره/.test(text)) s += p.gender === "یونی‌سکس" ? 6 : 0;
    if (/گل|رز|یاس|عطر گل/.test(text)) s += p.category === "گل‌ایی" ? 5 : 0;
    if (/چوب|صندل|عود|وود/.test(text)) s += p.category === "چوبی" ? 5 : 0;
    if (/شرقی|عجیب|مرموز|گرم/.test(text)) s += p.category === "شرقی" ? 5 : 0;
    if (/تازه|خنک|مرکبات|روزانه|ورزش|ساحل|تابستان/.test(text)) s += p.category === "تازه و مرکباتی" ? 5 : 0;
    if (/شیرین|وانیل|کارامل|خوشبو/.test(text)) s += p.category === "خوشبو و شیرین" ? 5 : 0;
    if (/خاج|آروماتیک|کلاسیک|مردانه کلاسیک/.test(text)) s += p.category === "خاج و آروماتیک" ? 5 : 0;
    if (/شب|مهمون|مهمونی|رسمی|قرار|خاص/.test(text)) s += ["شرقی", "خوشبو و شیرین", "چوبی"].includes(p.category) ? 4 : 0;
    if (/روز|کار|اداری|روزمره/.test(text)) s += ["تازه و مرکباتی", "گل‌ایی"].includes(p.category) ? 4 : 0;
    if (/هدیه|کادو|لوکس/.test(text)) s += p.sizes[p.sizes.length - 1].price > 15000000 ? 4 : 0;
    // brand mentions
    if (new RegExp(p.brand.toLowerCase(), "i").test(t)) s += 8;
    if (new RegExp(p.name, "i").test(t) || new RegExp(p.nameEn.toLowerCase(), "i").test(t)) s += 10;
    return s;
  };
  return [...products].sort((a, b) => score(b) - score(a)).slice(0, 3);
}

function botReply(text: string): Msg {
  if (/سلام|درود|های/.test(text) && text.length < 8)
    return { from: "bot", text: "سلام! چطور می‌تونم کمکتون کنم؟ مثلاً بگید «عطر مردانه شبانه» یا «عطر تازه زنانه»." };
  const picks = recommend(text);
  const hasPref = /(زن|مرد|یونی|گل|چوب|شرقی|تازه|شیرین|خاج|شب|روز|هدیه)/.test(text);
  return {
    from: "bot",
    text: hasPref
      ? "بر اساس سلیقه شما، این عطرها رو پیشنهاد می‌کنم. روی هرکدام بزنید تا جزئیاتش رو ببینید:"
      : "این چند عطر از محبوب‌ترین‌های گالری‌مون هستن. دوست دارید برای چه مناسبتی عطر بخواید؟",
    picks,
  };
}

export default function AIChatBot() {
  const { openProduct } = useStore();
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, botReply(q)]);
    }, 900);
  };

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-5 z-[65] flex items-center gap-2 rounded-full bg-gradient-to-l from-amber-dark to-amber-gold px-4 py-3.5 text-sm font-bold text-onyx-black shadow-2xl shadow-amber-gold/30 transition hover:scale-105"
      >
        <span className="relative">
          <Bot size={22} />
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
        </span>
        <span className="hidden sm:inline">دستیار عطر</span>
      </button>

      {/* chat window */}
      {open && (
        <div className="fixed bottom-24 left-3 z-[66] flex h-[70vh] max-h-[560px] w-[calc(100vw-1.5rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-amber-gold/25 bg-onyx-dark shadow-2xl">
          {/* header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-l from-onyx-gray to-onyx-dark p-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-dark to-amber-glow text-onyx-black">
                <Bot size={20} />
              </div>
              <div>
                <div className="text-sm font-black text-zinc-100">دستیار آروما</div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> آنلاین · پاسخ سریع
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-zinc-400 hover:text-amber-gold">
              <X size={16} />
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] ${m.from === "user" ? "items-start" : "items-end"}`}>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                      m.from === "user"
                        ? "rounded-bl-md bg-amber-gold/15 text-zinc-100"
                        : "rounded-br-md bg-white/5 text-zinc-200"
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.picks && (
                    <div className="mt-2 space-y-2">
                      {m.picks.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => { openProduct(p.id); setOpen(false); }}
                          className="flex w-full items-center gap-2.5 rounded-2xl border border-amber-gold/15 bg-black/20 p-2 text-right transition hover:border-amber-gold/40"
                        >
                          <div className="h-12 w-10 shrink-0">
                            <PremiumBottle liquid={p.liquid} cap={p.cap} accent={p.accent} className="h-full w-full" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-serif text-[9px] text-amber-gold/80">{p.brand}</div>
                            <div className="truncate text-xs font-bold text-zinc-100">{p.name}</div>
                            <div className="text-[10px] text-zinc-500">از {toman(p.sizes[0].price)} ت</div>
                          </div>
                          <Sparkles size={14} className="text-amber-gold" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-end">
                <div className="flex gap-1 rounded-2xl rounded-br-md bg-white/5 px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-gold/60" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* suggestions */}
          <div className="border-t border-white/5 px-3 pt-2">
            <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="shrink-0 rounded-full border border-amber-gold/20 bg-amber-gold/5 px-3 py-1.5 text-[11px] text-amber-gold/90 transition hover:bg-amber-gold/15"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="سوال خود را بنویسید..."
              className="flex-1 rounded-full border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-amber-gold/50"
            />
            <button type="submit" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-dark to-amber-gold text-onyx-black transition hover:scale-105">
              <Send size={17} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
