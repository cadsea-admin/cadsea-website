'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/sponsors', label: 'Partners' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-md">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tracking-wide">CADSEA</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-gold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/events"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-md bg-gold text-navy text-sm font-semibold hover:bg-gold-light transition-colors"
        >
          Join an Event
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-light border-t border-white/10 px-6 py-4 space-y-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium py-2 transition-colors ${
                pathname === href ? 'text-gold' : 'text-white/80 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/events"
            onClick={() => setOpen(false)}
            className="block mt-2 px-4 py-2 rounded-md bg-gold text-navy text-sm font-semibold text-center"
          >
            Join an Event
          </Link>
        </div>
      )}
    </header>
  )
}
