import { NextRequest, NextResponse } from 'next/server';

// Share the same store declared in the parent route module
declare global {
  var __notesStore: import('@/types').Note[] | undefined;
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

// DELETE /api/notes/:id
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const notes = globalThis.__notesStore ?? [];
    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    notes.splice(index, 1);
    return NextResponse.json({ message: 'Note deleted' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
