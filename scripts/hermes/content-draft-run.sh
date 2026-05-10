#!/usr/bin/env bash
set -u
set -o pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT" || exit 1

HERMES_BIN="${HERMES_BIN:-$HOME/.local/bin/hermes}"
HERMES_PROVIDER="${HERMES_PROVIDER:-openai-codex}"
HERMES_MODEL="${HERMES_MODEL:-gpt-5.5}"
HERMES_RUN_DATE="${HERMES_RUN_DATE:-$(date +%F)}"
HERMES_TOPIC="${HERMES_TOPIC:-}"
HERMES_READER_JOB="${HERMES_READER_JOB:-}"
HERMES_CANONICAL_JOB="${HERMES_CANONICAL_JOB:-}"
HERMES_CONTENT_TYPE="${HERMES_CONTENT_TYPE:-resource}"
HERMES_CONTENT_SECTION="${HERMES_CONTENT_SECTION:-resources}"
HERMES_SLUG="${HERMES_SLUG:-}"
HERMES_RISK="${HERMES_RISK:-medium}"
HERMES_JURISDICTION="${HERMES_JURISDICTION:-general}"
HERMES_DRAFT_ONLY="${HERMES_DRAFT_ONLY:-1}"
HERMES_ALLOW_DIRTY_START="${HERMES_ALLOW_DIRTY_START:-0}"

RUN_ID="${HERMES_RUN_DATE}-${HERMES_SLUG}"
RUN_DIR="docs/content-runs/$RUN_ID"
EXCEPTION_REPORT="$RUN_DIR/exception-report.yml"
BASELINE_STATUS_FILE="$(mktemp "${TMPDIR:-/tmp}/kanso-hermes-baseline.XXXXXX")"
AFTER_STATUS_FILE="$(mktemp "${TMPDIR:-/tmp}/kanso-hermes-after.XXXXXX")"

cleanup() {
  rm -f "$BASELINE_STATUS_FILE" "$AFTER_STATUS_FILE"
}
trap cleanup EXIT

required_env() {
  local name="$1"
  local value="$2"
  if [[ -z "$value" ]]; then
    echo "Missing required environment variable: $name" >&2
    exit 2
  fi
}

write_exception() {
  local failed_gate="$1"
  local stderr_summary="$2"
  mkdir -p "$RUN_DIR"
  {
    echo "exception:"
    echo "  id: ${RUN_ID}-exception"
    echo "  status: open"
    echo "  createdAt: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
    echo "  profile: kanso-autonomous-content-draft"
    echo "  contentItemOrSprintId: $RUN_ID"
    echo "  failedGate: $failed_gate"
    echo "problem:"
    echo "  exactUnsupportedOrConflictingClaim: null"
    echo "  sourcePathsOrUrlsChecked: []"
    echo "  command: null"
    echo "  stderrSummary: |"
    printf '%s\n' "$stderr_summary" | sed 's/^/    /'
    echo "boundary:"
    echo "  escalationPolicy: docs/content-engine/EscalationPolicy.md"
    echo "  category: ci"
    echo "  founderApprovalGate: false"
    echo "decisionNeeded:"
    echo "  narrowDecision: Inspect failed autonomous draft run and decide whether to retry, revise prompt, or block topic."
    echo "  recommendedSafeFallback: Keep content unpublished and leave draft artifacts for review."
    echo "localContext:"
    echo "  worktree: $ROOT"
    echo "  gitSha: $(git rev-parse HEAD 2>/dev/null || echo unknown)"
    echo "  changedPaths:"
    git status --porcelain=v1 --untracked-files=all | sed 's/^.../    - /'
    echo "  credentialNamesOnly:"
    echo "    - $HERMES_PROVIDER"
  } > "$EXCEPTION_REPORT"
  echo "Wrote exception report: $EXCEPTION_REPORT" >&2
}

changed_paths() {
  git status --porcelain=v1 --untracked-files=all | sort > "$AFTER_STATUS_FILE"
  if [[ "$HERMES_ALLOW_DIRTY_START" == "1" ]]; then
    comm -13 "$BASELINE_STATUS_FILE" "$AFTER_STATUS_FILE" |
      sed 's/^...//' |
      sed '/^$/d'
  else
    sed 's/^...//' "$AFTER_STATUS_FILE" |
      sed '/^$/d'
  fi
}

allowed_paths_only() {
  local disallowed
  disallowed="$(
    changed_paths | while IFS= read -r changed_path; do
      case "$changed_path" in
        content/*|public/content/*|public/og/*|docs/content-runs/*|src/content/*|src/lib/content/*|scripts/content/*)
          ;;
        *)
          printf '%s\n' "$changed_path"
          ;;
      esac
    done
  )"

  if [[ -n "$disallowed" ]]; then
    write_exception "path-boundary" "Changed paths outside autonomous content allowlist: $disallowed"
    return 1
  fi
}

required_env HERMES_TOPIC "$HERMES_TOPIC"
required_env HERMES_READER_JOB "$HERMES_READER_JOB"
required_env HERMES_CANONICAL_JOB "$HERMES_CANONICAL_JOB"
required_env HERMES_SLUG "$HERMES_SLUG"

if [[ ! -x "$HERMES_BIN" ]]; then
  echo "Hermes binary not found or not executable: $HERMES_BIN" >&2
  exit 2
fi

if [[ "$HERMES_ALLOW_DIRTY_START" != "1" && -n "$(git status --porcelain=v1 --untracked-files=all)" ]]; then
  echo "Refusing to start autonomous Hermes run from a dirty worktree." >&2
  echo "Use a dedicated clean worktree, or set HERMES_ALLOW_DIRTY_START=1 for a supervised test." >&2
  git status --short --branch >&2
  exit 3
fi

git status --porcelain=v1 --untracked-files=all | sort > "$BASELINE_STATUS_FILE"

mkdir -p "$RUN_DIR"

PROMPT_FILE="$(mktemp "${TMPDIR:-/tmp}/kanso-hermes-content-prompt.XXXXXX")"
cat > "$PROMPT_FILE" <<PROMPT
You are Hermes running an unattended KansoBooks content-engine draft run.

This is one autonomous job. Do the full content loop yourself: topic scoring,
brief, research packet, draft, metadata/headline, SEO/AIEO pass, tone pass,
content review, claim audit, final audit, deterministic gates, and draft-only
publish log.

Hard boundaries:
- Write only these path groups: content/**, docs/content-runs/**, public/content/**, public/og/**.
- Do not edit src/**, package.json, package-lock.json, .env*, .github/**, supabase/**, config/**, or skills/**.
- Do not commit, push, create a PR, deploy, publish, or mark content as published.
- Keep state drafted when HERMES_DRAFT_ONLY=$HERMES_DRAFT_ONLY.
- If a gate fails or a claim is unsupported, stop and write $EXCEPTION_REPORT.

Use these repo-local authorities:
- docs/content-engine/HermesSetupGuide.md
- docs/content-engine/LocalHermesRunner.md
- docs/content-engine/EscalationPolicy.md
- config/hermes/profiles.yml
- config/hermes/toolsets.yml
- skills/
- skills/_shared/
- content/_truth/
- content/_data/canonical-jobs.yml

Run details:
- runId: $RUN_ID
- runDir: $RUN_DIR
- topic: $HERMES_TOPIC
- readerJob: $HERMES_READER_JOB
- canonicalJob: $HERMES_CANONICAL_JOB
- contentType: $HERMES_CONTENT_TYPE
- contentSection: $HERMES_CONTENT_SECTION
- slugOrId: $HERMES_SLUG
- risk: $HERMES_RISK
- jurisdiction: $HERMES_JURISDICTION

Expected minimum outputs:
- $RUN_DIR/topic-score.yml
- $RUN_DIR/brief.yml
- $RUN_DIR/research-packet.yml
- $RUN_DIR/draft-record.yml
- $RUN_DIR/claim-audit.yml
- $RUN_DIR/final-audit.yml
- $RUN_DIR/publish-log.yml
- content/$HERMES_CONTENT_SECTION/$HERMES_SLUG.md, with frontmatter type: $HERMES_CONTENT_TYPE.
- content/_claims/$HERMES_SLUG.yml
- content/_artifacts/$HERMES_SLUG.yml when an artifact is useful or required.

Required content constraints:
- Required answer units for tier 1 or tier 2 pages must be present in metadata
  and represented in the body: AnswerBlock, KansoTake, DecisionSupport,
  ProofBoundary, SourceNotes, NextStep.
- Medium and high risk content must include EntitySummary.
- Claims must cite sources that resolve.
- No tax, legal, audit, payroll, sales tax, filing, or entity-specific advice.
- No accountant replacement claim.
- No AI-as-financial-truth claim.
- No cloud-books implication.

Before final response, run and fix failures for:
- npm run content:validate
- npm run content:path-guard -- <all changed paths you wrote>
- npm run typecheck
- npm run lint
- npm run build

Final response must include changed files, gate results, final status, and
confirmation that no publish/commit/push/PR/deploy happened.
PROMPT

echo "Starting autonomous Hermes draft run: $RUN_ID"
echo "Model route: $HERMES_PROVIDER / $HERMES_MODEL"

HERMES_OUTPUT="$RUN_DIR/hermes-output.log"
if ! "$HERMES_BIN" -z "$(cat "$PROMPT_FILE")" --provider "$HERMES_PROVIDER" --model "$HERMES_MODEL" > "$HERMES_OUTPUT" 2>&1; then
  output="$(tail -80 "$HERMES_OUTPUT" 2>/dev/null || true)"
  write_exception "hermes-agent-run" "$output"
  rm -f "$PROMPT_FILE"
  exit 1
fi

rm -f "$PROMPT_FILE"

if ! allowed_paths_only; then
  exit 1
fi

mapfile -t CHANGED_PATHS < <(changed_paths)
if [[ "${#CHANGED_PATHS[@]}" -eq 0 ]]; then
  write_exception "no-output" "Hermes completed without changing any files."
  exit 1
fi

if ! npm run content:validate; then
  write_exception "content:validate" "npm run content:validate failed after Hermes run."
  exit 1
fi

if ! npm run content:path-guard -- "${CHANGED_PATHS[@]}"; then
  write_exception "content:path-guard" "npm run content:path-guard failed after Hermes run."
  exit 1
fi

if ! npm run typecheck; then
  write_exception "typecheck" "npm run typecheck failed after Hermes run."
  exit 1
fi

if ! npm run lint; then
  write_exception "lint" "npm run lint failed after Hermes run."
  exit 1
fi

if ! npm run build; then
  write_exception "build" "npm run build failed after Hermes run."
  exit 1
fi

echo "Autonomous Hermes draft run completed: $RUN_ID"
echo "Hermes output: $HERMES_OUTPUT"
echo "Changed paths:"
printf '  %s\n' "${CHANGED_PATHS[@]}"
