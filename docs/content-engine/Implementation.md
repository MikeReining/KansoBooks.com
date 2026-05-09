# Autonomous Content Engine Implementation

**Status:** Phase 1 contract seed
**Authority:** Implementation guide for content-engine buildout. Subordinate to
`docs/phases/AutonomousContentEngine.md`.

## Phase 1 Output

Phase 1 establishes contracts only. It does not publish pages.

Live contract roots:

```text
content/_truth/
content/_schemas/
content/_data/canonical-jobs.yml
docs/content-engine/
```

## Build Order

1. Keep product truth in `content/_truth/`.
2. Validate page metadata against `content/_schemas/content-metadata.schema.json`.
3. Validate claim manifests against `content/_schemas/claim-manifest.schema.json`.
4. Validate artifacts against `content/_schemas/artifact.schema.json`.
5. Validate canonical jobs against `content/_schemas/canonical-job.schema.json`.
6. Add build-time validators before any public content is published.
7. Add routes only after content validation exists.

## Publication Rule

Publication is automatic only when all deterministic validators pass. The first
public content runs must still use the same state machine, claim manifests, and
run logs that Hermes will later use unattended.

## Current Non-Goals

- no public resource route
- no article publication
- no headless CMS
- no credential or scheduler setup
- no decision on training-crawler access
