# kanso-topic-scoring

## Purpose

Score candidate topics before any article starts. Reject keyword variants,
generic accounting filler, and topics that do not help the reader answer:
Am I done? Is this right? Can I prove it?

## Inputs

- Candidate topic, query, or content gap.
- `content/_data/canonical-jobs.yml`.
- Existing content inventory.
- Kanso canonical docs and truth files.
- Optional keyword, competitor, Search Console, or AI-answer data.

## Outputs

- Weighted score out of 105.
- Veto decision.
- Pillar, tier, intent, risk, canonical job, and artifact requirement.
- Handoff to `kanso-content-brief`, reject, or escalate.

## Hard Refusal Conditions

- ICP fit below 3.
- Kanso differentiation below 3.
- No distinct reader job.
- Topic is a duplicate or cannibalizes an existing page.
- Tier 1 or Tier 2 topic lacks artifact or decision-support potential.
- Topic would require tax, legal, audit, payroll, sales tax, filing, or
  entity-specific advice to be useful.
- Topic implies cloud books, accountant replacement, or AI as financial truth.

## Escalation Conditions

- Canonical docs conflict on product or trust posture.
- A high-value topic needs a new approved artifact type.
- Risk cannot be bounded without changing content policy.
- Topic requires a new autonomous write path or publishing permission.

## Examples Of Good Output

```yaml
topicId: "accountant-package-checklist"
score: 83
decision: "brief"
pillar: "templates-tools-artifacts"
tier: 1
readerJob: "Know what to send the accountant and what still needs explanation."
operatingQuestion: "Am I done?"
artifactRequired: "accountant-package-checklist"
whyKanso: "Frames handoff as proof, evidence, and unresolved decisions."
```

## Examples Of Bad Output

```yaml
topicId: "what-is-bookkeeping"
decision: "brief"
why: "Large keyword."
```

Fails because it has no distinct Kanso proof angle or artifact requirement.

## Required Checks

- Apply the scoring weights from `docs/phases/AutonomousContentEngine.md`.
- Check canonical job uniqueness.
- Check existing content for duplicates.
- Check forbidden claims and risk boundaries.
- Confirm one of the three operating questions is served.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-content-brief"
  topicId: ""
  score: 0
  pillar: ""
  tier: 1
  readerJob: ""
  canonicalJob: ""
  risk: ""
  artifactRequired: ""
  vetoesCleared: []
  notes: []
```

