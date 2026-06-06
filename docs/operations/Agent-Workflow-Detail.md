# Agent Workflow — Detail

Status: **Routed detail** for `AGENTS.md` and
`docs/operations/Execution-Playbook.md`. Read the router first; open this file
when the task touches content factory work, claims, control plane, commerce, or
publishing.

## Purpose

- MUST preserve local-first product truth: user books do not live in the cloud.
- MUST preserve control-plane-only cloud posture for Supabase and Lemon Squeezy.
- MUST preserve source-controlled content truth: no hand-edited production pages
  outside the content system.
- MUST route to authoritative docs before implementation.
- MUST NOT create parallel truth in code, prompts, docs, templates, or generated
  exports.

## Product Truth

Read before changing positioning, product claims, pricing posture, trust language,
content strategy, or conversion copy:

- `docs/KansoBooksManifesto.md`
- `docs/KansoBooksVision.md`
- `docs/KansoBooksWedge.md`
- `docs/phases/FoundationSetup.md`
- `docs/phases/AutonomousContentEngine.md` for content-engine work

Binding product rules:

- KansoBooks is local-first.
- The website must not imply user books live in the cloud.
- Supabase is control plane only.
- Lemon Squeezy is commerce/control plane only.
- No cloud path stores transactions, statements, receipts, ledgers,
  reconciliation state, accountant packages, or local books files.
- AI prepares. Kanso proves. The user approves.
- AI is never the source of financial truth.

## Website Stack

Current stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style copied UI components
- `lucide-react`
- Vercel deployment
- Supabase control plane
- Lemon Squeezy merchant/control plane

Default local checks:

```bash
npm run typecheck
npm run lint
npm run build
npm run content:validate
```

Use focused checks where a sprint is narrow. Run the full default gate before
phase close, release close, or any change to shared routing, metadata, content
generation, deployment, authentication, commerce, or control-plane code.

## Frontend Taste

The website should feel calm, precise, and financially trustworthy.

Read `docs/phases/gui/0.1.Design-System.md` before changing major visual
systems, page structure, homepage sections, typography, color, or interaction
patterns.

Do not drift into generic SaaS marketing:

- no decorative gradient blobs
- no dark developer-dashboard aesthetic
- no vague AI hype
- no bloated landing-page filler
- no claims beyond the current product docs

## Content Factory Ownership

New pages flow through the content engine, not ad hoc JSX copy.

- Topic selection: `content/_data/topic-inventory.yml`
- Briefs and truth: `content/_truth/`, `content/_claims/`
- Runs and audit trail: `docs/content-runs/`
- Validation before publish: `npm run content:validate`
- Path guard for autopublish: `npm run content:path-guard`

Do not publish sensitive-topic pages without claim review per
`docs/phases/AutonomousContentEngine.md` and
`docs/content-engine/EscalationPolicy.md`.

For Codex-run content work, follow
`docs/content-engine/CodexContentOrchestration.md`.

## Content Engine Boundary

Autonomous publishing must preserve:

- no founder publishing gate
- no AI slop
- no tax/legal/audit advice
- no claim that KansoBooks replaces accountants
- no claim that KansoBooks guarantees tax compliance
- no content outside the wedge unless it supports buying intent
- no publishing without automated audit

## Codex Automation Safety

Skills are workflow instructions, not a security boundary.

Autonomous content publishing must use defense in depth:

- separate Codex automation roles for strategist, researcher, writer, reviewer,
  auditor, publisher, maintainer, and metrics roles
- smallest practical toolsets per role
- no `all` toolset for scheduled publishing roles
- separate OS user or working directory for Codex automations
- dedicated clone or worktree for content automation
- restricted credentials
- branch protection
- CI path guard for autopublish
- content validation before merge/deploy
- no direct access to Vercel, Supabase, Lemon Squeezy, DNS, or GitHub admin
  credentials unless a sprint explicitly requires that admin lane

Initial autopublish allowlist:

```text
content/**
public/content/**
public/og/**
docs/content-runs/**
```

Possible additional allowlist after explicit implementation:

```text
src/content/**
src/lib/content/**
scripts/content/**
```

Never allow scheduled content agents to mutate these without an explicit
non-content-engine sprint:

```text
src/app/api/**
src/lib/supabase/**
src/lib/control-plane/**
supabase/**
.env*
next.config.ts
package.json
package-lock.json
.github/**
```

Role definitions and write boundaries: `config/codex/profiles.yml`.

## Sensitive Topics

Extra review is required for tax filing, payroll, sales tax, entity choice,
audit readiness guarantees, accountant replacement claims, compliance guarantees,
and jurisdiction-specific financial advice.

Allowed posture: KansoBooks helps owners organize evidence, understand
uncertainty, and prepare accountant-ready packages — not replace professional
advice or guarantee outcomes.

## Local Development

Never run KansoBooks.com on port `3000` or `3001`. Use:

```bash
npm run dev -- --port 48623
```

The local preview URL is `http://localhost:48623`.

## Mechanical Gates

For code-touching slices:

```bash
npm run typecheck
npm run lint
npm run build
npm run content:validate
```

For content-only slices, `npm run content:validate` plus any target-doc proof
commands are usually sufficient.
