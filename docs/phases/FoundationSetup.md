# KansoBooks.com Foundation Setup

**Status:** Active execution plan / Foundation slice in progress
**Authority:** Website foundation plan. Subordinate to the canonical product docs:
`docs/KansoBooksManifesto.md`, `docs/KansoBooksVision.md`,
`docs/KansoBooksWedge.md`, and `docs/phases/gui/0.1.Design-System.md`.

## Goal

Create the production foundation for `KansoBooks.com` so the team can iterate
quickly from git to live previews without drifting into generic SaaS patterns.

The website must make the product thesis clear:

```text
Eve drafts.
Kanso proves.
You approve.
```

## Binding Architecture Decisions

| Area | Decision |
|---|---|
| Framework | Next.js App Router + TypeScript |
| Styling | Tailwind CSS with Kanso semantic tokens |
| Components | shadcn/ui copied components |
| Icons | `lucide-react` |
| Hosting | Vercel |
| DNS | Cloudflare DNS pointing to Vercel |
| Version control | GitHub |
| Control plane | Supabase |
| Merchant of Record | Lemon Squeezy |

## Product Boundary

Supabase is the control plane only.

Allowed cloud data:

- user profile and auth state
- Lemon Squeezy customer and license state
- entitlement state
- Eve credit ledger
- verified webhook receipts
- product download access metadata

Forbidden cloud data:

- bank transactions
- statements
- receipts
- invoices
- ledgers
- reconciliation state
- accountant packages
- local books files

KansoBooks is local-first. The website must not imply that the user's books
live in the cloud.

## Execution Checklist

### 1. Repository Hygiene

- [ ] Initialize git. Blocked in Codex sandbox: creating `.git` returns
      `Operation not permitted`.
- [x] Add `.gitignore`.
- [x] Remove `.DS_Store` files.
- [ ] Commit imported docs as the clean baseline. Blocked until git is
      initialized outside this sandbox.

### 2. Scaffold Website

- [x] Scaffold Next.js in this repo.
- [x] Use TypeScript, App Router, Tailwind, `src/`, and npm.
- [x] Confirm the app runs locally.

### 3. Install Core Dependencies

- [x] Install `lucide-react`.
- [x] Install `@supabase/supabase-js`.
- [x] Install `@lemonsqueezy/lemonsqueezy.js`.
- [x] Initialize shadcn/ui config manually.
- [x] Add only the UI components needed for the first slice.

### 4. Configure Kanso Design System

- [x] Replace default theme with Kanso semantic tokens.
- [x] Force institutional white as the only v1 theme.
- [x] Use Inter globally.
- [x] Avoid raw colors, gradients, dark surfaces, and decorative UI.

### 5. Build First Homepage Slice

- [x] Create a responsive homepage based on the canonical docs.
- [x] Lead with books-ready/accountant-ready positioning.
- [x] Include the trust loop: Eve drafts, Kanso proves, user approves.
- [x] Show local-first ownership clearly.
- [x] Include a restrained CTA for early access or download.

### 6. Add Control-Plane Stubs

- [x] Add `.env.example`.
- [x] Add Supabase browser/server helper structure.
- [x] Add Lemon Squeezy env names.
- [x] Add `/api/webhooks/lemonsqueezy` route.
- [x] Verify Lemon Squeezy signatures before parsing webhook data.
- [x] Leave database writes behind typed helper stubs until Supabase schema is
      created.

### 7. Verify

- [x] Run lint.
- [x] Run typecheck/build.
- [x] Start local dev server. Running at `http://localhost:3000`; local
      watcher reports `EMFILE` open-file warnings in this sandbox.
- [ ] Inspect the homepage in browser. Browser automation tool was unavailable;
      HTTP check returned `200 OK`.

### 8. Deploy Path

- [ ] Push to GitHub.
- [ ] Import repo into Vercel.
- [ ] Add environment variables in Vercel.
- [ ] Confirm production deploy from `main`.
- [ ] Confirm preview deploys from PRs.
- [ ] Point Cloudflare DNS to Vercel.

## First Slice Definition of Done

The foundation slice is done when:

- the repo has a clean git baseline
- the Next.js app builds
- Kanso design tokens are active
- the homepage reflects the manifesto and wedge docs
- Lemon Squeezy and Supabase are represented as control-plane stubs
- no cloud path stores or suggests storing user financial books data
