'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const aboutLinks = [
  { href: '/about/board', label: 'Board of Directors' },
  { href: '/about/advisory', label: 'Advisory Committee' },
  { href: '/about/volunteers', label: 'Volunteers' },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services & Programs' },
  { href: '/events', label: 'Events' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [desktopAboutOpen, setDesktopAboutOpen] = useState(false)
  const pathname = usePathname()
  const aboutRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setDesktopAboutOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isAboutActive = pathname.startsWith('/about')
  const linkClass = (href: string) =>
    `text-base font-semibold transition-colors ${
      pathname === href ? 'text-gold' : 'text-white/85 hover:text-white'
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <div className="bg-white rounded-lg px-3 py-1.5">
            <Image
              src="/images/logo/CADSEA-logo-no-background.png"
              alt="CADSEA"
              width={160}
              height={56}
              className="object-contain h-11 w-auto"
            />
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 3).map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={linkClass(href)}>{label}</Link>
            </li>
          ))}

          {/* About Us dropdown */}
          <li ref={aboutRef} className="relative">
            <button
              onClick={() => setDesktopAboutOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-base font-semibold transition-colors ${
                isAboutActive ? 'text-gold' : 'text-white/85 hover:text-white'
              }`}
            >
              About Us
              <svg
                className={`w-4 h-4 transition-transform ${desktopAboutOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {desktopAboutOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                {aboutLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDesktopAboutOpen(false)}
                    className="block px-5 py-3 text-sm font-medium text-navy hover:bg-slate-50 hover:text-navy-light transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </li>

          {navLinks.slice(3).map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={linkClass(href)}>{label}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-light border-t border-white/10 px-6 py-5 space-y-1">
          {navLinks.slice(0, 3).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-base font-semibold ${pathname === href ? 'text-gold' : 'text-white/85'}`}
            >
              {label}
            </Link>
          ))}

          {/* About Us accordion */}
          <div>
            <button
              onClick={() => setMobileAboutOpen((v) => !v)}
              className={`w-full flex items-center justify-between py-3 text-base font-semibold ${
                isAboutActive ? 'text-gold' : 'text-white/85'
              }`}
            >
              About Us
              <svg
                className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileAboutOpen && (
              <div className="pl-4 space-y-1 border-l border-white/10 ml-1 mb-2">
                {aboutLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => { setMobileOpen(false); setMobileAboutOpen(false) }}
                    className="block py-2.5 text-sm font-medium text-white/70 hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(3).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-base font-semibold ${pathname === href ? 'text-gold' : 'text-white/85'}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
