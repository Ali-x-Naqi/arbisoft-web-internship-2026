# Test Writing Patterns

## Setup

- Test runner: Vitest v4 (configured in `vitest.config.ts`)
- DOM environment: jsdom (configured in vitest.config.ts)
- Setup file: `src/test-setup.ts` (imports `@testing-library/jest-dom/vitest` matchers)
- Test location: `src/__tests__/*.test.tsx`
- Path alias `@/` works in tests (aliased to `src/`)

## Required Imports

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComponentName from '@/components/ComponentName';
```

## Always Mock next/navigation

Every test file that imports a component using `usePathname` or `useRouter` must mock it:

```typescript
vi.mock('next/navigation', () => ({
  usePathname: () => '/mock-path',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));
```

## userEvent Pattern (required — never use fireEvent)

```typescript
it('handles user interaction', async () => {
  const user = userEvent.setup(); // always call setup() first
  render(<ComponentName />);

  await user.type(screen.getByLabelText(/title/i), 'My Note Title');
  await user.click(screen.getByRole('button', { name: /save/i }));

  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

## Query Priority (use in this order)

1. `getByRole('button', { name: /label/i })` — best; mirrors accessibility tree
2. `getByLabelText(/label/i)` — for form inputs with associated labels
3. `getByText(/text/i)` — for non-interactive visible text
4. `getByPlaceholderText(/text/i)` — fallback for inputs without visible labels
5. `getByTestId('id')` — last resort only

Use `/regex/i` (case-insensitive) for resilience to capitalization changes.

## Describe/It Structure Pattern

```typescript
describe('NoteForm', () => {
  it('renders the form with title and body fields', () => {
    render(<NoteForm />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/body/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup();
    render(<NoteForm />);
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/body is required/i)).toBeInTheDocument();
  });

  it('submits successfully with valid data', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<NoteForm />);
    await user.type(screen.getByLabelText(/title/i), 'My Test Note');
    await user.type(screen.getByLabelText(/body/i), 'This is a valid body text');
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
```

## Spy / Mock Pattern

```typescript
// Spy on console.log
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
// after test
consoleSpy.mockRestore();

// Mock a prop callback
const onSubmitMock = vi.fn();
render(<NoteForm onSubmit={onSubmitMock} />);
expect(onSubmitMock).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test' }));
```

## Async Patterns

```typescript
// userEvent automatically wraps in act — just await it
await user.click(button);
expect(screen.getByText(/result/i)).toBeInTheDocument();

// For explicit async waits (fetch, timers):
await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument();
});
```

## Existing Tests for Reference

`src/__tests__/NoteForm.test.tsx` — covers:
- Renders correctly (title field, body field, submit button visible)
- Empty submit shows validation errors for both fields
- Valid submit calls console.log with note data
- Min-length validation errors shown for short inputs
