/**
 * Legacy primitives — backward compatibility with existing components.
 * These wrap the new Button primitive or provide section-level helpers.
 */

import Button from "./Button";
import Badge from "./Badge";
import { toman } from "../../data/products";

export const GoldButton = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button variant="primary" size="md" className={className} {...props}>{children}</Button>
);

export const GhostButton = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button variant="secondary" size="md" className={className} {...props}>{children}</Button>
);

export function ImgBadge({ children, color = "#E5C583" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center justify-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-[#08130c] shadow-soft">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

export function Price({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={className}>
      {toman(value)}
      <span className="mr-1 text-[0.6em] font-normal opacity-70">تومان</span>
    </span>
  );
}

export function SectionHeading({ eyebrow, title, desc, center }: { eyebrow?: string; title: React.ReactNode; desc?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
          <span className="inline-flex items-center rounded-full border border-amber-gold/25 bg-amber-gold/5 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.25em] text-amber-gold">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-balance text-2xl font-black leading-tight text-zinc-50 sm:text-3xl">{title}</h2>
      {desc && <p className={`mt-3 text-sm leading-7 text-zinc-400 ${center ? "mx-auto max-w-2xl" : ""}`}>{desc}</p>}
    </div>
  );
}

export { Badge };
