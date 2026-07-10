import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { getEventById, getEventBlocks } from '@/lib/notion'
import PosterLightbox from '@/app/components/PosterLightbox'
import RecapDetailClient from '@/app/components/RecapDetailClient'

export const revalidate = 86400

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const event = await getEventById(id)
  if (!event) return { title: 'Event Not Found' }
  return {
    title: event.title,
    description: event.description,
  }
}

function googleCalendarUrl(event: { title: string; location: string; address: string; description: string }) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    location: [event.location, event.address].filter(Boolean).join(', '),
    details: event.description,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function extractEventId(url: string): string | null {
  if (!url) return null
  try {
    const path = url.startsWith('http') ? new URL(url).pathname : url
    const parts = path.split('/').filter(Boolean)
    return parts[parts.length - 1] || null
  } catch { return null }
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params
  const [event, markdown] = await Promise.all([
    getEventById(id),
    getEventBlocks(id),
  ])

  if (!event) notFound()

  const html = markdown ? await marked(markdown) : ''
  const isRecap = event.status === 'Recap'

  // For Recap events, fetch related event in parallel
  const relatedId = isRecap ? extractEventId(event.relatedEventUrl) : null
  const [relatedEvent, relatedMarkdown] = relatedId
    ? await Promise.all([getEventById(relatedId), getEventBlocks(relatedId)])
    : [null, '']
  const relatedHtml = relatedMarkdown ? await marked(relatedMarkdown) : ''

  const upcoming = event.status === 'Upcoming'
  const isOnline = event.location === 'Online'
  const locationQuery = [event.location, event.address].filter(Boolean).join(', ')

  return (
    <>
      {/* Back */}
      <div className="bg-navy px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/events" className="text-white/60 hover:text-white text-sm flex items-center gap-1.5 transition-colors w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </Link>
        </div>
      </div>

      {/* Recap: use interactive two-column client component */}
      {isRecap ? (
        <RecapDetailClient
          event={event}
          html={html}
          relatedEvent={relatedEvent}
          relatedHtml={relatedHtml}
        />
      ) : (
        <div className="max-w-4xl mx-auto px-6 py-10">

          {/* Poster */}
          {event.image && (
            <div className="mb-8">
              <PosterLightbox src={event.image} alt={event.title} />
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${
              upcoming ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {upcoming ? 'Upcoming' : 'Past Event'}
            </span>

            <h1 className="text-navy text-3xl md:text-4xl font-bold leading-tight mb-6">{event.title}</h1>

            {/* Meta + Map two-column */}
            <div className="flex flex-col md:flex-row gap-6">

              {/* Left: meta info */}
              <div className="flex flex-col gap-3 flex-1">

                {/* Date */}
                {event.date && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-9 h-9 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="font-medium">{event.date}</span>
                  </div>
                )}

                {/* Location */}
                {event.location && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-9 h-9 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {isOnline ? (
                      <span className="font-medium">{event.location}</span>
                    ) : (
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(locationQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-navy hover:underline"
                      >
                        {event.location}
                        {event.address && <span className="block text-sm font-normal text-slate-500">{event.address}</span>}
                      </a>
                    )}
                  </div>
                )}

                {/* Price */}
                {event.price !== undefined && event.price !== '' && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-9 h-9 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className={`font-medium ${event.price === '0' ? 'text-green-600 font-bold' : ''}`}>
                      {event.price === '0' ? 'FREE' : event.price}
                    </span>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href={googleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:border-navy hover:text-navy transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add to Google Calendar
                  </a>
                </div>

              </div>

              {/* Right: Google Map */}
              {!isOnline && event.location && (
                <div className="w-full md:w-72 lg:w-96 shrink-0 rounded-xl overflow-hidden border border-slate-100 shadow-sm h-56 md:h-auto">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(locationQuery)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '224px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}

            </div>
          </div>

          {/* Divider */}
          {html && <hr className="border-slate-100 mb-8" />}

          {/* Notion page content */}
          {html && (
            <div
              className="prose prose-slate max-w-none prose-headings:text-navy prose-a:text-navy [&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_img]:w-auto [&_img]:h-auto [&_img]:rounded-xl"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}

        </div>
      )}
    </>
  )
}
