interface BottleProps {
  liquid: string; // "color1,color2"
  cap: string;
  accent: string;
  className?: string;
  label?: string;
  sub?: string;
}

/**
 * Premium faceted perfume bottle rendered as parametric SVG.
 * liquid gradient + cap color are derived from each product.
 */
export default function PremiumBottle({
  liquid,
  cap,
  accent,
  className,
  label,
  sub,
}: BottleProps) {
  const [c1, c2] = liquid.split(",");
  const gid = `liq-${c1.replace("#", "")}-${c2.replace("#", "")}`;
  const gid2 = `glow-${accent.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <radialGradient id={gid2} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`glass-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* ambient glow */}
      <ellipse cx="110" cy="240" rx="90" ry="120" fill={`url(#${gid2})`} />

      {/* cap */}
      <rect x="92" y="14" width="36" height="40" rx="5" fill={cap} />
      <rect x="92" y="14" width="36" height="40" rx="5" fill="#ffffff" opacity="0.08" />
      <rect x="92" y="20" width="36" height="6" rx="3" fill={accent} opacity="0.7" />
      {/* collar */}
      <rect x="96" y="52" width="28" height="12" rx="2" fill={cap} opacity="0.85" />
      {/* neck */}
      <rect x="100" y="62" width="20" height="22" fill={`url(#${gid})`} opacity="0.5" />

      {/* bottle body */}
      <path
        d="M62 86 Q110 74 158 86 L164 256 Q110 270 56 256 Z"
        fill={`url(#${gid})`}
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {/* facets */}
      <path d="M110 78 L110 262" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
      <path d="M78 88 L74 254" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      <path d="M142 88 L146 254" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
      {/* glass overlay */}
      <path
        d="M62 86 Q110 74 158 86 L164 256 Q110 270 56 256 Z"
        fill={`url(#glass-${gid})`}
      />

      {/* highlight */}
      <path
        d="M74 100 Q80 92 92 92 L92 230 Q82 234 76 226 Z"
        fill="#ffffff"
        opacity="0.14"
      />

      {/* label */}
      <rect
        x="78"
        y="150"
        width="64"
        height="70"
        rx="4"
        fill="#0b0b0b"
        opacity="0.32"
      />
      <rect
        x="78"
        y="150"
        width="64"
        height="70"
        rx="4"
        fill="none"
        stroke={accent}
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      {label && (
        <text
          x="110"
          y="182"
          textAnchor="middle"
          fontFamily="IRANYekanX, sans-serif"
          fontSize="11"
          fontWeight="700"
          fill={accent}
          letterSpacing="1"
        >
          {label.length > 12 ? label.slice(0, 10) + "…" : label}
        </text>
      )}
      {sub && (
        <text
          x="110"
          y="200"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="6.5"
          fill="#ffffff"
          opacity="0.7"
        >
          {sub}
        </text>
      )}
      <line x1="90" y1="208" x2="130" y2="208" stroke={accent} strokeOpacity="0.5" strokeWidth="0.8" />
    </svg>
  );
}
