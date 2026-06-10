# Component Generation Patterns

## Naming Conventions

- PascalCase for component names and file names: `NoteCard.tsx`, `SearchBar.tsx`
- Props interface name: `<ComponentName>Props`
- Default export name matches filename: `export default function NoteCard(...)`

## Server Component Template (no hooks/events)

```typescript
interface NoteCardProps {
  title: string;
  body: string;
  createdAt?: string; // optional props use ?
}

export default function NoteCard({ title, body, createdAt }: NoteCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-400">{body}</p>
    </div>
  );
}
```

## Client Component Template (uses hooks/events)

```typescript
'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search...' }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-gray-800/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
      />
    </form>
  );
}
```

## Rules

1. Add `'use client'` only when needed: hooks, event handlers, browser APIs, `usePathname`, etc.
2. Prefer plain function syntax over `React.FC<Props>`.
3. Never use `any` — use `unknown` and narrow the type when necessary.
4. Always type callback props: `onSubmit: (data: NoteFormData) => void`
5. Export from `src/components/index.ts` after creating a new component.
6. Use `@/` for all internal imports — never relative paths across directories.

## Barrel Export Pattern

After creating `src/components/NewComponent.tsx`, add to `src/components/index.ts`:
```typescript
export { default as NewComponent } from './NewComponent';
```

## Existing Components for Reference

- `Navbar.tsx` — Client component; uses `usePathname()` for active link; conditional class logic
- `Footer.tsx` — Server component; static markup with `new Date().getFullYear()`
- `NoteForm.tsx` — Client component; delegates state to `useNoteForm` hook; shows field errors

## Custom Hook Pattern

When a component has complex state logic, extract it to `src/hooks/`:

```typescript
// src/hooks/useNoteForm.ts
export function useNoteForm() {
  const [formData, setFormData] = useState<NoteFormData>({ title: '', body: '' });
  const [errors, setErrors] = useState<NoteFormErrors>({});
  // ...
  return { formData, errors, handleChange, handleSubmit };
}
```

Then in the component:
```typescript
import { useNoteForm } from '@/hooks';
const { formData, errors, handleChange, handleSubmit } = useNoteForm();
```
