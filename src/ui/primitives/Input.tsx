/**
 * Input — SDS Primitive
 * States: default | focus | error
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, error, hint, icon, className = "", ...props }: InputProps) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-semibold text-zinc-300">{label}</span>}
      <div className="relative">
        {icon && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-amber-gold/70">{icon}</span>}
        <input
          {...props}
          className={`h-12 w-full rounded-2xl border bg-black/20 text-sm text-zinc-100 outline-none transition duration-200 placeholder:text-zinc-500 sm:h-14 ${icon ? "pr-12 pl-4" : "px-4"} ${error ? "border-error focus:border-error" : "border-white/10 focus:border-amber-gold/60 focus:ring-4 focus:ring-amber-gold/15"} ${className}`}
        />
      </div>
      {error && <span className="mt-1.5 flex items-center gap-1 text-[11px] text-error">{error}</span>}
      {hint && !error && <span className="mt-1.5 block text-[11px] text-zinc-500">{hint}</span>}
    </label>
  );
}
