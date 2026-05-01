# KansoBooks Accounting Model

**Status:** Canonical / Engine Specification
**Authority:** Subordinate to `Docs/KansoBooksManifesto.md` for strategic
direction and `Docs/KansoBooksWedge.md` for v1 scope. Authoritative for
the accounting layer of the engine: chart of accounts, posting rules,
year-end adjustments, reconciliation, the v1 `ReportOutput` set, and the
`AccountantPackage` definition. The on-disk shape these write to is
defined in `Docs/KansoFormat.md`. Naming follows `Docs/Naming.md`: every
"report" reference in this doc means a generated `ReportOutput`, never
the books-period work unit (which is `BooksPeriod` per
`Docs/BooksPeriod.md`).

## Position

KansoBooks ships a **cash-basis posting engine** with a constrained,
guided set of **year-end adjustments** that produce audit-ready output
without requiring a full accrual / asset-management ERP.

The strategic claim of `Docs/KansoBooksManifesto.md` (Bench-quality output
at QuickBooks-or-lower prices) is only deliverable if the accounting model
is small enough to ship, real enough to defend at audit, and explainable
enough to earn trust from non-experts.

This doc defines that model exhaustively for v1. Anything not in this doc
is out of scope for v1 (see `Docs/KansoBooksKillList.md`).

## Anchor

```text
Cash basis all year.
Constrained adjustments at the close.
Posted journal as the truth.
Reports projected from the journal, never from raw transactions.
```

## The Five-Object Model

KansoBooks's accounting layer has exactly five primary objects. Every other
contract supports or projects from these.

| Object | Owns | Mutability | File |
|---|---|---|---|
| **Chart of Accounts** | The buckets transactions and entries can fall into. Account IDs, types, hierarchy, and report placement. | Authoring source. Editable any time; edits are auditable. | `accounts.yaml` |
| **Source Transactions** | Cash reality from bank/card imports in v1. Every row is a normalized `BankTransaction` with stable lineage. Processor/ecommerce settlement imports are v2. | Derived projection of imports + decisions. Edits become decisions per `Docs/KansoFormat.md` "External Edits Are Input". | `transactions/<year>/<month>.jsonl` |
| **Evidence** | Receipts, invoices, statements, supporting documents. Every binary has a sibling Markdown manifest. | Source binaries are immutable. Manifest frontmatter is derived; manifest Notes are authored. | `evidence/**` |
| **Decisions** | User and system judgments — categorization, transfer pairing, evidence overrides, year-end adjustments, reconciliation acceptances, posting commits. | Append-only. Corrections supersede prior decisions by ID. | `decisions/<year>.jsonl` |
| **Posted Ledger Entries** | The official accounting record. Double-entry journal entries with Σ debits = Σ credits. | Append-only once posted. Corrections are reversing or adjusting entries, never edits. | `ledger/<year>/journal.jsonl` |

Every report in v1 projects deterministically from these five objects.
Nothing else may be a source of truth.

### Trace chain (audit invariant)

For every number in any v1 report, the engine MUST be able to walk back:

```text
report line
  -> account
    -> journal entry / entries
      -> triggering decision
        -> source transaction or evidence
          -> import batch or extraction provider
            -> source file (immutable bytes)
```

This is not a UX feature. It is a contract. The validator MUST refuse to
generate a report whose lines cannot all be walked back.

## Cash Basis

v1 ships **cash basis only**. Definition for the engine:

- income is recognized when cash is received (a positive bank/card inflow
  that is categorized as income)
- expense is recognized when cash is paid (a negative bank/card outflow that
  is categorized as an expense)
- transfers between source accounts are not income or expense
- credit-card purchases recognize the expense at the card transaction date
  (not the card payment date) — this is the conventional cash-basis
  treatment for card spending and matches how most small businesses
  intuitively think about "card cash"

What cash basis preserves in v1:

- simplicity for the ICP (online operators think in cash)
- one-shot posting per transaction (no separate invoice/payment matching)
- no AR/AP carry through the year

What cash basis does NOT cover, and where year-end adjustments fill the gap:

- revenue earned in the period but not yet received (handled by
  `unpaid_receivable` adjustment)
- expense incurred in the period but not yet paid (handled by
  `unpaid_payable` adjustment)
- cash paid this period for expenses applying to future periods (handled by
  `prepaid_expense` adjustment)
- cash received this period for revenue earned in future periods (handled by
  `unearned_revenue` adjustment)
- bank withdrawals miscategorized as expense that are actually owner draws
  (handled by `owner_draw_reclass` adjustment)
- large purchases that should be capitalized and depreciated (handled by
  `capitalize_and_depreciate` adjustment)

These six adjustments are the entire v1 accrual surface. Anything beyond
this set is post-v1 (see `Docs/KansoBooksKillList.md`).

## Chart of Accounts

The CoA is the bucket system that makes posting and reporting deterministic.

### Required structural fields

Every account in `accounts.yaml` MUST have:

- `id` — stable account identifier (e.g. `expense.software`,
  `asset.bank.chase`). Naming convention: `<type>[.<subtype>][.<name>]`.
- `name` — display name shown in the UI.
- `type` — exactly one of: `asset` | `liability` | `equity` | `income` |
  `expense`.
- `normal_balance` — `debit` | `credit`. Derivable from type but explicit
  for clarity and validation.
- `report_section` — drives placement in IS/BS/GL/TB. One of:
  `revenue` | `cogs` | `operating_expense` | `other_expense` |
  `current_asset` | `non_current_asset` | `current_liability` |
  `non_current_liability` | `equity`.

Optional fields:

- `subtype` — finer classification (e.g. `asset.bank`, `asset.receivable`,
  `asset.fixed`, `liability.credit_card`, `liability.payable`,
  `equity.draw`, `expense.depreciation`, `asset.accumulated_depreciation`).
- `parent_id` — for hierarchical rollups in reports.
- `capitalize_threshold` — for `expense` accounts whose items above the
  threshold may be reclassified as assets at year-end (drives detection
  for `capitalize_and_depreciate` adjustment).
- `importer` — for `asset.bank` and `liability.credit_card` accounts,
  names the canonical importer.
- `tax_mapping` — opaque hint string for downstream tax tools (e.g.
  Schedule C line, T2125 line). Not consumed by the v1 engine.
- `archived` — boolean; archived accounts cannot receive new postings but
  remain in the CoA for historical reports.

### Default CoA templates

v1 ships with at least these starting templates:

- **Small SaaS / Indie SaaS**
- **Indie Consultant / Freelancer**
- **Agency (services + small contractors)**
- **Real-Estate Operator (small portfolio)**

E-commerce / payment-processor-heavy templates are v2. v1 may keep internal
fixtures for future design, but user-facing setup MUST NOT present ecommerce
as a v1 fit.

Templates include the minimum required system accounts:

- `asset.bank.<importer-derived>` per source bank account
- `liability.credit_card.<importer-derived>` per source card
- `asset.accounts_receivable`
- `liability.accounts_payable`
- `asset.prepaid_expenses`
- `liability.unearned_revenue`
- `asset.equipment` and `asset.accumulated_depreciation`
- `expense.depreciation`
- `equity.owner_draw` and `equity.owner_contribution`
- `equity.opening_balance` (used by the on-boarding "day-1 balance" flow)

User customizations are first-class authoring edits to `accounts.yaml`.

### CoA validation rules

The validator MUST reject a CoA that:

- contains duplicate IDs
- has an account whose `normal_balance` contradicts its `type`
- has an account referenced by `parent_id` that does not exist
- removes an account that is referenced by any posted journal entry
  (archive instead)
- has more than one account with the system role `equity.opening_balance`
- omits any system account required by the engine for the supported
  transaction shapes

### Processor / ecommerce boundary

v1 CoA templates may contain generic income and fee accounts, but v1 does
not import or reconcile payment processor settlement files. Stripe, PayPal,
Shopify, Square, marketplace payouts, chargebacks, reserves, and gross/fee/net
payout reconciliation are v2.

If those patterns are detected during the fit on-ramp, KansoBooks MUST render
partial-fit or not-v1-fit language. It MUST NOT silently import processor
exports as standard bank/card transactions.

## Posting Rules

Posting is the deterministic mapping from a categorized, decided transaction
or adjustment to one or more journal entries. The validator MUST enforce
that each entry satisfies Σ debits = Σ credits before it lands in
`ledger/<year>/journal.jsonl`.

### When posting happens

Posting is a **commit step**, not a side effect. A categorized transaction
is *not* posted until the user takes one of:

- explicitly accepts a category in the review workbench (writes a
  `confirm_category` decision; engine then writes a `post_transaction`
  decision and the journal entry)
- applies a grouped routine review bundle (writes one batch audit event and
  one explicit review/posting decision per transaction, all carrying the same
  `review_batch_id`)
- closes the period (close gate posts every remaining categorized
  transaction in one batch)

Posting is idempotent. A `post_transaction` decision references the source
transaction ID; re-running posting on a state that already has that decision
is a no-op.

Grouped review is not silent automation. It is a user approval gesture over
deterministic clusters such as the same vendor, source account, amount/cadence,
category, and clean validation state. Unusual, ambiguous, unsupported-flow,
large-amount, currency-mismatch, evidence-blocked, or capitalizable items do
not enter a routine bundle.

### Standard inflow / outflow

A categorized bank/card transaction posts as a single two-line entry against
the source account.

Cash inflow → revenue:

```text
Debit:  asset.bank.chase_checking      $2,000
Credit: income.consulting              $2,000
```

Cash outflow → expense:

```text
Debit:  expense.software               $   49
Credit: asset.bank.chase_checking      $   49
```

Card purchase (expense paid via credit card):

```text
Debit:  expense.software               $   49
Credit: liability.credit_card.amex     $   49
```

### Transfers between source accounts

A transfer is a paired transaction across two source accounts and posts as
a zero-net entry. The matcher proposes pairing; the user confirms with a
`pair_transfer` decision; the engine writes one journal entry referencing
both transaction IDs.

```text
Debit:  asset.bank.chase_checking      $1,000
Credit: asset.bank.bmo_savings         $1,000
```

No income or expense is recognized. The validator MUST reject any
"transfer" posting whose two lines hit accounts other than two
`subtype: asset.bank` or one `asset.bank` and one `liability.credit_card`.

### Credit-card payment

A bank withdrawal whose counterpart is a credit-card payment is posted as
a transfer between the bank asset and the card liability. It is not an
expense.

```text
Debit:  liability.credit_card.amex     $1,200
Credit: asset.bank.chase_checking      $1,200
```

The matcher detects this case by amount + date proximity between a bank
outflow and a credit-card inflow. User confirmation is via
`pair_transfer` with kind `card_payment`.

### Refunds

A refund (positive amount on an expense source, or negative amount with a
detected refund pattern) posts as a reversing entry against the original
expense category if the originating expense is identifiable; otherwise it
posts as a generic refund credit to the same expense account.

```text
Debit:  asset.bank.chase_checking      $   49
Credit: expense.software               $   49
```

If the refund crosses periods (originating expense in a closed prior period),
v1 keeps the entry in the current period; this is acceptable under cash
basis. A note in the journal entry references the originating
transaction ID for trace.

### Personal-expense exclusion

A transaction marked personal posts no journal entry. It is excluded from
the books entirely. The decision is logged for trace; the source transaction
is preserved in `transactions/` but flagged. Reports filter it out.

### Currency mismatch

v1 does not auto-convert. A receipt in CAD attached to a USD statement row
posts in the source-account currency (USD). The currency mismatch surfaces
as a `Suspicious` review item with a `CurrencyMismatch` confidence factor
(per existing `Docs/KansoBooks_Trust.md` and `Docs/EvidencePolicy.md`).
Multi-currency reporting is post-v1.

### Capital-threshold breach (deferred to adjustment time)

When a transaction exceeds the `capitalize_threshold` on its proposed
expense account, posting still happens immediately as a normal expense
(cash basis discipline). The transaction is *flagged* for year-end
review under the `capitalize_and_depreciate` adjustment workflow. The
decision and any reclass happen at close, not at category time.

This avoids forcing a non-expert to make a capital decision in the middle
of routine review.

## Year-End Adjustments (the v1 set)

All v1 adjustments are decisions of `kind: accrual_adjustment` (or for
capitalize, `kind: capitalize_and_depreciate`) in `decisions/<year>.jsonl`.
Each decision triggers one or more journal entries. Where the underlying
issue is a **timing difference**, the entry includes an `auto_reverse`
date. Where the issue is a **permanent reclassification**, the entry
does not auto-reverse.

The v1 set is **closed**. Adding a new kind requires a contract-level
design pass and a Kill List re-open per `Docs/KansoBooksKillList.md`.

### Adjustment discovery and accountant handoff

KansoBooks MUST distinguish:

| Layer | Meaning | May post? |
|---|---|---|
| `AdjustmentQuestion` | A user/accountant-facing question raised by close context, prior-year memory, or official guidance. | No |
| `AdjustmentCandidate` | A possible adjustment with kind, reason factors, and missing fields. | No |
| `AdjustmentProposal` | A complete draft with amount, accounts, period, auto-reverse rule, and journal projection. | Only after user/accountant acceptance |
| `AdjustmentDecision` | Accepted, edited+accepted, rejected, or marked not applicable by an authorized human actor. | Yes, if accepted |

Static questionnaires are not the product model. The close workbench SHOULD
ask only questions that are relevant to the current books, prior-year close,
business shape, jurisdiction, or observed signals. It MUST still offer a
deterministic fallback interview when no AI provider or MCP client is present.

#### Jurisdiction guidance

KansoBooks does not give tax advice. It uses official guidance to decide what
questions to surface and what context to include for accountant review.

Supported guidance sources MUST be contract-owned records, not prompt prose:

- `jurisdiction` (for example `US`, `CA`)
- `authority` (for example `IRS`, `CRA`)
- `source_url`
- `source_title`
- `checked_at`
- `tax_year_or_revision`
- `guidance_tags` (for example `cash_method`, `accrual_method`,
  `prepaid_expense`, `receivable`, `payable`)
- `summary_for_handoff` (short, non-advice explanation)

Guidance source records may inform questions and accountant-handoff notes.
They MUST NOT silently change posting rules, create new adjustment kinds, or
claim that an adjustment is legally required. If jurisdiction guidance is
missing, stale, ambiguous, or outside v1 support, the workbench routes to
accountant review.

The user-facing model is:

```text
Your bank statements show cash movement. Some year-end items may still need
review because the business event and the cash movement can fall in different
periods.

If you know the answer, Kanso can prepare a draft adjustment for review.
If you are unsure, mark it for your accountant. Kanso will package the
question, related transactions, guidance source, and missing fields.
```

This copy MUST NOT say that an item is taxable, deductible, compliant, or safe.
Those conclusions belong to the user and their accountant.

#### Prior-year adjustment memory

Year-end adjustments often repeat. At close, the proposal engine MUST inspect
prior closed periods in the same Kanso folder and surface candidates from
accepted prior-year adjustments.

Rules:

- Prior-year memory may copy adjustment kind, account pair, counterparty,
  vendor/platform pattern, auto-reverse convention, useful-life/method choices,
  and prior decision IDs.
- Prior-year memory MUST NOT copy the prior amount as current-year truth unless
  current-period evidence deterministically supports the same amount.
- If required values are missing, the engine creates an incomplete
  `AdjustmentCandidate`, not a postable proposal.
- Every memory-derived candidate cites the prior decision ID and current-year
  reason factors.
- Superseded prior decisions do not drive memory; latest effective decision
  wins.

Examples:

- prior-year unpaid receivable for Apple/Stripe/platform payout -> ask whether
  any year-end platform revenue was earned but not yet paid; amount missing
  until user/accountant provides support
- prior-year unpaid payable for December contractor invoices -> ask whether
  any December contractor bills were unpaid at period end
- prior-year prepaid insurance -> look for current-year annual insurance
  transaction; if found, draft or candidate based on coverage dates
- prior-year depreciation decision -> remind on remaining basis, without
  managing a full asset schedule

Vendor/platform heuristics such as Apple payouts are reason factors only. They
MUST NOT hardcode financial truth. Multiple currencies are also a reason
factor: they may trigger accountant review or a jurisdiction-guidance question,
but they do not create an unsupported FX adjustment kind in v1.

#### Accountant question packet

If the user does not know an answer, they can mark the candidate
`ask_accountant`. Kanso then prepares a pre-close accountant question packet
containing:

- the plain-language question
- adjustment kind(s) that might apply
- missing fields needed before posting
- related transactions, evidence, accounts, and prior decisions
- official guidance source references used to raise the question
- Kanso's draft journal projection only when enough fields exist to project it

`ask_accountant` does not close the books. A blocking accountant question MUST
be resolved by an accepted, edited, rejected, or not-applicable decision before
the period can transition to `closed`. The pre-close question packet is a
handoff artifact, not the final audit-ready package.

### Common adjustment fields

Every v1 adjustment decision carries:

- `kind` — one of the six adjustment kinds below
- `subject` — referenced transaction ID, account, or evidence ID
- `period` — the period being closed (e.g. `2026` for an annual close)
- `value` — kind-specific payload (amount, accounts, options)
- `auto_reverse` — date of automatic reversing entry, or `null` for
  permanent reclassifications
- `reason` — short machine string
- standard decision fields (`id`, `ts`, `actor`, `source`, `supersedes`)

### Adjustment 1 — `unpaid_receivable`

**Trigger:** revenue was earned in the period but cash has not yet been
received. Detected by the engine when the user marks an invoice/contract
as outstanding at close, or proposed manually by the user.

**User prompt:**

```text
Unpaid receivable: $5,000 — Acme Co (consulting)

We will record this as revenue earned in 2026 with cash expected in 2027.
This will reverse automatically on Jan 1, 2027 to keep your cash books
aligned for tax reporting.

[Accept]   [Edit amount/date]   [Reject]
```

**Posting at close:**

```text
Debit:  asset.accounts_receivable      $5,000
Credit: income.consulting              $5,000
```

**Auto-reverse on first day of next period:**

```text
Debit:  income.consulting              $5,000
Credit: asset.accounts_receivable      $5,000
```

The reversing entry's posting date is the first day of the next period.
The reversal is its own journal entry, recorded at the time of reversal,
referencing the original entry by `reverses_entry`.

### Adjustment 2 — `unpaid_payable`

**Trigger:** expense was incurred in the period but cash has not yet been
paid. Detected by user marking an outstanding bill at close, or manual.

**User prompt:**

```text
Unpaid payable: $1,200 — December hosting expense

We will record this as expense incurred in 2026 with cash expected in 2027.
Reverses automatically on Jan 1, 2027.

[Accept]   [Edit amount/date]   [Reject]
```

**Posting at close:**

```text
Debit:  expense.hosting                $1,200
Credit: liability.accounts_payable     $1,200
```

**Auto-reverse on first day of next period:**

```text
Debit:  liability.accounts_payable     $1,200
Credit: expense.hosting                $1,200
```

### Adjustment 3 — `prepaid_expense`

**Trigger:** cash was paid this period for an expense that applies to a
future period (e.g. annual insurance paid in December for next year's
coverage; multi-month SaaS prepayment). Detected by user marking a
transaction as prepaid at close, or manual.

**User prompt:**

```text
Prepaid expense: $1,800 — Annual liability insurance (Jan-Dec 2027)

This was paid in 2026 but covers 2027. We will reclassify it as a prepaid
asset at close and reverse on Jan 1, 2027 so the expense lands in 2027.

[Accept]   [Edit amount/date]   [Reject]
```

**Posting at close:**

```text
Debit:  asset.prepaid_expenses         $1,800
Credit: expense.insurance              $1,800
```

**Auto-reverse on first day of next period:**

```text
Debit:  expense.insurance              $1,800
Credit: asset.prepaid_expenses         $1,800
```

If the prepaid covers a partial future period (e.g. half of next year),
the user may edit the reversal split. v1 supports a single full reversal
or a manual two-part edit at the user's option; complex amortization
schedules are post-v1.

### Adjustment 4 — `unearned_revenue`

**Trigger:** cash received this period for revenue that will be earned in
a future period (e.g. annual subscription paid up front, deposit for work
not yet performed). Detected by user marking a deposit at close, or
manual.

**User prompt:**

```text
Unearned revenue: $3,600 — Annual subscription, customer XYZ

We will move this from revenue to a liability at close (you owe them
service in 2027) and reverse on Jan 1, 2027 so the revenue lands in 2027.

[Accept]   [Edit amount/date]   [Reject]
```

**Posting at close:**

```text
Debit:  income.subscriptions           $3,600
Credit: liability.unearned_revenue     $3,600
```

**Auto-reverse on first day of next period:**

```text
Debit:  liability.unearned_revenue     $3,600
Credit: income.subscriptions           $3,600
```

### Adjustment 5 — `owner_draw_reclass`

**Trigger:** a bank withdrawal originally categorized as something else
(e.g. expense or transfer) is in fact an owner draw, or vice versa.
Detected by review or surfaced at close.

**User prompt:**

```text
Owner draw: $2,000 — Bank withdrawal Dec 15

You marked this as a personal item. Should we reclassify it as an owner
draw so it appears on your equity report?

[Reclassify as owner draw]   [Keep as personal]
```

**Posting at close (no auto-reverse — permanent reclassification):**

The original posting (if any) is reversed and a fresh draw entry is posted:

```text
Reverse original (if any):
  Debit:  asset.bank.chase_checking    $2,000
  Credit: <original-account>           $2,000

Post owner draw:
  Debit:  equity.owner_draw            $2,000
  Credit: asset.bank.chase_checking    $2,000
```

This adjustment may also run in the contribution direction
(`equity.owner_contribution`) when the user identifies a deposit as a
personal capital infusion.

### Adjustment 6 — `capitalize_and_depreciate`

**Trigger:** a large transaction originally posted as expense should be
capitalized as a fixed asset, and the user wants a first-year depreciation
entry for the same period.

Detection: at close, the engine surfaces every transaction that exceeded
its account's `capitalize_threshold` during the period as a candidate. The
user is shown each one and can capitalize, expense, or defer to next year.

**User prompt:**

```text
Capitalize and depreciate: $2,400 — Apple MacBook Pro

This purchase exceeds the $1,000 capitalization threshold for software
& equipment. Treat as a fixed asset?

  Useful life:  [3] [5] [7] [10] years     (selected: 5)
  Method:       Straight-line  /  Declining balance      (selected: straight-line)
  Half-year convention (year 1):  [x] enabled

This year's depreciation: $240    (= $2,400 / 5 / 2  with half-year)
This year's net impact:    $2,160 less expense, $2,400 new asset,
                           $240 depreciation expense.

[Capitalize as Equipment]   [Keep as expense]   [Defer]
```

**Posting at close (no auto-reverse — capitalization is permanent;
depreciation is a real period expense).**

Reverse the original expense posting:

```text
Debit:  asset.bank.chase_checking      $2,400
Credit: expense.equipment              $2,400   (or original expense account)
```

Capitalize the asset:

```text
Debit:  asset.equipment                $2,400
Credit: asset.bank.chase_checking      $2,400
```

(Or, equivalently, a single reclass entry against the original expense
line. The two-step form preserves the original line in the journal for
traceability and is preferred.)

Post first-year depreciation:

```text
Debit:  expense.depreciation           $  240
Credit: asset.accumulated_depreciation $  240
```

#### Multi-year handling (out of v1 active management; supported passively)

v1 does NOT manage depreciation schedules across years. v1 DOES persist the
asset on the balance sheet (via `asset.equipment` and
`asset.accumulated_depreciation`) so that:

- in subsequent periods, the engine MAY detect "you have assets with
  remaining basis" and propose a fresh `capitalize_and_depreciate`-style
  adjustment for that year. The user is in control; nothing is automatic.
- a future Kanso version, an external tool, or the user's accountant can
  read the journal and continue the schedule.

The user is explicitly told at the time of the first-year decision: "next
year, KansoBooks will remind you to make this decision again. We do not
manage the schedule for you." This is the seam between "we handle the
critical decisions at the critical moment" and "we do not build a full
asset register."

#### Method math (v1)

- **Straight-line:** annual depreciation = cost / useful_life_years
- **Declining balance:** annual depreciation = remaining_basis × rate,
  where rate = 2 / useful_life_years (200% declining-balance) or
  1.5 / useful_life_years (150% declining-balance)
- **Half-year convention (year 1 only):** multiply year-1 result by 0.5

The user picks useful life from a small dropdown (3, 5, 7, 10 years) and
toggles half-year. v1 supports straight-line as default and declining-
balance as alternative. Multiple methods, multiple jurisdictions, and tax
optimization (e.g. Section 179, CCA classes) are post-v1.

The validator MUST refuse to post a depreciation entry whose math does not
follow exactly from the named method, useful-life, and half-year inputs.
Determinism is the contract.

### Adjustment ordering and conflicts

When multiple adjustments apply to the same subject (e.g. a transaction
that is both above the capitalize threshold AND part of a prepaid expense
question), the user resolves them in the close workbench. The engine MUST
not auto-resolve conflicts; the user makes the final call and the
decisions log records the resolution.

## Reconciliation Close Gate

Reconciliation is a per-source-account check at close.

For each source account (every `asset.bank` and `liability.credit_card`
account):

```text
opening_balance
+ Σ posted inflows in the period
- Σ posted outflows in the period
= expected_closing_balance
```

This is compared to the `closing_balance` declared in the source account's
statement manifest (per `Docs/KansoFormat.md`).

Many CSV exports do not carry statement balances. Import MUST NOT fail only
because balances are missing, but close MUST NOT pass until each statement has
the needed balance facts. v1 accepts balance facts from:

- CSV/OFX/QFX metadata when present
- statement PDF extraction when present and validated
- explicit user entry in the statement-check surface or CLI
- external statement-manifest edit converted into a structured decision
- prior closed period output for subsequent-period opening balances

Every user-entered or externally edited balance writes a structured decision.
Missing balances surface as next-action reconciliation findings, not as
generic import failure.

### Outcomes

- **Tied** (`difference == 0`): the account is reconciled. Close gate
  condition met for this account.
- **Not tied** (`difference != 0`): the difference is itemized — likely
  unposted transactions, miscategorized transfers, missing adjustments.
  The close gate is blocked for this account until either the difference
  resolves to zero or the user explicitly accepts the difference with an
  `accept_difference` decision and a reason.

### Acceptance is a decision

`accept_difference` is logged with the difference amount, the reason, and
optional evidence reference. It does NOT auto-post anything. The reconciliation report shows the
accepted difference and the reason. Reviewers can see exactly what was
accepted and why.

This is the only mechanism by which a non-zero reconciliation difference
can pass the close gate. v1 does not silently round, does not auto-balance
with plug entries, and does not allow uncategorized differences.

### Day-one opening balances

A new business in KansoBooks needs an opening balance per source account.
v1 supports two flows:

- **Cold start:** the first imported statement's opening balance is taken
  as the system's opening balance. If the file does not contain that value,
  the user enters it from the statement. Earlier history is excluded.
- **Migration:** the user enters opening balances explicitly per account
  (and, optionally, equity). The engine posts a single
  `equity.opening_balance` entry totaling the net asset position.

Either flow writes an explicit `opening_balance_set` decision so the trace
chain has a starting point. No journal entry exists prior to this.

## Close Gate (formal definition)

A period transitions to `closed` only when ALL of the following hold:

1. every source account has a statement imported through the period end
2. every transaction in the period has a category and a `post_transaction`
   decision
3. every transfer between source accounts is paired (`pair_transfer`)
4. every personal expense is marked
5. every receipt-required (per active evidence policy) transaction has
   either evidence attached or an explicit accepted decision
6. every source account is reconciled (difference is zero or
   `accept_difference` decision exists)
7. all proposed year-end adjustments are accepted, edited, or explicitly
   rejected
8. the issue queue is empty
9. the trial balance balances (Σ debits = Σ credits across all journal
   entries in the period)

Until all nine hold, the close screen reports what is missing and points
at the next action. After all nine hold, the engine:

- writes a `period_closed` decision and audit event
- generates the v1 report set (below) and the audit-ready package
- flips the period status to `closed` in `ACCOUNTING.md`

The next period opens automatically with computed opening balances. Any
auto-reversing adjustments fire on the first day of the next period as
their own journal entries.

### Reopen / reclose

Closed is a verifiable snapshot, not a trap. v1 MUST allow a user to fix a
mistake after close.

Reopen rules:

- reopening requires an explicit user reason
- reopening appends a `period_reopened` decision and `PeriodReopened` audit
  event; it never deletes the prior `period_closed` decision
- period status becomes `reopened`
- prior report/package hashes remain traceable as the superseded close
  snapshot
- posted journal lines are never edited or deleted

Correction rules:

- fixes append new decisions
- if a posted entry was wrong, the engine appends reversing or adjusting
  entries in the reopened period; it never mutates the original entry
- the trace chain for both the original and corrective entries remains whole

Reclose rules:

- the same nine close-gate conditions must pass again
- reclose appends a new `period_closed` decision with
  `supersedes_close_id`
- reclose emits `PeriodReclosed` audit event
- reports and package are regenerated for the new close snapshot
- the new package hash differs when the correction changes financial output
- the previous package remains verifiable and marked superseded in the
  decisions/audit history

Finalization is a user communication state, not an engine excuse to block
corrections. If the user has already sent or filed a package, KansoBooks may
warn that a new package is an amended handoff, but it MUST still permit
append-only correction and reclose.

## V1 Report Output Set

The `ReportOutput` variants below are the v1 set per `Docs/Naming.md`.
Each is a deterministic projection from the journal (and, for the
reconciliation report, from statement manifests too). All reports MUST
satisfy: same inputs → byte-identical output.

| Report | Source | Format(s) | Projection |
|---|---|---|---|
| Income Statement | journal | `.md` and `.pdf` | Σ revenue accounts − Σ expense accounts, grouped by `report_section`, for the period. |
| Balance Sheet | journal + opening balances | `.md` and `.pdf` | Σ asset accounts, Σ liability accounts, Σ equity accounts as of period end, grouped by `report_section`. Must satisfy A = L + E. |
| General Ledger | journal | `.csv` | Every journal line in chronological order, with running per-account balances. |
| Trial Balance | journal | `.csv` | Per-account closing balance with debit/credit columns. Must show Σ debits = Σ credits. |
| Reconciliation Summary | journal + statement manifests | `.md` | Per-source-account: opening, posted in/out, expected close, statement close, difference, acceptance reason if any. |
| Decisions Log | decisions | `.md` | Human-readable rendering of `decisions/<year>.jsonl` filtered to the period: vendor, amount, category, business purpose, who decided, when, why. |
| Evidence Index | evidence + transactions | `.md` | Every receipt and statement linked to the period with stable IDs and links. |
| Close Readiness | engine state | `.md` | At any point pre-close: status of all close-gate conditions. After close: snapshot of the conditions when the gate flipped. |

### Audit-Ready Package

`<period>-audit-package.zip` contains:

- all of the reports above (rendered)
- year-end adjustment rationale:
  - accepted adjustments with explanation, reason factors, account pair,
    journal projection, auto-reverse date where applicable, and cited
    guidance/prior-decision references
  - rejected or not-applicable adjustment candidates with human reason
  - statement that no unresolved blocking accountant questions remained at
    close
- the Kanso Format folder snapshot for the closed period (`ACCOUNTING.md`,
  `accounts.yaml`, `transactions/`, `evidence/`, `decisions/`, `ledger/`,
  `audit/`)
- a top-level `README.md` describing the package contents, the close date,
  the format version, and the Kanso engine version that produced it
- a `CHECKSUMS.txt` with sha256 of every file in the bundle

### Definition of "audit-ready"

The package is **audit-ready** in the sense that:

- every number in every report traces, via the trace chain, to a source
  transaction or evidence file that is bundled in the package
- the reports are reproducible from the bundled folder by re-running the
  engine; running the engine on the snapshot MUST produce byte-identical
  reports
- the package is self-contained: a third party with the package and the
  open-source engine can verify every number without access to the user's
  machine
- the package is signed (sha256 manifest) so tampering is detectable

This is **not** a claim of legal/audit/tax compliance. It is a claim of
**observable verifiability** — the strongest property KansoBooks may
make per `Docs/KansoBooks_Trust.md`. Compliance remains the user's and
their accountant's responsibility.

The final audit-ready package is distinct from any pre-close accountant
question packet. The question packet helps the accountant decide what entries
are needed; the audit-ready package documents the closed state after those
questions are resolved or explicitly marked not applicable.

## Effective State and Determinism

The accounting model relies on a deterministic projection from inputs
(transactions + evidence + decisions + opening balances + CoA) to derived
state (journal entries + reports). The full projection function will be
specified in a separate `Docs/EffectiveState.md`. For this doc, the
binding constraints are:

- the projection is pure: same inputs → same outputs
- the projection is total over valid inputs and explicitly errors over
  invalid inputs (no silent fallbacks)
- the projection is order-independent over decisions of the same `subject`
  except where supersession is explicit (latest non-superseded decision
  wins per subject + field)
- the projection runs in `kanso_core` (per `Docs/TechStack.md`); the
  SQLite cache under `.kanso/` is an optional accelerator, not a source
  of truth

## Open Questions (deliberately unresolved at v0)

- **Default useful-life dropdown values** for `capitalize_and_depreciate`.
  Tentative: 3, 5, 7, 10 years. Likely jurisdiction-influenced; revisit
  after first founder smokes.
- **Default depreciation method.** Tentative: straight-line with optional
  half-year convention. Declining balance is supported but not default.
- **Multi-year asset detection cadence.** v1 detects assets with remaining
  basis at close; the exact UX prompt phrasing is open.
- **Day-one opening balance migration UX.** Two flows defined above; the
  exact UI is open.
- **Refund crossing closed periods.** v1 keeps the refund in the current
  period by default. If the user chooses to correct the prior period, the
  reopen/reclose rules above apply.
- **Transfer detection across more than two source accounts.** v1 supports
  pairs only. Three-leg transfers (e.g. bank → bank → CC) require a chain
  in the matcher; tentative: defer.
- **Inter-currency posting at the journal level.** v1 posts in source
  currency and surfaces mismatches for review; whether the journal entry
  records both currencies (with explicit FX rate metadata) or only source
  is open. Tentative: source only with metadata reference.
- **CoA template versioning.** When KansoBooks updates a default template,
  how do existing user folders adopt or ignore? Tentative: opt-in.

## Non-Goals for v0

- Not a continuous accrual engine. AR/AP exist only as adjustment outcomes,
  not as a real-time tracking system.
- Not an asset register. v1 persists the asset on the balance sheet and
  helps the user re-decide each year. It does not manage schedules.
- Not a depreciation method library. Two methods, one convention. That is
  the entire surface.
- Not jurisdiction-specific. Tax mappings are hints. CCA classes,
  Section 179, MACRS, and similar are not modeled in v1.
- Not a payroll system, an invoicing system, an inventory system, or a
  sales-tax filing system.
- Not a payment processor / ecommerce settlement importer. Stripe, PayPal,
  Shopify, Square, marketplace payouts, chargebacks, and gross/fee/net
  payout reconciliation are v2.
- Not a real-time dashboard. Reports are generated at close.
- Not a multi-entity consolidation system.

See also `Docs/KansoBooksKillList.md`.

## Anchor

```text
Cash basis all year.
Six adjustments at the close.
Posted journal as the truth.
Reports projected from the journal.
The package is verifiable.

We do not manage assets.
We make sure they are treated correctly when closing the books.
```
