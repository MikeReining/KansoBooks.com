# Archive Close Gate

**Status:** Canonical / Binding

Makes phase-doc archive moves deterministic in autonomous, agent-first
execution. Platform-agnostic (Cursor, Codex, Claude Code, CI).

## Trigger

Required when a change set moves or adds a file under `docs/phases/archived/` or
`docs/archive/` as part of closing a target phase doc.

## Green definition (authoritative)

Archive is allowed only when, for the exact commit being archived:

1. the scope-routed mechanical gate below is fully green, and
2. for code-touching closes, the target phase doc `## Closeout` carries the
   latest Deslop verdict and a Code Audit `CLEAN` verdict
   (`docs/operations/Deslop.md`, `docs/operations/Code-Audit.md`).

No partial or inferred "green" is accepted.

## Pre-move link sweep (binding)

Before moving a target phase doc into archive:

1. Grep the live operating surface for inbound links to that doc path:
   `AGENTS.md`, `docs/operations/`, `docs/phases/README.md`, `docs/README.md`,
   `config/codex/`, and `scripts/`.
2. Promote any durable truth into the owning live doc and remove or repoint the
   link first.
3. Repoint surviving references to the new archive path.

A doc still cited by `AGENTS.md` or a script as an **active** reference MUST
NOT be archived until that pointer is moved to a live owner.

Never archive:

- `docs/operations/Execution-Playbook.md`
- `docs/phases/README.md`
- a still-open umbrella doc
- an active strategy doc that still governs future implementation

## Mechanical gate (scope-routed)

Run from repo root. Pick the smallest set that covers the close:

- Docs-only close (`docs/**`, no scripts/content changes):
  - review only; no build required
- Code or content changes also in the close:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run content:validate`
- App or export changes:
  - `npm run build`

## Auto-remediation rule (binding)

When the gate is red during an archive close, do NOT stop and ask the founder
immediately. Run an auto-remediation loop:

1. diagnose the first failing check,
2. apply the smallest compliant fix,
3. rerun required checks,
4. repeat until green.

Budget: up to 3 fix cycles. Escalate only for non-mechanical blockers per the
Human stop conditions in `docs/operations/Execution-Playbook.md`.

## Archive banner

Each archived doc gets this banner immediately under its H1:

```text
> **Archived YYYY-MM-DD — historical / non-authoritative.** Live status lives in
> `docs/phases/README.md`. Do not pick sprints or implement from this file.
```

When moving to `docs/archive/`, also preserve the full banner contract in
`docs/archive/README.md`.

## Evidence requirement

The Closer note (target phase doc `## Closeout`) MUST record:

- gate mode used and exact commands run,
- final green result,
- any skipped command with an explicit reason,
- the archived paths and the matching batch entry added to
  `docs/archive/README.md` when that index is updated.
