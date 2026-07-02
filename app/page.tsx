import Link from 'next/link'

const serviceNames = [
  'Forum',
  'Group Project',
  'CADSEA Life',
  'Job Referral',
  'One to One Mentorship Program',
  'Workshop',
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-44">
          <div className="max-w-3xl">
            <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-5">
              Washington DC Area
            </span>
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-[1.15] tracking-tight">
              Chinese American Data Science &amp; Engineering Association
            </h1>
            <p className="mt-6 text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">
              CADSEA is a non-profit organization focused on the field of data science and engineering.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#mission"
                className="px-8 py-3.5 rounded-lg bg-gold text-navy font-semibold text-base hover:bg-gold-light transition-colors shadow-lg"
              >
                Learn More
              </Link>
              <Link
                href="/events"
                className="px-8 py-3.5 rounded-lg border border-white/25 text-white font-semibold text-base hover:bg-white/10 transition-colors"
              >
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Goal ── */}
      <section id="mission" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Our Mission */}
            <div>
              <span className="text-gold font-semibold text-sm tracking-widest uppercase">Our Mission</span>
              <h2 className="mt-3 text-navy text-3xl font-bold mb-8">What Drives Us</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                    <svg className="w-3 h-3 text-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    To enhance the leadership of Chinese-American data scientists and engineers.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                    <svg className="w-3 h-3 text-navy" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Creating an open and supportive platform for technical exchange while promoting career development and technological innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Goal */}
            <div>
              <span className="text-gold font-semibold text-sm tracking-widest uppercase">Our Goal</span>
              <h2 className="mt-3 text-navy text-3xl font-bold mb-8">Where We're Headed</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-navy flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    To bridge academia and industry, closely tracking advancements in artificial intelligence to ensure our members remain at the forefront of technological progress.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-navy flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Through high-quality lectures, workshops, and networking events, we provide members with the latest industry insights, support their professional skill development, and help them build valuable professional networks, laying a solid foundation for long-term career success.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services & Programs ── */}
      <section className="py-24 bg-slate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold font-semibold text-sm tracking-widest uppercase">What We Can Do</span>
              <h2 className="mt-3 text-navy text-3xl md:text-4xl font-bold leading-tight">
                Services &amp; Programs
              </h2>
              <p className="mt-4 text-muted text-lg leading-relaxed">
                CADSEA is dedicated to providing high level services to achieve our missions by reaching
                out to the best resources from both academia and industry. Currently we have forums, group
                projects, CADSEA life, job referrals, mentorship programs and workshops.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-navy text-white font-semibold text-base hover:bg-navy-light transition-colors shadow"
              >
                View All Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Service name pills */}
            <div className="flex flex-wrap gap-3">
              {serviceNames.map((name) => (
                <span
                  key={name}
                  className="bg-white border border-slate-200 rounded-full px-4 py-2 text-navy font-medium text-sm shadow-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
