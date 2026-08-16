/**
 * Select — SDS Primitive
 * Custom RTL-aware dropdown replacing native select.
 */

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "انتخاب کنید",
  className = "",
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-full border border-amber-gold/25 bg-onyx-dark/70 px-4 py-2.5 text-xs font-semibold text-zinc-100 outline-none transition hover:border-amber-gold/60"
      >
        <span className="flex min-w-0 items-center gap-1.5">
          {icon && <span className="shrink-0 text-amber-gold">{icon}</span>}
          <span className={`truncate ${current ? "text-zinc-100" : "text-zinc-500"}`}>{current?.label ?? placeholder}</span>
        </span>
        <ChevronDown size={14} className={`shrink-0 text-amber-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-1.5 animate-fade-in overflow-hidden rounded-2xl border border-amber-gold/20 bg-onyx-dark/95 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-right text-xs transition ${active ? "bg-amber-gold/15 text-amber-glow" : "text-zinc-300 hover:bg-white/5"}`}
              >
                <span className="truncate">{o.label}</span>
                {active && <Check size={13} className="shrink-0 text-amber-gold" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
