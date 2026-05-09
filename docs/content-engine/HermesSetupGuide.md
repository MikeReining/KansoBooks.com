# Hermes Setup Guide

**Status:** Practical setup guide for Mac Mini installation.
**Audience:** A local AI assistant or operator configuring Hermes on the Mac
Mini.
**Authority:** Subordinate to `docs/phases/AutonomousContentEngine.md`,
`docs/content-engine/LocalHermesRunner.md`, and
`docs/content-engine/EscalationPolicy.md`.

This guide has two parts:

1. Generic local Hermes setup pattern.
2. KansoBooks-specific setup using this repository.

Do not treat this guide as permission to broaden credentials or write access.
If local Hermes documentation conflicts with this repo's safety boundaries,
pause and ask for human input.

## Part 1: Generic Local Hermes Setup

### Goal

Run Hermes as a local scheduled content worker with bounded tools, local
secrets, observable run logs, and deterministic gates before any publish action.

The safe shape is:

```text
dedicated local user
dedicated clone or worktree
profile-specific skills
profile-specific toolsets
local secret store
scheduled dry run
content run
audit gate
least-privilege publish path
exception report on failure
```

### Generic Setup Steps

1. Create a dedicated operating boundary.

Use a separate macOS user if practical. If that is not practical yet, use a
dedicated working directory and do not run Hermes from a personal development
checkout.

2. Install Hermes.

Use the current Hermes install process for the Mac Mini. Keep the install
outside the project repo unless Hermes explicitly requires otherwise. Record the
installed Hermes version and install path in local notes, not in committed
secrets.

3. Create a dedicated repository clone or worktree.

Hermes should work in its own clone/worktree so scheduled changes do not collide
with active human development.

4. Configure local secrets.

Put provider credentials, budgets, and publish tokens in macOS Keychain or the
Hermes-supported local secret store. Do not put secrets in:

- committed repo files
- `.env` files committed to git
- screenshots
- run logs
- exception reports

5. Define profiles.

Use separate profiles for orchestration, research, editing, auditing, and
publishing. Each profile should have only the tools needed for that job.

6. Define toolsets.

Do not give scheduled profiles an `all` toolset. File writes, shell commands,
browser access, git commands, and credential access should be explicit.

7. Add a dry-run job first.

Before model credentials or publish credentials are enabled, run deterministic
repo checks:

- content validation
- typecheck
- lint
- build
- path guard

8. Add schedule only after dry-run is stable.

Start with a daily or manual dry-run job. Add content generation only after the
dry-run proves the worktree, dependencies, and run logs are stable.

9. Publish only through least privilege.

If publishing requires GitHub, use a token scoped only to the content automation
branch or pull-request flow. Do not give Hermes admin tokens for GitHub, Vercel,
Supabase, DNS, billing, or merchant systems.

10. Write exception reports instead of asking for routine edits.

Hermes should stop and report when a gate fails, a claim cannot be verified, a
credential is missing, or a requested action would exceed the approved access
boundary.

## Generic Human Stop Conditions

Stop and ask a human only for:

- credential provisioning
- billing or provider failures
- branch protection or deploy automation decisions
- product/trust/security policy changes
- broader write access
- tax, legal, audit, payroll, sales-tax, filing, or entity-specific uncertainty
- any request to store or process customer financial records

Do not stop for routine topic selection, drafting, metadata, internal links, or
publication when all approved gates pass.

## Part 2: KansoBooks Setup

### Repository

The repo is:

```bash
https://github.com/MikeReining/KansoBooks.com.git
```

If the Mac Mini uses SSH, the equivalent remote is:

```bash
git@github.com:MikeReining/KansoBooks.com.git
```

The local development copy used for this work is:

```bash
/Users/mike/Documents/GitHub/KansoBooks.com
```

The recommended Mac Mini Hermes paths are defined in
`config/hermes/worktree-policy.yml`:

```text
/Users/hermes-kanso-content/kanso/KansoBooks.com
/Users/hermes-kanso-content/kanso/KansoBooks.com-autopublish
```

The scheduled worktree should be:

```text
/Users/hermes-kanso-content/kanso/KansoBooks.com-autopublish
```

### Clone And Verify

On the Mac Mini, after the repo is available online, sync it into the dedicated
Hermes workspace:

```bash
cd /Users/hermes-kanso-content/kanso
git clone https://github.com/MikeReining/KansoBooks.com.git
cd /Users/hermes-kanso-content/kanso/KansoBooks.com
npm install
npm run hermes:dry-run
```

If the Mac Mini uses HTTPS instead of SSH, use the matching GitHub remote, but
do not commit tokens into the remote URL.

### Create The Scheduled Worktree

One possible setup:

```bash
cd /Users/hermes-kanso-content/kanso/KansoBooks.com
git fetch origin
git worktree add ../KansoBooks.com-autopublish -b hermes/content/bootstrap origin/main
cd /Users/hermes-kanso-content/kanso/KansoBooks.com-autopublish
npm install
npm run hermes:dry-run
```

If Hermes requires a full clone instead of a git worktree, use a second clone
and keep the same write boundaries.

### Repo-Side Files Hermes Must Use

Use these files as the source of truth:

```text
config/hermes/profiles.yml
config/hermes/toolsets.yml
config/hermes/provider-routing.example.yml
config/hermes/worktree-policy.yml
config/hermes/schedules.example.yml
config/hermes/exception-alerts.example.yml
docs/content-engine/LocalHermesRunner.md
docs/content-engine/HermesSkillStrategy.md
docs/content-engine/EscalationPolicy.md
skills/
```

### Profiles

Configure these four Hermes profiles:

| Profile | Purpose |
|---|---|
| `kanso-orchestrator` | Topic queue, state transitions, run logs. |
| `kanso-research` | Research packets and source-backed claim inputs. |
| `kanso-editor` | Briefs, drafts, artifacts, metadata, tone, SEO/AIEO. |
| `kanso-auditor-publisher` | Claim audit, final audit, gates, publish log. |

Do not merge these into one broad scheduled profile.

### Skills

Load skills from:

```text
./skills
```

Shared templates and checklists are:

```text
skills/_shared/kanso-content-templates.md
skills/_shared/claim-audit-checklist.md
skills/_shared/final-audit-checklist.md
```

Each run log should record the git SHA and the skill IDs used.

### Model Routing

Use `config/hermes/provider-routing.example.yml` as a template only. It names
environment variables. It does not store values.

Expected local environment variables:

```text
HERMES_PROVIDER_ORCHESTRATION
HERMES_PROVIDER_RESEARCH
HERMES_PROVIDER_DRAFTING
HERMES_PROVIDER_AUDIT
HERMES_MODEL_ORCHESTRATION
HERMES_MODEL_RESEARCH
HERMES_MODEL_DRAFTING
HERMES_MODEL_AUDIT
```

Put actual provider credentials in the local secret store supported by Hermes,
not in this repository.

### Write Allowlist

Scheduled content agents may write:

```text
content/**
public/content/**
public/og/**
docs/content-runs/**
src/content/**
src/lib/content/**
scripts/content/**
```

Scheduled content agents must not write:

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

Do not grant Vercel, Supabase, Lemon Squeezy, DNS, GitHub admin, or customer
financial-data credentials to scheduled content agents.

### Required Gates

Before any publish branch or PR is created, run:

```bash
cd /Users/hermes-kanso-content/kanso/KansoBooks.com-autopublish
npm run content:validate
npm run content:path-guard -- <changed-content-paths>
npm run typecheck
npm run lint
npm run build
```

The bundled dry run runs the deterministic checks and path guard with
representative allowed paths:

```bash
cd /Users/hermes-kanso-content/kanso/KansoBooks.com-autopublish
npm run hermes:dry-run
```

By default it writes reports outside the repo under the Mac's temp directory.
To intentionally version a scheduled dry-run report:

```bash
cd /Users/hermes-kanso-content/kanso/KansoBooks.com-autopublish
HERMES_REPORT_ROOT=docs/content-runs npm run hermes:dry-run
```

### Schedule Order

Start in this order:

1. Manual `npm run hermes:dry-run`.
2. Scheduled dry run only.
3. Draft-only content run with no publish credential.
4. Burn-in content run that opens a content branch or PR after all gates pass.
5. Low-cadence autopublish only after burn-in remains green.

Use `config/hermes/schedules.example.yml` as the schedule template. Convert its
cron-style entries to launchd, crontab, or the scheduler Hermes supports.

### Exception Alerts

Use `config/hermes/exception-alerts.example.yml`.

Default behavior:

- write an exception report under the run directory
- write local scheduler output
- alert locally without exposing secrets

Optional GitHub issue or PR comments require a least-privilege content
automation token and must not include customer financial data, admin
credentials, provider keys, or private books data.

### First Mac Mini Acceptance Test

The Mac Mini setup is minimally ready when all of this passes from the
scheduled worktree:

```bash
cd /Users/hermes-kanso-content/kanso/KansoBooks.com-autopublish
git status --short --branch
npm install
npm run hermes:dry-run
npm run content:validate
npm run typecheck
npm run lint
npm run build
```

Expected result:

- all commands pass
- no credentials are required for the dry run
- no repo files are changed by default dry run
- the dry-run report path is outside the repo unless `HERMES_REPORT_ROOT` is set
- `git status --short` remains clean after the default dry run

### What The Mac Mini AI Should Report Back

Ask the Mac Mini AI to report:

```text
Hermes install path:
Hermes version:
Dedicated OS user used:
Canonical clone path:
Scheduled worktree path:
Git remote:
Git branch:
Dry-run report path:
Dry-run result:
Scheduler chosen:
Secrets store chosen:
Provider routes configured: yes/no
Publish credential configured: no / branch-only token / other
Any deviation from this guide:
```

### Do Not Proceed If

Stop before burn-in if:

- dry-run fails
- Hermes needs broader file write access than this guide allows
- Hermes needs admin tokens
- provider credentials would be committed to repo files
- scheduler output includes secrets
- branch protection or publish path is unclear
- any content job needs tax, legal, audit, payroll, sales-tax, filing, or
  entity-specific judgment
- any cloud path would store customer books, statements, receipts, ledgers,
  reconciliation state, accountant packages, or local books files

## Completion Criteria

The local setup guide is successfully followed when:

- the Mac Mini has a dedicated Hermes worktree
- `npm run hermes:dry-run` passes from that worktree
- provider routes are configured through local secrets only
- scheduled dry-run is installed and producing local reports
- no content publish credentials are enabled until burn-in is explicitly ready
- the repo remains the canonical source for skills, truth files, validators,
  run-log templates, and content boundaries
