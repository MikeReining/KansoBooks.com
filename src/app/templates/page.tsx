import type { Metadata } from "next";

import { ContentIndexPage } from "@/lib/content/components";

export const metadata: Metadata = {
  title: "Templates | KansoBooks",
  description:
    "Checklists, handoff templates, and artifacts that make the next bookkeeping step concrete.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return <ContentIndexPage section="templates" />;
}
