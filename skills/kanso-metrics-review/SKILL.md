# kanso-metrics-review

## Purpose

Convert performance data into topic, refresh, and quality signals without
chasing vanity traffic or broadening outside the wedge.

## Inputs

- Search Console, analytics, indexing, citation, and conversion data when
  available.
- Published content inventory.
- Run logs, audit failures, and refresh schedule.

## Outputs

- Metrics review report.
- Topic candidates for `kanso-topic-scoring`.
- Refresh candidates for `kanso-refresh`.
- Quality or validator improvement notes.

## Hard Refusal Conditions

- Recommends topics solely because keywords have volume.
- Recommends content outside ICP or wedge without buying intent.
- Recommends weakening proof, source, or professional boundaries for traffic.
- Treats AI answer mentions as proof of factual correctness.

## Escalation Conditions

- Metrics imply product positioning conflict.
- A high-performing page attracts unsafe or wrong-fit intent.
- Analytics, crawler, or indexing access fails.

## Examples Of Good Output

```yaml
refreshCandidates:
  - contentId: "accountant-package-checklist"
    reason: "High impressions, low CTR, title may underspecify accountant handoff."
topicCandidates:
  - "what to include in an evidence index"
```

## Examples Of Bad Output

```yaml
topicCandidates:
  - "2026 tax deductions for every small business"
reason: "Huge search volume."
```

Fails for tax advice risk and generic volume chasing.

## Required Checks

- Separate traffic, usefulness, and conversion signals.
- Check topic candidates against canonical jobs.
- Feed all new topics through scoring.
- Feed stale or decaying pages through refresh.
- Record metrics source and date.

## Downstream Handoff Format

```yaml
handoff:
  to: "kanso-topic-scoring"
  metricsReviewPath: ""
  topicCandidates: []
  refreshCandidates: []
  qualityFindings: []
```

