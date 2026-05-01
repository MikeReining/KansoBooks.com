# KansoBooks Wedge

**Status:** Canonical / First Commercial Vehicle
**Authority:** Subordinate to `Docs/KansoBooksManifesto.md`. Supersedes
`Docs/MVP.md` on segment, moment of value, and pricing posture. `Docs/MVP.md`
is to be patched to align with this doc. Existing contract, validator,
storage, and surface work in `crates/` and `apps/` is preserved and
re-parented under this wedge.

## Purpose

Define the first commercial product KansoBooks ships that:

1. people pay for
2. solves an emotionally real moment
3. writes the Kanso Format on disk as a side effect
4. produces audit-ready output that can be handed to an accountant or
   tax authority unchanged

The wedge is the **vehicle** that drives format adoption. It is not the
thesis. The thesis is `Docs/KansoBooksManifesto.md`.

The external wedge is singular:

```text
Get your books ready.
Send them to your accountant.
Done.
```

The internal machinery is separate: `BooksPeriod`, period close, close gate,
posting, reconciliation, reports, and audit package. Those terms are allowed
inside contracts and engineering docs. They are not the product promise.

## Strategic Posture

Two product shapes were considered:

- **Wedge A — "books prepped for your accountant":** categorized, reviewed,
  evidence-attached transaction set; clean CSV export. No posting, no IS/BS.
  Faster to build; weaker promise; sits on top of QuickBooks.
- **Wedge B — "books ready, proven, and packaged":** cash-basis posting,
  double-entry journal, reconciliation, income statement, balance sheet,
  general ledger, trial balance, audit-ready package. Replaces QuickBooks
  for the ICP.

The choice is **Wedge B with Wedge A pricing.** Bench-quality output at
QuickBooks-or-lower price points. This is the disruptive path.

The wedge is tractable because of two co-equal unlocks:

1. **Local, verifiable books.** Kanso Format + contracts + engine make every
   claim traceable, reproducible, and owned by the user.
2. **AI coworker execution.** The user's existing AI tool drafts the scary
   mechanical work while Kanso validates, projects, and gates what becomes
   true.

```text
Cash basis all year  +  smart year-end adjustments  =  audit-ready output

BYO AI drafting  +  Kanso validation  =  speed without black-box trust
```

Adjustments are a **constrained set of decision kinds** (auto-reversing on
the first day of the next period), not a continuous accrual engine.
`Docs/AccountingModel.md` will own the formal spec.

The wedge ICP is scared of bookkeeping and lacks confidence; a brand-new
product from a brand-new vendor cannot win by asking them to learn accounting
or trust opaque automation. The wedge wins because AI does the first draft
and Kanso makes the result prove itself. KansoBooks does **not** subsidize
cloud AI in the free/pre-purchase critical path; the user's own AI tool
(Claude Cowork, Cursor, Codex, or another MCP client) is the drafting
surface. `Docs/MCPSurfaceModel.md` owns that surface.

```text
Your AI does the work.
Kanso makes sure it is correct.
You get your books done.
```

For the managed Eve path:

```text
Eve drafts.
Kanso proves.
You approve.
```

For the Cursor-backed implementation:

```text
Eve is the coworker.
Cursor is the first runtime adapter.
Kanso Interface / MCP is the authority boundary.
Kanso is the truth engine.
```

## One-Sentence Wedge

> **Get your books ready for your accountant. Send the package. Done.**

## Who Shows Up

Sharp, narrow ICP for v1. Anyone outside this is post-v1.

- Online small business operator: SaaS founder, indie dev, agency owner,
  creator, real-estate operator, consultant
- Solo or 1-3 contractors; no W-2 payroll
- Annual revenue $50K-$2M
- Source data is bank statements and credit card statements. Payment
  processor / ecommerce settlement imports are v2; v1 may detect those
  workflows as a fit warning, but MUST NOT claim it can take them over.
- Receipts exist for some transactions but are not the dominant input
- Closes monthly, quarterly, or annually
- Already paying QuickBooks, Wave, a bookkeeper, or scrambling in March/April
- Has a CPA they trust to file taxes; wants to hand them clean books

This person never used a shoebox. They have chaotic data, not missing data.

## Moment of Value

Books ready for accountant or tax-time review. This is the external wedge.

```text
"I got Q1 ready.
 The numbers match my statements.
 The evidence is attached.
 My accountant has the package.
 I do not have to think about this until next quarter."
```

The engine organizes everything around a formal period close. The product
does not lead with that language. Daily bookkeeping is not the wedge.
Real-time dashboards are not the wedge. The wedge is **books-ready
confidence**: the user can hand off a package and understand what still
needs attention.

External language MUST stay anchored on readiness. Internal language may
describe how readiness is proven.

### Language boundary

The full naming SSOT lives in `Docs/Naming.md`. The summary below restates
what matters for the wedge.

Internal docs and contracts may use:

- period close
- close gate
- reconciliation
- chart of accounts
- `BooksPeriod` (the work unit; replaces the legacy `Report` contract
  name; user-facing copy never uses either)
- `ReportOutput` (a generated financial output: P&L, BS, GL, TB, etc.;
  user-facing copy uses the actual output name)
- `AccountantPackage` (the bundled handoff artifact; user-facing copy
  may say "package for your accountant")
- `AgentProposal`, `JournalEntryProposal` (internal MCP primitives;
  user-facing copy never uses these words)

Internal names MUST NOT appear in UI copy, onboarding, help text, marketing
copy, user-facing error messages, or user-visible logs. Audit/event payloads
and developer logs may use contract names where required for determinism,
but any user-visible rendering must translate them through this language
boundary.

UI copy MUST be written from the language boundary, not mirrored from
contract names.

First-run and non-expert UI copy MUST prefer:

- get books ready
- ready for your accountant
- ready for taxes
- statement check
- categories
- finish January / finish Q1 / finish 2026
- things to fix before you're done
- routine fixes ready to apply
- work with your AI assistant

The first session MUST NOT ask the user to "create a chart of accounts,"
"close a period," "reconcile accounts," or "create a report" before the
product has translated those concepts into plain actions.

User-facing copy MUST NOT use:

- "create a report" / "run a report" / "process expenses" (Expensify-era
  holdover)
- "AI proposals" / "AI inbox" / "Run AI"
- "Accept 8 / Review 2" (mechanical task-list framing; emotional progress is
  the dominant copy)
- "Enable MCP" / "Configure agent integration"

Numbers are not the hero. Emotional progress is. The dominant readiness
copy is "You're close. 3 things left before you're done.", not a count of
items in a queue.

## What v1 Ships

### Inputs

- bank account CSV / OFX / QFX (n bank profiles, starting with the most
  common: Chase, BMO, RBC, TD, Amex, Capital One)
- credit card CSV / OFX / QFX
- optional receipt PDFs and images
- optional Expensify CSV/PDF (carries through from existing Sprint 2.5 work)

Drag-and-drop and Cmd+V paste are primary. File-dialog is fallback.

Payment processor and ecommerce settlement imports (Stripe, PayPal,
Shopify, Square, marketplace payouts, chargebacks, gross/fee/net payout
splits) are **not v1 inputs**. v1 may recognize processor-like activity as
a coverage warning in the fit on-ramp, but must route the user to "partial
fit / v2 needed" rather than importing processor files as financial truth.

### First session: blank page, momentum, and "wow"

Manual export of many CSVs is real friction. v1 does **not** use bank
aggregators (Plaid, Teller, etc.) to fix that; economics and local-first
posture are binding. The fix is a **fast file-based onramp** and direct paths
where they exist (OFX/QFX), not a Link widget.

- **Problem:** A user must not face an empty product after one file; the
  first **minute** should end in a populated set of books and a short list of
  things to fix before you're done, not a tour.
- **Fit posture:** the user drops files first. Kanso runs a progressive
  books-completeness check before setup and MUST NOT say "Kanso can take
  this over" from a single file. It can say "We can work with this file" and
  ask for the main bank account, primary card(s), and any unsupported
  workflow indicators needed to assess coverage.
- **Setup posture:** after the fit check reaches sufficient coverage, the
  user chooses a plain-language business shape. Kanso creates the starter
  category structure from contract-owned CoA templates. The user can rename,
  add, archive, or correct categories later; validator rules protect posted
  history.
- **Wow for this ICP** is not "connected in 60s" (commodity). It is: *after*
  data lands, intelligent flags — transfers, personal, duplicates, capital
  vs expense, policy outcomes — with **reasons** (validator-owned and
  explainable).
- **Cost posture:** the free/pre-purchase onramp MUST NOT depend on cloud AI.
  Template setup, file detection, policy evaluation, category suggestions, and
  repeated-decision suggestions must have deterministic local paths first.
- **Tactics batch:** many files at once, auto-detect format/account, zero
  column mapping for supported profiles, parallel per-file status, optional
  guided "how to export from your bank" for painful institutions.
- **No false YES:** the on-ramp separates low-confidence file detection from
  high-confidence takeover decision. "YES" is allowed only after account
  coverage is sufficient and unsupported flows are not detected.
- **Long form:** `Docs/BankConnectionStrategy.md` (aggregator model, v1
  onramp table, re-open conditions, falsification).

### Engine work

- normalize bank/card sources to canonical `BankTransaction` records
- detect income, expense, transfers, refunds, bank/card fees, and personal items
- propose categories with explainable confidence factors
- pair transfers between source accounts
- detect duplicates across sources
- surface ambiguous and suspicious rows
- attach receipt evidence where present
- **cash-basis posting:** every accepted transaction maps to one or more
  journal entries via deterministic posting rules (see
  `Docs/AccountingModel.md`)
- **constrained year-end adjustments:** v1 supports exactly six adjustment
  kinds, fully specified in `Docs/AccountingModel.md`. Timing-difference
  adjustments auto-reverse on the first day of the next period; permanent
  reclassifications do not.
  - `unpaid_receivable` — revenue earned, not yet received (auto-reverses)
  - `unpaid_payable` — expense incurred, not yet paid (auto-reverses)
  - `prepaid_expense` — cash paid, expense applies to a future period
    (auto-reverses)
  - `unearned_revenue` — cash received, revenue earned in a future period
    (auto-reverses)
  - `owner_draw_reclass` — bank withdrawal reclassified to equity
    (permanent; no reverse)
  - `capitalize_and_depreciate` — large purchase reclassified as fixed
    asset with first-year depreciation entry (permanent; multi-year
    schedule management is **not** in v1 — see
    `Docs/KansoBooksKillList.md`)
  Anything outside this set is post-v1.
- **reconciliation per source account:** opening balance + posted inflows
  − posted outflows = expected closing; compared against the source
  statement's closing balance. Difference, if any, is itemized.
- **financial output generation from the journal** (not from categorized
  transactions): income statement, balance sheet, general ledger, trial
  balance, reconciliation summary, evidence index.
- **audit-ready package**: bundled folder of generated financial outputs plus the
  Kanso Format folder snapshot for the closed period.

### User experience

- Intake: drop files, see per-file streamed status
- Guided setup: choose business shape, import files, see starter categories
  without accountant jargon
- Issue queue: a finite, ordered list of "things to fix before you're done"
- Per-row review: confirm, change category, mark personal, mark transfer,
  defer, attach evidence
- Confidence visible per claim, with reasons
- Grouped routine review: recurring subscriptions and other clean repeated
  decisions can be filtered, expanded, row-deselected, and applied in bulk;
  audit still records one decision per transaction
- Year-end adjustment workbench: proposed adjustments with reasons, debit/
  credit preview, auto-reverse date, accept/reject/edit
- Statement check screen per source account (internal: reconciliation): matched
  vs. difference, with the unmatched items called out. If CSVs omit statement
  balances, the screen routes to PDF extraction, manual balance entry, or
  statement-manifest edit conversion before close can pass.
- **Close gate:** a period cannot transition to `closed` until every
  required condition holds. The gate is the operational definition of "you
  are done" internally (see "Close Gate" below). User-facing copy should render
  this as books readiness.
- Readiness screen: "ready / needs review / blocked," with counts and the gate
  conditions visible in plain language
- Export: clean CSV, accountant package (zip), audit-ready package, and a
  generated `ACCOUNTING.md` + folder layout reflecting the closed period
- Reopen/reclose: a closed period can be reopened with an explicit reason,
  corrected through append-only decisions / reversing entries, and reclosed
  into a new close snapshot. Prior close/package hashes remain traceable and
  are never silently erased.

### Work with your AI assistant (Kanso Interface / MCP coworker surface)

The wedge is dramatically stronger when the user's existing AI tool can
inspect the Kanso folder and draft fixes for review. KansoBooks owns
posting, validation, and the close gate; the user's AI does the mechanical
drafting work the user is scared of doing alone.

Eve is the named AI coworker product surface; `Docs/Eve.md` owns the
runtime-agnostic persona, voice, consent, and pricing posture. Cursor's
TypeScript SDK, Composer 2, and agent harness may let KansoBooks offer
Cursor-backed Eve inside the desktop product without changing the authority
boundary. The leverage is the whole harness: skills, hooks, subagents,
context management, durable runs, and model routing. That runtime adapter plan
lives in `Docs/EveCursorRuntimeAdapter.md`; the Kanso Interface remains the
proposal lifecycle and safety boundary. MCP is the v1 transport for that
interface.

MCP is the multiplier, not the foundation. The foundation is the deterministic
books-ready loop: import → match → review → statement check → readiness
gate → accountant package. That loop MUST work without MCP. MCP accelerates
the path to completion.

- First-run onboarding never says "Enable MCP." It says: *"Work with your AI
  assistant. Let Claude, Cursor, or Codex inspect your Kanso folder and
  draft fixes for review."*
- Read tools are granted by default. Write tools require explicit grant in
  `policies/agents.yaml`.
- Every agent-issued mutation lands as an `AgentProposal`. Kanso embeds a
  `validation_result` and a `journal_projection` on receipt; the agent
  cannot assert either.
- The user reviews **things to fix**, not "AI proposals." Routine fixes
  bundle into a single accept; non-routine fixes surface individually.
- Only Kanso's projection can become a posted journal entry. The agent may
  suggest journal-entry structure; Kanso re-projects from contract-owned
  posting rules.
- v1 approval lives in the Kanso GUI Proposal Queue or the `kanso review`
  CLI. Inline approval through MCP elicitation is post-v1.
- v1 contracts accept exactly one `disposition_rule`: `requires_human_review`.
  Auto-promotion is post-v1, off by default, and gated by validator
  coverage. Trust before friction.
- The full surface contract — proposal lifecycle, discovery, tool inventory,
  diagnostics, simulation, structured errors, `policies/agents.yaml` schema,
  audit events, consent posture, language rules — lives in
  `Docs/MCPSurfaceModel.md`.

#### Slip rule

The wedge MUST pass Founder Smoke without MCP. Do not let the agent surface
mask weakness in import, validation, posting, reconciliation, or packaging.

MCP-1/2/3 are necessary but no longer sufficient for the category-defining
experience:

- MCP-1 (read tools)
- MCP-2 (Phase 1 propose tools: `change_category`, `pair_transfer`,
  `mark_personal`, `attach_evidence`)
- MCP-3 (Phase 2 propose tools: posting, the six v1 adjustment kinds,
  accountant summary)
- M0 Kanso Interface, Help, And Recovery SSOT Drift Wall
  (contract-owned registry, generated manifest/schemas/help/doctor/prompt
  artifacts/examples, parity checks, feature-impact gate, drift fixtures, Eve
  runtime discovery)
- F4 stdio transport (real external clients can connect)
- MCP-2.5 developer experience (discovery, generated help/recovery,
  structured errors, doctor, dry-run, simulate close)

If MCP work destabilizes the accounting engine, the engine wins and the
agent surface slips. The product may not claim the AI coworker experience
until MCP-1/2/3, M0, F4, and the MCP-2.5 minimum pass their own smoke.
MCP-2.6 setup is required before Founder Smoke uses a real external client.
MCP-2.7 memory is useful but not required for first external-client proof.
MCP-4 (export tools) may slip to v1.1. MCP-5 (auto-promotion +
MCP-elicitation approval) is post-v1 by default.

Never ship "AI-assisted broken accounting." The agent path is allowed to make
the work faster; it is not allowed to make the books less correct.

### Online demo trust bridge

Cold outreach cannot start by asking strangers to download a local financial
app and drop in real data. The trust bridge is an online fake-data demo, but
only after the local app proves the full loop.

Ordering:

- build the local MVP first
- pass Phase 9 Founder Smoke in the desktop app
- mirror the shipped GUI in the online demo
- use the demo for outreach only after the local fit on-ramp can honestly say
  supported / partial / not v1 fit

The online demo MUST:

- use fake, synthetic, or sanitized fixture data only
- show the same loop as the desktop product: files, issues, AI-drafted
  proposals, approval, validation, readiness, close/reclose, package preview
- make clear that real user books are assessed locally, not in the browser
- route processor/ecommerce signals to partial-fit / v2-needed language
- label any AI coworker replay as replay unless it is a live MCP demo against
  a local sample folder

The online demo MUST NOT:

- accept real financial-data upload
- become hosted bookkeeping
- invent web-only accounting semantics
- use different copy or readiness rules than the desktop GUI
- ship before the local MVP can finish demo books

### What v1 writes to disk

The Kanso Format folder, as defined in `Docs/KansoFormat.md`:

```text
my-business/
  ACCOUNTING.md
  accounts.yaml
  policies/evidence.yaml
  transactions/<year>/<month>.jsonl
  evidence/<statements|receipts>/
  decisions/<year>.jsonl
  ledger/<year>/journal.jsonl          # posted entries (v1 active)
  reports/<period>-income-statement.md
  reports/<period>-balance-sheet.md
  reports/<period>-general-ledger.csv
  reports/<period>-trial-balance.csv
  reports/<period>-reconciliation.md
  reports/<period>-audit-package.zip
  audit/<year>.jsonl
  .kanso/
```

This is non-negotiable. Every completed `BooksPeriod` in v1 produces a
portable folder the user, their accountant, an MCP agent, or a future tool
can read.

### Close Gate

The formal close-gate definition lives in `Docs/AccountingModel.md`. v1
ships nine conditions. A period transitions to `closed` only when ALL hold:

1. every source account has a statement imported through the period end
2. every transaction in the period has a category and a `post_transaction`
   decision
3. every transfer between source accounts is paired
4. every personal expense is marked
5. every receipt-required (per evidence policy) transaction has either
   evidence attached or an explicit accepted decision
6. every source account is reconciled (statement closing = ledger expected
   closing, or `accept_difference` decision exists with reason)
7. all proposed year-end adjustments are accepted, edited, or explicitly
   rejected
8. the things-to-fix queue is empty (internal: every issue is resolved or
   accepted)
9. the trial balance balances (Σ debits = Σ credits across the period)

Until all nine hold, the readiness screen shows what is missing and points
at the next action. After all nine hold, posting is committed, financial
outputs generate from the journal, and the audit-ready package writes
atomically.

Closed is not irreversible. v1 MUST allow a user to reopen a closed period
with a reason, fix mistakes, and reclose. Reopen/reclose MUST preserve the
prior close snapshot and package hash in audit history. Posted journal lines
are never mutated; corrections append reversing or adjusting entries and a
new close snapshot supersedes the prior one.

### What v1 does NOT ship

These are out of v1 scope by intent. See also
`Docs/KansoBooksKillList.md`.

- bank aggregators / Plaid-style OAuth (CSV / OFX / QFX / batch import;
  see `Docs/BankConnectionStrategy.md`)
- payment processor / ecommerce settlement imports (Stripe, PayPal,
  Shopify, Square, marketplace payouts, chargebacks, gross/fee/net payout
  reconciliation). v1 detects these as fit warnings; v2 owns support.
- multi-entity consolidation
- payroll, invoicing, inventory, sales tax
- a tax-filing surface
- real-time multi-user collaboration
- cloud sync (BYO sync)
- a marketplace, plugin store, or public API
- continuous accrual engine; real-time AR/AP; in-product invoicing — only
  the v1 year-end adjustment set is supported
- multi-year depreciation schedule management, asset register UI, multiple
  depreciation methods beyond straight-line and declining-balance,
  jurisdiction-specific tax classes (e.g. CCA classes, Section 179),
  amortization tables. v1 supports the year-end capitalize + first-year
  depreciation decision per `Docs/AccountingModel.md`; ongoing schedule
  management is post-v1.
- dark mode
- mobile

## Why This Wedge

| Property | Wedge fit |
|---|---|
| Pain | Books-ready anxiety is acute and recurring; "will my accountant find a mess?" and "did I file this right?" are the dominant fears. |
| Willingness to pay | Accountant-ready output is worth $99-$499 per finished year or quarter at the high end of ICP, $19-$39/mo at the low end — even when packaged at QuickBooks-or-lower price points. |
| Complexity ceiling | Cash-basis posting + a constrained adjustment set + statement-first reconciliation is materially smaller than a full accrual ERP. Tractable, not trivial. Realistic timeline: 6-9 months for a credible v1, faster if scope is held strictly. |
| Format adoption | Every completed set of books writes the Kanso Format folder. Adoption is automatic. |
| Accountant alignment | Output is a real audit package: IS, BS, GL, TB, reconciliation, evidence index. Accountants are made faster, not threatened. |
| Path to expansion | Bank/card books → processor settlement v2 → quarterly books → continuous books → multi-entity. Each step reuses the same format and ledger. |

## Pricing Posture (v0 hypothesis, not locked)

The strategic posture is **Bench-quality output at QuickBooks-or-lower
prices**:

- Annual books: $149-$299 per completed year (one-shot, recurring annually)
- Quarterly books: $19-$39/month (subscription)
- Continuous books (post-v1): $39-$79/month
- Accountant tier (post-v1): per-firm seat pricing

Comparison anchors:

- QuickBooks Online: $38-$275/mo public pricing
- Bench: $299-$499/mo for the bookkeeping service
- Wave: free (does not produce audit-ready posted books)

The format is free. The engine is open source. The product is paid.
Margin comes from the experience, the audit-ready package, and the trust
posture — not from cloud rent.

Pricing experiments come after first 50-100 paying users. Do not over-design
this.

## Why This Writes the Format Incidentally

The user does not learn the format. They use the product. The product writes
the folder. Over time:

1. The user's CPA receives the folder and finds it readable.
2. The user discovers Cursor, vim, or a script can answer questions about
   their books directly.
3. A second tool emerges that reads the folder. The format is now real.
4. KansoBooks remains the easiest way to *write* a correct folder.

This is the same arc as Markdown writers (Bear, Obsidian, iA Writer) on
top of plain text. The user buys the experience. The format is the moat.

## Reuse of Existing Work

The work already in flight is preserved and re-purposed:

| Existing artifact | Role under the wedge |
|---|---|
| `crates/kanso_contracts` | Defines the schema underlying the Kanso Format files. Not internal anymore — it *is* the format spec. Extended with CoA, posting rules, adjustment kinds, and financial-output contracts. |
| `crates/kanso_core` validator, matcher, evidence policy | Open-source engine layer. Extended with posting, reconciliation, adjustment proposal, close-gate evaluation, and financial-output projection. |
| `crates/kanso_storage` SQLite | Becomes the regenerable `.kanso/cache.sqlite`. Not canonical durable. |
| `crates/kanso_import` | Statement importers feed the wedge directly. |
| `crates/kanso_export` | Renders the canonical folder, the per-period financial outputs, and the audit-ready package. |
| `crates/kanso_cli` | Already JSON-first. Becomes the public CLI for tools and CI to operate on a Kanso Format folder, including books-status, books-export, and internal close-gate commands. |
| Sprint 2.5 Expensify migration | Stays as a supporting input, not the headline wedge. Useful for users with a year of Expensify data. |
| Phases 1-9 and P (`Docs/phases/`) | Sequencing work that builds the engine and first-run readiness. Re-targeted at books-ready output, not expense ingestion as the headline. New phases for posting, reconciliation, adjustments, reports, audit package, and guided setup append. |

Nothing is thrown away. Naming, sequencing, and surface emphasis change.

## Founder Smoke for the Wedge

The base wedge ships when one realistic books-ready run completes end-to-end
**without MCP** and produces posted books plus audit-ready output:

- one bank CSV (founder's actual data, e.g., Chase or BMO)
- one credit card CSV (Amex or similar)
- optional 5-10 receipts
- one quarter or one year of data, 100-500 transactions

The smoke passes when:

- all files import without manual column mapping for supported profiles
- transfers are paired and post as zero-net journal entries
- duplicates are flagged
- categories are proposed with reasons and post deterministically to the
  journal
- proposed year-end adjustments (where applicable) preview correctly with
  auto-reverse dates
- every source account reconciles to its statement closing balance
- the things-to-fix list is finite and ordered
- the close gate transitions to `closed` only after all gate conditions hold
- the income statement, balance sheet, GL, and trial balance generate from
  the journal
- the trial balance balances (Σ debits = Σ credits) per ledger invariants
- the audit-ready package writes atomically and is byte-identical on
  re-export from the same close snapshot
- reopening with a reason, correcting one mistake, and re-closing creates a
  new package hash while preserving the prior package hash as superseded
- the founder gets the books ready in under 60 minutes
- the export produces a Kanso Format folder that another tool (the CLI, at
  minimum) can re-read, validate, and regenerate identical financial outputs
  from

MCP has its own multiplier smoke before KansoBooks may claim the AI coworker
experience:

- a parallel MCP-driven pass completes the same books period via Claude
  Cowork (or equivalent MCP client) using only the v1 Kanso Interface / MCP
  tool surface, and produces a byte-identical audit-ready package (sha256
  match) to the GUI-driven close. Divergence is a bug, not a feature, of the
  agent path.
- the pass connects through stdio, discovers tools through the manifest, uses
  dry-run before writing proposals, and uses doctor tools for one structured
  recovery path.

After this local proof, Phase 10 may build the fake-data online demo described
above as a pre-outreach trust bridge. Phase 10 is not part of MVP correctness;
it is a go-to-market gate for cold strangers.

## Out of Scope for the Wedge

- Anything in `Docs/KansoBooksKillList.md`
- Any feature whose primary justification is "future-proofing the platform"
  rather than "books-ready output is more correct or faster"
- Any work that does not also push a sprint deliverable in
  `Docs/KansoBooksRoadmap.md`

## Anchor

```text
Drop your statements.
Fix what Kanso flags.
Get the books ready.
Send the folder to your accountant.
You are done.
```
