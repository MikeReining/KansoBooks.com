import type { Metadata } from "next";

import { ContentIndexPage } from "@/lib/content/components";

export const metadata: Metadata = {
  title: "Resources | KansoBooks",
  description:
    "Books-readiness guidance, accountant handoff workflows, and AI bookkeeping proof boundaries.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return <ContentIndexPage section="resources" />;
}
