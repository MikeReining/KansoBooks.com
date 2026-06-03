# KansoBooks.com

Website and control-plane foundation for KansoBooks.

KansoBooks helps small-business owners get their books ready, correct, and
packaged for their accountant without giving up ownership of their financial
files.

```text
Eve drafts.
Kanso proves.
You approve.
```

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS with Kanso semantic tokens
- shadcn/ui-style local components
- lucide-react icons
- Supabase as control plane
- Lemon Squeezy as Merchant of Record
- Vercel hosting
- Cloudflare DNS

## Product Boundary

Supabase is the control plane only. It can store accounts, licenses,
entitlements, Lemon Squeezy webhook receipts, Eve credit balances, and download
access metadata.

It must not store customer books data:

- bank transactions
- statements
- receipts
- invoices
- ledgers
- reconciliation state
- accountant packages
- local books files

The user's books live in local files they own.

## Local Development

```bash
npm install
npm run dev -- --port 48623
```

Open:

```text
http://localhost:48623
```

Do not run this project on `3000` or `3001`; those ports are reserved for other
local projects and commonly collide.

Suggested shell helper:

```zsh
kanso.() (
  set -euo pipefail

  local SITE_DIR="$HOME/Documents/GitHub/KansoBooks.com"
  local PORT=48623
  local pids=""

  cd "$SITE_DIR"

  pids="$(lsof -tiTCP:$PORT -sTCP:LISTEN 2>/dev/null || true)"

  if [[ -n "$pids" ]]; then
    echo "Killing process on port $PORT: $pids"
    kill -9 $pids 2>/dev/null || true
  fi

  echo "Clearing stale Next dev state..."
  rm -rf .next/dev

  echo "Starting KansoBooks.com at http://localhost:$PORT ..."
  npm run dev -- --port "$PORT"
)
```

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and fill in values as services are created.

Required before production billing flows:

- Supabase project URL
- Supabase anon key
- Supabase service role key
- Lemon Squeezy API key
- Lemon Squeezy store ID
- Lemon Squeezy webhook secret
- Lemon Squeezy product variant IDs

## Canonical Planning Docs

- `docs/KansoBooksManifesto.md`
- `docs/KansoBooksVision.md`
- `docs/KansoBooksWedge.md`
- `docs/phases/FoundationSetup.md`
- `docs/phases/gui/0.1.Design-System.md`
