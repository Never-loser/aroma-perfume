/**
 * Stars — SDS Primitive
 * Rating display with partial fill support.
 */

import { Star } from "lucide-react";

export default function Stars({ value, size = 14, className = "" }: { value: number; size?: number; className?: string }) {
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
