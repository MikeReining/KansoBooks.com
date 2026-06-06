# KansoBooks.com Documentation

This documentation defines the public website, control-plane foundation, and
Autonomous Content Engine for `KansoBooks.com`.

## Current State

- Next.js App Router site is live at `https://www.kansobooks.com/`.
- Supabase control-plane schema is applied; Lemon Squeezy commerce setup is
  incomplete.
- Content infrastructure, validators, skills, and manual calibration runs are
  complete.
- Ten public resource articles exist under `content/resources/` with full run
  artifacts in `docs/content-runs/`.
- Active work: content factory publishing, presentation polish, and burn-in
  toward autonomous autopublish.

## Active Docs

| Doc | Purpose |
| --- | --- |
| `docs/1.Invariants.md` | Rules the website and content system cannot violate. |
| `docs/2.Schema-Design.md` | Content schema and truth files. |
| `docs/3.Contract-Type-System.md` | TypeScript content contract and route model. |
| `docs/4.Shared-Validator.md` | Validation gates for content, claims, and exports. |
| `docs/5.Runtime-Contract-Consumption.md` | How Next.js consumes content at build/runtime. |
| `docs/6.Export-And-Prompt-Generation.md` | Sitemap, RSS, llms.txt, reports, and prompts. |
| `docs/7.Contract-Testing-And-Parity.md` | Content validation and launch checks. |
| `docs/phases/README.md` | Live phase sequencing and what to work on next. |
| `docs/operations/Execution-Playbook.md` | How to run orchestrated sprints (Task 1 → Deslop → Code Audit → Closer). |
| `docs/operations/Agent-Workflow-Detail.md` | Content factory, product truth, control-plane, and sensitive-topic rules. |
| `docs/content-engine/` | Long-tail publishing system for KansoBooks resources. |
| `docs/KansoBooksManifesto.md` | Canonical product positioning. |
| `docs/KansoBooksVision.md` | Product vision. |
| `docs/KansoBooksWedge.md` | Wedge and ICP. |

## Operating Principle

Build a calm, proof-grade public website that earns trust before conversion:

1. local-first books never live in the cloud
2. every public claim is source-controlled and auditable
3. content publishes through validators, not founder review labor
4. Supabase and Lemon Squeezy remain control plane only

Strategic desktop-product roadmap lives in `docs/KansoBooksRoadmap.md` and is
not the execution SSOT for this repo.
