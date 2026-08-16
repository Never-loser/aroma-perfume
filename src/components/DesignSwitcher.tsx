import { useState } from "react";
import { LayoutGrid, X } from "lucide-react";
import { useStore, type LayoutTheme, type PageKey } from "../store/StoreContext";

const PAGES: { id: PageKey; label: string }[] = [
  { id: "home", label: "خانه" },
  { id: "catalog", label: "محصولات" },
  { id: "detail", label: "تک‌محصول" },
  { id: "auth", label: "ورود" },
];

const LAYOUTS: { id: LayoutTheme; label: string }[] = [
  { id: "l1", label: "کلاسیک" },
  { id: "l2", label: "مدرن" },
  { id: "l3", label: "مجله‌ای" },
];

export default function DesignSwitcher() {
  const { layouts, setLayout } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[68] flex items-center gap-2 rounded-full border border-amber-gold/30 bg-onyx-dark/80 px-4 py-3 text-xs font-bold text-amber-gold shadow-2xl backdrop-blur-xl transition hover:border-amber-gold/60"
      >
        {open ? <X size={16} /> : <LayoutGrid size={16} />}
        <span className="hidden sm:inline">{open ? "بستن" : "چیدمان صفحه"}</span>
        <span className="rounded-full bg-amber-gold/20 px-2 py-0.5 text-[10px]">۳</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[68]" onClick={() => setOpen(false)} />
          <div className="fixed bottom-20 right-5 z-[69] w-72 animate-fade-up overflow-hidden rounded-3xl border border-amber-gold/20 bg-onyx-dark/95 p-4 shadow-2xl backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-1.5 px-1 text-[11px] font-black text-zinc-300">
              <LayoutGrid size={13} className="text-amber-gold" /> چیدمان هر صفحه (مستقل)
            </div>
            <div className="space-y-2">
              {PAGES.map((pg) => (
                <div key={pg.id} className="rounded-2xl bg-white/[0.03] p-2.5">
                  <div className="mb-1.5 px-1 text-[11px] font-bold text-zinc-300">{pg.label}</div>
                  <div className="grid grid-cols-3 gap-1">
                    {LAYOUTS.map((l) => {
                      const active = layouts[pg.id] === l.id;
                      return (
                        <button
                          key={l.id}
                          onClick={() => setLayout(pg.id, l.id)}
                          className={`rounded-lg border px-2 py-1.5 text-[11px] font-semibold transition ${
                            active
                              ? "border-amber-gold/60 bg-amber-gold/15 text-amber-glow"
                              : "border-white/10 text-zinc-400 hover:border-amber-gold/30 hover:text-zinc-200"
                          }`}
                        >
                          {active ? "✓ " : ""}
                          {l.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-xl bg-amber-gold/5 px-2.5 py-1.5 text-[10px] leading-5 text-zinc-500">
              مثلاً خانه = مدرن و محصولات = مجله‌ای. برای بستن، بیرون از کادر کلیک کنید.
            </div>
          </div>
        </>
      )}
    </>
  );
}
