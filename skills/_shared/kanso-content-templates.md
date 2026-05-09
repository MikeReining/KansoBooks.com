# Kanso Content Templates

These templates are workflow artifacts for Hermes and Codex content runs. They
are not public articles.

## Operating Questions

Every brief, draft, review, and audit must return to three reader questions:

```text
Am I done?
Is this right?
Can I prove it?
```

Good Kanso content helps the reader answer at least one of these with evidence,
boundaries, and a next action. Bad Kanso content explains accounting terms
without moving the reader toward books-readiness.

## Brief Template

```yaml
briefId: ""
topicId: ""
state: "briefed"
titleCandidate: ""
slugCandidate: ""
pillar: ""
tier: 1
readerJob: ""
canonicalJob: ""
searchIntent: ""
aiAnswerIntent: ""
primaryQuery: ""
secondaryQueries: []
kansoThesis: ""
operatingQuestions:
  amIDone: ""
  isThisRight: ""
  canIProveIt: ""
requiredAnswerUnits:
  - "AnswerBlock"
  - "KansoTake"
  - "DecisionSupport"
  - "ProofBoundary"
  - "SourceNotes"
  - "NextStep"
requiredSections: []
selectedArtifactId: ""
artifactUse: ""
internalLinks: []
sourcesToUse: []
sourcesToAvoid: []
carefulClaims: []
jurisdiction: "general"
risk: "medium"
professionalBoundary: ""
conversionPath: ""
publishPriority: ""
refreshCadence: ""
handoffTo: "kanso-research-packet"
```

## Research Packet Template

```yaml
packetId: ""
briefId: ""
state: "researched"
researcher: "kanso-research"
dateChecked: ""
primarySources:
  - title: ""
    url: ""
    publisher: ""
    dateChecked: ""
    claimUse: ""
    reliability: "primary"
secondarySources: []
competitorGaps: []
definitions:
  - term: ""
    source: ""
    safeDefinition: ""
numbersAndDates: []
uncertainClaims: []
riskBoundaries:
  tax: ""
  legal: ""
  audit: ""
  accounting: ""
sourceExcerpts:
  - source: ""
    excerpt: ""
    useLimit: "short excerpt only"
suggestedExamples: []
writerWarnings: []
handoffTo: "kanso-article-draft"
```

## Article Template

```markdown
---
id: ""
title: ""
seoTitle: ""
description: ""
slug: ""
canonicalPath: ""
type: "resource"
tier: 1
pillar: ""
state: "drafted"
intent: ""
risk: "medium"
jurisdiction: "general"
jurisdictionNotes: ""
professionalBoundary: ""
author: "KansoBooks"
reviewer: "KansoBooks Editorial System"
lastReviewed: ""
nextReview: ""
primaryQuery: ""
secondaryQueries: []
canonicalJob: ""
artifactId: ""
claimManifest: "content/_claims/<id>.yml"
answerUnits:
  - "AnswerBlock"
  - "KansoTake"
  - "DecisionSupport"
  - "ProofBoundary"
  - "SourceNotes"
  - "NextStep"
internalLinks: []
externalSources: []
schema: []
---

# Literal Useful H1

<!-- AnswerBlock: 40-80 words. Answer the query directly. -->

<!-- KansoTake: connect to readiness, proof, ownership, or accountant handoff. -->

## What This Helps You Decide

<!-- DecisionSupport: checklist, table, decision tree, worked example, or template. -->

## What You Can Prove

<!-- ProofBoundary: what can be verified, what needs judgment, what needs an accountant. -->

## Source Notes

<!-- SourceNotes: cite sources for factual claims. Name Kanso thesis for positioning. -->

## Next Step

<!-- NextStep: one natural next action. -->

## Entity Summary

| Entity | Meaning | Relationship |
|---|---|---|
```

## Artifact Template

```yaml
schemaVersion: 1
id: ""
title: ""
artifactType: "checklist"
jurisdiction: "general"
risk: "medium"
sourceNotes:
  - ""
professionalBoundary: ""
owner: "KansoBooks Editorial System"
lastReviewed: ""
nextReview: ""
content:
  purpose: ""
  useWhen: []
  doNotUseFor: []
  checklist: []
  proofNeeded: []
  accountantQuestions: []
```

## Claim Manifest Template

```yaml
schemaVersion: 1
pageId: ""
risk: "medium"
claims:
  - id: ""
    text: ""
    type: "product"
    source: ""
    # sourceCheckedAt: "2026-05-09"
    refresh: "stable"
    notes: ""
```

Allowed claim `type` values:

```text
product
pricing
competitor
performance
accounting-workflow
tax-legal
positioning
crawler-policy
```

Allowed `refresh` values:

```text
stable
on-release
monthly
quarterly
six-months
annual
before-publish
```

## Run Log Template

```yaml
runId: ""
topicId: ""
from: ""
to: ""
agent: ""
timestamp: ""
checksPassed: []
checksFailed: []
artifactsCreated: []
claimManifest: ""
nextAction: ""
escalation: null
```

## Good Output Example

```text
Your books are ready for accountant review when every statement balance matches,
every transaction has a category or review note, unusual items are explained,
and the package includes the source evidence your accountant needs to check the
work. KansoBooks should describe that package. It should not claim the filing
decision is complete.
```

## Bad Output Example

```text
This comprehensive guide will revolutionize your tax workflow by using AI to
guarantee audit-ready books and replace expensive accountants.
```

Why it fails: hype, tax/audit overclaim, replacement claim, and AI-as-truth.
