# Content Image Style Guide

**Status:** Active visual standard for KansoBooks editorial content.
**Authority:** Governs generated and selected imagery for content-engine pages.
Subordinate to canonical product truth and `docs/phases/ContentPresentationLayer.md`.

## Purpose

KansoBooks images should look like they came from one restrained editorial
system: calm, precise, proof-oriented, and local-first. They should make the
article easier to trust or understand. They should never exist only because a
post "needs an image."

## When To Use An Image

Use an image only when it does at least one job:

- clarifies a workflow, artifact, or proof concept
- makes an abstract trust boundary more concrete
- previews a real worksheet, packet, checklist, or future product surface
- improves shareability without weakening the article's usefulness

Do not use an image when:

- the article is already clearer as text and tables
- the image would be decorative filler
- the subject would require fake private financial data
- the prompt would drift into generic accounting stock imagery
- the visual would imply KansoBooks stores user books in the cloud

## Visual World

The core visual world is a clean financial review packet on a real desk, not a
SaaS dashboard and not a lifestyle shoot.

Use:

- white and near-white surfaces
- graphite ink, fine rules, organized paper, and restrained blue accents
- subtle green or amber proof/status marks when they carry meaning
- local folders, exported files, statements, receipts, checklists, evidence
  indexes, accountant packets, and clean desktop context
- soft natural light, shallow but not blurry depth, and spacious composition
- paper and product-context scenes that feel designed, useful, and inspectable

Avoid:

- generic handshake, calculator, laptop, money, or accountant stock photos
- fake dashboards, fake charts, fake app screens, or invented brand names
- cloud/server/network metaphors for user books
- glowing AI effects, robots, magic sparkles, neon, or dark command-center UI
- busy financial charts or legible numbers that imply real financial data
- cartoon finance illustrations
- gradient blobs, orbs, abstract waves, or decorative bokeh
- dramatic luxury desk styling that feels unrelated to small-business books

## Composition Rules

Every content image should feel related to a specific article job.

Presentation choices:

- `standard` hero: use for visual-led articles where the image materially helps
  the reader understand the topic before reading the body.
- `banner` hero: use when the article needs a visual signal, but the title,
  summary, and first section should stay prominent above the fold.
- no image: use when the article is stronger as text, tables, and proof modules.

Default composition:

- landscape editorial frame, suitable for article hero or Open Graph crop
- one clear subject cluster, with generous whitespace
- top-down or 3/4 desk angle
- no readable private data
- no real bank, processor, vendor, or customer names
- no visible tax forms unless the article specifically requires and legally
  permits that context
- no fake KansoBooks product UI until real product screenshots or approved
  mockups exist

Preferred formats:

```text
Article hero, standard: 1600x900 PNG
Article hero, banner: 1600x900 PNG, cropped at presentation time to 3:1
Section explainer: 1400x900 PNG
Open Graph: 1200x630 PNG
Artifact preview: 1200x900 PNG
```

## SEO And Accessibility

Every approved content image must be ready for publication, not just preview.

- filename includes the article slug and a concise subject phrase
- `alt` text describes the visible article-relevant subject in plain language
- `heroImage.presentation` is explicitly set when the default `standard` crop is
  not the right editorial choice
- Open Graph and Twitter metadata must use the approved image when a hero image
  exists
- decorative or generic images should be rejected instead of hidden behind weak
  alt text

## Prompt Grammar

Use this structure for every generated image prompt:

```text
Create a premium editorial image for KansoBooks, a local-first bookkeeping
product.

Article job: [reader job in plain language].
Subject: [specific visual subject].
Scene: [concrete objects, documents, packets, folders, or approved UI concept].
Composition: [hero / section / OG / artifact crop], clean and spacious, one
clear subject cluster, useful rather than decorative.
Mood: calm, precise, accountant-trustworthy, operator-focused.
Palette: white, near-white, graphite, muted Kanso blue, with subtle green or
amber only for meaningful proof/status marks.
Data safety: no readable private financial data, no real personal data, no real
bank names, no real vendor names, no fake customer names.
Local-first boundary: no cloud storage imagery, no server racks, no network
sync metaphors, no hosted-dashboard implication.
Style exclusions: no generic stock photography, no handshake image, no cartoon
style, no glowing AI effects, no fake dashboards, no busy financial charts, no
gradient-orb decoration.
```

## Subject Recipes

### Proof Boundary

Use for articles about what can and cannot be proven.

```text
Subject: a clean accountant review packet with a source-file list, evidence
index, checked items, and a small unresolved-questions note.
```

### Local-First Ownership

Use for local-first, portability, export, and migration articles.

```text
Subject: a labeled local folder, exported statement files, a checklist, and a
sealed handoff packet on a white desk.
```

### AI Drafting With Approval

Use for AI bookkeeping validation articles.

```text
Subject: AI-drafted bookkeeping suggestions shown as review notes beside source
records, with approval marks separated from draft marks.
```

### Accountant Handoff

Use for accountant-ready, package, and closeout articles.

```text
Subject: a finished accountant package with reports, source evidence, decision
log, and open questions organized in a calm review layout.
```

### Template Or Artifact Preview

Use for worksheet and checklist pages.

```text
Subject: the worksheet or checklist itself as the hero, cropped enough to show
structure but not enough to require legible private data.
```

## Rejection Checklist

Reject or regenerate an image if any item is true:

- it could belong to any generic accounting blog
- it shows a cloud, server, sync network, or hosted-data metaphor
- it contains legible financial data, personal data, or real brand names
- it invents a dashboard or product UI that does not exist
- it uses fake charts as decoration
- it relies on a handshake, smiling accountant, piles of cash, or calculator
- it has glowing AI, robot, cyber, or dark dashboard aesthetics
- it makes the article feel less serious, less local-first, or less provable
- it competes with the article's tables and proof modules
- it cannot be cropped cleanly for the intended slot

## Run Artifacts

Every content run with an image decision must record:

```text
docs/content-runs/YYYY-MM-DD-slug/image-prompt.md
docs/content-runs/YYYY-MM-DD-slug/image-audit.yml
```

`image-audit.yml` minimum fields:

```yaml
status: "approved | rejected | no-image"
imageType: "hero | section | artifact | og | none"
assetPath: "public/content/images/<slug>/<asset-name>.png"
ogPath: "public/og/<slug>.png"
styleGuide: "docs/content-engine/ContentImageStyleGuide.md"
checks:
  improvesComprehension: true
  notDecorativeFiller: true
  noPrivateData: true
  noRealBrands: true
  noCloudImplication: true
  noFakeDashboard: true
  cropSafe: true
notes: []
```

If the correct decision is no image, set `status: "no-image"` and explain why
the designed non-image layout is stronger.

## Storage

Approved generated assets belong in:

```text
public/content/images/<slug>/<asset-name>.png
public/og/<slug>.png
```

Never store generated prompts or audit notes only in chat. The run directory is
the source of truth.
