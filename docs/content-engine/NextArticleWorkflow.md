# Next Article Workflow

**Status:** Active operating contract.
**Trigger phrases:** `Next article`, `next post`, `next content`.

When the user writes one of the trigger phrases, Codex should run this workflow
without asking what to do next unless a gate blocks progress.

## Source Files

- Schedule: `content/_data/publishing-schedule.yml`
- Topic queue: `content/_data/topic-inventory.yml`
- Human-readable topic report: `docs/content-engine/TopicInventory.md`
- Ideation process: `docs/content-engine/IdeaGeneration.md`
- Drafting process: `docs/content-engine/CodexContentOrchestration.md`

## Step 1 - Cadence Check

Find the latest `publishedAt` date among content items with `state: published`.

- If the latest publish is less than 24 hours ago, still draft the next article.
  Report the latest article and the next eligible publish window in the final
  handoff.
- If the latest publish is 24 hours or more ago, draft the next article and note
  that it is eligible for publication after founder review.
- If a published article is missing `publishedAt`, fix that metadata before
  selecting a new topic.

Use the user's current timezone from the environment context.

The 24-hour rule gates publishing, not drafting. A queue of draft-ready articles
is allowed and useful.

## Step 2 - Select Topic

Open `content/_data/topic-inventory.yml`.

Pick the first topic where:

- `status: candidate`
- `duplicateRisk <= 2`
- required fields are present
- the topic does not duplicate an existing published or drafted article

If no candidate qualifies:

1. Run `docs/content-engine/IdeaGeneration.md`.
2. Add at least 10 new candidates to `content/_data/topic-inventory.yml`.
3. Pick the best qualifying candidate.

## Step 3 - Draft Run

Run the normal content orchestration:

- create `docs/content-runs/YYYY-MM-DD-slug/`
- write or update `topic-score.yml`
- create `brief.yml`, `research-packet.yml`, `draft-record.yml`
- create content file
- create claim manifest
- create artifact when needed
- apply `docs/content-engine/CopyGuide.md`
- make image decision with `docs/content-engine/ContentImageStyleGuide.md`
- run claim audit, presentation audit, and final audit

The output should be draft-ready for review, not automatically published.

Stop before publication every time. Only change `state` to `published` when the
founder explicitly approves publishing. If the founder asks to publish before
the 24-hour window, confirm that they want to override the cadence before
changing state.

## Step 4 - Verification

Run:

```text
npm run content:validate
npm run typecheck
npm run lint
npm run build
```

Start a local preview server on the KansoBooks project port and provide the
draft preview URL.

```text
npm run dev -- --port 48623
```

Never use port `3000` or `3001` for this repo. Those ports collide with other
local projects. If `48623` is occupied, clear that exact port or choose another
high, project-specific port.

## Step 5 - Update Inventory

After the draft is ready:

- set the selected topic to `drafted`
- record the content path and run directory
- add any newly discovered related ideas as candidates
- update `docs/content-engine/TopicInventory.md` if the human-readable report is
  stale

## Output Shape

When done, answer with:

- selected topic
- why it was selected
- last published article and date
- draft preview URL
- gates passed
- publish eligibility window
- what remains before publication
