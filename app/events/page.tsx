import type { Metadata } from 'next'
import Link from 'next/link'
import { getEvents } from '@/lib/notion'
import type { NotionEvent } from '@/lib/notion'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming and past events hosted by CADSEA.',
}

function EventCard({ event, upcoming }: { event: NotionEvent; upcoming: boolean }) {
  return (
    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Full-card link to detail page */}
      <Link href={`/events/${event.id}`} className="absolute inset-0 z-0" aria-label={event.title} />

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${
          upcoming ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
        }`}>
          {upcoming ? 'Upcoming' : 'Past'}
        </span>

        <h3 className="text-navy font-bold text-xl leading-snug mb-4">{event.title}</h3>

        <div className="space-y-2.5 mb-4 flex-1">
          {event.date && (
            <div className="flex items-center gap-2.5 text-navy/80 font-medium">
              <svg className="w-5 h-5 shrink-0 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{event.date}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2.5 font-medium">
              <svg className="w-5 h-5 shrink-0 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy/80 hover:text-navy hover:underline relative z-10"
              >{event.location}</a>
            </div>
          )}
        </div>

        <div className="mt-auto pt-2 relative z-10">
          {upcoming && event.registerLink ? (
            <a
              href={event.registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-lg bg-gold text-navy font-bold text-base shadow-md hover:bg-gold-light hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              Register Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ) : (
            <Link
              href={`/events/${event.id}`}
              className="relative z-10 block w-full text-center py-2.5 rounded-lg border border-navy text-navy font-semibold text-sm group-hover:bg-navy group-hover:text-white transition-colors"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default async function EventsPage() {
  const [upcoming, past, recap] = await Promise.all([
    getEvents('Upcoming'),
    getEvents('Past'),
    getEvents('Recap'),
  ])

  return (
    <>
      <section className="relative bg-navy overflow-hidden py-20 px-6">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="relative max-w-7xl mx-auto">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Community</span>
          <h1 className="text-white text-4xl md:text-5xl font-bold mt-2 mb-3">Events</h1>
          <p className="text-white/65 text-lg max-w-2xl">
            Join us for forums, workshops, and networking events designed to advance your career and connect you with the data science community.
          </p>
        </div>
      </section>

      <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-14 space-y-16">

        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
            <h2 className="text-navy text-2xl font-bold">Upcoming Events</h2>
            <span className="text-slate-400 text-sm">({upcoming.length})</span>
          </div>
          {upcoming.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center">
              <p className="text-slate-400">No upcoming events at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((e) => <EventCard key={e.id} event={e} upcoming={true} />)}
            </div>
          )}
        </section>

        {recap.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
              <h2 className="text-navy text-2xl font-bold">Event Recaps</h2>
              <span className="text-slate-400 text-sm">({recap.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recap.map((e) => <EventCard key={e.id} event={e} upcoming={false} />)}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" />
              <h2 className="text-navy text-2xl font-bold">Past Events</h2>
              <span className="text-slate-400 text-sm">({past.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
              {past.map((e) => <EventCard key={e.id} event={e} upcoming={false} />)}
            </div>
          </section>
        )}

      </div>
      </div>
    </>
  )
}
