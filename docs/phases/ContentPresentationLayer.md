# Content Presentation Layer

**Status:** Ready for implementation.
**Authority:** Presentation, visual packaging, and editorial UI system for
Autonomous Content Engine pages.
**Parent:** `docs/phases/AutonomousContentEngine.md`
**Execution:** Use with `docs/phases/!Execution.md`.

This phase turns KansoBooks content from correct markdown into a polished,
trustworthy publication system. The content engine already knows how to produce
bounded articles, claim manifests, artifacts, audits, and draft preview routes.
It now needs a reusable presentation layer so every generated page looks
intentional, useful, and Kanso-native.

## Problem

The first Codex-orchestrated article is useful, but the browser experience is
plain:

- no article header system
- no visual hierarchy beyond title/body/table
- no sidebar for table of contents, proof summary, or calls to action
- no footer that routes readers to the next step
- tables render correctly but do not yet feel designed
- special sections like the 10-minute test look like ordinary prose
- no image strategy, prompt style, or asset-generation rule
- weak contextual interlinking until more articles exist

This is not a content-quality failure. It is a packaging-system gap.

## Goal

Create a reusable content presentation system for resources, comparisons,
templates, glossary pages, and future content-engine outputs.

The system should make every article feel:

- calm
- premium
- accountant-trustworthy
- proof-oriented
- readable on mobile
- visually structured
- easy to act on
- clearly part of KansoBooks

The design should not feel like a generic blog, a SaaS landing page, a dark
dashboard, or an AI slop site.

## Non-Negotiables

- No publishing state changes during presentation work unless explicitly
  authorized.
- No claims beyond product truth or legal-boundary files.
- No decorative filler images.
- No stock-like images that make the product feel generic.
- No visual treatment that implies cloud storage of user books.
- No in-app copy explaining the design system or how to use the page.
- No layout that breaks long tables, long headings, or mobile reading.
- No gradient-orb or generic AI decoration.

## Design Direction

The article system should feel like a clean operating memo mixed with a
financial review packet.

Use:

- white and near-white backgrounds
- fine rules and restrained borders
- graphite text
- blue accents from the current Kanso palette
- occasional green or amber status accents for proof states
- narrow, high-quality illustration or product-context imagery only when it
  clarifies the article
- quiet metadata and strong section framing

Avoid:

- oversized marketing hero blocks
- floating cards inside cards
- cartoon finance imagery
- fake dashboards
- decorative blob backgrounds
- generic handshake/accountant stock visuals
- image assets that compete with the article's job

## Phase 1 - Article Shell

**Goal:** Replace the plain article wrapper with a reusable editorial layout.

Implement:

- site header with KansoBooks brand, section navigation, and primary CTA
- article hero with title, dek, content type, risk/boundary metadata, and review
  date
- responsive article layout with main column and right sidebar on desktop
- sticky sidebar on desktop with table of contents and proof summary
- mobile-safe sidebar collapse or inline summary
- article footer with next-step CTA, related content, and professional boundary
- draft-preview banner when a page is viewed under `/drafts/...`

Suggested components:

```text
ContentSiteHeader
ContentArticleShell
ContentArticleHero
ContentArticleSidebar
ContentArticleFooter
DraftPreviewBanner
```

Acceptance criteria:

- `/drafts/comparisons/local-first-bookkeeping-vs-cloud-accounting` feels like a
  designed article page, not rendered markdown.
- Header, sidebar, and footer render for resources and comparisons.
- Existing published resource pages still build and render.
- Draft pages remain `noindex`.

## Phase 2 - Editorial Components

**Goal:** Give recurring article patterns designed treatments.

Implement renderer support for typed or convention-based blocks:

- decision tables
- comparison tables
- proof tests
- checklist blocks
- callout blocks
- professional-boundary notes
- source notes
- next-step blocks
- entity summaries
- Kanso take blocks

Special treatment examples:

```text
## The 10-Minute Exit Test
```

Should render as a named test module with:

- compact heading treatment
- small label such as "Operator test"
- bordered test container
- designed table
- final verdict line emphasized

```text
## What You Can Prove
```

Should render as a proof-boundary module with:

- "Can prove" and "Cannot prove" separation when available
- amber or graphite boundary styling
- accountant/professional judgment reminder

Tables should support:

- horizontal scrolling on mobile
- compact density
- sticky or strong header row
- readable long cells
- row dividers
- optional first-column emphasis
- no layout shifts

Acceptance criteria:

- The 10-minute test no longer looks like normal article text.
- Tables look designed and remain readable on mobile.
- Lists and links continue to render correctly.
- No new markdown syntax is required for the first pass unless truly needed.

## Phase 3 - Image And Visual Asset System

**Goal:** Define when content gets images, what they look like, and how agents
create or reject them.

**Style authority:** `docs/content-engine/ContentImageStyleGuide.md`.

Images should be used when they improve comprehension, trust, or shareability.
They should not be used because every blog post "needs an image."

Image types:

- article hero image
- section explainer image
- artifact preview image
- Open Graph image
- downloadable worksheet preview
- product-context screenshot once product UI exists

Preferred style:

- editorial still-life or clean product-context composition
- local files, folders, statements, receipts, checklists, and accountant packet
  concepts
- soft natural light
- white, graphite, muted blue, and subtle green/amber accents
- no fake brand names, no legible financial data, no real personal data
- no cloud-server visual metaphors for user books

Base prompt template:

```text
Use the prompt grammar, subject recipes, and rejection checklist in
docs/content-engine/ContentImageStyleGuide.md.
```

Provider posture:

- Prefer ChatGPT image generation when available inside Codex.
- Use Grok Imagine API only if it produces cleaner, brand-consistent assets and
  can be run with stable local prompts and saved outputs.
- Do not allow autonomous publishing to depend on an image provider being up.
- If image generation fails, publishable content may proceed with a designed
  non-image layout.

Asset rules:

```text
public/content/images/<slug>/<asset-name>.png
public/og/<slug>.png
docs/content-runs/YYYY-MM-DD-slug/image-prompt.md
docs/content-runs/YYYY-MM-DD-slug/image-audit.yml
```

Acceptance criteria:

- First article has either a polished generated hero/section image or an
  intentional no-image design.
- Prompt and image audit are recorded in the run directory.
- Prompt follows `docs/content-engine/ContentImageStyleGuide.md`.
- Generated images contain no sensitive data, fake claims, unreadable UI, or
  misleading cloud implication.

## Phase 4 - CTA And Sidebar System

**Goal:** Make articles convert and route readers without feeling salesy.

Sidebar modules:

- table of contents
- "Best for" / "Use this when"
- proof summary
- artifact link or worksheet CTA
- product CTA
- professional boundary

Footer modules:

- next article
- related reading
- artifact/template CTA
- product CTA
- source/proof note

CTA tone:

- practical
- calm
- task-oriented
- no hype
- no pressure language

Example CTAs:

```text
Build the accountant packet
Run the proof check
Compare your handoff
Start with your source files
```

Acceptance criteria:

- Every article has at least one useful next action.
- CTA language maps to the reader's current job.
- Draft previews show CTA placement without triggering real publishing.

## Phase 5 - Internal Linking System

**Goal:** Build interlinking as the content corpus grows.

Today, interlinking is naturally thin because the site has only a few pages.
That is acceptable. The presentation layer should still prepare slots for a
future link graph.

Implement:

- contextual inline links when a linked concept already exists
- related-content footer
- "next step" module
- hub/category index links
- content graph audit in future orchestration runs

Rules:

- Do not publish or preview clickable placeholder links.
- Do not link to empty section hubs, unpublished artifacts, unpublished
  templates, future pages, or TODO routes.
- Do not force links to thin or unrelated pages.
- Do not create circular filler links.
- Prefer links that move the reader to the next operational step.
- Track missing-link opportunities in run artifacts.

Acceptance criteria:

- Existing articles link only where useful.
- CTAs and navigation show only live useful destinations; unpublished artifacts
  fall back to a live waitlist or related page.
- The article footer can show related content once enough pages exist.
- Future content runs record missing interlinking opportunities.

## Phase 6 - Preview And Quality Gates

**Goal:** Make presentation quality part of the content engine's definition of
done.

Add checks to content orchestration closeout:

- desktop screenshot
- mobile screenshot
- table overflow check
- sidebar overlap check
- hero/header visual check
- CTA presence check
- draft noindex check
- link rendering check
- image audit when images exist

Required local preview URLs:

```text
/drafts/<section>/<slug>
/<section>/<slug> when published
```

Acceptance criteria:

- Codex cannot mark an article presentation-ready without browser
  preview verification.
- Quality reports include both writing quality and presentation quality.
- Bland-but-correct pages are explicitly blocked from "great article" status.

## Phase 7 - Automation Integration

**Goal:** Teach Codex to package articles automatically.

Update orchestration docs and future agent prompts so every content run includes:

- presentation component selection
- image decision
- CTA selection
- sidebar module selection
- footer related-content selection
- screenshot audit
- visual quality score

Autonomous publishing should require:

- content gates pass
- claim gates pass
- presentation gates pass
- preview screenshots pass
- publish authorization mode is active

## First Implementation Sprint

**Status:** PASS / Article shell and orchestration gate implemented.

Task 1 built the shared content article shell, draft preview banner, sidebar,
footer, designed table treatment, and convention-based modules for the
10-minute test and proof boundary sections. Task 2 verified no content
publishing state changed, draft previews remain noindex, and the local gates
passed. Image generation, richer section-specific modules, and screenshot
automation remain future phases.

Task 1 / AUTO:

- Build the reusable article shell.
- Add header, sidebar, footer, and draft-preview banner.
- Improve table styling.
- Add section-aware styling for the 10-minute test.
- Keep the first comparison article in `state: drafted`.

Task 2 / KEEP:

- Review desktop and mobile preview.
- Verify no publishing state changed.
- Run `npm run content:validate`, `npm run typecheck`, `npm run lint`, and
  `npm run build`.
- Record what still feels bland.

## Open Decisions

- Whether article images should be generated for every tier-1 article or only
  for articles where the image clarifies a concept.
- Whether comparison pages should have a distinct visual identity from resource
  pages.
- Whether artifacts should become visible downloadable assets or remain
  structured internal YAML until product UI exists.
- Whether Open Graph images should be generated by AI, rendered from React, or
  both.
