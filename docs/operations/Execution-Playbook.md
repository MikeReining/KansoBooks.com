# Execution Playbook

Platform-agnostic (Cursor, Codex, Claude Code, CI). Pair with **exactly one**
target phase or slice doc (`@`-reference). This file is **process only** — scope
and progress live in the target doc, never here. Route gates to owning docs;
link, do not restate.

Never edit this playbook to record sprint progress. Sprint status, completion
notes, follow-ups, and open questions live in the target phase doc.

This repo is `KansoBooks.com`: the public website, control-plane website
foundation, docs, and Autonomous Content Engine. It is not the desktop KansoBooks
product repo.

## Default mode: autonomous orchestration

The default is **Goal-Orchestrated Mode**. A single orchestrator agent drives the
sprint end to end by spawning specialized worker subagents — there is no separate
human reviewer lane in the normal loop. The founder is consulted only at the
**Human stop** conditions below (product scope, local-first/cloud boundary,
claims or sensitive-topic posture, commerce/control-plane ambiguity, or
launch/DNS timing), not for routine review or commit approval.

```text
Orchestrator → Task 1 implementer → Deslop → Code Audit (readonly) → Closer
```

## Lanes

| Lane | Tag | Runner | Owns |
| --- | --- | --- | --- |
| **Orchestrator** | — | Parent (no product code) | Brief, ledger, spawn order, checkpoints, stop rules |
| **Task 1** | AUTO | Implementer subagent | Code, content, config, tests; stops at reviewable handoff |
| **Deslop** | AUTO | Subagent ≠ Task 1 (**mutating**) | Hunk-only slice slop cleanup; deslop verdict log |
| **Code Audit** | AUTO | Subagent readonly, ≠ Task 1, ≠ Deslop | Structural verdict `CLEAN \| REFACTOR REQUIRED \| INCONCLUSIVE` |
| **Closer** | AUTO | Orchestrator on `CLEAN` | Target-doc markers, tripwires, sprint-ID commit |

Sprint `AUTO`/`KEEP` tags inside phase docs are implementer routing hints, not
packet lanes. A `KEEP` tag does not require a human; it marks judgment-sensitive
work that raises the bar for the Human stop check.

Inline role-play is allowed **only** when tool discovery proves spawning is
unavailable. The worker ledger MUST state why.

## Worker ledger

Post before the first product-code edit:

```text
Workers:
Tool discovery: <Task/explore/Codex thread | unavailable because …>
Task 1 implementer: <agent id | inline because …>
Deslop: <agent id | pending>
Code Audit: <agent id | pending>
Closer: <orchestrator>
```

## Required reads

Before issuing or spawning work:

1. `AGENTS.md`.
2. `docs/phases/README.md` for live phase status and the active target.
3. The target phase doc.
4. Any docs the target phase doc marks as required for the next sprint.
5. `docs/operations/Agent-Workflow-Detail.md` when the sprint touches content
   factory work, claims, control plane, commerce, or publishing.

Read the minimum authoritative context needed to produce a correct sprint. Do
not read the whole repository by default.

## Routed reads (Task 1 + closeout)

| Touches… | Also read |
| --- | --- |
| UI, route, page, component, or template | `docs/phases/gui/GUI_Workflow.md` + relevant surface brief |
| Schema, contracts, validators, content types | relevant `docs/1..7` foundation docs |
| Content factory, briefs, topic inventory, runs | `docs/content-engine/` + `docs/phases/AutonomousContentEngine.md` |
| Codex content orchestration | `docs/content-engine/CodexContentOrchestration.md` |
| Article presentation, OG, images | `docs/phases/ContentPresentationLayer.md` |
| Website foundation, homepage, design tokens | `docs/phases/FoundationSetup.md` + `docs/phases/gui/0.1.Design-System.md` |
| Deploy, DNS, Vercel, env vars | `docs/phases/DeploySetup.md` |
| Supabase, Lemon Squeezy, webhooks, entitlements | `docs/phases/SupabaseControlPlane.md` |
| Closeout (any code-touching sprint) | `docs/operations/Deslop.md` → `docs/operations/Code-Audit.md` |
| Phase / archive close | `docs/operations/Archive-Close-Gate.md` |

This is first routing only. Narrower docs named by the target doc or phase doc
still apply.

## Authority and conflict rules

Precedence order:

1. `AGENTS.md`
2. `docs/1..7` SSOT foundation docs
3. `docs/phases/README.md` for live sequencing and pause/resume status
4. the target phase doc
5. surface briefs and implementation notes
6. chat instructions for the current turn

A phase doc may narrow or sequence SSOT rules, but may not weaken them. If a
phase doc conflicts with the SSOT, the sprint is invalid until the docs are
reconciled. If founder chat changes product scope, local-first posture, claims
policy, or launch sequencing, update the relevant SSOT or phase doc before
implementation.

## Next sprint

1. Locate the target doc's **authoritative ordering** (sprint table, numbered
   list, checklist, dependency graph, or explicit "next" section).
2. Pick the first not-done sprint whose dependencies are done.
3. Ties → smallest critical-path deliverable. Ambiguity → state a one-sentence
   assumption and proceed.
4. Use native sprint IDs in titles and commits when the target doc defines them.

**"Next sprint" in the same chat:** advance from the last sprint the orchestrator
issued in this thread — not git/CI state — unless the founder explicitly asks to
reconcile with the repository. No successor → ordered plan exhausted.

**On resume:** the run ledger `Next spawn:` beats dirty git; target-doc shipped
markers beat a stale ledger. If Task 1 is done with no Deslop logged, spawn
Deslop now.

## Goal-Orchestrated loop

```text
(1) next sprint or ledger resume
 -> (2) spawn Task 1 implementer
 -> (3) checkpoint
 -> (4) spawn Deslop (≠ Task 1)         → log verdict
 -> (5) spawn Code Audit (readonly)     → log verdict
 -> (6) REFACTOR REQUIRED | INCONCLUSIVE → back to Task 1 same sprint; re-run (4)+(5)
 -> (7) CLEAN → Closer: target-doc markers, tripwires, sprint-ID commit
 -> next sprint or stop
```

**Orchestrator binding:**

- Spawn separate Task 1, Deslop, and Code Audit subagents (background preferred).
- No product-code edits by the orchestrator.
- The audit MUST be a readonly subagent — no self-audit.
- An audit failure routes **immediately** back to a Task 1 spawn for the same
  sprint, not to a founder status update.
- Chain sprints in the same turn when possible; otherwise record `Next spawn:` in
  the ledger.
- Do not stop at a status summary. Spawn → checkpoint → spawn until stop, pause,
  or plan exhaustion.

**Templates the orchestrator maintains:**

```text
Run brief — Target doc / Starting sprint / Next spawn
Ledger     — Active sprint / Status / Last spawn / Next spawn / Blockers
Checkpoint — Changed / Verified / Left / Uncertain
Progress   — Sprint CLEAN|REFACTOR|BLOCKED / T1 / Deslop / Audit / Commands / Docs / Next
```

## Task 1 implementer scope

Task 1 owns:

- code, content, schema, config, tests, and generated artifacts required by the
  sprint
- objective implementation notes and a clear list of tests or validations run
- a short handoff with known risks

Task 1 does NOT own: marking the sprint complete, writing completion notes,
sweeping follow-ups, making product-scope decisions not authorized by the target
doc, deslop, audit, or implementing later sprints. Task 1 stops when the work is
a reviewable diff and its *Done when* criteria are met.

## Closeout (binding)

Two **single-purpose lanes**, separate spawned agents. No combined reviewer blob.

```text
Task 1 *Done when* met
  → spawn Deslop lane (docs/operations/Deslop.md)        → append to ### Deslop log
  → spawn Code Audit lane (docs/operations/Code-Audit.md) → append to ### Verdict log
  → REFACTOR REQUIRED | INCONCLUSIVE → Task 1 same sprint; re-run both lanes
  → CLEAN → Closer: target-doc markers, tripwires, sprint-ID commit
```

**Mechanical gates** (`npm run typecheck`, `npm run lint`, `npm run build`,
`npm run content:validate`) run via the Closer or CI — they are not mixed into
the Deslop or Code Audit agents. During founder momentum, prefer the nearest
targeted proof for local confidence; full build + validate before closeout on
content-touching sprints.

A sprint is closed when: Deslop verdict logged + Code Audit verdict `CLEAN` +
target-doc closeout updated + the sprint-ID commit exists (when the founder
asked for a commit).

## Closer scope

On `CLEAN` only, the Closer (orchestrator):

- marks the sprint complete in the target doc using the doc's own convention
- adds the completion note (date, short summary, validations)
- sweeps the target doc's follow-up / TODO / deferred ledger
- records runtime tripwires (§ below) when the sprint touched them
- creates the sprint-ID commit when the founder requested one

The Closer must not implement new product behavior and must not commit secrets,
ignored files, or unrelated founder work.

## Git closeout rules

Closer order:

1. confirm latest Deslop verdict logged and Code Audit verdict is `CLEAN`
2. make reviewer-owned closeout hygiene edits in the target doc
3. run or verify required mechanical gates
4. stage only sprint-owned files plus target-doc closeout
5. create the sprint-ID commit when requested
6. then mark the sprint closed in the ledger

Never push unless the founder asks.

Manual git handoff command blocks must start with
`cd /Users/mike/Documents/GitHub/KansoBooks.com`.

## Runtime tripwires captured this sprint

The Closer adds this heading to the target phase doc closeout when the sprint
touched local preview, content validation, publishing, commerce webhooks, or a
new public route. Record `N/A — confirmed by closer` or, per tripwire:

- `- Regression:` automated path/test or manual URL checked
- `- Deferred blocker:` owner, forward sprint, rationale

No close on a surprise or TODO alone.

## Human stop (ask founder)

Stop and ask only for: product positioning conflict with canonical docs; cloud
data boundary ambiguity; AI truth boundary ambiguity; tax/legal/accounting
advice uncertainty; credentials, billing, or provider failure; branch protection,
CI, or deployment failure that cannot be mechanically fixed; Codex automation
access-policy changes; deleting or rewriting large parts of the public website;
ambiguous target ordering that changes scope.

**Not stops:** audit `REFACTOR REQUIRED` / `INCONCLUSIVE`, an implementer-ready
diff, Task 1 done before closeout, or a skipped commit awaiting only mechanical
confirmation. In those cases spawn the next lane or run the Closer.

## Optional Packet Mode

When the founder explicitly asks for a copy-paste sprint packet instead of an
autonomous run, emit a single Task 1 fence (title line
`# Task 1 — AUTO — Implementer (<sprint ID>)`) followed by three status lines:

```text
Task 1 (issued)
Closeout (pending | Deslop done | CLEAN | REFACTOR)
After this sprint: N sprints left.
```

(`N = 0` → `After this sprint: 0 sprints left — ordered plan exhausted.`) Then
stop. Packet Mode still routes closeout through the Deslop → Code Audit → Closer
lanes; it only changes who triggers Task 1.

## After you respond

- **Goal-Orchestrated (default):** do not stop at status summaries — spawn →
  checkpoint → spawn until stop, pause, or exhaustion. If the turn ends, the last
  lines are the ledger `Next spawn:` plus a progress block.
- **Packet Mode:** stop after the Task 1 fence unless the founder assigns the
  implementer hat.
