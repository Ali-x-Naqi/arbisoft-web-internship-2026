Generate a React component for this Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 project.

Component request: $ARGUMENTS

## Requirements

- Place the file in `src/components/<ComponentName>.tsx`
- Use TypeScript with an explicit prop interface named `<ComponentName>Props`
- Add `'use client'` only if the component uses hooks, event handlers, or browser APIs
- Style with Tailwind utility classes only — no inline styles, no CSS modules
- Match the existing dark-theme aesthetic: `bg-gray-900`, `text-white`, `text-gray-400`, `border-white/10`, `rounded-xl`, indigo-600 accents
- Export as a default export: `export default function <ComponentName>(...)`
- After creating the file, add the export to `src/components/index.ts`

## Tailwind v4 Patterns (match existing components)

- Container: `rounded-2xl border border-white/10 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm`
- Text primary: `text-white`
- Text secondary: `text-gray-400`
- Labels: `text-sm font-medium text-gray-300`
- Interactive: `transition-all duration-200 hover:bg-indigo-500`
- Focus rings: `focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500`
- Primary button: `rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-[0.98]`

## Output

1. The complete component file content for `src/components/<ComponentName>.tsx`
2. The line to add to `src/components/index.ts`
3. A brief note on any architectural decisions (server vs client, etc.)
