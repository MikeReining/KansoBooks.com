# KansoBooks.com Agent Instructions

Focus on high density communication.
Think from first principles.

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
