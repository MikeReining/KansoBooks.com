import Link from "next/link";

import { getContentForSection } from "./loader";
import { renderMarkdown } from "./render";
import { articleJsonLd, breadcrumbJsonLd } from "./schema";
import type { ContentItem } from "./types";

const sectionCopy = {
  resources: {
    title: "Resources",
    description:
      "Books-readiness guidance, accountant handoff workflows, and AI bookkeeping proof boundaries.",
  },
  comparisons: {
    title: "Comparisons",
    description:
      "Buying-decision pages for owners comparing bookkeeping systems, services, and local-first alternatives.",
  },
  glossary: {
    title: "Glossary",
    description:
      "Plain definitions tied back to books-readiness, proof, and accountant handoff.",
  },
  templates: {
    title: "Templates",
    description:
      "Checklists, handoff templates, and artifacts that make the next bookkeeping step concrete.",
  },
} as const;

type Section = keyof typeof sectionCopy;

export function ContentIndexPage({ section }: { section: Section }) {
  const items = getContentForSection(section);
  const copy = sectionCopy[section];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 sm:px-8">
        <div className="max-w-3xl">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-normal text-muted-foreground"
          >
            KansoBooks
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-normal text-foreground">
            {copy.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            {copy.description}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="border-y border-border py-8">
            <p className="text-sm leading-7 text-muted-foreground">
              No published pages are live in this section yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <Link
                key={item.metadata.id}
                href={item.metadata.canonicalPath}
                className="block py-6 transition-colors hover:bg-muted"
              >
                <h2 className="text-lg font-medium text-foreground">
                  {item.metadata.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.metadata.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export function ContentArticlePage({ item }: { item: ContentItem }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd(item), breadcrumbJsonLd(item)]),
        }}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8">
        <Link
          href="/"
          className="text-xs font-medium uppercase tracking-normal text-muted-foreground"
        >
          KansoBooks
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-normal text-foreground">
          {item.metadata.title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {item.metadata.description}
        </p>
        <dl className="mt-8 grid gap-3 border-y border-border py-5 text-xs text-muted-foreground sm:grid-cols-3">
          <div>
            <dt className="font-medium text-foreground">Reviewed</dt>
            <dd className="mt-1">{item.metadata.lastReviewed}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Risk</dt>
            <dd className="mt-1">{item.metadata.risk}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Boundary</dt>
            <dd className="mt-1">{item.metadata.jurisdiction}</dd>
          </div>
        </dl>
        <div className="mt-8">{renderMarkdown(item.body)}</div>
      </article>
    </main>
  );
}
