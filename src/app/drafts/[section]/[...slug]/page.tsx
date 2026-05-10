import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentArticlePage } from "@/lib/content/components";
import { contentSectionToType, getContentBySlugAnyState } from "@/lib/content";

type Params = {
  section: keyof typeof contentSectionToType;
  slug: string[];
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DraftPreviewPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { section, slug } = await params;

  if (!(section in contentSectionToType)) {
    notFound();
  }

  const item = getContentBySlugAnyState(section, slug);
  if (!item) {
    notFound();
  }

  return <ContentArticlePage item={item} draftPreview />;
}
