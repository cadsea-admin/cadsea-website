import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2">CADSEA</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Chinese American Data Science and Engineering Association
            </p>
            <p className="text-white/50 text-sm mt-2">Washington DC Area</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/events', label: 'Events' },
                { href: '/sponsors', label: 'Partners & Sponsors' },
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
