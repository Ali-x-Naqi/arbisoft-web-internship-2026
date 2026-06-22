'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      id="main-navbar"
      className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white transition-colors hover:text-indigo-400"
        >
          📝 NotesApp
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
