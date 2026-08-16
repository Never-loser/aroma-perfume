import { useState } from "react";
import type { Product } from "../data/products";

/**
 * Shows a real product photo when available, otherwise falls back
 * to a themed gradient placeholder.
 */
export default function ProductImage({
  product,
  className = "",
  contain = false,
}: {
  product: Product;
  className?: string;
  contain?: boolean;
}) {
  const [err, setErr] = useState(false);

  if (product.image && !err) {
    return (
      <img
        src={product.image}
        alt={`${product.brand} ${product.name}`}
        loading="lazy"
        onError={() => setErr(true)}
        className={`${contain ? "object-contain" : "object-cover"} ${className}`}
      />
    );
  }

  // gradient placeholder using product colors
  const [c1, c2] = product.liquid.split(",");
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      <div className="px-3 text-center">
        <div className="text-3xl">🧴</div>
        <div className="mt-1 truncate text-[10px] font-bold text-white/80">{product.brand}</div>
        <div className="truncate text-[8px] text-white/60">{product.nameEn}</div>
      </div>
    </div>
  );
}
