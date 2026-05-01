# Deploy Setup

**Status:** Initial production deploy complete
**Authority:** Deployment checklist for `KansoBooks.com`. Product and data
boundaries remain governed by `docs/KansoBooksManifesto.md`,
`docs/KansoBooksWedge.md`, and `docs/phases/FoundationSetup.md`.

## Goal

Connect GitHub, Vercel, Cloudflare DNS, Supabase, and Lemon Squeezy so each push
to `main` can safely ship the public website and control-plane routes.

## Current State

- [x] Local git repo exists.
- [x] `main` tracks `origin/main`.
- [x] GitHub remote: `https://github.com/MikeReining/KansoBooks.com.git`
- [x] Foundation commit pushed.
- [x] Local build passes.
- [x] Vercel project connected.
- [x] Production domain connected.
- [x] Supabase project created.
- [ ] Lemon Squeezy store/products/webhooks created.

## Live URLs

```text
https://kanso-books-com.vercel.app/
https://kansobooks.com/
https://www.kansobooks.com/
```

Current domain behavior:

- `https://kansobooks.com/` redirects to `https://www.kansobooks.com/`
- `https://www.kansobooks.com/` returns `200 OK`
- `https://kanso-books-com.vercel.app/` returns `200 OK`

## Vercel

1. Import the GitHub repo into Vercel.
2. Keep framework preset as `Next.js`.
3. Use npm install/build defaults:

```text
Install Command: npm install
Build Command: npm run build
Output Directory: Next.js default
```

4. Production branch:

```text
main
```

5. Confirm:

- pushes to `main` create production deploys
- pull requests create preview deploys
- deployment logs run `npm run build`

## Environment Variables

Add these in Vercel project settings.

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
LEMONSQUEEZY_API_KEY
LEMONSQUEEZY_STORE_ID
LEMONSQUEEZY_WEBHOOK_SECRET
LEMONSQUEEZY_DESKTOP_YEARLY_VARIANT_ID
LEMONSQUEEZY_EVE_CREDIT_PACK_VARIANT_ID
```

Production value:

```text
NEXT_PUBLIC_SITE_URL=https://kansobooks.com
```

Preview deploys may use Vercel preview URLs until auth redirect rules are
configured.

## Cloudflare DNS

Keep Cloudflare as DNS provider. Add the Vercel-provided DNS records after the
domain is attached in Vercel.

Expected domains:

- `kansobooks.com`
- `www.kansobooks.com`

Confirm SSL is active in Vercel before announcing the URL.

## Supabase Control Plane

Supabase stores control-plane data only.

Initial tables to create in the next backend slice:

- `profiles`
- `lemon_squeezy_customers`
- `licenses`
- `entitlements`
- `eve_credit_ledger`
- `webhook_events`

Forbidden tables:

- transactions
- statements
- receipts
- ledgers
- reconciliation state
- accountant packages

## Lemon Squeezy

Create:

- store
- yearly desktop license product
- Eve credit pack product
- webhook signing secret

Webhook endpoint:

```text
https://kansobooks.com/api/webhooks/lemonsqueezy
```

Preview/staging endpoint can be added later if needed.

Webhook handling rules:

- verify `x-signature` before parsing payloads
- record each event idempotently
- update Supabase entitlements only after verification
- never use webhook payloads to store financial books data

## Verification

Before the first production announcement:

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [x] Vercel production deploy succeeds
- [x] homepage loads at apex domain
- [x] `www` redirects or resolves cleanly
- [ ] Lemon Squeezy test webhook returns `200`
- [ ] webhook event is recorded idempotently in Supabase
