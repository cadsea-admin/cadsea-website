import type { Metadata } from 'next'
import { getPromoters, getEventVolunteers } from '@/lib/notion'
import type { EventVolunteer } from '@/lib/notion'

export const revalidate = 600 // revalidate every 10 minutes

export const metadata: Metadata = {
  title: 'Volunteers',
  description: 'Meet the CADSEA volunteers who help promote our events and support our community.',
}

function groupByEvent(volunteers: EventVolunteer[]) {
  const map = new Map<string, { date: string | null; names: string[] }>()
  for (const v of volunteers) {
    if (!v.eventName) continue
    const key = v.eventName
    if (!map.has(key)) map.set(key, { date: v.date, names: [] })
    map.get(key)!.names.push(v.name)
  }
  return Array.from(map.entries()).map(([eventName, { date, names }]) => ({
    eventName,
    date,
    names,
  }))
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function RosetteBadge() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx="11" cy="4.5" rx="2" ry="3" fill="#e8a020" opacity="0.85"
          transform={`rotate(${i * 45} 11 11)`} />
      ))}
      <circle cx="11" cy="11" r="5" fill="#e8a020" />
      <circle cx="11" cy="11" r="3.5" fill="#f5b942" />
      <circle cx="11" cy="11" r="1.5" fill="#0f2a5e" />
    </svg>
  )
}

const hallOfFame = [
  { name: 'Jane Smith', year: '2023', contribution: 'Led 12 events as primary organizer' },
  { name: 'Michael Chen', year: '2023', contribution: 'Grew WeChat community by 500+ members' },
  { name: 'Emily Wang', year: '2022', contribution: 'Coordinated 3 major career forums' },
]

const highlights = [
  {
    name: 'Sarah Liu',
    role: 'Event Coordinator',
    quote:
      "Volunteering with CADSEA has been one of the most rewarding experiences of my career. I've built lasting friendships and learned so much from our community.",
  },
  {
    name: 'David Zhang',
    role: 'Social Media Promoter',
    quote:
      'I joined as a promoter and ended up discovering my passion for community building. CADSEA gave me a platform to make a real impact.',
  },
]

export default async function VolunteersPage() {
  const [promoters, eventVolunteers] = await Promise.all([
    getPromoters(),
    getEventVolunteers(),
  ])

  const groupedEvents = groupByEvent(eventVolunteers)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden py-20 px-6">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="text-white text-4xl md:text-5xl font-bold mt-2 mb-4 leading-tight">Volunteers</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            CADSEA is powered by dedicated volunteers who promote our events and strengthen our community.
            Thank you to everyone who contributes their time and energy.
          </p>
        </div>
      </section>

      {/* ── Hall of Fame ── */}
      <section className="py-16 px-6 bg-amber-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400 mb-4">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
              </svg>
            </div>
            <h2 className="text-navy text-3xl font-bold mb-2">Volunteer Hall of Fame</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Recognizing volunteers who have gone above and beyond in serving our community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {hallOfFame.map((h) => (
              <div key={h.name} className="relative bg-white rounded-2xl p-6 shadow-md border border-amber-200 text-center overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300" />
                <div className="w-16 h-16 rounded-full bg-amber-400 border-4 border-amber-200 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 mt-1">
                  {h.name[0]}
                </div>
                <p className="text-navy font-bold text-base">{h.name}</p>
                <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mt-1 mb-3">{h.year}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{h.contribution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Volunteer Highlights ── */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Stories</span>
            <h2 className="text-navy text-2xl font-bold mt-1">Volunteer Highlights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {highlights.map((s) => (
              <div key={s.name} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm">
                <div className="text-navy text-5xl font-serif leading-none mb-3 select-none">&ldquo;</div>
                <p className="text-slate-700 leading-relaxed mb-6">{s.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="text-navy font-semibold text-sm">{s.name}</p>
                    <p className="text-slate-500 text-xs">{s.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promotion Team ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Recognition</span>
            <h2 className="text-navy text-2xl font-bold mt-1">Promotion Team</h2>
            <p className="text-slate-500 text-sm mt-1">Members who help spread the word about CADSEA events.</p>
          </div>

          {promoters.length === 0 ? (
            <p className="text-slate-400 text-sm">No data available.</p>
          ) : (
            <>
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white text-left">
                      <th className="px-5 py-4 font-semibold">Name</th>
                      <th className="px-5 py-4 font-semibold">Channel / Task</th>
                      <th className="px-5 py-4 font-semibold text-right">Events</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {promoters.map((p) => (
                      <tr key={p.id} className="bg-white hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3.5 font-semibold text-navy">{p.name}</td>
                        <td className="px-5 py-3.5 text-slate-600">{p.task || '—'}</td>
                        <td className="px-5 py-3.5 text-right">
                          {p.count === 'All' ? (
                            <span className="inline-flex justify-end" title="Participated in every event">
                              <RosetteBadge />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center min-w-[28px] h-7 rounded-full bg-navy/10 text-navy text-xs font-bold px-2">
                              {p.count || '—'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
                <RosetteBadge />
                Participated in every event
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── Event Volunteers ── */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Recognition</span>
            <h2 className="text-navy text-2xl font-bold mt-1">Event Volunteers</h2>
            <p className="text-slate-500 text-sm mt-1">Volunteers who supported our events.</p>
          </div>

          {groupedEvents.length === 0 ? (
            <p className="text-slate-400 text-sm">No data available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupedEvents.map(({ eventName, date, names }) => (
                <div key={eventName} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-navy px-5 py-3.5 flex items-center justify-between gap-3">
                    <h3 className="text-white font-semibold text-sm leading-snug">{eventName}</h3>
                    {date && <span className="text-white/60 text-xs shrink-0">{formatDate(date)}</span>}
                  </div>
                  <div className="px-5 py-4 flex flex-wrap gap-2">
                    {names.map((name) => (
                      <span key={name} className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
