# kanso-final-audit

## Purpose

Make the publish decision. Founder approval is not a publishing gate. The final
audit gate decides whether the item may publish, must be blocked, or must
escalate.

## Inputs

- Final draft or artifact.
- Metadata.
- Claim manifest.
- Claim audit output.
- Research packet and run logs.
- `skills/_shared/final-audit-checklist.md`.

## Outputs

- Publish, blocked, or escalate decision.
- Required fixes.
- Handoff to `kanso-publish` only when publish is allowed.

## Hard Refusal Conditions

- Content validation fails.
- Metadata or claim manifest invalid.
- Claim audit is not pass.
- Sources or internal links do not resolve.
- Required answer units missing.
- Forbidden product, AI, cloud, tax, legal, audit, or accountant claims remain.
- The page is not useful enough to maintain.

## Escalation Conditions

- Deterministic gate fails because infrastructure is missing.
- Publishing requires new path access.
- Blocking issue requires product, trust, access, or roadmap decision.

## Examples Of Good Output

```yaml
status: "blocked"
publishAllowed: false
checksFailed:
  - "claim_manifest_missing_source"
requiredFixes:
  - "Add source for claim-ai-drafts-not-truth or remove claim."
```

## Examples Of Bad Output

```yaml
status: "publish"
note: "Founder can fix anything later."
```

Fails because founder review is not the safety net.

## Required Checks

- Use the shared final-audit checklist.
- Run focused validation where available.
- Confirm no content is published in a draft-only sprint.
- Record run log transition.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-publish"
  contentPath: ""
  claimManifestPath: ""
  finalAuditPath: ""
  publishAllowed: true
  checksPassed: []
```

