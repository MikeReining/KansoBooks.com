import type { ContentItem } from "./types";

export function articleJsonLd(item: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.metadata.title,
    description: item.metadata.description,
    author: {
      "@type": "Organization",
      name: item.metadata.author,
    },
    publisher: {
      "@type": "Organization",
      name: "KansoBooks",
    },
    datePublished: item.metadata.publishedAt,
    dateModified: item.metadata.lastReviewed,
    mainEntityOfPage: item.metadata.canonicalPath,
  };
}

export function breadcrumbJsonLd(item: ContentItem) {
  const parts = item.metadata.canonicalPath.split("/").filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "KansoBooks",
        item: "/",
      },
      ...parts.map((part, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: part.replaceAll("-", " "),
        item: `/${parts.slice(0, index + 1).join("/")}`,
      })),
    ],
  };
}
