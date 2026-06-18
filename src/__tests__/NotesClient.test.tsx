import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotesClient from '@/components/NotesClient';
import type { Note } from '@/types';

vi.mock('next/navigation', () => ({
  usePathname: () => '/notes',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

// NoteForm makes its own fetch calls on mount — isolate to test NotesClient alone
vi.mock('@/components/NoteForm', () => ({
  default: () => null,
}));

afterEach(() => {
  vi.unstubAllGlobals();
});

const mockNote: Note = {
  id: 'note-1',
  title: 'Test Note Title',
  body: 'This is the body of the test note.',
  createdAt: '2026-06-18T00:00:00.000Z',
};

describe('NotesClient', () => {
  it('shows loading spinner on initial render before fetch resolves', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockReturnValue(new Promise(() => {})) // never resolves
    );

    render(<NotesClient />);

    expect(screen.getByText(/loading notes/i)).toBeInTheDocument();
  });

  it('renders notes after fetch resolves successfully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [mockNote] }),
      } as unknown as Response)
    );

    render(<NotesClient />);

    await waitFor(() => {
      expect(screen.getByText('Test Note Title')).toBeInTheDocument();
    });
    expect(
      screen.getByText('This is the body of the test note.')
    ).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as unknown as Response)
    );

    render(<NotesClient />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
    expect(screen.getByRole('alert')).toHaveTextContent(
      /could not load notes/i
    );
  });

  it('removes a note from the list when Delete is clicked', async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: [mockNote] }),
        } as unknown as Response)
        .mockResolvedValueOnce({ ok: true } as unknown as Response) // DELETE response
    );

    render(<NotesClient />);

    await waitFor(() => {
      expect(screen.getByText('Test Note Title')).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole('button', { name: /delete note: test note title/i })
    );

    await waitFor(() => {
      expect(screen.queryByText('Test Note Title')).not.toBeInTheDocument();
    });
  });
});
