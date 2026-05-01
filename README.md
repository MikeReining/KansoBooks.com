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
npm run dev
```

Open:

```text
http://localhost:3000
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
