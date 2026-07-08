'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { NotionEvent } from '@/lib/notion'

function extractYear(dateStr: string): string {
  const match = dateStr.match(/\b(20\d{2})\b/)
  return match ? match[1] : ''
}

function PriceIcon() {
  return (
    <svg className="w-5 h-5 shrink-0 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function EventCard({ event }: { event: NotionEvent }) {
  const upcoming = event.status === 'Upcoming'
  return (
    <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      <Link href={`/events/${event.id}`} className="absolute inset-0 z-0" aria-label={event.title} />

      <div className="p-5 flex flex-col flex-1">
        <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${
          event.status === 'Upcoming' ? 'bg-green-100 text-green-700' :
          event.status === 'Recap' ? 'bg-blue-100 text-blue-600' :
          'bg-slate-100 text-slate-500'
        }`}>
          {event.status === 'Recap' ? 'Recap' : upcoming ? 'Upcoming' : 'Past'}
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
          {event.price !== undefined && event.price !== '' && (
            <div className="flex items-center gap-2.5 font-medium">
              <PriceIcon />
              <span className={event.price === '0' ? 'text-green-600 font-bold' : 'text-navy/80'}>
                {event.price === '0' ? 'FREE' : event.price}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-2 relative z-10">
          <Link
            href={`/events/${event.id}`}
            className="relative z-10 block w-full text-center py-2.5 rounded-lg border border-navy text-navy font-semibold text-sm group-hover:bg-navy group-hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ color, title, count }: { color: string; title: string; count: number }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${color}`} />
      <h2 className="text-navy text-2xl font-bold">{title}</h2>
      <span className="text-slate-400 text-sm">({count})</span>
    </div>
  )
}

type Props = {
  upcoming: NotionEvent[]
  recap: NotionEvent[]
  past: NotionEvent[]
}

export default function EventsClient({ upcoming, recap, past }: Props) {
  const [search, setSearch] = useState('')
  const [selectedYear, setSelectedYear] = useState<string>('All')

  const allEvents = useMemo(() => [...upcoming, ...recap, ...past], [upcoming, recap, past])

  const years = useMemo(() => {
    const set = new Set<string>()
    allEvents.forEach((e) => {
      const y = extractYear(e.date)
      if (y) set.add(y)
    })
    return ['All', ...Array.from(set).sort((a, b) => Number(b) - Number(a))]
  }, [allEvents])

  function filterEvents(events: NotionEvent[]) {
    return events.filter((e) => {
      const matchSearch = search === '' ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase())
      const matchYear = selectedYear === 'All' || extractYear(e.date) === selectedYear
      return matchSearch && matchYear
    })
  }

  const filteredUpcoming = filterEvents(upcoming)
  const filteredRecap = filterEvents(recap)
  const filteredPast = filterEvents(past)
  const totalResults = filteredUpcoming.length + filteredRecap.length + filteredPast.length

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">

        {/* Search + Year filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedYear === y
                    ? 'bg-navy text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-navy hover:text-navy'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {totalResults === 0 && (
          <div className="bg-white border border-slate-100 rounded-2xl py-16 text-center">
            <p className="text-slate-400">No events found. Try a different search or year.</p>
          </div>
        )}

        {filteredUpcoming.length > 0 && (
          <section>
            <SectionHeader color="bg-green-500" title="Upcoming Events" count={filteredUpcoming.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcoming.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </section>
        )}

        {filteredRecap.length > 0 && (
          <section>
            <SectionHeader color="bg-blue-400" title="Event Recaps" count={filteredRecap.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecap.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </section>
        )}

        {filteredPast.length > 0 && (
          <section>
            <SectionHeader color="bg-slate-300" title="Past Events" count={filteredPast.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
              {filteredPast.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
