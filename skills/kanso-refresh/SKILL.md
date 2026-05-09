# kanso-refresh

## Purpose

Identify and process content that needs updating because claims, sources,
metrics, search intent, product truth, or freshness requirements changed.

## Inputs

- Published content inventory.
- Claim manifests and refresh cadences.
- Metrics reports.
- Product truth updates.
- Source freshness requirements.

## Outputs

- Refresh-needed decision.
- Refresh brief or no-change report.
- Handoff to `kanso-content-brief`, `kanso-research-packet`, or
  `kanso-final-audit` depending on change scope.

## Hard Refusal Conditions

- Refresh would update tax/legal/audit-sensitive claims without current primary
  sources.
- Refresh would broaden product claims beyond truth files.
- Refresh would silently change professional boundary.
- Refresh would publish without final audit.

## Escalation Conditions

- Product truth changed materially.
- Competitor, pricing, legal, or platform source conflict appears.
- Existing page has unsafe claims that require policy decision.

## Examples Of Good Output

```yaml
contentId: "get-books-ready-for-accountant"
decision: "refresh"
reason: "Next review date reached and internal link map changed."
scope: "metadata, internal links, source date check"
```

## Examples Of Bad Output

```yaml
decision: "rewrite"
reason: "Traffic is down, add new tax tips."
```

Fails because tax tips are outside the boundary.

## Required Checks

- Compare last reviewed and next review.
- Check stale claims.
- Check source freshness.
- Check metrics decay.
- Preserve canonical job and proof boundary.
- Route through final audit before publish.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-research-packet"
  contentId: ""
  refreshReason: ""
  scope: ""
  staleClaims: []
  requiredChecks: []
```

