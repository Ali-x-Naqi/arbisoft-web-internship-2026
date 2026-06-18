Apply Tailwind CSS v4 styling to a component or UI element.

Styling request: $ARGUMENTS

## Project Design System (Dark Glassmorphism)

### Color Palette

- Page background: `bg-gray-950`
- Card/panel: `bg-gray-900/50 backdrop-blur-sm`
- Input background: `bg-gray-800/60`
- Nav bar: `bg-gray-950/80 backdrop-blur-xl`
- Text primary: `text-white`
- Text body: `text-gray-300`
- Text secondary: `text-gray-400`
- Text muted: `text-gray-500`
- Accent: `indigo-600` (default), `indigo-500` (hover), `indigo-400` (active/link)
- Error text: `text-red-400`

### Borders

- Default: `border border-white/10`
- Hover: `border-white/20`
- Error: `border-red-500/60`
- Dashed empty state: `border-dashed border-white/10`

### Component Classes

**Card/Container:**
`rounded-2xl border border-white/10 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm`

**Primary Button:**
`rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-[0.98]`

**Ghost Button:**
`rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300 transition-all hover:border-white/20 hover:text-white`

**Text Input (default):**
`w-full rounded-lg border border-white/10 bg-gray-800/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/40`

**Text Input (error state):**
Add to the default input: `border-red-500/60 focus:ring-red-500/40`

**Form Label:**
`block text-sm font-medium text-gray-300`

**Error Message:**
`text-xs font-medium text-red-400`

**Nav Link (active):**
`rounded-lg bg-indigo-500/20 px-3 py-2 text-sm font-medium text-indigo-400`

**Nav Link (inactive):**
`rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-white/5 hover:text-white`

**Gradient Hero Text:**
`bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent`

### Typography Scale

- H1 hero: `text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl`
- H2 section: `text-3xl font-bold tracking-tight text-white`
- H3 card heading: `text-xl font-semibold text-white`
- Body: `text-gray-400`
- Small: `text-sm text-gray-500`

### Layout

- Max-width (nav/footer): `mx-auto max-w-5xl px-4 sm:px-6`
- Max-width (content): `mx-auto max-w-3xl px-4 sm:px-6`
- Section padding: `py-16` (standard), `py-24` (hero)

### Conventions

1. Never use inline `style={{}}` in JSX.
2. Use opacity modifiers for translucency: `bg-white/10`, `border-white/10`.
3. Use `transition-all duration-200` for all interactive hover/focus states.
4. Use `backdrop-blur-sm` or `backdrop-blur-xl` for depth on dark backgrounds.

## Output

1. The updated component file with Tailwind classes applied
2. Notes on any responsive breakpoints used (`sm:`, `md:`, `lg:`)
