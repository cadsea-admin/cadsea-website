import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services & Programs',
  description:
    'CADSEA offers forums, group projects, mentorship programs, job referrals, and more for data science and engineering professionals.',
}

const services = [
  {
    title: 'Forum',
    description:
      'Focuses on the technologies and the soft skills for the workplace. Each forum has a presentation and a panel discussion.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    title: 'Group Project',
    description:
      'CADSEA actively builds working relationships with other non-profit organizations and enterprises to help them address their business needs in data analytics and predictive modeling.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'CADSEA Life',
    description:
      'Make friends in the picnics and BBQs. Join our volunteer team and enjoy the special moments only for the volunteers. Share your own life stories via our website or WeChat.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Job Referral',
    description:
      'CADSEA provides a great platform that attracts hundreds of talented students and professionals in data science and data engineering.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'One to One Mentorship Program',
    description: 'Coming in the future.',
    comingSoon: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Workshop',
    description: 'Coming in the future.',
    comingSoon: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">What We Can Do</span>
          <h1 className="text-white text-4xl font-bold mt-2 mb-3">Services &amp; Programs</h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            CADSEA is dedicated to providing high level services to achieve our missions by reaching
            out to the best resources from both academia and industry. Currently we have forums, group
            projects, CADSEA life, job referrals, mentorship programs and workshops.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Member benefit note */}
        <div className="flex items-start gap-3 bg-navy/5 border border-navy/10 rounded-xl px-5 py-4 mb-12 max-w-3xl">
          <svg className="w-5 h-5 text-navy shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-navy/80 text-sm leading-relaxed">
            <span className="font-semibold">Our Services — </span>
            Members who join us can attend most of the events for free, and get discounts for a few paid
            events. More services will be added in the future, so stay tuned.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ title, description, icon, comingSoon }) => (
            <div
              key={title}
              className={`bg-white rounded-2xl p-6 border shadow-sm flex flex-col transition-all duration-200 ${
                comingSoon
                  ? 'border-slate-100 opacity-60'
                  : 'border-slate-100 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                comingSoon ? 'bg-slate-100 text-slate-400' : 'bg-navy/10 text-navy'
              }`}>
                {icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-navy font-bold text-base">{title}</h3>
                {comingSoon && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-muted text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
