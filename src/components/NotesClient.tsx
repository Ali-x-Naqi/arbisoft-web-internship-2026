'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Note } from '@/types';
import { NoteForm } from '@/components';

export default function NotesClient() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch('/api/notes');
      if (!res.ok) throw new Error('Failed to load notes');
      const json = (await res.json()) as { data: Note[] };
      setNotes(json.data);
    } catch {
      setFetchError('Could not load notes. Please refresh.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchNotes();
  }, [fetchNotes]);

  const handleNoteCreated = useCallback((note: Note) => {
    setNotes((prev) => [note, ...prev]);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">Notes</h1>
      <p className="mt-2 text-gray-400">Create and manage your notes.</p>

      <div className="mt-10">
        <NoteForm onNoteCreated={handleNoteCreated} />
      </div>

      <div className="mt-12">
        {isLoading && (
          <p className="text-center text-sm text-gray-500">Loading notes…</p>
        )}

        {fetchError && (
          <p role="alert" className="text-center text-sm text-red-400">
            {fetchError}
          </p>
        )}

        {!isLoading && !fetchError && notes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-gray-500">
            No notes yet. Create your first note above.
          </div>
        )}

        {notes.length > 0 && (
          <ul className="space-y-4">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded-2xl border border-white/10 bg-gray-900/50 p-5 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-white">
                      {note.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">{note.body}</p>
                    <p className="mt-3 text-xs text-gray-600">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => void handleDelete(note.id)}
                    aria-label={`Delete note: ${note.title}`}
                    className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-400 transition-all hover:border-red-500/40 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
