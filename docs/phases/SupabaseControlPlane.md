# Supabase Control Plane

**Status:** Initial schema applied in Supabase
**Authority:** Backend control-plane schema for the website. Subordinate to the
local-first boundary in `docs/KansoBooksManifesto.md` and
`docs/KansoBooksWedge.md`.

## Scope

Supabase stores account and entitlement state only.

Allowed:

- profiles
- Lemon Squeezy customer links
- signed webhook receipts
- desktop license state
- entitlement state
- Eve credit balance ledger

Forbidden:

- transactions
- statements
- receipts
- invoices
- ledgers
- reconciliation state
- accountant packages
- local books files

## Migration

Initial migration:

```text
supabase/migrations/20260501170000_control_plane.sql
```

Tables:

- `profiles`
- `lemon_squeezy_customers`
- `webhook_events`
- `licenses`
- `entitlements`
- `eve_credit_ledger`

## Webhook Flow

```text
Lemon Squeezy
  -> Next.js /api/webhooks/lemonsqueezy
  -> verify x-signature
  -> insert webhook_events idempotently
  -> update licenses / entitlements / eve_credit_ledger
```

## RLS Posture

Users may read their own profile, licenses, entitlements, and Eve credit ledger.

Webhook writes and entitlement mutation use the Supabase service role from
server-only Next.js routes. Service role keys must never be exposed to the
browser.
