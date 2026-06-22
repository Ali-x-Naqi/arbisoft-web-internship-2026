// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from '@/app/api/notes/route';
import { DELETE, PUT } from '@/app/api/notes/[id]/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    note: {
      findMany: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const mockNote = {
  id: 'note-1',
  title: 'Test Note',
  body: 'This is a test note body with enough characters.',
  authorId: 'default-user',
  createdAt: new Date('2026-06-18T00:00:00.000Z'),
  updatedAt: new Date('2026-06-18T00:00:00.000Z'),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/notes', () => {
  it('returns 200 with notes array', async () => {
    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.note.findMany).mockResolvedValue([mockNote]);

    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].id).toBe('note-1');
  });
});

describe('POST /api/notes', () => {
  it('returns 201 with created note for valid body', async () => {
    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.note.create).mockResolvedValue(mockNote);

    const req = new NextRequest('http://localhost/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Note',
        body: 'This is a test note body with enough characters.',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.data.id).toBe('note-1');
  });

  it('returns 400 when title is too short', async () => {
    const req = new NextRequest('http://localhost/api/notes', {
      method: 'POST',
      body: JSON.stringify({ title: 'Ab', body: 'Valid body content here.' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toMatch(/at least 3 characters/i);
  });
});

describe('PUT /api/notes/:id', () => {
  const makeContext = (id: string) => ({ params: Promise.resolve({ id }) });

  it('returns 200 with updated note for valid body', async () => {
    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.note.update).mockResolvedValue({
      ...mockNote,
      title: 'Updated Title',
    });

    const req = new NextRequest('http://localhost/api/notes/note-1', {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated Title' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await PUT(req, makeContext('note-1'));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data.title).toBe('Updated Title');
  });

  it('returns 404 when note is not found', async () => {
    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.note.update).mockRejectedValue({ code: 'P2025' });

    const req = new NextRequest('http://localhost/api/notes/missing', {
      method: 'PUT',
      body: JSON.stringify({ title: 'Updated Title' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await PUT(req, makeContext('missing'));
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.error).toBe('Note not found');
  });
});

describe('DELETE /api/notes/:id', () => {
  const makeContext = (id: string) => ({ params: Promise.resolve({ id }) });

  it('returns 200 on successful delete', async () => {
    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.note.delete).mockResolvedValue(mockNote);

    const req = new NextRequest('http://localhost/api/notes/note-1', {
      method: 'DELETE',
    });
    const res = await DELETE(req, makeContext('note-1'));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.message).toBe('Note deleted');
  });

  it('returns 404 when note does not exist', async () => {
    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.note.delete).mockRejectedValue({ code: 'P2025' });

    const req = new NextRequest('http://localhost/api/notes/missing', {
      method: 'DELETE',
    });
    const res = await DELETE(req, makeContext('missing'));
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.error).toBe('Note not found');
  });
});
