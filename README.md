# Janver's Ultimate Vibe Coding Course

A free, beginner-friendly course website: landing page, dashboard and 8 courses (57 lessons, including 12 guided projects). No login: "Get started" goes straight to the dashboard. Progress is saved in the browser (localStorage).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
```

## Stack

Vite + React 19 + TypeScript, Tailwind CSS v4, React Router, Motion, lucide-react.

## Where things live

- `src/content/courses/` — all course content, one file per course (`c0-start.ts` … `c8-engineer.ts`)
- `src/content/types.ts` — the content block types (paragraphs, callouts, tables, prompts, quizzes, diagrams…)
- `src/components/` — block renderer, diagrams, project page, pixel mascot
- `src/pages/` — Landing, Dashboard (`/learn`), Lesson page, sidebar layout

To add or edit a lesson, edit the course file. TypeScript checks the structure, so `npm run build` will catch mistakes.

## Deploy

Push to GitHub and import the repo in Vercel. `vercel.json` already rewrites all routes to `index.html`.
