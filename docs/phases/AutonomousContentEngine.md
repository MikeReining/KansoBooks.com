# Autonomous Content Engine

**Status:** Strategic design / Ready for implementation planning
**Authority:** Website organic growth and autonomous publishing plan.
Subordinate to `docs/KansoBooksManifesto.md`, `docs/KansoBooksVision.md`,
`docs/KansoBooksWedge.md`, `docs/phases/FoundationSetup.md`, and
`docs/phases/!Execution.md`.

## Phase 1 Status

**Status:** PASS / Contract scaffolding complete as of 2026-05-09.

Phase 1 establishes product truth seeds, content schemas, canonical jobs,
escalation policy, crawler policy, and content-engine implementation docs. It
does not publish public pages, add routes, or decide training-crawler access.

## Phase 2 Status

**Status:** PASS / Content infrastructure closed as of 2026-05-09.

Phase 2 adds the structured content loader, public content route shells,
sitemap, RSS, `llms.txt`, JSON-LD helpers, internal-link helpers, content
validation, claim/source checks, forbidden-claim linting, and an autopublish
path guard. Reviewer closeout verified the gates pass, no finished public
articles were published, crawler training policy remains deferred, and the
product/trust boundaries remain intact.

## Phase 3 Status

**Status:** PASS / Skill system closed as of 2026-05-09.

Phase 3 adds canonical Kanso content skills, shared templates, claim-audit and
final-audit checklists, and the Hermes skill directory strategy. It does not
publish public content or add content routes.

## Phase 4 Status

**Status:** PASS / Codex-as-Hermes calibration closed as of 2026-05-09.

Task 1 ran the first Codex-as-Hermes content pipeline with one public page:
`/resources/accountant-ready-books`. The run created a topic score, brief,
research packet, draft record, checklist artifact, claim manifest, claim audit,
final audit, and publish log under `docs/content-runs/2026-05-09-accountant-ready-books/`.
The checklist remains an internal artifact at
`content/_artifacts/accountant-package-checklist.yml`; no second public page
was added for the same canonical job. Task 2 independently reviewed the run,
verified the required gates, and closed the first run. Further Phase 4 repeats
may continue from this calibrated baseline.

**Repeat Status:** PASS / Second Codex-as-Hermes calibration run closed as of
2026-05-09.

Task 1 ran a second content pipeline pass for the distinct canonical job
`understand-books-readiness`. The run created one public resource:
`/resources/how-to-know-books-are-done`, plus the internal artifact
`content/_artifacts/books-readiness-checklist.yml`, claim manifest, topic
score, brief, research packet, draft record, claim audit, final audit, and
publish log under
`docs/content-runs/2026-05-09-how-to-know-books-are-done/`. Task 2
independently reviewed the run, verified the required gates, and closed the
second calibration run. Further Phase 4 repeats may continue from this
baseline until the output is consistently Kanso-native.

**Third Run Status:** PASS / Third Codex-as-Hermes calibration run closed as
of 2026-05-09.

Task 1 ran a third Codex-as-Hermes calibration pass for the distinct canonical
job `validate-ai-bookkeeping-work`. The run created one public resource:
`/resources/ai-bookkeeping-with-proof`, plus the internal artifact
`content/_artifacts/ai-bookkeeping-validation-checklist.yml`, claim manifest,
topic score, brief, research packet, draft record, claim audit, final audit,
and publish log under
`docs/content-runs/2026-05-09-ai-bookkeeping-with-proof/`. The run focuses on
the AI trust boundary: AI-drafted bookkeeping is useful only when validated
against source records, visible uncertainty, decision logs, and user approval.
Task 2 independently reviewed the run, verified the required gates, and closed
the third calibration run.

**Phase 4 Calibration Status:** Complete / ready to proceed to Phase 5.

Across three distinct runs, the content pipeline produced Kanso-native pages
with resolving artifacts, claim manifests, run records, proof boundaries,
professional boundaries, and no founder approval gate. Future calibration can
continue opportunistically, but Phase 4 no longer blocks the Local Hermes
Runner work in Phase 5.

## Phase 5 Status

**Status:** PASS / Repo-side Local Hermes Runner setup closed as of 2026-05-09.

Repo-side Local Hermes Runner setup now includes versioned profile definitions,
least-privilege toolset intent, provider/model routing placeholders, dedicated
worktree conventions, schedule templates, run-log and exception templates,
exception alert boundaries, publish credential boundaries, and a credential-free
dry-run command. The dry-run command writes reports outside the repo by default
and supports
`HERMES_REPORT_ROOT=docs/content-runs` for intentional scheduled run logs.

True local blockers for unattended operation remain outside the repo: Mac Mini
Hermes installation, provider credentials and budgets in a local secret store,
scheduler installation, dedicated local OS user/worktree setup, branch
protection/merge automation, and least-privilege GitHub automation credentials
if publishing is enabled.

## Goal

Build an autonomous proof-grade publishing system for `KansoBooks.com` so
KansoBooks earns organic traffic from search engines and AI answer engines
without requiring founder review, founder editing, or founder publishing labor.

The system exists to make KansoBooks the most useful public source for one job:

```text
Get the books ready.
Know what is still uncertain.
Send the accountant a package that explains itself.
```

The engine is successful when Hermes can plan, research, write, review,
optimize, publish, monitor, and refresh content on a schedule, escalating only
when a run is blocked or a claim cannot be made safely.

## Operating Principle

Founder approval is not a publishing gate.

Founder time is spent building and tuning the machine:

- product thesis
- voice boundary
- trust boundary
- risk boundary
- content architecture
- quality gates
- escalation rules
- first-run calibration

Once those are encoded, Hermes owns execution.

The founder should not be required to:

- choose weekly topics
- draft posts
- polish headlines
- verify routine accounting claims
- approve routine publication
- click publish
- refresh decaying articles

The founder may be interrupted only for:

- strategy changes
- unresolved brand-positioning conflicts
- product truth conflicts
- tax, legal, accounting, or audit claims that cannot be safely generalized
- failed infrastructure, expired credentials, model/provider outages, or budget
  exhaustion
- access-policy changes for autonomous agents

## Hermes Posture

Hermes is the target executor.

This doc does not treat Hermes or agents as unproven. Thousands of people use
agentic systems successfully. The work here is to make KansoBooks' specific
content machine calibrated, observable, and bounded before it runs unattended.

Implementation path:

1. Codex acts as Hermes inside this repo for the first pipeline passes.
2. We create the first articles and artifacts here using the same workflow
   Hermes will later run.
3. We patch the skills, validators, and gates based on real outputs.
4. Hermes is installed on the Mac Mini and runs the same pipeline.
5. Burn-in publishes at low cadence while the machine records failures and
   improves.
6. Full autopublish starts once gates are stable.

Burn-in may include founder calibration, but not founder approval. The founder
can tune the system after reading outputs or failure reports. The founder does
not become a permanent editorial queue.

## Why This Exists

KansoBooks starts with no content surface, no topic factory, no publishing
workflow, no structured content model, no search footprint, and no AI-engine
footprint.

That is an advantage. We can build the system correctly before slop exists.

KansoBooks should not become a generic bookkeeping blog. It should become the
best public knowledge base for:

- books readiness
- accountant handoff
- AI bookkeeping with proof
- evidence-backed financial records
- local ownership
- reconciliation and validation
- operational clarity for small-business owners

The goal is not to publish more accounting content.

The goal is to make every page useful enough to cite, link, send to an
accountant, or use as a next step.

## Search And AI Engine Thesis

SEO and AIEO are separate distribution surfaces with overlapping requirements.

Traditional search rewards:

- crawlable pages
- durable URLs
- useful answers
- topical authority
- internal links
- freshness
- structured metadata
- backlinks and mentions
- high-intent page architecture

AI answer engines reward:

- extractable answers
- clear definitions
- source-backed claims
- structured comparisons
- stable entities
- concise summaries
- original artifacts worth citing
- pages that explain relationships between concepts

There is no magic AI ranking switch. AIEO means making KansoBooks easy for
answer engines to understand, cite, summarize, and recommend correctly.

## Product Truth Contract

The content engine may not infer product truth from marketing copy, old pages,
roadmap notes, prior drafts, or model memory.

Canonical product and claim truth must live in explicit files:

```text
content/_truth/product.yml
content/_truth/pricing.yml
content/_truth/competitors.yml
content/_truth/legal-boundaries.yml
content/_truth/claims.yml
content/_truth/crawler-policy.yml
```

Every product, pricing, performance, competitor, tax, accounting, or legal-
adjacent claim must resolve to:

- one of the truth files
- a canonical Kanso doc
- an approved external source

If a claim cannot be resolved, the article does not publish.

### Claim Classes

| Claim type | Examples | Source required | Refresh cadence |
|---|---|---|---|
| Product capability | "Kanso produces an accountant package" | `product.yml` or release docs | every release |
| Pricing | "$99/year" | `pricing.yml` | monthly |
| Competitor pricing | QuickBooks, Bench, Wave pricing | competitor source plus date checked | monthly |
| Performance | "10x faster" | internal benchmark or remove | quarterly |
| Accounting workflow | "reconcile before handoff" | source or general education boundary | 6 months |
| Tax/legal | filing, payroll, sales tax, deductibility | primary official source | skip or escalate |
| Positioning | "AI drafts, Kanso proves" | Kanso thesis docs | stable |

### Claim Manifest

Every publishable page must have a claim manifest, either embedded in
frontmatter or generated beside the page.

Example:

```yaml
claims:
  - id: "claim-local-files"
    text: "KansoBooks is built around local files the user owns."
    type: "product"
    source: "docs/KansoBooksManifesto.md#the-inversion"
    refresh: "on-release"
  - id: "claim-ai-drafts-not-truth"
    text: "AI drafts the work; Kanso validates it; the user approves what becomes true."
    type: "positioning"
    source: "docs/KansoBooksVision.md#trust-model"
    refresh: "stable"
```

The final audit must fail any page with:

- a missing claim manifest
- a claim with no source
- a stale claim
- a claim whose source contradicts the page
- a claim outside the page's risk class

## Language Defaults

The engine must prefer precise Kanso language.

| Avoid | Prefer |
|---|---|
| tax and audit ready | tax-time handoff ready |
| audit-ready books | books with an evidence trail |
| AI bookkeeper does your books | AI drafts the bookkeeping work |
| guaranteed correct | checked against evidence and reconciliation rules |
| replaces your accountant | helps you send your accountant a cleaner package |
| fully automated bookkeeping | AI-assisted bookkeeping with review and proof |

Content may explain audit trails, evidence, and tax-time handoff. It must not
imply KansoBooks provides audit, legal, CPA, or tax filing advice.

## Binding Content Position

KansoBooks owns books-readiness, not accounting trivia.

Allowed strategic angles:

- accountant-ready books
- tax-time books readiness
- clean handoff to CPA
- evidence-backed financial records
- AI-assisted bookkeeping with deterministic validation
- local-first bookkeeping files
- user-owned books
- small-business bookkeeping confidence
- bookkeeping proof, review, reconciliation, and audit trails
- alternatives to QuickBooks, Bench, Wave, and traditional bookkeepers
- accountant distribution and professional review workflows

Weak or forbidden angles:

- generic finance content with no Kanso viewpoint
- accounting-student encyclopedia pages
- tax advice masquerading as content
- article batches created only to occupy keywords
- location spam
- AI bookkeeping hype without proof boundaries
- fully automated tax compliance
- promises that Kanso replaces accountants
- claims that AI is the source of financial truth

## Anti-Scaled-Content Policy

The engine is not allowed to create pages merely because a keyword exists.

Reject any topic if:

- it is a keyword variant of an existing page
- it has no distinct reader job
- it has no Kanso-specific proof angle
- it cannot include a useful artifact, decision tree, checklist, table, or
  worked example
- it exists mainly to capture search traffic
- it would be embarrassing to send directly to a small-business owner or
  accountant

One excellent page beats ten keyword variants.

The engine must maintain:

```text
content/_data/canonical-jobs.yml
```

Every page maps to one distinct user job. If two pages map to the same job, the
engine must merge, redirect, or reject one of them.

## Content Pillars

### 1. Books Ready For Your Accountant

Purpose: own the category language around accountant-ready books.

Example topics:

- get your books ready for your accountant
- what to send your accountant at tax time
- how to know your books are done
- month-end bookkeeping checklist
- quarter-end books readiness checklist
- year-end books checklist
- why categorized transactions are not finished books
- what a clean accountant package should include

### 2. AI Bookkeeping With Proof

Purpose: make KansoBooks the most credible voice on AI bookkeeping trust.

Example topics:

- can AI do bookkeeping?
- AI bookkeeping accuracy
- AI bookkeeping risks
- why AI should draft but not decide your books
- how to audit AI-generated bookkeeping work
- AI bookkeeper vs bookkeeper vs accountant
- what bookkeeping tasks AI is good at
- what bookkeeping tasks need deterministic validation

### 3. Small Business Bookkeeping Basics

Purpose: capture high-intent basics while translating them through readiness.

Example topics:

- profit and loss statement explained
- balance sheet explained
- trial balance vs general ledger vs P&L
- cash basis accounting
- chart of accounts for consultants
- chart of accounts for agencies
- owner draws vs payroll
- transfers vs expenses
- reimbursements and business expenses
- credit card payments in bookkeeping

### 4. Alternatives And Buying Decisions

Purpose: catch users already dissatisfied with the current market.

Example topics:

- QuickBooks alternatives
- Bench alternatives
- Wave alternatives
- AI bookkeeping software
- bookkeeping software for solopreneurs
- bookkeeping software for consultants
- local-first accounting software
- open-source accounting software
- bookkeeper vs bookkeeping software
- when to hire a bookkeeper

### 5. Templates, Tools, And Artifacts

Purpose: create link-worthy assets and AI-citable references.

Example assets:

- accountant package checklist
- bookkeeping readiness checklist
- CPA handoff email template
- monthly close checklist
- year-end books checklist
- evidence index example
- sample accountant package
- chart of accounts templates
- bank CSV import guides
- reconciliation checklist
- AI bookkeeping validation checklist

### 6. Accountant Distribution

Purpose: make accountants trust the output and become a channel.

Example topics:

- what a clean client bookkeeping package looks like
- how AI-assisted bookkeeping changes accountant review
- evidence index for accountant handoff
- client books readiness checklist for CPA firms
- how accountants can review AI-drafted bookkeeping safely

Accountant content must respect the same boundary: KansoBooks helps prepare a
cleaner package; it does not replace professional judgment.

## Content Tiers

Different page types have different moat requirements.

| Tier | Page type | Requirement |
|---|---|---|
| Tier 1 | hub, pillar, cornerstone | Kanso thesis, answer units, artifact, sources, internal-link map |
| Tier 2 | topic page, how-to, comparison | Kanso thesis, decision support, claim manifest, sources |
| Tier 3 | glossary or support page | precise definition, relation to readiness, internal links |
| Tier 4 | template or tool | usable artifact, instructions, risk boundary, metadata |

"Serious article" means Tier 1 or Tier 2. Tier 1 and Tier 2 pages must include
decision support. Tier 3 pages may be shorter, but they still cannot be generic
accounting filler.

## Required Answer Units

Every Tier 1 and Tier 2 page must include these answer units.

### AnswerBlock

- 40-80 words
- directly answers the primary query
- no throat-clearing
- visible near the top

### KansoTake

- states the Kanso point of view
- connects the topic to proof, readiness, ownership, accountant handoff, or
  operational clarity

### DecisionSupport

At least one:

- checklist
- decision tree
- table
- worked example
- template
- comparison matrix

### ProofBoundary

Explains:

- what can be verified
- what needs user judgment
- what needs an accountant
- what KansoBooks does not claim

### SourceNotes

- cites public sources when factual claims require them
- names Kanso positioning when the section is opinion or thesis

### NextStep

One natural next action:

- checklist
- sample package
- related page
- waitlist
- product demo
- comparison page

### Entity Summary

Medium-risk and high-risk pages must include a structured entity summary in
content metadata or a visible appendix.

Preferred shape:

```markdown
| Entity | Meaning | Relationship |
|---|---|---|
| Accountant package | A handoff bundle for accountant review | Output KansoBooks helps prepare |
| Reconciliation | Matching expected balances to statements | Proof step before handoff |
```

This exists for answer engines and for the audit trail. It must not be keyword
stuffing.

## Artifact Library

Writers do not invent accounting artifacts during article drafting.

Artifacts live in:

```text
content/_artifacts/
```

Each artifact has:

- stable ID
- title
- artifact type
- jurisdiction
- risk class
- source notes
- professional boundary
- owner
- last reviewed date
- next review date
- structured content

The strategist selects an artifact ID during brief creation. The writer may
contextualize the artifact inside the article, but may not alter its structural
facts, compliance-sensitive steps, jurisdiction, or professional boundary.

New artifacts can be created by the engine only through an artifact sprint:

1. artifact brief
2. source research
3. artifact draft
4. claim manifest
5. final audit
6. schema validation
7. commit

Founder review is not a permanent artifact gate, but during the initial build
the founder may tune artifact standards as system design input.

## Hermes Architecture

Start with four Hermes profiles and many skills.

Profiles are operational identities. Skills are the specialist passes. Starting
with fewer profiles reduces coordination failure while preserving the full
workflow.

| Profile | Owns | Tools |
|---|---|---|
| `kanso-orchestrator` | topic queue, state machine, delegation, run logs | repo read, scheduler, limited git |
| `kanso-research` | source discovery, source packets, competitor checks | web/search/read only |
| `kanso-editor` | brief, draft, SEO/AIEO, tone, revisions | repo read, draft write path only |
| `kanso-auditor-publisher` | final audit, build, commit, publish, indexing logs | narrow repo write plus publish lane |

Future split profiles:

- `kanso-strategist`
- `kanso-writer`
- `kanso-headlines`
- `kanso-seo`
- `kanso-aieo`
- `kanso-reviewer`
- `kanso-tone`
- `kanso-audit`
- `kanso-publisher`
- `kanso-maintainer`
- `kanso-metrics`

Split only when bottlenecks or failure logs justify it.

## Skill Set

Every major pass becomes a `SKILL.md`.

Planned skill directories:

```text
skills/
  kanso-topic-scoring/
    SKILL.md
  kanso-content-brief/
    SKILL.md
  kanso-research-packet/
    SKILL.md
  kanso-article-draft/
    SKILL.md
  kanso-headline-metadata/
    SKILL.md
  kanso-seo-aieo-pass/
    SKILL.md
  kanso-tone-pass/
    SKILL.md
  kanso-content-review/
    SKILL.md
  kanso-claim-audit/
    SKILL.md
  kanso-final-audit/
    SKILL.md
  kanso-publish/
    SKILL.md
  kanso-refresh/
    SKILL.md
  kanso-metrics-review/
    SKILL.md
```

Each skill must include:

- purpose
- inputs
- outputs
- hard refusal conditions
- escalation conditions
- examples of good output
- examples of bad output
- required checks
- downstream handoff format

The writing, tone, and review skills must treat the public manifesto voice as
canonical. They must force content back to the three questions:

```text
Am I done?
Is this right?
Can I prove it?
```

## Tone Contract

Tone target:

- calm
- specific
- dense
- non-hype
- non-academic
- non-corporate
- trustworthy
- plainspoken
- operator-minded

The strategist and writer must frame topics through:

- capital allocation
- risk reduction
- operational leverage
- clean handoff
- delayed-decision prevention
- proof over black-box confidence

Formatting rules:

- use short, declarative sentences
- avoid em dash and en dash punctuation
- use parallel bullets
- avoid ornamental formatting
- avoid fake urgency
- avoid keyword-stuffed headings
- avoid long throat-clearing intros

Reject phrases:

- "in today's fast-paced business environment"
- "unlock the power of"
- "game-changer"
- "seamlessly streamline"
- "leverage cutting-edge"
- "revolutionize your finances"
- "delve into"
- "comprehensive guide" unless the page truly is one

## Content State Machine

Every content item has one state:

- `candidate`
- `scored`
- `briefed`
- `researched`
- `artifact-selected`
- `drafted`
- `optimized`
- `audited`
- `published`
- `indexed`
- `measuring`
- `refresh-needed`
- `refreshing`
- `retired`
- `blocked`
- `escalated`

Only the orchestrator may move an item forward.

Only the auditor-publisher may move an item to `published`.

Each transition writes a run log:

```yaml
topicId: "accountant-package-checklist"
from: "drafted"
to: "optimized"
agent: "kanso-editor"
timestamp: "2026-05-09T00:00:00-07:00"
checksPassed:
  - "answer_block_present"
  - "artifact_present"
  - "no_tax_advice"
checksFailed: []
claimManifest: "content/_claims/accountant-package-checklist.yml"
nextAction: "final-audit"
```

Run logs live in:

```text
docs/content-runs/
```

or, if runtime data becomes too noisy for docs:

```text
content/_runs/
```

## Site Architecture Target

Build this inside the `KansoBooks.com` repo.

The content engine touches the public website, routes, metadata, sitemap,
schema, content validation, internal links, and deployment. A separate repo can
come later if scale requires it.

Current site stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vercel

Recommended content surfaces:

```text
/resources
/resources/bookkeeping
/resources/accountant-ready-books
/resources/ai-bookkeeping
/resources/templates
/comparisons
/glossary
/learn
```

Recommended storage:

```text
content/
  resources/
  comparisons/
  glossary/
  templates/
  _artifacts/
  _claims/
  _data/
    canonical-jobs.yml
    topics.yml
    internal-links.yml
    sources.yml
    refresh-schedule.yml
  _truth/
    product.yml
    pricing.yml
    competitors.yml
    legal-boundaries.yml
    claims.yml
    crawler-policy.yml
```

Recommended page model:

- MDX or structured markdown
- typed frontmatter
- server-rendered pages
- generated sitemap
- generated RSS/feed
- JSON-LD schema
- canonical URLs
- author/reviewer metadata
- `lastReviewed`
- `nextReview`
- source list
- related links
- artifact links
- claim manifest
- jurisdiction metadata

Do not add a headless CMS until content operations prove they need one.

## Metadata Contract

Every publishable page must validate against a typed schema.

Example:

```yaml
id: "get-books-ready-for-accountant"
title: "How to Get Your Books Ready for Your Accountant"
seoTitle: "How to Get Your Books Ready for Your Accountant"
description: "A practical checklist for preparing small-business books before sending them to your accountant."
slug: "get-books-ready-for-accountant"
canonicalPath: "/resources/get-books-ready-for-accountant"
type: "resource"
tier: 1
pillar: "accountant-ready-books"
state: "published"
intent: "how-to"
risk: "medium"
jurisdiction: "general"
jurisdictionNotes: "General bookkeeping workflow. Not tax advice."
professionalBoundary: "Ask your accountant before relying on this for filing, tax treatment, payroll, sales tax, or audit/legal matters."
author: "KansoBooks"
reviewer: "KansoBooks Editorial System"
publishedAt: "2026-05-09"
lastReviewed: "2026-05-09"
nextReview: "2026-08-09"
primaryQuery: "get books ready for accountant"
secondaryQueries:
  - "what to send accountant for taxes"
  - "small business bookkeeping checklist"
canonicalJob: "prepare-books-for-accountant"
artifactId: "accountant-package-checklist"
claimManifest: "content/_claims/get-books-ready-for-accountant.yml"
answerUnits:
  - "AnswerBlock"
  - "KansoTake"
  - "DecisionSupport"
  - "ProofBoundary"
  - "SourceNotes"
  - "NextStep"
internalLinks:
  - "/resources/accountant-ready-books"
  - "/resources/bookkeeping/reconciliation"
externalSources: []
schema:
  - "Article"
  - "BreadcrumbList"
```

Allowed `jurisdiction` values:

```text
general
us-general
canada-general
state-specific
province-specific
not-applicable
```

Hard rule:

The engine may not publish state-specific, province-specific, payroll, sales
tax, deductibility, entity-treatment, or filing guidance unless the page is
high risk, grounded in primary sources, and passes final audit.

## Topic Scoring

Score each topic from 0 to 5, then apply weights.

| Dimension | Weight |
|---|---|
| ICP fit | 3 |
| pain intensity | 3 |
| buying intent | 3 |
| Kanso differentiation | 3 |
| artifact potential | 2 |
| AIEO citation potential | 2 |
| search demand | 2 |
| internal-link value | 1 |
| freshness requirement | 1 |
| risk level, inverted | 1 |

Default threshold: `>= 55 / 105`.

Veto rules:

- ICP fit below 3: reject
- Kanso differentiation below 3: reject
- distinct user job missing: reject
- artifact or decision support missing for Tier 1 or Tier 2: reject
- tax/legal/accounting risk cannot be bounded: reject or escalate
- duplicate/cannibalization risk unresolved: reject

Topics below threshold become support notes, glossary items, refresh ideas, or
are discarded.

## Content Pipeline

### 1. Topic Discovery

Inputs:

- Kanso canonical docs
- existing published pages
- keyword data
- competitor pages
- user pain map
- product roadmap
- Search Console queries once available
- Bing Webmaster Tools AI Performance once available
- AI answer engine citation gaps

Outputs:

- candidate topics
- pillar assignment
- intent classification
- estimated value
- difficulty
- originality requirement
- risk class
- required artifact
- canonical job mapping

### 2. Topic Scoring

The strategist scores topics using the weighted model and veto rules.

No article starts because a keyword exists.

### 3. Brief Creation

The brief is the contract for the article.

Required fields:

- title candidate
- slug candidate
- pillar
- tier
- reader job
- search intent
- AI-answer intent
- primary query
- secondary queries
- Kanso thesis
- required answer units
- required sections
- selected artifact ID
- internal links to include
- sources to use
- sources to avoid
- claims that need careful wording
- jurisdiction
- professional boundary
- conversion path
- publish/update priority

No article starts from "write about X." Every article starts from a brief.

### 4. Research Packet

The research packet gives the writer facts without letting the writer invent
authority.

Required fields:

- primary sources
- secondary sources
- competitor gaps
- definitions
- numbers and dates
- disputed or uncertain claims
- tax/legal/accounting boundaries
- source excerpts within copyright limits
- suggested examples

The researcher must prefer primary sources for accounting, tax, legal, search,
AI crawler, and platform claims.

### 5. Draft

The writer produces the article from the brief, research packet, artifact ID,
and product truth files.

Required properties:

- first answer within the opening 150 words
- clear Kanso point of view
- required answer units
- no filler intro
- useful artifact included or linked
- examples written for the ICP
- no claims beyond sources
- no invented statistics
- no fake citations
- no tax/legal advice

### 6. Headline And Metadata Pass

Outputs:

- final H1
- SEO title
- meta description
- slug
- social title
- social description
- Open Graph image prompt or asset requirement
- canonical path
- related pages

Rules:

- H1 must be literal and useful
- title must include the core query naturally
- slug must be short, durable, lowercase, and hyphenated
- no clickbait
- no year in slug unless the topic is inherently annual

### 7. SEO And AIEO Pass

SEO checks:

- intent match
- heading hierarchy
- internal links
- external source links
- schema eligibility
- canonical URL
- image alt text
- crawlability
- sitemap inclusion
- duplicate/cannibalization risk

AIEO checks:

- AnswerBlock present
- KansoTake present
- DecisionSupport present
- ProofBoundary present
- SourceNotes present
- NextStep present
- entity summary present when required
- extractable tables or lists
- clear entity names
- no vague pronouns where entity names matter
- snippet-safe wording
- stable summary near the end

### 8. Content Review

The reviewer acts as a hostile editor.

Reject if:

- the article could have appeared on any generic accounting blog
- the reader's actual job is not solved
- the article lacks artifact or decision-support value
- the Kanso point of view is absent
- the same page already exists
- the topic is outside ICP
- the page is mostly definitions with no decision support
- the article overclaims AI capability
- the article implies Kanso provides tax, legal, audit, or CPA advice

### 9. Tone Review

The tone reviewer rewrites or rejects generic AI writing.

Required:

- short openings
- specific nouns
- concrete examples
- direct claims
- visible boundaries
- practical next steps
- no hype
- no ornamental punctuation habits

### 10. Claim Audit

The claim auditor checks the claim manifest against sources and truth files.

Hard fail if:

- a claim is unsupported
- a source is stale
- a source does not say what the page says
- a claim crosses the page risk boundary
- a claim depends on current laws, prices, standards, or deadlines and lacks
  a current dated source

Hallucination circuit breaker:

If an article cites a specific tax form, filing deadline, GAAP standard, FASB
standard, IRS rule, CRA rule, payroll requirement, sales tax rule, or competitor
price, the auditor must verify that claim against an authoritative source during
final audit. If verification fails or is ambiguous, the article does not
publish.

### 11. Final Audit

The final audit decides whether publication is allowed.

Required checks:

- content schema validates
- metadata schema validates
- claim manifest validates
- all sources resolve
- all internal links resolve
- no unsupported factual claims
- no invented dates, prices, laws, or accounting standards
- no tax/legal/audit advice
- no product claims beyond truth files and canonical docs
- no contradiction with Kanso manifesto, vision, or wedge
- jurisdiction rules pass
- artifact ID resolves
- answer units are present
- entity summary is present when required
- sitemap/index generation passes
- build passes
- run log is written

Publication is automatic if all checks pass.

Escalation is required only if:

- a necessary claim cannot be verified
- the topic requires licensed professional judgment
- product truth is unclear
- sources disagree in a way that matters
- build or publish fails
- model/tool/provider credentials fail
- the audit cannot determine whether a page creates legal, tax, accounting, or
  product risk

### 12. Publish

The publisher:

- writes the article file
- writes or updates structured metadata
- writes or updates the claim manifest
- updates internal links if needed
- updates sitemap/index files
- runs formatter
- runs content validation
- runs typecheck, lint, and build when required
- commits to the configured branch
- publishes through the configured path
- submits changed URLs through IndexNow when configured
- records the run
- notifies only on success summary or failure escalation

No founder click is required.

## Deterministic Validation

AI reviews are not enough. The content engine must enforce deterministic checks.

Required validators:

- frontmatter schema validator
- claim manifest validator
- product truth resolver
- artifact resolver
- canonical job duplication checker
- source URL resolver
- internal link resolver
- forbidden claims and phrase checker
- jurisdiction/risk checker
- answer-unit checker
- sitemap generator/checker
- robots.txt checker
- path guard for autopublish
- build gate

The philosophy matches Kanso:

```text
AI drafts.
Deterministic checks enforce.
The system publishes only when proof exists.
```

## Release Modes

### Mode 0: Codex Prototype

Use before Hermes is configured.

- Codex acts as the Hermes pipeline
- first briefs, artifacts, and articles are created here
- skills are drafted from real runs
- validators are designed from failures
- no assumption that public autopublish exists yet

### Mode A: Burn-In Autopublish

Use while calibrating the machine.

- low cadence
- successful runs publish automatically
- founder approval is not a gate
- founder may review sampled output after publish or during calibration runs
- failures patch skills, validators, or truth files
- failures pause the specific item, not the whole engine

### Mode B: Full Autopublish

Use once burn-in quality is stable.

- scheduled pipeline runs
- successful articles publish directly
- refresh jobs run automatically
- metrics jobs feed new topics and updates
- founder sees exception reports, not chores

### Mode C: Draft-Only Emergency

Emergency fallback only.

This mode exists for infrastructure, legal, or quality incidents. It is not the
normal operating model.

## Least-Privilege Publishing

Skills are workflow instructions, not a security boundary.

Hermes agents should follow skills, but permissions and CI must contain blast
radius.

Recommended operating model:

1. canonical code and content live in this repo
2. Hermes runs on the Mac Mini in a dedicated clone or worktree
3. scheduled content agents can write only approved paths
4. CI rejects autopublish changes outside the allowlist
5. CI runs content validation, typecheck, lint, and build
6. passing autopublish changes merge/deploy automatically
7. failures produce an exception report

Initial autopublish allowlist:

```text
content/**
public/content/**
public/og/**
docs/content-runs/**
```

Possible allowlist after explicit implementation:

```text
src/content/**
src/lib/content/**
scripts/content/**
```

Forbidden for scheduled content agents unless a separate implementation sprint
authorizes it:

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

## Robots And AI Crawler Policy

Default posture:

- allow traditional search crawlers
- allow AI search/retrieval crawlers that can cite KansoBooks
- decide separately whether to allow training crawlers
- do not block snippets unless there is a specific legal reason
- keep important content available as server-rendered text

Recommended retrieval/search allowlist:

```txt
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Applebot
Allow: /
```

Training/grounding policy is a business decision:

```txt
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /
```

Decision moment:

- choose the first production training-crawler policy during Phase 2
- revisit after the first 20 public resources or after measurable AI citations
  begin

Important:

- `robots.txt` is not a security mechanism
- use `noindex`, authentication, or removal tools for pages that must not appear
  publicly
- crawler user agents and policies must be refreshed from official docs before
  implementation

Reference sources:

- `https://developers.openai.com/api/docs/bots`
- `https://docs.perplexity.ai/docs/resources/perplexity-crawlers`
- `https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler`
- `https://support.apple.com/en-ca/119829`
- `https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers`

## Indexing And AI Visibility Operations

On every publish, update, or deletion, the publisher must:

- regenerate `sitemap.xml`
- set accurate `lastmod` based on content modification time, not sitemap
  generation time
- reference `sitemap.xml` in `robots.txt`
- submit changed URLs through IndexNow once configured
- verify sitemap delivery in Bing Webmaster Tools
- verify indexing health in Google Search Console
- record ChatGPT referrals using `utm_source=chatgpt.com` when visible
- record Bing AI Performance citations when available
- maintain a benchmark prompt set for ChatGPT, Perplexity, Claude, Gemini, and
  Copilot

No page is fully live until it is:

- published
- in sitemap
- internally linked
- eligible for crawling
- monitored for impressions, clicks, and AI citations

Reference sources:

- `https://www.bing.com/indexnow/getstarted`
- `https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search`
- `https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview`

## Refresh Triggers

Refresh is not just monthly editing. It is triggered by signals.

### Age-Based Review

Default:

- Tier 1: every 90 days
- Tier 2: every 120 days
- Tier 3: every 180 days
- Tier 4 artifacts: cadence depends on risk class

High-risk content requires shorter review windows.

### Position Decay

Trigger refresh if:

- average position drops by 20 percent or more for the primary query cluster
- a page falls out of top 10 after previously ranking top 10
- a comparison page loses ranking to a materially updated competitor page

### Impression Or Citation Decay

Trigger refresh if:

- impressions drop by 30 percent or more over a comparable period
- AI citations drop materially after prior citation activity
- Search Console queries show a new intent the page does not answer
- Bing AI Performance grounding queries show ambiguity or missing coverage

### Source Staleness

Trigger refresh if:

- a competitor price source is older than 30 days
- a product capability changed
- a law, standard, crawler policy, platform doc, or official guidance changed
- a source URL breaks or redirects to irrelevant content

## Metrics

Leading metrics:

- indexed pages
- pages with impressions
- impressions by pillar
- clicks by pillar
- average position by query cluster
- internal-link coverage
- pages with answer units
- artifact downloads or interactions
- AI citations where measurable

Quality metrics:

- audit failure rate
- rewrite rate
- source failure rate
- broken-link rate
- duplicate/cannibalization flags
- stale-page count
- pages refreshed on schedule
- claim-manifest failure rate
- validator failure rate

Business metrics:

- organic waitlist/download conversions
- conversion by pillar
- comparison-page conversion
- template conversion
- branded search lift
- accountant/referral mentions

## First 90-Day Content Plan

The first 90 days should be artifact-led.

Publish durable assets before articles that reference them.

### Foundational Hubs

1. Accountant-ready books
2. AI bookkeeping with proof
3. Small-business bookkeeping basics
4. Bookkeeping software alternatives
5. Accountant distribution

### First Sequence

1. `/resources/accountant-ready-books`
2. `/resources/templates/accountant-package-checklist`
3. `/resources/templates/monthly-books-readiness-checklist`
4. `/resources/get-books-ready-for-accountant`
5. `/resources/what-to-send-accountant-tax-time`
6. `/resources/how-to-know-books-are-done`
7. `/resources/categorized-transactions-are-not-finished-books`
8. `/resources/reconciliation-explained`
9. `/resources/ai-bookkeeping-with-proof`
10. `/resources/templates/ai-bookkeeping-validation-checklist`
11. `/comparisons/quickbooks-alternatives`
12. `/resources/sample-accountant-package`

### Additional Early Articles

- Bench alternatives
- cash basis accounting for small business owners
- chart of accounts for consultants and agencies
- P&L vs balance sheet vs trial balance
- what a clean client bookkeeping package looks like
- how accountants can review AI-drafted bookkeeping safely

## Cadence

Burn-in cadence:

- 1 hub or artifact per week
- 1 high-quality article per week
- 1 refresh or internal-link improvement per week once pages exist

Full-autopublish cadence:

- 2 to 3 articles per week only if all gates remain green
- 1 artifact or template every 2 weeks
- monthly decay review
- quarterly topic map rebuild

The system must never publish faster than it can maintain quality.

## Implementation Sequence

### Phase 1: Strategy And Contracts

- create this phase doc
- create content vision doc
- create implementation doc
- define product truth files
- define claim manifest schema
- define content metadata schema
- define artifact schema
- define canonical job schema
- define escalation policy
- define initial crawler policy

### Phase 2: Content Infrastructure

- add content directory
- add MDX or structured markdown pipeline
- add resource routes
- add comparison routes
- add glossary routes
- add template/artifact routes
- add sitemap generation with accurate `lastmod`
- add RSS/feed
- add JSON-LD support
- add internal-link helpers
- add build-time content validation
- add claim resolver
- add source resolver
- add forbidden-claim linter
- add path guard
- add `llms.txt` generation

### Phase 3: Skill System

- create canonical Kanso content skills
- add examples and anti-examples
- add research packet templates
- add brief templates
- add article templates
- add artifact templates
- add claim-audit checklist
- add final-audit checklist
- wire Hermes external skill directory or repo tap strategy

### Phase 4: Codex-As-Hermes First Runs

- run the first topic through the full pipeline in this repo
- create first artifact
- create first article
- record failures and missing validators
- patch skills and schemas
- repeat until the output feels Kanso-native

### Phase 5: Local Hermes Runner

- configure Hermes profiles on the Mac Mini
- configure model/provider routing
- configure toolsets per profile
- configure dedicated clone/worktree
- configure scheduled jobs
- configure run logs
- configure exception alerts
- configure publish credentials with least privilege
- dry-run the pipeline

### Phase 6: Burn-In Autopublish

- publish foundational hubs and first artifacts
- keep cadence low
- record every failure
- patch skills after failures
- add metrics ingestion
- start refresh loop

### Phase 7: Full Autopublish

- increase cadence only if audit metrics stay healthy
- use metrics to generate new topics
- add more comparison pages
- add more templates/tools
- add AI answer monitoring
- add decay-based refresh jobs

## Definition Of Done

This phase is done when:

- KansoBooks has a structured content system in the repo
- product truth files exist
- claim manifests exist
- artifact library exists
- content schemas validate at build time
- deterministic validators enforce the gates
- Hermes has separate skills for every major pass
- Hermes can generate briefs from topic candidates
- Hermes can research, draft, optimize, audit, and publish without founder
  approval
- successful runs publish automatically
- failed runs escalate with precise reasons
- content pages are indexed, linked, schema-backed, and refreshable
- the first 90-day content plan is live or scheduled
- metrics feed future topic generation and refresh decisions

## Non-Negotiables

- No founder publishing gate.
- No AI slop.
- No generic accounting encyclopedia.
- No tax/legal/audit advice.
- No claims that AI is financial truth.
- No cloud-books implication.
- No content outside the wedge unless it supports buying intent.
- No publishing without automated audit.
- No AI-only final safety net.
- No writer-invented accounting artifacts.
- No velocity increase without quality metrics.

## North Star

```text
KansoBooks does not win by publishing more accounting content.

It wins by becoming the most useful public source for one job:

Get the books ready.
Know what is still uncertain.
Send the accountant a package that explains itself.

Every page must make that job easier.
Every claim must be provable.
Every automation must be bounded.
Every published asset must be worth maintaining.
```
