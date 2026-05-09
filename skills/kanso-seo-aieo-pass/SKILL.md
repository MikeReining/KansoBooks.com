# kanso-seo-aieo-pass

## Purpose

Make the page crawlable, internally connected, and answer-engine friendly while
preserving the Kanso proof boundary.

## Inputs

- Draft with metadata.
- Brief, research packet, and claim manifest.
- Internal-link map or existing content inventory.
- Metadata and schema requirements.

## Outputs

- Optimized draft.
- SEO/AIEO checklist result.
- Schema and internal-link recommendations.
- Handoff to `kanso-tone-pass`.

## Hard Refusal Conditions

- Optimization adds unsupported claims.
- Page lacks AnswerBlock, KansoTake, DecisionSupport, ProofBoundary,
  SourceNotes, or NextStep when required.
- Internal links point to nonexistent or contradictory pages.
- Entity summary is required but missing.
- SEO edits create keyword stuffing or generic accounting filler.

## Escalation Conditions

- Required internal link target does not exist.
- Schema support is missing from the codebase.
- Duplicate or cannibalization risk appears during optimization.

## Examples Of Good Output

```yaml
aieoChecks:
  answerBlock: "present"
  proofBoundary: "present"
  entitySummary: "present"
  snippetSafeSummary: "present"
```

## Examples Of Bad Output

```text
Added "best AI bookkeeping software tax audit guarantee" to headings for reach.
```

Fails for keyword stuffing and forbidden claims.

## Required Checks

- Intent match.
- Heading hierarchy.
- Internal and external links.
- Canonical URL.
- Schema eligibility.
- Extractable tables or lists.
- Stable summary.
- No vague pronouns where entity names matter.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-tone-pass"
  draftPath: ""
  seoChecksPassed: []
  aieoChecksPassed: []
  requiredFollowups: []
```

