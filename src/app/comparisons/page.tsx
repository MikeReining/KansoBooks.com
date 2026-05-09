import type { Metadata } from "next";

import { ContentIndexPage } from "@/lib/content/components";

export const metadata: Metadata = {
  title: "Comparisons | KansoBooks",
  description:
    "Buying-decision pages for owners comparing bookkeeping systems, services, and local-first alternatives.",
  alternates: { canonical: "/comparisons" },
};

export default function ComparisonsPage() {
  return <ContentIndexPage section="comparisons" />;
}
