import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ContentArticlePage,
} from "@/lib/content/components";
import { getContentBySlug, getContentForSection } from "@/lib/content";

type Params = {
  slug: string[];
};

export function generateStaticParams(): Params[] {
  return getContentForSection("resources").map((item) => ({
    slug: item.metadata.canonicalPath.replace(/^\/resources\/?/, "").split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const item = getContentBySlug("resources", (await params).slug);
  return item
    ? {
        title: item.metadata.seoTitle,
        description: item.metadata.description,
        alternates: { canonical: item.metadata.canonicalPath },
      }
    : {};
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const item = getContentBySlug("resources", (await params).slug);
  if (!item) {
    notFound();
  }
  return <ContentArticlePage item={item} />;
}
