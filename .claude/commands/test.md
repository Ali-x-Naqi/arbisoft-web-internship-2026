Write Vitest + React Testing Library tests for this project.

Test request: $ARGUMENTS

## Requirements

- Place test files in `src/__tests__/<ComponentName>.test.tsx`
- Use these exact imports:
  ```typescript
  import { describe, it, expect, vi } from 'vitest';
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  ```
- Always mock `next/navigation` at the top of every component test:
  ```typescript
  vi.mock('next/navigation', () => ({
    usePathname: () => '/test-path',
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), prefetch: vi.fn() }),
    useSearchParams: () => new URLSearchParams(),
  }));
  ```
- Use `userEvent.setup()` for all interactions — never `fireEvent`
- Query by accessible role or label first: `getByRole`, `getByLabelText`, `getByText`
- Use `getByTestId` only as a last resort

## Test Structure

```typescript
describe('<ComponentName>', () => {
  it('renders without crashing and shows expected elements', () => { ... });
  it('shows validation errors when submitted empty', async () => { ... });
  it('submits successfully with valid data', async () => { ... });
});
```

## userEvent Pattern

```typescript
it('handles user input', async () => {
  const user = userEvent.setup();
  render(<ComponentName />);

  await user.type(screen.getByLabelText(/label/i), 'input value');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/expected result/i)).toBeInTheDocument();
});
```

## Spy Pattern (for console.log or callbacks)

```typescript
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
// ... interact ...
expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({ key: 'value' }));
consoleSpy.mockRestore();
```

## Coverage Targets

Write tests that cover at minimum:
1. Initial render — correct elements present
2. Invalid/empty input — validation errors shown
3. Valid input — happy path completes correctly

## Output

1. The complete test file for `src/__tests__/<ComponentName>.test.tsx`
2. Any required mocks or fixtures
3. Command to run: `npm run test` or `npm run test:watch`
