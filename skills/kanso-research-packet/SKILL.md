# kanso-research-packet

## Purpose

Build a source-backed research packet so writers do not invent authority.
Prefer primary sources for current, legal, tax, accounting, platform,
competitor, pricing, and standards claims.

## Inputs

- Approved brief.
- Canonical Kanso docs and truth files.
- External source requirements.
- Shared research packet template.

## Outputs

- Research packet with sources, definitions, numbers, dates, uncertain claims,
  risk boundaries, competitor gaps, and writer warnings.
- Handoff to `kanso-article-draft` or escalation.

## Hard Refusal Conditions

- Required source cannot be found.
- Source conflicts cannot be resolved.
- Current claim lacks a dated source.
- Source does not support the proposed claim.
- Research would require tax, legal, audit, payroll, sales tax, filing, or
  entity-specific advice.

## Escalation Conditions

- Primary sources disagree.
- Product truth files are stale or incomplete.
- Competitor pricing or platform policy has changed materially.
- The safe version of the claim weakens the article below usefulness.

## Examples Of Good Output

```yaml
definitions:
  - term: "reconciliation"
    safeDefinition: "A check that book balances agree with external statements or records."
    source: "approved accounting source or Kanso truth note"
writerWarnings:
  - "Do not say reconciled books guarantee tax readiness."
```

## Examples Of Bad Output

```yaml
numbersAndDates:
  - "Most small businesses make bookkeeping mistakes."
source: "common knowledge"
```

Fails because vague statistics need a source or must be removed.

## Required Checks

- Record date checked for external sources.
- Keep excerpts short and within copyright limits.
- Separate facts from Kanso thesis.
- Mark every uncertain claim.
- State tax, legal, audit, and accounting boundaries.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-article-draft"
  packetPath: ""
  briefId: ""
  approvedSources: []
  forbiddenClaims: []
  uncertainClaims: []
  professionalBoundary: ""
```

