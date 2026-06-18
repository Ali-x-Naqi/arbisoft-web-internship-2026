import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      {/* Hero Gradient Orb */}
      <div className="pointer-events-none absolute -top-32 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

      <h1 className="relative text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
        Your Notes,{' '}
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Simplified
        </span>
      </h1>

      <p className="relative mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
        A minimal notes app built with{' '}
        <strong className="text-gray-200">Next.js 16</strong>,{' '}
        <strong className="text-gray-200">React 19</strong>, and{' '}
        <strong className="text-gray-200">TypeScript</strong> — part of the
        Arbisoft Web Internship 2026.
      </p>

      <div className="relative mt-10 flex gap-4">
        <Link
          href="/notes"
          className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
        >
          View Notes →
        </Link>
        <Link
          href="/about"
          className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300 transition-all hover:border-white/20 hover:text-white"
        >
          About
        </Link>
      </div>
    </section>
  );
}
