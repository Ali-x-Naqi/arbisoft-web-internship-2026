# Skills Reference — Arbisoft Web Internship 2026

This folder contains human-readable pattern documentation for code generation in this project.
It serves as a reference when asking Claude Code to generate code, and for reviewing AI output.

These are NOT Claude Code slash commands — those live in `.claude/commands/` and are invoked
as `/component`, `/api-route`, `/test`, `/style` in Claude Code sessions.
These files explain the patterns in depth for reading, review, and use in longer prompts.

## Files

| File                       | Purpose                                          |
|----------------------------|--------------------------------------------------|
| `component-generation.md`  | React/Next.js component naming, templates, rules |
| `api-route-creation.md`    | Next.js App Router API route patterns            |
| `test-writing.md`          | Vitest + RTL testing patterns and conventions    |
| `tailwind-styling.md`      | Tailwind v4 design system and class conventions  |

## How to Use

**Option 1 — Slash commands (fastest):**
Type `/component NoteCard` in Claude Code to generate a component using embedded patterns.

**Option 2 — Reference in a prompt:**
"Generate a component following the patterns in skills/component-generation.md"

**Option 3 — Manual review:**
Read these files before reviewing AI-generated code to check it follows project conventions.
