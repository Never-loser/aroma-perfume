/**
 * Badge — SDS Primitive
 * Variants: gold | rose | emerald | dark | solid
 */

export default function Badge({ children, variant = "gold" }: { children: React.ReactNode; variant?: "gold" | "rose" | "emerald" | "dark" | "solid" }) {
  const variants: Record<string, string> = {
    gold: "bg-amber-gold/15 text-amber-glow border-amber-gold/30",
    rose: "bg-amber-rose/15 text-amber-rose border-amber-rose/30",
    emerald: "bg-onyx-light/30 text-emerald-300 border-emerald-400/20",
    dark: "bg-black/30 text-zinc-300 border-white/10",
    solid: "bg-white text-[#08130c] border-transparent shadow-soft",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${variants[variant]}`}>{children}</span>;
}
