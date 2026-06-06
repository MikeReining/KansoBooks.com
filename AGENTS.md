# KansoBooks.com Agent Instructions

Focus on high density communication.
Think from first principles.

## Project Purpose

This repo is the public website and Autonomous Content Engine for
`KansoBooks.com`. It is not the desktop KansoBooks product repo.

The first job is a trustworthy public site with local-first positioning. The
second job is a content factory that publishes proof-grade resources from
source-controlled content without founder editorial labor.

## Local Development Port

Never run KansoBooks.com on port `3000` or `3001`.

Those ports collide with other local projects. When starting this repo's Next.js
dev server, use the project-specific port:

```bash
npm run dev -- --port 48623
```

The local preview URL is:

```text
http://localhost:48623
```

If `48623` is occupied, stop the process using that exact port or choose another
high, project-specific port. Do not fall back to `3000` or `3001`.

## Phase And Sprint Routing

- Live phase status and next work: `docs/phases/README.md`
- Sprint execution process: `docs/operations/Execution-Playbook.md`
- Content factory, product truth, control plane, claims detail:
  `docs/operations/Agent-Workflow-Detail.md`

## Product Boundary

KansoBooks is local-first. Supabase and Lemon Squeezy are control plane only.
Never imply user books live in the cloud. AI prepares; Kanso proves; the user
approves.
