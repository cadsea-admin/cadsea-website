import Link from 'next/link'
import Image from 'next/image'

const sponsors: { name: string; logo: string; url?: string }[] = [
  { name: 'Entagile', logo: '/images/sponsors/entagile.png', url: 'https://entagile.com/' },
  { name: 'Premier Dental Art', logo: '/images/sponsors/premier_dental_art.jpg' },
  { name: 'University of North America', logo: '/images/sponsors/university_of_north_america.png', url: 'https://uona.edu/' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">

      {/* Sponsors bar */}
      {sponsors.length > 0 && (
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <p className="text-white/40 text-xs font-semibold tracking-widest uppercase text-center mb-6">
              Our Sponsors
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {sponsors.map((s) => {
                const img = (
                  <div className="relative h-16 w-44 opacity-70 hover:opacity-100 transition-opacity">
                    <Image src={s.logo} alt={s.name} fill className="object-contain" />
                  </div>
                )
                return s.url ? (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
                    {img}
                  </a>
                ) : (
                  <div key={s.name}>{img}</div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2">CADSEA</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Chinese American Data Science and Engineering Association
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about/board', label: 'About Us' },
                { href: '/events', label: 'Events' },
                { href: '/services', label: 'Services & Programs' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
              Connect
            </h4>
            <p className="text-white/60 text-sm">
              A nonprofit organization supporting data professionals in the Chinese American community.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/40 text-sm">
          &copy; {new Date().getFullYear()} CADSEA. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
