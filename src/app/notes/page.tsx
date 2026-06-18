import type { Metadata } from 'next';
import { NotesClient } from '@/components';

export const metadata: Metadata = {
  title: 'Notes — NotesApp',
  description: 'View and create your notes.',
};

export default function NotesPage() {
  return <NotesClient />;
}
