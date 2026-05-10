# Codex Skill Directory Strategy

**Status:** Phase 3 skill-system draft
**Authority:** Operational strategy for how Codex consumes KansoBooks content
skills. Subordinate to `docs/phases/AutonomousContentEngine.md` and canonical
product docs.

## Canonical Skill Source

The canonical KansoBooks content skills live in this repo:

```text
skills/
```

Each skill directory contains a `SKILL.md`. Shared templates and audit
checklists live in:

```text
skills/_shared/
```

Codex should treat this repo as the source of truth during Phase 4 and Phase 5.
Skill changes land through normal implementation and review sprints. Scheduled
publishing profiles may read skills, but may not silently patch canonical skills.

## Repo Tap Model

Recommended first model:

1. Codex runs in a dedicated clone or worktree of `KansoBooks.com`.
2. Codex loads skills from `./skills`.
3. Codex writes content-run outputs only to approved content paths.
4. CI path guards reject autonomous changes outside the allowlist.
5. Skill edits require an implementation sprint and reviewer closeout.

This keeps skills, validators, truth files, and run logs versioned together.

## External Directory Model

If Codex later requires a global skill directory, publish a read-only tap from
this repo:

```text
~/.codex/skills/kansobooks -> /path/to/KansoBooks.com/skills
```

or a pinned export:

```text
~/.codex/skill-taps/kansobooks/<git-sha>/skills
```

Pinned exports are preferred for scheduled publishing because a run can record
the exact skill revision used.

## Skill Resolution

Codex profile startup should load:

```yaml
skillTap:
  id: "kansobooks-content"
  source: "repo"
  path: "./skills"
  revision: "<git-sha>"
  shared:
    - "skills/_shared/kanso-content-templates.md"
    - "skills/_shared/claim-audit-checklist.md"
    - "skills/_shared/final-audit-checklist.md"
```

Each run log should record:

```yaml
skillsUsed:
  - id: "kanso-content-brief"
    revision: "<git-sha>"
  - id: "kanso-research-packet"
    revision: "<git-sha>"
```

## Profile Mapping

| Codex profile | Skills |
|---|---|
| `kanso-orchestrator` | `kanso-topic-scoring`, `kanso-refresh`, `kanso-metrics-review` |
| `kanso-research` | `kanso-research-packet`, `kanso-claim-audit` |
| `kanso-editor` | `kanso-content-brief`, `kanso-article-draft`, `kanso-headline-metadata`, `kanso-seo-aieo-pass`, `kanso-tone-pass`, `kanso-content-review` |
| `kanso-auditor-publisher` | `kanso-claim-audit`, `kanso-final-audit`, `kanso-publish` |

## Safety Boundary

Skills are instructions, not permissions.

Codex still needs:

- dedicated clone or worktree
- narrow toolsets per profile
- restricted credentials
- CI path guard
- content validation
- typecheck and lint before publish lanes
- branch protection for canonical skill changes

Founder approval is not a publishing gate. Founder interruption is reserved for
the escalation conditions in `docs/content-engine/EscalationPolicy.md`.

