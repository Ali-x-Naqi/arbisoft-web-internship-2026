import { NextRequest, NextResponse } from 'next/server';
import type { Note } from '@/types';

// In-memory store — survives hot-reloads in dev via globalThis
// Replaced by a real database (Prisma/ORM) in Week 2
declare global {
  var __notesStore: Note[] | undefined;
}
const notes: Note[] = (globalThis.__notesStore ??= []);

// GET /api/notes — return all notes, newest first
export async function GET() {
  return NextResponse.json({ data: [...notes].reverse() }, { status: 200 });
}

// POST /api/notes — create a new note
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { title?: string; body?: string };

    if (!body.title?.trim()) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }
    if (!body.body?.trim()) {
      return NextResponse.json({ error: 'body is required' }, { status: 400 });
    }
    if (body.title.trim().length < 3) {
      return NextResponse.json(
        { error: 'title must be at least 3 characters' },
        { status: 400 }
      );
    }
    if (body.body.trim().length < 10) {
      return NextResponse.json(
        { error: 'body must be at least 10 characters' },
        { status: 400 }
      );
    }

    const note: Note = {
      id: crypto.randomUUID(),
      title: body.title.trim(),
      body: body.body.trim(),
      createdAt: new Date().toISOString(),
    };

    notes.push(note);

    return NextResponse.json({ data: note }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
