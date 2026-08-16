import { motion } from "motion/react";

type Variant = "up" | "blur" | "scale";

const VARIANTS: Record<Variant, { hidden: Record<string, number | string>; show: Record<string, number | string> }> = {
  up: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  blur: { hidden: { opacity: 0, y: 16, filter: "blur(10px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } },
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
}) {
  const v = VARIANTS[variant] ?? VARIANTS.up;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={v}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
