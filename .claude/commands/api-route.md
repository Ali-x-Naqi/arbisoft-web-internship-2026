Generate a Next.js App Router API route for this project.

Route request: $ARGUMENTS

## Requirements

- File location: `src/app/api/<route-name>/route.ts`
- Export named HTTP method handlers: `GET`, `POST`, `PUT`, `DELETE` as needed
- Use `NextRequest` and `NextResponse` from `next/server`
- All handlers must be async and return `NextResponse.json(..., { status: N })`
- Define request body types inline or import from `@/types`
- Include input validation before processing; return 400 with a clear error message on invalid input
- Wrap all logic in try/catch; return 500 on unexpected errors
- Log errors with `console.error('[METHOD /api/route]', error)` before returning 500

## HTTP Status Codes

- 200 — OK (successful GET)
- 201 — Created (successful POST)
- 400 — Bad Request (missing or invalid input)
- 404 — Not Found
- 500 — Internal Server Error

## Pattern Template

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ data: [] }, { status: 200 });
  } catch (error) {
    console.error('[GET /api/route]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { field: string };
    if (!body.field) {
      return NextResponse.json({ error: 'field is required' }, { status: 400 });
    }
    return NextResponse.json({ data: body }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/route]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## Dynamic Route Segments (Next.js 16)

For `/api/notes/[id]`, create `src/app/api/notes/[id]/route.ts`.
In Next.js 16, params is a Promise — always await it:

```typescript
interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
}
```

## Client-Side Consumption Example

```typescript
const res = await fetch('/api/notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title, body }),
});
if (!res.ok) throw new Error((await res.json()).error);
const result = await res.json();
```

## Output

1. The complete route file for `src/app/api/<route>/route.ts`
2. Any new TypeScript types (or note they should go in `src/types/`)
3. Example `fetch()` call showing how to consume this route from a client component
