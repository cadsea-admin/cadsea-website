import type { Metadata } from 'next'
import { getPromoters, getEventVolunteers } from '@/lib/notion'
import type { EventVolunteer } from '@/lib/notion'

export const revalidate = 86400

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


export default async function VolunteersPage() {
  const [promoters, eventVolunteers] = await Promise.all([
    getPromoters(),
    getEventVolunteers(),
  ])

  const groupedEvents = groupByEvent(eventVolunteers)
  const sortedPromoters = [...promoters].sort((a, b) => {
    if (a.count === 'All' && b.count !== 'All') return -1
    if (a.count !== 'All' && b.count === 'All') return 1
    return (parseInt(b.count) || 0) - (parseInt(a.count) || 0)
  })

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
                    {sortedPromoters.map((p) => (
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
