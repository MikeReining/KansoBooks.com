# Codex Content Orchestration

**Status:** Active orchestration playbook for Codex-run content engine work.
**Authority:** Subordinate to `docs/operations/Execution-Playbook.md`,
`docs/phases/AutonomousContentEngine.md`, canonical product docs, truth files,
content validators, and claim audits.

This document defines how Codex should run the Autonomous Content Engine inside
this repository when the goal is not "make a draft" but "make a page worth
publishing." It is intentionally stricter than a normal writing prompt.

## Goal

Run the full content loop inside Codex until a draft is either:

- publication-ready but still unpublished, or
- blocked with an explicit reason and a useful next fix.

Codex may do the work end-to-end. The founder is not an editorial gate.
Deterministic gates, claim audits, final audits, and quality reviews are the
gates.

## Non-Negotiable Boundaries

Codex must preserve these rules:

- no tax, legal, audit, payroll, sales tax, filing, or entity-specific advice
- no accountant replacement claim
- no AI-as-financial-truth claim
- no cloud-books implication
- no unsupported product, pricing, competitor, performance, legal, or current
  platform claim
- no publish, commit, push, PR, deploy, or state change to `published` unless
  the user explicitly asks for a publish-authorized run

Allowed write paths for draft-only content runs:

```text
content/**
public/content/**
public/og/**
docs/content-runs/**
```

Forbidden write paths for content runs:

```text
src/app/api/**
src/lib/supabase/**
src/lib/control-plane/**
supabase/**
.env*
next.config.ts
package.json
package-lock.json
.github/**
```

Content-engine infrastructure changes, such as validator or orchestration
script edits, are implementation work and must be reviewed separately from the
content draft.

## Required Inputs

Before writing, Codex must identify:

- content item or refresh target
- topic inventory status in `content/_data/topic-inventory.yml`
- primary long-tail query and duplicate risk
- canonical job
- reader job
- primary operating question: "Am I done?", "Is this right?", or "Can I prove it?"
- risk class
- jurisdiction
- artifact or decision-support requirement
- duplicate/cannibalization risk
- source plan

If those are unclear, Codex should infer conservatively from the canonical jobs
and truth files. Stop only when the uncertainty changes product, trust,
security, legal, accounting, or access policy.

For new topics, run `docs/content-engine/IdeaGeneration.md` before drafting:

- generate or select candidates from reader fears and long-tail query patterns
- reject duplicates before creating content
- add the selected idea to `content/_data/topic-inventory.yml`
- write `topic-score.yml` with reader pain, search specificity, Kanso
  differentiation, artifact potential, duplicate risk, and publish ease

When the user says `Next article`, `next post`, or `next content`, run
`docs/content-engine/NextArticleWorkflow.md` first. That workflow always drafts
the next qualified article and stops before publication. The 24-hour cadence
only controls whether the finished draft is eligible to publish after founder
review.

## Required Outputs

Every run must create or update a run directory:

```text
docs/content-runs/YYYY-MM-DD-slug/
```

Minimum run artifacts:

```text
topic-score.yml
brief.yml
research-packet.yml
draft-record.yml
claim-audit.yml
final-audit.yml
publish-log.yml
quality-report-v1.yml
quality-report-v2.yml
quality-report-v3.yml
```

For new content, also create:

```text
content/<section>/<slug>.md
content/_claims/<slug>.yml
content/_artifacts/<slug>.yml when artifact or decision support is required
```

For existing content refreshes, write refresh-specific run artifacts and keep
the claim manifest aligned with the edited page.

## Quality Bar

The page must be useful enough that a small-business owner could act on it
without guessing what to do next.

The page is not good enough when it is:

- mostly definitions
- generic bookkeeping filler
- safe but bland
- correct markdown with bland presentation
- a thin checklist with no proof boundary
- a search page that does not help the reader make a decision
- a Kanso page that could appear on any accounting blog

The target voice is:

- direct
- plainspoken
- operator-minded
- concrete
- proof-oriented
- calm
- skeptical of AI confidence
- respectful of accountant judgment

Apply `docs/content-engine/CopyGuide.md` before final audit:

- write like a capable owner, not an internal strategist
- name the user's fear, object, decision, or next action
- translate product terms into visible artifacts: statements, folders, exports,
  questions, reports, and accountant packages
- use the KansoBooks vision where it helps the reader, without repeating the
  whole manifesto in every article
- remove abstract phrases such as "system shape" or "operating priority" unless
  they are immediately translated into plain user language

## Three-Pass Quality Loop

Codex must run three internal passes before declaring a draft ready.

### Pass 1 - Build The Useful Draft

Create the full draft, artifact, claim manifest, and run artifacts.

The first version must already include:

- direct answer in the opening
- Kanso take
- decision support or artifact
- proof boundary
- source notes
- next step
- entity summary when required

Write `quality-report-v1.yml` with scores and the biggest weaknesses.

### Pass 2 - Make It Specific

Revise the draft to remove generic prose.

Add or improve:

- concrete rows, examples, states, or decision criteria
- copy-ready tables or checklists
- sharper first answer
- stronger "what can be proved" language
- more useful next step

Write `quality-report-v2.yml` with before/after notes.

### Pass 3 - Make It Memorable And Publishable

Revise for voice, density, and distinctiveness.

Check:

- does the page have a line worth remembering?
- is the artifact actually usable?
- would an accountant understand the handoff?
- would an owner know what to do in the next 10 minutes?
- are claims still source-backed and bounded?
- does the page sound like something a worried owner would understand and
  repeat?

Write `quality-report-v3.yml` with final recommendation.

## Presentation Packaging Pass

After Pass 3 and before final audit, Codex must verify that the reusable
content presentation layer can package the page without bespoke styling.

Apply presentation by structure, not by hand-editing page chrome:

- keep the article in `content/<section>/<slug>.md`
- rely on the shared renderer and `ContentArticlePage` shell
- use conventional headings such as `The 10-Minute Exit Test`, `What You Can
  Prove`, `Source Notes`, `Next Step`, and `Entity Summary`
- use markdown tables for decision support, proof tests, and comparisons
- use `internalLinks`, `artifactId`, `risk`, `jurisdiction`, and
  `professionalBoundary` metadata to populate sidebar and footer modules
- when `artifactId` points to a checklist or template artifact, let the shared
  article shell render the reusable "Use this checklist" block and copy action;
  do not hand-build copy/download controls inside one article

Make an image decision using `docs/content-engine/ContentImageStyleGuide.md`:

- generate or select an image only when it clarifies the article job
- record `image-prompt.md` and `image-audit.yml` for generated or approved
  assets
- record `image-audit.yml` with `status: "no-image"` when the designed
  non-image layout is stronger
- reject images that imply cloud storage, show private data, invent dashboards,
  or look like generic accounting stock

Never add placeholder links:

- every CTA, sidebar link, footer link, and inline link must resolve to a live,
  useful destination
- do not link to empty section hubs, unpublished templates, unpublished
  artifacts, future pages, or TODO routes
- if the intended artifact is not published yet, use the waitlist or another
  live next step instead
- draft previews may display placement for future modules, but the clickable
  link itself must still point somewhere useful

Record presentation review in the run directory:

```text
presentation-audit.yml
```

Minimum presentation audit fields:

```yaml
status: "pass | blocked"
previewUrls:
  draft: "/drafts/<section>/<slug>"
  published: "/<section>/<slug>"
checks:
  desktopScreenshot: "pass | blocked | not-run"
  mobileScreenshot: "pass | blocked | not-run"
  tableOverflow: "pass | blocked"
  sidebarOverlap: "pass | blocked"
  ctaPresence: "pass | blocked"
  draftNoindex: "pass | blocked | not-applicable"
  linkRendering: "pass | blocked"
  noPlaceholderLinks: "pass | blocked"
  specialSections: "pass | blocked | not-applicable"
  imageDecision: "approved | rejected | no-image"
notes: []
```

An item is not `ready-for-publish-authorization` unless presentation status is
`pass`. If screenshots cannot be produced locally, mark them `not-run` with a
reason and do not call the page presentation-ready.

## Task Separation Inside Codex

Even when one Codex agent does all work, the lanes remain separate:

- AUTO creates or revises the content.
- KEEP reviews the diff, audits claims, runs gates, and decides PASS/BLOCKED.

The same runtime may wear both hats, but a draft does not pass because the
writer says it is done.

## Gates

Before closeout, run:

```bash
npm run content:validate
npm run content:path-guard -- <changed content/run paths>
npm run typecheck
npm run lint
npm run build
```

The final audit must record whether the content is:

- `blocked` for draft-only mode
- `ready-for-publish-authorization`
- `escalated`

The final audit must also confirm `presentation-audit.yml` exists and passes
when the run creates, refreshes, or prepares a publishable article.

Draft-only runs must keep new content out of production publication by leaving
state as `drafted`, `blocked`, or another non-`published` state.

## Closeout Report

Final response must include:

```text
Content item:
Run directory:
Pass 1 result:
Pass 2 result:
Pass 3 result:
Gates:
Publish status:
What improved:
What still worries me:
Recommendation:
```

## Automation Target

Later, this playbook should become a Codex Automation with:

- dedicated background worktree
- model `gpt-5.5`
- medium reasoning
- write access limited by rules and path guards
- Task 1 content run
- Task 2 review/closeout run
- Triage output when blocked

For now, run it manually inside Codex until the output is consistently strong.
