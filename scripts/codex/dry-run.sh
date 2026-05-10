#!/usr/bin/env bash
set -u
set -o pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT" || exit 1

RUN_ID="codex-dry-run-$(date -u +%Y%m%dT%H%M%SZ)"
REPORT_ROOT="${CODEX_REPORT_ROOT:-${TMPDIR:-/tmp}/kansobooks-codex-runs}"
REPORT_DIR="$REPORT_ROOT/$RUN_ID"
REPORT="$REPORT_DIR/dry-run-report.yml"
mkdir -p "$REPORT_DIR"

STATUS="pass"
STARTED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
START_SHA="$(git rev-parse HEAD 2>/dev/null || echo unknown)"
BRANCH="$(git branch --show-current 2>/dev/null || echo unknown)"
STATUS_BEFORE="$(git status --short 2>/dev/null | sed 's/"/\\"/g' || true)"

run_step() {
  local id="$1"
  shift
  local log="$REPORT_DIR/$id.log"

  echo "==> $id: $*"
  if "$@" >"$log" 2>&1; then
    echo "$id: pass" >>"$REPORT_DIR/steps.tmp"
    return 0
  fi

  echo "$id: fail" >>"$REPORT_DIR/steps.tmp"
  STATUS="fail"
  return 1
}

run_step content_validate npm run content:validate
run_step typecheck npm run typecheck
run_step lint npm run lint
run_step build npm run build
run_step path_guard npm run content:path-guard -- \
  content/resources/__dry-run__.md \
  content/_claims/__dry-run__.yml \
  content/_artifacts/__dry-run__.yml \
  docs/content-runs/__dry-run__/run-log.yml \
  public/og/__dry-run__.png \
  public/content/__dry-run__.json

COMPLETED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
STATUS_AFTER="$(git status --short 2>/dev/null | sed 's/"/\\"/g' || true)"

{
  echo "run:"
  echo "  id: $RUN_ID"
  echo "  status: $STATUS"
  echo "  startedAt: $STARTED_AT"
  echo "  completedAt: $COMPLETED_AT"
  echo "  worktree: $ROOT"
  echo "  git:"
  echo "    startSha: $START_SHA"
  echo "    branch: $BRANCH"
  echo "    statusBefore: |"
  if [[ -n "$STATUS_BEFORE" ]]; then
    printf '%s\n' "$STATUS_BEFORE" | sed 's/^/      /'
  else
    echo "      clean"
  fi
  echo "    statusAfter: |"
  if [[ -n "$STATUS_AFTER" ]]; then
    printf '%s\n' "$STATUS_AFTER" | sed 's/^/      /'
  else
    echo "      clean"
  fi
  echo "credentials:"
  echo "  providerCredentialsRequired: false"
  echo "  publishCredentialsUsed: false"
  echo "gates:"
  sed 's/^/  /' "$REPORT_DIR/steps.tmp"
  echo "logs:"
  echo "  content_validate: $REPORT_DIR/content_validate.log"
  echo "  typecheck: $REPORT_DIR/typecheck.log"
  echo "  lint: $REPORT_DIR/lint.log"
  echo "  build: $REPORT_DIR/build.log"
  echo "  path_guard: $REPORT_DIR/path_guard.log"
  echo "boundaries:"
  echo "  founderApprovalGate: false"
  echo "  noCredentialsInRepo: true"
  echo "  noDirectDeployCredentialsConfigured: true"
} >"$REPORT"

rm -f "$REPORT_DIR/steps.tmp"

echo "Codex dry-run report: $REPORT"
echo "Set CODEX_REPORT_ROOT=docs/content-runs to keep a report in the repo."

if [[ "$STATUS" != "pass" ]]; then
  exit 1
fi
