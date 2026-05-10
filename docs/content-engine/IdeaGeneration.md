# KansoBooks Idea Generation

**Status:** Active content planning workflow.
**Purpose:** Turn limited topic intuition into a daily queue of specific,
non-duplicative, long-tail article ideas.

## Goal

Generate one publishable article candidate per day, with enough backlog to scale
later.

A good idea is not just a keyword. It is:

```text
reader fear + long-tail query + canonical job + distinct angle + useful artifact
```

## Seed Sources

Use these sources before inventing topics:

- `content/_data/topic-inventory.yml`
- `docs/content-engine/TopicInventory.md` as the human-readable mirror
- `content/_data/canonical-jobs.yml`
- `docs/content-engine/CopyGuide.md`
- existing article `primaryQuery` and `secondaryQueries`
- KansoBooks product/vision docs
- founder notes and objections from reviews
- autocomplete-style variants around "how do I", "what to send", "before tax
  time", "is my bookkeeping", "bookkeeping checklist", "QuickBooks
  alternative", and "AI bookkeeping"
- Search Console, analytics, and site-search data when available

## Long-Tail Pattern Library

Generate candidate queries by combining:

Reader fear:

- are my numbers correct
- can I do bookkeeping myself
- what if my books are wrong
- get books ready for tax time
- what to send my accountant
- bookkeeping cleanup
- AI bookkeeping mistakes

Business context:

- small business
- consultant
- agency
- creator
- SaaS
- ecommerce
- real estate operator
- 1099

Artifact or outcome:

- checklist
- template
- package
- review
- cleanup
- reconciliation
- accountant-ready books
- tax-time handoff

Examples:

```text
monthly bookkeeping checklist for small business
what to send accountant for taxes small business
bookkeeping review checklist for non accountants
how to check if bookkeeping is correct
AI bookkeeping mistakes to review
QuickBooks alternative for accountant-ready books
```

## Daily Topic Selection

1. Pick 10 raw candidates from the pattern library or live data.
2. Remove anything already covered in `TopicInventory.md`.
3. Assign each candidate to exactly one canonical job.
4. Score each candidate:

```yaml
readerPain: 1-5
searchSpecificity: 1-5
kansoDifferentiation: 1-5
artifactPotential: 1-5
duplicateRisk: 1-5 # lower is better
publishEase: 1-5
```

5. Choose the highest-scoring candidate with duplicate risk `<= 2`.
6. Add it to `content/_data/topic-inventory.yml` before drafting.
7. Write the run `topic-score.yml`.

## Duplicate Rules

Reject or merge when:

- the same reader would take the same next action
- the same artifact would answer both topics
- the article would share the same primary query and canonical job
- the only difference is wording, not intent

Split when:

- the reader fear differs
- the artifact differs
- the business context creates a genuinely different checklist
- the comparison changes the buying decision

## Scaling To More Than One Article Per Day

Do not scale drafting before the backlog has:

- at least 30 candidate topics
- at least 5 topics per canonical job
- duplicate-risk notes for every candidate
- artifact requirements for tier 1 and tier 2 topics
- internal link plan for every candidate

Once the backlog exists, daily production can run in batches:

- one new article
- one refresh/improvement of an existing article
- one artifact/template expansion
- one topic inventory cleanup

## Missing Inputs To Add Later

- Search Console query exports
- rankings and click data
- competitor SERP snapshots for high-value comparisons
- customer/support questions
- waitlist survey answers
- accountant interview notes
- internal product telemetry once available
