# KansoBooks Vision

**Status:** Canonical / Product North Star

## One-Sentence Vision

KansoBooks helps small-business owners get their books done, correct, and
ready for their accountant without learning accounting: AI prepares the work,
Kanso proves it, and the user approves what becomes true.

## Core Insight

The painful job is not "enter transactions." The painful job is knowing:

```text
Am I done?
Is this right?
Can I prove it if someone asks?
```

AI can do much of the mechanical bookkeeping work. It can read statements,
spot patterns, draft categories, suggest transfers, prepare adjustments, and
explain what looks wrong. That is necessary, but not sufficient.

The trust job is proving which AI-drafted work is correct, which work needs a
human decision, and why the final books are safe to hand off.

Current options fail the trust job:

| Product | Trust gap |
|---|---|
| QuickBooks | Powerful, but complex and manual. Users still fear mistakes. |
| Bench-style services | Comfort comes from humans, which is expensive and slow to scale. |
| Expense tools | Partial automation. The user still reconciles the mess. |

KansoBooks wins by making correctness observable, uncertainty explicit, and
the few human decisions obvious.

## Product Category

KansoBooks is not initially:

- full accounting software
- an expense tracker
- a dashboard product
- a black-box AI bookkeeper
- a developer ledger tool

KansoBooks is:

- a books-readiness system for non-experts
- an AI-assisted review workflow with deterministic validation
- an evidence-to-ledger trust engine
- a financial clarity engine for non-experts
- a reconciliation and validation system
- a source-evidence graph for financial claims
- an evidence-policy system that adapts rigor to context
- a review workflow that turns uncertainty into explicit decisions
- a local business folder the user owns

## Emotional Job

The user wants to feel:

- "I know what is wrong."
- "I can see why this is right."
- "I can fix the few things that need me."
- "I will not get surprised later."

Automation is useful only when it increases that trust.

## Positioning

QuickBooks is the record.

Expensify is the process.

Bench is peace of mind through humans.

KansoBooks is AI-speed bookkeeping with proof, approval, and ownership.

The product should feel like a financial controller sitting beside the user:
calm, specific, evidence-backed, and never taking control away.

## Evidence Policy Insight

Completeness is policy-bound. Confidence is objective.

KansoBooks must distinguish:

- facts: transaction exists, receipt exists, match confidence is known
- policy: receipt required, optional, recommended, or ignored for this context
- output: ready, ready with notes, needs review, or blocked

The product must not say "you are missing receipts" as if that is universally
bad. It should say whether evidence is missing and whether it matters under the
active policy.

## Long-Term State

Final product promise:

```text
All transactions accounted for.
Everything reconciled.
2 items need review.
Ready for your accountant.
```

The user believes it because every claim can be traced, explained, and corrected.

## Product Object

Users do not create "reports."

Users get a bounded set of books ready:

Examples:

- 2026 books
- Q1 2026
- January 2026
- Client Work - ACME, when project books are added post-v1

Internally, this work unit is `BooksPeriod`. User-facing copy should say
"your 2026 books," "this tax year," "January," or "Q1" instead of exposing
the contract term.

Reports are outputs of a `BooksPeriod`: Profit & Loss, Balance Sheet,
General Ledger, Trial Balance, reconciliation summary, evidence index, and
the accountant package. A report is not the thing the user is trying to
finish.

## System Model

| Layer | Responsibility |
|---|---|
| Ingestion | Statements first; receipts/invoices/documents; APIs later. |
| Normalization | Convert messy inputs into canonical typed records. |
| AI Drafting | Draft categories, transfers, evidence links, fixes, and adjustment proposals. |
| Evidence graph | Preserve source files, extracted facts, and lineage. |
| Matching | Link bank transactions to receipt/document evidence. |
| Evidence Policy | Apply business/period rigor: Lean, Standard, Strict, then future custom rules. |
| Validation | Detect missing evidence, duplicates, mismatches, and invariant failures. |
| Review | Let users confirm, reject, override, or defer uncertain claims. |
| Posting | Turn accepted decisions into deterministic journal entries. |
| Audit | Record every system proposal and user decision. |
| Export | Produce financial statements, audit trail, and accountant-ready packages. |

## Trust Model

KansoBooks does not ask users to trust a black box.

Required properties:

- Traceability: every visible claim links to source evidence or a user decision.
- Explainability: every match and warning has a reason.
- Determinism: totals, counts, money math, and rule checks are reproducible.
- Safe failure: uncertainty becomes a review item, not silent truth.
- Reversibility: user decisions can be corrected without destroying history.
- Human approval: AI-drafted work becomes truth only through accepted
  decisions or explicit contract-owned automation rules.

## Product Guardrails

- Do not build full accounting first.
- Do let AI prepare the scary mechanical work.
- Do not make AI the source of truth.
- Do validate, explain, and require approval before work becomes truth.
- Do not hide logic in prompts.
- Do not over-automate before review loops are trusted.
- Do not treat missing evidence as automatically wrong; policy decides impact.
- Do not build a full rules engine in MVP.
- Do not require cloud services for the core MVP path.
- Do not design a dark developer UI for v1. Institutional white is the trust
  posture.

## Roadmap Shape

| Phase | Promise | Product capability |
|---|---|---|
| v1 Books Ready | "Get my books ready for my accountant." | Statement-first import, AI-drafted fixes via MCP, review, posting, reconciliation, accountant package. |
| v2 Work Reduction | "Fix the routine parts faster." | Better extraction, normalization, decision memory, review batching, simple custom policies. |
| v3 Confidence | "Prove this period is clean under my standard." | Stronger evidence graph, accountant review loops, richer audit package. |
| v4 Intelligence | "Explain and guide inside Kanso." | In-product AI Assist over validated facts, with consent and cost controls. |
| v5 Replacement | "I do not need the old workflow." | Continuous books, deeper accountant collaboration, broader reporting and tax-prep support. |

## Team Mental Model

Think of KansoBooks as Git for financial correctness:

- source evidence is preserved
- proposed changes are reviewable
- accepted decisions are logged
- derived outputs are reproducible
- history is not quietly rewritten

## Guiding Principle

Start with the outcome:

```text
Your books are done.
They are correct.
You can prove it.
```

Everything else exists to make that believable.
