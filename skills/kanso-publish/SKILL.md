# kanso-publish

## Purpose

Publish only content that final audit allows. This skill is dormant during
Phase 3 because this sprint must not publish content.

## Inputs

- Final audit output with `publishAllowed: true`.
- Content path, claim manifest, metadata, and run log.
- Approved publish mode and allowlist.

## Outputs

- Published content commit or publish report.
- Indexing and sitemap notes.
- Handoff to `kanso-metrics-review`.

## Hard Refusal Conditions

- Final audit missing or not pass.
- Current sprint forbids publishing.
- Changed files exceed the approved content allowlist.
- Validation, typecheck, lint, or build gate fails when required.
- Publish would require founder approval as a manual editorial gate.

## Escalation Conditions

- Credentials, CI, deployment, branch protection, or platform access fails.
- Publish requires new write paths.
- Canonical URL collision.

## Examples Of Good Output

```yaml
status: "blocked"
reason: "Phase 3 forbids publishing. Skill infrastructure only."
```

## Examples Of Bad Output

```yaml
status: "published"
reason: "The draft looked good enough."
```

Fails because publication requires final audit and allowed sprint scope.

## Required Checks

- Confirm final audit pass.
- Confirm sprint publish mode.
- Run content validation and path guard.
- Record publish run log.
- Never publish without automated audit.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-metrics-review"
  contentId: ""
  url: ""
  publishedAt: ""
  checksRun: []
  indexingTasks: []
```

