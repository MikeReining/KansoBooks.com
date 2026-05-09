# kanso-content-brief

## Purpose

Turn an approved topic into a precise article contract. No content starts from
"write about X." The brief defines reader job, proof angle, sources, artifact,
boundaries, and handoff requirements.

## Inputs

- Topic scoring output.
- Canonical product docs and truth files.
- Existing content inventory and internal-link targets.
- Shared brief template in `skills/_shared/kanso-content-templates.md`.

## Outputs

- Completed brief.
- Required answer units.
- Selected artifact ID or artifact sprint requirement.
- Source plan and claims requiring careful wording.
- Handoff to `kanso-research-packet`.

## Hard Refusal Conditions

- No reader job.
- No Kanso thesis tied to readiness, proof, ownership, or accountant handoff.
- No answer to Am I done? Is this right? or Can I prove it?
- No professional boundary.
- Required artifact is missing and cannot be created safely in this sprint.
- The brief asks for tax/legal/audit advice or accountant replacement claims.

## Escalation Conditions

- The brief needs new product truth.
- The brief depends on unsettled pricing, competitor, crawler, or platform facts.
- The topic needs jurisdiction-specific treatment.
- Product language conflicts with manifesto, vision, or wedge.

## Examples Of Good Output

```yaml
kansoThesis: "Categorized transactions are not finished books. Finished books have reconciled totals, unresolved items named, and evidence ready for review."
operatingQuestions:
  amIDone: "The checklist defines the handoff package."
  isThisRight: "Reconciliation and review notes show what was checked."
  canIProveIt: "The evidence index explains the source trail."
```

## Examples Of Bad Output

```yaml
kansoThesis: "Bookkeeping is important for every business."
requiredSections:
  - "Introduction"
  - "Benefits"
  - "Conclusion"
```

Fails because it is generic and has no proof contract.

## Required Checks

- Use the shared brief template.
- Include all Tier-required answer units.
- Define risk, jurisdiction, professional boundary, and conversion path.
- Name sources to use and sources to avoid.
- Identify careful claims before research begins.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-research-packet"
  briefPath: ""
  briefId: ""
  risk: ""
  jurisdiction: ""
  sourcePlan: []
  carefulClaims: []
  artifactId: ""
```

