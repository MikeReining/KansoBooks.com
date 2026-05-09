import type { Metadata } from "next";

import { ContentIndexPage } from "@/lib/content/components";

export const metadata: Metadata = {
  title: "Glossary | KansoBooks",
  description:
    "Plain definitions tied back to books-readiness, proof, and accountant handoff.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  return <ContentIndexPage section="glossary" />;
}
