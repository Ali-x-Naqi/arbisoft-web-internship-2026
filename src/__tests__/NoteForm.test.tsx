import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteForm from '@/components/NoteForm';

// Mock next/navigation since NoteForm's parent may use usePathname
vi.mock('next/navigation', () => ({
  usePathname: () => '/notes',
  useRouter: () => ({ push: vi.fn() }),
}));

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

  it('submits successfully with valid data and logs to console', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<NoteForm />);

    await user.type(screen.getByLabelText(/title/i), 'My Test Note');
    await user.type(
      screen.getByLabelText(/body/i),
      'This is a valid note body with enough characters.'
    );
    await user.click(screen.getByRole('button', { name: /save note/i }));

    // No errors should be visible
    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();

    // Console should have been called with the note data
    expect(consoleSpy).toHaveBeenCalledWith(
      '✅ Note submitted:',
      expect.objectContaining({
        title: 'My Test Note',
        body: 'This is a valid note body with enough characters.',
      })
    );

    consoleSpy.mockRestore();
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
