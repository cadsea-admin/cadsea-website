import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getEvents, type NotionEvent } from '@/lib/notion'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past CADSEA events for data science and engineering professionals in the DC area.',
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'TBD'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function isUpcoming(dateStr: string | null): boolean {
  if (!dateStr) return true
  return new Date(dateStr) >= new Date(new Date().toDateString())
}

const categoryColor: Record<string, string> = {
  Networking: 'bg-blue-50 text-blue-700',
  Workshop:   'bg-purple-50 text-purple-700',
  Panel:      'bg-rose-50 text-rose-700',
  Career:     'bg-green-50 text-green-700',
}

function EventCard({ event }: { event: NotionEvent }) {
  const upcoming = isUpcoming(event.date)
  const badgeClass = categoryColor[event.category] ?? 'bg-slate-100 text-slate-500'

  return (
    <Link
      href={`/events/${event.id}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Cover image */}
      {event.coverImage ? (
        <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className={`w-full aspect-video flex items-center justify-center ${upcoming ? 'bg-navy/5' : 'bg-slate-50'}`}>
          <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          {event.category && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
              {event.category}
            </span>
          )}
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            upcoming ? 'bg-gold/10 text-amber-700' : 'bg-slate-100 text-slate-400'
          }`}>
            {upcoming ? 'Upcoming' : 'Past'}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-navy font-bold text-lg leading-snug mb-3 group-hover:text-navy-light transition-colors">
          {event.title || 'Untitled Event'}
        </h2>

        {/* Meta */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-muted text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(event.date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-muted text-sm">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {/* Summary */}
        {event.summary && (
          <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">
            {event.summary}
          </p>
        )}

        {/* Footer link */}
        <div className="mt-auto flex items-center gap-1 text-navy text-sm font-medium group-hover:gap-2 transition-all">
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default async function EventsPage() {
  const events = await getEvents()

  const upcoming = events.filter((e) => isUpcoming(e.date))
  const past = events.filter((e) => !isUpcoming(e.date)).reverse()

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Community
          </span>
          <h1 className="text-white text-4xl font-bold mt-2 mb-3">Events</h1>
          <p className="text-white/60 text-lg max-w-xl">
            Networking meetups, technical workshops, and career development sessions
            for data professionals in the DC area.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section>
            <h2 className="text-navy text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-gold inline-block" />
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Past */}
        {past.length > 0 && (
          <section>
            <h2 className="text-navy text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-6 rounded-full bg-slate-300 inline-block" />
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {events.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-slate flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-navy font-semibold text-lg mb-2">No events yet</h3>
            <p className="text-muted text-sm">Check back soon — events will appear here once added to our calendar.</p>
          </div>
        )}
      </div>
    </>
  )
}
