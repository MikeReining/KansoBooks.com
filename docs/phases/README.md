# Phases — Execution SSOT

**This file is the live source of truth for what to work on next.**

Use this file before any phase target doc. Phase docs contain detail and
history; this README contains current sequencing, status, and pause decisions.

Run sprints with `docs/operations/Execution-Playbook.md`.

## Current State

The website foundation, production deploy, control-plane schema, content
infrastructure, skill system, manual Codex calibration, and repo-side Codex
automation setup are in place. Active work is the content factory: topic
inventory, claim-backed articles, presentation polish, and burn-in toward
autonomous publishing.

Local preview:

```bash
npm run dev -- --port 48623
```

Mechanical gates for code-touching sprints:

```bash
npm run typecheck
npm run lint
npm run build
npm run content:validate
```

## Binding Next Work

| Priority | Target doc | Status | Next sprint |
| --- | --- | --- | --- |
| 0 | `docs/phases/AutonomousContentEngine.md` | Active | Continue content runs; start Phase 6 burn-in autopublish |
| 1 | `docs/content-engine/NextArticleWorkflow.md` | Active | Next approved topic through full pipeline |
| 2 | `docs/phases/ContentPresentationLayer.md` | Partial | Image strategy, OG generation, section-specific modules |
| 3 | `docs/phases/DeploySetup.md` | Partial | Lemon Squeezy store, products, and webhooks |
| 4 | `docs/phases/SupabaseControlPlane.md` | Partial | Wire webhook writes and entitlement reads end-to-end |

## Phase Status

| Phase | Status | Detail doc | Notes |
| --- | --- | --- | --- |
| 0 | Complete | `FoundationSetup.md` | Next.js, TypeScript, Tailwind, port `48623`, Kanso design tokens, homepage |
| 1 | Complete | `DeploySetup.md` | Vercel, Cloudflare DNS, Supabase connected; Lemon Squeezy pending |
| 2 | Complete | `SupabaseControlPlane.md` | Initial control-plane migration applied |
| 3 | Complete | `AutonomousContentEngine.md` (Phases 1–3) | Content schemas, routes, validators, skills |
| 4 | Partial | `ContentPresentationLayer.md` | Article shell and orchestration gate done; images/OG/modules remain |
| 5 | Complete | `AutonomousContentEngine.md` (Phases 4–5) | Manual calibration runs + repo-side Codex automation |
| 6 | Pending | `AutonomousContentEngine.md` (Phase 6) | Burn-in autopublish at low cadence |
| 7 | Active | `AutonomousContentEngine.md` (Phase 7) + content factory | Topic inventory, claim review, content runs, public resources |

## Content Factory Lanes

These lanes extend Phase 7. They are active product work, not deferred polish.

| Lane | Doc | Notes |
| --- | --- | --- |
| Topic inventory | `docs/content-engine/TopicInventory.md` | Approved jobs and sequencing |
| Next article | `docs/content-engine/NextArticleWorkflow.md` | Full pipeline for one topic |
| Codex orchestration | `docs/content-engine/CodexContentOrchestration.md` | End-to-end Codex run rules |
| Presentation | `ContentPresentationLayer.md` | Article shell, sidebar, footer, visual packaging |

## Sequencing Rule

```text
0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7
                      \
                       -> content factory runs in parallel once Phase 3 gates hold
```

Do not enable unattended autopublish until Phase 6 burn-in gates pass.
Do not weaken local-first or control-plane boundaries for publishing speed.

## Operating Rules For Agents

- Read this README before issuing or executing any phase sprint.
- If this README conflicts with a target phase doc's status, this README owns
  live sequencing until closeout updates both files.
- Use `docs/operations/Execution-Playbook.md` for orchestrated sprints
  (Task 1 → Deslop → Code Audit → Closer).
- Preserve product truth: local-first books, control-plane-only cloud, no
  tax/legal/audit advice, no AI-as-financial-truth claims.
- When running Codex content work, follow
  `docs/content-engine/CodexContentOrchestration.md` and
  `config/codex/profiles.yml` write boundaries.

## Deferred Until Commerce And Autopublish Gates

- Full Lemon Squeezy checkout and entitlement UX
- Scheduled unattended Codex publishing without path guard and CI
- Broad homepage or IA redesign
- Headless CMS until content operations prove they need one

## Individual Phase Docs

Phase detail and sprint history live in individual files under `docs/phases/`:

- `FoundationSetup.md` — website scaffold and design system
- `DeploySetup.md` — Vercel, DNS, env vars
- `SupabaseControlPlane.md` — control-plane schema and webhooks
- `AutonomousContentEngine.md` — content engine phases 1–7
- `ContentPresentationLayer.md` — article presentation system
- `docs/phases/gui/` — GUI workflow, design system, surface briefs

Strategic desktop-product roadmap (not this repo): `docs/KansoBooksRoadmap.md`.
