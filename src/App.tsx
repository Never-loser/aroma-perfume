import { StoreProvider, useStore, findProduct } from "./store/StoreContext";
import { ARTICLES } from "./data/articles";
import { useSEO } from "./hooks/useSEO";
import Header, { SearchOverlay } from "./components/Header";

import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import CatalogView from "./components/CatalogView";
import DetailView from "./components/DetailView";
import { HomeLayoutB, HomeLayoutC } from "./components/HomeVariants";
import { CatalogLayoutB, CatalogLayoutC } from "./components/CatalogVariants";
import { DetailLayoutB, DetailLayoutC } from "./components/DetailVariants";
import CheckoutView from "./components/CheckoutView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import FaqView from "./components/FaqView";
import BlogView from "./components/BlogView";
import ArticleView from "./components/ArticleView";
import LegalView from "./components/LegalView";
import LandingView from "./components/LandingView";
import AccountView from "./components/AccountView";
import CookieBanner from "./components/CookieBanner";
import { NotFound, ServerError } from "./components/ErrorPages";
import CartDrawer from "./components/CartDrawer";
import CompareModal from "./components/CompareModal";
import AuthModal from "./components/AuthModal";
import AIChatBot from "./components/AIChatBot";
import DesignSwitcher from "./components/DesignSwitcher";
import type { LayoutTheme } from "./store/StoreContext";

function pick<T>(l: LayoutTheme, a: T, b: T, c: T): T {
  return l === "l1" ? a : l === "l2" ? b : c;
}

function Shell() {
  const { view, layouts, selectedId, selectedArticleId } = useStore();

  const Home = pick(layouts.home, HomeView, HomeLayoutB, HomeLayoutC);
  const Catalog = pick(layouts.catalog, CatalogView, CatalogLayoutB, CatalogLayoutC);
  const Detail = pick(layouts.detail, DetailView, DetailLayoutB, DetailLayoutC);

  const seo: { title: string; desc?: string; jsonLd?: object } = (() => {
    switch (view) {
      case "catalog": return { title: "گالری عطرها | آروما", desc: "خرید آنلاین عطر و ادکلن‌های اورجینال با فیلتر و مرتب‌سازی." };
      case "detail": {
        const p = findProduct(selectedId);
        return {
          title: `${p?.name ?? "عطر"} ${p?.brand ?? ""} | آروما`,
          desc: p?.description,
          jsonLd: p ? { "@context": "https://schema.org", "@type": "Product", name: `${p.brand} ${p.name}`, brand: { "@type": "Brand", name: p.brand }, aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews } } : undefined,
        };
      }
      case "article": { const a = ARTICLES.find((x) => x.id === selectedArticleId); return { title: `${a?.title ?? "مقاله"} | آروما`, desc: a?.excerpt }; }
      case "about": return { title: "درباره ما | آروما" };
      case "contact": return { title: "تماس با ما | آروما" };
      case "faq": return { title: "سوالات متداول | آروما" };
      case "blog": return { title: "مجله آروما | مقالات عطر" };
      case "terms": return { title: "قوانین و شرایط استفاده | آروما" };
      case "privacy": return { title: "حریم خصوصی | آروما" };
      case "returns": return { title: "شرایط بازگشت کالا | آروما" };
      case "checkout": return { title: "تسویه حساب | آروما" };
      case "notfound": return { title: "صفحه پیدا نشد | آروما" };
      case "servererror": return { title: "خطای سرور | آروما" };
      default: return { title: "آروما | فروشگاه عطر و ادکلن", desc: "خرید آنلاین عطر و ادکلن‌های اورجینال با ضمانت اصالت کالا." };
    }
  })();
  useSEO(seo.title, seo.desc, seo.jsonLd);

  if (view === "landing") {
    return (
      <LandingView />
    );
  }

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="relative">
        {view === "home" && <Home />}
        {view === "catalog" && <Catalog />}
        {view === "detail" && <Detail />}
        {view === "checkout" && <CheckoutView />}
        {view === "account" && <AccountView />}
        {view === "about" && <AboutView />}
        {view === "contact" && <ContactView />}
        {view === "faq" && <FaqView />}
        {view === "blog" && <BlogView />}
        {view === "article" && <ArticleView />}
        {view === "terms" && <LegalView type="terms" />}
        {view === "privacy" && <LegalView type="privacy" />}
        {view === "returns" && <LegalView type="returns" />}
        {view === "notfound" && <NotFound />}
        {view === "servererror" && <ServerError />}
      </main>
      <Footer />

      <CartDrawer />
      <CompareModal />
      <AuthModal />
      <SearchOverlay />
      <AIChatBot />
      <DesignSwitcher />
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
