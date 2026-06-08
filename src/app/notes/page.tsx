import type { Metadata } from 'next';
import { NoteForm } from '@/components';

export const metadata: Metadata = {
  title: 'Notes — NotesApp',
  description: 'View and create your notes.',
};

export default function NotesPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">Notes</h1>
      <p className="mt-2 text-gray-400">
        Create and manage your notes below. Full CRUD coming soon!
      </p>

      <div className="mt-10">
        <NoteForm />
      </div>

      {/* Notes listing will be implemented in a later feature branch */}
      <div className="mt-12 rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-gray-500">
        No notes yet. Create your first note above ☝️
      </div>
    </section>
  );
}
