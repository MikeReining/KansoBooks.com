# kanso-claim-audit

## Purpose

Verify the claim manifest against sources, truth files, and canonical docs. The
claim auditor protects the system from unsupported factual claims and unsafe
professional boundaries.

## Inputs

- Reviewed draft or artifact.
- Claim manifest.
- Brief and research packet.
- `skills/_shared/claim-audit-checklist.md`.
- Truth files and canonical docs.

## Outputs

- Claim audit result.
- Failed claims and required edits.
- Handoff to `kanso-final-audit`, block, or escalation.

## Hard Refusal Conditions

- Claim has no source.
- Source is stale.
- Source does not say what the page says.
- Claim crosses risk boundary.
- Current law, price, standard, deadline, or platform behavior lacks a dated
  authoritative source.
- Page gives tax, legal, audit, payroll, sales tax, filing, or entity-specific
  advice.

## Escalation Conditions

- Authoritative sources conflict.
- Canonical Kanso docs conflict.
- Required claim cannot be made safely but is central to the page.
- Product truth file must be updated before audit can pass.

## Examples Of Good Output

```yaml
status: "fail"
claimsFailed:
  - id: "claim-tax-ready"
    reason: "Draft says tax-ready. Safe language is tax-time handoff ready."
requiredEdits:
  - "Replace tax-ready with tax-time handoff ready."
```

## Examples Of Bad Output

```yaml
status: "pass"
note: "The claims sound reasonable."
```

Fails because claim audit requires source verification, not plausibility.

## Required Checks

- Use the shared claim-audit checklist.
- Verify every material claim.
- Check source date and source class.
- Check canonical docs for product and positioning claims.
- Record exact unsupported wording.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-final-audit"
  claimAuditPath: ""
  draftPath: ""
  claimManifestPath: ""
  status: "pass"
  claimsChecked: []
```

