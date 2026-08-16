/**
 * Button — SDS Primitive
 * Variants: primary | secondary | ghost
 * Sizes: sm | md | lg
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({ variant = "primary", size = "md", fullWidth = false, className = "", children, ...props }: ButtonProps) {
  const base = "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-extrabold transition-all duration-300 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary: "bg-gradient-to-l from-amber-dark via-amber-gold to-amber-glow text-onyx-black shadow-gold ring-2 ring-amber-gold/25 hover:brightness-110 hover:ring-amber-gold/50",
    secondary: "border-2 border-amber-gold/40 bg-white/5 text-zinc-50 backdrop-blur-sm hover:border-amber-gold/70 hover:bg-amber-gold/15",
    ghost: "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
  };

  const sizes = {
    sm: "h-10 px-4 text-xs",
    md: "h-12 px-6 text-sm sm:h-14 sm:px-8 sm:text-base",
    lg: "h-14 px-8 text-base sm:h-16 sm:px-10 sm:text-lg",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`} {...props}>
      {variant === "primary" && <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />}
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );
}
