# Local Hermes Runner Configuration

This directory is the versioned repo-side setup for Phase 5. It defines Kanso
Hermes profiles, toolset intent, model routing placeholders, worktree
conventions, and schedule templates without storing credentials.

Start the Mac Mini setup from:

- `docs/content-engine/HermesSetupGuide.md`

Ready in repo:

- `profiles.yml`: four Hermes profiles and their skill/tool boundaries.
- `toolsets.yml`: least-privilege toolset intent per profile.
- `provider-routing.example.yml`: provider/model environment placeholders.
- `worktree-policy.yml`: dedicated clone/worktree convention and allowlists.
- `schedules.example.yml`: dry-run, weekly publish, refresh, and metrics review templates.
- `exception-alerts.example.yml`: credential-free exception alert boundaries.
- `scripts/hermes/dry-run.sh`: credential-free local gate runner. It writes
  reports to `${TMPDIR:-/tmp}/kansobooks-hermes-runs` by default; set
  `HERMES_REPORT_ROOT=docs/content-runs` only when a report should be
  intentionally versioned.
- `docs/content-runs/_templates/`: run-log and exception report templates.

Requires local Mac Mini setup:

- Hermes installation and scheduler choice.
- Local provider credentials in macOS Keychain or the Hermes-supported secret store.
- A dedicated OS user or equivalent filesystem boundary.
- A dedicated clone/worktree following `worktree-policy.yml`.
- A least-privilege GitHub token if autopublish later pushes a content branch.

Do not add production credentials, provider keys, Vercel tokens, Supabase keys,
Lemon Squeezy keys, DNS credentials, admin GitHub tokens, customer financial
data, or private books data to this repo.
