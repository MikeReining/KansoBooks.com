# Local Codex Runner

**Status:** Phase 5 repo-side setup. Local installation and credentials remain
human-provided Mac Mini work.

## Scope

Phase 5 prepares the repository for a local Codex runner. It does not install
Codex on the Mac Mini, create provider accounts, configure production
credentials, or grant direct deploy authority.

Founder approval is not a publishing gate. Automated gates, claim audits,
path guards, and exception reports are the gate.

## Versioned Setup

Runner configuration lives in:

```text
config/codex/
```

The step-by-step Mac Mini setup guide is:

```text
docs/content-engine/CodexSetupGuide.md
```

Run templates live in:

```text
docs/content-runs/_templates/
```

The credential-free dry run is:

```text
npm run codex:dry-run
```

By default, dry-run reports are written outside the repo under
`${TMPDIR:-/tmp}/kansobooks-codex-runs` to avoid local check noise. Scheduled
Codex jobs may opt into versioned reports with:

```text
CODEX_REPORT_ROOT=docs/content-runs npm run codex:dry-run
```

## Profiles

`config/codex/profiles.yml` defines four local Codex profiles:

| Profile | Role |
|---|---|
| `kanso-orchestrator` | Selects approved jobs and sequences handoffs. |
| `kanso-research` | Builds source-backed research and claim inputs. |
| `kanso-editor` | Drafts content, artifacts, metadata, and claim manifests. |
| `kanso-auditor-publisher` | Runs claim/final audits and publish gates. |

The profiles map to the skill strategy in
`docs/content-engine/CodexSkillStrategy.md`.

## Worktree Convention

The local runner should use a dedicated OS user or equivalent filesystem
boundary:

```text
/Users/codex-kanso-content/kanso/KansoBooks.com
/Users/codex-kanso-content/kanso/KansoBooks.com-autopublish
```

Scheduled content jobs run from the dedicated worktree, not the founder's
active development checkout.

## Write Boundary

Scheduled content agents may write only approved content-engine paths:

```text
content/**
public/content/**
public/og/**
docs/content-runs/**
src/content/**
src/lib/content/**
scripts/content/**
```

They may not write:

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

Phase 5 edits `package.json` only to expose a local dry-run command. Scheduled
Codex profiles do not inherit permission to edit package files.

## Provider Routing

`config/codex/provider-routing.example.yml` names model/provider environment
variables. Values must be supplied locally and must not be committed.

The routes are placeholders for:

- orchestration
- research
- drafting
- audit

## Exception Alerts

`config/codex/exception-alerts.example.yml` defines credential-free local alert
boundaries. Failed runs should write an exception report and local scheduler
output first. Optional GitHub comments or issues require a human-provided
least-privilege content automation token and must not carry customer financial
data or admin credentials.

## Publish Credential Boundaries

Autonomous content jobs must not receive admin credentials.

Allowed later, after explicit setup:

- least-privilege GitHub token scoped to the content automation branch or PR
  workflow
- read-only analytics credentials for metrics review

Not allowed for scheduled content agents:

- Vercel admin or production deploy token
- Supabase service role or project admin key
- Lemon Squeezy admin, billing, payout, or customer-data credentials
- DNS registrar credentials
- GitHub admin token
- customer books, statements, receipts, ledgers, accountant packages, or
  financial exports

No cloud path stores user books. The content runner writes website content and
run artifacts only.

## Dry Run

The dry run verifies:

- content validation
- typecheck
- lint
- build
- autopublish path guard against representative allowed content paths
- report creation under a temporary report root by default

It does not call model providers and does not require credentials.

## Human-Provided Local Details

Actual unattended operation still requires:

- Mac Mini Codex installation path
- scheduler choice and installed job definitions
- local secret store configuration
- provider credentials and budgets
- least-privilege GitHub automation credentials, if publishing is enabled
- branch protection or merge automation compatible with the content path guard

Credentials, billing failures, provider failures, branch protection failures,
or proposed access expansion follow
`docs/content-engine/EscalationPolicy.md`.
