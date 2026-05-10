# KansoBooks Topic Inventory

**Status:** Active editorial inventory.
**Purpose:** Prevent duplicate articles and keep the one-article-per-day queue
grounded in real reader jobs.

**Source of truth:** `content/_data/topic-inventory.yml`.

This Markdown file is the human-readable report. Keep it aligned manually for
now; later it can be generated from the YAML inventory.

## How To Use

Every article idea must enter this inventory before drafting.

Required checks:

- one primary long-tail query
- one canonical job from `content/_data/canonical-jobs.yml`
- one reader fear from `docs/content-engine/CopyGuide.md`
- one distinct angle that does not duplicate an existing page
- one artifact, table, checklist, or decision aid when the article is tier 1 or
  tier 2
- one planned internal link target

Statuses:

- `published`: live content
- `drafted`: written but not live
- `candidate`: accepted for future drafting
- `needs-research`: useful idea, but source/angle/search intent is unclear
- `rejected-duplicate`: merged into an existing page

## Published

| Topic | URL | Canonical job | Primary query | Reader fear | Distinct angle | Next expansion |
|---|---|---|---|---|---|---|
| How to Know Your Books Are Done | `/resources/how-to-know-books-are-done` | `understand-books-readiness` | how to know books are done | Are my books actually done? | Readiness checklist before accountant handoff | Add examples by business model later |
| Accountant-Ready Books | `/resources/accountant-ready-books` | `prepare-books-for-accountant` | accountant-ready books | Will my accountant have what they need? | Package contents and handoff standard | Add package examples later |
| AI Bookkeeping With Proof | `/resources/ai-bookkeeping-with-proof` | `validate-ai-bookkeeping-work` | AI bookkeeping with proof | Can I trust AI with my books? | AI drafts, validation proves, user approves | Add AI validation checklist article later |
| Local-First Bookkeeping vs Cloud Accounting | `/comparisons/local-first-bookkeeping-vs-cloud-accounting` | `choose-bookkeeping-system` | local-first bookkeeping vs cloud accounting | Which setup gives me more confidence? | System choice by correctness, time, cost, tax-time readiness, and handoff | Add QuickBooks-specific migration/comparison later |

## Drafted

| Topic | URL | Canonical job | Primary query | Reader fear | Duplicate risk | Required before publish |
|---|---|---|---|---|---|---|
| Bookkeeping Evidence Index Template | `/templates/bookkeeping-evidence-index-template` | `use-handoff-template` | bookkeeping evidence index template | How do I organize proof for my accountant? | Overlaps with accountant package checklist | Make artifact visible/downloadable and add template presentation |

## Candidate Queue

| Priority | Topic | Target URL | Canonical job | Primary long-tail query | Reader fear | Distinct angle | Artifact / decision aid |
|---|---|---|---|---|---|---|---|
| 1 | Monthly Bookkeeping Checklist For Small Business | `/resources/monthly-bookkeeping-checklist-small-business` | `understand-books-readiness` | monthly bookkeeping checklist for small business | How do I keep up every month? | Monthly operating checklist, not year-end handoff | Monthly close checklist |
| 2 | What To Send Your Accountant For Taxes | `/resources/what-to-send-accountant-for-taxes` | `prepare-books-for-accountant` | what to send accountant for taxes small business | Will tax time expose something I missed? | General handoff package, not tax advice | Tax-time handoff list |
| 3 | How To Check If Bookkeeping Is Correct | `/resources/how-to-check-if-bookkeeping-is-correct` | `understand-books-readiness` | how to check if bookkeeping is correct | Are my numbers right? | Owner-facing correctness checks | Correctness checklist |
| 4 | AI Bookkeeping Mistakes To Review | `/resources/ai-bookkeeping-mistakes-to-review` | `validate-ai-bookkeeping-work` | AI bookkeeping mistakes to review | Can AI quietly get my books wrong? | Concrete review risks and safe checks | AI review checklist |
| 5 | Bookkeeping Cleanup Before Tax Season | `/resources/bookkeeping-cleanup-before-tax-season` | `prepare-books-for-accountant` | bookkeeping cleanup before tax season | Can I get this done before tax time? | Cleanup order and triage | Cleanup triage table |
| 6 | QuickBooks Alternative For Accountant-Ready Books | `/comparisons/quickbooks-alternative-accountant-ready-books` | `choose-bookkeeping-system` | QuickBooks alternative for accountant-ready books | Is there a simpler way than QuickBooks? | Compare outcome and handoff, not feature parity | Decision table |
| 7 | Small Business Books Not Reconciled | `/resources/small-business-books-not-reconciled` | `understand-books-readiness` | what if my books are not reconciled | Am I in trouble if reconciliation is off? | Explain what reconciliation status means generally | Reconciliation status table |
| 8 | What Is An Accountant Package | `/resources/what-is-an-accountant-package` | `prepare-books-for-accountant` | what is an accountant package bookkeeping | What exactly should I send? | Plain definition with package anatomy | Package anatomy table |
| 9 | Bookkeeping Review Checklist For Non-Accountants | `/resources/bookkeeping-review-checklist-non-accountants` | `understand-books-readiness` | bookkeeping review checklist for non accountants | Can I do this myself? | Owner review only, not accountant work | Owner review checklist |
| 10 | Local Bookkeeping Software For Small Business | `/comparisons/local-bookkeeping-software-small-business` | `choose-bookkeeping-system` | local bookkeeping software for small business | Do I need cloud accounting? | Local software category explainer | Choice matrix |

## Rejected Or Merge Candidates

| Idea | Reason | Merge target |
|---|---|---|
| What is books readiness? | Too close to existing readiness article unless narrowed | `/resources/how-to-know-books-are-done` |
| Accountant-ready checklist | Too close to package checklist unless delivered as artifact | `/resources/accountant-ready-books` |
| Is AI bookkeeping safe? | Too broad without proof/review angle | `/resources/ai-bookkeeping-with-proof` |
