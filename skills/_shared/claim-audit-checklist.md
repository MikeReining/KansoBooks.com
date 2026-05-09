# Claim Audit Checklist

Use this checklist before any content can move from `optimized` to `audited`.

## Required Inputs

- Draft or artifact path.
- Claim manifest path.
- Brief and research packet.
- Product truth files in `content/_truth/`.
- Canonical docs named by the brief.
- External sources for current, legal, tax, accounting, competitor, pricing, or
  platform claims.

## Hard Fail Checks

- Claim has no source.
- Source does not support the exact wording.
- Source is stale for the claim class.
- Current law, price, standard, deadline, or platform behavior lacks a dated
  authoritative source.
- Draft presents tax, legal, audit, payroll, sales tax, filing, or entity
  treatment as advice.
- Draft implies KansoBooks stores books in the cloud.
- Draft says KansoBooks replaces accountants.
- Draft says AI is financial truth.
- Draft says KansoBooks guarantees correctness, compliance, or audit outcomes.
- Draft contradicts `docs/KansoBooksManifesto.md`,
  `docs/KansoBooksVision.md`, or `docs/KansoBooksWedge.md`.

## Source Preference

Use primary sources for:

- tax, legal, audit, payroll, sales tax, filing, standards, or regulations
- competitor pricing and capability claims
- platform policies
- crawler and indexing rules

Use Kanso truth files or canonical docs for:

- product capabilities
- local-first positioning
- AI drafting and proof boundaries
- accountant handoff posture
- pricing posture until public pricing is finalized

## Output

```yaml
claimAudit:
  contentId: ""
  status: "pass|fail|escalate"
  checkedAt: ""
  checkedBy: "kanso-claim-audit"
  claimsChecked: []
  claimsFailed: []
  requiredEdits: []
  escalation:
    needed: false
    reason: ""
    narrowDecisionNeeded: ""
  handoffTo: "kanso-final-audit"
```

