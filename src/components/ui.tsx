import { Star, AlertCircle } from "lucide-react";
import { toman } from "../data/products";

/* ---------- Stars ---------- */
export function Stars({ value, size = 14, className = "" }: { value: number; size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} dir="ltr" aria-label={`امتیاز ${value} از ۵`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative" style={{ width: size, height: size }}>
            <Star size={size} className="absolute text-amber-gold/25" fill="currentColor" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} className="text-amber-gold" fill="currentColor" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ---------- Price ---------- */
export function Price({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={className}>
      {toman(value)}
      <span className="mr-1 text-[0.6em] font-normal opacity-70">تومان</span>
    </span>
  );
}

/* ---------- Badge (soft, inline) ---------- */
export function Badge({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "rose" | "emerald" | "dark" }) {
  const tones: Record<string, string> = {
    gold: "bg-amber-gold/15 text-amber-glow border-amber-gold/30",
    rose: "bg-amber-rose/15 text-amber-rose border-amber-rose/30",
    emerald: "bg-onyx-light/30 text-emerald-300 border-emerald-400/20",
    dark: "bg-black/30 text-zinc-300 border-white/10",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${tones[tone]}`}>{children}</span>;
}

/* ---------- ImgBadge (solid white, sits ON a photo) ---------- */
export function ImgBadge({ children, color = "#E5C583", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center gap-1 rounded-full bg-[#ffffff] px-2.5 py-1 text-[10px] font-extrabold text-[#08130c] shadow-soft ${className}`}>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({ eyebrow, title, desc, center }: { eyebrow?: string; title: React.ReactNode; desc?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
          <span className="inline-flex items-center rounded-full border border-amber-gold/25 bg-amber-gold/5 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.25em] text-amber-gold">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-balance text-3xl font-black leading-tight text-zinc-50 sm:text-4xl">{title}</h2>
      {desc && <p className={`mt-4 text-sm leading-7 text-zinc-400 ${center ? "mx-auto max-w-2xl" : ""}`}>{desc}</p>}
    </div>
  );
}

/* ---------- Primary button (56px, focus/disabled/active) ---------- */
export function GoldButton({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-amber-dark via-amber-gold to-amber-glow px-6 text-sm font-extrabold text-onyx-black shadow-gold ring-2 ring-amber-gold/25 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:ring-amber-gold/50 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 sm:h-14 sm:px-8 sm:text-base ${className}`}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );
}

/* ---------- Secondary button (56px) ---------- */
export function GhostButton({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-amber-gold/40 bg-white/5 px-6 text-sm font-bold text-zinc-50 backdrop-blur-sm transition-all duration-300 hover:border-amber-gold/70 hover:bg-amber-gold/15 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 sm:h-14 sm:px-8 sm:text-base ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------- Premium input (56px, error/focus states) ---------- */
export function Input({
  label, error, hint, icon, className = "", ...props
}: { label?: string; error?: string; hint?: string; icon?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-xs font-semibold text-zinc-300">{label}</span>}
      <div className="relative">
        {icon && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-amber-gold/70">{icon}</span>}
        <input
          {...props}
          className={`h-12 w-full rounded-2xl border bg-black/20 text-sm text-zinc-100 outline-none transition duration-200 placeholder:text-zinc-500 sm:h-14 ${icon ? "pr-12 pl-4" : "px-4"} ${error ? "border-error focus:border-error" : "border-white/10 focus:border-amber-gold/60 focus:ring-4 focus:ring-amber-gold/15"} ${className}`}
        />
      </div>
      {error && <span className="mt-1.5 flex items-center gap-1 text-[11px] text-error"><AlertCircle size={12} /> {error}</span>}
      {hint && !error && <span className="mt-1.5 block text-[11px] text-zinc-500">{hint}</span>}
    </label>
  );
}

/* ---------- Premium card ---------- */
export function Card({ children, className = "", hover = true, ...props }: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div className={`rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 p-6 shadow-card backdrop-blur-sm transition-all duration-300 ${hover ? "hover:-translate-y-1 hover:border-amber-gold/30 hover:shadow-pop" : ""} ${className}`} {...props}>
      {children}
    </div>
  );
}
