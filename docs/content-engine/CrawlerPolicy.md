# Crawler Policy

**Status:** Initial policy seed
**Authority:** Human-readable companion to `content/_truth/crawler-policy.yml`.

## Current Position

KansoBooks should make public content crawlable, extractable, and citable by
traditional search engines and AI retrieval systems that can send users back to
KansoBooks.

Training-crawler access is not decided in Phase 1. Phase 2 must refresh the
official crawler documentation before implementing `robots.txt`, `llms.txt`, or
crawler-specific directives.

## Phase 2 Decision

Phase 2 must explicitly decide:

- retrieval/search crawler allowlist
- training crawler allowlist or blocklist
- `robots.txt` generation source
- `llms.txt` generation source
- sitemap reference policy
- source refresh cadence for crawler user agents

`robots.txt` is not a security boundary. Sensitive or private content must use
authentication, `noindex`, removal tools, or not be published.
