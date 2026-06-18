# Tailwind CSS v4 Styling Conventions

## v4 Key Differences from v3

- No `tailwind.config.js` — all configuration lives in `globals.css`
- Entry point: `@import 'tailwindcss';` in CSS (not `@tailwind base/components/utilities`)
- Custom tokens: `@theme inline { --color-name: value; }` block in CSS
- PostCSS plugin: `@tailwindcss/postcss` (not `tailwindcss` directly in postcss.config)

## CSS Variables (defined in src/app/globals.css)

```css
:root {
  --background: #030712;  /* near-black page background */
  --foreground: #f9fafb;  /* near-white text */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

Use these as: `bg-background`, `text-foreground`, `font-sans`, `font-mono`

## Color Palette

| Tailwind Class        | Hex / Usage                          |
|-----------------------|--------------------------------------|
| `bg-gray-950`         | Page background                      |
| `bg-gray-900/50`      | Cards, panels (semi-transparent)     |
| `bg-gray-800/60`      | Input backgrounds                    |
| `bg-gray-950/80`      | Nav bar (semi-transparent)           |
| `text-white`          | Primary headings                     |
| `text-gray-300`       | Labels, secondary headings           |
| `text-gray-400`       | Body text, descriptions              |
| `text-gray-500`       | Placeholders, captions               |
| `indigo-600`          | Primary action color                 |
| `indigo-500`          | Hover state for primary              |
| `indigo-400`          | Active nav links, text links         |
| `text-red-400`        | Error messages                       |
| `border-white/10`     | Default border (translucent)         |
| `border-white/20`     | Hover border                         |
| `border-red-500/60`   | Error state border                   |

## Component Class Recipes

### Card / Container
```
rounded-2xl border border-white/10 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm
```

### Primary Button
```
rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white
shadow-lg shadow-indigo-500/25 transition-all duration-200
hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-[0.98]
```

### Ghost / Outline Button
```
rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300
transition-all hover:border-white/20 hover:text-white
```

### Text Input (default state)
```
w-full rounded-lg border border-white/10 bg-gray-800/60 px-4 py-2.5 text-sm text-white
placeholder-gray-500 outline-none transition-colors
focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
```

### Text Input (error state — add to default)
```
border-red-500/60 focus:ring-red-500/40
```

### Textarea (same as input, add resize-none and min-h)
```
... min-h-[120px] resize-none
```

### Form Label
```
block text-sm font-medium text-gray-300
```

### Error Message (under a field)
```
text-xs font-medium text-red-400
```

### Nav Bar
```
sticky top-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-xl
```

### Nav Link — Active
```
rounded-lg bg-indigo-500/20 px-3 py-2 text-sm font-medium text-indigo-400
```

### Nav Link — Inactive
```
rounded-lg px-3 py-2 text-sm font-medium text-gray-400
transition-all duration-200 hover:bg-white/5 hover:text-white
```

### Hero Gradient Text
```
bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent
```

### Badge / Tag
```
rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400
ring-1 ring-inset ring-indigo-500/20
```

## Typography Scale

| Element     | Classes                                                           |
|-------------|-------------------------------------------------------------------|
| H1 (hero)   | `text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl` |
| H2 (section)| `text-3xl font-bold tracking-tight text-white`                    |
| H3 (card)   | `text-xl font-semibold text-white`                                |
| Body        | `text-base text-gray-400`                                         |
| Small       | `text-sm text-gray-500`                                           |
| Tiny/caption| `text-xs text-gray-500`                                           |

## Layout Patterns

- Full-width container with max-width: `mx-auto max-w-5xl px-4 sm:px-6` (nav, wide)
- Content container: `mx-auto max-w-3xl px-4 sm:px-6` (forms, articles)
- Hero section padding: `py-24`
- Standard section: `py-16`
- Card field spacing: `space-y-5`
- Label + input pair: `space-y-1.5`

## Responsive Breakpoints Used in This Project

- `sm:` (640px) — wider padding (`sm:px-6`), larger hero fonts (`sm:text-6xl`)
- `md:` — not currently used but available for future multi-column layouts

## Conventions

1. **Never** use inline `style={{}}` in JSX.
2. **Never** create `.module.css` or additional CSS files — `globals.css` only.
3. Use opacity modifiers for translucency: `bg-white/10`, `border-white/10`.
4. Use `transition-all duration-200` consistently for all hover/active states.
5. Use `backdrop-blur-sm` (cards) or `backdrop-blur-xl` (nav) for depth effects.
6. For disabled states: `disabled:cursor-not-allowed disabled:opacity-50`
