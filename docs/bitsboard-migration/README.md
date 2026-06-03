# Bitsboard.com Migration Handoff

Created: 2026-06-03

Owner context: Bitsboard.com is currently hosted on Squarespace. The goal is to
move it into a custom static/content-factory setup modeled on KansoBooks.com, so
new pages can be created, reviewed, validated, and published with much less
manual website-builder work.

## Executive Recommendation

Migrate Bitsboard.com if the goal is content growth.

Keeping Squarespace is reasonable only if the site remains mostly frozen and
receives two small edits per year. If Bitsboard needs a content factory for game
pages, use-case pages, help docs, SLP/special education pages, app feature
pages, and SEO experiments, Squarespace is the bottleneck.

Do not build a pixel clone of the Squarespace site. Build a durable content
system that preserves current URLs and assets, then improve the presentation
layer after parity is safe.

Recommended target:

- Separate `Bitsboard.com` repository.
- Next.js App Router.
- Static-first rendering.
- Markdown/MDX content with typed frontmatter.
- Local image assets under `public/content/images`.
- Validation scripts for metadata, links, images, redirects, and sitemap parity.
- One-time migration importer from the live Squarespace site.
- Content factory scripts for new pages after launch.

## Current Bitsboard.com Snapshot

Snapshot source:

- `https://bitsboard.com/sitemap.xml`
- `https://bitsboard.com/robots.txt`
- Live page inspection on 2026-06-03.

Current sitemap inventory:

| Group | Count | Notes |
|---|---:|---|
| Total sitemap URLs | 150 | Manageable for scripted migration. |
| Blog URLs | 46 | Date-based Squarespace paths such as `/blog/2024/1/10/...`. |
| Game URLs | 38 | Includes `/games/list` and individual game pages. |
| FAQ URLs | 5 | Mix of `/faq` index and detail pages. |
| Guide URLs | 3 | Plus related root-level help pages. |
| Getting-started URLs | 3 | Introductory app docs. |
| Unique image URLs in sitemap | 515 | Must be downloaded or intentionally remapped before canceling Squarespace. |

The site is primarily static:

- marketing/product pages
- game pages
- catalog/classes/accessibility pages
- help and how-to pages
- FAQ pages
- blog/SEO pages
- privacy/subscription/support pages

The migration is therefore a content, asset, URL, and SEO problem. It is not a
backend application migration.

## Squarespace Export Reality

Squarespace's official export is useful but incomplete. Treat it as supporting
input, not the source of truth.

Official export docs:

- https://support.squarespace.com/hc/en-us/articles/206566687-Exporting-your-site

According to the Squarespace docs, export can include layout pages, one blog
page, text blocks, image blocks, and some minimally structured block text. It
does not export many page types, page-specific headers/footers/sidebars, more
than one blog page, dropdowns, video blocks, drafts, style settings, or custom
CSS.

Recommendation:

1. Export the WordPress XML from Squarespace if admin access is available.
2. Crawl the live public site from the sitemap.
3. Use the live crawl as the canonical migration input.
4. Use the Squarespace export only to fill gaps or recover hidden metadata.

## What KansoBooks.com Already Proved

KansoBooks.com is a good reference implementation because it already has the
parts Bitsboard needs:

- file-based content
- typed metadata
- static routes from content files
- reusable editorial rendering
- content validation
- sitemap/RSS/llms outputs
- image and source discipline
- dry-run build verification
- Codex-oriented content drafting flow

Important KansoBooks files:

| Area | KansoBooks path | What to reuse for Bitsboard |
|---|---|---|
| Stack and commands | `README.md` | Next.js, TypeScript, Tailwind, Vercel, Cloudflare, verification commands. |
| Content sections | `src/lib/content/paths.ts` | The section registry pattern. |
| Content loading | `src/lib/content/loader.ts` | Filesystem walk, frontmatter parse, published filtering, lookup by path. |
| Content types | `src/lib/content/types.ts` | Typed frontmatter contract. Simplify for Bitsboard. |
| Content validation | `src/lib/content/validation.ts` | Link, metadata, image, duplicate, and path validation patterns. |
| Rendering | `src/lib/content/render.tsx` | Constrained Markdown rendering with designed tables/modules. |
| Article shell | `src/lib/content/components.tsx` | Reusable page chrome, hero, sidebar, footer, related links. |
| Dynamic routes | `src/app/resources/[...slug]/page.tsx` and sibling routes | Static params from content files. |
| Sitemap | `src/app/sitemap.ts` | Generate sitemap from published content. |
| RSS | `src/app/rss.xml/route.ts` | Generate feed from published items. |
| LLM index | `src/app/llms.txt/route.ts` | Publish a machine-readable site map. |
| Verification | `scripts/codex/dry-run.sh` | Single command that validates content, typechecks, lints, and builds. |
| Autonomous draft flow | `scripts/codex/content-draft-run.sh` | Useful pattern for later, after migration parity is done. |

What not to copy directly:

- KansoBooks' Supabase/Lemon Squeezy control plane, unless Bitsboard.com needs
  account, entitlement, or purchase flows on the website.
- KansoBooks' bookkeeping-specific legal boundaries.
- KansoBooks' full claim-manifest strictness for every page.

Bitsboard does need claim discipline on sensitive pages, especially pages that
mention autism, special education, speech therapy, accessibility, or learning
outcomes. But the validation model should be lighter and domain-specific.

## Recommended Bitsboard Repository Shape

Use a separate repo, not a subfolder of KansoBooks.com.

Suggested structure:

```text
Bitsboard.com/
  content/
    pages/
    games/
    help/
    faq/
    guides/
    blog/
    legal/
    _data/
      source-url-inventory.yml
      redirects.yml
      navigation.yml
      game-index.yml
      topic-inventory.yml
    _truth/
      product.yml
      app-store.yml
      accessibility.yml
      subscription.yml
      legal-boundaries.yml
      claims.yml
    _claims/
  public/
    content/
      images/
    og/
  scripts/
    content/
      inventory.ts
      migrate-squarespace.ts
      validate.ts
      check-redirects.ts
  src/
    app/
      page.tsx
      games/
        page.tsx
        [...slug]/page.tsx
      help/
        page.tsx
        [...slug]/page.tsx
      faq/
        page.tsx
        [...slug]/page.tsx
      guides/
        page.tsx
        [...slug]/page.tsx
      blog/
        [...slug]/page.tsx
      sitemap.ts
      robots.ts
      rss.xml/route.ts
      llms.txt/route.ts
    lib/
      content/
        paths.ts
        types.ts
        loader.ts
        validation.ts
        render.tsx
        components.tsx
```

Recommended local dev port:

```bash
npm run dev -- --port 48624
```

Keep this different from KansoBooks.com, which uses `48623`. Do not use `3000`
or `3001` if those are already reserved locally.

## Recommended Content Model

Bitsboard should have a simpler content contract than KansoBooks.

Suggested content types:

```ts
type ContentType =
  | "landing"
  | "page"
  | "game"
  | "help"
  | "faq"
  | "guide"
  | "blog"
  | "legal";
```

Suggested frontmatter:

```yaml
id: flashcards
title: Flashcards
seoTitle: "Flashcards Game for Personalized Learning | Bitsboard"
description: "Create and play customizable flashcards for early learning, speech practice, and classroom review."
slug: flashcards
canonicalPath: /games/flashcards
sourceUrl: https://bitsboard.com/games/flashcards
type: game
state: published
audience:
  - parents
  - teachers
  - speech-language-pathologists
intent: product-feature
primaryQuery: flashcards game for kids
secondaryQueries:
  - customizable flashcards
  - flashcards app for kids
appStoreUrl: https://apps.apple.com/...
lastReviewed: 2026-06-03
heroImage:
  src: /content/images/games/flashcards/hero.png
  alt: "Bitsboard flashcards game screen showing a child-friendly card-based learning activity."
screenshots:
  - src: /content/images/games/flashcards/screen-1.png
    alt: "..."
relatedLinks:
  - /games/photo-touch
  - /games/match-up
claimManifest: content/_claims/flashcards.yml
```

Use `claimManifest` only where claims need review, such as:

- subscription/pricing
- privacy
- accessibility
- autism/special education
- speech therapy
- learning outcomes
- App Store availability
- awards and user counts

## URL Strategy

Preserve existing URLs wherever possible.

Current examples:

```text
/
/games
/games/list
/games/flashcards
/catalog
/bitsboard-classes
/accessibility
/help
/faq
/faq/add-users
/getting-started/1-introduction
/blog/2024/1/10/interactive-speech-therapy-activities-the-fun-way-to-learn-with-bitsboard
/privacy-policy
/subscription-terms
```

Recommended rule:

- If the current URL is reasonable, keep it.
- If a URL is ugly but indexed, keep it at launch and optionally improve later.
- If a URL must change, create a 301 redirect and test it.

Do not collapse the date-based blog URLs during the first launch. They are ugly,
but preserving them reduces SEO risk. A later cleanup can redirect old blog URLs
to shorter canonical URLs after traffic is measured.

Redirect data should live in:

```text
content/_data/redirects.yml
```

Example:

```yaml
redirects:
  - source: /home
    destination: /
    permanent: true
  - source: /bitsboard-games
    destination: /games
    permanent: true
```

## Migration Pipeline

Build a repeatable importer. Do not manually copy 150 pages.

Required importer steps:

1. Fetch `https://bitsboard.com/sitemap.xml`.
2. Extract all `<loc>` page URLs and sitemap image URLs.
3. Fetch each public page.
4. Parse title, meta description, canonical URL, headings, main content, links,
   images, Open Graph fields, and JSON-LD if present.
5. Convert main content HTML to Markdown/MDX.
6. Download and dedupe images into `public/content/images/<section>/<slug>/`.
7. Rewrite image URLs to local paths.
8. Rewrite internal links to local canonical paths.
9. Emit content files with frontmatter.
10. Emit `source-url-inventory.yml`.
11. Emit `redirects.yml` for aliases or changed URLs.
12. Run validation.
13. Produce a migration report.

Suggested dependencies:

```bash
npm install cheerio turndown yaml
npm install -D tsx
```

Use `cheerio` for HTML parsing, `turndown` for HTML-to-Markdown conversion, and
`yaml` to write structured inventory files. Keep the importer deterministic so
it can be rerun during development.

Respect public crawl boundaries. The current `robots.txt` disallows paths such
as `/config`, `/search`, `/account`, `/api`, `/static`, and query-string
variants. The sitemap pages are public and are enough for the migration.

## Presentation Layer

Bitsboard needs different presentation than KansoBooks.

KansoBooks feels like a financial review packet. Bitsboard should feel like:

- bright but not childish
- app/product-forward
- trustworthy for parents, teachers, and therapists
- easy to scan
- screenshot-rich
- direct about customization and learning modes

Required page templates:

| Template | Purpose |
|---|---|
| Home | Product overview, app screenshots, trust proof, App Store CTA. |
| Game detail | One page per Bitsboard game, with screenshots, what it teaches, settings, related games. |
| Games index | Dense index of all games with filters/categories. |
| Help article | Step-by-step support docs with screenshots. |
| Blog article | SEO content with strong internal linking to relevant game/help/product pages. |
| Feature page | Catalog, Classes, Accessibility, Pro vs Free, In-App Purchases. |
| Legal/support | Privacy policy, subscription terms, contact/support. |

The first production version should prioritize content parity and URL fidelity.
Visual polish can iterate after launch, but game pages and help pages should
look intentionally designed from day one.

## Validation Gates

Create `npm run content:validate` for Bitsboard before launch.

Minimum validation checks:

- every published content file has `id`, `title`, `seoTitle`, `description`,
  `canonicalPath`, `sourceUrl`, `type`, `state`, and `lastReviewed`
- `canonicalPath` starts with `/`
- `sourceUrl` is a valid `https://bitsboard.com/...` URL for migrated pages
- no duplicate `id`
- no duplicate `canonicalPath`
- every internal Markdown link resolves
- every local image path exists
- every image has useful alt text
- every redirect destination resolves
- sitemap URL count matches expected launch inventory
- privacy policy and subscription terms exist
- App Store CTA URL is centralized in `content/_truth/app-store.yml`
- sensitive claims have a source or are flagged for review

Recommended scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "content:inventory": "tsx scripts/content/inventory.ts",
    "content:migrate": "tsx scripts/content/migrate-squarespace.ts",
    "content:validate": "tsx scripts/content/validate.ts",
    "content:check-redirects": "tsx scripts/content/check-redirects.ts",
    "codex:dry-run": "bash scripts/codex/dry-run.sh"
  }
}
```

## Hosting Recommendation

For a static commercial app website, use one of:

- Vercel Pro
- Cloudflare Pages
- another static host with strong redirect and cache support

Vercel Hobby should not be assumed suitable for Bitsboard because Vercel says
the Hobby plan is for non-commercial, personal use. Current Vercel references:

- https://vercel.com/docs/plans/hobby
- https://vercel.com/pricing

If Bitsboard uses no server functions, Cloudflare Pages may be the lowest-cost
production option. If the developer wants the simplest Next.js deployment path
and preview deployments, Vercel Pro is likely smoother.

Use Cloudflare DNS if possible. Before launch, lower DNS TTL, deploy the new
site to a preview domain, verify all URLs, then switch DNS.

## Phased Implementation Plan

### Phase 0: Project Setup

Deliverables:

- new `Bitsboard.com` repo
- Next.js App Router app
- Tailwind setup
- local dev port `48624`
- placeholder home page
- CI/build scripts
- base content folder structure

Acceptance:

- `npm run dev -- --port 48624` works
- `npm run typecheck`, `npm run lint`, and `npm run build` pass

### Phase 1: Inventory

Deliverables:

- `scripts/content/inventory.ts`
- `content/_data/source-url-inventory.yml`
- counts for pages, images, status codes, titles, descriptions, and canonical
  URLs
- list of failed or odd pages

Acceptance:

- all 150 sitemap URLs are classified
- all 515 sitemap images are recorded
- no migration begins until inventory is reproducible

### Phase 2: Importer

Deliverables:

- `scripts/content/migrate-squarespace.ts`
- imported Markdown/MDX content
- downloaded local images
- migration report

Acceptance:

- at least 10 representative pages migrate cleanly first:
  - home
  - games index
  - one game page
  - catalog
  - classes
  - accessibility
  - one help article
  - one FAQ page
  - one blog post
  - privacy policy
- then all pages migrate

### Phase 3: Content Types And Routes

Deliverables:

- content loader
- content types
- dynamic routes
- index pages
- sitemap
- RSS
- `llms.txt`

Acceptance:

- every migrated published page renders at its intended path
- draft/unpublished pages are excluded from sitemap
- all internal links resolve

### Phase 4: Presentation

Deliverables:

- site header/navigation
- App Store CTA
- home template
- game detail template
- help article template
- blog article template
- legal/support template

Acceptance:

- pages are mobile-safe
- screenshots do not overflow
- long titles fit
- tables/lists render clearly
- game pages feel product-specific, not like generic blog posts

### Phase 5: SEO And Redirects

Deliverables:

- `content/_data/redirects.yml`
- Next.js redirects config
- canonical metadata
- Open Graph/Twitter metadata
- robots config
- sitemap parity report

Acceptance:

- every old sitemap URL returns `200` on the new site or a tested `301`
- no accidental `noindex` on public pages
- old internal links do not point back to Squarespace
- App Store links still work

### Phase 6: Launch QA

Deliverables:

- production preview deployment
- browser QA on desktop and mobile
- link checker report
- image checker report
- Lighthouse sanity check for top pages
- DNS cutover checklist

Acceptance:

- build passes
- validation passes
- no broken internal links
- no missing images
- no critical console errors
- top pages visually checked
- domain switch plan approved

### Phase 7: Content Factory

Deliverables:

- topic inventory
- page briefs
- reusable prompts
- new-page generator
- content review checklist
- optional Codex draft-run script based on KansoBooks

Acceptance:

- developer can create a new game/use-case/help/blog page from a template
- generated page passes validation before review
- internal links and image requirements are enforced

## Launch Definition Of Done

The migration is done when:

- all 150 current sitemap URLs are accounted for
- all pages either render or redirect intentionally
- images are local or intentionally remote with documented reason
- all public pages have titles, descriptions, canonical URLs, and sitemap entries
- privacy policy and subscription terms are present
- App Store CTA works
- no internal links point to old Squarespace URLs unless intentionally external
- `npm run content:validate` passes
- `npm run typecheck` passes
- `npm run lint` passes
- `npm run build` passes
- production preview has been checked on mobile and desktop
- DNS cutover has a rollback plan

## Main Risks

| Risk | Mitigation |
|---|---|
| Squarespace export misses content | Crawl the live sitemap and use export only as backup. |
| Image links break after canceling Squarespace | Download images locally and rewrite paths before launch. |
| SEO loss from URL changes | Preserve URLs first, improve slugs later with measured redirects. |
| Blog content quality is uneven | Migrate first, then audit and improve in batches. |
| Sensitive education/therapy claims overstate outcomes | Add claim review for autism, SLP, special education, accessibility, and learning-outcome pages. |
| Legal pages become stale | Keep privacy/subscription pages as source-controlled content with review dates. |
| App Store links or pricing drift | Centralize in `_truth/app-store.yml` and `_truth/subscription.yml`. |

## Developer First Sprint

Recommended first sprint:

1. Create the `Bitsboard.com` repo and base Next.js app.
2. Add content folders and the simplified content type system.
3. Build `content:inventory`.
4. Generate the first inventory report from the live sitemap.
5. Build an importer spike for 10 representative pages.
6. Review imported Markdown and image output.
7. Build the first version of the game/help/blog templates.
8. Add validation gates before importing the remaining pages.

Do not start by redesigning the whole site. Start by making the migration
repeatable.

## Open Questions For Owner

- Do we have Squarespace admin access and can we export the WordPress XML?
- Is the domain registered at Squarespace, Cloudflare, or another registrar?
- Should old blog URLs be preserved exactly for at least 3 to 6 months?
- Are current blog posts worth preserving as-is, or should low-quality SEO posts
  be migrated as draft/noindex first?
- What is the canonical App Store URL and subscription/pricing truth?
- Are there analytics/Search Console accounts that need to be transferred or
  reconfigured?
- Does the new site need contact forms, newsletter signup, or only mailto links?
- Should support docs be optimized for parents, teachers, SLPs, or all three?

## Reference Links

- Current sitemap: https://bitsboard.com/sitemap.xml
- Current robots: https://bitsboard.com/robots.txt
- Squarespace export docs: https://support.squarespace.com/hc/en-us/articles/206566687-Exporting-your-site
- Vercel Hobby docs: https://vercel.com/docs/plans/hobby
- Vercel pricing: https://vercel.com/pricing
