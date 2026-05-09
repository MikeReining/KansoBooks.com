# Final Audit Checklist

Final audit decides whether a content item may publish. Founder approval is not
a publishing gate. Passing deterministic checks is the gate.

## Required Inputs

- Final draft or artifact.
- Metadata.
- Claim manifest.
- Claim audit output.
- Research packet.
- Internal links and canonical path.
- Artifact ID when required.
- Run log history.

## Gate Checks

- Content schema validates.
- Metadata schema validates.
- Claim manifest validates.
- All sources resolve.
- All internal links resolve.
- Claim audit is pass.
- No unsupported factual claims remain.
- No invented dates, prices, laws, standards, or deadlines.
- No tax, legal, audit, payroll, sales tax, filing, or entity-specific advice.
- No product claims beyond truth files and canonical docs.
- No contradiction with Kanso manifesto, vision, or wedge.
- Jurisdiction and risk rules pass.
- Artifact ID resolves when required.
- AnswerBlock, KansoTake, DecisionSupport, ProofBoundary, SourceNotes, and
  NextStep are present for Tier 1 and Tier 2 pages.
- Entity summary is present when required.
- The page answers at least one of: Am I done? Is this right? Can I prove it?
- The output is useful enough to send to a small-business owner or accountant.

## Publish Decision Output

```yaml
finalAudit:
  contentId: ""
  status: "publish|blocked|escalate"
  checkedAt: ""
  checkedBy: "kanso-final-audit"
  checksPassed: []
  checksFailed: []
  publishAllowed: false
  requiredFixes: []
  escalation:
    needed: false
    reason: ""
    narrowDecisionNeeded: ""
  handoffTo: "kanso-publish"
```

