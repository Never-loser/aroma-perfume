import { useState, useRef, useEffect } from "react";

export default function LivePreview({ path, className = "", icon, theme = "dark" }: { path: string; alt?: string; className?: string; icon?: React.ReactNode; theme?: "dark" | "light" }) {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollRef = useRef<number | null>(null);
  const [scale, setScale] = useState(0.3);

  // continuously observe visibility — load when in view, unload when out
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { rootMargin: "0px 0px -80px 0px", threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [path]);

  // measure scale
  useEffect(() => {
    const m = () => { if (containerRef.current) setScale(Math.min(containerRef.current.offsetWidth / 1280, 0.6)); };
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  // auto-scroll on hover (desktop only — mobile has no hover)
  useEffect(() => {
    if (!hovering) {
      if (scrollRef.current) { cancelAnimationFrame(scrollRef.current); scrollRef.current = null; }
      // reset to top when not hovering
      const iframe = iframeRef.current;
      if (iframe) {
        try {
          const doc = iframe.contentDocument;
          if (doc) { doc.documentElement.scrollTop = 0; doc.body.scrollTop = 0; }
        } catch { /* */ }
      }
      return;
    }
    const startScroll = setTimeout(() => {
      const tick = () => {
        const iframe = iframeRef.current;
        if (!iframe) return;
        try {
          const doc = iframe.contentDocument;
          if (!doc) return;
          const max = Math.max(0, doc.documentElement.scrollHeight - 500);
          const cur = doc.documentElement.scrollTop || doc.body.scrollTop;
          let next = cur + Math.max(2, Math.floor(max / 200));
          if (next > max) next = 0;
          doc.documentElement.scrollTop = next;
          doc.body.scrollTop = next;
        } catch { /* */ }
        scrollRef.current = requestAnimationFrame(tick);
      };
      scrollRef.current = requestAnimationFrame(tick);
    }, 1500); // wait for React to render
    return () => clearTimeout(startScroll);
  }, [hovering]);

  useEffect(() => () => { if (scrollRef.current) cancelAnimationFrame(scrollRef.current); }, []);

  const pageH = containerRef.current ? containerRef.current.offsetHeight / scale : 800;
  const themeParam = theme === "light" ? (path.includes("?") ? "&theme=light" : "?theme=light") : "";
  const src = `${window.location.origin}${window.location.pathname}${path}${themeParam}`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`group relative overflow-hidden ${className}`}
    >
      {/* loading state — simple branded placeholder */}
      {!visible && (
        <div className="absolute inset-0 z-0 grid place-items-center" style={{ background: theme === "dark" ? "#02140D" : "#FAF8F5" }}>
          <div className="text-center">
            <div className="mx-auto mb-2 h-5 w-5 animate-spin rounded-full border-2 border-amber-gold/30 border-t-amber-gold" />
            <span className="text-[9px] text-zinc-500">در حال بارگذاری...</span>
          </div>
        </div>
      )}

      {/* REAL page iframe — loads when visible, removes when scrolled away */}
      {visible && (
        <div className="absolute top-0 right-0 z-10 origin-top-right" style={{ width: "1280px", height: `${pageH}px`, transform: `scale(${scale})` }}>
          <iframe
            ref={iframeRef}
            src={src}
            className="h-full w-full border-0"
            title="page preview"
            loading="lazy"
            style={{ pointerEvents: "none", background: theme === "dark" ? "#02140D" : "#FAF8F5" }}
          />
        </div>
      )}

      {/* gradient */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-onyx-black/40 via-transparent to-transparent" />

      {/* icon */}
      {icon && (
        <div className="absolute right-2.5 top-2.5 z-40 grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-onyx-black/60 text-amber-gold backdrop-blur-md transition group-hover:scale-110">
          {icon}
        </div>
      )}

      {/* click catcher — opens in new tab */}
      <div className="absolute inset-0 z-50 cursor-pointer" />

      {/* hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-center justify-center pb-2 transition-opacity duration-300" style={{ opacity: hovering ? 0 : 1 }}>
        <span className="inline-flex items-center gap-1 rounded-full bg-onyx-black/80 px-2.5 py-1 text-[9px] font-semibold text-amber-gold backdrop-blur-md">
          🔍 نگه دارید — اسکرول
        </span>
      </div>
    </div>
  );
}
