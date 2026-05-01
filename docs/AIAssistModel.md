# AI Assist Model

**Status:** Canonical (scope) / Open Questions Pending (surface specifics)
**Authority:** Subordinate to `Docs/KansoBooksManifesto.md`,
`Docs/KansoBooks_Trust.md`, `Docs/KansoBooksWedge.md`, and
`Docs/KansoBooksKillList.md`. When this doc and any of those disagree, those
docs win and this doc is patched to match.

## Kanso AI Surface Taxonomy

KansoBooks has four AI-facing surfaces. Do not conflate them:

| Surface | Where | Owner doc | Cost model | v1 status |
|---|---|---|---|---|
| **Deterministic Kanso** | Import, validate, review, post, reconcile, close, export. | Contracts, core, GUI docs. | No AI cost. | Foundation. Must work without AI. |
| **BYO Eve / Kanso Interface Coworker** | User's AI tool talks to local Kanso Interface over MCP and drafts proposals. | `Docs/MCPSurfaceModel.md`, `Docs/KansoMCPInterface.md`, `Docs/HelpAndRecoveryModel.md`, `Docs/Eve.md` | User pays provider. | **In v1.** Ships with the wedge. |
| **Managed Eve** | Kanso-rendered skill-driven coworker. Runtime may be Cursor SDK, Claude, local/self-hosted, or a future provider. | `Docs/Eve.md`, runtime adapter docs. | Pricing TBD. Kanso-paid, pass-through, or unavailable depending on unit economics and provider gates. | Post-MCP-1/2/3 + M0 + F4 + MCP-2.5 candidate. |
| **Pull AI Assist** | Contextual "Explain" / "Why?" / "Help me answer" affordances inside Kanso. Smaller and local to a finding, evidence item, or adjustment. | This doc. | Kanso-paid by default; potential paid upsell post-v1. | Mostly post-v1; year-end question assist is a Phase C v1 candidate and remains an open decision. |

Eve anchor:

```text
Eve drafts.
Kanso proves.
You approve.
```

Cursor-backed Eve implementation anchor:

```text
Eve is the coworker.
Cursor is the first runtime adapter.
Kanso Interface / MCP is the authority boundary.
Kanso is the truth engine.
```

The Kanso Interface / MCP surface is what unblocks the wedge for the
scared-of-bookkeeping ICP. AI Assist in-app is a different shape, with
different consent and cost trade-offs, and is not on the wedge critical path.
If you are planning agent activity, read `Docs/MCPSurfaceModel.md`, not this
doc.

Eve is not a third source of financial truth. Cursor-backed Eve is a managed
Cursor harness over the MCP proposal lifecycle, with product-hosted skills,
hooks, subagents, consent, activity, and review UX. If Eve wants to draft
changes, MCP owns the tool contract and `AgentProposal` lifecycle. If Eve
wants to answer contextual in-app help questions, this doc owns the pull-only
AI Assist contract.

## Position

KansoBooks does not push AI into financial decisions. It offers AI when the
user asks for help, returns proposals grounded in contract-owned facts, and
never replaces deterministic truth.

AI is **pull**. AI is **assist**. AI is **never authority**.

## What This Doc Owns

This doc owns the on-demand **in-app** AI assist contract:

- where in the product an "Ask" / "Explain" / "Why?" affordance MAY appear
- what shape AI returns at each entry point
- what data leaves the device, with what consent
- what in-app AI MUST NOT do (by reference, not by restatement)

This doc does **not** own:

- the Kanso Interface / MCP coworker surface (the wedge AI unlock) →
  `Docs/MCPSurfaceModel.md`
- Eve product/persona contract → `Docs/Eve.md`
- Cursor SDK as the first managed Eve runtime adapter over Kanso Interface / MCP →
  `Docs/EveCursorRuntimeAdapter.md`
- AI Boundary policy → `Docs/KansoBooks_Trust.md` (AI Boundary, Advice Boundary)
- Deterministic policy-driven guidance → `Docs/EvidencePolicy.md`
- OCR/extraction provider seam → `Docs/OCR-Provider-Plan.md`
- Consent and data-boundary copy specifics → owning surface `brief.md`
- Confidence gradient and trust UI → `Docs/KansoBooks_Trust.md`
- Naming → `Docs/Naming.md`

If a rule cannot be expressed in terms of those owners, stop and re-design.

## The Cursor Pattern, Translated

Cursor's success is not "AI everywhere all the time." It is:

```text
Compiler is truth. AI is a peer. AI proposes. Human accepts. File is the artifact.
```

KansoBooks applies the same pattern:

| Cursor | KansoBooks |
|---|---|
| Compiler / type system = truth | Validator / posting / reconciliation = truth |
| AI proposes a diff | AI proposes a `ReviewDecision` candidate |
| User accepts the diff | User issues a `ReviewDecision` (already specced) |
| Source files = artifact | Kanso Format folder = artifact |
| Cmd+K summons AI | "Ask Kanso" / "Explain" / "Why?" affordance summons AI |

## Pull, Not Push

Binding rules:

- AI MUST NOT auto-decide, auto-categorize without explicit user confirmation,
  or auto-mutate any contract-owned state.
- AI MUST be summoned. The default UI state is silent.
- AI affordances MUST be visible only on surfaces that own a user-facing
  uncertainty: an issue, a low/medium-confidence match, a proposed
  adjustment, a close-gate blocker, an evidence-drawer field, or an explicit
  global "Ask Kanso" entry point.
- AI affordances MUST NOT appear on surfaces that present already-final state
  (closed-period reports, audit package, posted journal entries).

Failure mode this prevents: users habituated to "AI did it" stop reading.
Trust collapses the moment AI is wrong once.

## Pull Triggers (v1 Candidate Set)

The product MAY expose AI assist at these entry points. Final v1 set is an
**open decision** (see Open Questions §1).

| Trigger | Surface | Question AI answers |
|---|---|---|
| "Why this finding?" | Issue queue row | Plain-language explanation of the contract-owned `rule_id` and `ConfidenceFactor`s. |
| "Explain this match" | Suspicious or low-confidence match row | What evidence is aligned, what is not, what would resolve it. |
| "What should I do?" | Close-gate blocker | Which gate condition is unmet and the next concrete action. |
| "Explain this adjustment" | Year-end adjustment workbench | What the proposed adjustment does, debit/credit preview in plain language, auto-reverse implication. |
| "Help me answer this year-end question" | Year-end adjustment workbench | Ask focused follow-up questions, explain official guidance references, and draft an `AdjustmentCandidate` or `AdjustmentProposal` for review. |
| "Read this receipt" | Evidence drawer | Restate extracted fields and call out per-field uncertainty. (Extraction itself is already provider-seam owned.) |
| "Ask Kanso" | Global affordance (TBD) | Free-form question scoped to current `BooksPeriod`'s facts. |

Rules:

- Every trigger MUST resolve to a contract-bound primitive (a finding, a
  match, a gate condition, an adjustment, an extracted document) or be
  rejected.
- AI MUST refuse questions that require financial truth not grounded in
  contract data ("am I tax compliant?", "is this audit safe?"). See `Trust`
  Advice Boundary.
- AI MUST NOT invent rule IDs, statuses, severities, or adjustment kinds.
- AI MUST NOT decide whether jurisdiction guidance legally requires an
  adjustment. It may summarize contract-owned guidance-source records and route
  uncertain cases to accountant review.

## What AI Returns

AI output MUST take one of these shapes:

| Shape | Used by | Backing primitive |
|---|---|---|
| Plain-language `rule_id` translation | "Why this finding?", "Explain this match" | `ConfidenceFactor` + contract-owned `rule_id` |
| `ReviewDecision` candidate | "What should I do?" on issue rows | `ReviewDecision` (proposal only; user must accept) |
| Adjustment explanation | Year-end adjustment workbench | The six v1 adjustment kinds (`AccountingModel.md`) |
| Year-end question assist | "Help me answer this year-end question" | `AdjustmentQuestion`, `AdjustmentCandidate`, `AdjustmentGuidanceSource`, prior decision citations |
| Extracted-field restatement with uncertainty | Evidence drawer | `ExtractedDocument` candidate fields |
| Free-form answer with citations | "Ask Kanso" | A list of contract-owned facts referenced (transaction IDs, finding IDs, gate conditions) |

Hard constraints on every return:

- MUST cite the contract-owned primitive(s) it draws from (IDs, rule IDs).
- MUST NOT contain prose that asserts a financial outcome not derivable from
  cited primitives.
- MUST mark its own output as a proposal until the user issues a
  `ReviewDecision` or equivalent contract-owned action.
- MUST surface uncertainty rather than smooth it. "I don't know" is a valid
  return.
- For year-end questions, MUST offer `ask_accountant` when the user is unsure
  or when required fields are missing. The output must name missing fields
  rather than filling them by inference.

## Local vs Cloud Routing

Binding rules:

- The deterministic path (validator, matcher, policy, posting,
  reconciliation, reports, export, close gate) MUST function with no AI
  provider available.
- Local LLM dependency in the v1 critical path is forbidden per
  `Docs/KansoBooksKillList.md`. AI Assist in v1 is therefore a **cloud
  provider behind explicit consent**, not a local model.
- Provider routing follows the existing seam pattern in
  `Docs/OCR-Provider-Plan.md`: provider descriptor in contracts, adapter in a
  provider crate, no financial semantics in adapters or prompts.
- If consent is denied, the affordance MUST gracefully degrade to the
  deterministic explanation (rule ID + factor list) without an empty state.

### Free onramp cost boundary

The cold-start / pre-purchase path MUST NOT depend on cloud AI. Template
selection, file import, policy evaluation, category suggestions, and repeated
decision suggestions need deterministic local paths first.

Binding rules:

- Kanso-paid token spend MUST NOT be required before the user has paid or
  explicitly opted into a paid/BYO provider path.
- Optional cloud AI in setup remains pull-only, consent-gated, and bounded by
  prompt class.
- Any free-tier AI affordance MUST have a hard cost ceiling or be disabled by
  default.
- "Use your existing AI stack" via Kanso Interface / MCP is now a v1
  cost-containment strategy, owned by `Docs/MCPSurfaceModel.md`. Kanso
  Interface / MCP tools expose facts and draft proposals against
  contract-owned shapes; they MUST NOT bypass the
  AI boundary, audit boundary, or human approval. In-app AI Assist (this
  doc) and the Kanso Interface / MCP coworker (`Docs/MCPSurfaceModel.md`) are sibling
  surfaces with different cost models and different consent gates; both
  audit; both proposal-shaped at the boundary.

## Consent and Data Boundary

Binding rules:

- Each AI Assist call MUST go through a per-provider, per-`BooksPeriod`
  consent gate per `Docs/KansoBooks_Trust.md`.
- Consent copy MUST state, per call class, what data leaves the device
  (transaction rows, statement excerpts, receipt images, free-text question).
- Consent decisions MUST be recorded in `audit/<year>.jsonl` like every
  other decision.
- Receipt images and statement files leaving the device MUST be flagged in
  the consent dialog distinctly from text-only payloads.
- Free-form question payloads MUST be scoped to the current `BooksPeriod`.
  Global cross-`BooksPeriod` context MUST NOT leave the device in v1.

Default consent posture is an **open decision** (see Open Questions §3).

## What AI MUST NOT Do

By reference to `Docs/KansoBooks_Trust.md` AI Boundary and Advice Boundary,
plus the additions binding here:

- MUST NOT post journal entries directly. AI may **draft** journal-entry
  structure inside an `AgentProposal` (per `Docs/MCPSurfaceModel.md`); only
  Kanso's deterministic projection of an accepted `ReviewDecision` can
  become a posted journal entry. The full proposal lifecycle and the
  JournalEntryProposal view are owned by `Docs/MCPSurfaceModel.md`.
- MUST NOT issue effective `ReviewDecision`s on the user's behalf in v1.
  All AI-issued mutations land as `AgentProposal` records and are accepted
  by the user (or, post-v1, by a contract-known auto-promotion rule the
  user pre-declared in `policies/agents.yaml`).
- MUST NOT define posting rules, adjustment kinds, evidence policy, or
  chart-of-accounts entries in prose.
- MUST NOT claim tax, legal, audit, or compliance outcomes.
- MUST NOT silently retry, fall back, or escalate to a different provider
  without re-prompting consent for that provider.
- MUST NOT cache user financial data outside the local Kanso Format folder.
- MUST NOT generate audit log wording, finding wording, or rule IDs that the
  product surfaces as if contract-owned.

## v1 Scope

v1 ships the **smallest useful AI Assist surface** that demonstrates the
pull-not-push pattern and earns trust before expanding.

The minimum viable v1 set is an **open decision** (see Open Questions §1).
Until decided, the working assumption for planning is:

- "Why this finding?" on issue queue rows
- "Explain this adjustment" on the year-end adjustment workbench
- "Help me answer this year-end question" on incomplete year-end adjustment
  candidates, if Phase C ships AI Assist in v1
- "Ask Kanso" deferred to post-v1

This assumption is **not** binding and MUST be confirmed before
implementation.

## Failure Modes

The system MUST guard against:

- AI prose drifting into financial truth → enforced by requiring contract
  citation in every return.
- Habituated acceptance → enforced by always rendering AI output as a
  proposal with explicit accept action.
- Silent provider escalation → enforced by per-provider consent.
- Cross-`BooksPeriod` data leakage → enforced by `BooksPeriod`-scoped payloads.
- AI used to paper over deterministic gaps → if a class of question
  repeatedly cannot be answered without AI guesswork, the underlying
  deterministic explanation is missing and MUST be added to the validator,
  matcher, or policy layer first.

The last point is the most important: **AI Assist is not a substitute for
deterministic explanations that should exist.** If users keep asking AI to
explain something, that explanation belongs in contracts, not in a prompt.

## Open Questions (Decisions Required)

These are deliberately unresolved. They MUST be answered before v1 implements
AI Assist, but not before. Surface them at the right moment, not now.

1. **v1 affordance set.** Which of the Pull Triggers ship in v1? Default
   working assumption above is two contextual triggers and no global "Ask
   Kanso." Decision owner: founder. Decision moment: when AI Assist enters a
   sprint plan.

2. **Global "Ask Kanso" in v1?** Single-turn explain affordances are lower
   risk than a free-form chat. Open question: does v1 ship any free-form
   surface, or is it strictly per-trigger? Decision moment: same as §1.

3. **Default consent posture.** Per-call confirmation, per-`BooksPeriod` opt-in
   with persisted consent, or per-provider opt-in once at setup? Each has
   different friction and different audit characteristics. Decision moment:
   first AI Assist sprint plan.

4. **Provider choice for v1.** OpenAI, Anthropic, a specific hosted
   open-weight model, or multi-provider seam from day one? Decision moment:
   first AI Assist sprint plan, after consent posture is decided.

5. **Cost ceiling.** What internal token/cost budget applies per close or
   session, and what plain-language user budget state appears when help is
   limited? Kanso should not show raw token or dollar mechanics by default.
   Decision moment: pricing posture review for the wedge tier.

6. **Local-model viability.** When does local inference become cheap and
   fast enough on Apple Silicon to move "Why this finding?" off the cloud?
   Tracked per `Docs/KansoBooksKillList.md` re-open condition. Decision
   moment: when local inference benchmarks for the v1 affordance set hit
   the bar described in `Docs/KansoBooks_Trust.md` Trust UI Requirements.

7. **Citation rendering.** How is "AI cited transaction T-123 and rule
   matching.currency_mismatch_review" displayed in plain language without
   becoming jargon? Decision moment: GUI brief for the first AI-Assist
   surface (Tier C/D per `Docs/gui/GUI_Workflow.md`).

8. **"I don't know" UX.** What does graceful refusal look like when a
   question is out of scope (tax/legal) or when consent is denied? Decision
   moment: same as §7.

9. **Audit shape for AI calls.** Each AI call generates an audit event;
   open question is what fields are required (provider, model, prompt
   class, payload digest, returned decision class, user accept/reject).
   Decision moment: contract design for AI Assist (Docs/2..3 update).

10. **"Cursor of Bookkeeping" framing.** Marketing-level framing. Partially
    resolved: the canonical phrase for the AI coworker surface is
    *"AI prepares the books. Kanso proves the books. You approve what
    becomes true."* (`Docs/MCPSurfaceModel.md`). External marketing copy
    that uses "Cursor of bookkeeping" must defer to that phrase. Open
    question for in-app AI Assist is whether to lean on the same phrase
    or develop a sibling. Decision moment: positioning review separate
    from product architecture.

## Falsification

This model is wrong if any of the following are observed at scale after v1:

- Users ignore the affordance entirely → AI Assist is mis-placed; reconsider
  surface set or framing.
- Users treat AI output as final and skip review → proposal framing has
  failed; tighten labelling and accept-step requirements.
- AI output regularly drifts into uncited financial claims → citation
  enforcement is insufficient; add hard contract-binding rather than prompt
  discipline.
- Deterministic explanations are routinely worse than AI prose → invest in
  the validator and policy layer before expanding AI.
- Consent friction kills adoption → revisit consent posture (Open Question
  §3), not the pull-not-push principle.

The pull-not-push principle is **not** falsifiable by adoption metrics
alone. If users want more proactive AI, that is a sign to make deterministic
guidance more proactive — not to let AI post truth.

## Anchor

```text
The AccountingModel makes the books correct.
The Trust Model makes the user safe.
The AI Assist Model makes help available without taking control.
```
