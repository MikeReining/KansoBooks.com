# kanso-article-draft

## Purpose

Draft the article from the brief, research packet, selected artifact, and truth
files. The draft must be useful, proof-oriented, and Kanso-native before SEO or
tone polish.

## Inputs

- Approved brief.
- Research packet.
- Artifact ID or approved artifact draft.
- Product truth files and canonical docs.
- Shared article template.

## Outputs

- Draft article or artifact content.
- Initial metadata.
- Draft claim manifest.
- Handoff to `kanso-headline-metadata`.

## Hard Refusal Conditions

- Brief or research packet missing.
- Draft would need unsupported factual claims.
- Draft would give tax, legal, audit, payroll, sales tax, filing, or
  entity-specific advice.
- Draft implies cloud books, accountant replacement, or AI as financial truth.
- Required answer units cannot be satisfied.

## Escalation Conditions

- Source packet blocks a core claim.
- Artifact facts are incomplete.
- Kanso product capability is unclear.
- The safest draft would be too generic to publish.

## Examples Of Good Output

```text
Categorized transactions are a start, not a finish line. Your books are closer
to accountant-ready when statement balances match, unusual transactions have
notes, and the evidence needed to check the work is in the package.
```

## Examples Of Bad Output

```text
With KansoBooks, AI automatically completes your tax-ready books so your
accountant is no longer necessary.
```

Fails every major boundary: tax-ready, automatic truth, and accountant
replacement.

## Required Checks

- First answer appears within the opening 150 words.
- Required answer units are present.
- Each material claim appears in the claim manifest.
- The draft includes a proof boundary.
- The draft includes decision support or an artifact.
- The draft answers at least one operating question.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-headline-metadata"
  draftPath: ""
  claimManifestPath: ""
  briefId: ""
  packetId: ""
  artifactId: ""
  knownRisks: []
```

