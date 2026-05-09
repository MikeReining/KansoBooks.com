import type { MetadataRoute } from "next";

import { getPublishedContentItems } from "@/lib/content";

const siteUrl = "https://kansobooks.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/manifesto",
    "/resources",
    "/comparisons",
    "/glossary",
    "/templates",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const contentRoutes = getPublishedContentItems().map((item) => ({
    url: `${siteUrl}${item.metadata.canonicalPath}`,
    lastModified: item.lastModified,
  }));

  return [...staticRoutes, ...contentRoutes];
}
