---
id: bookkeeping-evidence-index-template
title: Bookkeeping Evidence Index Template
seoTitle: "Bookkeeping Evidence Index Template for Accountant Handoff"
description: A practical template for naming source files, review notes, unresolved items, and accountant questions for accountant review.
slug: bookkeeping-evidence-index-template
canonicalPath: /templates/bookkeeping-evidence-index-template
type: template
tier: 1
pillar: templates-tools-artifacts
state: drafted
intent: template
risk: medium
jurisdiction: general
jurisdictionNotes: General bookkeeping workflow template. Not tax, legal, audit, payroll, sales tax, filing, or entity-specific advice.
professionalBoundary: This template is general workflow guidance. Ask your accountant before relying on it for filing, tax treatment, payroll, sales tax, audit, legal, or entity-specific matters.
author: KansoBooks
reviewer: KansoBooks Editorial System
lastReviewed: 2026-05-09
nextReview: 2026-08-09
primaryQuery: bookkeeping evidence index template
secondaryQueries:
  - bookkeeping handoff template
  - accountant handoff evidence index
  - bookkeeping source file index template
canonicalJob: use-handoff-template
artifactId: bookkeeping-evidence-index-template
claimManifest: content/_claims/bookkeeping-evidence-index-template.yml
answerUnits:
  - AnswerBlock
  - KansoTake
  - DecisionSupport
  - ProofBoundary
  - SourceNotes
  - NextStep
  - EntitySummary
internalLinks: []
externalSources: []
schema:
  - Article
  - BreadcrumbList
---

If you need a bookkeeping evidence index template, use one row per source file and include four things: what the file is called, what was reviewed, what is still unresolved, and what question should go to the accountant. This creates a reviewable package without pretending the bookkeeping decisions are final tax, legal, or audit conclusions.

A useful handoff is a proof trail, not just categorized transactions. The template below keeps uncertainty visible instead of burying it. AI can help draft notes, but the work is only trustworthy when source files, review judgments, unresolved items, and accountant questions are explicit and reviewable.

## What This Helps You Decide

Use this template when you want to confirm whether your package can be reviewed by an accountant without extra back-and-forth.

| Source file name | Period covered | Review note | Unresolved item | Accountant question | Owner/status |
|---|---|---|---|---|---|
| Bank-Checking-Statement-2026-04.pdf | 2026-04 | Ending balance matched book balance on 2026-05-03. | One transfer appears twice in import list. | Should duplicate transfer be excluded or reclassified? | Owner: Sam; status: open |
| Card-Statement-2026-04.pdf | 2026-04 | Charges categorized; two travel lines marked uncertain. | Receipt missing for one travel charge. | Is owner note sufficient if receipt cannot be recovered? | Owner: Sam; status: waiting |
| Invoices-2026-04.zip | 2026-04 | Revenue invoices indexed to deposit lines. | One deposit has no matching invoice reference. | Should this be tracked as timing difference or missing record? | Owner: Sam; status: open |

Copy-ready blank table:

| Source file name | Period covered | Review note | Unresolved item | Accountant question | Owner/status |
|---|---|---|---|---|---|
|  |  |  |  |  | Owner: ; status:  |
|  |  |  |  |  | Owner: ; status:  |
|  |  |  |  |  | Owner: ; status:  |

Minimum fields to keep in every row:
- Source file name (exact local filename)
- Review note (what was checked)
- Unresolved item (what is still uncertain)
- Accountant question (what needs professional judgment)

Recommended owner/status values:
- Owner: the person responsible for the next action, such as the business owner, bookkeeper, or accountant.
- Status: open, waiting, resolved, sent-to-accountant, or not-needed.

Simple source filename convention:
- Use `SourceType-AccountOrVendor-YYYY-MM.ext`, such as `Bank-Checking-2026-04.pdf`, `Card-Visa-2026-04.pdf`, or `Receipts-OfficeDepot-2026-04.zip`.

## What You Can Prove

This template can prove that your review package names evidence, records review decisions, and flags unresolved matters before it is sent. It can also prove that uncertainty is visible rather than hidden.

It cannot prove filing correctness, tax treatment, audit outcomes, payroll treatment, sales tax treatment, legal conclusions, or entity-specific positions. It is not an accountant replacement and does not make AI output financial truth.

## Source Notes

This page follows KansoBooks' reader-job framing from docs/content-engine/Vision.md: get books ready, name uncertainty, and send a package that explains itself. It also follows the trust model from docs/KansoBooksVision.md: AI prepares work, proof and approval decide what is true in your records.

Boundary language follows content/_truth/legal-boundaries.yml and product posture in content/_truth/product.yml. Claims stay within local-first ownership and accountant-support positioning.

## Next Step

Copy this template into your handoff folder and fill one row per source file before sending anything. If a row has an unresolved item, keep it visible and turn it into a specific accountant question.

## Entity Summary

- Evidence index template: a structured table that links source files to review notes, unresolved items, and accountant questions.
- Source file: a statement, export, invoice set, receipt batch, or similar record used to support bookkeeping entries.
- Review note: plain-language statement of what was checked and what matched or differed.
- Unresolved item: an open issue that still needs clarification or professional judgment.
- Accountant question: a direct question attached to evidence so professional review can focus on decisions, not data hunting.
