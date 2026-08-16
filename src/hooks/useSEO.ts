import { useEffect } from "react";

function setMeta(key: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets the document title, meta description, OG/Twitter tags and optional JSON-LD
 * structured data — call once per "page".
 */
export function useSEO(title: string, description?: string, jsonLd?: object) {
  const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    document.title = title;
    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    }
    setMeta("og:title", title, "property");
    setMeta("twitter:title", title);

    let script = document.getElementById("page-jsonld") as HTMLScriptElement | null;
    if (jsonLdStr) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "page-jsonld";
        document.head.appendChild(script);
      }
      script.textContent = jsonLdStr;
    } else if (script) {
      script.textContent = "";
    }
  }, [title, description, jsonLdStr]);
}
