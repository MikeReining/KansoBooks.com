# KansoBooks Roadmap and MVP Sprint Plan

**Status:** Strategic reference. Sprint definitions, MCP slip rules, and gate conditions live here.
**Live execution tracking (what to build next, actual statuses):** `docs/phases/README.md`

## Operating Principle

Move fast by building narrow vertical slices on top of hard contracts.

Do not build broad accounting software first. Build the trust loop:

```text
import -> normalize -> match -> apply policy -> explain -> review -> audit -> export
```

## Product Phases

| Phase | Goal | Scope |
|---|---|---|
| v0 Foundation | Make drift hard before code grows. | Contracts, validator skeleton, generated types, GUI factory, fixtures. |
| v1 Clarity | Show what matters. | CSV + optional receipts -> facts, policy outcomes, reasons, review, export. |
| v2 Work Reduction | Reduce manual cleanup. | Better OCR, learned vendor normalization, reusable review decisions, simple custom policies. |
| v3 Confidence | Prove a period is clean under a chosen standard. | Reconciliation checks, stronger audit trail, accountant-ready package. |
| v4 Intelligence | Explain validated facts. | Natural-language Q&A over evidence and validator findings. |
| v5 Replacement | Replace legacy workflows. | Ledger, reports, tax prep, collaboration, integrations. |

## MVP Sequence

### Sprint 0 - Repository Foundation

Deliver:

- Tauri/React/Rust workspace scaffold
- Rust crates: `kanso_contracts`, `kanso_core`, `kanso_storage`, `kanso_cli`
- minimal JSON-first CLI proof surface:
  - `kanso project init --json`
  - `kanso import bank <file> --json`
  - `kanso validate --json`
  - `kanso issues --json`
- generated TS type pipeline
- Biome, Vitest, Cargo test, basic CI
- institutional white design tokens
- GUI surface scaffold script

Gate:

- generated type check fails on stale bindings
- CLI JSON output can be snapshot-tested on one fixture
- frontend can run with placeholder shell
- no dark theme defaults

### Sprint 1 - Contract Kernel

Deliver:

- canonical IDs and rule ID model
- `Money`, `SourceFile`, `ImportBatch`, `BankTransaction`, `EvidencePolicy`
- `ValidationFinding`
- JSON schema/export skeleton
- fixture harness for bank CSV examples

Gate:

- no floats for money
- invalid money/currency/date fixtures fail with rule IDs
- Lean/Standard/Strict policy contracts exist as data
- TS bindings generated from Rust

### Sprint 2 - CSV Ingestion and Normalization

Deliver:

- first supported bank CSV profile
- CSV sniffing/profiling via DuckDB or Rust CSV parser
- normalized `BankTransaction` records in SQLite
- import audit events
- Intake and Processing surfaces

Gate:

- real fixture imports into canonical SQLite state
- every row gets stable ID, parsed amount, date, vendor, source lineage
- UI never defines backend payload types by hand

### Sprint 2.5 - Expensify CSV Migration (the wedge)

Deliver:

- `BooksPeriod` contract and storage table (per `Docs/Naming.md`; replaces
  the legacy `Report` work-unit name. Output projection types are
  `ReportOutput` variants per `Docs/AccountingModel.md`.)
- multicurrency tri-layer: every `Money` carries explicit `CurrencyCode`; hardcoded
  defaults removed
- `BooksPeriod.base_currency: Option<CurrencyCode>` with lazy inference from
  first statement
- `kanso_import::expensify_csv` adapter (Timestamp, Merchant, Amount, Original Currency,
  Comment, Category, Tag, Reimbursable, Receipt URL stored passively)
- `AwaitingStatement` match status (evidence-side symmetric to `MissingEvidence`)
- `ConfidenceFactorKind::CurrencyMismatch` and rule ID `matching.currency_mismatch_review`
- drag-and-drop on the active `BooksPeriod` window (user-facing label:
  "[period] books"; never "Report")
- per-file streamed status events and lane rendering
- file-type routing (Expensify CSV vs bank CSV vs PDF vs image)
- `ExtractionEnsemble` aggregator (N=1 implementation; ensemble-ready seam)
- model assets relocated from `temp_dir` to Application Support; manifest + sha256;
  background self-healing updater

Gate:

- founder's `1784_sticks_allison_2025.csv` (CAD) imports as 13 evidence docs in CAD
  without hardcoded USD
- `BooksPeriod.base_currency` is set lazily on first statement import with an
  audit event
- currency-mismatch between receipt CAD and statement USD produces `Suspicious` status
  with `CurrencyMismatch` reason factor; no auto-conversion
- `AwaitingStatement` rows render in the Expenses lane without error styling
- drag-and-drop of a folder produces streamed per-file status
- model directory is Application Support; sha256 verifies on launch
- engineer doing this sprint MUST consult `Docs/Naming.md` "Code Migration
  Manifest" before touching contract or surface code; the sprint inherits
  the rename of `Report` → `BooksPeriod` across crates, generated TS
  bindings, and the `apps/desktop/src/surfaces/mvp/` references

### Sprint 3 - Receipt Extraction and Evidence Docs

Deliver:

- `ExtractedDocument` and `EvidenceDoc` contracts (extended with `page_range`,
  `description`, `category_proposed`, `tag_proposed`, `external_evidence_url`,
  `field_confidences`)
- `PageRange` struct
- local text extraction for digital PDFs
- Apple Vision OCR provider for macOS (behind `apple-vision` feature flag)
- `ocr-rs` as fallback on macOS and primary on other platforms
- image preprocessing: EXIF rotate, deskew, contrast, downsample
- multi-receipt PDF page splitter: N `ExtractedDocument` per `SourceFile` with
  `page_range`
- warm-on-launch background OCR engine task
- provider interface formalized as `ExtractorProvider` trait behind `ExtractionEnsemble`
- schema-bound extraction prompts generated from contracts
- evidence audit events (deferred to Sprint 5 for storage; stubbed with TODO here)

Gate:

- provider output is validated before accepted
- failed/uncertain extraction is visible, not silent
- cloud path requires explicit consent copy
- a 10-page PDF with 4 receipts yields 4 `ExtractedDocument` rows with `page_range`
- Apple Vision produces extraction in <800ms warm on Mac
- `ExtractionEnsemble::single(...)` produces byte-for-byte equivalent output to the
  prior direct provider call on all existing fixtures

### Sprint 4 - Matching, Confidence, Evidence Policy, and Explanations

Deliver:

- `MatchCandidate` contract
- `PolicyEvaluation` contract
- MVP certainty gradient: high, medium, low, blocked
- deterministic v1 matcher: amount, date proximity, vendor similarity
- confidence factor model
- Lean/Standard/Strict policy evaluation
- all-expenses receipt override
- missing/ambiguous/duplicate/suspicious validation
- match reason generation from rule outputs
- policy reason generation from rule outputs

Gate:

- fixture batch produces expected statuses
- every match has reasons
- every transaction has fact state and policy outcome
- every transaction has a user-facing certainty gradient
- missing evidence is informational under Lean when policy says optional
- missing evidence is review-required under Strict when policy says required
- ambiguous and missing cases are test-covered

### Sprint 5 - Review Workbench, Audit, and Evidence Drawer

Deliver:

- `ReviewDecision` and `AuditEvent` contracts and storage tables (insert-only)
- `ReviewDecisionKind` full set: ConfirmMatch, RejectMatch, ChooseEvidence, MarkMissing,
  MarkStatementSufficient, MarkDuplicate, Defer, EditEvidenceField, MarkNotAReceipt,
  ReExtract, MergeDuplicateEvidence, SplitMultiReceipt
- `AuditEventKind` full initial set (see `Docs/2.Schema-Design.md`)
- effective-decision view (supersession chain walker)
- Review Workbench surface
- Evidence Drawer surface (`apps/desktop/src/surfaces/evidence/`):
  - source image with bbox overlay on hover
  - per-field confidence bands (High/Medium/Low)
  - per-field edit (always available, including high-confidence fields)
  - decision history list
  - "Open in Expensify" passive hint when `external_evidence_url` is present
- Policy Setup surface or Intake-embedded policy step
- `EditEvidenceField` action: creates new `ExtractedDocument(UserEntered)`, supersedes
  via `supersedes_decision_id`, emits `AuditEvent`

Gate:

- every user action writes an audit event
- decisions are reversible by appending new events
- edit a high-confidence field; export reflects the edit; audit log shows both versions
- re-export is byte-identical to the prior export on the same reviewed state
- presenter tests cover issue-first ordering, confidence bands, edit flow,
  audit-event count

### Sprint 5.5 - Capture Surface

Deliver:

- Cmd+V paste image/PDF on the Expenses lane
- macOS "Open With KansoBooks" via `info.plist` file association
- macOS Continuity Camera (file-drop path; no bespoke camera UI)
- per-`BooksPeriod` connected expenses folder (opt-in, explicit user setup)
- per-`BooksPeriod` connected statements folder (opt-in, explicit user setup)
- cross-`BooksPeriod` sha256 dedup notice with opt-in "Add anyway" affordance
- wording throughout: `"Connect an expenses folder for these books"`
  (never global; never says "Report")

Gate:

- Cmd+V paste image lands in Expenses lane in <1s on Mac
- "Open With" from Finder routes to the active `BooksPeriod`
- same file dropped twice yields one record plus an informational notice
- file appearing in a connected folder triggers ingestion; deleting the folder
  surfaces `capture.connected_folder_unavailable` (Informational) without data loss

### Sprint 5.7 - Expensify PDF Parser

Deliver:

- `kanso_import::expensify_pdf` adapter: structured table on pages 1-N parsed via
  `pdf-extract` (provider ID `expensify_pdf_table`)
- per-page receipt thumbnail extraction via Sprint 3's splitter
  (provider ID `expensify_pdf_thumbnail`)
- CSV + PDF dedup: when both are present, CSV wins for structured fields; PDF thumbnails
  attach as additional evidence lineage to matching rows
- `evidence.merged_from_sources` audit event kind
- Evidence Drawer renders multiple lineages for merged rows

Gate:

- founder's `1784_sticks_allison_2025.pdf` alone yields 13 expense rows; 4 carry
  an attached receipt image
- CSV + PDF together yield 13 rows total (no duplicates); 4 rows show both lineages
- CSV-first then PDF: same final state; PDF-first then CSV: same final state

## Kanso Interface / MCP Surface (cross-cutting; runs alongside Accounting Sprints)

The Kanso Interface coworker surface ships in v1 over MCP per
`Docs/MCPSurfaceModel.md`, `Docs/KansoMCPInterface.md`, and
`Docs/KansoBooksWedge.md`. The slices below are **cross-cutting** with the
Accounting Sprints below; each MCP slice lands inside the named Accounting
Sprint or the interface hardening lane, not as a standalone product sprint.

Slip rule (binding):

- Founder Smoke MUST pass without MCP. The close loop is the foundation;
  MCP is the multiplier.
- The wedge MUST NOT ship without MCP-1, MCP-2, and MCP-3.
- No further MCP/Eve/external-client work proceeds until M0 proves the
  contract-owned registry, generated help/recovery outputs, implementation
  parity, feature impact gate, and drift fixtures.
- The wedge MUST NOT claim external-agent usability without F4 stdio
  transport and the MCP-2.5 minimum of discovery, generated help/recovery,
  structured errors, doctor, and dry-run.
- MCP-2.6 is required before Founder Smoke uses a real external client.
- MCP-2.7 memory is useful but not required for first external-client proof.
- MCP-3.5 conformance is required before public standards positioning.
- MCP-4 may slip post-v1 if Sprint E pressure demands it.
- MCP-5 is post-v1 by default.
- If a contract change required for MCP-1/2/3 destabilizes Sprint A/B/C
  engine work, hold the wedge release until both sides land.

| Slice | Lands with | Scope |
|---|---|---|
| MCP-0 | Sprints A–E (cross-cutting) | Contract scaffolding: `AgentProposal`, `agent_policy`, `mcp_tool_descriptor`, new audit-event kinds (`AgentSessionOpened`, `AgentToolInvoked`, `AgentDataExposedToExternalClient`, `AgentProposalCreated`, `AgentProposalAccepted`, `AgentProposalRejected`, `AgentPolicyChanged`), proposal queue file format (`proposals/<year>.jsonl`), `policies/agents.yaml` reader/writer with v0.1 schema, validator rules `agent.policy.*`. New crate `crates/kanso_mcp` (adapter only; no semantics). |
| MCP-1 | Sprint A | Read tools: `kanso.get_status`, `kanso.list_transactions`, `kanso.list_issues`, `kanso.get_close_gate`, `kanso.explain_finding`, `kanso.get_evidence`, `kanso.simulate_policy`. Default-granted in shipped `policies/agents.yaml` templates. |
| MCP-2 | Sprint A | Phase-1 propose tools: `kanso.propose_change_category`, `kanso.propose_pair_transfer`, `kanso.propose_mark_personal`, `kanso.propose_attach_evidence`. Each writes `AgentProposal` with Kanso-embedded `validation_result`. |
| MCP-3 | Sprints B–C | Phase-2 propose tools: `kanso.propose_post_transaction`, `kanso.propose_accrual_adjustment` (four kinds), `kanso.propose_owner_draw_reclass`, `kanso.propose_capitalize_and_depreciate`, `kanso.propose_accept_difference`, `kanso.propose_accountant_summary`. Each posting-bearing kind also embeds Kanso-projected `journal_projection`. |
| M0 | Immediate blocker | Kanso Interface, Help, And Recovery SSOT Drift Wall: contract-owned interface registry, generated manifest/schemas/help/doctor/prompt/public examples, implementation parity, feature impact gate, drift fixtures, and Eve runtime discovery rule. Blocks F4 and all further MCP/Eve work. |
| F4 | After M0 | stdio MCP transport so external clients can actually connect. Blocks BYO Cursor/Claude/Codex demos, Eve dogfood, and standards claims. |
| MCP-2.5 | Immediate after / parallel with F4 | Developer Experience Pack: discovery (`kanso.get_mcp_manifest`, `kanso.list_tools`, `kanso.explain_tool`, `kanso.get_current_grants`, `kanso.get_skill_manifest`), help (`kanso.get_help_manifest`, `kanso.get_help_topic`, `kanso.explain_rule`), doctor suite (`kanso.diagnose_last_failure`, `kanso.suggest_improvement`, `kanso.get_validator_trace`), simulation (`kanso.dry_run_proposal`, `kanso.simulate_close`, `kanso.get_close_gate_detailed`), and contract-owned `KansoMcpError` envelope. |
| MCP-2.6 | Before external-client Founder Smoke | Setup Pack: `kanso mcp install --client cursor|claude|codex|generic`, sample fixture folder, starter Eve assistant pack, and `kanso mcp doctor` for connection/grant checks. |
| MCP-2.7 | After MCP-2.6 | Scoped agent memory: structured `AgentMemory`, `kanso.get_agent_memory`, `kanso.update_agent_note`, audit events, expiry at period close unless explicitly carried. Cross-folder memory forbidden. |
| MCP-3.5 | Before public standards positioning | Public Spec & Conformance Pack: `Docs/KansoMCPInterface.md`, conformance binary (`kanso mcp conformance --client <stdio-command-or-url>`), sample fixture suite, sample skill pack, installable reference distribution targets (`cargo install kanso-mcp`, `npm i -g @kanso/mcp` thin wrapper), published "what not to do" subset from the Kill List, and manifest/help/error/dry-run/audit conformance cases. |
| MCP-4 | Sprint E (may slip) | Export tools: `kanso.export_accountant_package`, `kanso.export_report_output`. |
| MCP-5 | post-Founder Smoke | Auto-promotion dispositions in `policies/agents.yaml`; MCP-elicitation inline approval. Off by default. |

Gate (rolled into Sprints A through E):

- MCP tool calls produce byte-identical JSON to the equivalent CLI commands
  on the same fixture
- every MCP tool invocation emits the corresponding audit events
- agent-issued mutations land **only** in `proposals/<year>.jsonl`; never
  in `decisions/<year>.jsonl`, `ledger/`, `audit/`, closed-period
  `reports/`, or `evidence/**` binaries
- on user accept, Kanso writes a `ReviewDecision` with
  `from_proposal: <id>` lineage; the existing posting engine consumes it
  deterministically
- v1 contracts accept exactly one `disposition_rule`:
  `requires_human_review`; any other value is a validator error
- a parallel MCP-driven Founder Smoke pass produces a byte-identical
  `AccountantPackage` sha256 to the GUI-driven close
- stdio client smoke proves a real external client can discover tools, read
  status, query generated help/recovery, dry-run a proposal, write a
  proposal, and recover from one structured doctor-reported failure
- the Kanso Interface manifest is generated from contract-owned descriptors
  and not prompt-authored
- generated help, doctor recovery, examples, and prompt fragments are
  generated from contract-owned bindings and pass freshness checks
- every tool returns the uniform success/error envelope; contract-known
  failures carry `rule_id`
- registry/implementation/manifest/schema/help/doctor/prompt/example drift
  checks fail CI on stale exposure

## Eve / Eve Cursor Runtime Adapter (managed harness over MCP)

Eve is the named AI coworker product/persona (`Docs/Eve.md`). Cursor's
TypeScript SDK and Composer 2 may let KansoBooks ship Cursor-backed Eve inside
the desktop product much sooner than building an agent runtime from scratch.
The implementation brief lives in `Docs/EveCursorRuntimeAdapter.md`.

The leverage is the Cursor harness, not the model alone:

- skills as product playbooks
- subagents as specialist workers
- hooks as defense-in-depth
- context management over Kanso-approved summaries
- model routing measured by acceptance, citation, refusal, latency, and cost
- durable runs for longer coworker tasks

Timing:

- Starts after MCP-1/2/3 are stable **and** M0 + F4 + MCP-2.5 are usable.
  Eve must inherit generated registry truth, discovery, generated
  help/recovery, structured errors, doctor, and dry-run instead of encoding
  those behaviors in prompts.
- MCP-2.6 setup should land before any real external-client Founder Smoke or
  BYO Cursor handoff.
- MCP-2.7 memory may land after first Eve dogfood; it MUST remain scoped,
  structured, audited, and user-visible.
- Can dogfood on fake/sample folders alongside remaining MVP work.
- MUST NOT replace Phase 9 Founder Smoke or the deterministic close loop.
- Real-data customer claims require normal close/package gates plus the
  Provider Approval Gate and Cursor-specific parity gates in
  `Docs/EveCursorRuntimeAdapter.md`.
- Claude Code plugin design should come after Eve/ECR learnings.

Packaging:

- BYO Cursor app/CLI handoff first.
- Decoupled Eve plugin executable second.
- Bundled Node/SDK sidecar in the base Kanso app: no.

Invariant:

```text
Eve is the coworker.
Cursor is the first runtime adapter.
Kanso Interface / MCP is the authority boundary.
Kanso is the truth engine.
```

Product anchor:

```text
Eve drafts.
Kanso proves.
You approve.
```

Implementation anchor:

```text
Eve is the coworker.
Cursor is the first runtime adapter.
Kanso Interface / MCP is the authority boundary.
Kanso is the truth engine.
```

## Accounting Sprints (Wedge B engine work)

These sprints follow Sprints 5 / 5.5 / 5.7 and precede the Founder Smoke.
They build the cash-basis posting engine, reconciliation, year-end
adjustments, and the v1 `ReportOutput` set per `Docs/AccountingModel.md`.

MCP slices land inside these sprints per the cross-cutting table above;
they are not independent sprints.

Each sprint is a vertical slice. Do not parallelize across sprints without
rereading `Docs/AccountingModel.md`, `Docs/KansoBooksKillList.md`, and
`Docs/MCPSurfaceModel.md` first.

### Sprint A — CoA, Posting Engine, Journal

Deliver:

- `crates/kanso_contracts/src/accounts.rs`, `posting.rs`, `journal` entry
  contract
- `accounts.yaml` schema, CoA validator rule family per `Docs/4.Shared-Validator.md`
- default CoA templates per ICP segment (Indie Consultant, Small SaaS,
  Agency, Real-Estate) shipped as fixture YAML. E-commerce / processor-heavy
  templates are v2 and MUST NOT become v1 fit signals.
- cash-basis posting rules for all v1 transaction shapes:
  standard inflow/outflow, transfer, credit-card payment, refund,
  personal exclusion (see `Docs/AccountingModel.md` "Posting Rules")
- posting engine in `kanso_core`: categorized + decided transaction → one or
  more `JournalEntry` records
- `ledger/<year>/journal.jsonl` write path (append-only)
- `TransactionPosted` audit event
- posting validator (Σ debits = Σ credits; trace invariants)

Gate:

- every standard transaction shape has a golden fixture with verified
  debit/credit pairs
- transfer posts as zero-net; does not touch income/expense accounts
- credit-card payment posts bank → liability, not expense
- personal expense produces no journal entry
- `posting.debits_must_equal_credits` finding fires on malformed entry
- journal file is append-only; re-run on same state is a no-op
- MCP-1 read tools (`kanso.get_status`, `kanso.list_transactions`,
  `kanso.list_issues`, `kanso.get_close_gate`, `kanso.explain_finding`,
  `kanso.get_evidence`, `kanso.simulate_policy`) return byte-identical
  JSON to the equivalent CLI commands on a shared fixture
- MCP-2 Phase-1 propose tools write `AgentProposal` records to
  `proposals/<year>.jsonl` with Kanso-embedded `validation_result`; on
  user accept, a `ReviewDecision` is written to `decisions/<year>.jsonl`
  with `from_proposal: <id>` lineage; on reject, the proposal flips to
  `state: rejected`
- agent attempts to mutate `decisions/`, `ledger/`, `audit/`, or
  `evidence/**` directly fire `agent.policy.*` rules and are
  structurally rejected

### Sprint P — Guided Setup, Decision Memory, and Routine Review

**Ordering:** not a blocker for Sprint B engine work. B may proceed once Sprint
A provides journal/posting foundations. Sprint P is a blocker before Founder
Smoke, paid beta, or any customer-facing first-run flow.

Purpose:

- remove the cold-start panic created by "create a chart of accounts"
- assess whether Kanso is the right fit before setup, without a false YES
- make the first minute feel like "get my books ready for my accountant/taxes"
- keep AI cost out of the free/pre-purchase critical path
- reuse prior accepted user decisions without building a full bank-rules UI
- prevent the 300-click failure mode by grouping routine repeated decisions

Deliver:

- progressive fit on-ramp / books-completeness check:
  - first file drop says "We can work with this file," never "Kanso can
    take this over"
  - ask for main bank account, primary card(s), and any other accounts needed
    to assess coverage
  - no chart-of-accounts, opening-balance, close, or reconcile setup before
    the fit decision
  - coverage outcomes: insufficient coverage, likely fit, partial fit, not a
    v1 fit
  - red flags include unknown transfers, large unexplained inflows,
    processor-like vendors (Stripe, PayPal, Shopify, Square), inconsistent
    statement coverage, and missing counterpart transactions
  - complex payment processor / ecommerce settlement flows are v2; the
    commercial v1 revisit may add simple processor payout support before
    paid outreach
- guided setup surface brief: first-run copy MUST NOT lead with `chart of
  accounts`, `close`, or `reconcile`; it uses business shape, categories,
  statement check, and books-ready language
- plain-language business-shape selector over existing CoA templates:
  Indie Consultant, Small SaaS, Agency, Real-Estate
- project init writes `accounts.yaml` from the chosen template without asking
  the user to understand CoA mechanics
- source-account setup from imported statements/cards; user-facing
  labels can be corrected later while account IDs remain stable
- cold-start opening-balance path aligned with Sprint B: first statement
  opening balance is the default; migration balances are an advanced path
- QuickBooks import posture documented and scoped as **salvage only**:
  old account/category names and opening balances may become proposals;
  old transactions and old categorization are not trusted automatically
- deterministic Decision Memory: category, personal, transfer, and vendor
  suggestions derive from accepted prior decisions in the local folder
- suggestion reasons cite prior decision IDs, vendor/account/date/amount
  factors, or template defaults; suggestions never post or decide by
  themselves
- grouped routine review:
  - deterministic filters for vendor, source account, amount/cadence,
    category, prior decision ID, evidence-policy outcome, and clean validator
    state
  - recurring subscriptions and other clean repeated items can be expanded,
    row-deselected, and batch-applied
  - one batch action writes one `ReviewBatchApplied` audit event plus one
    explicit `ReviewDecision` per transaction with shared `review_batch_id`
  - ambiguous, unusual, evidence-blocked, unsupported-flow,
    currency-mismatch, large-amount, and capital-asset candidates stay out of
    routine groups
- no cloud AI dependency in setup; optional AI assist remains pull-only,
  consent-gated, and cost-bounded per `Docs/AIAssistModel.md`

Gate:

- a single dropped file never produces a takeover YES; it produces a
  low-confidence file-detected state and asks for more coverage
- complex processor/ecommerce signals produce partial-fit or not-v1-fit
  language, never silent import as supported v1 truth
- YES copy appears only after sufficient account coverage and no unsupported
  flow blockers are detected
- blank-project smoke reaches imported statements, starter categories, opening
  balance choice, and issue list without forcing the user through CoA jargon
- repeated vendor/category scenario suggests the prior accepted category with
  a cited decision ID and still requires user confirmation
- user can correct a category and the next suggestion follows the latest
  effective decision, not the superseded one
- a fixture with 120 recurring subscription transactions is resolved through
  grouped routine review in three or fewer user actions, not one-by-one
- grouped routine apply preserves auditability: one batch audit event and one
  decision per transaction
- QuickBooks-derived data, if present, is visibly proposal/input and never
  financial truth without validation and user decisions
- first-run flow works with no AI provider configured and no network
- presenter/view tests prove first-minute copy avoids `chart of accounts`,
  `close`, and `reconcile` labels for non-expert setup screens

### Sprint B — Reconciliation, Statement Balances, and Close Gate

Deliver:

- `crates/kanso_contracts/src/reconciliation.rs`, `close_gate.rs`
- statement balance capture path for CSVs that omit opening/closing balances:
  PDF statement extraction where available, manual statement-balance entry,
  and manifest edit conversion to structured decisions
- reconciliation engine: per-source-account opening + posted in/out =
  expected closing; compare to statement manifest `closing_balance`
- `accept_difference` decision kind
- close-gate evaluator: nine conditions, per `Docs/AccountingModel.md`
- `CloseGateCondition` finding per unmet condition
- day-one opening-balance flow (cold-start and migration)
- `AccountReconciled`, `ReconciliationDifferenceAccepted`,
  `StatementBalanceSet`, `PeriodClosed`, `PeriodReopened`, `PeriodReclosed`,
  `OpeningBalanceSet` audit events
- reconciliation screen surface (per-account: opening, expected, statement,
  difference, accept-or-fix)
- close-gate screen: each condition with status and next-action link
- reopen/reclose path: reason-required reopen, append-only corrections,
  prior close/package hash preserved as superseded, reclose after all nine
  conditions pass again

Gate:

- tied account passes reconciliation validator
- account with unaccepted difference emits `reconciliation.difference_blocks_close`
  and blocks the close gate
- `accept_difference` with no reason is rejected
- CSV import without balances succeeds but emits statement-balance-needed
  findings; close cannot pass until balances are extracted, entered, or
  converted from manifest edits with audit lineage
- all nine close-gate conditions have a fixture that blocks on each one
- period transitions to `Closed` only after all nine pass
- `PeriodClosed` audit event fires exactly once per period close
- closed period can be reopened only with a reason; reclose writes a new
  close snapshot with `supersedes_close_id` and preserves the prior package
  hash as superseded

### Sprint C — Year-End Adjustments

Deliver:

- `crates/kanso_contracts/src/adjustment.rs`
- adjustment proposal engine: detects candidates at close time for all six
  v1 kinds (see `Docs/AccountingModel.md`)
- capitalize-threshold detection for `capitalize_and_depreciate` candidates
- adjustment workbench surface: per-candidate prompt, debit/credit preview,
  accept/edit/reject
- auto-reverse scheduler: writes reversing entry on named date; fires
  `AutoReversePosted` audit event
- `capitalize_and_depreciate`: straight-line and declining-balance math,
  half-year convention; golden fixtures for both
- adjustment validator (kind in enum, math parity, auto-reverse rule)
- `AdjustmentProposed`, `AdjustmentAccepted`, `AdjustmentRejected` audit
  events

Gate:

- all six adjustment kinds have golden debit/credit fixture
- depreciation math golden: straight-line $2,400/5yr half-year → $240 year-1
- depreciation math golden: 200% declining-balance $2,400/5yr half-year
- auto-reverse fires on the correct date as its own entry; original unchanged
- unknown adjustment kind emits `adjustment.unknown_kind` and blocks close
- trial balance balances on closed-period fixture after adjustments

### Sprint D — Report Output Projection

Deliver:

- `crates/kanso_contracts/src/report.rs` — projection specs for IS, BS, GL,
  TB, reconciliation summary, decisions log, evidence index
- report projection engine in `kanso_core`
- all eight v1 report types generated from the journal + decisions + evidence
- `close_gate.trial_balance_does_not_balance` validator check
- `report.trace_chain_broken` validator check
- report projection determinism test (same journal → byte-identical output
  across two runs)
- A = L + E balance sheet invariant check

Gate:

- income statement, balance sheet, GL, TB generated from closed-period
  fixture; golden snapshots locked
- A = L + E holds on balance sheet fixture
- Σ debit = Σ credit on trial balance fixture
- every report line traces to a journal entry (trace-chain walker passes)
- re-projecting from same state → byte-identical reports

### Sprint E — AccountantPackage

Deliver:

- `AccountantPackage` bundler: zip of all `ReportOutput` files + Kanso
  Format folder snapshot + `README.md` + `CHECKSUMS.txt` (sha256 per
  artifact)
- package determinism: same closed state → byte-identical zip contents
  (modulo zip metadata)
- `ExportCompleted` audit event with sha256 artifact list
- close-snapshot packaging: each close/reclose writes a package whose sha256
  is stable for that snapshot; reclose after corrections writes a new package
  hash and preserves the prior hash as superseded
- MCP-4 (may slip): `kanso.export_accountant_package` and
  `kanso.export_report_output` tools per `Docs/MCPSurfaceModel.md`

Gate (supersedes the old Sprint 6 gate):

- all files import without manual column mapping for supported profiles
- transfers are paired and post as zero-net entries
- categories proposed with reasons; all transactions posted
- at least one year-end adjustment accepted; auto-reverse date shown
- every source account reconciles to statement; trial balance balances
- close gate transitions to `Closed` only after all nine conditions pass
- IS, BS, GL, TB, recon, decisions, evidence index, `AccountantPackage`
  all generated
- `AccountantPackage` sha256 manifest is correct; re-export is
  byte-identical
- reopening with a reason, correcting one mistake, and re-closing produces a
  new package hash while the prior package remains verifiable as superseded
- Kanso Format folder is readable and validatable by the CLI independently
- Phase 9 owns the 60-minute founder demo and the parallel MCP-driven smoke
  after Chaos Hardening is green

### Sprint H — Chaos Hardening

Ordering: after Sprint E package verification exists; before Phase 9 Founder
Smoke can pass.

Deliver:

- `fixtures/chaos/` taxonomy for adversarial bank/card/receipt cases
- deterministic chaos generator seeded from sanitized fixture rows
- expected-behavior README per fixture category
- full-pipeline chaos runner: import → normalize → match → review decisions
  fixture → post → reconcile → close/reclose → reports → package verify
- unsupported-flow fixtures for complex processor/ecommerce signals that
  assert the fit on-ramp says partial-fit / v2-needed instead of importing
  them as supported truth
- property-style tests for money/date/vendor/import edge cases where useful

Gate:

- at least 50 chaos fixtures across duplicates, transfers, refunds, date
  formats, amount formats, vendor strings, multicurrency mismatches, missing
  statement coverage, receipt OCR failures, and unsupported complex processor
  signals
- every chaos fixture has an expected outcome: closes, blocks with a named
  rule ID, or exits through fit-on-ramp unsupported-flow language
- no chaos fixture creates financial truth without source lineage or a user
  decision
- chaos package outputs are deterministic when the expected outcome is a close
- Phase 9 cannot start until the chaos suite is green or each failure is
  explicitly triaged to a forward phase with founder approval

### Phase 10 — Online Demo and Trust Ladder

Ordering: after Phase 9 Founder Smoke passes in the local desktop app; before
cold outreach to strangers. Phase 10 is post-MVP. It does not block the local
close loop.

Purpose:

- let prospects understand Kanso before trusting a new local financial app
- show the real product loop with fake data: intake, issues, AI-drafted
  proposals, user approval, validation, close/reclose, and package preview
- avoid false confidence: the online demo never decides whether Kanso can
  handle a prospect's real books

Deliver:

- browser-accessible fake-data demo that follows the shipped desktop GUI and
  language
- 3-5 demo scenarios for AI-native early adopters: technical freelancer /
  indie consultant, tiny agency, real-estate operator, and one partial-fit
  scenario with complex processor/ecommerce signals routed to v2-needed
  language
- optional AI coworker replay or live local-sample MCP demo; if replayed,
  label it as replay
- trust ladder CTA: browser demo -> sample local folder -> desktop app ->
  local fit on-ramp -> full import only after supported-fit state

Gate:

- Phase 9 is green first; if the local app cannot close demo books, do not
  build the online demo
- demo screens match the actual app closely enough that it feels like the
  same product
- no real financial-data upload path exists
- the demo does not claim "Kanso can take this over" for a real visitor;
  that decision belongs to the local fit on-ramp
- complex processor/ecommerce signals are shown as partial-fit / v2-needed,
  not simple-payout support

### Commercial v1 Revisit — Simple Processor Payout Inputs

Ordering: after the local MVP proof and before cold outreach / paid beta. This
does not change the bank/card-only internal milestone.

The commercial question is not "do we support payment processors?" The
question is whether Kanso supports independent cash-basis businesses whose
processor exports can explain:

- gross payments
- processor fees
- refunds
- payouts to bank

Simple processor payout support may be required before approaching real
customers. Full ecommerce settlement accounting remains out of scope unless
explicitly re-scoped.

### Phase 11 — Claude Code Plugin and Agent-First Outreach

Ordering: after the Eve/Cursor coworker plan has been dogfooded and after
simple processor payout support exists. Detail placeholder:
`Docs/phases/11.Claude-Code-Plugin-And-Agent-First-Outreach.md`.

Purpose:

- make outreach agent-first for Claude Code users
- make the fake-data demo installable and shareable
- let real work happen on a local Kanso folder through Kanso Interface / MCP
  and CLI
- keep Kanso Desktop as the trust, review, evidence, and package surface

Shape:

- Cursor-backed Eve first: use Cursor as the fastest managed client to harden
  Kanso Interface / MCP tool shapes, consent, proposal grouping, skills, hooks, subagents,
  model evaluation, and cost budgets before packaging a Claude-specific plugin.
  Full plan:
  `Docs/EveCursorRuntimeAdapter.md`.
- demo mode: fake business data, zero real financial-data risk, shows the
  Kanso loop
- real-books mode: Claude works against a local Kanso folder through Kanso
  MCP/CLI
- loss-leader distribution: the plugin can be free / low-friction while the
  product value remains the trusted Kanso engine and desktop experience

Invariant:

```text
Claude drafts.
Kanso validates.
The user approves.
Kanso records the truth.
```

Gate:

- plugin demo runs one fake business end-to-end without real financial data
- real-books mode can perform meaningful work through Kanso Interface / MCP
  and CLI
- no direct agent writes to compiled truth
- equivalent GUI and plugin decisions produce byte-identical package outputs
  on shared fixtures

## Sprint 6 - Export and Founder Smoke (superseded)

**Superseded by Sprints E, H, and Phase 9 above.** The original scope
(review-only CSV export and smoke) is now subsumed into the broader Wedge B
close gate, audit package, chaos hardening, and founder smoke. Do not target
this sprint independently.

## Deferrals

Do not pull these into v1. All are in `Docs/KansoBooksKillList.md`.

- bank aggregators / Plaid-style OAuth
- complex payment processor / ecommerce settlement imports (Shopify, retail
  inventory flows, marketplaces, reserves, chargebacks, sales-tax filing,
  gross/fee/net settlement accounting beyond simple payout support) — v2
- continuous accrual / real-time AR/AP / invoicing
- multi-year depreciation schedule management / asset register
- depreciation methods beyond straight-line and declining-balance
- multi-entity consolidation
- payroll, inventory, sales tax filing
- tax filing surface
- full custom evidence-policy rule builder
- jurisdiction compliance engine
- local LLM in the v1 critical path (the wedge AI unlock runs in the
  user's own AI tool via MCP per `Docs/MCPSurfaceModel.md`; in-Kanso AI
  Assist is a potential paid upsell post-v1)
- dark mode

The Kanso Interface / MCP coworker surface is **not** a deferral; it ships in
v1 per `Docs/MCPSurfaceModel.md` and the cross-cutting MCP slices above. What
remains deferred *within* MCP is enumerated in `Docs/KansoBooksKillList.md`
"MCP Sub-Kill List" (hosted MCP service, agent direct writes to
compiled truth, in-v1 auto-promotion, MCP-elicitation inline approval,
cross-folder agent context).

### Sprint 7 - Ensemble Extraction (post-smoke)

Deliver:

- second OCR engine registered: Apple Vision + `ocr-rs` on macOS;
  `ocr-rs` + `oar-ocr` on other platforms
- `ExtractionEnsemble` convergence rules: agreement → confidence 100; disagreement →
  `Ambiguous` with candidates in Evidence Drawer
- `ConfidenceFactorKind` ensemble variants (EnsembleAgreement,
  EnsembleNormalizedAgreement, EnsembleDisagreement)
- `ExtractedDocument.field_alternatives` for disagreement candidates
- `BooksPeriod.extraction_strategy` (SinglePrimary or Ensemble)
- vendor memory pre-seed from Expensify CSV imports

Gate:

- ensemble field-hit rate measurably exceeds single-engine on the fixture set
- disagreement on a critical field renders both candidates in the Drawer
- ensemble latency ≤ 1.5× the slower single-engine latency on smoke fixture

## After v1

Next best slices:

1. online demo trust bridge (Phase 10) before cold outreach; fake data only,
   follows the shipped desktop GUI, no real financial-data upload
2. commercial v1 revisit: simple processor payout inputs before paid outreach
3. Eve productization (`Docs/Eve.md`, `Docs/EveCursorRuntimeAdapter.md`) if the
   post-MCP dogfood passes; pricing remains TBD until unit economics show Eve
   cost per close
4. Claude Code Plugin and agent-first outreach (Phase 11) after Eve/Cursor
   coworker learnings and simple processor payouts
5. more bank CSV profiles (Chase, CIBC, TD, RBC, Amex, additional CA formats)
6. complex processor settlement import v2: Stripe/PayPal/Shopify/Square one
   at a time only after simple payout support and chaos coverage
7. ensemble extraction (Sprint 7 above)
8. vendor normalization memory (cross-`BooksPeriod`)
9. simple custom evidence policies by evidence class, amount, and vendor
10. project templates: online business, renovation, reimbursement, accountant pack
11. continuous-close tier (monthly close)
12. accountant firm tier with multi-`BooksPeriod` and multi-folder view
13. multi-year depreciation schedule management (re-open condition met)
14. MCP-4 (export tools) if slipped from v1
15. MCP-5: auto-promotion dispositions + MCP-elicitation inline approval
16. in-app AI Assist (paid upsell candidate per `Docs/AIAssistModel.md`)
