import { X, GitCompare, Trash2, Plus } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { products, toman } from "../data/products";
import { Stars } from "./ui";

export default function CompareModal() {
  const { compareOpen, setCompareOpen, compare, toggleCompare, clearCompare, addToCart } = useStore();
  if (!compareOpen) return null;

  const items = compare.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  const rows: { label: string; get: (p: (typeof items)[number]) => string }[] = [
    { label: "برند", get: (p) => p.brand },
    { label: "خانواده رایحه", get: (p) => p.category },
    { label: "جنسیت", get: (p) => p.gender },
    { label: "ماندگاری", get: (p) => `${toman(p.longevity)} از ۵` },
    { label: "پخش بو", get: (p) => `${toman(p.sillage)} از ۵` },
    { label: "امتیاز", get: (p) => `${toman(p.rating)} از ۵` },
    { label: "سال عرضه", get: (p) => toman(p.launchYear) },
    { label: "قیمت از", get: (p) => `${toman(p.sizes[0].price)} ت` },
  ];

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setCompareOpen(false)} />
      <div className="relative w-full max-w-4xl animate-fade-up overflow-hidden rounded-3xl border border-amber-gold/20 bg-onyx-dark shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="flex items-center gap-2">
            <GitCompare size={18} className="text-amber-gold" />
            <span className="font-serif font-black text-zinc-100">مقایسه عطرها</span>
            <span className="rounded-full bg-amber-gold/15 px-2 py-0.5 text-[10px] font-bold text-amber-gold">{toman(items.length)}/۳</span>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button onClick={clearCompare} className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-[11px] text-zinc-400 hover:text-amber-rose">
                <Trash2 size={13} /> پاک کردن
              </button>
            )}
            <button onClick={() => setCompareOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-zinc-400 hover:text-amber-gold">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-auto p-4">
          {items.length === 0 ? (
            <div className="grid place-items-center gap-3 py-16 text-center">
              <GitCompare size={40} className="text-amber-gold/40" />
              <p className="text-sm text-zinc-400">هیچ عطری برای مقایسه انتخاب نشده است.</p>
              <p className="text-xs text-zinc-600">از کارت محصولات با آیکون مقایسه، تا ۳ عطر اضافه کنید.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="w-28 p-2 align-top" />
                    {items.map((p) => (
                      <td key={p.id} className="min-w-[160px] p-2 text-center align-top">
                        <div className="relative mx-auto mb-2 h-24 w-20">
                          <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: bottleSvg(p.liquid, p.cap, p.accent, p.brand) }} />
                          <button onClick={() => toggleCompare(p.id)} className="absolute -left-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-amber-rose text-white">
                            <X size={12} />
                          </button>
                        </div>
                        <div className="font-serif text-[10px] text-amber-gold/80">{p.brand}</div>
                        <div className="text-sm font-bold text-zinc-100">{p.name}</div>
                      </td>
                    ))}
                  </tr>
                  {rows.map((row, ri) => (
                    <tr key={row.label} className={ri % 2 ? "bg-white/[0.02]" : ""}>
                      <td className="p-2 text-xs font-bold text-zinc-400">{row.label}</td>
                      {items.map((p) => (
                        <td key={p.id} className="p-2 text-center text-sm text-zinc-200">
                          {row.label === "امتیاز" ? <Stars value={p.rating} size={11} className="justify-center" /> : row.get(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-2" />
                    {items.map((p) => (
                      <td key={p.id} className="p-2 text-center">
                        <button
                          onClick={() => addToCart(p.id, p.sizes[0].ml)}
                          className="mx-auto flex items-center gap-1 rounded-full bg-gradient-to-l from-amber-dark to-amber-gold px-4 py-2 text-xs font-bold text-onyx-black"
                        >
                          <Plus size={13} /> افزودن
                        </button>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2" />
                    {items.map((p) => (
                      <td key={p.id} className="p-2 text-center text-[11px] text-zinc-500">
                        {p.bestseller && <span className="text-amber-gold">✦ پرفروش</span>}
                        {p.isNew && <span className="text-amber-rose">✦ تازه‌وارد</span>}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function bottleSvg(liquid: string, cap: string, accent: string, label: string) {
  const [c1, c2] = liquid.split(",");
  const gid = "cmp" + Math.random().toString(36).slice(2, 7);
  return `<svg viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>
    <rect x="92" y="14" width="36" height="40" rx="5" fill="${cap}"/>
    <path d="M62 86 Q110 74 158 86 L164 256 Q110 270 56 256 Z" fill="url(#${gid})" stroke="${accent}" stroke-opacity="0.4" stroke-width="1.5"/>
    <rect x="78" y="150" width="64" height="70" rx="4" fill="#0b0b0b" opacity="0.35"/>
    <text x="110" y="180" text-anchor="middle" font-family="IRANYekanX,sans-serif" font-size="9" font-weight="700" fill="${accent}">${label.slice(0, 8)}</text>
  </svg>`;
}
