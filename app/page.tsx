import Link from 'next/link'

const pillars = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Connect',
    description:
      'Build meaningful relationships across the Chinese American data and engineering community in the DC metro area.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Advance',
    description:
      'Promote professional excellence through knowledge sharing, technical talks, and industry best practices.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: 'Serve',
    description:
      'Give back to the community through mentorship, outreach, and fostering the next generation of data professionals.',
  },
]

const programs = [
  {
    title: 'Networking Events',
    description:
      'Regular meetups, happy hours, and professional mixers to expand your network within the DC data community.',
    tag: 'Community',
  },
  {
    title: 'Technical Workshops',
    description:
      'Hands-on sessions covering machine learning, data engineering, AI tools, and the latest industry technologies.',
    tag: 'Learning',
  },
  {
    title: 'Career Development',
    description:
      'Resume reviews, mock interviews, and panels featuring industry leaders to help you advance your career.',
    tag: 'Growth',
  },
  {
    title: 'Mentorship Program',
    description:
      'Pair experienced data professionals with students and early-career engineers for guidance and support.',
    tag: 'Mentorship',
  },
  {
    title: 'Industry Panels',
    description:
      'Thought-leadership discussions on trends in data science, AI policy, and engineering at scale.',
    tag: 'Insights',
  },
  {
    title: 'Community Outreach',
    description:
      'Partnering with universities and nonprofits to promote STEM education and data literacy in underserved communities.',
    tag: 'Outreach',
  },
]

const tagColors: Record<string, string> = {
  Community: 'bg-blue-50 text-blue-700',
  Learning: 'bg-purple-50 text-purple-700',
  Growth: 'bg-green-50 text-green-700',
  Mentorship: 'bg-amber-50 text-amber-700',
  Insights: 'bg-rose-50 text-rose-700',
  Outreach: 'bg-teal-50 text-teal-700',
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-navy overflow-hidden">
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40 text-center">
          <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Washington DC Area
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-tight max-w-4xl mx-auto">
            Chinese American Data Science &amp; Engineering Association
          </h1>
          <p className="mt-6 text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A nonprofit community connecting data professionals, engineers, and researchers
            across the Chinese American community in the greater DC area.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="px-8 py-3.5 rounded-lg bg-gold text-navy font-semibold text-base hover:bg-gold-light transition-colors shadow-lg"
            >
              Explore Events
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 rounded-lg border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors"
            >
              About CADSEA
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">Our Mission</span>
            <h2 className="mt-3 text-navy text-3xl md:text-4xl font-bold">
              Empowering the Next Generation of Data Leaders
            </h2>
            <p className="mt-5 text-muted text-lg leading-relaxed">
              CADSEA bridges the gap between technical talent and opportunity —
              fostering a vibrant, inclusive, and collaborative community for
              Chinese American data and engineering professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map(({ icon, title, description }) => (
              <div
                key={title}
                className="group p-8 rounded-2xl border border-slate-100 bg-slate hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-navy mb-5 group-hover:bg-navy group-hover:text-white transition-colors">
                  {icon}
                </div>
                <h3 className="text-navy text-xl font-bold mb-3">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services & Programs ── */}
      <section className="py-24 bg-slate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">What We Do</span>
            <h2 className="mt-3 text-navy text-3xl md:text-4xl font-bold">
              Services &amp; Programs
            </h2>
            <p className="mt-5 text-muted text-lg leading-relaxed">
              From technical workshops to career mentorship, we offer programs designed
              to help every member grow professionally and contribute to the community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(({ title, description, tag }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${tagColors[tag]}`}>
                  {tag}
                </span>
                <h3 className="text-navy font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-navy text-white font-semibold text-base hover:bg-navy-light transition-colors shadow"
            >
              See Upcoming Events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
