# KansoBooks Manifesto

**Status:** Canonical / North Star
**Authority:** Sits above `Docs/KansoBooksVision.md`, `Docs/MVP.md`, and
`Docs/KansoBooksRoadmap.md`. When this doc and any other doc disagree on
strategic direction, this doc wins and the other doc is patched to match.

## One-Sentence Position

KansoBooks lets small-business owners finish their books with AI-speed
execution and proof-grade trust: AI prepares the work, Kanso proves it, and
the user owns the result in simple local files.

## The Macro Thesis

Five conditions are now true at once:

1. Software cost is collapsing. AI writes most of the code.
2. Intelligence cost is collapsing. LLMs categorize, reconcile, and explain.
3. Agent protocols exist. MCP, structured tool use, and JSON-first APIs make
   automation portable.
4. Local compute is sufficient. Apple Silicon and on-device inference are
   production-grade for deterministic local work.
5. Cloud rent is still being charged. Incumbents gate APIs, raise prices, and
   restrict AI access to their own data. QuickBooks Online lists `$38-$275/mo`
   public pricing. Xero's developer pricing is migrating to usage/connection
   tiers with AI-data restrictions effective March 2, 2026.

When these conditions co-exist, the value chain inverts. The proprietary
database moat is no longer defensible. AI alone is also not defensible:
unverified AI bookkeeping destroys trust the first time it is wrong.

The defensible position becomes:

```text
AI does the work.
Kanso proves the work.
The user owns the books.
```

When the AI coworker is implemented through a managed agent runtime such as
Cursor's harness, the product anchor is:

```text
Eve drafts.
Kanso proves.
You approve.
```

Implementation-specific anchor:

```text
Eve is the coworker.
Cursor is the first runtime adapter.
Kanso Interface / MCP is the authority boundary.
Kanso is the truth engine.
```

## The Inversion

| Old world | New world |
|---|---|
| Books live in vendor cloud | Books live in a folder you own |
| Vendor controls API access | Format is open; trusted tools can read and draft |
| Per-seat / per-feature SaaS rent | Pay for experience, intelligence, and trust |
| Accountants do data entry | Accountants verify and exercise judgment |
| AI is bolted onto closed data | AI works over user-owned books |
| Automation mutates hidden state | Proposals, validation, approval, and audit are visible |

This is the same pattern that already happened in adjacent stacks:

| Industry | Open format that broke the moat | Reference experience that captured value |
|---|---|---|
| Source code | Plain text + Git | GitHub, then Cursor |
| Web publishing | HTML | WordPress, Vercel |
| Maps | OpenStreetMap | Mapbox |
| Documents | Markdown | Bear, Obsidian, Notion |
| Databases | Postgres, SQLite | Supabase, Neon, Turso |
| Email | SMTP / IMAP | Superhuman, HEY |

Accounting is the conspicuous exception. KansoBooks closes that gap.

## The Right Analogy

External language:

```text
Your books live in simple files you own.
```

Internal strategy:

KansoBooks follows the Markdown pattern, not the Linux-for-accounting pattern.

- Linux-style framing (Beancount, Ledger CLI, hledger) requires engineers and
  has not crossed into mainstream small business use.
- Markdown-style framing requires the format to be simple, durable, and
  tool-readable while the best product remains the easiest way to write it.

The format must be inevitable. The product must be the easiest way to use it.

## Three Artifacts

KansoBooks is three things, only one of which is the business:

| Artifact | License | Purpose | Captures value? |
|---|---|---|---|
| **Format** (`kanso-format`) | Open, permissive | Portable on-disk representation of a business's books. The standard. | No. Public good. Moat-killer. |
| **Engine** (`kanso-core`) | Open source | Validator, posting, reconciliation, ledger, report projection, importers, exporters. Reference implementation. | No. Credibility and ecosystem. |
| **Product** (KansoBooks Desktop) | Commercial | Reference experience where AI drafts the work, Kanso validates and posts, and the user exports an accountant-ready package. | Yes. The business. |

The format and engine are the public good. The product is the commercial wedge.
This is the **Postgres + Supabase, Git + GitHub, Markdown + Bear** pattern.

The Kanso Interface is the public contract that makes the format addressable
by agents and third-party tools. MCP is the v1 transport for that interface,
not the strategy itself.

```text
The format is the artifact.
The interface is the standard.
The agents are the proof.
```

## Pricing Posture

Strategic anchor: **Bench-quality output at QuickBooks-or-lower prices.**

The wedge product (`Docs/KansoBooksWedge.md`) ships books-ready output:
income statement, balance sheet, general ledger, trial balance,
reconciliation, evidence index, and accountant package at price points that
disrupt the incumbents. Margin comes from the experience, the trust posture,
and the absence of cloud rent — not from per-seat or per-feature gating.

Comparison anchors as of v1 launch window:

- QuickBooks Online: $38-$275/mo public pricing
- Bench: $299-$499/mo bookkeeping service
- Wave: free, but does not produce audit-ready posted books

The format is free. The engine is open source. The product is paid,
deliberately at the low end of the value it delivers.

## Why Incumbents Cannot Follow

QuickBooks, Xero, FreshBooks, and Sage cannot ship local-first books with an
open format without cannibalizing the cloud subscription, API rent, and
ecosystem fees that constitute their core revenue.

This is innovator's dilemma in textbook form. The thing they cannot do is the
thing the next era requires.

What they can do is acquire later. That is also an acceptable outcome.

## Who Shows Up

KansoBooks is for online small business operators, not shoebox-receipt users.

Primary ICP:

- SaaS, e-commerce, agency, creator, indie dev, real estate operator,
  consultant
- Bank statements, credit card statements, and payment processor reports
  (Stripe, PayPal, Shopify, Square) account for ~99% of data entry
- Few or no employees
- Annual revenue $50K-$2M
- Closes monthly, quarterly, or annually
- Already disgusted by QuickBooks pricing/UX, or paying a bookkeeper $300-$1500
  per month and unsure what they are getting
- Comfortable with files-on-disk and "I will send my accountant the folder"
- Willing to pay for "my books are ready, correct, and safe to send"

Receipts and OCR are supporting evidence, not the center. Statement-first books
are the wedge.

## The Accountant Shift

Accountants are not displaced. They move up the stack.

```text
data-entry accountant -> review/sign-off accountant -> advisor / accountability
```

KansoBooks makes books clean before the accountant sees them. That reduces
their hours, increases margin per client, and shifts billable work toward
judgment. Accountants who lean in become a distribution channel. Accountants
who resist lose share to ones who do not.

The format makes the accountant's job easier, not obsolete. The product is
sold *through* accountants, not against them, in time.

## What KansoBooks Is Not

- Not a better QuickBooks. Replacement is a downstream consequence, not a
  positioning claim.
- Not a third tool sitting beside Expensify and QuickBooks.
- Not black-box AI bookkeeping. AI prepares the work; Kanso validates,
  posts, and audits; the user approves what becomes true.
- Not a developer-only product. Devs and prosumers are the credibility
  amplifier; non-dev operators are the customer.
- Not a free product. The format is free. The engine is open source. The
  product is paid.
- Not a sync/cloud database product. Sync is bring-your-own (Git, iCloud,
  Dropbox) or future. The local file is the source of truth.
- Not a real-time collaboration product in v1. The unit of collaboration is the
  closed period and its export package.

## Strategic Anchor

```text
Your books are correct.
You can prove it.
You are done.

Open the bottom layer.
Sell the trusted experience.
Make the format inevitable by making the product obvious.
```

## Falsification Conditions

This thesis is wrong if:

- a major incumbent successfully ships local-first, open-format books in the
  next 24 months without cannibalizing themselves
- AI-assisted drafting remains too unreliable for non-experts to trust at the
  v1 ICP segment, even with deterministic validation and human approval
- mainstream users reject BYO AI, managed Eve is required for the wedge, and
  Eve's observed cost cannot fit the wedge margin model
- the open format gets adopted in name but not in tooling, leaving us as the
  only writer to it (a Beancount outcome)
- payment processors and banks restrict CSV/statement export in ways that make
  statement-first books impractical
- local-first sync cannot be solved cheaply for multi-device or
  accountant-collab use within 12 months of v1 ship

We watch for these signals. If two or more land, the thesis needs reopening.

## Downstream Implications

Existing docs must be re-parented under this manifesto:

- `Docs/KansoBooksVision.md` describes the *product* north star. This doc
  describes the *strategic* north star. Vision is downstream.
- `Docs/MVP.md` describes the *first commercial vehicle*. The wedge spec in
  `Docs/KansoBooksWedge.md` describes the same thing at a higher altitude.
  MVP must not contradict Wedge.
- `Docs/KansoBooksRoadmap.md` describes the *execution sequence*. It must be
  patched to make adoption of the format an explicit consequence of every
  sprint that touches storage, import, or export.
- `Docs/TechStack.md` currently treats SQLite as canonical durable storage.
  Under this manifesto the canonical durable form is the on-disk
  business folder defined in `Docs/KansoFormat.md`. SQLite remains the
  regenerable cache. `TechStack.md` is to be patched to reflect this.
- `Docs/KansoBooks_Trust.md`, `Docs/EvidencePolicy.md`, and the contract
  foundation docs (`Docs/1..7`) survive intact. They describe properties of
  the format and engine, not assumptions about deployment.

## Closing Anchor

```text
Your AI does the work.
Kanso makes sure it is correct.
You own the result.
```
