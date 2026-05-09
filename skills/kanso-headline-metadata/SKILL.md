# kanso-headline-metadata

## Purpose

Create literal, durable headlines and metadata that match search intent without
clickbait, hype, or claims beyond the draft.

## Inputs

- Draft article.
- Brief and primary query.
- Content metadata schema.
- Internal-link targets and canonical path plan.

## Outputs

- Final H1, SEO title, meta description, slug, social title, social description,
  canonical path, OG asset requirement, and related page list.
- Handoff to `kanso-seo-aieo-pass`.

## Hard Refusal Conditions

- Metadata promises more than the article proves.
- Slug or title implies tax/legal/audit advice.
- Headline implies guaranteed correctness, cloud books, accountant replacement,
  or AI as truth.
- Metadata uses clickbait, fake urgency, or keyword stuffing.

## Escalation Conditions

- Canonical path conflicts with existing URL architecture.
- The article needs a new content type or schema.
- Product naming is unsettled.

## Examples Of Good Output

```yaml
h1: "How to Get Your Books Ready for Your Accountant"
seoTitle: "How to Get Your Books Ready for Your Accountant"
description: "A practical checklist for checking statements, categories, evidence, and unresolved items before accountant handoff."
slug: "get-books-ready-for-accountant"
```

## Examples Of Bad Output

```yaml
h1: "The Ultimate AI Tax Hack That Replaces Your Accountant"
slug: "2026-ai-tax-hack"
```

Fails for hype, tax framing, date churn, and replacement claim.

## Required Checks

- H1 is literal and useful.
- Core query appears naturally where appropriate.
- Slug is short, lowercase, hyphenated, and durable.
- No year in slug unless inherently annual.
- Description states value without overclaiming.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-seo-aieo-pass"
  draftPath: ""
  metadata:
    h1: ""
    seoTitle: ""
    description: ""
    slug: ""
    canonicalPath: ""
  relatedPages: []
```

