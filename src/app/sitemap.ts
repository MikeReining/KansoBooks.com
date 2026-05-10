import type { MetadataRoute } from "next";

import { getContentForSection, getPublishedContentItems } from "@/lib/content";

const siteUrl = "https://kansobooks.com";
const liveSections = ["resources", "comparisons", "glossary", "templates"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/manifesto"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    }),
  );

  const sectionRoutes = liveSections
    .filter((section) => getContentForSection(section).length > 0)
    .map((section) => ({
      url: `${siteUrl}/${section}`,
      lastModified: new Date(),
    }));

  const contentRoutes = getPublishedContentItems().map((item) => ({
    url: `${siteUrl}${item.metadata.canonicalPath}`,
    lastModified: item.lastModified,
  }));

  return [...staticRoutes, ...sectionRoutes, ...contentRoutes];
}
