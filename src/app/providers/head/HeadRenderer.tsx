import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHead } from "./HeadManager";
import { getPageUrl } from "../../../shared/lib/constants";

const HeadRenderer = () => {
  const { headData } = useHead();
  const location = useLocation();

  useEffect(() => {
    document.title = headData.title;

    const escapeHtml = (text: string): string => {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    };

    const updateMetaTag = (
      name: string,
      content: string,
      property?: string
    ) => {
      const selector = property
        ? `meta[property="${property}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", property);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", escapeHtml(content));
    };

    updateMetaTag("description", headData.description);

    if (headData.openGraph) {
      const og = headData.openGraph;
      if (og.title) {
        updateMetaTag("og:title", og.title, "og:title");
      }
      if (og.description) {
        updateMetaTag("og:description", og.description, "og:description");
      }
      if (og.image) {
        updateMetaTag("og:image", og.image, "og:image");
      }
      if (og.url) {
        const fullUrl = getPageUrl(location.pathname + location.search);
        updateMetaTag("og:url", fullUrl, "og:url");
      }
    }
  }, [headData, location]);

  return null;
};

export default HeadRenderer;
