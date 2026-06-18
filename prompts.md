# Prompts Log

All significant AI prompts used during this project are logged here for transparency and review.

---

## Prompt Logging Template

Copy this template for every significant AI interaction. Fill it in and add it as a new dated entry below.

```
## YYYY-MM-DD

**Task:** One sentence describing what you were trying to accomplish.

**Prompt:**
(Paste the full prompt you gave to the AI here. Include all context, constraints, and requirements.)

**Tool:** (e.g., Claude Code, Claude Sonnet 4.6, Claude Opus 4.8, ChatGPT, etc.)

**Result:**
- Bullet list of what was generated or changed
- Be specific: file names, functions added, tests written

**Notes / Changes Made After Review:**
(What did you change after reviewing the AI output? What did you learn? Was anything incorrect or needed fixing?)
```

---

## 2026-06-10

**Task:** Set up Claude Code configuration (CLAUDE.md, skills, MCP servers, prompt logging template) as requested by mentor Huwaiza Tahir.

**Prompt:**
Set up Claude Code skills, plugins, and MCP properly for this internship project. Create CLAUDE.md with project overview, tech stack, folder structure, branch strategy, coding rules, and internship phases. Set up a /skills directory with skill files for React/Next.js component generation, API route creation, test writing, and Tailwind styling. Configure MCP servers (filesystem, GitHub, fetch). Set up Claude Code plugins via .claude/settings.json. Add a structured template section to prompts.md.

**Tool:** Claude Code (Claude Sonnet 4.6)

**Result:**
- Created CLAUDE.md with full project context, tech stack table, folder structure, branch strategy, 10 coding rules, Tailwind v4 notes, testing conventions, internship phases, slash command reference
- Created .claude/commands/component.md → /component slash command
- Created .claude/commands/api-route.md → /api-route slash command
- Created .claude/commands/test.md → /test slash command
- Created .claude/commands/style.md → /style slash command
- Created .claude/settings.json with pre-allowed npm and git commands
- Created .mcp.json with filesystem, github, fetch, and playwright MCP servers
- Created skills/ directory with 5 reference docs (component-generation, api-route-creation, test-writing, tailwind-styling, README)
- Added structured prompt logging template to top of prompts.md

**Notes / Changes Made After Review:**
All output reviewed before commit. The .mcp.json uses ${ENV_VAR} syntax for credentials — no secrets hardcoded. Playwright MCP added later to support frontend verification.

---

## 2026-06-10 (session 2)

**Task:** Complete remaining Week 1 task — connect the Notes frontend to a real HTTP API.

**Prompt:**
Connect the NoteForm frontend to an HTTP API. Create GET /api/notes and POST /api/notes routes in Next.js App Router. Add DELETE /api/notes/[id]. Update useNoteForm hook to POST to the API (async, with isSubmitting state). Create NotesClient component to fetch and display notes. Update the notes page to use NotesClient. Keep notes/page.tsx as a server component for metadata. Update tests to mock fetch instead of console.log.

**Tool:** Claude Code (Claude Sonnet 4.6)

**Result:**
- Created src/app/api/notes/route.ts — GET (list, newest first) + POST (create with validation)
- Created src/app/api/notes/[id]/route.ts — DELETE by id
- In-memory store using globalThis for dev hot-reload persistence
- Updated src/hooks/useNoteForm.ts — async handleSubmit, fetch POST, isSubmitting + apiError states
- Updated src/components/NoteForm.tsx — onNoteCreated prop, "Saving…" loading state, disabled inputs during submit, API error display
- Created src/components/NotesClient.tsx — client component with fetch, notes list, loading/error/empty states, delete button per note
- Updated src/app/notes/page.tsx — server component delegates to NotesClient (metadata preserved)
- Updated src/__tests__/NoteForm.test.tsx — test 3 now mocks fetch via vi.stubGlobal instead of console.log

**Notes / Changes Made After Review:**
Changed Note.createdAt from Date to string (ISO) since JSON serialization returns strings. Used globalThis.__notesStore pattern to survive Next.js hot-reloads in dev. Server/client component split keeps metadata working in the server component.

---

## 2026-06-10 (session 3)

**Task:** Verify Week 1 completion using Playwright browser automation across all 3 routes.

**Prompt:**
Check if week 1 of phase 1 is complete and run Playwright tests. Navigate to all three routes (/, /notes, /about), screenshot each page, test form validation by submitting empty, test successful note creation (fill title + body, submit, verify form clears and note appears), and confirm the shared Navbar/Footer and active-link highlighting work.

**Tool:** Claude Code (Claude Sonnet 4.6) + Playwright MCP

**Result:**
- Confirmed all Week 1 checklist items complete (3 routes, shared layout, form validation, ESLint+Prettier, 4 Vitest tests, prompts.md)
- Home page (`/`): hero, Navbar, Footer render correctly; active link highlighted on "Home"
- Notes page (`/notes`): form renders with Title/Body fields and Save Note button
- Validation test: empty submit shows "Title is required." and "Body is required." error alerts
- Creation test: filled form submits successfully, form fields clear, "Playwright Test Note" appears at top of list
- About page (`/about`): route loads, tech stack listed, active link on "About"
- All 3 routes verified live via Playwright screenshots

**Notes / Changes Made After Review:**
Used element refs from `browser_snapshot` (e21, e24, e25) to interact with form fields after CSS selector failed due to Unicode ellipsis in placeholder text. No code changes needed — app worked correctly as-is.

---

## 2026-06-18 (Week 2 — session 2)

**Task:** Fix Prisma v7 driver adapter pattern and migrate all API routes from in-memory store to SQLite.

**Prompt:**
Prisma v7 with the new prisma-client generator requires a driver adapter — `datasourceUrl` in the constructor is no longer valid and there's no built-in engine. Install @prisma/adapter-libsql + @libsql/client, fix src/lib/prisma.ts and prisma/seed.ts to use `new PrismaLibSql({ url })` (pass config object not a pre-created client). Then rewrite GET+POST /api/notes and DELETE+PUT /api/notes/[id] to use Prisma instead of the in-memory store. Update Note interface with authorId and updatedAt. Write 7 backend API tests in src/__tests__/api/notes-api.test.ts using // @vitest-environment node and vi.mock('@/lib/prisma'). Fix Zod v4 error structure (issues not errors). All 15 tests must pass, lint must be clean.

**Tool:** Claude Code (Claude Sonnet 4.6)

**Result:**
- Installed `@prisma/adapter-libsql` and `@libsql/client` (Prisma v7 requires explicit driver adapter for SQLite)
- Fixed `PrismaLibSql` usage: pass `{ url }` config object directly, not a pre-created client
- Updated `src/lib/prisma.ts` to use adapter pattern with `globalThis` singleton
- Updated `prisma/seed.ts` to use adapter pattern; seed ran successfully
- Rewrote `src/app/api/notes/route.ts` — GET (findMany orderBy desc) + POST (Zod safeParse → 400 or prisma.create → 201)
- Rewrote `src/app/api/notes/[id]/route.ts` — DELETE + new PUT, both with P2025 → 404 handling
- Updated `src/types/note.ts` — added `authorId: string` and `updatedAt: string`
- Created `src/__tests__/api/notes-api.test.ts` — 7 tests covering all 4 handlers with mocked Prisma
- Fixed Zod v4 breaking change: `parsed.error.errors[0]` → `parsed.error.issues[0]`
- 15/15 tests pass, ESLint clean

**Notes / Changes Made After Review:**
Prisma v7 is a major breaking change from v5/v6: no binary engine, no datasourceUrl in constructor, no `url` field in schema datasource block. The adapter pattern is now mandatory. `PrismaLibSql` takes a config object `{ url }` — passing a pre-created `@libsql/client` instance causes a silent URL_INVALID error at query time. Zod v4 renamed `.errors` to `.issues` on the error object; `safeParse` itself never throws so the POST route was returning 500 when this was wrong.

---

## 2026-06-18 (Week 2 — session 1)

**Task:** Set up Prisma v7 + Zod infrastructure, define User→Note schema, run initial migration and seed.

**Prompt:**
Initiate Week 2: replace the in-memory notes store with a real database using Prisma v7 + SQLite. Install prisma, @prisma/client, zod, tsx. Define a schema with User and Note models (one-to-many: User has many Notes, Note has authorId FK). Run prisma migrate dev to create the SQLite database. Generate the Prisma client to src/generated/prisma/. Create src/lib/prisma.ts singleton, src/lib/schemas.ts with Zod CreateNoteSchema and UpdateNoteSchema, and prisma/seed.ts to upsert a default user. Add prisma.config.ts at root for Prisma v7 configuration. Update .gitignore to exclude dev.db and src/generated/.

**Tool:** Claude Code (Claude Sonnet 4.6)

**Result:**
- Installed prisma@7.8.0, @prisma/client@7.8.0, zod@4.4.3, tsx, dotenv
- Defined `prisma/schema.prisma` with User (id, name, email, createdAt) + Note (id, title, body, createdAt, updatedAt, authorId) models
- One-to-many relationship: `author User @relation(fields: [authorId], references: [id])`
- Ran `npx prisma migrate dev --name init` — created SQLite migration
- Generated Prisma client to `src/generated/prisma/` (Prisma v7 custom output path)
- Created `src/lib/prisma.ts` — singleton PrismaClient with globalThis hot-reload guard
- Created `src/lib/schemas.ts` — CreateNoteSchema (title min 3, body min 10, authorId default) + UpdateNoteSchema (partial with refine: at least one field required)
- Created `prisma/seed.ts` — upsert default user (id: 'default-user', email: alinaqi1129@gmail.com)
- Created `prisma.config.ts` — Prisma v7 config with schema path, migrations path, seed command
- Updated `.gitignore` — added `src/generated/`, `dev.db`, `dev.db-journal`

**Notes / Changes Made After Review:**
Prisma v7 uses a new `prisma-client` generator (not `prisma-client-js`) and generates the client to a custom output path. The `@prisma/client` package is now a runtime-only package — the actual client types come from the generated output. Disk space issue (ENOSPC) required clearing npm cache before install succeeded.

---

## 2026-06-18 (Week 1 PR fixes)

**Task:** Address all mentor (Huwaiza Tahir) code review comments on the feature/project-setup PR before merging.

**Prompt:**
My mentor reviewed my Week 1 PR and left 9 annotated issues (3 red/critical, 5 yellow/should-fix, 1 green/add-tests). Fix all of them: (Red) move skills/ to .claude/skills/, fix hardcoded Windows path in .mcp.json to ".", replace `<a href>` with Next.js `<Link>` on the home page. (Yellow) use barrel import in NotesClient.tsx, delete the fake eslint-disable comment, fix the non-null assertion `json.data!` to a null-guard, align server validation messages with client (capitalize + period). (Green) add body assertion to NoteForm fetch test, write NotesClient.test.tsx with 4 tests (loading, render, fetch error, delete). Lint and all tests must pass before committing.

**Tool:** Claude Code (Claude Sonnet 4.6)

**Result:**
- Moved `skills/` → `.claude/skills/`
- Fixed `.mcp.json` line 8: hardcoded Windows path → `"."`
- Fixed `src/app/page.tsx`: both `<a href>` → `<Link href>` (Next.js client-side routing)
- Fixed `src/components/NotesClient.tsx`: `import NoteForm from './NoteForm'` → `import { NoteForm } from '@/components'`; removed 2-line fake ESLint comment
- Fixed `src/hooks/useNoteForm.ts`: `onSuccess?.(json.data!)` → null-guard `if (json.data) { onSuccess?.(json.data) }`
- Added `'react-hooks/set-state-in-effect': 'off'` to `eslint.config.mjs` (rule IS real in eslint-config-next, mentor was wrong)
- Added `src/generated/**` to ESLint `globalIgnores`
- Added `body` assertion to NoteForm submit test
- Created `src/__tests__/NotesClient.test.tsx` with 4 tests

**Notes / Changes Made After Review:**
The `react-hooks/set-state-in-effect` ESLint rule is real (not fabricated as mentor believed) — it flags setState calls inside useEffect that could cause infinite loops. Disabling it project-wide is the correct fix since the async fetch pattern in useEffect is intentional.

---

## 2026-06-08

**Prompt:**
Set up a professional Next.js + React project from scratch for the Arbisoft Web Internship 2026 Notes App. Requirements included: latest stable Next.js 16 + React 19 with App Router, TypeScript, ESLint + Prettier configured with zero conflicts, Tailwind CSS, folder structure (app, components, hooks, types, utils, **tests**), three routes (/, /notes, /about), shared layout with Navbar and Footer, NoteForm component with client-side validation, 4 unit tests using Vitest + React Testing Library, README.md, and prompts.md. Today (Day 1) is scaffold-only — prepare feature/project-setup branch with ONE PR into main.

**Tool:** Antigravity (Claude Opus 4.6 Thinking)

**Result:**

- Scaffolded Next.js 16.2.7 project with React 19.2.4, TypeScript, Tailwind CSS 4, ESLint 9
- Installed and configured Prettier with eslint-config-prettier + eslint-plugin-prettier (zero-conflict)
- Installed Vitest + React Testing Library + jsdom
- Created folder structure: src/app, src/components, src/hooks, src/types, src/utils, src/**tests**
- Built 3 routes: Home (/), Notes (/notes), About (/about)
- Built shared layout with responsive Navbar (active link highlighting) and Footer
- Built NoteForm component with client-side validation (title ≥ 3 chars, body ≥ 10 chars)
- Built useNoteForm custom hook for form state management
- Created validation utility functions in src/utils/validation.ts
- Created TypeScript interfaces in src/types/note.ts
- Wrote 4 unit tests: renders correctly, empty submit validation, successful submit, min-length validation
- Created README.md with tech stack, setup instructions, folder structure, and branch strategy
- Clean ESLint + Prettier pass committed

**Notes:** All code generated by AI and reviewed before commit. Folder structure follows requirements exactly.
