import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from '@/components/NoteForm';
import type { Note } from '@/types';

vi.mock('next/navigation', () => ({
  usePathname: () => '/notes',
  useRouter: () => ({ push: vi.fn() }),
}));

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('NoteForm', () => {
  it('renders all form fields and the submit button', () => {
    render(<NoteForm />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/body/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /save note/i })
    ).toBeInTheDocument();
  });

  it('shows validation errors when the form is submitted empty', async () => {
    const user = userEvent.setup();
    render(<NoteForm />);

    await user.click(screen.getByRole('button', { name: /save note/i }));

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/body is required/i)).toBeInTheDocument();
  });

  it('submits successfully with valid data — calls POST /api/notes and clears form', async () => {
    const mockNote: Note = {
      id: '1',
      title: 'My Test Note',
      body: 'This is a valid note body with enough characters.',
      authorId: 'default-user',
      createdAt: '2026-06-10T00:00:00.000Z',
      updatedAt: '2026-06-10T00:00:00.000Z',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: mockNote }),
      } as unknown as Response)
    );

    const user = userEvent.setup();
    render(<NoteForm />);

    await user.type(screen.getByLabelText(/title/i), 'My Test Note');
    await user.type(
      screen.getByLabelText(/body/i),
      'This is a valid note body with enough characters.'
    );
    await user.click(screen.getByRole('button', { name: /save note/i }));

    await waitFor(() => {
      expect(vi.mocked(fetch)).toHaveBeenCalledWith(
        '/api/notes',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'My Test Note',
            body: 'This is a valid note body with enough characters.',
          }),
        })
      );
    });

    // Form fields cleared after successful submit
    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/body/i)).toHaveValue('');
  });

  it('shows min-length error for title shorter than 3 characters', async () => {
    const user = userEvent.setup();
    render(<NoteForm />);

    await user.type(screen.getByLabelText(/title/i), 'Ab');
    await user.type(screen.getByLabelText(/body/i), 'Short');
    await user.click(screen.getByRole('button', { name: /save note/i }));

    expect(
      screen.getByText(/title must be at least 3 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/body must be at least 10 characters/i)
    ).toBeInTheDocument();
  });
});
