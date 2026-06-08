import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — NotesApp',
  description: 'Learn more about this project and the internship.',
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        About This Project
      </h1>

      <div className="mt-8 space-y-6 text-gray-300 leading-relaxed">
        <p>
          <strong className="text-white">NotesApp</strong> is a simple CRUD
          single-page application built during the{' '}
          <strong className="text-indigo-400">
            Arbisoft Web Internship 2026
          </strong>{' '}
          (June 8 – July 31).
        </p>

        <div className="rounded-2xl border border-white/10 bg-gray-900/40 p-6">
          <h2 className="text-lg font-semibold text-white">Tech Stack</h2>
          <ul className="mt-3 space-y-1 text-sm text-gray-400">
            <li>
              ⚡ <strong className="text-gray-200">Next.js 16</strong> — App
              Router
            </li>
            <li>
              ⚛️ <strong className="text-gray-200">React 19</strong> — latest
              stable
            </li>
            <li>
              🔷 <strong className="text-gray-200">TypeScript 5</strong> —
              strict mode
            </li>
            <li>
              🎨 <strong className="text-gray-200">Tailwind CSS 4</strong> —
              utility-first
            </li>
            <li>
              🧪 <strong className="text-gray-200">Vitest</strong> + React
              Testing Library
            </li>
            <li>
              📏 <strong className="text-gray-200">ESLint + Prettier</strong> —
              zero-conflict config
            </li>
          </ul>
        </div>

        <p>
          This project is part of{' '}
          <strong className="text-white">Phase 1 (Weeks 1–3)</strong> which
          focuses on web fundamentals — React/Next.js frontend, REST backend,
          authentication, and testing. Every line of code is written inside an
          agentic AI coding environment.
        </p>

        <p className="text-sm text-gray-500">
          Mentor: <strong className="text-gray-400">Huwaiza Tahir</strong> •
          Track: Web
        </p>
      </div>
    </section>
  );
}
