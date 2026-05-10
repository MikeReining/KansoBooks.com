import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentArticlePage } from "@/lib/content/components";
import {
  contentPageMetadata,
  getContentBySlug,
  getContentForSection,
} from "@/lib/content";

type Params = {
  slug: string[];
};

export function generateStaticParams(): Params[] {
  return getContentForSection("comparisons").map((item) => ({
    slug: item.metadata.canonicalPath
      .replace(/^\/comparisons\/?/, "")
      .split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const item = getContentBySlug("comparisons", (await params).slug);
  return item ? contentPageMetadata(item) : {};
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const item = getContentBySlug("comparisons", (await params).slug);
  if (!item) {
    notFound();
  }
  return <ContentArticlePage item={item} />;
}
