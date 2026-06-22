# CLAUDE.md — Arbisoft Web Internship 2026

This file is read automatically by Claude Code at every session start. Keep it accurate.

## Project Overview

A CRUD Notes SPA built during the Arbisoft Web Internship 2026 (June 8 – July 31).
Every line of code is written inside an agentic AI coding environment (Claude Code).
Goal: learn React/Next.js fundamentals in Phase 1, then apply agentic AI patterns in Phases 2–3.

Repository: https://github.com/Ali-x-Naqi/arbisoft-web-internship-2026
Mentor: Huwaiza Tahir

## Tech Stack

| Technology            | Version | Purpose                                        |
|-----------------------|---------|------------------------------------------------|
| Next.js               | 16.2.7  | App Router, SSR, file-based routing            |
| React                 | 19.2.4  | UI library                                     |
| TypeScript            | ^5      | Static typing throughout                       |
| Tailwind CSS          | ^4      | Utility-first CSS (CSS-first config)           |
| ESLint                | ^9      | Linting (flat config in eslint.config.mjs)     |
| Prettier              | ^3      | Formatting (zero-conflict via eslint-config-prettier) |
| Vitest                | ^4      | Unit test runner                               |
| React Testing Library | ^16     | Component testing                              |
| jsdom                 | ^29     | Browser environment for tests                  |

## Folder Structure

```
src/
  app/                   # Next.js App Router — routes live here
    layout.tsx           # Root layout (Navbar + Footer wrapping)
    page.tsx             # Home page (/)
    globals.css          # Tailwind v4 @import + CSS custom properties
    notes/page.tsx       # /notes route
    about/page.tsx       # /about route
  components/            # Shared UI components
    Navbar.tsx           # Sticky top nav with active-link highlighting
    Footer.tsx           # Simple footer with dynamic year
    NoteForm.tsx         # Controlled form with client-side validation
    index.ts             # Barrel export
  hooks/
    useNoteForm.ts       # Form state, validation, submission logic
    index.ts             # Barrel export
  types/
    note.ts              # Note, NoteFormData, NoteFormErrors interfaces
    index.ts             # Barrel export
  utils/
    validation.ts        # validateNoteForm(), hasErrors()
    index.ts             # Barrel export
  __tests__/
    NoteForm.test.tsx    # 4 unit tests for NoteForm component
  test-setup.ts          # @testing-library/jest-dom/vitest matchers
```

Config files at root: `next.config.ts`, `vitest.config.ts`, `eslint.config.mjs`,
`tsconfig.json`, `postcss.config.mjs`.

## Path Aliases

`@/` resolves to `src/` — configured in both `tsconfig.json` and `vitest.config.ts`.
Always import using `@/components`, `@/hooks`, `@/types`, `@/utils`.

## Common Commands

```bash
npm run dev            # Start dev server on http://localhost:3000
npm run build          # Production build
npm run start          # Start production server
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix ESLint issues
npm run format         # Prettier format all files
npm run format:check   # Check formatting without writing
npm run test           # Run Vitest (single pass)
npm run test:watch     # Run Vitest in watch mode
```

## Branch Strategy (STRICT)

- `main` — stable only. **Never commit directly to main.**
- `feature/xxx` — one branch per feature. Create → commit → push → PR → merge.
- Every task starts: `git checkout -b feature/<task-name>`
- Commit message format: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`

## Coding Rules

1. Always review all AI-generated code before committing. Understand every line.
2. Log every significant prompt in `prompts.md` (see template at top of that file).
3. Components go in `src/components/` and must be exported from `index.ts`.
4. Hooks go in `src/hooks/` and must be exported from `index.ts`.
5. Types go in `src/types/` — use interfaces, not type aliases, for object shapes.
6. Utilities go in `src/utils/` — pure functions only, no side effects.
7. All components must be TypeScript — no `.js` or `.jsx` files.
8. Client components require `'use client'` at the top — add it only when needed.
9. Use Tailwind utility classes only — no inline styles, no CSS modules.
10. Run `npm run lint` and `npm run test` before every commit.

## Tailwind CSS v4 Notes

Tailwind v4 uses CSS-first configuration. `@import 'tailwindcss'` in `globals.css` is
the entry point. Custom tokens are defined with `@theme inline { ... }`. The
`--background` and `--foreground` CSS variables are used project-wide for the dark theme.
PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss` directly.

## Testing Conventions

- Test files live in `src/__tests__/` with `.test.tsx` extension.
- Import pattern: `import { describe, it, expect, vi } from 'vitest'`
- Always mock `next/navigation` at the top of every component test:
  ```typescript
  vi.mock('next/navigation', () => ({
    usePathname: () => '/test-path',
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  }));
  ```
- Use `userEvent.setup()` for user interactions — never `fireEvent`.
- Query by accessible role/label first: `getByRole`, `getByLabelText`, `getByText`.

## Internship Phases

### Phase 1 — Web Fundamentals (Weeks 1–3)
React 19 + Next.js 16 App Router, REST API integration, authentication patterns,
unit testing with Vitest + RTL. Focus: learn by building, review all AI output.

### Phase 2 — Agentic AI (Weeks 4–5)
Claude Code slash commands (`.claude/commands/`), memory patterns, hooks,
MCP servers (filesystem, GitHub, fetch), multi-agent workflows with LangChain/LlamaIndex.
MCP config lives in `.mcp.json` at project root.

### Phase 3 — Build (Weeks 5–8)
Self-proposed feature extension of this Notes app, mentor-approved.
Final live demo to Huwaiza + 5-minute video. Document the build process in `prompts.md`.

## Claude Code Slash Commands

Custom slash commands live in `.claude/commands/`. Type them in any Claude Code session:

| Command      | Purpose                                                  |
|--------------|----------------------------------------------------------|
| `/component` | Generate a React/Next.js component with TypeScript + Tailwind |
| `/api-route` | Create a Next.js App Router API route with error handling |
| `/test`      | Write Vitest + React Testing Library tests               |
| `/style`     | Apply Tailwind v4 dark-theme classes to a component      |

## MCP Servers (Phase 2+)

Configured in `.mcp.json`. Three servers available:
- `filesystem` — direct file read/write access scoped to this project directory
- `github` — PR and issue management via GitHub API
- `fetch` — fetching documentation and web resources

Requires the environment variable `GITHUB_PERSONAL_ACCESS_TOKEN` to be set in your
shell before starting Claude Code (for the `github` MCP server only).

## Prompt Logging

Every significant AI interaction must be logged in `prompts.md`.
See the template at the top of `prompts.md` for the required format.
This is a transparency and learning requirement from Arbisoft.
