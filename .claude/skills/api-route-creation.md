# API Route Creation Patterns

## File Location

Next.js App Router API routes live at: `src/app/api/<route-name>/route.ts`

Examples:
- `src/app/api/notes/route.ts` → handles `/api/notes`
- `src/app/api/notes/[id]/route.ts` → handles `/api/notes/:id`

## Standard Route Template (CRUD)

```typescript
import { NextRequest, NextResponse } from 'next/server';

// GET /api/notes — list all notes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // const filter = searchParams.get('filter');

    return NextResponse.json({ data: [] }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/notes]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/notes — create a note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { title: string; body: string };

    if (!body.title?.trim() || !body.body?.trim()) {
      return NextResponse.json({ error: 'title and body are required' }, { status: 400 });
    }

    const newNote = { id: crypto.randomUUID(), ...body, createdAt: new Date().toISOString() };
    return NextResponse.json({ data: newNote }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/notes]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## Dynamic Route Segment (Next.js 16)

For `/api/notes/[id]`, create `src/app/api/notes/[id]/route.ts`.
In Next.js 16, route segment params are a **Promise** — always await them:

```typescript
import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  return NextResponse.json({ data: { id } }, { status: 200 });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json() as Partial<{ title: string; body: string }>;
  return NextResponse.json({ data: { id, ...body } }, { status: 200 });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return NextResponse.json({ message: `Note ${id} deleted` }, { status: 200 });
}
```

## HTTP Status Code Reference

| Code | Meaning            | When to use                         |
|------|--------------------|-------------------------------------|
| 200  | OK                 | Successful GET, PUT, DELETE         |
| 201  | Created            | Successful POST (resource created)  |
| 400  | Bad Request        | Missing/invalid input               |
| 401  | Unauthorized       | No valid authentication             |
| 403  | Forbidden          | Authenticated but not permitted     |
| 404  | Not Found          | Resource doesn't exist              |
| 409  | Conflict           | Duplicate resource                  |
| 500  | Internal Server Error | Unexpected error (catch block)   |

## Client-Side Fetch Pattern

```typescript
// GET
const res = await fetch('/api/notes');
if (!res.ok) throw new Error('Failed to load notes');
const { data } = await res.json();

// POST
const res = await fetch('/api/notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title, body }),
});
if (!res.ok) {
  const { error } = await res.json();
  throw new Error(error);
}
const { data: newNote } = await res.json();

// DELETE
await fetch(`/api/notes/${id}`, { method: 'DELETE' });
```

## TypeScript Types

Add shared API types to `src/types/note.ts`:

```typescript
export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface NoteFormData {
  title: string;
  body: string;
}
```
