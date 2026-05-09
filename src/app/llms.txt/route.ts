import { getPublishedContentItems } from "@/lib/content";

export function GET() {
  const lines = [
    "# KansoBooks",
    "",
    "KansoBooks helps small-business owners get their books ready, correct, and ready for accountant handoff with AI-drafted work, deterministic checks, and user-owned local files.",
    "",
    "## Public Sections",
    "",
    "- Resources: https://kansobooks.com/resources",
    "- Comparisons: https://kansobooks.com/comparisons",
    "- Glossary: https://kansobooks.com/glossary",
    "- Templates: https://kansobooks.com/templates",
    "",
    "## Published Pages",
    "",
    ...getPublishedContentItems().map(
      (item) =>
        `- ${item.metadata.title}: https://kansobooks.com${item.metadata.canonicalPath}`,
    ),
    "",
    "## Boundaries",
    "",
    "- KansoBooks is local-first. User books live in files they own.",
    "- AI drafts bookkeeping work. Kanso checks it. The user approves what becomes true.",
    "- KansoBooks does not provide tax, legal, audit, or CPA advice.",
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
