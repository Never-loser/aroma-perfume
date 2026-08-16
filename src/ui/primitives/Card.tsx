/**
 * Card — SDS Primitive
 * A surface container with optional hover effect.
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export default function Card({ hover = true, padding = "md", className = "", children, ...props }: CardProps) {
  const paddings = { sm: "p-4", md: "p-5 sm:p-6", lg: "p-6 sm:p-8" };
  return (
    <div
      className={`rounded-3xl border border-amber-gold/10 bg-onyx-dark/40 ${paddings[padding]} shadow-card backdrop-blur-sm transition-all duration-300 ${hover ? "hover:-translate-y-1 hover:border-amber-gold/30 hover:shadow-pop" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
