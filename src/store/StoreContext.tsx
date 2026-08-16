import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "../data/products";

export const FREE_SHIPPING_THRESHOLD = 3_000_000;
export const SHIPPING_COST = 250_000;

export function getShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export type View =
  | "landing" | "home" | "catalog" | "detail" | "checkout" | "account" | "about" | "contact" | "faq"
  | "blog" | "terms" | "privacy" | "returns"
  | "notfound" | "servererror" | "article";

export type Theme = "dark" | "light";
export type FontTheme = "vazir" | "vazirmatn" | "katibeh" | "lalezar" | "markazi" | "noto";
export type LayoutTheme = "l1" | "l2" | "l3";
export type PageKey = "home" | "catalog" | "detail" | "auth";

export interface AppUser { name: string; email: string; phone?: string; }
interface StoredUser extends AppUser { password: string; }

export interface CartItem { id: string; sizeMl: number; qty: number; }
export interface CatalogFilters {
  category: string; brand: string; gender: string; query: string; sort: string; maxPrice: number;
}

interface AuthResult { ok: boolean; error?: string; }
interface RegisterData { name: string; email: string; phone: string; password: string; }

const FONT_CLASSES = ["vazir", "vazirmatn", "katibeh", "lalezar", "markazi", "noto"];

interface StoreState {
  view: View; selectedId: string | null; selectedArticleId: string | null;
  cart: CartItem[]; compare: string[];
  theme: Theme; font: FontTheme;
  layouts: Record<PageKey, LayoutTheme>;
  user: AppUser | null;
  cartOpen: boolean; compareOpen: boolean; authOpen: boolean; searchOpen: boolean; profileOpen: boolean;
  filters: CatalogFilters;
  go: (view: View) => void;
  openProduct: (id: string) => void;
  openArticle: (id: string) => void;
  openCatalog: (category?: string) => void;
  setFilters: (f: Partial<CatalogFilters>) => void;
  addToCart: (id: string, sizeMl: number, qty?: number) => void;
  removeFromCart: (id: string, sizeMl: number) => void;
  setQty: (id: string, sizeMl: number, qty: number) => void;
  clearCart: () => void;
  cartCount: number; cartTotal: number;
  toggleCompare: (id: string) => void; clearCompare: () => void;
  setCartOpen: (v: boolean) => void; setCompareOpen: (v: boolean) => void;
  setAuthOpen: (v: boolean) => void; setSearchOpen: (v: boolean) => void; setProfileOpen: (v: boolean) => void;
  setTheme: (t: Theme) => void; setFont: (f: FontTheme) => void;
  setLayout: (page: PageKey, value: LayoutTheme) => void;
  login: (email: string, password: string) => AuthResult;
  register: (data: RegisterData) => AuthResult;
  loginWithPhone: (phone: string) => void;
  logout: () => void;
}

const StoreContext = createContext<StoreState | null>(null);

const priceOf = (id: string, ml: number) => {
  const p = products.find((x) => x.id === id);
  return p?.sizes.find((s) => s.ml === ml)?.price ?? 0;
};

const USERS_KEY = "aroma_users";
const SESSION_KEY = "aroma_user";
const DEMO: StoredUser = { name: "کاربر دمو", email: "demo@aroma.ir", phone: "09120000000", password: "123456" };

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const list: StoredUser[] = raw ? JSON.parse(raw) : [];
    if (!list.some((u) => u.email === DEMO.email)) {
      list.unshift(DEMO);
      localStorage.setItem(USERS_KEY, JSON.stringify(list));
    }
    return list;
  } catch { return [DEMO]; }
}
function writeUsers(list: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

/* ---------- URL routing (hash-based) ---------- */
const VIEW_BY_KEY: Record<string, View> = {
  landing: "landing", home: "home", catalog: "catalog", checkout: "checkout", account: "account", about: "about",
  contact: "contact", faq: "faq", notfound: "notfound", servererror: "servererror",
  blog: "blog", terms: "terms", privacy: "privacy", returns: "returns",
};

function parsePath(pathname: string, search: string): { view: View; selectedId?: string; selectedArticleId?: string; category?: string; open?: string; theme?: string; layout?: string; tab?: string } {
  let p = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const seg = p.split("/").filter(Boolean);
  const params = search ? new URLSearchParams(search.replace(/^\?/, "")) : null;
  const category = params?.get("cat") || undefined;
  const open = params?.get("open") || undefined;
  const theme = params?.get("theme") || undefined;
  const layout = params?.get("layout") || undefined;
  const tab = params?.get("tab") || undefined;
  const first = seg[0] || "";
  if (first === "product" && seg[1]) return { view: "detail", selectedId: seg[1], layout, theme, open };
  if (first === "article" && seg[1]) return { view: "article", selectedArticleId: seg[1], theme };
  if (first && VIEW_BY_KEY[first]) return { view: VIEW_BY_KEY[first], category, open, theme, layout, tab };
  return { view: "notfound" };
}

function routeToPath(v: View, id: string | null, art: string | null) {
  if (v === "detail") return `#/product/${id ?? ""}`;
  if (v === "article") return `#/article/${art ?? ""}`;
  if (v === "landing") return `/`;
  return `#/${v}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>(() => { const h = window.location.hash; if (!h || h === "#" || h === "#/") return "landing"; const hp = h.replace(/^#/, ""); const [p, q] = hp.split("?"); return parsePath(p, q ? `?${q}` : "").view; });
  const [selectedId, setSelectedId] = useState<string | null>(() => { const h = window.location.hash; if (!h || h === "#/") return null; const hp = h.replace(/^#/, ""); const [p, q] = hp.split("?"); const r = parsePath(p, q ? `?${q}` : ""); return r.view === "detail" ? r.selectedId ?? null : null; });
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(() => { const h = window.location.hash; if (!h || h === "#/") return null; const hp = h.replace(/^#/, ""); const [p, q] = hp.split("?"); const r = parsePath(p, q ? `?${q}` : ""); return r.view === "article" ? r.selectedArticleId ?? null : null; });
  const [cart, setCart] = useState<CartItem[]>(() => { try { return JSON.parse(localStorage.getItem("aroma_cart") || "[]"); } catch { return []; } });
  const [compare, setCompare] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem("aroma_compare") || "[]"); } catch { return []; } });
  const [theme, setThemeState] = useState<Theme>("dark");
  const [font, setFontState] = useState<FontTheme>("vazir");
  const [layouts, setLayouts] = useState<Record<PageKey, LayoutTheme>>({
    home: "l1", catalog: "l1", detail: "l1", auth: "l1",
  });
  const [user, setUser] = useState<AppUser | null>(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [filters, setFiltersState] = useState<CatalogFilters>({
    category: "همه", brand: "همه", gender: "همه", query: "", sort: "محبوب", maxPrice: 32000000,
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);
  useEffect(() => {
    const root = document.documentElement;
    FONT_CLASSES.forEach((f) => root.classList.remove(`font-${f}`));
    root.classList.add(`font-${font}`);
  }, [font]);
  useEffect(() => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }, [user]);
  useEffect(() => { localStorage.setItem("aroma_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("aroma_compare", JSON.stringify(compare)); }, [compare]);
  // auto-login demo user when inside a preview iframe
  useEffect(() => {
    if (!user && window.self !== window.top) {
      login("demo@aroma.ir", "123456");
    }
  }, []);

  // sync browser URL (hash routing) with view
  const applyState = () => {
      const h = window.location.hash;
      if (!h || h === "#" || h === "#/") { setView("landing"); return; }
      const hashPath = h.replace(/^#/, "");
      const [p, q] = hashPath.split("?");
      const r = parsePath(p, q ? `?${q}` : "");
      setView(r.view);
      if (r.view === "detail") setSelectedId(r.selectedId ?? null); else setSelectedId(null);
      if (r.view === "article") setSelectedArticleId(r.selectedArticleId ?? null); else setSelectedArticleId(null);
      if (r.view === "catalog" && r.category) setFiltersState((f) => ({ ...f, category: r.category! }));
      if (r.theme) setThemeState(r.theme === "light" ? "light" : "dark");
      if (r.layout && (r.layout === "l1" || r.layout === "l2" || r.layout === "l3")) {
        let pageKey: "home" | "catalog" | "detail" | "auth" = "home";
        if (r.view === "detail") pageKey = "detail";
        else if (r.view === "catalog") pageKey = "catalog";
        else if (r.view === "home" || r.open === "auth") {
          pageKey = r.open === "auth" ? "auth" : "home";
        }
        setLayouts((prev) => ({ ...prev, [pageKey]: r.layout as LayoutTheme }));
      }
      if (r.open === "cart") setCartOpen(true);
      else if (r.open === "auth") setAuthOpen(true);
      else if (r.open === "compare") setCompareOpen(true);
      else if (r.open === "search") setSearchOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    applyState();
    window.addEventListener("hashchange", applyState);
    return () => window.removeEventListener("hashchange", applyState);
  }, []);

  const go = (v: View) => { window.location.hash = routeToPath(v, null, null); };
  const openProduct = (id: string) => { window.location.hash = `#/product/${id}`; };
  const openArticle = (id: string) => { window.location.hash = `#/article/${id}`; };
  const openCatalog = (category?: string) => {
    if (category) setFiltersState((f) => ({ ...f, category }));
    window.location.hash = category ? `#/catalog?cat=${encodeURIComponent(category)}` : "#/catalog";
  };
  const setFilters = (f: Partial<CatalogFilters>) => setFiltersState((prev) => ({ ...prev, ...f }));
  const setLayout = (page: PageKey, value: LayoutTheme) => setLayouts((prev) => ({ ...prev, [page]: value }));

  const addToCart = (id: string, sizeMl: number, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((c) => c.id === id && c.sizeMl === sizeMl);
      if (found) return prev.map((c) => c.id === id && c.sizeMl === sizeMl ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { id, sizeMl, qty }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id: string, sizeMl: number) =>
    setCart((prev) => prev.filter((c) => !(c.id === id && c.sizeMl === sizeMl)));
  const setQty = (id: string, sizeMl: number, qty: number) =>
    setCart((prev) => prev.map((c) => c.id === id && c.sizeMl === sizeMl ? { ...c, qty: Math.max(1, qty) } : c).filter((c) => c.qty > 0));
  const clearCart = () => setCart([]);

  const toggleCompare = (id: string) =>
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  const clearCompare = () => setCompare([]);

  const login = (email: string, password: string): AuthResult => {
    const users = readUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) return { ok: false, error: "کاربری با این ایمیل یافت نشد. ابتدا ثبت‌نام کنید." };
    if (found.password !== password) return { ok: false, error: "رمز عبور اشتباه است." };
    setUser({ name: found.name, email: found.email, phone: found.phone });
    return { ok: true };
  };
  const register = (data: RegisterData): AuthResult => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.trim().toLowerCase()))
      return { ok: false, error: "این ایمیل قبلاً ثبت شده است." };
    const u: StoredUser = { ...data, email: data.email.trim() };
    users.push(u); writeUsers(users);
    setUser({ name: u.name, email: u.email, phone: u.phone });
    return { ok: true };
  };
  const loginWithPhone = (phone: string) => {
    const users = readUsers();
    let found = users.find((u) => u.phone === phone);
    if (!found) {
      found = { name: "آروما کاربر", email: `${phone}@sms.aroma.ir`, phone, password: "otp" };
      users.push(found);
      writeUsers(users);
    }
    setUser({ name: found.name, email: found.email, phone: found.phone });
  };

  const logout = () => setUser(null);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => s + priceOf(c.id, c.sizeMl) * c.qty, 0);

  const value = useMemo<StoreState>(
    () => ({
      view, selectedId, selectedArticleId, cart, compare, theme, font, layouts, user,
      cartOpen, compareOpen, authOpen, searchOpen, profileOpen, filters,
      go, openProduct, openArticle, openCatalog, setFilters, setLayout,
      addToCart, removeFromCart, setQty, clearCart, cartCount, cartTotal,
      toggleCompare, clearCompare,
      setCartOpen, setCompareOpen, setAuthOpen, setSearchOpen, setProfileOpen,
      setTheme: setThemeState, setFont: setFontState,
      login, register, loginWithPhone, logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      view, selectedId, selectedArticleId, cart, compare, theme, font, layouts, user,
      cartOpen, compareOpen, authOpen, searchOpen, profileOpen, filters, cartCount, cartTotal,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const findProduct = (id: string | null): Product | undefined =>
  id ? products.find((p) => p.id === id) : undefined;
