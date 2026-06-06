# Deslop pass ritual

**Behavior-preserving cleanup of the slop *this slice* introduced.**
Platform-agnostic (Cursor, Codex, Claude Code, CI).

Removes AI-generated slop from the slice diff before Code Audit. Complements
`docs/operations/Code-Audit.md` — Deslop is **mutating hygiene**; Code Audit is
**readonly structural judgment**.

Spawned as a dedicated lane by `docs/operations/Execution-Playbook.md` § Closeout.
Runs **before** Code Audit.

## When it fires

Run before Code Audit at:

1. a sprint or slice asking the founder to smoke,
2. a sprint closeout (Closer step per `Execution-Playbook.md` § Closeout),
3. a phase-doc archive (`docs/operations/Archive-Close-Gate.md`).

**Skip** for mid-slice checkpoints and momentum hotfix turns. One pass per close
attempt — no refactor loop. Re-run only after substantive new edits or after
Code Audit remediation (mini-deslop on the remediation hunks only).

## Scope (binding)

The Deslop agent **may edit files** (it is not readonly), but only inside the
slice's added/modified lines.

- **Diff base = slice base**, not bare `main`. Resolve in order: phase-doc
  `Deslop slice base: <sha>` anchor → single-commit slice `<commit>^` → the SHA
  of the last logged Deslop verdict's `Head` → founder-named ref → last resort
  `git merge-base main HEAD` (log it as `(fallback)` and stay strictly
  hunk-only).
- **Hunk-only:** edit only lines this slice added or modified
  (`git diff <slice-base>...HEAD`). Pre-existing slop on unchanged lines is out
  of scope. No "while I'm here" legacy cleanup.
- **Skip generated paths:** export artifacts under `public/` or `content/_data/`
  when produced by scripts, lockfiles, and snapshots. When in doubt, regenerate —
  do not hand-edit generated output.

## Rubric (apply inside slice hunk scope only)

1. **Comment noise** — remove comments that restate the code, agent section
   banners, or TODOs that duplicate the phase doc. Keep comments that explain
   non-obvious business logic or content/control-plane seams.
2. **Defensive noise** — remove try/catch, null guards, or fallbacks that are
   abnormal for trusted in-process paths. Do not remove validation owned by
   content scripts or shared validators.
3. **Type bypasses** — remove `as any`, `as unknown as`, `@ts-expect-error`, and
   casts used only to silence `tsc`. Fix the type properly or leave it unchanged.
4. **Nesting** — flatten with early returns only when the surrounding file
   already uses that style. No drive-by extractions.
5. **Style drift** — naming, import order, and comment density inconsistent with
   the file and repo conventions (Prettier/ESLint own mechanical formatting).

**Out of scope (other owners):**

- Structural splits / responsibility moves → `docs/operations/Code-Audit.md`
- Generated artifacts → regenerate, never hand-edit
- Behavior changes → forbidden unless fixing an obvious bug in the same edit
- Public-facing copy claims → phase doc + truth files

## Proof

Prefer the nearest exact proof when a hunk touches executable behavior:
`npm run typecheck`, targeted tests if present, and `npm run content:validate`
for content-touching hunks. If a proof fails because of a deslop transform,
restore the prior tolerance or revert that transform before continuing.

## Verdict (append to target phase doc `## Closeout` → `### Deslop log`)

```text
## Deslop pass

Status: CLEAN | CHANGES MADE | SKIPPED
Sprint: <phase doc id + slice id>
Slice base: <sha + short reason>
Head: <HEAD sha at pass time>
Deslopped at: <ISO date>
Files with in-scope hunks: <N hand-authored, M skipped as generated>

### Changes

<one line per rubric category, or "None.">

### Summary

<1–3 sentences: what was cleaned in slice scope, or why SKIPPED/CLEAN>
```

Close proceeds when status is `CLEAN`, `CHANGES MADE`, or `SKIPPED`. `SKIPPED`
applies only when the diff is all generated paths, lockfiles, snapshots, or
`docs/**` with no hand-authored code.

## Slice anchor (recommended)

At Task 1 open, record one line in the slice/closeout preamble:

```text
Deslop slice base: <sha>  <!-- HEAD at slice open; incremental diff starts here -->
```

Existing phase docs gain the `## Closeout` subsection on their next closeout —
no retroactive flood.
