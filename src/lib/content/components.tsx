import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  FileCheck2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  getContentForSection,
  getKnownInternalPaths,
  getPublishedContentItems,
} from "./loader";
import { getArticleSections, renderMarkdown } from "./render";
import { articleJsonLd, breadcrumbJsonLd } from "./schema";
import type { ContentItem, ContentType } from "./types";

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

const WAITLIST_URL = "https://tally.so/r/pb4O9P";

type NavLink = {
  label: string;
  href: string;
};

type CtaLink = NavLink & {
  external?: boolean;
};

const contentTypeLabels: Record<ContentType, string> = {
  resource: "Resource",
  comparison: "Comparison",
  glossary: "Glossary",
  template: "Template",
  artifact: "Artifact",
  hub: "Guide",
};

function formatJob(job: string): string {
  return job
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function liveInternalPathExists(href: string): boolean {
  return getKnownInternalPaths().has(href);
}

function publishedPathExists(href: string): boolean {
  return getPublishedContentItems().some(
    (item) => item.metadata.canonicalPath === href,
  );
}

function liveSectionLinks(): NavLink[] {
  return (Object.keys(sectionCopy) as Section[])
    .filter((section) => getContentForSection(section).length > 0)
    .map((section) => ({
      label: sectionCopy[section].title,
      href: `/${section}`,
    }));
}

function waitlistCta(): CtaLink {
  return {
    label: "Join waitlist",
    href: WAITLIST_URL,
    external: true,
  };
}

function internalCta(label: string, href: string): CtaLink {
  return liveInternalPathExists(href) ? { label, href } : waitlistCta();
}

function ctaForItem(item: ContentItem): CtaLink {
  if (item.metadata.type === "template" || item.metadata.type === "artifact") {
    return internalCta("Use the template", item.metadata.canonicalPath);
  }

  if (
    item.metadata.answerUnits.includes("ProofBoundary") &&
    liveInternalPathExists("/resources/how-to-know-books-are-done")
  ) {
    return internalCta(
      "Run the proof check",
      "/resources/how-to-know-books-are-done",
    );
  }

  if (liveInternalPathExists("/resources/accountant-ready-books")) {
    return internalCta(
      "Build the accountant packet",
      "/resources/accountant-ready-books",
    );
  }

  return waitlistCta();
}

function relatedItemsFor(item: ContentItem): ContentItem[] {
  const publishedItems = getPublishedContentItems();

  return (item.metadata.internalLinks ?? [])
    .map((href) =>
      publishedItems.find(
        (candidate) => candidate.metadata.canonicalPath === href,
      ),
    )
    .filter((candidate): candidate is ContentItem => Boolean(candidate))
    .slice(0, 3);
}

function sectionForType(type: ContentType): Section {
  if (type === "comparison") {
    return "comparisons";
  }

  if (type === "template" || type === "artifact") {
    return "templates";
  }

  if (type === "glossary") {
    return "glossary";
  }

  return "resources";
}

function sectionHrefForItem(item: ContentItem): string | null {
  const section = sectionForType(item.metadata.type);
  return getContentForSection(section).length > 0 ? `/${section}` : null;
}

function ContentSiteHeader() {
  const sectionLinks = liveSectionLinks();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-5 px-6 sm:px-8">
        <Link href="/" className="text-sm font-semibold text-foreground">
          KansoBooks
        </Link>
        <nav
          aria-label="Content sections"
          className="hidden items-center gap-5 text-xs text-muted-foreground md:flex"
        >
          {sectionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/manifesto"
          className="inline-flex min-h-9 items-center gap-2 border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          Proof model
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </header>
  );
}

function DraftPreviewBanner() {
  return (
    <div className="border-b border-border bg-warning-soft">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-6 py-3 text-xs text-foreground sm:px-8">
        <FileCheck2 aria-hidden="true" className="size-4 text-warning" />
        <span className="font-medium">Draft preview</span>
        <span className="text-muted-foreground">
          This page is noindex and is not published.
        </span>
      </div>
    </div>
  );
}

function ContentArticleHero({
  item,
  draftPreview,
}: {
  item: ContentItem;
  draftPreview: boolean;
}) {
  const sectionHref = sectionHrefForItem(item);
  const imagePresentation = item.metadata.heroImage?.presentation ?? "standard";
  const imageClassName =
    imagePresentation === "banner"
      ? "aspect-[3/1] max-h-72 w-full object-cover"
      : "aspect-[16/9] w-full object-cover";

  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:py-14">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {sectionHref ? (
              <Link href={sectionHref} className="font-medium text-primary">
                {contentTypeLabels[item.metadata.type]}
              </Link>
            ) : (
              <span className="font-medium text-primary">
                {contentTypeLabels[item.metadata.type]}
              </span>
            )}
            <span aria-hidden="true">/</span>
            <span>{formatJob(item.metadata.canonicalJob)}</span>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
            {item.metadata.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
            {item.metadata.description}
          </p>
          {item.metadata.heroImage ? (
            <figure className="mt-8 overflow-hidden border border-border bg-background lg:max-w-5xl">
              <Image
                src={item.metadata.heroImage.src}
                alt={item.metadata.heroImage.alt}
                width={item.metadata.heroImage.width ?? 1600}
                height={item.metadata.heroImage.height ?? 900}
                className={imageClassName}
                priority
              />
            </figure>
          ) : null}
          {draftPreview ? (
            <section className="mt-8 border border-border bg-muted p-4 lg:max-w-3xl">
              <h2 className="text-xs font-semibold uppercase tracking-normal text-foreground">
                Internal review
              </h2>
              <dl className="mt-4 grid gap-4 text-xs text-muted-foreground sm:grid-cols-3">
                <div>
                  <dt className="font-medium text-foreground">Reviewed</dt>
                  <dd className="mt-1">{item.metadata.lastReviewed}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Risk</dt>
                  <dd className="mt-1 capitalize">{item.metadata.risk}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Boundary</dt>
                  <dd className="mt-1">{item.metadata.jurisdiction}</dd>
                </div>
              </dl>
            </section>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ContentArticleSidebar({
  item,
  sections,
}: {
  item: ContentItem;
  sections: ReturnType<typeof getArticleSections>;
}) {
  const relatedItems = relatedItemsFor(item);

  return (
    <aside className="border-y border-border py-6 text-sm lg:sticky lg:top-6 lg:border-l lg:border-y-0 lg:py-0 lg:pl-8">
      <div className="space-y-7">
        <SidebarContents sections={sections} />
        <SidebarProofSummary item={item} />
        <SidebarWaitlistCard />
        <SidebarRelatedLinks relatedItems={relatedItems} />
      </div>
    </aside>
  );
}

function SidebarContents({
  sections,
}: {
  sections: ReturnType<typeof getArticleSections>;
}) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-foreground">
        <BookOpenText aria-hidden="true" className="size-4 text-primary" />
        Contents
      </h2>
      <nav aria-label="Article table of contents" className="mt-4 space-y-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block border-l border-border pl-3 text-xs leading-5 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {section.title}
          </a>
        ))}
      </nav>
    </section>
  );
}

function SidebarProofSummary({ item }: { item: ContentItem }) {
  return (
    <section className="border-t border-border pt-6">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-foreground">
        <ShieldCheck aria-hidden="true" className="size-4 text-success" />
        Proof summary
      </h2>
      <dl className="mt-4 space-y-3 text-xs leading-5">
        <div>
          <dt className="font-medium text-foreground">Useful when</dt>
          <dd className="mt-1 text-muted-foreground">
            {formatJob(item.metadata.canonicalJob)}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Proof posture</dt>
          <dd className="mt-1 text-muted-foreground">
            AI drafts. Kanso proves. You approve.
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Professional note</dt>
          <dd className="mt-1 text-muted-foreground">
            Not tax, legal, audit, payroll, sales tax, filing, or entity-specific
            advice.
          </dd>
        </div>
      </dl>
    </section>
  );
}

function SidebarWaitlistCard() {
  return (
    <section className="border border-border bg-primary-soft p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-foreground">
        <Mail aria-hidden="true" className="size-4 text-primary" />
        KansoBooks
      </div>
      <p className="mt-3 text-sm font-medium leading-6 text-foreground">
        Get books-ready workflows as they ship.
      </p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        Join the waitlist for local-first bookkeeping with proof-grade handoff.
      </p>
      <a
        href={WAITLIST_URL}
        className="mt-4 flex min-h-10 items-center justify-between gap-3 bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        Join waitlist
        <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
      </a>
    </section>
  );
}

function SidebarRelatedLinks({
  relatedItems,
}: {
  relatedItems: ContentItem[];
}) {
  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border pt-6">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-foreground">
        <CheckCircle2 aria-hidden="true" className="size-4 text-success" />
        Keep reading
      </h2>
      <div className="mt-4 space-y-3">
        {relatedItems.map((related) => (
          <Link
            key={related.metadata.id}
            href={related.metadata.canonicalPath}
            className="block text-xs leading-5 text-muted-foreground transition-colors hover:text-foreground"
          >
            {related.metadata.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

function ContentArticleFooter({ item }: { item: ContentItem }) {
  const cta = ctaForItem(item);
  const relatedItems = relatedItemsFor(item);

  return (
    <footer className="mt-14 border-t border-border pt-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Next step</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Use this page as a working standard, then keep the proof trail visible before anything becomes financial truth.
          </p>
          <CtaAnchor cta={cta} className="mt-5" />
        </section>
        <section className="border-y border-border py-5">
          <h2 className="text-xs font-semibold uppercase tracking-normal text-foreground">
            Related reading
          </h2>
          {relatedItems.length > 0 ? (
            <div className="mt-4 space-y-3">
              {relatedItems.map((related) => (
                <Link
                  key={related.metadata.id}
                  href={related.metadata.canonicalPath}
                  className="block text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {related.metadata.title}
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              More linked standards will appear as the content library grows.
            </p>
          )}
        </section>
      </div>
      <p className="mt-8 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
        {item.metadata.professionalBoundary}
      </p>
    </footer>
  );
}

function CtaAnchor({
  cta,
  className = "",
}: {
  cta: CtaLink;
  className?: string;
}) {
  const classes = `${className} inline-flex min-h-10 items-center gap-2 bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover`;

  if (cta.external) {
    return (
      <a href={cta.href} className={classes}>
        {cta.label}
        <ArrowRight aria-hidden="true" className="size-4" />
      </a>
    );
  }

  return (
    <Link href={cta.href} className={classes}>
      {cta.label}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Link>
  );
}

function ContentSiteFooter() {
  const contentLinks = liveSectionLinks();

  return (
    <footer className="border-t border-border bg-card px-6 py-12 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Link
            href="/"
            className="text-2xl font-semibold text-foreground"
            aria-label="KansoBooks"
          >
            Kanso<span className="font-normal">Books</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            Eve drafts. Kanso proves. You stay in control of the books.
          </p>
          <p className="mt-8 text-xs text-muted-foreground">
            © 2026 KansoBooks.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <FooterColumn title="Content" links={contentLinks} />
          <FooterColumn
            title="Product"
            links={[
              { label: "Manifesto", href: "/manifesto" },
              { label: "Proof model", href: "/manifesto" },
              { label: "Join waitlist", href: WAITLIST_URL },
            ]}
          />
          <FooterColumn
            title="Trust model"
            links={[
              { label: "AI drafts", href: "/resources/ai-bookkeeping-with-proof" },
              { label: "Kanso proves", href: "/resources/how-to-know-books-are-done" },
              { label: "You approve", href: "/resources/accountant-ready-books" },
            ].filter((link) => publishedPathExists(link.href))}
          />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-normal text-foreground">
        {title}
      </h2>
      <div className="mt-5 grid gap-3">
        {links.map(({ label, href }) => (
          <a
            className="text-sm leading-6 text-muted-foreground transition-colors hover:text-primary"
            href={href}
            key={`${title}-${label}`}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

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

export function ContentArticlePage({
  item,
  draftPreview = false,
}: {
  item: ContentItem;
  draftPreview?: boolean;
}) {
  const sections = getArticleSections(item.body);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd(item), breadcrumbJsonLd(item)]),
        }}
      />
      <ContentSiteHeader />
      {draftPreview ? <DraftPreviewBanner /> : null}
      <article>
        <ContentArticleHero item={item} draftPreview={draftPreview} />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,42rem)_20rem] lg:gap-12 lg:py-14 xl:grid-cols-[minmax(0,46rem)_21rem] xl:gap-16">
          <div>
            <div className="border-l-2 border-primary pl-5 text-sm leading-7 text-foreground">
              {renderMarkdown(item.body)}
            </div>
            <ContentArticleFooter item={item} />
          </div>
          <ContentArticleSidebar item={item} sections={sections} />
        </div>
      </article>
      <ContentSiteFooter />
    </main>
  );
}
