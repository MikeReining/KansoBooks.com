# Code Audit ritual

**One readonly structural verdict per sprint, by a separate subagent.**
Platform-agnostic (Cursor, Codex, Claude Code, CI).

Runs at sprint closeout **after** the Deslop pass. Spawned as a dedicated lane by
`docs/operations/Execution-Playbook.md` § Closeout. The audit is **not** the end
of the work: a `REFACTOR REQUIRED` or `INCONCLUSIVE` verdict routes back to the
Task 1 implementer in the **same sprint** until the verdict is `CLEAN`.

## When it fires (binding)

After the Deslop pass, before any of:

1. a sprint or slice asking the founder to smoke,
2. a sprint closeout commit (Closer step),
3. a phase-doc archive (`docs/operations/Archive-Close-Gate.md`).

Same ritual in all three cases. A sprint that bypasses the ritual is not
closeable.

## The three-turn ritual

The implementer is the **parent**. The implementer does NOT audit its own work —
a separate **readonly** subagent does. If spawning is unavailable, the worker
ledger MUST say why.

### Turn 1 — parent collects evidence

In one message, collect in parallel:

- **Diff:** `git diff <base>...HEAD` for the sprint (name the base explicitly;
  `main` unless the sprint targets a different branch).
- **Changed files:** full contents of every changed non-generated file. Skip
  generated export artifacts, lockfiles, and bulk binary assets. For any changed
  React component, content loader, route, or script, also include its one-hop
  callers (limit 3) so cross-file responsibility is visible.

### Turn 2 — readonly audit subagent (cold eyes)

Spawn a readonly subagent with the diff + changed-file contents and these rules:
apply only the § rubric below; do not spawn nested subagents; do not edit files;
do not soften findings; structural findings first, hygiene second; if a needed
file is missing, return `INCONCLUSIVE` and name the gap.

### Turn 3 — parent acts on the verdict

| Verdict | Parent action |
| --- | --- |
| **CLEAN** | Append verdict to the target phase doc `## Closeout` → `### Verdict log`. Then closeout may proceed. |
| **REFACTOR REQUIRED** | Implement every finding now, same sprint; re-run Deslop then Code Audit. Loop until `CLEAN`. |
| **INCONCLUSIVE** | Collect the missing evidence and re-run Turn 2. Never stamp `CLEAN` to escape `INCONCLUSIVE`. |

Only a `CLEAN` entry authorizes founder smoke or closeout.

## The rubric (five checks)

Apply in order. Stop at the first structural failure if needed; otherwise record
findings cumulatively.

### Check 1 — One job per file

Name each changed file's job in one sentence without "and." A file that cannot be
described in one sentence MUST be split before closeout. Watch for: a route or
script owning N+1 unrelated modes; a component with K+ conditional sub-panels;
a module spanning unrelated domains.

### Check 2 — No half extractions

For any new helper/module created or grown: confirm the original caller **lost**
the extracted responsibility. A helper that exists without reducing its caller is
a half-extraction and MUST be completed or reverted.

### Check 3 — No parallel content truth

Public page content, frontmatter, claim manifests, and export metadata MUST flow
from the content system and validation scripts — not hardcoded duplicates in
templates or one-off route files. Forbidden: a template embedding copy that
contradicts Markdown frontmatter; a new public path with no inventory outcome.

### Check 4 — No silent fallbacks

For any new router/branch in TS: no catch-all that hides a real error behind
generic copy. Forbidden: swallowing content load failures without logging or
validation failure; mapping distinct validation errors to the same user-facing
string without an explicit terminal.

### Check 5 — Cross-surface flow has proof

If the sprint introduces or modifies a flow crossing two or more surfaces
(content draft → validate → publish, article shell → preview → sitemap, webhook
→ control-plane write → entitlement read), a test or scripted validation MUST
cover the full flow. If absent, add it in the same sprint before close. Founder
smoke is verification that follows the audit, not a substitute for it.

## Verdict template (append to `## Closeout` → `### Verdict log`)

```text
## Audit verdict

Status: CLEAN | REFACTOR REQUIRED | INCONCLUSIVE
Sprint: <phase doc id + slice id>
Base: <git base used for diff>
Audited at: <ISO date>
Files audited: <N hand-authored, M skipped as generated>

### Findings (structural first)

Finding 1 — Check <N>: <one-sentence falsifiable claim>
  Evidence:
    file: <path>
    signal: <measurable observation>
    threshold: <rubric the signal violates>
    cross-file impact: <other files referencing the responsibility>
  Severity: structural | hygiene
  Required action: <split | revert extraction | route through content system | add proof | tighten error mapping>

(If no findings, write "None.")

### Verdict reasoning

<one tight paragraph naming the evidence>
```

## Phase-doc `## Closeout` section template

Every active phase doc carries a `## Closeout` section holding both verdict logs.
Place near the bottom of the doc:

```markdown
## Closeout

Before founder smoke for any slice, and before this doc is archived, closeout
spawns the Deslop lane (`docs/operations/Deslop.md`) and appends to
`### Deslop log`, then the Code Audit lane (`docs/operations/Code-Audit.md`) and
appends to `### Verdict log`. The sprint is not closed until Deslop is logged and
the Code Audit verdict is `CLEAN`.

### Deslop log

<!-- deslop verdict blocks accumulate here, newest last -->

### Verdict log

<!-- audit verdict blocks accumulate here, newest last -->
```

Existing phase docs gain the section on their next slice closeout — no
retroactive flood.

## Guardrails

- The audit subagent is **readonly** and never edits files.
- Do not merge Deslop and Code Audit into one agent or one turn.
- Do not stop at an audit failure with a founder status report — remediate in the
  same sprint.
- Mechanical gates (`npm run typecheck`, `npm run lint`, `npm run build`,
  `npm run content:validate`) are separate from this ritual; they run via the
  Closer or CI.
