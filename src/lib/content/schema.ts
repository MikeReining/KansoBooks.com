import type { Metadata } from "next";

import type { ContentItem } from "./types";

export function contentPageMetadata(item: ContentItem): Metadata {
  const image = item.metadata.heroImage;

  return {
    title: item.metadata.seoTitle,
    description: item.metadata.description,
    alternates: { canonical: item.metadata.canonicalPath },
    openGraph: {
      title: item.metadata.seoTitle,
      description: item.metadata.description,
      type: "article",
      url: item.metadata.canonicalPath,
      images: image
        ? [
            {
              url: image.src,
              width: image.width ?? 1600,
              height: image.height ?? 900,
              alt: image.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: item.metadata.seoTitle,
      description: item.metadata.description,
      images: image ? [image.src] : undefined,
    },
  };
}

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
    image: item.metadata.heroImage?.src,
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
